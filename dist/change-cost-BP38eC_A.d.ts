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

export type { CostHookPayload as C, CostWindow as a, CostTokens as b, CostStageLine as c, CostExpertLine as d, CostLine as e };
