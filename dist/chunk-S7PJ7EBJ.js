import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  hudLastBlockPath,
  writeFileAtomic
} from "./chunk-4UDYC65U.js";
import {
  toProjectRelativePath
} from "./chunk-Y2ZLYYTT.js";
import {
  configSaysPaqadDisabled,
  setConfigValue
} from "./chunk-UOZGCZD7.js";
import {
  PATHS
} from "./chunk-BNIV2KZF.js";
import {
  init_esm_shims
} from "./chunk-IDFRWBMN.js";

// src/core/framework-enabled.ts
init_esm_shims();
import { existsSync } from "fs";
import { join } from "path";
var ENV_TRUTHY = /* @__PURE__ */ new Set(["1", "true", "yes", "on"]);
function isEnvDisabled(env = process.env) {
  const raw = env.PAQAD_DISABLED;
  return typeof raw === "string" && ENV_TRUTHY.has(raw.trim().toLowerCase());
}
function isManagedEnv(env = process.env) {
  const raw = env.PAQAD_MANAGED;
  return typeof raw === "string" && ENV_TRUTHY.has(raw.trim().toLowerCase());
}
function isFrameworkEnabled(profile, env = process.env) {
  if (isEnvDisabled(env)) {
    return false;
  }
  return profile?.paqad?.enabled !== false;
}
function isFrameworkEnabledForRoot(projectRoot, env = process.env) {
  if (isEnvDisabled(env)) {
    return false;
  }
  return !configSaysPaqadDisabled(projectRoot, env);
}
function isFrameworkDisabledForRoot(projectRoot, env = process.env) {
  return !isFrameworkEnabledForRoot(projectRoot, env);
}
function setFrameworkEnabled(projectRoot, enabled) {
  if (!existsSync(join(projectRoot, PATHS.PROJECT_PROFILE))) {
    throw new Error(
      "paqad is not onboarded in this project (no .paqad/project-profile.yaml). Run `paqad-ai onboard` first."
    );
  }
  const config_path = setConfigValue(projectRoot, "paqad_enable", enabled ? "true" : "false");
  return { enabled, config_path };
}

// src/hud/last-block.ts
init_esm_shims();
import { randomBytes } from "crypto";
import { readFileSync, rmSync } from "fs";
var LAST_BLOCK_DIFF_MAX_BYTES = 2048;
function asRecord(value) {
  return typeof value === "object" && value !== null ? value : null;
}
function prefixed(text, mark) {
  return typeof text === "string" && text !== "" ? text.split(/\r?\n/).map((line) => `${mark} ${line}`) : [];
}
function editLines(edit) {
  if (!edit) return [];
  return [...prefixed(edit.old_string, "-"), ...prefixed(edit.new_string, "+")];
}
function truncateUtf8(text, maxBytes) {
  if (Buffer.byteLength(text, "utf8") <= maxBytes) return text;
  let out = "";
  let used = 0;
  for (const char of text) {
    const size = Buffer.byteLength(char, "utf8");
    if (used + size > maxBytes) break;
    out += char;
    used += size;
  }
  return out;
}
function shortDiff(toolInput, maxBytes = LAST_BLOCK_DIFF_MAX_BYTES) {
  const input = asRecord(toolInput);
  if (!input) return "";
  const edits = Array.isArray(input.edits) ? input.edits.map(asRecord) : [input];
  const lines = [
    ...edits.flatMap(editLines),
    ...prefixed(input.content, "+"),
    ...prefixed(input.new_source, "+")
  ];
  return truncateUtf8(lines.join("\n"), maxBytes);
}
function writeRuleStopRecord(input) {
  const record = {
    rule: input.rule,
    title: input.title ?? null,
    file: input.file,
    tool_use_id: input.toolUseId ?? null,
    managed: input.managed,
    sole: input.sole === true,
    at: (input.now ?? (() => /* @__PURE__ */ new Date()))().toISOString(),
    diff: shortDiff(input.toolInput),
    token: input.token ?? randomBytes(16).toString("hex"),
    used: false,
    allowed_once: false,
    session: input.sessionId
  };
  writeFileAtomic(
    hudLastBlockPath(input.projectRoot, input.sessionId),
    `${JSON.stringify(record, null, 2)}
`
  );
  return record;
}
function str(value) {
  return typeof value === "string" && value !== "" ? value : null;
}
function parseRuleStopRecord(value) {
  const raw = asRecord(value);
  const rule = str(raw?.rule);
  const file = str(raw?.file);
  const at = str(raw?.at);
  const token = str(raw?.token);
  const session = str(raw?.session);
  if (!raw || !rule || !file || !at || !token || !session) return null;
  return {
    rule,
    title: str(raw.title),
    file,
    tool_use_id: str(raw.tool_use_id),
    managed: raw.managed === true,
    sole: raw.sole === true,
    at,
    diff: typeof raw.diff === "string" ? raw.diff : "",
    token,
    used: raw.used === true,
    allowed_once: raw.allowed_once === true,
    session
  };
}
function readRuleStopRecord(projectRoot, sessionId) {
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(hudLastBlockPath(projectRoot, sessionId), "utf8"));
  } catch {
    return null;
  }
  const record = parseRuleStopRecord(parsed);
  return record && record.session === sessionId ? record : null;
}
function writeRecord(projectRoot, record) {
  writeFileAtomic(
    hudLastBlockPath(projectRoot, record.session),
    `${JSON.stringify(record, null, 2)}
`
  );
}
function markRuleStopAllowedOnce(projectRoot, record) {
  writeRecord(projectRoot, { ...record, used: true, allowed_once: true });
}
function takeAllowedOnce(projectRoot, sessionId, call) {
  const record = readRuleStopRecord(projectRoot, sessionId);
  if (!record?.allowed_once || !call.toolUseId || record.tool_use_id !== call.toolUseId) {
    return false;
  }
  if (record.rule !== call.rule) return false;
  const recordFile = toProjectRelativePath(projectRoot, record.file);
  const callFile = toProjectRelativePath(projectRoot, call.file);
  if (recordFile === null || callFile === null || recordFile !== callFile) return false;
  writeRecord(projectRoot, { ...record, allowed_once: false });
  return true;
}
function clearRuleStopRecord(projectRoot, sessionId) {
  rmSync(hudLastBlockPath(projectRoot, sessionId), { force: true });
}

export {
  isManagedEnv,
  isFrameworkEnabled,
  isFrameworkEnabledForRoot,
  isFrameworkDisabledForRoot,
  setFrameworkEnabled,
  writeRuleStopRecord,
  readRuleStopRecord,
  markRuleStopAllowedOnce,
  takeAllowedOnce,
  clearRuleStopRecord
};
