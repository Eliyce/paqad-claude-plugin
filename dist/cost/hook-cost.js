import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  changeCostWindow,
  computeChangeCost,
  updateCostCache,
  updateSessionCostCache,
  writeChangeCost
} from "../chunk-OKKNC7KE.js";
import "../chunk-IU76H5GM.js";
import {
  readRouteTurns
} from "../chunk-FHVLX3ZN.js";
import "../chunk-IKAOR4NY.js";
import "../chunk-4S3XFJAH.js";
import "../chunk-GHQXK4A5.js";
import "../chunk-UUBQQJVE.js";
import {
  readWorkflowState
} from "../chunk-WY5PFENQ.js";
import {
  currentFeature
} from "../chunk-53V3JKAD.js";
import "../chunk-TINPSX3N.js";
import "../chunk-BTDDEK7C.js";
import "../chunk-KLM2SM57.js";
import "../chunk-RJMJYPHL.js";
import "../chunk-RAKAXHZ5.js";
import "../chunk-SCQTSYE4.js";
import "../chunk-BOEVU2BD.js";
import "../chunk-NJE7NS7E.js";
import "../chunk-IUKM7KYA.js";
import "../chunk-YA6SCYMC.js";
import "../chunk-Z3NGWHFX.js";
import "../chunk-YWAORJG6.js";
import "../chunk-Q353EDKY.js";
import {
  hookSessionCandidates,
  resolveHookSession
} from "../chunk-SG6LXLDH.js";
import "../chunk-FMQ5YRSP.js";
import "../chunk-AZLA53A6.js";
import "../chunk-IHMBVS6H.js";
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
