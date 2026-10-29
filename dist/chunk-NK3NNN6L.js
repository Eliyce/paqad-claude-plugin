import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  readTranscriptUsage
} from "./chunk-FTPLA63V.js";
import {
  extractAssistantText,
  extractMarkers
} from "./chunk-DBWPK4Y2.js";
import {
  appendFeatureStageRow,
  currentFeature,
  readFeatureStageUnit
} from "./chunk-PKWXNMHK.js";
import {
  STAGE_AGENT_KIND
} from "./chunk-V2GOPPZK.js";
import {
  STAGE_AGENT_STAGES,
  STAGE_EFFORT_LEVELS,
  STAGE_MODELS,
  resolveStageAgentSettings,
  stageForAgentName,
  stripPluginAgentNamespace
} from "./chunk-USQSPB6R.js";
import {
  resolveHookSession
} from "./chunk-HV6ESCNW.js";
import {
  PATHS
} from "./chunk-LW3OCT4Y.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/stage-isolation/subagent-completion.ts
init_esm_shims();
import { readFileSync as readFileSync2 } from "fs";

// src/stage-isolation/stage-settings.ts
init_esm_shims();
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
var SAFE_SESSION_ID = /^[A-Za-z0-9._-]{1,128}$/;
function isSafeSessionId(sessionId) {
  return SAFE_SESSION_ID.test(sessionId);
}
var STAGE_SETTINGS_DIR = "stage-settings.d";
function stageSettingsPath(projectRoot, sessionId) {
  return join(projectRoot, PATHS.AGENCY_SESSION_DIR, STAGE_SETTINGS_DIR, `${sessionId}.json`);
}
function writeStageSettings(projectRoot, sessionId, env = process.env) {
  if (!isSafeSessionId(sessionId)) {
    throw new Error("unsafe session id");
  }
  const settings = resolveStageAgentSettings(projectRoot, env);
  const path = stageSettingsPath(projectRoot, sessionId);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(settings, null, 2)}
`, "utf8");
  return settings;
}
function effortToPass(configured, fileDefault) {
  if (configured !== "inherit") return `effort ${configured}`;
  if (fileDefault !== "inherit") {
    return `your own current effort level as effort, because its agent file defaults to ${fileDefault} effort`;
  }
  return null;
}
function modelToPass(configured, fileDefault) {
  if (configured !== "inherit") return `model ${configured}`;
  if (fileDefault !== "inherit") {
    return `your own current model as model, because its agent file defaults to ${fileDefault}`;
  }
  return null;
}
function stagePassAdvice(setting, fileDefault) {
  const parts = [
    effortToPass(setting.effort, fileDefault.effort),
    modelToPass(setting.model, fileDefault.model)
  ].filter((part) => part !== null);
  if (parts.length === 0) {
    return "pass nothing on its Agent call, so it runs at the session's own effort and model";
  }
  return `on its Agent call, pass ${parts.join(" and ")}`;
}
function stageSettingsReport(settings) {
  const fileDefaults = resolveStageAgentSettings();
  return Object.fromEntries(
    Object.entries(settings).map(([stage, setting]) => [
      stage,
      { ...setting, pass: stagePassAdvice(setting, fileDefaults[stage]) }
    ])
  );
}
function isStageAgentSetting(value) {
  if (!value || typeof value !== "object") return false;
  const { effort, model } = value;
  return STAGE_EFFORT_LEVELS.includes(effort) && STAGE_MODELS.includes(model);
}
function readStageSetting(projectRoot, sessionId, stage) {
  if (!isSafeSessionId(sessionId)) return null;
  try {
    const parsed = JSON.parse(
      readFileSync(stageSettingsPath(projectRoot, sessionId), "utf8")
    );
    const setting = parsed?.[stage];
    return isStageAgentSetting(setting) ? { effort: setting.effort, model: setting.model } : null;
  } catch {
    return null;
  }
}

// src/stage-isolation/subagent-completion.ts
var CHARS_PER_TOKEN = 4;
function estimateTokens(text) {
  if (!text) return 0;
  return Math.ceil(text.length / CHARS_PER_TOKEN);
}
function stageFromAgentType(agentType) {
  if (typeof agentType !== "string") {
    return null;
  }
  return stageForAgentName(stripPluginAgentNamespace(agentType));
}
function nonNegativeInt(value) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? Math.floor(value) : null;
}
function resolveTokenCounts(payload, transcriptText) {
  const usage = payload.usage ?? void 0;
  const input = usage ? nonNegativeInt(usage.input_tokens) : null;
  const output = usage ? nonNegativeInt(usage.output_tokens) : null;
  if (input !== null && output !== null) {
    const cached = nonNegativeInt(usage?.cache_read_input_tokens) ?? nonNegativeInt(usage?.cached_input_tokens) ?? 0;
    return { tokens_input: input, tokens_cached: cached, tokens_output: output, exact: true };
  }
  const estimate = estimateTokens(transcriptText);
  return { tokens_input: estimate, tokens_cached: 0, tokens_output: 0, exact: false };
}
function readAgentTranscriptText(path) {
  try {
    return readFileSync2(path, "utf8");
  } catch {
    return null;
  }
}
function resolveStageAgentTokens(payload, transcriptText) {
  const path = payload.agent_transcript_path;
  if (typeof path === "string" && path.trim() !== "") {
    const agentText = readAgentTranscriptText(path);
    const usage = readTranscriptUsage(path);
    if (agentText !== null && usage.messages.length > 0) {
      return {
        tokens_used: usage.totals.total,
        tokens_not_recarried: estimateTokens(agentText),
        exact: true
      };
    }
  }
  const counts = resolveTokenCounts(payload, transcriptText);
  return {
    tokens_used: counts.tokens_input + counts.tokens_output,
    tokens_not_recarried: estimateTokens(transcriptText),
    exact: false
  };
}
function requestedSetting(projectRoot, sessionId, stage) {
  const setting = readStageSetting(projectRoot, sessionId, stage);
  return setting ? { requested_effort: setting.effort, requested_model: setting.model } : {};
}
function agentIdField(payload) {
  return typeof payload.agent_id === "string" && payload.agent_id.trim() !== "" ? { agent_id: payload.agent_id.trim() } : {};
}
function transcriptStartedStages(payload) {
  const path = payload.agent_transcript_path;
  if (typeof path !== "string" || path.trim() === "") return [];
  const text = readAgentTranscriptText(path);
  if (text === null) return [];
  return extractMarkers(extractAssistantText(text)).filter((marker) => marker.phase === "start").map((marker) => marker.stage);
}
function ledgerStartedStages(projectRoot, dirName, agentId) {
  return readFeatureStageUnit(projectRoot, dirName).filter((row) => row.kind === "stage_start" && row.agent_id === agentId).map((row) => String(row.stage));
}
function stagesRunByAgent(projectRoot, dirName, stage, payload) {
  const agentId = agentIdField(payload).agent_id;
  const ran = /* @__PURE__ */ new Set([
    stage,
    ...transcriptStartedStages(payload),
    ...agentId ? ledgerStartedStages(projectRoot, dirName, agentId) : []
  ]);
  return STAGE_AGENT_STAGES.filter((candidate) => ran.has(candidate));
}
function recordStageAgentStart(input) {
  try {
    const agentType = typeof input.payload.agent_type === "string" ? input.payload.agent_type : null;
    const stage = stageFromAgentType(agentType);
    if (!stage || agentType === null) {
      return false;
    }
    const sessionId = resolveHookSession(input.projectRoot, input.payload);
    const dirName = currentFeature(input.projectRoot, sessionId);
    if (!dirName) {
      return false;
    }
    appendFeatureStageRow(
      input.projectRoot,
      sessionId,
      dirName,
      {
        kind: STAGE_AGENT_KIND,
        stage,
        agent: agentType,
        ...agentIdField(input.payload),
        event_status: "started",
        host_pid: process.ppid,
        tokens_used: 0,
        tokens_not_recarried: 0,
        estimate: true
      },
      input.now
    );
    return true;
  } catch {
    return false;
  }
}
function recordStageAgentCompletion(input) {
  try {
    const stage = stageFromAgentType(
      typeof input.payload.agent_type === "string" ? input.payload.agent_type : null
    );
    if (!stage) {
      return false;
    }
    const sessionId = resolveHookSession(input.projectRoot, input.payload);
    const dirName = currentFeature(input.projectRoot, sessionId);
    if (!dirName) {
      return false;
    }
    const tokens = resolveStageAgentTokens(input.payload, input.transcriptText);
    const stages = stagesRunByAgent(input.projectRoot, dirName, stage, input.payload);
    appendFeatureStageRow(
      input.projectRoot,
      sessionId,
      dirName,
      {
        kind: STAGE_AGENT_KIND,
        stage,
        ...stages.length > 1 ? { stages } : {},
        agent: input.payload.agent_type,
        ...agentIdField(input.payload),
        event_status: "completed",
        tokens_used: tokens.tokens_used,
        tokens_not_recarried: tokens.tokens_not_recarried,
        estimate: !tokens.exact,
        ...requestedSetting(input.projectRoot, sessionId, stage)
      },
      input.now
    );
    return true;
  } catch {
    return false;
  }
}

export {
  SAFE_SESSION_ID,
  isSafeSessionId,
  writeStageSettings,
  stageSettingsReport,
  estimateTokens,
  stageFromAgentType,
  resolveTokenCounts,
  resolveStageAgentTokens,
  stagesRunByAgent,
  recordStageAgentStart,
  recordStageAgentCompletion
};
