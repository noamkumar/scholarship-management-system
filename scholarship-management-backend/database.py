import os

from dotenv import load_dotenv
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import create_engine


# Load variables from .env
load_dotenv()


# Get database URL from .env
db_url = os.getenv(
    "DATABASE_URL",
    "sqlite:///./scholarship_db.db"
)


# Create database engine
engine = create_engine(
    db_url,
    connect_args={
        "check_same_thread": False
    }
)


# Create database session
SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False
)


# Base class for models
Base = declarative_base()