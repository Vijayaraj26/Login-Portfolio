from fastapi import APIRouter, Depends
from app.auth import get_current_user
from app.models import User
from app.schemas import UserOut

router = APIRouter(prefix="/api/users", tags=["Users"])


@router.get("/me", response_model=UserOut)
def read_current_user(current_user: User = Depends(get_current_user)):
    """
    Returns the currently authenticated user's profile information.
    Protected by JWT Bearer token authentication.
    Does NOT return password or password hash.
    """
    return current_user
