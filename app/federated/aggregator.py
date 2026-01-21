"""
Federated averaging (FedAvg) aggregation logic
"""
import pickle
from sqlalchemy.orm import Session
from fastapi import HTTPException

from app.models import ModelContribution, GlobalModel


def federated_averaging(db: Session) -> GlobalModel:
    """
    Implement FedAvg aggregation algorithm
    
    Aggregates model weights from all hospital contributions
    weighted by number of samples
    
    Args:
        db: Database session
        
    Returns:
        GlobalModel instance
        
    Raises:
        HTTPException: If no contributions available
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
