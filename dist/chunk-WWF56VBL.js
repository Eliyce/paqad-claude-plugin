import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  getProfileDomain
} from "./chunk-6C4M3H2R.js";
import {
  require_out
} from "./chunk-DNG6DDRS.js";
import {
  resolveFrameworkConfig
} from "./chunk-QUAQHWSU.js";
import {
  PATHS
} from "./chunk-LW3OCT4Y.js";
import {
  __toESM,
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/core/stack-profile.ts
init_esm_shims();
var FRAMEWORK_PACKAGE_MAP = {
  "laravel/framework": "laravel",
  flutter: "flutter",
  react: "react",
  vue: "vue",
  nuxt: "vue",
  next: "nextjs",
  flask: "flask",
  "@nestjs/core": "nestjs",
  "@nestjs/common": "nestjs",
  "org.springframework.boot:spring-boot": "spring-boot",
  "org.springframework.boot:spring-boot-starter": "spring-boot",
  "org.springframework.boot:spring-boot-starter-web": "spring-boot",
  django: "django",
  Django: "django",
  fastapi: "fastapi",
  FastAPI: "fastapi",
  rails: "rails"
};
var TRAIT_PACKAGE_MAP = {
  "inertiajs/inertia-laravel": "inertia",
  "laravel/boost": "boost",
  "laravel/sail": "sail",
  "phpunit/phpunit": "phpunit",
  tailwindcss: "tailwind",
  next: "next",
  remix: "remix",
  "@remix-run/react": "remix",
  gatsby: "gatsby",
  nuxt: "nuxt",
  quasar: "quasar",
  "@quasar/app-vite": "quasar",
  vite: "vite-spa",
  "@vitejs/plugin-react": "vite-spa",
  "@vitejs/plugin-vue": "vite-spa",
  "@prisma/client": "prisma",
  prisma: "prisma",
  "@trpc/server": "trpc",
  "@trpc/client": "trpc",
  "next-auth": "next-auth",
  "@auth/core": "next-auth",
  sqlalchemy: "sqlalchemy",
  celery: "celery",
  gunicorn: "gunicorn",
  flask_login: "flask-login",
  "flask-restx": "flask-restx",
  "flask-restful": "flask-restx",
  typeorm: "typeorm",
  "@nestjs/swagger": "swagger",
  "@nestjs/graphql": "graphql",
  "@nestjs/microservices": "microservices",
  "@nestjs/passport": "passport",
  "@nestjs/platform-fastify": "fastify",
  "androidx.room:room-runtime": "room",
  "androidx.hilt:hilt-navigation-compose": "hilt",
  "androidx.navigation:navigation-compose": "navigation",
  "org.jetbrains.kotlinx:kotlinx-coroutines-core": "coroutines",
  "com.squareup.retrofit2:retrofit": "retrofit",
  "androidx.datastore:datastore": "datastore",
  "androidx.compose.ui:ui": "jetpack-compose",
  vitest: "vitest",
  "@playwright/test": "playwright",
  "pestphp/pest": "pest",
  jest: "jest",
  pinia: "pinia",
  vuex: "vuex"
};
var VERSIONED_PACKAGES = /* @__PURE__ */ new Set([
  "laravel/framework",
  "react",
  "vue",
  "next",
  "flask",
  "@nestjs/core",
  "nuxt",
  "tailwindcss",
  "laravel/boost",
  "flutter"
]);
function buildDetectedStackProfile(input) {
  const frameworks = /* @__PURE__ */ new Set();
  const traits = /* @__PURE__ */ new Set([
    ...input.fallbackCapabilities ?? [],
    ...input.detectedTraits ?? []
  ]);
  for (const pkg of input.packages) {
    const framework = FRAMEWORK_PACKAGE_MAP[pkg.name];
    if (framework) {
      frameworks.add(framework);
    }
    const trait = TRAIT_PACKAGE_MAP[pkg.name];
    if (trait) {
      traits.add(trait);
    }
  }
  if (frameworks.size === 0 && input.fallbackStack) {
    frameworks.add(input.fallbackStack);
  }
  if (input.fallbackStack === "laravel") {
    frameworks.add("laravel");
  }
  if (frameworks.has("nextjs")) {
    frameworks.delete("react");
  }
  if (frameworks.has("nestjs")) {
    frameworks.delete("express");
  }
  const versionBands = Array.from(
    input.packages.filter((pkg) => VERSIONED_PACKAGES.has(pkg.name)).sort(compareVersionBandPackages).reduce(
      (bands, pkg) => bands.has(pkg.name) ? bands : bands.set(pkg.name, {
        name: `${pkg.name}:${majorBand(pkg.locked_version || pkg.version_constraint)}`,
        package_name: pkg.name,
        range: majorBand(pkg.locked_version || pkg.version_constraint),
        locked_version: pkg.locked_version,
        source: pkg.locked_version !== "" && pkg.locked_version !== pkg.version_constraint ? "lockfile" : "manifest"
      }),
      /* @__PURE__ */ new Map()
    ).values()
  ).sort((left, right) => left.package_name.localeCompare(right.package_name));
  return {
    frameworks: Array.from(frameworks).sort(compareFrameworks),
    traits: Array.from(traits).sort(),
    toolchains: input.toolchains,
    version_bands: versionBands,
    sources: input.sources
  };
}
function getPrimaryStack(profile) {
  const frameworks = Array.isArray(profile?.stack_profile?.frameworks) ? profile.stack_profile.frameworks : [];
  const legacyStack = profile?.routing ? profile.routing.stack : void 0;
  if (frameworks.length > 0) return frameworks[0];
  if (legacyStack) return legacyStack;
  if (profile && getProfileDomain(
    profile
  ) === "content") {
    return "short-video";
  }
  return "laravel";
}
function getLegacyCapabilities(profile) {
  const legacy = profile?.routing ? profile.routing.capabilities : void 0;
  if (Array.isArray(legacy)) {
    return legacy;
  }
  return (profile?.stack_profile?.traits ?? []).filter(isCapability);
}
function compareStackProfiles(previous, current) {
  if (previous === null) {
    return {
      generated_at: (/* @__PURE__ */ new Date()).toISOString(),
      status: "no-drift",
      previous_profile: null,
      current_profile: current,
      material_changes: [],
      newly_active_rule_bands: [],
      newly_inactive_rule_bands: [],
      review_targets: []
    };
  }
  const changes = [];
  const previousFrameworks = new Set(previous.frameworks ?? []);
  const currentFrameworks = new Set(current.frameworks);
  const previousTraits = new Set(previous.traits ?? []);
  const currentTraits = new Set(current.traits);
  const previousBands = new Map(
    (previous.version_bands ?? []).map((band) => [band.package_name, band])
  );
  const currentBands = new Map(current.version_bands.map((band) => [band.package_name, band]));
  const previousToolchains = JSON.stringify(previous.toolchains ?? []);
  const currentToolchains = JSON.stringify(current.toolchains);
  for (const framework of currentFrameworks) {
    if (!previousFrameworks.has(framework)) {
      changes.push({ type: "framework-added", key: framework, after: framework });
    }
  }
  for (const framework of previousFrameworks) {
    if (!currentFrameworks.has(framework)) {
      changes.push({ type: "framework-removed", key: framework, before: framework });
    }
  }
  for (const trait of currentTraits) {
    if (!previousTraits.has(trait)) {
      changes.push({ type: "trait-added", key: trait, after: trait });
    }
  }
  for (const trait of previousTraits) {
    if (!currentTraits.has(trait)) {
      changes.push({ type: "trait-removed", key: trait, before: trait });
    }
  }
  for (const [name, band] of currentBands) {
    const previousBand = previousBands.get(name);
    if (previousBand && previousBand.range !== band.range) {
      changes.push({
        type: "version-band-changed",
        key: name,
        before: previousBand.range,
        after: band.range
      });
    }
  }
  if (previousToolchains !== currentToolchains) {
    changes.push({
      type: "toolchain-changed",
      key: "toolchains",
      before: previousToolchains,
      after: currentToolchains
    });
  }
  const reviewTargets = deriveReviewTargets(changes);
  return {
    generated_at: (/* @__PURE__ */ new Date()).toISOString(),
    status: changes.length === 0 ? "no-drift" : "drift-detected",
    previous_profile: previous,
    current_profile: current,
    material_changes: changes,
    newly_active_rule_bands: current.version_bands.filter((band) => !previousBands.has(band.package_name)).map((band) => band.name),
    newly_inactive_rule_bands: Array.from(previousBands.values()).filter((band) => !currentBands.has(band.package_name)).map((band) => band.name),
    review_targets: reviewTargets
  };
}
function summarizeStack(profile) {
  const frameworks = profile.frameworks.join(", ") || "none";
  const traits = profile.traits.join(", ") || "none";
  return `frameworks: ${frameworks}; traits: ${traits}`;
}
function deriveReviewTargets(changes) {
  const targets = /* @__PURE__ */ new Set();
  for (const change of changes) {
    if (change.type === "framework-added" || change.type === "framework-removed") {
      targets.add("docs/instructions/architecture/**");
      targets.add("docs/modules/*/ui/**");
      targets.add("docs/modules/*/api/**");
      targets.add("docs/instructions/stack/**");
    }
    if (change.type === "trait-added" || change.type === "trait-removed") {
      targets.add("docs/instructions/stack/**");
      targets.add("docs/modules/*/ui/**");
      targets.add("docs/instructions/tools/**");
    }
    if (change.type === "version-band-changed") {
      targets.add("docs/instructions/stack/version-rules.md");
      targets.add("docs/instructions/architecture/**");
    }
  }
  return Array.from(targets).sort();
}
function compareFrameworks(left, right) {
  return frameworkRank(left) - frameworkRank(right) || left.localeCompare(right);
}
function compareVersionBandPackages(left, right) {
  return rootDepth(left.root) - rootDepth(right.root) || left.name.localeCompare(right.name);
}
function rootDepth(root) {
  if (!root || root === ".") {
    return 0;
  }
  return root.split("/").filter(Boolean).length;
}
function frameworkRank(name) {
  switch (name) {
    case "laravel":
      return 0;
    case "flutter":
      return 1;
    case "nextjs":
      return 2;
    case "react":
      return 3;
    case "vue":
      return 4;
    case "nestjs":
      return 5;
    case "dotnet":
      return 6;
    case "flask":
      return 7;
    case "kotlin-android":
      return 8;
    case "short-video":
      return 9;
    default:
      return 10;
  }
}
function isCapability(value) {
  return [
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
  ].includes(value);
}
function majorBand(value) {
  const match = value.match(/(\d+)/);
  return match?.[1] ? `^${match[1]}` : value;
}

// src/planning/rule-compiler.ts
init_esm_shims();
var import_fast_glob = __toESM(require_out(), 1);
import { mkdir, readFile, writeFile } from "fs/promises";
import { createHash } from "crypto";
import { join } from "path";
var RULE_SCHEMA_VERSION = 1;
async function compileRules(root) {
  const files = await (0, import_fast_glob.default)("**/*.md", {
    cwd: join(root, PATHS.RULES_DIR),
    onlyFiles: true
  });
  const gateFlags = resolveGateFlags(root);
  const kept = [];
  for (const file of files.sort()) {
    const raw = await readFile(join(root, PATHS.RULES_DIR, file), "utf8");
    const gate = extractGate(raw);
    if (gate !== void 0 && gateFlags[gate] !== true) {
      continue;
    }
    kept.push({ file, raw });
  }
  const rules = kept.map(({ file, raw }, index) => compileRuleContent(file, raw, index + 1));
  return {
    schema_version: RULE_SCHEMA_VERSION,
    generated_at: (/* @__PURE__ */ new Date()).toISOString(),
    source_hash: await computeSourceHash(root),
    rules
  };
}
function resolveGateFlags(root) {
  try {
    return resolveFrameworkConfig(root).features;
  } catch {
    return {};
  }
}
function extractGate(raw) {
  return raw.match(/<!--\s*gate:\s*([a-z0-9_]+)\s*-->/i)?.[1];
}
async function writeCompiledRules(root, store) {
  const outputPath = join(root, PATHS.COMPILED_RULES);
  await mkdir(join(root, ".paqad"), { recursive: true });
  await writeFile(outputPath, JSON.stringify(store, null, 2) + "\n", "utf8");
  return outputPath;
}
async function readCompiledRules(root) {
  try {
    const raw = await readFile(join(root, PATHS.COMPILED_RULES), "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
async function isCompiledRulesStale(root) {
  const store = await readCompiledRules(root);
  if (!store) {
    return true;
  }
  return store.source_hash !== await computeSourceHash(root);
}
async function computeSourceHash(root) {
  const files = await (0, import_fast_glob.default)("**/*.md", {
    cwd: join(root, PATHS.RULES_DIR),
    onlyFiles: true
  });
  const hash = createHash("sha256");
  for (const file of files.sort()) {
    const content = await readFile(join(root, PATHS.RULES_DIR, file), "utf8");
    hash.update(file);
    hash.update("\0");
    hash.update(content);
    hash.update("\0");
  }
  return `sha256:${hash.digest("hex")}`;
}
function compileRuleContent(file, raw, ordinal) {
  const headingMatch = raw.match(/^#\s+(.+)$/m);
  const title = headingMatch?.[1]?.trim() || join(PATHS.RULES_DIR, file);
  const summary = raw.split("\n").map((line) => line.trim()).find((line) => line && !line.startsWith("#") && !line.startsWith("```"));
  const triggerPatterns = extractTriggerPatterns(raw);
  if (summary === void 0) {
    return {
      rule_id: `RULE-${ordinal}`,
      title,
      source_path: join(PATHS.RULES_DIR, file),
      trigger_patterns: ["**"],
      severity: "must",
      summary: "Unparseable rule content; preserve raw text for planning context.",
      raw_text: raw
    };
  }
  return {
    rule_id: `RULE-${ordinal}`,
    title,
    source_path: join(PATHS.RULES_DIR, file),
    trigger_patterns: triggerPatterns.length > 0 ? triggerPatterns : ["**"],
    severity: inferSeverity(raw),
    summary,
    raw_text: raw
  };
}
function looksLikeTriggerPattern(candidate) {
  if (!candidate || candidate.length > 120) return false;
  if (/\s/.test(candidate)) return false;
  if (!/^[A-Za-z0-9_./*?@{}[\]-]+$/.test(candidate)) return false;
  return candidate.includes("/") || /[*?]/.test(candidate) || /\.[A-Za-z0-9]+$/.test(candidate);
}
function extractTriggerPatterns(raw) {
  const explicitDirective = raw.match(/<!--\s*trigger:\s*([^>]+)\s*-->/i)?.[1];
  if (explicitDirective) {
    return [
      ...new Set(
        explicitDirective.split(",").map((value) => value.trim()).filter(Boolean)
      )
    ];
  }
  const withoutFences = raw.replace(/```[\s\S]*?```/g, "");
  const candidates = Array.from(withoutFences.matchAll(/`([^`]+)`/g), (match) => match[1].trim());
  return [...new Set(candidates.filter(looksLikeTriggerPattern))];
}
function inferSeverity(raw) {
  const normalized = raw.toLowerCase();
  if (/\bmust\b|\brequired\b|\bnever\b/.test(normalized)) {
    return "must";
  }
  if (/\bshould\b|\brecommended\b/.test(normalized)) {
    return "should";
  }
  return "could";
}

// src/planning/decision-detector.ts
init_esm_shims();
var SIGNALS = [
  {
    category: "create-vs-reuse",
    signal: "reuse-vs-create",
    patterns: [
      /\b(reuse|existing)\b.{0,40}\b(create|build|make new|new)\b/i,
      /\b(create|build|make new|new)\b.{0,40}\b(reuse|existing)\b/i
    ]
  },
  {
    category: "component-reuse",
    signal: "component-choice",
    patterns: [
      /\b(button|card|modal|drawer|tile|iconbutton|input|form)\b.{0,15}\bor\b.{0,15}\b(button|card|modal|drawer|tile|iconbutton|input|form)\b/i
    ]
  },
  {
    category: "architecture-path",
    signal: "explicit-path-fork",
    patterns: [
      /((?:[\w-]+\/)+[\w.-]+\.\w+)\s*(?:,\s*)?\b(?:or|vs\.?|versus)\b\s*((?:[\w-]+\/)+[\w.-]+\.\w+)/i
    ],
    validate: (match) => match[1].toLowerCase() !== match[2].toLowerCase()
  },
  {
    category: "architecture-path",
    signal: "alternative-path",
    patterns: [/\b(or|either|alternatively|we could)\b/i]
  },
  {
    category: "architecture-path",
    signal: "multiple-file-paths",
    patterns: [
      /(?:[\w-]+\/)+[\w.-]+\.\w+.{0,40}\bor\b.{0,40}(?:[\w-]+\/)+[\w.-]+\.\w+/i,
      /(?:[\w-]+\/)+[\w.-]+\.\w+.{0,40}(?:[\w-]+\/)+[\w.-]+\.\w+/i
    ]
  }
];
function detectDecisionForks(request) {
  const forks = [];
  for (const candidate of SIGNALS) {
    for (const pattern of candidate.patterns) {
      const match = request.match(pattern);
      if (match && (!candidate.validate || candidate.validate(match))) {
        forks.push({
          category: candidate.category,
          confidence: confidenceFor(candidate.signal),
          signal: candidate.signal,
          matched_text: match[0]
        });
        break;
      }
    }
  }
  return forks;
}
function confidenceFor(signal) {
  switch (signal) {
    case "reuse-vs-create":
      return 0.92;
    case "explicit-path-fork":
      return 0.9;
    case "component-choice":
      return 0.84;
    default:
      return 0.64;
  }
}

// src/pipeline/rule-trigger-matcher.ts
init_esm_shims();
async function matchRuleTriggers(root, modulePaths) {
  const compiled = await readCompiledRules(root);
  if (!compiled || modulePaths.length === 0) {
    return [];
  }
  return compiled.rules.filter((rule) => ruleTriggersMatch(rule, modulePaths)).map((r) => r.rule_id);
}
function isAlwaysLoadRule(rule) {
  return rule.trigger_patterns.length === 0 || rule.trigger_patterns.includes("**");
}
function ruleTriggersMatch(rule, paths) {
  return rule.trigger_patterns.some(
    (pattern) => paths.some((path) => matchesGlobish(path, pattern))
  );
}
function matchesGlobish(value, pattern) {
  const normalizedValue = value.replace(/\\/g, "/");
  const normalizedPattern = pattern.replace(/\\/g, "/");
  if (normalizedPattern === "**") {
    return true;
  }
  const escaped = normalizedPattern.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(
    `^${escaped.replace(/\*\*/g, ".*").replace(/\*/g, "[^/]*").replace(/\?/g, ".")}$`
  );
  return regex.test(normalizedValue) || normalizedValue.includes(normalizedPattern.replace(/\*/g, ""));
}

export {
  FRAMEWORK_PACKAGE_MAP,
  buildDetectedStackProfile,
  getPrimaryStack,
  getLegacyCapabilities,
  compareStackProfiles,
  summarizeStack,
  compileRules,
  writeCompiledRules,
  readCompiledRules,
  isCompiledRulesStale,
  computeSourceHash,
  looksLikeTriggerPattern,
  detectDecisionForks,
  matchRuleTriggers,
  isAlwaysLoadRule,
  ruleTriggersMatch,
  matchesGlobish
};
