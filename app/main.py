"""
FastAPI main application
"""
from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta
from typing import List
import pickle

from app.database import get_db, init_db, engine
from app.models import Doctor, ModelContribution, GlobalModel, Base
from app.schemas import (
    DoctorRegister, DoctorLogin, Token, DoctorResponse,
    PredictionInput, PredictionOutput,
    ModelContributionResponse, GlobalModelResponse
)
from app.auth import (
    get_password_hash, authenticate_doctor, create_access_token,
    get_current_doctor, ACCESS_TOKEN_EXPIRE_MINUTES
)
from app.federated import train_local_model, federated_averaging
from app.prediction import predict_heart_disease_risk

# Create FastAPI app
app = FastAPI(
    title="Federated Learning Heart Disease Risk Prediction API",
    description="API for federated learning-based heart disease risk prediction",
    version="1.0.0"
)

# CORS configuration - restrict in production
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # TODO: In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event():
    """Initialize database on startup"""
    Base.metadata.create_all(bind=engine)


# ==================== Authentication Endpoints ====================

@app.post("/auth/register", response_model=DoctorResponse, status_code=status.HTTP_201_CREATED)
def register_doctor(
    doctor_data: DoctorRegister,
    db: Session = Depends(get_db)
):
    """
    Register a new doctor
    
    - **hospital_name**: Name of the hospital
    - **doctor_name**: Doctor's full name
    - **license_id**: Medical license ID (must be unique)
    - **email**: Email address (must be unique)
    - **password**: Password (minimum 8 characters)
    """
    # Check if email already exists
    existing_doctor = db.query(Doctor).filter(Doctor.email == doctor_data.email).first()
    if existing_doctor:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Check if license_id already exists
    existing_license = db.query(Doctor).filter(Doctor.license_id == doctor_data.license_id).first()
    if existing_license:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="License ID already registered"
        )
    
    # Create new doctor
    new_doctor = Doctor(
        hospital_name=doctor_data.hospital_name,
        doctor_name=doctor_data.doctor_name,
        license_id=doctor_data.license_id,
        email=doctor_data.email,
        hashed_password=get_password_hash(doctor_data.password)
    )
    
    db.add(new_doctor)
    db.commit()
    db.refresh(new_doctor)
    
    return new_doctor


@app.post("/auth/login", response_model=Token)
def login_doctor(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """
    Login with email and password to get JWT token
    
    - **username**: Email address (OAuth2 requires 'username' field)
    - **password**: Password
    """
    doctor = authenticate_doctor(db, form_data.username, form_data.password)
    
    if not doctor:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": doctor.email},
        expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}


@app.get("/auth/me", response_model=DoctorResponse)
def get_current_doctor_info(
    current_doctor: Doctor = Depends(get_current_doctor)
):
    """
    Get current authenticated doctor's information
    """
    return current_doctor


# ==================== Federated Learning Endpoints ====================

@app.post("/federated/train", response_model=ModelContributionResponse)
async def train_and_contribute_model(
    file: UploadFile = File(...),
    current_doctor: Doctor = Depends(get_current_doctor),
    db: Session = Depends(get_db)
):
    """
    Upload CSV dataset, train local model, and contribute weights
    
    - **file**: CSV file with heart disease data
    
    Required CSV columns:
    - age, sex, cp, trestbps, chol, fbs, restecg, thalach, exang, oldpeak, slope, ca, thal, target
    """
    # Validate file type
    if not file.filename.endswith('.csv'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="File must be a CSV"
        )
    
    # Read CSV content
    content = await file.read()
    csv_data = content.decode('utf-8')
    
    # Train local model and get weights
    model_weights, num_samples = train_local_model(csv_data)
    
    # Store model contribution
    contribution = ModelContribution(
        doctor_id=current_doctor.id,
        hospital_name=current_doctor.hospital_name,
        model_weights=pickle.dumps(model_weights),
        num_samples=num_samples
    )
    
    db.add(contribution)
    db.commit()
    db.refresh(contribution)
    
    return contribution


@app.post("/federated/aggregate", response_model=GlobalModelResponse)
def aggregate_models(
    current_doctor: Doctor = Depends(get_current_doctor),
    db: Session = Depends(get_db)
):
    """
    Trigger FedAvg aggregation of all model contributions
    
    Aggregates model weights from all hospitals using weighted averaging
    """
    global_model = federated_averaging(db)
    return global_model


@app.get("/federated/global-model", response_model=GlobalModelResponse)
def get_global_model(
    current_doctor: Doctor = Depends(get_current_doctor),
    db: Session = Depends(get_db)
):
    """
    Get the latest global model information
    """
    global_model = db.query(GlobalModel).order_by(GlobalModel.version.desc()).first()
    
    if not global_model:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No global model available"
        )
    
    return global_model


@app.get("/federated/contributions", response_model=List[ModelContributionResponse])
def get_all_contributions(
    current_doctor: Doctor = Depends(get_current_doctor),
    db: Session = Depends(get_db)
):
    """
    Get all model contributions from all hospitals
    """
    contributions = db.query(ModelContribution).all()
    return contributions


# ==================== Prediction Endpoints ====================

@app.post("/predict", response_model=PredictionOutput)
def predict_risk(
    prediction_input: PredictionInput,
    current_doctor: Doctor = Depends(get_current_doctor),
    db: Session = Depends(get_db)
):
    """
    Predict heart disease risk with SHAP explainability
    
    All input fields are mandatory. Risk levels: Low, Medium, High
    
    - **age**: Age in years (0-120)
    - **sex**: Sex (0=female, 1=male)
    - **cp**: Chest pain type (0-3)
    - **trestbps**: Resting blood pressure (mm Hg)
    - **chol**: Serum cholesterol (mg/dl)
    - **fbs**: Fasting blood sugar > 120 mg/dl (1=true, 0=false)
    - **restecg**: Resting ECG results (0-2)
    - **thalach**: Maximum heart rate achieved
    - **exang**: Exercise induced angina (1=yes, 0=no)
    - **oldpeak**: ST depression induced by exercise
    - **slope**: Slope of peak exercise ST segment (0-2)
    - **ca**: Number of major vessels colored by fluoroscopy (0-4)
    - **thal**: Thalassemia (0-3)
    """
    return predict_heart_disease_risk(db, prediction_input)


# ==================== Health Check ====================

@app.get("/health")
def health_check():
    """
    Health check endpoint
    """
    return {"status": "healthy", "service": "Federated Learning Heart Disease API"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
