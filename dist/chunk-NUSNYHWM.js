import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/background/single-flight-lock.ts
init_esm_shims();
import { mkdirSync, rmdirSync, statSync } from "fs";
import { dirname } from "path";
function tryAcquireLock(lockDir, options) {
  const now = options.now ?? Date.now;
  try {
    mkdirSync(dirname(lockDir), { recursive: true });
  } catch {
  }
  try {
    mkdirSync(lockDir);
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
    mkdirSync(lockDir);
    return { acquired: true, reclaimedStale };
  } catch {
    return { acquired: false };
  }
}

export {
  tryAcquireLock,
  releaseLock
};
