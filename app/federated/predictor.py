"""
Global model prediction logic
"""
import pickle
import numpy as np
from sqlalchemy.orm import Session
from fastapi import HTTPException
from typing import Tuple

from app.models import GlobalModel


def predict_with_global_model(db: Session, features: np.ndarray) -> Tuple[float, int]:
    """
    Make prediction using the global federated model
    
    Args:
        db: Database session
        features: Feature array for prediction
        
    Returns:
        Tuple of (probability, prediction)
        
    Raises:
        HTTPException: If no global model is available
    """
    # Get latest global model
    global_model = db.query(GlobalModel).order_by(GlobalModel.version.desc()).first()
    
    if not global_model:
        raise HTTPException(
            status_code=404,
            detail="No global model available. Please train and aggregate models first."
        )
    
    # Load aggregated model
    aggregated_data = pickle.loads(global_model.model_data)
    models = aggregated_data['models']
    weights = aggregated_data['weights']
    
    # Weighted ensemble prediction
    weighted_probs = []
    for model, weight in zip(models, weights):
        prob = model.predict_proba(features.reshape(1, -1))[0]
        weighted_probs.append(prob * weight)
    
    # Sum weighted probabilities
    final_prob = np.sum(weighted_probs, axis=0)
    
    # Get prediction and probability for positive class
    prediction = np.argmax(final_prob)
    probability = final_prob[1] if len(final_prob) > 1 else final_prob[0]
    
    return float(probability), int(prediction)
