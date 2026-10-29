import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  appendFeatureStageRow,
  readFeatureDelivery,
  readFeatureStageUnit
} from "../chunk-WTYH7MZ3.js";
import "../chunk-QUDDQGFY.js";
import {
  featureBranch,
  isBundleClosed,
  isBundleMaterialized,
  isFeatureFinished,
  listFeatureDirs,
  readFeatureRecord,
  rowRecordedAt,
  runningStageOfOtherSession,
  updateFeatureRecord
} from "../chunk-VV76C43H.js";
import {
  readHeadRef
} from "../chunk-AINYJ3Q2.js";
import "../chunk-TVWMFQYX.js";
import "../chunk-QINSFA6R.js";
import "../chunk-SU7RODZI.js";
import "../chunk-HV6ESCNW.js";
import "../chunk-DDJC5PRW.js";
import "../chunk-3STC3IVL.js";
import "../chunk-LW3OCT4Y.js";
import {
  init_esm_shims
} from "../chunk-EMKBJVIL.js";

// src/feature-evidence/abandon.ts
init_esm_shims();
import { execFileSync } from "child_process";
var ABANDON_QUIET_MS = 24 * 60 * 60 * 1e3;
var ABANDON_SESSION_ID = "paqad-housekeeping";
var MERGE_SUBJECT_MAX_COUNT = 20;
var MERGE_SUBJECT_SKEW_MS = 24 * 60 * 60 * 1e3;
var defaultGit = (projectRoot, args) => {
  try {
    return execFileSync("git", args, {
      cwd: projectRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
  } catch {
    return void 0;
  }
};
function readBranchRefs(projectRoot, git) {
  const out = git(projectRoot, [
    "for-each-ref",
    "--format=%(refname)",
    "refs/heads",
    "refs/remotes"
  ]);
  if (out === void 0) return null;
  const refs = { local: /* @__PURE__ */ new Set(), remote: /* @__PURE__ */ new Set() };
  for (const ref of out.split("\n").filter(Boolean)) {
    if (ref.startsWith("refs/heads/")) {
      refs.local.add(ref.slice("refs/heads/".length));
    } else if (ref.startsWith("refs/remotes/")) {
      const rest = ref.slice("refs/remotes/".length);
      const slash = rest.indexOf("/");
      if (slash > 0) refs.remote.add(rest.slice(slash + 1));
    }
  }
  return refs;
}
function rowSpan(rows) {
  let span = null;
  for (const row of rows) {
    const at = Date.parse(rowRecordedAt(row) ?? "");
    if (Number.isNaN(at)) continue;
    span = span === null ? { oldest: at, newest: at } : { oldest: Math.min(span.oldest, at), newest: Math.max(span.newest, at) };
  }
  return span;
}
function baseBranchOf(projectRoot, dirName) {
  return readFeatureRecord(projectRoot, dirName)?.base_branch ?? "main";
}
function squashSubjectOnBase(projectRoot, dirName, number, since, git) {
  const base = baseBranchOf(projectRoot, dirName);
  const needle = `(#${number})`;
  const sinceIso = new Date(since - MERGE_SUBJECT_SKEW_MS).toISOString();
  return [`refs/heads/${base}`, `refs/remotes/origin/${base}`].some((ref) => {
    const out = git(projectRoot, [
      "log",
      ref,
      "--fixed-strings",
      `--grep=${needle}`,
      `--since=${sinceIso}`,
      `--max-count=${MERGE_SUBJECT_MAX_COUNT}`,
      "--format=%s"
    ]);
    return out !== void 0 && out.split("\n").some((subject) => subject.trimEnd().endsWith(needle));
  });
}
function confirmedMergeNote(projectRoot, dirName, since, git) {
  const pr = readFeatureDelivery(projectRoot, dirName).pr;
  const number = typeof pr?.number === "number" && Number.isInteger(pr.number) && pr.number > 0 ? pr.number : null;
  const note = `closed: pull request${number === null ? "" : ` #${number}`} merged`;
  if (pr?.state === "merged") return note;
  if (number === null) return null;
  return squashSubjectOnBase(projectRoot, dirName, number, since, git) ? note : null;
}
function isMerged(projectRoot, dirName, branch, git) {
  const delivery = readFeatureDelivery(projectRoot, dirName);
  if ((delivery.commit_split?.own_shas?.length ?? 0) === 0) return false;
  const base = baseBranchOf(projectRoot, dirName);
  return git(projectRoot, ["merge-base", "--is-ancestor", branch, base]) !== void 0;
}
function abandonReason(projectRoot, dirName, branch, refs, git) {
  if (!refs.local.has(branch) && !refs.remote.has(branch)) return "branch gone";
  return isMerged(projectRoot, dirName, branch, git) ? "branch merged" : null;
}
function closeBundle(projectRoot, dirName, note, status, now) {
  appendFeatureStageRow(
    projectRoot,
    ABANDON_SESSION_ID,
    dirName,
    { kind: "close", event_status: null, note, agent: "orchestrator" },
    now
  );
  updateFeatureRecord(projectRoot, dirName, { status }, now);
}
function closeAbandonedBundles(projectRoot, options = {}) {
  const now = options.now ?? (() => /* @__PURE__ */ new Date());
  const git = options.git ?? defaultGit;
  const current = readHeadRef(projectRoot).branch;
  const nowMs = now().getTime();
  const quietBefore = nowMs - ABANDON_QUIET_MS;
  const closed = [];
  const candidates = listFeatureDirs(projectRoot).flatMap((dirName) => {
    if (!isBundleMaterialized(projectRoot, dirName) || isBundleClosed(projectRoot, dirName)) {
      return [];
    }
    if (isFeatureFinished(readFeatureRecord(projectRoot, dirName)?.status)) return [];
    const branch = featureBranch(projectRoot, dirName);
    if (branch === null || branch === current) return [];
    const rows = readFeatureStageUnit(projectRoot, dirName);
    const span = rowSpan(rows);
    if (span === null) return [];
    const mergedNote = confirmedMergeNote(projectRoot, dirName, span.oldest, git);
    if (mergedNote !== null) {
      if (runningStageOfOtherSession(rows, null, nowMs) === null) {
        closeBundle(projectRoot, dirName, mergedNote, "done", now);
        closed.push({ dir: dirName, branch, reason: "pull request merged" });
      }
      return [];
    }
    if (span.newest >= quietBefore) return [];
    return [{ dirName, branch }];
  });
  if (candidates.length === 0) return closed;
  const refs = readBranchRefs(projectRoot, git);
  if (refs === null) return closed;
  for (const { dirName, branch } of candidates) {
    const reason = abandonReason(projectRoot, dirName, branch, refs, git);
    if (reason === null) continue;
    closeBundle(projectRoot, dirName, `abandoned: ${reason}, no row for 24h`, "abandoned", now);
    closed.push({ dir: dirName, branch, reason });
  }
  return closed;
}
export {
  ABANDON_QUIET_MS,
  ABANDON_SESSION_ID,
  MERGE_SUBJECT_MAX_COUNT,
  MERGE_SUBJECT_SKEW_MS,
  closeAbandonedBundles
};
