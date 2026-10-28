import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  classifyStage,
  liveStageToStart,
  resolveEffectiveLane
} from "./chunk-YXTFS35T.js";
import {
  currentFeature,
  readFeatureStageUnit
} from "./chunk-QR66SJS4.js";
import {
  readChangeConstants
} from "./chunk-KFLIUVMP.js";
import {
  resolveSessionId
} from "./chunk-HV6ESCNW.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/stage-evidence/narration.ts
init_esm_shims();
var STAGE_NARRATION = {
  ticket_intake: "picking up the ticket and reading what it needs",
  planning: "planning this out, checking which module it touches",
  specification: "writing the spec before any code",
  development: "building it to the spec",
  review: "reviewing the change for regressions",
  checks: "running the gates: format, tests, build, rules",
  documentation_sync: "syncing the docs this change touched",
  delivery: "delivering per the branch and PR conventions"
};
function stageNarrationLine(stage) {
  const text = STAGE_NARRATION[stage];
  return text ? `**\u25B8 paqad** \xB7 ${text}` : "";
}
function narrateStageEntry(input) {
  const stage = classifyStage(input.targetPath, input.projectRoot);
  if (!stage) return null;
  try {
    const sessionId = resolveSessionId(input.projectRoot, input.sessionId);
    const dirName = currentFeature(input.projectRoot, sessionId);
    const rows = dirName ? readFeatureStageUnit(input.projectRoot, dirName) : [];
    const recordedLane = dirName ? readChangeConstants(input.projectRoot, dirName, rows).lane : null;
    const lane = resolveEffectiveLane(input.projectRoot, input.targetPath, recordedLane);
    const toStart = liveStageToStart(rows, lane, stage);
    return toStart ? stageNarrationLine(toStart) : null;
  } catch {
    return null;
  }
}
function markerNarrationLine(stage, phase) {
  if (!STAGE_NARRATION[stage]) return "";
  if (phase === "end") return "";
  return stageNarrationLine(stage);
}
function markerBatchNarration(markers) {
  const lines = [];
  for (const marker of markers) {
    const line = markerNarrationLine(marker.stage, marker.phase === "start" ? "start" : "end");
    if (line) lines.push(line);
  }
  return lines.join("\n");
}

export {
  STAGE_NARRATION,
  stageNarrationLine,
  narrateStageEntry,
  markerNarrationLine,
  markerBatchNarration
};
