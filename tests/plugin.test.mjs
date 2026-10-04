import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { TOOLS } from "../mcp-server/tools.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));

function read(relPath) {
  return readFileSync(path.join(root, relPath), "utf8");
}

describe("plugin contract", () => {
  it("bumps the manifest to 0.3.0 and keeps both variables", () => {
    const manifest = JSON.parse(read(".cursor-plugin/plugin.json"));
    assert.equal(manifest.name, "ttm-todo");
    assert.equal(manifest.version, "0.3.0");
    assert.deepEqual(Object.keys(manifest.variables.properties).sort(), ["TODO_API_TOKEN", "TODO_BASE_URL"]);
    assert.deepEqual(manifest.variables.required, ["TODO_API_TOKEN"]);
  });

  it("discovers the MCP server with Cursor placeholders only", () => {
    const mcp = JSON.parse(read("mcp.json"));
    const server = mcp.mcpServers["ttm-todo"];
    assert.equal(server.command, "node");
    assert.deepEqual(server.args, ["${CURSOR_PLUGIN_ROOT}/mcp-server/index.mjs"]);
    assert.equal(server.env.TODO_API_TOKEN, "${TODO_API_TOKEN}");
    assert.equal(server.env.TODO_BASE_URL, "${TODO_BASE_URL}");
    const serialized = JSON.stringify(mcp);
    assert.equal(serialized.includes("${PLUGIN_ROOT}"), false);
    assert.equal(serialized.includes("mt_"), false);
  });

  it("skill uses convenience tools and the broader JSON API tools", () => {
    const skill = read("skills/ttm-todo/SKILL.md");
    assert.match(skill, /list_inbox/);
    assert.match(skill, /add_item/);
    assert.match(skill, /complete_item/);
    assert.match(skill, /create_item/);
    assert.match(skill, /list_items/);
    assert.equal(/not wired/i.test(skill), false);
    assert.equal(/API is not wired/i.test(skill), false);
    assert.equal(/This slice does not cover/i.test(skill), false);
  });

  it("README describes every MCP tool by name", () => {
    const readme = read("README.md");
    const missing = TOOLS.map((tool) => tool.name).filter((name) => !readme.includes(`\`${name}\``));
    assert.deepEqual(missing, []);
    for (const name of ["admin_home", "google_status", "remarkable_status", "send_to_remarkable", "google_keep_connect"]) {
      assert.equal(readme.includes(`\`${name}\``), false, name);
    }
  });
});
