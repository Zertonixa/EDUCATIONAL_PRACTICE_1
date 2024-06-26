import pip._vendor.requests as requests


def get_vacancies(keyword):

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






def get_resumes(keyword):

    found_resumes = []

    for i in range(0,20):
        url = "https://api.hh.ru/resumes/321"
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
            resumes = data.get("items", [])
            for resume in resumes:
                resume_id = resume.get("id")
                resume_title = resume.get("name")
                resume_experience = resume.get("experience")
                resume_url = resume.get("alternate_url")
                first_name = resume.get("first_name")
                last_name = resume.get("last_name")
                middle_name = resume.get("middle_name")
                found_resumes.append({"ID": resume_id, "Title": resume_title, "Url": resume_url,
                                       "FirstName": first_name | "Не указано", "LastName": last_name | "Не указано",
                                       "MiddleName": middle_name | "Не указано", "Experince": resume_experience})
        else:
            print(response.json())
            break

    if len(found_resumes) > 0:
        for resume in found_resumes:
            print(f'Вакансия номер: {found_resumes.index(resume)}')
            for key in resume:
                print(f'{key}: {resume[key]}')

get_resumes('sad')