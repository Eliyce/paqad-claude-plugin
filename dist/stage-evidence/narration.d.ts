import { S as StageId } from '../stages-BSY7FvGs.js';
import '../feature-development-policy-D7F98tYG.js';
import '../project-profile-BuKljgUX.js';
import '../introspection-CLBqo7wO.js';

declare const STAGE_NARRATION: Record<StageId, string>;
declare function stageNarrationLine(stage: string): string;
interface NarrateStageInput {
    projectRoot: string;
    sessionId?: string | null;
    targetPath: string;
}
declare function narrateStageEntry(input: NarrateStageInput): string | null;
declare function markerNarrationLine(stage: string, phase: 'start' | 'end'): string;
declare function markerBatchNarration(markers: readonly {
    stage: string;
    phase: string;
}[]): string;

export { STAGE_NARRATION, markerBatchNarration, markerNarrationLine, narrateStageEntry, stageNarrationLine };
export type { NarrateStageInput };
