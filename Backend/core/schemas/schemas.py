from pydantic import BaseModel


class STaskAdd(BaseModel):
    name: str
    description: str | None = None