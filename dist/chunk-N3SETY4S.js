import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  renameWithRetrySync,
  sleepSync
} from "./chunk-5BQ2AB2Y.js";
import {
  PATHS
} from "./chunk-UCSN7SVD.js";
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

// src/core/fs/file-lock.ts
init_esm_shims();

// src/background/single-flight-lock.ts
init_esm_shims();
import { mkdirSync as mkdirSync2, rmdirSync, statSync } from "fs";
import { dirname as dirname2 } from "path";
function tryAcquireLock(lockDir, options) {
  const now = options.now ?? Date.now;
  try {
    mkdirSync2(dirname2(lockDir), { recursive: true });
  } catch {
  }
  try {
    mkdirSync2(lockDir);
    return { acquired: true, reclaimedStale: false };
  } catch {
  }
  let ageMs;
  try {
    ageMs = now() - statSync(lockDir).mtimeMs;
  } catch {
    return retryAcquire(lockDir, true);
  }
  if (ageMs <= options.staleLockMs) {
    return { acquired: false };
  }
  try {
    rmdirSync(lockDir);
  } catch {
    return { acquired: false };
  }
  return retryAcquire(lockDir, true);
}
function releaseLock(lockDir) {
  try {
    rmdirSync(lockDir);
  } catch {
  }
}
function retryAcquire(lockDir, reclaimedStale) {
  try {
    mkdirSync2(lockDir);
    return { acquired: true, reclaimedStale };
  } catch {
    return { acquired: false };
  }
}

// src/core/fs/file-lock.ts
var FileLockTimeoutError = class extends Error {
  constructor(lockDir, timeoutMs) {
    super(
      `could not take the lock ${lockDir} within ${timeoutMs} ms; another paqad process holds it. Retry the command; if no other paqad command is running, remove that directory.`
    );
    this.name = "FileLockTimeoutError";
  }
};
function withFileLockSync(lockDir, fn, options = {}) {
  const timeoutMs = options.timeoutMs ?? 15e3;
  const staleMs = options.staleMs ?? 1e4;
  const retryMs = options.retryMs ?? 20;
  const now = options.now ?? Date.now;
  const sleep = options.sleep ?? sleepSync;
  const deadline = now() + timeoutMs;
  for (; ; ) {
    const outcome = tryAcquireLock(lockDir, { staleLockMs: staleMs, now });
    if (outcome.acquired) break;
    if (now() >= deadline) throw new FileLockTimeoutError(lockDir, timeoutMs);
    sleep(retryMs);
  }
  try {
    return fn();
  } finally {
    releaseLock(lockDir);
  }
}

export {
  tryAcquireLock,
  releaseLock,
  FileLockTimeoutError,
  withFileLockSync,
  hudSnapshotPath,
  hudReceiptPath,
  hudVerdictPath,
  HUD_COST_CACHE_SUFFIX,
  hudCostCachePath,
  writeFileAtomic,
  hudLastBlockPath
};
