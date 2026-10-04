---
name: ttm-todo
description: Help the user work with TTM-Todo (inbox, add tasks, complete tasks) using plugin variables TODO_API_TOKEN and TODO_BASE_URL. Use when the user mentions TTM-Todo, takttimemodular todo, or wants to manage tasks in that app from Cursor.
---

# TTM-Todo assistant

## Configuration

This plugin expects Cursor to inject these variables (set under **Plugins → Configure** for `ttm-todo`):

| Variable | Required | Purpose |
| --- | --- | --- |
| `TODO_API_TOKEN` | Yes | Bearer token for authenticating to the TTM-Todo API |
| `TODO_BASE_URL` | No (default `https://todo.takttimemodular.com`) | Base URL for TTM-Todo |

Never commit token values. If `TODO_API_TOKEN` is missing, tell the user to configure it in Cursor before making API calls.

## API contract status

**The HTTP API shape for TTM-Todo is not wired in this plugin slice.** There is no `mcp.json`, no OpenAPI spec, and no documented REST paths in this repository. The public API contract was not found for this agent to rely on.

**Do not invent or guess** endpoints, paths, query parameters, request bodies, or response schemas. Do not assume MCP server URLs.

## What you can still do

1. **Orient the user** — TTM-Todo lives at the configured `TODO_BASE_URL` (default https://todo.takttimemodular.com). Common intents: view **inbox**, **add** a task, **complete** a task.
2. **Prepare for future API use** — When official API documentation or an updated plugin (e.g. MCP or documented HTTP routes) is available, use `Authorization: Bearer ${TODO_API_TOKEN}` (or the documented scheme) against `${TODO_BASE_URL}` as specified there.
3. **Manual workflow** — Until API details are published, guide the user to use the web UI at `TODO_BASE_URL` for inbox, add, and complete actions. You may help draft task titles, descriptions, or checklists as text the user can paste into the app.
4. **Verify before calling HTTP** — If the user provides their own API docs, a captured request from browser devtools, or an updated version of this plugin with real routes, follow only that authoritative source. Otherwise refuse to run speculative `curl` or fetch calls against guessed URLs.

## When API support lands (future)

After the plugin or TTM-Todo docs define real operations, typical flows will likely map to:

- **Inbox** — list or fetch tasks awaiting action
- **Add** — create a new task with user-supplied content
- **Complete** — mark a task done by id or identifier from the documented API

Until then, state clearly that automation is blocked pending documented API integration.
