import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from petclinic.database import Base
from petclinic.invoice.models import Invoice  # noqa: F401
from petclinic.pet.models import Pet  # noqa: F401
from petclinic.seed import seed
from petclinic.vet.models import Vet  # noqa: F401
from petclinic.visit.models import Visit  # noqa: F401


@pytest.fixture
def db_session():
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(bind=engine)
    session_local = sessionmaker(bind=engine, autoflush=False, autocommit=False)
    session = session_local()
    seed(session)
    try:
        yield session
    finally:
        session.close()
