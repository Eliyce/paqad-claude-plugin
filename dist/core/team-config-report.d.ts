declare const TEAM_CONFIG_FILES: readonly ["paqad.yaml", "models.yaml", "retrieval.yaml", "decisions.yaml", "authoring.yaml", "feature-development/workflow.yaml", "feature-development/specification.yaml", "feature-development/rules.yaml", "feature-development/reuse.yaml", "feature-development/checks.yaml", "feature-development/evidence.yaml", "feature-development/analytics.yaml"];
type OwnTeamConfigFile = (typeof TEAM_CONFIG_FILES)[number];

declare function missingTeamFileLine(file: string): string;
declare function missingTeamConfigFiles(projectRoot: string): string[];
declare function legacyAfterWindowLines(projectRoot: string): string[];
declare function teamConfigSessionLines(projectRoot: string): string[];
declare function teamConfigSessionStartText(projectRoot: string): string | null;
declare function unknownSettingLine(file: string, path: string): string;
declare function unknownTeamConfigSettings(projectRoot: string): Array<{
    file: OwnTeamConfigFile;
    path: string;
}>;

export { legacyAfterWindowLines, missingTeamConfigFiles, missingTeamFileLine, teamConfigSessionLines, teamConfigSessionStartText, unknownSettingLine, unknownTeamConfigSettings };
