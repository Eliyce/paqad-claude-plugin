import { S as SessionLedgerRow } from '../ledger-DjtUKw_R.js';
import { F as FoldedChange } from '../types-DQzxB-wr.js';
import { a as FeatureLane, b as FeatureStatus, F as FeatureChangeKind, c as FeatureLaneSource, A as AuthoringMatchedPath } from '../types-Byd5d27z.js';

interface FeatureRecordPatch {
    title?: string;
    slug?: string;
    issue?: string | null;
    lane?: FeatureLane;
    status?: FeatureStatus;
    spec_id?: string | null;
    adapter?: string;
    branch?: string | null;
    base_branch?: string | null;
    kind?: FeatureChangeKind;
    laneSource?: Exclude<FeatureLaneSource, 'plan'>;
    resizeLaneFromPlan?: LaneMoveFacts;
    raiseLaneFromChange?: LaneMoveFacts;
    raiseLaneForAuthoring?: AuthoringRaiseFacts;
}
interface AuthoringRaiseFacts {
    reason: string;
    path: string;
    paths?: AuthoringMatchedPath[];
    at: string;
}
interface LaneMoveFacts {
    reason: string;
    files: number;
    at: string;
}

interface ResolveFeatureInput {
    title?: string;
    issue?: string | null;
    lane?: FeatureLane;
    ulid?: string;
    ulidSeed?: number;
    now?: () => Date;
}
declare function resolveActiveFeature(projectRoot: string, sessionId: string, input?: ResolveFeatureInput): string;
declare function featureStagePath(dirName: string): string;
declare function appendFeatureStageRow(projectRoot: string, sessionId: string, dirName: string, row: Record<string, unknown>, now?: () => Date): SessionLedgerRow;
interface ChangeConstantsInput {
    adapter?: string;
    lane?: FeatureLane;
    laneSource?: FeatureRecordPatch['laneSource'];
    branch?: string | null;
    baseBranch?: string | null;
    kind?: FeatureChangeKind;
}
declare function recordChangeConstants(projectRoot: string, dirName: string, input: ChangeConstantsInput, now?: () => Date): void;
declare function readFeatureStageUnit(projectRoot: string, dirName: string): SessionLedgerRow[];
declare function foldFeature(projectRoot: string, sessionId: string, dirName: string): FoldedChange;
declare function recordedLaneOrFull(projectRoot: string, sessionId: string, dirName: string | null): 'fast' | 'graduated' | 'full';
declare function currentFeature(projectRoot: string, sessionId: string, now?: () => Date): string | null;
interface ActiveChange {
    dirName: string;
    sessionId: string;
    key: string;
}
declare function resolveActiveChange(projectRoot: string, hint?: string | null): ActiveChange | null;
declare function activeChangeKey(projectRoot: string, hint?: string | null): string | null;
declare function peekActiveChangeKey(projectRoot: string, hint?: string | null): string | null;
interface OpenFeatureChangeInput extends ResolveFeatureInput {
    adapter: string;
    kind?: FeatureChangeKind;
}
declare function openFeatureChange(projectRoot: string, sessionId: string, input: OpenFeatureChangeInput): string;
declare function closeActiveFeature(projectRoot: string, sessionId: string, now?: () => Date): void;
declare function resolveFeatureRef(projectRoot: string, sessionId: string, ref: string): string | null;
declare function resumeFeatureByRef(projectRoot: string, sessionId: string, ref: string, now?: () => Date): string | null;

export { activeChangeKey, appendFeatureStageRow, closeActiveFeature, currentFeature, featureStagePath, foldFeature, openFeatureChange, peekActiveChangeKey, readFeatureStageUnit, recordChangeConstants, recordedLaneOrFull, resolveActiveChange, resolveActiveFeature, resolveFeatureRef, resumeFeatureByRef };
export type { ActiveChange, ChangeConstantsInput, OpenFeatureChangeInput, ResolveFeatureInput };
