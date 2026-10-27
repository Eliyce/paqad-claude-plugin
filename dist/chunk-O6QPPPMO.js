import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  releaseLock,
  tryAcquireLock
} from "./chunk-NUSNYHWM.js";
import {
  PATHS
} from "./chunk-LW3OCT4Y.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/background/refresh-context-lock.ts
init_esm_shims();
import { utimesSync } from "fs";
import { join } from "path";
var REFRESH_CONTEXT_LOCK_STALE_MS = 10 * 60 * 1e3;
var REFRESH_CONTEXT_LOCK_RENEW_MS = 60 * 1e3;
var REFRESH_CONTEXT_LOCK_HELD_ENV = "PAQAD_REFRESH_CONTEXT_LOCK_HELD";
var RELEASE_SIGNALS = ["SIGINT", "SIGTERM"];
function refreshContextLockDir(projectRoot) {
  return join(projectRoot, PATHS.LOCKS_DIR, "refresh-context.lock");
}
function takeRefreshContextLock(projectRoot, now) {
  return tryAcquireLock(refreshContextLockDir(projectRoot), {
    staleLockMs: REFRESH_CONTEXT_LOCK_STALE_MS,
    now
  });
}
function releaseRefreshContextLock(projectRoot) {
  releaseLock(refreshContextLockDir(projectRoot));
}
function renewRefreshContextLock(projectRoot, now = Date.now) {
  const stamp = new Date(now());
  try {
    utimesSync(refreshContextLockDir(projectRoot), stamp, stamp);
    return true;
  } catch {
    return false;
  }
}
function holdRefreshContextLock(projectRoot, options = {}) {
  const env = options.env ?? process.env;
  const inherited = env[REFRESH_CONTEXT_LOCK_HELD_ENV] === "1";
  if (inherited) {
    if (!renewRefreshContextLock(projectRoot)) takeRefreshContextLock(projectRoot);
  } else if (!takeRefreshContextLock(projectRoot).acquired) {
    return null;
  }
  const timer = setInterval(
    () => renewRefreshContextLock(projectRoot),
    options.renewMs ?? REFRESH_CONTEXT_LOCK_RENEW_MS
  );
  timer.unref();
  let released = false;
  const release = () => {
    if (released) return;
    released = true;
    clearInterval(timer);
    process.removeListener("exit", release);
    for (const signal of RELEASE_SIGNALS) process.removeListener(signal, onSignal);
    releaseRefreshContextLock(projectRoot);
  };
  const onSignal = (signal) => {
    release();
    process.kill(process.pid, signal);
  };
  process.once("exit", release);
  for (const signal of RELEASE_SIGNALS) process.once(signal, onSignal);
  return { release };
}

export {
  REFRESH_CONTEXT_LOCK_STALE_MS,
  REFRESH_CONTEXT_LOCK_RENEW_MS,
  REFRESH_CONTEXT_LOCK_HELD_ENV,
  refreshContextLockDir,
  takeRefreshContextLock,
  releaseRefreshContextLock,
  renewRefreshContextLock,
  holdRefreshContextLock
};
