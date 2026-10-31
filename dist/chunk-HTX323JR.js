import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  ChunkIndexManager,
  RagService
} from "./chunk-LT2Y4ATA.js";
import {
  detectDecisionForks,
  getPrimaryStack,
  matchRuleTriggers
} from "./chunk-YNKACCNJ.js";
import {
  engineLog
} from "./chunk-GUW6M2GG.js";
import {
  readGitChangedFiles
} from "./chunk-UUWVX4K7.js";
import {
  require_out
} from "./chunk-DNG6DDRS.js";
import {
  stripTrailingChars
} from "./chunk-4K4CM3QN.js";
import {
  COMPLEXITY_LEVELS,
  require_dist,
  resolveAnalyticsGate,
  resolveFrameworkConfig,
  selectLane
} from "./chunk-4EM3UUW7.js";
import {
  slugifyAscii
} from "./chunk-XYQUJYH4.js";
import {
  PATHS
} from "./chunk-CWGYZAT6.js";
import {
  __toESM,
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/compliance/defect-patterns/types.ts
init_esm_shims();
var DEFECT_PATTERN_SCHEMA_VERSION = 1;

// src/compliance/defect-patterns/store.ts
init_esm_shims();
import { mkdir, readFile, readdir, writeFile } from "fs/promises";
import os from "os";
import path from "path";
var EXAMPLE_CAP = 5;
var STALENESS_DAYS = 365;
function defaultStoreRoot() {
  return path.join(os.homedir(), ".paqad", "defect-patterns");
}
async function recordFindings(findings, storeRoot = defaultStoreRoot()) {
  if (findings.length === 0) return;
  await ensureStoreDir(storeRoot);
  const index = await loadIndex(storeRoot);
  for (const finding of findings) {
    await upsertPattern(finding, index, storeRoot);
  }
  index.updated_at = (/* @__PURE__ */ new Date()).toISOString();
  await saveIndex(index, storeRoot);
}
async function queryPatterns(options, storeRoot = defaultStoreRoot()) {
  const index = await loadIndex(storeRoot);
  const minFrequency = options.min_frequency ?? 3;
  const maxAgeDays = options.max_age_days ?? STALENESS_DAYS;
  const limit = options.limit ?? 5;
  const cutoff = new Date(Date.now() - maxAgeDays * 24 * 60 * 60 * 1e3);
  const candidates = index.entries.filter((entry) => {
    if (entry.frequency < minFrequency) return false;
    if (new Date(entry.last_seen) < cutoff) return false;
    if (entry.stale) return false;
    return true;
  });
  const filtered = [];
  for (const candidate of candidates) {
    const entry = await loadEntry(candidate.pattern_id, storeRoot);
    if (!entry) continue;
    if (options.stack_context && !stackMatches(entry.stack_contexts, options.stack_context)) {
      continue;
    }
    filtered.push(entry);
  }
  return filtered.sort((a, b) => b.frequency - a.frequency).slice(0, limit);
}
async function prunePatterns(olderThanDays, storeRoot = defaultStoreRoot()) {
  const index = await loadIndex(storeRoot);
  const cutoff = new Date(Date.now() - olderThanDays * 24 * 60 * 60 * 1e3);
  const toRemove = index.entries.filter((e) => new Date(e.last_seen) < cutoff);
  for (const entry of toRemove) {
    try {
      const { unlink } = await import("fs/promises");
      await unlink(entryPath(entry.pattern_id, storeRoot));
    } catch {
    }
  }
  index.entries = index.entries.filter((e) => new Date(e.last_seen) >= cutoff);
  index.updated_at = (/* @__PURE__ */ new Date()).toISOString();
  await saveIndex(index, storeRoot);
  return toRemove.length;
}
async function loadIndex(storeRoot = defaultStoreRoot()) {
  const indexFile = path.join(storeRoot, "index.json");
  try {
    const raw = await readFile(indexFile, "utf8");
    const parsed = JSON.parse(raw);
    if (typeof parsed.schema_version !== "number" || !Array.isArray(parsed.entries)) {
      throw new Error("invalid index structure");
    }
    return parsed;
  } catch {
    return rebuildIndex(storeRoot);
  }
}
async function loadEntry(patternId, storeRoot = defaultStoreRoot()) {
  try {
    const raw = await readFile(entryPath(patternId, storeRoot), "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
function entryPath(patternId, storeRoot) {
  return path.join(storeRoot, "entries", `${patternId}.json`);
}
async function ensureStoreDir(storeRoot) {
  await mkdir(path.join(storeRoot, "entries"), { recursive: true });
}
async function saveIndex(index, storeRoot) {
  await ensureStoreDir(storeRoot);
  await writeFile(
    path.join(storeRoot, "index.json"),
    JSON.stringify(index, null, 2) + "\n",
    "utf8"
  );
}
async function saveEntry(entry, storeRoot) {
  await ensureStoreDir(storeRoot);
  await writeFile(
    entryPath(entry.pattern_id, storeRoot),
    JSON.stringify(entry, null, 2) + "\n",
    "utf8"
  );
}
async function rebuildIndex(storeRoot) {
  const entriesDir = path.join(storeRoot, "entries");
  let files = [];
  try {
    files = await readdir(entriesDir);
  } catch {
  }
  const entries = [];
  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    const id = file.replace(/\.json$/, "");
    try {
      const raw = await readFile(path.join(entriesDir, file), "utf8");
      const entry = JSON.parse(raw);
      entries.push({
        pattern_id: entry.pattern_id,
        subcategory: entry.subcategory,
        frequency: entry.frequency,
        last_seen: entry.last_seen,
        stale: entry.stale
      });
    } catch {
      engineLog("warn", `[defect-patterns] Skipping corrupt entry file: ${id}.json`);
    }
  }
  return {
    schema_version: DEFECT_PATTERN_SCHEMA_VERSION,
    updated_at: (/* @__PURE__ */ new Date()).toISOString(),
    entries
  };
}
async function upsertPattern(finding, index, storeRoot) {
  const existing = index.entries.find((e) => e.subcategory === finding.subcategory);
  if (existing) {
    const entry = await loadEntry(existing.pattern_id, storeRoot);
    if (!entry) return;
    applyFindingToEntry(finding, entry);
    existing.frequency = entry.frequency;
    existing.last_seen = entry.last_seen;
    existing.stale = entry.stale;
    await saveEntry(entry, storeRoot);
  } else {
    const entry = createEntryFromFinding(finding);
    index.entries.push({
      pattern_id: entry.pattern_id,
      subcategory: entry.subcategory,
      frequency: entry.frequency,
      last_seen: entry.last_seen,
      stale: entry.stale
    });
    await saveEntry(entry, storeRoot);
  }
}
function createEntryFromFinding(finding) {
  const now = finding.recorded_at;
  return {
    pattern_id: generatePatternId(finding.subcategory),
    subcategory: finding.subcategory,
    description: finding.description,
    frequency: 1,
    recency: now,
    stack_contexts: [finding.stack_context],
    example_obligations: finding.obligation_id ? [finding.description] : [],
    example_files: finding.file_path ? [finding.file_path] : [],
    severity_distribution: { critical: 0, major: 0, minor: 0, info: 0 },
    first_seen: now,
    last_seen: now,
    stale: false
  };
}
function applyFindingToEntry(finding, entry) {
  entry.frequency += 1;
  entry.last_seen = finding.recorded_at;
  entry.recency = finding.recorded_at;
  entry.stale = false;
  if (!entry.stack_contexts.some(
    (sc) => JSON.stringify(sc.frameworks.slice().sort()) === JSON.stringify(finding.stack_context.frameworks.slice().sort())
  )) {
    entry.stack_contexts.push(finding.stack_context);
  }
  if (finding.description && entry.example_obligations.length < EXAMPLE_CAP) {
    if (!entry.example_obligations.includes(finding.description)) {
      entry.example_obligations.push(finding.description);
    }
  }
  if (finding.file_path && entry.example_files.length < EXAMPLE_CAP) {
    if (!entry.example_files.includes(finding.file_path)) {
      entry.example_files.push(finding.file_path);
    }
  }
}
function stackMatches(stored, query) {
  if (query.frameworks.length === 0 && query.traits.length === 0) return true;
  return stored.some(
    (sc) => query.frameworks.some((f) => sc.frameworks.includes(f)) || query.traits.some((t) => sc.traits.includes(t))
  );
}
function generatePatternId(subcategory) {
  const slug = slugifyAscii(subcategory);
  return `${slug}-${Date.now().toString(36)}`;
}
function markStaleEntries(index) {
  const cutoff = new Date(Date.now() - STALENESS_DAYS * 24 * 60 * 60 * 1e3);
  for (const entry of index.entries) {
    entry.stale = new Date(entry.last_seen) < cutoff;
  }
}

// src/core/constants/planning.ts
init_esm_shims();
var PLANNING_MANIFEST_VERSION = 1;
var PLAN_MODES = {
  FULL: "full",
  DELTA: "delta"
};
var PLANNING_LANES = {
  FAST: "fast",
  GRADUATED: "graduated",
  FULL: "full"
};
var REQUIREMENT_TYPES = {
  FUNCTIONAL: "functional",
  NON_FUNCTIONAL: "non-functional",
  CONSTRAINT: "constraint",
  EDGE_CASE: "edge-case"
};
var PROOF_TYPES = {
  AUTOMATED: "automated",
  MANUAL: "manual",
  VISUAL: "visual"
};
var CRITERION_STATUSES = {
  UNCOVERED: "uncovered",
  COVERED: "covered",
  PARTIAL: "partial",
  INDETERMINATE: "indeterminate"
};
var HEALTH_TIERS = {
  STABLE: "stable",
  MODERATE: "moderate",
  FRAGILE: "fragile",
  UNKNOWN: "unknown"
};
var ROLLBACK_CLASSES = {
  SAFE: "safe",
  NEEDS_MIGRATION: "needs-migration",
  DESTRUCTIVE: "destructive"
};

// src/planning/module-health.ts
init_esm_shims();
var import_fast_glob = __toESM(require_out(), 1);
import { mkdir as mkdir2, readFile as readFile2, rename, writeFile as writeFile2 } from "fs/promises";
import { dirname, join } from "path";
function deriveHealthTier(metrics) {
  const coverage = metrics.coverage_pct ?? null;
  const defectFrequency = metrics.defect_frequency ?? null;
  const contractStability = metrics.contract_stability ?? null;
  if (coverage === null && defectFrequency === null && contractStability === null) {
    return HEALTH_TIERS.UNKNOWN;
  }
  if (coverage !== null && coverage >= 80 && defectFrequency !== null && defectFrequency <= 2 && contractStability !== null && contractStability >= 0.85) {
    return HEALTH_TIERS.STABLE;
  }
  if (coverage !== null && coverage >= 50 && defectFrequency !== null && defectFrequency <= 5) {
    return HEALTH_TIERS.MODERATE;
  }
  return HEALTH_TIERS.FRAGILE;
}
async function readModuleHealth(root, moduleName) {
  try {
    const raw = await readFile2(moduleHealthPath(root, moduleName), "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
async function writeModuleHealth(root, moduleName, metrics) {
  const profile = {
    module: moduleName,
    tier: deriveHealthTier(metrics),
    metrics,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  await writeModuleHealthProfile(root, profile);
  return profile;
}
async function writeModuleHealthProfile(root, profile) {
  const path2 = moduleHealthPath(root, profile.module);
  await mkdir2(dirname(path2), { recursive: true });
  const content = JSON.stringify(profile, null, 2) + "\n";
  JSON.parse(content);
  const temporaryPath = `${path2}.${process.pid}.${Date.now()}.tmp`;
  await writeFile2(temporaryPath, content, "utf8");
  await rename(temporaryPath, path2);
  return profile;
}
async function readAllModuleHealth(root) {
  const dir = join(root, PATHS.PLANNING_MODULE_HEALTH_DIR);
  try {
    const files = await (0, import_fast_glob.default)("**/*.json", { cwd: dir, onlyFiles: true });
    const profiles = await Promise.all(
      files.filter((file) => !file.split("/").includes("evidence")).map(async (file) => {
        const raw = await readFile2(join(dir, file), "utf8");
        return JSON.parse(raw);
      })
    );
    return profiles.filter(isModuleHealthProfile).sort((left, right) => left.module.localeCompare(right.module));
  } catch {
    return [];
  }
}
async function initializeModuleHealth(root, moduleName) {
  const existing = await readModuleHealth(root, moduleName);
  if (existing) {
    return existing;
  }
  return writeModuleHealth(root, moduleName, {
    coverage_pct: null,
    defect_frequency: null,
    contract_stability: null,
    change_velocity: null
  });
}
function moduleHealthPath(root, moduleName) {
  return join(root, PATHS.PLANNING_MODULE_HEALTH_DIR, `${moduleName}.json`);
}
function isModuleHealthProfile(value) {
  return typeof value.module === "string" && typeof value.tier === "string" && typeof value.metrics === "object" && value.metrics !== null && typeof value.updated_at === "string";
}

// src/planning/module-health-updater.ts
init_esm_shims();
var import_fast_glob2 = __toESM(require_out(), 1);
import { createHash, randomBytes } from "crypto";
import { existsSync } from "fs";
import { mkdir as mkdir3, readFile as readFile3, readdir as readdir2, rename as rename2, rm, writeFile as writeFile3 } from "fs/promises";
import { dirname as dirname2, join as join2, relative } from "path";
var LOOKBACK_DAYS = 90;
var MAX_PROCESSED_EVENT_IDS = 50;
async function syncModuleHealth(options) {
  const acquired = await acquireLock(options.projectRoot);
  if (!acquired) {
    await writeAudit(options.projectRoot, {
      action: "lock-contention-skip",
      source: options.source ?? "provider-hook",
      provider: options.provider,
      detail: "Module health sync skipped because another updater owns the lock."
    });
    return { processed_events: 0, updated_profiles: [], skipped: true, reason: "locked" };
  }
  try {
    await collectSessionEvidence(options);
    const evidence = await readEvidence(options.projectRoot);
    if (evidence.length === 0) {
      return { processed_events: 0, updated_profiles: [], skipped: false };
    }
    const modules = await resolveKnownModules(options.projectRoot);
    const consumed = await readConsumedEventIndex(options.projectRoot);
    const updated = /* @__PURE__ */ new Set();
    const staleEvidenceIds = /* @__PURE__ */ new Set();
    let processed = 0;
    for (const event of evidence) {
      if (consumed.event_ids.includes(event.event_id)) {
        staleEvidenceIds.add(event.event_id);
        continue;
      }
      const affectedModules = resolveEvidenceModules(event, modules);
      if (affectedModules.length === 0) {
        await writeAudit(options.projectRoot, {
          action: "evidence-ignored",
          source: event.source,
          provider: event.provider,
          event_id: event.event_id,
          detail: "Evidence could not be mapped to a stable module."
        });
        continue;
      }
      for (const moduleName of affectedModules) {
        const result = await applyEvidenceToProfile(options.projectRoot, moduleName, event);
        if (result === "updated" || result === "created") {
          updated.add(moduleName);
        }
      }
      consumed.event_ids.push(event.event_id);
      staleEvidenceIds.add(event.event_id);
      processed += 1;
    }
    if (processed > 0) {
      await writeConsumedEventIndex(options.projectRoot, consumed);
    }
    for (const eventId of staleEvidenceIds) {
      await rm(evidencePath(options.projectRoot, eventId), { force: true });
    }
    return {
      processed_events: processed,
      updated_profiles: [...updated].sort(),
      skipped: false
    };
  } catch (error) {
    await writeAudit(options.projectRoot, {
      action: "updater-failure",
      source: options.source ?? "provider-hook",
      provider: options.provider,
      /* c8 ignore next -- JavaScript I/O failures arrive as Error objects in supported runtimes. */
      detail: error instanceof Error ? error.message : String(error)
    });
    if (options.silent) {
      return {
        processed_events: 0,
        updated_profiles: [],
        skipped: true,
        reason: "failure"
      };
    }
    throw error;
  } finally {
    await releaseLock(options.projectRoot);
  }
}
function gatesThatPassed(results) {
  return results.filter((result) => result.passed && result.outcome === void 0).map((result) => result.gate);
}
async function syncModuleHealthFromVerification(input) {
  try {
    const structured = input.verificationContext.structured_test_results ?? [];
    const failedTests = structured.reduce((total, result) => total + result.summary.failed, 0);
    const erroredTests = structured.reduce((total, result) => total + result.summary.errored, 0);
    const passedTests = structured.reduce((total, result) => total + result.summary.passed, 0);
    const gatesPassed = gatesThatPassed(input.results);
    const gatesFailed = input.results.filter((result) => !result.passed).map((result) => result.gate);
    const status = gatesFailed.length > 0 || failedTests > 0 || erroredTests > 0 ? "fail" : "pass";
    const mutation = input.verificationContext.mutation_result;
    const mutationSignal = mutation && mutation.kill_rate !== null && mutation.status !== "skipped" ? { kill_rate: mutation.kill_rate, confidence: mutation.confidence } : void 0;
    const event = createEvidence({
      source: "verification-gate",
      provider: input.provider,
      sessionId: input.sessionId,
      affectedFiles: input.verificationContext.changed_files,
      affectedModules: input.verificationContext.modules,
      signals: {
        tests: structured.length > 0 ? {
          status,
          passed: passedTests,
          failed: failedTests,
          errored: erroredTests
        } : void 0,
        verification: {
          status,
          gates_passed: gatesPassed,
          gates_failed: gatesFailed
        },
        docs: {
          doc_targets_total: input.verificationContext.stale_doc_targets.length,
          doc_targets_missing: input.verificationContext.stale_doc_targets.length
        },
        ...mutationSignal ? { mutation: mutationSignal } : {}
      }
    });
    await persistEvidence(input.projectRoot, event);
    return syncModuleHealth({
      projectRoot: input.projectRoot,
      source: "verification-gate",
      provider: input.provider,
      sessionId: input.sessionId,
      silent: true
    });
  } catch (error) {
    await writeAudit(input.projectRoot, {
      action: "updater-failure",
      source: "verification-gate",
      provider: input.provider,
      /* v8 ignore start -- String(error) branch for non-Error throws; all tested errors are Error instances */
      detail: error instanceof Error ? error.message : String(error)
      /* v8 ignore stop */
    });
    return {
      processed_events: 0,
      updated_profiles: [],
      skipped: true,
      reason: "failure"
    };
  }
}
function createEvidence(input) {
  const affectedFiles = normalizeList(input.affectedFiles ?? []);
  const affectedModules = normalizeList(input.affectedModules ?? []);
  const signals = pruneSignals(input.signals ?? {});
  const stablePayload = JSON.stringify({
    source: input.source,
    provider: input.provider ?? null,
    session_id: input.sessionId ?? null,
    affected_files: affectedFiles,
    affected_modules: affectedModules,
    signals
  });
  const digest = createHash("sha256").update(stablePayload).digest("hex").slice(0, 16);
  return {
    schema_version: 1,
    event_id: `mh-${digest}`,
    source: input.source,
    ...input.provider ? { provider: input.provider } : {},
    ...input.sessionId ? { session_id: input.sessionId } : {},
    created_at: (/* @__PURE__ */ new Date()).toISOString(),
    affected_files: affectedFiles,
    affected_modules: affectedModules,
    signals
  };
}
async function persistEvidence(projectRoot, evidence) {
  const path2 = evidencePath(projectRoot, evidence.event_id);
  await mkdir3(dirname2(path2), { recursive: true });
  await atomicWriteJson(path2, evidence);
}
async function readConsumedEventIndex(projectRoot) {
  try {
    const parsed = JSON.parse(
      await readFile3(join2(projectRoot, PATHS.MODULE_HEALTH_CONSUMED_EVENTS), "utf8")
    );
    return {
      schema_version: 1,
      /* v8 ignore start -- defensive fallbacks for malformed persisted data; always valid schema in practice */
      event_ids: Array.isArray(parsed.event_ids) ? [
        ...new Set(
          parsed.event_ids.filter((value) => typeof value === "string")
        )
      ] : [],
      updated_at: typeof parsed.updated_at === "string" ? parsed.updated_at : (/* @__PURE__ */ new Date(0)).toISOString()
    };
  } catch {
    return {
      schema_version: 1,
      event_ids: [],
      updated_at: (/* @__PURE__ */ new Date(0)).toISOString()
    };
  }
}
async function writeConsumedEventIndex(projectRoot, index) {
  await atomicWriteJson(join2(projectRoot, PATHS.MODULE_HEALTH_CONSUMED_EVENTS), {
    schema_version: 1,
    event_ids: [...new Set(index.event_ids)].sort(),
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  });
}
async function collectSessionEvidence(options) {
  const changedFiles = await readChangedFiles(options.projectRoot);
  if (changedFiles.length === 0) {
    return;
  }
  await persistEvidence(
    options.projectRoot,
    createEvidence({
      source: options.source ?? (options.preflight ? "preflight" : "provider-hook"),
      provider: options.provider,
      sessionId: resolveEvidenceSessionId(options),
      affectedFiles: changedFiles,
      signals: {}
    })
  );
}
function resolveEvidenceSessionId(options) {
  if (options.sessionId !== void 0) {
    return options.sessionId;
  }
  if (options.preflight === true || options.source !== void 0 && options.source !== "provider-hook" && options.source !== "session-artifact") {
    return void 0;
  }
  return `auto-${process.pid}-${Date.now()}-${randomBytes(4).toString("hex")}`;
}
async function readChangedFiles(projectRoot) {
  return normalizeList(await readGitChangedFiles(projectRoot));
}
async function readEvidence(projectRoot) {
  const dir = join2(projectRoot, PATHS.MODULE_HEALTH_EVIDENCE_DIR);
  try {
    const files = await (0, import_fast_glob2.default)("*.json", { cwd: dir, onlyFiles: true });
    const events = [];
    for (const file of files.sort()) {
      try {
        const parsed = JSON.parse(await readFile3(join2(dir, file), "utf8"));
        if (isEvidence(parsed)) {
          events.push(parsed);
        } else {
          await writeAudit(projectRoot, {
            action: "evidence-ignored",
            source: "provider-hook",
            detail: `${file} failed schema validation.`
          });
        }
      } catch {
        await writeAudit(projectRoot, {
          action: "evidence-ignored",
          source: "provider-hook",
          detail: `${file} is unreadable JSON.`
        });
      }
    }
    return events;
  } catch {
    return [];
  }
}
async function applyEvidenceToProfile(projectRoot, moduleName, event) {
  const existing = await readProfileConservatively(projectRoot, moduleName, event);
  if (existing?.evidence?.processed_event_ids?.includes(event.event_id)) {
    return "skipped";
  }
  const base = existing ?? createUnknownProfile(moduleName);
  const nextMetrics = mergeMetrics(base.metrics, event);
  const tier = deriveHealthTier(nextMetrics);
  const processed = [...base.evidence?.processed_event_ids ?? [], event.event_id].slice(
    -MAX_PROCESSED_EVENT_IDS
  );
  const verificationStatus = event.signals.verification?.status ?? event.signals.tests?.status;
  const next = {
    ...base,
    schema_version: 2,
    module: moduleName,
    tier,
    metrics: nextMetrics,
    evidence: {
      ...base.evidence ?? {},
      last_event_id: event.event_id,
      ...event.provider ? { last_provider: event.provider } : {},
      ...event.session_id ? { last_session_id: event.session_id } : {},
      ...verificationStatus ? { last_verification_status: verificationStatus } : {},
      last_changed_files: event.affected_files.slice(0, 25),
      processed_event_ids: processed
    },
    history: {
      ...base.history ?? {},
      lookback_days: LOOKBACK_DAYS,
      events_count: (base.history?.events_count ?? 0) + 1,
      last_failure_at: isFailure(event) ? event.created_at : base.history?.last_failure_at ?? null,
      last_success_at: isSuccess(event) ? event.created_at : base.history?.last_success_at ?? null
    },
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  await writeModuleHealthProfile(projectRoot, next);
  await writeAudit(projectRoot, {
    action: existing ? "profile-updated" : "profile-created",
    source: event.source,
    provider: event.provider,
    event_id: event.event_id,
    detail: `${moduleName} tier=${next.tier}.`
  });
  return existing ? "updated" : "created";
}
async function readProfileConservatively(projectRoot, moduleName, event) {
  const path2 = moduleHealthPath(projectRoot, moduleName);
  try {
    if (!existsSync(path2)) {
      return null;
    }
    const raw = await readFile3(path2, "utf8");
    return JSON.parse(raw);
  } catch {
    await rename2(path2, `${path2}.corrupt-${Date.now()}`).catch(() => void 0);
    await writeAudit(projectRoot, {
      action: "profile-repair-attempted",
      source: event.source,
      provider: event.provider,
      event_id: event.event_id,
      detail: `Preserved corrupt profile for ${moduleName}; writing repaired profile from evidence.`
    });
    return null;
  }
}
function mergeMetrics(existing, event) {
  const next = { ...existing };
  const coverage = deriveCoverage(event);
  if (coverage !== null) {
    next.coverage_pct = coverage;
  }
  const mutationScore = deriveMutationScore(event);
  if (mutationScore !== null) {
    next.mutation_score = mutationScore;
  }
  const defectDelta = defectContribution(event);
  if (defectDelta > 0) {
    next.defect_frequency = (next.defect_frequency ?? 0) + defectDelta;
  } else if (hasSuccessfulStructuredVerification(event) && next.defect_frequency === null) {
    next.defect_frequency = 0;
  }
  const stability = deriveContractStability(existing.contract_stability ?? null, event);
  if (stability !== null) {
    next.contract_stability = stability;
  }
  if (event.affected_files.length > 0 || event.session_id) {
    next.change_velocity = (next.change_velocity ?? 0) + 1;
  }
  return next;
}
function deriveCoverage(event) {
  const testCoverage = event.signals.tests?.coverage_pct;
  if (typeof testCoverage === "number") {
    return clamp(testCoverage, 0, 100);
  }
  const compliance = event.signals.compliance;
  if (typeof compliance?.covered_obligations === "number" && typeof compliance.total_obligations === "number" && compliance.total_obligations > 0) {
    return clamp(compliance.covered_obligations / compliance.total_obligations * 100, 0, 100);
  }
  return null;
}
function deriveMutationScore(event) {
  const mutation = event.signals.mutation;
  if (typeof mutation?.kill_rate === "number" && mutation.confidence !== "lower") {
    return clamp(mutation.kill_rate, 0, 100);
  }
  return null;
}
function defectContribution(event) {
  const failedTests = event.signals.tests?.failed ?? 0;
  const erroredTests = event.signals.tests?.errored ?? 0;
  const failedGates = event.signals.verification?.gates_failed?.length ?? 0;
  const criticalObligations = event.signals.compliance?.uncovered_critical ?? 0;
  const defects = (event.signals.defects?.new ?? 0) + (event.signals.defects?.recurring ?? 0);
  const scopeViolations = event.signals.scope?.scope_violations ?? 0;
  return failedTests + erroredTests + failedGates + criticalObligations + defects + scopeViolations;
}
function deriveContractStability(current, event) {
  if (isFailure(event)) {
    return clamp((current ?? 0.8) - 0.1, 0, 1);
  }
  if (hasSuccessfulStructuredVerification(event)) {
    const docsMissing = event.signals.docs?.doc_targets_missing ?? 0;
    return docsMissing > 0 ? clamp((current ?? 0.85) - 0.05, 0, 1) : Math.max(current ?? 0, 0.9);
  }
  return current;
}
async function resolveKnownModules(projectRoot) {
  const fromProfiles = (await readAllModuleHealth(projectRoot)).map((profile) => profile.module);
  let fromDocs;
  try {
    fromDocs = (await readdir2(join2(projectRoot, PATHS.MODULES_DIR), { withFileTypes: true })).filter((entry) => entry.isDirectory()).map((entry) => entry.name);
  } catch {
    fromDocs = [];
  }
  return [.../* @__PURE__ */ new Set([...fromProfiles, ...fromDocs])].sort((left, right) => {
    return right.length - left.length;
  });
}
function resolveEvidenceModules(event, knownModules) {
  if (event.affected_modules.length > 0) {
    return event.affected_modules;
  }
  const resolved = /* @__PURE__ */ new Set();
  for (const file of event.affected_files) {
    const normalized = normalizePath(file);
    const known = knownModules.find((moduleName) => pathMatchesModule(normalized, moduleName));
    if (known) {
      resolved.add(known);
      continue;
    }
    const fallback = fallbackModuleFromPath(normalized);
    if (fallback) {
      resolved.add(fallback);
    }
  }
  return [...resolved].sort();
}
function pathMatchesModule(file, moduleName) {
  const normalizedModule = normalizePath(moduleName);
  return file === normalizedModule || file.startsWith(`${normalizedModule}/`) || file.includes(`/modules/${normalizedModule}/`) || file.includes(`/${normalizedModule}/`);
}
function fallbackModuleFromPath(file) {
  const parts = file.split("/").filter(Boolean);
  if (parts[0] === "src" && parts[1]) {
    return parts[1];
  }
  if (parts[0] === "lib" && parts[1]) {
    return parts[1];
  }
  if (parts[0] === "app" && parts[1]) {
    return parts[1];
  }
  if (parts[0] === "tests" && parts[2]) {
    return parts[2];
  }
  if (parts[0] === "docs" && parts[1] === "modules" && parts[2]) {
    return parts[2];
  }
  return null;
}
async function acquireLock(projectRoot) {
  try {
    const lockPath = join2(projectRoot, PATHS.MODULE_HEALTH_LOCK);
    await mkdir3(dirname2(lockPath), { recursive: true });
    await mkdir3(lockPath, { recursive: false });
    return true;
  } catch {
    return false;
  }
}
async function releaseLock(projectRoot) {
  await rm(join2(projectRoot, PATHS.MODULE_HEALTH_LOCK), { recursive: true, force: true });
}
async function writeAudit(projectRoot, event) {
  const line = JSON.stringify({
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    subsystem: "module-health",
    ...event
  });
  const logPath = join2(projectRoot, PATHS.MODULE_HEALTH_LOG);
  const auditPath = join2(projectRoot, PATHS.AUDIT_LOG);
  await mkdir3(dirname2(logPath), { recursive: true });
  await writeFile3(logPath, `${line}
`, { encoding: "utf8", flag: "a" });
  await mkdir3(dirname2(auditPath), { recursive: true });
  await writeFile3(auditPath, `${line}
`, { encoding: "utf8", flag: "a" });
}
function createUnknownProfile(moduleName) {
  const metrics = {
    coverage_pct: null,
    defect_frequency: null,
    contract_stability: null,
    change_velocity: null,
    mutation_score: null
  };
  return {
    module: moduleName,
    tier: deriveHealthTier(metrics),
    metrics,
    updated_at: (/* @__PURE__ */ new Date(0)).toISOString()
  };
}
function isEvidence(value) {
  return value?.schema_version === 1 && typeof value.event_id === "string" && typeof value.source === "string" && typeof value.created_at === "string" && Array.isArray(value.affected_files) && Array.isArray(value.affected_modules) && typeof value.signals === "object" && value.signals !== null;
}
function hasSuccessfulStructuredVerification(event) {
  return event.signals.verification?.status === "pass" || event.signals.tests?.status === "pass";
}
function isFailure(event) {
  return event.signals.verification?.status === "fail" || event.signals.tests?.status === "fail" || defectContribution(event) > 0;
}
function isSuccess(event) {
  return hasSuccessfulStructuredVerification(event) && !isFailure(event);
}
function pruneSignals(signals) {
  return JSON.parse(JSON.stringify(signals));
}
function normalizeList(values) {
  return [...new Set(values.map(normalizePath).filter((value) => value.length > 0))].sort();
}
function normalizePath(value) {
  return value.replace(/\\/g, "/").replace(/^\.\//u, "");
}
function evidencePath(projectRoot, eventId) {
  return join2(projectRoot, PATHS.MODULE_HEALTH_EVIDENCE_DIR, `${eventId}.json`);
}
async function atomicWriteJson(path2, value) {
  const content = JSON.stringify(value, null, 2) + "\n";
  JSON.parse(content);
  const temporaryPath = `${path2}.${process.pid}.${Date.now()}.tmp`;
  await writeFile3(temporaryPath, content, "utf8");
  await rename2(temporaryPath, path2);
}
function toProjectRelative(projectRoot, path2) {
  return normalizePath(relative(projectRoot, path2));
}
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, Number(value.toFixed(2))));
}

// src/planning/manifest-parser.ts
init_esm_shims();
var import_yaml = __toESM(require_dist(), 1);
import { access, mkdir as mkdir4, readFile as readFile4, readdir as readdir3, rename as rename3, writeFile as writeFile4 } from "fs/promises";
import { createHash as createHash2 } from "crypto";
import { dirname as dirname3, join as join3 } from "path";
async function loadManifest(root, slug) {
  const raw = await readFile4(join3(root, PATHS.PLANNING_MANIFESTS_DIR, `${slug}.yaml`), "utf8");
  return import_yaml.default.parse(raw);
}
async function saveManifest(root, manifest) {
  const target = join3(root, PATHS.PLANNING_MANIFESTS_DIR, `${manifest.slug}.yaml`);
  const temp = `${target}.tmp`;
  await mkdir4(dirname3(target), { recursive: true });
  await writeFile4(temp, import_yaml.default.stringify(manifest), "utf8");
  await rename3(temp, target);
  return target;
}
async function manifestExists(root, slug) {
  try {
    await access(join3(root, PATHS.PLANNING_MANIFESTS_DIR, `${slug}.yaml`));
    return true;
  } catch {
    return false;
  }
}
async function listManifestSlugs(root) {
  try {
    const files = await readdir3(join3(root, PATHS.PLANNING_MANIFESTS_DIR));
    return files.filter((file) => file.endsWith(".yaml")).map((file) => file.slice(0, -".yaml".length)).sort();
  } catch {
    return [];
  }
}
function computeManifestHash(manifest) {
  const canonical = stableStringify(manifest);
  return `sha256:${createHash2("sha256").update(canonical).digest("hex")}`;
}
function stableStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map((entry) => stableStringify(entry)).join(",")}]`;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value).sort(
      ([left], [right]) => left.localeCompare(right)
    );
    return `{${entries.map(([key, entry]) => `${JSON.stringify(key)}:${stableStringify(entry)}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

// src/pipeline/confidence-scorer.ts
init_esm_shims();
var WEIGHTS = {
  deterministic: 1,
  "deterministic:mcp": 1,
  "deterministic:rag": 1,
  "deterministic:graph": 1,
  "deterministic:manifest": 1,
  "llm-confirmed": 0.8,
  "llm-overridden": 0.6,
  "llm-guessed": 0.3,
  "health-override": 1,
  "history-corrected": 1,
  "defect-floor": 1,
  default: 0.1
};
var TOTAL_CLASSIFICATION_DIMENSIONS = 15;
function computeClassificationConfidence(resolutionMap) {
  const entries = Object.values(resolutionMap).filter(
    (value) => value !== void 0
  );
  if (entries.length === 0) {
    return 0;
  }
  const weighted = entries.reduce((sum, source) => sum + (WEIGHTS[source] ?? 0.1), 0);
  return Math.min(1, Math.round(weighted / TOTAL_CLASSIFICATION_DIMENSIONS * 100) / 100);
}

// src/pipeline/post-classifier.ts
init_esm_shims();
import { mkdir as mkdir5, readFile as readFile5, readdir as readdir4, writeFile as writeFile5 } from "fs/promises";
import { join as join4 } from "path";
var PostClassifier = class {
  constructor(projectRoot) {
    this.projectRoot = projectRoot;
  }
  projectRoot;
  async adjust(classification, _preResult, resolutionMap) {
    const laneBeforeOverride = selectWorkflowAwareLane(classification);
    if (this.projectRoot) {
      await syncModuleHealth({
        projectRoot: this.projectRoot,
        source: "preflight",
        preflight: true,
        silent: true
      });
    }
    const healthProfiles = this.projectRoot ? await readAllModuleHealth(this.projectRoot) : [];
    const affected = new Set(classification.affected_modules);
    const relevantHealth = healthProfiles.filter((profile) => affected.has(profile.module));
    let laneOverrideReason = null;
    let complexity = classification.complexity;
    let risk = classification.risk;
    if (relevantHealth.some((profile) => profile.tier === "fragile")) {
      laneOverrideReason = "Affected modules include fragile health tiers.";
      risk = "high";
      resolutionMap.risk = "health-override";
    } else if (relevantHealth.length > 0 && relevantHealth.every((profile) => profile.tier === "stable") && classification.complexity === "trivial") {
      laneOverrideReason = "Stable modules allow the fast lane for trivial work.";
    }
    const defectFloor = await this.computeRiskFloor(classification);
    if (riskRank(defectFloor.risk_floor) > riskRank(risk)) {
      risk = defectFloor.risk_floor;
      resolutionMap.risk = "defect-floor";
    }
    const complexityAdjustment = await this.computeComplexityAdjustment(
      classification.affected_modules
    );
    if (complexityAdjustment.adjustment !== 0) {
      complexity = applyComplexityAdjustment(complexity, complexityAdjustment.adjustment);
      resolutionMap.complexity = "history-corrected";
    }
    const highOverrideRate = Object.values(resolutionMap).filter((source) => source === "llm-overridden").length / Math.max(Object.keys(resolutionMap).length, 1) > 0.3;
    await this.writeHistory(highOverrideRate);
    return {
      complexity,
      risk,
      lane_before_override: laneBeforeOverride,
      lane_override_reason: laneOverrideReason,
      risk_floor: defectFloor.risk_floor,
      risk_floor_reason: defectFloor.risk_floor_reason,
      complexity_adjustment: complexityAdjustment.adjustment,
      complexity_adjustment_reason: complexityAdjustment.reason,
      resolution_updates: {},
      high_override_rate: highOverrideRate
    };
  }
  async computeRiskFloor(classification) {
    const { frequency, matchCount } = await this.readDefectStats(classification.affected_modules);
    if (frequency > 10) {
      return {
        risk_floor: "high",
        risk_floor_reason: "Defect history exceeds 10 relevant recurrences."
      };
    }
    if (frequency > 5) {
      return {
        risk_floor: "medium",
        risk_floor_reason: "Defect history exceeds 5 relevant recurrences."
      };
    }
    if (matchCount > 3) {
      return {
        risk_floor: "medium",
        risk_floor_reason: "More than 3 open defect patterns tracked for affected modules."
      };
    }
    return { risk_floor: null, risk_floor_reason: null };
  }
  async readDefectStats(affectedModules) {
    try {
      const patterns = await queryPatterns({ min_frequency: 1, limit: 10 });
      const matching = patterns.filter(
        (entry) => entry.example_files.some(
          (file) => affectedModules.some((modulePath) => file.replace(/\\/g, "/").includes(modulePath))
        )
      );
      const frequency = matching.reduce((max, entry) => Math.max(max, entry.frequency), 0);
      return { frequency, matchCount: matching.length };
    } catch {
      return { frequency: 0, matchCount: 0 };
    }
  }
  async computeComplexityAdjustment(affectedModules) {
    if (!this.projectRoot) {
      return { adjustment: 0, reason: null };
    }
    const specsDir = join4(this.projectRoot, PATHS.PLANNING_MANIFESTS_DIR);
    try {
      const files = (await readdir4(specsDir)).filter(
        (file) => file.endsWith(".plan-vs-actual.json")
      );
      const records = [];
      for (const file of files) {
        try {
          const parsed = JSON.parse(await readFile5(join4(specsDir, file), "utf8"));
          const touchesAffected = affectedModules.length === 0 || (parsed.unplanned_files ?? []).some(
            (entry) => affectedModules.some((modulePath) => entry.includes(modulePath))
          );
          if (touchesAffected) {
            records.push(parsed);
          }
        } catch {
        }
      }
      if (records.length < 3) {
        return { adjustment: 0, reason: null };
      }
      const lowAccuracy = records.filter((entry) => (entry.scope_accuracy_pct ?? 100) < 67).length;
      const veryHighAccuracy = records.filter(
        (entry) => (entry.scope_accuracy_pct ?? 0) > 200
      ).length;
      if (lowAccuracy >= 3) {
        return { adjustment: 1, reason: "Plan-vs-actual history shows repeated under-scoping." };
      }
      if (veryHighAccuracy >= 3) {
        return { adjustment: -1, reason: "Plan-vs-actual history shows repeated over-estimation." };
      }
    } catch {
    }
    return { adjustment: 0, reason: null };
  }
  async writeHistory(highOverrideRate) {
    if (!this.projectRoot) {
      return;
    }
    const filePath = join4(this.projectRoot, PATHS.AGENCY_CACHE_DIR, "classification-history.json");
    let entries;
    try {
      entries = JSON.parse(await readFile5(filePath, "utf8"));
    } catch {
      entries = [];
    }
    entries.push({ timestamp: (/* @__PURE__ */ new Date()).toISOString(), high_override_rate: highOverrideRate });
    entries = entries.slice(-50);
    await mkdir5(join4(this.projectRoot, PATHS.AGENCY_CACHE_DIR), { recursive: true });
    await writeFile5(filePath, JSON.stringify(entries, null, 2) + "\n", "utf8");
  }
};
function applyComplexityAdjustment(complexity, adjustment) {
  const index = COMPLEXITY_LEVELS.indexOf(complexity);
  const next = Math.max(0, Math.min(COMPLEXITY_LEVELS.length - 1, index + adjustment));
  return COMPLEXITY_LEVELS[next];
}
function riskRank(risk) {
  if (risk === "high") {
    return 3;
  }
  if (risk === "medium") {
    return 2;
  }
  if (risk === "low") {
    return 1;
  }
  return 0;
}
function selectWorkflowAwareLane(classification) {
  if (classification.workflow === "project-question") {
    return "fast";
  }
  if (classification.workflow === "writing" || classification.workflow === "editing" || classification.workflow === "planning" || classification.workflow === "research") {
    return "fast";
  }
  if (classification.workflow === "investigation") {
    return "fast";
  }
  if (classification.workflow === "pentest" || classification.workflow === "pentest-retest") {
    return "graduated";
  }
  if (classification.workflow === "migration") {
    return "full";
  }
  if (classification.workflow === "bug-fix") {
    return classification.complexity === "low" && classification.risk === "low" ? "fast" : "graduated";
  }
  if (classification.workflow === "feature-development") {
    return classification.risk === "high" ? "full" : "graduated";
  }
  return selectLane(classification.complexity, classification.risk);
}

// src/pipeline/context-budget-estimator.ts
init_esm_shims();
function estimateContextBudgetHint(input) {
  if (input.scope === "system-wide" || input.workflow === "migration" || input.workflow === "architecture-change") {
    return "deep";
  }
  if (input.delta_candidate || input.scope === "multi-module") {
    return "standard";
  }
  return "minimal";
}

// src/pipeline/delta-detector.ts
init_esm_shims();
async function detectDeltaCandidate(root, affectedModules) {
  if (affectedModules.length === 0) {
    return emptyResult();
  }
  const slugs = await listManifestSlugs(root);
  let bestMatch = {
    ...emptyResult(),
    overlap: 0
  };
  for (const slug of slugs) {
    try {
      const manifest = await loadManifest(root, slug);
      const manifestModules = manifest.classification.affected_modules ?? [];
      if (manifestModules.length === 0) {
        continue;
      }
      const shared = affectedModules.filter((modulePath) => manifestModules.includes(modulePath));
      const overlap = shared.length / Math.max(affectedModules.length, manifestModules.length, 1);
      if (overlap >= 0.5 && overlap > bestMatch.overlap) {
        bestMatch = {
          delta_candidate: true,
          base_manifest_slug: slug,
          prior_requirement_count: manifest.requirement_graph.length,
          prior_criterion_count: manifest.verification_matrix.length,
          overlap
        };
      }
    } catch {
    }
  }
  return {
    delta_candidate: bestMatch.delta_candidate,
    base_manifest_slug: bestMatch.base_manifest_slug,
    prior_requirement_count: bestMatch.prior_requirement_count,
    prior_criterion_count: bestMatch.prior_criterion_count
  };
}
function emptyResult() {
  return {
    delta_candidate: false,
    base_manifest_slug: null,
    prior_requirement_count: null,
    prior_criterion_count: null
  };
}

// src/pipeline/impact-resolver.ts
init_esm_shims();
function resolveImpacts(input) {
  const request = input.requestText.toLowerCase();
  const paths = input.modulePaths.map((entry) => entry.toLowerCase());
  const databaseImpact = request.includes("data migration") ? "data-migration" : paths.some((entry) => entry.includes("migrations")) ? "schema-change" : request.includes("migration") || request.includes("schema") || request.includes("column") || request.includes("table") ? "schema-change" : request.includes("query") || request.includes("index") ? "query-change" : "none";
  const apiImpact = request.includes("breaking api") || request.includes("breaking endpoint") ? "breaking-change" : paths.some((entry) => entry.includes("/routes") || entry.includes("/api")) ? request.includes("breaking") || request.includes("modify") || request.includes("update") ? "modified-endpoint" : "additive-endpoint" : request.includes("api") || request.includes("endpoint") || request.includes("route") ? request.includes("modify") || request.includes("update") ? "modified-endpoint" : "additive-endpoint" : "none";
  const uiImpact = request.includes("redesign") ? "redesign" : paths.some((entry) => /pages|screens|views/.test(entry)) ? "new-screen" : paths.some((entry) => /components|widgets/.test(entry)) ? "new-component" : request.includes("screen") || request.includes("dashboard") || request.includes("page") ? "new-screen" : request.includes("component") || request.includes("button") || request.includes("form") ? "new-component" : "none";
  const complianceSensitivity = /(compliance|gdpr|hipaa|pci|soc2|privacy)/.test(request) ? "high" : "none";
  const customerFacingImpact = request.includes("customer") || uiImpact !== "none" ? "customer-visible" : "internal";
  const dataSensitivity = request.includes("pii") ? "pii" : request.includes("payment") ? "financial" : request.includes("health") ? "health" : "none";
  const reversibility = databaseImpact === "data-migration" || apiImpact === "breaking-change" ? "difficult" : "easily-reversible";
  const pathBased = paths.length > 0;
  const resolution_sources = {
    database_impact: pathBased && paths.some((p) => p.includes("migrations")) ? "deterministic" : "deterministic",
    api_impact: pathBased && paths.some((p) => p.includes("/routes") || p.includes("/api")) ? "deterministic" : "deterministic",
    ui_impact: pathBased && paths.some((p) => /pages|screens|views|components|widgets/.test(p)) ? "deterministic" : "deterministic",
    compliance_sensitivity: "deterministic",
    customer_facing_impact: "deterministic",
    reversibility: "deterministic",
    data_sensitivity: "deterministic"
  };
  return {
    database_impact: databaseImpact,
    api_impact: apiImpact,
    ui_impact: uiImpact,
    compliance_sensitivity: complianceSensitivity,
    customer_facing_impact: customerFacingImpact,
    reversibility,
    data_sensitivity: dataSensitivity,
    resolution_sources
  };
}

// src/pipeline/module-resolver.ts
init_esm_shims();
import { existsSync as existsSync2 } from "fs";
import { readdir as readdir5 } from "fs/promises";
import { basename, join as join5, relative as relative2 } from "path";
var PATH_REGEX = /\b(?:src|app|resources|database|routes|lib|tests|docs|packages)\/[A-Za-z0-9_./-]+\b/g;
var KNOWN_EXTENSIONS = /\.(tsx?|jsx?|vue|svelte|astro|php|dart|py|rb|go|rs|java|kt|cs|md|json|ya?ml)$/i;
var ModuleResolver = class {
  constructor(root, profile) {
    this.root = root;
    this.profile = profile;
  }
  root;
  profile;
  async resolve(requestText) {
    const explicit = await this.resolveExplicitPaths(requestText);
    if (explicit.length > 0) {
      return { modules: dedupeModules(explicit).slice(0, 8), source: "explicit-path" };
    }
    const symbols = await this.resolveSymbols(requestText);
    if (symbols.length > 0) {
      return { modules: dedupeModules(symbols).slice(0, 8), source: "symbol-index" };
    }
    const rag = await this.resolveRagMatches(requestText, explicit);
    if (rag.length > 0) {
      return { modules: dedupeModules(rag).slice(0, 8), source: "rag" };
    }
    const heuristics = this.resolveHeuristicModules(requestText);
    return {
      modules: dedupeModules(heuristics).slice(0, 8),
      source: heuristics.length > 0 ? "stack-heuristic" : "default"
    };
  }
  async resolveExplicitPaths(requestText) {
    const matches = requestText.match(PATH_REGEX) ?? [];
    const resolved = [];
    for (const match of matches) {
      const normalized = stripTrailingChars(match.replace(/\\/g, "/"), ".,:;!?");
      const absolute = join5(this.root, normalized);
      if (existsSync2(absolute)) {
        resolved.push({
          path: trimKnownExtension(normalized),
          source: "explicit-path",
          confidence: 1
        });
        continue;
      }
      const maybeResolved = await this.tryResolveByBasename(normalized);
      if (maybeResolved) {
        resolved.push(maybeResolved);
      }
    }
    return resolved;
  }
  async tryResolveByBasename(candidate) {
    const parent = join5(this.root, candidate.split("/").slice(0, -1).join("/"));
    const leaf = basename(candidate);
    try {
      const entries = await readdir5(parent);
      const match = entries.find((entry) => trimKnownExtension(entry) === trimKnownExtension(leaf));
      if (!match) {
        return null;
      }
      return {
        path: trimKnownExtension(join5(relative2(this.root, parent), match).replace(/\\/g, "/")),
        source: "explicit-path",
        confidence: 0.95
      };
    } catch {
      return null;
    }
  }
  async resolveSymbols(requestText) {
    const symbolTokens = Array.from(
      new Set(
        requestText.match(/\b[A-Z][A-Za-z0-9]+(?:Controller|Service|Model|Repository)\b/g) ?? []
      )
    );
    if (symbolTokens.length === 0) {
      return [];
    }
    const index = await new ChunkIndexManager(this.root).load();
    if (!index) {
      return [];
    }
    const matches = [];
    for (const entry of index.entries) {
      const exported = new Set(entry.chunks.flatMap((chunk) => chunk.exported_symbols));
      if (symbolTokens.some((token) => exported.has(token))) {
        matches.push({
          path: trimKnownExtension(relative2(this.root, entry.source_file).replace(/\\/g, "/")),
          source: "symbol-index",
          confidence: 0.9
        });
      }
    }
    return matches;
  }
  async resolveRagMatches(requestText, explicit) {
    if (!this.profile?.intelligence?.rag_enabled || explicit.length > 0) {
      return [];
    }
    try {
      const rag = new RagService(this.root);
      const result = await rag.retrieveForEval({
        keywords: requestText.split(/\s+/).slice(0, 8),
        taskDescription: requestText
      });
      return result.retrieved_chunks.slice(0, 5).map((chunk) => ({
        path: trimKnownExtension(relative2(this.root, chunk.source_file).replace(/\\/g, "/")),
        source: "rag",
        confidence: 0.7
      })).filter((entry) => entry.path !== "");
    } catch {
      return [];
    }
  }
  resolveHeuristicModules(requestText) {
    const request = requestText.toLowerCase();
    const framework = this.profile?.stack_profile?.frameworks?.[0] ?? "laravel";
    const results = [];
    if (/(migration|schema|table|column)/.test(request)) {
      results.push({ path: "database/migrations", source: "stack-heuristic", confidence: 0.7 });
    }
    if (/(api|endpoint|route|controller)/.test(request)) {
      for (const path2 of apiPrefixesForFramework(framework)) {
        results.push({ path: path2, source: "stack-heuristic", confidence: 0.7 });
      }
    }
    if (/(dashboard|page|screen|view)/.test(request)) {
      for (const path2 of screenPrefixesForFramework(framework)) {
        results.push({ path: path2, source: "stack-heuristic", confidence: 0.7 });
      }
    }
    if (/(component|button|form|widget)/.test(request)) {
      for (const path2 of componentPrefixesForFramework(framework)) {
        results.push({ path: path2, source: "stack-heuristic", confidence: 0.7 });
      }
    }
    return results;
  }
};
function dedupeModules(modules) {
  const byPath = /* @__PURE__ */ new Map();
  for (const entry of modules) {
    const current = byPath.get(entry.path);
    if (!current || entry.confidence > current.confidence) {
      byPath.set(entry.path, entry);
    }
  }
  return Array.from(byPath.values());
}
function trimKnownExtension(filePath) {
  return stripTrailingChars(filePath.replace(KNOWN_EXTENSIONS, ""), "/");
}
function apiPrefixesForFramework(framework) {
  switch (framework) {
    case "laravel":
      return ["app/Http/Controllers", "routes"];
    case "flutter":
      return ["lib/services"];
    default:
      return ["src/api", "src/server"];
  }
}
function screenPrefixesForFramework(framework) {
  switch (framework) {
    case "laravel":
      return ["resources/views", "resources/js/pages"];
    case "flutter":
      return ["lib/screens"];
    default:
      return ["src/pages", "src/screens"];
  }
}
function componentPrefixesForFramework(framework) {
  switch (framework) {
    case "laravel":
      return ["resources/js/components", "app/View/Components"];
    case "flutter":
      return ["lib/widgets"];
    default:
      return ["src/components"];
  }
}

// src/pipeline/scope-resolver.ts
init_esm_shims();
import { readFile as readFile6 } from "fs/promises";
import { join as join6, relative as relative3 } from "path";
var SCOPE_TIMEOUT_MS = 200;
var CORE_MODULE_PATTERN = /\b(?:src|lib)\/(?:core|shared|types|utils|common)\b/;
async function resolveScope(root, modulePaths) {
  if (modulePaths.length === 0) {
    return { scope: "single-module", scope_graph_depth: 0 };
  }
  if (modulePaths.length === 1) {
    return { scope: "single-file", scope_graph_depth: 0 };
  }
  if (modulePaths.some((path2) => CORE_MODULE_PATTERN.test(path2))) {
    return { scope: "system-wide", scope_graph_depth: 3 };
  }
  const ownRoots = new Set(modulePaths.map(topLevelModuleRoot));
  if (ownRoots.size === 1) {
    return { scope: "single-module", scope_graph_depth: 0 };
  }
  const externalRoots = await withTimeout(
    scanExternalImportRoots(root, modulePaths, ownRoots),
    SCOPE_TIMEOUT_MS,
    /* @__PURE__ */ new Set()
  );
  const totalRoots = /* @__PURE__ */ new Set([...ownRoots, ...externalRoots]);
  const depth = Math.min(externalRoots.size, 3);
  const scope = totalRoots.size >= 4 ? "system-wide" : "multi-module";
  return { scope, scope_graph_depth: depth };
}
async function scanExternalImportRoots(root, modulePaths, ownRoots) {
  const external = /* @__PURE__ */ new Set();
  await Promise.all(
    modulePaths.slice(0, 8).map(async (modulePath) => {
      try {
        const content = await readFile6(join6(root, modulePath), "utf8");
        const matches = Array.from(
          content.matchAll(
            /(?:import|export).+?from\s+['"]([^'"]+)['"]|require\(['"]([^'"]+)['"]\)/g
          )
        );
        for (const match of matches) {
          const importPath = (match[1] ?? match[2]).trim();
          if (!importPath.startsWith(".") && !importPath.startsWith("@/")) {
            continue;
          }
          const resolved = importPath.startsWith("@/") ? "src/" + importPath.slice(2) : importPath;
          const importRoot = topLevelModuleRoot(resolved);
          if (!ownRoots.has(importRoot)) {
            external.add(importRoot);
          }
        }
      } catch {
      }
    })
  );
  return external;
}
function topLevelModuleRoot(modulePath) {
  const normalized = modulePath.replace(/\\/g, "/").replace(/^\.\//, "");
  const parts = normalized.split("/");
  return parts.slice(0, 2).join("/");
}
async function withTimeout(promise, ms, fallback) {
  let timer;
  try {
    return await Promise.race([
      promise,
      new Promise((resolve) => {
        timer = setTimeout(() => resolve(fallback), ms);
      })
    ]);
  } finally {
    if (timer) {
      clearTimeout(timer);
    }
  }
}
function toProjectRelativeModule(root, filePath) {
  return relative3(root, filePath).replace(/\\/g, "/");
}

// src/pipeline/pre-classifier.ts
init_esm_shims();
var WORKFLOW_PATTERNS = [
  { workflow: "pentest-retest", priority: 250, patterns: ["pentest retest", "pentest-retest"] },
  {
    workflow: "pentest",
    priority: 240,
    patterns: [
      "pentest",
      "pen test",
      "penetration test",
      "security audit",
      "security review",
      "security test",
      "security scan",
      "vulnerability scan",
      "for vulnerabilities"
    ]
  },
  {
    workflow: "design-retest",
    priority: 239,
    patterns: ["design retest", "retest the design"]
  },
  {
    workflow: "design-test",
    priority: 238,
    patterns: [
      "design test",
      "design audit",
      "design system audit",
      "audit the ui",
      "audit our ui",
      "ui audit",
      "against the design system"
    ]
  },
  {
    workflow: "health-retest",
    priority: 245,
    patterns: ["health retest", "health-retest", "codebase health retest"]
  },
  {
    workflow: "codebase-health",
    priority: 235,
    patterns: [
      "codebase health",
      "code health",
      "health check",
      "health check-up",
      "health audit",
      "project's health",
      "project health",
      "audit my codebase",
      "audit the codebase",
      "find dead code",
      "check for unused",
      "cleanup audit"
    ]
  },
  {
    workflow: "site-map-retest",
    priority: 233,
    patterns: ["site map retest", "site-map retest", "retest the site map", "retest site map"]
  },
  {
    workflow: "site-map",
    priority: 232,
    patterns: [
      "site map",
      "create sitemap",
      "update sitemap",
      "generate sitemap",
      "journey map",
      "map the app",
      "map this app",
      "map our app",
      "map the surfaces",
      "navigation and journeys"
    ]
  },
  {
    workflow: "rules-generate",
    priority: 229,
    patterns: ["rules generate", "generate rule scripts", "generate the rule scripts"]
  },
  {
    workflow: "rules-analyze",
    priority: 228,
    patterns: [
      "rules analyze",
      "rules analyse",
      "analyze the rules",
      "analyse the rules",
      "analyze our rules",
      "analyse our rules",
      "rules can become scripts",
      "rules could become scripts",
      "rules into scripts"
    ]
  },
  { workflow: "root-cause-analysis", priority: 230, patterns: ["root cause", "rca"] },
  {
    workflow: "module-documentation",
    priority: 225,
    patterns: ["module documentation", "module docs", "per module docs"]
  },
  {
    workflow: "documentation-update",
    priority: 200,
    patterns: ["documentation", "docs", "documenation"]
  },
  {
    workflow: "discovery",
    priority: 190,
    patterns: [
      "rough idea",
      "half baked idea",
      "help me shape",
      "shape this idea",
      "shape the idea",
      "shape an idea",
      "shape my idea",
      "not sure what it should look like"
    ]
  },
  { workflow: "research", priority: 180, patterns: ["research", "investigate"] }
];
var CODE_CHANGE_PATTERNS = [
  { workflow: "cleanup", priority: 170, patterns: ["cleanup", "clean up"] },
  {
    workflow: "refactor",
    priority: 150,
    patterns: ["refactor", "refactors", "refactoring", "refactored"]
  },
  {
    workflow: "bug-fix",
    priority: 160,
    patterns: ["fix", "fixes", "fixing", "fixed", "bug", "bugs"]
  },
  {
    workflow: "feature-development",
    priority: 140,
    patterns: [
      "implement",
      "implements",
      "implementing",
      "implemented",
      "build",
      "builds",
      "building",
      "built",
      "add",
      "adds",
      "adding",
      "added",
      "feature",
      "features",
      "develop",
      "develops",
      "developing",
      "developed"
    ]
  }
];
var PreClassifier = class {
  constructor(projectRoot = process.cwd()) {
    this.projectRoot = projectRoot;
  }
  projectRoot;
  async classify(input) {
    const resolutionMap = {};
    const unresolved = /* @__PURE__ */ new Set();
    const evidence = [];
    const detectedForks = detectDecisionForks(input.request);
    const workflow = resolveWorkflow(input.request, input.resolved_workflow?.workflow ?? null);
    if (workflow !== void 0) {
      resolutionMap.workflow = "deterministic";
      evidence.push(`workflow:${workflow}`);
    } else {
      unresolved.add("workflow");
    }
    const moduleResolver = new ModuleResolver(this.projectRoot, input.profile);
    const modulesPromise = moduleResolver.resolve(input.request);
    const result = await withTimeout2(
      (async () => {
        const modules = await modulesPromise;
        const modulePaths = modules.modules.map((entry) => entry.path);
        if (modulePaths.length > 0) {
          resolutionMap.affected_modules = modules.source === "rag" ? "deterministic:rag" : "deterministic";
          evidence.push(`modules:${modules.source}`);
        } else {
          unresolved.add("affected_modules");
        }
        const [scope, impacts, delta, ruleTriggers] = await Promise.all([
          resolveScope(this.projectRoot, modulePaths).catch(() => {
            unresolved.add("scope");
            return { scope: "single-module", scope_graph_depth: 0 };
          }),
          Promise.resolve(resolveImpacts({ requestText: input.request, modulePaths })),
          detectDeltaCandidate(this.projectRoot, modulePaths).catch(() => {
            unresolved.add("delta_candidate");
            return {
              delta_candidate: false,
              base_manifest_slug: null,
              prior_requirement_count: null,
              prior_criterion_count: null
            };
          }),
          matchRuleTriggers(this.projectRoot, modulePaths).catch(() => {
            unresolved.add("matched_rule_triggers");
            return [];
          })
        ]);
        resolutionMap.scope = unresolved.has("scope") ? "default" : "deterministic:graph";
        resolutionMap.database_impact = impacts.resolution_sources.database_impact;
        resolutionMap.api_impact = impacts.resolution_sources.api_impact;
        resolutionMap.ui_impact = impacts.resolution_sources.ui_impact;
        resolutionMap.compliance_sensitivity = impacts.resolution_sources.compliance_sensitivity;
        resolutionMap.customer_facing_impact = impacts.resolution_sources.customer_facing_impact;
        resolutionMap.reversibility = impacts.resolution_sources.reversibility;
        resolutionMap.data_sensitivity = impacts.resolution_sources.data_sensitivity;
        resolutionMap.delta_candidate = delta.delta_candidate ? "deterministic:manifest" : "default";
        resolutionMap.context_budget_hint = "deterministic";
        resolutionMap.matched_rule_triggers = ruleTriggers.length > 0 ? "deterministic" : "default";
        const normalizedScope = modules.source === "stack-heuristic" && scope.scope === "single-file" ? "single-module" : scope.scope;
        const contextBudgetHint = estimateContextBudgetHint({
          scope: normalizedScope,
          delta_candidate: delta.delta_candidate,
          workflow: workflow ?? null
        });
        return {
          resolved: {
            workflow: workflow ?? void 0,
            affected_modules: modulePaths,
            affected_modules_source: modules.source,
            scope: normalizedScope,
            scope_graph_depth: scope.scope_graph_depth,
            database_impact: impacts.database_impact,
            api_impact: impacts.api_impact,
            ui_impact: impacts.ui_impact,
            compliance_sensitivity: impacts.compliance_sensitivity,
            customer_facing_impact: impacts.customer_facing_impact,
            reversibility: impacts.reversibility,
            data_sensitivity: impacts.data_sensitivity,
            delta_candidate: delta.delta_candidate,
            base_manifest_slug: delta.base_manifest_slug,
            prior_requirement_count: delta.prior_requirement_count,
            prior_criterion_count: delta.prior_criterion_count,
            context_budget_hint: contextBudgetHint,
            matched_rule_triggers: ruleTriggers,
            decision_category: detectedForks[0]?.category
          },
          hints: {},
          unresolved: Array.from(unresolved),
          resolution_map: resolutionMap,
          evidence: [
            ...evidence,
            ...detectedForks.map((fork) => `decision-fork:${fork.category}:${fork.signal}`)
          ],
          detected_forks: detectedForks
        };
      })(),
      300,
      {
        resolved: {
          workflow: workflow ?? void 0,
          affected_modules: [],
          affected_modules_source: "default",
          scope: "single-module",
          scope_graph_depth: 0,
          database_impact: "none",
          api_impact: "none",
          ui_impact: "none",
          compliance_sensitivity: "none",
          customer_facing_impact: "internal",
          reversibility: "easily-reversible",
          data_sensitivity: "none",
          delta_candidate: false,
          base_manifest_slug: null,
          prior_requirement_count: null,
          prior_criterion_count: null,
          context_budget_hint: "minimal",
          matched_rule_triggers: [],
          decision_category: detectedForks[0]?.category
        },
        hints: {},
        unresolved: [
          "affected_modules",
          "scope",
          "delta_candidate",
          "database_impact",
          "api_impact",
          "ui_impact",
          "matched_rule_triggers"
        ],
        resolution_map: resolutionMap,
        evidence: [
          ...evidence,
          ...detectedForks.map((fork) => `decision-fork:${fork.category}:${fork.signal}`),
          "timeout"
        ],
        detected_forks: detectedForks
      }
    );
    return result;
  }
};
function resolveWorkflow(requestText, routedWorkflow) {
  if (routedWorkflow !== void 0 && routedWorkflow !== null) {
    return routedWorkflow;
  }
  const normalized = normalizeText(requestText);
  const named = highestMatch(
    WORKFLOW_PATTERNS,
    (pattern) => normalized.includes(normalizeText(pattern))
  );
  if (named) {
    return named;
  }
  if (isQuestionRoute(requestText) || hasCodeNegation(normalized) || isCreateArtifactAsk(normalized) || isAboutWorkPrompt(requestText)) {
    return "project-question";
  }
  const codeWords = codeWordText(requestText);
  const codeChange = highestMatch(
    CODE_CHANGE_PATTERNS,
    (pattern) => matchesWholeWord(codeWords, pattern)
  );
  if (codeChange) {
    return codeChange;
  }
  if (namesSourcePath(requestText) && usesPathEditVerb(normalized)) {
    return "feature-development";
  }
  if (hasTrackerVerb(normalized) && !namesCode(requestText)) {
    return "project-question";
  }
  return void 0;
}
function highestMatch(table, matches) {
  return table.flatMap(
    (entry) => entry.patterns.filter(matches).map((pattern) => ({ workflow: entry.workflow, priority: entry.priority, pattern }))
  ).sort((left, right) => right.priority - left.priority)[0]?.workflow;
}
function matchesWholeWord(normalized, pattern) {
  return ` ${normalized} `.includes(` ${normalizeText(pattern)} `);
}
var QUESTION_ANYWHERE_LEADS = /* @__PURE__ */ new Set([
  "how",
  "where",
  "what",
  "whats",
  "why",
  "which",
  "explain",
  "example"
]);
var CODE_VERBS = /* @__PURE__ */ new Set([
  "fix",
  "fixes",
  "fixing",
  "fixed",
  "add",
  "adds",
  "adding",
  "added",
  "implement",
  "implements",
  "implementing",
  "implemented",
  "build",
  "builds",
  "building",
  "built",
  "refactor",
  "refactors",
  "refactoring",
  "refactored",
  "change",
  "changes",
  "changing",
  "changed",
  "update",
  "updates",
  "updating",
  "updated",
  "remove",
  "removes",
  "removing",
  "removed",
  "rename",
  "renames",
  "renaming",
  "renamed",
  "migrate",
  "migrates",
  "migrating",
  "migrated"
]);
var PATH_EDIT_VERBS = /* @__PURE__ */ new Set([
  ...CODE_VERBS,
  "make",
  "makes",
  "making",
  "replace",
  "replaces",
  "replacing",
  "move",
  "moves",
  "moving",
  "extract",
  "extracts",
  "extracting",
  "convert",
  "converts",
  "converting",
  "delete",
  "deletes",
  "deleting",
  "rewrite",
  "rewrites",
  "rewriting"
]);
function usesPathEditVerb(normalized) {
  return tokensOf(normalized).some((token) => PATH_EDIT_VERBS.has(token));
}
var POLITE_LEAD_INS = ["can you", "could you", "would you", "please", "let s"];
function isQuestionRoute(requestText) {
  const normalized = normalizeText(requestText);
  const tokens = normalized.length > 0 ? normalized.split(" ") : [];
  const interrogative = tokens.some((token) => QUESTION_ANYWHERE_LEADS.has(token)) || normalized.startsWith("in short") || normalized.includes("show me") || /\?\s*$/.test(requestText);
  return interrogative && !isPoliteCodeRequest(normalized);
}
function isPoliteCodeRequest(normalized) {
  const tokens = normalized.length > 0 ? normalized.split(" ") : [];
  if (tokens[0] && CODE_VERBS.has(tokens[0])) {
    return true;
  }
  return POLITE_LEAD_INS.some((lead) => {
    const next = normalized.split(`${lead} `)[1]?.split(" ")[0];
    return next !== void 0 && CODE_VERBS.has(next);
  });
}
var CODE_NEGATIONS = [
  "no code changes",
  "no code change",
  "no code",
  "do not code",
  "dont code",
  "without changing",
  "not to code"
];
function hasCodeNegation(normalized) {
  return CODE_NEGATIONS.some((phrase) => normalized.includes(normalizeText(phrase)));
}
var CREATE_VERBS = ["create", "file", "open", "write", "draft"];
var ARTIFACT_NOUNS = ["issue", "ticket", "bug report", "write up"];
var LEADING_CODE_VERBS = /* @__PURE__ */ new Set([
  "fix",
  "fixes",
  "implement",
  "implements",
  "build",
  "builds",
  "refactor",
  "refactors",
  "add",
  "adds"
]);
function isCreateArtifactAsk(normalized) {
  if (LEADING_CODE_VERBS.has(tokensOf(normalized)[0] ?? "")) {
    return false;
  }
  const hasCreateVerb = CREATE_VERBS.some((verb) => matchesWholeWord(normalized, verb));
  const hasArtifactNoun = ARTIFACT_NOUNS.some((noun) => normalized.includes(normalizeText(noun)));
  if (!hasCreateVerb || !hasArtifactNoun) {
    return false;
  }
  const alsoImplements = /\b(implement|and (?:fix|add|build|change|update))\b/.test(normalized);
  return !alsoImplements;
}
var TRACKER_NOUNS = /* @__PURE__ */ new Set(["issue", "issues", "ticket", "tickets", "pr", "prs"]);
var TRACKER_NOUN_PHRASES = ["pull request", "pull requests"];
var NOUN_OR_VERB_TRACKER_WORDS = /* @__PURE__ */ new Set(["draft", "drafts", "drafted", "rewrite", "rewrites"]);
var SOFT_WORK_NOUNS = /* @__PURE__ */ new Set(["report", "reports", "research", "plan", "plans", "doc", "docs"]);
var TRACKER_TARGETS = /* @__PURE__ */ new Set(["github", "jira", "linear"]);
var TRACKER_VERBS = /* @__PURE__ */ new Set([
  "post",
  "posts",
  "posted",
  "posting",
  "repost",
  "file",
  "files",
  "filed",
  "filing",
  "link",
  "links",
  "linked",
  "linking",
  "recheck",
  "rechecks",
  "rechecked",
  "rechecking",
  "confirm",
  "confirms",
  "confirmed",
  "confirming",
  "reconfirm",
  "reconfirms",
  "reconfirmed",
  "reconfirming"
]);
var GENERAL_WORK_VERBS = /* @__PURE__ */ new Set([
  "draft",
  "drafts",
  "drafted",
  "drafting",
  "update",
  "updates",
  "updated",
  "updating",
  "rewrite",
  "rewrites",
  "rewrote",
  "rewritten",
  "rewriting",
  "check",
  "checks",
  "checked",
  "checking"
]);
var VERB_LEADS = /* @__PURE__ */ new Set([
  "please",
  "pls",
  "and",
  "then",
  "or",
  "to",
  "can",
  "could",
  "would",
  "will",
  "should",
  "also",
  "just",
  "now",
  "let",
  "s",
  "ll",
  "you",
  "i",
  "we",
  "yes",
  "yeah",
  "yep",
  "ok",
  "okay",
  "sure",
  "great",
  "perfect",
  "alright",
  "thanks"
]);
var ADD_TO_RE = new RegExp(
  String.raw`\b(?:add|adds|added|adding)\b.*\bto (?:(?:the|this|that|a|an|my|our|your) )?(?:` + [...TRACKER_NOUN_PHRASES, ...TRACKER_NOUNS, ...NOUN_OR_VERB_TRACKER_WORDS].join("|") + String.raw`)\b`
);
var CODE_SURFACE_NOUNS = /* @__PURE__ */ new Set([
  "page",
  "pages",
  "screen",
  "button",
  "component",
  "endpoint",
  "api",
  "function",
  "method",
  "class",
  "field",
  "column",
  "form",
  "modal",
  "footer",
  "header",
  "navbar",
  "sidebar",
  "route",
  "query",
  "schema",
  "test",
  "tests",
  "bug",
  "error",
  "crash",
  "feature",
  "export",
  "import",
  "selector",
  "renders",
  "mobile",
  "desktop",
  "css",
  "layout"
]);
var LABEL_PAIR_RE = /\blabel(?:s|ed|led)? [a-z0-9]+/g;
var STRONG_CODE_VERB_RE = /\b(?:fix|fixes|fixing|fixed|implement|implements|implementing|implemented|build|builds|building|built|refactor|refactors|refactoring|refactored|develop|develops|developing|developed)\b/;
var SOURCE_PATH_RE = /\b(?:src|lib|app|runtime|tests)\/|\.(?:ts|tsx|js|jsx|mjs|cjs|py|php|rb|go|rs|java|kt|swift|cs|vue|svelte|dart)\b/i;
function namesSourcePath(requestText) {
  return SOURCE_PATH_RE.test(requestText);
}
function namesCode(requestText) {
  const codeWords = codeWordText(requestText);
  if (namesSourcePath(requestText) || STRONG_CODE_VERB_RE.test(codeWords)) {
    return true;
  }
  const withoutLabels = codeWords.replace(LABEL_PAIR_RE, " ").trim();
  return withoutLabels.split(/\s+/).some((token) => CODE_SURFACE_NOUNS.has(token));
}
function tokensOf(normalized) {
  return normalized.length > 0 ? normalized.split(" ") : [];
}
function inVerbPosition(tokens, index) {
  return index === 0 || VERB_LEADS.has(String(tokens[index - 1]));
}
function usesVerbFrom(tokens, verbs) {
  return tokens.some((token, index) => verbs.has(token) && inVerbPosition(tokens, index));
}
function hasTrackerVerb(normalized) {
  return usesVerbFrom(tokensOf(normalized), TRACKER_VERBS) || ADD_TO_RE.test(normalized);
}
function hasTrackerNoun(normalized) {
  const tokens = tokensOf(normalized);
  return tokens.some(
    (token, index) => TRACKER_NOUNS.has(token) || NOUN_OR_VERB_TRACKER_WORDS.has(token) && !inVerbPosition(tokens, index)
  ) || TRACKER_NOUN_PHRASES.some((phrase) => matchesWholeWord(normalized, phrase));
}
function isAboutWorkPrompt(requestText) {
  const normalized = normalizeText(requestText);
  if (namesCode(requestText)) {
    return false;
  }
  const tokens = tokensOf(normalized);
  const trackerNoun = hasTrackerNoun(normalized);
  const target = tokens.some((token) => TRACKER_TARGETS.has(token));
  const codeWords = codeWordText(requestText);
  const codeKeyword = CODE_CHANGE_PATTERNS.some(
    (entry) => entry.patterns.some((pattern) => matchesWholeWord(codeWords, pattern))
  );
  if (codeKeyword && !trackerNoun && !target) {
    return false;
  }
  const trackerVerb = hasTrackerVerb(normalized);
  const workVerb = trackerVerb || usesVerbFrom(tokens, GENERAL_WORK_VERBS);
  if (trackerNoun) {
    return workVerb;
  }
  const softNoun = tokens.some((token) => SOFT_WORK_NOUNS.has(token));
  return softNoun && (trackerVerb || target && workVerb);
}
function codeWordText(requestText) {
  return normalizeText(requestText.toLowerCase().replace(/\b[a-z0-9]+(?:-[a-z0-9]+)+\b/g, " "));
}
function normalizeText(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
}
async function withTimeout2(promise, ms, fallback) {
  let timer;
  try {
    return await Promise.race([
      promise,
      new Promise((resolve) => {
        timer = setTimeout(() => resolve(fallback), ms);
      })
    ]);
  } finally {
    if (timer) {
      clearTimeout(timer);
    }
  }
}

// src/pipeline/llm-skip-evaluator.ts
init_esm_shims();
var FAST_LANE_WORKFLOWS = /* @__PURE__ */ new Set([
  "bug-fix",
  "cleanup",
  "documentation-update",
  "editing",
  "investigation",
  "planning",
  "project-question",
  "research",
  "test-improvement",
  "writing"
]);
function shouldSkipLlm(preResult, confidence, requestText, resolutionMap) {
  const normalized = requestText.toLowerCase();
  if (normalized.includes("?") || normalized.includes("maybe") || normalized.includes("possibly")) {
    return false;
  }
  const workflow = preResult.resolved.workflow ?? null;
  const modulesSource = preResult.resolved.affected_modules_source ?? "";
  const scopeSource = resolutionMap.scope;
  const impactsResolved = resolutionMap.database_impact !== void 0 && resolutionMap.api_impact !== void 0 && resolutionMap.ui_impact !== void 0;
  const ruleTriggers = preResult.resolved.matched_rule_triggers ?? [];
  const sensitiveTriggers = ruleTriggers.some(
    (trigger) => /(security|auth|compliance|privacy|payment|gdpr|secret)/i.test(trigger)
  );
  return confidence >= 0.85 && resolutionMap.workflow === "deterministic" && /explicit-path|symbol-index/.test(modulesSource) && scopeSource === "deterministic:graph" && impactsResolved && workflow !== null && FAST_LANE_WORKFLOWS.has(workflow) && !sensitiveTriggers && preResult.resolved.delta_candidate !== true;
}

// src/pipeline/classifier.ts
init_esm_shims();

// src/session/active-implementation.ts
init_esm_shims();
import { existsSync as existsSync3 } from "fs";
import { mkdir as mkdir6, readFile as readFile7, writeFile as writeFile6 } from "fs/promises";
import { dirname as dirname4, join as join7 } from "path";
var CONTINUITY_DOWNGRADE_WORKFLOWS = /* @__PURE__ */ new Set([
  "project-question",
  "research",
  "writing",
  "editing",
  "planning",
  "content-update",
  "documentation-update",
  "ticket-refinement"
]);
var EXPLICIT_EXPLANATION_ONLY_PATTERNS = [
  /\b(?:explain|clarify|describe)\b.*\b(?:only|just)\b/i,
  /\b(?:only|just)\b.*\b(?:explain|clarify|describe)\b/i,
  /\bwalk me through\b.*\b(?:only|just)\b/i,
  /\b(?:no|without)\s+(?:code\s+changes?|implementation|edits?)\b/i,
  /\bdo not\s+(?:change|edit|implement|modify)\b/i
];
async function readActiveImplementationSession(projectRoot) {
  const target = join7(projectRoot, PATHS.ACTIVE_IMPLEMENTATION_SESSION);
  if (!existsSync3(target)) {
    return null;
  }
  try {
    const raw = await readFile7(target, "utf8");
    const parsed = JSON.parse(raw);
    if (!isActiveImplementationSessionArtifact(parsed)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
function applyActiveImplementationSession(requestText, classification, session, resolutionMap) {
  const continuityCandidate = classification.workflow !== null && CONTINUITY_DOWNGRADE_WORKFLOWS.has(classification.workflow);
  const explicitExplanationOnly = isExplicitExplanationOnlyIntent(requestText);
  if (session === null || !session.active || session.workflow === null || classification.workflow === null || !continuityCandidate || explicitExplanationOnly) {
    return {
      resumed: false,
      classification: {
        ...classification,
        resumed_from_session: false,
        resume_lane: null,
        workflow_continuity_reason: session !== null && session.active && session.workflow !== null && continuityCandidate && explicitExplanationOnly ? `Allowed transition from active implementation workflow "${session.workflow}" to "${classification.workflow}" because the follow-up explicitly requested explanation-only guidance.` : null
      }
    };
  }
  if (resolutionMap) {
    Object.assign(resolutionMap, {
      workflow: "session-resume",
      ...session.scope ? { scope: "session-resume" } : {},
      ...session.affected_modules.length > 0 ? { affected_modules: "session-resume" } : {}
    });
  }
  return {
    resumed: true,
    classification: {
      ...classification,
      workflow: session.workflow,
      workflow_source: "active-session",
      workflow_reason: `Resumed active implementation workflow "${session.workflow}" because verification or documentation work is still unresolved.`,
      scope: session.scope ?? classification.scope,
      affected_modules: session.affected_modules.length > 0 ? [...session.affected_modules] : classification.affected_modules,
      resumed_from_session: true,
      resume_lane: session.lane,
      workflow_continuity_reason: "Active implementation session remained open, so the follow-up stayed on the implementation lane."
    }
  };
}
function isExplicitExplanationOnlyIntent(requestText) {
  const trimmed = requestText.trim();
  return EXPLICIT_EXPLANATION_ONLY_PATTERNS.some((pattern) => pattern.test(trimmed));
}
function isActiveImplementationSessionArtifact(value) {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const candidate = value;
  return candidate.version === 1 && typeof candidate.updated_at === "string" && typeof candidate.active === "boolean" && Array.isArray(candidate.changed_files) && Array.isArray(candidate.affected_modules) && Array.isArray(candidate.unresolved_items);
}

// src/pipeline/classifier.ts
var RequestClassifier = class {
  projectRoot;
  constructor(options = {}) {
    this.projectRoot = options.projectRoot;
  }
  async classify(input) {
    const requestText = input.request.trim();
    const preResult = await new PreClassifier(this.projectRoot).classify({
      request: requestText,
      profile: input.profile,
      resolved_workflow: input.resolved_workflow
    });
    const resolutionMap = { ...preResult.resolution_map };
    const baseConfidence = computeClassificationConfidence(resolutionMap);
    const deterministicOnly = shouldSkipLlm(preResult, baseConfidence, requestText, resolutionMap);
    const initialClassification = deterministicOnly ? buildFromPreResult(input, preResult, resolutionMap) : runReducedScopeClassification(input, preResult, resolutionMap);
    const activeSession = this.projectRoot ? await readActiveImplementationSession(this.projectRoot) : null;
    const resumed = applyActiveImplementationSession(
      requestText,
      initialClassification,
      activeSession,
      resolutionMap
    );
    const baseClassification = resumed.classification;
    const enrichedConfidence = computeClassificationConfidence(resolutionMap);
    const adjustments = await new PostClassifier(this.projectRoot).adjust(
      baseClassification,
      preResult,
      resolutionMap
    );
    const analyticsTag = this.resolveAnalyticsTag(baseClassification.workflow);
    return {
      ...baseClassification,
      ...analyticsTag ? { analytics_tag: analyticsTag } : {},
      complexity: adjustments.complexity,
      risk: adjustments.risk,
      classification_confidence: enrichedConfidence,
      resolution_map: resolutionMap,
      lane_before_override: adjustments.lane_before_override,
      lane_override_reason: adjustments.lane_override_reason,
      risk_floor: adjustments.risk_floor,
      risk_floor_reason: adjustments.risk_floor_reason,
      complexity_adjustment: adjustments.complexity_adjustment,
      complexity_adjustment_reason: adjustments.complexity_adjustment_reason,
      delta_candidate: preResult.resolved.delta_candidate,
      base_manifest_slug: preResult.resolved.base_manifest_slug,
      prior_requirement_count: preResult.resolved.prior_requirement_count,
      prior_criterion_count: preResult.resolved.prior_criterion_count,
      context_budget_hint: preResult.resolved.context_budget_hint,
      affected_modules_source: preResult.resolved.affected_modules_source,
      scope_graph_depth: preResult.resolved.scope_graph_depth,
      matched_rule_triggers: preResult.resolved.matched_rule_triggers,
      resumed_from_session: baseClassification.resumed_from_session,
      resume_lane: baseClassification.resume_lane,
      workflow_continuity_reason: baseClassification.workflow_continuity_reason
    };
  }
  resolveAnalyticsTag(workflow) {
    if (!this.projectRoot) {
      return void 0;
    }
    try {
      const flagEnabled = resolveFrameworkConfig(this.projectRoot).features.analytics_instrumentation;
      if (!flagEnabled) {
        return void 0;
      }
      return resolveAnalyticsGate({
        projectRoot: this.projectRoot,
        flagEnabled: true,
        changeIsFeatureShaped: workflow === "feature-development"
      }).status;
    } catch {
      return void 0;
    }
  }
};
function buildFromPreResult(input, preResult, resolutionMap) {
  const requestText = input.request.trim();
  const request = requestText.toLowerCase();
  const workflow = preResult.resolved.workflow ?? input.resolved_workflow?.workflow ?? null;
  const targetCapability = inferTargetCapability(request, workflow);
  const domain = inferDomain(targetCapability, input.profile);
  const stack = input.profile !== void 0 ? getPrimaryStack(input.profile) : inferStack(targetCapability);
  const databaseImpact = preResult.resolved.database_impact ?? inferDatabaseImpact(request);
  const apiImpact = preResult.resolved.api_impact ?? inferApiImpact(request);
  const uiImpact = preResult.resolved.ui_impact ?? inferUiImpact(request);
  const trivialSingleFile = inferTrivialSingleFile(requestText);
  const complexity = inferComplexity(
    request,
    workflow,
    databaseImpact,
    apiImpact,
    uiImpact,
    trivialSingleFile
  );
  const risk = inferRisk(workflow, complexity, databaseImpact, apiImpact);
  const scope = preResult.resolved.scope ?? inferScope(workflow, complexity, trivialSingleFile);
  const capabilityGap = inferCapabilityGap(targetCapability, input.profile);
  resolutionMap.complexity ??= "default";
  resolutionMap.risk ??= "default";
  resolutionMap.certainty ??= "default";
  resolutionMap.output_type ??= "default";
  return {
    request_text: requestText,
    domain,
    stack,
    target_capability: targetCapability,
    capability_gap: capabilityGap,
    workflow,
    custom_workflow_name: input.resolved_workflow?.custom_workflow_name ?? null,
    workflow_source: input.resolved_workflow?.workflow_source ?? "none",
    workflow_reason: input.resolved_workflow?.workflow_reason ?? null,
    matched_rule: input.resolved_workflow?.matched_rule ?? null,
    complexity,
    risk,
    scope,
    affected_modules: preResult.resolved.affected_modules && preResult.resolved.affected_modules.length > 0 ? preResult.resolved.affected_modules : inferModules(requestText, stack),
    process_depth: complexity === "high" || complexity === "very-high" ? "full lane" : complexity === "medium" ? "graduated lane" : "fast lane",
    certainty: request.includes("?") ? "partially-defined" : "well-defined",
    output_type: inferOutputType(workflow),
    database_impact: databaseImpact,
    ui_impact: uiImpact,
    api_impact: apiImpact,
    compliance_sensitivity: preResult.resolved.compliance_sensitivity ?? (request.includes("compliance") || request.includes("gdpr") ? "high" : "none"),
    customer_facing_impact: preResult.resolved.customer_facing_impact ?? (request.includes("customer") || uiImpact !== "none" ? "customer-visible" : "internal"),
    reversibility: preResult.resolved.reversibility ?? (databaseImpact === "data-migration" || apiImpact === "breaking-change" ? "difficult" : "easily-reversible"),
    data_sensitivity: preResult.resolved.data_sensitivity ?? (request.includes("pii") ? "pii" : request.includes("payment") ? "financial" : "none")
  };
}
function runReducedScopeClassification(input, preResult, resolutionMap) {
  const result = buildFromPreResult(input, preResult, resolutionMap);
  for (const dimension of [
    "workflow",
    "affected_modules",
    "scope",
    "database_impact",
    "api_impact",
    "ui_impact",
    "compliance_sensitivity",
    "customer_facing_impact",
    "reversibility",
    "data_sensitivity"
  ]) {
    if (resolutionMap[dimension]?.startsWith("deterministic")) {
      resolutionMap[dimension] = "llm-confirmed";
    }
  }
  resolutionMap.complexity = "llm-guessed";
  resolutionMap.risk = "llm-guessed";
  resolutionMap.certainty = "llm-guessed";
  resolutionMap.output_type = "llm-confirmed";
  return result;
}
function inferTargetCapability(request, workflow) {
  if (workflow === "pentest" || workflow === "pentest-retest") {
    return "security";
  }
  if (workflow === "documentation-update" || workflow === "project-question" || workflow === "writing" || workflow === "editing" || workflow === "planning" || workflow === "research") {
    return "content";
  }
  if (workflow === null) {
    if (request.includes("pentest") || request.includes("security")) {
      return "security";
    }
    if (request.includes("documentation") || request.includes("content") || request.includes("docs")) {
      return "content";
    }
  }
  return "coding";
}
function inferDomain(targetCapability, profile) {
  if (profile !== void 0) {
    const stack = getPrimaryStack(profile);
    if (stack !== "short-video") {
      return "coding";
    }
  }
  return targetCapability === "content" ? "content" : "coding";
}
function inferStack(targetCapability) {
  return targetCapability === "content" ? "short-video" : "laravel";
}
function inferOutputType(workflow) {
  if (workflow === "documentation-update" || workflow === "writing" || workflow === "editing" || workflow === "planning") {
    return "documentation";
  }
  if (workflow === "project-question" || workflow === "research" || workflow === null) {
    return "analysis";
  }
  if (workflow === "pentest" || workflow === "pentest-retest" || workflow === "root-cause-analysis") {
    return "report";
  }
  return "code";
}
function inferCapabilityGap(targetCapability, profile) {
  const activeCapabilities = new Set(
    profile?.active_capabilities ?? (profile?.routing?.domain === "coding" ? ["content", "coding", "security"] : ["content"])
  );
  if (targetCapability === "content") {
    return false;
  }
  if (targetCapability === "security") {
    return !activeCapabilities.has("security");
  }
  return !activeCapabilities.has("coding");
}
function inferDatabaseImpact(request) {
  if (request.includes("data migration")) {
    return "data-migration";
  }
  if (request.includes("migration") || request.includes("schema") || request.includes("column") || request.includes("table")) {
    return "schema-change";
  }
  if (request.includes("query") || request.includes("index")) {
    return "query-change";
  }
  return "none";
}
function inferApiImpact(request) {
  if (request.includes("breaking api") || request.includes("breaking endpoint")) {
    return "breaking-change";
  }
  if (request.includes("api") || request.includes("endpoint") || request.includes("route")) {
    return request.includes("modify") || request.includes("update") ? "modified-endpoint" : "additive-endpoint";
  }
  return "none";
}
function inferUiImpact(request) {
  if (request.includes("redesign")) {
    return "redesign";
  }
  if (request.includes("screen") || request.includes("dashboard") || request.includes("page")) {
    return "new-screen";
  }
  if (request.includes("component") || request.includes("button") || request.includes("form")) {
    return "new-component";
  }
  return "none";
}
function inferComplexity(request, workflow, databaseImpact, apiImpact, uiImpact, trivialSingleFile) {
  if (trivialSingleFile || isTrivialRequest(request)) {
    return "trivial";
  }
  if (workflow === "pentest" || workflow === "pentest-retest") {
    return "high";
  }
  if (workflow === "documentation-update" || workflow === "root-cause-analysis") {
    return "medium";
  }
  if (workflow === "project-question" || workflow === "research" || workflow === null) {
    return "low";
  }
  if (databaseImpact === "schema-change" || databaseImpact === "data-migration" || apiImpact === "breaking-change" || uiImpact === "redesign") {
    return "high";
  }
  if (apiImpact !== "none" || uiImpact !== "none") {
    return "medium";
  }
  return "low";
}
function inferRisk(workflow, complexity, databaseImpact, apiImpact) {
  if (workflow === "pentest" || workflow === "pentest-retest") {
    return "high";
  }
  if (complexity === "high" || complexity === "very-high" || databaseImpact === "schema-change" || databaseImpact === "data-migration" || apiImpact === "breaking-change") {
    return "high";
  }
  return complexity === "medium" ? "medium" : "low";
}
function inferScope(workflow, complexity, trivialSingleFile) {
  if (trivialSingleFile || complexity === "trivial") {
    return "single-file";
  }
  if (workflow === "documentation-update") {
    return "system-wide";
  }
  if (complexity === "high" || complexity === "very-high") {
    return "system-wide";
  }
  if (complexity === "medium") {
    return "multi-module";
  }
  return "single-module";
}
function inferTrivialSingleFile(request) {
  const normalized = request.toLowerCase();
  const explicitPrefixes = extractExplicitModulePrefixes(request);
  const singleExplicitFile = explicitPrefixes.length === 1 && /\.(tsx?|jsx?|vue|svelte|astro|php|dart|py|rb|go|rs|java|kt|cs|md)$/i.test(request);
  if (singleExplicitFile && isTrivialRequest(normalized)) {
    return true;
  }
  return isTrivialRequest(normalized) && mentionsAny(normalized, ["file", "rename", "cleanup", "comment", "typo", "one-line"]);
}
function isTrivialRequest(request) {
  return mentionsAny(request, [
    "rename",
    "cleanup",
    "clean up",
    "typo",
    "comment",
    "one-line",
    "one line",
    "small",
    "tiny",
    "minor"
  ]);
}
function inferModules(request, stack) {
  const explicitPrefixes = extractExplicitModulePrefixes(request);
  if (explicitPrefixes.length > 0) {
    return explicitPrefixes;
  }
  return inferStackAwareModulePrefixes(request.toLowerCase(), stack);
}
function extractExplicitModulePrefixes(request) {
  const matches = request.match(
    /\b(?:src|app|resources|database|routes|lib|tests|docs|packages)\/[A-Za-z0-9_./-]+\b/g
  ) ?? [];
  return Array.from(
    new Set(
      matches.map(
        (match) => stripTrailingChars(
          match.replace(/\\/g, "/").replace(/\.(tsx?|jsx?|vue|svelte|astro|php|dart|py|rb|go|rs|java|kt|cs|md)$/i, ""),
          "/"
        )
      )
    )
  ).slice(0, 3);
}
function inferStackAwareModulePrefixes(request, stack) {
  const prefixes = [];
  if (mentionsAny(request, ["migration", "schema", "table", "column"])) {
    prefixes.push("database/migrations");
  }
  if (mentionsAny(request, ["api", "endpoint", "route", "controller"])) {
    prefixes.push(...apiModulePrefixesForStack(stack));
  }
  if (mentionsAny(request, ["dashboard", "page", "screen", "view"])) {
    prefixes.push(...screenModulePrefixesForStack(stack));
  }
  if (mentionsAny(request, ["component", "button", "form", "widget"])) {
    prefixes.push(...componentModulePrefixesForStack(stack));
  }
  return Array.from(new Set(prefixes)).slice(0, 3);
}
function mentionsAny(request, tokens) {
  return tokens.some((token) => request.includes(token));
}
function apiModulePrefixesForStack(stack) {
  switch (stack) {
    case "laravel":
      return ["app/Http/Controllers", "routes"];
    case "django":
    case "fastapi":
      return ["app/api", "app/routes"];
    case "flutter":
      return ["lib/services"];
    default:
      return ["src/api", "src/server"];
  }
}
function screenModulePrefixesForStack(stack) {
  switch (stack) {
    case "laravel":
      return ["resources/views", "resources/js/pages"];
    case "flutter":
      return ["lib/screens"];
    default:
      return ["src/pages", "src/screens"];
  }
}
function componentModulePrefixesForStack(stack) {
  switch (stack) {
    case "laravel":
      return ["resources/js/components", "app/View/Components"];
    case "flutter":
      return ["lib/widgets"];
    default:
      return ["src/components"];
  }
}

// src/pipeline/router.ts
init_esm_shims();
var DOCUMENTATION_PHASES = [
  "request-classification",
  "docs-first-load",
  "analysis",
  "documentation-update"
];
var PROJECT_QUESTION_PHASES = [
  "request-classification",
  "docs-first-load",
  "analysis",
  "question-answering"
];
var RCA_PHASES = [
  "request-classification",
  "docs-first-load",
  "analysis",
  "root-cause-analysis",
  "documentation-update"
];
var PENTEST_PHASES = [
  "request-classification",
  "docs-first-load",
  "analysis",
  "pentest"
];
var PENTEST_RETEST_PHASES = [
  "request-classification",
  "docs-first-load",
  "analysis",
  "pentest-retest"
];
var CONTENT_RESEARCH_PHASES = [
  "request-classification",
  "docs-first-load",
  "analysis",
  "question-answering"
];
var LANE_PHASES = {
  full: [
    "request-classification",
    "docs-first-load",
    "analysis",
    "sequence-planning",
    "specification",
    "user-flow",
    "spec-review",
    "implementation",
    "implementation-review",
    "verification-gates",
    "documentation-update"
  ],
  graduated: [
    "request-classification",
    "docs-first-load",
    "analysis",
    "sequence-planning",
    "specification",
    "spec-review",
    "implementation",
    "implementation-review",
    "verification-gates",
    "documentation-update"
  ],
  fast: [
    "request-classification",
    "docs-first-load",
    "implementation",
    "implementation-review",
    "verification-gates",
    "documentation-update"
  ]
};
var PipelineRouter = class {
  route(classification) {
    if (classification.workflow === null) {
      return {
        lane: null,
        phases: [],
        route_reason: classification.workflow_reason ?? "No workflow matched the request."
      };
    }
    const lane = classification.resume_lane ?? selectLaneFromClassification(classification);
    if (!classification.resume_lane && classification.capability_gap && classification.target_capability !== "content" && classification.complexity !== "high" && classification.complexity !== "very-high" && classification.risk !== "high") {
      return {
        lane: "fast",
        phases: [...PROJECT_QUESTION_PHASES]
      };
    }
    if (classification.workflow === "module-documentation") {
      return {
        lane,
        phases: [
          "request-classification",
          "docs-first-load",
          "analysis",
          "module-documentation"
        ]
      };
    }
    if (classification.workflow === "documentation-update" || classification.workflow === "writing" || classification.workflow === "editing" || classification.workflow === "planning" || classification.output_type === "documentation") {
      return {
        lane,
        phases: [...DOCUMENTATION_PHASES]
      };
    }
    if (classification.workflow === "research") {
      return {
        lane: "fast",
        phases: [...CONTENT_RESEARCH_PHASES]
      };
    }
    if (classification.workflow === "project-question") {
      return {
        lane,
        phases: [...PROJECT_QUESTION_PHASES]
      };
    }
    if (classification.workflow === "root-cause-analysis") {
      return {
        lane,
        phases: [...RCA_PHASES]
      };
    }
    if (classification.workflow === "pentest") {
      return {
        lane,
        phases: [...PENTEST_PHASES]
      };
    }
    if (classification.workflow === "pentest-retest") {
      return {
        lane,
        phases: [...PENTEST_RETEST_PHASES]
      };
    }
    if (classification.workflow === "custom") {
      return {
        lane,
        phases: [...LANE_PHASES[lane]]
      };
    }
    return {
      lane,
      phases: [...LANE_PHASES[lane]],
      route_reason: classification.workflow_continuity_reason ?? null
    };
  }
};
function selectLaneFromClassification(classification) {
  if (classification.workflow === "project-question") {
    return "fast";
  }
  if (classification.workflow === "writing" || classification.workflow === "editing" || classification.workflow === "planning" || classification.workflow === "research") {
    return "fast";
  }
  if (classification.workflow === "custom") {
    if (classification.complexity === "trivial" || classification.complexity === "low") {
      return "fast";
    }
    return classification.risk === "high" ? "full" : "graduated";
  }
  if (classification.workflow === "investigation") {
    return "fast";
  }
  if (classification.workflow === "pentest" || classification.workflow === "pentest-retest") {
    return "graduated";
  }
  if (classification.workflow === "migration") {
    return "full";
  }
  if (classification.workflow === "bug-fix") {
    return classification.complexity === "low" && classification.risk === "low" ? "fast" : "graduated";
  }
  if (classification.workflow === "feature-development") {
    return classification.risk === "high" ? "full" : "graduated";
  }
  if (classification.complexity === "trivial") {
    return "fast";
  }
  if (classification.complexity === "low" && classification.risk === "low") {
    return "fast";
  }
  if (classification.complexity === "low" && classification.risk !== "low") {
    return "graduated";
  }
  if (classification.complexity === "medium" && classification.risk !== "high") {
    return "graduated";
  }
  return "full";
}

export {
  DEFECT_PATTERN_SCHEMA_VERSION,
  defaultStoreRoot,
  recordFindings,
  queryPatterns,
  prunePatterns,
  loadIndex,
  loadEntry,
  ensureStoreDir,
  markStaleEntries,
  PLANNING_MANIFEST_VERSION,
  PLAN_MODES,
  PLANNING_LANES,
  REQUIREMENT_TYPES,
  PROOF_TYPES,
  CRITERION_STATUSES,
  HEALTH_TIERS,
  ROLLBACK_CLASSES,
  deriveHealthTier,
  readModuleHealth,
  writeModuleHealth,
  writeModuleHealthProfile,
  readAllModuleHealth,
  initializeModuleHealth,
  moduleHealthPath,
  syncModuleHealth,
  gatesThatPassed,
  syncModuleHealthFromVerification,
  createEvidence,
  persistEvidence,
  toProjectRelative,
  loadManifest,
  saveManifest,
  manifestExists,
  listManifestSlugs,
  computeManifestHash,
  computeClassificationConfidence,
  PostClassifier,
  estimateContextBudgetHint,
  detectDeltaCandidate,
  resolveImpacts,
  ModuleResolver,
  resolveScope,
  toProjectRelativeModule,
  PreClassifier,
  isQuestionRoute,
  hasCodeNegation,
  isCreateArtifactAsk,
  isAboutWorkPrompt,
  shouldSkipLlm,
  RequestClassifier,
  LANE_PHASES,
  PipelineRouter
};
