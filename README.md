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

Bearer tokens use scopes **inbox**, **items**, **buckets**, and **plan**. Plan tools take optional `x_organization_id` (header `X-Organization-Id`) when the user has more than one licensed organization.

**Not exposed:** Auth0 `/login` `/logout` `/callback`; Google/Outlook connect and callback pages; `POST /api/inbox`; multipart attachment uploads; PWA `/share-target`; `GET /{full_path}`; and internal-only **admin**, **Google**, and **reMarkable** APIs.

### Convenience helpers

| Tool | What it does |
| --- | --- |
| `list_inbox` | Lists open items in the inbox bucket (the bucket with `is_inbox: true`). |
| `add_item` | Creates an item from a title (optional notes and due date), using the inbox unless you pass another `bucket_id`. |
| `complete_item` | Marks an existing item done by id. |

### Items

| Tool | What it does |
| --- | --- |
| `list_items` | Lists items, optionally filtered by bucket and whether completed items are included. |
| `create_item` | Creates an item with the JSON fields from the spec (`title`, `notes`, `bucket_id`, `parent_id`, `source`, `due_at`). |
| `reorder_items` | Sets the sort order of items from a list of ids. |
| `get_item` | Fetches one item by id. |
| `patch_item` | Updates an item (title, notes, bucket, status, due date, and related fields). |
| `remove_item` | Deletes an item by id. |
| `delete_attachment` | Deletes one attachment from an item. |

### Buckets

| Tool | What it does |
| --- | --- |
| `list_buckets` | Lists every bucket, including which one is the inbox. |
| `create_bucket` | Creates a bucket with a name and optional color or parent. |
| `reorder_buckets` | Sets the sort order of buckets from a list of ids. |
| `update_bucket` | Renames, recolors, or reparents a bucket. |
| `delete_bucket` | Deletes a bucket by id. |

### Plan

| Tool | What it does |
| --- | --- |
| `overview` | Returns the plan overview for the current (or specified) organization. |
| `create_department` | Creates a plan department. |
| `update_department` | Updates a department’s name, color, order, or members. |
| `delete_department` | Deletes a department by id. |
| `update_person_departments` | Sets which departments a person belongs to. |
| `department_work` | Lists work grouped by department. |
| `my_todos` | Lists the current user’s plan todos. |
| `reorder_departments` | Sets the sort order of departments from a list of ids. |
| `create_template` | Creates a plan template. |
| `get_template` | Fetches a plan template by id. |
| `save_template` | Saves a template’s tasks and schedule settings. |
| `delete_template` | Deletes a plan template by id. |
| `create_project` | Creates a plan project, optionally from a template. |
| `update_project` | Updates a project’s name or delivery date. |
| `delete_project` | Deletes a plan project by id. |
| `get_project` | Fetches a plan project by id. |
| `create_task` | Creates a task on a project. |
| `update_task` | Updates a plan task. |
| `delete_task` | Deletes a plan task by id. |
| `move_task` | Moves a task to another department, date, or position. |
| `related_tasks` | Lists tasks related to a given task. |
| `connected_tasks` | Lists tasks connected to a given task. |
| `reschedule` | Reschedules a task and optionally shifts related work. |
| `delete_task_attachment` | Deletes an attachment from a plan task. |

### Organizations

| Tool | What it does |
| --- | --- |
| `org_settings` | Returns organization settings for the current user. |
| `switch_org` | Switches the active organization. |
| `rename` | Renames the current organization. |
| `create_invite` | Invites someone to the organization by email. |
| `patch_membership` | Changes a member’s role. |
| `make_owner` | Transfers organization ownership to a member. |
| `kick_member` | Removes a member from the organization. |
| `revoke_invite` | Revokes a pending invitation. |

### Auth (JSON API)

| Tool | What it does |
| --- | --- |
| `auth_status` | Returns whether the current session or token is authenticated. |
| `setup` | Creates the first local username and password. |
| `login` | Logs in with username and password. |
| `logout` | Logs out of the JSON auth session. |

### Tokens

| Tool | What it does |
| --- | --- |
| `list_tokens` | Lists API tokens (prefixes and scopes, not the secret value). |
| `create_token` | Creates an API token with a name and optional scopes. |
| `revoke_token` | Revokes an API token by id. |

### Outlook

| Tool | What it does |
| --- | --- |
| `outlook_status` | Returns Outlook connection status and calendars. |
| `outlook_disconnect` | Disconnects an Outlook account. |
| `outlook_calendars` | Selects which Outlook calendars to use. |
| `outlook_events` | Lists Outlook events between a start and end time. |

### iCal

| Tool | What it does |
| --- | --- |
| `ical_status` | Lists configured iCal feeds. |
| `ical_add_feed` | Adds an iCal feed URL. |
| `ical_patch_feed` | Updates an iCal feed’s label, URL, or color. |
| `ical_delete_feed` | Removes an iCal feed. |
| `ical_events` | Lists iCal events between a start and end time. |

### Calendar export

| Tool | What it does |
| --- | --- |
| `calendar_export_status` | Returns whether calendar export is enabled and its path. |
| `calendar_export_enable` | Enables the calendar export feed. |
| `calendar_export_disable` | Disables the calendar export feed. |
| `calendar_export_regenerate` | Regenerates the calendar export token/path. |
| `calendar_feed` | Fetches the exported calendar feed for a given token. |

### Push and notifications

| Tool | What it does |
| --- | --- |
| `get_vapid` | Returns the VAPID public key for web push. |
| `subscribe` | Subscribes a browser push endpoint. |
| `unsubscribe` | Unsubscribes a browser push endpoint. |
| `test_push` | Sends a test push notification. |
| `get_preferences` | Returns notification preferences. |
| `patch_preferences` | Updates a notification preference category. |

### Files, live, and health

| Tool | What it does |
| --- | --- |
| `get_file` | Fetches an attachment file by id. |
| `live_stream` | Opens the live-update stream endpoint. |
| `health` | Checks that the TTM-Todo API is up. |

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
