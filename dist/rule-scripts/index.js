import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  addRuleEntry,
  applyRuleScriptMap,
  archiveRule,
  assembleMap,
  atomicWriteRuleScriptMap,
  clearRuleScripts,
  collectRuleFiles,
  compileRuleScripts,
  computeRuleFilesHash,
  dropRuleScriptMapSources,
  embedRuleIds,
  fixturesRoot,
  isRuleScriptMapCurrent,
  isRuleScriptMapStale,
  parseRuleFile,
  readDrift,
  reconcileRuleScripts,
  recordConflictFindings,
  runFixtures,
  scanAndEmbedIds,
  setRuleText,
  setVerifiability,
  snapshotRuleScriptMap,
  upsertScriptEntry
} from "../chunk-NWWRI4FD.js";
import {
  HEADER_MARKER,
  RULE_SCRIPT_MAP_SCHEMA_VERSION,
  SCRIPT_ABORTED_ERROR,
  emptyRuleScriptMap,
  enforceRuleScripts,
  executeRuleScript,
  executeRuleScriptAsync,
  extractHeaderFields,
  formatEnforcementSummary,
  isOnPath,
  loadRuleScriptMap,
  missingBinaries,
  parseScriptHeader,
  projectRelativeTargets,
  readReport,
  ruleRunFindings,
  ruleScriptMapPath,
  runRuleScripts,
  runRuleScriptsAsync,
  scriptFilesHash,
  serializeRuleScriptMap,
  validateFindings,
  validateScriptHeader
} from "../chunk-72GVSZKP.js";
import "../chunk-ZFTFBUXP.js";
import "../chunk-JXL35R47.js";
import "../chunk-KKFSSPUD.js";
import "../chunk-OTATRRDF.js";
import "../chunk-O77JBFWW.js";
import {
  require_out
} from "../chunk-DNG6DDRS.js";
import "../chunk-4K4CM3QN.js";
import "../chunk-6J44MDJE.js";
import "../chunk-NUSNYHWM.js";
import "../chunk-B4PUCHRN.js";
import "../chunk-4MVEUCYU.js";
import "../chunk-4MQZPCLY.js";
import "../chunk-4BEZCXS2.js";
import "../chunk-AINYJ3Q2.js";
import "../chunk-RMTAX7L3.js";
import {
  embedRuleMarker,
  isRuleId,
  mintRuleId,
  parseRuleMarker,
  ruleTextHash,
  sha256,
  stripRuleMarker
} from "../chunk-3GFZQZPX.js";
import "../chunk-N7PDT64R.js";
import "../chunk-ER3R2ZPY.js";
import "../chunk-VVRAO2BK.js";
import "../chunk-4VFZMH6Y.js";
import "../chunk-FCULNH3A.js";
import "../chunk-PEDNW63C.js";
import "../chunk-47TQR4LW.js";
import {
  PATHS
} from "../chunk-G3YYQOXJ.js";
import {
  __toESM,
  init_esm_shims
} from "../chunk-EMKBJVIL.js";

// src/rule-scripts/index.ts
init_esm_shims();

// src/rule-scripts/guard.ts
init_esm_shims();
var OVER_FLAG_THRESHOLDS = {
  deterministic: 0.05,
  heuristic: 0.2
};
function checkOverFlag(scriptPath, kind, projectRoot, files, threshold = OVER_FLAG_THRESHOLDS[kind]) {
  let flagged = 0;
  for (const file of files) {
    const result = executeRuleScript(scriptPath, { projectRoot, files: [file] });
    if (result.ok && (result.report?.findings.length ?? 0) > 0) {
      flagged++;
    }
  }
  const checked = files.length;
  const rate = checked === 0 ? 0 : flagged / checked;
  return {
    files_checked: checked,
    files_flagged: flagged,
    rate,
    threshold,
    exceeded: rate > threshold
  };
}

// src/rule-scripts/editor.ts
init_esm_shims();
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
function takenIds(projectRoot) {
  const taken = /* @__PURE__ */ new Set();
  for (const r of loadRuleScriptMap(projectRoot)?.rules ?? []) {
    taken.add(r.id);
  }
  for (const r of loadRuleScriptMap(projectRoot)?.archived ?? []) {
    taken.add(r.id);
  }
  for (const rel of collectRuleFiles(projectRoot)) {
    for (const line of readFileSync(join(projectRoot, rel), "utf8").split("\n")) {
      const id = parseRuleMarker(line);
      if (id) {
        taken.add(id);
      }
    }
  }
  return taken;
}
function cleanRuleText(input) {
  return input.trim().replace(/^[-*]\s+/, "");
}
function assertRuleSource(sourceRel) {
  const normalized = sourceRel.split("\\").join("/");
  if (!normalized.startsWith(`${PATHS.RULES_DIR}/`) || !normalized.endsWith(".md")) {
    throw new Error(
      `addRule: source must be a .md file under ${PATHS.RULES_DIR}/ (got "${sourceRel}")`
    );
  }
}
function addRule(projectRoot, sourceRel, text) {
  assertRuleSource(sourceRel);
  const abs = join(projectRoot, sourceRel);
  const clean = cleanRuleText(text);
  const id = mintRuleId(sourceRel, clean, takenIds(projectRoot));
  const bullet = embedRuleMarker(`- ${clean}`, id);
  let existing = "";
  try {
    existing = readFileSync(abs, "utf8");
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }
  const sep2 = existing.length > 0 && !existing.endsWith("\n") ? "\n" : "";
  writeFileSync(abs, `${existing}${sep2}${bullet}
`, "utf8");
  return { id, source: sourceRel, text: clean, text_hash: ruleTextHash(clean) };
}
function locateRule(projectRoot, ruleId) {
  for (const rel of collectRuleFiles(projectRoot)) {
    const lines = readFileSync(join(projectRoot, rel), "utf8").split("\n");
    const line = lines.findIndex((l) => parseRuleMarker(l) === ruleId);
    if (line >= 0) {
      return { source: rel, line, lines };
    }
  }
  return null;
}
function editRuleText(projectRoot, ruleId, newText) {
  const located = locateRule(projectRoot, ruleId);
  if (!located) {
    return null;
  }
  const original = located.lines[located.line];
  const indent = /^(\s*)/.exec(original)?.[1] ?? "";
  const marker = /^[-*]/.exec(stripRuleMarker(original).text.trim())?.[0] ?? "-";
  const clean = cleanRuleText(newText);
  located.lines[located.line] = embedRuleMarker(`${indent}${marker} ${clean}`, ruleId);
  writeFileSync(join(projectRoot, located.source), located.lines.join("\n"), "utf8");
  return { source: located.source };
}
function removeRuleBullet(projectRoot, ruleId) {
  const located = locateRule(projectRoot, ruleId);
  if (!located) {
    return null;
  }
  located.lines.splice(located.line, 1);
  writeFileSync(join(projectRoot, located.source), located.lines.join("\n"), "utf8");
  return { source: located.source };
}

// src/rule-scripts/prune.ts
init_esm_shims();
var import_fast_glob = __toESM(require_out(), 1);
import { existsSync, readdirSync, rmSync } from "fs";
import { join as join2, sep } from "path";
function pruneOrphanScripts(projectRoot, map) {
  const baseRel = PATHS.RULE_SCRIPTS_DIR;
  const baseAbs = join2(projectRoot, baseRel);
  if (!existsSync(baseAbs)) {
    return [];
  }
  const referenced = new Set(map.rules.flatMap((r) => r.scripts.map((s) => s.path)));
  const found = import_fast_glob.default.sync("**/*.mjs", {
    cwd: baseAbs,
    onlyFiles: true,
    ignore: [".cache/**", ".history/**"]
  });
  const deleted = [];
  for (const sub of found) {
    const rel = join2(baseRel, sub);
    if (referenced.has(rel)) {
      continue;
    }
    rmSync(join2(projectRoot, rel), { force: true });
    const stemDir = join2(projectRoot, rel.replace(/\.mjs$/, ""));
    const fixturesDir = join2(stemDir, "__fixtures__");
    if (existsSync(fixturesDir)) {
      rmSync(fixturesDir, { recursive: true, force: true });
      try {
        if (readdirSync(stemDir).length === 0) {
          rmSync(stemDir, { recursive: true, force: true });
        }
      } catch {
      }
    }
    deleted.push(rel.split(sep).join("/"));
  }
  return deleted;
}
export {
  HEADER_MARKER,
  OVER_FLAG_THRESHOLDS,
  RULE_SCRIPT_MAP_SCHEMA_VERSION,
  SCRIPT_ABORTED_ERROR,
  addRule,
  addRuleEntry,
  applyRuleScriptMap,
  archiveRule,
  assembleMap,
  atomicWriteRuleScriptMap,
  checkOverFlag,
  cleanRuleText,
  clearRuleScripts,
  collectRuleFiles,
  compileRuleScripts,
  computeRuleFilesHash,
  dropRuleScriptMapSources,
  editRuleText,
  embedRuleIds,
  embedRuleMarker,
  emptyRuleScriptMap,
  enforceRuleScripts,
  executeRuleScript,
  executeRuleScriptAsync,
  extractHeaderFields,
  fixturesRoot,
  formatEnforcementSummary,
  isOnPath,
  isRuleId,
  isRuleScriptMapCurrent,
  isRuleScriptMapStale,
  loadRuleScriptMap,
  mintRuleId,
  missingBinaries,
  parseRuleFile,
  parseRuleMarker,
  parseScriptHeader,
  projectRelativeTargets,
  pruneOrphanScripts,
  readDrift,
  readReport,
  reconcileRuleScripts,
  recordConflictFindings,
  removeRuleBullet,
  ruleRunFindings,
  ruleScriptMapPath,
  ruleTextHash,
  runFixtures,
  runRuleScripts,
  runRuleScriptsAsync,
  scanAndEmbedIds,
  scriptFilesHash,
  serializeRuleScriptMap,
  setRuleText,
  setVerifiability,
  sha256,
  snapshotRuleScriptMap,
  stripRuleMarker,
  upsertScriptEntry,
  validateFindings,
  validateScriptHeader
};
