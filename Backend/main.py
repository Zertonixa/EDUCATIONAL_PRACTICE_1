from fastapi import FastAPI
from core.database.session import engine
from core.models import vacancies
from fastapi.middleware.cors import CORSMiddleware

from core.router.vacancies import router as tasks_router

vacancies.Base.metadata.create_all(bind = engine)

app = FastAPI()

app.include_router(tasks_router)

@app.get("/")
async def home():
    return {"data": "Hello World"}

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)