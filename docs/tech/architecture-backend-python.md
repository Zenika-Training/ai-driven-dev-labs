# Backend Architecture Rules (Python/FastAPI)

# Packages
- Source code must live under `src`.
- Split code by layer: `repositories`, `services`, `routers`, `models`, `schemas`.
- Keep clear naming so each feature has matching files across layers when needed.
- Example structure:
  - `src/repositories/pet_repository.py`
  - `src/services/pet_service.py`
  - `src/routers/pet_router.py`
  - `src/models/pet.py`
  - `src/schemas/pet_response.py`

# Backend Coding Practices
- For repository/service/router methods, use action words such as `find`, `save`, and `delete`. Do not use `create` or `remove` in method names.
- Keep routers thin: validate request data, call service methods, return response models.
- Keep business rules in service layer, not in router or repository.
- Keep data access in repository layer only.
- Use snake_case for file names, functions, variables, and module-level constants.

# Dependency Management
- Configure dependencies directly inside files with FastAPI `Depends` where needed.
- Do NOT use a dedicated dependency file such as `dependencies.py`.
- Keep dependency wiring close to the router or service where it is used.


# Database
- By default, application should use an in-memory database with aiosqlite. Create test data accordingly
- Always populate data in the right order so not-null and foreign key constraints are respected.

# Repository
- Repository methods should focus on persistence concerns only.
- Keep repository methods small and explicit (`find_*`, `save_*`, `delete_*`).
- Do not place business validations in repository methods.

# Service
- for write operations, transactions should use @atomic in the service layer
- service functions should return objects mapped with pydantic schema
- there should be no HttpException raised in the service layer. Service layer should raise business exception, which are then transformed into HttpExceptions in the routers layer

# Routers (Controllers)
- Use URLs such as `/api/v1/<entity>` (example: `/api/v1/pet`).
- Prefer FastAPI `response_model` declarations over manual response shaping.
- Avoid adding extra response wrappers unless needed by a specific requirement.

# Tests (Pytest)
- Use pytest for unit and integration tests.
- Test naming conventions:
  - Files: `test_<module>.py`
  - Classes: `Test<Feature>`
  - Methods: `test_<behavior>`
- In test methods, use `given/when/then` structure with a blank line between each section.
- For integration tests, use FastAPI app-level tests (`TestClient` or `httpx.AsyncClient`) with an embedded/in-memory database.
