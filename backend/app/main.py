from contextlib import asynccontextmanager
from fastapi import FastAPI
from app.routers.search.router import search_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.logger import logger
from sqlmodel import Session
from app.models.models import Hero, Team
from app.models.db import engine, create_db_and_tables
import logging

# Logging
gunicorn_logger = logging.getLogger('gunicorn.error')
logger.handlers = gunicorn_logger.handlers
if __name__ != "__main__":
    logger.setLevel(gunicorn_logger.level)
else:
    logger.setLevel(logging.DEBUG)

# Database
def create_heroes():
    with Session(engine) as session:
        team_z_force = Team(name="Z-Force", headquarters="Sister Margaret's Bar")

        hero_deadpond = Hero(
            name="Deadpond", secret_name="Dive Wilson", team=team_z_force
        )
        session.add(hero_deadpond)
        session.commit()

        session.refresh(hero_deadpond)

        print("Created hero:", hero_deadpond)
        print("Hero's team:", hero_deadpond.team)

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    create_heroes()
    yield
    pass

# Initialize APP
app = FastAPI(lifespan=lifespan)

# CORS Support
origins = [
    "*",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(search_router, prefix="/api/v1")


# Main App
@app.get("/")
def root():
    return {"Msg": "Bienvenido"}
