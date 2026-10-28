interface HighTableStopPayload {
    agent_id?: unknown;
    agent_type?: unknown;
    agent_transcript_path?: unknown;
    session_id?: unknown;
}
interface RecordHighTableUsageInput {
    projectRoot: string;
    payload: HighTableStopPayload;
    now?: () => Date;
}
type HighTableUsageOutcome = 'recorded' | 'not-high-table' | 'no-transcript' | 'no-usage' | 'no-role' | 'no-feature';
declare function recordHighTableUsage(input: RecordHighTableUsageInput): HighTableUsageOutcome;

declare function estimateTokens(text: string | null | undefined): number;
declare function stageFromAgentType(agentType: string | null | undefined): string | null;
interface SubagentStopPayload {
    agent_id?: unknown;
    agent_type?: unknown;
    session_id?: unknown;
    agent_transcript_path?: unknown;
    usage?: {
        input_tokens?: unknown;
        output_tokens?: unknown;
        cache_read_input_tokens?: unknown;
        cached_input_tokens?: unknown;
    } | null;
}
interface TokenCounts {
    tokens_input: number;
    tokens_cached: number;
    tokens_output: number;
    exact: boolean;
}
declare function resolveTokenCounts(payload: SubagentStopPayload, transcriptText: string): TokenCounts;
interface StageAgentTokens {
    tokens_used: number;
    tokens_not_recarried: number;
    exact: boolean;
}
declare function resolveStageAgentTokens(payload: SubagentStopPayload, transcriptText: string): StageAgentTokens;
interface RecordStageAgentCompletionInput {
    projectRoot: string;
    payload: SubagentStopPayload;
    transcriptText: string;
    adapter: string;
    now?: () => Date;
}
declare function stagesRunByAgent(projectRoot: string, dirName: string, stage: string, payload: SubagentStopPayload): string[];
interface RecordStageAgentStartInput {
    projectRoot: string;
    payload: SubagentStopPayload;
    now?: () => Date;
}
declare function recordStageAgentStart(input: RecordStageAgentStartInput): boolean;
declare function recordStageAgentCompletion(input: RecordStageAgentCompletionInput): boolean;

export { estimateTokens, recordHighTableUsage, recordStageAgentCompletion, recordStageAgentStart, resolveStageAgentTokens, resolveTokenCounts, stageFromAgentType, stagesRunByAgent };
export type { RecordStageAgentCompletionInput, RecordStageAgentStartInput, StageAgentTokens, SubagentStopPayload };
