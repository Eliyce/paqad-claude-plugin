import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  stageIsOpen,
  stagesWithKind
} from "../chunk-BXSUACCZ.js";
import "../chunk-XBBQDY4Q.js";
import "../chunk-6DRXSYZB.js";
import "../chunk-DNG6DDRS.js";
import "../chunk-4K4CM3QN.js";
import {
  appendFeatureStageRow,
  currentFeature,
  readFeatureStageUnit
} from "../chunk-73PEJCI3.js";
import "../chunk-MLVRTWKF.js";
import "../chunk-4PJNUQHB.js";
import "../chunk-37ZC7KVF.js";
import "../chunk-WGEG5J6L.js";
import {
  COMPLETION_DEFERRED_KIND
} from "../chunk-R3VYFIEA.js";
import "../chunk-O25SHWZA.js";
import "../chunk-3CUGDX3J.js";
import "../chunk-SU7RODZI.js";
import {
  resolveSessionId
} from "../chunk-MG36YCW4.js";
import "../chunk-KF7HHHJR.js";
import "../chunk-EGDL57MD.js";
import "../chunk-UCSN7SVD.js";
import {
  init_esm_shims
} from "../chunk-EMKBJVIL.js";

// src/stage-evidence/completion-deferred.ts
init_esm_shims();
var AGENT_TYPE_FIELDS = [
  "agent_type",
  "agentType",
  "subagent_type",
  "subagentType",
  "type"
];
function agentTypeOf(task) {
  if (!task || typeof task !== "object") {
    return void 0;
  }
  for (const field of AGENT_TYPE_FIELDS) {
    const value = task[field];
    if (typeof value === "string" && value.trim() !== "") {
      return value.trim();
    }
  }
  return void 0;
}
function stageAgentTaskCount(tasks) {
  return tasks.filter((task) => agentTypeOf(task)?.startsWith("paqad-")).length;
}
function tasksCarryAgentType(tasks) {
  return tasks.some((task) => agentTypeOf(task) !== void 0);
}
function hasOpenUnendedStage(rows) {
  for (const stage of stagesWithKind(rows, "stage_start")) {
    if (stageIsOpen(rows, stage)) {
      return true;
    }
  }
  return false;
}
function deferCompletionForBackgroundStage(input) {
  const tasks = Array.isArray(input.backgroundTasks) ? input.backgroundTasks : [];
  if (tasks.length === 0) {
    return { deferred: false };
  }
  const sessionId = resolveSessionId(input.projectRoot, input.sessionId ?? null);
  const dirName = currentFeature(input.projectRoot, sessionId);
  let reason;
  let count;
  const stageAgents = stageAgentTaskCount(tasks);
  if (stageAgents > 0) {
    reason = "stage agent running in background";
    count = stageAgents;
  } else if (!tasksCarryAgentType(tasks) && dirName !== null && hasOpenUnendedStage(readFeatureStageUnit(input.projectRoot, dirName))) {
    reason = "background task running while a stage is open";
    count = tasks.length;
  } else {
    return { deferred: false };
  }
  if (dirName !== null) {
    appendFeatureStageRow(
      input.projectRoot,
      sessionId,
      dirName,
      { kind: COMPLETION_DEFERRED_KIND, reason, tasks: count },
      input.now
    );
  }
  return { deferred: true, reason, tasks: count };
}
export {
  deferCompletionForBackgroundStage,
  hasOpenUnendedStage,
  stageAgentTaskCount,
  tasksCarryAgentType
};
