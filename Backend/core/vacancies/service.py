from typing import List, Type
import pip._vendor.requests as requests
from .models import Vacancies
from sqlalchemy.orm import Session


def update_or_insert_vacancy(vacancy: dict, table: Type[Vacancies], db: Session):
    new_id = vacancy["id"]
    old_vacancy = db.query(table).filter(table.id == new_id).first()

    if old_vacancy is None:
        db.add(table(**vacancy))
    else:
        if old_vacancy.vacancy_id != vacancy["vacancy_id"]:
            for key, value in vacancy.items():
                setattr(old_vacancy, key, value)

    db.commit()


def clean_old_vacancies(
    vacancies: List[Vacancies], table: Type[Vacancies], db: Session
):
    existing_ids = {vacancy["id"] for vacancy in vacancies}
    db.query(table).filter(~table.id.in_(existing_ids)).delete(
        synchronize_session=False
    )
    db.commit()


def get_vacancies(params):
    found_vacancies = []
    id_count = 0

    for i in range(0, 20):
        url = "https://api.hh.ru/vacancies"
        params = params
        params["page"] = i
        params["per_page"] = 100

        headers = {
            "User-Agent": "Google",
        }

        response = requests.get(url, params=params, headers=headers)

        if response.status_code == 200:
            data = response.json()
            vacancies = data.get("items", [])
            for vacancy in vacancies:
                id_count += 1
                vacancy_id = vacancy.get("id")
                vacancy_title = vacancy.get("name")
                vacancy_url = vacancy.get("alternate_url")
                vacancy_has_test = vacancy.get("has_test")
                employment = vacancy.get("employment").get("name")
                vacancy_salary = vacancy.get("salary")
                schedule = vacancy.get("schedule").get("name")
                company_name = vacancy.get("employer", {}).get("name")
                professional_roles = vacancy.get("professional_roles")[0].get("name")
                found_vacancies.append(
                    {
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
                    }
                )
        else:
            break

    return found_vacancies
