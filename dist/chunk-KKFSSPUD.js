import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/evidence/ledger.ts
init_esm_shims();
import { createHash } from "crypto";
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "fs";
import { dirname, join } from "path";

// src/core/types/evidence-ledger.ts
init_esm_shims();
var EVIDENCE_LEDGER_SCHEMA_VERSION = 1;
var PAQAD_VSA_PREDICATE_TYPE = "https://paqad.ai/attestations/verification-summary/v1";
var IN_TOTO_STATEMENT_TYPE = "https://in-toto.io/Statement/v1";

// src/evidence/ledger.ts
function computeRowContentHash(identity) {
  const canonical = JSON.stringify([
    identity.engine,
    identity.code,
    identity.subject_digest,
    identity.verdict,
    identity.strength_class
  ]);
  return createHash("sha256").update(canonical).digest("hex");
}
function buildEvidenceRow(row) {
  return {
    schema_version: EVIDENCE_LEDGER_SCHEMA_VERSION,
    ts: row.ts,
    engine: row.engine,
    code: row.code,
    subject_digest: row.subject_digest,
    verdict: row.verdict,
    strength_class: row.strength_class,
    content_hash: computeRowContentHash(row),
    ...row.detail !== void 0 ? { detail: row.detail } : {},
    ...row.skip_kind !== void 0 && row.verdict === "skipped" ? { skip_kind: row.skip_kind } : {}
  };
}
function readEvidenceRowsAt(projectRoot, relPath) {
  const path = join(projectRoot, relPath);
  if (!existsSync(path)) return [];
  return parseEvidenceRows(readFileSync(path, "utf8"));
}
function parseEvidenceRows(raw) {
  const out = [];
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;
    try {
      const parsed = JSON.parse(trimmed);
      if (isEvidenceLedgerRow(parsed)) {
        out.push(
          typeof parsed.ts === "string" ? parsed : { ...parsed, ts: parsed.recorded_at }
        );
      }
    } catch {
    }
  }
  return out;
}
function isEvidenceLedgerRow(value) {
  if (typeof value !== "object" || value === null) return false;
  const row = value;
  return (typeof row.ts === "string" || typeof row.recorded_at === "string") && typeof row.engine === "string" && typeof row.code === "string" && typeof row.subject_digest === "string" && typeof row.verdict === "string" && typeof row.strength_class === "string" && typeof row.content_hash === "string";
}

export {
  EVIDENCE_LEDGER_SCHEMA_VERSION,
  PAQAD_VSA_PREDICATE_TYPE,
  IN_TOTO_STATEMENT_TYPE,
  buildEvidenceRow,
  readEvidenceRowsAt,
  parseEvidenceRows
};
