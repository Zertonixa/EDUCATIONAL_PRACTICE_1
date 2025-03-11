from fastapi import HTTPException, status


class InternalServerError(HTTPException):
    def __init__(self, detail="Internal Server Error"):
        super().__init__(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=detail)

class DatabaseError(HTTPException):
    def __init__(self, detail="Database Error"):
        super().__init__(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=detail)

class ExternalAPIError(HTTPException):
    def __init__(self, detail="Failed to fetch data from external API"):
        super().__init__(status_code=status.HTTP_502_BAD_GATEWAY, detail=detail)