# Plan: Pet API — greenfield-backend-python

## Part 1 — Pet API scaffold

### ✅ Step 1 — Model, schema, and test data
- src/models/pet.py — Tortoise ORM Pet model (id, name, owner_name)
- src/schemas/pet_response.py — PetResponse and PetCreate schemas
- tests/conftest.py — register Pet model, generate schemas, seed 2-3 rows
- src/main.py — register Pet model, generate schemas, seed data in lifespan

### ✅ Step 2 — Repository, Service, Router wired into the app
- src/repositories/pet_repository.py — find_all, find_by_name, save_pet
- src/services/pet_service.py — get_all_pets, get_pet_by_name, save_pet; raises PetNotFoundError
- src/routers/pet_router.py — GET /api/v1/pet, GET /api/v1/pet/{name}, POST /api/v1/pet
- src/main.py — include pet_router

---

## Part 2 — Uniqueness rule + tests

### ✅ Step 3 — Uniqueness business rule + integration tests
- src/repositories/pet_repository.py — add find_by_name_and_owner
- src/services/pet_service.py — add @atomic + DuplicatePetError on duplicate (name, owner_name)
- src/routers/pet_router.py — map DuplicatePetError → HTTP 409

### Step 4 — pytest integration tests for PetService
- tests/test_pet_service.py — TestPetService: test_save_pet_success, test_save_pet_duplicate_raises_error
