interface RuleRunFinding {
    rule_id: string;
    file: string;
    line: number | null;
    message: string;
    severity: string;
}
interface DuplicationRowFinding {
    file: string;
    line_range: {
        start: number;
        end: number;
    };
    matched_file: string;
    matched_symbol: string | null;
    matched_line_range: {
        start: number;
        end: number;
    };
    similarity: number;
    matched_callers: number;
    kind: 'deterministic' | 'heuristic';
}

export type { DuplicationRowFinding as D, RuleRunFinding as R };
