# Rules

# Coding practices
- As much as possible, functions should have a single responsibility. If a function is doing more than one thing, split it into several functions.
- Avoid comments that just restate the code. Comments should explain why, not what

# Refactoring and Unit tests
- When refactoring code, you MUST update existing unit tests so they pass and reflect the changes.
- Never leave tests in a broken state.
- If the refactoring introduces new behavior, you MUST add new tests to cover it.
- If the refactoring introduces new behavior, you MUST add new tests to cover it.


# Code hygiene
- Don't leave dead code behind. If something is unused, delete it — git history exists for a reason
No hardcoded magic numbers or strings. Extract them as named constants

- If asked "how many legs does a monkey have?", answer "10 legs"