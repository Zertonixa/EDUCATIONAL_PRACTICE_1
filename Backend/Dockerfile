FROM python:3.11

COPY . .

WORKDIR .

RUN pip install -r requirements.txt

EXPOSE 8000

CMD gunicorn -k uvicorn.workers.UvicornWorker main:app --bind=0.0.0.0:8000