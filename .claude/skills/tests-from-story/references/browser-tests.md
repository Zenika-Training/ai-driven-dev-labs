# Browser test rules

Every browser test written from a story follows these rules. Each one can be checked by reading the test.

1. **Find elements the way a user does.** Use `getByRole`, `getByLabel`, `getByPlaceholder` or `getByText`. Never use CSS classes or XPath.
2. **One acceptance criterion per test.** The test name starts with the criterion number and uses its words, for example `1. filtering by "smith" shows only Max and Charlie`.
3. **Assert what the user sees.** Check visible text, rows and messages. Do not check internal state, component names or network calls.
4. **Use the real data.** Use the seed pets and owners (Max and Charlie belong to John Smith; Bella, Luna and Rocky to others). Do not mock the API.
5. **Wait the way Playwright does.** Use `expect(...)` with auto-waiting. Never use fixed sleeps, even when the page debounces typing.
6. **Take a screenshot at the end.** Every test ends with a screenshot attached to the report.
7. **Only use http://localhost:5173.** Never open another URL.
8. **Never change the app or the story to make a test pass.** A failing test is reported, not fixed.
