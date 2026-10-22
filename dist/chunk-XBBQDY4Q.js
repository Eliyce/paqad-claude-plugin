import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  STAGE_EVIDENCE_DOC_TYPE
} from "./chunk-R3VYFIEA.js";
import {
  sessionLedgerDir
} from "./chunk-3CUGDX3J.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/stage-evidence/pending-lane.ts
init_esm_shims();
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { join } from "path";
var PENDING_LANE_FILE = ".pending-lane";
var VALID_LANES = ["fast", "graduated", "full"];
function pendingLaneDir(projectRoot, sessionId) {
  return join(projectRoot, sessionLedgerDir(STAGE_EVIDENCE_DOC_TYPE, sessionId));
}
function writePendingLane(projectRoot, sessionId, lane) {
  if (lane === null) {
    return;
  }
  const dir = pendingLaneDir(projectRoot, sessionId);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, PENDING_LANE_FILE), lane, "utf8");
}
function clearPendingLane(projectRoot, sessionId) {
  try {
    rmSync(join(pendingLaneDir(projectRoot, sessionId), PENDING_LANE_FILE), { force: true });
    rmSync(join(pendingLaneDir(projectRoot, sessionId), PENDING_KIND_FILE), { force: true });
  } catch {
  }
}
function readPendingLane(projectRoot, sessionId) {
  try {
    const raw = readFileSync(
      join(pendingLaneDir(projectRoot, sessionId), PENDING_LANE_FILE),
      "utf8"
    ).trim().toLowerCase();
    return VALID_LANES.includes(raw) ? raw : null;
  } catch {
    return null;
  }
}
var PENDING_KIND_FILE = ".pending-kind";
function writePendingKind(projectRoot, sessionId, kind) {
  const dir = pendingLaneDir(projectRoot, sessionId);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, PENDING_KIND_FILE), kind, "utf8");
}
function readPendingKind(projectRoot, sessionId) {
  try {
    const raw = readFileSync(
      join(pendingLaneDir(projectRoot, sessionId), PENDING_KIND_FILE),
      "utf8"
    ).trim().toLowerCase();
    return raw === "fix" || raw === "other" ? raw : null;
  } catch {
    return null;
  }
}

export {
  writePendingLane,
  clearPendingLane,
  readPendingLane,
  writePendingKind,
  readPendingKind
};
