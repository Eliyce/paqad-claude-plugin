import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  STAGE_EVIDENCE_DOC_TYPE
} from "./chunk-J5CSZPQ6.js";
import {
  sessionLedgerDir
} from "./chunk-QINSFA6R.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/pipeline/routed-workflow.ts
init_esm_shims();
var ROUTED_WORKFLOWS = [
  "feature-development",
  "project-question",
  "documentation-update",
  "module-documentation",
  "pentest",
  "design-test",
  "codebase-health",
  "site-map",
  "rules-analyze",
  "root-cause-analysis",
  "discovery",
  "no-workflow"
];
function isFeatureDevelopmentRoute(routed) {
  return routed === "feature-development";
}
var OUTCOME_BY_WORKFLOW = {
  "feature-development": "feature-development",
  "bug-fix": "feature-development",
  refactor: "feature-development",
  migration: "feature-development",
  cleanup: "feature-development",
  "architecture-change": "feature-development",
  "test-improvement": "feature-development",
  "schema-change": "feature-development",
  "query-optimization": "feature-development",
  "project-question": "project-question",
  investigation: "project-question",
  "ticket-refinement": "project-question",
  "documentation-update": "documentation-update",
  "module-documentation": "module-documentation",
  pentest: "pentest",
  "pentest-retest": "pentest",
  "codebase-health": "codebase-health",
  "health-retest": "codebase-health",
  "site-map": "site-map",
  "site-map-retest": "site-map",
  "design-test": "design-test",
  "design-retest": "design-test",
  "rules-analyze": "rules-analyze",
  "rules-generate": "rules-analyze",
  "root-cause-analysis": "root-cause-analysis",
  discovery: "discovery",
  writing: "no-workflow",
  editing: "no-workflow",
  planning: "no-workflow",
  research: "no-workflow",
  "content-update": "no-workflow",
  custom: "no-workflow"
};
function resolveRoutedWorkflow(workflow) {
  if (!workflow) {
    return "no-workflow";
  }
  return OUTCOME_BY_WORKFLOW[workflow];
}
function changeKindForWorkflow(workflow) {
  return workflow === "bug-fix" ? "fix" : "other";
}

// src/pipeline/workflow-state.ts
init_esm_shims();
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
var WORKFLOW_STATE_FILE = ".workflow-state.json";
var EMPTY_STATE = { active: null, paused: [] };
function workflowStatePath(projectRoot, sessionId) {
  return join(
    projectRoot,
    sessionLedgerDir(STAGE_EVIDENCE_DOC_TYPE, sessionId),
    WORKFLOW_STATE_FILE
  );
}
var VALID_WORKFLOWS = new Set(ROUTED_WORKFLOWS);
function isRoutedWorkflow(value) {
  return typeof value === "string" && VALID_WORKFLOWS.has(value);
}
function toEntry(value) {
  if (typeof value !== "object" || value === null) {
    return null;
  }
  const record = value;
  if (!isRoutedWorkflow(record.workflow)) {
    return null;
  }
  const entry = { workflow: record.workflow };
  if (typeof record.changeKey === "string") {
    entry.changeKey = record.changeKey;
  }
  if (record.lane === "fast" || record.lane === "graduated" || record.lane === "full") {
    entry.lane = record.lane;
  }
  if (typeof record.specId === "string") {
    entry.specId = record.specId;
  }
  if (typeof record.discoveryRunId === "string") {
    entry.discoveryRunId = record.discoveryRunId;
  }
  if (typeof record.reason === "string") {
    entry.reason = record.reason;
  }
  return entry;
}
function readWorkflowState(projectRoot, sessionId) {
  try {
    const parsed = JSON.parse(readFileSync(workflowStatePath(projectRoot, sessionId), "utf8"));
    const active = toEntry(parsed.active);
    const paused = Array.isArray(parsed.paused) ? parsed.paused.map(toEntry).filter((entry) => entry !== null) : [];
    const state = { active, paused };
    if (typeof parsed.turn_started_at === "string") {
      state.turn_started_at = parsed.turn_started_at;
    }
    return state;
  } catch {
    return { ...EMPTY_STATE, paused: [] };
  }
}
function writeWorkflowState(projectRoot, sessionId, state) {
  const path = workflowStatePath(projectRoot, sessionId);
  mkdirSync(join(projectRoot, sessionLedgerDir(STAGE_EVIDENCE_DOC_TYPE, sessionId)), {
    recursive: true
  });
  writeFileSync(path, JSON.stringify(state), "utf8");
}
function routeWorkflow(state, next, anchors = {}) {
  if (state.active && state.active.workflow === next) {
    const merged = { ...state.active, ...stripUndefined(anchors) };
    return { state: { active: merged, paused: state.paused }, resumed: null, switched: false };
  }
  const pausedIndex = state.paused.findIndex((entry) => entry.workflow === next);
  const carriedForward = state.active ? [...state.paused.filter((_, index) => index !== pausedIndex), state.active] : state.paused.filter((_, index) => index !== pausedIndex);
  if (pausedIndex >= 0) {
    const resumed = state.paused[pausedIndex];
    return { state: { active: resumed, paused: carriedForward }, resumed, switched: true };
  }
  const active = { workflow: next, ...stripUndefined(anchors) };
  return {
    state: { active, paused: carriedForward },
    resumed: null,
    switched: Boolean(state.active)
  };
}
function stripUndefined(anchors) {
  const out = {};
  if (anchors.changeKey !== void 0) {
    out.changeKey = anchors.changeKey;
  }
  if (anchors.lane !== void 0) {
    out.lane = anchors.lane;
  }
  if (anchors.specId !== void 0) {
    out.specId = anchors.specId;
  }
  if (anchors.discoveryRunId !== void 0) {
    out.discoveryRunId = anchors.discoveryRunId;
  }
  if (anchors.reason !== void 0) {
    out.reason = anchors.reason;
  }
  return out;
}

export {
  ROUTED_WORKFLOWS,
  isFeatureDevelopmentRoute,
  resolveRoutedWorkflow,
  changeKindForWorkflow,
  readWorkflowState,
  writeWorkflowState,
  routeWorkflow
};
