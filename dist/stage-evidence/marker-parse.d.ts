import { MarkedStagePhase } from './live-writer.js';
import '../feature-evidence/stage-ledger.js';
import '../ledger-DjtUKw_R.js';
import '../types-DQzxB-wr.js';
import '../types-Byd5d27z.js';
import '../stages-BBbtvxtu.js';
import '../feature-development-policy-XYxD_x4r.js';
import '../project-profile-C3xrjM5s.js';
import '../introspection-CLBqo7wO.js';

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
