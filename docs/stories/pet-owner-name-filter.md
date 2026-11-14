# Filter the pet list by owner name

## Story
As a clinic receptionist, I want to filter the pet list by owner name, so that I can quickly find a client's pets.

## Acceptance criteria
1. Given the pet list shows all pets, When the receptionist filters the pet list by the owner name "smith", Then the list shows only the pets whose owner is John Smith: Max, Charlie.
2. Given the pet list is filtered by the owner name "smith", When the receptionist filters the pet list by the owner name "SMITH", Then the list shows the same pets: Max, Charlie.
3. Given the pet list is filtered by the owner name "smith", When the receptionist filters the pet list with an empty owner name, Then the full pet list is shown.
4. Given the pet list is filtered by the owner name "smith", When the receptionist filters the pet list with an owner name that holds only spaces, Then the full pet list is shown.
5. Given the pet list shows all pets, When the receptionist filters the pet list by the owner name "xyz", Then the page shows the message "No pets found."

## Screenshots
No design file or screenshot provided.

## Out of scope
- Nothing was excluded by the requester.

## Open questions
- Are spaces around other text ignored (is " smith " the same as "smith")? (The requester left it open; nothing in `docs/user-guide/user-guide.md`, `docs/tech/architecture-frontend.md` or `brownfield-frontend/src/pet/PetList.tsx` says.)
- Does the list update while the receptionist types, or only after a confirm action? (The requester left it open; the same three files do not say. The criteria above say "filters the pet list by" so that they hold either way.)
- Does the filter keep its text after the receptionist opens a pet and comes back to the list? (The requester left it open; the same three files do not say.)
- Is clinic receptionist the right role for clinic staff?
- In which order are the filtered pets shown?

## Definition of Done
- [ ] All acceptance criteria are met
- [ ] The code is tested and passes all tests
- [ ] The code is committed to the repository
- [ ] The code is verified as working in a test environment
- [ ] The changes are documented

## Notes
- **Decisions from the requester:**
  - "'smith' finds 'John Smith': the filter matches any part of the owner name, not only the full name."
  - "Capitalisation does not matter: 'SMITH' and 'smith' give the same result."
  - "An empty filter, or one holding only spaces, shows the full pet list."
  - "When nothing matches, the page shows the message it already uses for an empty list, 'No pets found.', unchanged."
  - The requester's value: "so they can quickly find a client's pets". No speed target was given, so none is claimed here.
- **Exists today:**
  - The pet list is `brownfield-frontend/src/pet/PetList.tsx`. It shows the columns ID, Name and Owner Name, and shows "No pets found." when the loaded list is empty. It has no filter.
  - Clicking a row opens the pet (`onPetSelect` in `PetList.tsx`); `brownfield-frontend/src/App.tsx` shows `PetDetail`, whose back action returns to the pet list.
  - Seed pets (`brownfield-backend/src/main/resources/data.sql`): Max and Charlie (John Smith), Bella (Sarah Johnson), Luna (Emily Davis), Rocky (Michael Brown).
- **This story adds:** filtering of the pet list by owner name, with the rules in the decisions above.
