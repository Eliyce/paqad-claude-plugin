import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  releaseLock,
  tryAcquireLock
} from "./chunk-NUSNYHWM.js";
import {
  sleepSync
} from "./chunk-M762QQWF.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/core/fs/file-lock.ts
init_esm_shims();
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
  FileLockTimeoutError,
  withFileLockSync
};
