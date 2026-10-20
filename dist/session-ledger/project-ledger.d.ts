import { S as SessionLedgerRow } from '../ledger-DjtUKw_R.js';

declare function recordProjectEvent(projectRoot: string, docType: string, row: Record<string, unknown>, schemaVersion?: number): void;
declare function readProjectEvents(projectRoot: string, docType: string): SessionLedgerRow[];
declare function readLatestProjectEvent(projectRoot: string, docType: string, match: (row: SessionLedgerRow) => boolean): SessionLedgerRow | null;

export { readLatestProjectEvent, readProjectEvents, recordProjectEvent };
