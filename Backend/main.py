from fastapi import FastAPI
from core.schemas.schemas import *

from core.router.router import router as tasks_router

app = FastAPI()
app.include_router(tasks_router)

@app.get("/")
async def home():
    return {"data": "Hello World"}

@app.post("/")
async def add_task(task: STaskAdd):
    return {"data": task}