import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  init_esm_shims
} from "./chunk-IDFRWBMN.js";

// src/core/fs/atomic-rename.ts
init_esm_shims();
import { renameSync, rmSync } from "fs";
import { rename as renameAsync, rm as rmAsync } from "fs/promises";
var RETRYABLE_CODES = /* @__PURE__ */ new Set(["EPERM", "EACCES", "EBUSY"]);
var RENAME_MAX_ATTEMPTS = 5;
function waitBeforeRetry(attempt) {
  return 10 * 2 ** (attempt - 1);
}
function isRetryable(error, platform) {
  if (platform !== "win32") return false;
  const code = error?.code;
  return typeof code === "string" && RETRYABLE_CODES.has(code);
}
function sleepAsync(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function sleepSync(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}
async function renameWithRetry(from, to, deps = {}) {
  const rename = deps.rename ?? renameAsync;
  const remove = deps.remove ?? ((path) => rmAsync(path, { force: true }));
  const sleep = deps.sleep ?? sleepAsync;
  const platform = deps.platform ?? process.platform;
  for (let attempt = 1; ; attempt += 1) {
    try {
      await rename(from, to);
      return;
    } catch (error) {
      if (attempt >= RENAME_MAX_ATTEMPTS || !isRetryable(error, platform)) {
        await remove(from).catch(() => void 0);
        throw error;
      }
      await sleep(waitBeforeRetry(attempt));
    }
  }
}
function renameWithRetrySync(from, to, deps = {}) {
  const rename = deps.rename ?? renameSync;
  const remove = deps.remove ?? ((path) => rmSync(path, { force: true }));
  const sleep = deps.sleep ?? sleepSync;
  const platform = deps.platform ?? process.platform;
  const attemptRename = (attempt) => {
    try {
      rename(from, to);
    } catch (error) {
      if (attempt >= RENAME_MAX_ATTEMPTS || !isRetryable(error, platform)) {
        try {
          remove(from);
        } catch {
        }
        throw error;
      }
      sleep(waitBeforeRetry(attempt));
      attemptRename(attempt + 1);
    }
  };
  attemptRename(1);
}

export {
  sleepSync,
  renameWithRetry,
  renameWithRetrySync
};
