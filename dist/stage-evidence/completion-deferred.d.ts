import { S as SessionLedgerRow } from '../ledger-DjtUKw_R.js';

interface ChecksMarkerProbe {
    now?: () => Date;
    isAlive?: (pid: number) => boolean;
    commandOf?: (pid: number) => string | null;
}

interface LiveStageAgent {
    stage: string;
    agent: string | null;
    agentId: string | null;
    startedAt: string;
    sessionId: string;
    hostPid: number | null;
    rowHash: string;
}
declare const STAGE_AGENT_SESSION_RELEASE = "a new session began, so stage agents left from the last session no longer hold the turn-end judgement";
declare function liveStageAgents(rows: readonly SessionLedgerRow[]): LiveStageAgent[];

declare function stageAgentTaskCount(tasks: readonly unknown[]): number;
declare function tasksCarryAgentType(tasks: readonly unknown[]): boolean;

declare function hostProcessAlive(pid: number): boolean;
declare function releaseStageAgentsAtSessionStart(projectRoot: string, sessionId: string, source: unknown, now?: () => Date, isAlive?: (pid: number) => boolean): boolean;
declare function hasOpenUnendedStage(rows: readonly SessionLedgerRow[]): boolean;
declare function isBetweenStages(projectRoot: string, sessionId: string, dirName: string): boolean;
interface DeferCompletionInput {
    projectRoot: string;
    backgroundTasks: unknown;
    sessionId?: string | null;
    adapter: string;
    now?: () => Date;
    probe?: ChecksMarkerProbe;
    record?: boolean;
}
interface DeferCompletionResult {
    deferred: boolean;
    reason?: string;
    tasks?: number;
    nextStage?: string;
}
declare function deferCompletionForBackgroundStage(input: DeferCompletionInput): DeferCompletionResult;

export { STAGE_AGENT_SESSION_RELEASE, deferCompletionForBackgroundStage, hasOpenUnendedStage, hostProcessAlive, isBetweenStages, liveStageAgents, releaseStageAgentsAtSessionStart, stageAgentTaskCount, tasksCarryAgentType };
export type { DeferCompletionInput, DeferCompletionResult, LiveStageAgent };
