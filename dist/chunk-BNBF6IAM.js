import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  renameWithRetrySync
} from "./chunk-XD2HZBBD.js";
import {
  PATHS
} from "./chunk-CWGYZAT6.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/hud/files.ts
init_esm_shims();
import { mkdirSync, rmSync, writeFileSync } from "fs";
import { dirname, join } from "path";
function safeSessionId(sessionId) {
  return sessionId.replace(/[^A-Za-z0-9._-]/g, "_").replace(/^\.+/, "_") || "unknown";
}
function hudSnapshotPath(projectRoot, sessionId) {
  return join(projectRoot, PATHS.HUD_DIR, `${safeSessionId(sessionId)}.json`);
}
function hudReceiptPath(projectRoot, sessionId) {
  return join(projectRoot, PATHS.HUD_DIR, `${safeSessionId(sessionId)}.receipt.md`);
}
function hudVerdictPath(projectRoot, sessionId) {
  return join(projectRoot, PATHS.HUD_DIR, `${safeSessionId(sessionId)}.verdict.json`);
}
var HUD_COST_CACHE_SUFFIX = ".cost-cache.json";
function hudCostCachePath(projectRoot, sessionId) {
  return join(projectRoot, PATHS.HUD_DIR, `${safeSessionId(sessionId)}${HUD_COST_CACHE_SUFFIX}`);
}
var tempSeq = 0;
function writeFileAtomic(target, content) {
  mkdirSync(dirname(target), { recursive: true });
  tempSeq = (tempSeq + 1) % Number.MAX_SAFE_INTEGER;
  const temp = `${target}.tmp-${process.pid}-${tempSeq}`;
  try {
    writeFileSync(temp, content, "utf8");
    renameWithRetrySync(temp, target);
  } catch (error) {
    rmSync(temp, { force: true });
    throw error;
  }
}
function hudLastBlockPath(projectRoot, sessionId) {
  return join(projectRoot, PATHS.HUD_DIR, `${safeSessionId(sessionId)}.last-block.json`);
}

export {
  safeSessionId,
  hudSnapshotPath,
  hudReceiptPath,
  hudVerdictPath,
  HUD_COST_CACHE_SUFFIX,
  hudCostCachePath,
  writeFileAtomic,
  hudLastBlockPath
};
