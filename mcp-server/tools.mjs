import { TtmApiError, TtmConfigError } from "./api.mjs";

export const TOOLS = [
  {
    name: "list_inbox",
    description:
      "List open items in the TTM-Todo inbox. Resolves the inbox as the bucket with is_inbox=true, then lists items in that bucket with include_done=false.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: "list_buckets",
    description:
      "List TTM-Todo buckets. Use this to find a non-inbox bucket id before add_item. The inbox is the bucket with is_inbox=true.",
    inputSchema: {
      type: "object",
      properties: {},
      additionalProperties: false,
    },
  },
  {
    name: "add_item",
    description:
      "Create a TTM-Todo item via POST /api/items. If bucket_id is omitted, the item is added to the inbox bucket. Optional notes and due_at (ISO 8601 date-time).",
    inputSchema: {
      type: "object",
      properties: {
        title: {
          type: "string",
          maxLength: 500,
          description: "Item title (required, max 500 characters).",
        },
        notes: {
          type: "string",
          description: "Optional notes.",
        },
        due_at: {
          type: "string",
          description: "Optional due date-time (ISO 8601).",
        },
        bucket_id: {
          type: "string",
          description: "Optional bucket id. Omit to add to the inbox.",
        },
      },
      required: ["title"],
      additionalProperties: false,
    },
  },
  {
    name: "complete_item",
    description: 'Mark a TTM-Todo item done by id (PATCH /api/items/{item_id} with {"status":"done"}).',
    inputSchema: {
      type: "object",
      properties: {
        item_id: {
          type: "string",
          description: "Id of the item to complete.",
        },
      },
      required: ["item_id"],
      additionalProperties: false,
    },
  },
];

function textResult(payload, { isError = false } = {}) {
  const text = typeof payload === "string" ? payload : JSON.stringify(payload, null, 2);
  return {
    content: [{ type: "text", text }],
    isError,
  };
}

function errorResult(err) {
  const message = err instanceof Error ? err.message : String(err);
  return textResult(message, { isError: true });
}

function requireString(value, field) {
  if (typeof value !== "string" || !value.trim()) {
    throw new TtmConfigError(`${field} is required.`);
  }
  return value.trim();
}

function optionalString(value) {
  if (value == null) return undefined;
  if (typeof value !== "string") return String(value);
  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
}

export function createToolHandlers(client) {
  return {
    async list_inbox() {
      const inbox = await client.findInboxBucket();
      const items = await client.listItems({ bucket_id: inbox.id, include_done: false });
      const openItems = items.filter((item) => !item?.status || item.status === "open");
      return textResult({
        inbox: {
          id: inbox.id,
          name: inbox.name,
          is_inbox: true,
          open_count: inbox.open_count,
        },
        items: openItems,
      });
    },

    async list_buckets() {
      const buckets = await client.listBuckets();
      return textResult({ buckets });
    },

    async add_item(args = {}) {
      const title = requireString(args.title, "title");
      if (title.length > 500) {
        throw new TtmConfigError("title must be at most 500 characters.");
      }

      let bucketId = optionalString(args.bucket_id);
      let inbox = null;
      if (!bucketId) {
        inbox = await client.findInboxBucket();
        bucketId = inbox.id;
      }

      const body = { title, bucket_id: bucketId };
      const notes = optionalString(args.notes);
      const dueAt = optionalString(args.due_at);
      if (notes) body.notes = notes;
      if (dueAt) body.due_at = dueAt;

      const item = await client.createItem(body);
      return textResult({
        item,
        added_to_inbox: Boolean(inbox) || item?.bucket_id === inbox?.id,
        bucket_id: bucketId,
      });
    },

    async complete_item(args = {}) {
      const itemId = requireString(args.item_id, "item_id");
      const item = await client.patchItem(itemId, { status: "done" });
      return textResult({ item });
    },
  };
}

export async function callTool(handlers, name, args = {}) {
  const handler = handlers[name];
  if (!handler) {
    return textResult(`Unknown tool: ${name}. Use list_inbox, list_buckets, add_item, or complete_item.`, {
      isError: true,
    });
  }
  try {
    return await handler(args || {});
  } catch (err) {
    if (err instanceof TtmConfigError || err instanceof TtmApiError) {
      return errorResult(err);
    }
    return errorResult(err);
  }
}
