import asyncio
import time

from fastapi import APIRouter


router = APIRouter(
    prefix = "/tasks",
    tags = ["HA"]
)


@router.get("/terrible-post")
async def terryble_post():
    time.sleep(10)

    return {"pong: true"}