import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  RULE_SCRIPT_MAP_SCHEMA_VERSION,
  executeRuleScript,
  loadRuleScriptMap,
  missingBinaries,
  parseScriptHeader,
  readReport,
  ruleScriptMapPath,
  scriptFilesHash,
  serializeRuleScriptMap
} from "./chunk-HULYX26E.js";
import {
  toPosixPath
} from "./chunk-DE72RWA7.js";
import {
  require_out
} from "./chunk-5KDVEW3I.js";
import {
  embedRuleMarker,
  mintRuleId,
  ruleTextHash,
  sha256,
  stripRuleMarker
} from "./chunk-XK65VKUF.js";
import {
  PATHS
} from "./chunk-UMPIHMXN.js";
import {
  __toESM,
  init_esm_shims
} from "./chunk-G5ZPBAMA.js";

// src/rule-scripts/integrity.ts
init_esm_shims();
import { createHash } from "crypto";
function computeRuleScriptsDigest(projectRoot) {
  const map = loadRuleScriptMap(projectRoot);
  if (!map) {
    return null;
  }
  const hash = createHash("sha256");
  hash.update(serializeRuleScriptMap(map));
  hash.update("\0");
  hash.update(scriptFilesHash(projectRoot, map));
  return hash.digest("hex");
}

// src/kernel/registry.ts
init_esm_shims();
var CAPABILITY_REGISTRY = Object.freeze([
  {
    id: "stages",
    title: "Feature-development stages",
    modeKey: "stages_mode",
    enforcementFloor: "block",
    seam: ["pre-mutation", "completion"],
    ledgerDocType: "stage-evidence",
    policySchemaVersion: 1,
    recordSchemaVersion: 1
  },
  {
    id: "rule-scripts",
    title: "Scripted-rule enforcement",
    modeKey: "rule_compliance",
    enforcementFloor: "block",
    seam: ["pre-mutation", "completion"],
    ledgerDocType: null,
    policySchemaVersion: 1,
    recordSchemaVersion: 1
  },
  {
    id: "rules-loaded",
    title: "Rule loading",
    modeKey: null,
    enforcementFloor: "block",
    seam: ["pre-mutation"],
    ledgerDocType: null,
    policySchemaVersion: 1,
    recordSchemaVersion: 1
  },
  {
    id: "decision-pause",
    title: "Decision Pause Contract",
    modeKey: null,
    enforcementFloor: "block",
    seam: ["pre-mutation", "completion"],
    ledgerDocType: "decision-evidence",
    policySchemaVersion: 1,
    recordSchemaVersion: 1
  },
  {
    id: "narration",
    title: "Narration contract",
    modeKey: null,
    enforcementFloor: "unbindable",
    seam: [],
    ledgerDocType: null,
    policySchemaVersion: 1,
    recordSchemaVersion: 1
  },
  {
    id: "delivery",
    title: "Delivery policy",
    modeKey: null,
    enforcementFloor: "warn",
    seam: ["completion"],
    ledgerDocType: "delivery-evidence",
    policySchemaVersion: 1,
    recordSchemaVersion: 1
  }
]);
function getCapability(id) {
  const found = CAPABILITY_REGISTRY.find((capability) => capability.id === id);
  if (!found) {
    throw new Error(`Unknown capability id: ${id}`);
  }
  return found;
}
function capabilitiesForSeam(seam) {
  return CAPABILITY_REGISTRY.filter((capability) => capability.seam.includes(seam));
}

// src/kernel/capability-lock.ts
init_esm_shims();
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
var CAPABILITY_LOCK_SCHEMA_VERSION = 1;
function capabilityLockPath(projectRoot) {
  return join(projectRoot, PATHS.CAPABILITY_LOCK);
}
function readCapabilityLock(projectRoot) {
  const path = capabilityLockPath(projectRoot);
  if (!existsSync(path)) {
    return null;
  }
  try {
    const parsed = JSON.parse(readFileSync(path, "utf8"));
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}
function readCapabilityDigest(projectRoot, capabilityId) {
  const lock = readCapabilityLock(projectRoot);
  const entry = lock?.capabilities?.[capabilityId];
  return entry && typeof entry.digest === "string" ? entry.digest : null;
}
function readCapabilityVersions(projectRoot, capabilityId) {
  const entry = readCapabilityLock(projectRoot)?.capabilities?.[capabilityId];
  if (!entry || typeof entry.policy_version !== "number" || typeof entry.record_version !== "number") {
    return null;
  }
  return { policy: entry.policy_version, record: entry.record_version };
}
function writeCapabilityDigest(projectRoot, capabilityId, digest, now = /* @__PURE__ */ new Date()) {
  const existing = readCapabilityLock(projectRoot);
  const descriptor = CAPABILITY_REGISTRY.find((capability) => capability.id === capabilityId);
  const versions = descriptor ? {
    policy_version: descriptor.policySchemaVersion,
    record_version: descriptor.recordSchemaVersion
  } : {};
  const lock = {
    schema_version: CAPABILITY_LOCK_SCHEMA_VERSION,
    generated_at: now.toISOString(),
    capabilities: {
      ...existing?.capabilities ?? {},
      [capabilityId]: { ...existing?.capabilities?.[capabilityId] ?? {}, digest, ...versions }
    }
  };
  const path = capabilityLockPath(projectRoot);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(lock, null, 2)}
`, "utf8");
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
import { readFileSync as readFileSync2, writeFileSync as writeFileSync2 } from "fs";
import { join as join2 } from "path";
function collectRuleFiles(projectRoot) {
  const rel = import_fast_glob.default.sync("**/*.md", {
    cwd: join2(projectRoot, PATHS.RULES_DIR),
    onlyFiles: true
  });
  return rel.map((r) => toPosixPath(join2(PATHS.RULES_DIR, r))).sort();
}
function computeRuleFilesHash(projectRoot, files) {
  const parts = files.slice().sort().map((rel) => `${rel}
${readFileSync2(join2(projectRoot, rel), "utf8")}`);
  return `sha256-${sha256(parts.join("\n"))}`;
}
function scanAndEmbedIds(projectRoot) {
  const files = collectRuleFiles(projectRoot);
  const taken = /* @__PURE__ */ new Set();
  const inventory = [];
  const changed = [];
  for (const rel of files) {
    const abs = join2(projectRoot, rel);
    const before = readFileSync2(abs, "utf8");
    const { content, rules } = embedRuleIds(rel, before, taken);
    if (content !== before) {
      writeFileSync2(abs, content, "utf8");
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
var ONBOARDING_REASON_PREFIX = "onboarding:";
function isOnboardingUnverifiable(entry) {
  return entry?.verifiability.kind === "unverifiable" && (entry.verifiability.reason ?? "").startsWith(ONBOARDING_REASON_PREFIX);
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
    const keptOnboardingVerdict = isOnboardingUnverifiable(prior) ? prior?.verifiability : void 0;
    return {
      id: item.id,
      source: item.source,
      text: item.text,
      text_hash: item.text_hash,
      verifiability: keptOnboardingVerdict ?? cls?.verifiability ?? prior?.verifiability ?? { kind: "heuristic" },
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
  existsSync as existsSync2,
  mkdirSync as mkdirSync2,
  readFileSync as readFileSync3,
  renameSync,
  writeFileSync as writeFileSync3
} from "fs";
import { dirname as dirname2, join as join3 } from "path";
function historyDir(projectRoot) {
  return join3(projectRoot, PATHS.RULE_SCRIPT_MAP_HISTORY_DIR);
}
function eventsLog(projectRoot) {
  return join3(projectRoot, PATHS.RULE_SCRIPT_MAP_EVENTS_LOG);
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
  mkdirSync2(histDir, { recursive: true });
  const unique = `${process.pid}-${(snapshotSeq++).toString(36)}`;
  const snapPath = join3(histDir, `${timestampForFilename(now)}-${sanitiseVia(via)}-${unique}.yml`);
  const existing = existsSync2(mapPath) ? readFileSync3(mapPath, "utf8") : "";
  writeFileSync3(snapPath, existing, "utf8");
  return toPosixPath(snapPath);
}
function atomicWriteRuleScriptMap(projectRoot, yaml) {
  const mapPath = ruleScriptMapPath(projectRoot);
  mkdirSync2(dirname2(mapPath), { recursive: true });
  const tmpPath = `${mapPath}.tmp-${process.pid}-${Date.now()}`;
  writeFileSync3(tmpPath, yaml, "utf8");
  renameSync(tmpPath, mapPath);
}
function appendEvent(projectRoot, event) {
  const log = eventsLog(projectRoot);
  mkdirSync2(dirname2(log), { recursive: true });
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
  const digest = opts.keepDigest === true ? null : computeRuleScriptsDigest(opts.projectRoot);
  if (digest !== null) {
    writeCapabilityDigest(opts.projectRoot, "rule-scripts", digest, now);
  }
  return { snapshot_path: snapshot, applied_at: now.toISOString() };
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

// src/rule-scripts/compile.ts
init_esm_shims();
function isRuleScriptMapStale(projectRoot) {
  const map = loadRuleScriptMap(projectRoot);
  if (!map) return true;
  return map.rule_files_hash !== computeRuleFilesHash(projectRoot, collectRuleFiles(projectRoot));
}
function isRuleScriptMapCurrent(projectRoot) {
  try {
    return !isRuleScriptMapStale(projectRoot);
  } catch {
    return false;
  }
}
function dropRuleScriptMapSources(projectRoot, sources, mapWasCurrent, repairedTexts = []) {
  const map = loadRuleScriptMap(projectRoot);
  if (!map) return;
  const dropped = map.rules.filter((rule) => sources.includes(rule.source));
  const edits = repairedTexts.filter((edit) => map.rules.some((rule) => rule.id === edit.id));
  const ruleFilesHash = mapWasCurrent ? computeRuleFilesHash(projectRoot, collectRuleFiles(projectRoot)) : map.rule_files_hash;
  if (dropped.length === 0 && edits.length === 0 && ruleFilesHash === map.rule_files_hash) return;
  const digestWasValid = readCapabilityDigest(projectRoot, "rule-scripts") === computeRuleScriptsDigest(projectRoot);
  const edited = edits.reduce(
    (current, edit) => setRuleText(current, edit.id, edit.text, ruleTextHash(edit.text)),
    map
  );
  applyRuleScriptMap({
    projectRoot,
    map: {
      ...edited,
      rule_files_hash: ruleFilesHash,
      rules: edited.rules.filter((rule) => !sources.includes(rule.source))
    },
    via: "update-cleanup",
    event: dropped.length > 0 ? {
      action: "remove",
      rule_ids: dropped.map((rule) => rule.id),
      note: sources.join(", ")
    } : {
      action: edits.length > 0 ? "edit" : "reconcile",
      rule_ids: edits.map((edit) => edit.id),
      note: "refreshed the rule file hash after update"
    },
    keepDigest: !digestWasValid
  });
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
import { existsSync as existsSync3, readFileSync as readFileSync4 } from "fs";
import { basename, dirname as dirname3, join as join4 } from "path";
function fixturesRoot(scriptPath) {
  const dir = dirname3(scriptPath);
  const stem = basename(scriptPath).replace(/\.mjs$/, "");
  return join4(dir, stem, "__fixtures__");
}
function listFixtures(dir) {
  if (!existsSync3(dir)) {
    return [];
  }
  return import_fast_glob2.default.sync("**/*", { cwd: dir, onlyFiles: true, dot: false }).sort();
}
function runFixtures(scriptPath) {
  const root = fixturesRoot(scriptPath);
  const passDir = join4(root, "pass");
  const failDir = join4(root, "fail");
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
  if (existsSync3(scriptPath)) {
    const header = parseScriptHeader(readFileSync4(scriptPath, "utf8"));
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
import { existsSync as existsSync4, mkdirSync as mkdirSync3, readFileSync as readFileSync5, renameSync as renameSync2, writeFileSync as writeFileSync4 } from "fs";
import { dirname as dirname4, join as join5 } from "path";
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
  return join5(projectRoot, PATHS.RULE_SCRIPTS_DRIFT);
}
var CONFLICT_CODES = /* @__PURE__ */ new Set(["RS-CONFLICT"]);
function mergeDrift(projectRoot, ownedCodes, ownFindings) {
  const path = driftPath(projectRoot);
  if (existsSync4(path) && readDrift(projectRoot) === null) {
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
    const parsed = parseRuleFile(readFileSync5(join5(projectRoot, rel), "utf8"));
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
      const abs = join5(projectRoot, script.path);
      if (!existsSync4(abs)) {
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
  mkdirSync3(dirname4(path), { recursive: true });
  writeFileSync4(path, `${JSON.stringify(report, null, 2)}
`, "utf8");
}
function readDrift(projectRoot) {
  const path = driftPath(projectRoot);
  if (!existsSync4(path)) {
    return null;
  }
  try {
    return JSON.parse(readFileSync5(path, "utf8"));
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
  computeRuleScriptsDigest,
  getCapability,
  capabilitiesForSeam,
  readCapabilityDigest,
  readCapabilityVersions,
  parseRuleFile,
  embedRuleIds,
  collectRuleFiles,
  computeRuleFilesHash,
  scanAndEmbedIds,
  ONBOARDING_REASON_PREFIX,
  assembleMap,
  snapshotRuleScriptMap,
  atomicWriteRuleScriptMap,
  applyRuleScriptMap,
  upsertScriptEntry,
  addRuleEntry,
  setRuleText,
  clearRuleScripts,
  setVerifiability,
  archiveRule,
  isRuleScriptMapStale,
  isRuleScriptMapCurrent,
  dropRuleScriptMapSources,
  compileRuleScripts,
  fixturesRoot,
  runFixtures,
  reconcileRuleScripts,
  readDrift,
  recordConflictFindings
};
