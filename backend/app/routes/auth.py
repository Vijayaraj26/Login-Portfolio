import logging
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User
from app.schemas import UserSignup, UserLogin, Token, MessageResponse
from app.auth import hash_password, verify_password, create_access_token

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post("/signup", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
def signup(user_data: UserSignup, db: Session = Depends(get_db)):
    """
    Registers a new user in the PostgreSQL database.
    - Validates username uniqueness
    - Hashes password with bcrypt
    - Never stores plain passwords
    """
    logger.info(f"Signup request received for username: '{user_data.username.strip()}'")
    
    # Check if username already exists
    logger.info("Checking if username already exists in database...")
    existing_user = db.query(User).filter(User.username == user_data.username.strip()).first()
    if existing_user:
        logger.warning(f"Signup rejected: Username '{user_data.username.strip()}' already exists")
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Username already exists"
        )

    # Hash the password
    hashed_pwd = hash_password(user_data.password)

    # Create and persist user in DB
    new_user = User(
        username=user_data.username.strip(),
        password_hash=hashed_pwd
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    logger.info(f"User '{new_user.username}' created successfully (ID: {new_user.id})")
    logger.info("Database commit successful")

    return MessageResponse(
        message="User registered successfully",
        username=new_user.username
    )


@router.post("/login", response_model=Token)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    """
    Authenticates a user and returns a JWT access token.
    - Finds user by username
    - Verifies password against stored bcrypt hash
    - Returns JWT token and username on success
    """
    logger.info(f"Login request received for username: '{credentials.username.strip()}'")
    
    user = db.query(User).filter(User.username == credentials.username.strip()).first()

    if not user:
        logger.warning(f"Login failed: User '{credentials.username.strip()}' not found in database")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    logger.info(f"User found in database: '{user.username}'")
    is_valid_password = verify_password(credentials.password, user.password_hash)
    logger.info(f"Password verification result: {'SUCCESS' if is_valid_password else 'FAILED'}")

    if not is_valid_password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Generate JWT token
    access_token = create_access_token(data={"sub": user.username})
    logger.info(f"JWT generated successfully for user '{user.username}'")

    return Token(
        access_token=access_token,
        token_type="bearer",
        username=user.username
    )
