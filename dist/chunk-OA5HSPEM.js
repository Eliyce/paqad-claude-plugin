import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  stampFeatureDocument
} from "./chunk-HFLY3JB2.js";
import {
  dirname,
  featureFilePath,
  join
} from "./chunk-47TQR4LW.js";
import {
  PATHS
} from "./chunk-G3YYQOXJ.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/hld/copy.ts
init_esm_shims();
var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var MINUTE = 6e4;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
function plural(count, unit) {
  return `${count} ${unit}${count === 1 ? "" : "s"}`;
}
function formatAge(from, now) {
  const elapsed = Math.max(0, now.getTime() - Date.parse(from));
  if (elapsed < MINUTE) return "less than a minute";
  if (elapsed < HOUR) return plural(Math.floor(elapsed / MINUTE), "minute");
  if (elapsed < DAY) return plural(Math.floor(elapsed / HOUR), "hour");
  return plural(Math.floor(elapsed / DAY), "day");
}
function formatDay(at) {
  const date = new Date(at);
  return `${date.getUTCDate()} ${MONTHS[date.getUTCMonth()]}`;
}
var FREEZE_NEXT_LINE = "> - \u{1F7E1} next: write the high-level design. Run paqad-ai hld brief.";
var FREEZE_NEXT_V2_LINE = "> - \u{1F7E1} next: update the high-level design. Run paqad-ai hld brief; it goes out as v2 on the same comment.";
function postedWaitingLine(ref) {
  return `Posted the high-level design to ${ref}. The build starts once it's signed off there. You can work on something else meanwhile.`;
}
function postedInfoLine(ref) {
  return `Posted the high-level design to ${ref} for the team to read. Carrying on with the build.`;
}
function approvedLine(ref, at) {
  return `The high-level design for ${ref} was approved on ${formatDay(at)}. Starting the build.`;
}
function changesRequestedLine(ref) {
  return `There's a reply on the high-level design for ${ref} asking for changes. Here it is, so we can update the spec:`;
}
function stillWaitingLine(ref, age) {
  return `No answer on the high-level design for ${ref} yet (posted ${age} ago).`;
}
function notConnectedLine(target) {
  return `I couldn't post the high-level design: ${target} isn't connected. It's in chat for you to share. Connect ${target} to post it automatically next time.`;
}
function gateBlockLine(ref, allowSkip) {
  return allowSkip ? `The high-level design for ${ref} is waiting for sign-off. Check for an answer with paqad-ai hld check-approval, or skip with paqad-ai hld skip --reason "<why>".` : `The high-level design for ${ref} is waiting for sign-off. Check for an answer with paqad-ai hld check-approval. The build starts only once an approver answers there.`;
}
var GATE_NO_DESIGN_LINE = "The high-level design for this change hasn't been written yet. Write it and record it first: run paqad-ai hld brief, then paqad-ai hld posted or paqad-ai hld not-posted.";
function sessionWaitingLine(ref, age) {
  return `${ref} is waiting for high-level design sign-off (posted ${age} ago).`;
}
function resumeLine(ref) {
  return `Resumed the change for ${ref}, which is waiting for high-level design sign-off. Run paqad-ai hld check-approval first.`;
}
function prSignedOffLine(ref, at, link) {
  return `High-level design signed off in ${ref} on ${formatDay(at)} (${link}).`;
}
function prSkippedLine(reason) {
  return `Built before high-level design sign-off. Reason: ${reason.trim().replace(/\.$/u, "")}.`;
}
function receiptSignedOffLine(link) {
  return `\u{1F7E2} High-level design signed off (${link})`;
}
var RECEIPT_POSTED_LINE = "High-level design: \u{1F7E1} posted, not signed off";
var RECEIPT_OFF_LINE = "High-level design: \u26AA off for this team";
var RECEIPT_NOT_WRITTEN_LINE = "High-level design: \u{1F7E1} not written yet";
function receiptSkippedLine(reason) {
  return `\u{1F7E1} High-level design skipped before sign-off. Reason: ${reason.trim().replace(/\.$/u, "")}.`;
}
var RECEIPT_NOT_POSTED_LINE = "\u{1F7E1} High-level design not posted, shared in chat";
function detailMissingLine(ref) {
  return `The More detail part of the high-level design for ${ref} didn't post. It will be added to the same thread next time; the design still waits for sign-off.`;
}
function moveFailedLine(ref, status) {
  return `Couldn't move ${ref} to "${status}". The design is posted and still waits for sign-off.`;
}
function startedOverLine(ref) {
  return `Updated the high-level design for ${ref} to v2. Approval starts over, so earlier replies no longer count.`;
}
function alreadyRecordedLine(ref, target) {
  return `This version of the high-level design for ${ref} is already recorded as posted to ${target}. Nothing to post again.`;
}
function skippedLine(ref) {
  return `Skipped high-level design sign-off for ${ref}. Post the reason back to the team where the design was posted.`;
}
var SKIP_NOT_ALLOWED_LINE = "This team doesn't allow building before sign-off (allow_skip_with_reason is false in design-sign-off.yaml). Wait for an approver to answer.";
var SKIP_NEEDS_REASON_LINE = 'Give a reason to skip sign-off: paqad-ai hld skip --reason "<why>".';

// src/hld/store.ts
init_esm_shims();
import { createHash } from "crypto";
import { mkdirSync, readFileSync, renameSync, writeFileSync } from "fs";
var HLD_DOC_TYPE = "paqad.hld";
var HLD_SCHEMA_VERSION = 1;
var HLD_STATES = [
  "awaiting_sign_off",
  "approved",
  "changes_requested",
  "skipped",
  "not_posted"
];
function sha256(text) {
  return createHash("sha256").update(text, "utf8").digest("hex");
}
function digestDesign(text) {
  return sha256(text.replace(/\r\n/gu, "\n").trim());
}
function authorDigest(authorId) {
  return sha256(authorId.trim());
}
function emptyHldRecord(ref) {
  return {
    state: "awaiting_sign_off",
    ref,
    version: 0,
    digest: "",
    posts: [],
    approved_at: null,
    approval_link: null,
    skip_reason: null
  };
}
function hldPath(projectRoot, dirName) {
  return join(projectRoot, featureFilePath(dirName, "hld"));
}
function hldMarkdownPath(projectRoot, dirName) {
  return join(projectRoot, featureFilePath(dirName, "hldMd"));
}
function readHld(projectRoot, dirName) {
  try {
    const parsed = JSON.parse(readFileSync(hldPath(projectRoot, dirName), "utf8"));
    if (!HLD_STATES.includes(parsed.state)) return null;
    return {
      state: parsed.state,
      ref: typeof parsed.ref === "string" ? parsed.ref : "",
      version: typeof parsed.version === "number" ? parsed.version : 0,
      digest: typeof parsed.digest === "string" ? parsed.digest : "",
      posts: Array.isArray(parsed.posts) ? parsed.posts : [],
      approved_at: typeof parsed.approved_at === "string" ? parsed.approved_at : null,
      approval_link: typeof parsed.approval_link === "string" ? parsed.approval_link : null,
      skip_reason: typeof parsed.skip_reason === "string" ? parsed.skip_reason : null
    };
  } catch {
    return null;
  }
}
function writeAtomic(path, text) {
  mkdirSync(dirname(path), { recursive: true });
  const tmp = `${path}.tmp-${process.pid}`;
  writeFileSync(tmp, text, "utf8");
  renameSync(tmp, path);
}
function writeHld(projectRoot, dirName, record, options = {}) {
  const doc = stampFeatureDocument({
    projectRoot,
    dirName,
    docType: HLD_DOC_TYPE,
    schemaVersion: HLD_SCHEMA_VERSION,
    sessionId: options.sessionId,
    now: options.now,
    body: { ...record }
  });
  const path = hldPath(projectRoot, dirName);
  writeAtomic(path, `${JSON.stringify(doc, null, 2)}
`);
  updateWaitingIndex(projectRoot, dirName, record, options.waits ?? true);
  return path;
}
function writeHldMarkdown(projectRoot, dirName, text) {
  const path = hldMarkdownPath(projectRoot, dirName);
  writeAtomic(path, text.endsWith("\n") ? text : `${text}
`);
  return path;
}
function latestPost(record) {
  return record.posts.at(-1) ?? null;
}
function waitingIndexPath(projectRoot) {
  return join(projectRoot, PATHS.HLD_WAITING_INDEX);
}
function readWaitingIndex(projectRoot) {
  try {
    const parsed = JSON.parse(readFileSync(waitingIndexPath(projectRoot), "utf8"));
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (entry) => typeof entry === "object" && entry !== null && typeof entry.dir === "string" && typeof entry.ref === "string" && typeof entry.posted_at === "string"
    );
  } catch {
    return [];
  }
}
function updateWaitingIndex(projectRoot, dirName, record, waits) {
  const rest = readWaitingIndex(projectRoot).filter((entry) => entry.dir !== dirName);
  const post = latestPost(record);
  const next = waits && record.state === "awaiting_sign_off" && post ? [...rest, { dir: dirName, ref: record.ref, posted_at: post.at }] : rest;
  writeAtomic(waitingIndexPath(projectRoot), `${JSON.stringify(next, null, 2)}
`);
}

export {
  formatAge,
  FREEZE_NEXT_LINE,
  FREEZE_NEXT_V2_LINE,
  postedWaitingLine,
  postedInfoLine,
  approvedLine,
  changesRequestedLine,
  stillWaitingLine,
  notConnectedLine,
  gateBlockLine,
  GATE_NO_DESIGN_LINE,
  sessionWaitingLine,
  resumeLine,
  prSignedOffLine,
  prSkippedLine,
  receiptSignedOffLine,
  RECEIPT_POSTED_LINE,
  RECEIPT_OFF_LINE,
  RECEIPT_NOT_WRITTEN_LINE,
  receiptSkippedLine,
  RECEIPT_NOT_POSTED_LINE,
  detailMissingLine,
  moveFailedLine,
  startedOverLine,
  alreadyRecordedLine,
  skippedLine,
  SKIP_NOT_ALLOWED_LINE,
  SKIP_NEEDS_REASON_LINE,
  digestDesign,
  authorDigest,
  emptyHldRecord,
  readHld,
  writeHld,
  writeHldMarkdown,
  latestPost,
  readWaitingIndex
};
