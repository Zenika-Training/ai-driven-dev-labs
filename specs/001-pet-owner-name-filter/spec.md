# Feature Specification: Filter the Pet List by Owner Name

**Feature Branch**: `001-pet-owner-name-filter`

**Created**: 2026-11-14

**Status**: Draft

**Input**: User description: "Build the feature in docs/stories/pet-owner-name-filter.md."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Find a client's pets by owner name (Priority: P1)

A clinic receptionist has a client at the desk and wants to see that client's pets without scanning the whole pet list. They type part of the owner's name into a filter and the list narrows to the pets whose owner name contains that text, ignoring capitalisation.

**Why this priority**: This is the whole purpose of the story: letting the receptionist quickly find a client's pets.

**Independent Test**: With the seed pets loaded, filter by "smith" and confirm only Max and Charlie (owner John Smith) are shown; filter by "SMITH" and confirm the same result.

**Acceptance Scenarios**:

1. **Given** the pet list shows all pets, **When** the receptionist filters by owner name "smith", **Then** the list shows only the pets whose owner is John Smith: Max, Charlie.
2. **Given** the pet list is filtered by "smith", **When** the receptionist filters by "SMITH", **Then** the list shows the same pets: Max, Charlie.

---

### User Story 2 - Clear the filter to see all pets again (Priority: P2)

After filtering, the receptionist wants to return to the full list. Emptying the filter, or leaving only spaces in it, restores every pet.

**Why this priority**: Without a way back to the full list, the filter would trap the receptionist in a narrowed view.

**Independent Test**: Filter by "smith", then clear the filter (or enter only spaces) and confirm all pets are shown.

**Acceptance Scenarios**:

1. **Given** the pet list is filtered by "smith", **When** the receptionist filters with an empty owner name, **Then** the full pet list is shown.
2. **Given** the pet list is filtered by "smith", **When** the receptionist filters with an owner name that holds only spaces, **Then** the full pet list is shown.

---

### User Story 3 - Be told when no pet matches (Priority: P2)

When the entered text matches no owner, the receptionist sees the existing empty-list message instead of a blank page.

**Why this priority**: Prevents confusion between "no match" and "page is broken".

**Independent Test**: Filter by "xyz" and confirm the message "No pets found." is shown.

**Acceptance Scenarios**:

1. **Given** the pet list shows all pets, **When** the receptionist filters by owner name "xyz", **Then** the page shows the message "No pets found."

---

### Edge Cases

- Filter text that matches part of an owner name (not the full name) still matches ("smith" finds "John Smith").
- Filter text in different capitalisation ("SMITH", "smith") gives identical results.
- Filter text with leading or trailing spaces around other text (" smith "): treated as the same as "smith" (see Assumptions).
- Filter text of only spaces behaves like an empty filter.
- No pet matches: the existing "No pets found." message is shown, unchanged.
- The pet list has no pets at all: the existing "No pets found." message is shown, as today.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Users MUST be able to filter the pet list by owner name.
- **FR-002**: The filter MUST match any part of the owner name, not only the full name.
- **FR-003**: The filter MUST ignore capitalisation.
- **FR-004**: An empty filter, or a filter holding only spaces, MUST show the full pet list.
- **FR-005**: When no pet matches the filter, the page MUST show the message "No pets found.", unchanged from the existing empty-list message.
- **FR-006**: The filter MUST NOT change the pet data or the columns shown in the list (ID, Name, Owner Name).
- **FR-007**: Opening a pet from the filtered list MUST keep working as it does today.

### Key Entities *(include if feature involves data)*

- **Pet**: An animal registered at the clinic, shown in the list with ID, Name and Owner Name.
- **Owner name**: The text identifying a pet's owner (e.g. "John Smith"); the value the filter is matched against.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: With the seed data, filtering by "smith" shows exactly 2 pets (Max, Charlie) and hides the other 3.
- **SC-002**: Filtering by "smith" and "SMITH" gives identical lists in 100% of cases.
- **SC-003**: Clearing the filter, or entering only spaces, shows all pets in 100% of cases.
- **SC-004**: Filtering by text matching no owner shows "No pets found." in 100% of cases.
- **SC-005**: A receptionist can narrow the list to one client's pets by typing a few letters of the owner name, without scrolling or reading the full list.

## Assumptions

- The users are clinic staff in the receptionist role described in the story; whether "receptionist" is the right role name for all clinic staff is unconfirmed and does not affect behaviour.
- Spaces around other text are ignored (" smith " behaves like "smith"); the requester left this open, so this is the common default.
- Whether the list updates while typing or after a confirm action is left to design; the acceptance scenarios hold either way.
- The filter text is not required to persist after the receptionist opens a pet and returns to the list; the requester left this open, so the default is that the list returns unfiltered.
- The order of filtered pets follows the order of the existing list; no new ordering is introduced.
- Filtering applies to the pets already loaded in the list; no change to which pets exist is in scope.
- Out of scope: filtering by any field other than owner name; the requester excluded nothing else explicitly.
