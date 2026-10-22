import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  appendRuleRun
} from "./chunk-EOKSVX6N.js";
import {
  loadChangeEvidence
} from "./chunk-PMSUN52C.js";
import {
  require_out
} from "./chunk-DNG6DDRS.js";
import {
  require_dist
} from "./chunk-QMZL6OH5.js";
import {
  require_ajv
} from "./chunk-WGEG5J6L.js";
import {
  resolveSessionId
} from "./chunk-MG36YCW4.js";
import {
  PATHS
} from "./chunk-UCSN7SVD.js";
import {
  __toESM,
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/rule-scripts/validate.ts
init_esm_shims();
var import_ajv = __toESM(require_ajv(), 1);

// src/rule-scripts/schemas/findings.schema.json
var findings_schema_default = {
  $id: "rule-script-findings",
  type: "object",
  additionalProperties: false,
  required: ["rule_id", "kind", "findings"],
  properties: {
    rule_id: { type: "string", pattern: "^RL-[0-9a-f]{4,}$" },
    kind: { type: "string", enum: ["deterministic", "heuristic"] },
    findings: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["file", "message", "severity"],
        properties: {
          file: { type: "string", minLength: 1 },
          line: { type: "integer", minimum: 0 },
          message: { type: "string", minLength: 1 },
          severity: {
            type: "string",
            enum: ["critical", "blocker", "high", "medium", "low", "nit", "info"]
          }
        }
      }
    }
  }
};

// src/rule-scripts/schemas/script-header.schema.json
var script_header_schema_default = {
  $id: "rule-script-header",
  type: "object",
  additionalProperties: false,
  required: ["rule_id", "source", "kind", "scope", "runtime"],
  properties: {
    rule_id: { type: "string", pattern: "^RL-[0-9a-f]{4,}$" },
    source: { type: "string", minLength: 1 },
    kind: { type: "string", enum: ["deterministic", "heuristic"] },
    scope: {
      type: "string",
      enum: ["changed-files", "whole-tree", "git-diff", "git-history"]
    },
    runtime: { type: "string", const: "node" },
    requires: {
      type: "object",
      additionalProperties: false,
      properties: {
        node: { type: "string" },
        binaries: { type: "array", items: { type: "string" } }
      }
    },
    last_validated_at: { type: "string" },
    false_positive_surface: { type: "string" }
  }
};

// src/rule-scripts/validate.ts
var ajv = new import_ajv.default({ allErrors: true });
var headerValidator = null;
var findingsValidator = null;
function run(validator, data) {
  const valid = validator(data);
  if (valid) {
    return { valid: true, errors: [] };
  }
  const errors = (validator.errors ?? []).map(
    (e) => `${e.instancePath || "(root)"} ${e.message ?? "invalid"}`.trim()
  );
  return { valid: false, errors };
}
function validateScriptHeader(header) {
  headerValidator ??= ajv.compile(script_header_schema_default);
  return run(headerValidator, header);
}
function validateFindings(report) {
  findingsValidator ??= ajv.compile(findings_schema_default);
  return run(findingsValidator, report);
}

// src/rule-scripts/execute.ts
init_esm_shims();
import { spawnSync } from "child_process";
import { accessSync, constants, statSync } from "fs";
import { delimiter, join } from "path";
var DEFAULT_TIMEOUT_MS = 3e4;
function executeRuleScript(scriptPath, payload, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const proc = spawnSync("node", [scriptPath], {
    input: JSON.stringify(payload),
    encoding: "utf8",
    timeout: timeoutMs,
    maxBuffer: 16 * 1024 * 1024
  });
  if (proc.error) {
    const err = proc.error;
    if (proc.signal === "SIGTERM" || err.code === "ETIMEDOUT") {
      return { ok: false, error: `script timed out after ${timeoutMs}ms` };
    }
    return { ok: false, error: `script failed to start: ${proc.error.message}` };
  }
  if (proc.signal) {
    return { ok: false, error: `script killed by signal ${proc.signal}` };
  }
  let parsed;
  let parseFailed = false;
  try {
    parsed = JSON.parse(proc.stdout);
  } catch {
    parseFailed = true;
  }
  if (!parseFailed) {
    const validation = validateFindings(parsed);
    if (validation.valid) {
      const stderr = (proc.stderr || "").trim();
      const warning = proc.status !== 0 ? `script exited ${proc.status}${stderr ? `: ${stderr}` : ""}` : stderr || void 0;
      return warning ? { ok: true, report: parsed, warning } : { ok: true, report: parsed };
    }
    if (proc.status === 0) {
      return { ok: false, error: `findings failed schema: ${validation.errors.join("; ")}` };
    }
  }
  if (proc.status !== 0) {
    const stderr = (proc.stderr || "").trim();
    return {
      ok: false,
      error: `script exited ${proc.status}${stderr ? `: ${stderr}` : " with no parseable findings"}`
    };
  }
  return { ok: false, error: `invalid findings JSON on stdout: ${proc.stdout.slice(0, 200)}` };
}
function isExecutableFile(p) {
  try {
    if (!statSync(p).isFile()) {
      return false;
    }
  } catch {
    return false;
  }
  if (process.platform === "win32") {
    return true;
  }
  try {
    accessSync(p, constants.X_OK);
    return true;
  } catch {
    return false;
  }
}
function isOnPath(bin) {
  if (bin.includes("/") || bin.includes("\\")) {
    return isExecutableFile(bin);
  }
  const dirs = (process.env.PATH ?? "").split(delimiter).filter(Boolean);
  const winExts = process.platform === "win32" ? (process.env.PATHEXT ?? ".EXE;.CMD;.BAT;.COM").split(";") : [];
  const alreadyHasExt = process.platform === "win32" && winExts.some((ext) => bin.toLowerCase().endsWith(ext.toLowerCase()));
  const exts = process.platform === "win32" ? alreadyHasExt ? [""] : winExts : [""];
  return dirs.some((dir) => exts.some((ext) => isExecutableFile(join(dir, `${bin}${ext}`))));
}
function missingBinaries(binaries) {
  if (!binaries || binaries.length === 0) {
    return [];
  }
  return binaries.filter((bin) => !isOnPath(bin));
}

// src/rule-scripts/types.ts
init_esm_shims();
var RULE_SCRIPT_MAP_SCHEMA_VERSION = 1;

// src/rule-scripts/map.ts
init_esm_shims();
var import_yaml = __toESM(require_dist(), 1);
import { existsSync, readFileSync } from "fs";
import { join as join2 } from "path";
function ruleScriptMapPath(projectRoot) {
  return join2(projectRoot, PATHS.RULE_SCRIPT_MAP);
}
function emptyRuleScriptMap(now = /* @__PURE__ */ new Date()) {
  return {
    schema_version: RULE_SCRIPT_MAP_SCHEMA_VERSION,
    generated_at: now.toISOString(),
    rule_files_hash: "",
    rules: []
  };
}
function loadRuleScriptMap(projectRoot) {
  const path = ruleScriptMapPath(projectRoot);
  if (!existsSync(path)) {
    return null;
  }
  const parsed = import_yaml.default.parse(readFileSync(path, "utf8"));
  return parsed ?? null;
}
function serializeRuleScriptMap(map) {
  return import_yaml.default.stringify(map, { indent: 2, lineWidth: 0 });
}

// src/rule-scripts/header.ts
init_esm_shims();
var HEADER_MARKER = "@paqad-rule-script";
var HEADER_LINE_RE = /^\s*\/\/\s*([a-z_]+)\s*:(.*)$/;
function extractHeaderFields(content) {
  const lines = content.split("\n");
  let sawMarker = false;
  const fields = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "") {
      continue;
    }
    if (!trimmed.startsWith("//")) {
      break;
    }
    if (trimmed.includes(HEADER_MARKER)) {
      sawMarker = true;
      continue;
    }
    const m = HEADER_LINE_RE.exec(line);
    if (m) {
      fields[m[1]] = m[2].trim();
    }
  }
  return sawMarker ? fields : null;
}
function coerce(fields) {
  const out = {};
  for (const [key, raw] of Object.entries(fields)) {
    if (key === "requires") {
      try {
        out.requires = JSON.parse(raw);
      } catch {
        out.requires = raw;
      }
      continue;
    }
    const value = raw.replace(/^"(.*)"$/, "$1");
    if (key === "rule_id") {
      out[key] = value.replace(/^RL-([0-9a-fA-F]+)$/, (_, h) => `RL-${h.toLowerCase()}`);
    } else if (key === "kind" || key === "scope" || key === "runtime") {
      out[key] = value.toLowerCase();
    } else {
      out[key] = value;
    }
  }
  return out;
}
function parseScriptHeader(content) {
  const fields = extractHeaderFields(content);
  if (fields === null) {
    return { ok: false, errors: [`missing ${HEADER_MARKER} header`] };
  }
  const coerced = coerce(fields);
  const result = validateScriptHeader(coerced);
  if (!result.valid) {
    return { ok: false, errors: result.errors };
  }
  return { ok: true, header: coerced, errors: [] };
}

// src/rule-scripts/runner.ts
init_esm_shims();
import { createHash } from "crypto";
import { existsSync as existsSync2, mkdirSync, readFileSync as readFileSync2, writeFileSync } from "fs";
import { dirname, join as join3 } from "path";

// src/core/fs/gitignore-scan.ts
init_esm_shims();
var import_fast_glob = __toESM(require_out(), 1);
import { execFileSync } from "child_process";
var DEFAULT_SOURCE_GLOBS = ["**/*.{ts,tsx,js,jsx,mjs,cjs,vue,svelte}"];
var DEFAULT_IGNORE_GLOBS = [
  "**/node_modules/**",
  "**/dist/**",
  "**/.paqad/**",
  "**/build/**",
  "**/vendor/**"
];
function dropGitIgnored(projectRoot, files) {
  try {
    const out = execFileSync("git", ["check-ignore", "-z", "--stdin"], {
      cwd: projectRoot,
      input: files.join("\0"),
      stdio: ["pipe", "pipe", "ignore"]
    });
    const ignored = new Set(out.toString("utf8").split("\0").filter(Boolean));
    return files.filter((f) => !ignored.has(f));
  } catch {
    return files;
  }
}
function scanWorkingTree(projectRoot, globs = DEFAULT_SOURCE_GLOBS, ignore = DEFAULT_IGNORE_GLOBS) {
  const listed = import_fast_glob.default.sync(globs, { cwd: projectRoot, ignore, onlyFiles: true });
  return dropGitIgnored(projectRoot, listed).sort();
}

// src/rule-scripts/runner.ts
function sha256(input) {
  return createHash("sha256").update(input).digest("hex");
}
function hashFiles(projectRoot, files) {
  const parts = files.slice().sort().map((rel) => {
    const abs = join3(projectRoot, rel);
    return existsSync2(abs) ? `${rel}
${readFileSync2(abs, "utf8")}` : `${rel}
<absent>`;
  });
  return `sha256-${sha256(parts.join("\n"))}`;
}
function scriptFilesHash(projectRoot, map) {
  const paths = map.rules.flatMap((r) => r.scripts.map((s) => s.path)).sort();
  return hashFiles(projectRoot, paths);
}
function targetsFor(script, opts, wholeTreeFiles) {
  if (script.scope === "changed-files" && opts.changedFiles) {
    return opts.changedFiles;
  }
  return wholeTreeFiles;
}
function reportPath(projectRoot) {
  return join3(projectRoot, PATHS.RULE_SCRIPTS_REPORT);
}
function runRuleScripts(opts) {
  const map = loadRuleScriptMap(opts.projectRoot);
  const now = (/* @__PURE__ */ new Date()).toISOString();
  if (!map) {
    return {
      generated_at: now,
      mode: opts.mode,
      rule_files_hash: "",
      script_files_hash: "",
      target_files_hash: "",
      results: [],
      counts: { deterministic: 0, heuristic: 0, skipped: 0 },
      blocking: false
    };
  }
  const globs = opts.wholeTreeGlobs ?? DEFAULT_SOURCE_GLOBS;
  const wholeTreeFiles = scanWorkingTree(opts.projectRoot, globs);
  const hasNonChangedScope = map.rules.some(
    (r) => r.scripts.some((s) => s.scope !== "changed-files")
  );
  const targetUniverse = opts.changedFiles === void 0 ? wholeTreeFiles : hasNonChangedScope ? Array.from(/* @__PURE__ */ new Set([...opts.changedFiles, ...wholeTreeFiles])) : opts.changedFiles;
  const scriptHash = scriptFilesHash(opts.projectRoot, map);
  const targetHash = hashFiles(opts.projectRoot, targetUniverse);
  const cached = readReport(opts.projectRoot);
  if (cached && cached.mode === opts.mode && cached.rule_files_hash === map.rule_files_hash && cached.script_files_hash === scriptHash && cached.target_files_hash === targetHash) {
    recordRuleRun(opts.projectRoot, cached, true);
    return { ...cached, from_cache: true };
  }
  const results = [];
  for (const rule of map.rules) {
    for (const script of rule.scripts) {
      const scriptAbs = join3(opts.projectRoot, script.path);
      if (!existsSync2(scriptAbs)) {
        results.push({
          rule_id: rule.id,
          script: script.path,
          kind: script.kind,
          findings: [],
          skipped: "script-file-missing"
        });
        continue;
      }
      const header = parseScriptHeader(readFileSync2(scriptAbs, "utf8"));
      const missing = missingBinaries(header.header?.requires?.binaries);
      if (missing.length > 0) {
        results.push({
          rule_id: rule.id,
          script: script.path,
          kind: script.kind,
          findings: [],
          skipped: `missing dependency: ${missing.join(", ")}`
        });
        continue;
      }
      const targets = targetsFor(script, opts, wholeTreeFiles);
      const run2 = executeRuleScript(scriptAbs, { projectRoot: opts.projectRoot, files: targets });
      if (!run2.ok) {
        results.push({
          rule_id: rule.id,
          script: script.path,
          kind: script.kind,
          findings: [],
          skipped: `error: ${run2.error}`
        });
        continue;
      }
      results.push({
        rule_id: rule.id,
        script: script.path,
        kind: script.kind,
        findings: run2.report?.findings ?? [],
        ...run2.warning ? { warning: run2.warning } : {}
      });
    }
  }
  const deterministic = results.filter((r) => r.kind === "deterministic" && !r.skipped).reduce((n, r) => n + r.findings.length, 0);
  const heuristic = results.filter((r) => r.kind === "heuristic" && !r.skipped).reduce((n, r) => n + r.findings.length, 0);
  const skipped = results.filter((r) => r.skipped).length;
  const report = {
    generated_at: now,
    mode: opts.mode,
    rule_files_hash: map.rule_files_hash,
    script_files_hash: scriptHash,
    target_files_hash: targetHash,
    results,
    counts: { deterministic, heuristic, skipped },
    blocking: opts.mode === "strict" && deterministic > 0
  };
  writeReport(opts.projectRoot, report);
  recordRuleRun(opts.projectRoot, report, false);
  return report;
}
function ruleRunFindings(report) {
  if (!Array.isArray(report.results)) return void 0;
  return report.results.filter((result) => !result.skipped).flatMap(
    (result) => result.findings.map((finding) => ({
      rule_id: result.rule_id,
      file: finding.file,
      line: finding.line ?? null,
      message: finding.message,
      severity: finding.severity
    }))
  );
}
function recordRuleRun(projectRoot, report, fromCache) {
  appendRuleRun(
    projectRoot,
    resolveSessionId(projectRoot, process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? null),
    {
      kind: "findings",
      counts: report.counts,
      blocking: report.blocking,
      findings: ruleRunFindings(report),
      from_cache: fromCache
    }
  );
}
function readReport(projectRoot) {
  const path = reportPath(projectRoot);
  if (!existsSync2(path)) {
    return null;
  }
  try {
    return JSON.parse(readFileSync2(path, "utf8"));
  } catch {
    return null;
  }
}
function writeReport(projectRoot, report) {
  const path = reportPath(projectRoot);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, `${JSON.stringify(report, null, 2)}
`, "utf8");
}

// src/rule-scripts/enforce.ts
init_esm_shims();
async function enforceRuleScripts(options) {
  const { projectRoot, mode } = options;
  const map = loadRuleScriptMap(projectRoot);
  const armed = map ? map.rules.reduce((total, rule) => total + (rule.scripts?.length ?? 0), 0) : 0;
  if (mode === "off" || armed === 0) {
    return { ran: false, mode, blocking: false, violations: [], armed, summary: "" };
  }
  const scope = options.scope ?? "changed-files";
  const changedFiles = options.changedFiles ?? (await loadChangeEvidence(projectRoot)).files;
  if (scope === "changed-files" && changedFiles.length === 0) {
    return {
      ran: false,
      mode,
      blocking: false,
      violations: [],
      armed,
      summary: "**\u25B8 paqad** \xB7 \u26AA scripted rules: skipped (no files changed this turn)"
    };
  }
  const report = runRuleScripts({
    projectRoot,
    mode,
    changedFiles: changedFiles.length > 0 ? changedFiles : void 0
  });
  const titles = new Map((map?.rules ?? []).map((rule) => [rule.id, rule.text]));
  const violations = report.results.filter((r) => !r.skipped && r.kind === "deterministic").flatMap(
    (r) => r.findings.map((f) => ({
      rule_id: r.rule_id,
      ...titles.has(r.rule_id) ? { title: titles.get(r.rule_id) } : {},
      script: r.script,
      file: f.file,
      line: f.line,
      message: f.message,
      severity: f.severity
    }))
  );
  return {
    ran: true,
    mode,
    blocking: report.blocking,
    violations,
    armed,
    summary: formatEnforcementSummary({ mode, blocking: report.blocking, violations })
  };
}
function formatEnforcementSummary(result) {
  if (result.violations.length === 0) {
    return "**\u25B8 paqad** \xB7 scripted rules: \u{1F7E2} all clear";
  }
  const verb = result.blocking ? "Needs your attention" : "Heads up";
  const glyph = result.blocking ? "\u{1F534}" : "\u{1F7E1}";
  const lines = result.violations.slice(0, 20).map(
    (v) => `> - ${glyph} ${v.rule_id} \xB7 ${v.file}${v.line ? `:${v.line}` : ""} \u2014 ${v.message}`
  );
  const more = result.violations.length > 20 ? `> - \u2026and ${result.violations.length - 20} more
` : "";
  const header = result.blocking ? "I caught scripted-rule violations before this could ship \u2014 enforced even though their text was not loaded." : "Scripted-rule findings (warn mode, not blocking):";
  return `**\u25B8 paqad** \xB7 ${verb}
> ${header}
${lines.join("\n")}
${more}`.trimEnd();
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

// src/rule-scripts/integrity.ts
init_esm_shims();
import { createHash as createHash2 } from "crypto";
function computeRuleScriptsDigest(projectRoot) {
  const map = loadRuleScriptMap(projectRoot);
  if (!map) {
    return null;
  }
  const hash = createHash2("sha256");
  hash.update(serializeRuleScriptMap(map));
  hash.update("\0");
  hash.update(scriptFilesHash(projectRoot, map));
  return hash.digest("hex");
}

// src/kernel/capability-lock.ts
init_esm_shims();
import { existsSync as existsSync3, mkdirSync as mkdirSync2, readFileSync as readFileSync3, writeFileSync as writeFileSync2 } from "fs";
import { dirname as dirname2, join as join4 } from "path";
var CAPABILITY_LOCK_SCHEMA_VERSION = 1;
function capabilityLockPath(projectRoot) {
  return join4(projectRoot, PATHS.CAPABILITY_LOCK);
}
function readCapabilityLock(projectRoot) {
  const path = capabilityLockPath(projectRoot);
  if (!existsSync3(path)) {
    return null;
  }
  try {
    const parsed = JSON.parse(readFileSync3(path, "utf8"));
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
  mkdirSync2(dirname2(path), { recursive: true });
  writeFileSync2(path, `${JSON.stringify(lock, null, 2)}
`, "utf8");
}

export {
  DEFAULT_IGNORE_GLOBS,
  dropGitIgnored,
  scanWorkingTree,
  validateScriptHeader,
  validateFindings,
  executeRuleScript,
  isOnPath,
  missingBinaries,
  RULE_SCRIPT_MAP_SCHEMA_VERSION,
  ruleScriptMapPath,
  emptyRuleScriptMap,
  loadRuleScriptMap,
  serializeRuleScriptMap,
  HEADER_MARKER,
  extractHeaderFields,
  parseScriptHeader,
  scriptFilesHash,
  runRuleScripts,
  ruleRunFindings,
  readReport,
  enforceRuleScripts,
  formatEnforcementSummary,
  computeRuleScriptsDigest,
  getCapability,
  capabilitiesForSeam,
  readCapabilityDigest,
  readCapabilityVersions,
  writeCapabilityDigest
};
