import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  readSessionControl,
  ulid
} from "./chunk-DDJC5PRW.js";
import {
  PATHS
} from "./chunk-LW3OCT4Y.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/rag-ledger/session.ts
init_esm_shims();
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { dirname, join } from "path";
function persistLedgerSessionId(projectRoot, sessionId) {
  const cleaned = sessionId?.trim();
  if (!cleaned) return false;
  try {
    const path = join(projectRoot, PATHS.LEDGER_SESSION_ID);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, cleaned, "utf8");
    return true;
  } catch {
    return false;
  }
}
function resolveSessionId(projectRoot, hint) {
  const path = join(projectRoot, PATHS.LEDGER_SESSION_ID);
  const cleaned = hint?.trim();
  if (cleaned) {
    try {
      mkdirSync(dirname(path), { recursive: true });
      writeFileSync(path, cleaned, "utf8");
    } catch {
    }
    return cleaned;
  }
  try {
    const existing = readFileSync(path, "utf8").trim();
    if (existing) {
      return existing;
    }
  } catch {
  }
  const minted = `ses_${ulid().toLowerCase()}`;
  try {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, minted, "utf8");
  } catch {
  }
  return minted;
}
function readLedgerSessionId(projectRoot) {
  try {
    const existing = readFileSync(join(projectRoot, PATHS.LEDGER_SESSION_ID), "utf8").trim();
    return existing === "" ? null : existing;
  } catch {
    return null;
  }
}
function cleanSessionId(value) {
  if (typeof value !== "string") return null;
  const cleaned = value.trim();
  return cleaned === "" ? null : cleaned;
}
function hookSessionCandidates(projectRoot, payload, env = process.env) {
  const ordered = [
    cleanSessionId(payload?.session_id),
    cleanSessionId(env.SE_SESSION),
    cleanSessionId(env.CLAUDE_SESSION_ID),
    readLedgerSessionId(projectRoot)
  ];
  return [...new Set(ordered.filter((id) => id !== null))];
}
function resolveHookSession(projectRoot, payload, env = process.env) {
  const candidates = hookSessionCandidates(projectRoot, payload, env);
  const inFlight = candidates.find((id) => readSessionControl(projectRoot, id).active !== null);
  if (inFlight !== void 0) return inFlight;
  return readLedgerSessionId(projectRoot) ?? resolveSessionId(projectRoot, null);
}
function readCacheBytes(path) {
  try {
    return readFileSync(path);
  } catch {
    return null;
  }
}
function keepingLedgerSessionCache(projectRoot, run) {
  const path = join(projectRoot, PATHS.LEDGER_SESSION_ID);
  const before = readCacheBytes(path);
  try {
    return run();
  } finally {
    const after = readCacheBytes(path);
    if (before === null && after !== null) {
      rmSync(path, { force: true });
    } else if (before !== null && (after === null || !after.equals(before))) {
      writeFileSync(path, before);
    }
  }
}

export {
  persistLedgerSessionId,
  resolveSessionId,
  readLedgerSessionId,
  hookSessionCandidates,
  resolveHookSession,
  keepingLedgerSessionCache
};
