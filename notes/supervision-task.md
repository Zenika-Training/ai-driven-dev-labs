# Supervision task (Lab 6.1)

## Change
Add a missing frontend test for an existing behaviour: when the API returns no vets, the vet list page shows the message "No vets found.".

There is no test file for `VetList` today (`02-brownfield-frontend/tests/` has `PetList.test.tsx`, `petService.test.ts` and `trying.test.ts` only).

## Acceptance check
- A new test file `02-brownfield-frontend/tests/VetList.test.tsx` has one test: with the vet service returning an empty list, the text "No vets found." is on the page.
- `npm test` in `02-brownfield-frontend` passes, and the new test fails if the message text in `VetList.tsx` is changed (checked by hand, then restored).

## Non-goals
- Do not change any application code (no change in `02-brownfield-frontend/src/` and none in `02-brownfield-backend/`).
- Do not touch the owner-name filter, the pet list or their tests.
- Do not change the message text, the test setup or any config file.
- Do not add a dependency.
