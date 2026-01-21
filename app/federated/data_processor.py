"""
Data processing and validation for federated learning
"""
import pandas as pd
from io import StringIO
from fastapi import HTTPException
from typing import Tuple, List


def get_required_columns() -> List[str]:
    """
    Get list of required columns for heart disease dataset
    
    Returns:
        List of required column names
    """
    return [
        'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg',
        'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal', 'target'
    ]


def get_feature_names() -> List[str]:
    """
    Get the list of feature names for the model (without target)
    
    Returns:
        List of feature column names
    """
    return [
        'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg',
        'thalach', 'exang', 'oldpeak', 'slope', 'ca', 'thal'
    ]


def validate_and_parse_csv(csv_data: str) -> Tuple[pd.DataFrame, pd.Series]:
    """
    Validate and parse CSV data for training
    
    Args:
        csv_data: CSV content as string
        
    Returns:
        Tuple of (features DataFrame, target Series)
        
    Raises:
        ValueError: If data validation fails
    """
    # Parse CSV data
    df = pd.read_csv(StringIO(csv_data))
    
    # Validate required columns
    required_columns = get_required_columns()
    missing_columns = [col for col in required_columns if col not in df.columns]
    if missing_columns:
        raise ValueError(f"Missing required columns: {missing_columns}")
    
    # Validate minimum sample size
    num_samples = len(df)
    if num_samples < 10:
        raise ValueError("Dataset must contain at least 10 samples")
    
    # Prepare features and target
    feature_cols = get_feature_names()
    X = df[feature_cols]
    y = df['target']
    
    return X, y
