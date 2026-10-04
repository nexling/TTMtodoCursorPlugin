# TTM-Todo Cursor Plugin

A [Cursor Plugin](https://cursor.com/docs/reference/plugins) that connects the agent to [TTM-Todo](https://todo.takttimemodular.com) (Takt Time Modular) for inbox, add, and complete workflows.

This repository is **v0.2.0**, meant for local review. It is **not** submitted to the Cursor marketplace.

## What’s included

| Path | Purpose |
| --- | --- |
| `.cursor-plugin/plugin.json` | Plugin manifest (`name`: `ttm-todo`, `version`: `0.2.0`) and variables schema |
| `mcp.json` | MCP server discovery (`ttm-todo`); Cursor substitutes plugin variables |
| `mcp-server/` | Node.js stdio MCP server (Node 18+) |
| `skills/ttm-todo/SKILL.md` | Agent skill: use the MCP tools, do not invent extra API routes |
| `tests/` | Contract tests (`node --test tests/`) |

## MCP tools

The agent calls these tools after you set the token. They talk to the TTM-Todo HTTP API with `Authorization: Bearer ${TODO_API_TOKEN}`.

| Tool | What it does |
| --- | --- |
| `list_inbox` | Finds the bucket with `is_inbox: true`, then lists open items in it |
| `add_item` | Creates an item (`title`, optional `notes` and `due_at`). Omitting `bucket_id` adds to the inbox |
| `complete_item` | Marks an item done by id (`{"status":"done"}`) |
| `list_buckets` | Lists buckets so a non-inbox destination can be chosen |

The token needs the **items** and **buckets** scopes. Existing capture-only tokens are not enough for this slice.

## Configuration (secrets stay out of git)

1. Install or load the plugin locally (see below). Requires **Node.js 18+** on your PATH (`node`), which Cursor uses to start the MCP server.
2. In Cursor, open **Plugins** → find **ttm-todo** → **Configure**.
3. Set **TODO_API_TOKEN** to your TTM-Todo API bearer token (required). Create a token in TTM-Todo settings with **items** and **buckets**.
4. Optionally set **TODO_BASE_URL** (default: `https://todo.takttimemodular.com`).

Values are stored in Cursor’s plugin configuration, not in this repository. `mcp.json` only contains the placeholders `${TODO_API_TOKEN}` and `${TODO_BASE_URL}`. Do not commit tokens or `.env` files with secrets.

## Try locally

Copy this repository’s plugin files into Cursor’s local plugins directory:

```bash
mkdir -p ~/.cursor/plugins/local/ttm-todo
cp -R .cursor-plugin skills mcp.json mcp-server ~/.cursor/plugins/local/ttm-todo/
```

Alternatively, clone the repo and symlink:

```bash
mkdir -p ~/.cursor/plugins/local
ln -s /path/to/TTMtodoCursorPlugin ~/.cursor/plugins/local/ttm-todo
```

Reload Cursor (or restart) so it discovers the plugin under `~/.cursor/plugins/local/ttm-todo`. Then configure the token as above.

Run the tests from a clone:

```bash
node --test tests/*.test.mjs
```

## Marketplace

This plugin has **not** been published or submitted via [cursor.com/marketplace/publish](https://cursor.com/marketplace/publish). Use local installation for review only.

## Author

Emil Johnsson — [TTM-Todo](https://todo.takttimemodular.com) · [Plugin repo](https://github.com/nexling/TTMtodoCursorPlugin)

## License

See [LICENSE](LICENSE).
