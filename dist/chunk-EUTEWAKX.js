import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  FrameworkError,
  readProjectProfile
} from "./chunk-XFZ4QHDS.js";
import {
  getRuntimeRoot
} from "./chunk-VVRAO2BK.js";
import {
  execa
} from "./chunk-O77JBFWW.js";
import {
  SchemaValidator,
  require_dist
} from "./chunk-USQSPB6R.js";
import {
  PATHS
} from "./chunk-LW3OCT4Y.js";
import {
  __toESM,
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/core/types/mcp.ts
init_esm_shims();
var MCP_SERVER_TYPES = [
  "laravel-boost",
  "dart-mcp",
  "database-inspector",
  "figma",
  "vite-inspector",
  "react-router-mcp",
  "vue-router-mcp",
  "tailwind-mcp"
];

// src/skills/audit-events.ts
init_esm_shims();
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "fs";
import { dirname, join } from "path";
var DEFAULT_SKILL_AUDIT_BUFFER_CAPACITY = 50;
var SkillAuditBuffer = class {
  constructor(capacity = DEFAULT_SKILL_AUDIT_BUFFER_CAPACITY) {
    this.capacity = capacity;
  }
  capacity;
  events = [];
  get size() {
    return this.events.length;
  }
  add(event) {
    this.events.push(event);
    while (this.events.length > this.capacity) {
      this.events.shift();
    }
  }
  snapshot() {
    return [...this.events];
  }
  flush(projectRoot) {
    const pending = this.events.splice(0, this.events.length);
    for (const event of pending) {
      try {
        appendSkillAuditEvent(projectRoot, event);
      } catch {
        this.add(event);
      }
    }
  }
};
var sharedBuffer = null;
function getSharedSkillAuditBuffer() {
  sharedBuffer ??= new SkillAuditBuffer();
  return sharedBuffer;
}
function eventsPath(projectRoot) {
  return join(projectRoot, PATHS.SKILL_AUDIT_EVENTS_LOG);
}
function appendSkillAuditEvent(projectRoot, event) {
  const path = eventsPath(projectRoot);
  mkdirSync(dirname(path), { recursive: true });
  appendFileSync(path, JSON.stringify(event) + "\n", "utf8");
}
function emitSkillAuditEvent(event, projectRoot, buffer = getSharedSkillAuditBuffer()) {
  buffer.add(event);
  if (projectRoot !== void 0) {
    buffer.flush(projectRoot);
  }
}
function readSkillAuditEvents(projectRoot) {
  const path = eventsPath(projectRoot);
  if (!existsSync(path)) return [];
  const raw = readFileSync(path, "utf8");
  const out = [];
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;
    try {
      const parsed = JSON.parse(trimmed);
      if (typeof parsed === "object" && parsed !== null && (parsed.type === "skill.load_failed" || parsed.type === "skill.pack_load_failed")) {
        out.push(parsed);
      }
    } catch {
    }
  }
  return out;
}

// src/packs/loader.ts
init_esm_shims();
var import_yaml = __toESM(require_dist(), 1);
import { createHash } from "crypto";
import { existsSync as existsSync2, readdirSync, readFileSync as readFileSync2 } from "fs";
import { basename, join as join2, resolve } from "path";
var KNOWN_PENTEST_CHECKS = /* @__PURE__ */ new Set([
  "dependency-advisory-triage",
  "permission-boundary-review",
  "business-logic-abuse-review",
  "input-validation",
  "runtime-surface-probing",
  "finding-normalizer",
  "retest-verification"
]);
var SOURCE_ORDER = ["built-in", "global", "project"];
var StackPackLoader = class {
  constructor(auditBuffer = getSharedSkillAuditBuffer()) {
    this.auditBuffer = auditBuffer;
  }
  auditBuffer;
  validator = new SchemaValidator();
  load(options) {
    const candidates = /* @__PURE__ */ new Map();
    const warnings = [];
    for (const source of SOURCE_ORDER) {
      const packsRoot = this.resolvePacksRoot(source, options);
      if (packsRoot === null || !existsSync2(packsRoot)) {
        continue;
      }
      for (const pack of this.loadPacksFromRoot(packsRoot, source)) {
        warnings.push(...pack.validation.issues.filter((issue) => issue.level === "warning"));
        if (!pack.validation.valid) {
          warnings.push(
            ...pack.validation.issues.filter((issue) => issue.level === "error").map((issue) => ({
              ...issue,
              level: "warning"
            }))
          );
          emitSkillAuditEvent(
            buildPackLoadFailedEvent(pack),
            options.projectRoot,
            this.auditBuffer
          );
          continue;
        }
        candidates.set(pack.manifest.name, pack);
      }
    }
    return {
      packs: candidates,
      warnings
    };
  }
  validatePack(packRoot, source = "project") {
    return this.readPack(packRoot, source);
  }
  resolvePacksRoot(source, options) {
    if (source === "built-in") {
      return join2(options.runtimeRoot, "capabilities", "coding", "stacks");
    }
    if (source === "global") {
      return options.globalPacksRoot ?? null;
    }
    return options.projectRoot ? join2(options.projectRoot, ".paqad", "packs") : null;
  }
  loadPacksFromRoot(root, source) {
    return readdirSync(root, { withFileTypes: true }).filter((entry) => entry.isDirectory()).filter((entry) => !entry.name.startsWith("_") && !entry.name.startsWith(".")).map((entry) => this.readPack(join2(root, entry.name), source));
  }
  readPack(packRoot, source) {
    const manifestPath = join2(packRoot, "pack.yaml");
    const issues = [];
    if (!existsSync2(manifestPath)) {
      return {
        manifest: createPlaceholderManifest(packRoot),
        root: packRoot,
        manifestPath,
        source,
        validation: {
          valid: false,
          issues: [
            {
              level: "error",
              path: "/pack.yaml",
              message: "Missing pack.yaml"
            }
          ]
        }
      };
    }
    let manifest = null;
    try {
      manifest = import_yaml.default.parse(readFileSync2(manifestPath, "utf8"));
    } catch {
      issues.push({
        level: "error",
        path: "/pack.yaml",
        message: "pack.yaml is not valid YAML"
      });
    }
    if (manifest !== null) {
      const schema = this.validator.validate("stack-pack", manifest);
      issues.push(
        ...schema.errors.map((error) => ({
          level: "error",
          path: error.path,
          message: error.message
        }))
      );
      issues.push(...validatePackReferences(manifest, packRoot));
      issues.push(...validateTraitNames(manifest));
      issues.push(...validateMcpDefaults(manifest));
      issues.push(...validatePentestChecks(manifest));
      issues.push(...validateArchetypePack(manifest));
      issues.push(...validateTestRunners(manifest));
    }
    const validation = {
      valid: issues.every((issue) => issue.level !== "error"),
      issues
    };
    return {
      manifest: manifest ?? createPlaceholderManifest(packRoot),
      root: packRoot,
      manifestPath,
      source,
      validation
    };
  }
};
function validateTraitNames(manifest) {
  const issues = [];
  const seen = /* @__PURE__ */ new Set();
  for (const trait of manifest.traits ?? []) {
    if (seen.has(trait.name)) {
      issues.push({
        level: "error",
        path: "/traits",
        message: `Duplicate trait name "${trait.name}"`
      });
      continue;
    }
    seen.add(trait.name);
  }
  return issues;
}
function validatePackReferences(manifest, packRoot) {
  const issues = [];
  const fileRefs = [manifest.docs?.overview_template, manifest.docs?.conventions_template].filter(
    (value) => typeof value === "string" && value !== ""
  );
  for (const fileRef of fileRefs) {
    const absolutePath = resolve(packRoot, fileRef);
    if (!existsSync2(absolutePath)) {
      issues.push({
        level: "error",
        path: "/docs",
        message: `Referenced file does not exist: ${fileRef}`
      });
    }
  }
  return issues;
}
function validateMcpDefaults(manifest) {
  return (manifest.mcp_defaults ?? []).filter((item) => !MCP_SERVER_TYPES.includes(item.name)).map((item) => ({
    level: "warning",
    path: "/mcp_defaults",
    message: `Unknown MCP server "${item.name}" will be treated as custom`
  }));
}
function validatePentestChecks(manifest) {
  return (manifest.pentest?.file_check_map ?? []).flatMap((item) => item.checks).filter((check) => !KNOWN_PENTEST_CHECKS.has(check)).map((check) => ({
    level: "warning",
    path: "/pentest/file_check_map",
    message: `Unknown pentest check "${check}" will be treated as custom`
  }));
}
function validateArchetypePack(manifest) {
  if (manifest.tier !== "archetype") return [];
  const issues = [];
  if (!manifest.ecosystem || manifest.ecosystem === "unknown") {
    issues.push({
      level: "error",
      path: "/ecosystem",
      message: "Archetype packs must declare an ecosystem"
    });
  }
  const allRules = [
    ...manifest.detection.manifests ?? [],
    ...manifest.detection.lockfiles ?? [],
    ...manifest.detection.heuristics ?? []
  ];
  const hasFieldRule = allRules.some(
    (rule) => rule.fields && rule.fields.length > 0 || rule.field_absent && rule.field_absent.length > 0
  );
  const hasHeuristic = (manifest.detection.heuristics?.length ?? 0) > 0;
  if (!hasFieldRule && !hasHeuristic) {
    issues.push({
      level: "warning",
      path: "/detection",
      message: "Archetype pack uses only package-based detection \u2014 consider adding fields or heuristics rules to avoid overlap with framework packs"
    });
  }
  return issues;
}
function validateTestRunners(manifest) {
  const issues = [];
  const seen = /* @__PURE__ */ new Set();
  for (const runner of manifest.test_runners ?? []) {
    if (seen.has(runner.runner_id)) {
      issues.push({
        level: "error",
        path: "/test_runners",
        message: `Duplicate test runner "${runner.runner_id}"`
      });
    }
    seen.add(runner.runner_id);
    if ((runner.output_source ?? "stdout") === "file" && !runner.output_path_pattern) {
      issues.push({
        level: "error",
        path: "/test_runners",
        message: `Test runner "${runner.runner_id}" uses file output without output_path_pattern`
      });
    }
    if ((runner.output_source ?? "stdout") === "stdout" && runner.output_path_pattern) {
      issues.push({
        level: "warning",
        path: "/test_runners",
        message: `Test runner "${runner.runner_id}" declares output_path_pattern but reads from stdout`
      });
    }
    if (runner.parallel) {
      const flagCount = (runner.parallel.flag?.match(/<processes>/g) ?? []).length;
      if (runner.parallel.mode === "flag") {
        if (!runner.parallel.flag) {
          issues.push({
            level: "error",
            path: "/test_runners",
            message: `Test runner "${runner.runner_id}" parallel.mode=flag needs a flag`
          });
        } else if (flagCount !== 1) {
          issues.push({
            level: "error",
            path: "/test_runners",
            message: `Test runner "${runner.runner_id}" parallel.flag must contain <processes> exactly once`
          });
        }
      } else if (runner.parallel.flag) {
        issues.push({
          level: "error",
          path: "/test_runners",
          message: `Test runner "${runner.runner_id}" parallel.flag is only valid when mode=flag`
        });
      }
    }
  }
  issues.push(...validateTestingFrameworkCoverage(manifest));
  return issues;
}
function validateTestingFrameworkCoverage(manifest) {
  const runnersById = new Map(
    (manifest.test_runners ?? []).map((runner) => [runner.runner_id.toLowerCase(), runner])
  );
  return (manifest.testing?.frameworks ?? []).filter((framework) => !hasMatchingRunner(framework.name, runnersById)).map((framework) => ({
    level: "warning",
    path: "/test_runners",
    message: `Testing framework "${framework.name}" has no matching test_runners declaration`
  }));
}
function hasMatchingRunner(frameworkName, runnersById) {
  const aliases = new Set(
    [frameworkName, frameworkName.replace(/\s+/g, "-")].flatMap((value) => [value, value.toLowerCase()]).filter((value) => value.length > 0)
  );
  if (frameworkName.toLowerCase() === "pest") aliases.add("phpunit");
  if (frameworkName.toLowerCase() === "vitest") aliases.add("jest");
  return [...aliases].some((alias) => runnersById.has(alias));
}
function buildPackLoadFailedEvent(pack) {
  const errorIssues = pack.validation.issues.filter((issue) => issue.level === "error");
  const manifestExists = existsSync2(pack.manifestPath);
  const content_hash = manifestExists ? createHash("sha256").update(readFileSync2(pack.manifestPath)).digest("hex") : createHash("sha256").update(pack.root).digest("hex");
  return {
    ts: (/* @__PURE__ */ new Date()).toISOString(),
    type: "skill.pack_load_failed",
    pack_id: pack.manifest.name,
    pack_path: pack.root,
    validation_error_code: manifestExists ? "PACK_VALIDATION_FAILED" : "PACK_MANIFEST_MISSING",
    issue_count: errorIssues.length,
    content_hash
  };
}
function createPlaceholderManifest(packRoot) {
  return {
    name: basename(packRoot) || "unknown-pack",
    display_name: "Unknown Pack",
    ecosystem: "unknown",
    version: "0.0.0",
    description: "Invalid pack placeholder",
    maintainer: "unknown",
    detection: {}
  };
}

// src/packs/manager.ts
init_esm_shims();
import {
  cpSync,
  existsSync as existsSync3,
  mkdirSync as mkdirSync2,
  mkdtempSync,
  readdirSync as readdirSync2,
  rmSync,
  writeFileSync
} from "fs";
import { homedir } from "os";
import { join as join3, resolve as resolve2 } from "path";
var SOURCE_ORDER2 = ["built-in", "global", "project"];
function resolvePackManagerRoots(projectRoot = process.cwd(), overrides = {}) {
  return {
    runtimeRoot: overrides.runtimeRoot ?? getRuntimeRoot(),
    globalPacksRoot: overrides.globalPacksRoot ?? process.env.PAQAD_GLOBAL_PACKS_ROOT ?? join3(homedir(), ".paqad", "packs"),
    projectPacksRoot: overrides.projectPacksRoot ?? join3(projectRoot, ".paqad", "packs"),
    registryUrl: overrides.registryUrl ?? process.env.PAQAD_PACK_REGISTRY_URL
  };
}
function listPacks(projectRoot = process.cwd(), overrides = {}) {
  const roots = resolvePackManagerRoots(projectRoot, overrides);
  const registry = new StackPackLoader().load({
    runtimeRoot: roots.runtimeRoot,
    globalPacksRoot: roots.globalPacksRoot,
    projectRoot
  });
  const availableByName = /* @__PURE__ */ new Map();
  for (const source of SOURCE_ORDER2) {
    for (const name of listPackNamesForSource(source, roots)) {
      const sources = availableByName.get(name) ?? /* @__PURE__ */ new Set();
      sources.add(source);
      availableByName.set(name, sources);
    }
  }
  const matchedFrameworks = new Set(
    readProjectProfile(projectRoot)?.stack_profile?.frameworks ?? []
  );
  return [...registry.packs.values()].map((pack) => {
    const availableSources = [
      ...availableByName.get(pack.manifest.name) ?? /* @__PURE__ */ new Set([pack.source])
    ].sort(compareSources);
    return {
      name: pack.manifest.name,
      effective_source: pack.source,
      available_sources: availableSources,
      override_active: availableSources.length > 1,
      matched_in_project: matchedFrameworks.has(pack.manifest.name),
      display_name: pack.manifest.display_name,
      tier: pack.manifest.tier ?? "framework"
    };
  }).sort((left, right) => left.name.localeCompare(right.name));
}
async function installPack(source, options = {}) {
  const projectRoot = options.projectRoot ?? process.cwd();
  const roots = resolvePackManagerRoots(projectRoot, options.roots);
  const scope = options.scope ?? "global";
  const installRoot = scope === "project" ? roots.projectPacksRoot : roots.globalPacksRoot;
  mkdirSync2(installRoot, { recursive: true });
  const candidateRoot = await materializePackSource(source, roots);
  const loader = new StackPackLoader();
  const pack = loader.validatePack(candidateRoot, scope === "project" ? "project" : "global");
  if (!pack.validation.valid) {
    throw new Error(formatValidationIssues(pack.validation.issues));
  }
  const destination = join3(installRoot, pack.manifest.name);
  rmSync(destination, { recursive: true, force: true });
  cpSync(candidateRoot, destination, { recursive: true });
  const installed = loader.validatePack(destination, scope === "project" ? "project" : "global");
  if (!installed.validation.valid) {
    throw new Error(formatValidationIssues(installed.validation.issues));
  }
  return installed;
}
function removePack(name, projectRoot = process.cwd(), scope = "global", overrides = {}) {
  const roots = resolvePackManagerRoots(projectRoot, overrides);
  const targetRoot = scope === "project" ? roots.projectPacksRoot : roots.globalPacksRoot;
  const target = join3(targetRoot, name);
  if (existsSync3(target)) {
    rmSync(target, { recursive: true, force: true });
    return;
  }
  const builtInRoot = join3(roots.runtimeRoot, "capabilities", "coding", "stacks", name);
  if (existsSync3(builtInRoot)) {
    throw new Error(
      `Cannot remove built-in pack "${name}"; remove a global or project override instead`
    );
  }
  throw new Error(`Pack "${name}" is not installed in ${scope} scope`);
}
function validatePackAt(path) {
  const pack = new StackPackLoader().validatePack(resolve2(path));
  if (!pack.validation.valid) {
    throw new Error(formatValidationIssues(pack.validation.issues));
  }
  return pack;
}
function createPack(name, options = {}) {
  const destinationRoot = options.destinationRoot ?? process.cwd();
  const ecosystem = options.ecosystem ?? "node";
  const tier = options.tier ?? "framework";
  const packRoot = join3(destinationRoot, name);
  if (existsSync3(packRoot)) {
    throw new Error(`Pack scaffold already exists at ${packRoot}`);
  }
  mkdirSync2(join3(packRoot, "rules"), { recursive: true });
  writeFileSync(join3(packRoot, "pack.yaml"), renderPackTemplate(name, ecosystem, tier));
  writeFileSync(
    join3(packRoot, "rules", "conventions.md"),
    `# ${name}

Document project-specific conventions for the ${name} stack here.
`
  );
  return packRoot;
}
function listPackNamesForSource(source, roots) {
  const sourceRoot = resolveSourceRoot(source, roots);
  if (!existsSync3(sourceRoot)) {
    return [];
  }
  return readdirSync2(sourceRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name);
}
function resolveSourceRoot(source, roots) {
  if (source === "built-in") {
    return join3(roots.runtimeRoot, "capabilities", "coding", "stacks");
  }
  return source === "global" ? roots.globalPacksRoot : roots.projectPacksRoot;
}
async function materializePackSource(source, roots) {
  if (looksLikeLocalPath(source)) {
    const resolved = resolve2(source);
    return findPackRoot(resolved);
  }
  if (looksLikeGitUrl(source)) {
    return clonePackSource(source);
  }
  if (roots.registryUrl === void 0 || roots.registryUrl === "") {
    throw new Error(
      `Cannot resolve bare pack name "${source}" without PAQAD_PACK_REGISTRY_URL configured`
    );
  }
  return clonePackSource(buildRegistryPackUrl(roots.registryUrl, source));
}
function looksLikeLocalPath(source) {
  return source.startsWith(".") || source.startsWith("/") || existsSync3(resolve2(source));
}
function looksLikeGitUrl(source) {
  return source.startsWith("http://") || source.startsWith("https://") || source.startsWith("ssh://") || source.startsWith("git@") || source.startsWith("file://") || source.endsWith(".git");
}
function assertSafeCloneSource(source) {
  if (source.trim().length === 0 || source.startsWith("-")) {
    throw new Error(`Refusing to clone pack source that looks like an option: ${source}`);
  }
}
async function clonePackSource(source) {
  assertSafeCloneSource(source);
  const tempRoot = mkdtempSync(join3(homedir(), ".paqad-pack-clone-"));
  try {
    await execa("git", ["clone", "--depth", "1", "--", source, tempRoot]);
  } catch (error) {
    rmSync(tempRoot, { recursive: true, force: true });
    throw error;
  }
  return findPackRoot(tempRoot);
}
function findPackRoot(root) {
  const rootManifest = join3(root, "pack.yaml");
  if (existsSync3(rootManifest)) {
    return root;
  }
  const candidates = readdirSync2(root, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => join3(root, entry.name)).filter((candidate) => existsSync3(join3(candidate, "pack.yaml")));
  if (candidates.length === 1) {
    return candidates[0];
  }
  throw new Error(`Could not find a pack.yaml in ${root}`);
}
function buildRegistryPackUrl(registryUrl, name) {
  const normalized = registryUrl.endsWith("/") ? registryUrl.slice(0, -1) : registryUrl;
  return `${normalized}/${name}.git`;
}
function compareSources(left, right) {
  return SOURCE_ORDER2.indexOf(left) - SOURCE_ORDER2.indexOf(right);
}
function renderPackTemplate(name, ecosystem, tier) {
  const lines = [
    `name: ${name}`,
    `display_name: ${toDisplayName(name)}`,
    `ecosystem: ${ecosystem}`,
    "version: 1.0.0"
  ];
  if (tier === "archetype") {
    lines.push("tier: archetype");
  }
  lines.push(`description: ${toDisplayName(name)} stack pack`, "maintainer: your-team");
  if (tier === "archetype") {
    lines.push(
      "detection:",
      "  manifests:",
      "    - file: package.json",
      "      fields:",
      `        - name: # TODO: add manifest field that identifies a ${name} project`,
      "          presence: required",
      "  heuristics: []"
    );
  } else {
    lines.push(
      "detection:",
      "  manifests:",
      "    - file: package.json",
      `      packages: [${name}]`
    );
  }
  lines.push(
    "toolchains:",
    `  - ecosystem: ${ecosystem}`,
    "    package_managers: [pnpm]",
    "    lockfiles: [pnpm-lock.yaml]",
    "docs:",
    "  conventions_template: rules/conventions.md",
    ""
  );
  return lines.join("\n");
}
function toDisplayName(name) {
  return name.split("-").map((segment) => segment.slice(0, 1).toUpperCase() + segment.slice(1)).join(" ");
}
function formatValidationIssues(issues) {
  return issues.map((issue) => `${issue.level}: ${issue.path} ${issue.message}`).join("\n");
}

// src/packs/project-packs.ts
init_esm_shims();
function loadProjectPackRegistry(projectRoot) {
  const roots = resolvePackManagerRoots(projectRoot);
  return new StackPackLoader().load({
    runtimeRoot: roots.runtimeRoot,
    globalPacksRoot: roots.globalPacksRoot,
    projectRoot
  });
}
function getPacksForFrameworks(frameworks, projectRoot) {
  const registry = loadProjectPackRegistry(projectRoot);
  return frameworks.map((framework) => registry.packs.get(framework)).filter((pack) => pack !== void 0);
}
function getPackManifestMap(frameworks, projectRoot) {
  return new Map(
    getPacksForFrameworks(frameworks, projectRoot).map((pack) => [
      pack.manifest.name,
      pack.manifest
    ])
  );
}
function getPackTestRunners(frameworks, projectRoot) {
  const packs = getPacksForFrameworks(frameworks, projectRoot);
  const deduped = /* @__PURE__ */ new Map();
  for (const pack of orderPacksForRunnerPrecedence(packs)) {
    for (const runner of pack.manifest.test_runners ?? []) {
      deduped.delete(runner.runner_id);
      deduped.set(runner.runner_id, runner);
    }
  }
  return [...deduped.values()];
}
function orderPacksForRunnerPrecedence(packs) {
  const priority = /* @__PURE__ */ new Map([
    ["built-in", 0],
    ["global", 1],
    ["project", 2]
  ]);
  return [...packs].sort((left, right) => priority.get(left.source) - priority.get(right.source));
}

// src/core/errors/cancelled-error.ts
init_esm_shims();
var CancelledError = class extends FrameworkError {
  constructor(message = "Cancelled by consumer", details) {
    super(message, { code: "CANCELLED_BY_CONSUMER", details });
    this.name = "CancelledError";
  }
};
function isCancelledError(error) {
  return error instanceof CancelledError;
}

// src/background/atomic-artifact.ts
init_esm_shims();
import { mkdir, rename, writeFile } from "fs/promises";
import { dirname as dirname2 } from "path";
async function buildAndSwap(targetPath, build) {
  await mkdir(dirname2(targetPath), { recursive: true });
  const tempPath = `${targetPath}.tmp.${process.pid}.${nextTempSeq()}`;
  await build(tempPath);
  await rename(tempPath, targetPath);
}
async function atomicWriteFile(targetPath, content) {
  await buildAndSwap(targetPath, (tempPath) => writeFile(tempPath, content, "utf8"));
}
var tempSeq = 0;
function nextTempSeq() {
  tempSeq = (tempSeq + 1) % Number.MAX_SAFE_INTEGER;
  return tempSeq;
}

export {
  MCP_SERVER_TYPES,
  DEFAULT_SKILL_AUDIT_BUFFER_CAPACITY,
  SkillAuditBuffer,
  getSharedSkillAuditBuffer,
  appendSkillAuditEvent,
  emitSkillAuditEvent,
  readSkillAuditEvents,
  StackPackLoader,
  resolvePackManagerRoots,
  listPacks,
  installPack,
  removePack,
  validatePackAt,
  createPack,
  assertSafeCloneSource,
  loadProjectPackRegistry,
  getPacksForFrameworks,
  getPackManifestMap,
  getPackTestRunners,
  CancelledError,
  isCancelledError,
  atomicWriteFile
};
