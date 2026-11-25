import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  pluginLoadState
} from "../chunk-Y4BY35LG.js";
import {
  MANDATORY_STAGE_AGENTS
} from "../chunk-LDKFDN3R.js";
import "../chunk-H3JU5RBI.js";
import "../chunk-XK65VKUF.js";
import "../chunk-TZCIQC7B.js";
import "../chunk-NCABIBTI.js";
import "../chunk-UMPIHMXN.js";
import {
  init_esm_shims
} from "../chunk-G5ZPBAMA.js";

// src/stage-isolation/agent-availability.ts
init_esm_shims();
import { existsSync, readFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";
function projectOnboardedForClaudeCode(projectRoot) {
  try {
    const manifest = JSON.parse(
      readFileSync(join(projectRoot, ".paqad", "onboarding-manifest.json"), "utf8")
    );
    return manifest.adapter === "claude-code";
  } catch {
    return false;
  }
}
var STAGE_AGENT_MISSING_MESSAGE = "paqad's stage agents load from the next session. Start a new session to continue.";
var STAGE_AGENT_MISSING_CONTEXT = `paqad stage agents are not available in this Claude Code session. When a stage needs its own agent, stop and show the Developer this one line instead of running the stage in the main session or handing it to a general agent:

${STAGE_AGENT_MISSING_MESSAGE}`;
function fullCopyPresent(root) {
  return MANDATORY_STAGE_AGENTS.every(
    (def) => existsSync(join(root, ".claude", "agents", `${def.agentName}.md`))
  );
}
function claudeStageAgentSource(options = {}) {
  const home = options.homeDir ?? homedir();
  const plugin = options.pluginInstalled ?? pluginLoadState(options.projectRoot ?? null, {
    home,
    env: options.homeDir === void 0 ? process.env : {}
  }) === "live";
  if (plugin) return "plugin";
  if (options.projectRoot !== void 0 && fullCopyPresent(options.projectRoot)) return "project";
  return fullCopyPresent(home) ? "home" : null;
}
function stageDispatchStopMessage(options = {}) {
  return claudeStageAgentSource(options) === null ? STAGE_AGENT_MISSING_MESSAGE : null;
}
function stageDispatchStopHookOutput(projectRoot, options = {}) {
  if (!projectOnboardedForClaudeCode(projectRoot)) return null;
  if (stageDispatchStopMessage({ projectRoot, ...options }) === null) return null;
  return `${JSON.stringify({
    systemMessage: STAGE_AGENT_MISSING_MESSAGE,
    hookSpecificOutput: {
      hookEventName: "SessionStart",
      additionalContext: STAGE_AGENT_MISSING_CONTEXT
    }
  })}
`;
}
export {
  STAGE_AGENT_MISSING_CONTEXT,
  STAGE_AGENT_MISSING_MESSAGE,
  claudeStageAgentSource,
  projectOnboardedForClaudeCode,
  stageDispatchStopHookOutput,
  stageDispatchStopMessage
};
