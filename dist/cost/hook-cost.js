import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  changeCostWindow,
  computeChangeCost,
  updateCostCache,
  updateSessionCostCache,
  writeChangeCost
} from "../chunk-YT7KYIQP.js";
import "../chunk-XT45N7K2.js";
import {
  readRouteTurns
} from "../chunk-IVPPGREZ.js";
import "../chunk-HEJGITDA.js";
import {
  readWorkflowState
} from "../chunk-THNFPAD7.js";
import "../chunk-RLWC6XFR.js";
import {
  currentFeature
} from "../chunk-I4T6ZSTJ.js";
import "../chunk-DPRQWAIN.js";
import "../chunk-IYZNK7Q2.js";
import "../chunk-WEFEQHGZ.js";
import "../chunk-LDKFDN3R.js";
import "../chunk-H3JU5RBI.js";
import "../chunk-YPOHZLD5.js";
import "../chunk-YI7GGGDM.js";
import "../chunk-XK65VKUF.js";
import "../chunk-TZCIQC7B.js";
import "../chunk-DZSC6KCZ.js";
import "../chunk-NCABIBTI.js";
import "../chunk-2XQX5CIB.js";
import {
  hookSessionCandidates,
  resolveHookSession
} from "../chunk-F6BUWMKO.js";
import "../chunk-4UM6CK6G.js";
import "../chunk-UMPIHMXN.js";
import {
  init_esm_shims
} from "../chunk-G5ZPBAMA.js";

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
