from fastapi import FastAPI
from core.database.session import engine
from core.models import vacancies

from core.router.vacancies import router as tasks_router

vacancies.Base.metadata.create_all(bind = engine)

app = FastAPI()

app.include_router(tasks_router)

@app.get("/")
async def home():
    return {"data": "Hello World"}

