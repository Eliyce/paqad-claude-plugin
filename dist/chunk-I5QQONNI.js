import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  readRawModuleMap
} from "./chunk-7NYQPCFU.js";
import {
  toPosixPath
} from "./chunk-LYNDVGNE.js";
import {
  LEDGER_LOCK_STALE_MS,
  acquireOwnedFileLock,
  appendFeatureStageRow,
  bundleLockPath,
  currentFeature,
  openFeatureChange,
  readFeatureStageUnit,
  recordChangeConstants,
  resumeFeatureByRef
} from "./chunk-AFASV43S.js";
import {
  PRE_CODE_STAGES,
  STAGE_EVIDENCE_DOC_TYPE,
  agentForWriter,
  featureRecordIsUntitled,
  isEditStage,
  isKnownStage,
  isLaneStage,
  liveStageAgents,
  readChangeConstants,
  readFeatureRecord,
  requiredPreCodeStages,
  sessionReattachableFeature,
  stageAgentIdentity,
  startedAfterLastEnd,
  startedByAnotherAgent,
  updateFeatureRecord
} from "./chunk-DAC2ETKH.js";
import {
  UNTITLED_FEATURE_TITLE,
  mintFeatureDirName
} from "./chunk-RJMJYPHL.js";
import {
  API_IMPACTS,
  DATABASE_IMPACTS,
  stageForAgentName,
  stripPluginAgentNamespace
} from "./chunk-EGVDRAXB.js";
import {
  readGitState
} from "./chunk-BOEVU2BD.js";
import {
  computeSessionRowHash,
  sessionLedgerDir
} from "./chunk-Q353EDKY.js";
import {
  resolveSessionId
} from "./chunk-SG6LXLDH.js";
import {
  readSessionControl,
  writeSessionControl
} from "./chunk-FMQ5YRSP.js";
import {
  featureDir,
  featureFilePath,
  isAbsolute,
  parseFeatureDirName,
  relative
} from "./chunk-AZLA53A6.js";
import {
  PATHS
} from "./chunk-IHMBVS6H.js";
import {
  init_esm_shims
} from "./chunk-IDFRWBMN.js";

// src/stage-evidence/live-writer.ts
init_esm_shims();

// src/feature-evidence/rename.ts
init_esm_shims();
import {
  existsSync,
  readFileSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync
} from "fs";
import { join } from "path";
var RENAME_LOCK_TIMEOUT_MS = 3e3;
var REWRITE_ATTEMPTS = 5;
function backfillFeatureSlug(projectRoot, dirName, title, now, issue) {
  const unchanged = { dirName, renamed: false };
  const parts = parseFeatureDirName(dirName);
  if (!parts || parts.slug !== UNTITLED_FEATURE_TITLE || parts.issue !== null || title.trim().length === 0) {
    return unchanged;
  }
  const minted = mintFeatureDirName({ title, issue, ulid: parts.ulid });
  if (minted.slug === UNTITLED_FEATURE_TITLE || minted.dirName === dirName) {
    return unchanged;
  }
  const absOld = join(projectRoot, featureDir(dirName));
  const absNew = join(projectRoot, featureDir(minted.dirName));
  if (existsSync(absNew)) {
    return unchanged;
  }
  const lock = takeBundleLock(bundleLockPath(projectRoot, dirName));
  if (lock === null) return unchanged;
  try {
    renameSync(absOld, absNew);
  } catch (error) {
    lock.release();
    if (error.code !== "ENOENT") {
      return unchanged;
    }
  }
  repointSessionControls(projectRoot, dirName, minted.dirName, now);
  rewriteArtifactPaths(projectRoot, dirName, minted.dirName);
  lock.movedTo(bundleLockPath(projectRoot, minted.dirName)).release();
  updateFeatureRecord(
    projectRoot,
    minted.dirName,
    { title, slug: minted.slug, issue: minted.issue },
    now
  );
  return { dirName: minted.dirName, renamed: true };
}
function titleActiveFeature(projectRoot, sessionId, title, issue, now) {
  const active = currentFeature(projectRoot, sessionId);
  if (!active) {
    return null;
  }
  const record = readFeatureRecord(projectRoot, active);
  if (record && !featureRecordIsUntitled(record)) {
    return null;
  }
  const result = backfillFeatureSlug(projectRoot, active, title, now, issue);
  return result.renamed ? result.dirName : null;
}
function takeBundleLock(lockDir) {
  try {
    return acquireOwnedFileLock(lockDir, {
      timeoutMs: RENAME_LOCK_TIMEOUT_MS,
      staleMs: LEDGER_LOCK_STALE_MS
    });
  } catch {
    return null;
  }
}
function repointSessionControls(projectRoot, oldName, newName, now) {
  let files;
  try {
    files = readdirSync(join(projectRoot, PATHS.FEATURE_EVIDENCE_SESSION_DIR));
  } catch {
    return;
  }
  for (const file of files) {
    if (!file.endsWith(".json")) {
      continue;
    }
    const sessionId = file.slice(0, -".json".length);
    try {
      const control = readSessionControl(projectRoot, sessionId, now);
      if (control.active !== oldName && !control.paused.includes(oldName)) {
        continue;
      }
      writeSessionControl(
        projectRoot,
        {
          ...control,
          active: control.active === oldName ? newName : control.active,
          paused: control.paused.map((name) => name === oldName ? newName : name)
        },
        now,
        "rename"
      );
    } catch {
    }
  }
}
function rewriteArtifactPaths(projectRoot, oldName, newName) {
  const absLedger = join(projectRoot, featureFilePath(newName, "stageEvidence"));
  const temp = `${absLedger}.rename-${process.pid}.tmp`;
  try {
    for (let attempt = 0; attempt < REWRITE_ATTEMPTS; attempt += 1) {
      const raw = readFileSync(absLedger, "utf8");
      const rewritten = relinkedLedger(raw, oldName, newName);
      if (rewritten === null) return;
      writeFileSync(temp, rewritten, "utf8");
      if (statSync(absLedger).size === Buffer.byteLength(raw)) {
        renameSync(temp, absLedger);
        return;
      }
    }
    rmSync(temp, { force: true });
  } catch {
  }
}
function relinkedLedger(raw, oldName, newName) {
  const oldPrefix = `${featureDir(oldName)}/`;
  const newPrefix = `${featureDir(newName)}/`;
  let changed = false;
  const rehashed = /* @__PURE__ */ new Map();
  const lines = raw.split("\n").map((line) => {
    if (line.trim() === "") return line;
    let row;
    try {
      row = JSON.parse(line);
    } catch {
      return line;
    }
    const oldHash = row.content_hash;
    let touched = false;
    if (Array.isArray(row.artifact_paths) && line.includes(oldPrefix)) {
      row.artifact_paths = row.artifact_paths.map(
        (path) => typeof path === "string" && path.startsWith(oldPrefix) ? `${newPrefix}${path.slice(oldPrefix.length)}` : path
      );
      touched = true;
    }
    if (rehashed.has(row.prev_hash)) {
      row.prev_hash = rehashed.get(row.prev_hash);
      touched = true;
    }
    if (touched) {
      row.content_hash = computeSessionRowHash(row);
      changed = true;
    }
    if (row.content_hash !== oldHash) rehashed.set(oldHash, row.content_hash);
    return touched ? JSON.stringify(row) : line;
  });
  return changed ? lines.join("\n") : null;
}

// src/stage-evidence/effective-lane.ts
init_esm_shims();

// src/module-map/sensitivity.ts
init_esm_shims();
import { isAbsolute as isAbsolute2, relative as relative2 } from "path";
function normalise(path) {
  return toPosixPath(path).replace(/^\.\//, "").replace(/\/+$/, "");
}
function underPrefix(target, prefix) {
  if (prefix.length === 0) {
    return false;
  }
  return target === prefix || target.startsWith(`${prefix}/`);
}
function resolvePathSensitivity(projectRoot, relPath) {
  const map = readRawModuleMap(projectRoot);
  if (!map) {
    return "normal";
  }
  const rel = isAbsolute2(relPath) ? relative2(projectRoot, relPath) : relPath;
  const target = normalise(rel);
  if (target.length === 0) {
    return "normal";
  }
  for (const mod of map.modules) {
    if (mod.sensitivity !== "high") {
      continue;
    }
    const prefixes = [...mod.sources, ...mod.features.flatMap((feature) => feature.sources)];
    if (prefixes.some((source) => underPrefix(target, normalise(source)))) {
      return "high";
    }
  }
  return "normal";
}

// src/stage-evidence/effective-lane.ts
function resolveEffectiveLane(projectRoot, targetPath, recordedLane) {
  if (targetPath && resolvePathSensitivity(projectRoot, targetPath) === "high") {
    return "full";
  }
  return recordedLane ?? "full";
}

// src/stage-evidence/recorder.ts
init_esm_shims();
import { createHash } from "crypto";
import { readFileSync as readFileSync3 } from "fs";
import { join as join3 } from "path";

// src/stage-evidence/pending-lane.ts
init_esm_shims();
import { mkdirSync, readFileSync as readFileSync2, rmSync as rmSync2, writeFileSync as writeFileSync2 } from "fs";
import { join as join2 } from "path";
var PENDING_LANE_FILE = ".pending-lane";
var VALID_LANES = ["fast", "graduated", "full"];
function pendingLaneDir(projectRoot, sessionId) {
  return join2(projectRoot, sessionLedgerDir(STAGE_EVIDENCE_DOC_TYPE, sessionId));
}
function writePendingLane(projectRoot, sessionId, lane) {
  if (lane === null) {
    return;
  }
  const dir = pendingLaneDir(projectRoot, sessionId);
  mkdirSync(dir, { recursive: true });
  writeFileSync2(join2(dir, PENDING_LANE_FILE), lane, "utf8");
}
function clearPendingLane(projectRoot, sessionId) {
  try {
    rmSync2(join2(pendingLaneDir(projectRoot, sessionId), PENDING_LANE_FILE), { force: true });
    rmSync2(join2(pendingLaneDir(projectRoot, sessionId), PENDING_KIND_FILE), { force: true });
    rmSync2(join2(pendingLaneDir(projectRoot, sessionId), PENDING_IMPACT_FILE), { force: true });
  } catch {
  }
}
function readPendingLane(projectRoot, sessionId) {
  try {
    const raw = readFileSync2(
      join2(pendingLaneDir(projectRoot, sessionId), PENDING_LANE_FILE),
      "utf8"
    ).trim().toLowerCase();
    return VALID_LANES.includes(raw) ? raw : null;
  } catch {
    return null;
  }
}
var PENDING_KIND_FILE = ".pending-kind";
function writePendingKind(projectRoot, sessionId, kind) {
  const dir = pendingLaneDir(projectRoot, sessionId);
  mkdirSync(dir, { recursive: true });
  writeFileSync2(join2(dir, PENDING_KIND_FILE), kind, "utf8");
}
function readPendingKind(projectRoot, sessionId) {
  try {
    const raw = readFileSync2(
      join2(pendingLaneDir(projectRoot, sessionId), PENDING_KIND_FILE),
      "utf8"
    ).trim().toLowerCase();
    return raw === "fix" || raw === "other" ? raw : null;
  } catch {
    return null;
  }
}
var PENDING_IMPACT_FILE = ".pending-impact";
function writePendingImpact(projectRoot, sessionId, impact) {
  const dir = pendingLaneDir(projectRoot, sessionId);
  mkdirSync(dir, { recursive: true });
  writeFileSync2(
    join2(dir, PENDING_IMPACT_FILE),
    JSON.stringify({ database_impact: impact.database_impact, api_impact: impact.api_impact }),
    "utf8"
  );
}
function readPendingImpact(projectRoot, sessionId) {
  try {
    const raw = JSON.parse(
      readFileSync2(join2(pendingLaneDir(projectRoot, sessionId), PENDING_IMPACT_FILE), "utf8")
    );
    const database = DATABASE_IMPACTS.find((value) => value === raw.database_impact);
    const api = API_IMPACTS.find((value) => value === raw.api_impact);
    return database !== void 0 && api !== void 0 ? { database_impact: database, api_impact: api } : null;
  } catch {
    return null;
  }
}

// src/stage-evidence/recorder.ts
function openStageEvidence(projectRoot, ctx) {
  const sessionId = resolveSessionId(projectRoot, ctx.sessionId);
  const lane = ctx.lane !== void 0 ? ctx.lane : sessionLane(projectRoot, sessionId);
  const kind = readPendingKind(projectRoot, sessionId);
  const dirName = openFeatureChange(projectRoot, sessionId, {
    adapter: ctx.adapter,
    lane: lane ?? null,
    ...kind !== null ? { kind } : {},
    title: ctx.title,
    issue: ctx.issue,
    now: ctx.now
  });
  return { sessionId, dirName, changeKey: dirName };
}
function sessionLane(projectRoot, sessionId) {
  return readPendingLane(projectRoot, sessionId) ?? readSessionControl(projectRoot, sessionId).lane;
}
function reattachSessionFeature(projectRoot, sessionId, ctx) {
  const branch = readGitState(projectRoot).branch ?? null;
  const own = sessionReattachableFeature(projectRoot, sessionId, branch);
  return own ? resumeFeatureByRef(projectRoot, sessionId, own, ctx.now) : null;
}
function resolveDirName(projectRoot, sessionId, ctx) {
  if (ctx.dirName) {
    return ctx.dirName;
  }
  const active = currentFeature(projectRoot, sessionId);
  if (active) {
    return active;
  }
  return reattachSessionFeature(projectRoot, sessionId, ctx) ?? openStageEvidence(projectRoot, ctx).dirName;
}
function startStage(projectRoot, stage, ctx) {
  if (!isKnownStage(stage)) {
    throw new Error(`Unknown stage "${stage}" \u2014 not in the feature-development registry.`);
  }
  const sessionId = resolveSessionId(projectRoot, ctx.sessionId);
  const dirName = resolveDirName(projectRoot, sessionId, ctx);
  return append(projectRoot, sessionId, dirName, ctx, {
    kind: "stage_start",
    stage,
    event_status: "started",
    evidence_source: "live-mark",
    ...ctx.agentId ? { agent_id: ctx.agentId } : {}
  });
}
function endStage(projectRoot, stage, input, ctx) {
  if (!isKnownStage(stage)) {
    throw new Error(`Unknown stage "${stage}" \u2014 not in the feature-development registry.`);
  }
  const sessionId = resolveSessionId(projectRoot, ctx.sessionId);
  const dirName = resolveDirName(projectRoot, sessionId, ctx);
  const artifactPaths = input.artifactPaths ?? [];
  const artifactDigest = artifactPaths.length > 0 ? hashArtifacts(projectRoot, artifactPaths) : null;
  const subjectDigest = stage === "development" ? input.subjectDigest ?? artifactDigest : input.subjectDigest ?? null;
  return append(projectRoot, sessionId, dirName, ctx, {
    kind: "stage_end",
    stage,
    event_status: "completed",
    evidence_source: "live-mark",
    artifact_paths: artifactPaths.length > 0 ? artifactPaths : null,
    artifact_digest: artifactDigest,
    subject_digest: subjectDigest,
    note: input.note ?? null
  });
}
function hashArtifacts(projectRoot, artifactPaths) {
  let anyReal = false;
  const perFile = [...artifactPaths].sort().map((rel) => {
    const abs = join3(projectRoot, rel);
    let bytes;
    try {
      bytes = readFileSync3(abs);
    } catch {
      return `${rel}:absent`;
    }
    if (bytes.length === 0) {
      return `${rel}:empty`;
    }
    anyReal = true;
    return `${rel}:${createHash("sha256").update(bytes).digest("hex")}`;
  });
  if (!anyReal) return null;
  return `sha256-${createHash("sha256").update(perFile.join("\n")).digest("hex")}`;
}
function append(projectRoot, sessionId, dirName, ctx, fields) {
  recordChangeConstants(projectRoot, dirName, { adapter: ctx.adapter, lane: ctx.lane }, ctx.now);
  return appendFeatureStageRow(
    projectRoot,
    sessionId,
    dirName,
    {
      agent: ctx.agent ?? agentForWriter(ctx.adapter),
      ...ctx.sessionSource === void 0 ? {} : { session_source: ctx.sessionSource },
      ...fields
    },
    ctx.now
  );
}

// src/stage-evidence/live-writer.ts
function toRelativePosix(projectRoot, targetPath) {
  const rel = isAbsolute(targetPath) ? relative(projectRoot, targetPath) : targetPath;
  return rel.replace(/\\/g, "/").replace(/^\.\//, "");
}
function classifyStage(targetPath, projectRoot = "") {
  const p = projectRoot ? toRelativePosix(projectRoot, targetPath) : targetPath.replace(/\\/g, "/");
  if (p.startsWith(".paqad/") || p === "" || p.startsWith("../")) return null;
  if (p.startsWith("tests/") || /(^|\/)__tests__\//.test(p) || /\.(test|spec)\.[cm]?[jt]sx?$/.test(p)) {
    return "checks";
  }
  if (p.startsWith("docs/instructions/") || p.startsWith("specs/") || p.endsWith(".spec.md") || /feature-spec/.test(p)) {
    return "specification";
  }
  if (/^README/i.test(p) || /^CHANGELOG/i.test(p) || p.startsWith("docs/") || /\.md$/.test(p) && !p.includes("/")) {
    return "documentation_sync";
  }
  if (p.startsWith("src/") || p.startsWith("lib/") || p.startsWith("app/") || p.startsWith("scripts/") || p.startsWith("runtime/") || /\/src\//.test(p) || /\.(ts|tsx|js|jsx|mjs|cjs)$/.test(p)) {
    return "development";
  }
  return null;
}
function stagesWithKind(rows, kind) {
  const set = /* @__PURE__ */ new Set();
  for (const row of rows) {
    if (row.kind === kind && typeof row.stage === "string") set.add(row.stage);
  }
  return set;
}
function preCodeStagesRecorded(rows, lane) {
  const started = stagesWithKind(rows, "stage_start");
  return requiredPreCodeStages(lane).every((stage) => started.has(stage));
}
function stageIsOpen(rows, stage) {
  return startedAfterLastEnd(rows.filter((row) => row.stage === stage));
}
function liveEditStage(lane, classified) {
  return isLaneStage(lane, classified) ? classified : "development";
}
function liveStageToStart(rows, lane, classified) {
  if (!preCodeStagesRecorded(rows, lane)) return null;
  const stage = liveEditStage(lane, classified);
  return !isEditStage(stage) || stageIsOpen(rows, stage) ? null : stage;
}
function helperEditStage(agent, fileStage) {
  const helper = agent ? stageForAgentName(stripPluginAgentNamespace(agent)) : null;
  return helper ? helper : fileStage;
}
function recordLiveStageEdit(input) {
  const { projectRoot, targetPath, now } = input;
  const fileStage = classifyStage(targetPath, projectRoot);
  if (!fileStage) return null;
  const classified = helperEditStage(input.agent, fileStage);
  try {
    const sessionId = resolveSessionId(projectRoot, input.sessionId);
    const dirName = currentFeature(projectRoot, sessionId);
    const rows = dirName ? readFeatureStageUnit(projectRoot, dirName) : [];
    const recordedLane = dirName ? readChangeConstants(projectRoot, dirName, rows).lane : null;
    const lane = resolveEffectiveLane(projectRoot, targetPath, recordedLane);
    if (!preCodeStagesRecorded(rows, lane)) return null;
    const stage = liveEditStage(lane, classified);
    if (!liveStageToStart(rows, lane, classified)) return stage;
    const ctx = {
      sessionId,
      sessionSource: input.sessionId?.trim() ? "host" : void 0,
      dirName,
      adapter: input.adapter ?? "claude-code",
      agent: input.agent,
      now
    };
    for (const preCode of PRE_CODE_STAGES) {
      if (stageIsOpen(rows, preCode)) endStage(projectRoot, preCode, {}, ctx);
    }
    startStage(projectRoot, stage, ctx);
    return stage;
  } catch {
    return null;
  }
}
function recordLiveStageEdits(input) {
  const recorded = [];
  for (const targetPath of input.targetPaths) {
    const stage = recordLiveStageEdit({
      projectRoot: input.projectRoot,
      sessionId: input.sessionId,
      toolName: input.toolName,
      targetPath,
      adapter: input.adapter,
      agent: input.agent,
      now: input.now
    });
    if (stage && !recorded.includes(stage)) {
      recorded.push(stage);
    }
  }
  return recorded;
}
function closeOpenStagesForMarkedStart(projectRoot, targetStage, ctx) {
  const sessionId = resolveSessionId(projectRoot, ctx.sessionId);
  const dirName = currentFeature(projectRoot, sessionId);
  if (!dirName) return;
  const rows = readFeatureStageUnit(projectRoot, dirName);
  const started = stagesWithKind(rows, "stage_start");
  const ended = stagesWithKind(rows, "stage_end");
  const starter = stageAgentIdentity(ctx.agent ?? agentForWriter(ctx.adapter), ctx.agentId);
  const heldByAnother = new Set(
    liveStageAgents(rows).filter((hold) => startedByAnotherAgent(starter, hold)).map((hold) => hold.stage)
  );
  for (const row of rows) {
    if (row.kind !== "stage_start" || typeof row.stage !== "string") continue;
    const s = row.stage;
    if (s !== targetStage && started.has(s) && !ended.has(s) && !heldByAnother.has(s)) {
      ended.add(s);
      try {
        endStage(
          projectRoot,
          s,
          {},
          {
            sessionId,
            sessionSource: ctx.sessionSource,
            dirName,
            adapter: ctx.adapter,
            now: ctx.now
          }
        );
      } catch {
      }
    }
  }
}
function recordMarkedStage(projectRoot, input) {
  if (!isKnownStage(input.stage)) return false;
  const ctx = {
    sessionId: input.sessionId,
    sessionSource: input.sessionSource,
    adapter: input.adapter ?? "claude-code",
    agent: input.agent,
    now: input.now
  };
  const agentId = input.agentId?.trim() ? input.agentId.trim() : void 0;
  try {
    if (input.phase === "start" && input.title !== void 0) {
      const titled = titleActiveFeature(
        projectRoot,
        resolveSessionId(projectRoot, input.sessionId),
        input.title,
        input.issue,
        input.now
      );
      if (!titled) {
        openStageEvidence(projectRoot, { ...ctx, title: input.title, issue: input.issue });
      }
    }
    if (input.phase === "start") {
      closeOpenStagesForMarkedStart(projectRoot, input.stage, { ...ctx, agentId });
      startStage(projectRoot, input.stage, { ...ctx, ...agentId ? { agentId } : {} });
    } else {
      endStage(projectRoot, input.stage, { artifactPaths: input.artifactPaths ?? [] }, ctx);
    }
    return true;
  } catch {
    return false;
  }
}

export {
  writePendingLane,
  clearPendingLane,
  writePendingKind,
  writePendingImpact,
  readPendingImpact,
  resolveEffectiveLane,
  backfillFeatureSlug,
  titleActiveFeature,
  openStageEvidence,
  endStage,
  classifyStage,
  stagesWithKind,
  preCodeStagesRecorded,
  stageIsOpen,
  liveEditStage,
  liveStageToStart,
  helperEditStage,
  recordLiveStageEdit,
  recordLiveStageEdits,
  recordMarkedStage
};
