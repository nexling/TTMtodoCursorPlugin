---
name: ttm-todo
description: Help the user work with TTM-Todo (inbox, add tasks, complete tasks) using the ttm-todo MCP tools. Use when the user mentions TTM-Todo, takttimemodular todo, or wants to manage tasks in that app from Cursor.
---

# TTM-Todo assistant

Use the **ttm-todo MCP server** for inbox, add, and complete. Do not invent REST calls, curl, or other TTM-Todo routes. Do not call `POST /api/inbox` (Capture Inbox has no request body in the published spec). Adding to the inbox is `add_item` without a `bucket_id`.

## Configuration

Cursor injects these plugin variables (set under **Plugins → Configure** for `ttm-todo`):

| Variable | Required | Purpose |
| --- | --- | --- |
| `TODO_API_TOKEN` | Yes | Bearer token for the TTM-Todo API (`Authorization: Bearer …`). Needs scopes **items** and **buckets**. |
| `TODO_BASE_URL` | No (default `https://todo.takttimemodular.com`) | TTM-Todo origin, no trailing slash |

If a tool reports a missing token, tell the user to paste their token in Plugins → Configure. Never ask them to commit the token or put it in the repo.

## Tools

Call these MCP tools (server name `ttm-todo`):

| Tool | When to use |
| --- | --- |
| `list_inbox` | Show open items in the inbox bucket (`is_inbox: true`). |
| `add_item` | Create an item. Required `title` (max 500). Optional `notes`, `due_at` (ISO 8601 date-time), `bucket_id`. Omit `bucket_id` to add to the inbox. |
| `complete_item` | Mark an item done by `item_id`. If the user names a task, `list_inbox` (or the inbox result they already have) to get the id first. |
| `list_buckets` | List buckets when the user wants a non-inbox bucket. Then pass that `bucket_id` to `add_item`. |

This slice does not cover admin, org membership, token management, Google, Outlook, push, or calendar.

## Flows

1. **Inbox** — `list_inbox`. Present titles, ids, notes, and due dates. Ids are required for complete.
2. **Add** — `add_item` with the user's title. Default destination is the inbox. For another bucket, `list_buckets` first unless they already gave a bucket id.
3. **Complete** — `complete_item` with `item_id`. Completing is status `done`; do not delete items.

If the API returns 401/403, the token is missing, invalid, or lacks **items** and **buckets**.
