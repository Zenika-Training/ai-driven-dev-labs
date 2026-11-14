---
name: tests-from-story
description: Use when asked to write, generate or run Playwright browser tests from a user story's acceptance criteria. Input is a story file path, for example docs/stories/pet-owner-name-filter.md. Writes one test per criterion, waits for the person's OK before running anything, and diagnoses failures without fixing them.
---

# Tests from a story

Input: the path of a story file. Follow these steps in order. The browser rules are in [references/browser-tests.md](references/browser-tests.md).

1. **Read** the story's acceptance criteria and the rules in `references/browser-tests.md`.
2. **Look at the real page.** Open the start page (http://localhost:5173) with the Playwright browser tools and read what is actually on it. Base the locators on what you saw, not on guesses about the code.
3. **Write** one Playwright test per acceptance criterion in `e2e/tests/`, in a file named after the story (for example `e2e/tests/pet-owner-name-filter.spec.ts`).
4. **Show me the tests, then stop and wait for my explicit OK.** Do not run anything before I say OK. Do not run the tests, do not start any server, do not "check quickly".
5. **Run** the tests with `npx playwright test` from `e2e/`, only after my OK.
6. **When a test fails**, first find out what changed since these tests last passed: read `git status` and `git diff` (read-only) for the app code, and compare the screenshot with the story's wording. A test that passed before and now fails because the app code or page text was edited is not a test defect. Then read the error and the screenshot and say which of these it is, why, and which fix you suggest:
   - a **product regression** (the app no longer does what the story says),
   - an **intended change** (the app changed on purpose and the test is out of date),
   - a **test defect** (the test is wrong).
   **Do not apply the fix.** I decide. Never change the story to make a test pass.
