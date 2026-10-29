import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  changeCostWindow,
  computeChangeCost,
  updateCostCache,
  updateSessionCostCache,
  writeChangeCost
} from "../chunk-MLXEYD6T.js";
import "../chunk-5BABRV7V.js";
import {
  readRouteTurns
} from "../chunk-B4LV77TI.js";
import "../chunk-UXU57VCB.js";
import "../chunk-NRKCUFAE.js";
import "../chunk-NUSNYHWM.js";
import "../chunk-BW7VURA4.js";
import "../chunk-RQMBP7NZ.js";
import "../chunk-KKFSSPUD.js";
import {
  readWorkflowState
} from "../chunk-KPSH47JZ.js";
import {
  currentFeature
} from "../chunk-WTYH7MZ3.js";
import "../chunk-QUDDQGFY.js";
import "../chunk-VV76C43H.js";
import "../chunk-AINYJ3Q2.js";
import "../chunk-TVWMFQYX.js";
import "../chunk-QINSFA6R.js";
import "../chunk-SU7RODZI.js";
import {
  hookSessionCandidates,
  resolveHookSession
} from "../chunk-HV6ESCNW.js";
import "../chunk-DDJC5PRW.js";
import "../chunk-3STC3IVL.js";
import "../chunk-LW3OCT4Y.js";
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
