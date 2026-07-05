from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from config.dependencies import get_db
from schema.user_schema import UserRegister
from services.auth_service import register_user
from schema.user_schema import UserLogin
from services.auth_service import login_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register(user: UserRegister, db: Session = Depends(get_db)):

    new_user = register_user(db, user)

    if new_user is None:
        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )

    return {
        "message": "User Registered Successfully",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email
        }
    }

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    result = login_user(db, user)

    if result == "EMAIL_NOT_FOUND":
        raise HTTPException(
            status_code=401,
            detail="Email not found"
        )

    if result == "PASSWORD_WRONG":
        raise HTTPException(
            status_code=401,
            detail="Password is incorrect"
        )

    return {
        "message": "Login Successful",
        "user": {
            "id": result.id,
            "name": result.name,
            "email": result.email
        }
    }

