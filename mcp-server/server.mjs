import { TOOLS, callTool, createToolHandlers } from "./tools.mjs";

export const SERVER_INFO = {
  name: "ttm-todo",
  version: "0.3.0",
};

const SUPPORTED_PROTOCOL_VERSIONS = new Set(["2024-11-05", "2025-03-26", "2025-06-18"]);
const DEFAULT_PROTOCOL_VERSION = "2025-03-26";

export function createMcpDispatcher(client) {
  const handlers = createToolHandlers(client);

  return async function dispatch(message) {
    if (!message || typeof message !== "object") {
      return errorResponse(null, -32600, "Invalid request");
    }

    const { id, method, params } = message;
    const isNotification = id === undefined;

    if (typeof method !== "string") {
      if (isNotification) return null;
      return errorResponse(id, -32600, "Invalid request");
    }

    try {
      switch (method) {
        case "initialize": {
          const requested = params?.protocolVersion;
          const protocolVersion = SUPPORTED_PROTOCOL_VERSIONS.has(requested)
            ? requested
            : DEFAULT_PROTOCOL_VERSION;
          return resultResponse(id, {
            protocolVersion,
            capabilities: { tools: {} },
            serverInfo: SERVER_INFO,
          });
        }
        case "notifications/initialized":
        case "notifications/cancelled":
          return null;
        case "ping":
          return resultResponse(id, {});
        case "tools/list":
          return resultResponse(id, { tools: TOOLS });
        case "tools/call": {
          const name = params?.name;
          const args = params?.arguments ?? {};
          if (typeof name !== "string" || !name) {
            return errorResponse(id, -32602, "tools/call requires params.name");
          }
          const toolResult = await callTool(handlers, name, args);
          return resultResponse(id, toolResult);
        }
        default:
          if (isNotification) return null;
          return errorResponse(id, -32601, `Method not found: ${method}`);
      }
    } catch (err) {
      if (isNotification) return null;
      return errorResponse(id, -32603, err instanceof Error ? err.message : String(err));
    }
  };
}

function resultResponse(id, result) {
  if (id === undefined) return null;
  return { jsonrpc: "2.0", id, result };
}

function errorResponse(id, code, message) {
  return { jsonrpc: "2.0", id, error: { code, message } };
}
