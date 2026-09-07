from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, ConfigDict


class UserSignup(BaseModel):
    username: str = Field(..., min_length=1, max_length=50, description="Unique username")
    password: str = Field(..., min_length=1, max_length=128, description="Plain text password")


class UserLogin(BaseModel):
    username: str = Field(..., min_length=1, description="Username")
    password: str = Field(..., min_length=1, description="Password")


class UserOut(BaseModel):
    id: int
    username: str
    created_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    username: str


class TokenData(BaseModel):
    username: Optional[str] = None


class MessageResponse(BaseModel):
    message: str
    username: Optional[str] = None


class HealthResponse(BaseModel):
    status: str
