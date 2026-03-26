import pytest_asyncio
from tortoise import Tortoise

from src.models.pet import Pet


@pytest_asyncio.fixture(scope="function")
async def db_setup():
    await Tortoise.init(
        db_url="sqlite://:memory:",
        modules={"models": ["src.models.pet"]},
    )
    await Tortoise.generate_schemas()

    await Pet.create(name="Buddy", owner_name="Alice")
    await Pet.create(name="Whiskers", owner_name="Bob")
    await Pet.create(name="Max", owner_name="Alice")

    yield

    await Tortoise.close_connections()
