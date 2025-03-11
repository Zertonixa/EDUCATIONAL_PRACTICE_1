from typing import List, Type
from sqlalchemy.exc import SQLAlchemyError
import pip._vendor.requests as requests
from pip._vendor.requests.exceptions import RequestException
from Backend.vacancies.exceptions import ExternalAPIError, InternalServerError, DatabaseError
from Backend.vacancies.models import Vacancies
from Backend.vacancies.schemas import VacancyBaseSchema, VacancySchema
from sqlalchemy.orm import Session


def update_or_insert_vacancy(vacancy: dict, table: Type[Vacancies], db: Session):
    try:
        new_id = vacancy["id"]
        old_vacancy = db.query(table).filter(table.id == new_id).first()

        if old_vacancy is None:
            db.add(table(**vacancy))
        else:
            if old_vacancy.vacancy_id != vacancy["vacancy_id"]:
                for key, value in vacancy.items():
                    setattr(old_vacancy, key, value)

        db.flush()
    except SQLAlchemyError as e:
        db.rollback()
        raise DatabaseError(detail=f"Database operation failed: {str(e)}")


def clean_old_vacancies(vacancies: List[Vacancies], table: Type[Vacancies], db: Session):
    try:
        existing_ids = {vacancy["id"] for vacancy in vacancies}
        db.query(table).filter(~table.id.in_(existing_ids)).delete(synchronize_session=False)
        db.flush()
    except SQLAlchemyError as e:
        db.rollback()
        raise DatabaseError(detail=f"Error cleaning old vacancies: {str(e)}")

def get_vacancies(params):
    found_vacancies = []
    id_count = 0

    for i in range(0, 20):
        url = "https://api.hh.ru/vacancies"
        params = params.copy()
        params["page"] = i
        params["per_page"] = 100

        headers = {
            "User-Agent": "Google",
        }

        try:
            response = requests.get(url, params=params, headers=headers)
            response.raise_for_status()
        except RequestException as e:
            raise ExternalAPIError(detail=f"Request failed: {str(e)}")

        data = response.json()
        vacancies = data.get("items", [])
        if not vacancies:
            break

        for vacancy in vacancies:
            try:
                id_count += 1
                vacancy_id = vacancy.get("id")
                vacancy_title = vacancy.get("name", "Unknown")
                vacancy_url = vacancy.get("alternate_url", "")
                vacancy_has_test = vacancy.get("has_test", False)
                employment = vacancy.get("employment", {}).get("name", "Unknown")
                vacancy_salary = vacancy.get("salary", "Not specified")
                schedule = vacancy.get("schedule", {}).get("name", "Unknown")
                company_name = vacancy.get("employer", {}).get("name", "Unknown")
                professional_roles = vacancy.get("professional_roles", [{}])[0].get("name", "Unknown")

                found_vacancies.append({
                    "id": id_count,
                    "vacancy_id": vacancy_id,
                    "title": vacancy_title.replace('"', "'"),
                    "url": vacancy_url,
                    "name": company_name,
                    "employment": employment,
                    "test": str(vacancy_has_test),
                    "salary": str(vacancy_salary),
                    "schedule": schedule,
                    "professional_roles": professional_roles,
                })
            except Exception as e:
                raise ValueError(f"Data processing error: {str(e)}")

    return found_vacancies



def full_db(payload: VacancyBaseSchema, db: Session):
    vacancies = get_vacancies(payload.dict())

    for vacancy in vacancies:
        update_or_insert_vacancy(vacancy, Vacancies, db)

    clean_old_vacancies(vacancies, Vacancies, db)

def take_vacancies(db: Session):
    vacancies = db.query(Vacancies).all()
    return [VacancySchema(**vacancy.__dict__) for vacancy in vacancies]