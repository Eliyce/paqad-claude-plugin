import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  stageFromAgentType
} from "../chunk-F6UT5G7R.js";
import {
  SAFE_SESSION_ID,
  isSafeSessionId
} from "../chunk-WFEB62PA.js";
import "../chunk-YASIZ6TE.js";
import {
  PAQAD_STAGE_HELPER_MATCHER
} from "../chunk-PWJ37K7H.js";
import "../chunk-NRKCUFAE.js";
import {
  currentFeature,
  recordedLaneOrFull
} from "../chunk-4JNYHPPQ.js";
import "../chunk-W2K6YXWC.js";
import {
  MANDATORY_STAGE_AGENTS,
  STAGE_AGENT_HARD_RULES,
  loadFeatureDevelopmentPolicy
} from "../chunk-PW5UZ55M.js";
import "../chunk-5BQ2AB2Y.js";
import "../chunk-AINYJ3Q2.js";
import "../chunk-WGEG5J6L.js";
import "../chunk-3CUGDX3J.js";
import "../chunk-SU7RODZI.js";
import {
  keepingLedgerSessionCache,
  resolveHookSession
} from "../chunk-MG36YCW4.js";
import {
  featureFilePath
} from "../chunk-KF7HHHJR.js";
import "../chunk-EGDL57MD.js";
import "../chunk-UCSN7SVD.js";
import {
  init_esm_shims
} from "../chunk-EMKBJVIL.js";

// src/stage-isolation/stage-brief.ts
init_esm_shims();
import { existsSync } from "fs";
import { join } from "path";
var STAGE_BRIEF_MAX_CHARS = 9e3;
var STAGE_BRIEF_ENTRY_LINE = "paqad records your entry check when you start; if an edit is blocked, create the marker it names.";
var STAGE_BRIEF_NO_CHANGE_LINE = "No active change was found; ask nothing, use the change ref the orchestrator gave you.";
var STAGE_BRIEF_MORE_LINE = "More instructions for this stage are in docs/instructions/workflows/feature-development.yaml.";
var PREVIOUS_PILLARS = {
  planning: [],
  specification: ["plan"],
  development: ["plan", "specification"],
  review: ["specification"],
  checks: ["review"],
  documentation_sync: ["review", "checks"]
};
var CODE_EDITING_STAGES = /* @__PURE__ */ new Set(["development"]);
var STAGE_HELPER_PATTERN = new RegExp(PAQAD_STAGE_HELPER_MATCHER);
function stageHelperStage(agentType) {
  if (typeof agentType !== "string" || !STAGE_HELPER_PATTERN.test(agentType)) {
    return null;
  }
  return stageFromAgentType(agentType);
}
function stageDef(stage) {
  const def = MANDATORY_STAGE_AGENTS.find((candidate) => candidate.ledgerStage === stage);
  if (!def) {
    throw new Error(`unknown stage "${stage}"`);
  }
  return def;
}
function existingPillars(projectRoot, dirName, stage) {
  return PREVIOUS_PILLARS[stage].map((file) => featureFilePath(dirName, file)).filter(
    (path) => existsSync(join(projectRoot, path))
  );
}
function changeSection(projectRoot, sessionId, stage) {
  const dirName = currentFeature(projectRoot, sessionId);
  if (!dirName) {
    return ["## Your change", "", STAGE_BRIEF_NO_CHANGE_LINE, ""];
  }
  const pillars = existingPillars(projectRoot, dirName, stage);
  return [
    "## Your change",
    "",
    `- Change: \`${dirName}\``,
    `- Lane: ${recordedLaneOrFull(projectRoot, sessionId, dirName)}`,
    pillars.length === 0 ? "- Previous pillar files: none" : "- Previous pillar files:",
    ...pillars.map((path) => `  - \`${path}\``),
    ""
  ];
}
function bulletList(items, empty) {
  return items.length === 0 ? [empty] : items.map((item) => `- ${item}`);
}
function commandsSection(stage, sessionId) {
  const prefix = `SE_SESSION=${sessionId} paqad-ai`;
  const rulesLoad = CODE_EDITING_STAGES.has(stage) ? [`- \`${prefix} rules load\` before your first source edit.`] : [];
  return [
    "## Commands",
    "",
    `- \`${prefix} stage start ${stage}\``,
    ...rulesLoad,
    "- Do the stage work, then write its rigid artifact with the stage verb, or make the edits",
    "  for a mutation stage.",
    `- \`${prefix} stage end ${stage} --artifact <the-rigid-file>\` (mutation stages need no artifact).`
  ];
}
function render(parts, truncated) {
  return [
    ...parts.head,
    "## Read first",
    "",
    ...bulletList(parts.read, "Nothing extra to read for this stage."),
    "",
    "## Stage instructions",
    "",
    ...bulletList(parts.instructions, "No extra instructions for this stage."),
    ...truncated ? ["", STAGE_BRIEF_MORE_LINE] : [],
    "",
    ...parts.tail
  ].join("\n");
}
function fitToBudget(parts) {
  let read = [...parts.read];
  let instructions = [...parts.instructions];
  let truncated = false;
  let text = render(parts, truncated);
  while (text.length > STAGE_BRIEF_MAX_CHARS && (instructions.length > 0 || read.length > 0)) {
    if (instructions.length > 0) {
      instructions = instructions.slice(0, -1);
    } else {
      read = read.slice(0, -1);
    }
    truncated = true;
    text = render({ ...parts, read, instructions }, truncated);
  }
  return text;
}
function buildStageBrief(stage, projectRoot, sessionId) {
  const def = stageDef(stage);
  if (!isSafeSessionId(sessionId)) {
    throw new Error("unsafe session id");
  }
  const policy = loadFeatureDevelopmentPolicy(projectRoot).policy.stages[stage];
  const head = [
    `You are the paqad **${stage}** stage agent. You run one stage of one feature-development`,
    `change in your own isolated context and then return. Your job: ${def.role}.`,
    "",
    "paqad added this stage brief to your context when you started, so you do not need to load",
    `AGENT-BOOTSTRAP.md or AGENT-ROUTER.md. ${STAGE_BRIEF_ENTRY_LINE}`,
    "",
    ...changeSection(projectRoot, sessionId, stage)
  ];
  const tail = [
    "## Hard rules",
    "",
    ...STAGE_AGENT_HARD_RULES,
    `- **Export \`SE_SESSION=${sessionId}\`** for every \`paqad-ai\` command you run, so every row`,
    "  and artifact you write is recorded under the one change.",
    "",
    ...commandsSection(stage, sessionId)
  ];
  return fitToBudget({
    head,
    read: policy.read,
    instructions: policy.instructions,
    tail
  });
}
function stageBriefHookOutput(brief) {
  return JSON.stringify({
    hookSpecificOutput: { hookEventName: "SubagentStart", additionalContext: brief }
  });
}
function resolveBriefSession(projectRoot, payload, env = process.env) {
  for (const raw of [payload.session_id, env.SE_SESSION, env.CLAUDE_SESSION_ID]) {
    if (typeof raw === "string" && raw.trim() !== "" && !isSafeSessionId(raw.trim())) {
      throw new Error("unsafe session id");
    }
  }
  return resolveHookSession(projectRoot, payload, env);
}
function seedStageAgent(stage, projectRoot, payload, env = process.env) {
  return keepingLedgerSessionCache(
    projectRoot,
    () => stageBriefHookOutput(
      buildStageBrief(stage, projectRoot, resolveBriefSession(projectRoot, payload, env))
    )
  );
}
export {
  SAFE_SESSION_ID,
  STAGE_BRIEF_ENTRY_LINE,
  STAGE_BRIEF_MAX_CHARS,
  STAGE_BRIEF_MORE_LINE,
  STAGE_BRIEF_NO_CHANGE_LINE,
  buildStageBrief,
  isSafeSessionId,
  resolveBriefSession,
  seedStageAgent,
  stageBriefHookOutput,
  stageHelperStage
};
