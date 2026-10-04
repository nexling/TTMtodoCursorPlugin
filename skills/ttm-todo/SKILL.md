---
name: ttm-todo
description: Help the user work with TTM-Todo using the ttm-todo MCP tools (inbox, items, buckets, plan, and the rest of the JSON API). Use when the user mentions TTM-Todo, takttimemodular todo, or wants to manage that app from Cursor.
---

# TTM-Todo assistant

Use the **ttm-todo MCP server**. Call its tools instead of inventing curl or REST. Do not call `POST /api/inbox` (Capture Inbox has no request body in the published spec). Adding to the inbox is `add_item` without a `bucket_id` (or `create_item` with the inbox bucket id).

## Configuration

Cursor injects these plugin variables (**Plugins → Configure** for `ttm-todo`):

| Variable | Required | Purpose |
| --- | --- | --- |
| `TODO_API_TOKEN` | Yes | Bearer token (`Authorization: Bearer …`). Scopes: **inbox**, **items**, **buckets**, **plan**. |
| `TODO_BASE_URL` | No (default `https://todo.takttimemodular.com`) | Origin, no trailing slash |

If a tool reports a missing token, tell the user to paste it in Plugins → Configure. Never commit the token.

Plan tools accept optional `x_organization_id` (sent as `X-Organization-Id`). Pass it when the user belongs to more than one licensed organization.

## Convenience tools

Prefer these for the common inbox workflow:

| Tool | When to use |
| --- | --- |
| `list_inbox` | Open items in the inbox bucket (`is_inbox: true`). |
| `add_item` | Create an item. Required `title` (max 500). Optional `notes`, `due_at`, `bucket_id`. Omit `bucket_id` to add to the inbox. |
| `complete_item` | Mark done by `item_id` (`status: done`). Reopen with `patch_item` and `status: "open"`. |

## JSON API tools

There is one MCP tool per JSON operation in the TTM-Todo OpenAPI spec. Names, paths, query params, and JSON body fields match that contract. Use `tools/list` if you need the schema. Groups:

- **items** — `list_items`, `create_item`, `reorder_items`, `get_item`, `patch_item`, `remove_item`, `delete_attachment`
- **buckets** — `list_buckets`, `create_bucket`, `reorder_buckets`, `update_bucket`, `delete_bucket`
- **plan** — `overview`, `my_todos`, `department_work`, department/template/project/task CRUD, `move_task`, `related_tasks`, `connected_tasks`, `reschedule`, `delete_task_attachment`
- **orgs** — `org_settings`, `switch_org`, `rename`, invites, membership, `make_owner`, `kick_member`
- **auth** — `auth_status`, `setup`, `login`, `logout` (JSON `/api/auth/*`, not the Auth0 HTML pages)
- **tokens** — `list_tokens`, `create_token`, `revoke_token`
- **admin** — `admin_home`, licenses, organizations, `test_mail`
- **google / outlook / ical / calendar-export / remarkable / push / notifications / files / live / health** — status, disconnect, list/sync, events, feeds, export, vapid, preferences, `get_file`, `live_stream`, `health`

OAuth **connect/callback** pages, Auth0 HTML login/logout/callback, the SPA catch-all, and multipart file-upload routes are not tools. For attaching files, send the user to the TTM-Todo web UI.

## Flows

1. **Inbox** — `list_inbox`. Show titles, ids, notes, due dates.
2. **Add** — `add_item` with the user's title. Default destination is the inbox. For another bucket, `list_buckets` then pass `bucket_id`.
3. **Complete** — `complete_item` with `item_id`. Do not delete unless the user asks (`remove_item`).
4. **Anything else the API supports** — pick the matching JSON API tool. Do not invent paths.

401/403 means the token is missing, invalid, or lacks the needed scope.
