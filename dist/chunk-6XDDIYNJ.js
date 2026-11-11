import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  ULID_BODY
} from "./chunk-AZLA53A6.js";
import {
  init_esm_shims
} from "./chunk-IDFRWBMN.js";

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

export {
  DECISION_CATEGORIES,
  DECISION_STATUSES,
  isStrictDecisionId,
  DECISION_INTENTS,
  DECISION_CARRY_OVER_SCOPES,
  earlierCheckToKeep,
  DECISION_CATEGORY_DEFAULTS,
  isDecisionPacket,
  validateDecisionPacket,
  toDecisionRecord
};
