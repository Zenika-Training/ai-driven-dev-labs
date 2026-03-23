import pytest_asyncio
from tortoise import Tortoise


@pytest_asyncio.fixture(scope="function")
async def db_setup():
    await Tortoise.init(
        db_url="sqlite://:memory:",
        modules={"models": []},
    )

    yield

    await Tortoise.close_connections()
