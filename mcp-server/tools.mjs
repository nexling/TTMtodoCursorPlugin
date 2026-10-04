import { TtmApiError, TtmConfigError } from "./api.mjs";
import { OPERATIONS } from "./operations.mjs";

export { OPERATIONS, SKIPPED_OPERATIONS } from "./operations.mjs";

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

function isMissing(value) {
  return value === undefined || value === null || value === "";
}

export function executeOperation(client, operation, args = {}) {
  for (const field of operation.required || []) {
    if (isMissing(args[field])) {
      throw new TtmConfigError(`${field} is required for ${operation.method} ${operation.path}.`);
    }
  }

  const path = operation.path.replace(/\{([^}]+)\}/g, (_, name) => {
    const value = args[name];
    if (isMissing(value)) {
      throw new TtmConfigError(`${name} is required for ${operation.method} ${operation.path}.`);
    }
    return encodeURIComponent(String(value));
  });

  const query = {};
  for (const name of operation.queryParams || []) {
    if (args[name] !== undefined && args[name] !== null && args[name] !== "") {
      query[name] = args[name];
    }
  }

  const headers = {};
  if (args.x_organization_id) {
    headers["X-Organization-Id"] = String(args.x_organization_id);
  }

  let body;
  if ((operation.bodyParams || []).length > 0) {
    const payload = {};
    for (const name of operation.bodyParams) {
      if (args[name] !== undefined) payload[name] = args[name];
    }
    if (Object.keys(payload).length > 0) {
      body = payload;
    } else if (operation.bodyRequired) {
      body = {};
    }
  }

  return client.request(operation.method, path, {
    query: Object.keys(query).length ? query : undefined,
    body,
    headers: Object.keys(headers).length ? headers : undefined,
  });
}

const CONVENIENCE_TOOLS = [
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
    name: "add_item",
    description:
      "Create a TTM-Todo item via POST /api/items. If bucket_id is omitted, the item is added to the inbox bucket. Optional notes and due_at (ISO 8601 date-time). For the raw create endpoint (including parent_id and source), use create_item.",
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
    description: 'Mark a TTM-Todo item done by id (PATCH /api/items/{item_id} with {"status":"done"}). To reopen, use patch_item with status "open".',
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

export const TOOLS = [
  ...CONVENIENCE_TOOLS,
  ...OPERATIONS.map((operation) => ({
    name: operation.name,
    description: operation.description,
    inputSchema: operation.inputSchema,
  })),
];

export function createToolHandlers(client) {
  const handlers = {};

  for (const operation of OPERATIONS) {
    handlers[operation.name] = async (args = {}) => {
      const result = await executeOperation(client, operation, args);
      return textResult({
        operation: operation.name,
        method: operation.method,
        path: operation.path,
        result,
      });
    };
  }

  handlers.list_inbox = async () => {
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
  };

  handlers.add_item = async (args = {}) => {
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
      added_to_inbox: Boolean(inbox),
      bucket_id: bucketId,
    });
  };

  handlers.complete_item = async (args = {}) => {
    const itemId = requireString(args.item_id, "item_id");
    const item = await client.patchItem(itemId, { status: "done" });
    return textResult({ item });
  };

  return handlers;
}

export async function callTool(handlers, name, args = {}) {
  const handler = handlers[name];
  if (!handler) {
    return textResult(`Unknown tool: ${name}. Call tools/list on the ttm-todo MCP server.`, {
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
