# MCP check: Playwright server (Lab 1.1)

## 1. Before (step 1)
- `claude mcp list` showed only account-level `claude.ai` connectors (no server from this project, no stdio server of mine).
- `/context` (headless: `claude -p "/context"`): total 14.1k of 1M context units, no MCP tools line.

## 2. Configuration (step 2)
- Added with `claude mcp add --scope project playwright -- npx @playwright/mcp@latest`, then pinned to **`@playwright/mcp@0.0.85`** (the version published on 2026-11-09, `latest` at the time).
- `.mcp.json`: server `playwright`, type stdio, command `npx`, args `["@playwright/mcp@0.0.85"]`, `env` empty. No credential of any kind.

## 3. The three questions (step 3)
Evidence: `claude mcp get playwright`, `.mcp.json`, `npm view @playwright/mcp`.
1. **Who runs it?** My machine. `npx` downloads the npm package and starts it as a local child process of Claude Code (type stdio). It drives a browser on my machine. Evidence: `claude mcp get playwright` → `Type: stdio`, `Command: npx`.
2. **Who authenticates it?** Nobody: there is no login or credential in the config (`env` is empty). Its tools act with whatever the browser it launches can reach: a fresh browser profile, so no saved logins, but it can open any URL my machine can reach (for example localhost:5173).
3. **Who maintains it?** Microsoft: repository `github.com/microsoft/playwright-mcp`, licence Apache-2.0, npm maintainers include `microsoft-oss-releases`. Last release at the time: 0.0.85 on 2026-11-09, previous 0.0.84 on 2026-10-31. Note: 0.0.85 depends on an alpha Playwright build (`1.66.0-alpha-2026-11-09`), which is a reason to pin and re-check before the course.

## 4. Use it (step 4)
Prompt from the guide, with the Playwright browser tools: Claude opened http://localhost:5173, went to the pet list and listed five pets: Max and Charlie (John Smith), Bella (Sarah Johnson), Luna (Emily Davis), Rocky (Michael Brown). No file changed. Side effect: the server writes `.playwright-mcp/` (console logs, page snapshots) in the repo; it is now in `.gitignore`.

## 5. After (step 5)
`/context` with the server configured: total 16.3k of 1M context units; `MCP tools` 604 loaded; `MCP tools (deferred)` 50.2k units, of which about 30k are the Playwright tool definitions (`mcp__playwright__browser_*`). Tool definitions load on demand, so the loaded cost stays small until a tool is used.
