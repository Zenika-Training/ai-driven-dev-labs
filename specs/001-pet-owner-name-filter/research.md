# Research: Pet Owner Name Filter

No NEEDS CLARIFICATION remain in the Technical Context. The agreed design and contract list open questions; each is decided below. These are defaults for the requester to confirm.

| # | Open question (design/contract) | Decision | Rationale | Alternatives |
|---|---|---|---|---|
| 1 | Query parameter name | `ownerName` | Matches the `Pet.ownerName` field and JSON | `owner`, `q` (less explicit) |
| 2 | Spaces around text | Trim before matching (" smith " = "smith") | Spec assumption; common default | Match literally |
| 3 | Response when nothing matches | `200` with `[]` | Same as the existing list endpoint; the page shows "No pets found." for an empty list | `404` (would hit the page's error path) |
| 4 | Order of results | Same as `findAll()` (repository default) | Spec assumption; no new ordering | Sort by id or name |
| 5 | Filter in API or in page | API (backend filter) | The agreed contract already puts it there; keeps the rule testable at service level per the constitution | Client-side filter of the loaded list |
| 6 | Update while typing or on confirm | While typing, debounced about 300 ms | Spec leaves it to design; the design draws no confirm control | Submit button or Enter key |
| 7 | Max length / invalid input | None added | Not in the story; a plain string has no error case | `400` on over-long input |
| 8 | Filter control visible at no match | Yes | Needed to clear the filter (design question 7) | Hide it |
| 9 | Filter text after returning from a pet | Not kept | Spec assumption | Persist in state or URL |

## Best-practice notes

- Use the Spring Data derived query `findByOwnerNameContainingIgnoreCase`. Spring Data escapes `%` and `_` for `Containing` queries, so they should match literally. Cover this with a test rather than assume it.
- Use `URLSearchParams` on the client so the filter text is URL-encoded.
