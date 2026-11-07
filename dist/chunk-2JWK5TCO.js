import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  tokenize
} from "./chunk-I5MEZHWF.js";
import {
  readProjectProfile
} from "./chunk-GAEJHX3P.js";
import {
  DECISION_CATEGORIES,
  DECISION_CATEGORY_DEFAULTS,
  earlierCheckToKeep,
  isDecisionPacket,
  isStrictDecisionId,
  validateDecisionPacket
} from "./chunk-STZ6VIJT.js";
import {
  readProjectEvents,
  recordProjectEvent
} from "./chunk-XINDDYVT.js";
import {
  DecisionPacketCorruptError
} from "./chunk-4BEZCXS2.js";
import {
  require_ajv
} from "./chunk-3GFZQZPX.js";
import {
  renameWithRetrySync
} from "./chunk-ER3R2ZPY.js";
import {
  getRuntimeRoot
} from "./chunk-VVRAO2BK.js";
import {
  appendSessionEvent,
  currentOrdinal,
  openSessionDoc
} from "./chunk-4VFZMH6Y.js";
import {
  resolveSessionId
} from "./chunk-FCULNH3A.js";
import {
  ulid
} from "./chunk-47TQR4LW.js";
import {
  PATHS
} from "./chunk-G3YYQOXJ.js";
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

// src/decisions/earlier-answers.ts
init_esm_shims();
import { existsSync as existsSync2, mkdirSync as mkdirSync2, readFileSync as readFileSync3, writeFileSync as writeFileSync2 } from "fs";
import { dirname as dirname2, join as join3 } from "path";

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
function jaccard(left, right) {
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

// src/planning/decision-precedents.ts
init_esm_shims();
import { readdirSync, readFileSync as readFileSync2 } from "fs";
import { join as join2 } from "path";

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
function jaccard2(a, b) {
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
  return sameCategory + (1 - CATEGORY_WEIGHT) * jaccard2(queryTokens, packetTokens);
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
  const offered = readResolvedPackets(projectRoot).filter((packet) => mayBeOffered(packet, query));
  return newestOfEachQuestion(offered).filter((packet) => Date.parse(packet.ttl_until) >= now);
}
function findEarlierQuestions(projectRoot, query) {
  const words = questionWords(query.question);
  if (words.size === 0) return [];
  return eligiblePackets(projectRoot, query).map((packet) => ({
    ...toCandidate(packet),
    score: jaccard(words, questionWords(packet.question))
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
    const text = readFileSync3(join3(runtimeRoot, METHOD_RELATIVE_PATH), "utf8").trim();
    return text === "" || text.length > EARLIER_METHOD_MAX_CHARS ? EARLIER_METHOD_FALLBACK : text;
  } catch {
    return EARLIER_METHOD_FALLBACK;
  }
}
function pendingFile(projectRoot, id) {
  return join3(projectRoot, PATHS.DECISIONS_PENDING_DIR, `${id}.json`);
}
function readPendingFile(projectRoot, id) {
  if (!isStrictDecisionId(id) || !existsSync2(pendingFile(projectRoot, id))) return null;
  return JSON.parse(readFileSync3(pendingFile(projectRoot, id), "utf8"));
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
  const path = join3(projectRoot, PATHS.DECISIONS_RESOLVED_DIR, `${id}.json`);
  try {
    const packet = readAnyDecisionPacket(JSON.parse(readFileSync3(path, "utf8")));
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
  const resolved = isStrictDecisionId(id) && existsSync2(join3(projectRoot, PATHS.DECISIONS_RESOLVED_DIR, `${id}.json`));
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
  mkdirSync2(dirname2(path), { recursive: true });
  const tempPath = `${path}.tmp`;
  writeFileSync2(tempPath, `${JSON.stringify(packet, null, 2)}
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
init_esm_shims();
import {
  existsSync as existsSync3,
  mkdirSync as mkdirSync3,
  readFileSync as readFileSync4,
  readdirSync as readdirSync2,
  renameSync,
  statSync,
  unlinkSync,
  writeFileSync as writeFileSync3
} from "fs";
import { basename, dirname as dirname3, join as join4, relative } from "path";

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
      const dir = join4(this.projectRoot, relativePath);
      mkdirSync3(dir, { recursive: true });
      writeFileSync3(join4(dir, ".gitkeep"), "", { flag: "a" });
    }
    ensureDecisionAuditLog(this.projectRoot);
    if (!existsSync3(this.indexPath())) {
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
        sourcePath: join4(PATHS.DECISIONS_RESOLVED_DIR, `${packet.decision_id}.json`)
      },
      {}
    );
  }
  readPending(decisionId) {
    return this.readPacket(this.packetPath(PATHS.DECISIONS_PENDING_DIR, decisionId));
  }
  readPendingResult(decisionId) {
    const path = this.packetPath(PATHS.DECISIONS_PENDING_DIR, decisionId);
    if (!existsSync3(path)) {
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
    if (existsSync3(path)) {
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
      const absolute = join4(this.projectRoot, path);
      return existsSync3(absolute) && statSync(absolute).mtimeMs > respondedAt;
    });
  }
  readPacket(path) {
    if (!existsSync3(path)) {
      return null;
    }
    const parsed = JSON.parse(readFileSync4(path, "utf8"));
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
    return JSON.parse(readFileSync4(this.indexPath(), "utf8"));
  }
  writeIndex(index) {
    atomicWriteJson(this.indexPath(), index);
  }
  indexPath() {
    return join4(this.projectRoot, PATHS.DECISIONS_INDEX);
  }
  packetPath(root, decisionId) {
    return join4(this.projectRoot, root, `${decisionId}.json`);
  }
  listDirectoryIds(relativeDir) {
    const absoluteDir = join4(this.projectRoot, relativeDir);
    if (!existsSync3(absoluteDir)) {
      return [];
    }
    return readdirSync2(absoluteDir).filter((file) => /^D-(?:\d+|[0-9A-HJKMNP-TV-Z]{26})\.json$/.test(file)).map((file) => file.replace(/\.json$/, ""));
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
  mkdirSync3(dirname3(path), { recursive: true });
  const tempPath = `${path}.tmp`;
  writeFileSync3(tempPath, JSON.stringify(value, null, 2) + "\n");
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

// src/decisions/standing-answers.ts
init_esm_shims();
import { existsSync as existsSync4, mkdirSync as mkdirSync4, readFileSync as readFileSync5, writeFileSync as writeFileSync4 } from "fs";
import { dirname as dirname4, join as join5 } from "path";
var MIN_FINGERPRINT_OPTIONS = 2;
var MAX_FINGERPRINT_OPTIONS = 5;
var STANDING_FILE_UNREADABLE = `${PATHS.DECISIONS_STANDING_ANSWERS} cannot be read. Fix or remove the file first; it was not changed.`;
function standingPath(projectRoot) {
  return join5(projectRoot, PATHS.DECISIONS_STANDING_ANSWERS);
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
  if (!existsSync4(standingPath(projectRoot))) return [];
  try {
    const parsed = JSON.parse(readFileSync5(standingPath(projectRoot), "utf8"));
    return Array.isArray(parsed.rules) ? parsed.rules.filter(isStandingAnswer) : null;
  } catch {
    return null;
  }
}
function writeRules(projectRoot, rules) {
  const path = standingPath(projectRoot);
  mkdirSync4(dirname4(path), { recursive: true });
  const tempPath = `${path}.tmp`;
  writeFileSync4(tempPath, `${JSON.stringify({ rules }, null, 2)}
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
init_esm_shims();
import {
  existsSync as existsSync5,
  mkdirSync as mkdirSync5,
  readFileSync as readFileSync6,
  readdirSync as readdirSync3,
  unlinkSync as unlinkSync2,
  writeFileSync as writeFileSync5
} from "fs";
import { dirname as dirname5, join as join6 } from "path";
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
  if (!existsSync5(pendingPath)) return;
  const stored = JSON.parse(readFileSync6(pendingPath, "utf8"));
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
  if (!existsSync5(pendingPath)) {
    throw new Error(`Pending decision ${id} not found at ${pendingPath}.`);
  }
  assertEarlierCheckDone(projectRoot, id);
  const stored = JSON.parse(readFileSync6(pendingPath, "utf8"));
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
    const abs = join6(projectRoot, relativeDir);
    let files;
    try {
      files = readdirSync3(abs);
    } catch {
      continue;
    }
    for (const file of files.filter((name) => name.endsWith(".json")).sort()) {
      try {
        const packet = JSON.parse(readFileSync6(join6(abs, file), "utf8"));
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
  if (!existsSync5(pendingPath)) {
    throw new Error(`Pending decision ${id} not found at ${pendingPath}.`);
  }
  const stored = JSON.parse(readFileSync6(pendingPath, "utf8"));
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
  return join6(PATHS.DECISIONS_RESOLVED_DIR, `${id}.json`);
}
function packetPath(projectRoot, relativeDir, id) {
  return join6(projectRoot, relativeDir, `${id}.json`);
}
function atomicWriteJson2(path, value) {
  mkdirSync5(dirname5(path), { recursive: true });
  const tempPath = `${path}.tmp`;
  writeFileSync5(tempPath, `${JSON.stringify(value, null, 2)}
`);
  renameWithRetrySync(tempPath, path);
}

export {
  DECISION_REUSE_DOC_TYPE,
  recordDecisionReuse,
  recordSuggestionOutcome,
  DECISION_AUDIT_EVENTS,
  appendDecisionAuditEvent,
  ensureDecisionAuditLog,
  readDecisionAuditEvents,
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
  findDecisionPrecedents,
  tokenizeCode,
  shingles,
  jaccard,
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
  addWriteInOption
};
