type ClaudeStageAgentSource = 'plugin' | 'project' | 'home';
interface StageAgentAvailabilityOptions {
    homeDir?: string;
    projectRoot?: string;
    pluginInstalled?: boolean;
}
declare function projectOnboardedForClaudeCode(projectRoot: string): boolean;
declare const STAGE_AGENT_MISSING_MESSAGE: string;
declare const STAGE_AGENT_MISSING_CONTEXT: string;
declare function claudeStageAgentSource(options?: StageAgentAvailabilityOptions): ClaudeStageAgentSource | null;
declare function stageDispatchStopMessage(options?: StageAgentAvailabilityOptions): string | null;
declare function stageDispatchStopHookOutput(projectRoot: string, options?: StageAgentAvailabilityOptions): string | null;

export { STAGE_AGENT_MISSING_CONTEXT, STAGE_AGENT_MISSING_MESSAGE, claudeStageAgentSource, projectOnboardedForClaudeCode, stageDispatchStopHookOutput, stageDispatchStopMessage };
export type { ClaudeStageAgentSource, StageAgentAvailabilityOptions };
