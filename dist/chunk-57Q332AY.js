import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  execa
} from "./chunk-O77JBFWW.js";
import {
  changedFilesSince,
  currentFeature,
  isPaqadArtifactPath,
  readChangeStartPoint
} from "./chunk-WRWFKZHV.js";
import {
  listInFlightFeatures
} from "./chunk-PQR2FVDS.js";
import {
  readGitState
} from "./chunk-AINYJ3Q2.js";
import {
  readLedgerSessionId
} from "./chunk-HV6ESCNW.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/pipeline/change-evidence.ts
init_esm_shims();
import { join } from "path";
async function loadChangeEvidence(projectRoot, options = {}) {
  const files = await readGitChangedFiles(projectRoot, options);
  return files.length > 0 ? { files, source: "git" } : { files: [], source: "none" };
}
function activeChangeStart(projectRoot) {
  try {
    const sessionId = process.env.SE_SESSION || process.env.CLAUDE_SESSION_ID || readLedgerSessionId(projectRoot);
    if (!sessionId || listInFlightFeatures(projectRoot).length === 0) return null;
    const dirName = currentFeature(projectRoot, sessionId);
    return dirName ? readChangeStartPoint(projectRoot, dirName) : null;
  } catch {
    return null;
  }
}
async function readGitChangedFiles(projectRoot, options = {}) {
  const start = options.since === void 0 ? activeChangeStart(projectRoot) : options.since;
  if (start) {
    const since = changedFilesSince(projectRoot, start);
    if (since !== null) return since;
  }
  const gitState = readGitState(projectRoot);
  if (!gitState.head_commit || !gitState.base_commit) {
    return readGitStatusFiles(projectRoot);
  }
  const [statusFiles, committedFiles] = await Promise.all([
    readGitStatusFiles(projectRoot),
    readCommittedSinceBase(projectRoot, gitState.base_commit)
  ]);
  return normalizePaths([...statusFiles, ...committedFiles]);
}
async function readCommittedSinceBase(projectRoot, baseCommit) {
  try {
    const result = await execa("git", ["diff", "--name-only", `${baseCommit}..HEAD`], {
      cwd: projectRoot,
      reject: false
    });
    if (result.exitCode !== 0) {
      return [];
    }
    return normalizePaths(
      result.stdout.split("\n").map((line) => line.trim()).filter(Boolean)
    );
  } catch {
    return [];
  }
}
function isDocumentationFile(filePath) {
  return filePath === "README.md" || filePath.startsWith("docs/") || filePath.startsWith("website/");
}
function isTestFile(filePath) {
  return filePath.startsWith("tests/") || filePath.includes("/__tests__/") || /\.test\.[cm]?[jt]sx?$/.test(filePath) || /\.spec\.[cm]?[jt]sx?$/.test(filePath);
}
function isCodeFile(filePath) {
  if (isPaqadArtifactPath(filePath)) {
    return false;
  }
  if (isDocumentationFile(filePath) || isTestFile(filePath)) {
    return false;
  }
  return filePath.startsWith("src/") || filePath.startsWith("runtime/") || filePath.startsWith("scripts/") || filePath.startsWith("bin/") || filePath === "package.json" || filePath === "tsconfig.json" || filePath.endsWith(".ts") || filePath.endsWith(".tsx") || filePath.endsWith(".js") || filePath.endsWith(".jsx") || filePath.endsWith(".mjs") || filePath.endsWith(".cjs") || filePath.endsWith(".sh");
}
async function detectStaleDocTargets(projectRoot, changedFiles) {
  const relevantFiles = changedFiles.filter(
    (filePath) => isCodeFile(filePath) || isTestFile(filePath) || isDocumentationFile(filePath)
  );
  if (relevantFiles.length === 0) {
    return [];
  }
  try {
    const detectorPath = join(projectRoot, "runtime", "hooks", "stale-doc-detector.sh");
    const result = await execa(detectorPath, {
      cwd: projectRoot,
      input: `${relevantFiles.join("\n")}
`,
      reject: false
    });
    if (result.exitCode !== 0 || result.stdout.trim() === "") {
      return [];
    }
    const parsed = JSON.parse(result.stdout);
    return normalizeCanonicalDocTargets(parsed, relevantFiles);
  } catch {
    return [];
  }
}
async function readGitStatusFiles(projectRoot) {
  try {
    const result = await execa("git", ["status", "--short", "--untracked-files=all"], {
      cwd: projectRoot,
      reject: false
    });
    if (result.exitCode !== 0) {
      return [];
    }
    return normalizePaths(
      result.stdout.split("\n").map(parseGitStatusPath).filter((value) => value !== null)
    );
  } catch {
    return [];
  }
}
function parseGitStatusPath(line) {
  const stripped = line.replace(/\r$/, "");
  if (stripped.length < 4) {
    return null;
  }
  const payload = stripped.slice(3).trim();
  if (payload.length === 0) {
    return null;
  }
  if (payload.includes(" -> ")) {
    return (
      /* v8 ignore next */
      payload.split(" -> ").at(-1) ?? null
    );
  }
  return payload;
}
function normalizePaths(files) {
  return [...new Set(files.map((filePath) => filePath.replace(/\\/g, "/")).filter(Boolean))].sort();
}
function normalizeCanonicalDocTargets(parsed, changedFiles) {
  if (!Array.isArray(parsed)) {
    return [];
  }
  const normalizedEntries = parsed.map((entry) => normalizeCanonicalDocTarget(entry, changedFiles)).filter((entry) => entry !== null).filter((entry) => isCanonicalDocPath(entry.target_path));
  const deduped = /* @__PURE__ */ new Map();
  for (const entry of normalizedEntries) {
    const existing = deduped.get(entry.target_path);
    if (!existing) {
      deduped.set(entry.target_path, entry);
      continue;
    }
    deduped.set(entry.target_path, {
      target_path: entry.target_path,
      ownership_kind: existing.ownership_kind === "direct-doc-edit" || entry.ownership_kind === "direct-doc-edit" ? "direct-doc-edit" : "implementation-drift",
      owners: normalizePaths([...existing.owners, ...entry.owners]),
      reason: dedupeReasonFragments([existing.reason, entry.reason])
    });
  }
  return [...deduped.values()].sort((a, b) => a.target_path.localeCompare(b.target_path));
}
function normalizeCanonicalDocTarget(entry, changedFiles) {
  if (typeof entry === "string") {
    return {
      target_path: normalizePath(entry),
      ownership_kind: changedFiles.includes(normalizePath(entry)) ? "direct-doc-edit" : "implementation-drift",
      owners: changedFiles.includes(normalizePath(entry)) ? [normalizePath(entry)] : [],
      reason: changedFiles.includes(normalizePath(entry)) ? "Canonical doc changed directly in the diff." : "Detector marked this canonical doc as stale for the current diff."
    };
  }
  if (typeof entry !== "object" || entry === null) {
    return null;
  }
  const candidate = entry;
  const rawTarget = typeof candidate.target_path === "string" ? candidate.target_path : candidate.target;
  if (typeof rawTarget !== "string" || rawTarget.trim() === "") {
    return null;
  }
  const normalizedTarget = normalizePath(rawTarget);
  const owners = Array.isArray(candidate.owners) ? candidate.owners : Array.isArray(candidate.changed_files) ? candidate.changed_files : [];
  return {
    target_path: normalizedTarget,
    ownership_kind: normalizeOwnershipKind(
      candidate.ownership_kind,
      changedFiles.includes(normalizedTarget)
    ),
    owners: normalizePaths(owners.filter((value) => typeof value === "string")),
    reason: typeof candidate.reason === "string" && candidate.reason.trim() !== "" ? candidate.reason.trim() : changedFiles.includes(normalizedTarget) ? "Canonical doc changed directly in the diff." : "Detector marked this canonical doc as stale for the current diff."
  };
}
function normalizeOwnershipKind(value, directlyEdited) {
  if (value === "direct-doc-edit" || value === "implementation-drift") {
    return value;
  }
  return directlyEdited ? "direct-doc-edit" : "implementation-drift";
}
function isCanonicalDocPath(filePath) {
  return filePath === "README.md" || filePath.startsWith("docs/modules/") || filePath.startsWith("docs/instructions/") || filePath.startsWith("docs/maintainers/");
}
function normalizePath(filePath) {
  return filePath.replace(/\\/g, "/").trim();
}
function dedupeReasonFragments(reasons) {
  return [...new Set(reasons.map((reason) => reason.trim()).filter(Boolean))].join(" ");
}

export {
  loadChangeEvidence,
  readGitChangedFiles,
  isDocumentationFile,
  isTestFile,
  isCodeFile,
  detectStaleDocTargets,
  readGitStatusFiles
};
