import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  renameWithRetrySync
} from "./chunk-ER3R2ZPY.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/update/last-update.ts
init_esm_shims();
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { dirname, join } from "path";
var LAST_UPDATE_FILE = ".paqad/state/last-update.json";
var LAST_UPDATE_SEEN_FILE = ".paqad/state/last-update.seen.json";
var VERSION_PATTERN = /^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.+-]+)?$/u;
var PERSONAL_FILE = /(^|\/)settings\.local\.json$/u;
var SESSION_LINE_TAIL = "Tell the developer, and run paqad-ai update --last to see the details.";
function allChangedFiles(report) {
  return [.../* @__PURE__ */ new Set([...report.regenerated, ...report.changed_files ?? []])].filter(
    (path) => !PERSONAL_FILE.test(path)
  );
}
function isStringList(value) {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}
function isVersion(value) {
  return typeof value === "string" && VERSION_PATTERN.test(value);
}
function parseRecord(text) {
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    return null;
  }
  if (parsed === null || typeof parsed !== "object") return null;
  const record = parsed;
  const valid = (record.previous_version === null || isVersion(record.previous_version)) && isVersion(record.target_version) && isStringList(record.changed_files) && isStringList(record.skipped) && isStringList(record.config_keys_pruned) && isStringList(record.team_setup_notes) && isStringList(record.git_workflow_notes) && typeof record.updated_at === "string";
  return valid ? record : null;
}
function readRecordFile(path) {
  let text;
  try {
    text = readFileSync(path, "utf8");
  } catch {
    return null;
  }
  return parseRecord(text);
}
function readLastUpdateRecord(projectRoot) {
  return readRecordFile(join(projectRoot, LAST_UPDATE_FILE)) ?? readRecordFile(join(projectRoot, LAST_UPDATE_SEEN_FILE));
}
function hasSomethingToReport(record) {
  return record.changed_files.length > 0 || record.config_keys_pruned.length > 0 || record.team_setup_notes.length > 0 || record.git_workflow_notes.length > 0;
}
function union(first, second) {
  return [.../* @__PURE__ */ new Set([...first, ...second])];
}
function mergeRecords(older, newer) {
  return {
    previous_version: older.previous_version,
    target_version: newer.target_version,
    changed_files: union(older.changed_files, newer.changed_files),
    skipped: union(older.skipped, newer.skipped),
    config_keys_pruned: union(older.config_keys_pruned, newer.config_keys_pruned),
    team_setup_notes: union(older.team_setup_notes, newer.team_setup_notes),
    git_workflow_notes: union(older.git_workflow_notes, newer.git_workflow_notes),
    updated_at: newer.updated_at
  };
}
function removeQuietly(path) {
  try {
    rmSync(path, { force: true });
  } catch {
    return;
  }
}
function writeLastUpdateRecord(projectRoot, report, updatedAt = (/* @__PURE__ */ new Date()).toISOString(), io = {}) {
  const record = {
    previous_version: report.previous_version,
    target_version: report.target_version,
    changed_files: allChangedFiles(report),
    skipped: report.skipped.map((entry) => entry.path),
    config_keys_pruned: report.config_keys_pruned,
    team_setup_notes: report.team_setup_notes ?? [],
    git_workflow_notes: report.git_workflow_notes ?? [],
    updated_at: updatedAt
  };
  if (!hasSomethingToReport(record)) return false;
  const target = join(projectRoot, LAST_UPDATE_FILE);
  const temp = `${target}.${process.pid}.tmp`;
  try {
    const unseen = readRecordFile(target);
    const merged = unseen === null ? record : mergeRecords(unseen, record);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(temp, `${JSON.stringify(merged, null, 2)}
`, "utf8");
    renameWithRetrySync(temp, target, io.rename ? { rename: io.rename } : {});
    return true;
  } catch {
    removeQuietly(temp);
    return false;
  }
}
function lastUpdateSessionLine(record) {
  const count = record.changed_files.length;
  const outcome = count === 0 ? "has notes for you" : `changed ${count} ${count === 1 ? "file" : "files"}`;
  const { previous_version: previous, target_version: target } = record;
  if (previous === target) {
    return `paqad refreshed its files on ${target} and ${outcome}. ${SESSION_LINE_TAIL}`;
  }
  return previous === null ? `paqad updated itself to ${target} and ${outcome}. ${SESSION_LINE_TAIL}` : `paqad updated itself from ${previous} to ${target} and ${outcome}. ${SESSION_LINE_TAIL}`;
}
function takeLastUpdateSessionLine(projectRoot, source, io = {}) {
  if (source === "compact") return null;
  const unseen = join(projectRoot, LAST_UPDATE_FILE);
  const record = readRecordFile(unseen);
  if (record === null) return null;
  try {
    renameWithRetrySync(unseen, join(projectRoot, LAST_UPDATE_SEEN_FILE), {
      remove: () => void 0,
      ...io.rename ? { rename: io.rename } : {}
    });
  } catch {
    return null;
  }
  return lastUpdateSessionLine(record);
}

export {
  allChangedFiles,
  readLastUpdateRecord,
  writeLastUpdateRecord,
  lastUpdateSessionLine,
  takeLastUpdateSessionLine
};
