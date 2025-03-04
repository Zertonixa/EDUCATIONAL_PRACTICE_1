from core.exceptions import InternalServerError
from fastapi.responses import JSONResponse
from fastapi import Request, FastAPI


async def internal_server_error(request: Request, exc: InternalServerError):
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": "Bad request", "message": exc.detail},
    )


def register_exception_handlers(app: FastAPI):
    app.add_exception_handler(InternalServerError, internal_server_error)
