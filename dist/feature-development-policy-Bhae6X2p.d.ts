import { P as ProjectProfile } from './project-profile-Cn9_C9LZ.js';

declare const FEATURE_DEVELOPMENT_STAGE_NAMES: readonly ["ticket_intake", "planning", "specification", "development", "review", "checks", "documentation_sync", "delivery"];
type FeatureDevelopmentStageName = (typeof FEATURE_DEVELOPMENT_STAGE_NAMES)[number];
declare const FEATURE_DEVELOPMENT_ESCALATION_ACTIONS: readonly ["warn", "ask", "stop", "defer"];
type FeatureDevelopmentEscalationAction = (typeof FEATURE_DEVELOPMENT_ESCALATION_ACTIONS)[number];
type FeatureDevelopmentLogicalCommand = keyof ProjectProfile['commands'];
interface FeatureDevelopmentChecksPolicy {
    use_project_profile_commands: boolean;
    commands: FeatureDevelopmentLogicalCommand[];
    shell_commands: string[];
    block_on_failure: boolean;
}
interface FeatureDevelopmentRuleCompliancePolicy {
    enabled: boolean;
    mode: 'off' | 'warn' | 'strict';
    scope: 'changed-files' | 'whole-tree';
    diff_scope: boolean;
    cache_path: string;
    escalation: FeatureDevelopmentEscalationAction;
}
interface FeatureDevelopmentStagePolicy {
    read: string[];
    instructions: string[];
    required_inputs: string[];
    strictness: Record<string, boolean>;
    escalation: Record<string, FeatureDevelopmentEscalationAction>;
    artifacts: string[];
    checks: FeatureDevelopmentChecksPolicy | null;
    rule_compliance?: FeatureDevelopmentRuleCompliancePolicy;
}
interface FeatureDevelopmentRoundsPolicy {
    fast?: number;
    graduated?: number;
    full?: number;
}
interface FeatureDevelopmentPolicy {
    schema_version: '1';
    merge_mode: 'append';
    stages: Record<FeatureDevelopmentStageName, FeatureDevelopmentStagePolicy>;
    rounds?: FeatureDevelopmentRoundsPolicy;
}

export type { FeatureDevelopmentPolicy as F, FeatureDevelopmentStageName as a };
