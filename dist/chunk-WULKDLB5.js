import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  buildHostHookChain,
  completionRecordCommand
} from "./chunk-PWJ37K7H.js";
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

export {
  mergeNativeHooks,
  buildNativeHookConfigFile,
  buildNativeCompletionHookFile,
  buildFullHookChain
};
