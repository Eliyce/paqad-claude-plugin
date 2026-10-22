import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  readGitState
} from "./chunk-O25SHWZA.js";
import {
  detectTicketRefs,
  parseBranchTickets
} from "./chunk-SU7RODZI.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/delivery/commit-split.ts
init_esm_shims();
import { execFileSync } from "child_process";
function git(projectRoot, args) {
  try {
    return execFileSync("git", args, {
      cwd: projectRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
      maxBuffer: 64 * 1024 * 1024
    }).trim();
  } catch {
    return void 0;
  }
}
function emptyGroup() {
  return { count: 0, tickets: [], merges: 0, untagged: 0 };
}
function unknownSplit(reason) {
  return { state: "unknown", reason, base_commit: null, own: null, inherited: null };
}
function readBranchCommits(projectRoot, baseCommit) {
  const out = git(projectRoot, ["log", `${baseCommit}..HEAD`, "--format=%H%x1f%P%x1f%s"]) ?? "";
  return out.split("\n").filter(Boolean).map((line) => {
    const [sha, parents = "", ...subject] = line.split("");
    return {
      sha,
      parents: parents.split(" ").filter(Boolean).length,
      tickets: detectTicketRefs(subject.join(""), "generic")
    };
  });
}
function commitsBeforeStart(projectRoot, baseCommit, startCommit) {
  if (!startCommit) return null;
  const out = git(projectRoot, ["rev-list", `${baseCommit}..${startCommit}`]);
  if (out === void 0) return null;
  return new Set(out.split("\n").filter(Boolean));
}
function addTo(group, commit, tickets) {
  group.count += 1;
  if (commit.parents > 1) group.merges += 1;
  if (commit.tickets.length === 0) group.untagged += 1;
  for (const ticket of tickets) {
    if (!group.tickets.includes(ticket)) group.tickets.push(ticket);
  }
}
function changeOwnTickets(issue, branch) {
  const fromIssue = issue ? detectTicketRefs(issue, "generic") : [];
  return fromIssue.length > 0 ? fromIssue : parseBranchTickets(branch);
}
function computeCommitSplit(projectRoot, input = {}) {
  const state = readGitState(projectRoot, { baseBranch: input.baseBranch });
  if (!state.head_commit) return unknownSplit("not a git repository");
  if (!state.branch) return unknownSplit("detached HEAD");
  if (!state.base_commit) return unknownSplit("no reachable base branch");
  const own = new Set(input.ownTickets ?? []);
  const beforeStart = commitsBeforeStart(projectRoot, state.base_commit, input.startCommit);
  const split = { own: emptyGroup(), inherited: emptyGroup() };
  const ownShas = [];
  const inheritedShas = [];
  for (const commit of readBranchCommits(projectRoot, state.base_commit)) {
    const ours = commit.tickets.some((ticket) => own.has(ticket));
    const foreign = own.size > 0 && commit.tickets.length > 0 && !ours;
    const afterStart = beforeStart === null || !beforeStart.has(commit.sha);
    if (ours || !foreign && afterStart) {
      addTo(split.own, commit, commit.tickets);
      ownShas.push(commit.sha);
    } else {
      inheritedShas.push(commit.sha);
      addTo(
        split.inherited,
        commit,
        commit.tickets.filter((ticket) => !own.has(ticket))
      );
    }
  }
  return {
    state: "known",
    reason: null,
    base_commit: state.base_commit,
    own: split.own,
    inherited: split.inherited,
    own_shas: ownShas,
    inherited_shas: inheritedShas
  };
}
function branchCarriesOtherWork(split) {
  return split?.state === "known" && (split.inherited?.tickets.length ?? 0) > 0;
}
function commitCount(count) {
  return `${count} commit${count === 1 ? "" : "s"}`;
}
function describeInherited(group) {
  const tickets = group.tickets.length;
  if (tickets === 0) return `${commitCount(group.count)} made before this change started`;
  const fromTickets = `${commitCount(group.count - group.untagged)} from ${tickets} other ticket${tickets === 1 ? "" : "s"}`;
  if (group.untagged === 0) return fromTickets;
  return `${fromTickets} and ${group.untagged} untagged made before this change started`;
}
function sharedBranchLine(split, branch) {
  if (!branchCarriesOtherWork(split) || !split.inherited) return null;
  return `\u{1F7E1} Branch \`${branch ?? "HEAD"}\` already carries ${describeInherited(split.inherited)}. They ride along in this PR unless you split the branch yourself; paqad never moves commits.`;
}
function intakeBranchLine(projectRoot, ticketRefs) {
  const state = readGitState(projectRoot);
  const split = computeCommitSplit(projectRoot, {
    startCommit: state.head_commit ?? null,
    ownTickets: ticketRefs
  });
  return sharedBranchLine(split, state.branch ?? null);
}

export {
  changeOwnTickets,
  computeCommitSplit,
  branchCarriesOtherWork,
  describeInherited,
  sharedBranchLine,
  intakeBranchLine
};
