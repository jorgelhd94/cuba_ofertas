from fastapi import FastAPI, HTTPException
from app.routers.search.router import search_router
from fastapi.logger import logger
import logging

gunicorn_logger = logging.getLogger('gunicorn.error')
logger.handlers = gunicorn_logger.handlers
if __name__ != "__main__":
    logger.setLevel(gunicorn_logger.level)
else:
    logger.setLevel(logging.DEBUG)

app = FastAPI()

app.include_router(search_router, prefix="/api/v1")

@app.get("/")
def root():
    return {"Msg": "Bienvenido"}
