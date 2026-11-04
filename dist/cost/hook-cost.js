import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  changeCostWindow,
  computeChangeCost,
  updateCostCache,
  updateSessionCostCache,
  writeChangeCost
} from "../chunk-HBDIMOQM.js";
import "../chunk-LV7EC4F6.js";
import {
  readRouteTurns
} from "../chunk-VSJ2OACP.js";
import "../chunk-XQDE5JXQ.js";
import "../chunk-NUSNYHWM.js";
import "../chunk-V7J7RWKE.js";
import "../chunk-QGZVTKXX.js";
import "../chunk-4I6TDR46.js";
import "../chunk-KKFSSPUD.js";
import {
  readWorkflowState
} from "../chunk-FZLZ7446.js";
import {
  currentFeature
} from "../chunk-43DYNNYO.js";
import "../chunk-QUDDQGFY.js";
import "../chunk-G6D3JYXC.js";
import "../chunk-AINYJ3Q2.js";
import "../chunk-SU7RODZI.js";
import "../chunk-3DGAT6MO.js";
import "../chunk-GI5XTME2.js";
import "../chunk-ER3R2ZPY.js";
import "../chunk-VVRAO2BK.js";
import "../chunk-NAANJBUQ.js";
import {
  hookSessionCandidates,
  resolveHookSession
} from "../chunk-N74EZSUC.js";
import "../chunk-NDVN5PRV.js";
import "../chunk-3STC3IVL.js";
import "../chunk-I7RXYXFH.js";
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
