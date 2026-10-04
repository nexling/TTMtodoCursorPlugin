import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createTtmClient } from "../mcp-server/api.mjs";
import { TOOLS, callTool, createToolHandlers } from "../mcp-server/tools.mjs";
import { createMcpDispatcher, SERVER_INFO } from "../mcp-server/server.mjs";

const inbox = {
  id: "bucket-inbox",
  name: "Inbox",
  color: "#7c9a6d",
  sort_order: 0,
  is_inbox: true,
  open_count: 2,
};
const later = {
  id: "bucket-later",
  name: "Later",
  color: "#999999",
  sort_order: 1,
  is_inbox: false,
  open_count: 0,
};
const openItem = {
  id: "item-1",
  bucket_id: "bucket-inbox",
  parent_id: null,
  title: "Review PR",
  notes: "slice 2",
  status: "open",
  source: "api",
  created_at: "2026-10-04T10:00:00Z",
  completed_at: null,
  due_at: null,
};
const doneItem = {
  ...openItem,
  id: "item-done",
  status: "done",
  completed_at: "2026-10-04T09:00:00Z",
};

function jsonResponse(status, body) {
  return {
    ok: status >= 200 && status < 300,
    status,
    async text() {
      return JSON.stringify(body);
    },
  };
}

function mockClient(handler) {
  const calls = [];
  async function fetchImpl(url, options = {}) {
    const parsed = new URL(url);
    const entry = {
      method: options.method || "GET",
      pathname: parsed.pathname,
      searchParams: Object.fromEntries(parsed.searchParams.entries()),
      body: options.body ? JSON.parse(options.body) : undefined,
      headers: options.headers,
    };
    calls.push(entry);
    return handler(entry);
  }
  const client = createTtmClient({ token: "mt_test_token", fetchImpl });
  return { client, calls, handlers: createToolHandlers(client) };
}

function parseTool(result) {
  assert.equal(result.isError ?? false, false, result.content?.[0]?.text);
  return JSON.parse(result.content[0].text);
}

describe("tools", () => {
  it("exposes convenience tools plus one tool per JSON API operation", () => {
    const names = TOOLS.map((tool) => tool.name);
    for (const name of ["list_inbox", "add_item", "complete_item", "list_buckets", "create_item", "patch_item"]) {
      assert.equal(names.includes(name), true, name);
    }
    assert.equal(names.filter((name) => name === "list_buckets").length, 1);
    assert.equal(names.includes("capture_inbox"), false);
    for (const name of ["admin_home", "google_status", "remarkable_status", "send_to_remarkable"]) {
      assert.equal(names.includes(name), false, name);
    }
  });

  it("list_inbox uses the is_inbox bucket and open items only", async () => {
    const { handlers, calls } = mockClient((entry) => {
      if (entry.pathname === "/api/buckets") return jsonResponse(200, [later, inbox]);
      if (entry.pathname === "/api/items") return jsonResponse(200, [openItem, doneItem]);
      return jsonResponse(404, { detail: "nope" });
    });
    const payload = parseTool(await handlers.list_inbox());
    assert.equal(payload.inbox.id, "bucket-inbox");
    assert.equal(payload.inbox.is_inbox, true);
    assert.equal(payload.items.length, 1);
    assert.equal(payload.items[0].id, "item-1");
    assert.equal(calls[1].pathname, "/api/items");
    assert.equal(calls[1].searchParams.bucket_id, "bucket-inbox");
    assert.equal(calls[1].searchParams.include_done, "false");
    assert.equal(calls.some((call) => call.pathname === "/api/inbox"), false);
  });

  it("add_item without bucket_id posts to the inbox bucket", async () => {
    const { handlers, calls } = mockClient((entry) => {
      if (entry.pathname === "/api/buckets") return jsonResponse(200, [inbox, later]);
      if (entry.method === "POST" && entry.pathname === "/api/items") {
        return jsonResponse(200, { ...openItem, id: "item-new", title: entry.body.title });
      }
      return jsonResponse(500, { detail: "unexpected" });
    });
    const payload = parseTool(
      await handlers.add_item({
        title: "Write tests",
        notes: "cover the spec",
        due_at: "2026-10-06T08:00:00Z",
      }),
    );
    assert.equal(payload.item.id, "item-new");
    assert.equal(payload.added_to_inbox, true);
    const create = calls.find((call) => call.method === "POST");
    assert.equal(create.pathname, "/api/items");
    assert.deepEqual(create.body, {
      title: "Write tests",
      bucket_id: "bucket-inbox",
      notes: "cover the spec",
      due_at: "2026-10-06T08:00:00Z",
    });
    assert.equal(calls.some((call) => call.pathname === "/api/inbox"), false);
  });

  it("add_item with bucket_id skips inbox lookup", async () => {
    const { handlers, calls } = mockClient((entry) => {
      if (entry.method === "POST" && entry.pathname === "/api/items") {
        return jsonResponse(200, { ...openItem, bucket_id: "bucket-later" });
      }
      return jsonResponse(500, { detail: "unexpected" });
    });
    const payload = parseTool(await handlers.add_item({ title: "Later task", bucket_id: "bucket-later" }));
    assert.equal(payload.added_to_inbox, false);
    assert.equal(payload.bucket_id, "bucket-later");
    assert.equal(calls.length, 1);
    assert.equal(calls[0].body.bucket_id, "bucket-later");
  });

  it("complete_item patches status done by id", async () => {
    const { handlers, calls } = mockClient((entry) => {
      if (entry.method === "PATCH" && entry.pathname === "/api/items/item-1") {
        return jsonResponse(200, { ...openItem, status: "done" });
      }
      return jsonResponse(500, { detail: "unexpected" });
    });
    const payload = parseTool(await handlers.complete_item({ item_id: "item-1" }));
    assert.equal(payload.item.status, "done");
    assert.deepEqual(calls[0].body, { status: "done" });
  });

  it("list_buckets returns every bucket", async () => {
    const { handlers } = mockClient((entry) => {
      if (entry.pathname === "/api/buckets") return jsonResponse(200, [inbox, later]);
      return jsonResponse(500, { detail: "unexpected" });
    });
    const payload = parseTool(await handlers.list_buckets());
    assert.equal(payload.method, "GET");
    assert.equal(payload.path, "/api/buckets");
    assert.equal(payload.result.length, 2);
    assert.equal(payload.result[0].is_inbox, true);
  });

  it("rejects add_item without a title", async () => {
    const { handlers, calls } = mockClient(() => jsonResponse(200, []));
    const result = await callTool(handlers, "add_item", { notes: "no title" });
    assert.equal(result.isError, true);
    assert.match(result.content[0].text, /title is required/);
    assert.equal(calls.length, 0);
  });

  it("rejects titles longer than 500 characters", async () => {
    const { handlers, calls } = mockClient(() => jsonResponse(200, []));
    const result = await callTool(handlers, "add_item", { title: "x".repeat(501) });
    assert.equal(result.isError, true);
    assert.match(result.content[0].text, /at most 500/);
    assert.equal(calls.length, 0);
  });
});

describe("MCP dispatcher", () => {
  it("initializes and lists tools", async () => {
    const { client } = mockClient(() => jsonResponse(200, []));
    const dispatch = createMcpDispatcher(client);
    const init = await dispatch({
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: { protocolVersion: "2025-03-26", capabilities: {}, clientInfo: { name: "test" } },
    });
    assert.equal(init.result.serverInfo.name, SERVER_INFO.name);
    assert.equal(init.result.serverInfo.version, "0.3.0");
    const listed = await dispatch({ jsonrpc: "2.0", id: 2, method: "tools/list" });
    const names = listed.result.tools.map((tool) => tool.name);
    assert.equal(names.includes("list_inbox"), true);
    assert.equal(names.includes("create_item"), true);
    assert.equal(names.includes("overview"), true);
    assert.ok(listed.result.tools.length > 70);
  });

  it("calls complete_item over JSON-RPC", async () => {
    const { client } = mockClient((entry) => {
      if (entry.method === "PATCH") return jsonResponse(200, { ...openItem, status: "done" });
      return jsonResponse(404, {});
    });
    const dispatch = createMcpDispatcher(client);
    const response = await dispatch({
      jsonrpc: "2.0",
      id: 3,
      method: "tools/call",
      params: { name: "complete_item", arguments: { item_id: "item-1" } },
    });
    const payload = JSON.parse(response.result.content[0].text);
    assert.equal(payload.item.status, "done");
  });
});
