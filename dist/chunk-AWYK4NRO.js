import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  readSessionRoute
} from "./chunk-BCUQZ43O.js";
import {
  isFeatureDevelopmentRoute,
  readWorkflowState
} from "./chunk-XLFP2EX7.js";
import {
  recordMarkedStage
} from "./chunk-QFQY5BRR.js";
import {
  currentFeature,
  readFeatureStageUnit
} from "./chunk-CAOZS5C2.js";
import {
  sessionClosedAnyFeature
} from "./chunk-5BQ2AB2Y.js";
import {
  keepingLedgerSessionCache,
  resolveSessionId
} from "./chunk-MG36YCW4.js";
import {
  FEATURE_BUNDLE_FILES,
  LEGACY_BUNDLE_FILES,
  SCREENSHOTS_DIR,
  featureDir,
  featureFilePath,
  isFeatureDirName
} from "./chunk-KF7HHHJR.js";
import {
  isAbsolute,
  relative,
  resolve
} from "./chunk-EGDL57MD.js";
import {
  PATHS
} from "./chunk-UCSN7SVD.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/stage-evidence/marker-parse.ts
init_esm_shims();

// src/pipeline/route-gate.ts
init_esm_shims();
function routeIsAffirmativelyNonFeature(projectRoot, sessionId) {
  const resolved = resolveSessionId(projectRoot, sessionId);
  const active = readWorkflowState(projectRoot, resolved).active?.workflow;
  if (active) {
    return !isFeatureDevelopmentRoute(active);
  }
  const routed = readSessionRoute(projectRoot, resolved)?.workflow;
  if (routed) {
    return !isFeatureDevelopmentRoute(routed);
  }
  return false;
}

// src/stage-evidence/artifact-path.ts
init_esm_shims();
import { realpathSync } from "fs";
var ArtifactOutOfTreeError = class extends Error {
  constructor(input) {
    super(`artifact must be a path inside the project; got ${input}`);
    this.input = input;
    this.name = "ArtifactOutOfTreeError";
  }
  input;
};
function realOrLexical(p) {
  try {
    return realpathSync.native(p);
  } catch {
    return p;
  }
}
function isEscape(rel) {
  return rel === "" || rel === ".." || rel.startsWith("../") || rel.startsWith("..\\") || isAbsolute(rel);
}
function normalizeArtifactPath(projectRoot, input) {
  const rootResolved = resolve(projectRoot);
  const rootReal = realOrLexical(rootResolved);
  const absInput = isAbsolute(input) ? realOrLexical(input) : resolve(rootReal, input);
  for (const root of /* @__PURE__ */ new Set([rootReal, rootResolved])) {
    const rel = relative(root, absInput);
    if (!isEscape(rel)) {
      return rel.replace(/\\/g, "/");
    }
  }
  throw new ArtifactOutOfTreeError(input);
}

// src/stage-evidence/bundle-artifact.ts
init_esm_shims();

// src/feature-evidence/bundle-integrity.ts
init_esm_shims();
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";
var ALLOWED_BUNDLE_FILENAMES = /* @__PURE__ */ new Set([
  ...Object.values(FEATURE_BUNDLE_FILES),
  "report.html"
]);
var LEGACY_BUNDLE_FILENAMES = new Set(
  Object.values(LEGACY_BUNDLE_FILES)
);
var SCREENSHOT_ENTRY_RE = /^screenshots\/(overview\.gif|\d{2}-[a-z0-9-]{1,40}\/(image\.png|caption\.txt))$/;
function isAtomicWriteTemp(filename) {
  return /\.tmp(-\d+)?$/.test(filename);
}
function classifyBundlePath(relPath) {
  const normalized = relPath.replace(/\\/g, "/").replace(/^\.\//, "");
  const prefix = `${PATHS.FEATURE_EVIDENCE_DIR}/`;
  if (!normalized.startsWith(prefix)) {
    return null;
  }
  const rest = normalized.slice(prefix.length);
  const slash = rest.indexOf("/");
  if (slash === -1) {
    return null;
  }
  const dirName = rest.slice(0, slash);
  const filename = rest.slice(slash + 1);
  if (!isFeatureDirName(dirName)) {
    return null;
  }
  if (filename === SCREENSHOTS_DIR || filename.startsWith(`${SCREENSHOTS_DIR}/`)) {
    return {
      dirName,
      filename,
      allowed: SCREENSHOT_ENTRY_RE.test(filename),
      screenshotSubtree: true
    };
  }
  return {
    dirName,
    filename,
    allowed: ALLOWED_BUNDLE_FILENAMES.has(filename),
    screenshotSubtree: false
  };
}
function strayBundleFiles(projectRoot, dirName) {
  const bundleAbs = join(projectRoot, featureDir(dirName));
  let entries;
  try {
    entries = readdirSync(bundleAbs);
  } catch {
    return [];
  }
  const legacy = isLegacyBundle(bundleAbs);
  const strays = [];
  for (const name of entries) {
    if (isAtomicWriteTemp(name)) {
      continue;
    }
    if (name === SCREENSHOTS_DIR) {
      strays.push(...strayScreenshotEntries(bundleAbs));
      continue;
    }
    if (ALLOWED_BUNDLE_FILENAMES.has(name)) continue;
    if (legacy && LEGACY_BUNDLE_FILENAMES.has(name)) continue;
    strays.push(name);
  }
  return strays.sort();
}
function readJsonObject(absPath, firstLineOnly) {
  try {
    const text = readFileSync(absPath, "utf8");
    const json = firstLineOnly ? text.split("\n").find((line) => line.trim().length > 0) : text;
    const parsed = json === void 0 ? null : JSON.parse(json);
    return typeof parsed === "object" && parsed !== null && !Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
function isLegacyBundle(bundleAbs) {
  const openRow = readJsonObject(join(bundleAbs, FEATURE_BUNDLE_FILES.stageEvidence), true);
  if (openRow && typeof openRow.ts === "string" && openRow.recorded_at === void 0) {
    return true;
  }
  const spec = readJsonObject(join(bundleAbs, FEATURE_BUNDLE_FILES.specification), false);
  return spec !== null && typeof spec.spec_file === "string" && spec.spec_file !== FEATURE_BUNDLE_FILES.specMd;
}
function strayScreenshotEntries(bundleAbs) {
  const strays = [];
  const walk = (absDir, relPrefix) => {
    let entries;
    try {
      entries = readdirSync(absDir);
    } catch {
      return;
    }
    for (const name of entries) {
      if (isAtomicWriteTemp(name)) {
        continue;
      }
      const abs = join(absDir, name);
      const rel = `${relPrefix}/${name}`;
      let isDir;
      try {
        isDir = statSync(abs).isDirectory();
      } catch {
        continue;
      }
      if (isDir) {
        walk(abs, rel);
      } else if (!SCREENSHOT_ENTRY_RE.test(rel)) {
        strays.push(rel);
      }
    }
  };
  walk(join(bundleAbs, SCREENSHOTS_DIR), SCREENSHOTS_DIR);
  return strays;
}

// src/stage-evidence/bundle-artifact.ts
function bundleArtifactFile(stage) {
  if (stage === "planning") return "plan";
  if (stage === "specification") return "specification";
  if (stage === "review") return "review";
  return null;
}
function bundleArtifactVerb(file) {
  if (file === "plan") return "paqad-ai plan compile";
  if (file === "specification") return "paqad-ai spec freeze";
  return "paqad-ai review record";
}
function checkBundleArtifacts(projectRoot, sessionId, stage, normalizedPaths) {
  const file = bundleArtifactFile(stage);
  if (!file) {
    const accepted2 = [];
    const rejected2 = [];
    for (const path of normalizedPaths) {
      const inBundle = classifyBundlePath(path);
      if (inBundle && (!inBundle.allowed || inBundle.screenshotSubtree)) {
        rejected2.push(path);
      } else {
        accepted2.push(path);
      }
    }
    return { rigid: false, expected: null, accepted: accepted2, rejected: rejected2, verb: null };
  }
  const dirName = currentFeature(projectRoot, sessionId);
  const expected = dirName ? featureFilePath(dirName, file) : null;
  const accepted = [];
  const rejected = [];
  for (const path of normalizedPaths) {
    if (expected !== null && path === expected) {
      accepted.push(path);
    } else {
      rejected.push(path);
    }
  }
  return { rigid: true, expected, accepted, rejected, verb: bundleArtifactVerb(file) };
}

// src/stage-evidence/marker-parse.ts
var MARKER = /^[ \t>*-]*paqad:stage\s+([a-z_]+)\s+(start|end)(?:\s+--\s+(\S+))?\s*$/gim;
function extractAssistantText(raw) {
  const parts = [];
  let sawJson = false;
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("{")) continue;
    let obj;
    try {
      obj = JSON.parse(trimmed);
    } catch {
      continue;
    }
    sawJson = true;
    const record = obj;
    const container = record.message ?? record.payload;
    const role = container?.role ?? record.role ?? record.type;
    if (role !== "assistant") continue;
    const content = container?.content ?? record.content;
    parts.push(collectText(content));
  }
  return sawJson ? parts.join("\n") : raw;
}
function collectText(content) {
  if (typeof content === "string") return content;
  if (!Array.isArray(content)) return "";
  return content.map(
    (block) => block && typeof block === "object" && typeof block.text === "string" ? block.text : ""
  ).join("\n");
}
function extractMarkers(text) {
  const out = [];
  MARKER.lastIndex = 0;
  let match;
  while ((match = MARKER.exec(text)) !== null) {
    const marker = { stage: match[1], phase: match[2] };
    if (marker.phase === "end" && match[3]) marker.artifactPath = match[3];
    out.push(marker);
  }
  return out;
}
function parseAndRecordMarkers(input) {
  if (input.keepSessionCache === true) {
    return keepingLedgerSessionCache(input.projectRoot, () => recordMarkers(input));
  }
  return recordMarkers(input);
}
function recordMarkers(input) {
  try {
    const raw = input.transcriptText;
    if (!raw) return [];
    const markers = extractMarkers(extractAssistantText(raw));
    if (markers.length === 0) return [];
    const sessionId = resolveSessionId(input.projectRoot, input.sessionId);
    if (routeIsAffirmativelyNonFeature(input.projectRoot, sessionId)) return [];
    const dirName = currentFeature(input.projectRoot, sessionId);
    if (!dirName && sessionClosedAnyFeature(input.projectRoot, sessionId)) return [];
    const existing = dirName ? readFeatureStageUnit(input.projectRoot, dirName) : [];
    const seen = /* @__PURE__ */ new Set();
    for (const row of existing) {
      if (typeof row.stage !== "string") continue;
      if (row.kind === "stage_start") seen.add(`${row.stage}:start`);
      if (row.kind === "stage_end") seen.add(`${row.stage}:end`);
    }
    const recorded = [];
    for (const { stage, phase, artifactPath } of markers) {
      const key = `${stage}:${phase}`;
      if (seen.has(key)) continue;
      let normalizedArtifact;
      if (artifactPath) {
        try {
          normalizedArtifact = normalizeArtifactPath(input.projectRoot, artifactPath);
        } catch {
          normalizedArtifact = void 0;
        }
        if (normalizedArtifact) {
          const check = checkBundleArtifacts(input.projectRoot, sessionId, stage, [
            normalizedArtifact
          ]);
          if (check.accepted.length === 0) {
            normalizedArtifact = void 0;
          }
        }
      }
      if (recordMarkedStage(input.projectRoot, {
        sessionId,
        stage,
        phase,
        artifactPaths: normalizedArtifact ? [normalizedArtifact] : void 0,
        adapter: input.adapter,
        now: input.now
      })) {
        seen.add(key);
        recorded.push({ stage, phase, artifactPath });
      }
    }
    return recorded;
  } catch {
    return [];
  }
}

export {
  classifyBundlePath,
  strayBundleFiles,
  normalizeArtifactPath,
  routeIsAffirmativelyNonFeature,
  bundleArtifactFile,
  checkBundleArtifacts,
  extractAssistantText,
  extractMarkers,
  parseAndRecordMarkers
};
