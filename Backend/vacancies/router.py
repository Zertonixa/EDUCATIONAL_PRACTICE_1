from Backend.vacancies.schemas import VacancySchema
from Backend.vacancies.schemas import VacancyBaseSchema
from sqlalchemy.orm import Session
from typing import List
import Backend.vacancies.service as service
from database import get_db
from fastapi import Depends, status, APIRouter

router = APIRouter(
    prefix="/vacancies",
)

@router.post("/", status_code=status.HTTP_201_CREATED)
async def full_db(payload: VacancyBaseSchema, db: Session = Depends(get_db)):
    return await service.full_db(payload=payload,db=db)

@router.get("/", status_code=status.HTTP_200_OK, response_model=List[VacancySchema])
async def take_vacancies(db: Session = Depends(get_db)) -> List[VacancySchema]:
    return await service.get_vacancies(db=db)
