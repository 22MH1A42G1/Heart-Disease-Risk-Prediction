"""
Backward compatibility shim for federated learning module

This file maintains backward compatibility by re-exporting the refactored
federated learning components from the new modular structure.
"""

# Re-export all public functions from the modular structure
from app.federated.local_trainer import train_local_model
from app.federated.aggregator import federated_averaging
from app.federated.predictor import predict_with_global_model
from app.federated.data_processor import get_feature_names

__all__ = [
    'train_local_model',
    'federated_averaging',
    'predict_with_global_model',
    'get_feature_names',
]
