import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  writeFileAtomic
} from "./chunk-IN2AVDIO.js";
import {
  appendRuleRun
} from "./chunk-GUPY77J4.js";
import {
  loadChangeEvidence
} from "./chunk-3CT677IB.js";
import {
  require_out
} from "./chunk-DNG6DDRS.js";
import {
  isPaqadArtifactPath
} from "./chunk-BIG27WNV.js";
import {
  require_dist,
  resolveRuleGateConfig
} from "./chunk-VD7SJHT4.js";
import {
  require_ajv
} from "./chunk-WGEG5J6L.js";
import {
  resolveSessionId
} from "./chunk-HV6ESCNW.js";
import {
  isAbsolute,
  normalize,
  relative
} from "./chunk-3STC3IVL.js";
import {
  PATHS
} from "./chunk-LW3OCT4Y.js";
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
    per_file: { type: "boolean" },
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
import { spawn, spawnSync } from "child_process";
import { accessSync, constants, statSync } from "fs";
import { delimiter, join } from "path";
var DEFAULT_TIMEOUT_MS = 3e4;
var MAX_OUTPUT_BYTES = 16 * 1024 * 1024;
var SCRIPT_ABORTED_ERROR = "script stopped: the rule gate ran out of time";
function executeRuleScript(scriptPath, payload, timeoutMs = DEFAULT_TIMEOUT_MS) {
  const proc = spawnSync("node", [scriptPath], {
    input: JSON.stringify(payload),
    encoding: "utf8",
    timeout: timeoutMs,
    maxBuffer: MAX_OUTPUT_BYTES
  });
  const error = proc.error;
  return interpretOutcome(
    {
      ...error ? { error: { code: error.code, message: error.message } } : {},
      signal: proc.signal,
      status: proc.status,
      stdout: proc.stdout,
      stderr: proc.stderr
    },
    timeoutMs
  );
}
function executeRuleScriptAsync(scriptPath, payload, options = {}) {
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  if (options.signal?.aborted) {
    return Promise.resolve({ ok: false, error: SCRIPT_ABORTED_ERROR });
  }
  return new Promise((resolve) => {
    const child = spawn("node", [scriptPath], { stdio: ["pipe", "pipe", "pipe"] });
    const stdout = [];
    const stderr = [];
    const sizes = { stdout: 0, stderr: 0 };
    let forced;
    let aborted = false;
    let settled = false;
    const stop = (error) => {
      if (forced || aborted) return;
      forced = error;
      child.kill("SIGTERM");
    };
    const timer = setTimeout(
      () => stop({ code: "ETIMEDOUT", message: "spawn node ETIMEDOUT" }),
      timeoutMs
    );
    const onAbort = () => {
      aborted = true;
      child.kill("SIGKILL");
    };
    options.signal?.addEventListener("abort", onAbort, { once: true });
    const collect = (stream, sink) => (chunk) => {
      sizes[stream] += chunk.length;
      sink.push(chunk);
      if (sizes[stream] > MAX_OUTPUT_BYTES) {
        stop({ code: "ENOBUFS", message: "spawn node ENOBUFS" });
      }
    };
    child.stdout.on("data", collect("stdout", stdout));
    child.stderr.on("data", collect("stderr", stderr));
    const finish = (outcome) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      options.signal?.removeEventListener("abort", onAbort);
      resolve(
        aborted ? { ok: false, error: SCRIPT_ABORTED_ERROR } : interpretOutcome(outcome, timeoutMs)
      );
    };
    child.on("error", (error) => {
      finish({
        error: { code: error.code, message: error.message },
        signal: null,
        status: null,
        stdout: "",
        stderr: ""
      });
    });
    child.on("close", (status, signal) => {
      finish({
        ...forced ? { error: forced } : {},
        signal: forced ? "SIGTERM" : signal,
        status: forced ? null : status,
        stdout: Buffer.concat(stdout).toString("utf8"),
        stderr: Buffer.concat(stderr).toString("utf8")
      });
    });
    child.stdin.on("error", (error) => {
      if (error.code !== "EPIPE") stop({ code: error.code, message: error.message });
    });
    child.stdin.end(JSON.stringify(payload));
  });
}
function interpretOutcome(proc, timeoutMs) {
  if (proc.error) {
    if (proc.signal === "SIGTERM" || proc.error.code === "ETIMEDOUT") {
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
var BOOLEAN_WORDS = /* @__PURE__ */ new Map([
  ["true", true],
  ["false", false]
]);
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
    } else if (key === "per_file") {
      out[key] = BOOLEAN_WORDS.get(value.toLowerCase()) ?? value;
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
import { existsSync as existsSync2, readFileSync as readFileSync3 } from "fs";
import { join as join4 } from "path";

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

// src/core/run-pool.ts
init_esm_shims();
async function runPool(items, limit, runOne) {
  const results = new Array(items.length);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await runOne(items[index], index);
    }
  };
  const workerCount = Math.max(1, Math.min(limit, items.length));
  await Promise.all(Array.from({ length: workerCount }, () => worker()));
  return results;
}

// src/rule-scripts/file-cache.ts
init_esm_shims();
import { createHash } from "crypto";
import { readFileSync as readFileSync2 } from "fs";
import { join as join3 } from "path";
var FILE_RESULTS_VERSION = 1;
function sha256Text(text) {
  return createHash("sha256").update(text).digest("hex");
}
function entryKey(script, file) {
  return `${script}
${file}`;
}
function isFinding(value) {
  const finding = value;
  return typeof finding === "object" && finding !== null && typeof finding.file === "string" && typeof finding.message === "string" && typeof finding.severity === "string";
}
function isEntry(value) {
  const entry = value;
  return typeof entry === "object" && entry !== null && typeof entry.script === "string" && typeof entry.script_sha256 === "string" && typeof entry.file === "string" && typeof entry.file_sha256 === "string" && Array.isArray(entry.findings) && entry.findings.every(isFinding);
}
function fileResultsPath(projectRoot) {
  return join3(projectRoot, PATHS.RULE_SCRIPTS_FILE_RESULTS);
}
function readFileResults(projectRoot) {
  const entries = /* @__PURE__ */ new Map();
  let parsed;
  try {
    parsed = JSON.parse(readFileSync2(fileResultsPath(projectRoot), "utf8"));
  } catch {
    return entries;
  }
  const doc = parsed;
  if (doc?.version !== FILE_RESULTS_VERSION || !Array.isArray(doc.entries)) {
    return entries;
  }
  for (const entry of doc.entries) {
    if (isEntry(entry)) entries.set(entryKey(entry.script, entry.file), entry);
  }
  return entries;
}
function openFileResultsCache(projectRoot) {
  const entries = readFileResults(projectRoot);
  const fileShas = /* @__PURE__ */ new Map();
  const fileSha = (file) => {
    if (!fileShas.has(file)) {
      let sha;
      try {
        sha = sha256Text(readFileSync2(join3(projectRoot, file), "utf8"));
      } catch {
        sha = null;
      }
      fileShas.set(file, sha);
    }
    return fileShas.get(file) ?? null;
  };
  const keep = (entry) => fileSha(entry.script) === entry.script_sha256 && fileSha(entry.file) === entry.file_sha256;
  return {
    lookup(script, scriptSha, file) {
      const entry = entries.get(entryKey(script, file));
      const sha = fileSha(file);
      if (!entry || sha === null) return void 0;
      return entry.script_sha256 === scriptSha && entry.file_sha256 === sha ? entry.findings : void 0;
    },
    store(script, scriptSha, file, findings) {
      const sha = fileSha(file);
      if (sha === null) return;
      entries.set(entryKey(script, file), {
        script,
        script_sha256: scriptSha,
        file,
        file_sha256: sha,
        findings
      });
    },
    save() {
      const kept = [...entries.values()].filter(keep).sort((a, b) => entryKey(a.script, a.file).localeCompare(entryKey(b.script, b.file)));
      writeFileAtomic(
        fileResultsPath(projectRoot),
        `${JSON.stringify({ version: FILE_RESULTS_VERSION, entries: kept })}
`
      );
    }
  };
}

// src/rule-scripts/runner.ts
function hashFiles(projectRoot, files) {
  const parts = files.slice().sort().map((rel) => {
    const abs = join4(projectRoot, rel);
    return existsSync2(abs) ? `${rel}
${readFileSync3(abs, "utf8")}` : `${rel}
<absent>`;
  });
  return `sha256-${sha256Text(parts.join("\n"))}`;
}
function scriptFilesHash(projectRoot, map) {
  const paths = map.rules.flatMap((r) => r.scripts.map((s) => s.path)).sort();
  return hashFiles(projectRoot, paths);
}
function runFilter(opts) {
  if (opts.kinds === void 0 && opts.scopes === void 0) {
    return void 0;
  }
  return {
    ...opts.kinds ? { kinds: [...opts.kinds] } : {},
    ...opts.scopes ? { scopes: [...opts.scopes] } : {}
  };
}
function selectScripts(map, filter) {
  return map.rules.flatMap(
    (rule) => rule.scripts.filter(
      (script) => (filter?.kinds === void 0 || filter.kinds.includes(script.kind)) && (filter?.scopes === void 0 || filter.scopes.includes(script.scope))
    ).map((script) => ({ rule, script }))
  );
}
function selectedScriptsHash(projectRoot, map, selected, filter) {
  if (filter === void 0) {
    return scriptFilesHash(projectRoot, map);
  }
  return hashFiles(
    projectRoot,
    selected.map((entry) => entry.script.path)
  );
}
function emptyReport(opts, now) {
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
function skippedResult(entry, skipped) {
  return {
    rule_id: entry.rule.id,
    script: entry.script.path,
    kind: entry.script.kind,
    findings: [],
    skipped
  };
}
function prepareRun(opts) {
  const map = loadRuleScriptMap(opts.projectRoot);
  const now = (/* @__PURE__ */ new Date()).toISOString();
  if (!map) {
    return { done: emptyReport(opts, now) };
  }
  const filter = runFilter(opts);
  const selected = selectScripts(map, filter);
  const needsTree = opts.changedFiles === void 0 || selected.some((entry) => entry.script.scope !== "changed-files");
  const wholeTreeFiles = needsTree ? scanWorkingTree(opts.projectRoot, opts.wholeTreeGlobs ?? DEFAULT_SOURCE_GLOBS) : [];
  const targetUniverse = opts.changedFiles === void 0 ? wholeTreeFiles : needsTree ? Array.from(/* @__PURE__ */ new Set([...opts.changedFiles, ...wholeTreeFiles])) : opts.changedFiles;
  const scriptHash = selectedScriptsHash(opts.projectRoot, map, selected, filter);
  const targetHash = hashFiles(opts.projectRoot, targetUniverse);
  const reportFile = filter === void 0 ? PATHS.RULE_SCRIPTS_REPORT : PATHS.RULE_SCRIPTS_PRE_MUTATION_REPORT;
  const cached = readReportFile(opts.projectRoot, reportFile);
  if (cached && cached.mode === opts.mode && cached.rule_files_hash === map.rule_files_hash && cached.script_files_hash === scriptHash && cached.target_files_hash === targetHash && JSON.stringify(cached.filter) === JSON.stringify(filter)) {
    recordRuleRun(opts.projectRoot, cached, true);
    return { done: { ...cached, from_cache: true } };
  }
  const slots = selected.map((entry, index) => {
    const scriptAbs = join4(opts.projectRoot, entry.script.path);
    if (!existsSync2(scriptAbs)) {
      return skippedResult(entry, "script-file-missing");
    }
    const source = readFileSync3(scriptAbs, "utf8");
    const header = parseScriptHeader(source);
    const missing = missingBinaries(header.header?.requires?.binaries);
    if (missing.length > 0) {
      return skippedResult(entry, `missing dependency: ${missing.join(", ")}`);
    }
    const targets = entry.script.scope === "changed-files" && opts.changedFiles ? opts.changedFiles : wholeTreeFiles;
    return {
      ...entry,
      index,
      scriptAbs,
      scriptSha: sha256Text(source),
      perFile: header.header?.per_file === true,
      targets
    };
  });
  return {
    run: {
      now,
      map,
      filter,
      scriptHash,
      targetHash,
      reportFile,
      slots
    }
  };
}
function isJob(slot) {
  return "scriptAbs" in slot;
}
function resultFor(job, run2) {
  if (!run2.ok) {
    return skippedResult(job, `error: ${run2.error}`);
  }
  return {
    rule_id: job.rule.id,
    script: job.script.path,
    kind: job.script.kind,
    findings: run2.report?.findings ?? [],
    ...run2.warning ? { warning: run2.warning } : {}
  };
}
function finishRun(opts, prepared, results) {
  const deterministic = results.filter((r) => r.kind === "deterministic" && !r.skipped).reduce((n, r) => n + r.findings.length, 0);
  const heuristic = results.filter((r) => r.kind === "heuristic" && !r.skipped).reduce((n, r) => n + r.findings.length, 0);
  const skipped = results.filter((r) => r.skipped).length;
  const report = {
    generated_at: prepared.now,
    mode: opts.mode,
    rule_files_hash: prepared.map.rule_files_hash,
    script_files_hash: prepared.scriptHash,
    target_files_hash: prepared.targetHash,
    ...prepared.filter ? { filter: prepared.filter } : {},
    results,
    counts: { deterministic, heuristic, skipped },
    blocking: opts.mode === "strict" && deterministic > 0
  };
  writeReport(opts.projectRoot, prepared.reportFile, report);
  recordRuleRun(opts.projectRoot, report, false);
  return report;
}
function runRuleScripts(opts) {
  const prepared = prepareRun(opts);
  if ("done" in prepared) {
    return prepared.done;
  }
  const results = prepared.run.slots.map(
    (slot) => isJob(slot) ? resultFor(
      slot,
      executeRuleScript(slot.scriptAbs, {
        projectRoot: opts.projectRoot,
        files: slot.targets
      })
    ) : slot
  );
  return finishRun(opts, prepared.run, results);
}
function mergeFileFindings(job, cached, fresh) {
  const targets = new Set(job.targets);
  return [
    ...job.targets.flatMap(
      (file) => cached.get(file) ?? fresh.filter((finding) => finding.file === file)
    ),
    ...fresh.filter((finding) => !targets.has(finding.file))
  ];
}
async function runPerFileJob(job, cache, opts) {
  const cached = /* @__PURE__ */ new Map();
  const dirty = [];
  for (const file of job.targets) {
    const hit = cache.lookup(job.script.path, job.scriptSha, file);
    if (hit) cached.set(file, hit);
    else dirty.push(file);
  }
  if (dirty.length === 0) {
    return resultFor(job, {
      ok: true,
      report: {
        rule_id: job.rule.id,
        kind: job.script.kind,
        findings: mergeFileFindings(job, cached, [])
      }
    });
  }
  const run2 = await executeRuleScriptAsync(
    job.scriptAbs,
    { projectRoot: opts.projectRoot, files: dirty },
    { signal: opts.signal, timeoutMs: opts.scriptTimeoutMs }
  );
  if (!run2.ok || !run2.report) {
    return resultFor(job, run2);
  }
  const fresh = run2.report.findings;
  const dirtySet = new Set(dirty);
  if (fresh.every((finding) => dirtySet.has(finding.file))) {
    for (const file of dirty) {
      cache.store(
        job.script.path,
        job.scriptSha,
        file,
        fresh.filter((finding) => finding.file === file)
      );
    }
  }
  return resultFor(job, {
    ...run2,
    report: { ...run2.report, findings: mergeFileFindings(job, cached, fresh) }
  });
}
async function runRuleScriptsAsync(opts) {
  const prepared = prepareRun(opts);
  if ("done" in prepared) {
    return prepared.done;
  }
  const cache = opts.useFileCache ? openFileResultsCache(opts.projectRoot) : null;
  const results = await runPool(prepared.run.slots, opts.concurrency ?? 1, async (slot) => {
    if (!isJob(slot)) return slot;
    if (cache && slot.perFile) return runPerFileJob(slot, cache, opts);
    return resultFor(
      slot,
      await executeRuleScriptAsync(
        slot.scriptAbs,
        { projectRoot: opts.projectRoot, files: slot.targets },
        { signal: opts.signal, timeoutMs: opts.scriptTimeoutMs }
      )
    );
  });
  cache?.save();
  if (opts.signal?.aborted) {
    return { ...emptyReport(opts, prepared.run.now), results, aborted: true };
  }
  return finishRun(opts, prepared.run, results);
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
  return readReportFile(projectRoot, PATHS.RULE_SCRIPTS_REPORT);
}
function readReportFile(projectRoot, reportFile) {
  const path = join4(projectRoot, reportFile);
  if (!existsSync2(path)) {
    return null;
  }
  try {
    return JSON.parse(readFileSync3(path, "utf8"));
  } catch {
    return null;
  }
}
function writeReport(projectRoot, reportFile, report) {
  writeFileAtomic(join4(projectRoot, reportFile), `${JSON.stringify(report, null, 2)}
`);
}

// src/rule-scripts/enforce.ts
init_esm_shims();
function projectRelativeTargets(projectRoot, targets) {
  return (targets ?? []).map(
    (target) => (isAbsolute(target) ? relative(projectRoot, target) : normalize(target)).replace(/^\.\//, "")
  ).filter(
    (rel) => rel !== "" && rel !== "." && rel !== ".." && !rel.startsWith("../") && !isAbsolute(rel) && !isPaqadArtifactPath(rel)
  );
}
async function enforceRuleScripts(options) {
  const { projectRoot, mode } = options;
  const map = loadRuleScriptMap(projectRoot);
  const armed = map ? map.rules.reduce((total, rule) => total + (rule.scripts?.length ?? 0), 0) : 0;
  if (mode === "off" || armed === 0) {
    return { ran: false, mode, blocking: false, violations: [], armed, summary: "" };
  }
  const scope = options.scope ?? "changed-files";
  const changedFiles = Array.from(
    /* @__PURE__ */ new Set([
      ...options.changedFiles ?? (await loadChangeEvidence(projectRoot)).files,
      ...projectRelativeTargets(projectRoot, options.editTargets)
    ])
  );
  const changedFilesOnly = options.scopes !== void 0 && options.scopes.every((entry) => entry === "changed-files");
  if ((scope === "changed-files" || changedFilesOnly) && changedFiles.length === 0) {
    return {
      ran: false,
      mode,
      blocking: false,
      violations: [],
      armed,
      summary: "**\u25B8 paqad** \xB7 \u26AA scripted rules: skipped (no files changed this turn)"
    };
  }
  const report = await runRuleScriptsAsync({
    projectRoot,
    mode,
    changedFiles: changedFiles.length > 0 ? changedFiles : void 0,
    ...options.kinds ? { kinds: options.kinds } : {},
    ...options.scopes ? { scopes: options.scopes } : {},
    concurrency: options.concurrency ?? resolveRuleGateConfig(projectRoot).concurrency,
    signal: options.signal,
    useFileCache: options.useFileCache
  });
  if (report.aborted) {
    return { ran: false, mode, blocking: false, violations: [], armed, summary: "", aborted: true };
  }
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
import { existsSync as existsSync3, mkdirSync, readFileSync as readFileSync4, writeFileSync } from "fs";
import { dirname, join as join5 } from "path";
var CAPABILITY_LOCK_SCHEMA_VERSION = 1;
function capabilityLockPath(projectRoot) {
  return join5(projectRoot, PATHS.CAPABILITY_LOCK);
}
function readCapabilityLock(projectRoot) {
  const path = capabilityLockPath(projectRoot);
  if (!existsSync3(path)) {
    return null;
  }
  try {
    const parsed = JSON.parse(readFileSync4(path, "utf8"));
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

export {
  DEFAULT_IGNORE_GLOBS,
  dropGitIgnored,
  scanWorkingTree,
  validateScriptHeader,
  validateFindings,
  SCRIPT_ABORTED_ERROR,
  executeRuleScript,
  executeRuleScriptAsync,
  isOnPath,
  missingBinaries,
  RULE_SCRIPT_MAP_SCHEMA_VERSION,
  ruleScriptMapPath,
  emptyRuleScriptMap,
  loadRuleScriptMap,
  serializeRuleScriptMap,
  runPool,
  HEADER_MARKER,
  extractHeaderFields,
  parseScriptHeader,
  scriptFilesHash,
  runRuleScripts,
  runRuleScriptsAsync,
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
