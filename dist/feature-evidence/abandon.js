import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  appendFeatureStageRow,
  readFeatureDelivery,
  readFeatureStageUnit
} from "../chunk-QR66SJS4.js";
import "../chunk-QUDDQGFY.js";
import "../chunk-H2GJD26E.js";
import {
  featureBranch,
  isBundleClosed,
  isBundleMaterialized,
  isFeatureFinished,
  listFeatureDirs,
  readFeatureRecord,
  rowRecordedAt,
  updateFeatureRecord
} from "../chunk-KFLIUVMP.js";
import {
  readHeadRef
} from "../chunk-AINYJ3Q2.js";
import "../chunk-WGEG5J6L.js";
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
function newestRowAt(projectRoot, dirName) {
  let newest = null;
  for (const row of readFeatureStageUnit(projectRoot, dirName)) {
    const at = Date.parse(rowRecordedAt(row) ?? "");
    if (!Number.isNaN(at) && (newest === null || at > newest)) newest = at;
  }
  return newest;
}
function isMerged(projectRoot, dirName, branch, git) {
  const delivery = readFeatureDelivery(projectRoot, dirName);
  if (delivery.pr?.state === "merged") return true;
  if ((delivery.commit_split?.own_shas?.length ?? 0) === 0) return false;
  const base = readFeatureRecord(projectRoot, dirName)?.base_branch ?? "main";
  return git(projectRoot, ["merge-base", "--is-ancestor", branch, base]) !== void 0;
}
function abandonReason(projectRoot, dirName, branch, refs, git) {
  if (!refs.local.has(branch) && !refs.remote.has(branch)) return "branch gone";
  return isMerged(projectRoot, dirName, branch, git) ? "branch merged" : null;
}
function closeAbandonedBundles(projectRoot, options = {}) {
  const now = options.now ?? (() => /* @__PURE__ */ new Date());
  const git = options.git ?? defaultGit;
  const current = readHeadRef(projectRoot).branch;
  const quietBefore = now().getTime() - ABANDON_QUIET_MS;
  const candidates = listFeatureDirs(projectRoot).flatMap((dirName) => {
    if (!isBundleMaterialized(projectRoot, dirName) || isBundleClosed(projectRoot, dirName)) {
      return [];
    }
    if (isFeatureFinished(readFeatureRecord(projectRoot, dirName)?.status)) return [];
    const branch = featureBranch(projectRoot, dirName);
    if (branch === null || branch === current) return [];
    const newest = newestRowAt(projectRoot, dirName);
    if (newest === null || newest >= quietBefore) return [];
    return [{ dirName, branch }];
  });
  if (candidates.length === 0) return [];
  const refs = readBranchRefs(projectRoot, git);
  if (refs === null) return [];
  const closed = [];
  for (const { dirName, branch } of candidates) {
    const reason = abandonReason(projectRoot, dirName, branch, refs, git);
    if (reason === null) continue;
    appendFeatureStageRow(
      projectRoot,
      ABANDON_SESSION_ID,
      dirName,
      {
        kind: "close",
        event_status: null,
        note: `abandoned: ${reason}, no row for 24h`,
        agent: "orchestrator"
      },
      now
    );
    updateFeatureRecord(projectRoot, dirName, { status: "abandoned" }, now);
    closed.push({ dir: dirName, branch, reason });
  }
  return closed;
}
export {
  ABANDON_QUIET_MS,
  ABANDON_SESSION_ID,
  closeAbandonedBundles
};
