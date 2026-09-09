# Backend Architecture Rules

## Tech stack
- Web framework: **FastAPI**
- ORM: **SQLAlchemy** (2.0 declarative style) + **Alembic** for migrations
- Data validation / API schemas: **Pydantic**
- Test framework: **pytest**
- Dependency & project management: **uv** (`pyproject.toml` + `uv.lock`)
- Test database: **SQLite in-memory**

# Packages
- should be split by domain, not layer (we use DDD style)
- inside folder `greenfield-backend` or `brownfield-backend`, use a `src/petclinic/<domain>/` layout for new Python modules (e.g. `src/petclinic/pet/`, `src/petclinic/vet/`)
- each domain package contains its own `models.py` (SQLAlchemy models), `schemas.py` (Pydantic request/response models), `repository.py`, `service.py` and `router.py`

# Backend Coding practices
- as much as possible, functions should be single responsibility. If a function is doing more than one thing, split it into several functions
- for Repository/Service/Router, use method action words such as `find`, `save`, `delete`. Do not use `create` or `remove`
- use type hints on all function signatures (parameters and return type)

# Refactoring
- When refactoring code, you **MUST** update the existing pytest tests to ensure they pass and reflect the changes. Never leave tests in a broken state.
- If the refactoring introduces any new behavior, you **MUST** add new tests to cover it.


## Database
- schema is derived from the SQLAlchemy models; use Alembic migrations to evolve the schema
- when seeding data (e.g. in a `conftest.py` fixture or a seed script), always make sure rows are inserted in the right order, so we do not assign null values into columns which are "not null"
- as of now, only use SQLite in-memory (test environment is enough)

## For SQLAlchemy models
- use SQLAlchemy 2.0 declarative style (`Mapped[...]` / `mapped_column(...)`) with type annotations driving the column type inference
- do not write a custom `__init__` unless enforcing an invariant that Pydantic validation at the API boundary cannot cover; otherwise rely on the keyword-argument constructor SQLAlchemy's declarative base already generates
- avoid passing explicit column types/constraints to `mapped_column()` unless really necessary
- when mapping relationships, do not add `back_populates`, `cascade`, `lazy` etc. unless explicitly needed
- do not use bidirectional relationships (`back_populates` on both sides) unless really needed
- whenever possible, declare the `relationship()` as a list on the "one" side (parent) rather than as a scalar on the "many" side (child)

## For Service classes
- Never implement a service module without a pytest test module covering it

## For Repository classes
- repositories are plain classes wrapping a SQLAlchemy `Session`; no base class or decorator is required
- expose DDD-style methods such as `find_by_id`, `find_by_name`, `save`, `delete`

## For Routers (FastAPI equivalent of Controllers)
- use URL such as /api/v1/ENTITY (eg: /api/v1/pets)
- return Pydantic response models directly from route functions instead of wrapping them in an explicit `Response`/`JSONResponse`, unless really needed
- raise `HTTPException` for error responses

## pytest tests - what to test
- We should have good coverage of tests at the service layer. If business rules are simple, do an Integration test (all the way down to the in-memory SQLite database)
- All complex business rules should be tested with a pure Unit Test (using `unittest.mock` / `pytest-mock`)
- Only test Repository and Router (controller) layers if there is something interesting to test

## pytest tests - Implementation
- All test files should follow the convention `test_<module_name>.py`. For instance, the test for `pet/service.py` should be named `test_pet_service.py`
- function names: should be prefixed with `test_should_` or `test_should_not_`. Example: `test_should_find_pet_by_name`
- inside test functions, use the `given/when/then` structure with a blank line between each section
- when generating an Integration test, use a SQLite in-memory engine (via a pytest fixture) together with FastAPI's `TestClient`
- when generating test data, make sure there is no conflict with the seed data used elsewhere (fixtures / seed script)
