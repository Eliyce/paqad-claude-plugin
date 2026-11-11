import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  formatAge,
  readHld,
  readWaitingIndex,
  resumeLine,
  sessionWaitingLine
} from "../chunk-Z6IZVJ2I.js";
import {
  currentFeature,
  resumeFeatureByRef
} from "../chunk-DBYGVM5Q.js";
import "../chunk-TINPSX3N.js";
import "../chunk-BTDDEK7C.js";
import "../chunk-YDQKDCXK.js";
import "../chunk-RJMJYPHL.js";
import "../chunk-YUYQHVVS.js";
import "../chunk-OAGMHQY5.js";
import "../chunk-BOEVU2BD.js";
import {
  detectTicketLinks,
  detectTicketRefs
} from "../chunk-NJE7NS7E.js";
import {
  loadGitWorkflow
} from "../chunk-7PD3OGSQ.js";
import "../chunk-YA6SCYMC.js";
import "../chunk-Z3NGWHFX.js";
import "../chunk-YWAORJG6.js";
import "../chunk-Q353EDKY.js";
import "../chunk-SG6LXLDH.js";
import "../chunk-FMQ5YRSP.js";
import "../chunk-AZLA53A6.js";
import "../chunk-IHMBVS6H.js";
import {
  init_esm_shims
} from "../chunk-IDFRWBMN.js";

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
