import { P as ProjectProfile } from './project-profile-xNmtdeKq.js';

declare const ADAPTER_TYPES: readonly ["claude-code", "codex-cli", "antigravity", "gemini-cli", "junie", "cursor", "github-copilot", "windsurf", "continue", "aider", "aiassistant"];
type AdapterType = (typeof ADAPTER_TYPES)[number];
interface AdapterConfig {
    adapter: AdapterType;
    config_path: string;
    skills_root: string;
    agents_root: string;
    hooks_supported: boolean;
    mcp_supported: boolean;
}

declare const RESOLUTION_LAYERS: readonly [0, 1, 2, 3, 4, 5, 6];
type ResolutionLayer = (typeof RESOLUTION_LAYERS)[number];
interface ResolvedArtifact {
    path: string;
    level: ResolutionLayer;
    source: string;
}
interface ResolvedArtifacts {
    rules: ResolvedArtifact[];
    skills: ResolvedArtifact[];
    agents: ResolvedArtifact[];
    hooks: ResolvedArtifact[];
    templates: ResolvedArtifact[];
    patterns: ResolvedArtifact[];
    antiPatterns: ResolvedArtifact[];
    checklists: ResolvedArtifact[];
    mcpConfigs: ResolvedArtifact[];
}

interface AdapterCapabilities {
    skills: boolean;
    agents: boolean;
    hooks: boolean;
    mcp: boolean;
    caching: boolean;
    memory: boolean;
}
interface GeneratedFile {
    path: string;
    content: string;
    autoUpdate: boolean;
    executable?: boolean;
}
interface AdapterContext {
    frameworkPath: string;
    rulesPath: string;
    projectRoot: string;
}
interface AdapterInterface {
    readonly type: AdapterType;
    readonly capabilities: AdapterCapabilities;
    getConfigPath(): string;
    getMcpPath(): string;
    generateConfig(context: AdapterContext): Promise<GeneratedFile[]>;
    generateSkills(skills: ResolvedArtifact[]): Promise<GeneratedFile[]>;
    generateAgents(agents: ResolvedArtifact[]): Promise<GeneratedFile[]>;
    installHooks(hooks: ResolvedArtifact[]): Promise<GeneratedFile[]>;
    installMcp(mcpConfigs: ResolvedArtifact[], profile: ProjectProfile): Promise<GeneratedFile[]>;
    configureCaching(profile: ProjectProfile): Promise<GeneratedFile[]>;
    configureMemory(profile: ProjectProfile): Promise<GeneratedFile[]>;
}

type UpdateCandidate = GeneratedFile;
interface UpdateDiff {
    path: string;
    before: string;
    after: string;
}
interface UpdateReport {
    previous_version: string | null;
    target_version: string;
    regenerated: string[];
    changed_files?: string[];
    skipped: UpdateDiff[];
    deprecated: string[];
    new_mcp_servers: string[];
    new_scripts: string[];
    config_keys_pruned: string[];
    team_setup_notes?: string[];
    git_workflow_notes?: string[];
}
interface FrameworkUpdaterOptions {
    generateCandidates?: (projectRoot: string) => Promise<UpdateCandidate[]>;
}
declare function withoutRemovedRetiredFiles<T extends {
    path: string;
}>(artifacts: readonly T[], fileExists: (path: string) => boolean): T[];
declare class FrameworkUpdater {
    private readonly options;
    constructor(options?: FrameworkUpdaterOptions);
    run(projectRoot: string): Promise<UpdateReport>;
    private getCandidates;
}

export { FrameworkUpdater as F, ADAPTER_TYPES as e, RESOLUTION_LAYERS as h, withoutRemovedRetiredFiles as w };
export type { AdapterInterface as A, GeneratedFile as G, ResolvedArtifact as R, UpdateCandidate as U, AdapterCapabilities as a, AdapterContext as b, AdapterType as c, ResolvedArtifacts as d, AdapterConfig as f, FrameworkUpdaterOptions as g, ResolutionLayer as i, UpdateDiff as j, UpdateReport as k };
