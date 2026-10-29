import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  ROUTED_WORKFLOWS
} from "./chunk-6D2NK5XH.js";
import {
  PATHS
} from "./chunk-LW3OCT4Y.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/pipeline/session-route.ts
init_esm_shims();
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
var SESSION_ROUTE_FILE = ".session-route.json";
var SESSION_ROUTE_DIR = ".session-route.d";
function sessionRouteDir(projectRoot) {
  return join(projectRoot, dirname(PATHS.CONTEXT_SESSION_ARTIFACT));
}
var VALID_WORKFLOWS = new Set(ROUTED_WORKFLOWS);
function perSessionRoutePath(projectRoot, sessionId) {
  const safe = typeof sessionId === "string" ? sessionId.trim().replace(/[^A-Za-z0-9_-]/g, "_") : "";
  return safe.length === 0 ? null : join(sessionRouteDir(projectRoot), SESSION_ROUTE_DIR, `${safe}.json`);
}
function writeSessionRoute(projectRoot, route, sessionId) {
  try {
    const dir = sessionRouteDir(projectRoot);
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, SESSION_ROUTE_FILE), JSON.stringify(route), "utf8");
    const own = perSessionRoutePath(projectRoot, sessionId);
    if (own) {
      mkdirSync(dirname(own), { recursive: true });
      writeFileSync(own, JSON.stringify(route), "utf8");
    }
  } catch {
  }
}
function compositionForRoute(route) {
  if (!route) {
    return { loadRules: true, retrieves: true };
  }
  return {
    loadRules: route.workflow === "feature-development",
    retrieves: route.workflow !== "no-workflow"
  };
}
function readSessionRoute(projectRoot, sessionId) {
  const own = perSessionRoutePath(projectRoot, sessionId);
  return (own ? parseRouteFile(own) : null) ?? parseRouteFile(join(sessionRouteDir(projectRoot), SESSION_ROUTE_FILE));
}
function parseRouteFile(path) {
  try {
    const parsed = JSON.parse(readFileSync(path, "utf8"));
    if (typeof parsed.workflow !== "string" || !VALID_WORKFLOWS.has(parsed.workflow)) {
      return null;
    }
    return {
      workflow: parsed.workflow,
      query: typeof parsed.query === "string" ? parsed.query : "",
      ...typeof parsed.adapter === "string" ? { adapter: parsed.adapter } : {}
    };
  } catch {
    return null;
  }
}

export {
  writeSessionRoute,
  compositionForRoute,
  readSessionRoute
};
