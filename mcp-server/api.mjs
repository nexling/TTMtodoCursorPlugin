const DEFAULT_BASE_URL = "https://todo.takttimemodular.com";

export class TtmConfigError extends Error {
  constructor(message) {
    super(message);
    this.name = "TtmConfigError";
  }
}

export class TtmApiError extends Error {
  constructor(message, { status = 0, body = null } = {}) {
    super(message);
    this.name = "TtmApiError";
    this.status = status;
    this.body = body;
  }
}

function isUnset(value) {
  if (value == null) return true;
  const trimmed = String(value).trim();
  if (!trimmed) return true;
  return trimmed.includes("${");
}

export function normalizeBaseUrl(baseUrl) {
  const raw = isUnset(baseUrl) ? DEFAULT_BASE_URL : String(baseUrl).trim();
  return raw.replace(/\/+$/, "");
}

function formatApiDetail(body) {
  if (body == null) return "";
  if (typeof body === "string") return body;
  if (typeof body.detail === "string") return body.detail;
  if (Array.isArray(body.detail)) {
    return body.detail
      .map((item) => (typeof item === "string" ? item : item?.msg || JSON.stringify(item)))
      .join("; ");
  }
  try {
    return JSON.stringify(body);
  } catch {
    return String(body);
  }
}

export function createTtmClient({
  token = process.env.TODO_API_TOKEN,
  baseUrl = process.env.TODO_BASE_URL,
  fetchImpl = globalThis.fetch,
} = {}) {
  const root = normalizeBaseUrl(baseUrl);

  async function request(method, path, { query, body, headers: extraHeaders } = {}) {
    if (isUnset(token)) {
      throw new TtmConfigError(
        "TODO_API_TOKEN is not set. In Cursor, open Plugins → ttm-todo → Configure and paste your TTM-Todo API token. Token scopes are inbox, items, buckets, and plan.",
      );
    }
    if (typeof fetchImpl !== "function") {
      throw new TtmConfigError("fetch is not available. Use Node.js 18 or later to run the TTM-Todo MCP server.");
    }

    const url = new URL(path, `${root}/`);
    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value === undefined || value === null || value === "") continue;
        url.searchParams.set(key, typeof value === "boolean" ? (value ? "true" : "false") : String(value));
      }
    }

    const headers = {
      Authorization: `Bearer ${String(token).trim()}`,
      Accept: "application/json",
    };
    if (extraHeaders) {
      for (const [key, value] of Object.entries(extraHeaders)) {
        if (value === undefined || value === null || value === "") continue;
        headers[key] = String(value);
      }
    }

    let payload;
    if (body !== undefined) {
      headers["Content-Type"] = "application/json";
      payload = JSON.stringify(body);
    }

    let response;
    try {
      response = await fetchImpl(url, { method, headers, body: payload });
    } catch (err) {
      throw new TtmApiError(`TTM-Todo request failed: ${err.message}`, { status: 0 });
    }

    const text = await response.text();
    let parsed = null;
    if (text) {
      try {
        parsed = JSON.parse(text);
      } catch {
        parsed = text;
      }
    }

    if (!response.ok) {
      const detail = formatApiDetail(parsed);
      const scopeHint =
        response.status === 401 || response.status === 403
          ? " Check that TODO_API_TOKEN is valid and has the needed scopes (inbox, items, buckets, plan)."
          : "";
      throw new TtmApiError(
        `TTM-Todo API ${method} ${url.pathname} returned ${response.status}${detail ? `: ${detail}` : "."}${scopeHint}`,
        { status: response.status, body: parsed },
      );
    }

    return parsed;
  }

  async function listBuckets() {
    const buckets = await request("GET", "/api/buckets");
    if (!Array.isArray(buckets)) {
      throw new TtmApiError("TTM-Todo GET /api/buckets did not return a list.", { body: buckets });
    }
    return buckets;
  }

  async function findInboxBucket() {
    const buckets = await listBuckets();
    const inbox = buckets.find((bucket) => bucket && bucket.is_inbox === true);
    if (!inbox) {
      throw new TtmApiError("No inbox bucket was found (expected a bucket with is_inbox: true).");
    }
    return inbox;
  }

  async function listItems({ bucket_id, include_done = false } = {}) {
    const items = await request("GET", "/api/items", {
      query: { bucket_id, include_done },
    });
    if (!Array.isArray(items)) {
      throw new TtmApiError("TTM-Todo GET /api/items did not return a list.", { body: items });
    }
    return items;
  }

  function createItem(fields) {
    return request("POST", "/api/items", { body: fields });
  }

  function patchItem(itemId, fields) {
    return request("PATCH", `/api/items/${encodeURIComponent(itemId)}`, { body: fields });
  }

  return {
    root,
    request,
    listBuckets,
    findInboxBucket,
    listItems,
    createItem,
    patchItem,
  };
}
