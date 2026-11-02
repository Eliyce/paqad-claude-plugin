import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  changeCostWindow,
  computeChangeCost,
  updateCostCache,
  updateSessionCostCache,
  writeChangeCost
} from "../chunk-G2BROLE2.js";
import "../chunk-JHJEDBZF.js";
import {
  readRouteTurns
} from "../chunk-NSYAD3PH.js";
import "../chunk-2THVGJVJ.js";
import "../chunk-V7J7RWKE.js";
import "../chunk-NUSNYHWM.js";
import "../chunk-YIVK3KXH.js";
import "../chunk-TUORQPXT.js";
import "../chunk-KKFSSPUD.js";
import {
  readWorkflowState
} from "../chunk-5OX4IJDE.js";
import {
  currentFeature
} from "../chunk-QEO5R7UW.js";
import "../chunk-QUDDQGFY.js";
import "../chunk-FNO5LUR2.js";
import "../chunk-AINYJ3Q2.js";
import "../chunk-YT764EQH.js";
import "../chunk-VVRAO2BK.js";
import "../chunk-KAL2KZVN.js";
import "../chunk-SU7RODZI.js";
import {
  hookSessionCandidates,
  resolveHookSession
} from "../chunk-DNOGJOTT.js";
import "../chunk-XYQUJYH4.js";
import "../chunk-3STC3IVL.js";
import "../chunk-CWGYZAT6.js";
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
