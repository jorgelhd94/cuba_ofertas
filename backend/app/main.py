from fastapi import FastAPI, HTTPException
from app.routers.search.router import search_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.logger import logger
import logging

gunicorn_logger = logging.getLogger('gunicorn.error')
logger.handlers = gunicorn_logger.handlers
if __name__ != "__main__":
    logger.setLevel(gunicorn_logger.level)
else:
    logger.setLevel(logging.DEBUG)


app = FastAPI()

origins = [
    "http://localhost:80", # Dirección de tu aplicación Next.js en desarrollo
    "http://localhost:80", # Dirección de tu aplicación Next.js en producción
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(search_router, prefix="/api/v1")

@app.get("/")
def root():
    return {"Msg": "Bienvenido"}
