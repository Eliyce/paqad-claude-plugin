import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  pluginLoadState
} from "../chunk-VNMVILDR.js";
import {
  MANDATORY_STAGE_AGENTS
} from "../chunk-BBV37BA3.js";
import "../chunk-LLLBX77H.js";
import "../chunk-N7PDT64R.js";
import "../chunk-VVRAO2BK.js";
import "../chunk-G3YYQOXJ.js";
import {
  init_esm_shims
} from "../chunk-EMKBJVIL.js";

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
var STAGE_AGENT_MISSING_MESSAGE = "**\u25B8 paqad** \xB7 stage agents are missing\n> \u{1F534} Needs your attention \u2014 Claude Code has neither the paqad plugin agents nor a copy in this repo's `.claude/agents/` or in `~/.claude/agents/`, so a stage cannot be dispatched to its own agent. Install the paqad plugin (`/plugin install paqad@eliyce`) and start a new session. paqad stops here instead of running the stage in the main session.";
var STAGE_AGENT_MISSING_CONTEXT = `paqad stage agents are not available in this Claude Code session. When a stage needs its own agent, stop and show the Developer this message instead of running the stage in the main session:

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
