from sqlalchemy.orm import Session
from .models import Vacancies
from .schemas import VacancyBaseSchema, VacancySchema
from .service import update_or_insert_vacancy, clean_old_vacancies, get_vacancies
from database import get_db
from fastapi import Depends, HTTPException, status, APIRouter
from typing import List

router = APIRouter(
    prefix="/vacancies",
)

@router.post("/", status_code=status.HTTP_201_CREATED)
async def full_db(payload: VacancyBaseSchema, db: Session = Depends(get_db)):
    try:
        vacancies = get_vacancies(payload.dict())
        
        for vacancy in vacancies:
            update_or_insert_vacancy(vacancy, Vacancies, db)
        
        clean_old_vacancies(vacancies, Vacancies, db)
        
        return {"detail": "updated_success"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"System Error: {str(e)}")

@router.get("/", status_code=status.HTTP_200_OK, response_model=List[VacancySchema])
async def take_vacancies(db: Session = Depends(get_db)) -> List[VacancySchema]:
    vacancies = db.query(Vacancies).all()
    return [VacancySchema(**vacancy.__dict__) for vacancy in vacancies]
