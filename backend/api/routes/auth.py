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

    old_user = login_user(db, user)

    if old_user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid Email or Password"
        )

    return {
        "message": "Login Successful",
        "user": {
            "id": old_user.id,
            "name": old_user.name,
            "email": old_user.email
        }
    }