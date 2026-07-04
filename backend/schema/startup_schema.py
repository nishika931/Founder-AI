from pydantic import BaseModel


class StartupCreate(BaseModel):
    title: str
    idea: str
    industry: str
    user_id: int