import { MarkedStagePhase } from './live-writer.js';
import '../ledger-DjtUKw_R.js';
import '../stages-U24leQPn.js';
import '../feature-development-policy-Bhae6X2p.js';
import '../project-profile-Cn9_C9LZ.js';
import '../introspection-CLBqo7wO.js';
import '../types-BsILBLhT.js';

interface MarkerParseInput {
    projectRoot: string;
    transcriptText?: string;
    sessionId?: string | null;
    keepSessionCache?: boolean;
    adapter?: string;
    now?: () => Date;
}
interface Marker {
    stage: string;
    phase: MarkedStagePhase;
    artifactPath?: string;
}
declare function extractAssistantText(raw: string): string;
declare function extractMarkers(text: string): Marker[];
declare function parseAndRecordMarkers(input: MarkerParseInput): Marker[];

export { extractAssistantText, extractMarkers, parseAndRecordMarkers };
export type { Marker, MarkerParseInput };
