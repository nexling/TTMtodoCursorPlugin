#!/usr/bin/env node
import { createTtmClient } from "./api.mjs";
import { createMcpDispatcher } from "./server.mjs";

const dispatch = createMcpDispatcher(createTtmClient());

function writeMessage(message) {
  process.stdout.write(`${JSON.stringify(message)}\n`);
}

async function handleLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return;
  let parsed;
  try {
    parsed = JSON.parse(trimmed);
  } catch {
    writeMessage({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } });
    return;
  }
  const response = await dispatch(parsed);
  if (response) writeMessage(response);
}

let buffer = "";
let queue = Promise.resolve();
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => {
  buffer += chunk;
  let newline;
  while ((newline = buffer.indexOf("\n")) !== -1) {
    const line = buffer.slice(0, newline);
    buffer = buffer.slice(newline + 1);
    queue = queue.then(() => handleLine(line)).catch((err) => {
      process.stderr.write(`[ttm-todo] ${err.stack || err.message}\n`);
    });
  }
});

process.stdin.on("end", () => {
  if (buffer.trim()) {
    handleLine(buffer).catch((err) => {
      process.stderr.write(`[ttm-todo] ${err.stack || err.message}\n`);
    });
  }
});

process.stdin.resume();
