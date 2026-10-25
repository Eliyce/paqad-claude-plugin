import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  getRuntimeRoot
} from "./chunk-VVRAO2BK.js";
import {
  execa
} from "./chunk-O77JBFWW.js";
import {
  SchemaValidator,
  applyFrameworkConfigToProfile,
  require_dist,
  resolveFrameworkConfig,
  stripFrameworkConfigFromProfile
} from "./chunk-IUTPBUW2.js";
import {
  renameWithRetrySync
} from "./chunk-F256LZXA.js";
import {
  PATHS
} from "./chunk-UCSN7SVD.js";
import {
  __toESM,
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/core/types/domain.ts
init_esm_shims();
var DOMAINS = ["coding", "content"];
var STACKS = [
  "laravel",
  "flutter",
  "react",
  "vue",
  "django",
  "fastapi",
  "rails",
  "spring-boot",
  "express",
  "angular",
  "svelte",
  "astro",
  "go-web",
  "rust-web",
  "dotnet",
  "nextjs",
  "flask",
  "nestjs",
  "kotlin-android",
  "node-cli",
  "node-library",
  "node-service",
  "short-video"
];
var CAPABILITIES = [
  "inertia",
  "vue",
  "react",
  "tailwind",
  "boost",
  "pest",
  "phpunit",
  "docker",
  "compose",
  "sail",
  "next",
  "remix",
  "vite-spa",
  "gatsby",
  "nuxt",
  "quasar",
  "blazor",
  "ef-core",
  "minimal-api",
  "mvc",
  "razor-pages",
  "signalr",
  "azure",
  "identity",
  "app-router",
  "pages-router",
  "prisma",
  "trpc",
  "next-auth",
  "sqlalchemy",
  "celery",
  "blueprints",
  "flask-login",
  "flask-restx",
  "gunicorn",
  "typeorm",
  "graphql",
  "microservices",
  "swagger",
  "passport",
  "fastify",
  "jetpack-compose",
  "room",
  "hilt",
  "retrofit",
  "coroutines",
  "navigation",
  "datastore"
];
var ACTIVE_CAPABILITIES = ["content", "coding", "planning", "security"];
var DOMAIN_STACK_MAP = {
  coding: [
    "laravel",
    "flutter",
    "react",
    "vue",
    "django",
    "fastapi",
    "rails",
    "spring-boot",
    "express",
    "angular",
    "svelte",
    "astro",
    "go-web",
    "rust-web",
    "dotnet",
    "nextjs",
    "flask",
    "nestjs",
    "kotlin-android"
  ],
  content: ["short-video"]
};
var STACK_CAPABILITIES_MAP = {
  laravel: [
    "inertia",
    "vue",
    "react",
    "tailwind",
    "boost",
    "pest",
    "phpunit",
    "docker",
    "compose",
    "sail"
  ],
  flutter: ["docker", "compose"],
  react: ["next", "remix", "vite-spa", "gatsby", "tailwind", "docker", "compose"],
  vue: ["nuxt", "vite-spa", "quasar", "tailwind", "docker", "compose"],
  django: ["docker", "compose"],
  fastapi: ["docker", "compose"],
  rails: ["docker", "compose"],
  "spring-boot": ["docker", "compose"],
  express: ["docker", "compose"],
  angular: ["docker", "compose"],
  svelte: ["docker", "compose"],
  astro: ["docker", "compose"],
  "go-web": ["docker", "compose"],
  "rust-web": ["docker", "compose"],
  dotnet: [
    "blazor",
    "ef-core",
    "minimal-api",
    "mvc",
    "razor-pages",
    "signalr",
    "identity",
    "azure",
    "docker"
  ],
  nextjs: ["app-router", "pages-router", "tailwind", "prisma", "trpc", "next-auth", "docker"],
  flask: ["sqlalchemy", "celery", "blueprints", "flask-login", "flask-restx", "gunicorn", "docker"],
  nestjs: [
    "prisma",
    "typeorm",
    "graphql",
    "microservices",
    "swagger",
    "passport",
    "fastify",
    "docker"
  ],
  "kotlin-android": [
    "jetpack-compose",
    "room",
    "hilt",
    "retrofit",
    "coroutines",
    "navigation",
    "datastore",
    "docker"
  ],
  "node-cli": ["docker", "compose"],
  "node-library": ["docker", "compose"],
  "node-service": ["docker", "compose"],
  "short-video": ["docker", "compose"]
};

// src/core/project-profile.ts
init_esm_shims();
var import_yaml = __toESM(require_dist(), 1);
import { existsSync, mkdirSync, readFileSync as readFileSync2, writeFileSync } from "fs";
import { dirname, join } from "path";
import { isDeepStrictEqual } from "util";

// src/core/fs/read-if-exists.ts
init_esm_shims();
import { readFileSync } from "fs";
import { readFile } from "fs/promises";
function isMissingFileError(error) {
  return typeof error === "object" && error !== null && error.code === "ENOENT";
}
function readTextIfExistsSync(path) {
  try {
    return readFileSync(path, "utf8");
  } catch (error) {
    if (isMissingFileError(error)) return null;
    throw error;
  }
}

// src/core/project-profile.ts
function readProjectProfile(projectRoot, options = {}) {
  const path = join(projectRoot, PATHS.PROJECT_PROFILE);
  if (!existsSync(path)) {
    return null;
  }
  try {
    const parsed = import_yaml.default.parse(readFileSync2(path, "utf8"));
    const migration = migrateProjectProfile(parsed);
    if (migration.migrated && options.persistMigration !== false) {
      writeProjectProfile(projectRoot, migration.profile, migration.audit_message);
    }
    return applyFrameworkConfigToProfile(migration.profile, resolveFrameworkConfig(projectRoot));
  } catch {
    return null;
  }
}
function writeProjectProfile(projectRoot, profile, auditMessage) {
  return syncProjectProfile(projectRoot, profile, auditMessage).path;
}
function syncProjectProfile(projectRoot, profile, auditMessage) {
  const migration = migrateProjectProfile(profile);
  const path = join(projectRoot, PATHS.PROJECT_PROFILE);
  const desired = toPlainData(stripFrameworkConfigFromProfile(migration.profile));
  const current = readProfileText(path);
  const next = renderProfile(current, desired);
  if (next === null || next === current) {
    return { path, written: false };
  }
  mkdirSync(dirname(path), { recursive: true });
  const staging = `${path}.${process.pid}.tmp`;
  writeFileSync(staging, next);
  renameWithRetrySync(staging, path);
  const audit = auditMessage ?? migration.audit_message;
  if (audit) {
    appendAuditLog(projectRoot, audit);
  }
  return { path, written: true };
}
function readProfileText(path) {
  try {
    return readFileSync2(path, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}
function toPlainData(value) {
  return JSON.parse(JSON.stringify(value));
}
function renderProfile(current, desired) {
  const fresh = () => import_yaml.default.stringify(desired, { lineWidth: 0 });
  if (current === null) return fresh();
  const doc = import_yaml.default.parseDocument(current);
  if (doc.errors.length > 0 || !import_yaml.default.isMap(doc.contents)) return fresh();
  if (isDeepStrictEqual(doc.toJS(), desired)) return null;
  syncMap(doc, doc.contents, desired);
  return doc.toString({ lineWidth: 0 });
}
function syncMap(doc, map, desired) {
  for (const pair of [...map.items]) {
    const key = import_yaml.default.isScalar(pair.key) ? pair.key.value : pair.key;
    if (typeof key !== "string" || !Object.hasOwn(desired, key)) {
      map.delete(pair.key);
    }
  }
  for (const [key, value] of Object.entries(desired)) {
    const node = map.get(key, true);
    if (import_yaml.default.isNode(node) && isDeepStrictEqual(node.toJS(doc), value)) continue;
    if (import_yaml.default.isMap(node) && isPlainObject(value)) {
      syncMap(doc, node, value);
      continue;
    }
    map.set(key, doc.createNode(value));
  }
}
function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function migrateProjectProfile(input) {
  const legacy = input;
  const activeCapabilities = normalizeActiveCapabilities(
    legacy.active_capabilities,
    legacy.routing,
    legacy.stack_profile
  );
  const stackProfile = normalizeStackProfile(legacy.stack_profile, activeCapabilities);
  const {
    active_capabilities: legacyActiveCapabilities,
    routing: legacyRouting,
    stack_profile: legacyStackProfile,
    ...rest
  } = legacy;
  void legacyActiveCapabilities;
  void legacyRouting;
  void legacyStackProfile;
  const profile = {
    ...rest,
    active_capabilities: activeCapabilities,
    stack_profile: stackProfile
  };
  const migrated = !Array.isArray(legacy.active_capabilities) || legacy.routing !== void 0 || legacy.stack_profile?.domain !== void 0 || JSON.stringify(legacy.active_capabilities ?? []) !== JSON.stringify(activeCapabilities) || JSON.stringify(legacy.stack_profile ?? null) !== JSON.stringify(stackProfile ?? null);
  const audit_message = migrated ? `[${(/* @__PURE__ */ new Date()).toISOString()}] Migrated project profile to canonical capabilities model` : void 0;
  return {
    profile,
    migrated,
    audit_message
  };
}
function getProfileDomain(profile) {
  if (profile.active_capabilities?.includes("coding")) {
    return "coding";
  }
  if (profile.routing?.domain === "coding") {
    return "coding";
  }
  if ((profile.stack_profile?.frameworks ?? []).length > 0) {
    return "coding";
  }
  return "content";
}
function normalizeActiveCapabilities(raw, routing, stackProfile) {
  const values = /* @__PURE__ */ new Set();
  values.add("content");
  if (Array.isArray(raw)) {
    for (const value of raw) {
      if (typeof value === "string" && ACTIVE_CAPABILITIES.includes(value)) {
        values.add(value);
      }
    }
  }
  const frameworks = (stackProfile?.frameworks ?? []).filter(
    (framework) => framework !== "short-video"
  );
  const hasCodingSignals = frameworks.length > 0 || routing?.domain === "coding";
  if (hasCodingSignals) {
    values.add("coding");
  }
  if (values.has("coding")) {
    values.add("security");
  } else {
    values.delete("security");
  }
  return Array.from(values).sort(compareActiveCapabilities);
}
function normalizeStackProfile(stackProfile, activeCapabilities) {
  if (!activeCapabilities.includes("coding") || !stackProfile) {
    return void 0;
  }
  const frameworks = (stackProfile.frameworks ?? []).filter(
    (framework) => framework !== "short-video"
  );
  if (frameworks.length === 0) {
    return void 0;
  }
  return {
    frameworks: frameworks.sort(),
    traits: [...stackProfile.traits ?? []].sort(),
    toolchains: [...stackProfile.toolchains ?? []],
    version_bands: [...stackProfile.version_bands ?? []],
    sources: [...stackProfile.sources ?? []]
  };
}
function appendAuditLog(projectRoot, entry) {
  const path = join(projectRoot, ".paqad", "audit.log");
  mkdirSync(dirname(path), { recursive: true });
  const current = readTextIfExistsSync(path) ?? "";
  const normalized = current.endsWith("\n") || current.length === 0 ? current : `${current}
`;
  writeFileSync(path, `${normalized}${entry}
`);
}
function compareActiveCapabilities(left, right) {
  return ACTIVE_CAPABILITIES.indexOf(left) - ACTIVE_CAPABILITIES.indexOf(right);
}

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
import { appendFileSync, existsSync as existsSync2, mkdirSync as mkdirSync2, readFileSync as readFileSync3 } from "fs";
import { dirname as dirname2, join as join2 } from "path";
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
  return join2(projectRoot, PATHS.SKILL_AUDIT_EVENTS_LOG);
}
function appendSkillAuditEvent(projectRoot, event) {
  const path = eventsPath(projectRoot);
  mkdirSync2(dirname2(path), { recursive: true });
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
  if (!existsSync2(path)) return [];
  const raw = readFileSync3(path, "utf8");
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
var import_yaml2 = __toESM(require_dist(), 1);
import { createHash } from "crypto";
import { existsSync as existsSync3, readdirSync, readFileSync as readFileSync4 } from "fs";
import { basename, join as join3, resolve } from "path";
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
      if (packsRoot === null || !existsSync3(packsRoot)) {
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
      return join3(options.runtimeRoot, "capabilities", "coding", "stacks");
    }
    if (source === "global") {
      return options.globalPacksRoot ?? null;
    }
    return options.projectRoot ? join3(options.projectRoot, ".paqad", "packs") : null;
  }
  loadPacksFromRoot(root, source) {
    return readdirSync(root, { withFileTypes: true }).filter((entry) => entry.isDirectory()).filter((entry) => !entry.name.startsWith("_") && !entry.name.startsWith(".")).map((entry) => this.readPack(join3(root, entry.name), source));
  }
  readPack(packRoot, source) {
    const manifestPath = join3(packRoot, "pack.yaml");
    const issues = [];
    if (!existsSync3(manifestPath)) {
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
      manifest = import_yaml2.default.parse(readFileSync4(manifestPath, "utf8"));
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
    if (!existsSync3(absolutePath)) {
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
  const manifestExists = existsSync3(pack.manifestPath);
  const content_hash = manifestExists ? createHash("sha256").update(readFileSync4(pack.manifestPath)).digest("hex") : createHash("sha256").update(pack.root).digest("hex");
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
  existsSync as existsSync4,
  mkdirSync as mkdirSync3,
  mkdtempSync,
  readdirSync as readdirSync2,
  rmSync,
  writeFileSync as writeFileSync2
} from "fs";
import { homedir } from "os";
import { join as join4, resolve as resolve2 } from "path";
var SOURCE_ORDER2 = ["built-in", "global", "project"];
function resolvePackManagerRoots(projectRoot = process.cwd(), overrides = {}) {
  return {
    runtimeRoot: overrides.runtimeRoot ?? getRuntimeRoot(),
    globalPacksRoot: overrides.globalPacksRoot ?? process.env.PAQAD_GLOBAL_PACKS_ROOT ?? join4(homedir(), ".paqad", "packs"),
    projectPacksRoot: overrides.projectPacksRoot ?? join4(projectRoot, ".paqad", "packs"),
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
  mkdirSync3(installRoot, { recursive: true });
  const candidateRoot = await materializePackSource(source, roots);
  const loader = new StackPackLoader();
  const pack = loader.validatePack(candidateRoot, scope === "project" ? "project" : "global");
  if (!pack.validation.valid) {
    throw new Error(formatValidationIssues(pack.validation.issues));
  }
  const destination = join4(installRoot, pack.manifest.name);
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
  const target = join4(targetRoot, name);
  if (existsSync4(target)) {
    rmSync(target, { recursive: true, force: true });
    return;
  }
  const builtInRoot = join4(roots.runtimeRoot, "capabilities", "coding", "stacks", name);
  if (existsSync4(builtInRoot)) {
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
  const packRoot = join4(destinationRoot, name);
  if (existsSync4(packRoot)) {
    throw new Error(`Pack scaffold already exists at ${packRoot}`);
  }
  mkdirSync3(join4(packRoot, "rules"), { recursive: true });
  writeFileSync2(join4(packRoot, "pack.yaml"), renderPackTemplate(name, ecosystem, tier));
  writeFileSync2(
    join4(packRoot, "rules", "conventions.md"),
    `# ${name}

Document project-specific conventions for the ${name} stack here.
`
  );
  return packRoot;
}
function listPackNamesForSource(source, roots) {
  const sourceRoot = resolveSourceRoot(source, roots);
  if (!existsSync4(sourceRoot)) {
    return [];
  }
  return readdirSync2(sourceRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => entry.name);
}
function resolveSourceRoot(source, roots) {
  if (source === "built-in") {
    return join4(roots.runtimeRoot, "capabilities", "coding", "stacks");
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
  return source.startsWith(".") || source.startsWith("/") || existsSync4(resolve2(source));
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
  const tempRoot = mkdtempSync(join4(homedir(), ".paqad-pack-clone-"));
  try {
    await execa("git", ["clone", "--depth", "1", "--", source, tempRoot]);
  } catch (error) {
    rmSync(tempRoot, { recursive: true, force: true });
    throw error;
  }
  return findPackRoot(tempRoot);
}
function findPackRoot(root) {
  const rootManifest = join4(root, "pack.yaml");
  if (existsSync4(rootManifest)) {
    return root;
  }
  const candidates = readdirSync2(root, { withFileTypes: true }).filter((entry) => entry.isDirectory()).map((entry) => join4(root, entry.name)).filter((candidate) => existsSync4(join4(candidate, "pack.yaml")));
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

// src/core/logger-registry.ts
init_esm_shims();
var MAX_PAYLOAD_BYTES = 8192;
var TRUNCATED_SUMMARY_CHARS = 256;
var _logger = null;
var _faultedOnce = false;
function setEngineLogger(logger) {
  _logger = logger;
  _faultedOnce = false;
}
function clearEngineLogger() {
  _logger = null;
  _faultedOnce = false;
}
function getConsumerLogger() {
  return _logger;
}
function clampPayload(payload) {
  if (payload === void 0) {
    return void 0;
  }
  let serialised;
  try {
    serialised = JSON.stringify(payload);
  } catch {
    return { __truncated: true, summary: String(payload).slice(0, TRUNCATED_SUMMARY_CHARS) };
  }
  if (serialised.length <= MAX_PAYLOAD_BYTES) {
    return payload;
  }
  return { __truncated: true, summary: serialised.slice(0, TRUNCATED_SUMMARY_CHARS) };
}
function writeDefault(level, message, payload) {
  if (level !== "warn" && level !== "error") {
    return;
  }
  const suffix = payload === void 0 ? "" : ` ${JSON.stringify(payload)}`;
  process.stderr.write(`paqad [${level}] ${message}${suffix}
`);
}
function markFaulted() {
  if (_faultedOnce) {
    return;
  }
  _faultedOnce = true;
  process.stderr.write("paqad: consumer logger faulted, reverting to stderr default\n");
}
function engineLog(level, message, payload) {
  const safePayload = clampPayload(payload);
  const logger = _logger;
  if (logger === null || _faultedOnce) {
    writeDefault(level, message, safePayload);
    return;
  }
  const entry = {
    level,
    message,
    ...safePayload !== void 0 ? { payload: safePayload } : {}
  };
  try {
    const result = logger.log(entry);
    if (result !== void 0 && typeof result.then === "function") {
      void result.then(void 0, () => {
        markFaulted();
        writeDefault(level, message, safePayload);
      });
    }
  } catch {
    markFaulted();
    writeDefault(level, message, safePayload);
  }
}

// src/rag/secrets.ts
init_esm_shims();
import {
  chmodSync,
  closeSync,
  existsSync as existsSync5,
  ftruncateSync,
  mkdirSync as mkdirSync4,
  openSync,
  readFileSync as readFileSync5,
  statSync,
  writeFileSync as writeFileSync3,
  writeSync
} from "fs";
import { dirname as dirname3, join as join5 } from "path";
function parseEnv(content) {
  const result = {};
  for (const rawLine of content.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    const value = line.slice(eq + 1).trim().replace(/^['"]|['"]$/g, "");
    if (key) {
      result[key] = value;
    }
  }
  return result;
}
function serializeEnv(values) {
  const lines = ["# Local project secrets for paqad-ai RAG"];
  for (const key of Object.keys(values).sort()) {
    lines.push(`${key}=${values[key]}`);
  }
  lines.push("");
  return lines.join("\n");
}
function readProjectSecrets(projectRoot) {
  const path = join5(projectRoot, PATHS.SECRETS_ENV);
  if (!existsSync5(path)) {
    return {};
  }
  try {
    return parseEnv(readFileSync5(path, "utf8"));
  } catch {
    return {};
  }
}
function getProjectSecret(projectRoot, key) {
  return process.env[key] ?? readProjectSecrets(projectRoot)[key];
}
function writeProjectSecret(projectRoot, key, value) {
  const path = join5(projectRoot, PATHS.SECRETS_ENV);
  const current = readProjectSecrets(projectRoot);
  current[key] = value;
  mkdirSync4(dirname3(path), { recursive: true });
  writeFileSync3(path, serializeEnv(current), "utf8");
  try {
    chmodSync(path, 384);
  } catch {
  }
  return path;
}
function removeProjectSecrets(projectRoot) {
  const path = join5(projectRoot, PATHS.SECRETS_ENV);
  let fd;
  try {
    fd = openSync(path, "r+");
  } catch (error) {
    if (isMissingFileError(error)) return;
    throw error;
  }
  try {
    ftruncateSync(fd, 0);
    writeSync(fd, "# Local project secrets for paqad-ai RAG\n", 0, "utf8");
  } finally {
    closeSync(fd);
  }
}
function getSecretPermissionWarning(projectRoot) {
  const path = join5(projectRoot, PATHS.SECRETS_ENV);
  if (!existsSync5(path)) {
    return null;
  }
  try {
    const mode = statSync(path).mode & 511;
    return mode & 63 ? `Secrets file is too permissive (${mode.toString(8)})` : null;
  } catch {
    return null;
  }
}
function redactSecrets(input, projectRoot) {
  const secrets = [
    process.env.OPENAI_API_KEY,
    ...Object.values(readProjectSecrets(projectRoot))
  ].filter((value) => Boolean(value));
  let result = input;
  for (const secret of secrets) {
    result = result.split(secret).join("[REDACTED]");
  }
  return result;
}

// src/core/errors/redact.ts
init_esm_shims();
function redactPayload(payload, projectRoot) {
  if (!projectRoot) {
    return { redacted: { ...payload }, redacted_fields: [] };
  }
  const redacted = {};
  const redacted_fields = [];
  for (const [key, value] of Object.entries(payload)) {
    if (typeof value === "string") {
      const cleaned = redactSecrets(value, projectRoot);
      redacted[key] = cleaned;
      if (cleaned !== value) {
        redacted_fields.push(key);
      }
    } else {
      redacted[key] = value;
    }
  }
  return { redacted, redacted_fields };
}

// src/core/errors/framework-error.ts
init_esm_shims();
var FrameworkError = class extends Error {
  code;
  details;
  retryable;
  constructor(message, options) {
    super(message, { cause: options.cause });
    this.name = "FrameworkError";
    this.code = options.code;
    this.retryable = options.retryable ?? false;
    if (options.details && options.projectRoot) {
      const { redacted, redacted_fields } = redactPayload(options.details, options.projectRoot);
      this.details = redacted_fields.length > 0 ? { ...redacted, redacted_fields } : redacted;
    } else {
      this.details = options.details;
    }
  }
};

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

// src/rag/lexical-bm25.ts
init_esm_shims();
var K1 = 1.5;
var B = 0.75;
function tokenize(text) {
  return text.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2").toLowerCase().split(/[^a-z0-9]+/).filter((token) => token.length > 0);
}
var Bm25Index = class {
  docTokens = /* @__PURE__ */ new Map();
  docFreq = /* @__PURE__ */ new Map();
  docLength = /* @__PURE__ */ new Map();
  avgDocLength;
  docCount;
  constructor(documents) {
    this.docCount = documents.length;
    let totalLength = 0;
    for (const doc of documents) {
      const tokens = tokenize(doc.content);
      this.docTokens.set(doc.id, tokens);
      this.docLength.set(doc.id, tokens.length);
      totalLength += tokens.length;
      for (const term of new Set(tokens)) {
        this.docFreq.set(term, (this.docFreq.get(term) ?? 0) + 1);
      }
    }
    this.avgDocLength = this.docCount === 0 ? 0 : totalLength / this.docCount;
  }
  idf(term) {
    const n = this.docFreq.get(term) ?? 0;
    return Math.log(1 + (this.docCount - n + 0.5) / (n + 0.5));
  }
  search(query, topK) {
    const queryTerms = new Set(tokenize(query));
    if (queryTerms.size === 0 || this.docCount === 0) {
      return [];
    }
    const hits = [];
    for (const [id, tokens] of this.docTokens) {
      const length = this.docLength.get(id) ?? 0;
      let score = 0;
      for (const term of queryTerms) {
        const tf = countOccurrences(tokens, term);
        if (tf === 0) {
          continue;
        }
        const denom = tf + K1 * (1 - B + B * length / (this.avgDocLength || 1));
        score += this.idf(term) * (tf * (K1 + 1) / denom);
      }
      if (score > 0) {
        hits.push({ id, score });
      }
    }
    hits.sort((left, right) => right.score - left.score);
    return topK === void 0 ? hits : hits.slice(0, topK);
  }
};
function countOccurrences(tokens, term) {
  let count = 0;
  for (const token of tokens) {
    if (token === term) {
      count += 1;
    }
  }
  return count;
}

export {
  DOMAINS,
  STACKS,
  CAPABILITIES,
  ACTIVE_CAPABILITIES,
  DOMAIN_STACK_MAP,
  STACK_CAPABILITIES_MAP,
  isMissingFileError,
  readTextIfExistsSync,
  readProjectProfile,
  writeProjectProfile,
  syncProjectProfile,
  migrateProjectProfile,
  getProfileDomain,
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
  setEngineLogger,
  clearEngineLogger,
  getConsumerLogger,
  engineLog,
  readProjectSecrets,
  getProjectSecret,
  writeProjectSecret,
  removeProjectSecrets,
  getSecretPermissionWarning,
  redactSecrets,
  redactPayload,
  FrameworkError,
  CancelledError,
  isCancelledError,
  tokenize,
  Bm25Index
};
