import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { createTtmClient, normalizeBaseUrl, TtmConfigError } from "../mcp-server/api.mjs";

function jsonResponse(status, body, { contentType = "application/json" } = {}) {
  return {
    ok: status >= 200 && status < 300,
    status,
    async text() {
      if (typeof body === "string") return body;
      return JSON.stringify(body);
    },
    headers: { get: () => contentType },
  };
}

function createFetchRecorder(handler) {
  const calls = [];
  async function fetchImpl(url, options = {}) {
    const parsed = new URL(url);
    const entry = {
      method: options.method || "GET",
      href: parsed.href,
      pathname: parsed.pathname,
      searchParams: Object.fromEntries(parsed.searchParams.entries()),
      headers: options.headers,
      body: options.body ? JSON.parse(options.body) : undefined,
    };
    calls.push(entry);
    return handler(entry);
  }
  return { fetchImpl, calls };
}

const inbox = {
  id: "bucket-inbox",
  name: "Inbox",
  color: "#7c9a6d",
  sort_order: 0,
  is_inbox: true,
  open_count: 1,
};
const work = {
  id: "bucket-work",
  name: "Work",
  color: "#336699",
  sort_order: 1,
  is_inbox: false,
  open_count: 0,
};
const openItem = {
  id: "item-1",
  bucket_id: "bucket-inbox",
  parent_id: null,
  title: "Buy milk",
  notes: null,
  status: "open",
  source: "api",
  created_at: "2026-10-04T10:00:00Z",
  completed_at: null,
  due_at: null,
};

describe("normalizeBaseUrl", () => {
  it("strips trailing slashes and defaults", () => {
    assert.equal(normalizeBaseUrl(undefined), "https://todo.takttimemodular.com");
    assert.equal(normalizeBaseUrl("https://example.test/todo/"), "https://example.test/todo");
    assert.equal(normalizeBaseUrl("${TODO_BASE_URL}"), "https://todo.takttimemodular.com");
  });
});

describe("createTtmClient", () => {
  it("sends Bearer auth and lists buckets", async () => {
    const { fetchImpl, calls } = createFetchRecorder(() => jsonResponse(200, [inbox, work]));
    const client = createTtmClient({
      token: "mt_test_token",
      baseUrl: "https://todo.example.test/",
      fetchImpl,
    });
    const buckets = await client.listBuckets();
    assert.equal(buckets[0].is_inbox, true);
    assert.equal(calls[0].method, "GET");
    assert.equal(calls[0].pathname, "/api/buckets");
    assert.equal(calls[0].headers.Authorization, "Bearer mt_test_token");
    assert.equal(calls[0].href.startsWith("https://todo.example.test/"), true);
  });

  it("finds the inbox by is_inbox true", async () => {
    const { fetchImpl } = createFetchRecorder(() => jsonResponse(200, [work, inbox]));
    const client = createTtmClient({ token: "mt_test_token", fetchImpl });
    const found = await client.findInboxBucket();
    assert.equal(found.id, "bucket-inbox");
  });

  it("lists items with bucket_id and include_done=false", async () => {
    const { fetchImpl, calls } = createFetchRecorder(() => jsonResponse(200, [openItem]));
    const client = createTtmClient({ token: "mt_test_token", fetchImpl });
    const items = await client.listItems({ bucket_id: "bucket-inbox", include_done: false });
    assert.equal(items[0].status, "open");
    assert.equal(calls[0].pathname, "/api/items");
    assert.equal(calls[0].searchParams.bucket_id, "bucket-inbox");
    assert.equal(calls[0].searchParams.include_done, "false");
  });

  it("creates an item with the documented JSON fields", async () => {
    const { fetchImpl, calls } = createFetchRecorder(() => jsonResponse(200, { ...openItem, id: "item-2" }));
    const client = createTtmClient({ token: "mt_test_token", fetchImpl });
    await client.createItem({
      title: "Ship plugin",
      notes: "v0.2.0",
      bucket_id: "bucket-inbox",
      due_at: "2026-10-05T12:00:00Z",
    });
    assert.equal(calls[0].method, "POST");
    assert.equal(calls[0].pathname, "/api/items");
    assert.deepEqual(calls[0].body, {
      title: "Ship plugin",
      notes: "v0.2.0",
      bucket_id: "bucket-inbox",
      due_at: "2026-10-05T12:00:00Z",
    });
    assert.equal(calls[0].headers["Content-Type"], "application/json");
  });

  it("completes an item with PATCH status done", async () => {
    const { fetchImpl, calls } = createFetchRecorder(() =>
      jsonResponse(200, { ...openItem, status: "done", completed_at: "2026-10-04T11:00:00Z" }),
    );
    const client = createTtmClient({ token: "mt_test_token", fetchImpl });
    await client.patchItem("item-1", { status: "done" });
    assert.equal(calls[0].method, "PATCH");
    assert.equal(calls[0].pathname, "/api/items/item-1");
    assert.deepEqual(calls[0].body, { status: "done" });
  });

  it("rejects missing tokens before calling the API", async () => {
    const { fetchImpl, calls } = createFetchRecorder(() => jsonResponse(200, []));
    const client = createTtmClient({ token: "", fetchImpl });
    await assert.rejects(() => client.listBuckets(), TtmConfigError);
    const placeholder = createTtmClient({ token: "${TODO_API_TOKEN}", fetchImpl });
    await assert.rejects(() => placeholder.listBuckets(), /TODO_API_TOKEN/);
    assert.equal(calls.length, 0);
  });

  it("never uses POST /api/inbox", async () => {
    const { fetchImpl, calls } = createFetchRecorder((entry) => {
      if (entry.pathname === "/api/inbox") {
        return jsonResponse(500, { detail: "capture inbox must not be called" });
      }
      if (entry.pathname === "/api/buckets") return jsonResponse(200, [inbox]);
      if (entry.method === "POST" && entry.pathname === "/api/items") {
        return jsonResponse(200, openItem);
      }
      return jsonResponse(404, { detail: "not found" });
    });
    const client = createTtmClient({ token: "mt_test_token", fetchImpl });
    await client.createItem({ title: "Captured", bucket_id: "bucket-inbox" });
    assert.equal(calls.some((call) => call.pathname === "/api/inbox"), false);
    assert.equal(calls.some((call) => call.method === "POST" && call.pathname === "/api/items"), true);
  });
});
