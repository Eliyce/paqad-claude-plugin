import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  renameWithRetrySync
} from "./chunk-NO3RXBBA.js";
import {
  applyFrameworkConfigToProfile,
  readTextIfExistsSync,
  require_dist,
  resolveFrameworkConfig,
  stripFrameworkConfigFromProfile
} from "./chunk-B26SDNKJ.js";
import {
  PATHS
} from "./chunk-CWGYZAT6.js";
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
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { isDeepStrictEqual } from "util";
function readProjectProfile(projectRoot, options = {}) {
  const path = join(projectRoot, PATHS.PROJECT_PROFILE);
  if (!existsSync(path)) {
    return null;
  }
  try {
    const parsed = import_yaml.default.parse(readFileSync(path, "utf8"));
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
    return readFileSync(path, "utf8");
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
  readProjectProfile,
  writeProjectProfile,
  syncProjectProfile,
  migrateProjectProfile,
  getProfileDomain,
  tokenize,
  Bm25Index
};
