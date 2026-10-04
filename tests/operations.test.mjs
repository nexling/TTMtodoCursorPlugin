import assert from "node:assert/strict";
import { readdirSync, existsSync, readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { createTtmClient } from "../mcp-server/api.mjs";
import { OPERATIONS, SKIPPED_OPERATIONS, TOOLS, callTool, createToolHandlers } from "../mcp-server/tools.mjs";

function jsonResponse(status, body) {
  return {
    ok: status >= 200 && status < 300,
    status,
    async text() {
      return typeof body === "string" ? body : JSON.stringify(body);
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
    return handler(entry, options);
  }
  const client = createTtmClient({ token: "mt_test_token", fetchImpl });
  return { client, calls, handlers: createToolHandlers(client) };
}

function dummyValue(schema = {}, name = "") {
  if (schema.type === "boolean") return true;
  if (schema.type === "integer" || schema.type === "number") return 1;
  if (schema.type === "array") return ["id-1"];
  if (schema.type === "object") {
    const obj = {};
    for (const key of schema.required || []) {
      obj[key] = dummyValue(schema.properties?.[key] || {}, key);
    }
    return obj;
  }
  if (schema.format === "date-time") return "2026-10-04T12:00:00Z";
  if (name === "start" || name === "end") return "2026-10-04T00:00:00Z";
  return "id-1";
}

function dummyArgs(operation) {
  const args = {};
  for (const name of operation.required || []) {
    args[name] = dummyValue(operation.inputSchema.properties[name], name);
  }
  return args;
}

function expectedPath(operation, args) {
  return operation.path.replace(/\{([^}]+)\}/g, (_, name) => encodeURIComponent(String(args[name])));
}

function findOpenApiSpec() {
  if (process.env.TTM_OPENAPI_PATH && existsSync(process.env.TTM_OPENAPI_PATH)) {
    return process.env.TTM_OPENAPI_PATH;
  }
  const dirs = [
    "/home/ubuntu/.cursor/projects/workspace/uploads",
    "/workspace/uploads",
  ];
  for (const dir of dirs) {
    if (!existsSync(dir)) continue;
    const match = readdirSync(dir)
      .filter((name) => /^ttm-openapi.*\.json$/i.test(name))
      .sort()
      .at(-1);
    if (match) return `${dir}/${match}`;
  }
  return null;
}

describe("JSON API operations", () => {
  it("registers unique tools and never POST /api/inbox", () => {
    const names = TOOLS.map((tool) => tool.name);
    assert.equal(new Set(names).size, names.length);
    assert.equal(OPERATIONS.length, 92);
    assert.equal(TOOLS.length, OPERATIONS.length + 3);
    assert.equal(
      OPERATIONS.some((op) => op.method === "POST" && op.path === "/api/inbox"),
      false,
    );
    assert.equal(
      SKIPPED_OPERATIONS.some((op) => op.method === "POST" && op.path === "/api/inbox"),
      true,
    );
  });

  it("calls each operation with mocked HTTP using spec method and path", async () => {
    const { handlers, calls } = mockClient((entry) => jsonResponse(200, { ok: true, path: entry.pathname }));
    for (const operation of OPERATIONS) {
      const args = dummyArgs(operation);
      const result = await callTool(handlers, operation.name, args);
      assert.equal(result.isError ?? false, false, `${operation.name}: ${result.content?.[0]?.text}`);
    }
    assert.equal(calls.length, OPERATIONS.length);
    assert.equal(
      calls.some((call) => call.pathname === "/api/inbox"),
      false,
    );

    for (let i = 0; i < OPERATIONS.length; i += 1) {
      const operation = OPERATIONS[i];
      const args = dummyArgs(operation);
      const call = calls[i];
      assert.equal(call.method, operation.method, operation.name);
      assert.equal(call.pathname, expectedPath(operation, args), operation.name);
    }
  });

  it("sends query params, JSON bodies, and X-Organization-Id", async () => {
    const { handlers, calls } = mockClient(() => jsonResponse(200, { ok: true }));

    await callTool(handlers, "list_items", {
      bucket_id: "bucket-1",
      include_done: true,
      include_descendants: false,
    });
    await callTool(handlers, "create_item", {
      title: "From spec tool",
      notes: "hello",
      bucket_id: "bucket-1",
      parent_id: "item-parent",
      source: "api",
      due_at: "2026-10-07T12:00:00Z",
    });
    await callTool(handlers, "patch_item", { item_id: "item-1", status: "open" });
    await callTool(handlers, "overview", { x_organization_id: "org-9" });

    const list = calls[0];
    assert.equal(list.method, "GET");
    assert.equal(list.pathname, "/api/items");
    assert.equal(list.searchParams.bucket_id, "bucket-1");
    assert.equal(list.searchParams.include_done, "true");
    assert.equal(list.searchParams.include_descendants, "false");

    const create = calls[1];
    assert.equal(create.method, "POST");
    assert.equal(create.pathname, "/api/items");
    assert.deepEqual(create.body, {
      title: "From spec tool",
      notes: "hello",
      bucket_id: "bucket-1",
      parent_id: "item-parent",
      source: "api",
      due_at: "2026-10-07T12:00:00Z",
    });

    const patch = calls[2];
    assert.equal(patch.method, "PATCH");
    assert.equal(patch.pathname, "/api/items/item-1");
    assert.deepEqual(patch.body, { status: "open" });

    const overview = calls[3];
    assert.equal(overview.method, "GET");
    assert.equal(overview.pathname, "/api/plan/overview");
    assert.equal(overview.headers["X-Organization-Id"], "org-9");
    assert.equal(overview.headers.Authorization, "Bearer mt_test_token");
  });

  it("matches the uploaded OpenAPI JSON operations when the spec is available", () => {
    const specPath = findOpenApiSpec();
    if (!specPath) {
      return;
    }
    const spec = JSON.parse(readFileSync(specPath, "utf8"));
    const skipKeys = new Set(SKIPPED_OPERATIONS.map((op) => `${op.method} ${op.path}`));
    const included = [];
    for (const [path, methods] of Object.entries(spec.paths)) {
      for (const [methodRaw, op] of Object.entries(methods)) {
        if (methodRaw.startsWith("x-") || typeof op !== "object") continue;
        const method = methodRaw.toUpperCase();
        const key = `${method} ${path}`;
        const content = Object.keys(op.requestBody?.content || {});
        if (skipKeys.has(key)) continue;
        if (content.includes("multipart/form-data") && !content.includes("application/json")) continue;
        included.push({ method, path, operationId: op.operationId });
      }
    }

    const byId = new Map(OPERATIONS.map((op) => [op.operationId, op]));
    assert.equal(included.length, OPERATIONS.length);
    for (const op of included) {
      const generated = byId.get(op.operationId);
      assert.ok(generated, `missing tool for ${op.method} ${op.path}`);
      assert.equal(generated.method, op.method);
      assert.equal(generated.path, op.path);
    }
  });
});
