# Backend Architecture Rules

Stack: NestJS (TypeScript), SQLite, Vitest

Both backends (`01-greenfield-backend` and `02-brownfield-backend`) use `better-sqlite3` directly with in-memory SQLite databases.

# Modules
    - should be split by domain, not layer (we use DDD style)
    - Inside folder '01-greenfield-backend' or '02-brownfield-backend', always create new code inside a domain subfolder under `src/` (eg: `src/pet`, `src/invoice`), following Nest's module structure: `<domain>.module.ts`, `<domain>.controller.ts`, `<domain>.service.ts`, `<domain>.repository.ts`

# Backend Coding practices
    - as much as possible, functions should be single responsibility. If a function is doing more than one thing, split it into several functions
    - for Repository/Service/Controller, use method action words such as `find`, `save`, `delete`. Do not use 'create' or `remove`

# Refactoring
- When refactoring code, you **MUST** update the existing Vitest tests to ensure they pass and reflect the changes. Never leave tests in a broken state.
- If the refactoring introduces any new behavior, you **MUST** add new tests to cover it.


## Database
- `01-greenfield-backend` and `02-brownfield-backend`: define schema SQL in `src/database/schema.ts`, seed data in `src/database/seed.ts`, and initialize both through `DatabaseService` during application startup
- when writing seed data, always make sure records are inserted in the right order, so we do not violate required (non-nullable) fields or foreign key constraints
- both databases are ephemeral and reset whenever the corresponding process restarts

## For application-owned models
- Keep persisted entity and nested relation types in domain model files; do not use ORM-generated types
- For request/response validation, use dedicated DTO classes (eg: `CreatePetDto`, `UpdatePetDto`) with `class-validator` decorators, kept separate from the domain model; prefer `readonly` properties over setters

## For Service classes
- Never implement a Service (`@Injectable()`) class without a Vitest unit test

## For Repository classes
- Repository classes are plain `@Injectable()` TypeScript classes that wrap `DatabaseService`; no special decorator is required (unlike Spring Data's `@Repository`)

## For Controller classes
- use URL such as /api/v1/ENTITY (eg: /api/v1/pet)
- avoid manipulating the raw response via `@Res()`; return plain objects/DTOs from handler methods and let Nest's built-in serialization and exception filters set the status code, unless you really need custom headers/status

## Vitest tests - what to test
- We should have good coverage of Vitest tests at the service layer. If business rules are simple, do an Integration test (all the way down to an in-memory/test SQLite database)
- All complex business rules should be tested with a pure Unit Test (with mocked dependencies, eg: via `vi.fn()` / `vi.mock()`)
- Only test Repository and Controller if there is something interesting to test

## Vitest tests - Implementation
- All Vitest tests should follow the convention `<fileName>.spec.ts`. For instance, the test for `vet.service.ts` should be named `vet.service.spec.ts`
- test names: should use `should` and `should not`. Example: `it('should find pet by name', ...)`
- inside test bodies, use the `given/when/then` structure with a blank line between each section
- when generating a Vitest Integration test for either backend, use an isolated in-memory SQLite database through `better-sqlite3`
- when generating test data, make sure there is no conflict with the seed data for the target backend
