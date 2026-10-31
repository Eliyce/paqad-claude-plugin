import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  require_lib
} from "./chunk-4AC2MZIT.js";
import {
  getRuntimeTemplatesRoot
} from "./chunk-VVRAO2BK.js";
import {
  toPosixPath
} from "./chunk-4K4CM3QN.js";
import {
  HIGH_TABLE_AGENTS,
  MANDATORY_STAGE_AGENTS,
  buildHighTableAgentBody,
  buildStageAgentBody,
  resolveStageAgentSettings
} from "./chunk-FY3IONGX.js";
import {
  __toESM,
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/stage-isolation/agent-writer.ts
init_esm_shims();
var import_handlebars = __toESM(require_lib(), 1);
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";
var STAGE_AGENT_HOSTS = [
  {
    adapter: "claude-code",
    agentsSubdir: ".claude/agents",
    extension: "md",
    template: "claude.md.hbs"
  },
  {
    adapter: "codex-cli",
    agentsSubdir: ".codex/agents",
    extension: "toml",
    template: "codex.toml.hbs"
  }
];
var CLAUDE_CODE_ADAPTER = "claude-code";
function agentContext(def, setting, adapter) {
  return {
    agentName: def.agentName,
    description: `paqad feature-development stage: ${def.ledgerStage}. Dispatched by the paqad orchestrator only.`,
    tools: def.claudeTools,
    model: setting.model,
    effort: setting.effort === "inherit" ? void 0 : setting.effort,
    omitClaudeMd: adapter === CLAUDE_CODE_ADAPTER,
    body: buildStageAgentBody(def, adapter)
  };
}
function highTableAgentContext(def) {
  return {
    agentName: def.agentName,
    description: def.description,
    tools: def.claudeTools,
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
  const templateSource = readFileSync(
    join(getRuntimeTemplatesRoot(), "stage-agents", host.template),
    "utf8"
  );
  const template = import_handlebars.default.compile(templateSource);
  return allAgentContexts(host.adapter, settings).map(({ agentName, context }) => ({
    name: `${agentName}.${host.extension}`,
    content: template(context)
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
  const home = options.homeDir ?? homedir();
  const written = [];
  for (const host of STAGE_AGENT_HOSTS) {
    const dir = join(home, host.agentsSubdir);
    mkdirSync(dir, { recursive: true });
    for (const { name, content } of renderHostAgents(host)) {
      const filePath = join(dir, name);
      writeFileSync(filePath, content, "utf8");
      written.push(toPosixPath(filePath));
    }
  }
  return written;
}
function renderClaudePluginStageAgents() {
  return renderStageAgentFiles(CLAUDE_CODE_ADAPTER);
}

export {
  STAGE_AGENT_HOSTS,
  writeStageAgents,
  renderClaudePluginStageAgents
};
