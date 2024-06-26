import pip._vendor.requests as requests
from bs4 import BeautifulSoup

foundedResumes = []

start_url = "https://hh.ru/search/resume"

def resumeParser():
    urls = []
    urls.append(start_url)
    headers = {"User-Agent": "Chrome"}

    session = requests.Session()
    request = session.get(start_url, headers = headers)
    
    if request.status_code == 200:
        soup = BeautifulSoup(request.content, "lxml")

        try:
            pages = soup.find_all('a', attrs={"data-qa": "pager-page"})
            count_pages = int(pages[-1].text)
            for i in range(count_pages):
                url = f"https://hh.ru/search/resume?page={i}"
                if url not in urls:
                    urls.append(url)
        except: pass

    for url in urls:
        request = requests.get(url, headers = headers)
        soup = BeautifulSoup(request.content, "lxml")
        divs = soup.find_all("div", attrs = {"data-qa": "resume-serp__resume"})
        for div in divs:
            try:
                title = div.find("a", attrs = {"data-qa": "serp-item__title"}).text
                age = div.find("span", attrs = {"data-qa": "resume-serp__resume-age"}).text
                salary = div.find("div", attrs = {"class": "bloko-text bloko-text_strong"}).text
                status = div.find("div", attrs = {"class": "tag--vCYld4yoLU7RpJglYGnV tag_job-search-status-active--WAZ6Sx3vDygvcdzNm06h"}).text
                experince = div.find("div", attrs = {"data-qa": "resume-serp__resume-excpirience-sum"}).text
                last_work = div.find("label", attrs = {"class": "trigger--KuxFv37AOoD_kgasIxEA"}).text
                foundedResumes.append({"Job_Tittle": title, "Age": age.replace("\xa0", " "), "Salary": salary.replace("\u2009", "").replace("\xa0", " "), "Status": status, "Experience": experince.replace("\xa0", " "), "Last_Work": last_work.replace("\xa0", " ")})
            except: pass

    for resume in foundedResumes:
        print('----------')
        print(f'Резюме номер {foundedResumes.index(resume)}')
        for key in resume:
            print(f"{key}: {resume[key]}")
        print('----------')

resumeParser()

