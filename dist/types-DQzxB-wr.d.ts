interface RepairedReport {
    agent_id: string;
    stages: string[];
    report_status: string;
    source: string;
}

declare const REPORT_SOURCES: readonly ["handback", "text", "rollout", "none"];
type ReportSource = (typeof REPORT_SOURCES)[number];
type StageEvidenceSource = 'live-mark' | 'inferred-artifact' | 'inferred-git' | 'redo' | null;
type StageLane = 'fast' | 'graduated' | 'full' | null;
type StageSessionSource = 'host' | 'env' | 'cache' | null;
type StageCompletenessVerdict = 'complete' | 'incomplete' | 'recovered' | 'blocked' | 'cannot-verify';
type StageState = 'complete' | 'running' | 'missing' | 'skipped' | 'failed' | 'redone' | 'not-applicable' | 'inconclusive';
interface FoldedStage {
    stage: string;
    state: StageState;
    started_at: string | null;
    ended_at: string | null;
    duration_ms: number | null;
    duration_unreliable: boolean;
    evidence_source: StageEvidenceSource;
    artifact_digest: string | null;
}
interface OrderingViolation {
    before: string;
    after: string;
}
interface StageCompleteness {
    verdict: StageCompletenessVerdict;
    missing_stages: string[];
    required_passed: number;
    required_total: number;
    ordering_violations: OrderingViolation[];
}
interface FoldedChange {
    session_id: string;
    change_key: string;
    prompt_ordinal: number;
    stages: FoldedStage[];
    completeness: StageCompleteness;
    lane: StageLane;
    repaired_reports?: RepairedReport[];
}

export type { FoldedChange as F, ReportSource as R, StageLane as S, StageSessionSource as a };
