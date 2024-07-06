import sqlalchemy as sa
from .base import Base



class Vacancies(Base):
    __tablename__ = "vacancies"

    id = sa.Column(sa.Integer, primary_key = True)
    vacancy_id = sa.Column(sa.Integer)
    name = sa.Column(sa.String)
    title = sa.Column(sa.String)
    test = sa.Column(sa.String)
    url = sa.Column(sa.String)
    employment = sa.Column(sa.String)
    salary = sa.Column(sa.String)
    schedule = sa.Column(sa.String)
    professional_roles = sa.Column(sa.String)
