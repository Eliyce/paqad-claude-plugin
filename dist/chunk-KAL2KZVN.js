import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  PATHS
} from "./chunk-CWGYZAT6.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/session-ledger/ledger.ts
init_esm_shims();
import { createHash } from "crypto";
import {
  appendFileSync,
  closeSync,
  existsSync,
  mkdirSync,
  openSync,
  readFileSync,
  readdirSync,
  writeFileSync
} from "fs";
import { dirname, join } from "path";
function sessionLedgerDir(docType, sessionId) {
  return join(PATHS.EVIDENCE_LEDGER_DIR, docType, sessionId);
}
function sessionLedgerPath(docType, sessionId, ordinal) {
  return join(sessionLedgerDir(docType, sessionId), `${ordinal}.jsonl`);
}
function sessionOpenPointerPath(docType, sessionId) {
  return join(sessionLedgerDir(docType, sessionId), ".open");
}
function absDir(projectRoot, docType, sessionId) {
  return join(projectRoot, sessionLedgerDir(docType, sessionId));
}
function highestOrdinal(dir) {
  let max = 0;
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return 0;
  }
  for (const entry of entries) {
    const match = /^(\d+)\.jsonl$/.exec(entry);
    if (match) {
      const n = Number(match[1]);
      if (n > max) {
        max = n;
      }
    }
  }
  return max;
}
function allocateOrdinal(projectRoot, docType, sessionId) {
  const dir = absDir(projectRoot, docType, sessionId);
  mkdirSync(dir, { recursive: true });
  let ordinal = highestOrdinal(dir) + 1;
  for (; ; ) {
    const path = join(dir, `${ordinal}.jsonl`);
    try {
      closeSync(openSync(path, "wx"));
      writeFileSync(join(dir, ".open"), String(ordinal), "utf8");
      return ordinal;
    } catch (error) {
      if (error.code === "EEXIST") {
        ordinal++;
        continue;
      }
      throw error;
    }
  }
}
function currentOrdinal(projectRoot, docType, sessionId) {
  try {
    const raw = readFileSync(join(projectRoot, sessionOpenPointerPath(docType, sessionId)), "utf8");
    const n = Number(raw.trim());
    return Number.isInteger(n) && n > 0 ? n : 0;
  } catch {
    return 0;
  }
}
var HASH_EXCLUDED_KEYS = /* @__PURE__ */ new Set(["ts", "recorded_at", "content_hash", "note"]);
function computeSessionRowHash(row) {
  const identity = {};
  for (const key of Object.keys(row).sort()) {
    if (!HASH_EXCLUDED_KEYS.has(key)) {
      identity[key] = row[key];
    }
  }
  return createHash("sha256").update(JSON.stringify(identity)).digest("hex");
}
function stampSessionRow(docType, sessionId, row, options = {}) {
  const now = options.now ?? (() => /* @__PURE__ */ new Date());
  const base = {
    schema_version: options.schemaVersion ?? 1,
    doc_type: docType,
    session_id: sessionId,
    ...row
  };
  const content_hash = computeSessionRowHash(base);
  const stamped = {
    ...base,
    ts: now().toISOString(),
    content_hash
  };
  if (options.validate) {
    const errors = options.validate(stamped);
    if (errors.length > 0) {
      throw new Error(`Invalid ${docType} row: ${errors.join("; ")}`);
    }
  }
  return stamped;
}
function appendStampedRowToUnit(projectRoot, unitRelPath, stamped) {
  const abs = join(projectRoot, unitRelPath);
  mkdirSync(dirname(abs), { recursive: true });
  appendFileSync(abs, `${JSON.stringify(stamped)}
`, "utf8");
}
function readUnitFile(projectRoot, unitRelPath) {
  return readJsonl(join(projectRoot, unitRelPath));
}
function appendSessionEvent(projectRoot, docType, sessionId, ordinal, row, options = {}) {
  const stamped = stampSessionRow(docType, sessionId, row, options);
  appendStampedRowToUnit(projectRoot, sessionLedgerPath(docType, sessionId, ordinal), stamped);
  return stamped;
}
function openSessionDoc(projectRoot, docType, sessionId, openRow = {}, options = {}) {
  const ordinal = allocateOrdinal(projectRoot, docType, sessionId);
  appendSessionEvent(
    projectRoot,
    docType,
    sessionId,
    ordinal,
    { kind: "open", conversation_ordinal: ordinal, ...openRow },
    options
  );
  return { ordinal, path: sessionLedgerPath(docType, sessionId, ordinal) };
}
function readSessionUnit(projectRoot, docType, sessionId, ordinal) {
  return readJsonl(join(projectRoot, sessionLedgerPath(docType, sessionId, ordinal)));
}
function readSessionDoc(projectRoot, docType, sessionId) {
  const dir = absDir(projectRoot, docType, sessionId);
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return [];
  }
  const ordinals = entries.map((entry) => /^(\d+)\.jsonl$/.exec(entry)).filter((match) => match !== null).map((match) => Number(match[1])).sort((a, b) => a - b);
  return ordinals.flatMap((ordinal) => readSessionUnit(projectRoot, docType, sessionId, ordinal));
}
function listSessionIds(projectRoot, docType) {
  const dir = join(projectRoot, PATHS.EVIDENCE_LEDGER_DIR, docType);
  try {
    return readdirSync(dir, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
  } catch {
    return [];
  }
}
function readAllSessionRows(projectRoot, docType) {
  return listSessionIds(projectRoot, docType).flatMap(
    (sessionId) => readSessionDoc(projectRoot, docType, sessionId)
  );
}
function foldByOrdinal(rows) {
  const byOrdinal = /* @__PURE__ */ new Map();
  for (const row of rows) {
    const ordinal = typeof row.conversation_ordinal === "number" ? row.conversation_ordinal : 0;
    const bucket = byOrdinal.get(ordinal);
    if (bucket) {
      bucket.push(row);
    } else {
      byOrdinal.set(ordinal, [row]);
    }
  }
  return new Map([...byOrdinal.entries()].sort((a, b) => a[0] - b[0]));
}
function readJsonl(absPath) {
  if (!existsSync(absPath)) {
    return [];
  }
  const out = [];
  for (const line of readFileSync(absPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (trimmed.length === 0) {
      continue;
    }
    try {
      const parsed = JSON.parse(trimmed);
      if (isSessionLedgerRow(parsed)) {
        out.push(parsed);
      }
    } catch {
    }
  }
  return out;
}
function isSessionLedgerRow(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const row = value;
  return typeof row.doc_type === "string" && typeof row.session_id === "string" && (typeof row.ts === "string" || typeof row.recorded_at === "string") && typeof row.content_hash === "string";
}

export {
  sessionLedgerDir,
  allocateOrdinal,
  currentOrdinal,
  computeSessionRowHash,
  stampSessionRow,
  appendStampedRowToUnit,
  readUnitFile,
  appendSessionEvent,
  openSessionDoc,
  readSessionDoc,
  readAllSessionRows,
  foldByOrdinal
};
