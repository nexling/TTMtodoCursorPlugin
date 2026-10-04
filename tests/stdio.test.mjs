import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const serverPath = fileURLToPath(new URL("../mcp-server/index.mjs", import.meta.url));

function startMockApi() {
  const inbox = {
    id: "bucket-inbox",
    name: "Inbox",
    color: "#7c9a6d",
    sort_order: 0,
    is_inbox: true,
    open_count: 1,
  };
  const item = {
    id: "item-1",
    bucket_id: "bucket-inbox",
    parent_id: null,
    title: "From stdio",
    notes: null,
    status: "open",
    source: "api",
    created_at: "2026-10-04T10:00:00Z",
    completed_at: null,
    due_at: null,
  };
  const calls = [];

  const server = createServer(async (req, res) => {
    const url = new URL(req.url, "http://127.0.0.1");
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const raw = Buffer.concat(chunks).toString("utf8");
    const body = raw ? JSON.parse(raw) : undefined;
    calls.push({ method: req.method, pathname: url.pathname, search: url.searchParams.toString(), body });

    const send = (status, payload) => {
      res.writeHead(status, { "Content-Type": "application/json" });
      res.end(JSON.stringify(payload));
    };

    if (req.headers.authorization !== "Bearer mt_stdio_token") {
      send(401, { detail: "unauthorized" });
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/inbox") {
      send(500, { detail: "POST /api/inbox must not be used" });
      return;
    }
    if (req.method === "GET" && url.pathname === "/api/buckets") {
      send(200, [inbox]);
      return;
    }
    if (req.method === "GET" && url.pathname === "/api/items") {
      send(200, [item]);
      return;
    }
    if (req.method === "POST" && url.pathname === "/api/items") {
      send(200, { ...item, id: "item-created", title: body.title, bucket_id: body.bucket_id });
      return;
    }
    send(404, { detail: "not found" });
  });

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      resolve({
        port,
        calls,
        close: () =>
          new Promise((closeResolve, closeReject) => {
            server.close((err) => (err ? closeReject(err) : closeResolve()));
          }),
      });
    });
  });
}

function rpc(child, message) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Timed out waiting for id ${message.id}`)), 5000);
    const onData = (chunk) => {
      for (const line of chunk.toString("utf8").split("\n")) {
        if (!line.trim()) continue;
        let parsed;
        try {
          parsed = JSON.parse(line);
        } catch {
          continue;
        }
        if (parsed.id === message.id) {
          clearTimeout(timer);
          child.stdout.off("data", onData);
          resolve(parsed);
        }
      }
    };
    child.stdout.on("data", onData);
    child.stdin.write(`${JSON.stringify(message)}\n`);
  });
}

describe("stdio MCP server", () => {
  it("lists the inbox through the plugin entrypoint", async () => {
    const api = await startMockApi();
    const child = spawn(process.execPath, [serverPath], {
      env: {
        ...process.env,
        TODO_API_TOKEN: "mt_stdio_token",
        TODO_BASE_URL: `http://127.0.0.1:${api.port}`,
      },
      stdio: ["pipe", "pipe", "pipe"],
    });

    try {
      await rpc(child, {
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
        params: { protocolVersion: "2025-03-26", capabilities: {}, clientInfo: { name: "test" } },
      });
      const listed = await rpc(child, {
        jsonrpc: "2.0",
        id: 2,
        method: "tools/call",
        params: { name: "list_inbox", arguments: {} },
      });
      const payload = JSON.parse(listed.result.content[0].text);
      assert.equal(payload.inbox.id, "bucket-inbox");
      assert.equal(payload.items[0].title, "From stdio");

      const added = await rpc(child, {
        jsonrpc: "2.0",
        id: 3,
        method: "tools/call",
        params: { name: "add_item", arguments: { title: "Captured from Cursor" } },
      });
      const created = JSON.parse(added.result.content[0].text);
      assert.equal(created.item.title, "Captured from Cursor");
      assert.equal(created.item.bucket_id, "bucket-inbox");
      assert.equal(created.added_to_inbox, true);
      assert.equal(
        api.calls.some((call) => call.pathname === "/api/inbox"),
        false,
      );
      assert.equal(
        api.calls.some((call) => call.method === "POST" && call.pathname === "/api/items"),
        true,
      );
    } finally {
      child.kill("SIGTERM");
      await api.close();
    }
  });
});
