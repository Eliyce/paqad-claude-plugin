import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/stage-evidence/types.ts
init_esm_shims();
var STAGE_EVIDENCE_DOC_TYPE = "paqad.stage-evidence";
var STAGE_EVIDENCE_SCHEMA_VERSION = 2;
var STAGE_AGENT_KIND = "stage-agent";
var SPEC_STEP_KIND = "spec-step";
var SPEC_CORRECTION_KIND = "spec-correction";
var COMPLETION_DEFERRED_KIND = "completion-deferred";
var RECORD_REPAIR_KIND = "record-repair";
var SPEC_STEP_OUTCOMES = ["complete", "skipped", "redone"];
var STAGE_FAMILY_KIND_LIST = [
  "open",
  "stage_start",
  "stage_end",
  "verify",
  "close"
];
var STAGE_FAMILY_KINDS = new Set(STAGE_FAMILY_KIND_LIST);

export {
  STAGE_EVIDENCE_DOC_TYPE,
  STAGE_EVIDENCE_SCHEMA_VERSION,
  STAGE_AGENT_KIND,
  SPEC_STEP_KIND,
  SPEC_CORRECTION_KIND,
  COMPLETION_DEFERRED_KIND,
  RECORD_REPAIR_KIND,
  SPEC_STEP_OUTCOMES,
  STAGE_FAMILY_KIND_LIST,
  STAGE_FAMILY_KINDS
};
