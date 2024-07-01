import pip._vendor.requests as requests


def get_vacancies(params):

    found_vacancies = []

    id_count = 0


    for i in range(0,20):

        url = "https://api.hh.ru/vacancies"
        params = params
        params['page'] = i
        params['per_page'] = 100

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
                found_vacancies.append({"id": id_count, 'vacancy_id': vacancy_id, "title": vacancy_title.replace('"', "'"), "url": vacancy_url, "name": company_name,
                                         "employment": employment, "test": vacancy_has_test, "salary": str(vacancy_salary),
                                         "schedule": schedule, "professional_roles": professional_roles})
        else:
            break

    return found_vacancies



