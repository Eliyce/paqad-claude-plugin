import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  changeCostWindow,
  computeChangeCost,
  updateCostCache,
  updateSessionCostCache,
  writeChangeCost
} from "../chunk-YRRDPNHS.js";
import "../chunk-WDT4SYL3.js";
import {
  readRouteTurns
} from "../chunk-BAF4BFSC.js";
import "../chunk-M5JAFUJN.js";
import "../chunk-NRKCUFAE.js";
import "../chunk-CJ6GEKKF.js";
import "../chunk-KKFSSPUD.js";
import {
  readWorkflowState
} from "../chunk-FNOZ5GEC.js";
import {
  currentFeature
} from "../chunk-7UCGEMJB.js";
import "../chunk-MLVRTWKF.js";
import "../chunk-IUTPBUW2.js";
import "../chunk-F256LZXA.js";
import "../chunk-WGEG5J6L.js";
import "../chunk-DIAYPPCX.js";
import "../chunk-O25SHWZA.js";
import "../chunk-3CUGDX3J.js";
import "../chunk-SU7RODZI.js";
import {
  hookSessionCandidates,
  resolveHookSession
} from "../chunk-MG36YCW4.js";
import "../chunk-KF7HHHJR.js";
import "../chunk-EGDL57MD.js";
import "../chunk-UCSN7SVD.js";
import {
  init_esm_shims
} from "../chunk-EMKBJVIL.js";

// src/cost/hook-cost.ts
init_esm_shims();
function refreshChangeCostFromHook(input) {
  const sessionId = resolveHookSession(input.projectRoot, input.payload);
  const dirName = currentFeature(input.projectRoot, sessionId);
  if (!dirName) {
    keepSessionTranscript(
      input,
      hookSessionCandidates(input.projectRoot, input.payload)[0] ?? sessionId
    );
    return "no-feature";
  }
  const window = changeCostWindow(input.projectRoot, dirName, input.now);
  if (window === null) return "no-window";
  updateCostCache({
    projectRoot: input.projectRoot,
    sessionId,
    dirName,
    payload: input.payload,
    floor: window.from
  });
  const record = computeChangeCost(input.projectRoot, dirName, { now: input.now });
  if (record === null) return "no-window";
  if (record.sources === 0) return "no-sources";
  writeChangeCost(input.projectRoot, dirName, record, sessionId);
  return "written";
}
function sessionFloor(projectRoot, sessionId, now) {
  return readRouteTurns(projectRoot, sessionId)[0]?.at ?? readWorkflowState(projectRoot, sessionId).turn_started_at ?? now().toISOString();
}
function keepSessionTranscript(input, sessionId) {
  updateSessionCostCache({
    projectRoot: input.projectRoot,
    sessionId,
    payload: input.payload,
    floor: sessionFloor(input.projectRoot, sessionId, input.now ?? (() => /* @__PURE__ */ new Date()))
  });
}
export {
  refreshChangeCostFromHook
};
