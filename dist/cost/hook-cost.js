import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  changeCostWindow,
  computeChangeCost,
  updateCostCache,
  updateSessionCostCache,
  writeChangeCost
} from "../chunk-JQBNU5XL.js";
import "../chunk-MDA2NCNB.js";
import {
  readRouteTurns
} from "../chunk-QLO5OV2E.js";
import "../chunk-IKAOR4NY.js";
import "../chunk-EGJD2UEP.js";
import "../chunk-UUBQQJVE.js";
import "../chunk-BHLWN7MT.js";
import {
  readWorkflowState
} from "../chunk-7KRQ7TSA.js";
import {
  currentFeature
} from "../chunk-3RMUOOZL.js";
import "../chunk-TINPSX3N.js";
import "../chunk-BTDDEK7C.js";
import "../chunk-6BQ3LK3W.js";
import "../chunk-6KTWDVJB.js";
import "../chunk-ABZDAL5H.js";
import "../chunk-4UZQY3YQ.js";
import "../chunk-BOEVU2BD.js";
import "../chunk-NJE7NS7E.js";
import "../chunk-X25GN7Q4.js";
import "../chunk-YA6SCYMC.js";
import "../chunk-Z3NGWHFX.js";
import "../chunk-YWAORJG6.js";
import "../chunk-FNORANTL.js";
import {
  hookSessionCandidates,
  resolveHookSession
} from "../chunk-WPHHUTLG.js";
import "../chunk-OFCFJ7RN.js";
import "../chunk-6ZK23QLX.js";
import "../chunk-UIFRWT3J.js";
import {
  init_esm_shims
} from "../chunk-IDFRWBMN.js";

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
