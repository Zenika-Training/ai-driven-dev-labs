<!--
Sync Impact Report
Version change: (template) → 1.0.0
Modified principles: none (initial adoption; all rules sourced from docs/tech/architecture-backend.md
  and docs/tech/architecture-frontend.md)
Added sections: Core Principles I–V, Frontend Testing, Refactoring, Governance
Removed sections: none
Follow-up TODOs: none
Note: source docs state both "HSQL" and "H2" for databases; both kept verbatim, not reconciled.
-->
# AI-Driven Dev Labs Constitution

## Core Principles

### I. Backend Packages & Coding Practices
- Packages MUST be split by domain, not layer (DDD style).
- New Java classes MUST live in a subfolder of the `com.petclinic` package inside
  `01-greenfield-backend` or `02-brownfield-backend`.
- Functions SHOULD be single responsibility as much as possible; a function doing more than one
  thing MUST be split into several functions.
- Repository/Service/Controller methods MUST use action words such as `find`, `save`, `delete`.
  They MUST NOT use `create` or `remove`.

### II. Backend Database & JPA Entities
- Schema MUST be defined in `data.sql`.
- Data creation scripts in `data.sql` MUST populate data in the right order so no null value is
  assigned to a "not null" column.
- Only HSQL is used for now (test environment is enough).
- JPA entities MUST have no setters by default.
- JPA entities MUST have 3 constructors: an empty one, one with all parameters, and one with all
  parameters except the id.
- `@Column` and `@Table` MUST be avoided unless really necessary.
- Relationship mappings MUST NOT state explicit attributes unless really needed.
- Bidirectional relationships MUST NOT be used unless really needed.
- Imports MUST be `jakarta.persistence.*` (not `javax.persistence.*`).
- `@OneToMany` MUST be preferred over `@ManyToOne` whenever possible.
- Annotations such as `@OneToMany` MUST be minimalistic: no `mappedBy`, `cascade`, etc. unless
  explicitly stated.

### III. Backend Service, Repository & Controller Classes
- A Service class MUST NOT be implemented without a JUnit test.
- With Spring Data JPA, the `@Repository` annotation is not needed and MUST be omitted as it is
  not mandatory.
- Controller URLs MUST follow `/api/v1/ENTITY` (e.g. `/api/v1/pet`).
- `ResponseEntity` MUST be avoided unless really needed.

### IV. Backend JUnit Testing
- Coverage at the service layer MUST be good. If business rules are simple, write an Integration
  test (all the way down to the in-memory database).
- All complex business rules MUST be tested with a pure Unit Test (with Mock).
- Repository and Controller are tested only if there is something interesting to test.
- Test classes MUST be named `<ClassName>Test.java` (e.g. `VetServiceTest.java`).
- Test method names MUST use `should` and `shouldNot` (e.g. `shouldFindPetByName`).
- Test methods MUST use the `given/when/then` structure with a blank line between each section.
- Integration tests MUST be a `@SpringBootTest` with JUnit 5, using an embedded database (H2).
- Generated test data MUST NOT conflict with the test data inside `data.sql`.

### V. Frontend Service Layer, Components & Utils
- All API calls MUST be in service files, never directly in components.
- Service files MUST be named in camelCase with a `Service` suffix (e.g. `petService.ts`, not
  `PetService.ts`).
- Loading states and errors MUST be handled consistently across all API calls.
- Asynchronous code MUST use async/await syntax.
- Proper error boundaries MUST be implemented for error handling.
- Components MUST be small and focused on a single responsibility.
- TypeScript interfaces MUST be used for props and state.
- Component-specific styles MUST be placed in the same directory as the component.
- Utility functions and hooks MUST use camelCase (e.g. `formatDate.ts`, `useAuth.ts`).

## Frontend Testing

- Component tests MUST focus on user interactions.
- API services need not be tested unless they have some business logic.
- Test selectors MUST use `data-testid` attributes.
- Component test files MUST add `import React from "react";`.

## Refactoring

- When refactoring backend code, existing JUnit tests MUST be updated so they pass and reflect the
  changes. Tests MUST NOT be left in a broken state.
- If a backend refactoring introduces new behavior, new tests MUST be added to cover it.
- When refactoring frontend code, the unit tests MUST be refactored too.
- When refactoring frontend code, tests MUST be added for the new code.

## Governance

This constitution consists solely of the rules in `docs/tech/architecture-backend.md` and
`docs/tech/architecture-frontend.md`. Amendments MUST be made by updating those documents and
re-syncing this file. Versioning follows semantic versioning: MAJOR for removed or redefined
rules, MINOR for added or materially expanded rules, PATCH for clarifications. Reviews MUST
verify compliance with these rules.

**Version**: 1.0.0 | **Ratified**: 2026-11-14 | **Last Amended**: 2026-11-14
