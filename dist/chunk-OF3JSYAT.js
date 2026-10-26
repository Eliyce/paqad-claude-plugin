import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  readStageSetting
} from "./chunk-TUZLZNMF.js";
import {
  readTranscriptUsage
} from "./chunk-VVXMXL4D.js";
import {
  STAGE_AGENT_KIND,
  appendFeatureStageRow,
  currentFeature
} from "./chunk-CAOZS5C2.js";
import {
  stageForAgentName,
  stripPluginAgentNamespace
} from "./chunk-XK6DWPZD.js";
import {
  resolveHookSession
} from "./chunk-MG36YCW4.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/stage-isolation/subagent-completion.ts
init_esm_shims();
import { readFileSync } from "fs";
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
    return readFileSync(path, "utf8");
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
    appendFeatureStageRow(
      input.projectRoot,
      sessionId,
      dirName,
      {
        kind: STAGE_AGENT_KIND,
        stage,
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
  estimateTokens,
  stageFromAgentType,
  resolveTokenCounts,
  resolveStageAgentTokens,
  recordStageAgentStart,
  recordStageAgentCompletion
};
