import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  changeCostWindow,
  computeChangeCost,
  updateCostCache,
  updateSessionCostCache,
  writeChangeCost
} from "../chunk-BRB6VCKF.js";
import "../chunk-O5TCGCQK.js";
import {
  readRouteTurns
} from "../chunk-5MJGS2Q4.js";
import "../chunk-V7J7RWKE.js";
import "../chunk-GRDVDM4O.js";
import "../chunk-MTLVILTP.js";
import "../chunk-KKFSSPUD.js";
import {
  readWorkflowState
} from "../chunk-Q47PFU2T.js";
import {
  currentFeature
} from "../chunk-UBLNP2J3.js";
import "../chunk-NUSNYHWM.js";
import "../chunk-B4PUCHRN.js";
import "../chunk-LFAJTL2F.js";
import "../chunk-XPYTBQJV.js";
import "../chunk-G4TAWNZH.js";
import "../chunk-AINYJ3Q2.js";
import "../chunk-RMTAX7L3.js";
import "../chunk-M4YTSA5U.js";
import "../chunk-N7PDT64R.js";
import "../chunk-ER3R2ZPY.js";
import "../chunk-VVRAO2BK.js";
import "../chunk-7JNCYM2L.js";
import {
  hookSessionCandidates,
  resolveHookSession
} from "../chunk-64NG3SPK.js";
import "../chunk-3E2AXQ3O.js";
import "../chunk-QJ4EG2V2.js";
import "../chunk-42HWSPMN.js";
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
