# TTM-Todo Cursor Plugin

A [Cursor Plugin](https://cursor.com/docs/reference/plugins) that helps agents assist with [TTM-Todo](https://todo.takttimemodular.com) (Takt Time Modular): inbox, adding tasks, and completing tasks.

This repository is an early slice (**v0.1.0**) for local review. It is **not** submitted to the Cursor marketplace.

## What’s included

| Path | Purpose |
| --- | --- |
| `.cursor-plugin/plugin.json` | Plugin manifest (`name`: `ttm-todo`) and user-configurable variables |
| `skills/ttm-todo/SKILL.md` | Agent skill describing how to help with TTM-Todo without guessing API routes |

There is no `mcp.json` in this slice. The HTTP API contract is not documented here; the skill instructs agents not to invent endpoints.

## Configuration (secrets stay out of git)

1. Install or load the plugin locally (see below).
2. In Cursor, open **Plugins** → find **ttm-todo** → **Configure**.
3. Set **TODO_API_TOKEN** to your TTM-Todo API bearer token (required).
4. Optionally set **TODO_BASE_URL** (default: `https://todo.takttimemodular.com`).

Values are stored in Cursor’s plugin configuration, not in this repository. Do not commit tokens or `.env` files with secrets.

## Try locally

Copy this repository’s plugin files into Cursor’s local plugins directory:

```bash
mkdir -p ~/.cursor/plugins/local/ttm-todo
cp -R .cursor-plugin skills ~/.cursor/plugins/local/ttm-todo/
```

Alternatively, clone the repo and symlink:

```bash
mkdir -p ~/.cursor/plugins/local
ln -s /path/to/TTMtodoCursorPlugin ~/.cursor/plugins/local/ttm-todo
```

Reload Cursor (or restart) so it discovers the plugin under `~/.cursor/plugins/local/ttm-todo`.

## Marketplace

This plugin has **not** been published or submitted via [cursor.com/marketplace/publish](https://cursor.com/marketplace/publish). Use local installation for review only.

## Author

Emil Johnsson — [TTM-Todo](https://todo.takttimemodular.com) · [Plugin repo](https://github.com/nexling/TTMtodoCursorPlugin)

## License

See [LICENSE](LICENSE).
