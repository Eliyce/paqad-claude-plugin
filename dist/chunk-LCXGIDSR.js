import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  ADAPTER_TYPES
} from "./chunk-UHS5UVPO.js";
import {
  writeProjectProfile
} from "./chunk-GAEJHX3P.js";
import {
  PLUGIN_ID
} from "./chunk-VNMVILDR.js";
import {
  toPosixPath
} from "./chunk-4K4CM3QN.js";
import {
  sha256Hex,
  splitFrontMatter
} from "./chunk-4MQZPCLY.js";
import {
  AGENT_HOST_TARGETS,
  FrameworkError,
  HIGH_TABLE_AGENTS,
  MANDATORY_STAGE_AGENTS,
  buildHighTableAgentBody,
  buildStageAgentBody,
  isSubagentCapableAdapter,
  renderAgentTemplate,
  require_lib
} from "./chunk-4BEZCXS2.js";
import {
  envConfigValue,
  readConfigsDir,
  readDotConfig,
  require_dist,
  resolveStageAgentSettings,
  resolveTeamBootstrapEnabled,
  teamSetsInstallModeSettings,
  versionAtLeast
} from "./chunk-3GFZQZPX.js";
import {
  isHigherStamp,
  parseStampInteger
} from "./chunk-N7PDT64R.js";
import {
  renameWithRetrySync
} from "./chunk-ER3R2ZPY.js";
import {
  getPackageRoot,
  getRuntimeRoot,
  getRuntimeTemplatesRoot
} from "./chunk-VVRAO2BK.js";
import {
  basename,
  dirname,
  join
} from "./chunk-47TQR4LW.js";
import {
  PATHS
} from "./chunk-G3YYQOXJ.js";
import {
  __toESM,
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/adapters/shared/paqad-hooks.ts
init_esm_shims();
import { homedir } from "os";
import { join as join2 } from "path";
var PAQAD_HOOK_EVENT_ORDER = [
  "pre-tool-mutation",
  "pre-tool-bash",
  "pre-tool-handback",
  "prompt-submit",
  "session-start",
  "completion",
  "subagent-start",
  "subagent-completion",
  "post-tool-read",
  "post-tool-agent",
  "subagent-stop-any"
];
var PAQAD_RUNTIME_PREFIX = "~/.paqad-ai/current";
var PLUGIN_RUNTIME_ROOT = "${CLAUDE_PLUGIN_ROOT}/runtime";
var PLUGIN_SESSION_START_HOOK = "plugin-session-start.mjs";
var PLUGIN_EXCLUDED_HOOK_FILES = /* @__PURE__ */ new Set(["silent-update.mjs"]);
var PAQAD_MUTATING_TOOL_MATCHER = "Edit|Write|NotebookEdit";
var PAQAD_STAGE_AGENT_MATCHER = "^(paqad:)?paqad-";
var PAQAD_STAGE_HELPER_MATCHER = "^(paqad:)?paqad-(planning|specification|development|review|checks|documentation-sync)$";
var PAQAD_SKILL_READ_MATCHER = "Skill|Read";
var PAQAD_AGENT_TOOL_MATCHER = "Agent|Task";
var PAQAD_ANY_SUBAGENT_MATCHER = ".*";
var PAQAD_BASH_TOOL_MATCHER = "Bash";
var PAQAD_HANDBACK_TOOL_MATCHER = "SubagentHandback";
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
      "post-tool-read": "PostToolUse",
      "post-tool-agent": "PostToolUse",
      "subagent-stop-any": "SubagentStop",
      "pre-tool-bash": "PreToolUse",
      "pre-tool-handback": "PreToolUse"
    },
    mutatingMatcher: PAQAD_MUTATING_TOOL_MATCHER,
    subagentMatcher: PAQAD_STAGE_AGENT_MATCHER,
    subagentStartMatcher: PAQAD_STAGE_HELPER_MATCHER,
    postReadMatcher: PAQAD_SKILL_READ_MATCHER,
    postAgentMatcher: PAQAD_AGENT_TOOL_MATCHER,
    anySubagentMatcher: PAQAD_ANY_SUBAGENT_MATCHER,
    bashMatcher: PAQAD_BASH_TOOL_MATCHER,
    handbackMatcher: PAQAD_HANDBACK_TOOL_MATCHER
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
  const home = env.PAQAD_FRAMEWORK_HOME ?? join2(homedir(), ".paqad-ai", "current");
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
  },
  {
    id: "agent-delegation-call",
    event: "post-tool-agent",
    hookFile: "agent-delegation.mjs",
    description: "Log an agent delegation (an Agent or Task call) to the delegation ledger."
  },
  {
    id: "agent-delegation-stop",
    event: "subagent-stop-any",
    hookFile: "agent-delegation.mjs",
    description: "Log a subagent stop to the delegation ledger."
  },
  {
    id: "stage-agent-write-guard",
    event: "pre-tool-bash",
    hookFile: "stage-agent-write-guard.mjs",
    description: "Block shell file writes from the read-only paqad agents; High Table seats write only under .paqad/tmp/high-table/."
  },
  {
    id: "stage-agent-handback",
    event: "pre-tool-handback",
    hookFile: "stage-agent-handback.mjs",
    timeoutSec: 10,
    description: "Record a stage agent\u2019s handback report and refuse a finished claim whose stage has no result."
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
  if (event === "post-tool-agent") {
    return host.postAgentMatcher;
  }
  if (event === "subagent-stop-any") {
    return host.anySubagentMatcher;
  }
  if (event === "pre-tool-bash") {
    return host.bashMatcher;
  }
  if (event === "pre-tool-handback") {
    return host.handbackMatcher;
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
        ...spec.failClosed === true ? { onFailure: "block" } : {},
        ...spec.timeoutSec !== void 0 ? { timeout: spec.timeoutSec } : {}
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

// src/templates/engine.ts
init_esm_shims();
var import_handlebars = __toESM(require_lib(), 1);
import { readFile } from "fs/promises";
var TemplateEngine = class {
  handlebars;
  constructor() {
    this.handlebars = import_handlebars.default.create();
    this.registerHelpers();
  }
  async render(templatePath, context) {
    const templateSource = await readFile(templatePath, "utf8");
    const template = this.handlebars.compile(templateSource);
    return template(context);
  }
  registerHelpers() {
    this.handlebars.registerHelper(
      "if_eq",
      function ifEq(left, right, options) {
        return left === right ? options.fn(this) : options.inverse(this);
      }
    );
    this.handlebars.registerHelper(
      "join",
      (value, separator = ", ") => Array.isArray(value) ? value.join(separator) : ""
    );
    this.handlebars.registerHelper("uppercase", (value) => value.toUpperCase());
    this.handlebars.registerHelper("lowercase", (value) => value.toLowerCase());
    this.handlebars.registerHelper(
      "slugify",
      (value) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
    );
    this.handlebars.registerHelper("date", () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
  }
};

// src/adapters/aiassistant/aiassistant-adapter.ts
init_esm_shims();

// src/adapters/shared/base-adapter.ts
init_esm_shims();
import { readFile as readFile2 } from "fs/promises";

// src/adapters/shared/framework-fallback-clause.ts
init_esm_shims();
var FALLBACK_CLAUSE = "**Fallback:** if `.paqad/framework-path.txt` is missing or cannot be resolved, or paqad is disabled, proceed as a normal assistant with no paqad behavior. Do not block.";
function buildFrameworkFallbackClause() {
  return FALLBACK_CLAUSE;
}

// src/adapters/shared/base-adapter.ts
var BaseAdapter = class {
  engine = new TemplateEngine();
  capabilities = {
    skills: true,
    agents: true,
    hooks: true,
    mcp: true,
    caching: true,
    memory: true
  };
  getConfigPath() {
    return this.configOutputPath();
  }
  getMcpPath() {
    return this.mcpOutputPath();
  }
  getSkillsRoot() {
    return this.skillsRoot();
  }
  getAgentsRoot() {
    return this.agentsRoot();
  }
  async generateConfig(context) {
    const files = [
      {
        path: this.configOutputPath(),
        content: await this.engine.render(
          join(getRuntimeTemplatesRoot(), "agent-configs", this.configTemplateName()),
          {
            adapter: this.type,
            frameworkPath: context.frameworkPath,
            frameworkFallback: buildFrameworkFallbackClause()
          }
        ),
        autoUpdate: true
      }
    ];
    const hostIgnore = this.hostConfigGitignore();
    if (hostIgnore) {
      files.push(hostIgnore);
    }
    return files;
  }
  executedHookConfigFiles() {
    return [];
  }
  hostConfigGitignore() {
    const executed = this.executedHookConfigFiles();
    if (executed.length === 0) {
      return null;
    }
    const hostDir = dirname(this.hooksOutputPath());
    if (!hostDir || hostDir === ".") {
      return null;
    }
    return this.renderHostGitignore([basename(this.hooksOutputPath()), ...executed]);
  }
  renderHostGitignore(names) {
    const hostDir = dirname(this.hooksOutputPath());
    const ignored = new Set(names);
    const body = [
      "# >>> paqad-ai managed (do not edit between markers) >>>",
      "# Per-machine generated hook config \u2014 carries an absolute, machine-specific",
      "# hook path. Regenerated by onboarding/update; never committed.",
      ...[...ignored].sort(),
      "# <<< paqad-ai managed <<<",
      ""
    ].join("\n");
    return { path: join(hostDir, ".gitignore"), content: body, autoUpdate: true };
  }
  async generateSkills(skills) {
    return Promise.all(
      skills.map(async (skill) => ({
        path: join(this.skillsRoot(), getSkillBundleRelativePath(skill)),
        content: await readFile2(skill.path, "utf8"),
        autoUpdate: true
      }))
    );
  }
  async generateAgents(agents) {
    return Promise.all(
      agents.map(async (agent) => ({
        path: join(this.agentsRoot(), basename(agent.path)),
        content: await readFile2(agent.path, "utf8"),
        autoUpdate: true
      }))
    );
  }
  async installHooks(hooks) {
    return [
      {
        path: this.hooksOutputPath(),
        content: JSON.stringify(
          hooks.map((hook) => ({ source: hook.source })),
          null,
          2
        ),
        autoUpdate: true
      }
    ];
  }
  async installMcp() {
    return [];
  }
  async configureCaching(profile) {
    return [
      {
        path: this.cacheOutputPath(),
        content: JSON.stringify(
          {
            enabled: profile.efficiency.skill_caching,
            differential_refresh: profile.efficiency.differential_refresh
          },
          null,
          2
        ),
        autoUpdate: true
      }
    ];
  }
  async configureMemory(profile) {
    return [
      {
        path: this.memoryOutputPath(),
        content: JSON.stringify(
          {
            context_hit_rate_target: profile.efficiency.context_hit_rate_target,
            mcp_first: profile.efficiency.mcp_first
          },
          null,
          2
        ),
        autoUpdate: true
      }
    ];
  }
};
function getSkillBundleRelativePath(skill) {
  const sourceSegments = skill.source.split(/[\\/]+/);
  const sourceSkillsIndex = sourceSegments.lastIndexOf("skills");
  if (sourceSkillsIndex !== -1 && sourceSkillsIndex < sourceSegments.length - 1) {
    return sourceSegments.slice(sourceSkillsIndex + 1).join("/");
  }
  const segments = skill.path.split(/[\\/]+/);
  const skillsIndex = segments.lastIndexOf("skills");
  if (skillsIndex === -1 || skillsIndex === segments.length - 1) {
    return skill.source.includes("/") ? skill.source : basename(skill.path);
  }
  return segments.slice(skillsIndex + 1).join("/");
}

// src/adapters/aiassistant/aiassistant-adapter.ts
var AiAssistantAdapter = class extends BaseAdapter {
  type = "aiassistant";
  capabilities = {
    skills: false,
    agents: false,
    hooks: false,
    mcp: false,
    caching: false,
    memory: false
  };
  configTemplateName() {
    return "aiassistant.md.hbs";
  }
  configOutputPath() {
    return ".aiassistant/rules/guidelines.md";
  }
  skillsRoot() {
    return ".aiassistant/skills";
  }
  agentsRoot() {
    return ".aiassistant/agents";
  }
  hooksOutputPath() {
    return ".aiassistant/hooks.json";
  }
  mcpOutputPath() {
    return ".aiassistant/mcp.json";
  }
  cacheOutputPath() {
    return ".aiassistant/cache.json";
  }
  memoryOutputPath() {
    return ".aiassistant/memory.json";
  }
};

// src/adapters/aider/aider-adapter.ts
init_esm_shims();
var import_yaml = __toESM(require_dist(), 1);
import { existsSync, readFileSync } from "fs";
import { join as join3 } from "path";

// src/delivery/attribution-config.ts
init_esm_shims();

// src/core/floored-mode.ts
init_esm_shims();
function resolveFlooredMode(layers, order, def) {
  const norm = (raw) => {
    if (raw === void 0) return void 0;
    const value = raw.trim().toLowerCase();
    return order.includes(value) ? value : void 0;
  };
  const floor = norm(layers.team) ?? def;
  let rank = order.indexOf(floor);
  for (const raising of [norm(layers.local), norm(layers.env)]) {
    if (raising !== void 0) {
      rank = Math.max(rank, order.indexOf(raising));
    }
  }
  return order[rank];
}

// src/delivery/attribution-config.ts
var AI_ATTRIBUTION_MODES = ["keep", "strip"];
var DEFAULT_AI_ATTRIBUTION_MODE = "strip";
function resolveAiAttributionMode(projectRoot, env = process.env) {
  return resolveFlooredMode(
    {
      team: readConfigsDir(projectRoot).merged.get("ai_attribution"),
      local: readDotConfig(projectRoot).get("ai_attribution"),
      env: envConfigValue(env, "ai_attribution")
    },
    AI_ATTRIBUTION_MODES,
    DEFAULT_AI_ATTRIBUTION_MODE
  );
}
function shouldStripAiAttribution(projectRoot, env = process.env) {
  return resolveAiAttributionMode(projectRoot, env) === "strip";
}

// src/adapters/aider/aider-adapter.ts
var AIDER_ATTRIBUTION_KEYS = [
  "attribute-author",
  "attribute-committer",
  "attribute-co-authored-by"
];
var AiderAdapter = class extends BaseAdapter {
  type = "aider";
  capabilities = {
    skills: false,
    agents: false,
    hooks: false,
    mcp: false,
    caching: false,
    memory: false
  };
  configTemplateName() {
    return "aider.md.hbs";
  }
  configOutputPath() {
    return "CONVENTIONS.md";
  }
  skillsRoot() {
    return ".aider/skills";
  }
  agentsRoot() {
    return ".aider/agents";
  }
  hooksOutputPath() {
    return ".aider/hooks.json";
  }
  mcpOutputPath() {
    return "aider.mcp.json";
  }
  cacheOutputPath() {
    return ".aider/cache.json";
  }
  memoryOutputPath() {
    return ".aider/memory.json";
  }
  async generateConfig(context) {
    const base = await super.generateConfig(context);
    const attribution = buildAiderAttributionConfig(context.projectRoot);
    return attribution ? [...base, attribution] : base;
  }
};
function buildAiderAttributionConfig(projectRoot) {
  if (!shouldStripAiAttribution(projectRoot)) {
    return null;
  }
  const path = ".aider.conf.yml";
  const doc = readAiderConfig(join3(projectRoot, path));
  for (const key of AIDER_ATTRIBUTION_KEYS) {
    if (!doc.has(key)) {
      doc.set(key, false);
    }
  }
  return { path, content: doc.toString(), autoUpdate: true };
}
function readAiderConfig(path) {
  const empty = () => new import_yaml.default.Document({});
  if (!existsSync(path)) {
    return empty();
  }
  try {
    const doc = import_yaml.default.parseDocument(readFileSync(path, "utf8"));
    return doc.errors.length === 0 && import_yaml.default.isMap(doc.contents) ? doc : empty();
  } catch {
    return empty();
  }
}

// src/adapters/antigravity/antigravity-adapter.ts
init_esm_shims();
var AntigravityAdapter = class extends BaseAdapter {
  type = "antigravity";
  configTemplateName() {
    return "antigravity.md.hbs";
  }
  configOutputPath() {
    return "ANTIGRAVITY.md";
  }
  skillsRoot() {
    return ".antigravity/skills";
  }
  agentsRoot() {
    return ".antigravity/agents";
  }
  hooksOutputPath() {
    return ".antigravity/hooks.json";
  }
  mcpOutputPath() {
    return ".antigravity/mcp.json";
  }
  cacheOutputPath() {
    return ".antigravity/cache.json";
  }
  memoryOutputPath() {
    return ".antigravity/memory.json";
  }
};

// src/adapters/shared/native-hook-config.ts
init_esm_shims();
import { readFileSync as readFileSync2 } from "fs";
function shouldPrune(command, pruneExact, pruneBasenames) {
  if (pruneExact?.has(command)) {
    return true;
  }
  return (pruneBasenames ?? []).some((file) => command.includes(file));
}
function pruneEventGroups(groups, pruneExact, pruneBasenames) {
  return (Array.isArray(groups) ? groups : []).map((group) => ({
    ...group,
    hooks: (group?.hooks ?? []).filter(
      (hook) => !shouldPrune(hook.command, pruneExact, pruneBasenames)
    )
  })).filter((group) => group.hooks.length > 0);
}
function mergeNativeHooks(existing, chain, pruneExact, pruneBasenames) {
  const hooks = existing.hooks && typeof existing.hooks === "object" && !Array.isArray(existing.hooks) ? existing.hooks : {};
  const byEvent = /* @__PURE__ */ new Map();
  for (const rendered of chain) {
    const list = byEvent.get(rendered.nativeEvent) ?? [];
    list.push(rendered);
    byEvent.set(rendered.nativeEvent, list);
  }
  const nextHooks = { ...hooks };
  for (const [event, entries] of byEvent) {
    const merged = pruneEventGroups(hooks[event], pruneExact, pruneBasenames);
    for (const entry of entries) {
      const alreadyPresent = merged.some(
        (group) => group.hooks?.some((hook) => hook.command === entry.command)
      );
      if (alreadyPresent) {
        continue;
      }
      merged.push({
        ...entry.matcher !== void 0 ? { matcher: entry.matcher } : {},
        hooks: [
          {
            type: "command",
            command: entry.command,
            ...entry.onFailure !== void 0 ? { onFailure: entry.onFailure } : {},
            ...entry.timeout !== void 0 ? { timeout: entry.timeout } : {}
          }
        ]
      });
    }
    nextHooks[event] = merged;
  }
  return { ...existing, hooks: nextHooks };
}
function buildNativeHookConfigFile(options) {
  const { projectRoot, settingsPath, chain, pruneExact, pruneBasenames, transform } = options;
  const existing = readJsonObject(join(projectRoot, settingsPath));
  const merged = mergeNativeHooks(existing, chain, pruneExact, pruneBasenames);
  const next = transform ? transform(merged) : merged;
  return {
    path: settingsPath,
    content: `${JSON.stringify(next, null, 2)}
`,
    autoUpdate: true
  };
}
var RECORD_HOOK_BASENAME = "verification-record.mjs";
function buildNativeCompletionHookFile(options) {
  const { projectRoot, settingsPath, completionEvent, adapterType } = options;
  const chain = [
    { nativeEvent: completionEvent, command: completionRecordCommand(adapterType) }
  ];
  return buildNativeHookConfigFile({
    projectRoot,
    settingsPath,
    chain,
    pruneBasenames: [RECORD_HOOK_BASENAME]
  });
}
function buildFullHookChain(adapterType, env = process.env) {
  return buildHostHookChain(adapterType, env);
}
function readJsonObject(path) {
  let raw;
  try {
    raw = readFileSync2(path, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw error;
  }
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

// src/adapters/codex/codex-adapter.ts
init_esm_shims();
var CODEX_HOOKS_FILE = ".codex/hooks.json";
var CODEX_RETIRED_HOOK_FILES = ["verification-record.mjs", "rule-script-enforce.mjs"];
var CodexCliAdapter = class extends BaseAdapter {
  type = "codex-cli";
  configTemplateName() {
    return "agents.md.hbs";
  }
  configOutputPath() {
    return "AGENTS.md";
  }
  skillsRoot() {
    return ".codex/skills";
  }
  agentsRoot() {
    return ".codex/agents";
  }
  hooksOutputPath() {
    return ".codex/settings.hooks.json";
  }
  mcpOutputPath() {
    return ".codex/mcp.json";
  }
  cacheOutputPath() {
    return ".codex/cache.json";
  }
  memoryOutputPath() {
    return ".codex/memory.json";
  }
  executedHookConfigFiles() {
    return ["hooks.json"];
  }
  async generateConfig(context) {
    const base = await super.generateConfig(context);
    return [
      ...base,
      buildNativeHookConfigFile({
        projectRoot: context.projectRoot,
        settingsPath: CODEX_HOOKS_FILE,
        chain: buildFullHookChain(this.type, process.env),
        pruneBasenames: CODEX_RETIRED_HOOK_FILES
      })
    ];
  }
};

// src/adapters/continue/continue-adapter.ts
init_esm_shims();
var ContinueAdapter = class extends BaseAdapter {
  type = "continue";
  capabilities = {
    skills: true,
    agents: false,
    hooks: false,
    mcp: true,
    caching: false,
    memory: false
  };
  configTemplateName() {
    return "continue.md.hbs";
  }
  configOutputPath() {
    return ".continue/rules/paqad.md";
  }
  skillsRoot() {
    return ".continue/prompts";
  }
  agentsRoot() {
    return ".continue/agents";
  }
  hooksOutputPath() {
    return ".continue/hooks.json";
  }
  mcpOutputPath() {
    return ".continue/mcp.json";
  }
  cacheOutputPath() {
    return ".continue/cache.json";
  }
  memoryOutputPath() {
    return ".continue/memory.json";
  }
};

// src/adapters/cursor/cursor-adapter.ts
init_esm_shims();
var CursorAdapter = class extends BaseAdapter {
  type = "cursor";
  capabilities = {
    skills: true,
    agents: true,
    hooks: false,
    mcp: true,
    caching: true,
    memory: true
  };
  configTemplateName() {
    return "cursor.md.hbs";
  }
  configOutputPath() {
    return ".cursor/rules/paqad.mdc";
  }
  skillsRoot() {
    return ".cursor/skills";
  }
  agentsRoot() {
    return ".cursor/agents";
  }
  hooksOutputPath() {
    return ".cursor/hooks.json";
  }
  mcpOutputPath() {
    return ".cursor/mcp.json";
  }
  cacheOutputPath() {
    return ".cursor/cache.json";
  }
  memoryOutputPath() {
    return ".cursor/memory.json";
  }
};

// src/adapters/gemini/gemini-adapter.ts
init_esm_shims();
var GEMINI_SETTINGS_FILE = ".gemini/settings.json";
var GEMINI_COMPLETION_EVENT = "AfterAgent";
var GeminiCliAdapter = class extends BaseAdapter {
  type = "gemini-cli";
  configTemplateName() {
    return "gemini.md.hbs";
  }
  configOutputPath() {
    return "GEMINI.md";
  }
  skillsRoot() {
    return ".gemini/skills";
  }
  agentsRoot() {
    return ".gemini/agents";
  }
  hooksOutputPath() {
    return ".gemini/settings.hooks.json";
  }
  mcpOutputPath() {
    return ".gemini/mcp.json";
  }
  cacheOutputPath() {
    return ".gemini/cache.json";
  }
  memoryOutputPath() {
    return ".gemini/memory.json";
  }
  executedHookConfigFiles() {
    return ["settings.json"];
  }
  async generateConfig(context) {
    const base = await super.generateConfig(context);
    return [
      ...base,
      buildNativeCompletionHookFile({
        projectRoot: context.projectRoot,
        settingsPath: GEMINI_SETTINGS_FILE,
        completionEvent: GEMINI_COMPLETION_EVENT,
        adapterType: this.type
      })
    ];
  }
};

// src/adapters/github-copilot/github-copilot-adapter.ts
init_esm_shims();
var GithubCopilotAdapter = class extends BaseAdapter {
  type = "github-copilot";
  capabilities = {
    skills: false,
    agents: false,
    hooks: false,
    mcp: true,
    caching: false,
    memory: false
  };
  configTemplateName() {
    return "copilot.md.hbs";
  }
  configOutputPath() {
    return ".github/copilot-instructions.md";
  }
  skillsRoot() {
    return ".github/skills";
  }
  agentsRoot() {
    return ".github/agents";
  }
  hooksOutputPath() {
    return ".github/hooks.json";
  }
  mcpOutputPath() {
    return ".vscode/mcp.json";
  }
  cacheOutputPath() {
    return ".github/cache.json";
  }
  memoryOutputPath() {
    return ".github/memory.json";
  }
};

// src/adapters/junie/junie-adapter.ts
init_esm_shims();
var JunieAdapter = class extends BaseAdapter {
  type = "junie";
  capabilities = {
    skills: false,
    agents: false,
    hooks: false,
    mcp: true,
    caching: false,
    memory: false
  };
  configTemplateName() {
    return "junie.md.hbs";
  }
  configOutputPath() {
    return ".junie/AGENTS.md";
  }
  skillsRoot() {
    return ".junie/skills";
  }
  agentsRoot() {
    return ".junie/agents";
  }
  hooksOutputPath() {
    return ".junie/hooks.json";
  }
  mcpOutputPath() {
    return ".junie/mcp/mcp.json";
  }
  cacheOutputPath() {
    return ".junie/cache.json";
  }
  memoryOutputPath() {
    return ".junie/memory.json";
  }
};

// src/adapters/windsurf/windsurf-adapter.ts
init_esm_shims();
var WindsurfAdapter = class extends BaseAdapter {
  type = "windsurf";
  capabilities = {
    skills: true,
    agents: true,
    hooks: false,
    mcp: true,
    caching: true,
    memory: true
  };
  configTemplateName() {
    return "windsurf.md.hbs";
  }
  configOutputPath() {
    return ".windsurfrules";
  }
  skillsRoot() {
    return ".windsurf/skills";
  }
  agentsRoot() {
    return ".windsurf/agents";
  }
  hooksOutputPath() {
    return ".windsurf/hooks.json";
  }
  mcpOutputPath() {
    return ".windsurf/mcp.json";
  }
  cacheOutputPath() {
    return ".windsurf/cache.json";
  }
  memoryOutputPath() {
    return ".windsurf/memory.json";
  }
};

// src/adapters/factory.ts
init_esm_shims();

// src/adapters/claude/claude-adapter.ts
init_esm_shims();
import { existsSync as existsSync5 } from "fs";
import { join as join14 } from "path";

// src/core/fs/git-tracked.ts
init_esm_shims();
import { execFileSync } from "child_process";
function isGitTracked(projectRoot, path) {
  try {
    execFileSync("git", ["ls-files", "--error-unmatch", "--", path], {
      cwd: projectRoot,
      stdio: "ignore"
    });
    return true;
  } catch {
    return false;
  }
}
function isGitIgnored(projectRoot, path) {
  if (isGitTracked(projectRoot, path)) {
    return false;
  }
  try {
    execFileSync("git", ["check-ignore", "--quiet", "--no-index", "--", path], {
      cwd: projectRoot,
      stdio: "ignore"
    });
    return true;
  } catch {
    return false;
  }
}
function gitPendingPaths(projectRoot, paths) {
  if (paths.length === 0) return [];
  let out;
  try {
    out = execFileSync("git", ["status", "--porcelain", "--untracked-files=all", "--", ...paths], {
      cwd: projectRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    });
  } catch {
    return null;
  }
  return out.split("\n").filter((line) => line.length > 3).map((line) => line.slice(3).replace(/^"|"$/g, "")).sort();
}

// src/adapters/claude/team-settings.ts
init_esm_shims();
import { readFileSync as readFileSync3 } from "fs";
import { homedir as homedir2 } from "os";

// src/install/plugin-settings-keys.ts
init_esm_shims();
var PLUGIN_MARKETPLACE_REPO = "Eliyce/paqad-claude-plugin";
var PLUGIN_MARKETPLACE_KEY = "eliyce";
function pluginSettingsKeys() {
  return {
    extraKnownMarketplaces: {
      [PLUGIN_MARKETPLACE_KEY]: {
        source: { source: "github", repo: PLUGIN_MARKETPLACE_REPO },
        autoUpdate: true
      }
    },
    enabledPlugins: { [PLUGIN_ID]: true }
  };
}

// src/adapters/claude/team-settings.ts
var CLAUDE_SETTINGS_FILE = ".claude/settings.json";
var CLAUDE_LOCAL_SETTINGS_FILE = ".claude/settings.local.json";
var TEAM_LAUNCHER_MARK = "/.paqad/hook.mjs";
var TEAM_LAUNCHER_COMMAND = 'node "$CLAUDE_PROJECT_DIR/.paqad/hook.mjs"';
var SESSION_START_TIMEOUT_SEC = 600;
var TEAM_KEYS = /* @__PURE__ */ new Set(["$schema", "attribution"]);
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function slash(value) {
  return value.replace(/\\/g, "/");
}
function isTeamLauncherCommand(command) {
  return typeof command === "string" && slash(command).includes(TEAM_LAUNCHER_MARK);
}
function toLauncherCommand(command) {
  const match = /^node "[^"]*\/hooks\/([^"/]+\.mjs)"(.*)$/.exec(slash(command));
  if (!match) {
    throw new Error(`the paqad hook command has an unexpected shape: ${command}`);
  }
  return `${TEAM_LAUNCHER_COMMAND} ${match[1]}${match[2]}`;
}
function buildTeamHookChain(env = process.env) {
  return buildHostHookChain("claude-code", env).map((hook) => ({
    ...hook,
    command: toLauncherCommand(hook.command),
    ...hook.nativeEvent === "SessionStart" ? { timeout: SESSION_START_TIMEOUT_SEC } : {}
  }));
}
function isMachinePaqadCommand(command, env) {
  if (typeof command !== "string" || isTeamLauncherCommand(command)) return false;
  const normal = slash(command);
  return normal.includes("/.paqad-ai/") || normal.includes("~/.paqad-ai") || normal.includes(`${frameworkHomeAbsolute(env)}/hooks/`);
}
var HOME_PATH = /\/Users\/[^/\s"']+|\/home\/[^/\s"']+|[A-Za-z]:[\\/]{1,2}Users[\\/]{1,2}[^\\/\s"']+/;
function holdsHomePath(value) {
  const text = JSON.stringify(value) ?? "";
  const home = homedir2();
  return HOME_PATH.test(text) || home.length > 1 && slash(text).includes(slash(home));
}
function readJson(path) {
  let raw;
  try {
    raw = readFileSync3(path, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
  try {
    const parsed = JSON.parse(raw);
    return isRecord(parsed) ? parsed : {};
  } catch {
    return {};
  }
}
function filterHooks(hooks, keep) {
  if (!isRecord(hooks)) return {};
  const out = {};
  for (const [event, groups] of Object.entries(hooks)) {
    if (!Array.isArray(groups)) continue;
    const kept = groups.filter(isRecord).map((group) => ({
      ...group,
      hooks: (Array.isArray(group.hooks) ? group.hooks : []).filter(
        (hook) => isRecord(hook) && keep(hook)
      )
    })).filter((group) => group.hooks.length > 0);
    if (kept.length > 0) out[event] = kept;
  }
  return out;
}
function isPaqadLine(hook, options) {
  const command = hook.command;
  if (typeof command !== "string") return false;
  return isTeamLauncherCommand(command) || isMachinePaqadCommand(command, options.env) || options.pruneExact.has(command) || options.pruneBasenames.some((file) => command.includes(file));
}
function withoutPaqadLines(settings, options) {
  if (!("hooks" in settings)) return settings;
  return { ...settings, hooks: filterHooks(settings.hooks, (hook) => !isPaqadLine(hook, options)) };
}
function addTeamKeys(settings) {
  const keys = pluginSettingsKeys();
  const marketplaces = isRecord(settings.extraKnownMarketplaces) ? settings.extraKnownMarketplaces : {};
  const enabled = isRecord(settings.enabledPlugins) ? settings.enabledPlugins : {};
  return {
    ...settings,
    extraKnownMarketplaces: {
      ...marketplaces,
      [PLUGIN_MARKETPLACE_KEY]: marketplaces[PLUGIN_MARKETPLACE_KEY] ?? keys.extraKnownMarketplaces[PLUGIN_MARKETPLACE_KEY]
    },
    enabledPlugins: { ...enabled, [PLUGIN_ID]: enabled[PLUGIN_ID] ?? true }
  };
}
function withoutTeamKeys(settings) {
  const next = { ...settings };
  for (const [key, inner] of [
    ["extraKnownMarketplaces", PLUGIN_MARKETPLACE_KEY],
    ["enabledPlugins", PLUGIN_ID]
  ]) {
    const value = next[key];
    if (!isRecord(value) || !(inner in value)) continue;
    const rest = Object.fromEntries(Object.entries(value).filter(([name]) => name !== inner));
    if (Object.keys(rest).length === 0) delete next[key];
    else next[key] = rest;
  }
  return next;
}
function splitPersonal(existing) {
  const team = {};
  const personal = {};
  for (const [key, value] of Object.entries(existing)) {
    if (key === "hooks") {
      const hooks = filterHooks(value, () => true);
      if (Object.keys(hooks).length > 0) personal.hooks = hooks;
    } else if (key === "extraKnownMarketplaces" || key === "enabledPlugins") {
      const inner = key === "extraKnownMarketplaces" ? PLUGIN_MARKETPLACE_KEY : PLUGIN_ID;
      const rest = isRecord(value) ? Object.fromEntries(Object.entries(value).filter(([name]) => name !== inner)) : {};
      if (Object.keys(rest).length > 0) personal[key] = rest;
    } else if (TEAM_KEYS.has(key) && !holdsHomePath(value)) {
      team[key] = value;
    } else {
      personal[key] = value;
    }
  }
  return { team, personal };
}
function mergeKeepingExisting(base, extra) {
  if (Array.isArray(base) && Array.isArray(extra)) {
    const seen = new Set(base.map((item) => JSON.stringify(item)));
    return [...base, ...extra.filter((item) => !seen.has(JSON.stringify(item)))];
  }
  if (isRecord(base) && isRecord(extra)) {
    const out = { ...base };
    for (const [key, value] of Object.entries(extra)) {
      out[key] = key in base ? mergeKeepingExisting(base[key], value) : value;
    }
    return out;
  }
  return base;
}
function serialize(settings) {
  return `${JSON.stringify(settings, null, 2)}
`;
}
function fileFor(path, settings) {
  return { path, content: serialize(settings), autoUpdate: true };
}
function planMachineOnlySettings(options) {
  const existing = readJson(join(options.projectRoot, CLAUDE_SETTINGS_FILE)) ?? {};
  const merged = mergeNativeHooks(withoutPaqadLines(existing, options), options.npmChain);
  return fileFor(CLAUDE_SETTINGS_FILE, options.transform(merged));
}
function planClaudeSettings(options) {
  const { projectRoot, env, transform } = options;
  const enabled = resolveTeamBootstrapEnabled(projectRoot, env);
  const tracked = isGitTracked(projectRoot, CLAUDE_SETTINGS_FILE);
  const existing = readJson(join(projectRoot, CLAUDE_SETTINGS_FILE)) ?? {};
  const existingLocal = readJson(join(projectRoot, CLAUDE_LOCAL_SETTINGS_FILE));
  const files = [];
  if (!enabled) {
    const shared2 = withoutTeamKeys(withoutPaqadLines(existing, options));
    files.push(fileFor(CLAUDE_SETTINGS_FILE, transform(shared2)));
    const local2 = mergeNativeHooks(
      withoutPaqadLines(existingLocal ?? {}, options),
      options.npmChain
    );
    const localChanged2 = existingLocal === null ? options.npmChain.length > 0 : serialize(local2) !== serialize(existingLocal);
    if (localChanged2) files.push(fileFor(CLAUDE_LOCAL_SETTINGS_FILE, local2));
    return { files, enabled, tracked };
  }
  const chain = buildTeamHookChain(env);
  const pluginKeys = teamSetsInstallModeSettings(projectRoot) ? withoutTeamKeys : addTeamKeys;
  let shared;
  let personal = {};
  if (tracked) {
    shared = transform(pluginKeys(mergeNativeHooks(withoutPaqadLines(existing, options), chain)));
  } else {
    const split = splitPersonal(withoutPaqadLines(existing, options));
    personal = split.personal;
    shared = transform({ ...pluginKeys(mergeNativeHooks({}, chain)), ...split.team });
  }
  files.push(fileFor(CLAUDE_SETTINGS_FILE, shared));
  const cleanedLocal = withoutPaqadLines(existingLocal ?? {}, options);
  const local = mergeKeepingExisting(cleanedLocal, personal);
  const localChanged = Object.keys(personal).length > 0 || existingLocal !== null && serialize(local) !== serialize(existingLocal);
  if (localChanged) files.push(fileFor(CLAUDE_LOCAL_SETTINGS_FILE, local));
  return { files, enabled, tracked };
}

// src/adapters/claude/team-setup.ts
init_esm_shims();
import { mkdirSync as mkdirSync4, readFileSync as readFileSync10, rmSync as rmSync3, writeFileSync as writeFileSync5 } from "fs";
import { dirname as dirname5, join as join13 } from "path";

// src/onboarding/stage-agent-migration.ts
init_esm_shims();
import { createHash as createHash2 } from "crypto";
import {
  closeSync as closeSync2,
  constants as constants2,
  fstatSync as fstatSync2,
  ftruncateSync,
  lstatSync as lstatSync2,
  mkdirSync as mkdirSync3,
  openSync as openSync2,
  readFileSync as readFileSync9,
  readdirSync as readdirSync2,
  rmSync as rmSync2,
  writeFileSync as writeFileSync4,
  writeSync
} from "fs";
import { join as join12 } from "path";

// src/stage-isolation/agent-writer.ts
init_esm_shims();
import { mkdirSync as mkdirSync2, writeFileSync as writeFileSync3 } from "fs";
import { homedir as homedir4 } from "os";
import { join as join11 } from "path";

// src/stage-isolation/recipes.ts
init_esm_shims();
import { readFileSync as readFileSync8 } from "fs";
import { join as join10 } from "path";

// src/authoring/generated-recipes.ts
init_esm_shims();
import { existsSync as existsSync3 } from "fs";
import { dirname as dirname3, join as join7 } from "path";
import { fileURLToPath } from "url";

// src/authoring/hash.ts
init_esm_shims();
var import_yaml2 = __toESM(require_dist(), 1);
import { createHash } from "crypto";
import { existsSync as existsSync2, lstatSync, readdirSync, readFileSync as readFileSync5, readlinkSync } from "fs";
import { join as join5 } from "path";

// src/authoring/fs-io.ts
init_esm_shims();
import {
  chmodSync,
  closeSync,
  constants,
  fstatSync,
  openSync,
  readFileSync as readFileSync4,
  rmSync,
  writeFileSync
} from "fs";
import { basename as basename2, dirname as dirname2, join as join4 } from "path";
var MISSING_CODES = /* @__PURE__ */ new Set(["ENOENT", "ENOTDIR"]);
function readNoFollowFlags() {
  return constants.O_RDONLY | (constants.O_NOFOLLOW ?? 0);
}
function isMissingPathError(error) {
  const code = error?.code;
  return typeof code === "string" && MISSING_CODES.has(code);
}
function openIfPresent(path, flags = "r") {
  try {
    return openSync(path, flags);
  } catch (error) {
    if (isMissingPathError(error)) return null;
    throw error;
  }
}
function readTextIfPresent(path) {
  const fd = openIfPresent(path);
  if (fd === null) return null;
  try {
    return readFileSync4(fd, "utf8");
  } finally {
    closeSync(fd);
  }
}
function readBytesIfPresent(path) {
  try {
    return readFileSync4(path);
  } catch (error) {
    if (isMissingPathError(error)) return null;
    throw error;
  }
}
function readRegularFile(path, followLinks = true) {
  let fd;
  try {
    fd = openSync(path, followLinks ? constants.O_RDONLY : readNoFollowFlags());
  } catch (error) {
    if (error?.code === "EISDIR") return null;
    throw error;
  }
  try {
    const stat = fstatSync(fd);
    return stat.isFile() ? { buffer: readFileSync4(fd), mode: stat.mode & 4095 } : null;
  } finally {
    closeSync(fd);
  }
}
function tempPathFor(path) {
  return join4(dirname2(path), `.${basename2(path)}.${process.pid}.tmp`);
}
function writeFileAtomic(path, content, mode) {
  const tmp = tempPathFor(path);
  try {
    writeFileSync(tmp, content, typeof content === "string" ? "utf8" : void 0);
    if (mode !== void 0) chmodSync(tmp, mode);
    renameWithRetrySync(tmp, path);
  } catch (error) {
    rmSync(tmp, { force: true });
    throw error;
  }
}

// src/authoring/hash.ts
var NEVER_LISTED = /* @__PURE__ */ new Set(["__pycache__", ".DS_Store"]);
function neverListed(name) {
  return NEVER_LISTED.has(name) || name.endsWith(".pyc");
}
function compareText(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}
function listFolderFiles(root, prefix = "") {
  if (!existsSync2(join5(root, prefix))) return [];
  const files = [];
  for (const name of readdirSync(join5(root, prefix)).sort(compareText)) {
    if (neverListed(name)) continue;
    const rel = prefix === "" ? name : `${prefix}/${name}`;
    const stat = lstatSync(join5(root, rel));
    if (stat.isSymbolicLink()) {
      const target = readlinkSync(join5(root, rel));
      files.push({ rel, bytes: Buffer.from(target), symlink: target });
      continue;
    }
    if (stat.isDirectory()) files.push(...listFolderFiles(root, rel));
    else files.push({ rel, bytes: readFileSync5(join5(root, rel)) });
  }
  return files;
}
function regularFiles(files) {
  return files.filter((file) => file.symlink === void 0);
}
function hashFiles(files) {
  const hash = createHash("sha256");
  for (const file of [...files].sort((left, right) => compareText(left.rel, right.rel))) {
    hash.update(file.rel);
    hash.update(file.symlink === void 0 ? "\0" : "\0symlink\0");
    hash.update(file.bytes);
    hash.update("\0");
  }
  return `sha256:${hash.digest("hex")}`;
}
function hashFolder(root, include) {
  const files = listFolderFiles(root).filter((file) => include === void 0 || include(file.rel));
  return hashFiles(files);
}
function hashText(text) {
  return `sha256:${createHash("sha256").update(text).digest("hex")}`;
}
function withoutDescription(skillText) {
  const lines = skillText.split(/\r?\n/);
  if (lines[0] !== "---") return skillText;
  const close = lines.indexOf("---", 1);
  if (close === -1) return skillText;
  const kept = [];
  let skipping = false;
  for (const line of lines.slice(1, close)) {
    if (/^description\s*:/u.test(line)) {
      skipping = true;
      continue;
    }
    if (skipping && /^\s/u.test(line)) continue;
    skipping = false;
    kept.push(line);
  }
  return ["---", ...kept, ...lines.slice(close)].join("\n");
}
function hashFolderWithoutDescription(root) {
  return hashFiles(
    listFolderFiles(root).map(
      (file) => file.rel === "SKILL.md" && file.symlink === void 0 ? { rel: file.rel, bytes: Buffer.from(withoutDescription(file.bytes.toString("utf8"))) } : file
    )
  );
}
function currentDescription(lines, close) {
  try {
    return import_yaml2.default.parse(lines.slice(1, close).join("\n"))?.description;
  } catch {
    return void 0;
  }
}
function parsesAsPlain(description) {
  try {
    const parsed = import_yaml2.default.parse(`description: ${description}`);
    return parsed?.description === description;
  } catch {
    return false;
  }
}
function descriptionLines(description) {
  if (description.includes("\n")) return [`description: ${JSON.stringify(description)}`];
  if (parsesAsPlain(description)) return [`description: ${description}`];
  return ["description: >-", `  ${description}`];
}
function withDescription(skillText, description) {
  const lines = skillText.split("\n");
  if (lines[0] !== "---") return skillText;
  const close = lines.indexOf("---", 1);
  if (close === -1) return skillText;
  if (currentDescription(lines, close) === description) return skillText;
  const replacement = descriptionLines(description);
  const front = lines.slice(1, close);
  const start = front.findIndex((entry) => /^description\s*:/u.test(entry));
  if (start !== -1) {
    let end = start + 1;
    while (end < front.length && /^\s/u.test(front[end])) end += 1;
    front.splice(start, end - start, ...replacement);
  } else {
    const name = front.findIndex((entry) => /^name\s*:/u.test(entry));
    front.splice(name + 1, 0, ...replacement);
  }
  return ["---", ...front, ...lines.slice(close)].join("\n");
}
var MISSING_HOOK_SCRIPT = "\0missing\0";
var AGENT_FILE_KEY = "agent";
function hashAgentText(agent, hookScripts, scriptRoot) {
  const files = [
    { rel: AGENT_FILE_KEY, bytes: typeof agent === "string" ? Buffer.from(agent) : agent }
  ];
  for (const script of [...new Set(hookScripts)]) {
    const abs = join5(scriptRoot, script);
    files.push({
      rel: `hooks/${script}`,
      bytes: readBytesIfPresent(abs) ?? Buffer.from(MISSING_HOOK_SCRIPT)
    });
  }
  return hashFiles(files);
}
function hashAgentFile(projectRoot, file, hookScripts = [], scriptRoot = projectRoot) {
  return hashAgentText(readFileSync5(join5(projectRoot, file)), hookScripts, scriptRoot);
}

// src/authoring/paths.ts
init_esm_shims();
import { readFileSync as readFileSync6 } from "fs";
import { join as join6 } from "path";

// src/adapters/recorded-providers.ts
init_esm_shims();
function deriveRecordedProviders(manifest) {
  const saved = (manifest.providers ?? []).filter((type) => ADAPTER_TYPES.includes(type));
  if (saved.length > 0) {
    return [manifest.adapter, ...saved.filter((type) => type !== manifest.adapter)];
  }
  const artifactPaths = new Set(
    manifest.generated_artifacts.map((artifact) => artifact.path.replaceAll("\\", "/"))
  );
  const recorded = ADAPTER_TYPES.filter((type) => {
    const configPath = AdapterFactory.create(type).getConfigPath().replaceAll("\\", "/");
    return artifactPaths.has(configPath);
  });
  return [manifest.adapter, ...recorded.filter((type) => type !== manifest.adapter)];
}

// src/authoring/paths.ts
var OPEN_STANDARD_SKILLS_ROOT = ".agents/skills";
var PAQAD_REPO_SKILL_ROOTS = [
  "runtime/base/skills",
  "runtime/claude-plugin/skills",
  "runtime/capabilities/*/skills"
];
var SKILL_FILE = "SKILL.md";
var PAQAD_REPO_AGENT_ROOTS = [
  "runtime/claude-plugin/agents",
  "runtime/base/agents",
  "runtime/capabilities/*/agents",
  "runtime/templates/stage-agents"
];
var PAQAD_PERSONA_ROOTS = [
  "runtime/base/agents",
  "runtime/capabilities/*/agents"
];
var PAQAD_AGENT_TEMPLATE_ROOT = "runtime/templates/stage-agents";
var PAQAD_PACKAGE_NAME = "paqad-ai";
var hostRootCache = /* @__PURE__ */ new Map();
function hostSkillsRoot(type) {
  if (!hostRootCache.has(type)) {
    const adapter = AdapterFactory.create(type);
    hostRootCache.set(type, adapter instanceof BaseAdapter ? adapter.getSkillsRoot() : null);
  }
  return hostRootCache.get(type) ?? null;
}
var agentRootCache = /* @__PURE__ */ new Map();
function hostAgentsRoot(type) {
  if (!agentRootCache.has(type)) {
    const adapter = AdapterFactory.create(type);
    agentRootCache.set(type, adapter instanceof BaseAdapter ? adapter.getAgentsRoot() : null);
  }
  return agentRootCache.get(type) ?? null;
}
function normalize(path) {
  return path.replaceAll("\\", "/").replace(/^(\.\/)+/u, "");
}
function skillRoots(adapters, options = {}) {
  const roots = /* @__PURE__ */ new Set();
  for (const type of adapters) {
    const root = hostSkillsRoot(type);
    if (root !== null) roots.add(normalize(root).replace(/\/+$/u, ""));
  }
  roots.add(OPEN_STANDARD_SKILLS_ROOT);
  if (options.paqadRepo === true) {
    for (const root of PAQAD_REPO_SKILL_ROOTS) roots.add(root);
  }
  return [...roots];
}
function matchRoot(segments, root) {
  if (segments.length <= root.length) return false;
  return root.every((part, index) => part === "*" || part === segments[index]);
}
function folderFromSegments(segments, roots) {
  for (const root of roots) {
    if (!matchRoot(segments, root)) continue;
    const rest = segments.slice(root.length);
    if (rest.length >= 2 && rest[0] !== "") {
      return { name: rest[0], folder: segments.slice(0, root.length + 1).join("/") };
    }
  }
  return null;
}
function nameFromSegments(segments, roots) {
  return folderFromSegments(segments, roots)?.name ?? null;
}
function splitRoots(adapters, options) {
  return skillRoots(adapters, options).map((root) => root.split("/"));
}
function skillFolderOf(path, adapters, options = {}) {
  return folderFromSegments(normalize(path).split("/"), splitRoots(adapters, options));
}
function findSkillPaths(files, adapters, options = {}) {
  const roots = splitRoots(adapters, options);
  return files.filter((file) => nameFromSegments(normalize(file).split("/"), roots) !== null);
}
function agentRoots(adapters, options = {}) {
  const roots = /* @__PURE__ */ new Set();
  for (const type of adapters) {
    if (!isSubagentCapableAdapter(type, AGENT_HOST_TARGETS)) continue;
    const root = hostAgentsRoot(type);
    if (root !== null) roots.add(normalize(root).replace(/\/+$/u, ""));
  }
  if (options.paqadRepo === true) {
    for (const root of PAQAD_REPO_AGENT_ROOTS) roots.add(root);
  }
  return [...roots];
}
function agentStem(file) {
  return file.replace(/\.hbs$/u, "").replace(/\.[^.]+$/u, "");
}
function agentNameFromSegments(segments, roots) {
  for (const root of roots) {
    if (!matchRoot(segments, root)) continue;
    const rest = segments.slice(root.length);
    if (rest.length !== 1) continue;
    const stem = agentStem(rest[0]);
    if (stem !== "" && !stem.startsWith(".")) return stem;
  }
  return null;
}
function splitAgentRoots(adapters, options) {
  return agentRoots(adapters, options).map((root) => root.split("/"));
}
function agentNameOf(path, adapters, options = {}) {
  return agentNameFromSegments(normalize(path).split("/"), splitAgentRoots(adapters, options));
}
function findAgentPaths(files, adapters, options = {}) {
  const roots = splitAgentRoots(adapters, options);
  return files.filter((file) => agentNameFromSegments(normalize(file).split("/"), roots) !== null);
}
function underRoots(path, roots) {
  const segments = normalize(path).split("/");
  return roots.some((root) => {
    const parts = root.split("/");
    return segments.length === parts.length + 1 && matchRoot(segments, parts);
  });
}
function isPersonaRootPath(path) {
  return underRoots(path, PAQAD_PERSONA_ROOTS);
}
function isAgentTemplatePath(path) {
  return underRoots(path, [PAQAD_AGENT_TEMPLATE_ROOT]) && normalize(path).endsWith(".hbs");
}
function classifyAgentPath(path, hasFrontmatter) {
  if (isAgentTemplatePath(path)) return "template";
  if (isPersonaRootPath(path) && !hasFrontmatter) return "persona";
  return "agent";
}
function enabledAdapters(projectRoot) {
  let manifest;
  try {
    manifest = JSON.parse(
      readFileSync6(join6(projectRoot, PATHS.ONBOARDING_MANIFEST), "utf8")
    );
  } catch {
    return [...ADAPTER_TYPES];
  }
  if (!ADAPTER_TYPES.includes(manifest.adapter)) {
    return [...ADAPTER_TYPES];
  }
  return deriveRecordedProviders({
    ...manifest,
    generated_artifacts: manifest.generated_artifacts ?? []
  });
}
function isPaqadRepository(projectRoot) {
  try {
    const pkg = JSON.parse(readFileSync6(join6(projectRoot, "package.json"), "utf8"));
    return pkg.name === PAQAD_PACKAGE_NAME;
  } catch {
    return false;
  }
}
function readSkillPathContext(projectRoot) {
  return { adapters: enabledAdapters(projectRoot), paqadRepo: isPaqadRepository(projectRoot) };
}

// src/authoring/generated-recipes.ts
var RECIPE_FOLDER_NAMES = [
  "planning-recipe",
  "specification-recipe",
  "development-recipe",
  "review-recipe",
  "documentation-sync-recipe",
  "checks-recipe"
];
var SKILLS_RELATIVE = join7("runtime", "base", "skills");
function recipeRoot(from = fileURLToPath(import.meta.url)) {
  let dir = dirname3(from);
  for (let depth = 0; depth < 6; depth += 1) {
    if (existsSync3(join7(dir, SKILLS_RELATIVE))) return join7(dir, SKILLS_RELATIVE);
    dir = dirname3(dir);
  }
  return null;
}
function isGeneratedRecipeFolder(projectRoot, folder, name) {
  if (!RECIPE_FOLDER_NAMES.includes(name) || folder !== `${OPEN_STANDARD_SKILLS_ROOT}/${name}`) {
    return false;
  }
  const source = recipeRoot();
  if (source === null) return false;
  try {
    return hashFolder(join7(projectRoot, folder)) === hashFolder(join7(source, name));
  } catch {
    return false;
  }
}

// src/health/running-version-check.ts
init_esm_shims();
import { join as join9 } from "path";

// src/onboarding/manifest-writer.ts
init_esm_shims();
import { existsSync as existsSync4, mkdirSync, readFileSync as readFileSync7, writeFileSync as writeFileSync2 } from "fs";
import { homedir as homedir3 } from "os";
import { dirname as dirname4, join as join8, relative, sep } from "path";
function writeProjectProfile2(projectRoot, profile) {
  return writeProjectProfile(projectRoot, profile);
}
function writeDetectionReport(projectRoot, report) {
  const path = join8(projectRoot, PATHS.DETECTION_REPORT);
  mkdirSync(dirname4(path), { recursive: true });
  const sanitized = sanitizeDetectionReport(projectRoot, report);
  writeJsonPreservingTimestamp(path, sanitized, "timestamp");
  return path;
}
function writeFrameworkMetadata(projectRoot, version) {
  mkdirSync(dirname4(join8(projectRoot, PATHS.FRAMEWORK_VERSION)), {
    recursive: true
  });
  writeFrameworkVersionPreservingTimestamp(
    join8(projectRoot, PATHS.FRAMEWORK_VERSION),
    version,
    (/* @__PURE__ */ new Date()).toISOString()
  );
  writeFileSync2(join8(projectRoot, PATHS.FRAMEWORK_PATH), `${resolveFrameworkInstallReference()}
`);
}
function readExistingOnboardingManifest(projectRoot) {
  const path = join8(projectRoot, PATHS.ONBOARDING_MANIFEST);
  if (!existsSync4(path)) {
    return null;
  }
  try {
    return JSON.parse(readFileSync7(path, "utf8"));
  } catch (error) {
    throw new FrameworkError(
      "Project registry corrupted \u2014 the onboarding manifest is not valid JSON. Contact support.",
      {
        code: "REGISTRY_CORRUPTED",
        cause: error,
        details: { manifest_path: PATHS.ONBOARDING_MANIFEST }
      }
    );
  }
}
function writeOnboardingManifest(projectRoot, manifest) {
  const path = join8(projectRoot, PATHS.ONBOARDING_MANIFEST);
  mkdirSync(dirname4(path), { recursive: true });
  const previous = readPreviousJson(path);
  const removedAgents = previous?.removed_stage_agents;
  const sanitized = sanitizeOnboardingManifest(projectRoot, {
    ...manifest,
    ...manifest.removed_stage_agents === void 0 && Array.isArray(removedAgents) ? { removed_stage_agents: removedAgents } : {}
  });
  writeJsonPreservingTimestamp(path, sanitized, ["generated_at", "detected.timestamp"]);
  return path;
}
function writeJsonPreservingTimestamp(path, value, timestampFields) {
  const fields = typeof timestampFields === "string" ? [timestampFields] : timestampFields;
  const previous = readPreviousJson(path);
  if (previous !== null) {
    const candidate = JSON.parse(JSON.stringify(value));
    for (const field of fields) {
      const previousTimestamp = readNestedString(previous, field);
      if (previousTimestamp !== null) {
        writeNestedString(candidate, field, previousTimestamp);
      }
    }
    const candidateJson = `${JSON.stringify(candidate, null, 2)}
`;
    const existing = readFileSync7(path, "utf8");
    if (candidateJson === existing) {
      return;
    }
  }
  writeFileSync2(path, `${JSON.stringify(value, null, 2)}
`);
}
function writeFrameworkVersionPreservingTimestamp(path, version, now) {
  const previous = readPreviousFrameworkVersion(path);
  const timestamp = previous && previous.version === version ? previous.updatedAt : now;
  writeFileSync2(path, `version=${version}
updated_at=${timestamp}
`);
}
function readPreviousJson(path) {
  if (!existsSync4(path)) {
    return null;
  }
  try {
    return JSON.parse(readFileSync7(path, "utf8"));
  } catch {
    return null;
  }
}
function readNestedString(value, path) {
  let current = value;
  for (const segment of path.split(".")) {
    if (!isSafePropertySegment(segment) || !current || typeof current !== "object" || Array.isArray(current) || !Object.hasOwn(current, segment)) {
      return null;
    }
    current = current[segment];
  }
  return typeof current === "string" ? current : null;
}
function writeNestedString(value, path, next) {
  const segments = path.split(".");
  let current = value;
  for (const segment of segments.slice(0, -1)) {
    if (!isSafePropertySegment(segment) || !Object.hasOwn(current, segment)) {
      return;
    }
    const child = current[segment];
    if (!child || typeof child !== "object" || Array.isArray(child)) {
      return;
    }
    current = child;
  }
  const leaf = segments.at(-1);
  if (leaf && isSafePropertySegment(leaf)) {
    Object.defineProperty(current, leaf, {
      value: next,
      enumerable: true,
      configurable: true,
      writable: true
    });
  }
}
function isSafePropertySegment(segment) {
  return segment !== "__proto__" && segment !== "prototype" && segment !== "constructor";
}
function readFrameworkVersion(path) {
  return readPreviousFrameworkVersion(path)?.version ?? null;
}
function readPreviousFrameworkVersion(path) {
  if (!existsSync4(path)) {
    return null;
  }
  try {
    const content = readFileSync7(path, "utf8");
    const versionMatch = content.match(/^version=(.*)$/m);
    const updatedMatch = content.match(/^updated_at=(.*)$/m);
    if (!versionMatch || !updatedMatch) {
      return null;
    }
    return { version: versionMatch[1].trim(), updatedAt: updatedMatch[1].trim() };
  } catch {
    return null;
  }
}
function resolveFrameworkInstallPath() {
  return process.env.PAQAD_FRAMEWORK_HOME ?? toPosixPath(join8(homedir3(), ".paqad-ai/current"));
}
function resolveFrameworkInstallReference() {
  return process.env.PAQAD_FRAMEWORK_HOME ? "$PAQAD_FRAMEWORK_HOME" : "~/.paqad-ai/current";
}
function sanitizeDetectionReport(projectRoot, report) {
  return {
    ...report,
    signals: (report.signals ?? []).map((signal) => ({
      ...signal,
      file: sanitizePersistedPath(projectRoot, signal.file)
    })),
    repository: report.repository ? sanitizeRepositoryContext(projectRoot, report.repository) : void 0
  };
}
function sanitizeOnboardingManifest(projectRoot, manifest) {
  return {
    ...manifest,
    project_root: typeof manifest.project_root === "string" ? sanitizePersistedPath(projectRoot, manifest.project_root) : manifest.project_root,
    detected: manifest.detected ? sanitizeDetectionReport(projectRoot, manifest.detected) : null,
    repository: manifest.repository ? sanitizeRepositoryContext(projectRoot, manifest.repository) : void 0,
    generated_artifacts: [...manifest.generated_artifacts ?? []].map((artifact) => ({
      ...artifact,
      path: sanitizePersistedPath(projectRoot, artifact.path)
    })).sort((left, right) => comparePaths(left.path, right.path)),
    planning_artifacts: manifest.planning_artifacts ? {
      ...manifest.planning_artifacts,
      compiled_rules_path: sanitizePersistedPath(
        projectRoot,
        manifest.planning_artifacts.compiled_rules_path
      )
    } : manifest.planning_artifacts
  };
}
function sanitizeStackSnapshotRepository(projectRoot, snapshot) {
  if (!snapshot.repository) return snapshot;
  return { ...snapshot, repository: sanitizeRepositoryContext(projectRoot, snapshot.repository) };
}
function sanitizeRepositoryContext(projectRoot, repository) {
  return {
    ...repository,
    selected_root: sanitizePersistedPath(projectRoot, repository.selected_root),
    ignored_paths: repository.ignored_paths.map((path) => sanitizePersistedPath(projectRoot, path)).filter((path) => !isDeveloperLocalNoise(path)).sort(comparePaths),
    projects: repository.projects.map((project) => sanitizeRepositoryProject(projectRoot, project)),
    applications: repository.applications.map(
      (application) => sanitizeRepositoryApplication(projectRoot, application)
    ),
    primary_project_root: repository.primary_project_root === null ? null : sanitizePersistedPath(projectRoot, repository.primary_project_root)
  };
}
var DEVELOPER_LOCAL_PATH_SEGMENTS = /* @__PURE__ */ new Set([".DS_Store", ".idea", ".vscode"]);
function isDeveloperLocalNoise(path) {
  return toPosixPath(path).split("/").some((segment) => DEVELOPER_LOCAL_PATH_SEGMENTS.has(segment));
}
function comparePaths(left, right) {
  return left < right ? -1 : left > right ? 1 : 0;
}
function sanitizeRepositoryProject(projectRoot, project) {
  return {
    ...project,
    root: sanitizePersistedPath(projectRoot, project.root),
    parent_root: project.parent_root === null ? null : sanitizePersistedPath(projectRoot, project.parent_root)
  };
}
function sanitizeRepositoryApplication(projectRoot, application) {
  return {
    ...application,
    root: sanitizePersistedPath(projectRoot, application.root),
    component_roots: application.component_roots.map(
      (root) => sanitizePersistedPath(projectRoot, root)
    )
  };
}
function sanitizePersistedPath(projectRoot, value) {
  if (value === ".") {
    return value;
  }
  const normalizedValue = toPosixPath(value);
  const normalizedRoot = toPosixPath(projectRoot);
  if (normalizedValue === normalizedRoot) {
    return ".";
  }
  const prefix = normalizedRoot.endsWith("/") ? normalizedRoot : `${normalizedRoot}/`;
  if (normalizedValue.startsWith(prefix)) {
    return normalizedValue.slice(prefix.length);
  }
  const isAbsoluteWindows = /^[a-zA-Z]:\//.test(normalizedValue);
  const isAbsolutePosix = normalizedValue.startsWith("/");
  if (!isAbsoluteWindows && !isAbsolutePosix) {
    return normalizedValue;
  }
  const relativePath = relative(projectRoot, value);
  if (relativePath === "") {
    return ".";
  }
  if (relativePath !== ".." && !relativePath.startsWith(`..${sep}`)) {
    return toPosixPath(relativePath);
  }
  return normalizedValue;
}

// src/health/running-version-check.ts
var PLUGIN_BINARY_PATH = /\/plugins\/(?:cache|marketplaces)\//u;
var RELEASED_VERSION = /^\d+\.\d+\.\d+/u;
var NPM_UPDATE_COMMAND = "npm i -g paqad-ai@latest";
var PLUGIN_UPDATE_COMMAND = `claude plugin update ${PLUGIN_ID}`;
function runningFromPlugin(packageRoot = getPackageRoot()) {
  return PLUGIN_BINARY_PATH.test(`${packageRoot.replaceAll("\\", "/")}/`);
}
function updateAdvice(packageRoot) {
  return runningFromPlugin(packageRoot) ? `Run ${PLUGIN_UPDATE_COMMAND}, then start a new session, because this session's PATH still points at the old one.` : `Run ${NPM_UPDATE_COMMAND}.`;
}
function runningVersionHealth(projectRoot, options = {}) {
  const running = options.running ?? "1.124.0";
  const repo = readFrameworkVersion(join9(projectRoot, PATHS.FRAMEWORK_VERSION));
  const repoCore = repo === null ? void 0 : RELEASED_VERSION.exec(repo)?.[0];
  if (repoCore === void 0 || versionAtLeast(running, repoCore)) return [];
  const advice = updateAdvice(options.packageRoot ?? getPackageRoot());
  return [
    {
      name: "paqad-ai version",
      status: "warning",
      detail: `This paqad-ai is ${running}, but this repo was last updated with ${repo} on this machine. ${advice}`,
      remediation: advice
    }
  ];
}

// src/stage-isolation/recipes.ts
var RECIPE_BUDGET_CHARS = 9700;
var RECIPE_BY_STAGE = {
  planning: "planning-recipe",
  specification: "specification-recipe",
  development: "development-recipe",
  review: "review-recipe",
  documentation_sync: "documentation-sync-recipe",
  checks: "checks-recipe"
};
var RECIPE_SCRIPT = {
  "planning-recipe": "check-plan.mjs",
  "specification-recipe": "check-spec.mjs",
  "development-recipe": "check-ac-map.mjs",
  "review-recipe": "lint-findings.mjs",
  "documentation-sync-recipe": "stale-docs.mjs"
};
var RECIPE_NAMES = RECIPE_FOLDER_NAMES;
function recipeRepairAdvice(packageRoot = getPackageRoot()) {
  return runningFromPlugin(packageRoot) ? `\`paqad-ai update\` cannot restore it on the plugin, so run \`${PLUGIN_UPDATE_COMMAND}\`; if that says it is already at the latest version, run \`claude plugin uninstall ${PLUGIN_ID}\` and then \`claude plugin install ${PLUGIN_ID}\`; then start a new session` : `run \`${NPM_UPDATE_COMMAND}\`, then \`paqad-ai update\``;
}
function recipeNameForStage(stage) {
  return RECIPE_BY_STAGE[stage] ?? null;
}
function recipeHasScript(stage) {
  const name = recipeNameForStage(stage);
  return name !== null && RECIPE_SCRIPT[name] !== void 0;
}
function resolveRecipe(stage, root = recipeRoot()) {
  const name = recipeNameForStage(stage);
  if (name === null) throw new Error(`no recipe for stage ${stage}`);
  if (root === null) throw new Error(`the ${name} recipe is missing; ${recipeRepairAdvice()}`);
  const bodyPath = join10(root, name, "SKILL.md");
  let text;
  try {
    text = readFileSync8(bodyPath, "utf8");
  } catch {
    throw new Error(`the ${name} recipe is missing; ${recipeRepairAdvice()}`);
  }
  const scriptName = RECIPE_SCRIPT[name] ?? null;
  const scriptPath = scriptName === null ? null : join10(root, name, "scripts", scriptName);
  return {
    name,
    root,
    bodyPath,
    body: splitFrontMatter(text).body.trim(),
    scriptName,
    scriptPath
  };
}
var RECIPE_HEADING = "## Your recipe";
function fitRecipe(briefChars, recipe, limit = RECIPE_BUDGET_CHARS) {
  const whole = `${RECIPE_HEADING}

${recipe.body}`;
  const room = limit - briefChars - 2;
  if (whole.length <= room) {
    return { text: whole, hash: sha256Hex(whole), truncated: false };
  }
  const pointer = `

The rest of this recipe is at \`${recipe.bodyPath}\`. Read it.`;
  if (`${RECIPE_HEADING}${pointer}`.length > room) return null;
  const lines = whole.split("\n");
  let kept = lines.length;
  while (kept > 1 && `${lines.slice(0, kept).join("\n")}${pointer}`.length > room) kept -= 1;
  const text = `${lines.slice(0, kept).join("\n")}${pointer}`;
  return { text, hash: sha256Hex(text), truncated: true };
}

// src/stage-isolation/agent-writer.ts
var STAGE_AGENT_HOSTS = AGENT_HOST_TARGETS;
var STAGE_AGENT_MARKER = "<!-- paqad-ai managed agent: paqad rewrites this file, so edits here are lost -->";
function withManagedMarker(content) {
  const close = content.startsWith("---\n") ? content.indexOf("\n---\n", 4) : -1;
  if (close < 0) return `${STAGE_AGENT_MARKER}
${content}`;
  const end = close + "\n---\n".length;
  return `${content.slice(0, end)}${STAGE_AGENT_MARKER}
${content.slice(end)}`;
}
var CLAUDE_CODE_ADAPTER = "claude-code";
function agentContext(def, setting, adapter) {
  return {
    agentName: def.agentName,
    description: def.description,
    tools: def.claudeTools,
    maxTurns: def.maxTurns,
    model: setting.model,
    effort: setting.effort === "inherit" ? void 0 : setting.effort,
    omitClaudeMd: adapter === CLAUDE_CODE_ADAPTER,
    body: buildStageAgentBody(def, adapter),
    recipe: recipeNameForStage(def.ledgerStage)
  };
}
function highTableAgentContext(def) {
  return {
    agentName: def.agentName,
    description: def.description,
    tools: def.claudeTools,
    maxTurns: def.maxTurns,
    model: "inherit",
    body: buildHighTableAgentBody(def)
  };
}
function allAgentContexts(adapter, settings = resolveStageAgentSettings()) {
  return [
    ...MANDATORY_STAGE_AGENTS.map((def) => ({
      agentName: def.agentName,
      context: agentContext(def, settings[def.ledgerStage], adapter)
    })),
    ...HIGH_TABLE_AGENTS.map((def) => ({
      agentName: def.agentName,
      context: highTableAgentContext(def)
    }))
  ];
}
function renderHostAgents(host, settings) {
  return allAgentContexts(host.adapter, settings).map(({ agentName, context }) => ({
    name: `${agentName}.${host.extension}`,
    content: renderAgentTemplate(host, context)
  }));
}
function renderStageAgentFiles(adapter, settings) {
  const host = STAGE_AGENT_HOSTS.find((candidate) => candidate.adapter === adapter);
  if (!host) {
    throw new Error(`no stage-agent host configured for "${adapter}"`);
  }
  return renderHostAgents(host, settings);
}
function writeStageAgents(options = {}) {
  const home = options.homeDir ?? homedir4();
  const written = [];
  for (const host of STAGE_AGENT_HOSTS) {
    const claude = host.adapter === CLAUDE_CODE_ADAPTER;
    if (claude && options.pluginInstalled === true) continue;
    const dir = join11(home, host.agentsSubdir);
    mkdirSync2(dir, { recursive: true });
    for (const { name, content } of renderHostAgents(host)) {
      const filePath = join11(dir, name);
      writeFileSync3(filePath, claude ? withManagedMarker(content) : content, "utf8");
      written.push(toPosixPath(filePath));
    }
  }
  return written;
}
function renderClaudePluginStageAgents() {
  return renderStageAgentFiles(CLAUDE_CODE_ADAPTER);
}

// src/onboarding/stage-agent-past-bodies.ts
init_esm_shims();
var PAST_RELEASE_STAGE_AGENT_BODY_HASHES = [
  "a5532c11d9ee6e7dc710ce27548f0b08b83be0fc6eb59257ae50b5da4e8a236b",
  "ad12cde2f720a84e1aba546296edd7631cc30d09394a08990321024b11db6c0a",
  "5a2b1ea4a771f918d0697afd41568d8134c68d521fa27447f27c2361d513559d",
  "36c1cd9941b56b1af602104323083653bb4b0f954e8f66372877db94b92c268c",
  "c0b11310bd12034f459e7e7e66c62bf295a6c24f1db64ae1186d84ae0f88e374",
  "d0c445325b8ea0140812c4e47dfa5449c3a3966239fe01432f56a946723a99c9",
  "f57d894775ed06612eccee5aa24527ee79b424c00bcc6b9d37ef744c041124f5",
  "b81282fc6d1c258125bae8d02e9c0e578bf59ba6ea8cfe38743e11f41acca2d1"
];

// src/onboarding/stage-agent-migration.ts
var PROJECT_AGENTS_DIR = ".claude/agents";
var LEGACY_STAMP = /^<!-- written by paqad-ai \S+ -->$/u;
var STAGE_AGENT_FILE = /^paqad-[a-z0-9-]+\.md$/u;
function bodyStart(lines) {
  if (lines[0] !== "---") return 0;
  const close = lines.indexOf("---", 1);
  return close < 0 ? 0 : close + 1;
}
function carriesManagedMarker(content) {
  const lines = content.split("\n");
  return lines[0] === STAGE_AGENT_MARKER || lines[bodyStart(lines)] === STAGE_AGENT_MARKER;
}
function stripLegacyStamp(content) {
  const lines = content.trimEnd().split("\n");
  if (!LEGACY_STAMP.test(lines[lines.length - 1] ?? "")) return null;
  return lines.slice(0, -1).join("\n");
}
function stageAgentBodyHash(body) {
  return createHash2("sha256").update(body.trimEnd()).digest("hex");
}
function knownGeneratedBodies() {
  const hashes = new Set(PAST_RELEASE_STAGE_AGENT_BODY_HASHES);
  for (const { content } of renderStageAgentFiles("claude-code")) {
    hashes.add(stageAgentBodyHash(content));
    hashes.add(stageAgentBodyHash(withManagedMarker(content)));
  }
  return hashes;
}
function removalReason(content, known) {
  if (carriesManagedMarker(content)) return "managed-marker";
  const unstamped = stripLegacyStamp(content);
  if (unstamped !== null) return known.has(stageAgentBodyHash(unstamped)) ? "legacy-stamp" : null;
  if (known.has(stageAgentBodyHash(content))) return "generated-body";
  return null;
}
function migrateProjectStageAgents(projectRoot, known = knownGeneratedBodies()) {
  const result = { removed: [], kept: [] };
  const dir = join12(projectRoot, PROJECT_AGENTS_DIR);
  let entries;
  try {
    entries = readdirSync2(dir, { withFileTypes: true }).filter(
      (entry) => STAGE_AGENT_FILE.test(entry.name)
    );
  } catch {
    return result;
  }
  const removed = [];
  for (const entry of entries.sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)) {
    const name = entry.name;
    const rel = `${PROJECT_AGENTS_DIR}/${name}`;
    if (!entry.isFile()) {
      result.kept.push(rel);
      continue;
    }
    let content;
    try {
      content = readFileSync9(join12(dir, name), "utf8");
    } catch {
      continue;
    }
    const reason = removalReason(content, known);
    if (reason === null) {
      result.kept.push(rel);
      continue;
    }
    rmSync2(join12(dir, name), { force: true });
    result.removed.push(rel);
    removed.push({ path: rel, reason });
  }
  if (removed.length > 0) recordRemovedStageAgents(projectRoot, removed);
  return result;
}
function isGeneratedProjectStageAgent(path, content) {
  const name = path.replaceAll("\\", "/").split("/").pop();
  return renderStageAgentFiles("claude-code").some(
    (agent) => agent.name === name && withManagedMarker(agent.content) === content
  );
}
function noFollowFlag() {
  return constants2.O_NOFOLLOW ?? 0;
}
function createAgentFile(target, wanted) {
  let fd;
  try {
    fd = openSync2(
      target,
      constants2.O_WRONLY | constants2.O_CREAT | constants2.O_EXCL | noFollowFlag()
    );
  } catch {
    return "kept";
  }
  try {
    writeSync(fd, wanted, 0, "utf8");
  } finally {
    closeSync2(fd);
  }
  return "written";
}
function syncAgentFile(target, wanted, known) {
  let fd;
  try {
    fd = openSync2(target, constants2.O_RDWR | noFollowFlag());
  } catch (error) {
    if (error.code === "ENOENT") return createAgentFile(target, wanted);
    return "kept";
  }
  try {
    if (!fstatSync2(fd).isFile() || lstatSync2(target).isSymbolicLink()) return "kept";
    const existing = readFileSync9(fd, "utf8");
    if (existing === wanted) return "same";
    if (removalReason(existing, known) === null) return "kept";
    ftruncateSync(fd, 0);
    writeSync(fd, wanted, 0, "utf8");
    return "written";
  } finally {
    closeSync2(fd);
  }
}
function syncProjectStageAgents(projectRoot, known = knownGeneratedBodies()) {
  const result = { written: [], kept: [] };
  const dir = join12(projectRoot, PROJECT_AGENTS_DIR);
  mkdirSync3(dir, { recursive: true });
  for (const { name, content } of renderStageAgentFiles("claude-code")) {
    const rel = `${PROJECT_AGENTS_DIR}/${name}`;
    const outcome = syncAgentFile(join12(dir, name), withManagedMarker(content), known);
    if (outcome === "written") result.written.push(rel);
    if (outcome === "kept") result.kept.push(rel);
  }
  return result;
}
function recordRemovedStageAgents(projectRoot, removed) {
  const path = join12(projectRoot, PATHS.ONBOARDING_MANIFEST);
  let manifest;
  try {
    manifest = JSON.parse(readFileSync9(path, "utf8"));
  } catch {
    return;
  }
  const prior = Array.isArray(manifest.removed_stage_agents) ? manifest.removed_stage_agents : [];
  const byPath = new Map(prior.map((entry) => [entry.path, entry]));
  for (const entry of removed) byPath.set(entry.path, entry);
  manifest.removed_stage_agents = [...byPath.values()].sort((a, b) => a.path.localeCompare(b.path));
  writeFileSync4(path, `${JSON.stringify(manifest, null, 2)}
`, "utf8");
}

// src/adapters/claude/team-setup.ts
var TEAM_LAUNCHER_PATH = ".paqad/hook.mjs";
var LAUNCHER_STAMP = /LAUNCHER_REVISION = (\S+?);/u;
function renderTeamLauncher() {
  return readFileSync10(join13(getRuntimeTemplatesRoot(), "team-bootstrap", "hook.mjs"), "utf8");
}
function teamOwnedFiles() {
  return [{ path: TEAM_LAUNCHER_PATH, content: renderTeamLauncher(), stamp: LAUNCHER_STAMP }];
}
function readIfPresent(path) {
  try {
    return readFileSync10(path, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}
function revisionOf(text, stamp) {
  return stamp.exec(text)?.[1];
}
function isNewerStamp(existing, file) {
  return isHigherStamp(
    revisionOf(existing, file.stamp),
    parseStampInteger(revisionOf(file.content, file.stamp)) ?? 0
  );
}
function sameContent(existing, content) {
  return existing.replace(/\r\n/gu, "\n") === content.replace(/\r\n/gu, "\n");
}
function syncOwnedFile(projectRoot, file, enabled, report) {
  const target = join13(projectRoot, file.path);
  const existing = readIfPresent(target);
  if (!enabled) {
    if (existing === null) return;
    if (sameContent(existing, file.content)) {
      rmSync3(target, { force: true });
      report.removed.push(file.path);
    } else {
      report.kept.push(file.path);
    }
    return;
  }
  if (existing !== null && sameContent(existing, file.content)) return;
  if (existing !== null && isNewerStamp(existing, file)) {
    report.kept.push(file.path);
    return;
  }
  mkdirSync4(dirname5(target), { recursive: true });
  writeFileSync5(target, file.content, "utf8");
  report.written.push(file.path);
}
function syncTeamSetup(projectRoot, env = process.env) {
  const enabled = resolveTeamBootstrapEnabled(projectRoot, env);
  const report = { enabled, written: [], removed: [], kept: [] };
  for (const file of teamOwnedFiles()) {
    syncOwnedFile(projectRoot, file, enabled, report);
  }
  if (enabled) {
    const agents2 = syncProjectStageAgents(projectRoot);
    report.written.push(...agents2.written);
    report.kept.push(...agents2.kept);
    report.handEditedAgents = agents2.kept;
    return report;
  }
  const agents = migrateProjectStageAgents(projectRoot);
  report.removed.push(...agents.removed);
  report.kept.push(...agents.kept);
  report.handEditedAgents = agents.kept;
  return report;
}
var CLAUDE_GITIGNORE_FILE = ".claude/.gitignore";
function settingsCarryTeamSetup(projectRoot) {
  const raw = readIfPresent(join13(projectRoot, CLAUDE_SETTINGS_FILE));
  if (raw === null) return false;
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return false;
  }
  const enabled = parsed?.enabledPlugins;
  return raw.includes(TEAM_LAUNCHER_MARK) && (enabled?.[PLUGIN_ID] !== void 0 || teamSetsInstallModeSettings(projectRoot));
}
function teamSetupMissing(projectRoot) {
  return !settingsCarryTeamSetup(projectRoot) || teamOwnedFiles().some((file) => readIfPresent(join13(projectRoot, file.path)) === null);
}
function teamTrackedPaths() {
  return [CLAUDE_SETTINGS_FILE, CLAUDE_GITIGNORE_FILE, TEAM_LAUNCHER_PATH, PROJECT_AGENTS_DIR];
}
var STAGE_AGENT_PATH = /^\.claude\/agents\/paqad-[a-z0-9-]+\.md$/u;
function isTeamPath(path) {
  return path === CLAUDE_SETTINGS_FILE || path === CLAUDE_GITIGNORE_FILE || path === TEAM_LAUNCHER_PATH || STAGE_AGENT_PATH.test(path);
}
function teamFilesToCommit(projectRoot, report) {
  if (!report.enabled) return [];
  const pending = gitPendingPaths(projectRoot, teamTrackedPaths());
  if (pending === null) return [...report.written].sort();
  const handEdited = new Set(report.handEditedAgents ?? []);
  return pending.filter((path) => isTeamPath(path) && !handEdited.has(path));
}
var SHARED_SETTINGS_NOTE = "`.claude/settings.json` is now shared with your team, so review and commit it; anything personal it held now lives in the git-ignored `.claude/settings.local.json`.";
function teamSetupNotes(projectRoot, report) {
  const notes = [];
  if (report.enabled && readIfPresent(join13(projectRoot, CLAUDE_SETTINGS_FILE)) !== null && !isGitTracked(projectRoot, CLAUDE_SETTINGS_FILE)) {
    notes.push(SHARED_SETTINGS_NOTE);
  }
  const toCommit = teamFilesToCommit(projectRoot, report);
  if (toCommit.length > 0) {
    notes.push(
      `Commit these team setup files together so teammates and cloud sessions get paqad: ${toCommit.join(", ")}.`
    );
  }
  const handEdited = new Set(report.handEditedAgents ?? []);
  const removedAgents = report.removed.filter((path) => path.startsWith(".claude/agents/"));
  if (removedAgents.length > 0) {
    notes.push(
      `Removed the old paqad stage agents from .claude/agents, because team setup is off and the paqad plugin provides them; commit the removals: ${removedAgents.join(", ")}.`
    );
  }
  if (handEdited.size > 0) {
    notes.push(
      `Kept these .claude/agents files because they do not match what paqad wrote; check them and delete any you no longer need: ${[...handEdited].join(", ")}.`
    );
  }
  const keptOther = report.kept.filter((path) => !handEdited.has(path));
  if (keptOther.length > 0) {
    notes.push(
      `Left alone because they were edited by hand or written by a newer paqad: ${keptOther.join(", ")}.`
    );
  }
  return notes;
}

// src/adapters/claude/claude-adapter.ts
var LEGACY_HOOK_COMMANDS = new Set(
  [
    "agent-entry-gate.sh",
    "agent-entry-prompt-gate.sh",
    "agent-entry-session-start.sh",
    "decision-pause-gate.sh",
    "silent-update.sh",
    "silent-update.mjs",
    "rule-script-enforce.mjs",
    "verification-completion.mjs",
    "verification-record.mjs"
  ].map((file) => `${PAQAD_RUNTIME_PREFIX}/hooks/${file}`)
);
var RETIRED_HOOK_FILES = ["rule-script-enforce.mjs"];
var ClaudeCodeAdapter = class extends BaseAdapter {
  type = "claude-code";
  configTemplateName() {
    return "claude.md.hbs";
  }
  configOutputPath() {
    return "CLAUDE.md";
  }
  skillsRoot() {
    return ".claude/skills";
  }
  agentsRoot() {
    return ".claude/agents";
  }
  hooksOutputPath() {
    return ".claude/settings.hooks.json";
  }
  mcpOutputPath() {
    return ".mcp.json";
  }
  cacheOutputPath() {
    return ".claude/cache.json";
  }
  memoryOutputPath() {
    return ".claude/memory.json";
  }
  claudeGitignore(projectRoot, env) {
    const names = ["settings.hooks.json", "settings.local.json"];
    if (!resolveTeamBootstrapEnabled(projectRoot, env) && !isGitTracked(projectRoot, CLAUDE_SETTINGS_FILE)) {
      names.push("settings.json");
    }
    return this.renderHostGitignore(names);
  }
  async generateConfig(context) {
    const base = await super.generateConfig(context);
    return [...base, ...this.hostSettingsFiles(context.projectRoot)];
  }
  hostSettingsFiles(projectRoot, env = process.env) {
    return [this.claudeGitignore(projectRoot, env), ...buildClaudeSettings(projectRoot, env)];
  }
  joinSettingsFiles(projectRoot, env = process.env) {
    if (resolveTeamBootstrapEnabled(projectRoot, env) && !existsSync5(join14(projectRoot, TEAM_LAUNCHER_PATH))) {
      return [planMachineOnlySettings(claudeSettingsOptions(projectRoot, env))];
    }
    return this.hostSettingsFiles(projectRoot, env);
  }
  syncTeamSetup(projectRoot, env = process.env) {
    const report = syncTeamSetup(projectRoot, env);
    return { report, notes: teamSetupNotes(projectRoot, report) };
  }
};
var PLUGIN_PATH_MARKERS = ["/plugins/cache/", "/plugins/data/"];
function isUnderPluginPath(path) {
  if (typeof path !== "string" || path.length === 0) {
    return false;
  }
  const posix = path.replace(/\\/g, "/");
  return PLUGIN_PATH_MARKERS.some((marker) => posix.includes(marker));
}
function isRunningUnderPlugin(env, signals = { runtimeRoot: getRuntimeRoot(), cliEntry: process.argv[1] }) {
  const pluginRoot = env.CLAUDE_PLUGIN_ROOT;
  if (typeof pluginRoot === "string" && pluginRoot.length > 0) {
    return true;
  }
  return isUnderPluginPath(signals.runtimeRoot) || isUnderPluginPath(signals.cliEntry);
}
function claudeSettingsOptions(projectRoot, env) {
  return {
    projectRoot,
    env,
    npmChain: isRunningUnderPlugin(env) ? [] : buildFullHookChain("claude-code", env),
    pruneExact: LEGACY_HOOK_COMMANDS,
    pruneBasenames: RETIRED_HOOK_FILES,
    transform: (merged) => mergeAttribution(merged, projectRoot)
  };
}
function buildClaudeSettings(projectRoot, env = process.env) {
  return planClaudeSettings(claudeSettingsOptions(projectRoot, env)).files;
}
function mergeAttribution(settings, projectRoot) {
  if (!shouldStripAiAttribution(projectRoot)) {
    return settings;
  }
  const next = { ...settings };
  const current = next.attribution && typeof next.attribution === "object" ? next.attribution : {};
  next.attribution = {
    commit: current.commit ?? "",
    pr: current.pr ?? "",
    sessionUrl: current.sessionUrl ?? false,
    ...Object.fromEntries(
      Object.entries(current).filter(([key]) => !["commit", "pr", "sessionUrl"].includes(key))
    )
  };
  return next;
}

// src/adapters/factory.ts
function assertUnreachableAdapter(type) {
  throw new Error(`Unsupported adapter type: ${String(type)}`);
}
var AdapterFactory = class {
  static create(type) {
    switch (type) {
      case "claude-code":
        return new ClaudeCodeAdapter();
      case "codex-cli":
        return new CodexCliAdapter();
      case "antigravity":
        return new AntigravityAdapter();
      case "gemini-cli":
        return new GeminiCliAdapter();
      case "junie":
        return new JunieAdapter();
      case "cursor":
        return new CursorAdapter();
      case "github-copilot":
        return new GithubCopilotAdapter();
      case "windsurf":
        return new WindsurfAdapter();
      case "continue":
        return new ContinueAdapter();
      case "aider":
        return new AiderAdapter();
      case "aiassistant":
        return new AiAssistantAdapter();
      default:
        return assertUnreachableAdapter(type);
    }
  }
};

export {
  PAQAD_HOOK_EVENT_ORDER,
  PAQAD_RUNTIME_PREFIX,
  PLUGIN_RUNTIME_ROOT,
  PLUGIN_SESSION_START_HOOK,
  PAQAD_MUTATING_TOOL_MATCHER,
  PAQAD_STAGE_AGENT_MATCHER,
  PAQAD_STAGE_HELPER_MATCHER,
  PAQAD_SKILL_READ_MATCHER,
  PAQAD_AGENT_TOOL_MATCHER,
  PAQAD_ANY_SUBAGENT_MATCHER,
  PAQAD_BASH_TOOL_MATCHER,
  PAQAD_HANDBACK_TOOL_MATCHER,
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
  hasPreMutationBlock,
  TemplateEngine,
  buildFrameworkFallbackClause,
  BaseAdapter,
  AiAssistantAdapter,
  resolveFlooredMode,
  resolveAiAttributionMode,
  shouldStripAiAttribution,
  AiderAdapter,
  AntigravityAdapter,
  isGitIgnored,
  mergeNativeHooks,
  PLUGIN_MARKETPLACE_REPO,
  PLUGIN_MARKETPLACE_KEY,
  pluginSettingsKeys,
  isMissingPathError,
  openIfPresent,
  readTextIfPresent,
  readBytesIfPresent,
  readRegularFile,
  writeFileAtomic,
  listFolderFiles,
  regularFiles,
  hashFiles,
  hashFolder,
  hashText,
  withoutDescription,
  hashFolderWithoutDescription,
  withDescription,
  hashAgentText,
  hashAgentFile,
  CodexCliAdapter,
  ContinueAdapter,
  CursorAdapter,
  GeminiCliAdapter,
  GithubCopilotAdapter,
  JunieAdapter,
  WindsurfAdapter,
  AdapterFactory,
  deriveRecordedProviders,
  OPEN_STANDARD_SKILLS_ROOT,
  SKILL_FILE,
  PAQAD_REPO_AGENT_ROOTS,
  skillRoots,
  skillFolderOf,
  findSkillPaths,
  agentRoots,
  agentNameOf,
  findAgentPaths,
  isAgentTemplatePath,
  classifyAgentPath,
  enabledAdapters,
  isPaqadRepository,
  readSkillPathContext,
  recipeRoot,
  isGeneratedRecipeFolder,
  writeProjectProfile2 as writeProjectProfile,
  writeDetectionReport,
  writeFrameworkMetadata,
  readExistingOnboardingManifest,
  writeOnboardingManifest,
  writeJsonPreservingTimestamp,
  writeFrameworkVersionPreservingTimestamp,
  readFrameworkVersion,
  resolveFrameworkInstallPath,
  sanitizeStackSnapshotRepository,
  runningVersionHealth,
  RECIPE_BUDGET_CHARS,
  RECIPE_NAMES,
  recipeRepairAdvice,
  recipeHasScript,
  resolveRecipe,
  RECIPE_HEADING,
  fitRecipe,
  STAGE_AGENT_HOSTS,
  renderStageAgentFiles,
  writeStageAgents,
  renderClaudePluginStageAgents,
  PROJECT_AGENTS_DIR,
  carriesManagedMarker,
  isGeneratedProjectStageAgent,
  teamSetupMissing,
  ClaudeCodeAdapter,
  isUnderPluginPath,
  isRunningUnderPlugin
};
