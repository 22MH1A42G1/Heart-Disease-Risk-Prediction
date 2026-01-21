# FastAPI Backend - Federated Learning Heart Disease Risk Prediction

This is a complete FastAPI backend implementation for a federated learning-based heart disease risk prediction system.

## Features

- **Doctor-Only Authentication**: JWT-based authentication for hospital doctors
- **Federated Learning**: Privacy-preserving collaborative model training
- **FedAvg Aggregation**: Weighted averaging of model contributions
- **SHAP Explainability**: Feature importance explanations for predictions
- **Risk Prediction**: Low/Medium/High risk classification

## Tech Stack

- Python 3.8+
- FastAPI
- SQLAlchemy
- PostgreSQL
- scikit-learn
- SHAP

## Installation

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Set up PostgreSQL database:
```bash
# Create database
createdb heart_disease_db
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials and secret key
```

4. Run the server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### Authentication

- `POST /auth/register` - Register a new doctor
- `POST /auth/login` - Login and get JWT token
- `GET /auth/me` - Get current doctor information

### Federated Learning

- `POST /federated/train` - Upload CSV dataset and train local model
- `POST /federated/aggregate` - Trigger FedAvg aggregation
- `GET /federated/global-model` - Get latest global model info
- `GET /federated/contributions` - List all model contributions

### Prediction

- `POST /predict` - Predict heart disease risk with SHAP explainability

### Health Check

- `GET /health` - API health check

## Usage Example

1. **Register a Doctor**:
```bash
curl -X POST "http://localhost:8000/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "hospital_name": "General Hospital",
    "doctor_name": "Dr. John Smith",
    "license_id": "MED123456",
    "email": "john.smith@hospital.com",
    "password": "securepassword123"
  }'
```

2. **Login**:
```bash
curl -X POST "http://localhost:8000/auth/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=john.smith@hospital.com&password=securepassword123"
```

3. **Upload Dataset and Train**:
```bash
curl -X POST "http://localhost:8000/federated/train" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@heart_data.csv"
```

4. **Aggregate Models**:
```bash
curl -X POST "http://localhost:8000/federated/aggregate" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

5. **Make Prediction**:
```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "age": 63,
    "sex": 1,
    "cp": 3,
    "trestbps": 145,
    "chol": 233,
    "fbs": 1,
    "restecg": 0,
    "thalach": 150,
    "exang": 0,
    "oldpeak": 2.3,
    "slope": 0,
    "ca": 0,
    "thal": 1
  }'
```

## CSV Dataset Format

The CSV file for training must include these columns:
- `age`: Age in years
- `sex`: Sex (0=female, 1=male)
- `cp`: Chest pain type (0-3)
- `trestbps`: Resting blood pressure (mm Hg)
- `chol`: Serum cholesterol (mg/dl)
- `fbs`: Fasting blood sugar > 120 mg/dl (1=true, 0=false)
- `restecg`: Resting ECG results (0-2)
- `thalach`: Maximum heart rate achieved
- `exang`: Exercise induced angina (1=yes, 0=no)
- `oldpeak`: ST depression induced by exercise
- `slope`: Slope of peak exercise ST segment (0-2)
- `ca`: Number of major vessels colored by fluoroscopy (0-4)
- `thal`: Thalassemia (0-3)
- `target`: Disease presence (0=no, 1=yes)

## Security Features

- **Password Hashing**: Bcrypt-based password hashing
- **JWT Authentication**: Secure token-based authentication
- **CORS**: Configurable Cross-Origin Resource Sharing
- **Privacy**: Raw patient data never stored centrally

## Federated Learning Flow

1. Each hospital registers doctors through the API
2. Doctors upload their hospital's CSV dataset
3. Local model is trained on the uploaded data
4. Only model weights are stored (not raw data)
5. FedAvg aggregation combines all hospital models
6. Global model used for predictions across all hospitals

## License

MIT
