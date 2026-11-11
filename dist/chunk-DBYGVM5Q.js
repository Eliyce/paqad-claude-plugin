import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  releaseLock,
  tryAcquireLock
} from "./chunk-TINPSX3N.js";
import {
  changeOwnTickets,
  computeCommitSplit
} from "./chunk-BTDDEK7C.js";
import {
  BACKSTOP_WRITER,
  COMPLETION_DEFERRED_KIND,
  ENVELOPE_HEADER_PROPERTIES,
  ORCHESTRATOR_AGENT,
  RECIPE_INJECTED_KIND,
  RECORD_REPAIR_KIND,
  REPORT_SOURCES,
  SKILL_USED_KIND,
  SPEC_CORRECTION_KIND,
  SPEC_STEP_KIND,
  SPEC_STEP_OUTCOMES,
  STAGE_AGENT_KIND,
  STAGE_EVIDENCE_DOC_TYPE,
  STAGE_EVIDENCE_SCHEMA_V2,
  STAGE_EVIDENCE_SCHEMA_VERSION,
  STAGE_FAMILY_KIND_LIST,
  STAGE_HANDBACK_KIND,
  adoptableInFlightOnBranch,
  augmentWithBundleArtifacts,
  foldRowsWithKey,
  heldInFlightOnBranch,
  isBundleClosed,
  isBundleMaterialized,
  isFeatureFinished,
  listFeatureDirs,
  readChangeConstants,
  readFeatureRecord,
  reconcileSessionControl,
  seedFeatureRecord,
  updateFeatureRecord
} from "./chunk-YDQKDCXK.js";
import {
  UNTITLED_FEATURE_TITLE,
  buildDocumentEnvelope,
  mintFeatureDirName,
  stampBundleRow
} from "./chunk-RJMJYPHL.js";
import {
  forkBranchOf,
  readGitState
} from "./chunk-BOEVU2BD.js";
import {
  STAGE_EFFORT_LEVELS,
  STAGE_MODELS,
  require_ajv
} from "./chunk-7PD3OGSQ.js";
import {
  sleepSync
} from "./chunk-Z3NGWHFX.js";
import {
  readUnitFile
} from "./chunk-Q353EDKY.js";
import {
  resolveSessionId
} from "./chunk-SG6LXLDH.js";
import {
  markDone,
  readSessionControl,
  resumeFeature,
  setActiveFeature
} from "./chunk-FMQ5YRSP.js";
import {
  dirname,
  featureChangeKey,
  featureDir,
  featureFilePath,
  join,
  parseFeatureDirName
} from "./chunk-AZLA53A6.js";
import {
  __toESM,
  init_esm_shims
} from "./chunk-IDFRWBMN.js";

// src/feature-evidence/stage-ledger.ts
init_esm_shims();
import { readFileSync as readFileSync4 } from "fs";
import { join as join6 } from "path";

// src/feature-evidence/delivery.ts
init_esm_shims();
import { execFileSync as execFileSync2 } from "child_process";
import { mkdirSync as mkdirSync2, readFileSync as readFileSync3, renameSync as renameSync2, writeFileSync as writeFileSync2 } from "fs";
import { dirname as dirname2, join as join3 } from "path";

// src/pipeline/git-paths.ts
init_esm_shims();
import { execFileSync } from "child_process";
import { createHash } from "crypto";
import { copyFileSync, existsSync, mkdtempSync, readFileSync, rmSync } from "fs";
import { tmpdir } from "os";
import { join as join2, resolve } from "path";
var DELETED_AT_START = "deleted";
var PINNED_DIFF_ARGS = [
  "-c",
  "core.quotepath=off",
  "diff",
  "--no-color",
  "--no-ext-diff",
  "--no-textconv",
  "--src-prefix=a/",
  "--dst-prefix=b/",
  "--submodule=short",
  "--find-renames"
];
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
function parseAddedLines(diff) {
  const added = {};
  let path = null;
  let inHunk = false;
  for (const line of diff.split("\n")) {
    if (line.startsWith("diff --git ")) {
      path = null;
      inHunk = false;
    } else if (!inHunk && line.startsWith("+++ ")) {
      const name = line.slice(4).replace(/\t$/u, "");
      path = name.startsWith("b/") ? name.slice(2) : null;
    } else if (line.startsWith("@@")) {
      inHunk = true;
    } else if (inHunk && path !== null && line.startsWith("+")) {
      (added[path] ??= []).push(line.slice(1));
    }
  }
  return Object.fromEntries(Object.entries(added).map(([file, lines]) => [file, lines.join("\n")]));
}
function readGit(projectRoot, args, env) {
  return execFileSync("git", args, {
    cwd: projectRoot,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
    timeout: 3e4,
    maxBuffer: 256 * 1024 * 1024,
    ...env ? { env } : {}
  });
}
function diffSeeingUntracked(projectRoot, diffArgs, untracked) {
  const scratch = mkdtempSync(join2(tmpdir(), "paqad-index-"));
  try {
    const index = resolve(
      projectRoot,
      readGit(projectRoot, ["rev-parse", "--git-path", "index"]).trim()
    );
    const tempIndex = join2(scratch, "index");
    if (existsSync(index)) copyFileSync(index, tempIndex);
    const env = { ...process.env, GIT_INDEX_FILE: tempIndex };
    execFileSync(
      "git",
      ["--literal-pathspecs", "add", "-N", "--pathspec-from-file=-", "--pathspec-file-nul"],
      {
        cwd: projectRoot,
        input: untracked.join("\0"),
        stdio: ["pipe", "ignore", "ignore"],
        timeout: 3e4,
        env
      }
    );
    return readGit(projectRoot, diffArgs, env);
  } catch {
    return null;
  } finally {
    rmSync(scratch, { recursive: true, force: true });
  }
}
function addedLinesSince(projectRoot, start) {
  const changed = changedFilesSince(projectRoot, start);
  const untracked = gitPathList(projectRoot, ["ls-files", "--others", "--exclude-standard", "-z"]);
  if (changed === null || untracked === null) return null;
  const inChange = new Set(changed);
  const newFiles = untracked.filter(
    (path) => !path.endsWith("/") && inChange.has(path.replace(/\\/g, "/"))
  );
  const diffArgs = [...PINNED_DIFF_ARGS, "-U0", "--relative", start.commit];
  const seen = newFiles.length === 0 ? null : diffSeeingUntracked(projectRoot, diffArgs, newFiles);
  let diff;
  try {
    diff = seen ?? readGit(projectRoot, diffArgs);
  } catch {
    return null;
  }
  const added = Object.fromEntries(
    Object.entries(parseAddedLines(diff)).filter(([path]) => inChange.has(path))
  );
  if (seen !== null) return added;
  for (const path of newFiles) {
    const normalized = path.replace(/\\/g, "/");
    try {
      added[normalized] = readFileSync(join2(projectRoot, normalized), "utf8");
    } catch {
    }
  }
  return added;
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
var TICKET_ACTION_IDS = [
  "on_pr_open",
  "on_ci_green",
  "on_hld_post"
];
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
      ...record.extra_prs && record.extra_prs.length > 0 ? { extra_prs: record.extra_prs } : {},
      ci: record.ci ?? null,
      ...record.ci_read ? { ci_read: record.ci_read } : {},
      ...record.ticket_actions && record.ticket_actions.length > 0 ? { ticket_actions: record.ticket_actions } : {}
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
  if (patch.extra_prs) {
    record.extra_prs = patch.extra_prs.map((pr) => ({
      number: null,
      url: null,
      draft: null,
      ...definedFields(pr),
      at
    }));
  }
  if (patch.ci && !stale) record.ci = mergeCi(record.ci, { ...patch.ci, at });
  return writeFeatureDelivery(projectRoot, dirName, record, at);
}
function queueTicketAction(projectRoot, dirName, action, at) {
  const record = readFeatureDelivery(projectRoot, dirName);
  const others = (record.ticket_actions ?? []).filter((entry) => entry.id !== action.id);
  record.ticket_actions = [...others, action];
  return writeFeatureDelivery(projectRoot, dirName, record, at);
}
function settleTicketAction(projectRoot, dirName, id, state, reason, at) {
  const record = readFeatureDelivery(projectRoot, dirName);
  const actions = record.ticket_actions ?? [];
  const found = actions.find((entry) => entry.id === id);
  if (!found) {
    const known = actions.map((entry) => entry.id).join(", ") || "none";
    return {
      ok: false,
      message: `No ticket move ${id} is queued for this change (queued: ${known}).`
    };
  }
  const settled = { ...found, state, reason, at };
  record.ticket_actions = actions.map((entry) => entry.id === id ? settled : entry);
  writeFeatureDelivery(projectRoot, dirName, record, at);
  return { ok: true, action: settled };
}
function pendingTicketActions(record) {
  return (record.ticket_actions ?? []).filter((entry) => entry.state === "pending");
}

// src/feature-evidence/ledger-append.ts
init_esm_shims();
import { createHash as createHash2 } from "crypto";
import {
  closeSync,
  existsSync as existsSync3,
  fstatSync,
  fsyncSync,
  mkdirSync as mkdirSync4,
  openSync,
  readSync,
  readdirSync as readdirSync2,
  rmdirSync as rmdirSync2,
  writeSync
} from "fs";
import { dirname as dirname4, join as join5 } from "path";

// src/core/fs/file-lock.ts
init_esm_shims();
import { randomBytes } from "crypto";
import {
  existsSync as existsSync2,
  mkdirSync as mkdirSync3,
  readdirSync,
  renameSync as renameSync3,
  rmdirSync,
  statSync,
  unlinkSync,
  utimesSync,
  writeFileSync as writeFileSync3
} from "fs";
import { dirname as dirname3, join as join4 } from "path";
var FileLockTimeoutError = class extends Error {
  constructor(lockDir, timeoutMs) {
    super(
      `could not take the lock ${lockDir} within ${timeoutMs} ms; another paqad process holds it. Retry the command; if no other paqad command is running, remove that directory.`
    );
    this.name = "FileLockTimeoutError";
  }
};
function withFileLockSync(lockDir, fn, options = {}) {
  const timeoutMs = options.timeoutMs ?? 15e3;
  const staleMs = options.staleMs ?? 1e4;
  const retryMs = options.retryMs ?? 20;
  const now = options.now ?? Date.now;
  const sleep = options.sleep ?? sleepSync;
  const deadline = now() + timeoutMs;
  for (; ; ) {
    const outcome = tryAcquireLock(lockDir, { staleLockMs: staleMs, now });
    if (outcome.acquired) break;
    if (now() >= deadline) throw new FileLockTimeoutError(lockDir, timeoutMs);
    sleep(retryMs);
  }
  try {
    return fn();
  } finally {
    releaseLock(lockDir);
  }
}
var OWNER_PREFIX = "owner-";
var CLAIM_PREFIX = "claim-";
var FileLockLostError = class extends Error {
  constructor(lockDir) {
    super(`the lock ${lockDir} was taken over while this process was paused`);
    this.name = "FileLockLostError";
  }
};
function uniqueName(prefix) {
  return `${prefix}${process.pid}-${randomBytes(6).toString("hex")}`;
}
function holderIsDead(name) {
  const pid = Number(name.slice(OWNER_PREFIX.length).split("-")[0]);
  if (!Number.isInteger(pid) || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return false;
  } catch (error) {
    return error.code === "ESRCH";
  }
}
function tryTakeOwned(lockDir) {
  try {
    mkdirSync3(lockDir);
  } catch {
    return null;
  }
  const owner = uniqueName(OWNER_PREFIX);
  try {
    writeFileSync3(join4(lockDir, owner), "");
    if (readdirSync(lockDir).length === 1) return ownedLock(lockDir, owner);
    unlinkSync(join4(lockDir, owner));
    rmdirSync(lockDir);
  } catch {
  }
  return null;
}
function ownedLock(lockDir, owner) {
  const token = join4(lockDir, owner);
  return {
    assertHeld() {
      try {
        const at = /* @__PURE__ */ new Date();
        utimesSync(lockDir, at, at);
      } catch {
      }
      if (!existsSync2(token)) throw new FileLockLostError(lockDir);
    },
    release() {
      try {
        unlinkSync(token);
        rmdirSync(lockDir);
      } catch {
      }
    },
    movedTo: (moved) => ownedLock(moved, owner)
  };
}
function reclaimIfStale(lockDir, staleMs, now) {
  let names;
  let aged;
  try {
    names = readdirSync(lockDir);
    aged = now() - statSync(lockDir).mtimeMs > staleMs;
  } catch {
    return;
  }
  const owners = names.filter((name) => name.startsWith(OWNER_PREFIX));
  if (!aged && !(owners.length > 0 && owners.every(holderIsDead))) return;
  const claims = names.filter((name) => name.startsWith(CLAIM_PREFIX));
  try {
    for (const owner of owners) {
      const claim = uniqueName(CLAIM_PREFIX);
      renameSync3(join4(lockDir, owner), join4(lockDir, claim));
      claims.push(claim);
    }
    for (const claim of claims) unlinkSync(join4(lockDir, claim));
    rmdirSync(lockDir);
  } catch {
  }
}
function acquireOwnedFileLock(lockDir, options = {}) {
  const timeoutMs = options.timeoutMs ?? 15e3;
  const staleMs = options.staleMs ?? 1e4;
  const retryMs = options.retryMs ?? 20;
  const now = options.now ?? Date.now;
  const sleep = options.sleep ?? sleepSync;
  const deadline = now() + timeoutMs;
  for (let parentMade = false; ; parentMade = true) {
    const taken = tryTakeOwned(lockDir);
    if (taken) return taken;
    if (!parentMade) {
      try {
        mkdirSync3(dirname3(lockDir), { recursive: true });
      } catch {
      }
    }
    reclaimIfStale(lockDir, staleMs, now);
    const retaken = tryTakeOwned(lockDir);
    if (retaken) return retaken;
    if (now() >= deadline) throw new FileLockTimeoutError(lockDir, timeoutMs);
    sleep(retryMs);
  }
}
function withOwnedFileLockSync(lockDir, fn, options = {}) {
  const lock = acquireOwnedFileLock(lockDir, options);
  try {
    return fn(lock);
  } finally {
    lock.release();
  }
}

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
var STAGE_EVIDENCE_SCHEMA_V22 = {
  $id: "paqad://schemas/stage-evidence-v2.json",
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
    schema_version: { type: "integer", const: STAGE_EVIDENCE_SCHEMA_V2 },
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
    stage_agents_running: { type: "array", items: { type: "string", minLength: 1 } },
    tokens_used: { type: "integer", minimum: 0 },
    tokens_not_recarried: { type: "integer", minimum: 0 },
    estimate: { type: "boolean" },
    requested_effort: { enum: STAGE_EFFORT_LEVELS },
    requested_model: { enum: STAGE_MODELS },
    report_status: { enum: ["DONE", "DONE_WITH_CONCERNS", "NEEDS_CONTEXT", "BLOCKED"] },
    report_stated: { type: "boolean" },
    advance: { type: "boolean" },
    must_not: {
      type: "array",
      items: { enum: ["asked_human", "bundle_write", "out_of_stage_edit"] }
    },
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
var V3_ROW_PROPERTIES = {
  event_status: {
    type: ["string", "null"],
    enum: ["started", "completed", "skipped", "failed", "redone", "inferred", "denied", null]
  },
  idempotency_key: { type: "string", minLength: 1 },
  prev_hash: nullableString,
  chain_note: { type: "string", minLength: 1 },
  unchecked: { type: "string", minLength: 1 },
  scope: { type: "string", minLength: 1 },
  repairs_row: { type: "integer", minimum: 1 },
  repairs_hash: { type: "string", minLength: 1 },
  decision: nullableString,
  report_source: { enum: REPORT_SOURCES },
  report_hash: { type: "string", minLength: 1 },
  tool_use_id: { type: "string", minLength: 1 },
  refusal_id: { type: "string", minLength: 1 },
  stated_status: { enum: ["DONE", "DONE_WITH_CONCERNS", "NEEDS_CONTEXT", "BLOCKED"] },
  gate_checked: { type: "boolean" },
  api_turns: { type: "integer", minimum: 0 },
  recipe: { type: "string", minLength: 1 },
  recipe_hash: { type: "string", minLength: 1 },
  recipe_root: { type: "string", minLength: 1 },
  truncated: { type: "boolean" },
  source: { const: "script" },
  script: { type: "string", minLength: 1 },
  output_hash: { type: "string", minLength: 1 },
  stale_ok: { type: "array", items: { type: "string", minLength: 1 } }
};
var STAGE_EVIDENCE_SCHEMA = {
  ...STAGE_EVIDENCE_SCHEMA_V22,
  $id: "paqad://schemas/stage-evidence.json",
  properties: {
    ...STAGE_EVIDENCE_SCHEMA_V22.properties,
    ...V3_ROW_PROPERTIES,
    schema_version: { type: "integer", const: STAGE_EVIDENCE_SCHEMA_VERSION },
    kind: {
      enum: [
        ...STAGE_EVIDENCE_SCHEMA_V22.properties.kind.enum,
        STAGE_HANDBACK_KIND,
        RECIPE_INJECTED_KIND,
        SKILL_USED_KIND
      ]
    }
  },
  allOf: [
    ...STAGE_EVIDENCE_SCHEMA_V22.allOf,
    {
      if: { properties: { kind: { const: STAGE_HANDBACK_KIND } }, required: ["kind"] },
      then: { required: ["stage", "event_status", "agent_id"] }
    },
    {
      if: { properties: { kind: { const: RECIPE_INJECTED_KIND } }, required: ["kind"] },
      then: { required: ["stage", "recipe", "recipe_hash"] }
    },
    {
      if: { properties: { kind: { const: SKILL_USED_KIND } }, required: ["kind"] },
      then: { required: ["stage", "recipe", "source", "script", "output_hash"] }
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
    v2: ajv.compile(STAGE_EVIDENCE_SCHEMA_V22),
    v1: ajv.compile(STAGE_EVIDENCE_SCHEMA_V1)
  };
  const version = row?.schema_version;
  if (version === 1) return compiled.v1;
  return version === STAGE_EVIDENCE_SCHEMA_V2 ? compiled.v2 : compiled.current;
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

// src/feature-evidence/ledger-append.ts
var BUNDLE_LOCK_NAME = ".lock";
var LEDGER_LOCK_TIMEOUT_MS = 200;
var LEDGER_LOCK_STALE_MS = 6e4;
var LOST_LOCK_RETRIES = 3;
var DEDUPE_WINDOW_MS = 1e4;
var LOCK_TIMEOUT_NOTE = "lock-timeout";
var AFTER_TORN_LINE_NOTE = "after-torn-line";
var TAIL_BYTES = 256 * 1024;
var BODY_HASH_EXCLUDED = /* @__PURE__ */ new Set([
  "ts",
  "recorded_at",
  "note",
  "prev_hash",
  "chain_note",
  "content_hash",
  "idempotency_key",
  "host_pid",
  "artifact_paths"
]);
function bundleLockPath(projectRoot, dirName) {
  return join5(projectRoot, featureDir(dirName), BUNDLE_LOCK_NAME);
}
function bodyHash(row) {
  const body = {};
  for (const key of Object.keys(row).sort()) {
    if (!BODY_HASH_EXCLUDED.has(key)) body[key] = row[key];
  }
  return createHash2("sha256").update(JSON.stringify(body)).digest("hex");
}
function textField(value) {
  return typeof value === "string" && value !== "" ? value : null;
}
function rowKey(change, sessionId, row) {
  const owner = textField(row.agent_id) ?? sessionId;
  const stage = textField(row.stage) ?? "-";
  const status = textField(row.event_status) ?? "-";
  const id = textField(row.tool_use_id) ?? textField(row.refusal_id);
  const final = id ?? bodyHash(row);
  return {
    key: `${change}:${owner}:${stage}:${String(row.kind)}:${status}:${final}`,
    byValue: id !== null
  };
}
function readFileTail(path) {
  let fd;
  try {
    fd = openSync(path, "r");
  } catch (error) {
    if (error.code === "ENOENT") return { text: "", endsClean: true };
    throw error;
  }
  try {
    const size = fstatSync(fd).size;
    const length = Math.min(size, TAIL_BYTES);
    const buffer = Buffer.alloc(length);
    readSync(fd, buffer, 0, length, size - length);
    const text = buffer.toString("utf8");
    return { text, endsClean: text === "" || text.endsWith("\n") };
  } finally {
    closeSync(fd);
  }
}
function parseRow(line) {
  try {
    const parsed = JSON.parse(line);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}
function newestRow(lines) {
  for (let index = lines.length - 1; index >= 0; index -= 1) {
    const row = parseRow(lines[index]);
    if (row !== null) return row;
  }
  return null;
}
function sameStageMoved(row, candidate) {
  return (row.stage ?? null) === (candidate.stage ?? null) && row.kind !== candidate.kind;
}
function existingDuplicate(lines, key, nowMs, candidate) {
  const stored = key.byValue ? JSON.stringify(key.key).slice(1, -1) : null;
  for (let index = lines.length - 1; index >= 0; index -= 1) {
    const line = lines[index];
    if (stored !== null && !line.includes(stored)) continue;
    const row = parseRow(line);
    if (row === null) continue;
    if (row.idempotency_key !== key.key) {
      if (!key.byValue && sameStageMoved(row, candidate)) return null;
      continue;
    }
    if (key.byValue) return row;
    const at = Date.parse(String(row.recorded_at ?? ""));
    return !Number.isNaN(at) && Math.abs(nowMs - at) <= DEDUPE_WINDOW_MS ? row : null;
  }
  return null;
}
function openForAppend(path, beforeCreate) {
  for (let created = false; ; created = true) {
    try {
      return openSync(path, "a");
    } catch (error) {
      if (created || error.code !== "ENOENT") throw error;
    }
    beforeCreate();
    mkdirSync4(dirname4(path), { recursive: true });
  }
}
function writeLine(path, line, guard) {
  const fd = openForAppend(path, guard);
  try {
    guard();
    writeSync(fd, line);
    fsyncSync(fd);
  } finally {
    closeSync(fd);
  }
}
function appendRow(input, lock) {
  const { projectRoot, sessionId, dirName, now } = input;
  const row = {
    ...input.row,
    agent: input.row.agent ?? ORCHESTRATOR_AGENT
  };
  const path = join5(projectRoot, featureFilePath(dirName, "stageEvidence"));
  const change = featureChangeKey(dirName);
  const key = rowKey(change, sessionId, row);
  const tail = readFileTail(path);
  const lines = tail.text.split("\n");
  const stampedAt = (now ?? (() => /* @__PURE__ */ new Date()))();
  const duplicate = row.kind === "verify" ? null : existingDuplicate(lines, key, stampedAt.getTime(), row);
  if (duplicate) return duplicate;
  const locked = lock !== null;
  const chain = {
    prev_hash: locked ? textField(newestRow(lines)?.content_hash) : null,
    ...locked ? {} : { chain_note: LOCK_TIMEOUT_NOTE },
    ...locked && !tail.endsClean ? { chain_note: AFTER_TORN_LINE_NOTE } : {}
  };
  const stamped = stampBundleRow({
    docType: STAGE_EVIDENCE_DOC_TYPE,
    change,
    sessionId,
    schemaVersion: STAGE_EVIDENCE_SCHEMA_VERSION,
    row: { ...row, idempotency_key: key.key, ...chain },
    validate: (candidate) => validateStageEvidenceRow(candidate),
    now: () => stampedAt
  });
  const guard = () => {
    if (lock) {
      lock.assertHeld();
      return;
    }
    const target = renamedBundle(projectRoot, dirName);
    if (target !== null) throw new BundleMoved(target);
  };
  writeLine(path, `${tail.endsClean ? "" : "\n"}${JSON.stringify(stamped)}
`, guard);
  return stamped;
}
function renamedBundle(projectRoot, dirName) {
  if (existsSync3(join5(projectRoot, featureFilePath(dirName, "stageEvidence")))) return null;
  const ulid = parseFeatureDirName(dirName)?.ulid;
  if (!ulid) return null;
  const base = dirname4(join5(projectRoot, featureDir(dirName)));
  let names;
  try {
    names = readdirSync2(base);
  } catch {
    return null;
  }
  const sameChange = names.filter((name) => parseFeatureDirName(name)?.ulid === ulid);
  const holding = (file) => (name) => existsSync3(join5(projectRoot, featureFilePath(name, file)));
  const target = sameChange.find(holding("stageEvidence")) ?? sameChange.find(holding("feature")) ?? sameChange.sort()[0];
  return target === void 0 || target === dirName ? null : target;
}
var BundleMoved = class extends Error {
  constructor(target) {
    super(`bundle moved to ${target}`);
    this.target = target;
  }
  target;
};
function appendWithoutLock(input) {
  const target = renamedBundle(input.projectRoot, input.dirName);
  if (target !== null) return appendWithoutLock({ ...input, dirName: target });
  try {
    return appendRow(input, null);
  } catch (error) {
    if (error instanceof BundleMoved) {
      return appendWithoutLock({ ...input, dirName: error.target });
    }
    throw error;
  }
}
function appendChainedStageRow(input) {
  const { projectRoot, dirName } = input;
  const moved = renamedBundle(projectRoot, dirName);
  if (moved !== null) return appendChainedStageRow({ ...input, dirName: moved });
  for (let attempt = 0; attempt < LOST_LOCK_RETRIES; attempt += 1) {
    let entered = false;
    try {
      return withOwnedFileLockSync(
        bundleLockPath(projectRoot, dirName),
        (lock) => {
          entered = true;
          const target = renamedBundle(projectRoot, dirName);
          if (target !== null) throw new BundleMoved(target);
          return appendRow(input, lock);
        },
        { timeoutMs: LEDGER_LOCK_TIMEOUT_MS, staleMs: LEDGER_LOCK_STALE_MS }
      );
    } catch (error) {
      if (error instanceof BundleMoved) {
        try {
          rmdirSync2(join5(projectRoot, featureDir(dirName)));
        } catch {
        }
        return appendChainedStageRow({ ...input, dirName: error.target });
      }
      if (error instanceof FileLockLostError) {
        const target = renamedBundle(projectRoot, dirName);
        if (target !== null) return appendChainedStageRow({ ...input, dirName: target });
        continue;
      }
      if (entered && !(error instanceof FileLockTimeoutError)) throw error;
      break;
    }
  }
  return appendWithoutLock(input);
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
  return appendChainedStageRow({ projectRoot, sessionId, dirName, row, now });
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
    return readFileSync4(join6(projectRoot, featureFilePath(dirName, file))).length > 0;
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
  PINNED_DIFF_ARGS,
  gitPathList,
  changedFilesSince,
  addedLinesSince,
  isPaqadArtifactPath,
  documentSessionId,
  stampFeatureDocument,
  readFeatureIndexEntries,
  writeFeatureIndexDocument,
  TICKET_ACTION_IDS,
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
  queueTicketAction,
  settleTicketAction,
  pendingTicketActions,
  FileLockTimeoutError,
  withFileLockSync,
  acquireOwnedFileLock,
  BUNDLE_LOCK_NAME,
  LEDGER_LOCK_STALE_MS,
  bundleLockPath,
  resolveActiveFeature,
  featureStagePath,
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
