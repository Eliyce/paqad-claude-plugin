interface SessionLedgerRow {
    schema_version: number;
    doc_type: string;
    session_id: string;
    ts: string;
    content_hash: string;
    [key: string]: unknown;
}
interface OpenSessionDocResult {
    ordinal: number;
    path: string;
}

export type { OpenSessionDocResult as O, SessionLedgerRow as S };
