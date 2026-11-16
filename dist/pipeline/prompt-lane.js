import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  PipelineRouter,
  RequestClassifier
} from "../chunk-NJ4RMXVL.js";
import "../chunk-6HLIJGQV.js";
import {
  hasOpenUnendedStage
} from "../chunk-ZVONEL62.js";
import {
  appendRouteTurn
} from "../chunk-QLO5OV2E.js";
import {
  paqadFrameLead
} from "../chunk-VZJTQQG2.js";
import "../chunk-XXJEO6YM.js";
import "../chunk-P7EZBA7Y.js";
import "../chunk-CYAFQOZ5.js";
import "../chunk-2L4DHZJ6.js";
import "../chunk-CECHOUNN.js";
import {
  appendHooksLog
} from "../chunk-EGJD2UEP.js";
import "../chunk-6K7RTPCM.js";
import "../chunk-IV3YOX6V.js";
import "../chunk-HX3IC62P.js";
import "../chunk-G5I52VOH.js";
import "../chunk-3P4W22QI.js";
import "../chunk-CK4KV2B2.js";
import "../chunk-MVHA2RWU.js";
import "../chunk-UUBQQJVE.js";
import "../chunk-6MMKZ2NI.js";
import "../chunk-MDXUST3Z.js";
import "../chunk-BHLWN7MT.js";
import {
  writeSessionRoute
} from "../chunk-UDY3MMWJ.js";
import {
  changeKindForWorkflow,
  isFeatureDevelopmentRoute,
  readWorkflowState,
  resolveRoutedWorkflow,
  routeWorkflow,
  writeWorkflowState
} from "../chunk-7KRQ7TSA.js";
import {
  writePendingImpact,
  writePendingKind,
  writePendingLane
} from "../chunk-WLFUMAJW.js";
import "../chunk-MN67TZD6.js";
import "../chunk-P4RPU2KB.js";
import "../chunk-Y2ZLYYTT.js";
import {
  readFeatureStageUnit
} from "../chunk-3RMUOOZL.js";
import "../chunk-TINPSX3N.js";
import "../chunk-BTDDEK7C.js";
import {
  isBundleClosed,
  laneRank,
  liveStageAgents,
  readChangeConstants
} from "../chunk-6BQ3LK3W.js";
import "../chunk-6KTWDVJB.js";
import {
  STAGE_ORDER
} from "../chunk-ABZDAL5H.js";
import "../chunk-4UZQY3YQ.js";
import "../chunk-BOEVU2BD.js";
import "../chunk-NJE7NS7E.js";
import "../chunk-X25GN7Q4.js";
import "../chunk-YA6SCYMC.js";
import "../chunk-Z3NGWHFX.js";
import "../chunk-YWAORJG6.js";
import "../chunk-FNORANTL.js";
import {
  resolveSessionId
} from "../chunk-WPHHUTLG.js";
import {
  readSessionControl
} from "../chunk-OFCFJ7RN.js";
import "../chunk-6ZK23QLX.js";
import "../chunk-UIFRWT3J.js";
import {
  init_esm_shims
} from "../chunk-IDFRWBMN.js";

// src/pipeline/prompt-lane.ts
init_esm_shims();
var LANE_REASON = {
  fast: "small, low-risk change \u2014 quick path, no full spec needed",
  graduated: "a moderate change \u2014 I set up spec-before-build for it",
  full: "risky or wide-reaching \u2014 full path (spec \u2192 build \u2192 verify)"
};
var ROUTE_REASON = {
  "feature-development": "a code change \u2014 the full build path",
  "project-question": "a question about the project \u2014 no code change",
  "documentation-update": "creating or refreshing the project documentation",
  "module-documentation": "documenting a module",
  pentest: "a security test of the app",
  "design-test": "auditing the UI against the design system",
  "codebase-health": "a health check-up of the codebase \u2014 dead code, risky deps, secrets, stale docs",
  "site-map": "mapping the app's surfaces, navigation, and journeys against the code",
  "rules-analyze": "analysing which rules can become scripts",
  "root-cause-analysis": "a post-incident root-cause analysis",
  discovery: "shaping an uncertain idea into a practical next step \u2014 no code yet",
  "rules-discovery": "bringing the rules and stack docs up to date with the real stack",
  onboarding: "setting up paqad as one eight-step onboarding journey",
  "no-workflow": "just chatting \u2014 nothing to set up"
};
var SYSTEM_NOTIFICATION_ELEMENTS = [
  "task-notification",
  "ci-monitor-event",
  "background-task-notification"
];
var SYSTEM_NOTIFICATION_BANNER = "[system notification - not user input]";
var STOP_HOOK_FEEDBACK_PREFIX = "stop hook feedback:";
var SUBAGENT_HANDBACK_MARKERS = {
  element: "agent-message",
  label: "[subagent hand-back]"
};
var BARE_LINK_SOURCE = "https?://\\S+|#\\d+|\\b[A-Z][A-Z0-9]+-\\d+\\b";
var BARE_LINK_RE = new RegExp(BARE_LINK_SOURCE);
var BARE_LINK_STRIP_RE = new RegExp(BARE_LINK_SOURCE, "g");
var BARE_TICKET_FILLER = /* @__PURE__ */ new Set([
  "implement",
  "fix",
  "fixes",
  "change",
  "update",
  "refactor",
  "rework",
  "rename",
  "build",
  "make",
  "create",
  "add",
  "wire",
  "do",
  "get",
  "getting",
  "working",
  "work",
  "this",
  "that",
  "it",
  "the",
  "a",
  "an",
  "and",
  "or",
  "please",
  "thanks",
  "thank",
  "ticket",
  "issue",
  "issues",
  "task",
  "item",
  "pr",
  "on",
  "for",
  "to",
  "in",
  "of",
  "see",
  "link",
  "resolve",
  "close",
  "closes",
  "handle",
  "complete",
  "small",
  "commits",
  "commit",
  "watch",
  "green",
  "ci",
  "review",
  "merge",
  "branch",
  "per",
  "with",
  "from",
  "plus",
  "let",
  "lets",
  "can",
  "you",
  "your",
  "my",
  "our",
  "us",
  "we",
  "up",
  "out",
  "now",
  "just",
  "also",
  "then",
  "next",
  "step",
  "steps",
  "follow",
  "following",
  "above",
  "below",
  "here",
  "there",
  "go",
  "ahead",
  "start",
  "finish",
  "done",
  "ok",
  "okay"
]);
function isBareTicketPrompt(prompt) {
  if (!BARE_LINK_RE.test(prompt)) return false;
  const stripped = prompt.replace(BARE_LINK_STRIP_RE, " ");
  const words = stripped.toLowerCase().match(/[a-z0-9]+/g) ?? [];
  return words.every((word) => BARE_TICKET_FILLER.has(word));
}
function isSystemNotificationPrompt(prompt) {
  const head = prompt.trimStart().toLowerCase();
  if (head.startsWith(SYSTEM_NOTIFICATION_BANNER) || head.startsWith(STOP_HOOK_FEEDBACK_PREFIX)) {
    return true;
  }
  if (startsWithNotificationElement(head)) {
    return true;
  }
  const lines = head.split(/\r?\n/).map((line) => line.trim());
  if (lines.includes(SYSTEM_NOTIFICATION_BANNER) && lines.some((line) => startsWithNotificationElement(line))) {
    return true;
  }
  return isSubagentHandBack(lines);
}
function isSubagentHandBack(lines) {
  const element = SUBAGENT_HANDBACK_MARKERS.element;
  const opensElement = lines.some(
    (line) => line.startsWith(`<${element} `) || line.startsWith(`<${element}>`)
  );
  return opensElement && lines.some((line) => line.startsWith(SUBAGENT_HANDBACK_MARKERS.label));
}
function startsWithNotificationElement(text) {
  return SYSTEM_NOTIFICATION_ELEMENTS.some((element) => text.startsWith(`<${element}>`));
}
var SLASH_COMMAND_ROUTES = {
  "paqad-discover": "discovery",
  "paqad-ask": "project-question"
};
var SLASH_COMMAND_RE = /^\/([A-Za-z0-9:_-]+)(\s|$)/;
function slashCommandName(prompt) {
  const match = SLASH_COMMAND_RE.exec(prompt.trimStart());
  if (!match) {
    return null;
  }
  const full = match[1];
  const lastColon = full.lastIndexOf(":");
  return lastColon === -1 ? full : full.slice(lastColon + 1);
}
async function resolvePromptRoute(projectRoot, request, deps = {}) {
  const classify = deps.classify ?? ((input) => new RequestClassifier({ projectRoot }).classify(input));
  const route = deps.route ?? ((classification2) => new PipelineRouter().route(classification2));
  const classification = await classify({ request });
  const routed = resolveRoutedWorkflow(classification.workflow);
  if (isBareTicketPrompt(request)) {
    return {
      routed: "feature-development",
      ...isFeatureDevelopmentRoute(routed) ? { kind: changeKindForWorkflow(classification.workflow) } : {},
      lane: null,
      reason: "reading the ticket before I set the depth \u2014 no lane guessed from a bare link"
    };
  }
  if (!isFeatureDevelopmentRoute(routed)) {
    return { routed, lane: null, reason: ROUTE_REASON[routed] };
  }
  const kind = changeKindForWorkflow(classification.workflow);
  const { lane } = route(classification);
  return {
    routed,
    kind,
    lane,
    impact: {
      database_impact: classification.database_impact,
      api_impact: classification.api_impact
    },
    reason: lane === null ? ROUTE_REASON["feature-development"] : LANE_REASON[lane]
  };
}
function narrateRoute(routed, lane, reason, resumed) {
  if (routed === "no-workflow") {
    return null;
  }
  const verb = resumed ? "resumed" : "routed to";
  if (routed === "feature-development" && lane !== null) {
    return paqadFrameLead(`${verb} feature-development, ${lane} lane (${reason})`);
  }
  return paqadFrameLead(`${verb} ${routed} (${reason})`);
}
var OPEN_CHANGE_STAGE_REASON = "a step of the change already open in this session";
var STAGE_NAME_OVERRIDABLE_ROUTES = /* @__PURE__ */ new Set([
  "documentation-update",
  "project-question",
  "no-workflow"
]);
var STAGE_NAME_RE = new RegExp(
  `\\b(?:${STAGE_ORDER.map((stage) => stage.replace(/_/g, "[_ ]")).join("|")})\\b`,
  "i"
);
function namesStageOfOpenChange(projectRoot, sessionId, prior, request) {
  if (!STAGE_NAME_RE.test(request)) {
    return false;
  }
  if (prior.active !== null && isFeatureDevelopmentRoute(prior.active.workflow)) {
    return true;
  }
  const open = readSessionControl(projectRoot, sessionId).active;
  return open !== null && !isBundleClosed(projectRoot, open);
}
var RUNNING_CHANGE_REASON = "the change open in this session is still running";
var RESUME_REASON = "you asked to pick the paused change back up";
var RESUME_INTENT_RE = /^\s*(?:please\s+)?(?:continue|resume|carry\s+on)(?:\s+(?:with\s+)?(?:the|this|that|my|our)\s+(?:paused\s+)?(?:change|feature|work|task))?(?:\s+please)?\s*[.!]*\s*$/i;
var QUESTION_LEAD_RE = /^\s*(?:what|why|how|when|where|which|who|whose|does|do|did|is|are|was|were|can|could|should|would|will|has|have|explain|tell me)\b/i;
function isPlainQuestion(request) {
  return request.trim().endsWith("?") || QUESTION_LEAD_RE.test(request);
}
function featureChangePaused(prior) {
  return (prior.active === null || !isFeatureDevelopmentRoute(prior.active.workflow)) && prior.paused.some((entry) => isFeatureDevelopmentRoute(entry.workflow));
}
var RECORDED_LANE_REASON = "the lane recorded on this change";
function openChangeOf(projectRoot, sessionId) {
  const open = readSessionControl(projectRoot, sessionId).active;
  return open !== null && !isBundleClosed(projectRoot, open) ? open : null;
}
function changeIsRunning(projectRoot, dirName) {
  if (dirName === null) return false;
  const rows = readFeatureStageUnit(projectRoot, dirName);
  return hasOpenUnendedStage(rows) || liveStageAgents(rows).length > 0;
}
async function runPromptRouteSeam(input, deps = {}) {
  if (isSystemNotificationPrompt(input.request)) {
    return {
      routed: "no-workflow",
      lane: null,
      resumed: null,
      narration: null,
      notification: true
    };
  }
  const slashName = slashCommandName(input.request);
  let routed;
  let lane;
  let reason;
  let kind;
  let impact;
  if (slashName !== null) {
    const slashRoute = SLASH_COMMAND_ROUTES[slashName];
    if (slashRoute === void 0) {
      return {
        routed: "no-workflow",
        lane: null,
        resumed: null,
        narration: null,
        notification: true
      };
    }
    routed = slashRoute;
    lane = null;
    reason = ROUTE_REASON[slashRoute];
  } else {
    ({ routed, lane, reason, kind, impact } = await resolvePromptRoute(
      input.projectRoot,
      input.request,
      deps
    ));
  }
  const sessionId = resolveSessionId(input.projectRoot, input.sessionId);
  const prior = readWorkflowState(input.projectRoot, sessionId);
  const paused = featureChangePaused(prior);
  const questionWhilePaused = slashName === null && paused && routed === "project-question" && isPlainQuestion(input.request);
  if (slashName === null && paused && RESUME_INTENT_RE.test(input.request)) {
    routed = "feature-development";
    lane = null;
    kind = void 0;
    reason = RESUME_REASON;
  }
  if (!questionWhilePaused && slashName === null && STAGE_NAME_OVERRIDABLE_ROUTES.has(routed) && namesStageOfOpenChange(input.projectRoot, sessionId, prior, input.request)) {
    routed = "feature-development";
    lane = null;
    kind = void 0;
    reason = OPEN_CHANGE_STAGE_REASON;
  }
  const openChange = openChangeOf(input.projectRoot, sessionId);
  if (!questionWhilePaused && slashName === null && !isFeatureDevelopmentRoute(routed) && changeIsRunning(input.projectRoot, openChange)) {
    routed = "feature-development";
    lane = null;
    kind = void 0;
    reason = RUNNING_CHANGE_REASON;
  }
  const recordedLane = isFeatureDevelopmentRoute(routed) && openChange !== null ? readChangeConstants(input.projectRoot, openChange).lane : null;
  if (recordedLane !== null && laneRank(recordedLane) >= laneRank(lane)) {
    lane = recordedLane;
    reason = RECORDED_LANE_REASON;
  }
  const anchors = lane === null ? { reason } : { lane, reason };
  const transition = routeWorkflow(prior, routed, anchors);
  const turnStartedAt = (deps.now ?? (() => /* @__PURE__ */ new Date()))().toISOString();
  writeWorkflowState(input.projectRoot, sessionId, {
    ...transition.state,
    turn_started_at: turnStartedAt
  });
  try {
    appendRouteTurn(input.projectRoot, sessionId, { at: turnStartedAt, workflow: routed });
  } catch (error) {
    appendHooksLog(
      input.projectRoot,
      `route-turns: append failed: ${error instanceof Error ? error.message : String(error)}`
    );
  }
  if (isFeatureDevelopmentRoute(routed) && lane !== null && recordedLane === null) {
    writePendingLane(input.projectRoot, sessionId, lane);
    if (impact !== void 0) writePendingImpact(input.projectRoot, sessionId, impact);
  }
  if (isFeatureDevelopmentRoute(routed) && kind !== void 0) {
    writePendingKind(input.projectRoot, sessionId, kind);
  }
  writeSessionRoute(
    input.projectRoot,
    { workflow: routed, query: input.request, adapter: input.adapter },
    sessionId
  );
  return {
    routed,
    lane,
    resumed: transition.resumed,
    narration: narrateRoute(routed, lane, reason, transition.resumed)
  };
}
export {
  BARE_TICKET_FILLER,
  SLASH_COMMAND_ROUTES,
  STOP_HOOK_FEEDBACK_PREFIX,
  SUBAGENT_HANDBACK_MARKERS,
  SYSTEM_NOTIFICATION_BANNER,
  SYSTEM_NOTIFICATION_ELEMENTS,
  isBareTicketPrompt,
  isSystemNotificationPrompt,
  resolvePromptRoute,
  runPromptRouteSeam,
  slashCommandName
};
