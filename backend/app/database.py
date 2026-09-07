import os
import time
import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from dotenv import load_dotenv

# Load environment variables from .env if present
load_dotenv()

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Fetch Database URL from environment
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:postgres123@postgres:5432/login_db"
)

# Create SQLAlchemy engine
engine = create_engine(DATABASE_URL)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Declarative Base for ORM models
Base = declarative_base()


def get_db():
    """
    Dependency that yields a database session for each request
    and ensures the session is closed afterward."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db(max_retries: int = 10, retry_interval: int = 2):
    """
    Initializes the database tables with automatic connection retry logic.
    This ensures the backend smoothly handles PostgreSQL startup delays.
    """
    for attempt in range(1, max_retries + 1):
        try:
            logger.info(f"Connecting to database (Attempt {attempt}/{max_retries})...")
            # Attempt connection and table creation
            Base.metadata.create_all(bind=engine)
            logger.info("Successfully connected to PostgreSQL and initialized tables!")
            return
        except Exception as e:
            logger.warning(f"Database connection failed: {e}")
            if attempt < max_retries:
                logger.info(f"Retrying in {retry_interval} seconds...")
                time.sleep(retry_interval)
            else:
                logger.error("Could not connect to PostgreSQL after multiple attempts.")
                raise e
