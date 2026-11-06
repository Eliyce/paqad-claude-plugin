import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  FRAMEWORK_CONFIG_SPECS,
  STRUCTURED_TEAM_SETTINGS,
  TEAM_CONFIG_FILES,
  legacyFilesWithSettings,
  legacyNoLongerReadLine,
  legacyTeamConfigReadable,
  readTeamConfig,
  readTeamYamlFile,
  retiredPathsFor,
  teamConfigMigrated,
  teamConfigPath
} from "./chunk-M4YTSA5U.js";
import {
  PATHS
} from "./chunk-42HWSPMN.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/core/team-config-report.ts
init_esm_shims();
import { existsSync } from "fs";
import { join } from "path";
function missingTeamFileLine(file) {
  return `.paqad/configs/${file} is missing. Run paqad-ai update to create it.`;
}
function missingTeamConfigFiles(projectRoot) {
  if (!existsSync(join(projectRoot, PATHS.PROJECT_CONFIGS_DIR))) return [];
  if (!teamConfigMigrated(projectRoot)) return [];
  return TEAM_CONFIG_FILES.filter((file) => !existsSync(teamConfigPath(projectRoot, file)));
}
function legacyAfterWindowLines(projectRoot) {
  if (legacyTeamConfigReadable()) return [];
  return legacyFilesWithSettings(projectRoot).map(legacyNoLongerReadLine);
}
function teamConfigSessionLines(projectRoot) {
  if (!existsSync(join(projectRoot, PATHS.PROJECT_CONFIGS_DIR))) return [];
  return [
    ...readTeamConfig(projectRoot).issues.map((issue) => issue.message),
    ...legacyAfterWindowLines(projectRoot),
    ...missingTeamConfigFiles(projectRoot).map(missingTeamFileLine)
  ];
}
function teamConfigSessionStartText(projectRoot) {
  let lines;
  try {
    lines = teamConfigSessionLines(projectRoot);
  } catch {
    return null;
  }
  if (lines.length === 0) return null;
  return ["paqad team settings:", ...lines.map((line) => `- ${line}`)].join("\n");
}
function unknownSettingLine(file, path) {
  return `${file} has a setting paqad doesn't know: ${path}. It may be from a newer paqad or a typo.`;
}
function knownPaths(file) {
  const leaves = /* @__PURE__ */ new Set(["paqad_version", "schema_version", ...retiredPathsFor(file)]);
  for (const spec of FRAMEWORK_CONFIG_SPECS) {
    if (spec.file === file) leaves.add(spec.path.join("."));
  }
  for (const setting of STRUCTURED_TEAM_SETTINGS) {
    if (setting.file === file) leaves.add(setting.path.join("."));
  }
  const branches = /* @__PURE__ */ new Set();
  for (const leaf of leaves) {
    const segments = leaf.split(".");
    for (let i = 1; i < segments.length; i += 1) branches.add(segments.slice(0, i).join("."));
  }
  return { leaves, branches };
}
function collectUnknown(node, prefix, known, out) {
  if (node === null || typeof node !== "object" || Array.isArray(node)) return;
  for (const [key, value] of Object.entries(node)) {
    const path = [...prefix, key].join(".");
    if (known.leaves.has(path)) continue;
    if (known.branches.has(path)) {
      collectUnknown(value, [...prefix, key], known, out);
      continue;
    }
    out.push(path);
  }
}
function unknownTeamConfigSettings(projectRoot) {
  const found = [];
  for (const file of TEAM_CONFIG_FILES) {
    const { document } = readTeamYamlFile(projectRoot, file);
    if (document === null) continue;
    const paths = [];
    collectUnknown(document.toJS(), [], knownPaths(file), paths);
    for (const path of paths) found.push({ file, path });
  }
  return found;
}

export {
  missingTeamFileLine,
  missingTeamConfigFiles,
  legacyAfterWindowLines,
  teamConfigSessionLines,
  teamConfigSessionStartText,
  unknownSettingLine,
  unknownTeamConfigSettings
};
