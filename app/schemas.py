"""
Pydantic schemas for request/response validation
"""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime


# Authentication Schemas
class DoctorRegister(BaseModel):
    """Schema for doctor registration"""
    hospital_name: str = Field(..., min_length=1, description="Hospital name")
    doctor_name: str = Field(..., min_length=1, description="Doctor's full name")
    license_id: str = Field(..., min_length=1, description="Medical license ID")
    email: EmailStr = Field(..., description="Email address")
    password: str = Field(..., min_length=8, description="Password (minimum 8 characters)")


class DoctorLogin(BaseModel):
    """Schema for doctor login"""
    email: EmailStr
    password: str


class Token(BaseModel):
    """Schema for JWT token response"""
    access_token: str
    token_type: str


class TokenData(BaseModel):
    """Schema for token data"""
    email: Optional[str] = None


class DoctorResponse(BaseModel):
    """Schema for doctor response"""
    id: int
    hospital_name: str
    doctor_name: str
    license_id: str
    email: str
    created_at: datetime

    class Config:
        from_attributes = True


# Prediction Schemas
class PredictionInput(BaseModel):
    """Schema for heart disease prediction input - all fields mandatory"""
    age: int = Field(..., ge=0, le=120, description="Age in years")
    sex: int = Field(..., ge=0, le=1, description="Sex (0=female, 1=male)")
    cp: int = Field(..., ge=0, le=3, description="Chest pain type (0-3)")
    trestbps: int = Field(..., ge=0, description="Resting blood pressure (mm Hg)")
    chol: int = Field(..., ge=0, description="Serum cholesterol (mg/dl)")
    fbs: int = Field(..., ge=0, le=1, description="Fasting blood sugar > 120 mg/dl (1=true, 0=false)")
    restecg: int = Field(..., ge=0, le=2, description="Resting ECG results (0-2)")
    thalach: int = Field(..., ge=0, description="Maximum heart rate achieved")
    exang: int = Field(..., ge=0, le=1, description="Exercise induced angina (1=yes, 0=no)")
    oldpeak: float = Field(..., ge=0, description="ST depression induced by exercise")
    slope: int = Field(..., ge=0, le=2, description="Slope of peak exercise ST segment (0-2)")
    ca: int = Field(..., ge=0, le=4, description="Number of major vessels colored by fluoroscopy (0-4)")
    thal: int = Field(..., ge=0, le=3, description="Thalassemia (0-3)")


class PredictionOutput(BaseModel):
    """Schema for prediction output"""
    risk_level: str = Field(..., description="Risk level: Low, Medium, or High")
    risk_score: float = Field(..., description="Risk score between 0 and 1")
    shap_explanation: dict = Field(..., description="SHAP feature importance values")


# Federated Learning Schemas
class ModelContributionResponse(BaseModel):
    """Schema for model contribution response"""
    id: int
    doctor_id: int
    hospital_name: str
    num_samples: int
    created_at: datetime

    class Config:
        from_attributes = True


class GlobalModelResponse(BaseModel):
    """Schema for global model response"""
    id: int
    version: int
    num_contributions: int
    created_at: datetime

    class Config:
        from_attributes = True
