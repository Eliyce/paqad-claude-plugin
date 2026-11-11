import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  addRule,
  cleanRuleText,
  editRuleText,
  removeRuleBullet
} from "../chunk-IAHA6F27.js";
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
} from "../chunk-I3TUK55C.js";
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
} from "../chunk-SR5BAWWI.js";
import "../chunk-GHQXK4A5.js";
import "../chunk-LBNBI3D6.js";
import "../chunk-P37B3XIH.js";
import "../chunk-UUBQQJVE.js";
import "../chunk-Q3GX7F2M.js";
import "../chunk-MDXUST3Z.js";
import {
  require_out
} from "../chunk-P4RPU2KB.js";
import "../chunk-LYNDVGNE.js";
import "../chunk-DBYGVM5Q.js";
import "../chunk-TINPSX3N.js";
import "../chunk-BTDDEK7C.js";
import "../chunk-YDQKDCXK.js";
import "../chunk-RJMJYPHL.js";
import "../chunk-YUYQHVVS.js";
import "../chunk-OAGMHQY5.js";
import "../chunk-BOEVU2BD.js";
import "../chunk-NJE7NS7E.js";
import {
  embedRuleMarker,
  isRuleId,
  mintRuleId,
  parseRuleMarker,
  parseRuleMarkerRun,
  ruleTextHash,
  sha256,
  stripRuleMarker
} from "../chunk-7PD3OGSQ.js";
import "../chunk-YA6SCYMC.js";
import "../chunk-Z3NGWHFX.js";
import "../chunk-YWAORJG6.js";
import "../chunk-Q353EDKY.js";
import "../chunk-SG6LXLDH.js";
import "../chunk-FMQ5YRSP.js";
import "../chunk-AZLA53A6.js";
import {
  PATHS
} from "../chunk-IHMBVS6H.js";
import {
  __toESM,
  init_esm_shims
} from "../chunk-IDFRWBMN.js";

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

// src/rule-scripts/prune.ts
init_esm_shims();
var import_fast_glob = __toESM(require_out(), 1);
import { existsSync, readdirSync, rmSync } from "fs";
import { join, sep } from "path";
function pruneOrphanScripts(projectRoot, map) {
  const baseRel = PATHS.RULE_SCRIPTS_DIR;
  const baseAbs = join(projectRoot, baseRel);
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
    const rel = join(baseRel, sub);
    if (referenced.has(rel)) {
      continue;
    }
    rmSync(join(projectRoot, rel), { force: true });
    const stemDir = join(projectRoot, rel.replace(/\.mjs$/, ""));
    const fixturesDir = join(stemDir, "__fixtures__");
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
  parseRuleMarkerRun,
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
