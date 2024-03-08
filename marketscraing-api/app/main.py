from fastapi import FastAPI, HTTPException
from app.routers.search.router import search_router

app = FastAPI()

app.include_router(search_router, prefix="/api/v1")

@app.get("/")
def root():
    return {"Msg": "Bienvenido"}
