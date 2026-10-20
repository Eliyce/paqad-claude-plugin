import { S as SessionLedgerRow } from '../ledger-DjtUKw_R.js';

declare function stageAgentTaskCount(tasks: readonly unknown[]): number;
declare function tasksCarryAgentType(tasks: readonly unknown[]): boolean;
declare function hasOpenUnendedStage(rows: readonly SessionLedgerRow[]): boolean;
interface DeferCompletionInput {
    projectRoot: string;
    backgroundTasks: unknown;
    sessionId?: string | null;
    adapter: string;
    now?: () => Date;
}
interface DeferCompletionResult {
    deferred: boolean;
    reason?: string;
    tasks?: number;
}
declare function deferCompletionForBackgroundStage(input: DeferCompletionInput): DeferCompletionResult;

export { deferCompletionForBackgroundStage, hasOpenUnendedStage, stageAgentTaskCount, tasksCarryAgentType };
export type { DeferCompletionInput, DeferCompletionResult };
