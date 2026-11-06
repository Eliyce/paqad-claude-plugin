import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  changeCostWindow,
  computeChangeCost,
  updateCostCache,
  updateSessionCostCache,
  writeChangeCost
} from "../chunk-XFCKUADR.js";
import "../chunk-WU3WSQ7A.js";
import {
  readRouteTurns
} from "../chunk-WV27ECFE.js";
import "../chunk-V7J7RWKE.js";
import "../chunk-5CVEVYVX.js";
import "../chunk-ZFTFBUXP.js";
import "../chunk-KKFSSPUD.js";
import {
  readWorkflowState
} from "../chunk-DWHMJEL3.js";
import {
  currentFeature
} from "../chunk-N7XF5HIR.js";
import "../chunk-NUSNYHWM.js";
import "../chunk-B4PUCHRN.js";
import "../chunk-QD7RCE74.js";
import "../chunk-4MQZPCLY.js";
import "../chunk-BBV37BA3.js";
import "../chunk-AINYJ3Q2.js";
import "../chunk-RMTAX7L3.js";
import "../chunk-LLLBX77H.js";
import "../chunk-N7PDT64R.js";
import "../chunk-ER3R2ZPY.js";
import "../chunk-VVRAO2BK.js";
import "../chunk-4VFZMH6Y.js";
import {
  hookSessionCandidates,
  resolveHookSession
} from "../chunk-XAF7XXEZ.js";
import "../chunk-PEDNW63C.js";
import "../chunk-47TQR4LW.js";
import "../chunk-G3YYQOXJ.js";
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
