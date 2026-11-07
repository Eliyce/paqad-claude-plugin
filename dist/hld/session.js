import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  formatAge,
  readHld,
  readWaitingIndex,
  resumeLine,
  sessionWaitingLine
} from "../chunk-OA5HSPEM.js";
import {
  currentFeature,
  resumeFeatureByRef
} from "../chunk-HFLY3JB2.js";
import "../chunk-NUSNYHWM.js";
import "../chunk-B4PUCHRN.js";
import "../chunk-MMUZLNZF.js";
import "../chunk-4MQZPCLY.js";
import "../chunk-JO63DVE7.js";
import "../chunk-AINYJ3Q2.js";
import {
  detectTicketLinks,
  detectTicketRefs
} from "../chunk-RMTAX7L3.js";
import {
  loadGitWorkflow
} from "../chunk-52MLSHP2.js";
import "../chunk-N7PDT64R.js";
import "../chunk-ER3R2ZPY.js";
import "../chunk-VVRAO2BK.js";
import "../chunk-4VFZMH6Y.js";
import "../chunk-FCULNH3A.js";
import "../chunk-PEDNW63C.js";
import "../chunk-47TQR4LW.js";
import "../chunk-G3YYQOXJ.js";
import {
  init_esm_shims
} from "../chunk-EMKBJVIL.js";

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
