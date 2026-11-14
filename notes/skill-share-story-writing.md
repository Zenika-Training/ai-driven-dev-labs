# Sharing the story-writing skill (Lab 7.1)

## 1. The use
- **Intended user:** a clinic product owner or developer who needs a user story for the pet clinic.
- **Input:** a one-line idea, a ticket, or an existing story to review.
- **A request that must trigger the skill:** `/story-writing Rename the "Owner Name" column in the pet list to "Owner" so it takes less space.`
- **Expected output:** a story with the sections of the template (Story, Acceptance criteria, Screenshots, Out of scope, Open questions, Definition of Done, Notes), one-statement Given/When/Then criteria with real seed data, every undecided point listed as an open question.
- **An unrelated request that must not trigger it:** `Explain how the pet list gets its data from the backend.`

## 2. Review of SKILL.md
A read-only review against https://code.claude.com/docs/en/skills (it reached the page). Findings I checked against the repo and then applied as clarifications, without changing the 15 rules:
- The description had no trigger phrases: added examples ("write a story for ...", "turn this idea into a ticket", "review this story").
- No input contract, no output location, no definition of "the requester": added a "Where things are" section (answer in chat; save only when asked as `docs/stories/<kebab-case-title>.md`; the requester's decisions come from the request, the rest becomes open questions).
- The app and the seed data were not located (the repo has both greenfield and brownfield, each with a `data.sql`): the skill now names the brownfield app and `02-brownfield-backend/src/main/resources/data.sql`.
- "Medium or less" had no definition: now "finished within one sprint", with the pointer to `docs/product-management/writing-guides/story-writing-guide.md`.
- Item 6 (no "and"/"or") would split names such as "first and last name": added an exception for names and fixed terms.
Not applied: moving the 15-item checklist to the top of the file and rephrasing "Before you answer" as a standing instruction (style advice, no failing case found).

## 3. Three fresh sessions
| Session | Request | Result |
|---|---|---|
| 1, explicit | `/story-writing Rename the "Owner Name" column in the pet list to "Owner" so it takes less space.` | Used the skill (the slash command loads it directly). A story with the template sections; criteria use Max/John Smith and Bella/Sarah Johnson from the seed data; Screenshots says no design exists in `docs/design/`. |
| 2, natural | `The front desk says the Owner Name column in the pets table is too wide. Can you write that up as a ticket for the team?` | Called the `story-writing` skill on its own. Template followed; the role "clinic receptionist" and the missing target width were listed as open questions. Weak point: its single criterion ("the column is narrower than today") is not testable and has no concrete example. |
| 3, unrelated | `Explain how the pet list gets its data from the backend.` | Did not use the skill: a plain explanation of `PetList.tsx`, `petService.ts` and the backend. |

## 4. Peer review
A separate read-only Claude session reviewed `SKILL.md`, the template and this record against the six points. The real neighbour review is still to be done by a person.
| Point | Answer | Evidence |
|---|---|---|
| Description predicts when to use it | Yes, with a gap | trigger phrases are there; no negative boundary ("implement this story" would match the same words) |
| Steps are actionable | Mostly | item 7 "at most 5 (never more than 8)" contradicted itself; the checklist proof had no place in the output |
| Holds context that cannot be inferred | Yes | brownfield vs greenfield (both have a `data.sql`), the sizing rule, the DoD wording, the open-question convention |
| Boundaries are safe | Mostly | missing: what to do if the story file already exists, and for input that is not about the pet clinic |
| Output is reviewable | Yes, with one fix | the quoted proof was not part of the output format |
| The three tests are reproducible | Partly | missing: which version was tested and how to see that the skill was used |

Changes made from it: a "Boundaries" line (writes or reviews story text only; stops for non-pet-clinic requests), the output format (story first, then a `## Checklist` section with one line per item), never overwrite an existing story file (list the differences and ask), item 7 reworded (5 is the target, 8 the hard limit). The "no negative boundary" point is covered by the Boundaries line and by a fourth test below.

## 5. Rerun after the changes
Version tested: the `SKILL.md` committed on this branch (the working tree was identical to the commit). Model: claude-sonnet-5-5, Claude Code 2.1.325, fresh headless sessions. Evidence of skill use is the `Skill` tool call in the session transcript (stream-json), except for the explicit `/story-writing` form, which loads the skill directly.
| Session | Skill used | Output |
|---|---|---|
| 1, explicit `/story-writing ...` | yes (loaded by the command) | template sections, 3 criteria with Max/John Smith, 3 open questions (role, does the column really get narrower, same rename on the visit screens), and the `## Checklist` section with 15 lines |
| 2, natural request | yes (`Skill` tool call: `story-writing`) | template sections, a second criterion with a concrete example (Bella, Sarah Johnson), 4 open questions (role, target width, overflow behaviour, which screen), `## Checklist` section. Weak point that remains: criterion 1 ("narrower than today") is still not directly testable, and it is listed as an open question |
| 3, unrelated | no | explanation of `PetList.tsx`, `petService.ts`, `PetController`, `PetService` |
| 4, boundary: "Which test names does the story imply?" | no | two lines, no story written |
