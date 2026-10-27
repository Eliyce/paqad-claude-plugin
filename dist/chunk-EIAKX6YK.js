import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  RULE_SCRIPT_MAP_SCHEMA_VERSION,
  computeRuleScriptsDigest,
  executeRuleScript,
  loadRuleScriptMap,
  missingBinaries,
  parseScriptHeader,
  readReport,
  ruleScriptMapPath,
  serializeRuleScriptMap,
  writeCapabilityDigest
} from "./chunk-RZSUJA4B.js";
import {
  require_out
} from "./chunk-DNG6DDRS.js";
import {
  toPosixPath
} from "./chunk-4K4CM3QN.js";
import {
  PATHS
} from "./chunk-UCSN7SVD.js";
import {
  __toESM,
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/rule-scripts/rule-id.ts
init_esm_shims();
import { createHash } from "crypto";
var ID_PREFIX = "RL-";
var MIN_HEX = 4;
var MAX_HEX = 12;
var MARKER_RE = /<!--\s*@rule\s+(RL-[0-9a-f]+)\s*-->/i;
function sha256(input) {
  return createHash("sha256").update(input).digest("hex");
}
function ruleTextHash(text) {
  return sha256(text);
}
function parseRuleMarker(line) {
  const m = MARKER_RE.exec(line);
  if (!m) {
    return null;
  }
  return `${ID_PREFIX}${m[1].slice(ID_PREFIX.length).toLowerCase()}`;
}
function stripRuleMarker(line) {
  const id = parseRuleMarker(line);
  const text = line.replace(MARKER_RE, "").trimEnd();
  return { text, id };
}
function embedRuleMarker(line, id) {
  const existing = parseRuleMarker(line);
  if (existing === id) {
    return line;
  }
  const clean = line.replace(MARKER_RE, "").trimEnd();
  return `${clean} <!-- @rule ${id} -->`;
}
function mintRuleId(source, text, takenIds) {
  const digest = sha256(`${source}\0${text}`);
  for (let len = MIN_HEX; len <= MAX_HEX; len++) {
    const candidate = `${ID_PREFIX}${digest.slice(0, len)}`;
    if (!takenIds.has(candidate)) {
      return candidate;
    }
  }
  return `${ID_PREFIX}${digest}`;
}
function isRuleId(value) {
  return /^RL-[0-9a-f]{4,}$/i.test(value);
}

// src/rule-scripts/rule-file.ts
init_esm_shims();
var BULLET_RE = /^(\s*)([-*])\s+(\S.*)$/;
var FENCE_RE = /^\s*(```|~~~)/;
function parseRuleFile(content) {
  const lines = content.split("\n");
  const rules = [];
  let inFence = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (FENCE_RE.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) {
      continue;
    }
    const m = BULLET_RE.exec(line);
    if (!m) {
      continue;
    }
    const { text, id } = stripRuleMarker(line);
    const bulletBody = stripRuleMarker(m[3]).text;
    rules.push({
      line: i,
      indent: m[1],
      text: bulletBody,
      text_hash: ruleTextHash(bulletBody),
      id
    });
    void text;
  }
  return rules;
}
function embedRuleIds(source, content, takenIds) {
  const lines = content.split("\n");
  const parsed = parseRuleFile(content);
  const rules = [];
  for (const rule of parsed) {
    let id = rule.id;
    const isNew = id === null;
    if (id === null) {
      id = mintRuleId(source, rule.text, takenIds);
    }
    takenIds.add(id);
    lines[rule.line] = embedRuleMarker(lines[rule.line], id);
    rules.push({ id, text: rule.text, text_hash: rule.text_hash, isNew });
  }
  return { content: lines.join("\n"), rules };
}

// src/rule-scripts/analyzer.ts
init_esm_shims();
var import_fast_glob = __toESM(require_out(), 1);
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
function collectRuleFiles(projectRoot) {
  const rel = import_fast_glob.default.sync("**/*.md", {
    cwd: join(projectRoot, PATHS.RULES_DIR),
    onlyFiles: true
  });
  return rel.map((r) => toPosixPath(join(PATHS.RULES_DIR, r))).sort();
}
function computeRuleFilesHash(projectRoot, files) {
  const parts = files.slice().sort().map((rel) => `${rel}
${readFileSync(join(projectRoot, rel), "utf8")}`);
  return `sha256-${sha256(parts.join("\n"))}`;
}
function scanAndEmbedIds(projectRoot) {
  const files = collectRuleFiles(projectRoot);
  const taken = /* @__PURE__ */ new Set();
  const inventory = [];
  const changed = [];
  for (const rel of files) {
    const abs = join(projectRoot, rel);
    const before = readFileSync(abs, "utf8");
    const { content, rules } = embedRuleIds(rel, before, taken);
    if (content !== before) {
      writeFileSync(abs, content, "utf8");
      changed.push(rel);
    }
    for (const r of rules) {
      inventory.push({
        id: r.id,
        source: rel,
        text: r.text,
        text_hash: r.text_hash,
        isNew: r.isNew
      });
    }
  }
  return {
    inventory,
    files,
    rule_files_hash: computeRuleFilesHash(projectRoot, files),
    changed_files: changed
  };
}
function assembleMap(inventory, classifications, rule_files_hash, priorMap, now = /* @__PURE__ */ new Date()) {
  const priorById = /* @__PURE__ */ new Map();
  for (const r of priorMap?.rules ?? []) {
    priorById.set(r.id, r);
  }
  const rules = inventory.map((item) => {
    const cls = classifications.get(item.id);
    const prior = priorById.get(item.id);
    const carryScripts = prior !== void 0 && prior.text_hash === item.text_hash ? prior.scripts : [];
    return {
      id: item.id,
      source: item.source,
      text: item.text,
      text_hash: item.text_hash,
      verifiability: cls?.verifiability ?? prior?.verifiability ?? { kind: "heuristic" },
      enforced_by: cls?.enforced_by ?? prior?.enforced_by ?? [],
      scripts: carryScripts
    };
  });
  return {
    schema_version: RULE_SCRIPT_MAP_SCHEMA_VERSION,
    generated_at: now.toISOString(),
    rule_files_hash,
    rules
  };
}

// src/rule-scripts/apply.ts
init_esm_shims();
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readFileSync as readFileSync2,
  renameSync,
  writeFileSync as writeFileSync2
} from "fs";
import { dirname, join as join2 } from "path";
function historyDir(projectRoot) {
  return join2(projectRoot, PATHS.RULE_SCRIPT_MAP_HISTORY_DIR);
}
function eventsLog(projectRoot) {
  return join2(projectRoot, PATHS.RULE_SCRIPT_MAP_EVENTS_LOG);
}
function sanitiseVia(via) {
  return via.replace(/[^A-Za-z0-9._-]/g, "_").slice(0, 80);
}
function timestampForFilename(now) {
  return now.toISOString().replace(/[:.]/g, "-");
}
var snapshotSeq = 0;
function snapshotRuleScriptMap(projectRoot, via, now = /* @__PURE__ */ new Date()) {
  const mapPath = ruleScriptMapPath(projectRoot);
  const histDir = historyDir(projectRoot);
  mkdirSync(histDir, { recursive: true });
  const unique = `${process.pid}-${(snapshotSeq++).toString(36)}`;
  const snapPath = join2(histDir, `${timestampForFilename(now)}-${sanitiseVia(via)}-${unique}.yml`);
  const existing = existsSync(mapPath) ? readFileSync2(mapPath, "utf8") : "";
  writeFileSync2(snapPath, existing, "utf8");
  return toPosixPath(snapPath);
}
function atomicWriteRuleScriptMap(projectRoot, yaml) {
  const mapPath = ruleScriptMapPath(projectRoot);
  mkdirSync(dirname(mapPath), { recursive: true });
  const tmpPath = `${mapPath}.tmp-${process.pid}-${Date.now()}`;
  writeFileSync2(tmpPath, yaml, "utf8");
  renameSync(tmpPath, mapPath);
}
function appendEvent(projectRoot, event) {
  const log = eventsLog(projectRoot);
  mkdirSync(dirname(log), { recursive: true });
  appendFileSync(log, `${JSON.stringify(event)}
`, "utf8");
}
function applyRuleScriptMap(opts) {
  const now = /* @__PURE__ */ new Date();
  const snapshot = snapshotRuleScriptMap(opts.projectRoot, opts.via, now);
  atomicWriteRuleScriptMap(opts.projectRoot, serializeRuleScriptMap(opts.map));
  appendEvent(opts.projectRoot, {
    ts: now.toISOString(),
    via: opts.via,
    ...opts.event
  });
  const digest = computeRuleScriptsDigest(opts.projectRoot);
  if (digest !== null) {
    writeCapabilityDigest(opts.projectRoot, "rule-scripts", digest, now);
  }
  return { snapshot_path: snapshot, applied_at: now.toISOString() };
}

// src/rule-scripts/compile.ts
init_esm_shims();
function isRuleScriptMapStale(projectRoot) {
  const map = loadRuleScriptMap(projectRoot);
  if (!map) return true;
  return map.rule_files_hash !== computeRuleFilesHash(projectRoot, collectRuleFiles(projectRoot));
}
function compileRuleScripts(projectRoot) {
  const scan = scanAndEmbedIds(projectRoot);
  const prior = loadRuleScriptMap(projectRoot);
  const map = assembleMap(scan.inventory, /* @__PURE__ */ new Map(), scan.rule_files_hash, prior);
  const applied = applyRuleScriptMap({
    projectRoot,
    map,
    via: "rules-compile",
    event: { action: "generate", rule_ids: map.rules.map((rule) => rule.id) }
  });
  return {
    map,
    ruleCount: map.rules.length,
    scriptedCount: map.rules.filter((rule) => rule.scripts.length > 0).length,
    changedFiles: scan.changed_files,
    snapshotPath: applied.snapshot_path,
    appliedAt: applied.applied_at
  };
}

// src/rule-scripts/fixture-runner.ts
init_esm_shims();
var import_fast_glob2 = __toESM(require_out(), 1);
import { existsSync as existsSync2, readFileSync as readFileSync3 } from "fs";
import { basename, dirname as dirname2, join as join3 } from "path";
function fixturesRoot(scriptPath) {
  const dir = dirname2(scriptPath);
  const stem = basename(scriptPath).replace(/\.mjs$/, "");
  return join3(dir, stem, "__fixtures__");
}
function listFixtures(dir) {
  if (!existsSync2(dir)) {
    return [];
  }
  return import_fast_glob2.default.sync("**/*", { cwd: dir, onlyFiles: true, dot: false }).sort();
}
function runFixtures(scriptPath) {
  const root = fixturesRoot(scriptPath);
  const passDir = join3(root, "pass");
  const failDir = join3(root, "fail");
  const passFiles = listFixtures(passDir);
  const failFiles = listFixtures(failDir);
  if (passFiles.length === 0 && failFiles.length === 0) {
    return {
      passed: false,
      pass_fixtures: 0,
      fail_fixtures: 0,
      failures: [],
      missing_fixtures: true
    };
  }
  if (existsSync2(scriptPath)) {
    const header = parseScriptHeader(readFileSync3(scriptPath, "utf8"));
    const missing = missingBinaries(header.header?.requires?.binaries);
    if (missing.length > 0) {
      return {
        passed: false,
        pass_fixtures: passFiles.length,
        fail_fixtures: failFiles.length,
        failures: [],
        missing_fixtures: false,
        missing_binaries: missing
      };
    }
  }
  const failures = [];
  for (const rel of passFiles) {
    const result = executeRuleScript(scriptPath, { projectRoot: passDir, files: [rel] });
    if (!result.ok) {
      failures.push({
        fixture: `pass/${rel}`,
        expected: "zero-findings",
        actual: -1,
        detail: result.error
      });
      continue;
    }
    const count = result.report?.findings.length ?? 0;
    if (count !== 0) {
      failures.push({ fixture: `pass/${rel}`, expected: "zero-findings", actual: count });
    }
  }
  for (const rel of failFiles) {
    const result = executeRuleScript(scriptPath, { projectRoot: failDir, files: [rel] });
    if (!result.ok) {
      failures.push({
        fixture: `fail/${rel}`,
        expected: "at-least-one-finding",
        actual: -1,
        detail: result.error
      });
      continue;
    }
    const count = result.report?.findings.length ?? 0;
    if (count < 1) {
      failures.push({ fixture: `fail/${rel}`, expected: "at-least-one-finding", actual: count });
    }
  }
  return {
    passed: failures.length === 0,
    pass_fixtures: passFiles.length,
    fail_fixtures: failFiles.length,
    failures,
    missing_fixtures: false
  };
}

// src/rule-scripts/reconciler.ts
init_esm_shims();
import { existsSync as existsSync3, mkdirSync as mkdirSync2, readFileSync as readFileSync4, renameSync as renameSync2, writeFileSync as writeFileSync3 } from "fs";
import { dirname as dirname3, join as join4 } from "path";
function emptyCounts() {
  return {
    "RS-RULE-ADDED": 0,
    "RS-RULE-EDITED": 0,
    "RS-RULE-REMOVED": 0,
    "RS-SCRIPT-STALE": 0,
    "RS-FIXTURE-FAIL": 0,
    "RS-CONFLICT": 0,
    "RS-CACHE-INVALID": 0
  };
}
function driftPath(projectRoot) {
  return join4(projectRoot, PATHS.RULE_SCRIPTS_DRIFT);
}
var CONFLICT_CODES = /* @__PURE__ */ new Set(["RS-CONFLICT"]);
function mergeDrift(projectRoot, ownedCodes, ownFindings) {
  const path = driftPath(projectRoot);
  if (existsSync3(path) && readDrift(projectRoot) === null) {
    try {
      renameSync2(path, `${path}.corrupt-${Date.now()}`);
    } catch {
    }
  }
  const existing = readDrift(projectRoot);
  const preserved = (existing?.findings ?? []).filter((f) => !ownedCodes.has(f.code));
  const findings = [...preserved, ...ownFindings];
  const counts = emptyCounts();
  for (const f of findings) {
    counts[f.code]++;
  }
  const report = {
    generated_at: (/* @__PURE__ */ new Date()).toISOString(),
    findings,
    counts,
    blocked: findings.some((f) => f.code !== "RS-CACHE-INVALID")
  };
  writeDrift(projectRoot, report);
  return report;
}
function reconcileRuleScripts(projectRoot) {
  const findings = [];
  const map = loadRuleScriptMap(projectRoot);
  const files = collectRuleFiles(projectRoot);
  const onDisk = /* @__PURE__ */ new Map();
  for (const rel of files) {
    const parsed = parseRuleFile(readFileSync4(join4(projectRoot, rel), "utf8"));
    for (const rule of parsed) {
      if (rule.id === null) {
        findings.push({
          code: "RS-RULE-ADDED",
          source: rel,
          message: `Unmarked rule bullet in ${rel}: "${rule.text}". Run \`analyze rules\`.`
        });
        continue;
      }
      onDisk.set(rule.id, { source: rel, text_hash: rule.text_hash });
    }
  }
  const mapById = new Map((map?.rules ?? []).map((r) => [r.id, r]));
  for (const [id, disk] of onDisk) {
    const entry = mapById.get(id);
    if (!entry) {
      findings.push({
        code: "RS-RULE-ADDED",
        rule_id: id,
        source: disk.source,
        message: `Rule ${id} is marked on disk but absent from the map. Run \`analyze rules\`.`
      });
      continue;
    }
    if (entry.text_hash !== disk.text_hash) {
      findings.push({
        code: "RS-RULE-EDITED",
        rule_id: id,
        source: disk.source,
        message: `Rule ${id} text changed since the map was written. Run \`edit rule ${id}\` or \`generate rule scripts\`.`
      });
      if (entry.scripts.length > 0) {
        findings.push({
          code: "RS-SCRIPT-STALE",
          rule_id: id,
          source: disk.source,
          message: `Rule ${id} was edited but its ${entry.scripts.length} script(s) were not regenerated.`
        });
      }
    }
  }
  for (const entry of map?.rules ?? []) {
    if (!onDisk.has(entry.id)) {
      findings.push({
        code: "RS-RULE-REMOVED",
        rule_id: entry.id,
        source: entry.source,
        message: `Rule ${entry.id} is in the map but its marker is gone from ${entry.source}. Run \`remove rule ${entry.id}\`.`
      });
    }
  }
  for (const entry of map?.rules ?? []) {
    for (const script of entry.scripts) {
      const abs = join4(projectRoot, script.path);
      if (!existsSync3(abs)) {
        continue;
      }
      const result = runFixtures(abs);
      if (!result.passed) {
        findings.push({
          code: "RS-FIXTURE-FAIL",
          rule_id: entry.id,
          source: script.path,
          message: `Script ${script.path} no longer passes its fixtures. Run \`regenerate scripts for rule ${entry.id}\`.`
        });
      }
    }
  }
  const report = readReport(projectRoot);
  if (report && files.length > 0 && findings.length === 0) {
    const currentHash = computeRuleFilesHash(projectRoot, files);
    if (report.rule_files_hash && report.rule_files_hash !== currentHash) {
      findings.push({
        code: "RS-CACHE-INVALID",
        message: "Cached findings report is stale (rule_files_hash mismatch). It will be recomputed."
      });
    }
  }
  const reconcilerOwned = new Set(
    Object.keys(emptyCounts()).filter((c) => !CONFLICT_CODES.has(c))
  );
  return mergeDrift(projectRoot, reconcilerOwned, findings);
}
function writeDrift(projectRoot, report) {
  const path = driftPath(projectRoot);
  mkdirSync2(dirname3(path), { recursive: true });
  writeFileSync3(path, `${JSON.stringify(report, null, 2)}
`, "utf8");
}
function readDrift(projectRoot) {
  const path = driftPath(projectRoot);
  if (!existsSync3(path)) {
    return null;
  }
  try {
    return JSON.parse(readFileSync4(path, "utf8"));
  } catch {
    return null;
  }
}
function recordConflictFindings(projectRoot, conflicts) {
  const findings = conflicts.filter((c) => Array.isArray(c.rule_ids) && c.rule_ids.length > 0).map((c) => ({
    code: "RS-CONFLICT",
    rule_id: c.rule_ids[0],
    message: `${c.message} (conflicting rules: ${c.rule_ids.join(", ")})`
  }));
  return mergeDrift(projectRoot, CONFLICT_CODES, findings);
}

export {
  sha256,
  ruleTextHash,
  parseRuleMarker,
  stripRuleMarker,
  embedRuleMarker,
  mintRuleId,
  isRuleId,
  parseRuleFile,
  embedRuleIds,
  collectRuleFiles,
  computeRuleFilesHash,
  scanAndEmbedIds,
  assembleMap,
  snapshotRuleScriptMap,
  atomicWriteRuleScriptMap,
  applyRuleScriptMap,
  isRuleScriptMapStale,
  compileRuleScripts,
  fixturesRoot,
  runFixtures,
  reconcileRuleScripts,
  readDrift,
  recordConflictFindings
};
