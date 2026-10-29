import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  require_out
} from "./chunk-DNG6DDRS.js";
import {
  toPosixPath
} from "./chunk-4K4CM3QN.js";
import {
  require_dist
} from "./chunk-AP7OEXCZ.js";
import {
  PATHS
} from "./chunk-LW3OCT4Y.js";
import {
  __toESM,
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/module-decisions/events.ts
init_esm_shims();
import { appendFileSync, existsSync, mkdirSync, readFileSync } from "fs";
import { dirname, join } from "path";
function eventsPath(projectRoot) {
  return join(projectRoot, PATHS.MODULE_MAP_EVENTS_LOG);
}
function ensureEventsFile(projectRoot) {
  const path = eventsPath(projectRoot);
  mkdirSync(dirname(path), { recursive: true });
  return path;
}
function appendModuleMapEvent(projectRoot, event) {
  const path = ensureEventsFile(projectRoot);
  appendFileSync(path, JSON.stringify(event) + "\n", "utf8");
}
function appendRunCancelledEvent(projectRoot, runId, payload) {
  appendModuleMapEvent(projectRoot, {
    ts: (/* @__PURE__ */ new Date()).toISOString(),
    type: "run.cancelled",
    run_id: runId,
    error_code: "CANCELLED_BY_CONSUMER",
    payload
  });
}
function emitContextTruncated(projectRoot, payload) {
  appendModuleMapEvent(projectRoot, {
    ts: (/* @__PURE__ */ new Date()).toISOString(),
    type: "context.truncated",
    payload
  });
}
function readModuleMapEvents(projectRoot) {
  const path = eventsPath(projectRoot);
  if (!existsSync(path)) return [];
  const raw = readFileSync(path, "utf8");
  const out = [];
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;
    try {
      const parsed = JSON.parse(trimmed);
      if (typeof parsed === "object" && parsed !== null && typeof parsed.type === "string") {
        out.push(parsed);
      }
    } catch {
    }
  }
  return out;
}
function readModuleMapEventsSince(projectRoot, sinceIso) {
  const since = Date.parse(sinceIso);
  if (!Number.isFinite(since)) return readModuleMapEvents(projectRoot);
  return readModuleMapEvents(projectRoot).filter((e) => {
    const ts = Date.parse(e.ts);
    return Number.isFinite(ts) && ts >= since;
  });
}
function readModuleMapEventsForSlug(projectRoot, slug) {
  return readModuleMapEvents(projectRoot).filter((e) => e.slug === slug);
}

// src/module-decisions/schema.ts
init_esm_shims();
var SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
var ID_RE = /^MD-(?:\d{4,}|[0-9A-HJKMNP-TV-Z]{26})$/;
function isValidSlug(value) {
  return SLUG_RE.test(value);
}
function isValidDecisionId(value) {
  return ID_RE.test(value);
}
function normaliseSlug(input) {
  const trimmed = input.trim().toLowerCase();
  if (trimmed.length === 0) return null;
  const slug = trimmed.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  if (slug.length === 0) return null;
  return isValidSlug(slug) ? slug : null;
}
function levenshtein(a, b, max = 2) {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const al = a.length;
  const bl = b.length;
  if (al === 0) return bl;
  if (bl === 0) return al;
  let prev = new Array(bl + 1);
  let curr = new Array(bl + 1);
  for (let j = 0; j <= bl; j++) prev[j] = j;
  for (let i = 1; i <= al; i++) {
    curr[0] = i;
    let rowMin = curr[0];
    for (let j = 1; j <= bl; j++) {
      const cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, (prev[j] ?? 0) + 1, (prev[j - 1] ?? 0) + cost);
      if (curr[j] < rowMin) rowMin = curr[j];
    }
    if (rowMin > max) return max + 1;
    [prev, curr] = [curr, prev];
  }
  return prev[bl] ?? 0;
}
var TRANSITIONS = {
  draft: ["proposed", "rejected"],
  proposed: ["accepted", "rejected", "expired", "superseded"],
  accepted: ["superseded"],
  rejected: [],
  expired: ["superseded"],
  superseded: []
};
function canTransition(from, to) {
  return TRANSITIONS[from].includes(to);
}
function isExpired(decision, now = /* @__PURE__ */ new Date()) {
  if (decision.state !== "proposed") return false;
  return now.getTime() >= Date.parse(decision.expires_at);
}

// src/module-map/reconciler.ts
init_esm_shims();
var import_fast_glob = __toESM(require_out(), 1);
var import_yaml2 = __toESM(require_dist(), 1);
import { existsSync as existsSync3, mkdirSync as mkdirSync3, readFileSync as readFileSync3, readdirSync as readdirSync2, writeFileSync as writeFileSync2 } from "fs";
import { dirname as dirname2, join as join3 } from "path";

// src/module-decisions/store.ts
init_esm_shims();
var import_yaml = __toESM(require_dist(), 1);
import {
  existsSync as existsSync2,
  mkdirSync as mkdirSync2,
  readFileSync as readFileSync2,
  readdirSync,
  unlinkSync,
  writeFileSync
} from "fs";
import { join as join2 } from "path";
function decisionsDir(projectRoot) {
  return join2(projectRoot, PATHS.PROSPECTIVE_DECISIONS_DIR);
}
function ensureDir(projectRoot) {
  const dir = decisionsDir(projectRoot);
  mkdirSync2(dir, { recursive: true });
  return dir;
}
function decisionPath(projectRoot, id) {
  if (!isValidDecisionId(id)) {
    throw new Error(`Invalid MD id: ${id}`);
  }
  return join2(decisionsDir(projectRoot), `${id}.yml`);
}
function listDecisionIds(projectRoot) {
  const dir = decisionsDir(projectRoot);
  if (!existsSync2(dir)) return [];
  return readdirSync(dir).filter((f) => f.endsWith(".yml")).map((f) => f.replace(/\.yml$/, "")).filter(isValidDecisionId).sort();
}
function readDecision(projectRoot, id) {
  const path = decisionPath(projectRoot, id);
  if (!existsSync2(path)) return null;
  const raw = readFileSync2(path, "utf8");
  const parsed = import_yaml.default.parse(raw);
  if (parsed === null || typeof parsed !== "object") return null;
  return parsed;
}
function writeDecision(projectRoot, decision) {
  ensureDir(projectRoot);
  const path = decisionPath(projectRoot, decision.id);
  const yaml = import_yaml.default.stringify(decision, { indent: 2, lineWidth: 0 });
  writeFileSync(path, yaml, "utf8");
  return path;
}
function listDecisions(projectRoot) {
  return listDecisionIds(projectRoot).map((id) => readDecision(projectRoot, id)).filter((d) => d !== null);
}
function listDecisionsByState(projectRoot, state) {
  return listDecisions(projectRoot).filter((d) => d.state === state);
}
function expireStaleDecisions(projectRoot, now = /* @__PURE__ */ new Date()) {
  const moved = [];
  for (const decision of listDecisionsByState(projectRoot, "proposed")) {
    if (!isExpired(decision, now)) continue;
    const next = {
      ...decision,
      state: "expired",
      updated_at: now.toISOString()
    };
    writeDecision(projectRoot, next);
    moved.push(decision.id);
  }
  return moved;
}

// src/module-map/reconciler.ts
var DEFAULT_EXCLUDES = [
  "**/node_modules/**",
  "**/dist/**",
  "**/build/**",
  "**/.git/**",
  "**/.paqad/**",
  "**/coverage/**"
];
function emptyCounts() {
  return {
    "MM-ADD": 0,
    "MM-FEAT-ADD": 0,
    "MM-REMOVE": 0,
    "MM-RENAME": 0,
    "MM-FEAT-STALE": 0,
    "MM-DOC-ORPHAN": 0,
    "MM-DOC-MISSING": 0,
    "MM-MISMATCH": 0
  };
}
function readRawModuleMap(projectRoot) {
  const path = join3(projectRoot, PATHS.MODULE_MAP);
  if (!existsSync3(path)) return null;
  const raw = readFileSync3(path, "utf8");
  const parsed = import_yaml2.default.parse(raw);
  if (parsed === null || typeof parsed !== "object") return null;
  const modulesRaw = Array.isArray(parsed["modules"]) ? parsed["modules"] : [];
  const modules = modulesRaw.map((m) => {
    const mod = typeof m === "object" && m !== null ? m : {};
    const sources = pickSources(mod);
    const featuresRaw = Array.isArray(mod["features"]) ? mod["features"] : [];
    const features = featuresRaw.map((f) => {
      const feat = typeof f === "object" && f !== null ? f : {};
      return {
        slug: String(feat["slug"] ?? ""),
        name: String(feat["name"] ?? ""),
        sources: pickSources(feat)
      };
    });
    return {
      slug: String(mod["slug"] ?? ""),
      name: String(mod["name"] ?? ""),
      sources,
      features,
      sensitivity: mod["sensitivity"] === "high" ? "high" : "normal"
    };
  });
  return { modules };
}
function pickSources(obj) {
  const candidates = obj["sources"] ?? obj["source_paths"];
  if (!Array.isArray(candidates)) return [];
  return candidates.map(String);
}
function normaliseGlob(spec) {
  let g = spec.trim();
  if (!g.includes("*") && !g.includes("?") && !g.endsWith(".ts") && !g.endsWith(".tsx")) {
    if (!g.endsWith("/")) g += "/";
    g += "**";
  }
  return g;
}
async function listFilesUnder(projectRoot, roots, fileExtensions, excludes) {
  const patterns = fileExtensions === void 0 || fileExtensions.length === 0 ? roots.map((r) => `${r.replace(/\/+$/, "")}/**/*`) : roots.flatMap(
    (r) => fileExtensions.map(
      (ext) => `${r.replace(/\/+$/, "")}/**/*${ext.startsWith(".") ? ext : `.${ext}`}`
    )
  );
  const results = await (0, import_fast_glob.default)(patterns, {
    cwd: projectRoot,
    onlyFiles: true,
    dot: false,
    ignore: [...DEFAULT_EXCLUDES, ...excludes],
    followSymbolicLinks: false
  });
  return results.map(toPosixPath).sort();
}
function globToRegex(glob) {
  const g = normaliseGlob(glob);
  let re = "^";
  let i = 0;
  while (i < g.length) {
    const c = g[i];
    if (c === "*" && g[i + 1] === "*") {
      re += ".*";
      i += 2;
      if (g[i] === "/") i++;
    } else if (c === "*") {
      re += "[^/]*";
      i++;
    } else if (c === "?") {
      re += "[^/]";
      i++;
    } else if (".+()|^$[]{}\\".includes(c ?? "")) {
      re += `\\${c}`;
      i++;
    } else {
      re += c;
      i++;
    }
  }
  re += "$";
  return new RegExp(re);
}
function matchesAnyGlob(file, globs) {
  for (const g of globs) {
    if (g.length === 0) continue;
    if (globToRegex(g).test(file)) return true;
  }
  return false;
}
function listDocModuleDirs(projectRoot) {
  const docsDir = join3(projectRoot, "docs", "modules");
  if (!existsSync3(docsDir)) return [];
  return readdirSync2(docsDir, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort();
}
function writeDriftReport(projectRoot, report) {
  const path = join3(projectRoot, PATHS.MODULE_MAP_DRIFT);
  mkdirSync3(dirname2(path), { recursive: true });
  writeFileSync2(path, JSON.stringify(report, null, 2) + "\n", "utf8");
}
async function reconcileModuleMap(opts) {
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const counts = emptyCounts();
  const findings = [];
  if (opts.sourceRoots === null || opts.sourceRoots.length === 0) {
    const report2 = {
      generated_at: now,
      source_roots: [],
      findings: [],
      blocked: "source_roots_unknown",
      counts
    };
    if (opts.writeReport !== false) {
      writeDriftReport(opts.projectRoot, report2);
      appendModuleMapEvent(opts.projectRoot, {
        ts: now,
        type: "module.reconciled",
        payload: { blocked: "source_roots_unknown" }
      });
    }
    return report2;
  }
  const map = readRawModuleMap(opts.projectRoot);
  const modules = map?.modules ?? [];
  const allFiles = await listFilesUnder(
    opts.projectRoot,
    opts.sourceRoots,
    opts.fileExtensions,
    opts.extraExcludes ?? []
  );
  const filesByModule = /* @__PURE__ */ new Map();
  const matchedFiles = /* @__PURE__ */ new Set();
  for (const mod of modules) {
    const matched = allFiles.filter((f) => matchesAnyGlob(f, mod.sources));
    filesByModule.set(mod.slug, matched);
    for (const f of matched) matchedFiles.add(f);
  }
  for (const mod of modules) {
    const matched = filesByModule.get(mod.slug) ?? [];
    if (matched.length === 0) {
      findings.push({
        code: "MM-REMOVE",
        module_slug: mod.slug,
        feature_slug: null,
        paths: mod.sources,
        detail: `Declared module "${mod.slug}" has no matching source files under source_roots.`
      });
      counts["MM-REMOVE"]++;
    }
  }
  for (const mod of modules) {
    for (const feat of mod.features) {
      if (feat.sources.length === 0) continue;
      const featMatches = allFiles.filter((f) => matchesAnyGlob(f, feat.sources));
      if (featMatches.length === 0) {
        findings.push({
          code: "MM-FEAT-STALE",
          module_slug: mod.slug,
          feature_slug: feat.slug,
          paths: feat.sources,
          detail: `Feature "${mod.slug}/${feat.slug}" has no matching source files.`
        });
        counts["MM-FEAT-STALE"]++;
      }
    }
  }
  const undeclared = allFiles.filter((f) => !matchedFiles.has(f));
  const undeclaredByDir = /* @__PURE__ */ new Map();
  for (const f of undeclared) {
    const dir = f.split("/").slice(0, -1).join("/");
    const bucket = undeclaredByDir.get(dir) ?? [];
    bucket.push(f);
    undeclaredByDir.set(dir, bucket);
  }
  const prospectiveSlugs = new Set(
    listDecisions(opts.projectRoot).filter((d) => d.state === "proposed" || d.state === "accepted").map((d) => d.proposed_slug)
  );
  const knownSlugs = new Set(modules.map((m) => m.slug));
  for (const [dir, files] of undeclaredByDir) {
    const dirSlugGuess = dir.split("/").slice(-1)[0] ?? "";
    if (prospectiveSlugs.has(dirSlugGuess) && !knownSlugs.has(dirSlugGuess)) {
      findings.push({
        code: "MM-MISMATCH",
        module_slug: dirSlugGuess,
        feature_slug: null,
        paths: files,
        detail: `Prospective module "${dirSlugGuess}" is declared but its accepted decision has not yet been applied to module-map.yml.`
      });
      counts["MM-MISMATCH"]++;
    } else {
      findings.push({
        code: "MM-ADD",
        module_slug: null,
        feature_slug: null,
        paths: files,
        detail: `Undeclared source files under "${dir}" \u2014 no module's sources: glob matches.`
      });
      counts["MM-ADD"]++;
    }
  }
  for (const mod of modules) {
    if (mod.features.every((f) => f.sources.length === 0)) continue;
    const modFiles = filesByModule.get(mod.slug) ?? [];
    const featGlobs = mod.features.flatMap((f) => f.sources);
    const orphan = modFiles.filter((f) => !matchesAnyGlob(f, featGlobs));
    if (orphan.length === 0) continue;
    findings.push({
      code: "MM-FEAT-ADD",
      module_slug: mod.slug,
      feature_slug: null,
      paths: orphan,
      detail: `${orphan.length} file(s) in module "${mod.slug}" match no declared feature glob.`
    });
    counts["MM-FEAT-ADD"]++;
  }
  const docDirs = new Set(listDocModuleDirs(opts.projectRoot));
  for (const mod of modules) {
    if (!docDirs.has(mod.slug)) {
      findings.push({
        code: "MM-DOC-MISSING",
        module_slug: mod.slug,
        feature_slug: null,
        paths: [`docs/modules/${mod.slug}/`],
        detail: `Module "${mod.slug}" is declared but has no docs/modules/${mod.slug}/ directory.`
      });
      counts["MM-DOC-MISSING"]++;
    }
  }
  for (const dir of docDirs) {
    if (!knownSlugs.has(dir)) {
      findings.push({
        code: "MM-DOC-ORPHAN",
        module_slug: dir,
        feature_slug: null,
        paths: [`docs/modules/${dir}/`],
        detail: `docs/modules/${dir}/ exists but no module with slug "${dir}" is declared.`
      });
      counts["MM-DOC-ORPHAN"]++;
    }
  }
  const report = {
    generated_at: now,
    source_roots: opts.sourceRoots,
    findings,
    blocked: null,
    counts
  };
  if (opts.writeReport !== false) {
    writeDriftReport(opts.projectRoot, report);
    appendModuleMapEvent(opts.projectRoot, {
      ts: now,
      type: "module.reconciled",
      payload: {
        finding_counts: counts,
        total_findings: findings.length,
        source_roots: opts.sourceRoots
      }
    });
  }
  return report;
}
function readDriftReport(projectRoot) {
  const path = join3(projectRoot, PATHS.MODULE_MAP_DRIFT);
  if (!existsSync3(path)) return null;
  try {
    return JSON.parse(readFileSync3(path, "utf8"));
  } catch {
    return null;
  }
}
function driftReportHasFindings(report) {
  if (report === null) return false;
  if (report.blocked !== null) return true;
  return report.findings.length > 0;
}

export {
  appendModuleMapEvent,
  appendRunCancelledEvent,
  emitContextTruncated,
  readModuleMapEvents,
  readModuleMapEventsSince,
  readModuleMapEventsForSlug,
  isValidSlug,
  normaliseSlug,
  levenshtein,
  canTransition,
  isExpired,
  readDecision,
  writeDecision,
  listDecisions,
  listDecisionsByState,
  expireStaleDecisions,
  readRawModuleMap,
  matchesAnyGlob,
  reconcileModuleMap,
  readDriftReport,
  driftReportHasFindings
};
