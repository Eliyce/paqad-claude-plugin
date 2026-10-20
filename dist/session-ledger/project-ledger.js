import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);

// src/session-ledger/ledger.ts
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

// src/core/constants/paths.ts
var PATHS = {
  AGENCY_DIR: ".paqad",
  AGENCY_CACHE_DIR: ".paqad/cache",
  AGENCY_SESSION_DIR: ".paqad/session",
  PROJECT_PROFILE: ".paqad/project-profile.yaml",
  PROJECT_CONFIG: ".paqad/.config",
  PROJECT_CONFIG_EXAMPLE: ".paqad/.config.example",
  PROJECT_CONFIGS_DIR: ".paqad/configs",
  PROJECT_CONFIGS_README: ".paqad/configs/README.md",
  DETECTION_REPORT: ".paqad/detection-report.json",
  ONBOARDING_MANIFEST: ".paqad/onboarding-manifest.json",
  RAG_IGNORE_CONFIG: ".paqad/rag.ignore.yaml",
  STACK_DRIFT: ".paqad/stack-drift.json",
  STACK_SNAPSHOT: ".paqad/stack-snapshot.json",
  DELIVERY_DETECTION: ".paqad/delivery-detection.json",
  DELIVERY_PR_BODY_TEMPLATE: ".paqad/templates/pr-body.md",
  FRAMEWORK_VERSION: ".paqad/framework-version.txt",
  FRAMEWORK_PATH: ".paqad/framework-path.txt",
  AGENT_ENTRY_SENTINEL: ".paqad/.agent-entry-loaded",
  GLOSSARY: ".paqad/glossary.md",
  HANDOFF: ".paqad/session/handoff.md",
  ACTIVE_IMPLEMENTATION_SESSION: ".paqad/session/active-implementation.json",
  CONTEXT_HIT_LOG: ".paqad/session/context-hit-log.json",
  REVIEW_DIGEST: ".paqad/session/review-digest.md",
  HUD_DIR: ".paqad/session/hud",
  PROJECT_QUESTION_ANSWER: ".paqad/session/project-question-answer.json",
  AUDIT_LOG: ".paqad/audit.log",
  DECISIONS_DIR: ".paqad/decisions",
  DECISIONS_PENDING_DIR: ".paqad/decisions/pending",
  DECISIONS_RESOLVED_DIR: ".paqad/decisions/resolved",
  DECISIONS_EXPIRED_DIR: ".paqad/decisions/expired",
  DECISIONS_INDEX: ".paqad/decisions/index.json",
  DECISIONS_AUDIT_LOG: ".paqad/decisions/audit.jsonl",
  DECISIONS_EVENTS_LOG: ".paqad/decisions/events.jsonl",
  DECISIONS_LOCK: ".paqad/decisions/.lock",
  DECISION_PAUSE_CONTRACT: ".paqad/decision-pause-contract.md",
  NARRATION_CONTRACT: ".paqad/narration-contract.md",
  CHUNK_INDEX: ".paqad/context/chunk-index.json",
  LOAD_STATS: ".paqad/context/load-stats.json",
  VECTORS_DIR: ".paqad/vectors",
  VECTOR_INDEX: ".paqad/vectors/index.json",
  VECTOR_META: ".paqad/vectors/meta.json",
  VISION_VECTOR_INDEX: ".paqad/vectors/vision-index.json",
  VISION_VECTOR_META: ".paqad/vectors/vision-meta.json",
  CRS_DIR: ".paqad/crs",
  SECRETS_ENV: ".paqad/secrets.env",
  SESSION_ATTACHMENT_COLLECTIONS_DIR: ".paqad/attachments",
  SESSION_ATTACHMENT_REGISTRY: ".paqad/attachments/registry.json",
  ATTACHMENT_EVENTS_LOG: ".paqad/attachment-events.jsonl",
  GLOBAL_PATTERN_VECTORS_DIR: ".paqad/patterns/vectors",
  GLOBAL_PATTERN_VECTOR_INDEX: ".paqad/patterns/vectors/index.json",
  GLOBAL_PATTERN_VECTOR_META: ".paqad/patterns/vectors/meta.json",
  TRANSITION_LOG: ".paqad/cache/transition-log.json",
  CACHE_METRICS: ".paqad/cache/metrics.json",
  PLANNING_MANIFESTS_DIR: ".paqad/planning/manifests",
  CHECKS_DIR: ".paqad/checks",
  CHECKS_REPORT: ".paqad/checks/last-run.json",
  REGRESSION_GUARDS_DIR: ".paqad/regression-guards",
  FLAKY_TESTS_DIR: ".paqad/flaky-tests",
  FLAKY_REGISTRY: ".paqad/flaky-tests/registry.json",
  FINDINGS_DIR: ".paqad/findings",
  TRIAGE_LEDGER: ".paqad/findings/triage.json",
  EVIDENCE_LEDGER_DIR: ".paqad/ledger",
  EVIDENCE_LEDGER: ".paqad/ledger/evidence.jsonl",
  FEATURE_EVIDENCE_DIR: ".paqad/ledger/feature-evidence",
  FEATURE_EVIDENCE_SESSION_DIR: ".paqad/ledger/feature-evidence/_session",
  CHAT_LEDGER_DIR: ".paqad/ledger/_chat",
  DISCOVERY_DIR: ".paqad/ledger/delivery",
  LEDGER_SESSION_ID: ".paqad/session/ledger-session-id",
  EVIDENCE_RECEIPT: ".paqad/ledger/receipt.dsse.json",
  EVIDENCE_RECEIPT_CHAIN: ".paqad/ledger/receipts.jsonl",
  EVIDENCE_AI_BOM: ".paqad/ledger/ai-bom.json",
  EVIDENCE_CONTEXT_STAMP: ".paqad/session/context-stamp.json",
  TRACEABILITY_DIR: ".paqad/traceability",
  TRACEABILITY_MAP: ".paqad/traceability/map.json",
  QUALITY_BASELINE: ".paqad/quality-baseline.json",
  PLANNING_MODULE_HEALTH_DIR: ".paqad/module-health",
  MODULE_HEALTH_EVIDENCE_DIR: ".paqad/module-health-evidence",
  MODULE_HEALTH_CONSUMED_EVENTS: ".paqad/module-health-consumed-events.json",
  MODULE_HEALTH_LOCK: ".paqad/locks/module-health.lock",
  MODULE_HEALTH_LOG: ".paqad/logs/module-health.log",
  COMPILED_RULES: ".paqad/compiled-rules.json",
  PLANNING_COSTS: ".paqad/cache/planning-costs.json",
  CONTEXT_SESSION_ARTIFACT: ".paqad/context/session-context.md",
  CODEBASE_MEMORY: ".paqad/crs/codebase-memory.json",
  BASE_DRIFT_STATE: ".paqad/session/base-drift.json",
  BASE_DRIFT_MARKER: ".paqad/session/base-drift.marker",
  BASE_DRIFT_LOCK: ".paqad/locks/base-drift.lock",
  CONTEXT_BUDGET_STATE: ".paqad/session/context-budget.json",
  CONTEXT_SAVINGS: ".paqad/session/context-savings.json",
  DEDUP_STATS: ".paqad/session/dedup-stats.json",
  HANDOFF_JSON: ".paqad/session/handoff.json",
  HANDOFF_STATS: ".paqad/session/handoff-stats.json",
  WORKFLOWS_DIR: "docs/instructions/workflows",
  WORKFLOW_RUNS_DIR: ".paqad/workflows",
  SKILL_CACHE_DIR: ".paqad/cache/skill-results",
  SKILL_INDEX: ".paqad/skill-index.json",
  SKILL_AUDIT_EVENTS_LOG: ".paqad/skills/events.jsonl",
  DOC_PROGRESS: ".paqad/doc-progress.json",
  DOC_RUN_SESSION: ".paqad/session/doc-run.json",
  PENTEST_ROOT_DIR: ".paqad/pentest",
  PENTEST_RUNS_DIR: ".paqad/pentest/runs",
  HEALTH_ROOT_DIR: ".paqad/health",
  HEALTH_RUNS_DIR: ".paqad/health/runs",
  HEALTH_BASELINE: ".paqad/health/baseline.json",
  SITE_MAP_ROOT_DIR: ".paqad/site-map",
  SITE_MAP_RUNS_DIR: ".paqad/site-map/runs",
  SITE_MAP_BASELINE: ".paqad/site-map/baseline.json",
  SITE_MAP_PROGRESS: ".paqad/site-map/progress.json",
  INDEXES_DIR: ".paqad/indexes",
  CODE_KNOWLEDGE_INDEX: ".paqad/indexes/code-knowledge.json",
  FRAMEWORK_API_INDEX: ".paqad/indexes/framework-api.json",
  SITE_MAP_CANONICAL_DIR: "docs/site-map",
  SITE_MAP_CANONICAL_APP_MAP: "docs/site-map/app-map.yaml",
  SITE_MAP_CANONICAL_JOURNEYS_DIR: "docs/site-map/journeys",
  SITE_MAP_CANONICAL_ANSWERS: "docs/site-map/answers.yaml",
  SITE_MAP_CANONICAL_LAYOUT: "docs/site-map/layout.yaml",
  DOCS_DIR: "docs",
  FRAMEWORK_DOCS_DIR: "docs/framework",
  FRAMEWORK_STACK_DIR: "docs/instructions/stack",
  RCA_DIR: "docs/rca",
  PENTEST_DIR: "docs/pentest",
  PENTEST_RETEST_DIR: "docs/pentest/retests",
  HEALTH_DIR: "docs/health",
  RULES_DIR: "docs/instructions/rules",
  MODULE_MAP: "docs/instructions/rules/module-map.yml",
  TOOLS_DIR: "docs/instructions/tools",
  INSTRUCTIONS_DIR: "docs/instructions",
  ARCHITECTURE_DIR: "docs/instructions/architecture",
  DESIGN_SYSTEM_DIR: "docs/instructions/design-system",
  DESIGN_TOKENS_FILE: "docs/instructions/design-system/design-tokens.json",
  MODULES_DIR: "docs/modules",
  REGISTRIES_DIR: "docs/instructions/registries",
  BENCHMARKS_DIR: "docs/instructions/benchmarks",
  TECH_DEBT_DIR: "docs/instructions/tech-debt",
  MODULE_DB_DIR: "database",
  MODULE_API_DIR: "api",
  MODULE_INTEGRATION_DIR: "integration",
  MODULE_UI_DIR: "ui",
  MODULE_FEATURES_DIR: "features",
  MODULE_USER_FLOWS_DIR: "user-flows",
  MODULE_RESEARCH_DIR: "research",
  MODULE_DECISIONS_DIR: "decisions",
  MODULE_ERROR_CATALOG: "error-catalog.md",
  CLAUDE_MD: "CLAUDE.md",
  AGENTS_MD: "AGENTS.md",
  ANTIGRAVITY_MD: "ANTIGRAVITY.md",
  GEMINI_MD: "GEMINI.md",
  SCRIPTS_DIR: "scripts",
  HOOKS_DIR: ".paqad/hooks",
  LOGS_DIR: ".paqad/logs",
  LOCKS_DIR: ".paqad/locks",
  AUTO_UPDATE_LOG: ".paqad/logs/auto-update.log",
  MCP_RECOMMENDATIONS: ".paqad/mcp-recommendations.json",
  MCP_CLEANUP_LOG: ".paqad/logs/mcp-cleanup.log",
  PROSPECTIVE_DECISIONS_DIR: ".paqad/decisions/module-decisions",
  MODULE_MAP_HISTORY_DIR: ".paqad/module-map/history",
  MODULE_MAP_EVENTS_LOG: ".paqad/module-map/events.jsonl",
  MODULE_MAP_DRIFT: ".paqad/module-map/drift.json",
  SCHEMA_MARKER: ".paqad/schema-version.json",
  SCHEMA_MIGRATION_LOG: ".paqad/schema-migrations.jsonl",
  SCHEMA_MIGRATION_LOCK: ".paqad/locks/schema-migration.lock",
  ONBOARDING_CHECKPOINT: ".paqad/onboarding-checkpoint.json",
  RULE_SCRIPT_MAP: "docs/instructions/rules/rule-script-map.yml",
  RULE_SCRIPTS_DIR: ".paqad/scripts/rules",
  RULE_SCRIPTS_CACHE_DIR: ".paqad/scripts/rules/.cache",
  RULE_SCRIPTS_REPORT: ".paqad/scripts/rules/.cache/report.json",
  RULE_SCRIPTS_DRIFT: ".paqad/scripts/rules/.cache/drift.json",
  DUPLICATION_REPORT: ".paqad/scripts/rules/.cache/duplication.json",
  RULE_SCRIPT_MAP_HISTORY_DIR: ".paqad/scripts/rules/.history",
  RULE_SCRIPT_MAP_EVENTS_LOG: ".paqad/scripts/rules/.history/events.jsonl",
  CAPABILITY_LOCK: ".paqad/capability-lock.json"
};

// src/session-ledger/ledger.ts
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

// src/session-ledger/project-ledger.ts
var PROJECT_SESSION = "_project";
function ensureUnit(projectRoot, docType) {
  const current = currentOrdinal(projectRoot, docType, PROJECT_SESSION);
  if (current > 0) {
    return current;
  }
  return openSessionDoc(projectRoot, docType, PROJECT_SESSION, {}).ordinal;
}
function recordProjectEvent(projectRoot, docType, row, schemaVersion = 1) {
  try {
    const ordinal = ensureUnit(projectRoot, docType);
    appendSessionEvent(projectRoot, docType, PROJECT_SESSION, ordinal, row, { schemaVersion });
  } catch {
  }
}
function readProjectEvents(projectRoot, docType) {
  return readSessionDoc(projectRoot, docType, PROJECT_SESSION);
}
function readLatestProjectEvent(projectRoot, docType, match) {
  const rows = readSessionDoc(projectRoot, docType, PROJECT_SESSION);
  for (let i = rows.length - 1; i >= 0; i--) {
    if (match(rows[i])) {
      return rows[i];
    }
  }
  return null;
}
export {
  readLatestProjectEvent,
  readProjectEvents,
  recordProjectEvent
};
//# sourceMappingURL=project-ledger.js.map