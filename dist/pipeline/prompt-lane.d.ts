import { DatabaseImpact, ApiImpact, ClassificationResult, Lane } from '../index.js';
import { S as StageLane } from '../types-BsILBLhT.js';
import '../introspection-CLBqo7wO.js';

type FeatureChangeKind = 'fix' | 'other';

declare const ROUTED_WORKFLOWS: readonly ["feature-development", "project-question", "documentation-update", "module-documentation", "pentest", "design-test", "codebase-health", "site-map", "rules-analyze", "root-cause-analysis", "discovery", "no-workflow"];
type RoutedWorkflow = (typeof ROUTED_WORKFLOWS)[number];

interface PendingImpact {
    database_impact: DatabaseImpact;
    api_impact: ApiImpact;
}

interface WorkflowEntry {
    workflow: RoutedWorkflow;
    changeKey?: string;
    lane?: StageLane;
    specId?: string;
    discoveryRunId?: string;
    reason?: string;
}

declare const SYSTEM_NOTIFICATION_ELEMENTS: readonly string[];
declare const SYSTEM_NOTIFICATION_BANNER = "[system notification - not user input]";
declare const STOP_HOOK_FEEDBACK_PREFIX = "stop hook feedback:";
declare const SUBAGENT_HANDBACK_MARKERS: {
    readonly element: "agent-message";
    readonly label: "[subagent hand-back]";
};
declare const BARE_TICKET_FILLER: ReadonlySet<string>;
declare function isBareTicketPrompt(prompt: string): boolean;
declare function isSystemNotificationPrompt(prompt: string): boolean;
declare const SLASH_COMMAND_ROUTES: Readonly<Record<string, RoutedWorkflow>>;
declare function slashCommandName(prompt: string): string | null;
interface PromptRouteDeps {
    classify?: (input: {
        request: string;
    }) => Promise<ClassificationResult>;
    route?: (classification: ClassificationResult) => {
        lane: Lane | null;
    };
    now?: () => Date;
}
interface PromptRouteResult {
    routed: RoutedWorkflow;
    lane: Lane | null;
    reason: string;
    kind?: FeatureChangeKind;
    impact?: PendingImpact;
}
declare function resolvePromptRoute(projectRoot: string, request: string, deps?: PromptRouteDeps): Promise<PromptRouteResult>;
interface PromptRouteSeamInput {
    projectRoot: string;
    request: string;
    sessionId: string | null;
    adapter: string;
}
interface PromptRouteSeamResult {
    routed: RoutedWorkflow;
    lane: Lane | null;
    resumed: WorkflowEntry | null;
    narration: string | null;
    notification?: true;
}
declare function runPromptRouteSeam(input: PromptRouteSeamInput, deps?: PromptRouteDeps): Promise<PromptRouteSeamResult>;

export { BARE_TICKET_FILLER, SLASH_COMMAND_ROUTES, STOP_HOOK_FEEDBACK_PREFIX, SUBAGENT_HANDBACK_MARKERS, SYSTEM_NOTIFICATION_BANNER, SYSTEM_NOTIFICATION_ELEMENTS, isBareTicketPrompt, isSystemNotificationPrompt, resolvePromptRoute, runPromptRouteSeam, slashCommandName };
export type { PromptRouteDeps, PromptRouteResult, PromptRouteSeamInput, PromptRouteSeamResult };
