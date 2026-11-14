# API test rules

Every API test written from a story follows these rules. Each one can be checked by reading a test.

1. **Use only what the API description lists.** Call only operations, query parameters and fields that appear in http://localhost:8080/v3/api-docs. Never invent a route or a field.
2. **Check the status code and the response body.** A test that only checks the status code is not finished.
3. **One behaviour per test.** The test name starts with the acceptance criterion number and uses its words.
4. **Use Playwright's `request` fixture.** Never use `page`, and never open a browser in an API test.
5. **Use the real seed data.** Use the real pets and owners, compare pets by name, and do not mock anything.
6. **Only call http://localhost:8080.** Never call another host.
7. **Report the request and the response.** When a test fails, say which request was sent (method, URL, parameters) and which response came back (status and body).
