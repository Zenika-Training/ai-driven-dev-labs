import pytest
from httpx import AsyncClient, ASGITransport
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from src.main.database import Base, get_session
from src.main.data_init import seed_data

import src.main.vet.vet  # noqa: F401
import src.main.pet.pet  # noqa: F401
import src.main.visit.visit  # noqa: F401
import src.main.invoice.invoice  # noqa: F401

TEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"

test_engine = create_async_engine(TEST_DATABASE_URL)
test_session_factory = async_sessionmaker(test_engine, expire_on_commit=False)


@pytest.fixture
async def session() -> AsyncSession:
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    async with test_session_factory() as s:
        await seed_data(s)
        yield s
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


@pytest.fixture
async def client(session: AsyncSession) -> AsyncClient:
    from src.main.app import app

    async def override_get_session():
        yield session

    app.dependency_overrides[get_session] = override_get_session

    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as c:
        yield c

    app.dependency_overrides.clear()
