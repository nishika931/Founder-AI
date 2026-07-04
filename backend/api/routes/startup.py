from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from config.dependencies import get_db
from services.startup_service import (
    get_user_startups,
    delete_startup
)

router = APIRouter(
    prefix="/startup",
    tags=["Startup"]
)


# Get all startup reports of a user
@router.get("/history/{user_id}")
def history(user_id: int, db: Session = Depends(get_db)):

    startups = get_user_startups(db, user_id)

    return startups


# Delete a startup report
@router.delete("/delete/{startup_id}")
def delete(startup_id: int, db: Session = Depends(get_db)):

    startup = delete_startup(db, startup_id)

    if startup is None:
        return {
            "message": "Startup not found"
        }

    return {
        "message": "Startup Deleted Successfully"
    }