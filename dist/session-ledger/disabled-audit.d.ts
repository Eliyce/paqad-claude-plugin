import { O as OpenSessionDocResult } from '../ledger-DjtUKw_R.js';

declare const DISABLED_SESSION_DOC_TYPE = "disabled-session";
declare const DISABLED_SESSION_SCHEMA_VERSION: 1;
interface RecordDisabledSessionContext {
    sessionId?: string | null;
    origin?: string;
    adapter?: string;
    now?: () => Date;
}
declare function recordDisabledSession(projectRoot: string, ctx?: RecordDisabledSessionContext): OpenSessionDocResult | null;

export { DISABLED_SESSION_DOC_TYPE, DISABLED_SESSION_SCHEMA_VERSION, recordDisabledSession };
export type { RecordDisabledSessionContext };
