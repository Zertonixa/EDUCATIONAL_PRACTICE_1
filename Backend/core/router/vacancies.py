from core.models import vacancies as vcmodel
from sqlalchemy.orm import Session
from core.schemas import vacancies as vsschema
from vacancyParser import get_vacancies
from core.database.session import get_db
from sqlalchemy import and_


from fastapi import Depends, HTTPException, status, APIRouter, Response



router = APIRouter(
    prefix = "/vacancies",
)


@router.post("/update_db", status_code=status.HTTP_201_CREATED)
async def full_db( payload: vsschema.VacancyBaseSchema, db: Session = Depends(get_db)):
    vacancies = get_vacancies(payload.dict()) #Результат парсинга
    for vacancy in vacancies:
        new_id = vacancy['id'] #Новый id по которому сравниваем строку с новым значением
        old_vacancy_id = db.execute(f"SELECT vacancy_id FROM vacancies WHERE id = {new_id}").fetchone() #Старое значение id вакансии для провереи на наличие и совпадение с текущим значеним
        if old_vacancy_id == None: #Проверка на наличие строки  бд
            db.add(vcmodel.Vacancies(**vacancy)) #Если строки нет, добваляем новую
            db.commit()
        else: #Если есть - сравниваем id вакансий на совпадение
            if int(old_vacancy_id[0]) != int(vacancy['vacancy_id']): #При совпадении меняем значение строки
                for key in vacancy:
                    db.execute(f'UPDATE vacancies SET {key} = "{vacancy[key]}" WHERE id = {new_id}')
                db.commit()
    return('updated_success')


@router.get("/take-vacancies", status_code=status.HTTP_200_OK)
async def take_vacancies( db: Session = Depends(get_db)):
    return db.query(vcmodel.Vacancies)[::]


