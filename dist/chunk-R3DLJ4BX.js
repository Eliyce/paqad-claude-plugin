import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  PATHS
} from "./chunk-UCSN7SVD.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/checks/running-marker.ts
init_esm_shims();
import { execFileSync } from "child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { dirname, join } from "path";
var CHECKS_RUNNING_CEILING_MS = 30 * 60 * 1e3;
var CHECKS_RUN_COMMAND = /\bchecks\s+run\b/;
function safeSessionId(sessionId) {
  return sessionId.replace(/[^A-Za-z0-9._-]/g, "_").replace(/^\.+/, "_") || "unknown";
}
function checksRunningMarkerPath(projectRoot, sessionId) {
  return join(projectRoot, PATHS.CHECKS_DIR, "running", `${safeSessionId(sessionId)}.json`);
}
function writeChecksRunningMarker(projectRoot, marker) {
  const path = checksRunningMarkerPath(projectRoot, marker.session_id);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(marker, null, 2)}
`, "utf8");
  return path;
}
function readChecksRunningMarker(projectRoot, sessionId) {
  try {
    const parsed = JSON.parse(
      readFileSync(checksRunningMarkerPath(projectRoot, sessionId), "utf8")
    );
    return isMarker(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
function clearChecksRunningMarker(projectRoot, sessionId, pid) {
  if (readChecksRunningMarker(projectRoot, sessionId)?.pid !== pid) {
    return;
  }
  rmSync(checksRunningMarkerPath(projectRoot, sessionId), { force: true });
}
function liveChecksRunningMarker(projectRoot, sessionId, probe = {}) {
  const marker = readChecksRunningMarker(projectRoot, sessionId);
  if (!marker || marker.session_id !== sessionId) {
    return null;
  }
  const age = (probe.now ?? (() => /* @__PURE__ */ new Date()))().getTime() - Date.parse(marker.started_at);
  if (Number.isNaN(age) || age < 0 || age >= CHECKS_RUNNING_CEILING_MS) {
    return null;
  }
  if (!(probe.isAlive ?? processIsAlive)(marker.pid)) {
    return null;
  }
  const command = (probe.commandOf ?? processCommand)(marker.pid);
  return command !== null && CHECKS_RUN_COMMAND.test(command) ? marker : null;
}
function processIsAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error.code === "EPERM";
  }
}
function processCommand(pid) {
  if (process.platform === "win32") {
    return null;
  }
  try {
    return execFileSync("ps", ["-o", "command=", "-p", String(pid)], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
  } catch {
    return null;
  }
}
function isMarker(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const m = value;
  return Number.isInteger(m.pid) && m.pid > 0 && typeof m.session_id === "string" && (m.change === null || typeof m.change === "string") && typeof m.started_at === "string";
}

export {
  CHECKS_RUNNING_CEILING_MS,
  writeChecksRunningMarker,
  clearChecksRunningMarker,
  liveChecksRunningMarker
};
