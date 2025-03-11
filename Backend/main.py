from fastapi import FastAPI
from database import engine, Base
from fastapi.middleware.cors import CORSMiddleware
from Backend.vacancies.router import router as tasks_router
from Backend.vacancies.error_handlers import register_exception_handlers

Base.metadata.create_all(bind = engine)

app = FastAPI()

register_exception_handlers(app)

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