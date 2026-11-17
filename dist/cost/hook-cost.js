import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  changeCostWindow,
  computeChangeCost,
  updateCostCache,
  updateSessionCostCache,
  writeChangeCost
} from "../chunk-SZUUPBSG.js";
import "../chunk-QZQYEDOU.js";
import {
  readRouteTurns
} from "../chunk-BUHSOGJG.js";
import "../chunk-IKAOR4NY.js";
import "../chunk-TFG3KYLM.js";
import "../chunk-UUBQQJVE.js";
import "../chunk-4UDYC65U.js";
import {
  readWorkflowState
} from "../chunk-JNYGWLBM.js";
import {
  currentFeature
} from "../chunk-HUUCKZRD.js";
import "../chunk-TINPSX3N.js";
import "../chunk-BTDDEK7C.js";
import "../chunk-WIFSXOJT.js";
import "../chunk-IPSMQB2X.js";
import "../chunk-4OZN3ROM.js";
import "../chunk-PF7KWSCM.js";
import "../chunk-BOEVU2BD.js";
import "../chunk-NJE7NS7E.js";
import "../chunk-6MIIR3LR.js";
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
