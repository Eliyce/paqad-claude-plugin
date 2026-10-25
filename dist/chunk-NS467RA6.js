import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  readStageSetting
} from "./chunk-C3ZD4Y3C.js";
import {
  readTranscriptUsage
} from "./chunk-WDT4SYL3.js";
import {
  appendFeatureStageRow,
  currentFeature
} from "./chunk-7UCGEMJB.js";
import {
  stageForAgentName,
  stripPluginAgentNamespace
} from "./chunk-IUTPBUW2.js";
import {
  STAGE_AGENT_KIND
} from "./chunk-DIAYPPCX.js";
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
  recordStageAgentCompletion
};
