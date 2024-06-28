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


@router.post("/take-vacancies", status_code=status.HTTP_200_OK)
async def take_vacancies(payload: vsschema.VacancySchema, db: Session = Depends(get_db)):
    params = payload.dict()
    filtred_params = {x: result for x, result in params.items() if result != None}
    if len(filtred_params) > 0: 
        result = db.execute(f'SELECT * FROM vacancies WHERE {list(filtred_params.keys())[0]} = "{filtred_params[list(filtred_params.keys())[0]]}"').fetchall()
        if len(filtred_params) > 1:
            for vacancy in result[::-1]:
                for key in filtred_params:
                    if vacancy[key] != filtred_params[key]:
                        result.remove(vacancy)
                        break


    else: result = db.query(vcmodel.Vacancies)
    return result[::]