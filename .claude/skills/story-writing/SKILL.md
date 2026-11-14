---
name: story-writing
description: Use when writing, reviewing or refining a user story, ticket or acceptance criteria for the pet clinic. Produces a story that follows the team's template and passes the team's checklist.
---

# Story writing

Write every user story with the template in [assets/story-template.md](assets/story-template.md). Use only the rules below.

Facts about the app: every statement about the existing app must come from the code or from `docs/`, with the file named. Anything you cannot find goes in the story under **Open questions**. Never guess.

Before you answer, check the story against every item below, one by one, and quote the words that prove each yes. Each item is answered yes or no. Fix the story until all are yes, and apply every fix to the story itself before you show anything: the story you show must already pass, with no corrections left in the checklist. Then say which items you could only meet by listing an open question.

## Story
1. Does the story follow "As a [role], I want [outcome] so that [value]"?
2. Is the role a specific clinic role (for example "clinic receptionist"), and not "user"?
3. Does "I want" say what the person does or sees, with no endpoint, table, class or library named? (Naming a screen the person already uses, such as the pet list, is fine.)
4. Does "so that" give a business value that is not a restatement of "I want"?

## Acceptance criteria
5. Is every criterion written as "Given [context], When [action], Then [result]"?
6. Does every Given, When and Then hold exactly one statement, with no "and" and no "or"? To answer, read each Given, When and Then on its own and look for the words "and" and "or". If you find one, split the criterion into two.
7. Are there at most 5 criteria (never more than 8)?
8. Does at least one criterion use a concrete example with real data from the app (real pet and owner names from the seed data)?
9. Is every criterion free of design (no endpoint, table, class, library, parameter name)?
10. Are non-functional requirements (performance, security, accessibility) left out, unless the story is about them?

## Rules and facts
11. Is every rule that can be read two ways (matching, capitals, empty result, ordering, limits) either stated by the person asking or listed under Open questions, and never decided silently?
12. Does every statement about the existing app come from the code or from `docs/`, with the file named? Anything not found must be an open question, never a guess.

## Structure
13. Does the story have these sections, in this order: Story, Acceptance criteria, Screenshots (omit when there is no UI change), Out of scope, Open questions, Definition of Done, Notes (optional)?
14. Is the Definition of Done exactly this checklist: all acceptance criteria are met; the code is tested and passes all tests; the code is committed to the repository; the code is verified as working in a test environment; the changes are documented?
15. Is the story vertical (all frontend and backend parts needed), releasable on its own, and of size Medium or less?
