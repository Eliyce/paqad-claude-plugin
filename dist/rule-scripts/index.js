import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  applyRuleScriptMap,
  assembleMap,
  atomicWriteRuleScriptMap,
  collectRuleFiles,
  compileRuleScripts,
  computeRuleFilesHash,
  embedRuleIds,
  embedRuleMarker,
  fixturesRoot,
  isRuleId,
  isRuleScriptMapStale,
  mintRuleId,
  parseRuleFile,
  parseRuleMarker,
  readDrift,
  reconcileRuleScripts,
  recordConflictFindings,
  ruleTextHash,
  runFixtures,
  scanAndEmbedIds,
  sha256,
  snapshotRuleScriptMap,
  stripRuleMarker
} from "../chunk-YIE367YO.js";
import {
  HEADER_MARKER,
  RULE_SCRIPT_MAP_SCHEMA_VERSION,
  emptyRuleScriptMap,
  enforceRuleScripts,
  executeRuleScript,
  extractHeaderFields,
  formatEnforcementSummary,
  isOnPath,
  loadRuleScriptMap,
  missingBinaries,
  parseScriptHeader,
  readReport,
  ruleRunFindings,
  ruleScriptMapPath,
  runRuleScripts,
  scriptFilesHash,
  serializeRuleScriptMap,
  validateFindings,
  validateScriptHeader
} from "../chunk-VAKHLEAY.js";
import "../chunk-EOKSVX6N.js";
import "../chunk-KKFSSPUD.js";
import "../chunk-PMSUN52C.js";
import "../chunk-O77JBFWW.js";
import {
  require_out
} from "../chunk-DNG6DDRS.js";
import "../chunk-4K4CM3QN.js";
import "../chunk-MIXUQZID.js";
import "../chunk-MLVRTWKF.js";
import "../chunk-QMZL6OH5.js";
import "../chunk-37ZC7KVF.js";
import "../chunk-WGEG5J6L.js";
import "../chunk-R3VYFIEA.js";
import "../chunk-O25SHWZA.js";
import "../chunk-3CUGDX3J.js";
import "../chunk-SU7RODZI.js";
import "../chunk-MG36YCW4.js";
import "../chunk-KF7HHHJR.js";
import "../chunk-EGDL57MD.js";
import {
  PATHS
} from "../chunk-UCSN7SVD.js";
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

// src/rule-scripts/mutate.ts
init_esm_shims();
function cloneMap(map) {
  return JSON.parse(JSON.stringify(map));
}
function findRule(map, ruleId) {
  return map.rules.find((r) => r.id === ruleId);
}
function upsertScriptEntry(map, ruleId, entry) {
  const next = cloneMap(map);
  const rule = findRule(next, ruleId);
  if (!rule) {
    throw new Error(`upsertScriptEntry: rule ${ruleId} not found in map`);
  }
  const idx = rule.scripts.findIndex((s) => s.path === entry.path);
  if (idx >= 0) {
    rule.scripts[idx] = entry;
  } else {
    rule.scripts.push(entry);
  }
  rule.scripts.sort((a, b) => a.path.localeCompare(b.path));
  return next;
}
function addRuleEntry(map, entry) {
  const next = cloneMap(map);
  if (next.rules.some((r) => r.id === entry.id)) {
    throw new Error(`addRuleEntry: rule ${entry.id} already in map`);
  }
  next.rules.push({
    id: entry.id,
    source: entry.source,
    text: entry.text,
    text_hash: entry.text_hash,
    verifiability: { kind: "heuristic" },
    enforced_by: [],
    scripts: []
  });
  return next;
}
function setRuleText(map, ruleId, text, textHash) {
  const next = cloneMap(map);
  const rule = findRule(next, ruleId);
  if (!rule) {
    throw new Error(`setRuleText: rule ${ruleId} not found in map`);
  }
  rule.text = text;
  rule.text_hash = textHash;
  rule.scripts = [];
  return next;
}
function clearRuleScripts(map, ruleId) {
  const next = cloneMap(map);
  const rule = findRule(next, ruleId);
  if (rule) {
    rule.scripts = [];
  }
  return next;
}
function setVerifiability(map, ruleId, verifiability) {
  const next = cloneMap(map);
  const rule = findRule(next, ruleId);
  if (!rule) {
    throw new Error(`setVerifiability: rule ${ruleId} not found in map`);
  }
  rule.verifiability = verifiability;
  if (verifiability.kind === "unverifiable") {
    rule.scripts = [];
  }
  return next;
}
function archiveRule(map, ruleId) {
  const next = cloneMap(map);
  const idx = next.rules.findIndex((r) => r.id === ruleId);
  if (idx < 0) {
    return next;
  }
  const [removed] = next.rules.splice(idx, 1);
  next.archived = [...next.archived ?? [], removed];
  return next;
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
  editRuleText,
  embedRuleIds,
  embedRuleMarker,
  emptyRuleScriptMap,
  enforceRuleScripts,
  executeRuleScript,
  extractHeaderFields,
  fixturesRoot,
  formatEnforcementSummary,
  isOnPath,
  isRuleId,
  isRuleScriptMapStale,
  loadRuleScriptMap,
  mintRuleId,
  missingBinaries,
  parseRuleFile,
  parseRuleMarker,
  parseScriptHeader,
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
