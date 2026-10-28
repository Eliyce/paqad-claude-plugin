import { S as SessionLedgerRow } from '../ledger-DjtUKw_R.js';
import { S as StageId } from '../stages-U24leQPn.js';
import { a as StageSessionSource, S as StageLane } from '../types-BsILBLhT.js';
import '../feature-development-policy-Bhae6X2p.js';
import '../project-profile-Cn9_C9LZ.js';
import '../introspection-CLBqo7wO.js';

declare function activeChangeKey(projectRoot: string, hint?: string | null): string | null;
declare function peekActiveChangeKey(projectRoot: string, hint?: string | null): string | null;

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
declare function stagesWithKind(rows: readonly SessionLedgerRow[], kind: string): Set<string>;
declare function preCodeStagesRecorded(rows: readonly SessionLedgerRow[], lane: StageLane): boolean;
declare function stageIsOpen(rows: readonly SessionLedgerRow[], stage: string): boolean;
declare function liveEditStage(lane: StageLane, classified: StageId): StageId;
declare function liveStageToStart(rows: readonly SessionLedgerRow[], lane: StageLane, classified: StageId): StageId | null;
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
    agentId?: string;
    stage: string;
    phase: MarkedStagePhase;
    artifactPaths?: string[];
    adapter?: string;
    title?: string;
    issue?: string | null;
    now?: () => Date;
}
declare function recordMarkedStage(projectRoot: string, input: MarkedStageInput): boolean;

export { ORCHESTRATOR_AGENT, activeChangeKey, classifyStage, liveEditStage, liveStageToStart, peekActiveChangeKey, preCodeStagesRecorded, recordLiveStageEdit, recordLiveStageEdits, recordMarkedStage, resolveAgentIdentity, stageIsOpen, stagesWithKind };
export type { LiveWriteBatchInput, LiveWriteInput, MarkedStageInput, MarkedStagePhase };
