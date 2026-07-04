from sqlalchemy import Column, Integer, String, Text, ForeignKey
from config.database import Base


class Startup(Base):
    __tablename__ = "startups"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(200), nullable=False)
    idea = Column(Text, nullable=False)
    industry = Column(String(100), nullable=False)

    user_id = Column(Integer, ForeignKey("users.id"))

    ceo_report = Column(Text)
    market_report = Column(Text)
    finance_report = Column(Text)
    marketing_report = Column(Text)
    tech_report = Column(Text)

    status = Column(String(50), default="Completed")