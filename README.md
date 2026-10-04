# TTM-Todo Cursor Plugin

A [Cursor Plugin](https://cursor.com/docs/reference/plugins) that connects the agent to [TTM-Todo](https://todo.takttimemodular.com) (Takt Time Modular).

This repository is **v0.3.0**, meant for local review. It is **not** submitted to the Cursor marketplace.

## What’s included

| Path | Purpose |
| --- | --- |
| `.cursor-plugin/plugin.json` | Plugin manifest (`name`: `ttm-todo`, `version`: `0.3.0`) and variables schema |
| `mcp.json` | MCP server discovery (`ttm-todo`); Cursor substitutes plugin variables |
| `mcp-server/` | Node.js stdio MCP server (Node 18+) |
| `mcp-server/operations.mjs` | Generated JSON API tool catalog (not the OpenAPI file) |
| `scripts/generate-operations.mjs` | Regenerates the catalog from a local OpenAPI JSON path |
| `skills/ttm-todo/SKILL.md` | Agent skill for the MCP tools |
| `tests/` | Contract tests (`node --test tests/*.test.mjs`) |

## MCP tools

After you set the token, the agent calls tools that talk to TTM-Todo with `Authorization: Bearer ${TODO_API_TOKEN}`.

### Convenience

| Tool | What it does |
| --- | --- |
| `list_inbox` | Finds the bucket with `is_inbox: true`, then lists open items in it |
| `add_item` | Creates an item (`title`, optional `notes` and `due_at`). Omitting `bucket_id` adds to the inbox |
| `complete_item` | Marks an item done by id (`{"status":"done"}`) |

### JSON API

One tool per JSON HTTP operation in the TTM-Todo OpenAPI spec (paths, methods, query params, and JSON bodies). Examples: `list_items`, `create_item`, `patch_item`, `list_buckets`, `overview`, `my_todos`, Google/Outlook status and events, tokens, admin, push, calendar export.

**Not exposed** (browser/OAuth HTML, SPA catch-all, or no JSON body): Auth0 `/login` `/logout` `/callback`; Google/Outlook connect and callback pages; `POST /api/inbox`; multipart attachment uploads; PWA `/share-target`; `GET /{full_path}`.

Bearer tokens use scopes **inbox**, **items**, **buckets**, and **plan**. Plan tools take optional `x_organization_id` (header `X-Organization-Id`) when the user has more than one licensed organization.

Regenerate the catalog if the spec changes (do not commit `openapi.json`):

```bash
node scripts/generate-operations.mjs /path/to/openapi.json
```

## Configuration (secrets stay out of git)

1. Install or load the plugin locally (see below). Requires **Node.js 18+** on your PATH (`node`).
2. In Cursor, open **Plugins** → find **ttm-todo** → **Configure**.
3. Set **TODO_API_TOKEN** to your TTM-Todo API bearer token (required).
4. Optionally set **TODO_BASE_URL** (default: `https://todo.takttimemodular.com`).

Values stay in Cursor’s plugin configuration. `mcp.json` only contains `${TODO_API_TOKEN}` and `${TODO_BASE_URL}`. Do not commit tokens or `.env` files with secrets.

## Try locally

```bash
mkdir -p ~/.cursor/plugins/local/ttm-todo
cp -R .cursor-plugin skills mcp.json mcp-server ~/.cursor/plugins/local/ttm-todo/
```

Or symlink:

```bash
mkdir -p ~/.cursor/plugins/local
ln -s /path/to/TTMtodoCursorPlugin ~/.cursor/plugins/local/ttm-todo
```

Reload Cursor so it discovers `~/.cursor/plugins/local/ttm-todo`, then configure the token.

```bash
node --test tests/*.test.mjs
```

## Marketplace

This plugin has **not** been published or submitted via [cursor.com/marketplace/publish](https://cursor.com/marketplace/publish). Use local installation for review only.

## Author

Emil Johnsson — [TTM-Todo](https://todo.takttimemodular.com) · [Plugin repo](https://github.com/nexling/TTMtodoCursorPlugin)

## License

See [LICENSE](LICENSE).
