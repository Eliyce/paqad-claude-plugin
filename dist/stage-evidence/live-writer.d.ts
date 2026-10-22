import { S as SessionLedgerRow } from '../ledger-DjtUKw_R.js';
import { S as StageId } from '../stages-ejIQknpU.js';
import { a as StageSessionSource, S as StageLane } from '../types-BsILBLhT.js';
import '../feature-development-policy-Cm9Ifn5f.js';
import '../project-profile-Cn9_C9LZ.js';
import '../introspection-CLBqo7wO.js';

declare const ORCHESTRATOR_AGENT = "orchestrator";
interface AgentIdentityInput {
    agentType?: unknown;
    agentId?: unknown;
}
declare function resolveAgentIdentity(input?: AgentIdentityInput): string;

declare function classifyStage(targetPath: string, projectRoot?: string): StageId | null;
interface LiveWriteInput {
    projectRoot: string;
    sessionId?: string | null;
    toolName: string;
    targetPath: string;
    adapter?: string;
    agent?: string;
    now?: () => Date;
}
declare function highestStartedIndex(rows: readonly SessionLedgerRow[]): number;
declare function stagesWithKind(rows: readonly SessionLedgerRow[], kind: string): Set<string>;
declare function preCodeStagesRecorded(rows: readonly SessionLedgerRow[], lane: StageLane): boolean;
declare function recordLiveStageEdit(input: LiveWriteInput): StageId | null;
interface LiveWriteBatchInput {
    projectRoot: string;
    sessionId?: string | null;
    toolName: string;
    targetPaths: readonly string[];
    adapter?: string;
    agent?: string;
    now?: () => Date;
}
declare function recordLiveStageEdits(input: LiveWriteBatchInput): StageId[];
type MarkedStagePhase = 'start' | 'end';
interface MarkedStageInput {
    sessionId?: string | null;
    sessionSource?: StageSessionSource;
    agent?: string;
    stage: string;
    phase: MarkedStagePhase;
    artifactPaths?: string[];
    adapter?: string;
    title?: string;
    issue?: string | null;
    now?: () => Date;
}
declare function recordMarkedStage(projectRoot: string, input: MarkedStageInput): boolean;

export { ORCHESTRATOR_AGENT, classifyStage, highestStartedIndex, preCodeStagesRecorded, recordLiveStageEdit, recordLiveStageEdits, recordMarkedStage, resolveAgentIdentity, stagesWithKind };
export type { LiveWriteBatchInput, LiveWriteInput, MarkedStageInput, MarkedStagePhase };
