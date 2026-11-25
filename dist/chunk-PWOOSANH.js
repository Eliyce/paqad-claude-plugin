import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  Minimatch,
  readRawModuleMap,
  tokenize
} from "./chunk-ANTLLTOX.js";
import {
  STAGE_IDS,
  appendEvent,
  readEvents,
  readJsonLines,
  readRun,
  withJourneyLock
} from "./chunk-CJ4B24JG.js";
import {
  readProjectProfile
} from "./chunk-3K27FBMG.js";
import {
  readProjectEvents,
  recordProjectEvent
} from "./chunk-Y7R46KRJ.js";
import {
  writeFileAtomic
} from "./chunk-RLWC6XFR.js";
import {
  toPosixPath
} from "./chunk-DE72RWA7.js";
import {
  LEDGER_LOCK_STALE_MS,
  acquireOwnedFileLock,
  appendFeatureStageRow,
  bundleLockPath,
  currentFeature,
  openFeatureChange,
  readFeatureStageUnit,
  recordChangeConstants,
  resumeFeatureByRef
} from "./chunk-I4T6ZSTJ.js";
import {
  PRE_CODE_STAGES,
  SLICE_DONE_KIND,
  SLICE_EDIT_ALLOWED_KIND,
  SLICE_END_REFUSED_KIND,
  SLICE_GATE_KIND,
  SLICE_START_KIND,
  STAGE_EVIDENCE_DOC_TYPE,
  UNTITLED_FEATURE_TITLE,
  agentForWriter,
  featureRecordIsUntitled,
  isEditStage,
  isKnownStage,
  isLaneStage,
  liveStageAgents,
  mintFeatureDirName,
  readChangeConstants,
  readFeatureRecord,
  requiredPreCodeStages,
  rowRecordedAt,
  sessionReattachableFeature,
  stageAgentIdentity,
  startedAfterLastEnd,
  startedByAnotherAgent,
  updateFeatureRecord
} from "./chunk-WEFEQHGZ.js";
import {
  API_IMPACTS,
  DATABASE_IMPACTS,
  stageForAgentName,
  stripPluginAgentNamespace
} from "./chunk-LDKFDN3R.js";
import {
  DecisionPacketCorruptError
} from "./chunk-H3JU5RBI.js";
import {
  readGitState
} from "./chunk-YPOHZLD5.js";
import {
  require_ajv
} from "./chunk-XK65VKUF.js";
import {
  renameWithRetrySync
} from "./chunk-DZSC6KCZ.js";
import {
  getRuntimeRoot
} from "./chunk-NCABIBTI.js";
import {
  appendSessionEvent,
  computeSessionRowHash,
  currentOrdinal,
  openSessionDoc,
  sessionLedgerDir
} from "./chunk-2XQX5CIB.js";
import {
  resolveSessionId
} from "./chunk-F6BUWMKO.js";
import {
  ULID_BODY,
  featureChangeKey,
  featureDir,
  featureFilePath,
  isAbsolute,
  parseFeatureDirName,
  readSessionControl,
  relative,
  ulid,
  writeSessionControl
} from "./chunk-4UM6CK6G.js";
import {
  PATHS
} from "./chunk-UMPIHMXN.js";
import {
  __toESM,
  init_esm_shims
} from "./chunk-G5ZPBAMA.js";

// src/stage-evidence/live-writer.ts
init_esm_shims();

// src/feature-evidence/rename.ts
init_esm_shims();
import {
  existsSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync
} from "fs";
import { join } from "path";
var RENAME_LOCK_TIMEOUT_MS = 3e3;
var REWRITE_ATTEMPTS = 5;
function backfillFeatureSlug(projectRoot, dirName, title, now, issue) {
  const unchanged = { dirName, renamed: false };
  const parts = parseFeatureDirName(dirName);
  if (!parts || parts.slug !== UNTITLED_FEATURE_TITLE || parts.issue !== null || title.trim().length === 0) {
    return unchanged;
  }
  const minted = mintFeatureDirName({ title, issue, ulid: parts.ulid });
  if (minted.slug === UNTITLED_FEATURE_TITLE || minted.dirName === dirName) {
    return unchanged;
  }
  const absOld = join(projectRoot, featureDir(dirName));
  const absNew = join(projectRoot, featureDir(minted.dirName));
  if (existsSync(absNew)) {
    return unchanged;
  }
  const lock = takeBundleLock(bundleLockPath(projectRoot, dirName));
  if (lock === null) return unchanged;
  try {
    renameSync(absOld, absNew);
  } catch (error) {
    lock.release();
    if (error.code !== "ENOENT") {
      return unchanged;
    }
  }
  repointSessionControls(projectRoot, dirName, minted.dirName, now);
  rewriteArtifactPaths(projectRoot, dirName, minted.dirName);
  lock.movedTo(bundleLockPath(projectRoot, minted.dirName)).release();
  updateFeatureRecord(
    projectRoot,
    minted.dirName,
    { title, slug: minted.slug, issue: minted.issue },
    now
  );
  return { dirName: minted.dirName, renamed: true };
}
function titleActiveFeature(projectRoot, sessionId, title, issue, now) {
  const active = currentFeature(projectRoot, sessionId);
  if (!active) {
    return null;
  }
  const record = readFeatureRecord(projectRoot, active);
  if (record && !featureRecordIsUntitled(record)) {
    return null;
  }
  const result = backfillFeatureSlug(projectRoot, active, title, now, issue);
  return result.renamed ? result.dirName : null;
}
function takeBundleLock(lockDir) {
  try {
    return acquireOwnedFileLock(lockDir, {
      timeoutMs: RENAME_LOCK_TIMEOUT_MS,
      staleMs: LEDGER_LOCK_STALE_MS
    });
  } catch {
    return null;
  }
}
function repointSessionControls(projectRoot, oldName, newName, now) {
  let files;
  try {
    files = readdirSync(join(projectRoot, PATHS.FEATURE_EVIDENCE_SESSION_DIR));
  } catch {
    return;
  }
  for (const file of files) {
    if (!file.endsWith(".json")) {
      continue;
    }
    const sessionId = file.slice(0, -".json".length);
    try {
      const control = readSessionControl(projectRoot, sessionId, now);
      if (control.active !== oldName && !control.paused.includes(oldName)) {
        continue;
      }
      writeSessionControl(
        projectRoot,
        {
          ...control,
          active: control.active === oldName ? newName : control.active,
          paused: control.paused.map((name) => name === oldName ? newName : name)
        },
        now,
        "rename"
      );
    } catch {
    }
  }
}
function rewriteArtifactPaths(projectRoot, oldName, newName) {
  const absLedger = join(projectRoot, featureFilePath(newName, "stageEvidence"));
  const temp = `${absLedger}.rename-${process.pid}.tmp`;
  try {
    for (let attempt = 0; attempt < REWRITE_ATTEMPTS; attempt += 1) {
      const raw = readFileSync(absLedger, "utf8");
      const rewritten = relinkedLedger(raw, oldName, newName);
      if (rewritten === null) return;
      writeFileSync(temp, rewritten, "utf8");
      if (statSync(absLedger).size === Buffer.byteLength(raw)) {
        renameSync(temp, absLedger);
        return;
      }
    }
    rmSync(temp, { force: true });
  } catch {
  }
}
function relinkedLedger(raw, oldName, newName) {
  const oldPrefix = `${featureDir(oldName)}/`;
  const newPrefix = `${featureDir(newName)}/`;
  let changed = false;
  const rehashed = /* @__PURE__ */ new Map();
  const lines = raw.split("\n").map((line) => {
    if (line.trim() === "") return line;
    let row;
    try {
      row = JSON.parse(line);
    } catch {
      return line;
    }
    const oldHash = row.content_hash;
    let touched = false;
    if (Array.isArray(row.artifact_paths) && line.includes(oldPrefix)) {
      row.artifact_paths = row.artifact_paths.map(
        (path) => typeof path === "string" && path.startsWith(oldPrefix) ? `${newPrefix}${path.slice(oldPrefix.length)}` : path
      );
      touched = true;
    }
    if (rehashed.has(row.prev_hash)) {
      row.prev_hash = rehashed.get(row.prev_hash);
      touched = true;
    }
    if (touched) {
      row.content_hash = computeSessionRowHash(row);
      changed = true;
    }
    if (row.content_hash !== oldHash) rehashed.set(oldHash, row.content_hash);
    return touched ? JSON.stringify(row) : line;
  });
  return changed ? lines.join("\n") : null;
}

// src/stage-evidence/slices.ts
init_esm_shims();
import { existsSync as existsSync7, readFileSync as readFileSync8 } from "fs";
import { isAbsolute as isAbsolute2, join as join9, relative as relative3, sep } from "path";

// src/decisions/authoring.ts
init_esm_shims();
import {
  existsSync as existsSync6,
  mkdirSync as mkdirSync6,
  readFileSync as readFileSync7,
  readdirSync as readdirSync4,
  unlinkSync as unlinkSync2,
  writeFileSync as writeFileSync6
} from "fs";
import { dirname as dirname6, join as join8 } from "path";

// src/decision-reuse/index.ts
init_esm_shims();

// src/decision-reuse/types.ts
init_esm_shims();
var DECISION_REUSE_DOC_TYPE = "paqad.decision-reuse";
var DECISION_REUSE_SCHEMA_VERSION = 1;

// src/decision-reuse/schema.ts
init_esm_shims();
var import_ajv = __toESM(require_ajv(), 1);
var nullableString = { type: ["string", "null"] };
var DECISION_REUSE_SCHEMA = {
  $id: "paqad://schemas/decision-reuse.json",
  type: "object",
  additionalProperties: false,
  required: [
    "schema_version",
    "doc_type",
    "kind",
    "session_id",
    "conversation_ordinal",
    "ts",
    "adapter",
    "content_hash"
  ],
  properties: {
    schema_version: { type: "integer", const: 1 },
    doc_type: { const: DECISION_REUSE_DOC_TYPE },
    kind: { enum: ["open", "reuse", "suggestion", "standing-set", "standing-removed"] },
    session_id: { type: "string", minLength: 1 },
    conversation_ordinal: { type: "integer", minimum: 1 },
    ts: { type: "string", minLength: 1 },
    adapter: { type: "string", minLength: 1 },
    decision_id: nullableString,
    category: nullableString,
    chosen_option_key: nullableString,
    match_kind: {
      type: ["string", "null"],
      enum: ["exact", "fingerprint", "intent", "standing", "similar", null]
    },
    source_path: nullableString,
    note: nullableString,
    outcome: { type: ["string", "null"], enum: ["accepted", "changed", "none", null] },
    change: nullableString,
    for_decision: nullableString,
    rule_id: nullableString,
    content_hash: { type: "string", minLength: 1 }
  }
};
var ajv = new import_ajv.default({ allErrors: true, allowUnionTypes: true });
var compiled;
function validator() {
  if (!compiled) {
    compiled = ajv.compile(DECISION_REUSE_SCHEMA);
  }
  return compiled;
}
function validateDecisionReuseRow(row) {
  const validate = validator();
  if (validate(row)) {
    return [];
  }
  return (validate.errors ?? []).map(
    (error) => `${error.instancePath || "(root)"} ${error.message ?? "invalid"}`
  );
}

// src/decision-reuse/recorder.ts
init_esm_shims();
var APPEND_OPTS = (now) => ({
  schemaVersion: DECISION_REUSE_SCHEMA_VERSION,
  validate: (row) => validateDecisionReuseRow(row),
  now
});
function recordDecisionReuse(projectRoot, fields, ctx = {}) {
  try {
    const sessionId = resolveSessionId(
      projectRoot,
      ctx.sessionId ?? process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? null
    );
    const adapter = ctx.adapter ?? "unknown";
    const ordinal = ensureUnit(projectRoot, sessionId, adapter, ctx.now);
    return appendSessionEvent(
      projectRoot,
      DECISION_REUSE_DOC_TYPE,
      sessionId,
      ordinal,
      {
        kind: fields.kind ?? "reuse",
        conversation_ordinal: ordinal,
        adapter,
        decision_id: fields.decisionId,
        category: fields.category ?? null,
        chosen_option_key: fields.chosenOptionKey ?? null,
        match_kind: fields.matchKind ?? null,
        source_path: fields.sourcePath ?? null,
        note: fields.note ?? null,
        ...fields.outcome ? { outcome: fields.outcome } : {},
        ...fields.change ? { change: fields.change } : {},
        ...fields.forDecision ? { for_decision: fields.forDecision } : {},
        ...fields.ruleId ? { rule_id: fields.ruleId } : {}
      },
      APPEND_OPTS(ctx.now)
    );
  } catch {
    return null;
  }
}
function recordSuggestionOutcome(projectRoot, input, ctx = {}) {
  if (input.suggestion === void 0) return null;
  return recordDecisionReuse(
    projectRoot,
    {
      kind: "suggestion",
      decisionId: input.suggestion.earlier_id,
      matchKind: "intent",
      category: input.category,
      chosenOptionKey: input.chosen,
      note: input.suggestion.reason,
      outcome: input.chosen === input.suggestion.option_key ? "accepted" : "changed",
      change: input.change,
      forDecision: input.forDecision
    },
    ctx
  );
}
function ensureUnit(projectRoot, sessionId, adapter, now) {
  const current = currentOrdinal(projectRoot, DECISION_REUSE_DOC_TYPE, sessionId);
  if (current > 0) {
    return current;
  }
  return openSessionDoc(
    projectRoot,
    DECISION_REUSE_DOC_TYPE,
    sessionId,
    { adapter },
    APPEND_OPTS(now)
  ).ordinal;
}

// src/planning/decision-packet.ts
init_esm_shims();
var DECISION_CATEGORIES = [
  "component-reuse",
  "create-vs-reuse",
  "shared-abstraction",
  "ux-pattern",
  "architecture-path",
  "workflow-or-tool",
  "intake.requirement",
  "intake.confirm_auto_resolution",
  "intake.write_back",
  "delivery.open_pr",
  "delivery.ci_red",
  "spec.change",
  "spec.contradiction",
  "spec.expert_conflict",
  "fix.proof_method",
  "test.flaky_judgement",
  "finding.triage",
  "quality.ratchet_exception",
  "analytics.provider_version_mismatch",
  "analytics.taxonomy_violation",
  "analytics.pii_consent",
  "analytics.no_provider_flag",
  "analytics.architecture_conflict",
  "analytics.new_event",
  "authoring.overlap",
  "authoring.risky_script",
  "authoring.agent_permission",
  "authoring.intake_gap",
  "authoring.improvement",
  "authoring.retirement",
  "authoring.override",
  "rules.proposal"
];
var DECISION_STATUSES = [
  "pending",
  "resolved",
  "delegated",
  "expired",
  "superseded"
];
var STRICT_DECISION_ID = new RegExp(`^D-${ULID_BODY}$`, "u");
function isStrictDecisionId(id) {
  return STRICT_DECISION_ID.test(id);
}
var DECISION_INTENTS = [
  "explicit",
  "delegated",
  "safer-default",
  "safer-default-by-cap",
  "created-new"
];
var DECISION_CARRY_OVER_SCOPES = ["session", "task", "none"];
function earlierCheckToKeep(check) {
  if (check.listed_by !== "titles") return check;
  const kept = { ...check };
  delete kept.candidates;
  return kept;
}
var DECISION_CATEGORY_DEFAULTS = {
  "component-reuse": { create_new: true, reversibility: "easy", ttl_days: 30 },
  "create-vs-reuse": { create_new: true, reversibility: "easy", ttl_days: 30 },
  "shared-abstraction": { create_new: true, reversibility: "moderate", ttl_days: 60 },
  "ux-pattern": { create_new: false, reversibility: "easy", ttl_days: 30 },
  "architecture-path": { create_new: false, reversibility: "hard", ttl_days: 90 },
  "workflow-or-tool": { create_new: false, reversibility: "easy", ttl_days: 7 },
  "intake.requirement": { create_new: true, reversibility: "easy", ttl_days: 14 },
  "intake.confirm_auto_resolution": { create_new: false, reversibility: "easy", ttl_days: 7 },
  "intake.write_back": { create_new: false, reversibility: "easy", ttl_days: 1 },
  "delivery.open_pr": { create_new: false, reversibility: "easy", ttl_days: 1 },
  "delivery.ci_red": { create_new: false, reversibility: "easy", ttl_days: 1 },
  "spec.change": { create_new: false, reversibility: "moderate", ttl_days: 30 },
  "spec.contradiction": { create_new: false, reversibility: "hard", ttl_days: 7 },
  "spec.expert_conflict": { create_new: false, reversibility: "moderate", ttl_days: 30 },
  "fix.proof_method": { create_new: false, reversibility: "moderate", ttl_days: 30 },
  "test.flaky_judgement": { create_new: false, reversibility: "moderate", ttl_days: 30 },
  "finding.triage": { create_new: false, reversibility: "moderate", ttl_days: 30 },
  "quality.ratchet_exception": { create_new: false, reversibility: "moderate", ttl_days: 30 },
  "analytics.provider_version_mismatch": {
    create_new: false,
    reversibility: "moderate",
    ttl_days: 30
  },
  "analytics.taxonomy_violation": { create_new: false, reversibility: "hard", ttl_days: 14 },
  "analytics.pii_consent": { create_new: false, reversibility: "hard", ttl_days: 7 },
  "analytics.no_provider_flag": { create_new: false, reversibility: "easy", ttl_days: 7 },
  "analytics.architecture_conflict": { create_new: false, reversibility: "moderate", ttl_days: 30 },
  "analytics.new_event": { create_new: true, reversibility: "hard", ttl_days: 14 },
  "authoring.overlap": { create_new: true, reversibility: "moderate", ttl_days: 30 },
  "authoring.risky_script": { create_new: false, reversibility: "hard", ttl_days: 30 },
  "authoring.agent_permission": { create_new: false, reversibility: "hard", ttl_days: 30 },
  "authoring.intake_gap": { create_new: false, reversibility: "easy", ttl_days: 30 },
  "authoring.improvement": { create_new: false, reversibility: "easy", ttl_days: 60 },
  "authoring.retirement": { create_new: false, reversibility: "moderate", ttl_days: 60 },
  "authoring.override": { create_new: false, reversibility: "moderate", ttl_days: 30 },
  "rules.proposal": { create_new: false, reversibility: "moderate", ttl_days: 30 }
};
function packetHoldsChange(packet, changeKey) {
  const named = packet.change;
  if (typeof named !== "string" || named.trim() === "" || changeKey === null) return true;
  return named === changeKey;
}
function isDecisionPacket(value) {
  return validateDecisionPacket(value).length === 0;
}
function validateDecisionPacket(value) {
  if (typeof value !== "object" || value === null) {
    return ["packet must be an object"];
  }
  const packet = value;
  const errors = [];
  if (!/^D-(?:\d+|[0-9A-HJKMNP-TV-Z]{26})$/.test(packet.decision_id ?? "")) {
    errors.push("decision_id must match D-{id}");
  }
  if (typeof packet.fingerprint !== "string" || !packet.fingerprint.startsWith("sha256:")) {
    errors.push("fingerprint must be a sha256 string");
  }
  if (!DECISION_CATEGORIES.includes(packet.category)) {
    errors.push("category is invalid");
  }
  if (typeof packet.question !== "string" || packet.question.trim().length === 0) {
    errors.push("question is required");
  }
  if (typeof packet.context !== "string" || packet.context.trim().length === 0) {
    errors.push("context is required");
  }
  if (!Array.isArray(packet.options) || packet.options.length < 2 || packet.options.length > 5) {
    errors.push("options must contain 2 to 5 entries");
  } else {
    for (const [index, option] of packet.options.entries()) {
      errors.push(...validateDecisionOption(option, index));
    }
  }
  if (typeof packet.confidence !== "number" || packet.confidence < 0 || packet.confidence > 1) {
    errors.push("confidence must be between 0 and 1");
  }
  if (typeof packet.requested_by !== "string" || packet.requested_by.trim().length === 0) {
    errors.push("requested_by is required");
  }
  if (typeof packet.task_session_id !== "string" || packet.task_session_id.trim().length === 0) {
    errors.push("task_session_id is required");
  }
  if (!isIsoDate(packet.created_at)) {
    errors.push("created_at must be an ISO date");
  }
  if (!DECISION_STATUSES.includes(packet.status)) {
    errors.push("status is invalid");
  }
  if (!isIsoDate(packet.ttl_until)) {
    errors.push("ttl_until must be an ISO date");
  }
  if (!Array.isArray(packet.invalidation_watch) || packet.invalidation_watch.some((path) => typeof path !== "string")) {
    errors.push("invalidation_watch must be a string array");
  }
  if (packet.recommendation !== void 0 && packet.recommendation !== null) {
    if (typeof packet.recommendation !== "string" || !packet.options?.some((option) => option.option_key === packet.recommendation)) {
      errors.push("recommendation must reference an option_key");
    }
    if (packet.recommendation && (typeof packet.recommendation_reason !== "string" || packet.recommendation_reason.trim().length === 0)) {
      errors.push("recommendation_reason is required when recommendation is present");
    }
  }
  if (packet.human_response !== void 0) {
    errors.push(...validateHumanResponse(packet.human_response, packet.options ?? []));
  }
  return errors;
}
function toDecisionRecord(packet) {
  if (packet.status === "pending" || !packet.human_response || packet.human_response.chosen_option_key === null) {
    return null;
  }
  const chosenOption = packet.options.find(
    (option) => option.option_key === packet.human_response?.chosen_option_key
  );
  if (!chosenOption) {
    return null;
  }
  return {
    decision_id: packet.decision_id,
    choice: chosenOption.label,
    reason: packet.human_response.note?.trim() || chosenOption.trade_off,
    alternatives_rejected: packet.options.filter((option) => option.option_key !== chosenOption.option_key).map((option) => ({
      alternative: option.label,
      rejection_reason: option.trade_off
    })),
    /* v8 ignore start -- linked_requirements is always set in practice; ?? [] is a safety net */
    linked_requirements: packet.linked_requirements ?? [],
    /* v8 ignore stop */
    reversibility: DECISION_CATEGORY_DEFAULTS[packet.category].reversibility
  };
}
function validateDecisionOption(value, index) {
  if (typeof value !== "object" || value === null) {
    return [`options[${index}] must be an object`];
  }
  const option = value;
  const errors = [];
  if (typeof option.option_key !== "string" || option.option_key.trim().length === 0) {
    errors.push(`options[${index}].option_key is required`);
  }
  if (typeof option.label !== "string" || option.label.trim().length === 0) {
    errors.push(`options[${index}].label is required`);
  }
  if (typeof option.one_line_preview !== "string" || option.one_line_preview.trim().length === 0) {
    errors.push(`options[${index}].one_line_preview is required`);
  }
  if (typeof option.trade_off !== "string" || option.trade_off.trim().length === 0) {
    errors.push(`options[${index}].trade_off is required`);
  }
  errors.push(...validateDecisionEvidence(option.evidence, index));
  if (option.technical_detail !== void 0 && typeof option.technical_detail !== "string") {
    errors.push(`options[${index}].technical_detail must be a string`);
  }
  return errors;
}
function validateDecisionEvidence(value, index) {
  if (typeof value !== "object" || value === null) {
    return [`options[${index}].evidence must be an object`];
  }
  const evidence = value;
  const errors = [];
  if (evidence.file !== void 0 && typeof evidence.file !== "string") {
    errors.push(`options[${index}].evidence.file must be a string`);
  }
  if (evidence.last_modified !== void 0 && !isIsoDate(evidence.last_modified)) {
    errors.push(`options[${index}].evidence.last_modified must be an ISO date`);
  }
  if (evidence.callers !== void 0 && typeof evidence.callers !== "number") {
    errors.push(`options[${index}].evidence.callers must be a number`);
  }
  if (evidence.similarity !== void 0 && (typeof evidence.similarity !== "number" || evidence.similarity < 0 || evidence.similarity > 1)) {
    errors.push(`options[${index}].evidence.similarity must be between 0 and 1`);
  }
  if (evidence.rule_match !== void 0 && typeof evidence.rule_match !== "string") {
    errors.push(`options[${index}].evidence.rule_match must be a string`);
  }
  if (evidence.evidence_partial !== void 0 && typeof evidence.evidence_partial !== "boolean") {
    errors.push(`options[${index}].evidence.evidence_partial must be a boolean`);
  }
  if (evidence.findings !== void 0 && (!Array.isArray(evidence.findings) || evidence.findings.some((finding) => typeof finding !== "string"))) {
    errors.push(`options[${index}].evidence.findings must be a string array`);
  }
  return errors;
}
function validateHumanResponse(value, options) {
  if (typeof value !== "object" || value === null) {
    return ["human_response must be an object"];
  }
  const response = value;
  const errors = [];
  if (response.chosen_option_key !== null && response.chosen_option_key !== void 0 && (typeof response.chosen_option_key !== "string" || !options.some((option) => option.option_key === response.chosen_option_key))) {
    errors.push("human_response.chosen_option_key must reference an option_key");
  }
  if (!DECISION_INTENTS.includes(response.intent)) {
    errors.push("human_response.intent is invalid");
  }
  if (typeof response.explanation_rounds_used !== "number" || response.explanation_rounds_used < 0 || response.explanation_rounds_used > 3) {
    errors.push("human_response.explanation_rounds_used must be between 0 and 3");
  }
  if (!isIsoDate(response.responded_at)) {
    errors.push("human_response.responded_at must be an ISO date");
  }
  if (typeof response.responded_by !== "string" || response.responded_by.trim().length === 0) {
    errors.push("human_response.responded_by is required");
  }
  if (!DECISION_CARRY_OVER_SCOPES.includes(response.carry_over_scope)) {
    errors.push("human_response.carry_over_scope is invalid");
  }
  if (response.note !== void 0 && typeof response.note !== "string") {
    errors.push("human_response.note must be a string");
  }
  return errors;
}
function isIsoDate(value) {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

// src/planning/decision-audit.ts
init_esm_shims();
import { appendFileSync, existsSync as existsSync2, mkdirSync, readFileSync as readFileSync2, writeFileSync as writeFileSync2 } from "fs";
import { dirname, join as join2 } from "path";
var DECISION_AUDIT_EVENTS = [
  "decision-pending-written",
  "decision-resolved-by-human",
  "decision-resolved-by-rule",
  "decision-resolved-by-memoization",
  "decision-resolved-by-rag-confident",
  "decision-reused",
  "decision-expired",
  "decision-superseded",
  "decision-delegated",
  "undeclared-decision-flagged",
  "decision-discarded"
];
function appendDecisionAuditEvent(projectRoot, event) {
  const path = join2(projectRoot, PATHS.DECISIONS_AUDIT_LOG);
  mkdirSync(dirname(path), { recursive: true });
  appendFileSync(path, `${JSON.stringify(event)}
`);
  return path;
}
function ensureDecisionAuditLog(projectRoot) {
  const path = join2(projectRoot, PATHS.DECISIONS_AUDIT_LOG);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync2(path, "", { flag: "a" });
  return path;
}
function readDecisionAuditEvents(projectRoot) {
  const path = join2(projectRoot, PATHS.DECISIONS_AUDIT_LOG);
  if (!existsSync2(path)) {
    return [];
  }
  return readFileSync2(path, "utf8").split("\n").map((line) => line.trim()).filter(Boolean).map((line) => JSON.parse(line));
}

// src/planning/decision-store.ts
init_esm_shims();
import {
  existsSync as existsSync4,
  mkdirSync as mkdirSync4,
  readFileSync as readFileSync5,
  readdirSync as readdirSync3,
  renameSync as renameSync2,
  statSync as statSync2,
  unlinkSync,
  writeFileSync as writeFileSync4
} from "fs";
import { basename, dirname as dirname4, join as join6, relative as relative2 } from "path";

// src/onboarding/journey/choices.ts
init_esm_shims();
import { appendFileSync as appendFileSync2, mkdirSync as mkdirSync2 } from "fs";
import { dirname as dirname2, join as join3 } from "path";
var AUTO_RESPONDER = "paqad-onboarding";
function choicesPath(projectRoot) {
  return join3(projectRoot, PATHS.ONBOARDING_CHOICES);
}
function readChoices(projectRoot) {
  return readJsonLines(choicesPath(projectRoot), (row) => typeof row.id === "string");
}
function appendChoice(projectRoot, row) {
  return withJourneyLock(projectRoot, () => {
    const id = `C-${readChoices(projectRoot).length + 1}`;
    const full = { id, ...row };
    const path = choicesPath(projectRoot);
    mkdirSync2(dirname2(path), { recursive: true });
    appendFileSync2(path, `${JSON.stringify(full)}
`, { encoding: "utf8", flag: "a" });
    return full;
  });
}
function markChoicesReviewed(projectRoot, ids, now = () => /* @__PURE__ */ new Date()) {
  return withJourneyLock(projectRoot, () => {
    const rows = readChoices(projectRoot);
    const marked = [];
    const next = rows.map((row) => {
      if (row.reviewed || ids !== "all" && !ids.includes(row.id)) return row;
      const reviewed = { ...row, reviewed: true, reviewed_at: now().toISOString() };
      marked.push(reviewed);
      return reviewed;
    });
    const body = next.map((row) => JSON.stringify(row)).join("\n");
    writeFileAtomic(choicesPath(projectRoot), next.length > 0 ? `${body}
` : "");
    return marked;
  });
}
function reviewedAutoDecisionIds(projectRoot) {
  const ids = /* @__PURE__ */ new Set();
  for (const row of readChoices(projectRoot)) {
    if (row.by === AUTO_RESPONDER && row.decision_id && row.reviewed) ids.add(row.decision_id);
  }
  return ids;
}

// src/onboarding/journey/packets.ts
init_esm_shims();
function processSession(env = process.env) {
  const session = env.SE_SESSION ?? env.CLAUDE_SESSION_ID ?? "";
  return session.trim() === "" ? null : session.trim();
}
function journeySessions(run, events) {
  const sessions = /* @__PURE__ */ new Set([run.owner_session]);
  for (const event of events) {
    if (event.kind !== "handover") continue;
    if (event.session) sessions.add(event.session);
    const from = event.note?.replace(/^from /u, "");
    if (from) sessions.add(from);
  }
  return sessions;
}
function noteJourneyDecision(projectRoot, decisionId, options = {}) {
  try {
    const run = readRun(projectRoot);
    if (run === null || run.status !== "running") return false;
    const stage = STAGE_IDS.find((id) => run.stages[id].status === "running");
    if (stage === void 0) return false;
    const session = options.session === void 0 ? processSession() : options.session;
    const sessions = journeySessions(run, readEvents(projectRoot, run.run_id));
    if (session !== null && !sessions.has(session)) return false;
    appendEvent(projectRoot, {
      ts: (options.now ?? (() => /* @__PURE__ */ new Date()))().toISOString(),
      run_id: run.run_id,
      kind: "decision_open",
      stage,
      ...session !== null ? { session } : {},
      decision_id: decisionId
    });
    return true;
  } catch {
    return false;
  }
}
function openedByJourney(projectRoot, run, decisionId) {
  return readEvents(projectRoot, run.run_id).some(
    (event) => event.kind === "decision_open" && event.decision_id === decisionId
  );
}

// src/planning/decision-ledger.ts
init_esm_shims();
var DECISION_EVIDENCE_DOC_TYPE = "decision-evidence";
var DECISION_EVIDENCE_SCHEMA_VERSION = 1;
function recordDecisionOpened(projectRoot, fields) {
  recordProjectEvent(
    projectRoot,
    DECISION_EVIDENCE_DOC_TYPE,
    {
      kind: "opened",
      decision_id: fields.decisionId,
      category: fields.category,
      title: fields.title,
      created_at: fields.createdAt
    },
    DECISION_EVIDENCE_SCHEMA_VERSION
  );
}
function recordDecisionResolved(projectRoot, decisionId, status, resolver) {
  recordProjectEvent(
    projectRoot,
    DECISION_EVIDENCE_DOC_TYPE,
    { kind: "resolved", decision_id: decisionId, status, resolver },
    DECISION_EVIDENCE_SCHEMA_VERSION
  );
}
function recordDecisionSuperseded(projectRoot, decisionId) {
  recordProjectEvent(
    projectRoot,
    DECISION_EVIDENCE_DOC_TYPE,
    { kind: "superseded", decision_id: decisionId },
    DECISION_EVIDENCE_SCHEMA_VERSION
  );
}
function recordDecisionDiscarded(projectRoot, decisionId, reason) {
  recordProjectEvent(
    projectRoot,
    DECISION_EVIDENCE_DOC_TYPE,
    { kind: "discarded", decision_id: decisionId, reason },
    DECISION_EVIDENCE_SCHEMA_VERSION
  );
}
function recordDecisionExpired(projectRoot, decisionId) {
  recordProjectEvent(
    projectRoot,
    DECISION_EVIDENCE_DOC_TYPE,
    { kind: "expired", decision_id: decisionId },
    DECISION_EVIDENCE_SCHEMA_VERSION
  );
}
function readDecisionEvidence(projectRoot) {
  const latest = /* @__PURE__ */ new Map();
  for (const row of readProjectEvents(projectRoot, DECISION_EVIDENCE_DOC_TYPE)) {
    const id = row.decision_id;
    const kind = row.kind;
    if (typeof id === "string" && typeof kind === "string") {
      latest.set(id, { kind, row });
    }
  }
  const pending = [];
  let resolvedCount = 0;
  let expiredCount = 0;
  for (const [id, { kind, row }] of latest) {
    if (kind === "opened") {
      const title = typeof row.title === "string" && row.title.length > 0 ? row.title : id;
      const createdAt = typeof row.created_at === "string" && row.created_at.length > 0 ? row.created_at : null;
      pending.push({ id, title, createdAt });
    } else if (kind === "resolved" || kind === "superseded") {
      resolvedCount += 1;
    } else if (kind === "expired") {
      expiredCount += 1;
    }
  }
  return { pending, resolvedCount, expiredCount };
}

// src/planning/decision-events.ts
init_esm_shims();
var DECISION_PAUSE_EVENT_TYPES = [
  "decision-paused",
  "decision-resolved",
  "decision-packet-corrupt",
  "decision-cap-exceeded",
  "decision-discarded"
];
function isoNow() {
  return (/* @__PURE__ */ new Date()).toISOString();
}
function toEventOption(option) {
  return {
    option_key: option.option_key,
    label: option.label,
    one_line_preview: option.one_line_preview,
    trade_off: option.trade_off,
    ...option.technical_detail !== void 0 ? { technical_detail: option.technical_detail } : {}
  };
}
function decisionPausedEvent(packet, packetPath2) {
  return {
    kind: "decision-paused",
    at: isoNow(),
    decisionId: packet.decision_id,
    category: packet.category,
    prompt: packet.question,
    question: packet.question,
    options: packet.options.map(toEventOption),
    recommendation: packet.recommendation ?? null,
    ...packet.recommendation_reason !== void 0 ? { recommendationReason: packet.recommendation_reason } : {},
    packetPath: packetPath2,
    ...packet.linked_slice_id !== void 0 ? { linkedSliceId: packet.linked_slice_id } : {}
  };
}
function decisionResolvedEvent(packet, resolver) {
  return {
    kind: "decision-resolved",
    at: isoNow(),
    decisionId: packet.decision_id,
    resolution: packet.status,
    chosenOptionKey: packet.human_response?.chosen_option_key ?? null,
    resolver,
    ...packet.human_response?.intent !== void 0 ? { intent: packet.human_response.intent } : {}
  };
}
function decisionPacketCorruptEvent(decisionId, reason) {
  return { kind: "decision-packet-corrupt", at: isoNow(), decisionId, reason };
}
function decisionCapExceededEvent(pendingCount, cap) {
  return { kind: "decision-cap-exceeded", at: isoNow(), pendingCount, cap };
}
function decisionDiscardedEvent(decisionId, reason) {
  return { kind: "decision-discarded", at: isoNow(), decisionId, reason };
}

// src/planning/decision-fingerprint.ts
init_esm_shims();
import { createHash } from "crypto";
var STOP_WORDS = /* @__PURE__ */ new Set([
  "a",
  "an",
  "and",
  "are",
  "for",
  "i",
  "is",
  "it",
  "of",
  "or",
  "should",
  "the",
  "this",
  "to",
  "we",
  "which",
  "you"
]);
var TOKEN_EQUIVALENTS = {
  choose: "choose",
  pick: "choose",
  use: "choose"
};
function computeDecisionFingerprint(input) {
  const payload = [
    input.category,
    normalizeDecisionQuestion(input.question),
    [...input.option_keys].sort().join("|"),
    buildRepoStateSignature(input.repo_state)
  ].join("::");
  return `sha256:${createHash("sha256").update(payload).digest("hex")}`;
}
function normalizeDecisionQuestion(value) {
  return tokenize2(value).map((token) => TOKEN_EQUIVALENTS[token] ?? token).filter((token) => !STOP_WORDS.has(token)).sort().join(" ");
}
function buildRepoStateSignature(input) {
  return JSON.stringify({
    active_capabilities: [...input.active_capabilities ?? []].sort(),
    packs: [...input.packs ?? []].sort(),
    stack: input.stack ?? null
  });
}
function scoreDecisionOptionOverlap(left, right) {
  const leftSet = new Set(left);
  const rightSet = new Set(right);
  const union = /* @__PURE__ */ new Set([...leftSet, ...rightSet]);
  if (union.size === 0) {
    return 1;
  }
  let intersection = 0;
  for (const value of leftSet) {
    if (rightSet.has(value)) {
      intersection += 1;
    }
  }
  return intersection / union.size;
}
function tokenize2(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().split(/\s+/).filter(Boolean);
}

// src/planning/decision-precedents.ts
init_esm_shims();
import { readdirSync as readdirSync2, readFileSync as readFileSync3 } from "fs";
import { join as join4 } from "path";

// src/decisions/packet-shape.ts
init_esm_shims();
var DAY_MS = 24 * 60 * 60 * 1e3;
var REQUESTED_BY = "paqad-decision-cli";
var STANDING_ANSWER_RESPONDER = "standing-answer";
function isDecisionCategory(value) {
  return DECISION_CATEGORIES.includes(value);
}
function richFieldsFor(packet) {
  if (!isDecisionCategory(packet.category)) return null;
  if (!Array.isArray(packet.options) || packet.options.length < 2 || packet.options.length > 5) {
    return null;
  }
  const createdMs = Date.parse(packet.created_at);
  const ttlDays = DECISION_CATEGORY_DEFAULTS[packet.category].ttl_days;
  const options = packet.options.map((option) => ({
    ...option,
    one_line_preview: option.one_line_preview ?? option.label,
    trade_off: option.trade_off ?? "Not stated when the decision was opened.",
    evidence: option.evidence ?? {}
  }));
  const fields = {
    decision_id: packet.id,
    fingerprint: computeDecisionFingerprint({
      category: packet.category,
      question: packet.title,
      option_keys: packet.options.map((option) => option.option_key),
      repo_state: {}
    }),
    question: packet.title,
    options,
    ...packet.recommendation ? { recommendation_reason: "Recommended by the agent that opened this decision." } : {},
    confidence: 1,
    requested_by: packet.origin ? `paqad-${packet.origin}` : REQUESTED_BY,
    task_session_id: packet.change ?? "no-active-change",
    status: packet.status,
    ttl_until: new Date((Number.isNaN(createdMs) ? 0 : createdMs) + ttlDays * DAY_MS).toISOString(),
    invalidation_watch: []
  };
  if (packet.status === "resolved" && typeof packet.chosen === "string") {
    fields.human_response = humanResponseFor(
      packet.chosen,
      packet.rationale,
      packet.resolved_at,
      packet.responded_by
    );
  }
  return fields;
}
function humanResponseFor(chosen, rationale, resolvedAt, respondedBy = "human") {
  return {
    chosen_option_key: chosen,
    intent: "explicit",
    explanation_rounds_used: 0,
    responded_at: resolvedAt ?? (/* @__PURE__ */ new Date(0)).toISOString(),
    responded_by: respondedBy,
    carry_over_scope: "task",
    ...rationale ? { note: rationale } : {}
  };
}
function readAnyDecisionPacket(value) {
  if (isDecisionPacket(value)) return value;
  if (typeof value !== "object" || value === null) return null;
  const candidate = value;
  if (typeof candidate.id !== "string" || typeof candidate.title !== "string" || typeof candidate.context !== "string" || typeof candidate.created_at !== "string" || candidate.status !== "pending" && candidate.status !== "resolved") {
    return null;
  }
  const rich = richFieldsFor(candidate);
  if (rich === null) return null;
  const upgraded = {
    ...candidate,
    ...rich,
    recommendation: candidate.recommendation ?? null
  };
  return isDecisionPacket(upgraded) ? upgraded : null;
}

// src/planning/decision-precedents.ts
var DEFAULT_PRECEDENT_LIMIT = 3;
var PRECEDENT_SCORE_FLOOR = 0.1;
var CATEGORY_WEIGHT = 0.5;
function jaccard(a, b) {
  if (a.size === 0 || b.size === 0) {
    return 0;
  }
  let intersection = 0;
  for (const token of a) {
    if (b.has(token)) {
      intersection++;
    }
  }
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}
function scorePrecedent(query, packet) {
  const sameCategory = query.category === packet.category ? CATEGORY_WEIGHT : 0;
  const queryTokens = new Set(tokenize(`${query.question} ${query.context ?? ""}`));
  const packetTokens = new Set(tokenize(`${packet.question} ${packet.context}`));
  return sameCategory + (1 - CATEGORY_WEIGHT) * jaccard(queryTokens, packetTokens);
}
function chosenLabel(packet) {
  const key = packet.human_response?.chosen_option_key;
  if (!key) {
    return null;
  }
  return packet.options.find((option) => option.option_key === key)?.label ?? key;
}
function readResolvedPackets(projectRoot) {
  const dir = join4(projectRoot, PATHS.DECISIONS_RESOLVED_DIR);
  let files;
  try {
    files = readdirSync2(dir);
  } catch {
    return [];
  }
  const packets = [];
  for (const file of files) {
    if (!file.endsWith(".json")) {
      continue;
    }
    try {
      const packet = readAnyDecisionPacket(
        JSON.parse(readFileSync3(join4(dir, file), "utf8"))
      );
      if (packet) {
        packets.push(packet);
      }
    } catch {
    }
  }
  return packets;
}
function findDecisionPrecedents(projectRoot, query, options = {}) {
  const limit = options.limit ?? DEFAULT_PRECEDENT_LIMIT;
  const floor = options.floor ?? PRECEDENT_SCORE_FLOOR;
  const reusable = journeyAnswerReusable(projectRoot);
  const candidates = readResolvedPackets(projectRoot).filter(
    (packet) => reusable(packet) && packet.decision_id !== query.decision_id && (!query.fingerprint || packet.fingerprint !== query.fingerprint) && (packet.status === "resolved" || packet.status === "delegated") && Boolean(packet.human_response?.chosen_option_key)
  );
  return candidates.map((packet) => ({ packet, score: scorePrecedent(query, packet) })).filter((entry) => entry.score >= floor).sort(
    (a, b) => b.score !== a.score ? b.score - a.score : a.packet.decision_id < b.packet.decision_id ? -1 : 1
  ).slice(0, limit).map(({ packet, score }) => ({
    decision_id: packet.decision_id,
    category: packet.category,
    question: packet.question,
    chosen: chosenLabel(packet),
    rationale: packet.human_response?.note?.trim() || void 0,
    resolved_at: packet.human_response?.responded_at,
    score
  }));
}
var PRECEDENT_BLOCK_HEADING = "Similar past decisions you already resolved:";
function formatDecisionPrecedents(precedents) {
  if (precedents.length === 0) {
    return "";
  }
  const lines = precedents.map((precedent) => {
    const choice = precedent.chosen ?? "no choice recorded";
    const why = precedent.rationale ? ` \u2014 ${precedent.rationale}` : "";
    return `- [${precedent.category}] "${precedent.question}" \u2192 ${choice}${why}`;
  });
  return `${PRECEDENT_BLOCK_HEADING}
${lines.join("\n")}`;
}

// src/decisions/earlier-answers.ts
init_esm_shims();
import { existsSync as existsSync3, mkdirSync as mkdirSync3, readFileSync as readFileSync4, writeFileSync as writeFileSync3 } from "fs";
import { dirname as dirname3, join as join5 } from "path";

// src/duplication/token-similarity.ts
init_esm_shims();
var DEFAULT_SHINGLE_SIZE = 4;
var SHINGLE_SEP = "\n";
function tokenizeCode(source) {
  const withoutComments = source.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ").replace(/#[^\n]*/g, " ");
  const withoutStrings = withoutComments.replace(/"(?:\\.|[^"\\])*"/g, '""').replace(/'(?:\\.|[^'\\])*'/g, "''").replace(/`(?:\\.|[^`\\])*`/g, "``");
  const tokens = withoutStrings.match(/[A-Za-z_$][A-Za-z0-9_$]*|[0-9]+|[^\sA-Za-z0-9_$]/g);
  return tokens ? tokens.map((token) => token.toLowerCase()) : [];
}
function shingles(tokens, size = DEFAULT_SHINGLE_SIZE) {
  const result = /* @__PURE__ */ new Set();
  if (tokens.length === 0) {
    return result;
  }
  if (tokens.length < size) {
    result.add(tokens.join(SHINGLE_SEP));
    return result;
  }
  for (let index = 0; index + size <= tokens.length; index += 1) {
    result.add(tokens.slice(index, index + size).join(SHINGLE_SEP));
  }
  return result;
}
function jaccard2(left, right) {
  if (left.size === 0 || right.size === 0) {
    return 0;
  }
  let intersection = 0;
  for (const shingle of left) {
    if (right.has(shingle)) {
      intersection += 1;
    }
  }
  const union = left.size + right.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

// src/decisions/earlier-answers.ts
var EARLIER_SCORE_FLOOR = 0.5;
var EARLIER_LIMIT = 5;
var EARLIER_TITLE_LIMIT = 200;
var EARLIER_TITLE_MAX_CHARS = 140;
var EARLIER_METHOD_MAX_CHARS = 2e3;
var EARLIER_OUTPUT_MAX_CHARS = 24e3;
var PRIVATE_ANSWER_CATEGORIES = [
  "authoring.override",
  "authoring.agent_permission",
  "authoring.risky_script",
  "analytics.pii_consent"
];
function foldQuestionText(question) {
  return question.trim().toLowerCase().replace(/\s+/gu, " ");
}
function questionWords(question) {
  return new Set(normalizeDecisionQuestion(question).split(" ").filter(Boolean));
}
function mayBeOffered(packet, query) {
  if (packet.decision_id === query.excludeId) return false;
  if (packet.status !== "resolved" && packet.status !== "delegated") return false;
  if (!packet.human_response?.chosen_option_key) return false;
  return !PRIVATE_ANSWER_CATEGORIES.includes(packet.category) || packet.category === query.category;
}
function sameQuestionKey(packet) {
  const optionKeys = packet.options.map((option) => option.option_key).sort();
  return JSON.stringify([foldQuestionText(packet.question), optionKeys]);
}
function isNewerAnswer(packet, held) {
  const byTime = Date.parse(packet.human_response.responded_at) - Date.parse(held.human_response.responded_at);
  return byTime !== 0 ? byTime > 0 : packet.decision_id > held.decision_id;
}
function newestOfEachQuestion(packets) {
  const newest = /* @__PURE__ */ new Map();
  for (const packet of packets) {
    const key = sameQuestionKey(packet);
    const held = newest.get(key);
    if (held === void 0 || isNewerAnswer(packet, held)) newest.set(key, packet);
  }
  return [...newest.values()];
}
function toCandidate(packet) {
  const response = packet.human_response;
  const chosen = response.chosen_option_key;
  return {
    id: packet.decision_id,
    category: packet.category,
    question: packet.question,
    context: packet.context,
    chosen,
    chosen_label: packet.options.find((option) => option.option_key === chosen).label,
    why: response.note?.trim() ?? "",
    resolved_at: response.responded_at
  };
}
function compareBestFirst(left, right) {
  if (left.score !== right.score) return right.score - left.score;
  const byTime = Date.parse(right.resolved_at) - Date.parse(left.resolved_at);
  return byTime !== 0 ? byTime : left.id.localeCompare(right.id);
}
function eligiblePackets(projectRoot, query) {
  const now = (query.now ?? /* @__PURE__ */ new Date()).getTime();
  const reusable = journeyAnswerReusable(projectRoot);
  const offered = readResolvedPackets(projectRoot).filter(
    (packet) => reusable(packet) && mayBeOffered(packet, query)
  );
  return newestOfEachQuestion(offered).filter((packet) => Date.parse(packet.ttl_until) >= now);
}
function findEarlierQuestions(projectRoot, query) {
  const words = questionWords(query.question);
  if (words.size === 0) return [];
  return eligiblePackets(projectRoot, query).map((packet) => ({
    ...toCandidate(packet),
    score: jaccard2(words, questionWords(packet.question))
  })).filter((earlier) => earlier.score >= EARLIER_SCORE_FLOOR).sort(compareBestFirst).slice(0, EARLIER_LIMIT);
}
function earlierCheckFor(projectRoot, query) {
  try {
    const found = findEarlierQuestions(projectRoot, query);
    if (found.length === 0) return null;
    return { status: "required", candidates: found.map((earlier) => earlier.id) };
  } catch {
    return null;
  }
}
function eligibleTitles(projectRoot, query) {
  return eligiblePackets(projectRoot, query).sort((left, right) => isNewerAnswer(left, right) ? -1 : 1).map((packet) => ({
    id: packet.decision_id,
    category: packet.category,
    question: packet.question
  }));
}
function listEarlierTitles(projectRoot, query) {
  return eligibleTitles(projectRoot, query).slice(0, EARLIER_TITLE_LIMIT);
}
function printedTitle(title) {
  const points = Array.from(title.question);
  return points.length > EARLIER_TITLE_MAX_CHARS ? { ...title, question: `${points.slice(0, EARLIER_TITLE_MAX_CHARS).join("")}\u2026` } : title;
}
function titlesThatFit(id, path, eligible) {
  const empty = {
    id,
    path,
    earlier_check: titleBlock(id, [], eligible.length)
  };
  let used = printDecisionOutput(empty).length;
  const fit = [];
  for (const title of eligible.slice(0, EARLIER_TITLE_LIMIT)) {
    used += JSON.stringify(printedTitle(title)).length + 1;
    if (used >= EARLIER_OUTPUT_MAX_CHARS) break;
    fit.push(title);
  }
  return fit;
}
function titleCheckFor(projectRoot, query) {
  try {
    const eligible = eligibleTitles(projectRoot, query);
    if (eligible.length === 0) return null;
    const fit = titlesThatFit(query.excludeId, query.path, eligible);
    const omitted = eligible.length - fit.length;
    return {
      status: "required",
      listed_by: "titles",
      candidates: fit.map((title) => title.id),
      ...omitted > 0 ? { older_omitted: omitted } : {}
    };
  } catch {
    return null;
  }
}
var METHOD_RELATIVE_PATH = "base/skills/decision/references/earlier-answers.md";
var EARLIER_METHOD_FALLBACK = "Scan the titles and read up to 5 that may be the same question with paqad-ai decision check <id> --read <D-id> ... Then judge meaning: compare the earlier reason with the situation now, treat shared wording as no evidence, treat different wording as no evidence either, and answer --none when unsure.";
function readEarlierMethod(runtimeRoot = getRuntimeRoot()) {
  try {
    const text = readFileSync4(join5(runtimeRoot, METHOD_RELATIVE_PATH), "utf8").trim();
    return text === "" || text.length > EARLIER_METHOD_MAX_CHARS ? EARLIER_METHOD_FALLBACK : text;
  } catch {
    return EARLIER_METHOD_FALLBACK;
  }
}
function pendingFile(projectRoot, id) {
  return join5(projectRoot, PATHS.DECISIONS_PENDING_DIR, `${id}.json`);
}
function readPendingFile(projectRoot, id) {
  if (!isStrictDecisionId(id) || !existsSync3(pendingFile(projectRoot, id))) return null;
  return JSON.parse(readFileSync4(pendingFile(projectRoot, id), "utf8"));
}
function earlierCheckRefusal(id) {
  return `This question has earlier answers to check first. Run paqad-ai decision check ${id}.`;
}
function assertEarlierCheckDone(projectRoot, id) {
  if (readPendingFile(projectRoot, id)?.earlier_check?.status === "required") {
    throw new Error(earlierCheckRefusal(id));
  }
}
function readCandidate(projectRoot, id) {
  const path = join5(projectRoot, PATHS.DECISIONS_RESOLVED_DIR, `${id}.json`);
  try {
    const packet = readAnyDecisionPacket(JSON.parse(readFileSync4(path, "utf8")));
    if (!packet?.human_response?.chosen_option_key) return null;
    return toCandidate(packet);
  } catch {
    return null;
  }
}
function earlierCheckBlock(projectRoot, id, check) {
  const { found, missing } = readOffered(projectRoot, check.candidates ?? []);
  return {
    required: true,
    candidates: found,
    ...missing.length > 0 ? { missing } : {},
    method: readEarlierMethod(),
    next: suggestCommand(id)
  };
}
function readOffered(projectRoot, ids) {
  const found = [];
  const missing = [];
  for (const offeredId of ids) {
    const candidate = readCandidate(projectRoot, offeredId);
    if (candidate) found.push(candidate);
    else missing.push(offeredId);
  }
  return { found, missing };
}
function suggestCommand(id) {
  return `paqad-ai decision suggest ${id} --earlier <D-id> --option <key> --reason <text>, or --none --reason <text>`;
}
function titleBlock(id, titles, olderOmitted = 0, missing = []) {
  return {
    required: true,
    method: readEarlierMethod(),
    next: `Read up to ${EARLIER_LIMIT} with paqad-ai decision check ${id} --read <D-id> ... Then ${suggestCommand(id)}`,
    ...olderOmitted > 0 ? { older_omitted: olderOmitted } : {},
    ...missing.length > 0 ? { missing } : {},
    titles
  };
}
function checkBlockFor(projectRoot, id, check) {
  if (check.listed_by !== "titles") return earlierCheckBlock(projectRoot, id, check);
  const { found, missing } = readOffered(projectRoot, check.candidates ?? []);
  const titles = found.map(
    ({ id: earlierId, category, question }) => printedTitle({ id: earlierId, category, question })
  );
  return titleBlock(id, titles, check.older_omitted, missing);
}
function printDecisionOutput(output) {
  const check = output.earlier_check;
  return check !== void 0 && "titles" in check ? JSON.stringify(output) : JSON.stringify(output, null, 2);
}
var NO_STANDING_ANSWER_CATEGORIES = [
  ...PRIVATE_ANSWER_CATEGORIES,
  "spec.change",
  "architecture-path",
  "spec.contradiction",
  "analytics.taxonomy_violation",
  "analytics.new_event"
];
var ALWAYS_LABEL = "Always use this answer for this kind of question";
var MAX_ALWAYS_OPTIONS = 3;
var MAX_QUESTION_ENTRIES = 4;
function shellArg(value) {
  return /^[\w:.@/=-]+$/u.test(value) ? value : `'${value.replace(/'/gu, `'\\''`)}'`;
}
function resolveCommand(id, key) {
  return `paqad-ai decision resolve ${id} ${shellArg(key)}`;
}
function plainEntry(id, option) {
  return {
    label: option.label,
    option_key: option.option_key,
    resolve: resolveCommand(id, option.option_key)
  };
}
function suggestedEntries(id, packet, suggestion) {
  const suggested = packet.options.find((option) => option.option_key === suggestion.option_key);
  if (suggested === void 0) return null;
  const first = {
    ...plainEntry(id, suggested),
    label: `Same as last time: ${suggested.label} (from ${suggestion.earlier_id})`
  };
  const rest = packet.options.filter((option) => option.option_key !== suggestion.option_key).map((option) => plainEntry(id, option));
  const always = canOfferAlways(packet) ? [
    {
      label: ALWAYS_LABEL,
      option_key: suggested.option_key,
      resolve: `${resolveCommand(id, suggested.option_key)} --always`,
      always: true
    }
  ] : [];
  return [first, ...rest, ...always];
}
function canOfferAlways(packet) {
  return packet.id !== void 0 && packet.options.length <= MAX_ALWAYS_OPTIONS && !NO_STANDING_ANSWER_CATEGORIES.includes(packet.category);
}
function buildQuestionBlock(id, packet) {
  const entries = (packet.suggestion && suggestedEntries(id, packet, packet.suggestion)) ?? packet.options.map((option) => plainEntry(id, option));
  const question = packet.title ?? packet.question ?? "";
  const options = entries.slice(0, MAX_QUESTION_ENTRIES);
  if (packet.id === void 0) {
    const notShown = entries.slice(MAX_QUESTION_ENTRIES);
    return { question, options, ...notShown.length > 0 ? { not_shown: notShown } : {} };
  }
  return {
    question,
    options,
    other: `paqad-ai decision resolve ${id} other --other "<text>"`
  };
}
function requirePendingFile(projectRoot, id) {
  const packet = readPendingFile(projectRoot, id);
  if (packet !== null) return packet;
  const resolved = isStrictDecisionId(id) && existsSync3(join5(projectRoot, PATHS.DECISIONS_RESOLVED_DIR, `${id}.json`));
  throw new Error(
    resolved ? `Decision ${id} is already resolved.` : `Decision ${id} was not found.`
  );
}
function checkDecision(projectRoot, id) {
  const packet = requirePendingFile(projectRoot, id);
  if (packet.earlier_check?.status === "required") {
    return { id, earlier_check: checkBlockFor(projectRoot, id, packet.earlier_check) };
  }
  return { id, earlier_check: { required: false }, question: buildQuestionBlock(id, packet) };
}
function readEarlierAnswers(projectRoot, id, ids) {
  const check = requirePendingFile(projectRoot, id).earlier_check;
  if (check === void 0) {
    throw new Error(`Decision ${id} has no earlier answers to read.`);
  }
  const wanted = [...new Set(ids)];
  if (wanted.length > EARLIER_LIMIT) {
    throw new Error(
      `Read at most ${EARLIER_LIMIT} earlier answers per call. Got ${wanted.length}.`
    );
  }
  const offered = check.candidates ?? [];
  const notOffered = wanted.filter((earlier) => !offered.includes(earlier));
  if (notOffered.length > 0) {
    throw new Error(`${notOffered.join(", ")} was not offered for ${id}, so it cannot be read.`);
  }
  const { found, missing } = readOffered(projectRoot, wanted);
  return { id, read: found, ...missing.length > 0 ? { missing } : {} };
}
function standingSayLine(label, ruleId) {
  return `I used your standing answer: ${label} (rule ${ruleId}), so I did not ask. Say "ask me anyway" to be asked this time (--ask-anyway), or "remove that rule" to stop it (paqad-ai decision standing remove ${ruleId}).`;
}
function formatCreateOutput(projectRoot, result) {
  if (result.reused) {
    return {
      reused: true,
      id: result.id,
      chosen: result.reused.chosen,
      label: result.reused.label,
      match: "standing",
      say: standingSayLine(result.reused.label, result.reused.rule)
    };
  }
  const check = readPendingFile(projectRoot, result.id)?.earlier_check;
  if (!check) return { id: result.id, path: result.path };
  return {
    id: result.id,
    path: result.path,
    earlier_check: checkBlockFor(projectRoot, result.id, check)
  };
}
function writePendingFile(projectRoot, id, packet) {
  const path = pendingFile(projectRoot, id);
  mkdirSync3(dirname3(path), { recursive: true });
  const tempPath = `${path}.tmp`;
  writeFileSync3(tempPath, `${JSON.stringify(packet, null, 2)}
`);
  renameWithRetrySync(tempPath, path);
}
function assertSuggestable(projectRoot, id, packet, input) {
  const check = packet.earlier_check;
  if (input.none) return;
  const earlier = input.earlier;
  const offered = check.candidates ?? [];
  if (!offered.includes(earlier)) {
    const list = check.listed_by === "titles" ? "" : ` Offered: ${offered.join(", ")}.`;
    throw new Error(`${earlier} was not offered for ${id}.${list}`);
  }
  if (readCandidate(projectRoot, earlier) === null) {
    throw new Error(`${earlier} can no longer be read, so it cannot be suggested for ${id}.`);
  }
  if (!packet.options.some((option) => option.option_key === input.option)) {
    const keys = packet.options.map((option) => option.option_key).join(", ");
    throw new Error(`Option "${input.option}" is not one of ${id}'s options (${keys}).`);
  }
}
function suggestEarlierAnswer(projectRoot, id, input) {
  const reason = input.reason?.trim() ?? "";
  if (Boolean(input.earlier) === Boolean(input.none)) {
    throw new Error("Give exactly one of --earlier <D-id> or --none.");
  }
  if (input.earlier && !input.option) {
    throw new Error("--earlier needs --option <key>.");
  }
  if (reason === "") {
    throw new Error("A suggestion needs a non-empty --reason.");
  }
  const packet = requirePendingFile(projectRoot, id);
  if (packet.earlier_check === void 0) {
    throw new Error(`Decision ${id} has no earlier answers to check.`);
  }
  if (packet.earlier_check.status !== "required") {
    throw new Error(`Decision ${id} has already been checked.`);
  }
  assertSuggestable(projectRoot, id, packet, input);
  writePendingFile(
    projectRoot,
    id,
    input.none ? withNoneFound(packet, reason) : withSuggestion(packet, input, reason)
  );
  if (input.none) {
    recordDecisionReuse(projectRoot, {
      kind: "suggestion",
      decisionId: null,
      category: packet.category,
      note: reason,
      outcome: "none",
      change: packet.change,
      forDecision: id
    });
  }
  return checkDecision(projectRoot, id);
}
function withNoneFound(packet, reason) {
  return {
    ...packet,
    earlier_check: { ...packet.earlier_check, status: "done", none_reason: reason }
  };
}
function withSuggestion(packet, input, reason) {
  const optionKey = input.option;
  return {
    ...packet,
    earlier_check: { ...packet.earlier_check, status: "done" },
    suggestion: {
      earlier_id: input.earlier,
      option_key: optionKey,
      reason,
      at: (/* @__PURE__ */ new Date()).toISOString()
    },
    recommendation: optionKey,
    recommendation_reason: reason
  };
}

// src/planning/decision-copy.ts
init_esm_shims();
var BANNED_WORDS = [
  "abstraction",
  "polymorphic",
  "dry",
  "solid",
  "coupling",
  "cohesion",
  "encapsulation",
  "idiomatic",
  "refactor",
  "hoist",
  "monomorphic",
  "deterministic",
  "idempotent",
  "cardinality",
  "invariant",
  "predicate",
  "instantiation"
];
function lintDecisionCopy(packet) {
  const issues = [];
  if (wordCount(packet.question) > 15) {
    issues.push({ field: "question", message: "Question must be 15 words or fewer." });
  }
  if (!isGrade8Friendly(packet.question)) {
    issues.push({ field: "question", message: "Question must stay at grade-8 readability." });
  }
  checkBanned("question", packet.question, issues);
  if (packet.recommendation_reason) {
    checkBanned("recommendation_reason", packet.recommendation_reason, issues);
    if (!isGrade8Friendly(packet.recommendation_reason)) {
      issues.push({
        field: "recommendation_reason",
        message: "Recommendation reason must stay at grade-8 readability."
      });
    }
  }
  for (const [index, option] of packet.options.entries()) {
    const prefix = `options[${index}]`;
    const labelWords = wordCount(option.label);
    if (labelWords < 2 || labelWords > 5) {
      issues.push({ field: `${prefix}.label`, message: "Option label must be 2 to 5 words." });
    }
    if (!startsWithVerb(option.label)) {
      issues.push({ field: `${prefix}.label`, message: "Option label must start with a verb." });
    }
    if (!/^if you pick this,/i.test(option.one_line_preview)) {
      issues.push({
        field: `${prefix}.one_line_preview`,
        message: 'One-line preview must start with "If you pick this,".'
      });
    }
    if (!/^You give up:\s/i.test(option.trade_off)) {
      issues.push({
        field: `${prefix}.trade_off`,
        message: 'Trade-off must start with "You give up:".'
      });
    }
    checkBanned(`${prefix}.label`, option.label, issues);
    checkBanned(`${prefix}.one_line_preview`, option.one_line_preview, issues);
    checkBanned(`${prefix}.trade_off`, option.trade_off, issues);
    if (!isGrade8Friendly(option.label)) {
      issues.push({
        field: `${prefix}.label`,
        message: "Option label must stay at grade-8 readability."
      });
    }
  }
  return issues;
}
function checkBanned(field, value, issues) {
  const normalized = value.toLowerCase();
  for (const banned of BANNED_WORDS) {
    if (normalized.includes(banned)) {
      issues.push({ field, message: `Banned word "${banned}" is not allowed here.` });
    }
  }
}
function wordCount(value) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}
function isGrade8Friendly(value) {
  return value.split(/\s+/).filter(Boolean).every((word) => word.replace(/[^a-z]/gi, "").length <= 12);
}
function startsWithVerb(value) {
  return /^(Reuse|Make|Keep|Extract|Take|Use|Switch|Stay|Skip|Pick)\b/i.test(value.trim());
}

// src/planning/decision-store.ts
var MAX_PENDING_DECISIONS = 20;
var DecisionCapExceededError = class extends Error {
  constructor(pendingCount, cap) {
    super(`Pending decision cap reached (${pendingCount}/${cap}).`);
    this.pendingCount = pendingCount;
    this.cap = cap;
    this.name = "DecisionCapExceededError";
  }
  pendingCount;
  cap;
};
function journeyAnswerReusable(projectRoot) {
  let reviewed = null;
  return (packet) => {
    if (packet.human_response?.responded_by !== AUTO_RESPONDER) return true;
    reviewed ??= reviewedAutoDecisionIds(projectRoot);
    return reviewed.has(packet.decision_id);
  };
}
var DecisionStore = class {
  constructor(projectRoot, options = {}) {
    this.projectRoot = projectRoot;
    this.onEvent = options.onEvent;
  }
  projectRoot;
  onEvent;
  initialize() {
    for (const relativePath of [
      PATHS.DECISIONS_PENDING_DIR,
      PATHS.DECISIONS_RESOLVED_DIR,
      PATHS.DECISIONS_EXPIRED_DIR
    ]) {
      const dir = join6(this.projectRoot, relativePath);
      mkdirSync4(dir, { recursive: true });
      writeFileSync4(join6(dir, ".gitkeep"), "", { flag: "a" });
    }
    ensureDecisionAuditLog(this.projectRoot);
    if (!existsSync4(this.indexPath())) {
      this.writeIndex({ fingerprints: {}, decisions: {} });
    }
  }
  nextDecisionId() {
    return `D-${ulid()}`;
  }
  writePending(packet) {
    this.initialize();
    const existingTaskPending = this.findPendingDecisionForTask(packet.task_session_id);
    if (existingTaskPending && existingTaskPending !== packet.decision_id) {
      throw new Error(
        `Task ${packet.task_session_id} already has a pending decision (${existingTaskPending}).`
      );
    }
    this.enforcePendingCap(packet.decision_id);
    this.assertWritablePacket(packet);
    const enriched = this.withEarlierCheck(this.enrichWithPrecedents(packet));
    const path = this.packetPath(PATHS.DECISIONS_PENDING_DIR, enriched.decision_id);
    atomicWriteJson(path, enriched);
    noteJourneyDecision(this.projectRoot, enriched.decision_id);
    this.appendAudit("decision-pending-written", enriched);
    recordDecisionOpened(this.projectRoot, {
      decisionId: enriched.decision_id,
      category: enriched.category,
      title: enriched.question,
      createdAt: enriched.created_at
    });
    this.emit(decisionPausedEvent(enriched, this.relativePendingPath(enriched.decision_id)));
    return path;
  }
  enrichWithPrecedents(packet) {
    if (packet.context.includes(PRECEDENT_BLOCK_HEADING)) {
      return packet;
    }
    try {
      const precedents = findDecisionPrecedents(this.projectRoot, {
        decision_id: packet.decision_id,
        fingerprint: packet.fingerprint,
        category: packet.category,
        question: packet.question,
        context: packet.context
      });
      const block = formatDecisionPrecedents(precedents);
      return block ? { ...packet, context: `${packet.context}

${block}` } : packet;
    } catch {
      return packet;
    }
  }
  withEarlierCheck(packet) {
    if (packet.earlier_check !== void 0) {
      return packet;
    }
    const check = earlierCheckFor(this.projectRoot, {
      question: packet.question,
      excludeId: packet.decision_id,
      category: packet.category
    });
    return check === null ? packet : { ...packet, earlier_check: check };
  }
  enforcePendingCap(decisionId) {
    const cap = this.maxPendingDecisions();
    const pendingCount = this.listPendingDecisionIds().filter((id) => id !== decisionId).length;
    if (pendingCount >= cap) {
      this.emit(decisionCapExceededEvent(pendingCount, cap));
      throw new DecisionCapExceededError(pendingCount, cap);
    }
  }
  maxPendingDecisions() {
    const configured = readProjectProfile(this.projectRoot)?.custom?.decisions?.max_pending;
    return typeof configured === "number" && configured > 0 ? configured : MAX_PENDING_DECISIONS;
  }
  discard(input) {
    this.initialize();
    const result = this.readPendingResult(input.decisionId);
    if (!result.packet) {
      throw new Error(
        `Cannot discard decision ${input.decisionId}: no valid pending packet${result.error ? ` (${result.error})` : ""}.`
      );
    }
    const packet = result.packet;
    this.deletePending(input.decisionId);
    this.appendAudit("decision-discarded", packet);
    recordDecisionDiscarded(this.projectRoot, packet.decision_id, input.reason);
    this.emit(decisionDiscardedEvent(packet.decision_id, input.reason));
    return packet;
  }
  emit(event) {
    this.onEvent?.(event);
  }
  relativePendingPath(decisionId) {
    return `${PATHS.DECISIONS_PENDING_DIR}/${decisionId}.json`;
  }
  resolve(input) {
    const pending = this.readPending(input.decisionId);
    if (!pending) {
      throw new Error(`Pending decision ${input.decisionId} not found.`);
    }
    const resolved = this.writeResolvedPacket({
      packet: pending,
      humanResponse: input.humanResponse,
      event: input.humanResponse.intent === "delegated" ? "decision-delegated" : "decision-resolved-by-human",
      respondedByProvider: input.respondedByProvider
    });
    unlinkSync(this.packetPath(PATHS.DECISIONS_PENDING_DIR, input.decisionId));
    return this.packetPath(PATHS.DECISIONS_RESOLVED_DIR, resolved.decision_id);
  }
  resolveExisting(input) {
    const resolved = this.writeResolvedPacket(input);
    return this.packetPath(PATHS.DECISIONS_RESOLVED_DIR, resolved.decision_id);
  }
  deferUndeclaredDecision(input) {
    const path = this.writePending(input.packet);
    this.appendAudit("undeclared-decision-flagged", input.packet, input.provider);
    return path;
  }
  findReusableDecision(packet) {
    const index = this.readIndex();
    const exactDecisionId = index.fingerprints[packet.fingerprint];
    if (exactDecisionId) {
      const exactMatch = this.readReusableDecision(exactDecisionId);
      if (exactMatch) {
        this.appendAudit("decision-reused", exactMatch);
        this.recordReuseToLedger(exactMatch, "exact");
        return exactDecisionId;
      }
      delete index.fingerprints[packet.fingerprint];
      this.writeIndex(index);
    }
    const packetOptionKeys = packet.options.map((option) => option.option_key);
    let bestMatch = null;
    for (const entry of Object.values(index.decisions)) {
      if (entry.category !== packet.category || entry.chosen_option_key === null) {
        continue;
      }
      if (!packetOptionKeys.includes(entry.chosen_option_key)) {
        continue;
      }
      const resolved = this.readReusableDecision(entry.decision_id);
      if (!resolved) {
        continue;
      }
      const score = scoreDecisionOptionOverlap(packetOptionKeys, entry.option_keys);
      if (score >= 0.8 && (bestMatch === null || score > bestMatch.score)) {
        bestMatch = { id: entry.decision_id, score };
      }
    }
    if (bestMatch) {
      const resolved = this.readResolved(bestMatch.id);
      if (resolved) {
        this.appendAudit("decision-reused", resolved);
        this.recordReuseToLedger(resolved, "fingerprint");
      }
    }
    return bestMatch?.id ?? null;
  }
  recordReuseToLedger(packet, matchKind) {
    recordDecisionReuse(
      this.projectRoot,
      {
        decisionId: packet.decision_id,
        category: packet.category,
        chosenOptionKey: packet.human_response?.chosen_option_key ?? null,
        matchKind,
        sourcePath: join6(PATHS.DECISIONS_RESOLVED_DIR, `${packet.decision_id}.json`)
      },
      {}
    );
  }
  readPending(decisionId) {
    return this.readPacket(this.packetPath(PATHS.DECISIONS_PENDING_DIR, decisionId));
  }
  readPendingResult(decisionId) {
    const path = this.packetPath(PATHS.DECISIONS_PENDING_DIR, decisionId);
    if (!existsSync4(path)) {
      return { packet: null };
    }
    try {
      return { packet: this.readPacket(path) };
    } catch (error) {
      return {
        packet: null,
        error: error instanceof Error ? error.message : String(error)
      };
    }
  }
  readResolved(decisionId) {
    return this.readPacket(this.packetPath(PATHS.DECISIONS_RESOLVED_DIR, decisionId));
  }
  deletePending(decisionId) {
    const path = this.packetPath(PATHS.DECISIONS_PENDING_DIR, decisionId);
    if (existsSync4(path)) {
      unlinkSync(path);
    }
  }
  listPendingDecisionIds() {
    return this.listDirectoryIds(PATHS.DECISIONS_PENDING_DIR).sort(
      (left, right) => left.localeCompare(right, void 0, { numeric: true })
    );
  }
  findPendingDecisionForTask(taskSessionId) {
    for (const decisionId of this.listPendingDecisionIds()) {
      const result = this.readPendingResult(decisionId);
      if (result.packet?.task_session_id === taskSessionId) {
        return decisionId;
      }
    }
    return null;
  }
  expireResolvedDecision(decisionId) {
    const source = this.packetPath(PATHS.DECISIONS_RESOLVED_DIR, decisionId);
    const target = this.packetPath(PATHS.DECISIONS_EXPIRED_DIR, decisionId);
    const packet = this.readResolved(decisionId);
    if (!packet) {
      throw new Error(`Resolved decision ${decisionId} not found.`);
    }
    const expired = { ...packet, status: "expired" };
    atomicWriteJson(target, expired);
    unlinkSync(source);
    const index = this.readIndex();
    if (index.fingerprints[packet.fingerprint] === decisionId) {
      delete index.fingerprints[packet.fingerprint];
    }
    if (index.decisions[decisionId]) {
      index.decisions[decisionId] = { ...index.decisions[decisionId], status: "expired" };
    }
    this.writeIndex(index);
    this.appendAudit("decision-expired", expired);
    recordDecisionExpired(this.projectRoot, expired.decision_id);
    return target;
  }
  tagRulesDiscovery(decisionId, tag) {
    const path = this.packetPath(PATHS.DECISIONS_RESOLVED_DIR, decisionId);
    if (!existsSync4(path)) {
      return "missing";
    }
    const raw = JSON.parse(readFileSync5(path, "utf8"));
    if (raw.rules_discovery !== void 0) {
      return "already";
    }
    atomicWriteJson(path, { ...raw, rules_discovery: tag });
    return "tagged";
  }
  hasInvalidation(packet) {
    if (!packet.human_response?.responded_at) {
      return false;
    }
    const respondedAt = new Date(packet.human_response.responded_at).getTime();
    return packet.invalidation_watch.some((path) => {
      const absolute = join6(this.projectRoot, path);
      return existsSync4(absolute) && statSync2(absolute).mtimeMs > respondedAt;
    });
  }
  readPacket(path) {
    if (!existsSync4(path)) {
      return null;
    }
    const parsed = JSON.parse(readFileSync5(path, "utf8"));
    const packet = readAnyDecisionPacket(parsed);
    if (packet === null) {
      const reasons = validateDecisionPacket(parsed).join("; ");
      const decisionId = typeof parsed?.decision_id === "string" ? parsed.decision_id : basename(path).replace(/\.json$/, "");
      throw new DecisionPacketCorruptError(`Decision packet at ${path} is invalid. ${reasons}`, {
        decision_id: decisionId,
        reason: reasons,
        packet_path: relative2(this.projectRoot, path)
      });
    }
    return packet;
  }
  readReusableDecision(decisionId) {
    const packet = this.readResolved(decisionId);
    if (!packet) {
      return null;
    }
    if (packet.status !== "resolved" && packet.status !== "delegated") {
      return null;
    }
    if (packet.human_response?.chosen_option_key === null) {
      return null;
    }
    if (!journeyAnswerReusable(this.projectRoot)(packet)) {
      return null;
    }
    if (isExpired(packet)) {
      this.expireResolvedDecision(decisionId);
      return null;
    }
    if (this.hasInvalidation(packet)) {
      this.expireResolvedDecision(decisionId);
      return null;
    }
    return packet;
  }
  assertWritablePacket(packet) {
    const validationErrors = validateDecisionPacket(packet);
    if (validationErrors.length > 0) {
      throw new Error(
        `Decision packet ${packet.decision_id} is invalid: ${validationErrors.join("; ")}`
      );
    }
    if (!isStrictDecisionId(packet.decision_id)) {
      throw new Error(
        `Decision id "${packet.decision_id}" must be the collision-free D-<ULID> form on creation (mint it via DecisionStore.nextDecisionId / the decision skill; never hand-write a sequential D-{N}).`
      );
    }
    const copyIssues = lintDecisionCopy(packet);
    if (copyIssues.length > 0) {
      throw new Error(
        `Decision packet ${packet.decision_id} failed copy lint: ${copyIssues.map((issue) => `${issue.field} ${issue.message}`).join("; ")}`
      );
    }
  }
  appendAudit(event, packet, provider = packet.requested_by) {
    appendDecisionAuditEvent(this.projectRoot, {
      event,
      decision_id: packet.decision_id,
      fingerprint: packet.fingerprint,
      task_session_id: packet.task_session_id,
      provider,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      category: packet.category,
      responded_by: packet.human_response?.responded_by,
      chosen_option_key: packet.human_response?.chosen_option_key ?? null,
      intent: packet.human_response?.intent
    });
  }
  readIndex() {
    this.initialize();
    return JSON.parse(readFileSync5(this.indexPath(), "utf8"));
  }
  writeIndex(index) {
    atomicWriteJson(this.indexPath(), index);
  }
  indexPath() {
    return join6(this.projectRoot, PATHS.DECISIONS_INDEX);
  }
  packetPath(root, decisionId) {
    return join6(this.projectRoot, root, `${decisionId}.json`);
  }
  listDirectoryIds(relativeDir) {
    const absoluteDir = join6(this.projectRoot, relativeDir);
    if (!existsSync4(absoluteDir)) {
      return [];
    }
    return readdirSync3(absoluteDir).filter((file) => /^D-(?:\d+|[0-9A-HJKMNP-TV-Z]{26})\.json$/.test(file)).map((file) => file.replace(/\.json$/, ""));
  }
  writeResolvedPacket(input) {
    const resolved = {
      ...input.packet,
      ...input.packet.earlier_check ? { earlier_check: earlierCheckToKeep(input.packet.earlier_check) } : {},
      status: input.humanResponse.intent === "delegated" ? "delegated" : "resolved",
      human_response: input.humanResponse
    };
    const resolvedPath = this.packetPath(PATHS.DECISIONS_RESOLVED_DIR, resolved.decision_id);
    this.supersedeConflictingDecision(resolved);
    atomicWriteJson(resolvedPath, resolved);
    const index = this.readIndex();
    index.fingerprints[resolved.fingerprint] = resolved.decision_id;
    index.decisions[resolved.decision_id] = {
      decision_id: resolved.decision_id,
      fingerprint: resolved.fingerprint,
      category: resolved.category,
      chosen_option_key: resolved.human_response?.chosen_option_key ?? null,
      responded_at: resolved.human_response?.responded_at ?? resolved.created_at,
      status: resolved.status,
      option_keys: resolved.options.map((option) => option.option_key).sort()
    };
    this.writeIndex(index);
    this.appendAudit(input.event, resolved, input.respondedByProvider);
    recordDecisionResolved(
      this.projectRoot,
      resolved.decision_id,
      resolved.status,
      resolverFromAuditEvent(input.event)
    );
    this.emit(decisionResolvedEvent(resolved, resolverFromAuditEvent(input.event)));
    return resolved;
  }
  supersedeConflictingDecision(packet) {
    const index = this.readIndex();
    const existingDecisionId = index.fingerprints[packet.fingerprint];
    if (!existingDecisionId || existingDecisionId === packet.decision_id) {
      return;
    }
    const existing = this.readResolved(existingDecisionId);
    if (!existing) {
      return;
    }
    if (existing.human_response?.chosen_option_key === packet.human_response?.chosen_option_key) {
      return;
    }
    const superseded = { ...existing, status: "superseded" };
    atomicWriteJson(this.packetPath(PATHS.DECISIONS_RESOLVED_DIR, existingDecisionId), superseded);
    index.decisions[existingDecisionId] = {
      ...index.decisions[existingDecisionId],
      status: "superseded"
    };
    this.writeIndex(index);
    this.appendAudit("decision-superseded", superseded);
    recordDecisionSuperseded(this.projectRoot, existingDecisionId);
  }
};
function atomicWriteJson(path, value) {
  mkdirSync4(dirname4(path), { recursive: true });
  const tempPath = `${path}.tmp`;
  writeFileSync4(tempPath, JSON.stringify(value, null, 2) + "\n");
  renameSync2(tempPath, path);
}
function isExpired(packet) {
  return Date.parse(packet.ttl_until) <= Date.now();
}
function resolverFromAuditEvent(event) {
  switch (event) {
    case "decision-resolved-by-human":
    case "decision-delegated":
      return "human";
    case "decision-resolved-by-rule":
      return "rule";
    case "decision-resolved-by-rag-confident":
      return "rag-confident";
    case "decision-resolved-by-memoization":
      return "memoization";
    default:
      return event;
  }
}

// src/decisions/standing-answers.ts
init_esm_shims();
import { existsSync as existsSync5, mkdirSync as mkdirSync5, readFileSync as readFileSync6, writeFileSync as writeFileSync5 } from "fs";
import { dirname as dirname5, join as join7 } from "path";
var MIN_FINGERPRINT_OPTIONS = 2;
var MAX_FINGERPRINT_OPTIONS = 5;
var STANDING_FILE_UNREADABLE = `${PATHS.DECISIONS_STANDING_ANSWERS} cannot be read. Fix or remove the file first; it was not changed.`;
function standingPath(projectRoot) {
  return join7(projectRoot, PATHS.DECISIONS_STANDING_ANSWERS);
}
function isStandingAnswer(value) {
  if (typeof value !== "object" || value === null) return false;
  const rule = value;
  return [
    "id",
    "category",
    "fingerprint",
    "question",
    "chosen",
    "from_decision",
    "created_at"
  ].every((key) => typeof rule[key] === "string");
}
function readRules(projectRoot) {
  if (!existsSync5(standingPath(projectRoot))) return [];
  try {
    const parsed = JSON.parse(readFileSync6(standingPath(projectRoot), "utf8"));
    return Array.isArray(parsed.rules) ? parsed.rules.filter(isStandingAnswer) : null;
  } catch {
    return null;
  }
}
function writeRules(projectRoot, rules) {
  const path = standingPath(projectRoot);
  mkdirSync5(dirname5(path), { recursive: true });
  const tempPath = `${path}.tmp`;
  writeFileSync5(tempPath, `${JSON.stringify({ rules }, null, 2)}
`);
  renameWithRetrySync(tempPath, path);
}
function recordRuleRow(projectRoot, kind, rule) {
  recordDecisionReuse(projectRoot, {
    kind,
    decisionId: rule.from_decision,
    category: rule.category,
    chosenOptionKey: rule.chosen,
    ruleId: rule.id
  });
}
function isStandingFileReadable(projectRoot) {
  return readRules(projectRoot) !== null;
}
function listStandingAnswers(projectRoot) {
  const rules = readRules(projectRoot);
  if (rules === null) throw new Error(STANDING_FILE_UNREADABLE);
  return rules;
}
function sameText(left, right) {
  return foldQuestionText(left) === foldQuestionText(right);
}
function fingerprintFor(question) {
  const count = question.optionKeys.length;
  if (!isDecisionCategory(question.category) || count < MIN_FINGERPRINT_OPTIONS || count > MAX_FINGERPRINT_OPTIONS) {
    return null;
  }
  return computeDecisionFingerprint({
    category: question.category,
    question: question.question,
    option_keys: [...question.optionKeys],
    repo_state: {}
  });
}
function findStandingAnswer(projectRoot, question) {
  if (NO_STANDING_ANSWER_CATEGORIES.includes(question.category)) return null;
  const fingerprint = fingerprintFor(question);
  if (fingerprint === null) return null;
  const rules = readRules(projectRoot) ?? [];
  return rules.find(
    (rule) => rule.category === question.category && rule.fingerprint === fingerprint && sameText(rule.question, question.question) && question.optionKeys.includes(rule.chosen)
  ) ?? null;
}
function addStandingAnswer(projectRoot, input) {
  const rules = listStandingAnswers(projectRoot);
  const fingerprint = fingerprintFor(input);
  if (fingerprint === null) {
    throw new Error(`A standing answer cannot apply to ${input.fromDecision}.`);
  }
  const rule = {
    id: `R-${ulid()}`,
    category: input.category,
    fingerprint,
    question: input.question,
    chosen: input.chosen,
    from_decision: input.fromDecision,
    created_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  const kept = rules.filter(
    (existing) => existing.category !== rule.category || existing.fingerprint !== rule.fingerprint || !sameText(existing.question, rule.question)
  );
  writeRules(projectRoot, [...kept, rule]);
  recordRuleRow(projectRoot, "standing-set", rule);
  return rule;
}
function removeStandingAnswer(projectRoot, id) {
  const rules = listStandingAnswers(projectRoot);
  const rule = rules.find((candidate) => candidate.id === id);
  if (rule === void 0) throw new Error(`Standing answer ${id} was not found.`);
  writeRules(
    projectRoot,
    rules.filter((candidate) => candidate.id !== id)
  );
  recordRuleRow(projectRoot, "standing-removed", rule);
  return rule;
}
function assertNotStageAgent(action, agentId = process.env.SE_AGENT_ID) {
  if (agentId?.trim()) {
    throw new Error(
      `A stage agent cannot ${action}. Only the main conversation or the person can do this.`
    );
  }
}

// src/decisions/authoring.ts
function mintDecisionId() {
  return `D-${ulid()}`;
}
function isContractDecisionId(id) {
  return isStrictDecisionId(id);
}
function assertContractDecisionId(id) {
  if (!isContractDecisionId(id)) {
    throw new Error(
      `Decision id "${id}" must be the collision-free D-<ULID> form. Mint one with mintDecisionId() (never hand-write a sequential D-{N}).`
    );
  }
}
function validateCreateInput(input) {
  const errors = [];
  if (input.category.trim().length === 0) {
    errors.push("category is required");
  }
  if (input.title.trim().length === 0) {
    errors.push("title is required");
  }
  if (input.context.trim().length === 0) {
    errors.push("context is required");
  }
  if (!Array.isArray(input.options) || input.options.length < 2) {
    errors.push("at least 2 options are required");
  } else {
    const seen = /* @__PURE__ */ new Set();
    for (const [index, option] of input.options.entries()) {
      if (typeof option?.option_key !== "string" || option.option_key.trim().length === 0) {
        errors.push(`options[${index}].option_key is required`);
        continue;
      }
      if (typeof option.label !== "string" || option.label.trim().length === 0) {
        errors.push(`options[${index}].label is required`);
      }
      if (seen.has(option.option_key)) {
        errors.push(`options[${index}].option_key "${option.option_key}" is duplicated`);
      }
      seen.add(option.option_key);
    }
  }
  if (input.recommendation !== void 0 && input.recommendation !== null && !input.options?.some((option) => option.option_key === input.recommendation)) {
    errors.push("recommendation must reference an option_key");
  }
  return errors;
}
function createPendingDecision(projectRoot, input) {
  const errors = validateCreateInput(input);
  if (errors.length > 0) {
    throw new Error(`Cannot create decision packet: ${errors.join("; ")}`);
  }
  const id = mintDecisionId();
  const packet = {
    id,
    category: input.category,
    title: input.title,
    context: input.context,
    options: input.options.map(contractOption),
    recommendation: input.recommendation ?? null,
    created_at: (/* @__PURE__ */ new Date()).toISOString(),
    status: "pending",
    ...input.origin !== void 0 ? { origin: input.origin } : {},
    ...input.change ? { change: input.change } : {},
    ...input.workstream ? { workstream: input.workstream } : {}
  };
  const rule = input.askAnyway ? null : findStandingAnswer(projectRoot, {
    category: packet.category,
    question: packet.title,
    optionKeys: packet.options.map((option) => option.option_key)
  });
  if (rule !== null) return answerFromStandingRule(projectRoot, packet, rule);
  const path = packetPath(projectRoot, PATHS.DECISIONS_PENDING_DIR, id);
  const check = earlierCheckOnOpen(projectRoot, packet, path, input.agentWorded === true);
  if (check !== null) packet.earlier_check = check;
  atomicWriteJson2(path, withRichFields(packet));
  noteJourneyDecision(projectRoot, id);
  return { id, path };
}
function earlierCheckOnOpen(projectRoot, packet, path, listTitles) {
  if (richFieldsFor(packet) === null) return null;
  const { id: excludeId, category } = packet;
  return listTitles ? titleCheckFor(projectRoot, { excludeId, category, path }) : earlierCheckFor(projectRoot, { question: packet.title, excludeId, category });
}
function answerFromStandingRule(projectRoot, packet, rule) {
  const resolved = {
    ...packet,
    status: "resolved",
    chosen: rule.chosen,
    rationale: `Standing answer ${rule.id}`,
    resolved_at: (/* @__PURE__ */ new Date()).toISOString(),
    responded_by: STANDING_ANSWER_RESPONDER
  };
  const path = packetPath(projectRoot, PATHS.DECISIONS_RESOLVED_DIR, packet.id);
  const file = withRichFields(resolved);
  atomicWriteJson2(path, file);
  const written = readAnyDecisionPacket(file);
  if (written !== null) {
    appendDecisionAuditEvent(projectRoot, {
      event: "decision-resolved-by-rule",
      decision_id: written.decision_id,
      fingerprint: written.fingerprint,
      task_session_id: written.task_session_id,
      provider: STANDING_ANSWER_RESPONDER,
      timestamp: resolved.resolved_at,
      category: written.category,
      responded_by: STANDING_ANSWER_RESPONDER,
      chosen_option_key: rule.chosen,
      intent: written.human_response?.intent
    });
  }
  recordDecisionReuse(projectRoot, {
    kind: "reuse",
    decisionId: rule.from_decision,
    matchKind: "standing",
    category: packet.category,
    chosenOptionKey: rule.chosen,
    sourcePath: packetPathRelative(packet.id),
    note: `Standing answer ${rule.id} answered ${packet.id}`,
    change: packet.change,
    forDecision: packet.id,
    ruleId: rule.id
  });
  const label = packet.options.find((option) => option.option_key === rule.chosen).label;
  return { id: packet.id, path, reused: { rule: rule.id, chosen: rule.chosen, label } };
}
function assertAlwaysAllowed(projectRoot, id, other) {
  assertNotStageAgent("set a standing answer");
  if (other) {
    throw new Error("--always cannot be used with --other: a write-in could never match again.");
  }
  const pendingPath = packetPath(projectRoot, PATHS.DECISIONS_PENDING_DIR, id);
  if (!existsSync6(pendingPath)) return;
  const stored = JSON.parse(readFileSync7(pendingPath, "utf8"));
  if (stored.id === void 0) {
    throw new Error(
      `--always is refused for ${id}: rules do not apply to packets opened this way.`
    );
  }
  if (richFieldsFor(stored) === null) {
    throw new Error(`--always is refused for ${id}: this question has no stable fingerprint.`);
  }
  if (NO_STANDING_ANSWER_CATEGORIES.includes(stored.category ?? "")) {
    throw new Error(`--always is refused for the category ${stored.category}.`);
  }
  if (!isStandingFileReadable(projectRoot)) {
    throw new Error(STANDING_FILE_UNREADABLE);
  }
}
function answerPendingDecision(projectRoot, id, chosen, rationale = "", options = {}) {
  if (options.always) assertAlwaysAllowed(projectRoot, id);
  const result = resolvePendingDecision(projectRoot, id, chosen, rationale, options);
  if (!options.always) return result;
  const rule = addStandingAnswer(projectRoot, {
    category: result.packet.category,
    question: result.packet.title,
    optionKeys: result.packet.options.map((option) => option.option_key),
    chosen,
    fromDecision: id
  });
  return { ...result, rule };
}
function resolvePendingDecision(projectRoot, id, chosen, rationale = "", options = {}) {
  assertContractDecisionId(id);
  const pendingPath = packetPath(projectRoot, PATHS.DECISIONS_PENDING_DIR, id);
  if (!existsSync6(pendingPath)) {
    throw new Error(`Pending decision ${id} not found at ${pendingPath}.`);
  }
  assertEarlierCheckDone(projectRoot, id);
  const stored = JSON.parse(readFileSync7(pendingPath, "utf8"));
  if (stored.id === void 0 && stored.decision_id !== void 0) {
    return resolveStorePacket(projectRoot, id, stored, chosen, rationale);
  }
  const pending = stored;
  if (!pending.options?.some((option) => option.option_key === chosen)) {
    const keys = pending.options?.map((option) => option.option_key).join(", ") ?? "";
    throw new Error(`Chosen option "${chosen}" is not one of the packet's options (${keys}).`);
  }
  const resolved = {
    ...pending,
    ...pending.earlier_check ? { earlier_check: earlierCheckToKeep(pending.earlier_check) } : {},
    ...pending.change === void 0 && options.change ? { change: options.change } : {},
    status: "resolved",
    chosen,
    rationale,
    resolved_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  const resolvedPath = packetPath(projectRoot, PATHS.DECISIONS_RESOLVED_DIR, id);
  atomicWriteJson2(resolvedPath, withRichFields(resolved));
  unlinkSync2(pendingPath);
  recordSuggestionOutcome(projectRoot, {
    forDecision: id,
    category: resolved.category,
    chosen,
    change: resolved.change,
    suggestion: resolved.suggestion
  });
  return { path: resolvedPath, packet: resolved };
}
function resolveStorePacket(projectRoot, id, stored, chosen, rationale) {
  if (!stored.options?.some((option) => option.option_key === chosen)) {
    const keys = stored.options?.map((option) => option.option_key).join(", ") ?? "";
    throw new Error(`Chosen option "${chosen}" is not one of the packet's options (${keys}).`);
  }
  const resolvedAt = (/* @__PURE__ */ new Date()).toISOString();
  const path = new DecisionStore(projectRoot).resolve({
    decisionId: id,
    humanResponse: {
      chosen_option_key: chosen,
      intent: "explicit",
      explanation_rounds_used: 0,
      responded_at: resolvedAt,
      responded_by: "paqad-decision-cli",
      carry_over_scope: "session",
      ...rationale ? { note: rationale } : {}
    }
  });
  recordSuggestionOutcome(projectRoot, {
    forDecision: id,
    category: stored.category,
    chosen,
    suggestion: stored.suggestion
  });
  return {
    path,
    packet: {
      id,
      category: stored.category ?? "",
      title: stored.question ?? "",
      context: stored.context ?? "",
      options: stored.options,
      recommendation: stored.recommendation ?? null,
      created_at: stored.created_at ?? resolvedAt,
      status: "resolved",
      chosen,
      rationale,
      resolved_at: resolvedAt
    }
  };
}
function withRichFields(packet) {
  const contractOnly = { ...packet, options: packet.options.map(contractOption) };
  for (const key of RICH_ONLY_KEYS) delete contractOnly[key];
  const rich = richFieldsFor(contractOnly);
  if (rich === null) return contractOnly;
  return {
    ...contractOnly,
    ...rich,
    ...packet.suggestion ? { recommendation_reason: packet.suggestion.reason } : {}
  };
}
var RICH_ONLY_KEYS = [
  "decision_id",
  "fingerprint",
  "question",
  "recommendation_reason",
  "confidence",
  "requested_by",
  "task_session_id",
  "ttl_until",
  "invalidation_watch",
  "human_response"
];
function contractOption(option) {
  return {
    option_key: option.option_key,
    label: option.label,
    ...option.one_line_preview ? { one_line_preview: option.one_line_preview } : {},
    ...option.trade_off ? { trade_off: option.trade_off } : {},
    ...option.quality_notes ? { quality_notes: { ...option.quality_notes } } : {},
    ...option.evidence !== void 0 ? { evidence: option.evidence } : {}
  };
}
function readContractDecisions(projectRoot) {
  const rows = [];
  const sources = [
    [PATHS.DECISIONS_PENDING_DIR, "pending"],
    [PATHS.DECISIONS_RESOLVED_DIR, "resolved"]
  ];
  for (const [relativeDir, status] of sources) {
    const abs = join8(projectRoot, relativeDir);
    let files;
    try {
      files = readdirSync4(abs);
    } catch {
      continue;
    }
    for (const file of files.filter((name) => name.endsWith(".json")).sort()) {
      try {
        const packet = JSON.parse(readFileSync7(join8(abs, file), "utf8"));
        rows.push({ packet, status });
      } catch {
      }
    }
  }
  return rows;
}
function listContractDecisions(projectRoot) {
  return readContractDecisions(projectRoot).map(({ packet, status }) => ({
    id: packet.id,
    category: packet.category,
    title: packet.title,
    status
  }));
}
var WRITE_IN_REFUSED_ON_STORE_SHAPE = "This question takes only its listed options, so --other can't be used. Pick one of them.";
function addWriteInOption(projectRoot, id, label) {
  assertContractDecisionId(id);
  if (label.trim().length === 0) {
    throw new Error("A write-in option needs a non-empty label.");
  }
  const pendingPath = packetPath(projectRoot, PATHS.DECISIONS_PENDING_DIR, id);
  if (!existsSync6(pendingPath)) {
    throw new Error(`Pending decision ${id} not found at ${pendingPath}.`);
  }
  const stored = JSON.parse(readFileSync7(pendingPath, "utf8"));
  if (stored.id === void 0 && stored.decision_id !== void 0) {
    throw new Error(WRITE_IN_REFUSED_ON_STORE_SHAPE);
  }
  const pending = stored;
  const existing = new Set(pending.options.map((option) => option.option_key));
  let key = "other";
  let suffix = 2;
  while (existing.has(key)) {
    key = `other-${suffix++}`;
  }
  pending.options = [...pending.options, { option_key: key, label }];
  atomicWriteJson2(pendingPath, withRichFields(pending));
  return key;
}
function packetPathRelative(id) {
  return join8(PATHS.DECISIONS_RESOLVED_DIR, `${id}.json`);
}
function packetPath(projectRoot, relativeDir, id) {
  return join8(projectRoot, relativeDir, `${id}.json`);
}
function atomicWriteJson2(path, value) {
  mkdirSync6(dirname6(path), { recursive: true });
  const tempPath = `${path}.tmp`;
  writeFileSync6(tempPath, `${JSON.stringify(value, null, 2)}
`);
  renameWithRetrySync(tempPath, path);
}

// src/planning/slicing.ts
init_esm_shims();
var WAVE_CAP_MAX = 6;
var WAVE_CAP_MIN = 2;
var JOINING_AREAS = ["wiring", "gate-configs", "docs", "view"];
var LINT_CLEANUP_ID = "join-lint-cleanup";
var SENSITIVE_PATH_PATTERNS = [
  "**/auth/**",
  "**/*auth.*",
  "**/*signing*",
  "**/*signature*",
  "**/secrets/**",
  "**/*secret*",
  "**/*credential*",
  "**/*guard*",
  "**/*-gate.mjs",
  "runtime/hooks/**"
];
var TEST_GLOB = /(^|\/)(tests?|__tests__)(\/|$)|[._-](test|spec)\b|_test\./;
function waveCap(cores) {
  return Math.min(WAVE_CAP_MAX, Math.max(WAVE_CAP_MIN, Math.floor(cores / 2)));
}
var matchers = /* @__PURE__ */ new Map();
function matchesGlob(file, glob) {
  let matcher = matchers.get(glob);
  if (!matcher) {
    matcher = new Minimatch(glob, { dot: true });
    matchers.set(glob, matcher);
  }
  return matcher.match(file);
}
function ownsFile(workstream, file) {
  return workstream.owned_files.some((glob) => matchesGlob(file, glob));
}
function normalizeWorkstream(raw) {
  return {
    id: String(raw.id ?? ""),
    owned_files: [...raw.owned_files ?? []],
    acs: [...raw.acs ?? []],
    depends_on: [...raw.depends_on ?? []],
    provides_seams: [...raw.provides_seams ?? []],
    uses_seams: [...raw.uses_seams ?? []],
    risk: raw.risk === "routine" ? "routine" : "high",
    size_budget: { files: raw.size_budget?.files ?? Number.POSITIVE_INFINITY }
  };
}
function isSensitivePath(file) {
  return SENSITIVE_PATH_PATTERNS.some((glob) => matchesGlob(file, glob));
}
function joiningAreaOf(file) {
  if (file.startsWith("docs/") || file.endsWith(".md")) return "docs";
  if (file.startsWith(".paqad/") || /\.(ya?ml|toml)$/.test(file) || /(^|\/)[^/]*config[^/]*\.(json|[cm]?[jt]s)$/.test(file)) {
    return "gate-configs";
  }
  if (/\.(tsx|jsx|vue|svelte|css|scss|html)$/.test(file) || /(^|\/)(hud|view|ui)\//.test(file)) {
    return "view";
  }
  return "wiring";
}
function computeWaves(workstreams, cores) {
  const cap = waveCap(cores);
  const ids = new Set(workstreams.map((w) => w.id));
  const done = /* @__PURE__ */ new Set();
  const waves = [];
  let remaining = workstreams.map((w) => w.id);
  while (remaining.length > 0) {
    const ready = remaining.filter(
      (id) => workstreams.find((w) => w.id === id).depends_on.every((dep) => !ids.has(dep) || done.has(dep))
    );
    if (ready.length === 0) break;
    for (let i = 0; i < ready.length; i += cap) waves.push(ready.slice(i, i + cap));
    for (const id of ready) done.add(id);
    remaining = remaining.filter((id) => !done.has(id));
  }
  return waves;
}
function findCycle(workstreams) {
  const byId = new Map(workstreams.map((w) => [w.id, w]));
  const state = /* @__PURE__ */ new Map();
  const stack = [];
  const visit = (id) => {
    if (state.get(id) === "done") return null;
    if (state.get(id) === "visiting") return [...stack.slice(stack.indexOf(id)), id];
    state.set(id, "visiting");
    stack.push(id);
    for (const dep of byId.get(id).depends_on) {
      if (!byId.has(dep)) continue;
      const cycle = visit(dep);
      if (cycle) return cycle;
    }
    stack.pop();
    state.set(id, "done");
    return null;
  };
  for (const w of workstreams) {
    const cycle = visit(w.id);
    if (cycle) return cycle;
  }
  return null;
}
function validateSlicing(input) {
  const workstreams = input.workstreams.map(normalizeWorkstream);
  const violations = [];
  const add = (rule, subject) => {
    if (!violations.some((v) => v.rule === rule && v.subject === subject)) {
      violations.push({ rule, subject });
    }
  };
  const owned = /* @__PURE__ */ new Map();
  const leadFiles = [];
  for (const file of input.stepFiles) {
    const owners = workstreams.filter((w) => ownsFile(w, file)).map((w) => w.id);
    if (owners.length > 1) add("one-owner", file);
    if (owners.length === 0) leadFiles.push(file);
    for (const id of owners) owned.set(id, [...owned.get(id) ?? [], file]);
  }
  const providers = /* @__PURE__ */ new Map();
  for (const w of workstreams) for (const seam of w.provides_seams) providers.set(seam.name, w.id);
  for (const w of workstreams) {
    for (const seam of w.uses_seams) {
      const provider = providers.get(seam);
      if (provider !== void 0 && provider !== w.id && !w.depends_on.includes(provider)) {
        add("seam-only", w.id);
      }
    }
  }
  const acOwners = /* @__PURE__ */ new Map();
  for (const w of workstreams) {
    if (!w.owned_files.some((glob) => TEST_GLOB.test(glob))) add("acs-in-own-tests", w.id);
    for (const ac of w.acs) acOwners.set(ac, [...acOwners.get(ac) ?? [], w.id]);
  }
  for (const [ac, owners] of acOwners) if (owners.length > 1) add("acs-in-own-tests", ac);
  for (const ac of input.criteria ?? []) if (!acOwners.has(ac)) add("acs-in-own-tests", ac);
  const known = new Set(workstreams.map((w) => w.id));
  for (const w of workstreams) {
    for (const dep of w.depends_on) if (!known.has(dep)) add("acyclic", `${w.id} -> ${dep}`);
  }
  const cycle = findCycle(workstreams);
  if (cycle) add("acyclic", cycle.join(" -> "));
  for (const w of workstreams) {
    const files = owned.get(w.id) ?? [];
    if (files.length > w.size_budget.files) add("size-budget", w.id);
    const modules = new Set(files.map((f) => input.moduleOf(f)).filter((m) => m !== null));
    if (modules.size > 1) add("module-map", w.id);
    if (w.risk === "routine") {
      for (const file of files) if (isSensitivePath(file)) add("routine-on-sensitive", file);
    }
  }
  const joining = [];
  for (const area of JOINING_AREAS) {
    const files = leadFiles.filter((f) => joiningAreaOf(f) === area);
    if (files.length > 0) joining.push({ id: `join-${area}`, area, owned_files: files });
  }
  joining.push({ id: LINT_CLEANUP_ID, area: "lint-cleanup", owned_files: [] });
  return {
    violations,
    workstreams,
    waves: violations.some((v) => v.rule === "acyclic") ? [] : computeWaves(workstreams, input.cores),
    joining
  };
}
function renderSlicingViolation(violation) {
  return `slicing rule ${violation.rule}: ${violation.subject}`;
}
function seamJoiningEntry(seam, joining) {
  return joining.find((entry) => entry.owned_files.includes(seam.entry_file)) ?? joining.find((entry) => entry.area === "wiring") ?? null;
}
var STRONG_MODEL = "inherit";
var ROUTINE_MODEL = "sonnet";
var ESCALATE_AFTER_FAILURES = 2;
function sliceModel(risk, gateFailures) {
  if (risk === "high") return { model: STRONG_MODEL, effort: "high", escalated: false };
  if (gateFailures >= ESCALATE_AFTER_FAILURES) {
    return { model: STRONG_MODEL, effort: "high", escalated: true };
  }
  return { model: ROUTINE_MODEL, effort: "medium", escalated: false };
}
function sliceOutOfAttempts(risk, gateFailures) {
  return risk === "high" ? gateFailures >= ESCALATE_AFTER_FAILURES : gateFailures >= ESCALATE_AFTER_FAILURES + 1;
}

// src/stage-evidence/slices.ts
var DEAD_SLICE_MS = 60 * 60 * 1e3;
var AGENT_STOP_KINDS = /* @__PURE__ */ new Set(["stage-agent", "stage-handback"]);
function readCompiledSlicing(projectRoot, dirName) {
  const path = join9(projectRoot, featureFilePath(dirName, "plan"));
  if (!existsSync7(path)) return null;
  try {
    const plan = JSON.parse(readFileSync8(path, "utf8"));
    if (!Array.isArray(plan.workstreams) || plan.workstreams.length === 0) return null;
    return {
      workstreams: plan.workstreams,
      waves: plan.waves ?? [],
      joining: plan.joining ?? []
    };
  } catch {
    return null;
  }
}
function sliceIds(slicing) {
  return [...slicing.workstreams.map((w) => w.id), ...slicing.joining.map((j) => j.id)];
}
function sliceOwnedFiles(slicing, id) {
  const ws = slicing.workstreams.find((w) => w.id === id);
  if (ws) return ws.owned_files;
  const join12 = slicing.joining.find((j) => j.id === id);
  return join12 ? join12.owned_files : null;
}
function sliceScopeFiles(slicing, id) {
  if (id === LINT_CLEANUP_ID) {
    return [...slicing.workstreams, ...slicing.joining].flatMap((entry) => entry.owned_files);
  }
  return sliceOwnedFiles(slicing, id);
}
function sliceRisk(slicing, id) {
  return slicing.workstreams.find((w) => w.id === id)?.risk ?? "high";
}
function str(value) {
  return typeof value === "string" && value.length > 0 ? value : null;
}
function at(row) {
  const parsed = Date.parse(rowRecordedAt(row) ?? "");
  return Number.isNaN(parsed) ? null : parsed;
}
function isDevelopmentRow(row, kind) {
  return row.kind === kind && row.stage === "development";
}
function lastIndexOf(rows, match) {
  for (let i = rows.length - 1; i >= 0; i -= 1) if (match(rows[i])) return i;
  return -1;
}
function currentDevelopmentRows(rows) {
  const lastStart = lastIndexOf(rows, (row) => isDevelopmentRow(row, "stage_start"));
  if (lastStart < 0) return rows;
  const boundary = lastIndexOf(
    rows.slice(0, lastStart),
    (row) => isDevelopmentRow(row, "stage_end")
  );
  return boundary < 0 ? rows : rows.slice(boundary + 1);
}
function developmentEnded(rows) {
  const lastStart = lastIndexOf(rows, (row) => isDevelopmentRow(row, "stage_start"));
  return rows.slice(lastStart + 1).some((row) => isDevelopmentRow(row, "stage_end"));
}
function foldSlices(allRows) {
  const rows = currentDevelopmentRows(allRows);
  const slices = /* @__PURE__ */ new Map();
  const byAgent = /* @__PURE__ */ new Map();
  for (const row of rows) {
    const record = row;
    const id = str(record.workstream);
    const agentId = str(record.agent_id);
    if (row.kind === SLICE_START_KIND && id) {
      const previous = slices.get(id);
      slices.set(id, {
        id,
        agent_id: agentId,
        started_at: previous?.started_at ?? rowRecordedAt(row) ?? null,
        last_started_at: rowRecordedAt(row) ?? null,
        done_at: null,
        gate_failures: 0,
        last_gate_passed: null,
        last_gate_digest: null,
        last_gate_failures: [],
        done: false,
        stopped: false,
        last_row_at: at(row)
      });
      if (agentId) byAgent.set(agentId, id);
      continue;
    }
    const target = id ? slices.get(id) : agentId ? slices.get(byAgent.get(agentId) ?? "") : void 0;
    if (!target) continue;
    if (agentId && agentId === target.agent_id) target.last_row_at = at(row) ?? target.last_row_at;
    if (row.kind === SLICE_GATE_KIND && id) {
      const passed = record.event_status === "completed";
      target.last_gate_passed = passed;
      target.last_gate_digest = str(record.digest);
      target.last_gate_failures = Array.isArray(record.failures) ? record.failures : [];
      if (!passed) target.gate_failures += 1;
    } else if (row.kind === SLICE_DONE_KIND && id) {
      target.done = true;
      target.done_at = rowRecordedAt(row) ?? null;
    } else if (AGENT_STOP_KINDS.has(String(row.kind)) && agentId === target.agent_id) {
      target.stopped = true;
    }
  }
  return slices;
}
function sliceOfAgent(rows, agentId) {
  if (!agentId) return null;
  let found = null;
  for (const row of currentDevelopmentRows(rows)) {
    const record = row;
    if (row.kind === SLICE_START_KIND && record.agent_id === agentId) {
      found = str(record.workstream);
    }
  }
  return found;
}
function sliceIsDead(state, nowMs) {
  if (state.done) return false;
  if (state.stopped) return true;
  return state.last_row_at !== null && nowMs - state.last_row_at >= DEAD_SLICE_MS;
}
var SLICE_DROP_OPTION = "drop";
function droppedSlices(projectRoot, dirName, rows) {
  const key = featureChangeKey(dirName);
  const states = foldSlices(rows);
  const dropped = /* @__PURE__ */ new Set();
  for (const { packet, status } of readContractDecisions(projectRoot)) {
    const record = packet;
    if (status !== "resolved" || record.chosen !== SLICE_DROP_OPTION) continue;
    if (record.change !== key || typeof packet.workstream !== "string") continue;
    const state = states.get(packet.workstream);
    if (!state || state.done) continue;
    const resolvedAt = Date.parse(String(record.resolved_at ?? ""));
    const startedAt = Date.parse(state.last_started_at ?? "");
    if (Number.isNaN(resolvedAt) || !Number.isNaN(startedAt) && resolvedAt < startedAt) continue;
    dropped.add(packet.workstream);
  }
  return dropped;
}
var NONE = /* @__PURE__ */ new Set();
function runningSlices(rows, nowMs, dropped = NONE) {
  return [...foldSlices(rows).values()].filter(
    (s) => !s.done && !dropped.has(s.id) && !sliceIsDead(s, nowMs)
  );
}
function deadSlices(rows, nowMs, dropped = NONE) {
  return [...foldSlices(rows).values()].filter((s) => !dropped.has(s.id) && sliceIsDead(s, nowMs));
}
function sliceStartRefusal(slicing, id, rows, nowMs) {
  if (slicing === null) {
    return `no compiled plan with workstreams, so slice "${id}" cannot start; run \`paqad-ai plan compile\` first`;
  }
  if (!sliceIds(slicing).includes(id)) {
    return `"${id}" is not a workstream or joining entry of the compiled plan`;
  }
  const state = foldSlices(rows).get(id);
  if (state && !state.done && !sliceIsDead(state, nowMs)) {
    return `slice "${id}" is already running under agent ${state.agent_id ?? "unknown"}`;
  }
  return null;
}
function sliceDoneRefusal(rows, id, currentDigest) {
  const state = foldSlices(rows).get(id);
  if (!state) return `slice "${id}" has no slice_start row`;
  if (state.last_gate_passed !== true) {
    return `slice "${id}" has no passed slice gate; run \`paqad-ai stage slice gate ${id}\``;
  }
  if (state.last_gate_digest !== currentDigest) {
    return `slice "${id}" changed since its last passed gate; run the gate again`;
  }
  return null;
}
function openSeams(slicing, rows, dropped = NONE) {
  const states = foldSlices(rows);
  const open = [];
  for (const ws of slicing.workstreams) {
    if (dropped.has(ws.id)) continue;
    for (const seam of ws.provides_seams) {
      const entry = seamJoiningEntry(seam, slicing.joining);
      const closer = entry?.id ?? ws.id;
      if (dropped.has(closer)) continue;
      if (!states.get(closer)?.done) open.push(seam.name);
    }
  }
  return open;
}
function sliceAgentRefusal(workstream) {
  return {
    kind: "slice-agent",
    workstream,
    message: `a slice agent cannot end development; run \`paqad-ai stage slice done ${workstream}\` and return`
  };
}
function developmentEndRefusal(slicing, rows, agentId, dropped = NONE) {
  const states = foldSlices(rows);
  if (states.size === 0) return null;
  const own = sliceOfAgent(rows, agentId);
  if (own !== null) return sliceAgentRefusal(own);
  const open = [...states.values()].filter((s) => !s.done && !dropped.has(s.id)).map((s) => s.id);
  const seams = slicing ? openSeams(slicing, rows, dropped) : [];
  if (open.length === 0 && seams.length === 0) return null;
  const parts = [];
  if (open.length > 0) parts.push(`slices not done: ${open.join(", ")}`);
  if (seams.length > 0) parts.push(`open seams: ${seams.join(", ")}`);
  return {
    kind: "lead",
    slices: open,
    seams,
    message: `development cannot end yet \u2014 ${parts.join("; ")}`
  };
}
function sliceEndRefusedRow(refusal, agentId) {
  return {
    kind: SLICE_END_REFUSED_KIND,
    agent: "paqad-development",
    agent_id: agentId,
    workstream: refusal.workstream,
    stage: "development",
    refusal_id: ulid()
  };
}
function slicesView(slicing, rows) {
  const states = foldSlices(rows);
  return slicing.workstreams.map((ws) => {
    const failures = states.get(ws.id)?.gate_failures ?? 0;
    return { id: ws.id, risk: ws.risk, gate_failures: failures, ...sliceModel(ws.risk, failures) };
  });
}
function sliceReport(slicing, rows) {
  return [...foldSlices(rows).values()].map((s) => {
    const risk = sliceRisk(slicing, s.id);
    const start = Date.parse(s.started_at ?? "");
    const end = Date.parse(s.done_at ?? "");
    return {
      id: s.id,
      status: s.done ? "DONE" : sliceOutOfAttempts(risk, s.gate_failures) ? "BLOCKED" : "RUNNING",
      wall_clock_ms: Number.isNaN(start) || Number.isNaN(end) ? null : end - start,
      gate_failures: s.gate_failures,
      escalated: sliceModel(risk, s.gate_failures).escalated
    };
  });
}
function sliceProgressFile(id) {
  return `.paqad/tmp/slice-${id}-progress.md`;
}
function resumeFanOut(rows) {
  const states = [...foldSlices(rows).values()];
  const kept = states.filter((s) => s.done).map((s) => s.id);
  const redispatch = states.filter((s) => !s.done).map((s) => ({ id: s.id, handback: sliceProgressFile(s.id) }));
  return {
    kept,
    redispatch,
    line: `resumed the fan-out: kept ${kept.length} done slice(s)${kept.length ? ` (${kept.join(", ")})` : ""}, dispatch ${redispatch.length} again${redispatch.length ? ` (${redispatch.map((r) => r.id).join(", ")})` : ""}`
  };
}
function packetBlocksFile(slicing, packetWorkstream, file) {
  const owner = slicing.workstreams.find((w) => ownsFile(w, file));
  if (!owner) return true;
  if (owner.id === packetWorkstream) return true;
  const source = slicing.workstreams.find((w) => w.id === packetWorkstream);
  const provided = new Set((source?.provides_seams ?? []).map((seam) => seam.name));
  return owner.uses_seams.some((seam) => provided.has(seam));
}
function scopedPacketsBlocking(input) {
  const dirName = currentFeature(input.projectRoot, input.sessionId);
  const slicing = dirName ? readCompiledSlicing(input.projectRoot, dirName) : null;
  const files = input.targets.map((target) => {
    const rel = isAbsolute2(target) ? relative3(input.projectRoot, target) : target;
    return rel.split(sep).join("/");
  });
  const blocking = [];
  const allowedBy = [];
  for (const packet of input.packets) {
    const blocks = packet.workstream === null || slicing === null || files.length === 0 || files.some((file) => packetBlocksFile(slicing, packet.workstream, file));
    if (blocks) blocking.push(packet.id);
    else allowedBy.push(packet);
  }
  if (blocking.length === 0 && allowedBy.length > 0 && dirName !== null) {
    for (const packet of allowedBy) {
      appendFeatureStageRow(
        input.projectRoot,
        input.sessionId,
        dirName,
        {
          kind: SLICE_EDIT_ALLOWED_KIND,
          agent: "paqad-ai",
          workstream: packet.workstream,
          decision: packet.id,
          files,
          refusal_id: `${packet.id}-${Date.now()}-${Math.random().toString(36).slice(2)}`
        },
        input.now
      );
    }
  }
  return blocking;
}
var SLICE_SCRATCH_ROOT = ".paqad/tmp/";
function sliceWriteRefusal(input) {
  if (!input.agentId) return null;
  const rows = readFeatureStageUnit(input.projectRoot, input.dirName);
  const workstream = sliceOfAgent(rows, input.agentId);
  if (workstream === null) return null;
  const slicing = readCompiledSlicing(input.projectRoot, input.dirName);
  if (slicing === null) return null;
  const owned = sliceScopeFiles(slicing, workstream) ?? [];
  for (const target of input.targets) {
    const rel = (isAbsolute2(target) ? relative3(input.projectRoot, target) : target).split(sep).join("/");
    if (rel.startsWith("../") || isAbsolute2(rel)) continue;
    if (rel.startsWith(SLICE_SCRATCH_ROOT)) continue;
    if (!ownsFile({ owned_files: owned }, rel)) return { workstream, target: rel };
  }
  return null;
}
function formatSliceWriteRefusal(refusal) {
  return `**\u25B8 paqad** \xB7 write blocked: slice \`${refusal.workstream}\` writes only its own files
> \u{1F534} Needs your attention: \`${refusal.target}\` is outside the owned files of slice \`${refusal.workstream}\` in plan.json. A slice agent edits only its workstream's owned files and its progress file under \`${SLICE_SCRATCH_ROOT}\`; lead-owned files belong to the lead.`;
}
var STAGE_END_DEVELOPMENT = /\bstage\s+end\s+development\b/;
function sliceEndCommandRefusal(input) {
  if (typeof input.agentId !== "string" || input.agentId.trim() === "") return null;
  if (typeof input.command !== "string" || !STAGE_END_DEVELOPMENT.test(input.command)) return null;
  const sessionId = resolveSessionId(input.projectRoot, input.sessionId ?? null);
  const dirName = currentFeature(input.projectRoot, sessionId);
  if (dirName === null) return null;
  const rows = readFeatureStageUnit(input.projectRoot, dirName);
  const workstream = sliceOfAgent(rows, input.agentId);
  if (workstream === null) return null;
  const refusal = sliceAgentRefusal(workstream);
  appendFeatureStageRow(
    input.projectRoot,
    sessionId,
    dirName,
    sliceEndRefusedRow(refusal, input.agentId)
  );
  return refusal.message;
}

// src/stage-evidence/effective-lane.ts
init_esm_shims();

// src/module-map/sensitivity.ts
init_esm_shims();
import { isAbsolute as isAbsolute3, relative as relative4 } from "path";
function normalise(path) {
  return toPosixPath(path).replace(/^\.\//, "").replace(/\/+$/, "");
}
function underPrefix(target, prefix) {
  if (prefix.length === 0) {
    return false;
  }
  return target === prefix || target.startsWith(`${prefix}/`);
}
function resolvePathSensitivity(projectRoot, relPath) {
  const map = readRawModuleMap(projectRoot);
  if (!map) {
    return "normal";
  }
  const rel = isAbsolute3(relPath) ? relative4(projectRoot, relPath) : relPath;
  const target = normalise(rel);
  if (target.length === 0) {
    return "normal";
  }
  for (const mod of map.modules) {
    if (mod.sensitivity !== "high") {
      continue;
    }
    const prefixes = [...mod.sources, ...mod.features.flatMap((feature) => feature.sources)];
    if (prefixes.some((source) => underPrefix(target, normalise(source)))) {
      return "high";
    }
  }
  return "normal";
}

// src/stage-evidence/effective-lane.ts
function resolveEffectiveLane(projectRoot, targetPath, recordedLane) {
  if (targetPath && resolvePathSensitivity(projectRoot, targetPath) === "high") {
    return "full";
  }
  return recordedLane ?? "full";
}

// src/stage-evidence/recorder.ts
init_esm_shims();
import { createHash as createHash2 } from "crypto";
import { readFileSync as readFileSync10 } from "fs";
import { join as join11 } from "path";

// src/stage-evidence/pending-lane.ts
init_esm_shims();
import { mkdirSync as mkdirSync7, readFileSync as readFileSync9, rmSync as rmSync2, writeFileSync as writeFileSync7 } from "fs";
import { join as join10 } from "path";
var PENDING_LANE_FILE = ".pending-lane";
var VALID_LANES = ["fast", "graduated", "full"];
function pendingLaneDir(projectRoot, sessionId) {
  return join10(projectRoot, sessionLedgerDir(STAGE_EVIDENCE_DOC_TYPE, sessionId));
}
function writePendingLane(projectRoot, sessionId, lane) {
  if (lane === null) {
    return;
  }
  const dir = pendingLaneDir(projectRoot, sessionId);
  mkdirSync7(dir, { recursive: true });
  writeFileSync7(join10(dir, PENDING_LANE_FILE), lane, "utf8");
}
function clearPendingLane(projectRoot, sessionId) {
  try {
    rmSync2(join10(pendingLaneDir(projectRoot, sessionId), PENDING_LANE_FILE), { force: true });
    rmSync2(join10(pendingLaneDir(projectRoot, sessionId), PENDING_KIND_FILE), { force: true });
    rmSync2(join10(pendingLaneDir(projectRoot, sessionId), PENDING_IMPACT_FILE), { force: true });
  } catch {
  }
}
function readPendingLane(projectRoot, sessionId) {
  try {
    const raw = readFileSync9(
      join10(pendingLaneDir(projectRoot, sessionId), PENDING_LANE_FILE),
      "utf8"
    ).trim().toLowerCase();
    return VALID_LANES.includes(raw) ? raw : null;
  } catch {
    return null;
  }
}
var PENDING_KIND_FILE = ".pending-kind";
function writePendingKind(projectRoot, sessionId, kind) {
  const dir = pendingLaneDir(projectRoot, sessionId);
  mkdirSync7(dir, { recursive: true });
  writeFileSync7(join10(dir, PENDING_KIND_FILE), kind, "utf8");
}
function readPendingKind(projectRoot, sessionId) {
  try {
    const raw = readFileSync9(
      join10(pendingLaneDir(projectRoot, sessionId), PENDING_KIND_FILE),
      "utf8"
    ).trim().toLowerCase();
    return raw === "fix" || raw === "other" ? raw : null;
  } catch {
    return null;
  }
}
var PENDING_IMPACT_FILE = ".pending-impact";
function writePendingImpact(projectRoot, sessionId, impact) {
  const dir = pendingLaneDir(projectRoot, sessionId);
  mkdirSync7(dir, { recursive: true });
  writeFileSync7(
    join10(dir, PENDING_IMPACT_FILE),
    JSON.stringify({ database_impact: impact.database_impact, api_impact: impact.api_impact }),
    "utf8"
  );
}
function readPendingImpact(projectRoot, sessionId) {
  try {
    const raw = JSON.parse(
      readFileSync9(join10(pendingLaneDir(projectRoot, sessionId), PENDING_IMPACT_FILE), "utf8")
    );
    const database = DATABASE_IMPACTS.find((value) => value === raw.database_impact);
    const api = API_IMPACTS.find((value) => value === raw.api_impact);
    return database !== void 0 && api !== void 0 ? { database_impact: database, api_impact: api } : null;
  } catch {
    return null;
  }
}

// src/stage-evidence/recorder.ts
function openStageEvidence(projectRoot, ctx) {
  const sessionId = resolveSessionId(projectRoot, ctx.sessionId);
  const lane = ctx.lane !== void 0 ? ctx.lane : sessionLane(projectRoot, sessionId);
  const kind = readPendingKind(projectRoot, sessionId);
  const dirName = openFeatureChange(projectRoot, sessionId, {
    adapter: ctx.adapter,
    lane: lane ?? null,
    ...kind !== null ? { kind } : {},
    title: ctx.title,
    issue: ctx.issue,
    now: ctx.now
  });
  return { sessionId, dirName, changeKey: dirName };
}
function sessionLane(projectRoot, sessionId) {
  return readPendingLane(projectRoot, sessionId) ?? readSessionControl(projectRoot, sessionId).lane;
}
function reattachSessionFeature(projectRoot, sessionId, ctx) {
  const branch = readGitState(projectRoot).branch ?? null;
  const own = sessionReattachableFeature(projectRoot, sessionId, branch);
  return own ? resumeFeatureByRef(projectRoot, sessionId, own, ctx.now) : null;
}
function resolveDirName(projectRoot, sessionId, ctx) {
  if (ctx.dirName) {
    return ctx.dirName;
  }
  const active = currentFeature(projectRoot, sessionId);
  if (active) {
    return active;
  }
  return reattachSessionFeature(projectRoot, sessionId, ctx) ?? openStageEvidence(projectRoot, ctx).dirName;
}
function startStage(projectRoot, stage, ctx) {
  if (!isKnownStage(stage)) {
    throw new Error(`Unknown stage "${stage}" \u2014 not in the feature-development registry.`);
  }
  const sessionId = resolveSessionId(projectRoot, ctx.sessionId);
  const dirName = resolveDirName(projectRoot, sessionId, ctx);
  return append(projectRoot, sessionId, dirName, ctx, {
    kind: "stage_start",
    stage,
    event_status: "started",
    evidence_source: "live-mark",
    ...ctx.agentId ? { agent_id: ctx.agentId } : {}
  });
}
function endStage(projectRoot, stage, input, ctx) {
  if (!isKnownStage(stage)) {
    throw new Error(`Unknown stage "${stage}" \u2014 not in the feature-development registry.`);
  }
  const sessionId = resolveSessionId(projectRoot, ctx.sessionId);
  const dirName = resolveDirName(projectRoot, sessionId, ctx);
  const artifactPaths = input.artifactPaths ?? [];
  const artifactDigest = artifactPaths.length > 0 ? hashArtifacts(projectRoot, artifactPaths) : null;
  const subjectDigest = stage === "development" ? input.subjectDigest ?? artifactDigest : input.subjectDigest ?? null;
  return append(projectRoot, sessionId, dirName, ctx, {
    kind: "stage_end",
    stage,
    event_status: "completed",
    evidence_source: "live-mark",
    artifact_paths: artifactPaths.length > 0 ? artifactPaths : null,
    artifact_digest: artifactDigest,
    subject_digest: subjectDigest,
    note: input.note ?? null
  });
}
function hashArtifacts(projectRoot, artifactPaths) {
  let anyReal = false;
  const perFile = [...artifactPaths].sort().map((rel) => {
    const abs = join11(projectRoot, rel);
    let bytes;
    try {
      bytes = readFileSync10(abs);
    } catch {
      return `${rel}:absent`;
    }
    if (bytes.length === 0) {
      return `${rel}:empty`;
    }
    anyReal = true;
    return `${rel}:${createHash2("sha256").update(bytes).digest("hex")}`;
  });
  if (!anyReal) return null;
  return `sha256-${createHash2("sha256").update(perFile.join("\n")).digest("hex")}`;
}
function append(projectRoot, sessionId, dirName, ctx, fields) {
  recordChangeConstants(projectRoot, dirName, { adapter: ctx.adapter, lane: ctx.lane }, ctx.now);
  return appendFeatureStageRow(
    projectRoot,
    sessionId,
    dirName,
    {
      agent: ctx.agent ?? agentForWriter(ctx.adapter),
      ...ctx.sessionSource === void 0 ? {} : { session_source: ctx.sessionSource },
      ...fields
    },
    ctx.now
  );
}

// src/stage-evidence/live-writer.ts
function toRelativePosix(projectRoot, targetPath) {
  const rel = isAbsolute(targetPath) ? relative(projectRoot, targetPath) : targetPath;
  return rel.replace(/\\/g, "/").replace(/^\.\//, "");
}
function classifyStage(targetPath, projectRoot = "") {
  const p = projectRoot ? toRelativePosix(projectRoot, targetPath) : targetPath.replace(/\\/g, "/");
  if (p.startsWith(".paqad/") || p === "" || p.startsWith("../")) return null;
  if (p.startsWith("tests/") || /(^|\/)__tests__\//.test(p) || /\.(test|spec)\.[cm]?[jt]sx?$/.test(p)) {
    return "checks";
  }
  if (p.startsWith("docs/instructions/") || p.startsWith("specs/") || p.endsWith(".spec.md") || /feature-spec/.test(p)) {
    return "specification";
  }
  if (/^README/i.test(p) || /^CHANGELOG/i.test(p) || p.startsWith("docs/") || /\.md$/.test(p) && !p.includes("/")) {
    return "documentation_sync";
  }
  if (p.startsWith("src/") || p.startsWith("lib/") || p.startsWith("app/") || p.startsWith("scripts/") || p.startsWith("runtime/") || /\/src\//.test(p) || /\.(ts|tsx|js|jsx|mjs|cjs)$/.test(p)) {
    return "development";
  }
  return null;
}
function stagesWithKind(rows, kind) {
  const set = /* @__PURE__ */ new Set();
  for (const row of rows) {
    if (row.kind === kind && typeof row.stage === "string") set.add(row.stage);
  }
  return set;
}
function preCodeStagesRecorded(rows, lane) {
  const started = stagesWithKind(rows, "stage_start");
  return requiredPreCodeStages(lane).every((stage) => started.has(stage));
}
function stageIsOpen(rows, stage) {
  return startedAfterLastEnd(rows.filter((row) => row.stage === stage));
}
function liveEditStage(lane, classified) {
  return isLaneStage(lane, classified) ? classified : "development";
}
function liveStageToStart(rows, lane, classified) {
  if (!preCodeStagesRecorded(rows, lane)) return null;
  const stage = liveEditStage(lane, classified);
  return !isEditStage(stage) || stageIsOpen(rows, stage) ? null : stage;
}
function helperEditStage(agent, fileStage) {
  const helper = agent ? stageForAgentName(stripPluginAgentNamespace(agent)) : null;
  return helper ? helper : fileStage;
}
function recordLiveStageEdit(input) {
  const { projectRoot, targetPath, now } = input;
  const fileStage = classifyStage(targetPath, projectRoot);
  if (!fileStage) return null;
  const classified = helperEditStage(input.agent, fileStage);
  try {
    const sessionId = resolveSessionId(projectRoot, input.sessionId);
    const dirName = currentFeature(projectRoot, sessionId);
    const rows = dirName ? readFeatureStageUnit(projectRoot, dirName) : [];
    const recordedLane = dirName ? readChangeConstants(projectRoot, dirName, rows).lane : null;
    const lane = resolveEffectiveLane(projectRoot, targetPath, recordedLane);
    if (!preCodeStagesRecorded(rows, lane)) return null;
    const stage = liveEditStage(lane, classified);
    if (!liveStageToStart(rows, lane, classified)) return stage;
    const ctx = {
      sessionId,
      sessionSource: input.sessionId?.trim() ? "host" : void 0,
      dirName,
      adapter: input.adapter ?? "claude-code",
      agent: input.agent,
      now
    };
    for (const preCode of PRE_CODE_STAGES) {
      if (stageIsOpen(rows, preCode)) endStage(projectRoot, preCode, {}, ctx);
    }
    startStage(projectRoot, stage, ctx);
    return stage;
  } catch {
    return null;
  }
}
function recordLiveStageEdits(input) {
  const recorded = [];
  for (const targetPath of input.targetPaths) {
    const stage = recordLiveStageEdit({
      projectRoot: input.projectRoot,
      sessionId: input.sessionId,
      toolName: input.toolName,
      targetPath,
      adapter: input.adapter,
      agent: input.agent,
      now: input.now
    });
    if (stage && !recorded.includes(stage)) {
      recorded.push(stage);
    }
  }
  return recorded;
}
function closeOpenStagesForMarkedStart(projectRoot, targetStage, ctx) {
  const sessionId = resolveSessionId(projectRoot, ctx.sessionId);
  const dirName = currentFeature(projectRoot, sessionId);
  if (!dirName) return;
  const rows = readFeatureStageUnit(projectRoot, dirName);
  const started = stagesWithKind(rows, "stage_start");
  const ended = stagesWithKind(rows, "stage_end");
  const starter = stageAgentIdentity(ctx.agent ?? agentForWriter(ctx.adapter), ctx.agentId);
  const heldByAnother = new Set(
    liveStageAgents(rows).filter((hold) => startedByAnotherAgent(starter, hold)).map((hold) => hold.stage)
  );
  for (const row of rows) {
    if (row.kind !== "stage_start" || typeof row.stage !== "string") continue;
    const s = row.stage;
    if (s !== targetStage && started.has(s) && !ended.has(s) && !heldByAnother.has(s)) {
      ended.add(s);
      try {
        endStage(
          projectRoot,
          s,
          {},
          {
            sessionId,
            sessionSource: ctx.sessionSource,
            dirName,
            adapter: ctx.adapter,
            now: ctx.now
          }
        );
      } catch {
      }
    }
  }
}
function recordMarkedStage(projectRoot, input) {
  if (!isKnownStage(input.stage)) {
    return { ok: false, reason: "unknown-stage", message: `unknown stage "${input.stage}"` };
  }
  const ctx = {
    sessionId: input.sessionId,
    sessionSource: input.sessionSource,
    adapter: input.adapter ?? "claude-code",
    agent: input.agent,
    now: input.now
  };
  const agentId = input.agentId?.trim() ? input.agentId.trim() : void 0;
  try {
    if (input.phase === "start" && input.title !== void 0) {
      const titled = titleActiveFeature(
        projectRoot,
        resolveSessionId(projectRoot, input.sessionId),
        input.title,
        input.issue,
        input.now
      );
      if (!titled) {
        openStageEvidence(projectRoot, { ...ctx, title: input.title, issue: input.issue });
      }
    }
    if (input.phase === "start") {
      closeOpenStagesForMarkedStart(projectRoot, input.stage, { ...ctx, agentId });
      startStage(projectRoot, input.stage, { ...ctx, ...agentId ? { agentId } : {} });
    } else {
      endStage(projectRoot, input.stage, { artifactPaths: input.artifactPaths ?? [] }, ctx);
    }
    return { ok: true };
  } catch (error) {
    return {
      ok: false,
      reason: "error",
      message: error instanceof Error ? error.message : String(error)
    };
  }
}

export {
  DECISION_REUSE_DOC_TYPE,
  recordDecisionReuse,
  recordSuggestionOutcome,
  DECISION_CATEGORIES,
  DECISION_STATUSES,
  isStrictDecisionId,
  DECISION_INTENTS,
  DECISION_CARRY_OVER_SCOPES,
  earlierCheckToKeep,
  DECISION_CATEGORY_DEFAULTS,
  packetHoldsChange,
  isDecisionPacket,
  validateDecisionPacket,
  toDecisionRecord,
  DECISION_AUDIT_EVENTS,
  appendDecisionAuditEvent,
  ensureDecisionAuditLog,
  readDecisionAuditEvents,
  AUTO_RESPONDER,
  readChoices,
  appendChoice,
  markChoicesReviewed,
  openedByJourney,
  DECISION_EVIDENCE_DOC_TYPE,
  readDecisionEvidence,
  DECISION_PAUSE_EVENT_TYPES,
  decisionPausedEvent,
  decisionResolvedEvent,
  decisionPacketCorruptEvent,
  decisionCapExceededEvent,
  decisionDiscardedEvent,
  computeDecisionFingerprint,
  normalizeDecisionQuestion,
  buildRepoStateSignature,
  scoreDecisionOptionOverlap,
  readAnyDecisionPacket,
  readResolvedPackets,
  findDecisionPrecedents,
  tokenizeCode,
  shingles,
  jaccard2 as jaccard,
  EARLIER_SCORE_FLOOR,
  EARLIER_LIMIT,
  EARLIER_TITLE_LIMIT,
  EARLIER_TITLE_MAX_CHARS,
  EARLIER_METHOD_MAX_CHARS,
  EARLIER_OUTPUT_MAX_CHARS,
  PRIVATE_ANSWER_CATEGORIES,
  foldQuestionText,
  findEarlierQuestions,
  earlierCheckFor,
  listEarlierTitles,
  titleCheckFor,
  EARLIER_METHOD_FALLBACK,
  readEarlierMethod,
  earlierCheckRefusal,
  assertEarlierCheckDone,
  earlierCheckBlock,
  printDecisionOutput,
  NO_STANDING_ANSWER_CATEGORIES,
  ALWAYS_LABEL,
  MAX_ALWAYS_OPTIONS,
  MAX_QUESTION_ENTRIES,
  buildQuestionBlock,
  checkDecision,
  readEarlierAnswers,
  formatCreateOutput,
  suggestEarlierAnswer,
  lintDecisionCopy,
  MAX_PENDING_DECISIONS,
  DecisionCapExceededError,
  journeyAnswerReusable,
  DecisionStore,
  STANDING_FILE_UNREADABLE,
  isStandingFileReadable,
  listStandingAnswers,
  findStandingAnswer,
  addStandingAnswer,
  removeStandingAnswer,
  assertNotStageAgent,
  mintDecisionId,
  isContractDecisionId,
  assertContractDecisionId,
  createPendingDecision,
  assertAlwaysAllowed,
  answerPendingDecision,
  resolvePendingDecision,
  readContractDecisions,
  listContractDecisions,
  WRITE_IN_REFUSED_ON_STORE_SHAPE,
  addWriteInOption,
  ownsFile,
  validateSlicing,
  renderSlicingViolation,
  sliceOutOfAttempts,
  writePendingLane,
  clearPendingLane,
  writePendingKind,
  writePendingImpact,
  readPendingImpact,
  resolveEffectiveLane,
  backfillFeatureSlug,
  titleActiveFeature,
  readCompiledSlicing,
  sliceOwnedFiles,
  sliceScopeFiles,
  sliceRisk,
  developmentEnded,
  foldSlices,
  sliceOfAgent,
  droppedSlices,
  runningSlices,
  deadSlices,
  sliceStartRefusal,
  sliceDoneRefusal,
  developmentEndRefusal,
  sliceEndRefusedRow,
  slicesView,
  sliceReport,
  sliceProgressFile,
  resumeFanOut,
  scopedPacketsBlocking,
  sliceWriteRefusal,
  formatSliceWriteRefusal,
  sliceEndCommandRefusal,
  openStageEvidence,
  endStage,
  classifyStage,
  stagesWithKind,
  preCodeStagesRecorded,
  stageIsOpen,
  liveEditStage,
  liveStageToStart,
  helperEditStage,
  recordLiveStageEdit,
  recordLiveStageEdits,
  recordMarkedStage
};
