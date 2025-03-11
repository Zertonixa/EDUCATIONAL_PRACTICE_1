from Backend.vacancies.exceptions import InternalServerError, ExternalAPIError, DatabaseError
from fastapi.responses import JSONResponse
from fastapi import Request, FastAPI


async def internal_server_error(request: Request, exc: InternalServerError):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": "Bad request", "message": exc.detail},
    )

async def external_api_error(request: Request, exc: InternalServerError):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": "Api error", "message": exc.detail},
    )

async def database_error(request: Request, exc: InternalServerError):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": "Database error", "message": exc.detail},
    )


def register_exception_handlers(app: FastAPI):
    app.add_exception_handler(InternalServerError, ExternalAPIError, DatabaseError, internal_server_error, external_api_error, database_error)
