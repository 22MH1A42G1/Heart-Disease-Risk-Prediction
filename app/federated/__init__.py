"""
Federated Learning Module

This module provides modular components for federated learning:
- data_processor: Data validation and preprocessing
- local_trainer: Local model training
- aggregator: FedAvg aggregation
- predictor: Global model prediction
"""

# Public API exports
from app.federated.data_processor import get_feature_names
from app.federated.local_trainer import train_local_model
from app.federated.aggregator import federated_averaging
from app.federated.predictor import predict_with_global_model

__all__ = [
    'get_feature_names',
    'train_local_model',
    'federated_averaging',
    'predict_with_global_model',
]
