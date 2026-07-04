from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from config.dependencies import get_db
from services.startup_service import save_startup
from graph.workflow import startup_graph

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


class StartupIdea(BaseModel):
    title: str
    idea: str
    industry: str
    user_id: int


@router.post("/generate")
def generate(
    data: StartupIdea,
    db: Session = Depends(get_db)
):

    reports = startup_graph.invoke({
        "title": data.title,
        "idea": data.idea,
        "industry": data.industry
    })

    startup = save_startup(
        db=db,
        data=data,
        reports=reports
    )

    return {
        "message": "AI Report Generated Successfully",
        "startup_id": startup.id,

        "ceo": startup.ceo_report,
        "market": startup.market_report,
        "finance": startup.finance_report,
        "marketing": startup.marketing_report,
        "technology": startup.tech_report
    }