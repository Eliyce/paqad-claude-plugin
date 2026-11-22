import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  changeCostWindow,
  computeChangeCost,
  updateCostCache,
  updateSessionCostCache,
  writeChangeCost
} from "../chunk-AJVRXOZR.js";
import "../chunk-4QLK2APG.js";
import {
  readRouteTurns
} from "../chunk-XHAUVSIZ.js";
import "../chunk-IKAOR4NY.js";
import "../chunk-TFG3KYLM.js";
import "../chunk-UUBQQJVE.js";
import {
  readWorkflowState
} from "../chunk-BXMHKFAF.js";
import "../chunk-4UDYC65U.js";
import {
  currentFeature
} from "../chunk-TIGPOU33.js";
import "../chunk-2XQIUIDS.js";
import "../chunk-BTDDEK7C.js";
import "../chunk-T7KPBKCY.js";
import "../chunk-5G2EOBB5.js";
import "../chunk-OJJKELCB.js";
import "../chunk-FTTLICPK.js";
import "../chunk-BOEVU2BD.js";
import "../chunk-NJE7NS7E.js";
import "../chunk-UOZGCZD7.js";
import "../chunk-YA6SCYMC.js";
import "../chunk-Z3NGWHFX.js";
import "../chunk-YWAORJG6.js";
import "../chunk-UNRAXQSB.js";
import {
  hookSessionCandidates,
  resolveHookSession
} from "../chunk-L7TVJSIU.js";
import "../chunk-QJQ4AXUA.js";
import "../chunk-Q65EMUNY.js";
import "../chunk-BNIV2KZF.js";
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
