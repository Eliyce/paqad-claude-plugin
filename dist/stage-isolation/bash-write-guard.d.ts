import * as nodePath from 'node:path';

declare const READ_ONLY_STAGES: readonly string[];
declare const HIGH_TABLE_WRITE_ROOT = ".paqad/tmp/high-table/";
declare const STAGE_SCRATCH_ROOT = ".paqad/tmp/";
interface ReadOnlyAgentScope {
    agent: string;
    allowedRoots: readonly string[];
    allowTempDir: boolean;
}
declare function readOnlyAgentScope(agentType: unknown): ReadOnlyAgentScope | null;
type Token = {
    kind: 'word';
    text: string;
    dynamic: boolean;
} | {
    kind: 'op';
    text: string;
};
declare function lexShell(source: string): Token[];
interface BashWrite {
    target: string | null;
    cwd: string | null;
}
declare function bashWrites(command: string, cwd: string): BashWrite[];
interface WriteHost {
    path: typeof nodePath.posix;
    tmpdir: string;
    home?: string;
}
declare function writeAllowed(scope: ReadOnlyAgentScope, projectRoot: string, write: BashWrite, host?: WriteHost): boolean;
interface StageAgentWriteInput {
    projectRoot: string;
    agentType: unknown;
    toolName?: string;
    command?: unknown;
    targets?: readonly string[];
    cwd?: string;
}
interface StageAgentWriteDecision {
    blocked: boolean;
    agent: string | null;
    target: string | null;
}
declare function stageAgentWriteDecision(input: StageAgentWriteInput): StageAgentWriteDecision;
declare function formatStageAgentWriteSummary(decision: StageAgentWriteDecision): string;

export { HIGH_TABLE_WRITE_ROOT, READ_ONLY_STAGES, STAGE_SCRATCH_ROOT, bashWrites, formatStageAgentWriteSummary, lexShell, readOnlyAgentScope, stageAgentWriteDecision, writeAllowed };
export type { BashWrite, ReadOnlyAgentScope, StageAgentWriteDecision, StageAgentWriteInput, WriteHost };
