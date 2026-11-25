import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  init_esm_shims
} from "./chunk-G5ZPBAMA.js";

// src/background/single-flight-lock.ts
init_esm_shims();
import { randomBytes } from "crypto";
import {
  closeSync,
  constants,
  fstatSync,
  linkSync,
  mkdirSync,
  openSync,
  readFileSync,
  renameSync,
  rmdirSync,
  statSync,
  unlinkSync,
  writeSync
} from "fs";
import { dirname } from "path";
function noFollow() {
  return constants.O_NOFOLLOW ?? 0;
}
var UNPARSEABLE_LOCK_GRACE_MS = 1e4;
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
function tryAcquireFileLock(path, options) {
  mkdirSync(dirname(path), { recursive: true, mode: 448 });
  if (createExclusive(path, options.body)) return { acquired: true, reclaimed: null };
  const judged = readLockText(path);
  if (judged === null) return { acquired: false, holder: null };
  const holder = options.parse(judged.text);
  const now = options.now ?? Date.now;
  const stale = holder === null ? now() - judged.mtimeMs > UNPARSEABLE_LOCK_GRACE_MS : options.holderGone(holder);
  if (!stale) return { acquired: false, holder };
  if (!setAside(path, judged.text)) {
    return { acquired: false, holder: readHolder(path, options.parse) };
  }
  return createExclusive(path, options.body) ? { acquired: true, reclaimed: holder } : { acquired: false, holder: readHolder(path, options.parse) };
}
function setAside(path, judgedText) {
  const aside = `${path}.reclaim-${process.pid}-${randomBytes(6).toString("hex")}`;
  try {
    renameSync(path, aside);
  } catch {
    return false;
  }
  const moved = readLockText(aside);
  if (moved !== null && moved.text === judgedText) {
    unlinkSync(aside);
    return true;
  }
  try {
    if (moved === null) renameSync(aside, path);
    else {
      linkSync(aside, path);
      unlinkSync(aside);
    }
  } catch {
  }
  return false;
}
function releaseFileLock(path, owner, parse, same) {
  const holder = readHolder(path, parse);
  if (holder === null || !same(holder, owner)) return;
  try {
    unlinkSync(path);
  } catch {
  }
}
function createExclusive(path, body) {
  let fd;
  try {
    fd = openSync(
      path,
      constants.O_CREAT | constants.O_EXCL | constants.O_WRONLY | noFollow(),
      384
    );
  } catch {
    return false;
  }
  try {
    writeSync(fd, `${JSON.stringify(body)}
`);
  } finally {
    closeSync(fd);
  }
  return true;
}
function readLockText(path) {
  let fd;
  try {
    fd = openSync(path, constants.O_RDONLY | noFollow());
  } catch {
    return null;
  }
  try {
    const stat = fstatSync(fd);
    if (!stat.isFile()) return null;
    return { text: readFileSync(fd, "utf8"), mtimeMs: stat.mtimeMs };
  } catch {
    return null;
  } finally {
    closeSync(fd);
  }
}
function readHolder(path, parse) {
  const lock = readLockText(path);
  return lock === null ? null : parse(lock.text);
}

export {
  tryAcquireLock,
  releaseLock,
  tryAcquireFileLock,
  releaseFileLock
};
