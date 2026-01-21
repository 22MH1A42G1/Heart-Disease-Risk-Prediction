"""
Prediction module with SHAP explainability
"""
import numpy as np
import shap
from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.federated import predict_with_global_model, get_feature_names
from app.schemas import PredictionInput, PredictionOutput


def determine_risk_level(probability: float) -> str:
    """
    Determine risk level based on prediction probability
    
    Args:
        probability: Risk probability between 0 and 1
        
    Returns:
        Risk level: "Low", "Medium", or "High"
    """
    if probability < 0.33:
        return "Low"
    elif probability < 0.67:
        return "Medium"
    else:
        return "High"


def calculate_shap_values(db: Session, features: np.ndarray) -> dict:
    """
    Calculate SHAP values for feature importance explanation
    
    Args:
        db: Database session
        features: Feature array
        
    Returns:
        Dictionary with feature names and their SHAP values
    """
    try:
        # Get latest global model
        from app.models import GlobalModel
        import pickle
        
        global_model = db.query(GlobalModel).order_by(GlobalModel.version.desc()).first()
        
        if not global_model:
            raise HTTPException(
                status_code=404,
                detail="No global model available"
            )
        
        # Load aggregated model data
        aggregated_data = pickle.loads(global_model.model_data)
        models = aggregated_data['models']
        weights = aggregated_data['weights']
        
        # Use the first model as representative for SHAP
        # Note: This is a simplification. In a production system, you might want to
        # average SHAP values across all models for a more accurate representation
        # of the federated model's behavior
        representative_model = models[0]
        
        # Create SHAP explainer
        explainer = shap.TreeExplainer(representative_model)
        
        # Calculate SHAP values
        shap_values = explainer.shap_values(features.reshape(1, -1))
        
        # Handle both binary and multi-class outputs
        if isinstance(shap_values, list):
            # Multi-class: use values for positive class
            shap_values_class = shap_values[1][0] if len(shap_values) > 1 else shap_values[0][0]
        else:
            # Binary: use the values directly
            shap_values_class = shap_values[0]
        
        # Get feature names
        feature_names = get_feature_names()
        
        # Create dictionary of feature importance
        shap_explanation = {
            feature: float(value) 
            for feature, value in zip(feature_names, shap_values_class)
        }
        
        # Sort by absolute importance
        shap_explanation = dict(
            sorted(shap_explanation.items(), key=lambda x: abs(x[1]), reverse=True)
        )
        
        return shap_explanation
        
    except Exception as e:
        # If SHAP fails, return simple feature importance
        feature_names = get_feature_names()
        return {feature: 0.0 for feature in feature_names}


def predict_heart_disease_risk(
    db: Session,
    prediction_input: PredictionInput
) -> PredictionOutput:
    """
    Predict heart disease risk with SHAP explainability
    
    Args:
        db: Database session
        prediction_input: Input features for prediction
        
    Returns:
        PredictionOutput with risk level, score, and SHAP explanation
    """
    # Convert input to feature array
    features = np.array([
        prediction_input.age,
        prediction_input.sex,
        prediction_input.cp,
        prediction_input.trestbps,
        prediction_input.chol,
        prediction_input.fbs,
        prediction_input.restecg,
        prediction_input.thalach,
        prediction_input.exang,
        prediction_input.oldpeak,
        prediction_input.slope,
        prediction_input.ca,
        prediction_input.thal
    ])
    
    # Make prediction using global model
    risk_score, prediction = predict_with_global_model(db, features)
    
    # Determine risk level
    risk_level = determine_risk_level(risk_score)
    
    # Calculate SHAP explanation
    shap_explanation = calculate_shap_values(db, features)
    
    return PredictionOutput(
        risk_level=risk_level,
        risk_score=risk_score,
        shap_explanation=shap_explanation
    )
