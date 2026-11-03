import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  buildHostHookChain,
  completionRecordCommand
} from "./chunk-Q6XU7C36.js";
import {
  toPosixPath
} from "./chunk-4K4CM3QN.js";
import {
  AGENT_HOST_TARGETS,
  HIGH_TABLE_AGENTS,
  MANDATORY_STAGE_AGENTS,
  buildHighTableAgentBody,
  buildStageAgentBody,
  renderAgentTemplate
} from "./chunk-Y6DIETW6.js";
import {
  resolveStageAgentSettings
} from "./chunk-OMCZ7AVM.js";
import {
  join
} from "./chunk-3STC3IVL.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/adapters/shared/native-hook-config.ts
init_esm_shims();
import { readFileSync } from "fs";
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
    raw = readFileSync(path, "utf8");
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

// src/stage-isolation/agent-writer.ts
init_esm_shims();
import { mkdirSync, writeFileSync } from "fs";
import { homedir } from "os";
import { join as join2 } from "path";
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
    body: buildStageAgentBody(def, adapter)
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
  const home = options.homeDir ?? homedir();
  const written = [];
  for (const host of STAGE_AGENT_HOSTS) {
    const claude = host.adapter === CLAUDE_CODE_ADAPTER;
    if (claude && options.pluginInstalled === true) continue;
    const dir = join2(home, host.agentsSubdir);
    mkdirSync(dir, { recursive: true });
    for (const { name, content } of renderHostAgents(host)) {
      const filePath = join2(dir, name);
      writeFileSync(filePath, claude ? withManagedMarker(content) : content, "utf8");
      written.push(toPosixPath(filePath));
    }
  }
  return written;
}
function renderClaudePluginStageAgents() {
  return renderStageAgentFiles(CLAUDE_CODE_ADAPTER);
}

export {
  mergeNativeHooks,
  buildNativeHookConfigFile,
  buildNativeCompletionHookFile,
  buildFullHookChain,
  STAGE_AGENT_HOSTS,
  STAGE_AGENT_MARKER,
  withManagedMarker,
  renderStageAgentFiles,
  writeStageAgents,
  renderClaudePluginStageAgents
};
