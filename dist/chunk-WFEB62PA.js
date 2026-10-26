import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  STAGE_EFFORT_LEVELS,
  STAGE_MODELS,
  resolveStageAgentSettings
} from "./chunk-PW5UZ55M.js";
import {
  PATHS
} from "./chunk-UCSN7SVD.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/stage-isolation/stage-settings.ts
init_esm_shims();
import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
var SAFE_SESSION_ID = /^[A-Za-z0-9._-]{1,128}$/;
function isSafeSessionId(sessionId) {
  return SAFE_SESSION_ID.test(sessionId);
}
var STAGE_SETTINGS_DIR = "stage-settings.d";
function stageSettingsPath(projectRoot, sessionId) {
  return join(projectRoot, PATHS.AGENCY_SESSION_DIR, STAGE_SETTINGS_DIR, `${sessionId}.json`);
}
function writeStageSettings(projectRoot, sessionId, env = process.env) {
  if (!isSafeSessionId(sessionId)) {
    throw new Error("unsafe session id");
  }
  const settings = resolveStageAgentSettings(projectRoot, env);
  const path = stageSettingsPath(projectRoot, sessionId);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(settings, null, 2)}
`, "utf8");
  return settings;
}
function effortToPass(configured, fileDefault) {
  if (configured !== "inherit") return `effort ${configured}`;
  if (fileDefault !== "inherit") {
    return `your own current effort level as effort, because its agent file defaults to ${fileDefault} effort`;
  }
  return null;
}
function modelToPass(configured, fileDefault) {
  if (configured !== "inherit") return `model ${configured}`;
  if (fileDefault !== "inherit") {
    return `your own current model as model, because its agent file defaults to ${fileDefault}`;
  }
  return null;
}
function stagePassAdvice(setting, fileDefault) {
  const parts = [
    effortToPass(setting.effort, fileDefault.effort),
    modelToPass(setting.model, fileDefault.model)
  ].filter((part) => part !== null);
  if (parts.length === 0) {
    return "pass nothing on its Agent call, so it runs at the session's own effort and model";
  }
  return `on its Agent call, pass ${parts.join(" and ")}`;
}
function stageSettingsReport(settings) {
  const fileDefaults = resolveStageAgentSettings();
  return Object.fromEntries(
    Object.entries(settings).map(([stage, setting]) => [
      stage,
      { ...setting, pass: stagePassAdvice(setting, fileDefaults[stage]) }
    ])
  );
}
function isStageAgentSetting(value) {
  if (!value || typeof value !== "object") return false;
  const { effort, model } = value;
  return STAGE_EFFORT_LEVELS.includes(effort) && STAGE_MODELS.includes(model);
}
function readStageSetting(projectRoot, sessionId, stage) {
  if (!isSafeSessionId(sessionId)) return null;
  try {
    const parsed = JSON.parse(
      readFileSync(stageSettingsPath(projectRoot, sessionId), "utf8")
    );
    const setting = parsed?.[stage];
    return isStageAgentSetting(setting) ? { effort: setting.effort, model: setting.model } : null;
  } catch {
    return null;
  }
}

export {
  SAFE_SESSION_ID,
  isSafeSessionId,
  writeStageSettings,
  stageSettingsReport,
  readStageSetting
};
