import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  PipelineRouter,
  RequestClassifier
} from "../chunk-SHKQHGG2.js";
import {
  paqadFrameLead
} from "../chunk-5QVCE2TS.js";
import {
  appendRouteTurn
} from "../chunk-3H2ZWHNF.js";
import "../chunk-A7OR2PF2.js";
import "../chunk-Y7QRVDRT.js";
import "../chunk-A36IRRPM.js";
import {
  appendHooksLog
} from "../chunk-CJ6GEKKF.js";
import "../chunk-MY3XAUJK.js";
import "../chunk-VVRAO2BK.js";
import "../chunk-EOKSVX6N.js";
import "../chunk-KKFSSPUD.js";
import "../chunk-PMSUN52C.js";
import "../chunk-O77JBFWW.js";
import {
  writeSessionRoute
} from "../chunk-WJOVAKE6.js";
import {
  changeKindForWorkflow,
  isFeatureDevelopmentRoute,
  readWorkflowState,
  resolveRoutedWorkflow,
  routeWorkflow,
  writeWorkflowState
} from "../chunk-NIAPKHOQ.js";
import {
  writePendingKind,
  writePendingLane
} from "../chunk-XBBQDY4Q.js";
import "../chunk-MUJL6BOS.js";
import "../chunk-DNG6DDRS.js";
import "../chunk-4K4CM3QN.js";
import "../chunk-MIXUQZID.js";
import "../chunk-MLVRTWKF.js";
import {
  STAGE_ORDER
} from "../chunk-QMZL6OH5.js";
import {
  isBundleClosed
} from "../chunk-37ZC7KVF.js";
import "../chunk-WGEG5J6L.js";
import "../chunk-R3VYFIEA.js";
import "../chunk-O25SHWZA.js";
import "../chunk-3CUGDX3J.js";
import "../chunk-SU7RODZI.js";
import {
  resolveSessionId
} from "../chunk-MG36YCW4.js";
import {
  readSessionControl
} from "../chunk-KF7HHHJR.js";
import "../chunk-EGDL57MD.js";
import "../chunk-UCSN7SVD.js";
import {
  init_esm_shims
} from "../chunk-EMKBJVIL.js";

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
  "no-workflow": "just chatting \u2014 nothing to set up"
};
var SYSTEM_NOTIFICATION_ELEMENTS = [
  "task-notification",
  "ci-monitor-event",
  "background-task-notification"
];
var SYSTEM_NOTIFICATION_BANNER = "[system notification - not user input]";
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
  if (head.startsWith(SYSTEM_NOTIFICATION_BANNER)) {
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
  if (!isFeatureDevelopmentRoute(routed)) {
    return { routed, lane: null, reason: ROUTE_REASON[routed] };
  }
  const kind = changeKindForWorkflow(classification.workflow);
  if (isBareTicketPrompt(request)) {
    return {
      routed,
      kind,
      lane: null,
      reason: "reading the ticket before I set the depth \u2014 no lane guessed from a bare link"
    };
  }
  const { lane } = route(classification);
  return {
    routed,
    kind,
    lane,
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
    ({ routed, lane, reason, kind } = await resolvePromptRoute(
      input.projectRoot,
      input.request,
      deps
    ));
  }
  const sessionId = resolveSessionId(input.projectRoot, input.sessionId);
  const prior = readWorkflowState(input.projectRoot, sessionId);
  if (slashName === null && STAGE_NAME_OVERRIDABLE_ROUTES.has(routed) && namesStageOfOpenChange(input.projectRoot, sessionId, prior, input.request)) {
    routed = "feature-development";
    lane = null;
    kind = void 0;
    reason = OPEN_CHANGE_STAGE_REASON;
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
  if (isFeatureDevelopmentRoute(routed) && lane !== null) {
    writePendingLane(input.projectRoot, sessionId, lane);
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
  SUBAGENT_HANDBACK_MARKERS,
  SYSTEM_NOTIFICATION_BANNER,
  SYSTEM_NOTIFICATION_ELEMENTS,
  isBareTicketPrompt,
  isSystemNotificationPrompt,
  resolvePromptRoute,
  runPromptRouteSeam,
  slashCommandName
};
