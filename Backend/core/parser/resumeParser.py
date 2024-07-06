import pip._vendor.requests as requests
import itertools
from bs4 import BeautifulSoup







def resumeParser(keyword = '', params = {"Job_Title": 'Unknow', "Age": 'Unknow', "Salary": 'Unknow', "Status": 'Unknow', "Experience": 'Unknow', "Last_Work": 'Unknow'} ):

    start_url = f"https://hh.ru/search/resume?text={keyword}&pos=full_text&logic=normal&exp_period=all_time&ored_clusters=true&order_by=relevance&search_period=0&hhtmFrom=resume_search_result&hhtmFromLabel=resume_search_line"
    foundedResumes = []

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
                url = f"https://hh.ru/search/resume?text={keyword}&ored_clusters=true&order_by=relevance&search_period=0&logic=normal&pos=full_text&exp_period=all_time&page={i}"
                if url not in urls:
                    urls.append(url)
        except: pass

    for url in urls:
        request = requests.get(url, headers = headers)
        if request.status_code == 200:
            soup = BeautifulSoup(request.content, "lxml")
            divs = soup.find_all("div", attrs = {"data-qa": "resume-serp__resume"})
            for div in divs:

                try: title = div.find("a", attrs = {"data-qa": "serp-item__title"}).text
                except: title = 'Не указано'
                
                try: link = div.find("a", attrs = {"data-qa": "serp-item__title"}).get("href")
                except: link = "Не указано"

                try: experince = div.find("div", attrs = {"data-qa": "resume-serp__resume-excpirience-sum"}).text.replace("\xa0", " ")
                except: experince = "0"

                try: age = div.find("span", attrs = {"data-qa": "resume-serp__resume-age"}).text.replace("\xa0", " ")
                except: age = "0"

                try: salary = div.find("div", attrs = {"class": "bloko-text bloko-text_strong"}).text.replace("\u2009", "").replace("\xa0", " ")
                except: salary = "0"

                try: status = div.find("div", attrs = {"class": "tag--vCYld4yoLU7RpJglYGnV tag_job-search-status-active--WAZ6Sx3vDygvcdzNm06h"}).text
                except: status = "Не указано"  
                    
                try: last_work = div.find("label", attrs = {"class": "trigger--KuxFv37AOoD_kgasIxEA"}).text.replace("\xa0", " ") 
                except: last_work = "Не указано"

                foundedResumes.append({"Job_Title": title, "Age": age, "Salary": salary, "Status": status, "Experience": experince, "Last_Work": last_work,  "Link": "hh.ru/" + link})

        else: break

    for resume in foundedResumes:
        f = True
        for key in dict(itertools.islice(resume.items(), 6)):
            if params[key] == 'Unknow': continue
            else:
                if params[key] in resume[key]: pass
                else: 
                    f = False
                    break
        if f: print(resume)



resumeParser("Инженер", {"Job_Title": 'Unknow', "Age": '54', "Salary": '50000', "Status": 'Unknow', "Experience": 'Unknow', "Last_Work": 'Unknow'})
