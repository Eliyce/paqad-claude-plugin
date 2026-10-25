import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  readEvidenceRowsAt
} from "./chunk-KKFSSPUD.js";
import {
  currentFeature
} from "./chunk-7UCGEMJB.js";
import {
  ENVELOPE_HEADER_KEYS,
  stampBundleRow
} from "./chunk-F256LZXA.js";
import {
  allocateOrdinal,
  appendStampedRowToUnit,
  currentOrdinal,
  readUnitFile
} from "./chunk-3CUGDX3J.js";
import {
  chatRagPath,
  featureChangeKey,
  featureFilePath
} from "./chunk-KF7HHHJR.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/feature-evidence/bundle-ledgers.ts
init_esm_shims();
var RULE_RUN_DOC_TYPE = "paqad.rule-run";
var RULE_RUN_SCHEMA_VERSION = 2;
var DUPLICATION_RUN_DOC_TYPE = "paqad.duplication";
var DUPLICATION_RUN_SCHEMA_VERSION = 2;
var CHANGE_METRICS_RUN_DOC_TYPE = "paqad.change-metrics";
var CHANGE_METRICS_RUN_SCHEMA_VERSION = 2;
var BUNDLE_RAG_DOC_TYPE = "paqad.rag";
var BUNDLE_RAG_SCHEMA_VERSION = 2;
var BUNDLE_EVIDENCE_DOC_TYPE = "paqad.evidence";
var BUNDLE_EVIDENCE_SCHEMA_VERSION = 2;
var ROW_HEADER_KEYS = /* @__PURE__ */ new Set([...ENVELOPE_HEADER_KEYS, "ts"]);
function rowBody(row, drop = []) {
  return Object.fromEntries(
    Object.entries(row).filter(([key]) => !ROW_HEADER_KEYS.has(key) && !drop.includes(key))
  );
}
function stampFeatureRow(dirName, sessionId, docType, schemaVersion, row, now) {
  return stampBundleRow({
    docType,
    change: featureChangeKey(dirName),
    sessionId,
    schemaVersion,
    row,
    now
  });
}
var CHAT_ORDINAL_DOC = "_chat";
function allocateChatOrdinal(projectRoot, sessionId) {
  return allocateOrdinal(projectRoot, CHAT_ORDINAL_DOC, sessionId);
}
function currentChatOrdinal(projectRoot, sessionId) {
  return currentOrdinal(projectRoot, CHAT_ORDINAL_DOC, sessionId);
}
function mirrorRagRow(projectRoot, sessionId, stampedRow) {
  try {
    const dirName = currentFeature(projectRoot, sessionId);
    if (!dirName) {
      appendStampedRowToUnit(projectRoot, chatRagPath(sessionId), stampedRow);
      return;
    }
    const bundleRow = stampFeatureRow(
      dirName,
      sessionId,
      BUNDLE_RAG_DOC_TYPE,
      BUNDLE_RAG_SCHEMA_VERSION,
      rowBody(stampedRow, ["adapter"]),
      () => new Date(stampedRow.ts)
    );
    appendStampedRowToUnit(projectRoot, featureFilePath(dirName, "rag"), bundleRow);
  } catch {
  }
}
var BUNDLE_FINDINGS_CAP = 50;
function duplicationRowFinding(finding) {
  return {
    file: finding.file,
    line_range: finding.line_range,
    matched_file: finding.matched_file,
    matched_symbol: finding.matched_symbol ?? null,
    matched_line_range: finding.matched_line_range,
    similarity: finding.similarity,
    matched_callers: finding.matched_callers,
    kind: finding.kind
  };
}
function capFindings(all) {
  return {
    findings: all.slice(0, BUNDLE_FINDINGS_CAP),
    findings_overflow: Math.max(0, all.length - BUNDLE_FINDINGS_CAP)
  };
}
function appendRuleRun(projectRoot, sessionId, entry) {
  const dirName = currentFeature(projectRoot, sessionId);
  if (!dirName) {
    return null;
  }
  try {
    const payload = {
      kind: entry.kind,
      counts: entry.counts,
      blocking: entry.blocking,
      note: entry.note ?? null,
      ...entry.findings ? capFindings(entry.findings) : {},
      ...entry.from_cache ? { from_cache: true } : {},
      ...entry.backfilled ? { backfilled: true } : {}
    };
    if (entry.from_cache && repeatsLastRuleRun(projectRoot, dirName, payload)) {
      return null;
    }
    const stamped = stampFeatureRow(
      dirName,
      sessionId,
      RULE_RUN_DOC_TYPE,
      RULE_RUN_SCHEMA_VERSION,
      payload,
      entry.now
    );
    appendStampedRowToUnit(projectRoot, featureFilePath(dirName, "ruleRun"), stamped);
    return stamped;
  } catch {
    return null;
  }
}
function repeatsLastRuleRun(projectRoot, dirName, payload) {
  const last = readRuleRun(projectRoot, dirName).at(-1);
  if (!last) return false;
  const keys = /* @__PURE__ */ new Set([...Object.keys(payload), "findings", "findings_overflow", "backfilled"]);
  return [...keys].every((key) => JSON.stringify(last[key]) === JSON.stringify(payload[key]));
}
function readRuleRun(projectRoot, dirName) {
  return readUnitFile(projectRoot, featureFilePath(dirName, "ruleRun"));
}
function appendDuplicationRun(projectRoot, sessionId, report, now, backfilled = false) {
  const dirName = currentFeature(projectRoot, sessionId);
  if (!dirName) {
    return null;
  }
  try {
    const stamped = stampFeatureRow(
      dirName,
      sessionId,
      DUPLICATION_RUN_DOC_TYPE,
      DUPLICATION_RUN_SCHEMA_VERSION,
      {
        counts: report.counts,
        similarity_threshold: report.similarity_threshold,
        min_lines: report.min_lines,
        mode: report.mode,
        blocking: report.blocking,
        ...Array.isArray(report.findings) ? capFindings(report.findings.map(duplicationRowFinding)) : {},
        ...backfilled ? { backfilled: true } : {}
      },
      now
    );
    appendStampedRowToUnit(projectRoot, featureFilePath(dirName, "duplication"), stamped);
    return stamped;
  } catch {
    return null;
  }
}
function readDuplication(projectRoot, dirName) {
  return readUnitFile(projectRoot, featureFilePath(dirName, "duplication"));
}
function appendChangeMetrics(projectRoot, sessionId, metrics, now, backfilled = false) {
  const dirName = currentFeature(projectRoot, sessionId);
  if (!dirName) {
    return null;
  }
  try {
    const stamped = stampFeatureRow(
      dirName,
      sessionId,
      CHANGE_METRICS_RUN_DOC_TYPE,
      CHANGE_METRICS_RUN_SCHEMA_VERSION,
      {
        dup_new_pct: metrics.dup_new_pct,
        reuse_rate: metrics.reuse_rate,
        meaningful_changed_lines: metrics.meaningful_changed_lines,
        flagged_lines: metrics.inputs.flagged_lines,
        reuse_calls: metrics.inputs.reuse_calls,
        ...backfilled ? { backfilled: true } : {}
      },
      now
    );
    appendStampedRowToUnit(projectRoot, featureFilePath(dirName, "changeMetrics"), stamped);
    return stamped;
  } catch {
    return null;
  }
}
function readChangeMetrics(projectRoot, dirName) {
  return readUnitFile(projectRoot, featureFilePath(dirName, "changeMetrics"));
}
function appendFeatureEvidenceRows(projectRoot, sessionId, rows) {
  const dirName = currentFeature(projectRoot, sessionId);
  if (!dirName || rows.length === 0) {
    return [];
  }
  try {
    const path = featureFilePath(dirName, "evidence");
    const written = [];
    for (const row of rows) {
      const stamped = stampFeatureRow(
        dirName,
        sessionId,
        BUNDLE_EVIDENCE_DOC_TYPE,
        BUNDLE_EVIDENCE_SCHEMA_VERSION,
        rowBody(row),
        () => new Date(row.ts)
      );
      appendStampedRowToUnit(projectRoot, path, stamped);
      written.push({ ...stamped, ts: row.ts });
    }
    return written;
  } catch {
    return [];
  }
}
function readFeatureEvidence(projectRoot, dirName) {
  return readEvidenceRowsAt(projectRoot, featureFilePath(dirName, "evidence"));
}

export {
  RULE_RUN_DOC_TYPE,
  CHANGE_METRICS_RUN_DOC_TYPE,
  allocateChatOrdinal,
  currentChatOrdinal,
  mirrorRagRow,
  appendRuleRun,
  readRuleRun,
  appendDuplicationRun,
  readDuplication,
  appendChangeMetrics,
  readChangeMetrics,
  appendFeatureEvidenceRows,
  readFeatureEvidence
};
