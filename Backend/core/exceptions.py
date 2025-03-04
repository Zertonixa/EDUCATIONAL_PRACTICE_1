from fastapi import HTTPException


class InternalServerError(HTTPException):
    def __init__(self, detail: str = "Something goes wrong"):
        super().__init__(status_code=500, detail=detail)
