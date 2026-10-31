import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  readRawModuleMap
} from "./chunk-4QTKNLFO.js";
import {
  toPosixPath
} from "./chunk-4K4CM3QN.js";
import {
  appendFeatureStageRow,
  currentFeature,
  openFeatureChange,
  readFeatureStageUnit,
  recordChangeConstants,
  resumeFeatureByRef
} from "./chunk-NGQ7J6QB.js";
import {
  PRE_CODE_STAGES,
  STAGE_EVIDENCE_DOC_TYPE,
  agentForWriter,
  isEditStage,
  isKnownStage,
  isLaneStage,
  liveStageAgents,
  readChangeConstants,
  requiredPreCodeStages,
  sessionReattachableFeature,
  stageAgentIdentity,
  startedAfterLastEnd,
  startedByAnotherAgent
} from "./chunk-XD2HZBBD.js";
import {
  readGitState
} from "./chunk-AINYJ3Q2.js";
import {
  sessionLedgerDir
} from "./chunk-KAL2KZVN.js";
import {
  resolveSessionId
} from "./chunk-DNOGJOTT.js";
import {
  readSessionControl
} from "./chunk-XYQUJYH4.js";
import {
  isAbsolute,
  relative
} from "./chunk-3STC3IVL.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/stage-evidence/live-writer.ts
init_esm_shims();

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
import { readFileSync as readFileSync2 } from "fs";
import { join as join2 } from "path";

// src/stage-evidence/pending-lane.ts
init_esm_shims();
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { join } from "path";

// src/core/types/classification.ts
init_esm_shims();
var CLASSIFICATION_WORKFLOWS = [
  "project-question",
  "ticket-refinement",
  "writing",
  "editing",
  "planning",
  "research",
  "feature-development",
  "bug-fix",
  "refactor",
  "migration",
  "content-update",
  "investigation",
  "cleanup",
  "architecture-change",
  "test-improvement",
  "documentation-update",
  "module-documentation",
  "root-cause-analysis",
  "discovery",
  "pentest",
  "pentest-retest",
  "codebase-health",
  "health-retest",
  "site-map",
  "site-map-retest",
  "design-test",
  "design-retest",
  "rules-analyze",
  "rules-generate",
  "schema-change",
  "query-optimization",
  "custom"
];
var CLASSIFICATION_SCOPES = [
  "single-file",
  "single-module",
  "multi-module",
  "system-wide"
];
var CLASSIFICATION_CERTAINTY = ["well-defined", "partially-defined", "ambiguous"];
var CLASSIFICATION_OUTPUT_TYPES = [
  "code",
  "documentation",
  "analysis",
  "design",
  "report"
];
var DATABASE_IMPACTS = [
  "none",
  "additive-only",
  "schema-change",
  "data-migration",
  "query-change"
];
var UI_IMPACTS = [
  "none",
  "minor-tweak",
  "new-component",
  "new-screen",
  "redesign"
];
var API_IMPACTS = [
  "none",
  "additive-endpoint",
  "modified-endpoint",
  "breaking-change"
];
var COMPLIANCE_SENSITIVITY_LEVELS = ["none", "low", "high"];
var CUSTOMER_FACING_IMPACTS = ["internal", "customer-visible"];
var REVERSIBILITY_LEVELS = ["easily-reversible", "difficult", "irreversible"];
var DATA_SENSITIVITY_LEVELS = ["none", "pii", "financial", "health"];
var TARGET_CAPABILITIES = ["content", "coding", "security", "mixed"];
var WORKFLOW_SOURCES = ["routing-skill", "active-session", "none"];
var RESOLUTION_SOURCES = [
  "deterministic",
  "deterministic:mcp",
  "deterministic:rag",
  "deterministic:graph",
  "deterministic:manifest",
  "llm-confirmed",
  "llm-overridden",
  "llm-guessed",
  "health-override",
  "history-corrected",
  "defect-floor",
  "session-resume",
  "default"
];
var CONTEXT_BUDGET_HINTS = ["minimal", "standard", "deep"];

// src/stage-evidence/pending-lane.ts
var PENDING_LANE_FILE = ".pending-lane";
var VALID_LANES = ["fast", "graduated", "full"];
function pendingLaneDir(projectRoot, sessionId) {
  return join(projectRoot, sessionLedgerDir(STAGE_EVIDENCE_DOC_TYPE, sessionId));
}
function writePendingLane(projectRoot, sessionId, lane) {
  if (lane === null) {
    return;
  }
  const dir = pendingLaneDir(projectRoot, sessionId);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, PENDING_LANE_FILE), lane, "utf8");
}
function clearPendingLane(projectRoot, sessionId) {
  try {
    rmSync(join(pendingLaneDir(projectRoot, sessionId), PENDING_LANE_FILE), { force: true });
    rmSync(join(pendingLaneDir(projectRoot, sessionId), PENDING_KIND_FILE), { force: true });
    rmSync(join(pendingLaneDir(projectRoot, sessionId), PENDING_IMPACT_FILE), { force: true });
  } catch {
  }
}
function readPendingLane(projectRoot, sessionId) {
  try {
    const raw = readFileSync(
      join(pendingLaneDir(projectRoot, sessionId), PENDING_LANE_FILE),
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
  writeFileSync(join(dir, PENDING_KIND_FILE), kind, "utf8");
}
function readPendingKind(projectRoot, sessionId) {
  try {
    const raw = readFileSync(
      join(pendingLaneDir(projectRoot, sessionId), PENDING_KIND_FILE),
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
  writeFileSync(
    join(dir, PENDING_IMPACT_FILE),
    JSON.stringify({ database_impact: impact.database_impact, api_impact: impact.api_impact }),
    "utf8"
  );
}
function readPendingImpact(projectRoot, sessionId) {
  try {
    const raw = JSON.parse(
      readFileSync(join(pendingLaneDir(projectRoot, sessionId), PENDING_IMPACT_FILE), "utf8")
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
    const abs = join2(projectRoot, rel);
    let bytes;
    try {
      bytes = readFileSync2(abs);
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
function recordLiveStageEdit(input) {
  const { projectRoot, targetPath, now } = input;
  const classified = classifyStage(targetPath, projectRoot);
  if (!classified) return null;
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
      openStageEvidence(projectRoot, { ...ctx, title: input.title, issue: input.issue });
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
  CLASSIFICATION_WORKFLOWS,
  CLASSIFICATION_SCOPES,
  CLASSIFICATION_CERTAINTY,
  CLASSIFICATION_OUTPUT_TYPES,
  DATABASE_IMPACTS,
  UI_IMPACTS,
  API_IMPACTS,
  COMPLIANCE_SENSITIVITY_LEVELS,
  CUSTOMER_FACING_IMPACTS,
  REVERSIBILITY_LEVELS,
  DATA_SENSITIVITY_LEVELS,
  TARGET_CAPABILITIES,
  WORKFLOW_SOURCES,
  RESOLUTION_SOURCES,
  CONTEXT_BUDGET_HINTS,
  writePendingLane,
  clearPendingLane,
  writePendingKind,
  writePendingImpact,
  readPendingImpact,
  resolveEffectiveLane,
  openStageEvidence,
  endStage,
  classifyStage,
  stagesWithKind,
  preCodeStagesRecorded,
  stageIsOpen,
  liveEditStage,
  liveStageToStart,
  recordLiveStageEdit,
  recordLiveStageEdits,
  recordMarkedStage
};
