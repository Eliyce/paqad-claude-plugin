import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/rag/git-state.ts
init_esm_shims();
import { execFileSync } from "child_process";
import { opendirSync, readFileSync } from "fs";
import { dirname, isAbsolute, join, resolve } from "path";
function git(projectRoot, args) {
  try {
    return execFileSync("git", args, {
      cwd: projectRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"]
    }).trim();
  } catch {
    return void 0;
  }
}
function refExists(projectRoot, ref) {
  return git(projectRoot, ["rev-parse", "--verify", "--quiet", `${ref}^{commit}`]) !== void 0;
}
function detectBaseBranch(projectRoot, explicit) {
  if (explicit && refExists(projectRoot, explicit)) return explicit;
  for (const candidate of ["main", "master"]) {
    if (refExists(projectRoot, candidate)) return candidate;
  }
  return void 0;
}
function readGitState(projectRoot, options = {}) {
  if (git(projectRoot, ["rev-parse", "--is-inside-work-tree"]) !== "true") {
    return {};
  }
  const branchRaw = git(projectRoot, ["symbolic-ref", "--short", "--quiet", "HEAD"]);
  const branch = branchRaw && branchRaw.length > 0 ? branchRaw : void 0;
  const head_commit = git(projectRoot, ["rev-parse", "HEAD"]);
  const base_branch = detectBaseBranch(projectRoot, options.baseBranch);
  const base_commit = base_branch ? git(projectRoot, ["merge-base", "HEAD", base_branch]) : void 0;
  return { branch, head_commit, base_branch, base_commit };
}
function opensAsDirectory(path) {
  try {
    opendirSync(path).closeSync();
    return true;
  } catch {
    return false;
  }
}
function findGitDir(projectRoot) {
  let dir = resolve(projectRoot);
  for (; ; ) {
    const candidate = join(dir, ".git");
    let contents;
    try {
      contents = readFileSync(candidate, "utf8");
    } catch (error) {
      const code = error.code;
      if (code === "EISDIR") return candidate;
      if (code !== "ENOENT" && code !== "ENOTDIR" && opensAsDirectory(candidate)) return candidate;
      const parent = dirname(dir);
      if (parent === dir) return null;
      dir = parent;
      continue;
    }
    const pointer = /^gitdir:\s*(.+)$/m.exec(contents);
    if (!pointer) return null;
    const target = pointer[1].trim();
    return isAbsolute(target) ? target : resolve(dir, target);
  }
}
function readHeadRef(projectRoot) {
  const gitDir = findGitDir(projectRoot);
  if (gitDir === null) return { repo: false, branch: null, detached: false };
  let head;
  try {
    head = readFileSync(join(gitDir, "HEAD"), "utf8").trim();
  } catch {
    return { repo: false, branch: null, detached: false };
  }
  const symbolic = /^ref:\s*refs\/heads\/(.+)$/.exec(head);
  if (symbolic) return { repo: true, branch: symbolic[1], detached: false };
  return { repo: true, branch: null, detached: true };
}

export {
  readGitState,
  readHeadRef
};
