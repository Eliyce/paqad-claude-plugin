import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  MANDATORY_STAGE_AGENTS,
  isHighTableAgent,
  stageForAgentName,
  stripPluginAgentNamespace
} from "./chunk-NO4MUCKE.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/stage-isolation/must-not-judge.ts
init_esm_shims();
var MUST_NOT_VIOLATIONS = ["asked_human", "bundle_write", "out_of_stage_edit"];
var EDIT_TOOLS = /* @__PURE__ */ new Set(["Edit", "Write", "NotebookEdit", "MultiEdit"]);
var ASK_TOOLS = /* @__PURE__ */ new Set(["AskUserQuestion"]);
var BUNDLE_PATH = /(?:^|[\\/])\.paqad[\\/]ledger[\\/]feature-evidence[\\/][^\\/]+[\\/]/u;
function toolUsesIn(content) {
  if (!Array.isArray(content)) return [];
  const uses = [];
  for (const block of content) {
    if (!block || typeof block !== "object") continue;
    const entry = block;
    if (entry.type !== "tool_use" || typeof entry.name !== "string") continue;
    const input = entry.input && typeof entry.input === "object" ? entry.input : {};
    uses.push({ name: entry.name, input });
  }
  return uses;
}
function transcriptToolUses(raw) {
  const uses = [];
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("{")) continue;
    let record;
    try {
      record = JSON.parse(trimmed);
    } catch {
      continue;
    }
    const role = record.message?.role ?? record.type;
    if (role !== "assistant") continue;
    uses.push(...toolUsesIn(record.message?.content));
  }
  return uses;
}
function editPath(use) {
  const path = use.input.file_path ?? use.input.notebook_path ?? use.input.path;
  return typeof path === "string" && path.trim() !== "" ? path : null;
}
function stageEdits(stage) {
  const def = MANDATORY_STAGE_AGENTS.find((candidate) => candidate.ledgerStage === stage);
  return def !== void 0 && /\bEdit\b/u.test(def.claudeTools);
}
function judgeMustNot(stage, uses) {
  const found = /* @__PURE__ */ new Set();
  const edits = stageEdits(stage);
  for (const use of uses) {
    if (ASK_TOOLS.has(use.name)) {
      found.add("asked_human");
      continue;
    }
    if (!EDIT_TOOLS.has(use.name)) continue;
    const path = editPath(use);
    if (path !== null && BUNDLE_PATH.test(path)) {
      found.add("bundle_write");
    } else if (!edits) {
      found.add("out_of_stage_edit");
    }
  }
  return MUST_NOT_VIOLATIONS.filter((violation) => found.has(violation));
}
function unresolvedStageAgent(agentType) {
  if (typeof agentType !== "string") return null;
  const name = stripPluginAgentNamespace(agentType.trim());
  if (!name.startsWith("paqad-")) return null;
  if (isHighTableAgent(name) || stageForAgentName(name) !== null) return null;
  return name;
}
function formatUnresolvedStageSummary(agentName) {
  return `**\u25B8 paqad** \xB7 edit blocked: no active stage for \`${agentName}\`
> \u{1F534} Needs your attention \u2014 \`${agentName}\` is a paqad agent, but no paqad stage matches it, so the stage this edit belongs to cannot be resolved and the edit is denied. Dispatch the stage to its own agent (\`paqad-<stage>\`, for example \`paqad-development\`).`;
}

export {
  transcriptToolUses,
  judgeMustNot,
  unresolvedStageAgent,
  formatUnresolvedStageSummary
};
