import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  formatAge,
  readHld,
  readWaitingIndex,
  resumeLine,
  sessionWaitingLine
} from "../chunk-QZYGLSRK.js";
import {
  currentFeature,
  resumeFeatureByRef
} from "../chunk-I4T6ZSTJ.js";
import "../chunk-DPRQWAIN.js";
import "../chunk-IYZNK7Q2.js";
import "../chunk-WEFEQHGZ.js";
import "../chunk-LDKFDN3R.js";
import "../chunk-H3JU5RBI.js";
import "../chunk-YPOHZLD5.js";
import {
  detectTicketLinks,
  detectTicketRefs
} from "../chunk-YI7GGGDM.js";
import {
  loadGitWorkflow
} from "../chunk-XK65VKUF.js";
import "../chunk-TZCIQC7B.js";
import "../chunk-DZSC6KCZ.js";
import "../chunk-NCABIBTI.js";
import "../chunk-2XQX5CIB.js";
import "../chunk-F6BUWMKO.js";
import "../chunk-4UM6CK6G.js";
import "../chunk-UMPIHMXN.js";
import {
  init_esm_shims
} from "../chunk-G5ZPBAMA.js";

// src/hld/session.ts
init_esm_shims();
function stillWaiting(projectRoot, entry) {
  return readHld(projectRoot, entry.dir)?.state === "awaiting_sign_off";
}
function waitingSignOffLines(projectRoot, now = /* @__PURE__ */ new Date()) {
  return readWaitingIndex(projectRoot).filter((entry) => stillWaiting(projectRoot, entry)).map((entry) => sessionWaitingLine(entry.ref, formatAge(entry.posted_at, now)));
}
function waitingSignOffText(projectRoot, now = /* @__PURE__ */ new Date()) {
  const lines = waitingSignOffLines(projectRoot, now);
  return lines.length === 0 ? null : lines.join("\n");
}
function sourceRefs(projectRoot, prompt) {
  const refs = [];
  for (const source of Object.values(loadGitWorkflow(projectRoot).config.tickets.sources)) {
    try {
      for (const match of prompt.matchAll(new RegExp(source.pattern, "g"))) refs.push(match[0]);
    } catch {
      continue;
    }
  }
  return refs;
}
function names(entry, candidates) {
  const ref = entry.ref.toLowerCase();
  return candidates.some((candidate) => {
    const value = candidate.toLowerCase();
    return value === ref || value.startsWith("#") && ref.endsWith(value);
  });
}
function resumeWaitingByPrompt(projectRoot, sessionId, prompt, now) {
  const waiting = readWaitingIndex(projectRoot);
  if (waiting.length === 0) return null;
  const candidates = [
    ...detectTicketRefs(prompt, "generic"),
    ...detectTicketLinks(prompt).map((link) => link.ref),
    ...sourceRefs(projectRoot, prompt)
  ];
  if (candidates.length === 0) return null;
  const active = currentFeature(projectRoot, sessionId, now);
  const entry = waiting.find(
    (item) => item.dir !== active && names(item, candidates) && stillWaiting(projectRoot, item)
  );
  if (!entry) return null;
  const resumed = resumeFeatureByRef(projectRoot, sessionId, entry.dir, now);
  return resumed === null ? null : resumeLine(entry.ref);
}
export {
  resumeWaitingByPrompt,
  waitingSignOffLines,
  waitingSignOffText
};
