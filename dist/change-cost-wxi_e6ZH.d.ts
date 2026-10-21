interface CostHookPayload {
    session_id?: unknown;
    transcript_path?: unknown;
    agent_id?: unknown;
    agent_type?: unknown;
    agent_transcript_path?: unknown;
}
interface CostWindow {
    from: string;
    to: string;
    sealed: boolean;
    sealed_by: 'receipt' | 'close' | null;
}
interface CostTokens {
    input: number;
    output: number;
    cache_read: number;
    cache_write: number;
    total: number;
}
interface CostLine {
    tokens: CostTokens;
    usd: number | null;
}
interface CostStageLine extends CostLine {
    stage: string;
}
interface CostExpertLine extends CostLine {
    role: string;
    exact: boolean;
}
type CostScope = 'change' | 'whole-session';

export type { CostHookPayload as C, CostWindow as a, CostScope as b, CostTokens as c, CostStageLine as d, CostExpertLine as e, CostLine as f };
