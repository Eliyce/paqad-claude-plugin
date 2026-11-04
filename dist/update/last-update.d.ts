import { UpdateReport } from '../index.js';
import '../project-profile-xNmtdeKq.js';
import '../introspection-CLBqo7wO.js';

interface LastUpdateRecord {
    previous_version: string | null;
    target_version: string;
    changed_files: string[];
    skipped: string[];
    config_keys_pruned: string[];
    team_setup_notes: string[];
    git_workflow_notes: string[];
    updated_at: string;
}
interface LastUpdateIo {
    rename?: (from: string, to: string) => void;
}
declare function allChangedFiles(report: Pick<UpdateReport, 'regenerated' | 'changed_files'>): string[];
declare function readLastUpdateRecord(projectRoot: string): LastUpdateRecord | null;
declare function writeLastUpdateRecord(projectRoot: string, report: UpdateReport, updatedAt?: string, io?: LastUpdateIo): boolean;
declare function lastUpdateSessionLine(record: LastUpdateRecord): string;
declare function takeLastUpdateSessionLine(projectRoot: string, source?: string, io?: LastUpdateIo): string | null;

export { allChangedFiles, lastUpdateSessionLine, readLastUpdateRecord, takeLastUpdateSessionLine, writeLastUpdateRecord };
export type { LastUpdateIo, LastUpdateRecord };
