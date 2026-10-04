#!/usr/bin/env node
/**
 * Read a TTM-Todo OpenAPI document and write mcp-server/operations.mjs.
 * Usage: node scripts/generate-operations.mjs /path/to/openapi.json
 * The OpenAPI file is not committed.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const SKIP = new Map([
  ["GET /logout", "Auth0 HTML logout redirect"],
  ["GET /login", "Auth0 HTML login page"],
  ["GET /callback", "Auth0 HTML callback"],
  ["GET /api/google/tasks/connect", "Google OAuth connect page"],
  ["GET /api/google/callback", "Google OAuth callback page"],
  ["GET /api/outlook/connect", "Outlook OAuth connect page"],
  ["GET /api/outlook/callback", "Outlook OAuth callback page"],
  ["GET /{full_path}", "SPA catch-all"],
  ["POST /share-target", "PWA share-target HTML redirect"],
  ["POST /api/inbox", "Capture Inbox has no request body in the published spec"],
]);

const specPath = process.argv[2];
if (!specPath) {
  console.error("Usage: node scripts/generate-operations.mjs /path/to/openapi.json");
  process.exit(1);
}

const spec = JSON.parse(readFileSync(specPath, "utf8"));

function resolve(schema, depth = 0) {
  if (!schema || typeof schema !== "object" || depth > 8) return schema || {};
  if (schema.$ref) {
    const name = schema.$ref.split("/").pop();
    return resolve(spec.components?.schemas?.[name] || {}, depth + 1);
  }
  return schema;
}

function toJsonSchema(schema, depth = 0) {
  const resolved = resolve(schema, depth);
  if (!resolved || typeof resolved !== "object") return {};
  if (resolved.anyOf) {
    const nonNull = resolved.anyOf.filter((item) => resolve(item).type !== "null");
    if (nonNull.length === 1) return toJsonSchema(nonNull[0], depth + 1);
    return { anyOf: nonNull.map((item) => toJsonSchema(item, depth + 1)) };
  }
  const out = {};
  for (const key of [
    "type",
    "description",
    "maxLength",
    "minLength",
    "minimum",
    "maximum",
    "pattern",
    "format",
    "default",
    "enum",
    "const",
    "minItems",
  ]) {
    if (resolved[key] !== undefined) out[key] = resolved[key];
  }
  if (resolved.properties) {
    out.type = out.type || "object";
    out.properties = {};
    for (const [name, value] of Object.entries(resolved.properties)) {
      out.properties[name] = toJsonSchema(value, depth + 1);
    }
  }
  if (Array.isArray(resolved.required)) out.required = resolved.required;
  if (resolved.items) out.items = toJsonSchema(resolved.items, depth + 1);
  if (resolved.additionalProperties && typeof resolved.additionalProperties === "object") {
    out.additionalProperties = toJsonSchema(resolved.additionalProperties, depth + 1);
  } else if (resolved.additionalProperties === true) {
    out.additionalProperties = true;
  }
  return out;
}

function paramSchema(param) {
  const schema = toJsonSchema(param.schema || { type: "string" });
  if (param.description && !schema.description) schema.description = param.description;
  return schema;
}

function stripName(operationId) {
  let name = operationId.replace(/_(get|post|put|patch|delete)$/i, "");
  name = name.replace(/_api_.*$/, "");
  name = name.replace(/_route$/, "");
  return name.replace(/-/g, "_");
}

const used = new Set();
const operations = [];
const skipped = [];

for (const [path, methods] of Object.entries(spec.paths || {})) {
  for (const [methodRaw, op] of Object.entries(methods)) {
    if (methodRaw.startsWith("x-") || typeof op !== "object") continue;
    const method = methodRaw.toUpperCase();
    const key = `${method} ${path}`;
    const content = op.requestBody?.content || {};
    const contentTypes = Object.keys(content);

    if (SKIP.has(key)) {
      skipped.push({ method, path, operationId: op.operationId, reason: SKIP.get(key) });
      continue;
    }
    if (contentTypes.includes("multipart/form-data") && !contentTypes.includes("application/json")) {
      skipped.push({
        method,
        path,
        operationId: op.operationId,
        reason: "multipart/form-data only (not a JSON body)",
      });
      continue;
    }

    const parameters = (op.parameters || []).map((param) => {
      const resolved = param.$ref ? resolve(param) : param;
      return resolved;
    });

    const pathParams = parameters.filter((p) => p.in === "path");
    const queryParams = parameters.filter((p) => p.in === "query");
    const headerParams = parameters.filter((p) => p.in === "header");

    const jsonBody = content["application/json"]?.schema;
    const bodySchema = jsonBody ? toJsonSchema(jsonBody) : null;
    const bodyRequired = Boolean(op.requestBody?.required);
    const bodyProperties = bodySchema?.properties || {};
    const bodyParamNames = Object.keys(bodyProperties);
    const bodyRequiredFields = (bodySchema?.required || []).filter((name) => bodyParamNames.includes(name));

    let name = stripName(op.operationId || `${method}_${path}`);
    if (used.has(name)) {
      const tag = (op.tags?.[0] || "api").replace(/-/g, "_");
      name = `${tag}_${name}`;
    }
    used.add(name);

    const properties = {};
    const required = [];

    for (const param of pathParams) {
      properties[param.name] = paramSchema(param);
      properties[param.name].description =
        properties[param.name].description || `Path parameter for ${path}`;
      if (param.required !== false) required.push(param.name);
    }
    for (const param of queryParams) {
      properties[param.name] = paramSchema(param);
      properties[param.name].description =
        properties[param.name].description || `Query parameter ${param.name}`;
      if (param.required) required.push(param.name);
    }
    if (headerParams.some((p) => p.name === "X-Organization-Id")) {
      properties.x_organization_id = {
        type: "string",
        description:
          "Sent as the X-Organization-Id header. Required for plan calls when the user belongs to more than one licensed organization.",
      };
    }
    for (const [field, schema] of Object.entries(bodyProperties)) {
      if (properties[field]) continue;
      properties[field] = schema;
    }
    for (const field of bodyRequiredFields) {
      if (!required.includes(field)) required.push(field);
    }

    const tag = (op.tags && op.tags[0]) || "api";
    const summary = op.summary || name;
    const description = [
      `${summary}. ${method} ${path}.`,
      op.description ? String(op.description).replace(/\s+/g, " ").trim() : "",
      tag === "plan"
        ? "Plan routes may need x_organization_id when the user has more than one licensed organization."
        : "",
    ]
      .filter(Boolean)
      .join(" ");

    operations.push({
      name,
      method,
      path,
      operationId: op.operationId,
      summary,
      tags: op.tags || [],
      description,
      pathParams: pathParams.map((p) => p.name),
      queryParams: queryParams.map((p) => p.name),
      headerParams: headerParams.map((p) => p.name),
      bodyParams: bodyParamNames,
      bodyRequired,
      required,
      inputSchema: {
        type: "object",
        properties,
        required,
        additionalProperties: false,
      },
    });
  }
}

const out = `// Generated from the TTM-Todo OpenAPI spec. Do not edit by hand;
// regenerate with: node scripts/generate-operations.mjs /path/to/openapi.json
export const OPERATIONS = ${JSON.stringify(operations, null, 2)};

export const SKIPPED_OPERATIONS = ${JSON.stringify(skipped, null, 2)};
`;

const dest = join(root, "mcp-server/operations.mjs");
writeFileSync(dest, out);
console.log(`Wrote ${operations.length} operations and ${skipped.length} skipped to ${dest}`);
