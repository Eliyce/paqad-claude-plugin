import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/adapters/shared/paqad-hooks.ts
init_esm_shims();
import { homedir } from "os";
import { join } from "path";
var PAQAD_HOOK_EVENT_ORDER = [
  "pre-tool-mutation",
  "prompt-submit",
  "session-start",
  "completion",
  "subagent-start",
  "subagent-completion",
  "post-tool-read"
];
var PAQAD_RUNTIME_PREFIX = "~/.paqad-ai/current";
var PLUGIN_RUNTIME_ROOT = "${CLAUDE_PLUGIN_ROOT}/runtime";
var PLUGIN_SESSION_START_HOOK = "plugin-session-start.mjs";
var PLUGIN_EXCLUDED_HOOK_FILES = /* @__PURE__ */ new Set(["silent-update.mjs"]);
var PAQAD_MUTATING_TOOL_MATCHER = "Edit|Write|NotebookEdit";
var PAQAD_STAGE_AGENT_MATCHER = "^(paqad:)?paqad-";
var PAQAD_STAGE_HELPER_MATCHER = "^(paqad:)?paqad-(planning|specification|development|review|checks|documentation-sync)$";
var PAQAD_SKILL_READ_MATCHER = "Skill|Read";
var DEFAULT_HOOK_ADAPTER = "claude-code";
var NATIVE_HOOK_EVENTS = {
  "claude-code": {
    nativeEvent: {
      "session-start": "SessionStart",
      "prompt-submit": "UserPromptSubmit",
      "pre-tool-mutation": "PreToolUse",
      completion: "Stop",
      "subagent-start": "SubagentStart",
      "subagent-completion": "SubagentStop",
      "post-tool-read": "PostToolUse"
    },
    mutatingMatcher: PAQAD_MUTATING_TOOL_MATCHER,
    subagentMatcher: PAQAD_STAGE_AGENT_MATCHER,
    subagentStartMatcher: PAQAD_STAGE_HELPER_MATCHER,
    postReadMatcher: PAQAD_SKILL_READ_MATCHER
  },
  "codex-cli": {
    nativeEvent: {
      "session-start": "SessionStart",
      "prompt-submit": "UserPromptSubmit",
      "pre-tool-mutation": "PreToolUse",
      completion: "Stop",
      "subagent-completion": "SubagentStop"
    },
    mutatingMatcher: "^apply_patch$",
    subagentMatcher: PAQAD_STAGE_AGENT_MATCHER
  }
};
function rendersFullHookChain(adapterType) {
  return adapterType in NATIVE_HOOK_EVENTS;
}
function frameworkHomeAbsolute(env = process.env) {
  const home = env.PAQAD_FRAMEWORK_HOME ?? join(homedir(), ".paqad-ai", "current");
  return home.replace(/\\/g, "/");
}
function hookCommand(hookFile, env = process.env, root) {
  return `node "${root ?? frameworkHomeAbsolute(env)}/hooks/${hookFile}"`;
}
function capabilityGateCommand(seam, adapterType, env = process.env, root) {
  const base = `${hookCommand("capability-gate.mjs", env, root)} ${seam}`;
  return adapterType && adapterType !== DEFAULT_HOOK_ADAPTER ? `${base} ${adapterType}` : base;
}
function completionRecordCommand(adapterType, env = process.env) {
  const base = hookCommand("verification-record.mjs", env);
  return adapterType ? `${base} ${adapterType}` : base;
}
var PAQAD_LIVE_HOOKS = [
  {
    id: "agent-entry-gate",
    event: "pre-tool-mutation",
    hookFile: "agent-entry-gate.mjs",
    failClosed: true,
    timeoutSec: 10,
    description: "Block a mutating edit until the framework entry file is loaded (Part 0)."
  },
  {
    id: "stage-writer",
    event: "pre-tool-mutation",
    hookFile: "stage-writer.mjs",
    hostArgv: true,
    description: "Script-mint per-stage live-mark rows on every mutating edit (RCA fix A)."
  },
  {
    id: "decision-pause-gate",
    event: "pre-tool-mutation",
    hookFile: "decision-pause-gate.mjs",
    failClosed: true,
    timeoutSec: 10,
    description: "Block mutating tools while a decision packet is unresolved."
  },
  {
    id: "capability-gate-pre-mutation",
    event: "pre-tool-mutation",
    hookFile: "capability-gate.mjs",
    capabilitySeam: "pre-mutation",
    hostArgv: true,
    failClosed: true,
    timeoutSec: 10,
    description: "Run the capability kernel (rules-loaded, stages) before a mutating edit (F3)."
  },
  {
    id: "agent-entry-prompt-gate",
    event: "prompt-submit",
    hookFile: "agent-entry-prompt-gate.mjs",
    hostArgv: true,
    description: "Inject the load directive / context block and route the prompt (Part 0)."
  },
  {
    id: "ticket-intake-prompt",
    event: "prompt-submit",
    hookFile: "ticket-intake-prompt.mjs",
    hostArgv: true,
    description: "Arm deterministic ticket intake when a prompt names a tracker ref."
  },
  {
    id: "agent-entry-session-start",
    event: "session-start",
    hookFile: "agent-entry-session-start.mjs",
    description: "Reset the entry sentinel and align the ledger session id on a new session."
  },
  {
    id: "silent-update",
    event: "session-start",
    hookFile: "silent-update.mjs",
    description: "Background, non-blocking forced self-update on every session start."
  },
  {
    id: "stage-marker-parse",
    event: "completion",
    hookFile: "stage-marker-parse.mjs",
    hostArgv: true,
    description: "Record the agent\u2019s paqad:stage markers from the transcript on completion."
  },
  {
    id: "verification-completion",
    event: "completion",
    hookFile: "verification-completion.mjs",
    hostArgv: true,
    description: "Run the verification backstop and surface the trust verdict on completion."
  },
  {
    id: "capability-gate-completion",
    event: "completion",
    hookFile: "capability-gate.mjs",
    capabilitySeam: "completion",
    hostArgv: true,
    description: "Run the capability kernel at turn end (F3)."
  },
  {
    id: "stage-agent-start",
    event: "subagent-start",
    hookFile: "stage-agent-start.mjs",
    timeoutSec: 10,
    description: "Seed a stage agent with its stage brief on SubagentStart."
  },
  {
    id: "stage-agent-completion",
    event: "subagent-completion",
    hookFile: "stage-agent-completion.mjs",
    hostArgv: true,
    description: "Record a stage agent\u2019s stage-agent row on SubagentStop."
  },
  {
    id: "skill-activation",
    event: "post-tool-read",
    hookFile: "skill-activation.mjs",
    description: "Log a skill firing (the Skill tool, or a Read of a SKILL.md) to the activation ledger."
  }
];
function renderHookCommand(spec, adapterType, env = process.env, root) {
  const argv = spec.hostArgv && adapterType !== DEFAULT_HOOK_ADAPTER ? adapterType : void 0;
  if (spec.capabilitySeam) {
    return capabilityGateCommand(spec.capabilitySeam, argv, env, root);
  }
  const base = hookCommand(spec.hookFile, env, root);
  return argv ? `${base} ${argv}` : base;
}
function buildHostHookChain(adapterType, env = process.env) {
  const host = NATIVE_HOOK_EVENTS[adapterType];
  if (!host) {
    throw new Error(`no native hook event map for adapter "${adapterType}"`);
  }
  const chain = [];
  for (const event of PAQAD_HOOK_EVENT_ORDER) {
    const nativeEvent = host.nativeEvent[event];
    if (nativeEvent === void 0) {
      continue;
    }
    for (const spec of PAQAD_LIVE_HOOKS) {
      if (spec.event !== event) {
        continue;
      }
      const failClosed = spec.failClosed === true && adapterType === DEFAULT_HOOK_ADAPTER;
      const timed = failClosed || spec.failClosed !== true;
      chain.push({
        nativeEvent,
        matcher: matcherForEvent(event, host),
        command: renderHookCommand(spec, adapterType, env),
        ...failClosed ? { onFailure: "block" } : {},
        ...timed && spec.timeoutSec !== void 0 ? { timeout: spec.timeoutSec } : {}
      });
    }
  }
  return chain;
}
function matcherForEvent(event, host) {
  if (event === "pre-tool-mutation") {
    return host.mutatingMatcher;
  }
  if (event === "subagent-completion") {
    return host.subagentMatcher;
  }
  if (event === "subagent-start") {
    return host.subagentStartMatcher;
  }
  if (event === "post-tool-read") {
    return host.postReadMatcher;
  }
  return void 0;
}
function buildPluginHookChain(env = process.env) {
  const host = NATIVE_HOOK_EVENTS[DEFAULT_HOOK_ADAPTER];
  const chain = [];
  for (const event of PAQAD_HOOK_EVENT_ORDER) {
    const nativeEvent = host.nativeEvent[event];
    if (nativeEvent === void 0) {
      continue;
    }
    if (event === "session-start") {
      chain.push({
        nativeEvent,
        command: hookCommand(PLUGIN_SESSION_START_HOOK, env, PLUGIN_RUNTIME_ROOT)
      });
    }
    for (const spec of PAQAD_LIVE_HOOKS) {
      if (spec.event !== event || PLUGIN_EXCLUDED_HOOK_FILES.has(spec.hookFile)) {
        continue;
      }
      chain.push({
        nativeEvent,
        matcher: matcherForEvent(event, host),
        command: renderHookCommand(spec, DEFAULT_HOOK_ADAPTER, env, PLUGIN_RUNTIME_ROOT),
        ...spec.failClosed !== true && spec.timeoutSec !== void 0 ? { timeout: spec.timeoutSec } : {}
      });
    }
  }
  return chain;
}
var HOOK_COVERAGE_MATRIX = {
  "claude-code": "live-pre-and-completion",
  "codex-cli": "live-pre-and-completion",
  "gemini-cli": "live-completion-only",
  cursor: "advisory",
  windsurf: "advisory",
  continue: "advisory",
  "github-copilot": "advisory",
  junie: "advisory",
  aider: "advisory",
  antigravity: "advisory",
  aiassistant: "advisory"
};
function isLiveHookCapable(adapterType) {
  const coverage = HOOK_COVERAGE_MATRIX[adapterType];
  return coverage === "live-pre-and-completion" || coverage === "live-completion-only";
}
function hasPreMutationBlock(adapterType) {
  return HOOK_COVERAGE_MATRIX[adapterType] === "live-pre-and-completion";
}

export {
  PAQAD_HOOK_EVENT_ORDER,
  PAQAD_RUNTIME_PREFIX,
  PLUGIN_RUNTIME_ROOT,
  PLUGIN_SESSION_START_HOOK,
  PAQAD_MUTATING_TOOL_MATCHER,
  PAQAD_STAGE_AGENT_MATCHER,
  PAQAD_STAGE_HELPER_MATCHER,
  PAQAD_SKILL_READ_MATCHER,
  DEFAULT_HOOK_ADAPTER,
  NATIVE_HOOK_EVENTS,
  rendersFullHookChain,
  frameworkHomeAbsolute,
  hookCommand,
  capabilityGateCommand,
  completionRecordCommand,
  PAQAD_LIVE_HOOKS,
  renderHookCommand,
  buildHostHookChain,
  buildPluginHookChain,
  HOOK_COVERAGE_MATRIX,
  isLiveHookCapable,
  hasPreMutationBlock
};
