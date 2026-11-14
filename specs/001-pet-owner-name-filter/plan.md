# Implementation Plan: Filter the Pet List by Owner Name

**Branch**: `001-pet-owner-name-filter` | **Date**: 2026-11-14 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-pet-owner-name-filter/spec.md`. Agreed design: `docs/design/pet-owner-name-filter.html`, `docs/contracts/pet-owner-name-filter.yaml`.

## Summary

Add an optional `ownerName` query parameter to `GET /api/v1/pet`. The backend returns pets whose owner name contains the trimmed text, ignoring case; absent or blank text returns all pets. The pet list page gets an owner-name text input that calls the API as the user types (debounced), keeps the input visible in every state, and shows the existing "No pets found." message when the result is empty. Decisions for the design's open questions are in [research.md](research.md).

## Technical Context

**Language/Version**: Java 21 (Spring Boot, Maven); TypeScript / React (Node 22, Vite)

**Primary Dependencies**: Spring Web, Spring Data JPA; React, Vitest, Testing Library

**Storage**: HSQL/H2 in-memory, schema and seed in `data.sql` (no schema change)

**Testing**: JUnit 5 `@SpringBootTest` (`PetServiceTest`); Vitest component and service tests

**Target Platform**: Brownfield web app (`02-brownfield-backend`, `02-brownfield-frontend`); the greenfield frontend has no pet code

**Project Type**: web-service + SPA

**Performance Goals**: Not a concern; 5 seed pets, in-memory DB

**Constraints**: Existing callers of `GET /api/v1/pet` without the parameter unchanged; list columns (ID, Name, Owner Name) and pet detail navigation unchanged

**Scale/Scope**: One endpoint parameter, one repository method, one service method, one component, one service function

## Constitution Check

| Principle | Status |
|---|---|
| I. Package by domain, `com.petclinic`, action-word names | PASS: changes stay in `com.petclinic.pet`; new methods are `find...` |
| II. DB and JPA entity rules | PASS: no entity or `data.sql` change |
| III. Service needs JUnit; no `ResponseEntity`; `/api/v1/ENTITY` | PASS: new service method gets tests; URL unchanged; plain `List<Pet>` return |
| IV. JUnit conventions | PASS: tests in `PetServiceTest`, `should...` names, given/when/then, data not clashing with `data.sql` |
| V. Frontend: API calls in service, camelCase service, async/await, small components, props/state interfaces, `data-testid` | PASS: see Project Structure |

No violations. Re-checked after Phase 1 design: still PASS. Complexity Tracking not needed.

## Project Structure

### Documentation (this feature)

```text
specs/001-pet-owner-name-filter/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/pet-owner-name-filter.yaml
├── checklists/
└── tasks.md             # created by /speckit-tasks
```

### Source Code (repository root)

```text
02-brownfield-backend/src/main/java/com/petclinic/pet/
├── PetRepository.java   # + findByOwnerNameContainingIgnoreCase(String)
├── PetService.java      # + findByOwnerName(String): blank/null -> findAll(), else trim + repository
└── PetController.java   # findAll gets @RequestParam(required = false) ownerName
02-brownfield-backend/src/test/java/com/petclinic/pet/
└── PetServiceTest.java  # + filter tests

02-brownfield-frontend/src/pet/
├── petService.ts        # findAll(ownerName?) adds ?ownerName= via URLSearchParams
└── PetList.tsx          # filter input, debounced fetch, input stays mounted
02-brownfield-frontend/tests/
├── PetList.test.tsx     # + filter interaction tests
└── petService.test.ts   # + findAll with ownerName URL test
```

**Structure Decision**: Extend the existing `pet` package and `src/pet` folder; no new source files. The filter input stays inside `PetList` (a separate component is unnecessary for one input).

## Key Design Points

- **Trim in the service, not the controller**: one place holds the "blank means all" rule so it is unit-testable (spec FR-004).
- **Contains + ignore case in the repository** via a Spring Data derived query; no custom SQL.
- **Order**: filtered results use the default repository order (same as `findAll`); no sort added (spec assumption).
- **Frontend loading state**: today `PetList` replaces the whole page with "Loading pets..." while loading. A refetch on every keystroke would unmount the input and lose focus. Plan: show "Loading pets..." only for the initial load; on refetch keep the page and input mounted. The existing test "should display loading state initially" must still pass.
- **Stale responses**: ignore a response if the filter text changed since the request was sent.
- **Filter not persisted** after opening a pet and returning (spec assumption); component state resets on remount.
