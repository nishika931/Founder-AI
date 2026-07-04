from fastapi import FastAPI

from config.database import Base, engine
from models.user import User
from models.startup import Startup
from api.routes.auth import router as auth_router
from api.routes.startup import router as startup_router
from api.routes.ai import router as ai_router
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Startup_AI",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Welcome to Startup AI"
    }

app.include_router(auth_router)
app.include_router(startup_router)
app.include_router(ai_router)