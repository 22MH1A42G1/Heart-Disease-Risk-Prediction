"""
Database models for the application
"""
from sqlalchemy import Column, Integer, String, ForeignKey, LargeBinary, DateTime, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class Doctor(Base):
    """
    Doctor model - represents a doctor who belongs to a hospital
    """
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    hospital_name = Column(String, nullable=False, index=True)
    doctor_name = Column(String, nullable=False)
    license_id = Column(String, unique=True, nullable=False, index=True)
    email = Column(String, unique=True, nullable=False, index=True)
    hashed_password = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationship to model contributions
    model_contributions = relationship("ModelContribution", back_populates="doctor")


class ModelContribution(Base):
    """
    Model contribution - stores model weights from each hospital
    """
    __tablename__ = "model_contributions"

    id = Column(Integer, primary_key=True, index=True)
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    hospital_name = Column(String, nullable=False, index=True)
    model_weights = Column(LargeBinary, nullable=False)  # Pickled model weights
    num_samples = Column(Integer, nullable=False)  # Number of samples used for training
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationship
    doctor = relationship("Doctor", back_populates="model_contributions")


class GlobalModel(Base):
    """
    Global model - stores the aggregated federated model
    """
    __tablename__ = "global_models"

    id = Column(Integer, primary_key=True, index=True)
    model_data = Column(LargeBinary, nullable=False)  # Pickled model
    version = Column(Integer, nullable=False)
    num_contributions = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
