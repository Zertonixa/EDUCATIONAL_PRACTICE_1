import pip._vendor.requests as requests


def get_vacancies():

    found_vacancies = []

    for i in range(0,20):
        url = "https://api.hh.ru/vacancies"
        params = {
            "page": i,
            "area": 1,  
            "per_page": 100,
        }
        headers = {
            "User-Agent": "Google",
        }

        response = requests.get(url, params=params, headers=headers)



        if response.status_code == 200:
            data = response.json()
            vacancies = data.get("items", [])
            for vacancy in vacancies:
                vacancy_id = vacancy.get("id")
                vacancy_title = vacancy.get("name")
                vacancy_url = vacancy.get("alternate_url")
                company_name = vacancy.get("employer", {}).get("name")
                found_vacancies.append({"ID": vacancy_id, "Title": vacancy_title, "Url": vacancy_url, "Name": company_name})
        else:
            break

    if len(found_vacancies) > 0:
        for vacancy in found_vacancies:
            print(f'Вакансия номер: {found_vacancies.index(vacancy)}')
            for key in vacancy:
                print(f'{key}: {vacancy[key]}')



get_vacancies()
