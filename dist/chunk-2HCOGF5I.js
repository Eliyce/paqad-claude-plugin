import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  tokenize
} from "./chunk-I5MEZHWF.js";
import {
  readProjectProfile
} from "./chunk-X5TS5GIW.js";
import {
  DECISION_CATEGORIES,
  DECISION_CATEGORY_DEFAULTS,
  isDecisionPacket,
  isStrictDecisionId,
  validateDecisionPacket
} from "./chunk-5ON46VLR.js";
import {
  readProjectEvents,
  recordProjectEvent
} from "./chunk-5KUWW2SW.js";
import {
  DecisionPacketCorruptError
} from "./chunk-G4TAWNZH.js";
import {
  require_ajv
} from "./chunk-M4YTSA5U.js";
import {
  renameWithRetrySync
} from "./chunk-ER3R2ZPY.js";
import {
  appendSessionEvent,
  currentOrdinal,
  openSessionDoc
} from "./chunk-7JNCYM2L.js";
import {
  resolveSessionId
} from "./chunk-64NG3SPK.js";
import {
  ulid
} from "./chunk-QJ4EG2V2.js";
import {
  PATHS
} from "./chunk-42HWSPMN.js";
import {
  __toESM,
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/planning/decision-audit.ts
init_esm_shims();
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
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
  const path = join(projectRoot, PATHS.DECISIONS_AUDIT_LOG);
  mkdirSync(dirname(path), { recursive: true });
  appendFileSync(path, `${JSON.stringify(event)}
`);
  return path;
}
function ensureDecisionAuditLog(projectRoot) {
  const path = join(projectRoot, PATHS.DECISIONS_AUDIT_LOG);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, "", { flag: "a" });
  return path;
}
function readDecisionAuditEvents(projectRoot) {
  const path = join(projectRoot, PATHS.DECISIONS_AUDIT_LOG);
  if (!existsSync(path)) {
    return [];
  }
  return readFileSync(path, "utf8").split("\n").map((line) => line.trim()).filter(Boolean).map((line) => JSON.parse(line));
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
init_esm_shims();
import {
  existsSync as existsSync2,
  mkdirSync as mkdirSync2,
  readFileSync as readFileSync3,
  readdirSync as readdirSync2,
  renameSync,
  statSync,
  unlinkSync,
  writeFileSync as writeFileSync2
} from "fs";
import { basename, dirname as dirname2, join as join3, relative } from "path";

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
    kind: { enum: ["open", "reuse"] },
    session_id: { type: "string", minLength: 1 },
    conversation_ordinal: { type: "integer", minimum: 1 },
    ts: { type: "string", minLength: 1 },
    adapter: { type: "string", minLength: 1 },
    decision_id: nullableString,
    category: nullableString,
    chosen_option_key: nullableString,
    match_kind: { type: ["string", "null"], enum: ["exact", "fingerprint", null] },
    source_path: nullableString,
    note: nullableString,
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
    const sessionId = resolveSessionId(projectRoot, ctx.sessionId);
    const adapter = ctx.adapter ?? "unknown";
    const ordinal = ensureUnit(projectRoot, sessionId, adapter, ctx.now);
    return appendSessionEvent(
      projectRoot,
      DECISION_REUSE_DOC_TYPE,
      sessionId,
      ordinal,
      {
        kind: "reuse",
        conversation_ordinal: ordinal,
        adapter,
        decision_id: fields.decisionId,
        category: fields.category ?? null,
        chosen_option_key: fields.chosenOptionKey ?? null,
        match_kind: fields.matchKind,
        source_path: fields.sourcePath ?? null,
        note: fields.note ?? null
      },
      APPEND_OPTS(ctx.now)
    );
  } catch {
    return null;
  }
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

// src/planning/decision-precedents.ts
init_esm_shims();
import { readdirSync, readFileSync as readFileSync2 } from "fs";
import { join as join2 } from "path";

// src/decisions/packet-shape.ts
init_esm_shims();
var DAY_MS = 24 * 60 * 60 * 1e3;
var REQUESTED_BY = "paqad-decision-cli";
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
    fields.human_response = humanResponseFor(packet.chosen, packet.rationale, packet.resolved_at);
  }
  return fields;
}
function humanResponseFor(chosen, rationale, resolvedAt) {
  return {
    chosen_option_key: chosen,
    intent: "explicit",
    explanation_rounds_used: 0,
    responded_at: resolvedAt ?? (/* @__PURE__ */ new Date(0)).toISOString(),
    responded_by: "human",
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
  const dir = join2(projectRoot, PATHS.DECISIONS_RESOLVED_DIR);
  let files;
  try {
    files = readdirSync(dir);
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
        JSON.parse(readFileSync2(join2(dir, file), "utf8"))
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
  const candidates = readResolvedPackets(projectRoot).filter(
    (packet) => packet.decision_id !== query.decision_id && (!query.fingerprint || packet.fingerprint !== query.fingerprint) && (packet.status === "resolved" || packet.status === "delegated") && Boolean(packet.human_response?.chosen_option_key)
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
      const dir = join3(this.projectRoot, relativePath);
      mkdirSync2(dir, { recursive: true });
      writeFileSync2(join3(dir, ".gitkeep"), "", { flag: "a" });
    }
    ensureDecisionAuditLog(this.projectRoot);
    if (!existsSync2(this.indexPath())) {
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
    const enriched = this.enrichWithPrecedents(packet);
    const path = this.packetPath(PATHS.DECISIONS_PENDING_DIR, enriched.decision_id);
    atomicWriteJson(path, enriched);
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
        sourcePath: join3(PATHS.DECISIONS_RESOLVED_DIR, `${packet.decision_id}.json`)
      },
      {}
    );
  }
  readPending(decisionId) {
    return this.readPacket(this.packetPath(PATHS.DECISIONS_PENDING_DIR, decisionId));
  }
  readPendingResult(decisionId) {
    const path = this.packetPath(PATHS.DECISIONS_PENDING_DIR, decisionId);
    if (!existsSync2(path)) {
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
    if (existsSync2(path)) {
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
  hasInvalidation(packet) {
    if (!packet.human_response?.responded_at) {
      return false;
    }
    const respondedAt = new Date(packet.human_response.responded_at).getTime();
    return packet.invalidation_watch.some((path) => {
      const absolute = join3(this.projectRoot, path);
      return existsSync2(absolute) && statSync(absolute).mtimeMs > respondedAt;
    });
  }
  readPacket(path) {
    if (!existsSync2(path)) {
      return null;
    }
    const parsed = JSON.parse(readFileSync3(path, "utf8"));
    const packet = readAnyDecisionPacket(parsed);
    if (packet === null) {
      const reasons = validateDecisionPacket(parsed).join("; ");
      const decisionId = typeof parsed?.decision_id === "string" ? parsed.decision_id : basename(path).replace(/\.json$/, "");
      throw new DecisionPacketCorruptError(`Decision packet at ${path} is invalid. ${reasons}`, {
        decision_id: decisionId,
        reason: reasons,
        packet_path: relative(this.projectRoot, path)
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
    return JSON.parse(readFileSync3(this.indexPath(), "utf8"));
  }
  writeIndex(index) {
    atomicWriteJson(this.indexPath(), index);
  }
  indexPath() {
    return join3(this.projectRoot, PATHS.DECISIONS_INDEX);
  }
  packetPath(root, decisionId) {
    return join3(this.projectRoot, root, `${decisionId}.json`);
  }
  listDirectoryIds(relativeDir) {
    const absoluteDir = join3(this.projectRoot, relativeDir);
    if (!existsSync2(absoluteDir)) {
      return [];
    }
    return readdirSync2(absoluteDir).filter((file) => /^D-(?:\d+|[0-9A-HJKMNP-TV-Z]{26})\.json$/.test(file)).map((file) => file.replace(/\.json$/, ""));
  }
  writeResolvedPacket(input) {
    const resolved = {
      ...input.packet,
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
  mkdirSync2(dirname2(path), { recursive: true });
  const tempPath = `${path}.tmp`;
  writeFileSync2(tempPath, JSON.stringify(value, null, 2) + "\n");
  renameSync(tempPath, path);
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

// src/decisions/authoring.ts
init_esm_shims();
import {
  existsSync as existsSync3,
  mkdirSync as mkdirSync3,
  readFileSync as readFileSync4,
  readdirSync as readdirSync3,
  unlinkSync as unlinkSync2,
  writeFileSync as writeFileSync3
} from "fs";
import { dirname as dirname3, join as join4 } from "path";
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
    ...input.change ? { change: input.change } : {}
  };
  const path = packetPath(projectRoot, PATHS.DECISIONS_PENDING_DIR, id);
  atomicWriteJson2(path, withRichFields(packet));
  return { id, path };
}
function resolvePendingDecision(projectRoot, id, chosen, rationale = "", options = {}) {
  assertContractDecisionId(id);
  const pendingPath = packetPath(projectRoot, PATHS.DECISIONS_PENDING_DIR, id);
  if (!existsSync3(pendingPath)) {
    throw new Error(`Pending decision ${id} not found at ${pendingPath}.`);
  }
  const stored = JSON.parse(readFileSync4(pendingPath, "utf8"));
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
    ...pending.change === void 0 && options.change ? { change: options.change } : {},
    status: "resolved",
    chosen,
    rationale,
    resolved_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  const resolvedPath = packetPath(projectRoot, PATHS.DECISIONS_RESOLVED_DIR, id);
  atomicWriteJson2(resolvedPath, withRichFields(resolved));
  unlinkSync2(pendingPath);
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
  return rich === null ? contractOnly : { ...contractOnly, ...rich };
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
    const abs = join4(projectRoot, relativeDir);
    let files;
    try {
      files = readdirSync3(abs);
    } catch {
      continue;
    }
    for (const file of files.filter((name) => name.endsWith(".json")).sort()) {
      try {
        const packet = JSON.parse(readFileSync4(join4(abs, file), "utf8"));
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
function addWriteInOption(projectRoot, id, label) {
  assertContractDecisionId(id);
  if (label.trim().length === 0) {
    throw new Error("A write-in option needs a non-empty label.");
  }
  const pendingPath = packetPath(projectRoot, PATHS.DECISIONS_PENDING_DIR, id);
  if (!existsSync3(pendingPath)) {
    throw new Error(`Pending decision ${id} not found at ${pendingPath}.`);
  }
  const pending = JSON.parse(readFileSync4(pendingPath, "utf8"));
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
function packetPath(projectRoot, relativeDir, id) {
  return join4(projectRoot, relativeDir, `${id}.json`);
}
function atomicWriteJson2(path, value) {
  mkdirSync3(dirname3(path), { recursive: true });
  const tempPath = `${path}.tmp`;
  writeFileSync3(tempPath, `${JSON.stringify(value, null, 2)}
`);
  renameWithRetrySync(tempPath, path);
}

export {
  recordDecisionReuse,
  DECISION_EVIDENCE_DOC_TYPE,
  readDecisionEvidence,
  DECISION_AUDIT_EVENTS,
  appendDecisionAuditEvent,
  ensureDecisionAuditLog,
  readDecisionAuditEvents,
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
  findDecisionPrecedents,
  lintDecisionCopy,
  MAX_PENDING_DECISIONS,
  DecisionCapExceededError,
  DecisionStore,
  mintDecisionId,
  isContractDecisionId,
  assertContractDecisionId,
  createPendingDecision,
  resolvePendingDecision,
  readContractDecisions,
  listContractDecisions,
  addWriteInOption
};
