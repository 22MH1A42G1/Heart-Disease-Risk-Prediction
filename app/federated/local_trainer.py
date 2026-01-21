"""
Local model training for federated learning
"""
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from fastapi import HTTPException
from typing import Tuple

from app.federated.data_processor import validate_and_parse_csv


def train_local_model(csv_data: str) -> Tuple[dict, int]:
    """
    Train a local Random Forest model on hospital's CSV data
    
    Args:
        csv_data: CSV content as string
        
    Returns:
        Tuple of (model_weights_dict, num_samples)
        
    Raises:
        HTTPException: If training fails
    """
    try:
        # Validate and parse CSV data
        X, y = validate_and_parse_csv(csv_data)
        num_samples = len(X)
        
        # Train model
        model = RandomForestClassifier(
            n_estimators=100,
            max_depth=10,
            random_state=42,
            n_jobs=-1
        )
        model.fit(X, y)
        
        # Extract model weights (tree structures and feature importances)
        # For Random Forest, we store the entire model as weights
        model_weights = {
            'model': model,
            'feature_names': list(X.columns),
            'n_samples': num_samples
        }
        
        return model_weights, num_samples
        
    except ValueError as e:
        raise HTTPException(
            status_code=400,
            detail=f"Data validation error: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Error training model: {str(e)}"
        )
