# Tasks: Filter the Pet List by Owner Name

**Input**: Design documents from `/specs/001-pet-owner-name-filter/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/pet-owner-name-filter.yaml, quickstart.md

**Tests**: Included. The plan requires them (constitution III: a service method needs JUnit tests; plan lists `PetServiceTest`, `PetList.test.tsx`, `petService.test.ts`).

**Organization**: Grouped by user story. Backend work lives in `brownfield-backend`, frontend work in `brownfield-frontend`. No new source files; existing files are extended.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: US1, US2, US3 (maps to spec.md)

## Path Conventions

- Backend: `brownfield-backend/src/main/java/com/petclinic/pet/`, tests in `brownfield-backend/src/test/java/com/petclinic/pet/`
- Frontend: `brownfield-frontend/src/pet/`, tests in `brownfield-frontend/tests/`
- Backend rules: `docs/tech/architecture-backend.md`; frontend rules: `docs/tech/architecture-frontend.md`

---

## Phase 1: Setup

**Purpose**: Confirm a green baseline before changing anything

- [X] T001 [P] Run `mvn test` in `brownfield-backend` and record that all existing tests pass
- [X] T002 [P] Run `npm test` and `npm run lint` in `brownfield-frontend` and record that all existing tests pass (including "should display loading state initially" in `brownfield-frontend/tests/PetList.test.tsx`)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Backend filter and client function that every user story depends on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Add `List<Pet> findByOwnerNameContainingIgnoreCase(String ownerName);` to `brownfield-backend/src/main/java/com/petclinic/pet/PetRepository.java` (Spring Data derived query; no custom SQL)
- [X] T004 Add `public List<Pet> findByOwnerName(String ownerName)` to `brownfield-backend/src/main/java/com/petclinic/pet/PetService.java`: if `ownerName` is null or `isBlank()` return `findAll()`, otherwise call `petRepository.findByOwnerNameContainingIgnoreCase(ownerName.trim())` (depends on T003). Plain `List<Pet>` return, no `ResponseEntity`
- [X] T005 Change `findAll()` in `brownfield-backend/src/main/java/com/petclinic/pet/PetController.java` to `findAll(@RequestParam(required = false) String ownerName)` and return `petService.findByOwnerName(ownerName)`; URL stays `GET /api/v1/pet` (depends on T004)
- [X] T006 [P] Change `findAll` in `brownfield-frontend/src/pet/petService.ts` to `findAll(ownerName?: string)`: when `ownerName` is a non-empty string, build the URL with `new URLSearchParams({ ownerName })` as `${API_BASE_URL}?${params}`; otherwise call `API_BASE_URL` unchanged. Keep async/await and the existing error message

**Checkpoint**: API accepts `?ownerName=`; client function can send it.

---

## Phase 3: User Story 1 - Find a client's pets by owner name (Priority: P1) 🎯 MVP

**Goal**: Receptionist types part of an owner name and the list narrows to matching pets, ignoring case.

**Independent Test**: With seed data, filter by "smith" then "SMITH": only Max and Charlie are shown in both cases (SC-001, SC-002).

### Tests for User Story 1

- [X] T007 [P] [US1] In `brownfield-backend/src/test/java/com/petclinic/pet/PetServiceTest.java` add tests named `should...` with given/when/then, using data that does not clash with `data.sql`: partial match ("smith" returns the pets of owner John Smith, Max and Charlie), case-insensitive ("SMITH" gives the same result), whitespace is trimmed (" smith " gives the same result), and `%` / `_` in the filter match literally (a filter of `%` returns no pets unless an owner name contains `%`)
- [X] T008 [P] [US1] In `brownfield-frontend/tests/petService.test.ts` add a test that `findAll('smith')` fetches `http://localhost:8080/api/v1/pet?ownerName=smith`, a test that special characters are URL-encoded (e.g. `'a b&c'` becomes `ownerName=a+b%26c`), and a test that `findAll()` still fetches the bare URL
- [X] T009 [P] [US1] In `brownfield-frontend/tests/PetList.test.tsx` add tests: a filter input with `data-testid="owner-name-filter"` is rendered; typing "smith" calls `petService.findAll` with `'smith'` after the debounce (use fake timers) and only the returned pets are listed; the input remains in the document while the refetch is pending

### Implementation for User Story 1

- [X] T010 [US1] In `brownfield-frontend/src/pet/PetList.tsx` add `const [ownerName, setOwnerName] = useState<string>('')` and a text input (`data-testid="owner-name-filter"`, label "Filter by owner name", placeholder "Owner name") placed between the page heading and the table, shown in every state of the loaded page
- [X] T011 [US1] In `brownfield-frontend/src/pet/PetList.tsx` replace the mount-only `useEffect` with an effect keyed on `ownerName` that waits about 300 ms (`setTimeout`, cleared on cleanup) and then calls `petService.findAll(ownerName)`; ignore a response if the effect has been cleaned up since the request was sent (stale-response guard) (depends on T010)
- [X] T012 [US1] In `brownfield-frontend/src/pet/PetList.tsx` make "Loading pets..." replace the page only for the initial load (e.g. `initialLoading` state set false after the first fetch settles); on refetch keep the page and input mounted so focus is not lost. Keep the existing error branch. The existing test "should display loading state initially" must still pass (depends on T011)

**Checkpoint**: US1 works end to end; run `mvn test` and `npm test` for the feature.

---

## Phase 4: User Story 2 - Clear the filter to see all pets again (Priority: P2)

**Goal**: Emptying the filter, or entering only spaces, restores every pet.

**Independent Test**: Filter by "smith", then clear the input or type only spaces: all 5 pets are shown (SC-003).

### Tests for User Story 2

- [X] T013 [P] [US2] In `brownfield-backend/src/test/java/com/petclinic/pet/PetServiceTest.java` add tests that `findByOwnerName` returns the same pets as `findAll()` for `null`, `""` and `"   "`
- [X] T014 [P] [US2] In `brownfield-frontend/tests/PetList.test.tsx` add a test: after filtering by "smith", clearing the input calls `petService.findAll` with `''` and the full list is shown again; same for an input of only spaces (the client sends the text as typed; the backend treats blank as all)

### Implementation for User Story 2

- [X] T015 [US2] In `brownfield-frontend/src/pet/petService.ts` and `brownfield-frontend/src/pet/PetList.tsx` confirm that an empty or whitespace-only `ownerName` produces a request the backend treats as "all pets" and that the list refreshes; fix only if T013/T014 fail (expected: no code change beyond Phase 2 and US1)

**Checkpoint**: US1 and US2 both pass independently.

---

## Phase 5: User Story 3 - Be told when no pet matches (Priority: P2)

**Goal**: A filter that matches nothing shows "No pets found." and keeps the input visible.

**Independent Test**: Filter by "xyz": the message "No pets found." appears and the input is still present (SC-004).

### Tests for User Story 3

- [X] T016 [P] [US3] In `brownfield-backend/src/test/java/com/petclinic/pet/PetServiceTest.java` add a test that `findByOwnerName("xyz")` returns an empty list (not null, no exception)
- [X] T017 [P] [US3] In `brownfield-frontend/tests/PetList.test.tsx` add a test: when `findAll` resolves `[]` after typing "xyz", the text "No pets found." is shown and `owner-name-filter` is still in the document; also confirm the existing empty-list test still passes

### Implementation for User Story 3

- [X] T018 [US3] In `brownfield-frontend/src/pet/PetList.tsx` confirm the existing `pets.length === 0` branch renders `<p>No pets found.</p>` below the always-mounted filter input; fix only if T017 fails (expected: no code change beyond US1)

**Checkpoint**: All three stories work independently.

---

## Phase 6: Polish & Cross-Cutting Concerns

- [X] T019 [P] Add a controller-level check (or confirm via Swagger UI at `http://localhost:8080/swagger-ui.html`) that `GET /api/v1/pet` without `ownerName` is unchanged and `?ownerName=xyz` returns `200` with `[]` (research decision 3)
- [X] T020 [P] Verify FR-006/FR-007 by test or by hand in `brownfield-frontend/tests/PetList.test.tsx`: columns stay ID, Name, Owner Name, and clicking a row of a filtered list calls `onPetSelect` with that pet
- [X] T021 Run `mvn test` in `brownfield-backend` and `npm test`, `npm run lint`, `npm run build` in `brownfield-frontend`; all must pass
- [X] T022 Run the manual steps in `specs/001-pet-owner-name-filter/quickstart.md` (curl commands and UI steps 1 to 6) against the running apps

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: none; T001 and T002 run in parallel
- **Foundational (Phase 2)**: after Setup; blocks all stories. T003 → T004 → T005 backend chain; T006 is independent of it
- **US1 (Phase 3)**: after Phase 2
- **US2 (Phase 4)** and **US3 (Phase 5)**: after Phase 2 and, for the frontend tests, after T010-T012 (they exercise the same input and effect). Backend tests T013 and T016 can run right after T004
- **Polish (Phase 6)**: after all stories

### Within Each Story

- Tests first (they should fail or be written against the Phase 2 API), then implementation
- `PetList.tsx` tasks (T010 → T011 → T012) are sequential: same file

### Parallel Opportunities

- T001 ‖ T002
- T006 ‖ (T003 → T004 → T005)
- T007 ‖ T008 ‖ T009
- T013 ‖ T014; T016 ‖ T017
- Backend tests (T007, T013, T016) share `PetServiceTest.java`: write them together or sequentially to avoid edit conflicts

---

## Parallel Example: User Story 1

```text
Task: "PetServiceTest filter tests in brownfield-backend/src/test/java/com/petclinic/pet/PetServiceTest.java"   (T007)
Task: "petService.findAll URL tests in brownfield-frontend/tests/petService.test.ts"                            (T008)
Task: "PetList filter input tests in brownfield-frontend/tests/PetList.test.tsx"                                (T009)
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Phase 1 baseline, Phase 2 foundational
2. Phase 3 (US1)
3. **Stop and validate**: filter "smith" / "SMITH" shows Max and Charlie only
4. Demo

### Incremental Delivery

1. Setup + Foundational: API and client ready
2. US1: filtering works (MVP)
3. US2: clear / blank restores all (mostly verification, the blank rule is in T004)
4. US3: no-match message (mostly verification)
5. Polish and quickstart validation

---

## Notes

- Most of US2 and US3 behaviour falls out of T004 (blank rule) and T012 (input stays mounted); their tasks lock it in with tests
- Keep `PetList.tsx` as one component (plan: no separate filter component)
- No schema, `data.sql` or entity changes
- Commit after each task or logical group

---

## Phase 7: Convergence

**Purpose**: Remaining gaps found by `/speckit-converge`

- [X] T023 In `brownfield-frontend/src/pet/PetList.tsx` keep the owner-name filter input mounted when a refetch fails (today the `if (error)` branch replaces the whole page, so the input disappears and the user cannot edit the filter to recover); show the error message below the input instead, and add a test in `brownfield-frontend/tests/PetList.test.tsx` per plan: Summary "keeps the input visible in every state" (partial)
- [X] T024 Add an automated controller-level check (e.g. `@WebMvcTest` or `MockMvc` in `brownfield-backend/src/test/java/com/petclinic/pet/PetControllerTest.java`) that `GET /api/v1/pet` without `ownerName` is unchanged and `?ownerName=xyz` returns `200` with `[]`, since no controller test exists to back T019 per T019 / research decision 3 (partial)
