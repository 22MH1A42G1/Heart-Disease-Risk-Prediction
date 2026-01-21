"""
Federated Learning implementation with FedAvg aggregation
"""
import pickle
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from typing import List, Tuple
from io import StringIO
from sqlalchemy.orm import Session
from fastapi import UploadFile, HTTPException

from app.models import ModelContribution, GlobalModel


def train_local_model(csv_data: str) -> Tuple[dict, int]:
    """
    Train a local Random Forest model on hospital's CSV data
    
    Args:
        csv_data: CSV content as string
        
    Returns:
        Tuple of (model_weights_dict, num_samples)
    """
    try:
        # Parse CSV data
        df = pd.read_csv(StringIO(csv_data))
        
        # Validate required columns
        required_columns = [
            'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg',
            'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal', 'target'
        ]
        
        missing_columns = [col for col in required_columns if col not in df.columns]
        if missing_columns:
            raise ValueError(f"Missing required columns: {missing_columns}")
        
        # Prepare features and target
        X = df[required_columns[:-1]]  # All columns except 'target'
        y = df['target']
        
        num_samples = len(df)
        
        if num_samples < 10:
            raise ValueError("Dataset must contain at least 10 samples")
        
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
        
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=f"Error training model: {str(e)}"
        )


def federated_averaging(db: Session) -> GlobalModel:
    """
    Implement FedAvg aggregation algorithm
    
    Aggregates model weights from all hospital contributions
    weighted by number of samples
    
    Args:
        db: Database session
        
    Returns:
        GlobalModel instance
    """
    # Get all model contributions
    contributions = db.query(ModelContribution).all()
    
    if not contributions:
        raise HTTPException(
            status_code=400,
            detail="No model contributions available for aggregation"
        )
    
    # Load all models and their sample counts
    models = []
    sample_counts = []
    
    for contrib in contributions:
        model_data = pickle.loads(contrib.model_weights)
        models.append(model_data['model'])
        sample_counts.append(contrib.num_samples)
    
    total_samples = sum(sample_counts)
    
    # FedAvg: weighted average of Random Forest models
    # For Random Forest, we'll create an ensemble that weights predictions
    aggregated_model = {
        'models': models,
        'weights': [n / total_samples for n in sample_counts],
        'num_contributions': len(contributions),
        'total_samples': total_samples
    }
    
    # Get the latest version number
    latest_model = db.query(GlobalModel).order_by(GlobalModel.version.desc()).first()
    new_version = (latest_model.version + 1) if latest_model else 1
    
    # Create new global model
    global_model = GlobalModel(
        model_data=pickle.dumps(aggregated_model),
        version=new_version,
        num_contributions=len(contributions)
    )
    
    db.add(global_model)
    db.commit()
    db.refresh(global_model)
    
    return global_model


def predict_with_global_model(db: Session, features: np.ndarray) -> Tuple[float, int]:
    """
    Make prediction using the global federated model
    
    Args:
        db: Database session
        features: Feature array for prediction
        
    Returns:
        Tuple of (probability, prediction)
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


def get_feature_names() -> List[str]:
    """
    Get the list of feature names for the model
    """
    return [
        'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg',
        'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'
    ]
