from pydantic import BaseModel
from typing import Optional


class VacancyBaseSchema(BaseModel): 
    text: Optional[str] = None
    area: Optional[str] = None
    experience: Optional[str] = None
    employment: Optional[str] = None
    schedule: Optional[str] = None
    salary: Optional[str] = None

    class Config:
        schema_extra = {
            "example": {
            }
        }


class VacancySchema(BaseModel): 
    name: Optional[str] = None
    title: Optional[str] = None
    test: Optional[bool] = None
    url: Optional[str] = None
    salary: Optional[str] = None
    schedule: Optional[str] = None
    employment: Optional[str] = None
    professional_roles: Optional[str] = None

    class Config:
        schema_extra = {
            "example": {
            }
        }