import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  changeOwnTickets,
  computeCommitSplit
} from "./chunk-QUDDQGFY.js";
import {
  BACKSTOP_WRITER,
  COMPLETION_DEFERRED_KIND,
  ENVELOPE_HEADER_PROPERTIES,
  ORCHESTRATOR_AGENT,
  RECORD_REPAIR_KIND,
  SPEC_CORRECTION_KIND,
  SPEC_STEP_KIND,
  SPEC_STEP_OUTCOMES,
  STAGE_AGENT_KIND,
  STAGE_EVIDENCE_DOC_TYPE,
  STAGE_EVIDENCE_SCHEMA_VERSION,
  STAGE_FAMILY_KIND_LIST,
  UNTITLED_FEATURE_TITLE,
  adoptableInFlightOnBranch,
  augmentWithBundleArtifacts,
  buildDocumentEnvelope,
  foldRowsWithKey,
  heldInFlightOnBranch,
  isBundleClosed,
  isBundleMaterialized,
  isFeatureFinished,
  listFeatureDirs,
  mintFeatureDirName,
  readChangeConstants,
  readFeatureRecord,
  reconcileSessionControl,
  seedFeatureRecord,
  stampBundleRow,
  updateFeatureRecord
} from "./chunk-XD2HZBBD.js";
import {
  forkBranchOf,
  readGitState
} from "./chunk-AINYJ3Q2.js";
import {
  STAGE_EFFORT_LEVELS,
  STAGE_MODELS,
  require_ajv
} from "./chunk-FY3IONGX.js";
import {
  appendStampedRowToUnit,
  readUnitFile
} from "./chunk-KAL2KZVN.js";
import {
  resolveSessionId
} from "./chunk-DNOGJOTT.js";
import {
  featureChangeKey,
  featureFilePath,
  markDone,
  parseFeatureDirName,
  readSessionControl,
  resumeFeature,
  setActiveFeature
} from "./chunk-XYQUJYH4.js";
import {
  dirname,
  join
} from "./chunk-3STC3IVL.js";
import {
  __toESM,
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/feature-evidence/delivery.ts
init_esm_shims();
import { execFileSync as execFileSync2 } from "child_process";
import { mkdirSync as mkdirSync2, readFileSync as readFileSync3, renameSync as renameSync2, writeFileSync as writeFileSync2 } from "fs";
import { dirname as dirname2, join as join3 } from "path";

// src/pipeline/git-paths.ts
init_esm_shims();
import { execFileSync } from "child_process";
import { createHash } from "crypto";
import { readFileSync } from "fs";
import { join as join2 } from "path";
var DELETED_AT_START = "deleted";
function gitPathList(projectRoot, args) {
  try {
    return execFileSync("git", args, {
      cwd: projectRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      timeout: 5e3,
      maxBuffer: 16 * 1024 * 1024
    }).split("\0").filter((entry) => entry.length > 0);
  } catch {
    return null;
  }
}
function digestWorkingFile(projectRoot, relativePath) {
  try {
    return createHash("sha256").update(readFileSync(join2(projectRoot, relativePath))).digest("hex");
  } catch {
    return null;
  }
}
function changedFilesSince(projectRoot, start) {
  const diff = gitPathList(projectRoot, ["diff", "--name-only", "--relative", "-z", start.commit]);
  const untracked = gitPathList(projectRoot, ["ls-files", "--others", "--exclude-standard", "-z"]);
  if (diff === null || untracked === null) return null;
  const merged = start.mergedBase ? gitPathList(projectRoot, ["diff", "--name-only", "--relative", "-z", start.mergedBase]) : null;
  if (start.mergedBase && merged === null) return null;
  const differsFromBase = merged ? new Set(merged) : null;
  const worktree = start.worktree ?? {};
  return [
    .../* @__PURE__ */ new Set([
      ...diff.filter((path) => !differsFromBase || differsFromBase.has(path)),
      ...untracked
    ])
  ].map((path) => path.replace(/\\/g, "/")).filter((path) => !isPaqadArtifactPath(path)).filter((path) => {
    const atStart = worktree[path];
    return atStart === void 0 || (digestWorkingFile(projectRoot, path) ?? DELETED_AT_START) !== atStart;
  }).sort();
}
function isPaqadArtifactPath(filePath) {
  const normalized = filePath.replace(/\\/g, "/");
  return normalized === ".paqad" || normalized.startsWith(".paqad/") || normalized.includes("/.paqad/");
}

// src/feature-evidence/bundle-document.ts
init_esm_shims();
import { mkdirSync, readFileSync as readFileSync2, renameSync, writeFileSync } from "fs";
var UNKNOWN_DOCUMENT_SESSION = "unknown";
function documentSessionId(projectRoot, dirName, sessionId) {
  const given = sessionId?.trim();
  if (given) return given;
  return readFeatureRecord(projectRoot, dirName)?.session_id ?? UNKNOWN_DOCUMENT_SESSION;
}
function stampFeatureDocument(input) {
  return buildDocumentEnvelope({
    docType: input.docType,
    change: featureChangeKey(input.dirName),
    sessionId: documentSessionId(input.projectRoot, input.dirName, input.sessionId),
    schemaVersion: input.schemaVersion,
    now: input.now,
    body: input.body
  });
}
function readFeatureIndexEntries(projectRoot, dirName, file, key) {
  try {
    const parsed = JSON.parse(
      readFileSync2(join(projectRoot, featureFilePath(dirName, file)), "utf8")
    );
    return Array.isArray(parsed[key]) ? parsed[key] : null;
  } catch {
    return null;
  }
}
function writeFeatureIndexDocument(input) {
  const rel = featureFilePath(input.dirName, input.file);
  const current = readFeatureIndexEntries(
    input.projectRoot,
    input.dirName,
    input.file,
    input.key
  );
  if (current === null && input.entries.length === 0) {
    return { path: null, written: false };
  }
  if (current !== null && JSON.stringify(current) === JSON.stringify(input.entries)) {
    return { path: rel, written: false };
  }
  const doc = stampFeatureDocument({
    projectRoot: input.projectRoot,
    dirName: input.dirName,
    docType: input.docType,
    schemaVersion: input.schemaVersion,
    sessionId: input.sessionId,
    body: { [input.key]: input.entries },
    now: input.now
  });
  const abs = join(input.projectRoot, rel);
  mkdirSync(dirname(abs), { recursive: true });
  const tmp = `${abs}.tmp-${process.pid}`;
  writeFileSync(tmp, `${JSON.stringify(doc, null, 2)}
`, "utf8");
  renameSync(tmp, abs);
  return { path: rel, written: true };
}

// src/feature-evidence/delivery.ts
var DELIVERY_DOC_TYPE = "paqad.delivery";
var DELIVERY_SCHEMA_VERSION = 2;
function emptyCommitDecision() {
  return { asked: false, answer: null, recorded_at: null };
}
function emptyDelivery() {
  return {
    schema_version: DELIVERY_SCHEMA_VERSION,
    doc_type: DELIVERY_DOC_TYPE,
    commits: [],
    head_sha: null,
    merge_commit: null,
    commit_decision: emptyCommitDecision(),
    last_link_attempt: null
  };
}
function isDelivery(value) {
  if (typeof value !== "object" || value === null) return false;
  const r = value;
  return r.doc_type === DELIVERY_DOC_TYPE && Array.isArray(r.commits);
}
function atomicWriteJson(absPath, value) {
  mkdirSync2(dirname2(absPath), { recursive: true });
  const tmp = `${absPath}.tmp`;
  writeFileSync2(tmp, `${JSON.stringify(value, null, 2)}
`, "utf8");
  renameSync2(tmp, absPath);
}
function readFeatureDelivery(projectRoot, dirName) {
  try {
    const parsed = JSON.parse(
      readFileSync3(join3(projectRoot, featureFilePath(dirName, "delivery")), "utf8")
    );
    if (isDelivery(parsed)) return parsed;
  } catch {
  }
  return emptyDelivery();
}
function writeFeatureDelivery(projectRoot, dirName, record, recordedAt, sessionId) {
  if (record.branch || record.base_branch) {
    const current = readFeatureRecord(projectRoot, dirName);
    recordBranch(
      projectRoot,
      dirName,
      current?.branch ? null : record.branch,
      current?.base_branch ? null : record.base_branch
    );
  }
  const stamped = stampFeatureDocument({
    projectRoot,
    dirName,
    docType: DELIVERY_DOC_TYPE,
    schemaVersion: DELIVERY_SCHEMA_VERSION,
    sessionId,
    now: recordedAt === void 0 ? void 0 : () => new Date(recordedAt),
    body: {
      commits: record.commits,
      head_sha: record.head_sha,
      merge_commit: record.merge_commit,
      commit_decision: record.commit_decision ?? emptyCommitDecision(),
      last_link_attempt: record.last_link_attempt ?? null,
      start_commit: record.start_commit ?? null,
      ...record.start_worktree ? { start_worktree: record.start_worktree } : {},
      ...record.start_worktree_truncated ? { start_worktree_truncated: true } : {},
      commit_split: record.commit_split ?? null,
      push: record.push ?? null,
      pr: record.pr ?? null,
      ci: record.ci ?? null,
      ...record.ci_read ? { ci_read: record.ci_read } : {}
    }
  });
  atomicWriteJson(join3(projectRoot, featureFilePath(dirName, "delivery")), stamped);
  return stamped;
}
function featureDeliveryBranch(projectRoot, dirName) {
  return readChangeConstants(projectRoot, dirName).branch ?? readFeatureDelivery(projectRoot, dirName).branch ?? null;
}
function recordBranch(projectRoot, dirName, branch, baseBranch) {
  const patch = {};
  if (branch) patch.branch = branch;
  if (baseBranch) patch.base_branch = baseBranch;
  if (Object.keys(patch).length > 0) {
    updateFeatureRecord(projectRoot, dirName, patch);
  }
}
function refreshCommitSplit(projectRoot, dirName, record) {
  try {
    const feature = readFeatureRecord(projectRoot, dirName);
    const fork = forkBranchOf(projectRoot, readGitState(projectRoot).branch);
    record.commit_split = computeCommitSplit(projectRoot, {
      baseBranch: fork ?? feature?.base_branch ?? void 0,
      startCommit: record.start_commit ?? null,
      ownTickets: changeOwnTickets(feature?.issue, feature?.branch ?? null)
    });
  } catch {
  }
  return record;
}
function seedFeatureDelivery(projectRoot, dirName, input) {
  const record = readFeatureDelivery(projectRoot, dirName);
  record.commit_decision = record.commit_decision ?? emptyCommitDecision();
  if (!record.start_commit && input.startCommit) {
    record.start_commit = input.startCommit;
    const worktree = captureStartWorktree(projectRoot);
    if (worktree) {
      record.start_worktree = worktree.files;
      if (worktree.truncated) record.start_worktree_truncated = true;
    }
  }
  refreshCommitSplit(projectRoot, dirName, record);
  return writeFeatureDelivery(projectRoot, dirName, record, input.recordedAt, input.sessionId);
}
var START_WORKTREE_CAP = 2e3;
function captureStartWorktree(projectRoot) {
  const changed = gitPathList(projectRoot, ["diff", "--name-only", "--relative", "-z", "HEAD"]);
  const untracked = gitPathList(projectRoot, ["ls-files", "--others", "--exclude-standard", "-z"]);
  if (changed === null || untracked === null) return null;
  const paths = [.../* @__PURE__ */ new Set([...changed, ...untracked])].filter((path) => !isPaqadArtifactPath(path)).sort();
  const files = {};
  for (const path of paths.slice(0, START_WORKTREE_CAP)) {
    files[path] = digestWorkingFile(projectRoot, path) ?? DELETED_AT_START;
  }
  return { files, truncated: paths.length > START_WORKTREE_CAP };
}
function readChangeStartPoint(projectRoot, dirName, fallbackBase) {
  const delivery = readFeatureDelivery(projectRoot, dirName);
  const worktree = delivery.start_worktree ?? null;
  const start = delivery.start_commit ?? null;
  const state = readGitState(projectRoot, fallbackBase ? { baseBranch: fallbackBase } : {});
  const fork = forkBranchOf(projectRoot, state.branch);
  if (start && git(projectRoot, ["merge-base", "--is-ancestor", start, "HEAD"]) !== void 0) {
    const merged = latestMergedBase(projectRoot, start, state.head_commit, [
      fork,
      state.base_branch
    ]);
    return {
      commit: merged.after ?? start,
      source: "start_commit",
      base: null,
      worktree,
      mergedBase: merged.after ? null : merged.beside
    };
  }
  const forkPoint = fork ? git(projectRoot, ["merge-base", "HEAD", fork]) : void 0;
  if (fork && forkPoint) {
    return { commit: forkPoint, source: "fork-point", base: fork, worktree };
  }
  if (state.base_commit) {
    return {
      commit: state.base_commit,
      source: "fallback-base",
      base: state.base_branch ?? null,
      worktree
    };
  }
  return null;
}
function latestMergedBase(projectRoot, start, head, bases) {
  const descends = (older, newer) => git(projectRoot, ["merge-base", "--is-ancestor", older, newer]) !== void 0;
  const latest = { after: null, beside: null };
  for (const base of new Set(bases.filter((name) => Boolean(name)))) {
    const point = git(projectRoot, ["merge-base", "HEAD", base]);
    if (!point || point === start || point === head || descends(point, start)) continue;
    const slot = descends(start, point) ? "after" : "beside";
    const current = latest[slot];
    if (current === null || descends(current, point)) latest[slot] = point;
  }
  return latest;
}
function setCommitDecision(projectRoot, dirName, answer, recordedAt) {
  const record = readFeatureDelivery(projectRoot, dirName);
  record.commit_decision = { asked: answer !== "user-requested", answer, recorded_at: recordedAt };
  return writeFeatureDelivery(projectRoot, dirName, record, recordedAt);
}
function recordLinkAttempt(projectRoot, dirName, reason, capturedAt) {
  const record = readFeatureDelivery(projectRoot, dirName);
  record.last_link_attempt = `${capturedAt}: ${reason}`;
  return writeFeatureDelivery(projectRoot, dirName, record, capturedAt);
}
function git(projectRoot, args) {
  try {
    return execFileSync2("git", args, {
      cwd: projectRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
  } catch {
    return void 0;
  }
}
var FIELD_SEPARATOR = String.fromCharCode(31);
function commitsSinceBase(projectRoot, baseRef, headRef = "HEAD") {
  const range = baseRef ? `${baseRef}..${headRef}` : headRef;
  const out = git(projectRoot, ["log", range, "--format=%H%x1f%s"]);
  if (!out) return [];
  return out.split("\n").filter(Boolean).map((line) => {
    const [sha, ...rest] = line.split(FIELD_SEPARATOR);
    return { sha, subject: rest.join(FIELD_SEPARATOR) };
  });
}
function reconcileDeliveryFromGit(projectRoot, dirName, capturedAt, options = {}) {
  const state = readGitState(projectRoot, { baseBranch: options.baseBranch });
  const record = readFeatureDelivery(projectRoot, dirName);
  const seen = new Set(record.commits.map((c) => c.sha));
  for (const commit of commitsSinceBase(projectRoot, state.base_branch)) {
    if (!seen.has(commit.sha)) {
      record.commits.push(commit);
      seen.add(commit.sha);
    }
  }
  recordBranch(projectRoot, dirName, state.branch, state.base_branch);
  record.head_sha = state.head_commit ?? record.head_sha;
  refreshCommitSplit(projectRoot, dirName, record);
  return writeFeatureDelivery(projectRoot, dirName, record, capturedAt);
}
function stampMergeCommit(projectRoot, dirName, mergeSha, capturedAt) {
  const record = readFeatureDelivery(projectRoot, dirName);
  record.merge_commit = mergeSha;
  return writeFeatureDelivery(projectRoot, dirName, record, capturedAt);
}
function resolveDeliveryFeatureByBranch(projectRoot, branch, activeDirName) {
  const matches = listFeatureDirs(projectRoot).filter(
    (dirName) => featureDeliveryBranch(projectRoot, dirName) === branch
  );
  if (matches.length === 0) return null;
  if (activeDirName && matches.includes(activeDirName)) return activeDirName;
  const newest = (dirs) => [...dirs].sort((x, y) => featureChangeKey(x).localeCompare(featureChangeKey(y))).at(-1) ?? null;
  const notDone = matches.filter(
    (dirName) => !isFeatureFinished(readFeatureRecord(projectRoot, dirName)?.status)
  );
  return newest(notDone.length > 0 ? notDone : matches);
}
function recordCommitForBranch(projectRoot, active, commit, capturedAt) {
  const branch = git(projectRoot, ["branch", "--show-current"]);
  const dirName = (branch ? resolveDeliveryFeatureByBranch(projectRoot, branch, active) : null) ?? active;
  if (!dirName) return null;
  const record = readFeatureDelivery(projectRoot, dirName);
  if (featureDeliveryBranch(projectRoot, dirName) === null) {
    recordBranch(projectRoot, dirName, branch);
  }
  if (!record.commits.some((c) => c.sha === commit.sha)) {
    record.commits.push(commit);
  }
  record.head_sha = commit.sha;
  refreshCommitSplit(projectRoot, dirName, record);
  writeFeatureDelivery(projectRoot, dirName, record, capturedAt);
  return dirName;
}
var CI_RANK = { pass: 2, fail: 2, pending: 1, unknown: 0 };
function definedFields(patch) {
  return Object.fromEntries(
    Object.entries(patch).filter(([, value]) => value !== void 0)
  );
}
function mergeCi(previous, next) {
  if (!previous || previous.sha !== next.sha) return next;
  if (CI_RANK[next.state] < CI_RANK[previous.state]) return previous;
  return { ...previous, ...definedFields(next) };
}
function readingIsOlder(record, readAt) {
  if (readAt === void 0) return false;
  const started = Date.parse(readAt);
  return [record.pr?.at, record.ci?.at].some(
    (stored) => stored !== void 0 && Date.parse(stored) > started
  );
}
function recordShip(projectRoot, dirName, patch, at) {
  const record = readFeatureDelivery(projectRoot, dirName);
  const stale = readingIsOlder(record, patch.read_at);
  if (patch.push)
    record.push = { ...record.push, ...definedFields(patch.push), at };
  if (patch.ci_read) record.ci_read = { ...patch.ci_read, at };
  if (patch.pr && !stale) {
    record.pr = {
      number: null,
      url: null,
      draft: null,
      ...record.pr,
      ...definedFields(patch.pr),
      first_at: record.pr?.first_at ?? record.pr?.at ?? at,
      at
    };
  }
  if (patch.ci && !stale) record.ci = mergeCi(record.ci, { ...patch.ci, at });
  return writeFeatureDelivery(projectRoot, dirName, record, at);
}

// src/feature-evidence/stage-ledger.ts
init_esm_shims();
import { readFileSync as readFileSync4 } from "fs";
import { join as join4 } from "path";

// src/stage-evidence/schema.ts
init_esm_shims();
var import_ajv = __toESM(require_ajv(), 1);
var nullableString = { type: ["string", "null"] };
var ROW_PROPERTIES = {
  stage: nullableString,
  event_status: {
    type: ["string", "null"],
    enum: ["started", "completed", "skipped", "failed", "redone", "inferred", null]
  },
  evidence_source: {
    type: ["string", "null"],
    enum: ["live-mark", "inferred-artifact", "inferred-git", "redo", null]
  },
  artifact_paths: { type: ["array", "null"], items: { type: "string" } },
  artifact_digest: nullableString,
  subject_digest: nullableString,
  agent: { type: "string", minLength: 1 },
  session_source: { type: ["string", "null"], enum: ["host", "env", "cache", null] },
  note: nullableString
};
var STAGE_EVIDENCE_SCHEMA = {
  $id: "paqad://schemas/stage-evidence.json",
  type: "object",
  additionalProperties: false,
  required: [
    "schema_version",
    "doc_type",
    "change",
    "session_id",
    "recorded_at",
    "content_hash",
    "kind",
    "agent"
  ],
  properties: {
    ...ENVELOPE_HEADER_PROPERTIES,
    schema_version: { type: "integer", const: STAGE_EVIDENCE_SCHEMA_VERSION },
    doc_type: { const: STAGE_EVIDENCE_DOC_TYPE },
    kind: {
      enum: [
        ...STAGE_FAMILY_KIND_LIST,
        STAGE_AGENT_KIND,
        SPEC_STEP_KIND,
        SPEC_CORRECTION_KIND,
        COMPLETION_DEFERRED_KIND,
        RECORD_REPAIR_KIND
      ]
    },
    ...ROW_PROPERTIES,
    reason: { type: "string", minLength: 1 },
    tasks: { type: "integer", minimum: 0 },
    agent_id: { type: "string", minLength: 1 },
    stages: { type: "array", items: { type: "string", minLength: 1 } },
    host_pid: { type: "integer", minimum: 1 },
    releases: { type: "array", items: { type: "string", minLength: 1 } },
    tokens_used: { type: "integer", minimum: 0 },
    tokens_not_recarried: { type: "integer", minimum: 0 },
    estimate: { type: "boolean" },
    requested_effort: { enum: STAGE_EFFORT_LEVELS },
    requested_model: { enum: STAGE_MODELS },
    step: { type: "string", minLength: 1 },
    outcome: { enum: SPEC_STEP_OUTCOMES },
    artifact_hash: { type: "string" },
    tokens: { type: "integer", minimum: 0 },
    spec_id: { type: "string", minLength: 1 },
    changed_sections: { type: "array", items: { type: "string" } }
  },
  allOf: [
    {
      if: { properties: { kind: { const: STAGE_AGENT_KIND } }, required: ["kind"] },
      then: { required: ["stage", "tokens_used", "tokens_not_recarried", "estimate"] }
    },
    {
      if: { properties: { kind: { const: SPEC_STEP_KIND } }, required: ["kind"] },
      then: { required: ["step", "outcome", "artifact_hash"] }
    },
    {
      if: { properties: { kind: { const: SPEC_CORRECTION_KIND } }, required: ["kind"] },
      then: { required: ["spec_id", "changed_sections"] }
    },
    {
      if: { properties: { kind: { const: COMPLETION_DEFERRED_KIND } }, required: ["kind"] },
      then: { required: ["reason", "tasks"] }
    },
    {
      if: { properties: { kind: { const: RECORD_REPAIR_KIND } }, required: ["kind"] },
      then: { required: ["reason"] }
    }
  ]
};
var STAGE_EVIDENCE_SCHEMA_V1 = {
  $id: "paqad://schemas/stage-evidence-v1.json",
  type: "object",
  additionalProperties: false,
  required: [
    "schema_version",
    "doc_type",
    "kind",
    "session_id",
    "conversation_ordinal",
    "ts",
    "adapter",
    "agent",
    "content_hash"
  ],
  properties: {
    schema_version: { type: "integer", const: 1 },
    doc_type: { const: STAGE_EVIDENCE_DOC_TYPE },
    session_id: { type: "string", minLength: 1 },
    conversation_ordinal: { type: "integer", minimum: 1 },
    ts: { type: "string", minLength: 1 },
    content_hash: { type: "string", minLength: 1 },
    kind: { enum: STAGE_FAMILY_KIND_LIST },
    ...ROW_PROPERTIES,
    adapter: { type: "string", minLength: 1 },
    lane: { type: ["string", "null"], enum: ["fast", "graduated", "full", null] },
    branch: nullableString
  }
};
var ajv = new import_ajv.default({ allErrors: true, allowUnionTypes: true });
var compiled;
function validator(row) {
  compiled ??= {
    current: ajv.compile(STAGE_EVIDENCE_SCHEMA),
    v1: ajv.compile(STAGE_EVIDENCE_SCHEMA_V1)
  };
  const version = row?.schema_version;
  return version === 1 ? compiled.v1 : compiled.current;
}
function formatValidationError(error) {
  return `${error.instancePath || "(root)"} ${error.message ?? "invalid"}`;
}
function validateStageEvidenceRow(row) {
  const validate = validator(row);
  if (validate(row)) {
    return [];
  }
  const errors = validate.errors;
  return errors.map(formatValidationError);
}

// src/feature-evidence/stage-ledger.ts
function resolveActiveFeature(projectRoot, sessionId, input = {}) {
  if (input.title !== void 0) {
    return mintAndActivate(projectRoot, sessionId, input.title, input);
  }
  const active = reconcileSessionControl(projectRoot, sessionId, input.now);
  if (active) {
    return active;
  }
  const inFlight = adoptableInFlightOnBranch(projectRoot, sessionId, input.now);
  if (inFlight.length >= 2) {
    throw new Error(
      `stage isolation: ${inFlight.length} in-flight feature bundles on this branch (${inFlight.join(", ")}) \u2014 a change must keep one identity, so paqad will not mint a third. Close or finish the extra bundle(s), or pass an explicit change (stage start --title \u2026), before continuing.`
    );
  }
  if (inFlight.length === 0) {
    const held = heldInFlightOnBranch(projectRoot, sessionId, input.now);
    if (held.length > 0) {
      const running = held.map((h) => `${h.dirName} (stage ${h.stage})`).join(", ");
      throw new Error(
        `another session is running a stage in the change on this branch: ${running}. paqad will not take that change over or write into it. Pass --title "<what you are building>" to stage start to open this session's own change.`
      );
    }
  }
  return mintAndActivate(projectRoot, sessionId, UNTITLED_FEATURE_TITLE, input);
}
function mintAndActivate(projectRoot, sessionId, title, input) {
  const minted = mintFeatureDirName({
    title,
    issue: input.issue,
    ulid: input.ulid,
    ulidSeed: input.ulidSeed
  });
  setActiveFeature(projectRoot, sessionId, minted.dirName, { lane: input.lane, now: input.now });
  return minted.dirName;
}
function featureStagePath(dirName) {
  return featureFilePath(dirName, "stageEvidence");
}
function appendFeatureStageRow(projectRoot, sessionId, dirName, row, now) {
  const stamped = stampBundleRow({
    docType: STAGE_EVIDENCE_DOC_TYPE,
    change: featureChangeKey(dirName),
    sessionId,
    schemaVersion: STAGE_EVIDENCE_SCHEMA_VERSION,
    row: { ...row, agent: row.agent ?? ORCHESTRATOR_AGENT },
    validate: (r) => validateStageEvidenceRow(r),
    now
  });
  appendStampedRowToUnit(projectRoot, featureStagePath(dirName), stamped);
  return stamped;
}
function recordChangeConstants(projectRoot, dirName, input, now) {
  const patch = {};
  if (input.adapter && input.adapter !== BACKSTOP_WRITER) patch.adapter = input.adapter;
  if (input.lane) patch.lane = input.lane;
  if (input.lane && input.laneSource) patch.laneSource = input.laneSource;
  if (input.branch) patch.branch = input.branch;
  if (input.baseBranch) patch.base_branch = input.baseBranch;
  if (input.kind) patch.kind = input.kind;
  if (Object.keys(patch).length > 0) {
    updateFeatureRecord(projectRoot, dirName, patch, now);
  }
}
function readFeatureStageUnit(projectRoot, dirName) {
  return readUnitFile(projectRoot, featureStagePath(dirName));
}
function foldFeature(projectRoot, sessionId, dirName) {
  const rows = readFeatureStageUnit(projectRoot, dirName);
  const fold = foldRowsWithKey(rows, {
    sessionId,
    changeKey: dirName,
    promptOrdinal: 0,
    lane: readChangeConstants(projectRoot, dirName, rows).lane
  });
  return augmentWithBundleArtifacts(fold, {
    plan: bundleFileNonEmpty(projectRoot, dirName, "plan"),
    specification: bundleFileNonEmpty(projectRoot, dirName, "specification")
  });
}
function recordedLaneOrFull(projectRoot, sessionId, dirName) {
  if (!dirName) return "full";
  try {
    return foldFeature(projectRoot, sessionId, dirName).lane ?? "full";
  } catch {
    return "full";
  }
}
function bundleFileNonEmpty(projectRoot, dirName, file) {
  try {
    return readFileSync4(join4(projectRoot, featureFilePath(dirName, file))).length > 0;
  } catch {
    return false;
  }
}
function currentFeature(projectRoot, sessionId, now) {
  return reconcileSessionControl(projectRoot, sessionId, now);
}
function resolveActiveChange(projectRoot, hint) {
  const sessionId = resolveSessionId(
    projectRoot,
    hint ?? process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? null
  );
  const dirName = currentFeature(projectRoot, sessionId);
  return dirName ? { dirName, sessionId, key: featureChangeKey(dirName) } : null;
}
function activeChangeKey(projectRoot, hint) {
  return resolveActiveChange(projectRoot, hint)?.key ?? null;
}
function peekActiveChangeKey(projectRoot, hint) {
  const sessionId = (hint ?? process.env.SE_SESSION ?? process.env.CLAUDE_SESSION_ID ?? "").trim();
  if (sessionId === "") return null;
  const active = readSessionControl(projectRoot, sessionId).active;
  if (active === null || !isBundleMaterialized(projectRoot, active)) return null;
  if (isBundleClosed(projectRoot, active)) return null;
  return featureChangeKey(active);
}
function openFeatureChange(projectRoot, sessionId, input) {
  const dirName = resolveActiveFeature(projectRoot, sessionId, input);
  const gitState = readGitState(projectRoot);
  const seeded = seedFeatureRecord(projectRoot, dirName, {
    adapter: input.adapter,
    sessionId,
    lane: input.lane ?? null,
    branch: gitState.branch ?? null,
    baseBranch: gitState.base_branch ?? null,
    kind: input.kind,
    now: input.now
  });
  if (seeded) {
    recordChangeConstants(
      projectRoot,
      dirName,
      {
        adapter: input.adapter,
        lane: input.lane ?? null,
        branch: gitState.branch ?? null,
        baseBranch: gitState.base_branch ?? null,
        kind: input.kind
      },
      input.now
    );
  }
  const hasOpen = readFeatureStageUnit(projectRoot, dirName).some((row) => row.kind === "open");
  if (!hasOpen) {
    appendFeatureStageRow(projectRoot, sessionId, dirName, { kind: "open" }, input.now);
    try {
      seedFeatureDelivery(projectRoot, dirName, {
        sessionId,
        recordedAt: (input.now ?? (() => /* @__PURE__ */ new Date()))().toISOString(),
        startCommit: gitState.head_commit ?? null
      });
    } catch {
    }
  }
  return dirName;
}
function closeActiveFeature(projectRoot, sessionId, now) {
  const active = currentFeature(projectRoot, sessionId);
  if (!active) {
    return;
  }
  const rows = readFeatureStageUnit(projectRoot, active);
  if (rows.length > 0 && !isBundleClosed(projectRoot, active)) {
    appendFeatureStageRow(
      projectRoot,
      sessionId,
      active,
      {
        kind: "close",
        event_status: "completed",
        note: "closed; active pointer released"
      },
      now
    );
  }
  updateFeatureRecord(projectRoot, active, { status: "done" }, now);
  markDone(projectRoot, sessionId, active, now);
}
function resolveFeatureRef(projectRoot, sessionId, ref) {
  const control = readSessionControl(projectRoot, sessionId);
  const known = [...control.paused].reverse();
  if (control.active) {
    known.push(control.active);
  }
  const onDisk = listFeatureDirs(projectRoot).filter((dirName) => !known.includes(dirName));
  const needle = ref.trim().replace(/^#/, "");
  for (const candidates of [known, onDisk]) {
    const match = matchFeatureRef(candidates, ref, needle);
    if (match) {
      return match;
    }
  }
  return null;
}
function matchFeatureRef(candidates, ref, needle) {
  for (const dirName of candidates) {
    if (dirName === ref || dirName === needle) {
      return dirName;
    }
    const parts = parseFeatureDirName(dirName);
    if (!parts) {
      continue;
    }
    if (parts.ulid === needle || parts.issue === needle || parts.slug === needle) {
      return dirName;
    }
  }
  for (const dirName of candidates) {
    const parts = parseFeatureDirName(dirName);
    if (parts && parts.slug.includes(needle)) {
      return dirName;
    }
  }
  return null;
}
function resumeFeatureByRef(projectRoot, sessionId, ref, now) {
  const dirName = resolveFeatureRef(projectRoot, sessionId, ref);
  if (!dirName) {
    return null;
  }
  if (isBundleClosed(projectRoot, dirName)) {
    appendFeatureStageRow(
      projectRoot,
      sessionId,
      dirName,
      { kind: "open", note: "reopened via resume" },
      now
    );
    updateFeatureRecord(projectRoot, dirName, { status: "active" }, now);
  }
  if (resumeFeature(projectRoot, sessionId, dirName, now)) {
    return dirName;
  }
  setActiveFeature(projectRoot, sessionId, dirName, { now, writtenBy: "resume" });
  return dirName;
}

export {
  gitPathList,
  changedFilesSince,
  isPaqadArtifactPath,
  documentSessionId,
  stampFeatureDocument,
  readFeatureIndexEntries,
  writeFeatureIndexDocument,
  readFeatureDelivery,
  refreshCommitSplit,
  readChangeStartPoint,
  setCommitDecision,
  recordLinkAttempt,
  reconcileDeliveryFromGit,
  stampMergeCommit,
  resolveDeliveryFeatureByBranch,
  recordCommitForBranch,
  recordShip,
  appendFeatureStageRow,
  recordChangeConstants,
  readFeatureStageUnit,
  foldFeature,
  recordedLaneOrFull,
  currentFeature,
  resolveActiveChange,
  activeChangeKey,
  peekActiveChangeKey,
  openFeatureChange,
  closeActiveFeature,
  resolveFeatureRef,
  resumeFeatureByRef
};
