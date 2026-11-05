import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  FEATURE_EVIDENCE_SCHEMA_VERSION,
  FEATURE_SESSION_DOC_TYPE,
  featureSessionControlPath
} from "./chunk-TQS7EXFH.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/feature-evidence/session-control.ts
init_esm_shims();
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
function emptyControl(sessionId, now = () => /* @__PURE__ */ new Date()) {
  return {
    schema_version: FEATURE_EVIDENCE_SCHEMA_VERSION,
    doc_type: FEATURE_SESSION_DOC_TYPE,
    session_id: sessionId,
    active: null,
    paused: [],
    lane: null,
    updated_at: now().toISOString()
  };
}
function readSessionControl(projectRoot, sessionId, now = () => /* @__PURE__ */ new Date()) {
  try {
    const raw = readFileSync(join(projectRoot, featureSessionControlPath(sessionId)), "utf8");
    const parsed = JSON.parse(raw);
    if (isControl(parsed)) {
      return parsed;
    }
  } catch {
  }
  return emptyControl(sessionId, now);
}
function writeSessionControl(projectRoot, control, now = () => /* @__PURE__ */ new Date(), writtenBy) {
  const stamped = {
    ...control,
    written_by: writtenBy ?? control.written_by ?? "unknown",
    pid: process.pid,
    updated_at: now().toISOString()
  };
  const abs = join(projectRoot, featureSessionControlPath(control.session_id));
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, `${JSON.stringify(stamped, null, 2)}
`, "utf8");
  return stamped;
}
function setActiveFeature(projectRoot, sessionId, dirName, options = {}) {
  const now = options.now ?? (() => /* @__PURE__ */ new Date());
  const control = readSessionControl(projectRoot, sessionId, now);
  const paused = control.paused.filter((name) => name !== dirName);
  if (control.active && control.active !== dirName) {
    paused.push(control.active);
  }
  const next = {
    ...control,
    active: dirName,
    paused,
    lane: options.lane !== void 0 ? options.lane : control.lane
  };
  return writeSessionControl(projectRoot, next, now, options.writtenBy ?? "set-active");
}
function resumeFeature(projectRoot, sessionId, dirName, now = () => /* @__PURE__ */ new Date(), writtenBy = "resume") {
  const control = readSessionControl(projectRoot, sessionId, now);
  if (control.active === dirName) {
    return control;
  }
  if (!control.paused.includes(dirName)) {
    return null;
  }
  const paused = control.paused.filter((name) => name !== dirName);
  if (control.active) {
    paused.push(control.active);
  }
  return writeSessionControl(projectRoot, { ...control, active: dirName, paused }, now, writtenBy);
}
function markDone(projectRoot, sessionId, dirName, now = () => /* @__PURE__ */ new Date()) {
  const control = readSessionControl(projectRoot, sessionId, now);
  const next = {
    ...control,
    active: control.active === dirName ? null : control.active,
    paused: control.paused.filter((name) => name !== dirName)
  };
  return writeSessionControl(projectRoot, next, now, "mark-done");
}
function isControl(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const c = value;
  return c.doc_type === FEATURE_SESSION_DOC_TYPE && typeof c.session_id === "string" && (c.active === null || typeof c.active === "string") && Array.isArray(c.paused) && c.paused.every((name) => typeof name === "string");
}

export {
  readSessionControl,
  writeSessionControl,
  setActiveFeature,
  resumeFeature,
  markDone
};
