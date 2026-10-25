import { P as ProjectProfile, D as DecisionCategory, I as IntelligenceConfig, E as EmbeddingProviderName, a as DecisionOptionEvidence, C as CompiledRule, B as BenchmarkGateConfig, b as DecisionPacket, c as PlanningManifest, d as DecisionIntent, S as SliceContext, e as DecisionOption, f as DecisionStatus, g as DecisionHumanResponse, h as PlanningCostEntry, i as PlanningLane, M as ManifestComplexity, j as PlanningCostLog, k as CoverageOverlayEntry, V as VerificationCriterion, l as ManifestDelta, m as ExecutionSlice, n as DocTarget, o as SliceFullSuiteCheck, p as ManifestClassification, q as IntelligenceContext, r as ModuleHealthMetrics, H as HealthTier, s as ModuleHealthProfile, t as PlanVsActualSnapshot, u as PlanVsActualDiff, R as RegressionEntry, v as CompiledRulesStore } from './project-profile-Cn9_C9LZ.js';
export { A as ActionRoutingConfig, w as AdaptiveRetrievalConfig, x as AppPreviewConfig, y as AutoResolveConfirmation, z as BenchmarkEvalConfig, F as CompliancePackConfig, G as CriterionSource, J as CriterionStatus, K as CustomClassificationDimension, L as DECISION_ASK_THRESHOLDS, N as DECISION_CARRY_OVER_SCOPES, O as DECISION_CATEGORIES, Q as DECISION_CATEGORY_DEFAULTS, T as DECISION_INTENTS, U as DECISION_STATUSES, W as DecisionAskThreshold, X as DecisionCarryOverScope, Y as DecisionCategoryTtlOverrides, Z as DecisionProfileConfig, _ as DecisionRecord, $ as DefectPatternSummary, a0 as DocTargetStatus, a1 as EMBEDDING_PROVIDER_NAMES, a2 as ESCALATION_MODES, a3 as EfficiencyConfig, a4 as EnterpriseConfig, a5 as EscalationConfig, a6 as EscalationMode, a7 as EscalationRuleConfig, a8 as ExecutionProgressTracker, a9 as ExecutionTrackerStatus, aa as ExistingImplementation, ab as FlakyProfileConfig, ac as ManifestRisk, ad as MetadataFiltersConfig, ae as ModelRoutingConfig, af as PaqadConfig, ag as PlanMode, ah as PriorSliceSummary, ai as ProjectCommands, aj as ProjectFeatureFlags, ak as ProjectMcpServer, al as ProjectMetadata, am as ProjectTesting, an as ProjectTestingParallel, ao as ProofType, ap as REQUIREMENT_PRIORITIES, aq as REQUIREMENT_RISKS, ar as RESEARCH_DEPTHS, as as RegressionStatus, at as RejectedAlternative, au as RequirementGraphDelta, av as RequirementNode, aw as RequirementPriority, ax as RequirementRisk, ay as RequirementType, az as RerankingConfig, aA as ResearchDepth, aB as RollbackClass, aC as SliceBudgetSummary, aD as SliceCheckpoint, aE as SliceCriteriaCheck, aF as SliceDocCheck, aG as SliceEscalationReason, aH as SliceEscalationReport, aI as SliceExecutionCancelledEvent, aJ as SliceExecutionCompletedEvent, aK as SliceExecutionEscalatedEvent, aL as SliceExecutionEvent, aM as SliceExecutionEventBase, aN as SliceExecutionEventKind, aO as SliceExecutionGateEvaluatedEvent, aP as SliceExecutionResumeAfterCrashEvent, aQ as SliceExecutionRetriedEvent, aR as SliceExecutionRunFinishedEvent, aS as SliceExecutionStartedEvent, aT as SliceExecutionStatus, aU as SliceFailingTest, aV as SliceFixAttempt, aW as SliceGateResult, aX as SliceProgressEntry, aY as SliceRegressionCheck, aZ as SliceScopeCheck, a_ as SliceScopeViolation, a$ as StrictnessConfig, b0 as TICKET_PROVIDER_KINDS, b1 as TicketProviderKind, b2 as TicketWriteBackMode, b3 as VerificationCase, b4 as VerificationPluginConfig, b5 as isDecisionPacket, b6 as isStrictDecisionId, b7 as toDecisionRecord, b8 as validateDecisionPacket } from './project-profile-Cn9_C9LZ.js';
import { D as Domain, S as Stack, C as Capability, A as ActiveCapability, R as RepositoryContext, T as ToolchainInfo, I as InstalledPackage, a as StackSourceReference, b as DetectedStackProfile, c as StackDriftReport, d as StackEcosystem, e as StackSnapshot } from './introspection-CLBqo7wO.js';
export { f as ACTIVE_CAPABILITIES, g as CAPABILITIES, h as DOMAINS, i as DOMAIN_STACK_MAP, j as DomainStackMapping, k as STACKS, l as STACK_CAPABILITIES_MAP, m as STACK_ECOSYSTEMS, n as StackDriftChange, o as StackProfileSourceKind, V as VersionBand } from './introspection-CLBqo7wO.js';
import { L as Lane, A as AnalyticsGateStatus, C as ClassificationResult, a as Complexity, R as Risk, b as ClassificationWorkflow, c as ClassificationScope, D as DatabaseImpact, d as ApiImpact, U as UiImpact, e as ComplianceSensitivity, f as CustomerFacingImpact, g as Reversibility, h as DataSensitivity, i as ContextBudgetHint, j as ResolutionMap, W as WorkflowSource, k as ResolutionSource, l as RoutingConfig } from './classification-DGWl-mzJ.js';
export { m as API_IMPACTS, n as CLASSIFICATION_CERTAINTY, o as CLASSIFICATION_OUTPUT_TYPES, p as CLASSIFICATION_SCOPES, q as CLASSIFICATION_WORKFLOWS, r as COMPLEXITY_LEVELS, s as COMPLIANCE_SENSITIVITY_LEVELS, t as CONTEXT_BUDGET_HINTS, u as CUSTOMER_FACING_IMPACTS, v as ClassificationCertainty, w as ClassificationOutputType, x as DATABASE_IMPACTS, y as DATA_SENSITIVITY_LEVELS, z as LANES, P as PROCESS_DEPTHS, B as ProcessDepth, E as RESOLUTION_SOURCES, F as REVERSIBILITY_LEVELS, G as RISK_LEVELS, T as TARGET_CAPABILITIES, H as TargetCapability, I as UI_IMPACTS, J as WORKFLOW_SOURCES, K as selectLane } from './classification-DGWl-mzJ.js';
export { HEURISTIC_TOKENIZER_VERSION, LoadedTokenizer, clearTokenizerCache, getOrLoad } from './context/tokenizer-cache.js';
export { f as findPackageRoot, a as getPackageRoot, g as getRuntimeRoot, b as getRuntimeTemplatesRoot } from './runtime-paths-TW0qys7p.js';
import { F as FeatureDevelopmentPolicy } from './feature-development-policy-Cm9Ifn5f.js';
import { R as RuleRunFinding, D as DuplicationRowFinding } from './bundle-ledgers-3AJbkb_G.js';
import { CommitSplit, CommitGroup } from './delivery/commit-split.js';
import { a as CostWindow, b as CostScope, c as CostTokens, d as CostStageLine, e as CostExpertLine, f as CostLine } from './change-cost-wxi_e6ZH.js';
export { HUD_REFRESH_VERBS, isHudRefreshVerb, refreshHudSnapshot } from './hud/refresh.js';

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

type PackInstallSource = 'built-in' | 'global' | 'project';
interface StackPackTraitManifest {
    name: string;
    display_name: string;
    detect_package?: string;
    detect_file?: string;
    detect_directory?: string;
    description: string;
}
interface StackPackFieldRule {
    name: string;
    presence?: 'required' | 'absent';
    value?: unknown;
}
interface StackPackDetectionRule {
    file?: string;
    packages?: string[];
    patterns?: string[];
    directory?: string;
    content_match?: string;
    fields?: StackPackFieldRule[];
    field_absent?: string[];
}
interface StackPackToolchainManifest {
    ecosystem: string;
    package_managers: string[];
    lockfiles: string[];
    audit_command?: string;
}
interface StackPackMcpDefault {
    name: string;
    when: 'always' | 'when_trait';
    trait?: string;
}
interface StackPackPentestCheckMap {
    glob: string;
    checks: string[];
}
interface StackPackAuditCommand {
    command: string;
    parser: string;
}
interface StackPackAstManifest {
    language: string;
    tree_sitter_grammar: string;
    file_extensions: string[];
}
interface StackPackTestingFramework {
    name: string;
    detect_package?: string;
    detect_file?: string;
    run_command?: string;
}
declare const STRUCTURED_TEST_FORMATS: readonly ["jest-json", "junit-xml", "pytest-json", "go-json", "rspec-json", "tap", "none"];
type StructuredTestFormat = (typeof STRUCTURED_TEST_FORMATS)[number];
declare const TEST_RUNNER_OUTPUT_SOURCES: readonly ["stdout", "file"];
type TestRunnerOutputSource = (typeof TEST_RUNNER_OUTPUT_SOURCES)[number];
declare const TEST_RUNNER_PARALLEL_MODES: readonly ["native", "flag", "unavailable"];
type TestRunnerParallelMode = (typeof TEST_RUNNER_PARALLEL_MODES)[number];
declare const SINGLE_TEST_SELECTORS: readonly ["test_id", "file"];
type SingleTestSelector = (typeof SINGLE_TEST_SELECTORS)[number];
interface StackPackTestRunnerParallel {
    mode: TestRunnerParallelMode;
    flag?: string;
    requires_package?: string;
    reason?: string;
}
interface StackPackTestRunner {
    runner_id: string;
    structured_format: StructuredTestFormat;
    structured_flags?: string;
    default_command?: string;
    output_source?: TestRunnerOutputSource;
    output_path_pattern?: string;
    parallel?: StackPackTestRunnerParallel;
    single_test_selector?: SingleTestSelector;
}
interface StackPackDocsManifest {
    overview_template?: string;
    conventions_template?: string;
}
interface StackPackRagManifest {
    exclude_directories?: string[];
    basename_includes?: string[];
}
interface StackPackModuleHealthManifest {
    source_roots: string[];
    source_globs?: string[];
    public_api_extractor?: string | null;
    test_command?: string;
    coverage_format?: string;
    coverage_path?: string;
    test_report_format?: string;
    test_report_path?: string;
    git_window_days?: number;
}
interface StackPackManifest {
    name: string;
    display_name: string;
    ecosystem: string;
    version: string;
    description: string;
    maintainer: string;
    tier?: 'framework' | 'archetype';
    detection: {
        manifests?: StackPackDetectionRule[];
        lockfiles?: StackPackDetectionRule[];
        heuristics?: StackPackDetectionRule[];
        priority?: number;
        excludes?: string[];
    };
    traits?: StackPackTraitManifest[];
    toolchains?: StackPackToolchainManifest[];
    mcp_defaults?: StackPackMcpDefault[];
    pentest?: {
        file_check_map?: StackPackPentestCheckMap[];
        audit_commands?: StackPackAuditCommand[];
    };
    ast?: StackPackAstManifest;
    testing?: {
        frameworks?: StackPackTestingFramework[];
    };
    test_runners?: StackPackTestRunner[];
    docs?: StackPackDocsManifest;
    rag?: StackPackRagManifest;
    module_health?: StackPackModuleHealthManifest;
    visual_evidence?: {
        frontend_globs?: string[];
    };
}
declare const COMPLIANCE_RELATIONS: readonly ["equivalent-to", "equal-to", "subset-of", "superset-of", "intersects-with", "no-relationship"];
type ComplianceRelation = (typeof COMPLIANCE_RELATIONS)[number];
declare const COMPLIANCE_EVIDENCE_STRENGTHS: readonly ["partial", "substantial"];
type ComplianceEvidenceStrength = (typeof COMPLIANCE_EVIDENCE_STRENGTHS)[number];
type ComplianceSignalType = 'gate' | 'obligation_category';
interface ComplianceClause {
    id: string;
    title: string;
    url?: string;
}
interface ComplianceSignal {
    type: ComplianceSignalType;
    ref: string;
    relation: ComplianceRelation;
}
interface ComplianceMapping {
    clause: ComplianceClause;
    satisfied_by: ComplianceSignal[];
    evidence_strength: ComplianceEvidenceStrength;
    reviewed_by?: string;
}
interface ComplianceFramework {
    id: string;
    title: string;
    authority_url?: string;
    version?: string;
}
interface CompliancePackManifest {
    kind: 'compliance-pack';
    name: string;
    description?: string;
    maintainer?: string;
    framework: ComplianceFramework;
    disclaimer: string;
    mappings: ComplianceMapping[];
}
interface LoadedCompliancePack {
    manifest: CompliancePackManifest;
    root: string;
    manifestPath: string;
    source: PackInstallSource;
    validation: PackValidationResult;
}
interface CompliancePackRegistry {
    packs: Map<string, LoadedCompliancePack>;
    warnings: PackValidationIssue[];
}
interface PackValidationIssue {
    level: 'error' | 'warning';
    path: string;
    message: string;
}
interface PackValidationResult {
    valid: boolean;
    issues: PackValidationIssue[];
}
interface LoadedStackPack {
    manifest: StackPackManifest;
    root: string;
    manifestPath: string;
    source: PackInstallSource;
    validation: PackValidationResult;
}
interface PackRegistry {
    packs: Map<string, LoadedStackPack>;
    warnings: PackValidationIssue[];
}

declare const TOKEN_ARTIFACT_CLASSES: readonly ["test-output", "coverage-output", "json-report", "xml-report", "log-output", "grep-results", "route-dump", "inventory-scan-output"];
type TokenArtifactClass = (typeof TOKEN_ARTIFACT_CLASSES)[number];
declare const ESCALATION_REASONS: readonly ["structured-parse-failed-or-degraded", "summary-confidence-low", "compact-signals-contradict", "diagnosis-unresolved-after-compact-pass"];
type EscalationReason = (typeof ESCALATION_REASONS)[number];
interface TokenEfficiencyMetadata {
    original_size: number;
    compact_size: number;
    reduction_ratio: number;
    delta_mode_used: boolean;
    escalation_occurred: boolean;
}
interface CompactArtifactSummary {
    summary_counts: Record<string, number>;
    top_failures_or_errors: string[];
    affected_files: string[];
    severity_or_status: string;
    next_recommended_actions: string[];
}
interface CompactArtifactResult {
    artifact_class: TokenArtifactClass;
    summary: CompactArtifactSummary;
    targeted_excerpts: string[];
    confidence: number;
    raw_artifact_path: string | null;
    metadata: TokenEfficiencyMetadata;
}
interface BuildCompactArtifactInput {
    artifact_class: TokenArtifactClass;
    raw_content: string;
    raw_artifact_path?: string;
    max_excerpts?: number;
}
interface EscalationDecision {
    should_escalate: boolean;
    reason: EscalationReason | null;
    raw_slice: string | null;
    metadata: TokenEfficiencyMetadata;
}
interface EvaluateEscalationInput {
    compact: CompactArtifactResult;
    reason?: EscalationReason;
    unresolved_after_compact?: boolean;
    contradiction_detected?: boolean;
    confidence_threshold?: number;
    max_raw_slice_chars?: number;
    slice_hint?: string;
}
interface ReasoningInputPayload {
    compact_summary: CompactArtifactSummary;
    targeted_excerpts: string[];
    raw_slice: string | null;
    escalation_reason: EscalationReason | null;
    metadata: TokenEfficiencyMetadata;
}
interface DeltaReasoningPayload<TDelta> {
    delta: TDelta;
    payload: ReasoningInputPayload;
}
interface TestIssueSnapshot {
    test_id: string;
    message: string;
    status: 'passed' | 'failed' | 'errored';
}
interface TestDelta {
    newly_failing_tests: string[];
    newly_passing_tests: string[];
    newly_errored_tests: string[];
    changed_failure_messages: Array<{
        test_id: string;
        before: string;
        after: string;
    }>;
}
interface VerificationGateSnapshot {
    gate: string;
    passed: boolean;
    detail: string;
    remediation?: string;
}
interface VerificationDelta {
    changed_gate_outcomes: Array<{
        gate: string;
        before_passed: boolean;
        after_passed: boolean;
    }>;
    changed_evidence: Array<{
        gate: string;
        before_detail: string;
        after_detail: string;
    }>;
    changed_recommended_actions: Array<{
        gate: string;
        before: string;
        after: string;
    }>;
}
interface DriftFileSnapshot {
    file: string;
    status: string;
    conclusion: string;
}
interface DriftDelta {
    changed_files: string[];
    changed_statuses: Array<{
        file: string;
        before: string;
        after: string;
    }>;
    changed_conclusions: Array<{
        file: string;
        before: string;
        after: string;
    }>;
}
declare const DISCLOSURE_LEVELS: readonly ["summary", "compact", "excerpt", "raw"];
type DisclosureLevel = (typeof DISCLOSURE_LEVELS)[number];
declare const DISCLOSURE_ESCALATION_REASONS: readonly ["ambiguity-unresolved", "previous-layer-insufficient", "high-risk-or-cross-cutting"];
type DisclosureEscalationReason = (typeof DISCLOSURE_ESCALATION_REASONS)[number];
interface DisclosurePolicyInput {
    compact: CompactArtifactResult;
    escalation?: EscalationDecision;
    requested_level?: DisclosureLevel;
    escalation_reason?: DisclosureEscalationReason;
}
interface DisclosureAuditRecord {
    selected_level: DisclosureLevel;
    escalation_occurred: boolean;
    escalation_reason: DisclosureEscalationReason | null;
    skipped_intermediate: boolean;
}
interface DisclosurePolicyResult {
    level: DisclosureLevel;
    payload: string;
    escalation_reason: DisclosureEscalationReason | null;
    skipped_intermediate: boolean;
    audit: DisclosureAuditRecord;
}
declare const TASK_COMPLEXITIES: readonly ["trivial", "single-file", "single-module", "cross-cutting"];
type TaskComplexity = (typeof TASK_COMPLEXITIES)[number];
declare const RETRIEVAL_PATHS: readonly ["direct", "lexical", "rag-shallow", "rag-deep"];
type RetrievalPath = (typeof RETRIEVAL_PATHS)[number];
declare const RETRIEVAL_ESCALATION_SIGNALS: readonly ["insufficient-chunks", "conflicting-evidence", "unresolved-target-file-ambiguity"];
type RetrievalEscalationSignal = (typeof RETRIEVAL_ESCALATION_SIGNALS)[number];
interface RetrievalGateInput {
    task_complexity: TaskComplexity;
    ambiguity_detected?: boolean;
    chunk_count?: number;
    min_chunk_threshold?: number;
    conflicting_evidence?: boolean;
}
interface RetrievalAuditRecord {
    retrieval_depth: RetrievalPath;
    rag_skipped: boolean;
    escalation_signal: RetrievalEscalationSignal | null;
}
interface RetrievalGateResult {
    preferred_path: RetrievalPath;
    rag_skipped: boolean;
    escalation_signal: RetrievalEscalationSignal | null;
    audit: RetrievalAuditRecord;
}
declare const ROUTING_MECHANISMS: readonly ["deterministic-rule", "metadata-lookup", "cheap-model", "reasoning-model"];
type RoutingMechanism = (typeof ROUTING_MECHANISMS)[number];
interface RoutingInput {
    task_type: string;
    target_scope?: string;
    metadata?: Record<string, unknown>;
}
interface RoutingAuditRecord {
    routing_mechanism: RoutingMechanism;
    resolved_before_reasoning: boolean;
}
interface RoutingResult {
    needs_reasoning: boolean;
    mechanism_used: RoutingMechanism;
    resolved_task_type: string | null;
    audit: RoutingAuditRecord;
}
interface ControlLayerAuditRecord {
    disclosure: DisclosureAuditRecord;
    retrieval: RetrievalAuditRecord;
    routing: RoutingAuditRecord;
}

declare const TEST_OUTPUT_SCHEMA_VERSION = "1.0.0";
declare const UNKNOWN_TEST_OUTPUT_TIMESTAMP = "1970-01-01T00:00:00.000Z";
declare const TEST_ISSUE_CATEGORIES: readonly ["assertion", "error", "timeout", "unknown"];
type TestIssueCategory = (typeof TEST_ISSUE_CATEGORIES)[number];
declare const TEST_PARSE_STRATEGIES: readonly ["structured", "plain-text-fallback", "degraded"];
type TestParseStrategy = (typeof TEST_PARSE_STRATEGIES)[number];
interface StructuredTestSummary {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
    errored: number;
    duration_ms: number;
    timestamp: string;
    runner_id: string;
}
interface StructuredTestIssue {
    test_id: string;
    suite: string | null;
    message: string;
    stack_trace: string | null;
    file_path: string | null;
    line_number: number | null;
    category: TestIssueCategory;
    duration_ms: number | null;
}
interface StructuredTestWarning {
    type: string;
    message: string;
    source_test_id: string | null;
}
interface StructuredTestParseMetadata {
    raw_byte_size: number;
    structured_byte_size: number;
    compression_ratio: number;
    original_size: number;
    compact_size: number;
    reduction_ratio: number;
    delta_mode_used: boolean;
    escalation_occurred: boolean;
    escalation_reason: EscalationReason | null;
    delta_summary: {
        newly_failing_tests: number;
        newly_passing_tests: number;
        newly_errored_tests: number;
        changed_failure_messages: number;
    } | null;
    parse_strategy: TestParseStrategy;
    parse_warnings: string[];
}
interface StructuredTestResult {
    schema_version: typeof TEST_OUTPUT_SCHEMA_VERSION;
    summary: StructuredTestSummary;
    failures: StructuredTestIssue[];
    warnings: StructuredTestWarning[];
    parse_metadata: StructuredTestParseMetadata;
    errors: StructuredTestIssue[];
    evidence_scope?: {
        related_paths?: string[];
        related_modules?: string[];
    };
}

declare const MUTATION_CONFIDENCE_LEVELS: readonly ["mature", "lower"];
type MutationConfidence = (typeof MUTATION_CONFIDENCE_LEVELS)[number];
declare const MUTATION_GATE_STATUSES: readonly ["killed-all", "survivors", "lower-confidence", "skipped", "unsafe-tree"];
type MutationGateStatus = (typeof MUTATION_GATE_STATUSES)[number];
declare const MUTATION_SKIP_REASONS: readonly ["fast-lane", "no-changed-code", "tool-not-configured", "tests-not-green", "run-failed", "no-test-command"];
type MutationSkipReason = (typeof MUTATION_SKIP_REASONS)[number];
declare const MUTANT_STATUSES: readonly ["killed", "timeout", "survived", "no-coverage", "equivalent", "error"];
type MutantStatus = (typeof MUTANT_STATUSES)[number];
interface RawMutant {
    file: string;
    line: number;
    operator: string;
    status: MutantStatus;
    description?: string;
}
interface SurvivingMutant {
    file: string;
    line: number;
    operator: string;
    description?: string;
}
interface MutationToolDescriptor {
    tool: string;
    languages: string[];
    confidence: MutationConfidence;
    run_command: string;
    config_markers: string[];
}
interface MutationResult {
    tool: string | null;
    language: string | null;
    confidence: MutationConfidence;
    scoped_files: string[];
    total_mutants: number;
    killed: number;
    survived: number;
    equivalent_set_aside: number;
    kill_rate: number | null;
    surviving_mutants: SurvivingMutant[];
    tree_clean: boolean;
    status: MutationGateStatus;
    skipped_reason: MutationSkipReason | null;
}

declare const QUALITY_MEASURES: readonly ["tangledness", "dead_code", "risky_patterns", "strictness"];
type QualityMeasure = (typeof QUALITY_MEASURES)[number];
declare const MEASURE_CONFIDENCE_LEVELS: readonly ["mature", "lower"];
type MeasureConfidence = (typeof MEASURE_CONFIDENCE_LEVELS)[number];
type RatchetMeasureOutcome = 'new' | 'unchanged' | 'tightened' | 'regressed' | 'blocked';
interface RatchetMeasureVerdict {
    measure: QualityMeasure;
    module: string;
    baseline_value: number | null;
    current_value: number | null;
    outcome: RatchetMeasureOutcome;
    confidence: MeasureConfidence;
    kind: string;
    detail: string;
}
type QualityRatchetStatus = 'pass' | 'regressed' | 'captured' | 'skipped';
interface QualityRatchetResult {
    status: QualityRatchetStatus;
    lane: Lane;
    verdicts: RatchetMeasureVerdict[];
    blocking_regressions: RatchetMeasureVerdict[];
    excepted_regressions: RatchetMeasureVerdict[];
    tightened: RatchetMeasureVerdict[];
    captured_baseline: boolean;
    skipped_reason: string | null;
}

declare const VERIFICATION_GATES: readonly ["change-completeness", "requirement-completeness", "story-quality", "ac-test-mapping", "spec-review", "architecture-compliance", "code-tests-lint", "implementation-review", "behavioral-correctness", "mutation-testing", "quality-ratchet", "database-quality", "module-docs-structure", "instructions-docs-structure", "documentation-freshness", "site-map-freshness", "extension-surface", "duplication"];
type VerificationGate = (typeof VERIFICATION_GATES)[number];
declare const LATE_GATES: readonly ["stage-evidence", "bundle-completeness", "evidence-existence", "visual-evidence", "rules-loaded", "fix-proof", "unrecorded-mandatory-stages"];
type LateGate = (typeof LATE_GATES)[number];
type GateCode = VerificationGate | LateGate;
type GateStrength = 'deterministic' | 'llm-judged';
type GateBackstopSource = 'runner' | 'checks-report' | 'late' | 'none';
type GateOwner = 'work' | 'paqad-record';
interface GateBaseEntry {
    stage: string;
    lanes: readonly Lane[];
    strength: GateStrength;
    backstop: GateBackstopSource;
    default_runner: boolean;
    label: string;
}
interface GateCatalogEntry extends GateBaseEntry {
    owner: GateOwner;
    records?: string;
}
declare const GATE_CATALOG: Readonly<Record<GateCode, GateCatalogEntry>>;
declare function gateOwner(code: string): GateOwner;
declare function recordGapText(code: string): string;
declare function gateCatalogEntry(code: string): GateCatalogEntry | null;
declare function gateExpectedOnLane(code: string, lane: string | null | undefined): boolean;
type GateSkipKind = 'not-required' | 'did-not-run';
interface GateResult {
    gate: VerificationGate;
    passed: boolean;
    inconclusive?: boolean;
    outcome?: GateSkipKind;
    skip_reason?: string;
    detail: string;
    remediation?: string;
}
interface ImplementationReviewFinding {
    kind: 'decision-violation' | 'undeclared-decision';
    severity: 'error' | 'warning';
    detail: string;
    decision_id?: string;
    file?: string;
}
interface WaitingDecision {
    decision_id: string;
    category: string;
    question: string;
}
type CanonicalDocOwnershipKind = 'direct-doc-edit' | 'implementation-drift';
interface CanonicalDocTarget {
    target_path: string;
    ownership_kind: CanonicalDocOwnershipKind;
    owners: string[];
    reason: string;
}
type VerificationOrigin = 'provider-workflow' | 'paqad-cli' | 'hook-completion' | 'git-backstop' | 'ci-backstop' | 'unknown';
declare const BACKSTOP_VERIFICATION_ORIGINS: readonly ["hook-completion", "git-backstop", "ci-backstop"];
declare function isBackstopVerificationOrigin(origin: VerificationOrigin | undefined): origin is (typeof BACKSTOP_VERIFICATION_ORIGINS)[number];
interface VerificationContext {
    project_root: string;
    verification_origin?: VerificationOrigin;
    verification_stage?: 'provider-completion' | 'backstop-completion' | 'other';
    modules: string[];
    changed_files: string[];
    changed_files_source: 'git' | 'none';
    spec_boundary?: string[];
    code_changed: boolean;
    test_files_changed: boolean;
    documentation_files_changed: boolean;
    stale_doc_targets: CanonicalDocTarget[];
    requirements_complete?: boolean;
    story_quality_passed?: boolean;
    ac_test_mapping_passed: boolean;
    ac_test_mapping_detail?: string;
    ac_test_mapping_outcome?: 'pass' | 'fail' | 'not-required' | 'did-not-run';
    spec_review_passed: boolean;
    spec_review_inconclusive?: boolean;
    spec_review_on_record?: boolean;
    spec_review_detail?: string;
    architecture_compliant?: boolean;
    code_tests_lint_passed?: boolean;
    implementation_review_passed: boolean;
    implementation_review_findings?: ImplementationReviewFinding[];
    waiting_decisions?: WaitingDecision[];
    behavioral_correctness_passed?: boolean;
    database_quality_passed?: boolean;
    structured_test_results?: StructuredTestResult[];
    mutation_result?: MutationResult;
    mutation_note?: string;
    mutation_strict?: boolean;
    quality_ratchet_result?: QualityRatchetResult;
    lane?: Lane;
    expected_ui_modules: string[];
    expected_api_modules: string[];
    expected_integration_modules: string[];
    expected_error_catalog_modules: string[];
    registry_refreshed_at: string | null;
    glossary_updated: boolean;
    unchecked_documentation_inputs?: readonly string[];
}

interface EnvelopeHeader {
    schema_version: number;
    doc_type: string;
    change: string;
    session_id: string;
    recorded_at: string;
    content_hash: string;
}

declare const RESOLUTION_LAYERS: readonly [0, 1, 2, 3, 4, 5, 6];
type ResolutionLayer = (typeof RESOLUTION_LAYERS)[number];
interface ResolvedArtifact$1 {
    path: string;
    level: ResolutionLayer;
    source: string;
}
interface ResolvedArtifacts {
    rules: ResolvedArtifact$1[];
    skills: ResolvedArtifact$1[];
    agents: ResolvedArtifact$1[];
    hooks: ResolvedArtifact$1[];
    templates: ResolvedArtifact$1[];
    patterns: ResolvedArtifact$1[];
    antiPatterns: ResolvedArtifact$1[];
    checklists: ResolvedArtifact$1[];
    mcpConfigs: ResolvedArtifact$1[];
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
    generateSkills(skills: ResolvedArtifact$1[]): Promise<GeneratedFile[]>;
    generateAgents(agents: ResolvedArtifact$1[]): Promise<GeneratedFile[]>;
    installHooks(hooks: ResolvedArtifact$1[]): Promise<GeneratedFile[]>;
    installMcp(mcpConfigs: ResolvedArtifact$1[], profile: ProjectProfile): Promise<GeneratedFile[]>;
    configureCaching(profile: ProjectProfile): Promise<GeneratedFile[]>;
    configureMemory(profile: ProjectProfile): Promise<GeneratedFile[]>;
}

type PaqadHookEvent = 'session-start' | 'prompt-submit' | 'pre-tool-mutation' | 'completion' | 'subagent-start' | 'subagent-completion';
declare const PAQAD_HOOK_EVENT_ORDER: readonly PaqadHookEvent[];
interface PaqadLiveHookSpec {
    id: string;
    event: PaqadHookEvent;
    hookFile: string;
    capabilitySeam?: 'pre-mutation' | 'completion';
    hostArgv?: boolean;
    failClosed?: boolean;
    timeoutSec?: number;
    description: string;
}
declare const PAQAD_RUNTIME_PREFIX = "~/.paqad-ai/current";
declare const PLUGIN_RUNTIME_ROOT = "${CLAUDE_PLUGIN_ROOT}/runtime";
declare const PLUGIN_SESSION_START_HOOK = "plugin-session-start.mjs";
declare const PAQAD_MUTATING_TOOL_MATCHER = "Edit|Write|NotebookEdit";
declare const PAQAD_STAGE_AGENT_MATCHER = "^(paqad:)?paqad-";
declare const PAQAD_STAGE_HELPER_MATCHER = "^(paqad:)?paqad-(planning|specification|development|review|checks|documentation-sync)$";
declare const DEFAULT_HOOK_ADAPTER = "claude-code";
interface HostHookEventMap {
    nativeEvent: Readonly<Partial<Record<PaqadHookEvent, string>>>;
    mutatingMatcher: string;
    subagentMatcher: string;
    subagentStartMatcher?: string;
}
declare const NATIVE_HOOK_EVENTS: Readonly<Record<string, HostHookEventMap>>;
declare function rendersFullHookChain(adapterType: string): boolean;
declare function frameworkHomeAbsolute(env?: NodeJS.ProcessEnv): string;
declare function hookCommand(hookFile: string, env?: NodeJS.ProcessEnv, root?: string): string;
declare function capabilityGateCommand(seam: 'pre-mutation' | 'completion', adapterType?: string, env?: NodeJS.ProcessEnv, root?: string): string;
declare function completionRecordCommand(adapterType?: string, env?: NodeJS.ProcessEnv): string;
declare const PAQAD_LIVE_HOOKS: readonly PaqadLiveHookSpec[];
interface RenderedHook {
    nativeEvent: string;
    matcher?: string;
    command: string;
    onFailure?: 'block';
    timeout?: number;
}
declare function renderHookCommand(spec: PaqadLiveHookSpec, adapterType: string, env?: NodeJS.ProcessEnv, root?: string): string;
declare function buildHostHookChain(adapterType: string, env?: NodeJS.ProcessEnv): RenderedHook[];
declare function buildPluginHookChain(env?: NodeJS.ProcessEnv): RenderedHook[];
type AdapterHookCoverage = 'live-pre-and-completion' | 'live-completion-only' | 'advisory';
declare const HOOK_COVERAGE_MATRIX: Readonly<Record<string, AdapterHookCoverage>>;
declare function isLiveHookCapable(adapterType: string): boolean;
declare function hasPreMutationBlock(adapterType: string): boolean;

declare class TemplateEngine {
    private readonly handlebars;
    constructor();
    render(templatePath: string, context: Record<string, unknown>): Promise<string>;
    private registerHelpers;
}

declare abstract class BaseAdapter implements AdapterInterface {
    protected readonly engine: TemplateEngine;
    readonly capabilities: AdapterCapabilities;
    abstract readonly type: AdapterInterface['type'];
    protected abstract configTemplateName(): string;
    protected abstract configOutputPath(): string;
    protected abstract skillsRoot(): string;
    protected abstract agentsRoot(): string;
    protected abstract hooksOutputPath(): string;
    protected abstract mcpOutputPath(): string;
    protected abstract cacheOutputPath(): string;
    protected abstract memoryOutputPath(): string;
    getConfigPath(): string;
    getMcpPath(): string;
    generateConfig(context: AdapterContext): Promise<GeneratedFile[]>;
    protected executedHookConfigFiles(): string[];
    protected hostConfigGitignore(): GeneratedFile | null;
    generateSkills(skills: ResolvedArtifact$1[]): Promise<GeneratedFile[]>;
    generateAgents(agents: ResolvedArtifact$1[]): Promise<GeneratedFile[]>;
    installHooks(hooks: ResolvedArtifact$1[]): Promise<GeneratedFile[]>;
    installMcp(): Promise<GeneratedFile[]>;
    configureCaching(profile: ProjectProfile): Promise<GeneratedFile[]>;
    configureMemory(profile: ProjectProfile): Promise<GeneratedFile[]>;
}

declare class AiAssistantAdapter extends BaseAdapter {
    readonly type: "aiassistant";
    readonly capabilities: AdapterCapabilities;
    protected configTemplateName(): string;
    protected configOutputPath(): string;
    protected skillsRoot(): string;
    protected agentsRoot(): string;
    protected hooksOutputPath(): string;
    protected mcpOutputPath(): string;
    protected cacheOutputPath(): string;
    protected memoryOutputPath(): string;
}

declare class AiderAdapter extends BaseAdapter {
    readonly type: "aider";
    readonly capabilities: AdapterCapabilities;
    protected configTemplateName(): string;
    protected configOutputPath(): string;
    protected skillsRoot(): string;
    protected agentsRoot(): string;
    protected hooksOutputPath(): string;
    protected mcpOutputPath(): string;
    protected cacheOutputPath(): string;
    protected memoryOutputPath(): string;
    generateConfig(context: AdapterContext): Promise<GeneratedFile[]>;
}

declare class AntigravityAdapter extends BaseAdapter {
    readonly type: "antigravity";
    protected configTemplateName(): string;
    protected configOutputPath(): string;
    protected skillsRoot(): string;
    protected agentsRoot(): string;
    protected hooksOutputPath(): string;
    protected mcpOutputPath(): string;
    protected cacheOutputPath(): string;
    protected memoryOutputPath(): string;
}

declare class ClaudeCodeAdapter extends BaseAdapter {
    readonly type: "claude-code";
    protected configTemplateName(): string;
    protected configOutputPath(): string;
    protected skillsRoot(): string;
    protected agentsRoot(): string;
    protected hooksOutputPath(): string;
    protected mcpOutputPath(): string;
    protected cacheOutputPath(): string;
    protected memoryOutputPath(): string;
    protected executedHookConfigFiles(): string[];
    generateConfig(context: AdapterContext): Promise<GeneratedFile[]>;
}
declare function isUnderPluginPath(path: string | undefined): boolean;
interface PluginRunSignals {
    runtimeRoot?: string;
    cliEntry?: string;
}
declare function isRunningUnderPlugin(env: NodeJS.ProcessEnv, signals?: PluginRunSignals): boolean;

declare class CodexCliAdapter extends BaseAdapter {
    readonly type: "codex-cli";
    protected configTemplateName(): string;
    protected configOutputPath(): string;
    protected skillsRoot(): string;
    protected agentsRoot(): string;
    protected hooksOutputPath(): string;
    protected mcpOutputPath(): string;
    protected cacheOutputPath(): string;
    protected memoryOutputPath(): string;
    protected executedHookConfigFiles(): string[];
    generateConfig(context: AdapterContext): Promise<GeneratedFile[]>;
}

declare class ContinueAdapter extends BaseAdapter {
    readonly type: "continue";
    readonly capabilities: AdapterCapabilities;
    protected configTemplateName(): string;
    protected configOutputPath(): string;
    protected skillsRoot(): string;
    protected agentsRoot(): string;
    protected hooksOutputPath(): string;
    protected mcpOutputPath(): string;
    protected cacheOutputPath(): string;
    protected memoryOutputPath(): string;
}

declare class CursorAdapter extends BaseAdapter {
    readonly type: "cursor";
    readonly capabilities: AdapterCapabilities;
    protected configTemplateName(): string;
    protected configOutputPath(): string;
    protected skillsRoot(): string;
    protected agentsRoot(): string;
    protected hooksOutputPath(): string;
    protected mcpOutputPath(): string;
    protected cacheOutputPath(): string;
    protected memoryOutputPath(): string;
}

declare class AdapterFactory {
    static create(type: AdapterType): AdapterInterface;
}

declare class GeminiCliAdapter extends BaseAdapter {
    readonly type: "gemini-cli";
    protected configTemplateName(): string;
    protected configOutputPath(): string;
    protected skillsRoot(): string;
    protected agentsRoot(): string;
    protected hooksOutputPath(): string;
    protected mcpOutputPath(): string;
    protected cacheOutputPath(): string;
    protected memoryOutputPath(): string;
    protected executedHookConfigFiles(): string[];
    generateConfig(context: AdapterContext): Promise<GeneratedFile[]>;
}

declare class GithubCopilotAdapter extends BaseAdapter {
    readonly type: "github-copilot";
    readonly capabilities: AdapterCapabilities;
    protected configTemplateName(): string;
    protected configOutputPath(): string;
    protected skillsRoot(): string;
    protected agentsRoot(): string;
    protected hooksOutputPath(): string;
    protected mcpOutputPath(): string;
    protected cacheOutputPath(): string;
    protected memoryOutputPath(): string;
}

declare class JunieAdapter extends BaseAdapter {
    readonly type: "junie";
    readonly capabilities: AdapterCapabilities;
    protected configTemplateName(): string;
    protected configOutputPath(): string;
    protected skillsRoot(): string;
    protected agentsRoot(): string;
    protected hooksOutputPath(): string;
    protected mcpOutputPath(): string;
    protected cacheOutputPath(): string;
    protected memoryOutputPath(): string;
}

declare class WindsurfAdapter extends BaseAdapter {
    readonly type: "windsurf";
    readonly capabilities: AdapterCapabilities;
    protected configTemplateName(): string;
    protected configOutputPath(): string;
    protected skillsRoot(): string;
    protected agentsRoot(): string;
    protected hooksOutputPath(): string;
    protected mcpOutputPath(): string;
    protected cacheOutputPath(): string;
    protected memoryOutputPath(): string;
}

type AnalyticsProviderId = 'ga4' | 'gtm' | 'segment' | 'posthog' | 'mixpanel' | 'amplitude' | 'vercel' | 'plausible';
interface AnalyticsProvider {
    id: AnalyticsProviderId;
    displayName: string;
    packages: string[];
    envKeyPatterns: RegExp[];
    entrySubstrings: string[];
    entryIdPatterns: RegExp[];
    callSitePatterns: RegExp[];
}
declare const ANALYTICS_PROVIDERS: readonly AnalyticsProvider[];
declare function findProvider(id: string): AnalyticsProvider | undefined;

interface AnalyticsCallSite {
    provider: AnalyticsProviderId;
    eventName: string;
}
declare function extractCallSites(source: string): AnalyticsCallSite[];
declare function inferNamingConvention(eventNames: readonly string[]): string | null;

declare const HEALTH_CHECK_STATUSES: readonly ["pass", "fail", "warning", "info"];
type HealthCheckStatus = (typeof HEALTH_CHECK_STATUSES)[number];
interface HealthCheckResult {
    name: string;
    status: HealthCheckStatus;
    detail: string;
    remediation?: string;
}
interface HealthEfficiencySummary {
    context_hit_rate: number;
    skill_cache_hit_rate: number;
    mcp_usage_rate: number;
}
interface HealthReport {
    overall_status: HealthCheckStatus;
    checks: HealthCheckResult[];
    efficiency: HealthEfficiencySummary;
}
interface DetectionSignal {
    signal: string;
    file: string;
    implies: string;
    confidence: 'high' | 'medium' | 'low';
}
interface DetectionReport {
    detected_domain: Domain | null;
    detected_stack: Stack | null;
    detected_capabilities: Capability[];
    matched_packs?: string[];
    detected_traits?: string[];
    recommended_capabilities?: ActiveCapability[];
    detection_phase?: 'framework' | 'archetype' | 'none';
    confidence: 'high' | 'medium' | 'low';
    confidence_score?: number;
    primary_language?: string | null;
    source?: 'ai' | 'static';
    signals: DetectionSignal[];
    timestamp: string;
    repository?: RepositoryContext;
}

interface AnalyticsDetection {
    provider: AnalyticsProviderId;
    providerDisplay: string;
    convention: string | null;
    confidence: 'high' | 'medium' | 'low';
    signals: DetectionSignal[];
}
declare function detectAnalyticsProvider(projectRoot: string): AnalyticsDetection | null;

declare const ANALYTICS_DECISION_PATH = ".paqad/planning/analytics-decision.json";
interface AnalyticsGateInput {
    projectRoot: string;
    flagEnabled: boolean;
    changeIsFeatureShaped: boolean;
    now?: () => Date;
}
interface AnalyticsGateDecision {
    status: AnalyticsGateStatus;
    provider?: AnalyticsProviderId;
    providerDisplay?: string;
    convention?: string | null;
    confidence?: 'high' | 'medium' | 'low';
    resolved_at: string;
}
declare function resolveAnalyticsGate(input: AnalyticsGateInput): AnalyticsGateDecision;
declare function readAnalyticsDecision(projectRoot: string): AnalyticsGateDecision | null;
declare function resolveAndPersistAnalyticsGate(input: AnalyticsGateInput): AnalyticsGateDecision;

type AnalyticsConflictKind = 'provider_version_mismatch' | 'taxonomy_violation' | 'pii_consent' | 'no_provider_flag' | 'architecture_conflict';
interface AnalyticsConflict {
    category: DecisionCategory;
    title: string;
}
declare const ANALYTICS_CONFLICTS: Record<AnalyticsConflictKind, AnalyticsConflict>;
declare function conflictCategory(kind: AnalyticsConflictKind): DecisionCategory;

declare function analyticsFeatureDir(module: string, feature: string): string;
declare function analyticsIndexPath(module: string): string;
declare function normalizeEventSlug(eventName: string): string;
declare function analyticsEventDocPath(module: string, feature: string, eventName: string): string;
interface EventGroup {
    slug: string;
    variants: string[];
    providers: AnalyticsProviderId[];
}
declare function groupBySlug(callSites: readonly AnalyticsCallSite[]): EventGroup[];
declare function buildEventDoc(input: {
    module: string;
    feature: string;
    group: EventGroup;
}): string;
declare function buildAnalyticsIndex(input: {
    module: string;
    entries: {
        feature: string;
        group: EventGroup;
    }[];
}): string;
interface AnalyticsSyncEntry {
    module: string;
    feature: string;
    callSites: AnalyticsCallSite[];
}
interface AnalyticsSyncResult {
    written: string[];
    skipped: string[];
    conflicts: {
        path: string;
        variants: string[];
    }[];
}
declare function syncAnalyticsDocs(projectRoot: string, entries: readonly AnalyticsSyncEntry[]): Promise<AnalyticsSyncResult>;

type AnalyticsStrictness = 'off' | 'warn' | 'strict';
declare const ANALYTICS_STRICTNESS_MODES: readonly ["off", "warn", "strict"];
declare const DEFAULT_ANALYTICS_STRICTNESS: AnalyticsStrictness;
declare function resolveAnalyticsStrictness(projectRoot: string, env?: NodeJS.ProcessEnv): AnalyticsStrictness;
interface InstrumentedEvent {
    module: string;
    feature: string;
    eventName: string;
}
interface AnalyticsCompletenessResult {
    mode: AnalyticsStrictness;
    verdict: 'ok' | 'warn' | 'block';
    missingDocs: string[];
}
declare function evaluateAnalyticsCompleteness(input: {
    mode: AnalyticsStrictness;
    events: readonly InstrumentedEvent[];
    docExists: (repoRelPath: string) => boolean;
}): AnalyticsCompletenessResult;
declare function evaluateAnalyticsCompletenessForProject(projectRoot: string, events: readonly InstrumentedEvent[], env?: NodeJS.ProcessEnv): AnalyticsCompletenessResult;

interface TransitionEntry {
    timestamp: string;
    workflow: string;
    stack_key: string;
    from_skill: string;
    to_skill: string;
    from_outputs_hash: string;
}
interface TransitionLog {
    version: 1;
    entries: Record<string, TransitionEntry[]>;
    max_entries_per_key: number;
}
interface CacheMetrics {
    session_id: string;
    cache_hits: number;
    cache_misses: number;
    prewarm_hits: number;
    prewarm_misses: number;
    prewarm_skipped: number;
    total_token_savings_estimate: number;
}

declare class TransitionLogManager {
    private readonly projectRoot;
    private readonly maxPerKey;
    constructor(projectRoot: string, maxPerKey?: number);
    private get logPath();
    append(entry: TransitionEntry): Promise<void>;
    load(): Promise<TransitionLog>;
    computeProbabilities(stackKey: string, fromSkill: string): Promise<Array<{
        to_skill: string;
        probability: number;
    }>>;
    private save;
}

declare class CacheMetricsTracker {
    private readonly projectRoot;
    constructor(projectRoot: string);
    private metricsPath;
    record(sessionId: string, event: 'cache_hit' | 'cache_miss' | 'prewarm_hit' | 'prewarm_miss' | 'prewarm_skipped', tokenSavings?: number): Promise<void>;
    read(sessionId: string): Promise<CacheMetrics>;
    private write;
}

declare const CONTEXT_LEVELS: readonly [0, 1, 2, 3, 4];
type ContextLevel = (typeof CONTEXT_LEVELS)[number];
interface ContextHitEntry {
    session_id: string;
    phase: string;
    story?: string;
    files_loaded: number;
    files_referenced: number;
    hit_rate: number;
    unreferenced_files: string[];
    timestamp: string;
}
interface ContextBudgetConfig {
    config_tokens: number;
    skills_per_session: number;
    main_agent_max: number;
    compaction_trigger_pct: number;
}
interface SkillCacheEntry {
    skill_name: string;
    input_hash: string;
    result: unknown;
    created_at: string;
    files_hashed: string[];
}
type ContextHitLog = ContextHitEntry;
type ContextBudget = ContextBudgetConfig;
type BudgetTier = 'green' | 'yellow' | 'amber' | 'red';
interface ContextSegmentPriority {
    tier: 'critical' | 'high' | 'medium' | 'low';
    content_type: string;
    token_estimate: number;
}
interface SummarizedTurn {
    turn_index: number;
    timestamp: string;
    decisions: string[];
    files_touched: string[];
    blockers: string[];
    next_steps: string[];
    original_tokens: number;
    summary_tokens: number;
}
interface SummarisationMessage {
    role: 'user' | 'assistant';
    content: string;
    turn_id: string;
    decision_packet?: boolean;
    approval_turn?: boolean;
}
interface SummariseSuccess {
    ok: true;
    summary_text: string;
    valid_through_turn_id: string;
    input_token_count: number;
    summary_token_count: number;
    truncated: boolean;
    preserved_turn_ids: string[];
}
interface SummariseFailure {
    ok: false;
    error: 'inference-failed' | 'timeout' | 'cancelled';
}
type SummariseResult = SummariseSuccess | SummariseFailure;
interface BudgetOptimizerState {
    tier: BudgetTier;
    tokens_used: number;
    max_tokens: number;
    last_evaluated_at: string;
    summarized_turn_count: number;
    evicted_segment_count: number;
    recommended_action?: 'continue' | 'warn' | 'compact';
    enforcement_reason?: 'healthy' | 'token-budget-tight' | 'context-hit-rate-below-target';
}
interface ContextSavingsEntry {
    session_id: string;
    timestamp: string;
    summarization_savings: number;
    eviction_savings: number;
    dedup_savings: number;
}
interface DeduplicationStats {
    total_artifacts: number;
    deduplicated: number;
    tokens_saved_estimate: number;
}
interface ModelCatalogEntry {
    context_window_tokens: number;
    max_output_tokens?: number;
    tokenizer_version: string;
}
type WorkspaceCompressionPolicy = 'standard' | 'aggressive' | 'conservative';
type BudgetBand = 'comfortable' | 'tightening' | 'compressed' | 'force-summary';
interface ComputeBudgetInput {
    system_prompt: string;
    project_knowledge: string;
    retrieved_chunks: string[];
    rolling_summary: string | null;
    recent_turns: string;
    new_user_message: string;
    reserved_output_tokens: number;
    model: ModelCatalogEntry;
    compression_policy: WorkspaceCompressionPolicy;
}
interface CompressionAuditRecord {
    event: 'context.compression_applied';
    reason: 'chunk_exceeds_budget';
    dropped_chunk_count: number;
}
interface BudgetBreakdownSuccess {
    ok: true;
    system_prompt_tokens: number;
    project_knowledge_tokens: number;
    retrieved_chunks_tokens: number;
    rolling_summary_tokens: number | '—';
    recent_turns_tokens: number;
    new_user_message_tokens: number;
    reserved_output_tokens: number;
    total_used: number;
    usage_pct: number;
    band: BudgetBand;
    tokenizer_version: string;
    dropped_chunk_count: number;
    compression_audit?: CompressionAuditRecord;
}
interface BudgetBreakdownError {
    ok: false;
    error: string;
    missing_field: 'context_window_tokens';
}
type BudgetBreakdown = BudgetBreakdownSuccess | BudgetBreakdownError;
type TurnPriority = 'high' | 'normal' | 'low';
interface TurnInput {
    turn_id: string;
    text: string;
    decision_packet?: boolean;
    approval_turn?: boolean;
    priority?: TurnPriority;
}
interface TaggedTurn extends TurnInput {
    priority: TurnPriority;
}
interface ContextHealthWarning {
    type: 'context.context_health_warning';
    reason: 'priority_invariant_breach';
    turn_id: string;
    classifier_returned: TurnPriority;
    corrected_to: 'high';
}
interface TurnTagResult {
    tagged: TaggedTurn[];
    warnings: ContextHealthWarning[];
}
interface TurnTagPolicy {
    all_normal?: boolean;
}

declare const SKILL_MODEL_TIERS: readonly ["fast", "medium", "reasoning"];
type SkillModelTier = (typeof SKILL_MODEL_TIERS)[number];
declare const SKILL_OUTPUT_FORMATS: readonly ["markdown", "yaml", "json"];
type SkillOutputFormat = (typeof SKILL_OUTPUT_FORMATS)[number];
interface SkillTriggerCondition {
    [dimension: string]: string[];
}
interface SkillRequestRoutingRule {
    priority: number;
    patterns: string[];
    target_workflow: string;
}
interface SkillInputSchemaField {
    type: 'string' | 'string[]' | 'boolean' | 'path' | 'path[]' | 'object';
    required: boolean;
    description?: string;
}
interface SkillInputSchema {
    [name: string]: SkillInputSchemaField;
}
interface SkillCompletionTrigger {
    emit: string;
    triggers: string[];
}
interface SkillDefinition {
    name: string;
    description: string;
    file: string;
    model_tier: SkillModelTier;
    triggers: SkillTriggerCondition[];
    request_routing?: SkillRequestRoutingRule[];
    max_lines: number;
    cacheable: boolean;
    cache_key_inputs: string[];
    output_format: SkillOutputFormat;
    input_schema: SkillInputSchema;
    on_complete?: SkillCompletionTrigger;
    tools?: string[];
    max_output_tokens?: number;
}
interface LoadedSkill extends SkillDefinition {
    body: string;
    line_count: number;
}
type SkillSource = 'built-in' | 'runtime';
interface RuntimeSkillDescriptor {
    content: string;
    sourceLabel?: string;
}
interface RuntimeSkillListEntry extends LoadedSkill {
    id: string;
    source: SkillSource;
}
interface SkillResult {
    skill_name: string;
    findings: string[];
    output_paths: string[];
    cache_hit: boolean;
}
interface SkillCacheResult {
    hit: boolean;
    result?: unknown;
    input_hash?: string;
}
interface CacheStats {
    total_entries: number;
    total_size_bytes: number;
    hit_rate: number;
}

declare class SkillCacheManager {
    private readonly cacheDir;
    private readonly parser;
    private readonly cacheability;
    private cacheabilityLoaded;
    constructor(cacheDir: string);
    checkCache(skillName: string, inputFiles: string[]): Promise<SkillCacheResult>;
    writeCache(skillName: string, inputHash: string, result: unknown, filesHashed: string[]): Promise<void>;
    invalidateModule(moduleName: string): Promise<number>;
    getStats(): Promise<CacheStats>;
    computeInputHash(files: string[]): Promise<string>;
    private isCacheable;
    private updateMetrics;
    private readMetrics;
    private loadCacheability;
}

declare class CacheWarmer {
    private readonly cacheManager;
    constructor(cacheManager: SkillCacheManager);
    prewarm(skillName: string, predictedInputFiles: string[]): Promise<boolean>;
}

interface PredictiveCacheOptions {
    enabled: boolean;
    confidence_threshold: number;
    max_candidates: number;
}
declare const DEFAULT_PREDICTIVE_CACHE_OPTIONS: PredictiveCacheOptions;
declare class PredictiveCache {
    private readonly transitionLog;
    private readonly warmer;
    private readonly metrics;
    private readonly options;
    constructor(transitionLog: TransitionLogManager, warmer: CacheWarmer, metrics: CacheMetricsTracker, options?: PredictiveCacheOptions);
    onSkillComplete(sessionId: string, stackKey: string, workflow: string, completedSkill: string, outputHash: string, nextSkill?: string): Promise<void>;
    static computeOutputHash(output: string): string;
}

type BudgetVerdict = 'ok' | 'warning' | 'requires-justification' | 'blocked';
type BudgetDecision = 'allow' | 'warn' | 'require-justification' | 'block';
interface BudgetCheckResult {
    verdict: BudgetVerdict;
    usage_pct: number;
    budget: number;
    actual: number;
    message: string;
}
interface BudgetEvaluation {
    decision: BudgetDecision;
    usage_ratio: number;
}
declare class ContextBudgetEnforcer {
    private readonly budget;
    constructor(config?: Partial<ContextBudgetConfig>);
    static fromProfile(profile: Pick<ProjectProfile, 'model_routing'>, tier?: SkillModelTier, overrides?: Partial<ContextBudgetConfig>): ContextBudgetEnforcer;
    checkBudget(estimatedTokens: number): BudgetCheckResult;
    shouldCompact(currentTokens: number): boolean;
    evaluate(tokensUsed: number): BudgetEvaluation;
    static computeBudget(input: ComputeBudgetInput): Promise<BudgetBreakdown>;
}

interface EvictionResult {
    evicted_count: number;
    tokens_reclaimed: number;
    evicted_sources: string[];
    evicted_segments: ContextSegmentPriority[];
    remaining_segments: ContextSegmentPriority[];
}
declare class ContextEvictor {
    evict(segments: ContextSegmentPriority[], tier: BudgetTier): EvictionResult;
}

interface InferenceMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}
interface InferenceCompleteOptions {
    timeoutMs?: number;
    signal?: AbortSignal;
}
interface InferenceProvider {
    complete(messages: InferenceMessage[], opts?: InferenceCompleteOptions): Promise<string>;
}

interface SummariseOptions {
    priorSummary?: {
        text: string;
        valid_through_turn_id: string;
    };
    summaryModelPreference?: 'local' | 'cheapest' | 'default';
    signal?: AbortSignal;
    inferenceProvider?: InferenceProvider;
    timeoutMs?: number;
}
declare class TurnSummarizer {
    summarize(turnText: string, turnIndex: number, timestamp: string): SummarizedTurn;
    private extractDecisions;
    private extractFilesTouched;
    private extractBlockers;
    private extractNextSteps;
    estimateTokens(text: string): number;
    summarise(messages: SummarisationMessage[], targetTokenCount: number, opts?: SummariseOptions): Promise<SummariseResult>;
    private truncateToTokenCap;
    private invoke;
}
declare function findTouchedFilePaths(text: string): string[];

type ContextPriorityTier = 'critical' | 'high' | 'medium' | 'low';
interface TurnClassifierModel {
    score(turn: TurnInput): TurnPriority;
}
declare class InferredTurnClassifierModel implements TurnClassifierModel {
    score(): TurnPriority;
}
declare class PriorityClassifier {
    private readonly turnModel;
    constructor(turnModel?: TurnClassifierModel);
    tag(turns: TurnInput[], policy?: TurnTagPolicy): TurnTagResult;
    classify(artifactSource: string, artifactType: string): ContextPriorityTier;
    classifyByContent(_content: string, phase: string): ContextPriorityTier;
}

interface BudgetOptimizerConfig {
    strategy: 'aggressive' | 'balanced' | 'conservative';
    summarize_after_turns: number;
}
declare class ContextBudgetOptimizer {
    private readonly summarizer;
    private readonly evictor;
    private readonly projectRoot;
    private readonly config;
    readonly classifier: PriorityClassifier;
    constructor(summarizer: TurnSummarizer, classifier: PriorityClassifier, evictor: ContextEvictor, projectRoot: string, config?: BudgetOptimizerConfig);
    static fromProfile(projectRoot: string, profile: Pick<ProjectProfile, 'efficiency' | 'model_routing'>, summarizer?: TurnSummarizer, classifier?: PriorityClassifier, evictor?: ContextEvictor): ContextBudgetOptimizer;
    evaluate(tokensUsed: number, maxTokens: number, metrics?: Partial<Pick<BudgetOptimizerState, 'summarized_turn_count' | 'evicted_segment_count'>> & {
        current_hit_rate?: number;
        target_hit_rate?: number;
    }): Promise<{
        action: 'continue' | 'warn' | 'compact';
        tier: BudgetTier;
    }>;
    summarizeTurns(turns: Array<{
        text: string;
        timestamp: string;
    }>, olderThanIndex: number): Promise<SummarizedTurn[]>;
    evictSegments(segments: ContextSegmentPriority[], tier: BudgetTier): EvictionResult;
    summarizeBeforeIndex(turnCount: number): number;
    resolveMaxTokens(profile: Pick<ProjectProfile, 'model_routing'>): number;
    saveState(state: BudgetOptimizerState): Promise<void>;
    private classifyTier;
}

declare class FileRegistryMapper {
    getAffectedRegistries(file: string): string[];
}

interface RefreshResult {
    total_registries: number;
    refreshed: number;
    skipped: number;
    registries: string[];
}
declare class DifferentialRefresh {
    private readonly mapper;
    constructor(mapper?: FileRegistryMapper);
    refresh(changedFiles: string[]): Promise<RefreshResult>;
}

interface HitTrackerInput {
    session_id: string;
    phase: string;
    story?: string;
}
declare class ContextHitTracker {
    private readonly loaded;
    private readonly referenced;
    private readonly input;
    constructor(sessionId: string, phase: string, story?: string);
    constructor(input: HitTrackerInput);
    recordLoaded(files: string[]): void;
    recordReferenced(file: string): void;
    computeHitRate(): ContextHitEntry;
    reset(): void;
}

interface DisplayMessage {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    createdAt: string;
    stopped?: boolean;
    discardedAt?: string | null;
    branchId?: string | null;
    parentMessageId?: string | null;
}
interface ApiMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
    name?: string;
}
interface RetrievedChunkRef {
    chunkId: string;
    position: number;
}
interface ConversationRebuildResult {
    messages: ApiMessage[];
    retrievedChunkIds: string[];
    truncated: boolean;
    truncatedTurnCount: number;
    contextHash: string;
}
type RebuildCacheKey = string;
declare class RebuildFailedError extends Error {
    readonly kind: "rebuild_failed";
    readonly reason: string;
    constructor(reason: string);
}

declare function resolveActiveLineage(messages: DisplayMessage[]): DisplayMessage[];

declare const DEFAULT_REBUILD_CACHE_MAX_SIZE = 50;
declare class RebuildCache {
    private readonly maxSize;
    private readonly entries;
    constructor(maxSize?: number);
    computeKey(displayMessages: DisplayMessage[], classifierOutput: object): RebuildCacheKey;
    get(key: RebuildCacheKey): ConversationRebuildResult | undefined;
    set(key: RebuildCacheKey, result: ConversationRebuildResult): void;
    get size(): number;
}

interface RebuildInput {
    displayMessages: DisplayMessage[];
    classifierOutput: Pick<ClassificationResult, 'retrieval_needed' | 'context_budget_hint'>;
    retrievedChunks?: {
        chunkId: string;
        content: string;
    }[];
    budgetTokens: number;
    summarizer?: TurnSummarizer;
    optimizer?: ContextBudgetOptimizer;
    cache?: RebuildCache;
    audit?: {
        projectRoot: string;
        sessionId: string;
    };
}
declare function rebuildApiConversation(input: RebuildInput): Promise<ConversationRebuildResult>;

type RetrievalDepth = 'none' | 'standard' | 'deep';
interface Chunk {
    id: string;
    source_file: string;
    ast_node_type: 'function' | 'class' | 'method' | 'import-block' | 'constant' | 'fallback';
    ast_node_path: string;
    exported_symbols: string[];
    content: string;
    char_count: number;
    content_hash: string;
    modified_at_ms?: number;
}
interface ChunkIndexEntry {
    source_file: string;
    source_file_hash: string;
    modified_at: string;
    chunks: Chunk[];
}
interface ChunkIndex {
    version: 1;
    generated_at: string;
    entries: ChunkIndexEntry[];
}
interface LoadStats {
    session_id: string;
    timestamp: string;
    tokens_before: number;
    tokens_after: number;
    reduction_pct: number;
    chunks_loaded: number;
    rag_chunks_retrieved?: number;
    rag_fallback_reason?: string;
    retrieval_depth?: RetrievalDepth;
    retrieval_escalated?: boolean;
    reranking?: {
        enabled: boolean;
        backend: string;
        model: string;
        candidate_pool_size: number;
        pre_rerank_chunk_ids: string[];
        post_rerank_chunk_ids: string[];
        latency_ms: number;
    };
    fusion_strategy?: FusionDiagnostic;
}
interface ActionRecommendation {
    action_type: 'workflow';
    confidence: number;
    evidence_chunk_ids: string[];
    workflow_id: string;
    explanation: string;
    requires_user_approval: true;
}
interface FusionDiagnostic {
    signals: string[];
    filters_applied: string[];
    filter_fallback?: boolean;
    filter_fallback_reason?: string;
}
interface SemanticLoadClassification {
    complexity?: 'trivial' | 'low' | 'medium' | 'high' | 'very-high';
    risk?: 'low' | 'medium' | 'high';
    scope?: 'single-file' | 'single-module' | 'multi-module' | 'system-wide';
    workflow?: string | null;
    affected_modules?: string[];
    file_extension?: string;
    frameworks?: string[];
    recency_cutoff_ms?: number;
}
interface SemanticLoadOptions {
    taskKeywords: string[];
    taskDescription?: string;
    taskTargetFile?: string;
    symbolReferences?: string[];
    tokenBudget: number;
    fullContextOverride?: boolean;
    classification?: SemanticLoadClassification;
}

declare const CHUNKER_VERSION = "cast-blurb-v1";
declare class AstChunker {
    private readonly maxChunkChars;
    private readonly merge;
    constructor(maxChunkChars?: number, merge?: boolean);
    chunk(filePath: string, content: string): Chunk[];
    private chunkRaw;
    private detectLanguage;
    private parseTypeScript;
    private parsePhp;
    private parseDart;
    private splitLargeSegment;
    fallbackSplit(filePath: string, content: string): Chunk[];
    private makeChunk;
    private extractExportedSymbols;
}
declare function castMerge(chunks: readonly Chunk[], targetChars: number): Chunk[];

declare const ENGINE_ERROR_CODES: {
    readonly MISSING_POLICY_CONTEXT: "MISSING_POLICY_CONTEXT";
    readonly DUPLICATE_SKILL_IDENTIFIER: "DUPLICATE_SKILL_IDENTIFIER";
    readonly DECISION_PACKET_CORRUPT: "DECISION_PACKET_CORRUPT";
    readonly UNSUPPORTED_FILE_TYPE: "UNSUPPORTED_FILE_TYPE";
    readonly VERSION_INCOMPATIBLE: "VERSION_INCOMPATIBLE";
    readonly MANIFEST_PRODUCTION_TIMEOUT: "MANIFEST_PRODUCTION_TIMEOUT";
    readonly WORKFLOW_ALREADY_RUNNING: "WORKFLOW_ALREADY_RUNNING";
    readonly VECTOR_INDEX_STORAGE_ERROR: "VECTOR_INDEX_STORAGE_ERROR";
    readonly CANCELLED_BY_CONSUMER: "CANCELLED_BY_CONSUMER";
    readonly LOGGER_SINK_FAILED: "LOGGER_SINK_FAILED";
    readonly UNKNOWN_ENGINE_ERROR: "UNKNOWN_ENGINE_ERROR";
};
type EngineErrorCode = (typeof ENGINE_ERROR_CODES)[keyof typeof ENGINE_ERROR_CODES];
interface EngineErrorPayloadBase extends Record<string, unknown> {
    retryable?: boolean;
    redacted_fields?: string[];
}
interface MissingPolicyContextPayload extends EngineErrorPayloadBase {
    policy: string;
}
interface DuplicateSkillIdentifierPayload extends EngineErrorPayloadBase {
    skill_id: string;
}
interface DecisionPacketCorruptPayload extends EngineErrorPayloadBase {
    decision_id: string;
    reason: string;
    packet_path?: string;
}
interface UnsupportedFileTypePayload extends EngineErrorPayloadBase {
    path: string;
    extension: string;
}
interface VersionIncompatiblePayload extends EngineErrorPayloadBase {
    found: string;
    required: string;
    kind: 'engine-too-new' | 'engine-too-old' | 'schema';
}
interface ManifestProductionTimeoutPayload extends EngineErrorPayloadBase {
    timeout_ms: number;
}
interface WorkflowAlreadyRunningPayload extends EngineErrorPayloadBase {
    workflow: string;
    run_id?: string;
}
interface VectorIndexStorageErrorPayload extends EngineErrorPayloadBase {
    index: string;
    reason: string;
}
interface CancelledByConsumerPayload extends EngineErrorPayloadBase {
    checkpoint_path?: string;
}
interface LoggerSinkFailedPayload extends EngineErrorPayloadBase {
    sink: string;
    reason: string;
}
interface UnknownEngineErrorPayload extends EngineErrorPayloadBase {
    message?: string;
}
interface TaxonomyEntry {
    code: EngineErrorCode;
    description: string;
    retryable: boolean;
    payload_shape: Record<string, string>;
}
declare function listErrorTaxonomy(): TaxonomyEntry[];
declare function getTaxonomyEntry(code: string): TaxonomyEntry | undefined;

interface FrameworkErrorOptions {
    code: EngineErrorCode | (string & {});
    cause?: unknown;
    details?: Record<string, unknown>;
    retryable?: boolean;
    projectRoot?: string;
}
declare class FrameworkError extends Error {
    readonly code: EngineErrorCode | (string & {});
    readonly details?: Record<string, unknown>;
    readonly retryable: boolean;
    constructor(message: string, options: FrameworkErrorOptions);
}

type EmbeddingProviderErrorCode = 'missing_api_key' | 'invalid_api_key' | 'rate_limited' | 'download_failed' | 'provider_error';
declare class EmbeddingProviderError extends Error {
    readonly provider: EmbeddingProviderName;
    readonly code: EmbeddingProviderErrorCode;
    readonly cause?: unknown | undefined;
    constructor(provider: EmbeddingProviderName, code: EmbeddingProviderErrorCode, message: string, cause?: unknown | undefined);
}
declare function isEmbeddingProviderError(error: unknown): error is EmbeddingProviderError;
interface RagIndexMeta {
    version: 1;
    provider: EmbeddingProviderName;
    model: string;
    built_at: string;
    chunk_count: number;
    embedding_dimensions: number;
    branch?: string;
    base_branch?: string;
    base_commit?: string;
    head_commit?: string;
    chunker_version?: string;
}
interface StoredVectorItem {
    id: string;
    vector: number[];
}
interface StoredVectorChunk extends Chunk, StoredVectorItem {
    vector: number[];
}
type ExtractionKind = 'ocr' | 'caption';
declare const SUPPORTED_EXTRACTION_KINDS: readonly ["ocr", "caption"];
declare const SUPPORTED_VISION_EXTENSIONS: readonly [".png", ".jpg", ".jpeg", ".gif", ".webp", ".tiff", ".bmp", ".avif", ".heic"];
interface VisionIngestInput {
    sourcePath: string;
    text: string;
    extractionKind: ExtractionKind;
}
interface VisionIngestResult {
    chunkCount: number;
    sourcePath: string;
    extractionKind: ExtractionKind;
}
interface VisionChunk extends Chunk {
    extraction_kind: ExtractionKind;
    source_missing?: boolean;
}
interface StoredVisionChunk extends VisionChunk, StoredVectorItem {
    vector: number[];
}
type RagIngestErrorCode = 'unsupported_file_type' | 'unknown_extraction_kind' | 'empty_extracted_text' | 'path_outside_project' | 'text_not_utf8';
declare class RagIngestError extends FrameworkError {
    readonly code: RagIngestErrorCode;
    constructor(code: RagIngestErrorCode, message: string, details?: Record<string, unknown>);
}
declare function isRagIngestError(error: unknown): error is RagIngestError;
type CrsCollectionId = string & {
    readonly __crsCollectionId: unique symbol;
};
declare function toCrsCollectionId(id: string): CrsCollectionId;
interface CrsChunkInput {
    id: string;
    content: string;
    source_session_id: string;
    source_workspace_id: string;
    created_at: string;
    project_id: string;
}
interface CrsChunk extends StoredVectorItem {
    content: string;
    source_session_id: string;
    source_workspace_id: string;
    created_at: string;
    project_id: string;
    vector_timestamp: string;
}
interface CrsRetrievalResult {
    chunk: CrsChunk;
    sourceSessionId: string;
    sourceWorkspaceId: string;
    score: number;
}
interface CrsIndexedSessionEvent {
    session_id: string;
    project_id: string;
    chunk_count: number;
}
interface ReindexProgressEvent {
    status_percent: number;
    current_collection: string;
    est_time: number;
}
type ReindexProgressHandler = (event: ReindexProgressEvent) => void;
declare class EmbeddingBacklogOverflow extends Error {
    readonly dropped_count: number;
    constructor(dropped_count: number, message?: string);
}
declare function isEmbeddingBacklogOverflow(error: unknown): error is EmbeddingBacklogOverflow;
interface VectorIndexPayload<T extends StoredVectorItem = StoredVectorItem> {
    version: 1;
    dimensions: number;
    items: T[];
}
interface VectorQueryResult<T extends StoredVectorItem = StoredVectorItem> {
    score: number;
    item: T;
}
interface RagStatus {
    enabled: boolean;
    configured_provider?: EmbeddingProviderName;
    configured_model?: string;
    index_present: boolean;
    valid: boolean;
    stale_metadata?: boolean;
    built_at?: string;
    chunk_count: number;
    size_bytes: number;
    reason?: string;
    vision_chunk_count?: number;
}
interface EmbeddingProvider {
    readonly name: EmbeddingProviderName;
    readonly model: string;
    validate(): Promise<void>;
    embed(input: string | string[]): Promise<number[][]>;
}
interface LocalEmbeddingProgress {
    loaded?: number;
    total?: number;
    status?: string;
}
interface LocalEmbeddingOutput {
    tolist?: () => number[] | number[][];
}
interface LocalEmbeddingExtractor {
    (input: string[], options: {
        pooling: 'mean';
        normalize: true;
    }): Promise<LocalEmbeddingOutput | number[] | number[][]>;
}
interface TransformersRuntimeEnv {
    cacheDir?: string;
    localModelPath?: string;
    allowLocalModels?: boolean;
    allowRemoteModels?: boolean;
}
interface OpenAiEmbeddingClient {
    embeddings: {
        create(input: {
            model: string;
            input: string | string[];
        }): Promise<{
            data: Array<{
                embedding: number[];
            }>;
        }>;
    };
}
interface ProviderProgressUpdate {
    phase: 'download' | 'load' | 'build';
    message: string;
    loaded?: number;
    total?: number;
    percent?: number;
}
interface ChunkIndexSyncResult {
    index: ChunkIndex;
    changed_files: string[];
    added_files: string[];
    deleted_files: string[];
    updated: boolean;
}
interface RagRetrievalResult {
    vector_scores: Map<string, number>;
    chunks_retrieved: number;
    retrieved_chunk_ids: string[];
    retrieved_source_files: string[];
    retrieved_chunks: Array<Pick<StoredVectorChunk, 'id' | 'source_file' | 'content'>>;
    fallback_reason?: string;
    best_score?: number;
    low_confidence?: boolean;
}
interface RagScoredCandidate {
    id: string;
    source_file: string;
    content: string;
    score: number;
}
interface BuildIndexOptions {
    intelligence?: IntelligenceConfig;
    onProgress?: (update: ProviderProgressUpdate) => void;
    signal?: AbortSignal;
}
type ProviderFactory = (projectRoot: string, intelligence: IntelligenceConfig, onProgress?: (update: ProviderProgressUpdate) => void) => Promise<EmbeddingProvider>;
type ComparisonMode = 'lexical-vs-rag' | 'rag-vs-candidate' | 'feature-off-vs-on';
type EvalQueryClass = 'simple-lexical' | 'vocabulary-mismatch' | 'ambiguous' | 'multi-part' | 'workflow-triggering' | 'negative';
interface EvalDatasetItem {
    id: string;
    query_class: EvalQueryClass;
    task_description: string;
    keywords: string[];
    expected_file?: string;
    should_skip_retrieval?: boolean;
    workflow_trigger?: string;
}
interface EvalTrace {
    item_id: string;
    retrieval_depth?: string;
    first_stage_chunk_ids: string[];
    applied_metadata_filters?: string[];
    reranked_chunk_ids?: string[];
    packed_chunk_ids: string[];
    packed_token_count?: number;
    routed_workflow_id?: string;
    final_answer_or_recommendation?: string;
}
interface ModelGradedScores {
    retrieval_relevance: number;
    answer_faithfulness: number;
    action_recommendation_usefulness: number;
    routing_correctness: number;
}
interface EvalRunResult {
    mode: ComparisonMode;
    timestamp: string;
    dataset_size: number;
    traces: EvalTrace[];
    model_graded?: ModelGradedScores;
}

declare class ChunkIndexManager {
    private readonly projectRoot;
    constructor(projectRoot: string);
    get indexPath(): string;
    load(): Promise<ChunkIndex | null>;
    save(index: ChunkIndex): Promise<void>;
    rebuild(files: string[], chunker: AstChunker): Promise<ChunkIndex>;
    incrementalUpdate(changedFiles: string[], index: ChunkIndex, chunker: AstChunker): Promise<ChunkIndex>;
    isStale(index: ChunkIndex): Promise<{
        stale: boolean;
        changedFiles: string[];
    }>;
    sync(files: string[], chunker: AstChunker): Promise<ChunkIndexSyncResult>;
    private computeFileHash;
}

type MetadataFilterType = 'file_extension' | 'module_path_prefix' | 'framework' | 'recency_cutoff_ms';
interface MetadataFilter {
    type: MetadataFilterType;
    value: string | number;
}

interface ScoringContext {
    keywords: string[];
    targetFilePath?: string;
    symbolReferences?: string[];
    sessionStartMs: number;
    vectorScores?: Map<string, number>;
}
declare class RelevanceScorer {
    private readonly threshold;
    constructor(threshold?: number);
    score(chunk: Chunk, context: ScoringContext): number;
    filterAndRank(chunks: Chunk[], context: ScoringContext, filters?: MetadataFilter[]): {
        chunks: Chunk[];
        fusion_strategy: FusionDiagnostic;
    };
    private vectorSimilarityScore;
    private keywordOverlapScore;
    private symbolReferenceScore;
    private filePathProximityScore;
    private astDepthPenalty;
}

interface BudgetAllocation {
    critical_budget: number;
    task_relevant_budget: number;
    supporting_budget: number;
}
interface BudgetClassificationHints {
    complexity?: SemanticLoadClassification['complexity'];
    scope?: SemanticLoadClassification['scope'];
}
declare class BudgetAllocator {
    allocate(totalBudget: number, hints?: BudgetClassificationHints): BudgetAllocation;
    packChunks(chunks: Chunk[], budgetTokens: number, estimateTokens?: (text: string) => number): Chunk[];
}

interface SemanticLoaderOptions {
    projectRoot: string;
    fullContextOverride?: boolean;
    sessionId: string;
}
interface ResolvedArtifact {
    path: string;
    content?: string;
    type?: string;
}
declare class SemanticLoader {
    private readonly options;
    private readonly chunker;
    private readonly indexManager;
    private readonly scorer;
    private readonly allocator;
    private readonly rag;
    private readonly supportedExtensions;
    private readonly priorityClassifier;
    private reranker?;
    constructor(options: SemanticLoaderOptions);
    load(artifacts: ResolvedArtifact[], loadOptions: SemanticLoadOptions): Promise<{
        chunks: Chunk[];
        stats: LoadStats;
        action_recommendations?: ActionRecommendation[];
    }>;
    private isSupportedFile;
    private artifactToChunk;
    private persistStats;
    private packChunksByPriority;
    private classifyChunkPriority;
}

declare const COMPLIANCE_SCHEMA_VERSION: 1;
declare const SPEC_REVIEW_SCHEMA_VERSION: 1;
declare const DEFAULT_OBLIGATION_INDEX_PATH = ".paqad/compliance/obligation-index.json";
declare function slugifySpec(specFile: string): string;
declare function specIndexPath(specFile: string): string;
declare function specReportPath(specFile: string): string;
declare function specReviewPath(specFile: string): string;

type ObligationCategory = 'functional' | 'edge-case' | 'acceptance' | 'non-functional' | 'unclassified';
type ComplianceState = 'covered' | 'partial' | 'uncovered' | 'indeterminate';
type SpecDefectSeverity = 'critical' | 'major' | 'minor';
type SpecReviewDefectCategory = 'contradiction' | 'formula_inconsistency' | 'boundary_gap' | 'goal_conflict' | 'dangling_reference' | 'missing_negative_case' | 'unresolvable_reference';
type SpecReviewDefectStatus = 'new' | 'existing' | 'resolved';
interface Obligation {
    obligation_id: string;
    category: ObligationCategory;
    description: string;
    pass_criteria: string | null;
    source_section: string;
    source_line: number | null;
    spec_file: string;
    affected_by_spec_defects?: string[];
}
interface ObligationIndexMetadata {
    spec_file: string;
    spec_hash: string;
    extracted_at: string;
    obligation_count: number;
    schema_version: number;
    warnings: string[];
}
interface ObligationIndex {
    metadata: ObligationIndexMetadata;
    obligations: Obligation[];
}
interface ComplianceReportObligation extends Obligation {
    state: ComplianceState;
    evidence: string[];
}
interface ComplianceReportSummary {
    total: number;
    covered: number;
    partial: number;
    uncovered: number;
    indeterminate: number;
    compliance_ratio: number;
}
interface ComplianceReport {
    metadata: {
        spec_file: string;
        spec_hash: string;
        generated_at: string;
        schema_version: number;
        test_files_hash: string;
        cache_hit: boolean;
    };
    summary: ComplianceReportSummary;
    spec_review: {
        defect_count: number;
        critical_count: number;
        warning: string | null;
    } | null;
    obligations: ComplianceReportObligation[];
    uncovered_obligations: string[];
}
interface SpecReviewLocation {
    section: string;
    line_range: [number, number];
    text_excerpt: string;
}
interface SpecReviewDefect {
    defect_id: string;
    category: SpecReviewDefectCategory;
    severity: SpecDefectSeverity;
    description: string;
    locations: SpecReviewLocation[];
    suggested_resolution: string;
    affected_obligation_ids: string[] | null;
    status: SpecReviewDefectStatus;
}
interface SpecPatternAdvisory {
    advisory_id: string;
    title: string;
    description: string;
}
interface SpecReviewReportMetadata {
    spec_file: string;
    spec_hash: string;
    reviewed_at: string;
    defect_count: number;
    schema_version: number;
}
interface SpecReviewReport {
    metadata: SpecReviewReportMetadata;
    defects: SpecReviewDefect[];
    pattern_advisories: SpecPatternAdvisory[];
}

interface ExtractObligationsOptions {
    spec_file: string;
    spec_markdown: string;
    extracted_at?: string;
    spec_review?: SpecReviewReport | null;
}
declare function extractObligationIndex(options: ExtractObligationsOptions): ObligationIndex;

interface LoadObligationIndexOptions {
    project_root: string;
    index_path?: string;
}
declare function loadObligationIndex(options: LoadObligationIndexOptions): Promise<ObligationIndex | null>;
interface SaveObligationIndexOptions {
    project_root: string;
    index: ObligationIndex;
    index_path?: string;
}
declare function saveObligationIndex(options: SaveObligationIndexOptions): Promise<string>;
declare function isEnoentError(error: unknown): boolean;

interface CheckComplianceOptions {
    project_root: string;
    index: ObligationIndex;
    test_globs?: string[];
    report_path?: string;
    spec_review?: SpecReviewReport | null;
    signal?: AbortSignal;
}
declare function checkSpecCompliance(options: CheckComplianceOptions): Promise<ComplianceReport>;
declare function assertComplianceSummaryInvariants(summary: {
    total: number;
    covered: number;
    partial: number;
    uncovered: number;
    indeterminate: number;
    compliance_ratio: number;
}): void;

declare const BOUNDARY_SCHEMA_VERSION: 1;
type BoundaryRelationship = 'producer_consumer' | 'bidirectional' | 'shared_utility' | 'unanalyzable';
interface BoundaryInterface {
    type_name: string;
    file: string;
    producer_spec: string | null;
    consumer_specs: string[];
    output_states: string[];
    relationship: BoundaryRelationship;
}
interface UnhandledVariant {
    type_name: string;
    state: string;
    producer_spec: string | null;
    consumer_spec: string;
}
interface BoundaryManifest {
    metadata: {
        generated_at: string;
        schema_version: number;
    };
    boundaries: BoundaryInterface[];
}
interface BoundaryReport {
    metadata: {
        generated_at: string;
        schema_version: number;
    };
    total_interfaces: number;
    total_states: number;
    handled_count: number;
    unhandled_count: number;
    gate_result: 'pass' | 'warn' | 'skip';
    interfaces: BoundaryInterfaceReport[];
}
interface BoundaryInterfaceReport {
    type_name: string;
    file: string;
    producer_spec: string | null;
    consumer_specs: string[];
    total_states: number;
    unhandled_variants: UnhandledVariant[];
}

interface DoctorIssue {
    level: 'error' | 'warning';
    message: string;
}
interface DoctorResult {
    ok: boolean;
    issues: DoctorIssue[];
}
declare function doctorObligationIndex(index: ObligationIndex | null): DoctorResult;
declare function doctorBoundaryReport(report: BoundaryReport | null): DoctorResult;
declare function doctorSpecReview(review: SpecReviewReport | null, options?: {
    spec_is_newer?: boolean;
}): DoctorResult;

interface ReviewSpecOptions {
    spec_file: string;
    spec_markdown: string;
    reviewed_at?: string;
    previous_report?: SpecReviewReport | null;
}
declare function reviewSpecification(options: ReviewSpecOptions): SpecReviewReport;
declare function attachSpecDefectsToObligations(review: SpecReviewReport, obligations: Obligation[]): SpecReviewReport;
declare function compareDefects(left: SpecReviewDefect, right: SpecReviewDefect): number;

interface LoadSpecReviewOptions {
    project_root: string;
    review_path?: string;
    spec_file?: string;
}
declare function loadSpecReviewReport(options: LoadSpecReviewOptions): Promise<SpecReviewReport | null>;
interface SaveSpecReviewOptions {
    project_root: string;
    report: SpecReviewReport;
    review_path?: string;
    spec_file?: string;
}
declare function saveSpecReviewReport(options: SaveSpecReviewOptions): Promise<string>;

interface GenerateVitestSkeletonOptions {
    project_root: string;
    obligations: Obligation[];
    output_dir: string;
}
declare function generateVitestSkeletons(options: GenerateVitestSkeletonOptions): Promise<string[]>;
declare function renderVitestSkeleton(obligation: Obligation): string;

declare function detectBoundariesInSource(filePath: string, source: string): BoundaryInterface[];

interface ExtractionResult {
    boundary: BoundaryInterface;
    unhandled_by_consumer: Map<string, UnhandledVariant[]>;
}
declare function extractUnhandledVariants(boundary: BoundaryInterface, specTexts: Map<string, string>): ExtractionResult;

interface GenerateBoundaryTestsOptions {
    project_root: string;
    boundary: BoundaryInterface;
    unhandled: UnhandledVariant[];
    output_dir?: string;
}
interface GeneratedBoundaryTest {
    file_path: string;
    written: boolean;
}
declare function generateBoundaryTests(options: GenerateBoundaryTestsOptions): Promise<GeneratedBoundaryTest[]>;

declare const DEFAULT_BOUNDARY_REPORT_PATH = ".paqad/compliance/boundary-report.json";
declare function buildBoundaryReport(results: ExtractionResult[]): BoundaryReport;
declare function saveBoundaryReport(report: BoundaryReport, projectRoot: string, reportPath?: string): Promise<string>;
declare function loadBoundaryReport(projectRoot: string, reportPath?: string): Promise<BoundaryReport | null>;

interface ScanBoundariesOptions {
    project_root: string;
    source_globs?: string[];
    spec_paths?: Map<string, string>;
}
declare function scanBoundaries(options: ScanBoundariesOptions): Promise<ExtractionResult[]>;

declare const DEFECT_PATTERN_SCHEMA_VERSION: 1;
type DefectSource = 'compliance' | 'audit' | 'heuristic' | 'test_quality' | 'boundary' | 'spec_review';
interface StackContext {
    frameworks: string[];
    traits: string[];
}
interface DefectFinding {
    defect_id: string;
    source: DefectSource;
    category: string;
    subcategory: string;
    spec_file: string;
    obligation_id: string | null;
    stack_context: StackContext;
    description: string;
    file_path: string | null;
    recorded_at: string;
    resolved: boolean;
    recurrence_count: number;
}
interface DefectPatternIndexEntry {
    pattern_id: string;
    subcategory: string;
    frequency: number;
    last_seen: string;
    stale: boolean;
}
interface DefectPatternEntry {
    pattern_id: string;
    subcategory: string;
    description: string;
    frequency: number;
    recency: string;
    stack_contexts: StackContext[];
    example_obligations: string[];
    example_files: string[];
    severity_distribution: {
        critical: number;
        major: number;
        minor: number;
        info: number;
    };
    first_seen: string;
    last_seen: string;
    stale: boolean;
}
interface DefectPatternIndex {
    schema_version: number;
    updated_at: string;
    entries: DefectPatternIndexEntry[];
}
interface PatternAdvisory {
    advisory_id: string;
    title: string;
    description: string;
}
interface PatternQueryOptions {
    stack_context?: StackContext;
    min_frequency?: number;
    max_age_days?: number;
    limit?: number;
}

interface ClassificationRule {
    pattern: RegExp;
    subcategory: string;
}
declare const CLASSIFICATION_RULES: ClassificationRule[];
declare function classifyDefect(description: string, sourceCategory: string): string;

declare function defaultStoreRoot(): string;
declare function recordFindings(findings: DefectFinding[], storeRoot?: string): Promise<void>;
declare function queryPatterns(options: {
    stack_context?: StackContext;
    min_frequency?: number;
    max_age_days?: number;
    limit?: number;
}, storeRoot?: string): Promise<DefectPatternEntry[]>;
declare function prunePatterns(olderThanDays: number, storeRoot?: string): Promise<number>;
declare function loadIndex(storeRoot?: string): Promise<DefectPatternIndex>;
declare function loadEntry(patternId: string, storeRoot?: string): Promise<DefectPatternEntry | null>;
declare function ensureStoreDir(storeRoot: string): Promise<void>;
declare function markStaleEntries(index: DefectPatternIndex): void;

interface RecordFromComplianceOptions {
    report: ComplianceReport;
    stack_context?: StackContext;
    storeRoot?: string;
}
declare function recordFromComplianceReport(options: RecordFromComplianceOptions): Promise<number>;

declare function buildPatternAdvisories(options: {
    stack_context?: StackContext;
    spec_keywords?: string[];
    storeRoot?: string;
} & Pick<PatternQueryOptions, 'min_frequency' | 'max_age_days'>): Promise<PatternAdvisory[]>;
declare function formatAgentContextWarnings(options: {
    stack_context?: StackContext;
    storeRoot?: string;
} & Pick<PatternQueryOptions, 'min_frequency' | 'max_age_days'>): Promise<string>;

declare const AGENT_ROLES: readonly ["context-curator", "solution-architect", "db-expert", "ux-ui-analyst", "product-owner", "market-researcher", "implementer", "reviewer", "verifier", "security-auditor", "test-planner", "gap-detector", "requirement-analyst", "devops-engineer", "doc-maintainer", "performance-analyst", "data-modeler", "integration-architect", "qa-engineer", "user-flow-writer", "chief-architect", "application-architect"];
type AgentRole = (typeof AGENT_ROLES)[number];
interface TokenBudget {
    analysis: number;
    implementation: number;
    review: number;
}
interface SubagentConfig {
    role: AgentRole;
    description: string;
    tools: string[];
    model?: string;
    token_budget: number;
    early_termination_allowed: boolean;
}

declare const DEFAULT_CONTEXT_BUDGET: ContextBudget;
declare function resolveContextBudgetForModel(modelName: string, baseBudget?: ContextBudget): ContextBudget;
declare function resolveContextBudgetForModelTier(models: Record<SkillModelTier, string>, tier: SkillModelTier, baseBudget?: ContextBudget): ContextBudget;
declare const CONTEXT_LEVEL_BUDGETS: Record<ContextLevel, number>;
declare const ROLE_TOKEN_BUDGETS: Record<AgentRole, number>;

declare const SUPPORTED_DOMAINS: readonly ["coding", "content"];
declare const SUPPORTED_STACKS: readonly ["laravel", "flutter", "react", "vue", "django", "fastapi", "rails", "spring-boot", "express", "angular", "svelte", "astro", "go-web", "rust-web", "dotnet", "nextjs", "flask", "nestjs", "kotlin-android", "node-cli", "node-library", "node-service", "short-video"];
declare const SUPPORTED_CAPABILITIES: readonly ["inertia", "vue", "react", "tailwind", "boost", "pest", "phpunit", "docker", "compose", "sail", "next", "remix", "vite-spa", "gatsby", "nuxt", "quasar", "blazor", "ef-core", "minimal-api", "mvc", "razor-pages", "signalr", "azure", "identity", "app-router", "pages-router", "prisma", "trpc", "next-auth", "sqlalchemy", "celery", "blueprints", "flask-login", "flask-restx", "gunicorn", "typeorm", "graphql", "microservices", "swagger", "passport", "fastify", "jetpack-compose", "room", "hilt", "retrofit", "coroutines", "navigation", "datastore"];

declare const HOOK_EXIT_CODES: {
    readonly ALLOW: 0;
    readonly ERROR: 1;
    readonly BLOCK: 2;
};

declare const PATHS: {
    readonly AGENCY_DIR: ".paqad";
    readonly AGENCY_CACHE_DIR: ".paqad/cache";
    readonly AGENCY_SESSION_DIR: ".paqad/session";
    readonly PROJECT_PROFILE: ".paqad/project-profile.yaml";
    readonly PROJECT_CONFIG: ".paqad/.config";
    readonly PROJECT_CONFIG_EXAMPLE: ".paqad/.config.example";
    readonly PROJECT_CONFIGS_DIR: ".paqad/configs";
    readonly PROJECT_CONFIGS_README: ".paqad/configs/README.md";
    readonly DETECTION_REPORT: ".paqad/detection-report.json";
    readonly ONBOARDING_MANIFEST: ".paqad/onboarding-manifest.json";
    readonly RAG_IGNORE_CONFIG: ".paqad/rag.ignore.yaml";
    readonly STACK_DRIFT: ".paqad/stack-drift.json";
    readonly STACK_SNAPSHOT: ".paqad/stack-snapshot.json";
    readonly DELIVERY_DETECTION: ".paqad/delivery-detection.json";
    readonly DELIVERY_PR_BODY_TEMPLATE: ".paqad/templates/pr-body.md";
    readonly FRAMEWORK_VERSION: ".paqad/framework-version.txt";
    readonly FRAMEWORK_PATH: ".paqad/framework-path.txt";
    readonly AGENT_ENTRY_SENTINEL: ".paqad/.agent-entry-loaded";
    readonly GLOSSARY: ".paqad/glossary.md";
    readonly HANDOFF: ".paqad/session/handoff.md";
    readonly ACTIVE_IMPLEMENTATION_SESSION: ".paqad/session/active-implementation.json";
    readonly CONTEXT_HIT_LOG: ".paqad/session/context-hit-log.json";
    readonly REVIEW_DIGEST: ".paqad/session/review-digest.md";
    readonly HUD_DIR: ".paqad/session/hud";
    readonly PROJECT_QUESTION_ANSWER: ".paqad/session/project-question-answer.json";
    readonly AUDIT_LOG: ".paqad/audit.log";
    readonly DECISIONS_DIR: ".paqad/decisions";
    readonly DECISIONS_PENDING_DIR: ".paqad/decisions/pending";
    readonly DECISIONS_RESOLVED_DIR: ".paqad/decisions/resolved";
    readonly DECISIONS_EXPIRED_DIR: ".paqad/decisions/expired";
    readonly DECISIONS_INDEX: ".paqad/decisions/index.json";
    readonly DECISIONS_AUDIT_LOG: ".paqad/decisions/audit.jsonl";
    readonly DECISIONS_EVENTS_LOG: ".paqad/decisions/events.jsonl";
    readonly DECISIONS_LOCK: ".paqad/decisions/.lock";
    readonly DECISION_PAUSE_CONTRACT: ".paqad/decision-pause-contract.md";
    readonly NARRATION_CONTRACT: ".paqad/narration-contract.md";
    readonly CHUNK_INDEX: ".paqad/context/chunk-index.json";
    readonly LOAD_STATS: ".paqad/context/load-stats.json";
    readonly VECTORS_DIR: ".paqad/vectors";
    readonly VECTOR_INDEX: ".paqad/vectors/index.json";
    readonly VECTOR_META: ".paqad/vectors/meta.json";
    readonly VISION_VECTOR_INDEX: ".paqad/vectors/vision-index.json";
    readonly VISION_VECTOR_META: ".paqad/vectors/vision-meta.json";
    readonly CRS_DIR: ".paqad/crs";
    readonly SECRETS_ENV: ".paqad/secrets.env";
    readonly SESSION_ATTACHMENT_COLLECTIONS_DIR: ".paqad/attachments";
    readonly SESSION_ATTACHMENT_REGISTRY: ".paqad/attachments/registry.json";
    readonly ATTACHMENT_EVENTS_LOG: ".paqad/attachment-events.jsonl";
    readonly GLOBAL_PATTERN_VECTORS_DIR: ".paqad/patterns/vectors";
    readonly GLOBAL_PATTERN_VECTOR_INDEX: ".paqad/patterns/vectors/index.json";
    readonly GLOBAL_PATTERN_VECTOR_META: ".paqad/patterns/vectors/meta.json";
    readonly TRANSITION_LOG: ".paqad/cache/transition-log.json";
    readonly CACHE_METRICS: ".paqad/cache/metrics.json";
    readonly PLANNING_MANIFESTS_DIR: ".paqad/planning/manifests";
    readonly CHECKS_DIR: ".paqad/checks";
    readonly CHECKS_REPORT: ".paqad/checks/last-run.json";
    readonly REGRESSION_GUARDS_DIR: ".paqad/regression-guards";
    readonly FLAKY_TESTS_DIR: ".paqad/flaky-tests";
    readonly FLAKY_REGISTRY: ".paqad/flaky-tests/registry.json";
    readonly FINDINGS_DIR: ".paqad/findings";
    readonly TRIAGE_LEDGER: ".paqad/findings/triage.json";
    readonly EVIDENCE_LEDGER_DIR: ".paqad/ledger";
    readonly EVIDENCE_LEDGER: ".paqad/ledger/evidence.jsonl";
    readonly FEATURE_EVIDENCE_DIR: ".paqad/ledger/feature-evidence";
    readonly FEATURE_EVIDENCE_SESSION_DIR: ".paqad/ledger/feature-evidence/_session";
    readonly CHAT_LEDGER_DIR: ".paqad/ledger/_chat";
    readonly DISCOVERY_DIR: ".paqad/ledger/delivery";
    readonly LEDGER_SESSION_ID: ".paqad/session/ledger-session-id";
    readonly EVIDENCE_RECEIPT: ".paqad/ledger/receipt.dsse.json";
    readonly EVIDENCE_RECEIPT_CHAIN: ".paqad/ledger/receipts.jsonl";
    readonly EVIDENCE_AI_BOM: ".paqad/ledger/ai-bom.json";
    readonly EVIDENCE_CONTEXT_STAMP: ".paqad/session/context-stamp.json";
    readonly TRACEABILITY_DIR: ".paqad/traceability";
    readonly TRACEABILITY_MAP: ".paqad/traceability/map.json";
    readonly QUALITY_BASELINE: ".paqad/quality-baseline.json";
    readonly PLANNING_MODULE_HEALTH_DIR: ".paqad/module-health";
    readonly MODULE_HEALTH_EVIDENCE_DIR: ".paqad/module-health-evidence";
    readonly MODULE_HEALTH_CONSUMED_EVENTS: ".paqad/module-health-consumed-events.json";
    readonly MODULE_HEALTH_LOCK: ".paqad/locks/module-health.lock";
    readonly MODULE_HEALTH_LOG: ".paqad/logs/module-health.log";
    readonly COMPILED_RULES: ".paqad/compiled-rules.json";
    readonly PLANNING_COSTS: ".paqad/cache/planning-costs.json";
    readonly CONTEXT_SESSION_ARTIFACT: ".paqad/context/session-context.md";
    readonly CODEBASE_MEMORY: ".paqad/crs/codebase-memory.json";
    readonly BASE_DRIFT_STATE: ".paqad/session/base-drift.json";
    readonly BASE_DRIFT_MARKER: ".paqad/session/base-drift.marker";
    readonly BASE_DRIFT_LOCK: ".paqad/locks/base-drift.lock";
    readonly CONTEXT_BUDGET_STATE: ".paqad/session/context-budget.json";
    readonly CONTEXT_SAVINGS: ".paqad/session/context-savings.json";
    readonly DEDUP_STATS: ".paqad/session/dedup-stats.json";
    readonly HANDOFF_JSON: ".paqad/session/handoff.json";
    readonly HANDOFF_STATS: ".paqad/session/handoff-stats.json";
    readonly WORKFLOWS_DIR: "docs/instructions/workflows";
    readonly WORKFLOW_RUNS_DIR: ".paqad/workflows";
    readonly SKILL_CACHE_DIR: ".paqad/cache/skill-results";
    readonly SKILL_INDEX: ".paqad/skill-index.json";
    readonly SKILL_AUDIT_EVENTS_LOG: ".paqad/skills/events.jsonl";
    readonly DOC_PROGRESS: ".paqad/doc-progress.json";
    readonly DOC_RUN_SESSION: ".paqad/session/doc-run.json";
    readonly PENTEST_ROOT_DIR: ".paqad/pentest";
    readonly PENTEST_RUNS_DIR: ".paqad/pentest/runs";
    readonly HEALTH_ROOT_DIR: ".paqad/health";
    readonly HEALTH_RUNS_DIR: ".paqad/health/runs";
    readonly HEALTH_BASELINE: ".paqad/health/baseline.json";
    readonly SITE_MAP_ROOT_DIR: ".paqad/site-map";
    readonly SITE_MAP_RUNS_DIR: ".paqad/site-map/runs";
    readonly SITE_MAP_BASELINE: ".paqad/site-map/baseline.json";
    readonly SITE_MAP_PROGRESS: ".paqad/site-map/progress.json";
    readonly INDEXES_DIR: ".paqad/indexes";
    readonly CODE_KNOWLEDGE_INDEX: ".paqad/indexes/code-knowledge.json";
    readonly FRAMEWORK_API_INDEX: ".paqad/indexes/framework-api.json";
    readonly SITE_MAP_CANONICAL_DIR: "docs/site-map";
    readonly SITE_MAP_CANONICAL_APP_MAP: "docs/site-map/app-map.yaml";
    readonly SITE_MAP_CANONICAL_JOURNEYS_DIR: "docs/site-map/journeys";
    readonly SITE_MAP_CANONICAL_ANSWERS: "docs/site-map/answers.yaml";
    readonly SITE_MAP_CANONICAL_LAYOUT: "docs/site-map/layout.yaml";
    readonly DOCS_DIR: "docs";
    readonly FRAMEWORK_DOCS_DIR: "docs/framework";
    readonly FRAMEWORK_STACK_DIR: "docs/instructions/stack";
    readonly RCA_DIR: "docs/rca";
    readonly PENTEST_DIR: "docs/pentest";
    readonly PENTEST_RETEST_DIR: "docs/pentest/retests";
    readonly HEALTH_DIR: "docs/health";
    readonly RULES_DIR: "docs/instructions/rules";
    readonly MODULE_MAP: "docs/instructions/rules/module-map.yml";
    readonly TOOLS_DIR: "docs/instructions/tools";
    readonly INSTRUCTIONS_DIR: "docs/instructions";
    readonly ARCHITECTURE_DIR: "docs/instructions/architecture";
    readonly DESIGN_SYSTEM_DIR: "docs/instructions/design-system";
    readonly DESIGN_TOKENS_FILE: "docs/instructions/design-system/design-tokens.json";
    readonly MODULES_DIR: "docs/modules";
    readonly REGISTRIES_DIR: "docs/instructions/registries";
    readonly BENCHMARKS_DIR: "docs/instructions/benchmarks";
    readonly TECH_DEBT_DIR: "docs/instructions/tech-debt";
    readonly MODULE_DB_DIR: "database";
    readonly MODULE_API_DIR: "api";
    readonly MODULE_INTEGRATION_DIR: "integration";
    readonly MODULE_UI_DIR: "ui";
    readonly MODULE_FEATURES_DIR: "features";
    readonly MODULE_USER_FLOWS_DIR: "user-flows";
    readonly MODULE_RESEARCH_DIR: "research";
    readonly MODULE_DECISIONS_DIR: "decisions";
    readonly MODULE_ERROR_CATALOG: "error-catalog.md";
    readonly CLAUDE_MD: "CLAUDE.md";
    readonly AGENTS_MD: "AGENTS.md";
    readonly ANTIGRAVITY_MD: "ANTIGRAVITY.md";
    readonly GEMINI_MD: "GEMINI.md";
    readonly SCRIPTS_DIR: "scripts";
    readonly HOOKS_DIR: ".paqad/hooks";
    readonly LOGS_DIR: ".paqad/logs";
    readonly LOCKS_DIR: ".paqad/locks";
    readonly AUTO_UPDATE_LOG: ".paqad/logs/auto-update.log";
    readonly MCP_RECOMMENDATIONS: ".paqad/mcp-recommendations.json";
    readonly MCP_CLEANUP_LOG: ".paqad/logs/mcp-cleanup.log";
    readonly PROSPECTIVE_DECISIONS_DIR: ".paqad/decisions/module-decisions";
    readonly MODULE_MAP_HISTORY_DIR: ".paqad/module-map/history";
    readonly MODULE_MAP_EVENTS_LOG: ".paqad/module-map/events.jsonl";
    readonly MODULE_MAP_DRIFT: ".paqad/module-map/drift.json";
    readonly SCHEMA_MARKER: ".paqad/schema-version.json";
    readonly SCHEMA_MIGRATION_LOG: ".paqad/schema-migrations.jsonl";
    readonly SCHEMA_MIGRATION_LOCK: ".paqad/locks/schema-migration.lock";
    readonly ONBOARDING_CHECKPOINT: ".paqad/onboarding-checkpoint.json";
    readonly RULE_SCRIPT_MAP: "docs/instructions/rules/rule-script-map.yml";
    readonly RULE_SCRIPTS_DIR: ".paqad/scripts/rules";
    readonly RULE_SCRIPTS_CACHE_DIR: ".paqad/scripts/rules/.cache";
    readonly RULE_SCRIPTS_REPORT: ".paqad/scripts/rules/.cache/report.json";
    readonly RULE_SCRIPTS_DRIFT: ".paqad/scripts/rules/.cache/drift.json";
    readonly DUPLICATION_REPORT: ".paqad/scripts/rules/.cache/duplication.json";
    readonly RULE_SCRIPT_MAP_HISTORY_DIR: ".paqad/scripts/rules/.history";
    readonly RULE_SCRIPT_MAP_EVENTS_LOG: ".paqad/scripts/rules/.history/events.jsonl";
    readonly CAPABILITY_LOCK: ".paqad/capability-lock.json";
};
declare const REGISTRIES: readonly ["module-registry.md", "feature-registry.md", "model-registry.md", "api-registry.md", "job-event-registry.md", "component-registry.md", "screen-registry.md", "table-registry.md", "query-registry.md", "test-registry.md", "error-code-registry.md", "integration-registry.md", "reuse-catalog.md"];

declare const PLANNING_MANIFEST_VERSION: 1;
declare const PLAN_MODES: {
    readonly FULL: "full";
    readonly DELTA: "delta";
};
declare const PLANNING_LANES: {
    readonly FAST: "fast";
    readonly GRADUATED: "graduated";
    readonly FULL: "full";
};
declare const REQUIREMENT_TYPES: {
    readonly FUNCTIONAL: "functional";
    readonly NON_FUNCTIONAL: "non-functional";
    readonly CONSTRAINT: "constraint";
    readonly EDGE_CASE: "edge-case";
};
declare const PROOF_TYPES: {
    readonly AUTOMATED: "automated";
    readonly MANUAL: "manual";
    readonly VISUAL: "visual";
};
declare const CRITERION_STATUSES: {
    readonly UNCOVERED: "uncovered";
    readonly COVERED: "covered";
    readonly PARTIAL: "partial";
    readonly INDETERMINATE: "indeterminate";
};
declare const HEALTH_TIERS: {
    readonly STABLE: "stable";
    readonly MODERATE: "moderate";
    readonly FRAGILE: "fragile";
    readonly UNKNOWN: "unknown";
};
declare const ROLLBACK_CLASSES: {
    readonly SAFE: "safe";
    readonly NEEDS_MIGRATION: "needs-migration";
    readonly DESTRUCTIVE: "destructive";
};

declare const PAQAD_SCHEMA_VERSION = "1.1.0";

interface CancelledErrorDetails extends Record<string, unknown> {
    checkpoint_path?: string;
}
declare class CancelledError extends FrameworkError {
    readonly code: 'CANCELLED_BY_CONSUMER';
    constructor(message?: string, details?: CancelledErrorDetails);
}
declare function isCancelledError(error: unknown): error is CancelledError;

declare class MissingPolicyContextError extends FrameworkError {
    readonly code: 'MISSING_POLICY_CONTEXT';
    constructor(message: string, details: MissingPolicyContextPayload, projectRoot?: string);
}
declare class DuplicateSkillIdentifierError extends FrameworkError {
    readonly code: 'DUPLICATE_SKILL_IDENTIFIER';
    constructor(message: string, details: DuplicateSkillIdentifierPayload, projectRoot?: string);
}
declare class DecisionPacketCorruptError extends FrameworkError {
    readonly code: 'DECISION_PACKET_CORRUPT';
    constructor(message: string, details: DecisionPacketCorruptPayload, projectRoot?: string);
}
declare class UnsupportedFileTypeError extends FrameworkError {
    readonly code: 'UNSUPPORTED_FILE_TYPE';
    constructor(message: string, details: UnsupportedFileTypePayload, projectRoot?: string);
}
declare class VersionIncompatibleError extends FrameworkError {
    readonly code: 'VERSION_INCOMPATIBLE';
    constructor(message: string, details: VersionIncompatiblePayload, projectRoot?: string);
}
declare class ManifestProductionTimeoutError extends FrameworkError {
    readonly code: 'MANIFEST_PRODUCTION_TIMEOUT';
    constructor(message: string, details: ManifestProductionTimeoutPayload, projectRoot?: string);
}
declare class WorkflowAlreadyRunningError extends FrameworkError {
    readonly code: 'WORKFLOW_ALREADY_RUNNING';
    constructor(message: string, details: WorkflowAlreadyRunningPayload, projectRoot?: string);
}
declare class VectorIndexStorageError extends FrameworkError {
    readonly code: 'VECTOR_INDEX_STORAGE_ERROR';
    constructor(message: string, details: VectorIndexStorageErrorPayload, projectRoot?: string);
}
declare class LoggerSinkFailedError extends FrameworkError {
    readonly code: 'LOGGER_SINK_FAILED';
    constructor(message: string, details: LoggerSinkFailedPayload, projectRoot?: string);
}
declare class UnknownEngineError extends FrameworkError {
    readonly code: 'UNKNOWN_ENGINE_ERROR';
    constructor(message: string, details?: UnknownEngineErrorPayload, projectRoot?: string);
}
declare function toEngineError(error: unknown): FrameworkError;
declare function isEngineErrorCode(code: string): code is EngineErrorCode;

interface RedactPayloadResult {
    redacted: Record<string, unknown>;
    redacted_fields: string[];
}
declare function redactPayload(payload: Record<string, unknown>, projectRoot?: string): RedactPayloadResult;

declare class ResolutionError extends FrameworkError {
    constructor(message: string, details?: Record<string, unknown>);
}

declare const SCHEMA_VERSION_UPDATE_HINT: string;
interface SchemaVersionErrorOptions {
    code?: string;
    cause?: unknown;
    details?: Record<string, unknown>;
}
declare class SchemaVersionError extends FrameworkError {
    constructor(message: string, options?: SchemaVersionErrorOptions);
}

type SkillRegistrationErrorKind = 'malformed' | 'duplicate' | 'not-found' | 'built-in-protected';
interface SkillRegistrationErrorOptions {
    kind: SkillRegistrationErrorKind;
    builtInId?: string;
    runtimeId?: string;
    cause?: unknown;
}
declare class SkillRegistrationError extends FrameworkError {
    readonly kind: SkillRegistrationErrorKind;
    readonly builtInId?: string;
    readonly runtimeId?: string;
    constructor(message: string, options: SkillRegistrationErrorOptions);
}

declare class ValidationError extends FrameworkError {
    readonly subCode?: string;
    constructor(message: string, details?: Record<string, unknown>, subCode?: string);
}

type LogLevel = 'debug' | 'info' | 'warn' | 'error';
interface StructuredLogRecord {
    level: LogLevel;
    timestamp: string;
    runtime: string;
    event: string;
    correlation_id?: string;
    [key: string]: unknown;
}
type RedactionAllowlist = readonly string[];
interface RedactionEvent {
    field: string;
    placeholder: string;
    timestamp: string;
}

interface EngineLogEntry {
    level: LogLevel;
    message: string;
    payload?: Record<string, unknown>;
}
interface EngineLogger {
    log(entry: EngineLogEntry): void | Promise<void>;
}

declare function setEngineLogger(logger: EngineLogger): void;
declare function clearEngineLogger(): void;
declare function getConsumerLogger(): EngineLogger | null;
declare function engineLog(level: LogLevel, message: string, payload?: Record<string, unknown>): void;

interface CreateLoggerOptions {
    runtime: string;
    level?: LogLevel;
    allowlist?: RedactionAllowlist;
    correlationId?: string;
    writeLine?: (line: string) => void;
    now?: () => string;
}
interface StructuredLogger {
    debug(event: string, fields?: Record<string, unknown>): void;
    info(event: string, fields?: Record<string, unknown>): void;
    warn(event: string, fields?: Record<string, unknown>): void;
    error(event: string, fields?: Record<string, unknown>): void;
    log(level: LogLevel, event: string, fields?: Record<string, unknown>): void;
    getRedactionCount(): number;
    resetRedactionCount(): void;
    setLevel(level: LogLevel): void;
    setAllowlist(list: RedactionAllowlist): void;
    withCorrelation(correlationId: string): StructuredLogger;
}
declare function createLogger(options: CreateLoggerOptions): StructuredLogger;

interface LoggingConfig {
    level: LogLevel;
    allowlist: RedactionAllowlist;
    runtime: string;
}
declare function loadLoggingConfig(overrides?: Partial<LoggingConfig>): LoggingConfig;
declare function reloadLoggingConfig(logger: StructuredLogger, config: LoggingConfig): void;
declare function getEngineLogger(): StructuredLogger;

declare const REDACTION_PLACEHOLDER = "[REDACTED]";
declare const DEFAULT_REDACTION_ALLOWLIST: RedactionAllowlist;
declare function redactFields(fields: Record<string, unknown>, allowlist: RedactionAllowlist): {
    redacted: Record<string, unknown>;
    count: number;
};

interface SchemaMigrationContext {
    projectRoot: string;
    fromVersion: string;
    toVersion: string;
    engineVersion: string;
}
interface SchemaMigrator {
    id: string;
    appliesTo(fromVersion: string, toVersion: string): boolean;
    migrate(context: SchemaMigrationContext): Promise<string | void>;
}

interface PaqadSchemaMarker {
    paqad_schema_version: string;
    written_at: string;
    written_by_engine_version: string;
}
interface SchemaMigrationRecord {
    from_version: string | null;
    to_version: string;
    migrated_at: string;
    engine_version: string;
    file: string;
    notes?: string[];
}
type SchemaCompatibility = 'compatible' | 'needs-migration' | 'future';

declare function schemaMarkerPath(projectRoot: string): string;
declare function schemaMigrationLogPath(projectRoot: string): string;
declare function writeSchemaMarker(projectRoot: string, engineVersion: string): Promise<PaqadSchemaMarker>;
declare function writeSchemaMarkerSync(projectRoot: string, engineVersion: string): PaqadSchemaMarker;
declare function readSchemaMarker(projectRoot: string): Promise<PaqadSchemaMarker | null>;
declare function readSchemaMarkerSync(projectRoot: string): PaqadSchemaMarker | null;
declare function ensureSchemaMarkerSync(projectRoot: string, engineVersion: string): PaqadSchemaMarker;
declare function checkSchemaCompatibility(marker: PaqadSchemaMarker): SchemaCompatibility;
declare function appendMigrationRecord(projectRoot: string, record: SchemaMigrationRecord): Promise<void>;
declare function withSchemaMigrationLock<T>(projectRoot: string, fn: () => Promise<T>): Promise<T>;
declare function checkAndMigrateSchema(projectRoot: string, engineVersion: string, options?: {
    migrators?: readonly SchemaMigrator[];
}): Promise<PaqadSchemaMarker>;

declare const ACTIVE_CAPABILITY_ORDER: ActiveCapability[];
declare const MANAGEABLE_ACTIVE_CAPABILITIES: ActiveCapability[];
declare function listAvailableActiveCapabilities(): ActiveCapability[];
declare function isActiveCapability(value: string): value is ActiveCapability;
declare function isManageableActiveCapability(value: string): value is ActiveCapability;
declare function assertActiveCapability(value: string): ActiveCapability;
declare function normalizeActiveCapabilities(capabilities: Iterable<ActiveCapability>): ActiveCapability[];
declare function addActiveCapability(profile: ProjectProfile, capability: ActiveCapability): ProjectProfile;
declare function removeActiveCapability(profile: ProjectProfile, capability: ActiveCapability): ProjectProfile;

interface DesignTokenLeaf {
    $value: unknown;
    $type: string;
    $description?: string;
}
interface DesignTokenGroup {
    [key: string]: DesignTokenNode;
}
type DesignTokenNode = DesignTokenLeaf | DesignTokenGroup;
type DesignTokensDocument = DesignTokenGroup;
interface DesignTokenDocArtifact {
    path: string;
    content: string;
}
interface ThemeExportArtifact {
    path: string;
    content: string;
}

declare const DOC_TYPES: readonly ["stories", "spec", "user-flow", "schema", "query", "index", "registry", "ui", "api", "integration", "error-catalog", "glossary", "decision-record", "review-report", "sequence-plan"];
type DocType = (typeof DOC_TYPES)[number];
interface DocPath {
    type: DocType;
    path: string;
}
interface ApiEndpointDoc {
    method: string;
    route: string;
    auth: 'required' | 'public';
    permissions: string[];
    rate_limit?: string;
    description: string;
    request_schema_ref: string;
    response_schema_ref: string;
    error_codes_ref: string;
    added_in: string;
    last_updated: string;
}
interface ApiSchemaField {
    name: string;
    type: string;
    required: boolean;
    validation?: string;
    description: string;
}
interface IntegrationEventPayloadField {
    name: string;
    type: string;
    description: string;
}
interface IntegrationEvent {
    event_class: string;
    published_by: string;
    payload_fields: IntegrationEventPayloadField[];
    subscribers: string[];
    async: boolean;
    added_in: string;
}
interface IntegrationContract {
    type: 'event' | 'service-call' | 'shared-model' | 'job';
    interface_desc: string;
    contract_version: string;
    breaking_change_policy: string;
    fallback: string;
}
interface ErrorCatalogEntry {
    code: string;
    http_status?: number;
    user_message: string;
    internal_message: string;
    trigger: string;
    recovery_path: string;
    retry_safe: boolean;
    logged: boolean;
    alerted: boolean;
    added_in: string;
    last_updated: string;
}
interface IntegrationDoc {
    name: string;
    depends_on: string[];
    provides_to: string[];
}

type DocumentScope = 'ui' | 'api' | 'database' | 'architecture' | 'full';
type DocProgressState = 'not_started' | 'generating' | 'done' | 'failed';
interface DocProgressEntry {
    output_path: string;
    state: DocProgressState;
    started_at: string | null;
    completed_at: string | null;
    source_files: string[];
    source_hash: string | null;
    tokens_used: number | null;
    error: string | null;
    design_tokens?: {
        extraction_state: DocProgressState;
        total_tokens_found: number;
        placeholder_count: number;
        populated_count: number;
        placeholder_keys: string[];
    };
}
type ModuleDocStage = 'pending_map_review' | 'complete';
interface DocProgressFile {
    schema_version: '1';
    generated_by: 'paqad-ai';
    framework_version: string;
    modules: Record<string, Record<string, DocProgressEntry>>;
    global: Record<string, Record<string, DocProgressEntry>>;
    moduleDocStage?: ModuleDocStage;
}

declare const HOOK_TRIGGERS: readonly ["user-prompt-submit", "pre-tool-use", "post-tool-use", "stop", "subagent-stop", "pre-compact"];
type HookTrigger = (typeof HOOK_TRIGGERS)[number];
type ExitCode = 0 | 1 | 2;
interface HookDefinition {
    name: string;
    trigger: HookTrigger;
    command: string;
    blocking: boolean;
}
interface HookResult {
    hook: string;
    trigger: HookTrigger;
    exit_code: ExitCode;
    message?: string;
}

declare const MCP_SERVER_TYPES: readonly ["laravel-boost", "dart-mcp", "database-inspector", "figma", "vite-inspector", "react-router-mcp", "vue-router-mcp", "tailwind-mcp"];
type McpServerType = (typeof MCP_SERVER_TYPES)[number];
interface McpServerConfig {
    name: McpServerType | string;
    enabled: boolean;
    config: Record<string, unknown>;
}
interface McpServerDefinition {
    name: McpServerType;
    stacks: string[];
    capabilities: string[];
    provides: string[];
    replaces: string[];
}
interface McpConfigOutput {
    path: string;
    content: string;
}
interface McpRecommendation {
    name: string;
    provides: string[];
    replaces: string[];
    why: string;
}
interface McpRecommendations {
    servers: McpRecommendation[];
}
type DataSourceType = 'mcp' | 'script' | 'cached-skill' | 'llm-read';
interface DataSource {
    type: DataSourceType;
    server?: string;
    script?: string;
    reason?: string;
    estimated_token_savings?: number;
}

interface OnboardingManifest {
    framework_version?: string;
    adapter: AdapterType;
    project_root: string;
    profile: ProjectProfile;
    detected: DetectionReport | null;
    repository?: RepositoryContext;
    generated_at: string;
    generated_artifacts: Array<{
        path: string;
        auto_update: boolean;
        executable?: boolean;
    }>;
    planning_artifacts?: {
        compiled_rules_path: string;
        module_health_initialized: string[];
        classifier_config_path?: string;
    };
}
interface OnboardingOutput {
    adapter: AdapterType;
    decision_pause_supported_adapters: AdapterType[];
    generated_files: string[];
    detected_modules: string[];
    runtime_root: string;
    manifest_path: string;
    warnings: string[];
    kept_files: string[];
    drift_review_targets: string[];
    reverted_framework_values: string[];
}
interface OnboardingFileTreeEntry {
    path: string;
    action: 'create' | 'overwrite' | 'skip';
    mtimeMs?: number;
    templateError?: string;
}
interface OnboardingPreviewResult {
    entries: OnboardingFileTreeEntry[];
    warnings: string[];
}

declare const REVIEW_TIERS: readonly ["full", "standard", "spot-check"];
type ReviewTier = (typeof REVIEW_TIERS)[number];
declare const REVIEW_MODES: readonly ["fresh", "diff"];
type ReviewMode = (typeof REVIEW_MODES)[number];
declare const REVIEW_DIMENSIONS: readonly ["completeness", "assumption-safety", "security", "data-integrity", "performance", "failure-modes", "reuse-architecture", "database-quality", "ux-ui-quality", "test-quality", "observability", "rollback-safety"];
type ReviewDimension = (typeof REVIEW_DIMENSIONS)[number];
declare const TIER_DIMENSIONS: Record<ReviewTier, readonly ReviewDimension[]>;
declare const FINDING_SEVERITIES: readonly ["critical", "high", "medium", "low"];
type FindingSeverity$1 = (typeof FINDING_SEVERITIES)[number];
interface ReviewFinding {
    id: string;
    dimension: ReviewDimension;
    severity: FindingSeverity$1;
    finding: string;
    impact: string;
    required_action: string;
}
interface ReviewReport {
    point: 'after-spec' | 'after-implementation';
    tier: ReviewTier;
    mode: ReviewMode;
    verdict: 'pass' | 'fail';
    summary: string;
    findings: ReviewFinding[];
    dimensions_passed_clean: ReviewDimension[];
    dimensions_deferred: ReviewDimension[];
}

declare const PIPELINE_PHASES: readonly ["request-classification", "docs-first-load", "analysis", "question-answering", "root-cause-analysis", "pentest", "pentest-retest", "sequence-planning", "specification", "user-flow", "spec-review", "implementation", "implementation-review", "verification-gates", "documentation-update", "module-documentation"];
type PipelinePhase = (typeof PIPELINE_PHASES)[number];
interface PhaseResult {
    phase: PipelinePhase;
    status: 'pass' | 'fail' | 'warning';
    summary: string;
    artifacts: string[];
}
interface CompletedStorySummary {
    id: string;
    title: string;
    verification_status: 'passed' | 'failed' | 'partial';
}
interface ChangeClosureSummary {
    code_changed: boolean;
    test_evidence_changed: boolean;
    canonical_docs_changed: boolean;
    blocked: boolean;
    primary_blocking_reason: string | null;
    summary: string;
}
interface HandoffArtifact {
    framework_version: string;
    workflow: ClassificationResult['workflow'];
    current_phase: PipelinePhase;
    current_story: {
        id: string;
        title: string;
    } | null;
    completed_stories: CompletedStorySummary[];
    key_decisions: string[];
    verification_results: GateResult[];
    changed_files: string[];
    context_hit_rate: number;
    warnings: string[];
    unresolved_items: string[];
    closure_summary: ChangeClosureSummary;
    references: {
        spec: string;
        flow: string;
        review_report: string;
    };
}
interface PipelineRunContext {
    project_root: string;
    lane: Lane;
    classification: ClassificationResult;
    started_at: string;
    phases: PhaseResult[];
    feature_policy: FeatureDevelopmentPolicy | null;
    policy_warnings: string[];
    verification_context?: VerificationContext;
    verification_baseline_results?: GateResult[];
    verification_results?: GateResult[];
    signal?: AbortSignal;
}
interface PipelineAnalysisRole {
    name: string;
}
interface PipelineResult {
    lane: Lane | null;
    phases: PhaseResult[];
    blocked_at: PipelinePhase | null;
    handoff_path: string;
    analysisRoles: PipelineAnalysisRole[];
    reviewTier: ReviewTier;
    reviewMode?: ReviewMode;
    route_reason?: string | null;
    closure_summary: ChangeClosureSummary;
    cancelled?: true;
    cancelled_checkpoint?: string;
}

declare const PENTEST_WORKFLOWS: readonly ["pentest", "pentest-retest"];
type PentestWorkflowName = (typeof PENTEST_WORKFLOWS)[number];
declare const PENTEST_SEVERITIES: readonly ["high", "medium", "low"];
type PentestSeverity = (typeof PENTEST_SEVERITIES)[number];
declare const PENTEST_EFFORTS: readonly ["low", "medium", "high"];
type PentestEffort = (typeof PENTEST_EFFORTS)[number];
declare const PENTEST_RETEST_STATUSES: readonly ["fixed", "still-open", "needs-manual-verification"];
type PentestRetestStatus = (typeof PENTEST_RETEST_STATUSES)[number];
declare const PENTEST_FINDING_STATUSES: readonly ["open", "coverage-gap", "fixed", "still-open", "needs-manual-verification", "potentially-fixed"];
type PentestFindingStatus = (typeof PENTEST_FINDING_STATUSES)[number];
declare const PENTEST_SOURCE_TYPES: readonly ["docs", "tests", "code", "runtime", "advisory"];
type PentestSourceType = (typeof PENTEST_SOURCE_TYPES)[number];
declare const PENTEST_RUN_STEP_STATUSES: readonly ["not_started", "running", "completed", "blocked", "failed"];
type PentestRunStepStatus = (typeof PENTEST_RUN_STEP_STATUSES)[number];
declare const PENTEST_RUN_STATUSES: readonly ["running", "completed", "blocked", "failed"];
type PentestRunStatus = (typeof PENTEST_RUN_STATUSES)[number];
interface PentestFinding {
    id: string;
    title: string;
    description: string;
    impact: PentestSeverity;
    effort: PentestEffort;
    possible_solution_direction: string;
    how_to_reproduce: string[];
    impact_area: string[];
    evidence: string[];
    category: string;
    status: PentestFindingStatus;
    confidence: number;
    source_types: PentestSourceType[];
    affected_modules: string[];
    affected_packages: string[];
    runtime_required: boolean;
    manual_follow_up: boolean;
}
interface PentestRetestFinding extends PentestFinding {
    retest_status: PentestRetestStatus;
}
interface PentestCoverageSummary {
    docs: boolean;
    tests: boolean;
    code: boolean;
    runtime: boolean;
    database: boolean;
    blocked_checks: string[];
}
interface PentestRuntimeStatus {
    target_url: string | null;
    status: 'reachable' | 'unreachable' | 'not-configured' | 'blocked';
    detail: string;
}
interface PentestReportIndex {
    schema_version: '1';
    generated_by: 'paqad-ai';
    framework_version: string;
    report_id: string;
    workflow: PentestWorkflowName;
    generated_at: string;
    report_path: string;
    sidecar_path: string;
    source_report_path: string | null;
    source_report_id: string | null;
    stack: {
        primary: string;
        traits: string[];
        toolchains: string[];
    };
    runtime: PentestRuntimeStatus;
    coverage: PentestCoverageSummary;
    findings: Array<PentestFinding | PentestRetestFinding>;
    blocked_checks: string[];
    sources_used: string[];
    methodology: string[];
    next_remediation_priorities: string[];
    raw_evidence_paths: string[];
}
interface PentestRunStep {
    id: string;
    title: string;
    status: PentestRunStepStatus;
    input_hash: string | null;
    artifact_paths: string[];
    skill_names: string[];
    error: string | null;
    started_at: string | null;
    completed_at: string | null;
}
interface PentestRunProgress {
    schema_version: '1';
    generated_by: 'paqad-ai';
    framework_version: string;
    run_id: string;
    workflow: PentestWorkflowName;
    status: PentestRunStatus;
    started_at: string;
    updated_at: string;
    report_path: string | null;
    sidecar_path: string | null;
    target_url: string | null;
    source_report_path: string | null;
    steps: PentestRunStep[];
    skill_invocations: string[];
    script_artifacts: string[];
    current_finding_ids: string[];
    incremental_type?: 'full' | 'incremental';
}

interface PostClassificationAdjustments {
    complexity: Complexity;
    risk: Risk;
    lane_before_override: string;
    lane_override_reason: string | null;
    risk_floor: Risk | null;
    risk_floor_reason: string | null;
    complexity_adjustment: number;
    complexity_adjustment_reason: string | null;
    resolution_updates: Record<string, string>;
    high_override_rate: boolean;
}

interface AffectedModule {
    path: string;
    source: 'explicit-path' | 'symbol-index' | 'rag' | 'stack-heuristic' | 'mcp' | 'import-graph';
    confidence: number;
}
interface ClassificationHint<TValue> {
    value: TValue;
    source: string;
    confidence: number;
    reason?: string;
}
interface PreClassificationResolved {
    workflow?: ClassificationWorkflow | null;
    scope?: ClassificationScope;
    affected_modules?: string[];
    database_impact?: DatabaseImpact;
    api_impact?: ApiImpact;
    ui_impact?: UiImpact;
    compliance_sensitivity?: ComplianceSensitivity;
    customer_facing_impact?: CustomerFacingImpact;
    reversibility?: Reversibility;
    data_sensitivity?: DataSensitivity;
    delta_candidate?: boolean;
    base_manifest_slug?: string | null;
    prior_requirement_count?: number | null;
    prior_criterion_count?: number | null;
    context_budget_hint?: ContextBudgetHint;
    affected_modules_source?: string;
    scope_graph_depth?: number;
    matched_rule_triggers?: string[];
    decision_category?: DecisionCategory;
}
interface PreClassificationResult {
    resolved: PreClassificationResolved;
    hints: Partial<Record<keyof PreClassificationResolved, ClassificationHint<unknown>>>;
    unresolved: string[];
    resolution_map: ResolutionMap;
    evidence: string[];
    detected_forks?: Array<{
        category: DecisionCategory;
        confidence: number;
        signal: string;
        matched_text: string;
    }>;
}

declare const STABILITY_LEVELS: readonly ["stable", "beta", "alpha", "internal"];
type StabilityLevel = (typeof STABILITY_LEVELS)[number];
interface SurfaceEntry {
    consumer: string;
    engineModule: string;
    functionSignature: string;
    stabilityLevel: StabilityLevel;
    since: string;
    exempt?: string;
}

interface TemplateDefinition {
    name: string;
    source: string;
    destination: string;
    partials?: string[];
}
type TemplateContext = Record<string, unknown>;

declare const VERIFICATION_EVIDENCE_SCHEMA_VERSION = "1.1.0";
declare const EVIDENCE_GATE_STATUSES: readonly ["pass", "fail", "inconclusive", "skipped"];
type EvidenceGateStatus = (typeof EVIDENCE_GATE_STATUSES)[number];
declare const EVIDENCE_OVERALL_STATUSES: readonly ["pass", "fail", "error"];
type EvidenceOverallStatus = (typeof EVIDENCE_OVERALL_STATUSES)[number];
declare const EVIDENCE_FAILURE_CATEGORIES: readonly ["test-failure", "test-error", "test-timeout", "gate-failure"];
type EvidenceFailureCategory = (typeof EVIDENCE_FAILURE_CATEGORIES)[number];
interface VerificationEvidenceFailure {
    category: EvidenceFailureCategory;
    file: string | null;
    line: number | null;
    test_id: string | null;
    suite: string | null;
    ac_id: string | null;
    message: string;
    stderr_excerpt: string | null;
}
interface VerificationEvidenceGate {
    name: VerificationGate;
    status: EvidenceGateStatus;
    detail: string;
    remediation: string | null;
    failures: VerificationEvidenceFailure[];
    skip_reason?: string;
    skip_kind?: GateSkipKind;
    could_not_prove?: true;
    confidence?: MutationConfidence;
}
interface VerificationEvidence {
    schema_version: typeof VERIFICATION_EVIDENCE_SCHEMA_VERSION;
    run_id: string;
    started_at: string;
    completed_at: string;
    overall_status: EvidenceOverallStatus;
    first_failure_gate: VerificationGate | null;
    gates: VerificationEvidenceGate[];
    unrecorded_mandatory_stages?: string[];
}

declare const FRAMEWORK_PACKAGE_MAP: Record<string, Stack>;
declare function buildDetectedStackProfile(input: {
    toolchains: ToolchainInfo[];
    packages: InstalledPackage[];
    sources: StackSourceReference[];
    detectedTraits?: string[];
    fallbackStack?: Stack | null;
    fallbackCapabilities?: string[];
}): DetectedStackProfile;
declare function getPrimaryStack(profile: Partial<Pick<ProjectProfile, 'active_capabilities' | 'routing' | 'stack_profile'>> | undefined): Stack;
declare function getLegacyCapabilities(profile: Partial<Pick<ProjectProfile, 'routing' | 'stack_profile'>> | undefined): Capability[];
declare function compareStackProfiles(previous: DetectedStackProfile | null, current: DetectedStackProfile): StackDriftReport;
declare function summarizeStack(profile: DetectedStackProfile): string;

type ContractDecisionOrigin = 'evidence-armed' | 'expert-conflict' | 'fix-proof';
interface ContractDecisionOption {
    option_key: string;
    label: string;
    one_line_preview?: string;
    trade_off?: string;
    evidence?: DecisionOptionEvidence;
}
interface PendingContractDecision {
    id: string;
    category: string;
    title: string;
    context: string;
    options: ContractDecisionOption[];
    recommendation: string | null;
    created_at: string;
    status: 'pending';
    origin?: ContractDecisionOrigin;
    change?: string;
}
interface ResolvedContractDecision extends Omit<PendingContractDecision, 'status'> {
    status: 'resolved';
    chosen: string;
    rationale: string;
    resolved_at: string;
}
interface CreateDecisionInput {
    category: string;
    title: string;
    context: string;
    options: ContractDecisionOption[];
    recommendation?: string | null;
    origin?: ContractDecisionOrigin;
    change?: string | null;
}
declare function mintDecisionId(): string;
declare function isContractDecisionId(id: string): boolean;
declare function assertContractDecisionId(id: string): void;
declare function createPendingDecision(projectRoot: string, input: CreateDecisionInput): {
    id: string;
    path: string;
};
declare function resolvePendingDecision(projectRoot: string, id: string, chosen: string, rationale?: string, options?: {
    change?: string | null;
}): {
    path: string;
    packet: ResolvedContractDecision;
};
interface ContractDecisionListEntry {
    id: string;
    category: string;
    title: string;
    status: 'pending' | 'resolved';
}
interface StoredContractDecision {
    packet: PendingContractDecision;
    status: 'pending' | 'resolved';
}
declare function readContractDecisions(projectRoot: string): StoredContractDecision[];
declare function listContractDecisions(projectRoot: string): ContractDecisionListEntry[];
declare function addWriteInOption(projectRoot: string, id: string, label: string): string;

interface AIDetectorOptions {
    provider?: InferenceProvider | null;
    timeoutMs?: number;
    minConfidence?: number;
}
declare class AIDetector {
    private readonly provider;
    private readonly timeoutMs;
    private readonly minConfidence;
    constructor(options?: AIDetectorOptions);
    detect(projectRoot: string): Promise<DetectionReport | null>;
    private completeWithTimeout;
}

interface DetectorOptions {
    aiDetector?: AIDetector | null;
}
declare class Detector {
    private readonly introspector;
    private readonly packLoader;
    private readonly aiDetector;
    private readonly inflight;
    constructor(options?: DetectorOptions);
    detect(projectRoot: string, options?: {
        persist?: boolean;
    }): Promise<DetectionReport>;
    private runDetect;
}

declare function ecosystemToLanguage(ecosystem: StackEcosystem | null | undefined): string | null;

interface BuildDetectionReportInput {
    domain: Domain | null;
    stack: Stack | null;
    capabilities?: Capability[];
    matchedPacks?: string[];
    detectedTraits?: string[];
    recommendedCapabilities?: ActiveCapability[];
    detectionPhase?: DetectionReport['detection_phase'];
    signals: DetectionSignal[];
    confidence: DetectionReport['confidence'];
    ecosystem?: StackEcosystem | null;
    confidenceScore?: number;
    source?: 'ai' | 'static';
    repository?: RepositoryContext;
}
declare function buildDetectionReport(input: BuildDetectionReportInput): DetectionReport;

interface StackDetectionPermissions {
    can_view: boolean;
    can_edit: boolean;
    can_delete: boolean;
}
interface StackDetectionResource {
    id: string;
    type: 'stack_detection';
    created_at: string;
    updated_at: string;
    created_at_human: string;
    updated_at_human: string;
    permissions: StackDetectionPermissions;
    report: DetectionReport;
}
interface ToStackDetectionResourceOptions {
    projectRoot?: string;
    permissions?: Partial<StackDetectionPermissions>;
}
declare function toStackDetectionResource(report: DetectionReport, options?: ToStackDetectionResourceOptions): StackDetectionResource;

declare function detectAnalyticsSignals(projectRoot: string): DetectionSignal[];

declare function detectFlutterSignals(projectRoot: string): DetectionSignal[];

interface LaravelDetectionResult {
    signals: DetectionSignal[];
    capabilities: Capability[];
}
declare function detectLaravelSignals(projectRoot: string): LaravelDetectionResult;

interface ReactDetectionResult {
    signals: DetectionSignal[];
    capabilities: Capability[];
}
declare function detectReactSignals(projectRoot: string): ReactDetectionResult;

declare function detectShortVideoSignals(projectRoot: string): DetectionSignal[];

interface SvelteDetectionResult {
    signals: DetectionSignal[];
    capabilities: Capability[];
}
declare function detectSvelteSignals(projectRoot: string): SvelteDetectionResult;

interface VueDetectionResult {
    signals: DetectionSignal[];
    capabilities: Capability[];
}
declare function detectVueSignals(projectRoot: string): VueDetectionResult;

interface EngineEventBase {
    at: string;
    truncated?: boolean;
}
interface SliceStartedEvent extends EngineEventBase {
    kind: 'slice-started';
    runId: string;
    sliceId: string;
    index?: number;
}
interface SliceCompletedEvent extends EngineEventBase {
    kind: 'slice-completed';
    runId: string;
    sliceId: string;
    durationMs?: number;
}
interface SliceFailedEvent extends EngineEventBase {
    kind: 'slice-failed';
    runId: string;
    sliceId: string;
    error: string;
}
interface DecisionEventOption {
    option_key: string;
    label: string;
    one_line_preview: string;
    trade_off: string;
    technical_detail?: string;
}
interface DecisionPausedEvent extends EngineEventBase {
    kind: 'decision-paused';
    decisionId: string;
    category?: string;
    prompt?: string;
    question?: string;
    options?: DecisionEventOption[];
    recommendation?: string | null;
    recommendationReason?: string;
    packetPath?: string;
    linkedSliceId?: string;
}
interface DecisionResolvedEvent extends EngineEventBase {
    kind: 'decision-resolved';
    decisionId: string;
    resolution?: string;
    chosenOptionKey?: string | null;
    resolver?: string;
    intent?: string;
}
interface DecisionPacketCorruptEvent extends EngineEventBase {
    kind: 'decision-packet-corrupt';
    decisionId: string;
    reason: string;
}
interface DecisionCapExceededEvent extends EngineEventBase {
    kind: 'decision-cap-exceeded';
    pendingCount: number;
    cap: number;
}
interface DecisionDiscardedEvent extends EngineEventBase {
    kind: 'decision-discarded';
    decisionId: string;
    reason: string;
}
interface RetrievalStartedEvent extends EngineEventBase {
    kind: 'retrieval-started';
    queryId: string;
    query?: string;
}
interface RetrievalCompletedEvent extends EngineEventBase {
    kind: 'retrieval-completed';
    queryId: string;
    resultCount?: number;
}
interface WorkflowStepStartedEvent extends EngineEventBase {
    kind: 'workflow-step-started';
    runId: string;
    stepIndex: number;
    skill: string | null;
}
interface WorkflowStepCompletedEvent extends EngineEventBase {
    kind: 'workflow-step-completed';
    runId: string;
    stepIndex: number;
    skill: string | null;
}
interface WorkflowStepFailedEvent extends EngineEventBase {
    kind: 'workflow-step-failed';
    runId: string;
    stepIndex: number;
    skill: string | null;
    error: string;
}
interface RegistryChangedEvent extends EngineEventBase {
    kind: 'registry-changed';
    registry: string;
    change: 'added' | 'removed' | 'updated';
    id?: string;
}
interface VerificationGateVerdictEntry {
    gate: string;
    status: 'pass' | 'fail' | 'inconclusive' | 'skipped';
    detail: string;
}
interface VerificationVerdictEvent extends EngineEventBase {
    kind: 'verification-verdict';
    origin: string;
    ok: boolean;
    summary: string;
    gates: VerificationGateVerdictEntry[];
    escalations: string[];
}
interface EventsCoalescedEvent extends EngineEventBase {
    kind: 'events-coalesced';
    droppedCount: number;
}
type EngineEvent = SliceStartedEvent | SliceCompletedEvent | SliceFailedEvent | DecisionPausedEvent | DecisionResolvedEvent | DecisionPacketCorruptEvent | DecisionCapExceededEvent | DecisionDiscardedEvent | RetrievalStartedEvent | RetrievalCompletedEvent | WorkflowStepStartedEvent | WorkflowStepCompletedEvent | WorkflowStepFailedEvent | RegistryChangedEvent | VerificationVerdictEvent | EventsCoalescedEvent;
type EngineEventKind = EngineEvent['kind'];
interface EngineEventFilter {
    kinds: readonly EngineEventKind[];
}
type SubscriptionState = 'active' | 'faulted' | 'cancelled';
interface Subscription {
    readonly id: string;
    readonly state: SubscriptionState;
    unsubscribe(): void;
}
type EngineEventCallback = (event: EngineEvent) => void;

interface EngineEventBusOptions {
    bufferSize?: number;
    neverDrop?: readonly EngineEventKind[];
    maxPayloadBytes?: number;
}
declare class EngineEventBus {
    private readonly subscribers;
    private readonly bufferSize;
    private readonly neverDrop;
    private readonly maxPayloadBytes;
    private drainScheduled;
    constructor(options?: EngineEventBusOptions);
    subscribe(callback: EngineEventCallback, filter?: EngineEventFilter): Subscription;
    emit(event: EngineEvent): void;
    unsubscribe(id: string): void;
    subscriberCount(): number;
    activeSubscriberCount(): number;
    private enqueue;
    private scheduleDrain;
    private drain;
    private deliver;
    private truncateIfOversized;
}

declare const PLACEHOLDER_DESIGN_TOKENS: DesignTokensDocument;

interface SchemaValidationIssue {
    path: string;
    message: string;
    expected?: string;
    actual?: string;
}
interface ValidationResult {
    valid: boolean;
    errors: SchemaValidationIssue[];
}
declare class SchemaValidator {
    private readonly ajv;
    constructor();
    validate(schemaId: string, data: unknown): ValidationResult;
    private registerSchemas;
    private formatErrors;
}

declare const DESIGN_TOKENS_PLACEHOLDER_NOTE = "PLACEHOLDER design tokens seeded by paqad-ai. Replace these values with your project's real design tokens, then delete this \"$comment\". Until then, design-system docs (tokens.md, components.md, \u2026) are intentionally not generated, because they would describe a design system that does not exist.";
declare class DesignTokensMissingError extends Error {
    readonly path: string;
    constructor(path: string);
}
declare class DesignTokensPlaceholderError extends Error {
    readonly path: string;
    constructor(path: string);
}
declare class DesignTokenService {
    private readonly validator;
    constructor(validator?: SchemaValidator);
    seed(projectRoot: string): Promise<void>;
    load(projectRoot: string): Promise<DesignTokensDocument>;
    generateDocs(projectRoot: string): Promise<DesignTokenDocArtifact[]>;
    writeDocs(projectRoot: string): Promise<string[]>;
    exportTheme(projectRoot: string, stack: Stack | null): Promise<ThemeExportArtifact[]>;
    writeThemeExports(projectRoot: string, stack: Stack | null): Promise<string[]>;
}

interface HealthCheckerOptions {
    managedSettingsPaths?: string[];
}
declare class HealthChecker {
    private readonly options;
    private readonly validator;
    constructor(options?: HealthCheckerOptions);
    run(projectRoot: string): Promise<HealthReport>;
    private readProfile;
    private detectModules;
    private checkFrameworkArtifacts;
    private isPathIgnored;
    private checkProfile;
    private checkDetectionReport;
    private checkOnboardingManifest;
    private checkStackSnapshot;
    private checkStackDrift;
    private checkDecisionWorkspace;
    private checkModuleHealthLedger;
    private checkInstructionCopies;
    private checkIndexesCurrent;
    private checkAdapterConfig;
    private checkCodexHooks;
    private checkGateFailClosed;
    private checkProviderEntryBootstrapPointer;
    private checkProviderEntryFallbackClause;
    private checkStackCommands;
    private checkTestRunnerParallel;
    private checkStructuredTestOutput;
    private checkTrackedSentinels;
    private checkStableFrameworkPaths;
    private checkClaudeInstall;
    private checkFrameworkInstall;
    private checkSchemaVersion;
    private checkBrokenScaffold;
    private checkUiDocs;
    private checkApiDocs;
    private checkIntegrationDocs;
    private checkErrorCatalog;
    private checkMcp;
    private checkSkillCache;
    private checkContextHitRate;
    private buildEfficiencySummary;
    private checkLeanRuleFootprint;
    private checkCompiledRulesCurrent;
    private checkSpecPipeline;
    private checkSpecPipelineSettings;
    private checkVisualEvidence;
    private checkExpertRoster;
    private checkClassificationOverrideRate;
    private documentationHasRun;
    private checkRag;
    private checkRagVectorPayloadConsistency;
    private checkJsonArtifact;
}
declare function deriveOverallStatus(checks: HealthCheckResult[]): HealthCheckStatus;

declare function hudSnapshotPath(projectRoot: string, sessionId: string): string;
declare function hudReceiptPath(projectRoot: string, sessionId: string): string;
declare function hudVerdictPath(projectRoot: string, sessionId: string): string;
declare const HUD_COST_CACHE_SUFFIX = ".cost-cache.json";
declare function hudCostCachePath(projectRoot: string, sessionId: string): string;
declare function writeFileAtomic(target: string, content: string): void;
declare function hudLastBlockPath(projectRoot: string, sessionId: string): string;

type GateState = 'pass' | 'fail' | 'inconclusive' | 'did-not-run' | 'not-required';

type VerdictKind = 'pass' | 'fail' | 'inconclusive';
interface RecordGap {
    code: string;
    text: string;
    detail: string | null;
}
interface VerdictParts {
    work_kind: VerdictKind;
    work_reasons: string[];
    record_gaps: RecordGap[];
}

interface RepositoryVerificationGateVerdict {
    gate: VerificationGate;
    status: EvidenceGateStatus;
    detail: string;
    remediation: string | null;
    skip_reason?: string;
    skip_kind?: GateSkipKind;
    could_not_prove?: true;
}
interface RepositoryVerificationVerdict {
    origin: string;
    ok: boolean;
    summary: string;
    receipt?: string;
    kind?: VerdictKind;
    applicable?: false;
    narrationAdvisory?: string;
    change?: string | null;
    work_kind?: VerdictKind;
    work_reasons?: string[];
    record_gaps?: RecordGap[];
    gates: RepositoryVerificationGateVerdict[];
    escalations: string[];
    evidence_path: string | null;
    reportPath?: string | null;
    started_at: string;
    completed_at: string;
}
declare function buildRepositoryVerificationVerdict(input: {
    origin: string;
    evidence: VerificationEvidence;
    escalations: string[];
    evidencePath: string | null;
    flagOnGates?: readonly VerificationGate[];
    waitingDecisions?: readonly WaitingDecision[];
}): RepositoryVerificationVerdict;
declare function formatVerdictSummary(input: {
    ok: boolean;
    gates: RepositoryVerificationGateVerdict[];
    escalations: string[];
    unrecordedMandatoryStages?: string[];
    flagOnGates?: readonly VerificationGate[];
    waitingDecisions?: readonly WaitingDecision[];
}): string;

interface HudVerdictRecord {
    schema: 'paqad.hud-verdict/1';
    session_id: string;
    change: string | null;
    word: string;
    kind: VerdictKind;
    passed: boolean;
    reasons: string[];
    work_kind?: VerdictKind;
    work_reasons?: string[];
    record_gaps?: string[];
    written_at: string;
}
interface WrittenHudReceipt {
    receiptPath: string;
    verdictPath: string;
    verdict: HudVerdictRecord;
}
declare function writeHudReceipt(projectRoot: string, hostSessionId: string | null, verdict: Pick<RepositoryVerificationVerdict, 'gates' | 'summary' | 'receipt' | 'kind' | 'applicable' | 'change'> & Partial<VerdictParts>, now?: () => Date): WrittenHudReceipt | null;

type FixProofState = 'none' | 'red' | 'red-green' | 'green-only' | 'not-reproduced' | 'held';

declare const DELIVERY_DOC_TYPE = "paqad.delivery";
interface DeliveryCommit {
    sha: string;
    subject: string;
}
type CommitDecisionAnswer = 'commit' | 'decline' | 'ignored' | 'user-requested' | null;
interface CommitDecision {
    asked: boolean;
    answer: CommitDecisionAnswer;
    recorded_at: string | null;
}
type CiState = 'pass' | 'fail' | 'pending' | 'unknown';
interface DeliveryPush {
    state: 'pushed' | 'failed';
    branch: string | null;
    sha: string | null;
    at: string;
}
type DeliveryPrState = 'open' | 'merged' | 'closed';
interface DeliveryPr {
    number: number | null;
    url: string | null;
    draft: boolean | null;
    state?: DeliveryPrState | null;
    head_sha?: string | null;
    title?: string | null;
    changed_files?: number | null;
    additions?: number | null;
    deletions?: number | null;
    first_at?: string;
    at: string;
}
interface DeliveryCiJob {
    name: string;
    status: string | null;
    conclusion: string | null;
    started_at: string | null;
    completed_at: string | null;
}
interface DeliveryCi {
    sha: string | null;
    state: CiState;
    done: number | null;
    total: number | null;
    reason: string | null;
    source: 'deliver' | 'ci-gate' | 'stop-check';
    jobs?: DeliveryCiJob[];
    at: string;
}
interface DeliveryRecord extends Partial<Omit<EnvelopeHeader, 'schema_version' | 'doc_type'>> {
    schema_version: number;
    doc_type: typeof DELIVERY_DOC_TYPE;
    commits: DeliveryCommit[];
    head_sha: string | null;
    merge_commit: string | null;
    branch?: string | null;
    base_branch?: string | null;
    captured_at?: string | null;
    commit_decision?: CommitDecision;
    last_link_attempt?: string | null;
    start_commit?: string | null;
    commit_split?: CommitSplit | null;
    push?: DeliveryPush | null;
    pr?: DeliveryPr | null;
    ci?: DeliveryCi | null;
}

interface TechDebtIndexEntry {
    id: string;
    title: string;
    kind: string;
    severity: string;
}

type HudScopeReason = 'qualified' | 'finished' | 'no-active-change' | 'closed' | 'other-branch' | 'not-feature-route' | 'no-row-this-episode';

declare const DONE_RUNGS: readonly ["done", "committed", "pr-open", "safe-to-merge", "merged"];
type HudRung = (typeof DONE_RUNGS)[number];
type LadderChecks = 'green' | 'red' | 'unknown';
type LadderCi = 'pass' | 'fail' | 'pending' | 'unknown';
interface DoneLadder {
    rung: HudRung | null;
    ci: LadderCi | null;
    ci_failed: boolean;
    uncommitted: boolean;
}

interface HudCost {
    computed_at: string;
    window: CostWindow;
    scope: CostScope;
    price_table_date: string;
    price_source: string;
    basis: string;
    label: string;
    plan_note: string;
    tokens: CostTokens;
    usd: number | null;
    unpriced_models: string[];
    by_stage: CostStageLine[];
    by_expert: CostExpertLine[];
    chief: (CostLine & {
        exact: boolean;
    }) | null;
    not_counted: string[];
    live: boolean;
}

type HudSeatState = 'seated' | 'writing' | 'done';
interface HudSeatTokens {
    input: number;
    output: number;
    cache_read: number;
    cache_write: number;
    total: number;
}
interface HudTrackRecord {
    changes: number;
    changed_spec: number;
    empty: number;
    avg_tokens: number;
}
interface HudSeat {
    role: string;
    reason: string | null;
    origin: string | null;
    state: HudSeatState;
    seated_at: string | null;
    started_at: string | null;
    done_at: string | null;
    budget_tokens: number | null;
    clamped: boolean | null;
    tokens_estimate: number | null;
    tokens: HudSeatTokens | null;
    tokens_exact: boolean;
    findings: number | null;
    late: boolean;
    track_record: HudTrackRecord | null;
}
interface HudChiefRulings {
    accepted: string[];
    declined: Array<{
        id: string;
        reason: string;
    }>;
    conflicts: Array<{
        target: string;
        recommendation: string;
        rationale: string;
    }>;
    renames: Array<{
        id: string;
        target: string;
    }>;
    settled: Array<{
        target: string;
        chosen: string;
        source: string;
    }>;
}
interface HudChief extends HudSeat {
    verdict: string | null;
}
interface HudHighTable {
    skipped: boolean;
    met_after_freeze: boolean;
    seats: HudSeat[];
    chief: HudChief | null;
    rulings: HudChiefRulings | null;
    gaps: Array<{
        area: string;
        why_it_matters: string;
        question: string | null;
    }>;
    questions: {
        asked: number;
        auto_answered: Array<{
            question: string;
            source: string;
        }>;
    } | null;
    credits: Array<{
        line: string;
        roles: string[];
    }>;
}

interface RuleStopRecord {
    rule: string;
    title: string | null;
    file: string;
    tool_use_id: string | null;
    managed: boolean;
    sole: boolean;
    at: string;
    diff: string;
    token: string;
    used: boolean;
    session: string;
}

type HudProofStepState = 'done' | 'failed' | 'not-yet';
interface HudProofStep {
    id: string;
    words: string;
    detail: string | null;
    state: HudProofStepState;
}
type HudProofGateState = GateState | 'not-judged';
interface HudProofGate {
    code: string;
    words: string;
    state: HudProofGateState;
}
interface HudStageProof {
    stage: string;
    words: string;
    state: string;
    steps: HudProofStep[];
    gates: HudProofGate[];
}

declare const HUD_SNAPSHOT_SCHEMA = "paqad.hud/3";
type HudTone = 'neutral' | 'working' | 'needs-you' | 'good' | 'warn' | 'bad';
interface HudStage {
    stage: string;
    state: string;
    mandatory: boolean;
    started_at: string | null;
    ended_at: string | null;
    duration_ms: number | null;
    duration_unreliable: boolean;
    agent: string | null;
    proof_file: string | null;
}
type HudGateVerdict = 'pass' | 'fail' | 'inconclusive' | 'not-required' | 'did-not-run' | 'pending' | 'not-judged';
interface HudGate {
    name: string;
    required: boolean;
    strength: 'deterministic' | 'llm-judged' | null;
    verdict: HudGateVerdict;
    owner?: GateOwner;
}
interface HudFlag {
    id: string;
    text: string;
}

type HudFindingsStatus = 'open' | 'clean' | 'did not run';
interface HudFindingsScan<T> {
    status: HudFindingsStatus;
    total: number | null;
    counts: Record<string, number> | null;
    blocking: boolean;
    from_cache: boolean;
    items: T[] | null;
    overflow: number;
    recorded_at: string | null;
}
interface HudFindings {
    rules: HudFindingsScan<RuleRunFinding>;
    near_copies: HudFindingsScan<DuplicationRowFinding>;
}
interface HudTimelineEntry {
    at: string;
    kind: string;
    stage: string | null;
    note: string | null;
    agent?: string | null;
    own_agent?: boolean;
    duration_ms?: number | null;
    count?: number;
    picked?: number;
    standing?: number;
    findings?: number;
    verdict?: string | null;
    title?: string | null;
    issue?: string | null;
    lane?: string | null;
    sha?: string;
    subject?: string;
    number?: number;
    requirements?: number;
    criteria?: number;
    state?: string;
}
declare const TIMELINE_ROWS = 20;
declare const TIMELINE_COMMITS = 10;
interface TimelineChange {
    title: string | null;
    issue: string | null;
    lane: string | null;
}
declare function buildTimeline(projectRoot: string, dirName: string, change?: TimelineChange | null): HudTimelineEntry[];
interface RecordEventSources {
    rulesLoaded: {
        recorded_at?: string | null;
        applicable_rules?: readonly unknown[];
    } | null;
    table: HudHighTable | null;
    decisions: readonly StoredContractDecision[];
    specJson: unknown;
    delivery: DeliveryRecord;
    ship: HudShip;
    commitTimes: ReadonlyMap<string, string>;
}
declare function buildRecordEvents(sources: RecordEventSources): HudTimelineEntry[];
interface HudShipCommit {
    sha: string;
    subject: string;
    own: boolean | null;
}
interface HudShip {
    commits: number;
    commit_list: HudShipCommit[];
    commit_decision: string | null;
    merge_commit: string | null;
    push: DeliveryPush | null;
    pr: DeliveryPr | null;
    pr_state: DeliveryPrState | null;
    pr_title: string | null;
    pr_files: number | null;
    pr_additions: number | null;
    pr_deletions: number | null;
    ci: DeliveryCi | null;
    ci_read_at: string | null;
    all_green: boolean;
    merged: boolean;
    own: CommitGroup | null;
    inherited: CommitGroup | null;
    inherited_count: number;
    files_changed: number | null;
}
interface HudWorkflow {
    name: string;
    started_at: string | null;
    tokens: number | null;
    usd: number | null;
    unpriced: string[];
}
interface HudDeliveryPlan {
    commit: boolean;
    push: boolean;
    pr: boolean;
    ci: boolean;
    merge: boolean;
    reason: string | null;
}
interface DeliveryPlanInput {
    enabled: boolean;
    commitDeclined: boolean;
    ciGate: string;
    hasCi: boolean;
}
declare function computeDeliveryPlan(input: DeliveryPlanInput): HudDeliveryPlan;
interface HudPlanProgress {
    steps: number;
    done: number;
}
interface HudSnapshot {
    schema: typeof HUD_SNAPSHOT_SCHEMA;
    session_id: string;
    generated_at: string;
    scope: {
        qualified: boolean;
        reason: HudScopeReason;
    };
    workflow: HudWorkflow | null;
    active: boolean;
    route: string | null;
    lane: string | null;
    lane_stages?: string[];
    lane_reason: string | null;
    headline: HudHeadline;
    change: {
        dir: string;
        id: string | null;
        issue: string | null;
        title: string | null;
        branch: string | null;
        status: string | null;
    } | null;
    paused: Array<{
        workflow: string;
        lane: string | null;
    }>;
    stages: HudStage[];
    timeline: HudTimelineEntry[];
    table: HudHighTable | null;
    claims: HudClaim[];
    gates: HudGate[];
    gates_expected: string[];
    flags: HudFlag[];
    rules: {
        recorded: boolean;
        applicable: number | null;
        loaded_at: string | null;
    };
    findings: HudFindings | null;
    decisions: {
        pending: Array<{
            id: string;
            category: string;
            question: string;
        }>;
        resolved: number;
    };
    questions: {
        asked: number;
        answered: number;
        auto_answered: number;
        deferred: number;
    } | null;
    last_block: RuleStopRecord | null;
    delivery_plan: HudDeliveryPlan | null;
    plan: HudPlanProgress | null;
    ship: HudShip | null;
    verdict: HudVerdictRecord | null;
    receipt: {
        path: string;
    } | null;
    evidence_expected: Array<{
        file: string;
        expectation: 'always' | 'on here' | 'if present' | 'off here';
        present: boolean;
    }>;
    isolation: {
        status: string;
        stages: number;
        tokens_not_recarried: number;
    } | null;
    cost: HudCost | null;
    tech_debt: {
        raised: TechDebtIndexEntry[];
    } | null;
    rule_overrides: Array<{
        rule: string;
        file: string;
        by: string;
        at: string;
    }> | null;
    record_gaps?: string[];
    repairs?: Array<{
        what: string;
        at: string | null;
    }>;
    rung?: HudRung;
    verdict_stale?: true;
    proof?: HudStageProof[];
}
declare const TRACK_RECORD_BUNDLES = 50;
declare function buildTrackRecords(projectRoot: string, activeDir: string, roles: readonly string[]): Map<string, HudTrackRecord>;
interface HudFixProofClaim {
    kind: 'fix-proof';
    proof: FixProofState;
    label: string;
    verdict: 'pass' | 'inconclusive';
    test_id: string | null;
}
interface HudAcceptanceClaim {
    kind: 'acceptance';
    id: string;
    label: string;
    test_id: string | null;
    verdict: 'pass' | 'missing';
}
type HudClaim = HudFixProofClaim | HudAcceptanceClaim;
declare function expectedGateCodes(lane: string | null): string[];
declare function buildShip(delivery: DeliveryRecord, filesChanged?: number | null): HudShip;
declare function workKindOf(verdict: HudVerdictRecord | null): HudVerdictRecord['kind'] | null;
declare const FAILURE_PHRASES: Readonly<Record<string, string>>;
declare function failurePhrase(code: string): string;
interface HudHeadline {
    text: string;
    tone: HudTone;
    row?: number;
    word?: string;
    rung?: HudRung;
    note?: string;
    gap?: string;
    clock_from?: string;
}
interface HudHeadlineInput {
    route: string | null;
    active: boolean;
    stages: HudStage[];
    pendingDecisions: number;
    verdict: HudVerdictRecord | null;
    flags: HudFlag[];
    paused: number;
    ladder?: DoneLadder | null;
    checks?: LadderChecks;
    decisions?: ReadonlyArray<{
        category: string;
    }>;
    table?: HudHighTable | null;
    ship?: HudShip | null;
    gates?: readonly HudGate[];
    gatesExpected?: readonly string[];
    plan?: HudPlanProgress | null;
    recordGaps?: readonly string[];
    unproven?: readonly string[];
    verdictEarlier?: boolean;
}
declare const RUNG_WORDS: Readonly<Record<HudRung, string>>;
declare function computeHudFlags(input: {
    stages: HudStage[];
    gates: HudGate[];
    rulesRecorded: boolean;
    tableSkipped: boolean;
    tableLate?: boolean;
    isolationStatus: string;
    isolatedStages: number;
    findings?: HudFindings | null;
    commitSplit?: CommitSplit | null;
}): HudFlag[];
declare function computeHudHeadline(input: HudHeadlineInput): HudHeadline;
interface BuildHudSnapshotOptions {
    now?: () => Date;
    turnRunning?: boolean;
}
declare const TURN_END_SOURCES: ReadonlySet<string>;
declare function buildHudSnapshot(projectRoot: string, sessionHint: string | null, options?: BuildHudSnapshotOptions): HudSnapshot;
declare function writeHudSnapshot(projectRoot: string, sessionHint: string | null, options?: BuildHudSnapshotOptions): {
    path: string;
    snapshot: HudSnapshot;
};
declare function writeHudSnapshotSafe(projectRoot: string, sessionHint: string | null, source: string): string | null;

interface InstallResult {
    framework_home: string;
    project_root: string;
    version: string;
}
interface BootstrapOptions {
    logger?: EngineLogger;
}
declare function bootstrapFrameworkHome(): {
    framework_home: string;
};
declare function bootstrapFramework(projectRoot: string, options?: BootstrapOptions): InstallResult;
declare function ensureFrameworkSymlink(runtimeRoot: string, frameworkHome: string, env?: NodeJS.ProcessEnv): void;
declare function isPluginRuntime(env: NodeJS.ProcessEnv): boolean;
declare function isNpmRuntime(target: string): boolean;
declare function isPluginCacheRuntime(target: string): boolean;
declare function stableRuntimeHome(env: NodeJS.ProcessEnv): string | null;
declare function ensureStablePluginRuntime(pluginRuntime: string, env: NodeJS.ProcessEnv): string;
declare function repointFrameworkLinkPluginAware(pluginRuntime: string, frameworkHome: string, env: NodeJS.ProcessEnv): void;
declare function frameworkSymlinkType(): 'junction' | undefined;
declare const __test: {
    ensureFrameworkSymlink: typeof ensureFrameworkSymlink;
    isPluginRuntime: typeof isPluginRuntime;
    repointFrameworkLinkPluginAware: typeof repointFrameworkLinkPluginAware;
    ensureStablePluginRuntime: typeof ensureStablePluginRuntime;
    stableRuntimeHome: typeof stableRuntimeHome;
    isNpmRuntime: typeof isNpmRuntime;
    isPluginCacheRuntime: typeof isPluginCacheRuntime;
};

declare const VERSION_UNKNOWN = "version unknown";
declare const MIN_CONSUMER_VERSION = "1.0.0";
interface EngineVersionReport {
    readonly engineVersion: string;
    readonly minConsumerVersion: string;
    readonly deprecatedAsOf: string | undefined;
}
declare function normalizeEngineVersion(raw: unknown): string;
declare function getEngineVersionReport(): EngineVersionReport;

type ConsumerCompatibility = 'ok' | 'engine-too-new' | 'engine-too-old' | 'engine-version-unknown';
declare function compareConsumerCompatibility(consumerVersion: string, report: EngineVersionReport): ConsumerCompatibility;

declare function readStackSnapshotSync(projectRoot: string): StackSnapshot | null;
declare class StackSnapshotCache {
    read(projectRoot: string): Promise<StackSnapshot | null>;
    write(projectRoot: string, snapshot: StackSnapshot): Promise<void>;
    hashFiles(projectRoot: string, relativePaths: string[]): Promise<Record<string, string>>;
}

interface ParsedManifestPackage {
    name: string;
    constraint?: string;
    isDev?: boolean;
}
interface ParsedManifest {
    ecosystem: StackEcosystem;
    packages: ParsedManifestPackage[];
    scripts?: Record<string, string>;
}
interface ParsedLockfilePackage {
    name: string;
    version: string;
}
interface ParsedLockfile {
    ecosystem: StackEcosystem;
    packages: ParsedLockfilePackage[];
}
interface EcosystemParser {
    ecosystem: StackEcosystem;
    packageManager: string;
    manifestFiles: string[];
    lockfileFiles: string[];
    parseManifest(content: string, filename: string): ParsedManifest;
    parseLockfile(content: string, filename: string): ParsedLockfile;
}

interface ParsedProjectResult {
    toolchain: ToolchainInfo;
    packages: InstalledPackage[];
}
declare class EcosystemParserRegistry {
    private readonly parsers;
    constructor(parsers?: EcosystemParser[]);
    register(parser: EcosystemParser): void;
    list(): EcosystemParser[];
    getKnownFiles(): string[];
    parseProject(projectRoot: string): Promise<ParsedProjectResult[]>;
}
declare function createDefaultEcosystemParserRegistry(): EcosystemParserRegistry;

declare class StackIntrospector {
    private readonly cache;
    private readonly parserRegistry;
    snapshot(projectRoot: string, options?: {
        persist?: boolean;
    }): Promise<StackSnapshot>;
}

interface LegacyMcpCleanupOptions {
    canDelete?: (path: string) => boolean;
}
interface LegacyMcpCleanupResult {
    deleted: string[];
    kept: string[];
}
declare function cleanupLegacyMcpFiles(projectRoot: string, options?: LegacyMcpCleanupOptions): LegacyMcpCleanupResult;

declare const LEGACY_MCP_OUTPUT_PATHS: Record<AdapterType, string>;
declare class McpConfigManager {
    private readonly registry;
    generate(profile: ProjectProfile): McpConfigOutput;
}

declare class DataRetrievalDecider {
    private readonly availableMcp;
    private readonly availableScripts;
    constructor(availableMcp?: string[], availableScripts?: string[]);
    decide(dataNeeded: string): DataSource;
    private findMcpProvider;
    private findScript;
}

declare const MCP_SERVERS: McpServerDefinition[];
declare function getServersForStack(stack: string, capabilities: string[]): McpServerDefinition[];
declare class McpServerRegistry {
    list(): McpServerDefinition[];
    forProfile(profile: Pick<ProjectProfile, 'routing' | 'stack_profile' | 'mcp' | 'active_capabilities'>): McpServerDefinition[];
}

type DocumentationWorkflowMode = 'foundation' | 'module-docs';
interface DocumentationWorkflowOptions {
    projectRoot: string;
    mode?: DocumentationWorkflowMode;
    request?: Pick<ClassificationResult, 'domain' | 'stack' | 'request_text'> & {
        output_path?: string;
    };
}
interface DocumentationWorkflowStep {
    id: string;
    summary: string;
    generated: string[];
    skipped: string[];
}
interface DocumentationWorkflowResult {
    generated: string[];
    skipped: string[];
    progress_path: string;
    handover_path: string;
    module_map_path: string | null;
    module_docs_pending_map_review: boolean;
    module_map_low_confidence_modules: string[];
    orphaned_module_dirs: string[];
    stack_snapshot: StackSnapshot;
    effective_routing: {
        domain: Domain;
        stack: Stack;
        capabilities: Capability[];
    };
    profile_updated: boolean;
    steps: DocumentationWorkflowStep[];
    delivery_detection?: {
        summary: string[];
        connect_nudge: string | null;
        filled: boolean;
    };
}
declare class DocumentationWorkflow {
    private readonly tracker;
    private readonly detector;
    private readonly introspector;
    run(options: DocumentationWorkflowOptions): Promise<DocumentationWorkflowResult>;
    private runModuleDocs;
    private runFoundation;
}
declare function findBracePlaceholders(content: string): string[];
declare function extractModuleNamesFromRequest(requestText: string | undefined): string[];

interface DocumentPipelineOptions extends DocumentationWorkflowOptions {
    mode?: DocumentationWorkflowMode;
    request?: Pick<ClassificationResult, 'domain' | 'stack' | 'request_text'> & {
        output_path?: string;
    };
}
type DocumentRunResult = DocumentationWorkflowResult;
declare class DocumentPipeline {
    private readonly workflow;
    run(options: DocumentPipelineOptions): Promise<DocumentRunResult>;
}

declare class DocumentProgressTracker {
    private readonly validator;
    constructor(validator?: SchemaValidator);
    load(projectRoot: string): Promise<DocProgressFile>;
    save(projectRoot: string, progress: DocProgressFile): Promise<void>;
    resetGeneratingEntries(projectRoot: string, progress: DocProgressFile): Promise<void>;
    createEntry(output_path: string, source_files: string[]): DocProgressEntry;
    private createEmpty;
}
declare function resetGeneratingEntries(progress: DocProgressFile): DocProgressEntry[];

declare function hashSourceFiles(projectRoot: string, sourceFiles: string[]): Promise<string>;

interface FileWriteResult {
    written: string[];
    skipped: string[];
}
interface WriteGeneratedFilesOptions {
    forceOverwrite?: boolean;
}
declare function writeGeneratedFiles(projectRoot: string, files: GeneratedFile[], options?: WriteGeneratedFilesOptions): FileWriteResult;
declare function planGeneratedFiles(projectRoot: string, files: GeneratedFile[]): OnboardingFileTreeEntry[];

declare function generateFeatureDevelopmentPolicy(domain: 'coding' | 'content'): GeneratedFile[];

declare function writeProjectProfile(projectRoot: string, profile: ProjectProfile): string;
declare function writeDetectionReport(projectRoot: string, report: DetectionReport): string;
declare function writeFrameworkMetadata(projectRoot: string, version: string): void;
declare function readExistingOnboardingManifest(projectRoot: string): OnboardingManifest | null;
declare function writeOnboardingManifest(projectRoot: string, manifest: OnboardingManifest): string;
declare function writeJsonPreservingTimestamp<T extends object>(path: string, value: T, timestampFields: (keyof T & string) | readonly string[]): void;
declare function writeFrameworkVersionPreservingTimestamp(path: string, version: string, now: string): void;
declare function resolveFrameworkInstallPath(): string;
declare function sanitizeStackSnapshotRepository<T extends {
    repository?: RepositoryContext;
}>(projectRoot: string, snapshot: T): T;

interface RagSelection {
    enabled: boolean;
    provider?: EmbeddingProviderName;
    model?: string;
}

interface OnboardingOptions {
    projectRoot: string;
    runtimeRoot?: string;
    adapters?: AdapterType[];
    profileOverrides?: Partial<ProjectProfile>;
    selections?: {
        providers?: AdapterType[];
        domain?: 'coding' | 'content';
        stack_profile?: ProjectProfile['stack_profile'];
        stack?: Stack;
        capabilities?: Capability[];
        rag?: RagSelection;
    };
    onPhase1Complete?: (result: OnboardingOutput) => void;
    forceOverwrite?: boolean;
    workspacePolicy?: {
        project_creation_disabled?: boolean;
    };
}
declare class OnboardingOrchestrator {
    run(options: OnboardingOptions): Promise<OnboardingOutput>;
    preview(options: OnboardingOptions): Promise<OnboardingPreviewResult>;
    private assertReadableDirectory;
    private collectGeneratedFiles;
}

interface OnboardingSelections {
    providers: AdapterType[];
    domain: Domain;
    stack_profile: DetectedStackProfile;
    stack?: Stack;
    capabilities?: string[];
}
type SnapshotContext = {
    toolchains: ToolchainInfo[];
    packages: InstalledPackage[];
    profile: DetectedStackProfile;
};
declare function resolveSelections(detection: DetectionReport, snapshotOrOverrides?: SnapshotContext | Partial<OnboardingSelections>, maybeOverrides?: Partial<OnboardingSelections>): Promise<OnboardingSelections>;
declare function getStackPromptChoices(domain: Domain): Array<{
    name: string;
    value: Stack;
}>;
declare function renderStackConfirmationSummary(detection: DetectionReport, snapshot: SnapshotContext | undefined, selections: OnboardingSelections): string;

interface ModuleFeatureEntry {
    name: string;
    slug: string;
    auto_update_feature_name: boolean;
    derivation: 'user' | 'locked_manifest' | 'codebase_native' | 'inferred' | 'llm';
    confidence: 'high' | 'medium' | 'low';
    source_paths: string[];
}
interface ModuleMapEntry {
    name: string;
    slug: string;
    auto_update_module_name: boolean;
    derivation: 'user' | 'locked_manifest' | 'codebase_native' | 'inferred' | 'llm';
    confidence: 'high' | 'medium' | 'low';
    source_paths: string[];
    evidence: {
        routes?: string[];
        tables?: string[];
        symbols?: string[];
    };
    features: ModuleFeatureEntry[];
}
interface ModuleMap {
    version: number;
    last_updated_at: string;
    domain_glossary: {
        preferred_terms: string[];
        synonyms: Record<string, string>;
        notes: string;
    };
    modules: ModuleMapEntry[];
}
declare function generateInitialRegistries(projectRoot: string): Promise<GeneratedFile[]>;
declare function discoverModules(projectRoot: string): Promise<string[]>;
declare function discoverBusinessModules(projectRoot: string, hintModuleNames?: string[]): Promise<ModuleMapEntry[]>;
declare function generateModuleMapYaml(projectRoot: string, hintModuleNames?: string[]): Promise<string>;
declare function serializeModuleMap(map: ModuleMap): string;
declare function loadModuleMap(projectRoot: string): Promise<ModuleMap | null>;
declare function writeModuleMap(projectRoot: string, yaml: string): Promise<void>;

declare function generateDocumentationScaffold(moduleNames?: string[]): Promise<GeneratedFile[]>;
declare function generateModuleScaffold(moduleName: string): Promise<GeneratedFile[]>;

type SkillAuditEventType = 'skill.load_failed' | 'skill.pack_load_failed';
interface SkillLoadFailedEvent {
    ts: string;
    type: 'skill.load_failed';
    path: string;
    validation_error_code: string;
    message: string;
    skill_id: null;
    content_hash: string;
}
interface SkillPackLoadFailedEvent {
    ts: string;
    type: 'skill.pack_load_failed';
    pack_id: string;
    pack_path: string;
    validation_error_code: string;
    issue_count: number;
    content_hash: string;
}
type SkillAuditEvent = SkillLoadFailedEvent | SkillPackLoadFailedEvent;
declare const DEFAULT_SKILL_AUDIT_BUFFER_CAPACITY = 50;
declare class SkillAuditBuffer {
    private readonly capacity;
    private readonly events;
    constructor(capacity?: number);
    get size(): number;
    add(event: SkillAuditEvent): void;
    snapshot(): SkillAuditEvent[];
    flush(projectRoot: string): void;
}
declare function getSharedSkillAuditBuffer(): SkillAuditBuffer;
declare function appendSkillAuditEvent(projectRoot: string, event: SkillAuditEvent): void;
declare function emitSkillAuditEvent(event: SkillAuditEvent, projectRoot: string | undefined, buffer?: SkillAuditBuffer): void;
declare function readSkillAuditEvents(projectRoot: string): SkillAuditEvent[];

interface StackPackLoaderOptions {
    runtimeRoot: string;
    globalPacksRoot?: string;
    projectRoot?: string;
}
declare class StackPackLoader {
    private readonly auditBuffer;
    private readonly validator;
    constructor(auditBuffer?: SkillAuditBuffer);
    load(options: StackPackLoaderOptions): PackRegistry;
    validatePack(packRoot: string, source?: PackInstallSource): LoadedStackPack;
    private resolvePacksRoot;
    private loadPacksFromRoot;
    private readPack;
}

interface PackManagerRoots {
    runtimeRoot: string;
    globalPacksRoot: string;
    projectPacksRoot: string;
    registryUrl?: string;
}
interface ListedPack {
    name: string;
    effective_source: PackInstallSource;
    available_sources: PackInstallSource[];
    override_active: boolean;
    matched_in_project: boolean;
    display_name: string;
    tier: 'framework' | 'archetype';
}
interface InstallPackOptions {
    projectRoot?: string;
    scope?: 'global' | 'project';
    roots?: Partial<PackManagerRoots>;
}
interface CreatePackOptions {
    destinationRoot?: string;
    ecosystem?: string;
    tier?: 'framework' | 'archetype';
}
declare function resolvePackManagerRoots(projectRoot?: string, overrides?: Partial<PackManagerRoots>): PackManagerRoots;
declare function listPacks(projectRoot?: string, overrides?: Partial<PackManagerRoots>): ListedPack[];
declare function installPack(source: string, options?: InstallPackOptions): Promise<LoadedStackPack>;
declare function removePack(name: string, projectRoot?: string, scope?: 'global' | 'project', overrides?: Partial<PackManagerRoots>): void;
declare function validatePackAt(path: string): LoadedStackPack;
declare function createPack(name: string, options?: CreatePackOptions): string;
declare function assertSafeCloneSource(source: string): void;

declare function loadProjectPackRegistry(projectRoot?: string): PackRegistry;
declare function getPacksForFrameworks(frameworks: string[], projectRoot?: string): LoadedStackPack[];
declare function getPackManifestMap(frameworks: string[], projectRoot?: string): Map<string, StackPackManifest>;
declare function getPackTestRunners(frameworks: string[], projectRoot?: string): StackPackTestRunner[];

interface OsvVulnerabilityRecord {
    package_name: string;
    ecosystem: string;
    version: string;
    advisory_id: string;
    summary: string;
    details: string;
}
declare function queryOsv(packages: InstalledPackage[]): Promise<OsvVulnerabilityRecord[]>;

interface EnsurePentestRunOptions {
    projectRoot: string;
    workflow: PentestWorkflowName;
    sourceReportPath?: string | null;
    targetUrl?: string | null;
    steps: Array<Pick<PentestRunStep, 'id' | 'title'>>;
}
declare class PentestProgressTracker {
    private readonly validator;
    constructor(validator?: SchemaValidator);
    ensureRun(options: EnsurePentestRunOptions): Promise<PentestRunProgress>;
    load(projectRoot: string, runId: string): Promise<PentestRunProgress | null>;
    save(projectRoot: string, progress: PentestRunProgress): Promise<void>;
    markStepRunning(progress: PentestRunProgress, stepId: string, inputHash: string): void;
    markStepCompleted(progress: PentestRunProgress, stepId: string, artifactPaths: string[], skillNames: string[]): void;
    markStepBlocked(progress: PentestRunProgress, stepId: string, error: string, artifactPaths: string[], skillNames: string[]): void;
    markStepFailed(progress: PentestRunProgress, stepId: string, error: string, artifactPaths: string[], skillNames: string[]): void;
    markRunCompleted(progress: PentestRunProgress, reportPath: string, sidecarPath: string, findingIds: string[]): void;
    shouldSkipStep(progress: PentestRunProgress, stepId: string, inputHash: string): boolean;
    private findIncompleteRun;
    private resetRunningSteps;
    private findStep;
}
declare function runArtifactsDir(projectRoot: string, runId: string): string;
declare function runLogsDir(projectRoot: string, runId: string): string;
declare function runStatusForSteps(steps: PentestRunStep[]): PentestRunStatus;

interface ProjectScriptResult {
    script: string;
    status: 'completed' | 'blocked' | 'failed';
    artifact_paths: string[];
    exit_code: number | null;
    summary: string;
}
interface ModuleDocEvidence {
    module: string;
    paths: string[];
    content: string;
}
interface TestEvidence {
    path: string;
    content: string;
}
interface SuspiciousRoute {
    path: string;
    status: number;
    kind: string;
}
declare function toLocalTimestamp(date: Date): string;
declare function slugify(value: string): string;
declare function writeJson(target: string, data: unknown): Promise<void>;
declare function readJsonIfExists<T>(target: string): Promise<T | null>;
declare function hashRelevantInputs(projectRoot: string, workflow: PentestWorkflowName, extra?: Record<string, string | string[] | null | undefined>): Promise<string>;
declare function discoverTargetUrl(projectRoot: string, stack: string, explicit?: string): Promise<string | null>;
declare function runProjectScript(projectRoot: string, scriptName: string, env: Record<string, string>, logDir: string): Promise<ProjectScriptResult>;
declare function loadModuleDocs(projectRoot: string, focusModules?: string[]): Promise<ModuleDocEvidence[]>;
declare function loadTests(projectRoot: string, focusModules?: string[]): Promise<TestEvidence[]>;
declare function parseSuspiciousRoutes(runtimeChecks: Array<{
    path: string;
    status: number;
}>): SuspiciousRoute[];
declare function summarizeCommandAvailability(scriptResults: ProjectScriptResult[]): string[];
declare function inferSourceArtifacts(baseDir: string, scriptResults: ProjectScriptResult[]): string[];
declare function skillPath(name: string): string;
declare function toolReferencePath(stack: string): string;
declare function toReportId(prefix: 'PENTEST' | 'RETEST', date: Date): string;
declare function extractRelevantTestPaths(tests: TestEvidence[], moduleName: string, keywords: string[]): string[];
declare function parseSecretMatches(content: string): string[];
declare function safeBaseName(path: string): string;

interface ClassifierInput {
    request: string;
    profile?: Pick<ProjectProfile, 'active_capabilities' | 'intelligence' | 'stack_profile' | 'routing'>;
    resolved_workflow?: {
        workflow: ClassificationWorkflow | null;
        custom_workflow_name?: string | null;
        workflow_source?: WorkflowSource;
        workflow_reason?: string | null;
        matched_rule?: string | null;
    };
}
interface RequestClassifierOptions {
    projectRoot?: string;
}
declare class RequestClassifier {
    private readonly projectRoot?;
    constructor(options?: RequestClassifierOptions);
    classify(input: ClassifierInput): Promise<ClassificationResult>;
    private resolveAnalyticsTag;
}

declare function computeClassificationConfidence(resolutionMap: ResolutionMap): number;

interface ContextBudgetEstimateInput {
    scope: ClassificationScope;
    delta_candidate: boolean;
    workflow: ClassificationWorkflow | null;
}
declare function estimateContextBudgetHint(input: ContextBudgetEstimateInput): ContextBudgetHint;

interface DeltaDetectionResult {
    delta_candidate: boolean;
    base_manifest_slug: string | null;
    prior_requirement_count: number | null;
    prior_criterion_count: number | null;
}
declare function detectDeltaCandidate(root: string, affectedModules: string[]): Promise<DeltaDetectionResult>;

interface ImpactResolutionInput {
    requestText: string;
    modulePaths: string[];
}
interface ImpactResolutionResult {
    database_impact: ClassificationResult['database_impact'];
    api_impact: ApiImpact;
    ui_impact: UiImpact;
    compliance_sensitivity: ComplianceSensitivity;
    customer_facing_impact: CustomerFacingImpact;
    reversibility: Reversibility;
    data_sensitivity: DataSensitivity;
    resolution_sources: Record<'database_impact' | 'api_impact' | 'ui_impact' | 'compliance_sensitivity' | 'customer_facing_impact' | 'reversibility' | 'data_sensitivity', ResolutionSource>;
}
declare function resolveImpacts(input: ImpactResolutionInput): ImpactResolutionResult;

declare function shouldSkipLlm(preResult: PreClassificationResult, confidence: number, requestText: string, resolutionMap: ResolutionMap): boolean;

interface ModuleResolutionResult {
    modules: AffectedModule[];
    source: string;
}
declare class ModuleResolver {
    private readonly root;
    private readonly profile?;
    constructor(root: string, profile?: Pick<ProjectProfile, "intelligence" | "stack_profile"> | undefined);
    resolve(requestText: string): Promise<ModuleResolutionResult>;
    private resolveExplicitPaths;
    private tryResolveByBasename;
    private resolveSymbols;
    private resolveRagMatches;
    private resolveHeuristicModules;
}

declare class PostClassifier {
    private readonly projectRoot?;
    constructor(projectRoot?: string | undefined);
    adjust(classification: ClassificationResult, _preResult: PreClassificationResult, resolutionMap: ResolutionMap): Promise<PostClassificationAdjustments>;
    private computeRiskFloor;
    private readDefectStats;
    private computeComplexityAdjustment;
    private writeHistory;
}

interface PreClassifierInput {
    request: string;
    profile?: Pick<ProjectProfile, 'intelligence' | 'stack_profile'>;
    resolved_workflow?: {
        workflow: ClassificationWorkflow | null;
    };
    projectRoot?: string;
}
declare class PreClassifier {
    private readonly projectRoot;
    constructor(projectRoot?: string);
    classify(input: PreClassifierInput): Promise<PreClassificationResult>;
}
declare function isQuestionRoute(requestText: string): boolean;
declare function hasCodeNegation(normalized: string): boolean;
declare function isCreateArtifactAsk(normalized: string): boolean;
declare function isAboutWorkPrompt(requestText: string): boolean;

declare const LANE_PHASES: Record<Lane, PipelinePhase[]>;
declare class PipelineRouter {
    route(classification: ClassificationResult): {
        lane: Lane | null;
        phases: PipelinePhase[];
        route_reason?: string | null;
    };
}

declare function matchRuleTriggers(root: string, modulePaths: string[]): Promise<string[]>;
declare function isAlwaysLoadRule(rule: Pick<CompiledRule, 'trigger_patterns'>): boolean;
declare function ruleTriggersMatch(rule: Pick<CompiledRule, 'trigger_patterns'>, paths: readonly string[]): boolean;
declare function matchesGlobish(value: string, pattern: string): boolean;

interface ScopeResolutionResult {
    scope: ClassificationScope;
    scope_graph_depth: number;
}
declare function resolveScope(root: string, modulePaths: string[]): Promise<ScopeResolutionResult>;
declare function toProjectRelativeModule(root: string, filePath: string): string;

declare class RuntimeSkillRegistry {
    private readonly builtIns;
    private readonly builtInNames;
    private readonly runtime;
    private readonly parser;
    constructor(builtIns: readonly LoadedSkill[]);
    register(content: string, sourceLabel?: string): LoadedSkill;
    remove(runtimeId: string): void;
    snapshot(): readonly RuntimeSkillListEntry[];
}

interface WorkflowRouteResult {
    workflow: ClassificationWorkflow | null;
    custom_workflow_name?: string | null;
    workflow_source: WorkflowSource;
    workflow_reason?: string | null;
    matched_rule?: string | null;
}
interface WorkflowRouterServiceOptions {
    projectRoot?: string;
    runtimeRoot?: string;
    runtimeRegistry?: RuntimeSkillRegistry;
}
declare class WorkflowRouterService {
    private readonly projectRoot;
    private readonly runtimeRoot;
    private readonly runtimeRegistry?;
    private readonly parser;
    constructor(options?: WorkflowRouterServiceOptions);
    resolve(requestText: string, profile?: Pick<ProjectProfile, 'active_capabilities' | 'stack_profile' | 'routing'> | null): Promise<WorkflowRouteResult>;
    private loadRoutingSkills;
    private projectSkillArtifacts;
}

declare const TIER_TOKEN_LIMITS: Record<SkillModelTier, number>;
interface TruncationResult {
    output: string;
    truncated: boolean;
    original_token_estimate: number;
    final_token_estimate: number;
}
declare class StreamTruncator {
    private readonly projectRoot;
    constructor(projectRoot: string);
    truncate(output: string, tier: SkillModelTier, maxOutputTokensOverride?: number): TruncationResult;
    logTruncation(skillName: string, result: TruncationResult): Promise<void>;
    estimateTokens(text: string): number;
    private truncateAtSentenceBoundary;
}

declare const ARTIFACT_TYPES: readonly ["rules", "skills", "agents", "hooks", "templates", "patterns", "anti-patterns", "checklists", "mcp-configs"];
type ArtifactType = (typeof ARTIFACT_TYPES)[number];
type CollisionBehavior = 'most-specific-wins' | 'additive-merge';
declare const COLLISION_MAP: Record<ArtifactType, CollisionBehavior>;
declare const ARTIFACT_OUTPUT_KEYS: {
    readonly rules: "rules";
    readonly skills: "skills";
    readonly agents: "agents";
    readonly hooks: "hooks";
    readonly templates: "templates";
    readonly patterns: "patterns";
    readonly 'anti-patterns': "antiPatterns";
    readonly checklists: "checklists";
    readonly 'mcp-configs': "mcpConfigs";
};

declare function resolveCapabilityDirectories(runtimeRoot: string, stack: string, capabilities: string[], artifactType: ArtifactType): string[];

interface DeduplicatorArtifact {
    path: string;
    content?: string;
    type: string;
}
declare class ContextDeduplicator {
    private readonly contentHashMap;
    deduplicate(projectRoot: string, artifacts: DeduplicatorArtifact[]): Promise<{
        artifacts: DeduplicatorArtifact[];
        references: Map<string, string>;
        stats: DeduplicationStats;
    }>;
    reset(): void;
    private readContent;
    private computeHash;
    private persistStats;
}

interface InheritanceDirectory {
    path: string;
    level: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    source: string;
}
declare function getInheritanceDirectories(runtimeRoot: string, routing: RoutingConfig, artifactType: ArtifactType): InheritanceDirectory[];

interface ResolverOptions {
    runtimeRoot: string;
}
declare class Resolver {
    readonly runtimeRoot: string;
    constructor(options: ResolverOptions);
    resolve(routing: RoutingConfig, deduplicator?: ContextDeduplicator): Promise<ResolvedArtifacts>;
    resolveArtifactType(routing: RoutingConfig, artifactType: ArtifactType): Promise<ResolvedArtifact$1[]>;
}

declare function appendRagAudit(projectRoot: string, level: 'INFO' | 'WARN', event: string, fields?: Record<string, unknown>): void;

interface RagBenchmarkSnapshot {
    hit_at_5: number;
    task_success_rate: number;
    correction_turns: number;
    prompt_tokens_sent: number;
    task_count: number;
    reranking?: {
        enabled: boolean;
        backend: string;
        candidate_pool_size: number;
        packed_size: number;
        latency_ms: number;
    };
    action_quality?: {
        workflow_correctness_pct: number;
        evidence_grounding_pct: number;
        noisy_suggestion_rate: number;
    };
}
interface RagBenchmarkMetricResult {
    passed: boolean;
    delta_pct: number;
    threshold_pct: number;
    summary: string;
    baseline_zero?: boolean;
}
interface RagPromptTokenGateResult extends RagBenchmarkMetricResult {
    override_passed: boolean;
    success_delta_pct: number;
}
interface RagBenchmarkEvaluation {
    passed: boolean;
    baseline: RagBenchmarkSnapshot;
    candidate: RagBenchmarkSnapshot;
    gates: BenchmarkGateConfig;
    metrics: {
        hit_at_5: RagBenchmarkMetricResult;
        task_success_rate: RagBenchmarkMetricResult;
        correction_turns: RagBenchmarkMetricResult;
        prompt_tokens_sent: RagPromptTokenGateResult;
    };
}
interface ConfigurationComparisonResult {
    mode: ComparisonMode;
    evaluation: RagBenchmarkEvaluation;
}
declare function compareConfigurations(baseline: RagBenchmarkSnapshot, candidate: RagBenchmarkSnapshot, mode: ComparisonMode, gates?: BenchmarkGateConfig): ConfigurationComparisonResult;
declare function evaluateBenchmarkGates(baseline: RagBenchmarkSnapshot, candidate: RagBenchmarkSnapshot, gates?: BenchmarkGateConfig): RagBenchmarkEvaluation;

interface RagIgnoreConfig {
    version: 1;
    exclude: string[];
    include: string[];
    additional_extensions: string[];
    additional_basename_includes: string[];
    additional_named_file_exclusions: string[];
    use_project_ignore_files: boolean;
    use_global_gitignore: boolean;
}
interface FilterDiagnostics {
    extensionAllowlist: string[];
    namedBasenameIncludes: string[];
    directoryExclusionSet: string[];
    hardNamedFileExclusionSet: string[];
}
interface FileProbeResult {
    path: string;
    excluded: boolean;
    layer?: 1 | 2 | 3 | 4;
    rule?: string;
}
interface FilterStats {
    total_discovered: number;
    excluded_layer1: number;
    excluded_layer2: number;
    excluded_layer3: number;
    excluded_layer4: number;
    passed: number;
}
interface RagFileFilterOptions {
    projectRoot: string;
    packs: LoadedStackPack[];
    intelligence?: Partial<IntelligenceConfig>;
}
declare class RagFileFilter {
    private readonly options;
    private readonly ragConfig;
    private readonly extensionAllowlist;
    private readonly namedBasenameIncludes;
    private readonly directoryExclusionSet;
    private readonly hardNamedFileExclusionSet;
    private readonly adapterFileExclusionSet;
    private readonly diagnosticsSnapshot;
    private _layer3RulesCache;
    constructor(options: RagFileFilterOptions);
    discoverFiles(onProgress?: (update: ProviderProgressUpdate) => void): Promise<string[]>;
    filterDiagnostics(): FilterDiagnostics;
    probeFile(absolutePath: string): Promise<FileProbeResult>;
    private getLayer3Rules;
    previewIndex(): Promise<string[]>;
    private evaluateFile;
    private evaluateLayer3;
    private evaluateLayer4;
    private unreadable;
}

declare function localModelsRoot(): string;
declare function localModelDir(model: string): string;
declare class LocalEmbeddingProvider implements EmbeddingProvider {
    private readonly onProgress?;
    readonly name: "local";
    readonly model: string;
    private extractorPromise?;
    constructor(intelligence: IntelligenceConfig, onProgress?: ((update: ProviderProgressUpdate) => void) | undefined);
    validate(): Promise<void>;
    embed(input: string | string[]): Promise<number[][]>;
    private getExtractor;
    private loadExtractor;
}
declare class OpenAiEmbeddingProvider implements EmbeddingProvider {
    private readonly projectRoot;
    private readonly onProgress?;
    readonly name: "openai";
    readonly model: string;
    private clientPromise?;
    constructor(projectRoot: string, intelligence: IntelligenceConfig, onProgress?: ((update: ProviderProgressUpdate) => void) | undefined);
    validate(): Promise<void>;
    embed(input: string | string[]): Promise<number[][]>;
    private getClient;
    private createClient;
}
declare function createEmbeddingProvider(projectRoot: string, intelligence: IntelligenceConfig, onProgress?: (update: ProviderProgressUpdate) => void): Promise<EmbeddingProvider>;

declare function readProjectSecrets(projectRoot: string): Record<string, string>;
declare function getProjectSecret(projectRoot: string, key: string): string | undefined;
declare function writeProjectSecret(projectRoot: string, key: string, value: string): string;
declare function removeProjectSecrets(projectRoot: string): void;
declare function getSecretPermissionWarning(projectRoot: string): string | null;
declare function redactSecrets(input: string, projectRoot: string): string;

declare const DEFAULT_CRS_BACKLOG_CAP = 1000;
type CrsBacklogPersist = (collectionId: CrsCollectionId, chunks: CrsChunkInput[]) => Promise<void>;
declare class CrsBacklogQueue {
    private readonly cap;
    private readonly entries;
    constructor(cap?: number);
    get size(): number;
    enqueue(chunks: CrsChunkInput[], collectionId: CrsCollectionId): void;
    drain(persist: CrsBacklogPersist): Promise<void>;
}

declare class RagService {
    private readonly projectRoot;
    private readonly providerFactory;
    private readonly crsBacklog;
    private readonly vectorIndex;
    private readonly visionVectorIndex;
    private readonly chunker;
    private readonly indexManager;
    private readonly patternVectors;
    private readonly resumeValidator;
    private resumeValidationPromise?;
    constructor(projectRoot: string, providerFactory?: ProviderFactory, crsBacklog?: CrsBacklogQueue);
    getStatus(): Promise<RagStatus>;
    configureAndBuild(partial: Partial<BuildIndexOptions['intelligence']>, onProgress?: BuildIndexOptions['onProgress']): Promise<RagStatus>;
    buildIndexOnly(partial: Partial<BuildIndexOptions['intelligence']>, onProgress?: BuildIndexOptions['onProgress']): Promise<RagStatus>;
    private buildIndexCore;
    rebuild(options?: BuildIndexOptions): Promise<void>;
    private writePartialIndex;
    clear(): Promise<void>;
    refreshContext(): Promise<ChunkIndexSyncResult>;
    retrieve(syncResult: ChunkIndexSyncResult, input: {
        taskDescription?: string;
        keywords: string[];
        targetFilePath?: string;
        symbolReferences?: string[];
    }, topN?: number): Promise<RagRetrievalResult>;
    private retrieveWithSyncPolicy;
    retrieveForEval(input: {
        taskDescription?: string;
        keywords: string[];
        targetFilePath?: string;
        symbolReferences?: string[];
    }, topN?: number): Promise<RagRetrievalResult>;
    private scoreCandidates;
    probe(input: {
        taskDescription?: string;
        keywords: string[];
        targetFilePath?: string;
        symbolReferences?: string[];
    }, topN?: number): Promise<RagScoredCandidate[]>;
    ingestExtractedText(input: VisionIngestInput): Promise<VisionIngestResult>;
    resolveApiKeyName(provider: 'openai'): 'OPENAI_API_KEY';
    storeApiKey(provider: 'openai', value: string): string;
    hasApiKey(provider: 'openai'): boolean;
    private refuseRemovedProvider;
    localModelPath(): string;
    localModelCached(model?: string): boolean;
    writeChunks(chunks: CrsChunkInput[], collectionId: CrsCollectionId): Promise<CrsIndexedSessionEvent>;
    retrieveCrs(query: string, collectionId: CrsCollectionId, topK: number, confidenceThreshold?: number): Promise<CrsRetrievalResult[]>;
    reindex(provider: EmbeddingProviderName, model: string, collectionId: CrsCollectionId, onProgress?: ReindexProgressHandler): Promise<void>;
    private persistCrsChunks;
    private embedCrsChunks;
    private embedCrsForReindex;
    private sweepExpiredCrsReverts;
    private applyReranking;
    private syncVectorIndex;
    private splitTextIntoChunks;
    private throwIfAborted;
    private buildEmbedContextualizer;
    private embedChunks;
    private discoverSourceFiles;
    private validateResumeState;
}
declare function lexicalDocumentText(item: {
    id: string;
    content: string;
    source_file?: string;
    ast_node_path?: string;
    exported_symbols?: string[];
}): string;

declare class CorruptVectorIndexError extends Error {
    readonly kind: 'index' | 'meta';
    readonly filePath: string;
    readonly cause?: unknown | undefined;
    constructor(kind: 'index' | 'meta', filePath: string, cause?: unknown | undefined);
}
declare class FileVectorIndex<T extends StoredVectorItem = StoredVectorItem> {
    private readonly indexPath;
    private readonly metaPath;
    constructor(indexPath?: string, metaPath?: string);
    load(projectRoot: string): Promise<VectorIndexPayload<T> | null>;
    loadMeta(projectRoot: string): Promise<RagIndexMeta | null>;
    save(projectRoot: string, payload: VectorIndexPayload<T>, meta: RagIndexMeta): Promise<void>;
    clear(projectRoot: string): Promise<void>;
    query(projectRoot: string, vector: number[], topN: number): Promise<VectorQueryResult<T>[]>;
    status(projectRoot: string): Promise<{
        present: boolean;
        sizeBytes: number;
        meta: RagIndexMeta | null;
        corrupt: boolean;
        reason?: string;
    }>;
    replaceAll(projectRoot: string, items: T[], metaInput: Omit<RagIndexMeta, 'version' | 'chunk_count' | 'built_at' | 'embedding_dimensions' | 'branch' | 'base_branch' | 'base_commit' | 'head_commit'>, baseBranch?: string): Promise<RagIndexMeta>;
    static create(projectRoot: string, collectionId: CrsCollectionId): Promise<void>;
    static destroy(projectRoot: string, collectionId: CrsCollectionId, options?: {
        sourceSessionId?: string;
    }): Promise<number>;
    private resolve;
    private resolveExistingIndexPath;
    private resolveLegacyIndexPath;
}

type EphemeralCollectionId = string & {
    readonly __brand: 'EphemeralCollectionId';
};
declare function toEphemeralCollectionId(sessionId: string): EphemeralCollectionId;
type AttachmentRecordStatus = 'indexed' | 'stale' | 'in-progress';
interface AttachmentRecord {
    sessionId: string;
    collectionId: EphemeralCollectionId;
    filePaths: string[];
    status: AttachmentRecordStatus;
}
interface AttachmentIndexingResult {
    collectionId: EphemeralCollectionId;
    chunkCount: number;
    durationMs: number;
}
interface AttachmentIndexingDegradedSignal {
    kind: 'attachment_indexing_degraded';
    sessionId: string;
    reason: string;
    retriesExhausted: boolean;
}
type AttachmentIndexingOutcome = AttachmentIndexingResult | AttachmentIndexingDegradedSignal;
declare function isAttachmentIndexingDegraded(outcome: AttachmentIndexingOutcome): outcome is AttachmentIndexingDegradedSignal;
interface AttachmentOrphanPurgeRecord {
    collectionId: EphemeralCollectionId;
    purgedAt: string;
}

declare class AttachmentPathError extends Error {
    readonly sessionId: string;
    constructor(sessionId: string, message: string);
}
declare function attachmentCollectionsRoot(projectRoot: string): string;
declare function resolveCollectionDir(projectRoot: string, sessionId: string): string;
declare function collectionVectorPaths(projectRoot: string, sessionId: string): {
    indexPath: string;
    metaPath: string;
};
declare function registerCollection(projectRoot: string, sessionId: string, collectionId: EphemeralCollectionId, filePaths?: string[], status?: AttachmentRecord['status']): Promise<void>;
declare function deregisterCollection(projectRoot: string, sessionId: string): Promise<void>;
declare function listCollections(projectRoot: string): Promise<{
    sessionId: string;
    collectionId: EphemeralCollectionId;
}[]>;
declare function getCollectionId(projectRoot: string, sessionId: string): Promise<EphemeralCollectionId | null>;

type AttachmentEventKind = 'attachment.indexed' | 'attachment.index_failed' | 'attachment.format_rejected';
type AttachmentCollectionScope = 'project' | 'session';
interface AttachmentEvent {
    kind: AttachmentEventKind;
    file_name: string;
    at: string;
    collection_scope?: AttachmentCollectionScope;
    session_id?: string;
    chunk_count?: number;
    provider?: string;
    reason?: string;
}
type AttachmentEventInput = Omit<AttachmentEvent, 'at'> & {
    at?: string;
};
type AttachmentEventSink = (event: AttachmentEvent) => void;
declare function appendAttachmentEvent(projectRoot: string, event: AttachmentEventInput): AttachmentEvent;
declare function readAttachmentEvents(projectRoot: string): AttachmentEvent[];

declare const PDF_PAGE_CAP = 2000;
declare const ZIP_DECOMPRESSED_LIMIT_BYTES: number;
type AttachmentRejectionOutcome = 'index_failed' | 'format_rejected';
type AttachmentRejectionReason = 'parse-error' | 'encrypted-pdf' | 'mime-unrecognised' | 'page-cap' | 'zip-bomb' | 'unsupported-format' | 'empty-file';
type AttachmentContentKind = 'text' | 'pdf';
interface ParsedAttachment {
    ok: true;
    content: string;
    detectedKind: AttachmentContentKind;
    pageCount?: number;
}
interface AttachmentRejection {
    ok: false;
    outcome: AttachmentRejectionOutcome;
    reason: AttachmentRejectionReason;
    message: string;
}
type ParseAttachmentResult = ParsedAttachment | AttachmentRejection;
interface PdfExtraction {
    text: string;
    pageCount: number;
    encrypted?: boolean;
}
type PdfTextExtractor = (bytes: Buffer) => Promise<PdfExtraction>;
interface ArchiveInspection {
    decompressedBytes: number;
}
type ArchiveInspector = (bytes: Buffer) => Promise<ArchiveInspection>;
interface ParseAttachmentOptions {
    pdfExtractor?: PdfTextExtractor;
    archiveInspector?: ArchiveInspector;
    bytes?: Buffer;
    pageCap?: number;
    zipDecompressedLimitBytes?: number;
}
declare function parseAttachment(filePath: string, options?: ParseAttachmentOptions): Promise<ParseAttachmentResult>;

type ProgressFn = (update: ProviderProgressUpdate) => void;
declare class SessionAttachmentIndexer {
    private readonly providerFactory;
    private readonly retryDelaysMs;
    private readonly chunker;
    private readonly running;
    constructor(providerFactory?: ProviderFactory, retryDelaysMs?: readonly number[]);
    index(projectRoot: string, sessionId: string, filePaths: string[], intelligence: IntelligenceConfig, onProgress?: ProgressFn, signal?: AbortSignal): Promise<AttachmentIndexingOutcome>;
    cancel(projectRoot: string, sessionId: string): Promise<void>;
    private chunkFiles;
    private embedWithRetry;
    private embedBatchWithRetry;
    private purgeCollection;
    private throwIfAborted;
    private sleep;
}
type AttachmentSessionKind = 'project' | 'ephemeral';
declare const ATTACHMENT_RETRY_BUDGET_MS = 30000;
interface AttachmentStoredChunk extends StoredVectorChunk {
    file_content_hash: string;
}
interface IndexAttachmentParams {
    filePath: string;
    sessionId: string;
    sessionKind: AttachmentSessionKind;
    intelligence: IntelligenceConfig;
    onProgress?: (update: ProviderProgressUpdate) => void;
    onEvent?: AttachmentEventSink;
    signal?: AbortSignal;
    parse?: ParseAttachmentOptions;
    providerFactory?: ProviderFactory;
    retryBudgetMs?: number;
    retryDelayMs?: number;
}
interface IndexAttachmentResult {
    ok: true;
    chunkCount: number;
    provider: string;
    collectionScope: AttachmentCollectionScope;
    deduped: boolean;
}
interface IndexAttachmentFailure {
    ok: false;
    outcome: 'index_failed' | 'format_rejected';
    reason: string;
}
type IndexAttachmentOutcome = IndexAttachmentResult | IndexAttachmentFailure;
declare function isIndexAttachmentFailure(outcome: IndexAttachmentOutcome): outcome is IndexAttachmentFailure;
declare function indexAttachment(projectRoot: string, params: IndexAttachmentParams): Promise<IndexAttachmentOutcome>;
declare function clearEphemeralCollection(projectRoot: string, sessionId: string): Promise<void>;

declare function runOrphanSweep(projectRoot: string, liveSessionIds: string[]): Promise<AttachmentOrphanPurgeRecord[]>;

declare function retrieveFromAttachments(projectRoot: string, sessionId: string, query: string, topN?: number, providerFactory?: ProviderFactory): Promise<RagRetrievalResult>;

declare function escapeCollectionId(id: CrsCollectionId): string;
declare function crsCollectionDir(projectRoot: string, collectionId: CrsCollectionId): string;
declare function crsCollectionPaths(collectionId: CrsCollectionId): {
    indexPath: string;
    metaPath: string;
};
declare function crsCollectionLayout(projectRoot: string, collectionId: CrsCollectionId): {
    escaped: string;
    crsRootAbs: string;
    relDir: string;
    absDir: string;
    indexPath: string;
    metaPath: string;
};

declare class RunnerScriptGenerator {
    private readonly engine;
    generate(profile: ProjectProfile): Promise<GeneratedFile[]>;
    write(projectRoot: string, profile: ProjectProfile): Promise<string[]>;
}

declare class ConditionalSectionProcessor {
    process(body: string, frameworks: string[]): string;
}

interface ParsedSkillDocument {
    frontmatter: SkillDefinition;
    body: string;
    line_count: number;
}
declare class SkillFrontmatterParser {
    parse(content: string): ParsedSkillDocument;
}
declare function toLoadedSkill(file: string, parsed: ParsedSkillDocument, frameworks?: string[]): LoadedSkill;

interface GeneratedSkillIndexEntry {
    name: string;
    description: string;
    triggers: SkillDefinition['triggers'];
    request_routing?: SkillDefinition['request_routing'];
    model_tier: SkillDefinition['model_tier'];
    resolved_model: string;
    output_format: SkillDefinition['output_format'];
    cacheable: boolean;
    on_complete?: SkillDefinition['on_complete'];
    file: string;
}
declare function buildSkillIndex(profile: Pick<ProjectProfile, 'model_routing'>, files: string[], relativeTo?: string): Promise<GeneratedSkillIndexEntry[]>;
declare function generateSkillIndex(profile: Pick<ProjectProfile, 'model_routing'>, skillRoots: string[], relativeTo?: string): Promise<GeneratedSkillIndexEntry[]>;
declare function writeSkillIndexFromArtifacts(projectRoot: string, profile: Pick<ProjectProfile, 'model_routing'>, artifacts: ResolvedArtifact$1[]): Promise<string>;
declare function writeSkillIndex(projectRoot: string, index: GeneratedSkillIndexEntry[]): Promise<string>;

declare class SkillLoader {
    private readonly auditBuffer;
    private readonly parser;
    constructor(auditBuffer?: SkillAuditBuffer);
    load(artifacts: ResolvedArtifact$1[], projectRoot?: string): Promise<LoadedSkill[]>;
}

declare function selectModelForTier(profile: Pick<ProjectProfile, 'model_routing'>, tier: SkillModelTier): string;

declare class SkillTriggerEvaluator {
    shouldLoad(skill: Pick<LoadedSkill, 'triggers'>, classification: ClassificationResult): boolean;
}

declare function buildAgentConfigContext(input: {
    adapter: AdapterType;
    frameworkPath: string;
    rulesPath: string;
}): Record<string, unknown>;

declare function buildApiDocContext(moduleName: string): {
    moduleName: string;
};

declare function buildDesignSystemContext(projectName: string): {
    projectName: string;
};

declare function buildErrorCatalogContext(moduleName: string): {
    moduleName: string;
};

declare function buildIntegrationDocContext(moduleName: string): {
    moduleName: string;
};

declare function buildModuleScaffoldContext(moduleName: string): {
    moduleName: string;
    title: string;
};

declare function buildRegistryContext(name: string): {
    name: string;
};

declare function buildRunnerScriptContext(input: {
    projectName: string;
    commands: {
        test: string;
        lint: string;
        format: string;
    };
    stack?: string;
    routing?: {
        stack?: string;
    };
}): {
    routing: {
        stack: string;
    };
    projectName: string;
    commands: {
        test: string;
        lint: string;
        format: string;
    };
    stack?: string;
};

interface TemplateDescriptor {
    name: string;
    path: string;
    relativePath: string;
}
declare class TemplateRegistry {
    private readonly templatesRoot;
    constructor(templatesRoot: string);
    discover(): Promise<TemplateDescriptor[]>;
}

interface MutableParsedResult {
    summary: StructuredTestResult['summary'];
    failures: StructuredTestIssue[];
    warnings: StructuredTestWarning[];
    errors: StructuredTestIssue[];
}
interface ParseTestOutputOptions {
    runner: StackPackTestRunner;
    cwd?: string;
    stdout?: string | Buffer;
    stderr?: string | Buffer;
    baseline_result?: StructuredTestResult;
    include_full_issues_with_baseline?: boolean;
}
declare function parseTestOutput(options: ParseTestOutputOptions): Promise<StructuredTestResult>;
declare function parseSingleSource(rawSource: string, runner: StackPackTestRunner, parseWarnings: string[]): {
    result: MutableParsedResult;
    strategy: TestParseStrategy;
};
declare function collectRawSources(options: ParseTestOutputOptions): Promise<string[]>;
declare function parseStructuredByFormat(rawOutput: string, runner: StackPackTestRunner, parseWarnings?: string[]): MutableParsedResult;
declare function parseJestJson(rawOutput: string, runnerId: string): MutableParsedResult;
declare function parsePytestJson(rawOutput: string, runnerId: string): MutableParsedResult;
declare function parseRspecJson(rawOutput: string, runnerId: string): MutableParsedResult;
declare function parseGoJson(rawOutput: string, runnerId: string, parseWarnings?: string[]): MutableParsedResult;
declare function parseTap(rawOutput: string, runnerId: string): MutableParsedResult;
declare function parseJunitXml(rawOutput: string, runnerId: string): MutableParsedResult;
declare function parsePlainTextFallback(rawOutput: string, runnerId: string): MutableParsedResult;
declare function mergeParsedResults(results: MutableParsedResult[], runnerId: string): MutableParsedResult;
declare function finalizeParsedResult(result: MutableParsedResult, parseMetadata: StructuredTestParseMetadata): StructuredTestResult;
declare function createEmptyParsedResult(runnerId: string): MutableParsedResult;
declare function summarizeTestDelta(baseline: StructuredTestResult, current: MutableParsedResult): StructuredTestParseMetadata['delta_summary'];
declare function projectDeltaIssues(baseline: StructuredTestResult, current: MutableParsedResult): MutableParsedResult;
declare function createIssue(input: {
    testId: string;
    suite: string | null;
    message: string;
    stackTrace: string | null;
    filePath: string | null;
    lineNumber: number | null;
    category: TestIssueCategory;
    durationMs: number | null;
}): StructuredTestIssue;
declare function classifyIssue(message: string, fallback: TestIssueCategory): TestIssueCategory;
declare function normalizeRawOutput(rawOutput: string): string;
declare function extractSummaryCount(lines: string[], label: string): number;
declare function extractDurationMs(lines: string[]): number | null;
declare function isRunnerEnvelope(line: string): boolean;
declare function parseXmlAttributes(xmlFragment: string): Record<string, string>;
declare function extractTag(xmlFragment: string, tagName: string): {
    message: string | null;
    content: string;
} | null;
declare function decodeXmlEntities(value: string): string;
declare function toUtf8String(value: string | Buffer | undefined): string;
declare function toMilliseconds(value: unknown): number | null;
declare function toInteger(value: unknown): number | null;
declare function toIsoTimestamp(epochMs: number | undefined): string;
declare function normalizeTimestamp(value: string | undefined): string;
declare function dedupeWarnings(warnings: StructuredTestWarning[]): StructuredTestWarning[];
declare function dedupeStrings(values: string[]): string[];
declare function formatErrorMessage(error: unknown): string;
declare function selectDominantStrategy(current: TestParseStrategy, next: TestParseStrategy): TestParseStrategy;
declare const __testOutputInternals: {
    selectDominantStrategy: typeof selectDominantStrategy;
    parseSingleSource: typeof parseSingleSource;
    collectRawSources: typeof collectRawSources;
    parseStructuredByFormat: typeof parseStructuredByFormat;
    parseJestJson: typeof parseJestJson;
    parsePytestJson: typeof parsePytestJson;
    parseRspecJson: typeof parseRspecJson;
    parseGoJson: typeof parseGoJson;
    parseTap: typeof parseTap;
    parseJunitXml: typeof parseJunitXml;
    parsePlainTextFallback: typeof parsePlainTextFallback;
    mergeParsedResults: typeof mergeParsedResults;
    finalizeParsedResult: typeof finalizeParsedResult;
    createEmptyParsedResult: typeof createEmptyParsedResult;
    summarizeTestDelta: typeof summarizeTestDelta;
    projectDeltaIssues: typeof projectDeltaIssues;
    createIssue: typeof createIssue;
    classifyIssue: typeof classifyIssue;
    normalizeRawOutput: typeof normalizeRawOutput;
    extractSummaryCount: typeof extractSummaryCount;
    extractDurationMs: typeof extractDurationMs;
    isRunnerEnvelope: typeof isRunnerEnvelope;
    parseXmlAttributes: typeof parseXmlAttributes;
    extractTag: typeof extractTag;
    decodeXmlEntities: typeof decodeXmlEntities;
    toUtf8String: typeof toUtf8String;
    toMilliseconds: typeof toMilliseconds;
    toInteger: typeof toInteger;
    toIsoTimestamp: typeof toIsoTimestamp;
    normalizeTimestamp: typeof normalizeTimestamp;
    dedupeWarnings: typeof dedupeWarnings;
    dedupeStrings: typeof dedupeStrings;
    formatErrorMessage: typeof formatErrorMessage;
};

declare function buildCompactArtifact(input: BuildCompactArtifactInput): CompactArtifactResult;
declare function evaluateEscalation(input: EvaluateEscalationInput): EscalationDecision;
declare function buildReasoningInputPayload(compact: CompactArtifactResult, escalation: EscalationDecision): ReasoningInputPayload;
declare function applyDisclosurePolicy(input: DisclosurePolicyInput): DisclosurePolicyResult;
declare function evaluateRetrievalGate(input: RetrievalGateInput): RetrievalGateResult;
declare function runRoutingDecision(input: RoutingInput): RoutingResult;
declare function buildControlLayerAudit(disclosure: DisclosureAuditRecord, retrieval: RetrievalAuditRecord, routing: RoutingAuditRecord): ControlLayerAuditRecord;
declare function createTestDelta(baseline: TestIssueSnapshot[], current: TestIssueSnapshot[], options?: {
    treat_missing_as_passing?: boolean;
}): {
    delta: TestDelta;
    metadata: TokenEfficiencyMetadata;
};
declare function createVerificationDelta(baseline: VerificationGateSnapshot[], current: VerificationGateSnapshot[]): {
    delta: VerificationDelta;
    metadata: TokenEfficiencyMetadata;
};
declare function createDriftDelta(baseline: DriftFileSnapshot[], current: DriftFileSnapshot[]): {
    delta: DriftDelta;
    metadata: TokenEfficiencyMetadata;
};
declare function buildTestDeltaReasoningPayload(baseline: TestIssueSnapshot[], current: TestIssueSnapshot[], options?: {
    treat_missing_as_passing?: boolean;
}, escalationInput?: Omit<EvaluateEscalationInput, 'compact'>): DeltaReasoningPayload<TestDelta>;
declare function buildVerificationDeltaReasoningPayload(baseline: VerificationGateSnapshot[], current: VerificationGateSnapshot[], escalationInput?: Omit<EvaluateEscalationInput, 'compact'>): DeltaReasoningPayload<VerificationDelta>;
declare function buildDriftDeltaReasoningPayload(baseline: DriftFileSnapshot[], current: DriftFileSnapshot[], escalationInput?: Omit<EvaluateEscalationInput, 'compact'>): DeltaReasoningPayload<DriftDelta>;
declare function resolveEscalationReason(input: EvaluateEscalationInput, confidenceThreshold: number): EscalationReason | null;
declare function extractRawSlice(compact: CompactArtifactResult, maxChars: number, hint: string): string | null;
declare function summarizeByClass(artifactClass: BuildCompactArtifactInput['artifact_class'], raw: string, maxExcerpts: number): {
    summary: CompactArtifactSummary;
    excerpts: string[];
    confidence: number;
};
declare function summarizeTestOutput(raw: string, maxExcerpts: number): {
    summary: CompactArtifactSummary;
    excerpts: string[];
    confidence: number;
};
declare function summarizeCoverageOutput(raw: string, maxExcerpts: number): {
    summary: CompactArtifactSummary;
    excerpts: string[];
    confidence: number;
};
declare function summarizeJsonReport(raw: string, maxExcerpts: number): {
    summary: CompactArtifactSummary;
    excerpts: string[];
    confidence: number;
};
declare function summarizeXmlReport(raw: string, maxExcerpts: number): {
    summary: CompactArtifactSummary;
    excerpts: string[];
    confidence: number;
};
declare function summarizeLogOutput(raw: string, maxExcerpts: number): {
    summary: CompactArtifactSummary;
    excerpts: string[];
    confidence: number;
};
declare function summarizeGrepResults(raw: string, maxExcerpts: number): {
    summary: CompactArtifactSummary;
    excerpts: string[];
    confidence: number;
};
declare function summarizeRouteDump(raw: string, maxExcerpts: number): {
    summary: CompactArtifactSummary;
    excerpts: string[];
    confidence: number;
};
declare function summarizeInventoryScan(raw: string, maxExcerpts: number): {
    summary: CompactArtifactSummary;
    excerpts: string[];
    confidence: number;
};
declare function degradedSummary(artifactClass: BuildCompactArtifactInput['artifact_class'], raw: string, maxExcerpts: number, confidence: number): {
    summary: CompactArtifactSummary;
    excerpts: string[];
    confidence: number;
};
declare function minimizeCompactRepresentation(summaryResult: {
    summary: CompactArtifactSummary;
    excerpts: string[];
    confidence: number;
}, artifactClass: BuildCompactArtifactInput['artifact_class'], originalSize: number, maxExcerpts: number): {
    summary: CompactArtifactSummary;
    excerpts: string[];
    confidence: number;
};
declare function measureCompactRepresentation(summary: CompactArtifactSummary, excerpts: string[], confidence: number): number;
declare function createDeltaMetadata(fullState: unknown, delta: unknown): TokenEfficiencyMetadata;
declare function buildDeltaReasoningPayload<TDelta extends object>(delta: TDelta, deltaMetadata: TokenEfficiencyMetadata, escalationInput: Omit<EvaluateEscalationInput, 'compact'>): DeltaReasoningPayload<TDelta>;
declare function resolveDisclosureLevel(input: DisclosurePolicyInput): DisclosureLevel;
declare function buildDisclosurePayload(level: DisclosureLevel, compact: CompactArtifactResult, escalation?: EscalationDecision): string;
declare function resolveRetrievalPath(taskComplexity: RetrievalGateInput['task_complexity'], ambiguityDetected: boolean, chunkCount: number, threshold: number, conflictingEvidence: boolean): {
    path: RetrievalPath;
    rag_skipped: boolean;
    escalation_signal: RetrievalEscalationSignal | null;
};
declare function resolveRoutingMechanism(taskType: string, metadata?: Record<string, unknown>): {
    mechanism: RoutingMechanism;
    resolved: boolean;
    resolved_task_type: string | null;
};
declare function calculateReductionRatio(originalSize: number, compactSize: number): number;
declare function extractFileLikeSegments(lines: string[]): string[];
declare function findPathSegmentsInRun(run: string): string[];
declare function flattenJson(value: unknown, prefix?: string): string[];
declare function normalizedIssueMessage(item: TestIssueSnapshot): string;
declare function tokenizeLines(raw: string): string[];
declare function normalizeLineEndings(raw: string): string;
declare function collapseWhitespace(input: string): string;
declare function sortUnique(values: string[]): string[];
declare const __tokenEfficiencyInternals: {
    summarizeByClass: typeof summarizeByClass;
    summarizeTestOutput: typeof summarizeTestOutput;
    summarizeCoverageOutput: typeof summarizeCoverageOutput;
    summarizeJsonReport: typeof summarizeJsonReport;
    summarizeXmlReport: typeof summarizeXmlReport;
    summarizeLogOutput: typeof summarizeLogOutput;
    summarizeGrepResults: typeof summarizeGrepResults;
    summarizeRouteDump: typeof summarizeRouteDump;
    summarizeInventoryScan: typeof summarizeInventoryScan;
    degradedSummary: typeof degradedSummary;
    minimizeCompactRepresentation: typeof minimizeCompactRepresentation;
    measureCompactRepresentation: typeof measureCompactRepresentation;
    resolveEscalationReason: typeof resolveEscalationReason;
    extractRawSlice: typeof extractRawSlice;
    createDeltaMetadata: typeof createDeltaMetadata;
    buildDeltaReasoningPayload: typeof buildDeltaReasoningPayload;
    resolveDisclosureLevel: typeof resolveDisclosureLevel;
    buildDisclosurePayload: typeof buildDisclosurePayload;
    resolveRetrievalPath: typeof resolveRetrievalPath;
    resolveRoutingMechanism: typeof resolveRoutingMechanism;
    extractFileLikeSegments: typeof extractFileLikeSegments;
    flattenJson: typeof flattenJson;
    normalizedIssueMessage: typeof normalizedIssueMessage;
    tokenizeLines: typeof tokenizeLines;
    normalizeLineEndings: typeof normalizeLineEndings;
    collapseWhitespace: typeof collapseWhitespace;
    sortUnique: typeof sortUnique;
    calculateReductionRatio: typeof calculateReductionRatio;
};

declare function appendAuditLog(projectRoot: string, previous: string | null, updated: string): void;
declare function appendAuditLogFailure(projectRoot: string, previous: string | null, target: string, error: string): void;

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
    skipped: UpdateDiff[];
    deprecated: string[];
    new_mcp_servers: string[];
    new_scripts: string[];
    config_keys_pruned: string[];
}
interface FrameworkUpdaterOptions {
    generateCandidates?: (projectRoot: string) => Promise<UpdateCandidate[]>;
}
declare class FrameworkUpdater {
    private readonly options;
    constructor(options?: FrameworkUpdaterOptions);
    run(projectRoot: string): Promise<UpdateReport>;
    private getCandidates;
}

declare function toVerificationSnapshots(results: GateResult[]): VerificationGateSnapshot[];
declare function buildVerificationGateDeltaPayload(baselineResults: GateResult[], currentResults: GateResult[], escalationInput?: Omit<EvaluateEscalationInput, 'compact'>): DeltaReasoningPayload<VerificationDelta>;
declare function buildDocumentationDriftDeltaPayload(baseline: DriftFileSnapshot[], current: DriftFileSnapshot[], escalationInput?: Omit<EvaluateEscalationInput, 'compact'>): DeltaReasoningPayload<DriftDelta>;

declare const VERIFICATION_EVIDENCE_RELATIVE_PATH = ".paqad/session/verification-evidence.json";
declare const VERIFICATION_EVIDENCE_STDERR_BUDGET_BYTES = 2048;
interface BuildVerificationEvidenceInput {
    results: GateResult[];
    context: Pick<VerificationContext, 'structured_test_results' | 'mutation_result'>;
    run_id: string;
    started_at: string;
    completed_at: string;
}
declare function buildVerificationEvidence(input: BuildVerificationEvidenceInput): VerificationEvidence;
interface WriteVerificationEvidenceOptions {
    project_root: string;
}
declare function writeVerificationEvidence(evidence: VerificationEvidence, options: WriteVerificationEvidenceOptions): Promise<string>;

interface Gate {
    readonly gate: VerificationGate;
    check(context: VerificationContext): Promise<GateResult>;
}

declare const DEFAULT_GATE_CODES: readonly VerificationGate[];
declare class VerificationGateRunner {
    private readonly gates;
    constructor(gates?: Gate[]);
    run(context: VerificationContext): Promise<GateResult[]>;
    runWithDelta(context: VerificationContext, baselineResults: GateResult[], escalationInput?: Omit<EvaluateEscalationInput, 'compact'>): Promise<{
        results: GateResult[];
        delta_payload: DeltaReasoningPayload<VerificationDelta>;
    }>;
}

type MutationMode = 'off' | 'warn' | 'strict';

interface MutationCommandResult {
    exitCode: number;
    stdout: string;
    stderr: string;
}
interface MutationRunnerDeps {
    detectTool?: (descriptor: MutationToolDescriptor, projectRoot: string) => Promise<boolean>;
    execute?: (command: string, options: {
        cwd: string;
    }) => Promise<MutationCommandResult>;
    parse?: (descriptor: MutationToolDescriptor, projectRoot: string, run: MutationCommandResult) => Promise<RawMutant[] | null>;
    isTreeClean?: (projectRoot: string) => Promise<boolean>;
}
interface RunMutationGateOptions {
    projectRoot: string;
    changedFiles: string[];
    lane: Lane;
    stackProfile: DetectedStackProfile | null;
    testsGreen: boolean;
    deps?: MutationRunnerDeps;
}

type MutationProfileFacts = Pick<ProjectProfile, 'commands' | 'stack_profile'>;
interface BackstopMutationDeps {
    resolveMode?: (projectRoot: string) => MutationMode;
    readProfile?: (projectRoot: string) => MutationProfileFacts | null;
    detectStackProfile?: (projectRoot: string) => Promise<DetectedStackProfile | null>;
    runTestCommand?: (command: string, projectRoot: string) => Promise<{
        exitCode: number;
    }>;
    runMutation?: (options: RunMutationGateOptions) => Promise<MutationResult>;
    snapshotTree?: (projectRoot: string) => Promise<string>;
    runner?: MutationRunnerDeps;
}

interface BuildRepositoryVerificationContextOptions {
    projectRoot: string;
    origin: Extract<VerificationOrigin, 'hook-completion' | 'git-backstop' | 'ci-backstop'>;
    mutationDeps?: BackstopMutationDeps;
}
interface RepositoryVerificationContextResult {
    context: VerificationContext;
    escalations: string[];
}
declare function buildRepositoryVerificationContext(options: BuildRepositoryVerificationContextOptions): Promise<RepositoryVerificationContextResult>;

declare const TRACEABILITY_MAP_SCHEMA_VERSION: "1.0.0";
type PromiseSource = 'acceptance-criterion' | 'obligation';
interface ForwardLink {
    promise_id: string;
    source: PromiseSource;
    description: string;
    delivering_code: string[];
    proving_checks: string[];
    proven: boolean;
}
type CodeRole = 'delivers-promise' | 'shared-groundwork' | 'orphan';
interface BackwardLink {
    file: string;
    promise_ids: string[];
    used_by_promise: boolean;
    reached_from: string[];
    role: CodeRole;
}
type TraceabilityFindingCode = 'TR-UNTESTED-PROMISE' | 'TR-CODE-ORPHAN';
interface TraceabilityFinding {
    code: TraceabilityFindingCode;
    promise_id: string | null;
    paths: string[];
    detail: string;
}
interface TraceabilityCounts {
    promises: number;
    untested_promises: number;
    delivers_promise: number;
    shared_groundwork: number;
    orphan_code: number;
}
interface TraceabilityMap {
    schema_version: typeof TRACEABILITY_MAP_SCHEMA_VERSION;
    generated_at: string;
    lane: Lane;
    mode: 'full' | 'light';
    anchors_known: boolean;
    blocked_reason: string | null;
    forward: ForwardLink[];
    backward: BackwardLink[];
    findings: TraceabilityFinding[];
    counts: TraceabilityCounts;
    scope?: 'change';
    change?: string;
}

interface JudgmentSignal {
    passed: boolean;
    inconclusive: boolean;
    detail: string;
}
type AcTestMappingOutcome = 'pass' | 'fail' | 'not-required' | 'did-not-run';
interface AcTestMappingSignal extends JudgmentSignal {
    outcome: AcTestMappingOutcome;
}
interface AcTestMappingInput {
    specFrozen: boolean;
    map: TraceabilityMap | null;
    visual?: readonly string[];
    manual?: readonly string[];
    buildError?: string | null;
}
declare function computeAcTestMapping(input: AcTestMappingInput): AcTestMappingSignal;
declare function computeImplementationReview(pendingDecisions: DecisionPacket[], lastSourceEditAt?: string | null): {
    passed: boolean;
    findings: ImplementationReviewFinding[];
    waiting: WaitingDecision[];
};
declare function computeSpecReview(input: {
    specReview: SpecReviewReport | null;
    hasFrozenSpec: boolean;
    codeChanged: boolean;
}): JudgmentSignal;

declare function collectScopeDriftPaths(changedFiles: string[], specBoundary: string[]): string[];

declare function backstopGates(): Gate[];
interface RunRepositoryVerificationOptions extends BuildRepositoryVerificationContextOptions {
    eventBus?: EngineEventBus;
    prebuiltContext?: {
        context: VerificationContext;
        escalations: string[];
    };
    hostSessionId?: string | null;
    transcriptText?: string | null;
    now?: () => string;
}
declare function runRepositoryVerification(options: RunRepositoryVerificationOptions): Promise<RepositoryVerificationVerdict>;

declare const AC_ID_PATTERN: RegExp;
declare function extractAcIdFromIssue(issue: StructuredTestIssue): string | null;
declare function collectObservedAcIds(structuredResults: StructuredTestResult[]): string[];
declare class AcTestMappingGate implements Gate {
    readonly gate: "ac-test-mapping";
    check(context: Parameters<Gate['check']>[0]): Promise<GateResult>;
}

declare class ArchitectureComplianceGate implements Gate {
    readonly gate: "architecture-compliance";
    check(context: Parameters<Gate['check']>[0]): Promise<GateResult>;
}

declare class BehavioralCorrectnessGate implements Gate {
    readonly gate: "behavioral-correctness";
    check(context: Parameters<Gate['check']>[0]): Promise<GateResult>;
}

declare class ChangeCompletenessGate implements Gate {
    readonly gate: "change-completeness";
    check(context: Parameters<Gate['check']>[0]): Promise<GateResult>;
}

declare class CodeTestsLintGate implements Gate {
    readonly gate: "code-tests-lint";
    check(context: Parameters<Gate['check']>[0]): Promise<GateResult>;
}

declare class DatabaseQualityGate implements Gate {
    readonly gate: "database-quality";
    check(context: Parameters<Gate['check']>[0]): Promise<GateResult>;
}

declare class DocumentationFreshnessGate implements Gate {
    readonly gate: "documentation-freshness";
    check(context: Parameters<Gate['check']>[0]): Promise<GateResult>;
}

declare const SURFACE_DOC_PATH = "docs/extension-surface.md";
declare class ExtensionSurfaceGate implements Gate {
    readonly gate: "extension-surface";
    check(context: Parameters<Gate['check']>[0]): Promise<GateResult>;
}

declare class ImplementationReviewGate implements Gate {
    readonly gate: "implementation-review";
    check(context: Parameters<Gate['check']>[0]): Promise<GateResult>;
}

declare class InstructionsDocsStructureGate implements Gate {
    readonly gate: "instructions-docs-structure";
    check(context: Parameters<Gate['check']>[0]): Promise<GateResult>;
}

declare class ModuleDocsStructureGate implements Gate {
    readonly gate: "module-docs-structure";
    check(context: Parameters<Gate['check']>[0]): Promise<GateResult>;
}

declare class RequirementCompletenessGate implements Gate {
    readonly gate: "requirement-completeness";
    check(context: Parameters<Gate['check']>[0]): Promise<GateResult>;
}

declare class SiteMapFreshnessGate implements Gate {
    readonly gate: "site-map-freshness";
    check(context: Parameters<Gate['check']>[0]): Promise<GateResult>;
}

declare class SpecReviewGate implements Gate {
    readonly gate: "spec-review";
    check(context: Parameters<Gate['check']>[0]): Promise<GateResult>;
}

declare class StoryQualityGate implements Gate {
    readonly gate: "story-quality";
    check(context: Parameters<Gate['check']>[0]): Promise<GateResult>;
}

interface MarkdownValidationResult {
    valid: boolean;
    errors: string[];
}

declare function validateApiDoc(markdown: string): MarkdownValidationResult;

declare function validateErrorCatalogMarkdown(markdown: string): MarkdownValidationResult;

declare function validateSpecDocument(markdown: string): {
    valid: boolean;
    errors: string[];
};

declare function validateUserFlow(markdown: string): MarkdownValidationResult;

interface Pattern {
    id: string;
    created_at: string;
    source_project: string;
    stack_filter: {
        domain: string;
        frameworks: string[];
        traits: string[];
    };
    category: string;
    problem: string;
    solution: string;
    files_involved: string[];
    verification: {
        tests_passed: boolean;
        build_passed: boolean;
    };
    tags: string[];
}
interface PatternIndexEntry {
    id: string;
    category: string;
    stack_filter: Pattern['stack_filter'];
    tags: string[];
    created_at: string;
    problem_preview: string;
}
interface PatternIndex {
    version: 1;
    entries: PatternIndexEntry[];
}
interface PatternFilter {
    domain?: string;
    frameworks?: string[];
    keywords?: string[];
    category?: string;
}
interface PatternMatch {
    pattern: Pattern;
    score: number;
    is_stale: boolean;
}

declare class PatternStore {
    get indexPath(): string;
    get entriesDir(): string;
    save(pattern: Pattern): Promise<void>;
    load(id: string): Promise<Pattern | null>;
    loadIndex(): Promise<PatternIndex>;
    updateIndex(pattern: Pattern): Promise<void>;
    delete(id: string): Promise<void>;
    list(filter?: PatternFilter): Promise<Pattern[]>;
}

type PatternSemanticScorer = (pattern: Pattern, keywords: string[]) => Promise<number> | number;
declare class PatternSuggester {
    private readonly store;
    private readonly relevanceThreshold;
    private readonly semanticScorer?;
    constructor(store: PatternStore, relevanceThreshold?: number, semanticScorer?: PatternSemanticScorer | undefined);
    suggest(keywords: string[], domain: string, frameworks: string[], limit?: number): Promise<PatternMatch[]>;
    private score;
    private isStale;
}

interface StoredPatternVector extends StoredVectorItem {
    fingerprint: string;
    category: string;
    tags: string[];
    problem_preview: string;
}
declare function getGlobalPatternVectorPaths(provider?: string, model?: string): {
    index: string;
    meta: string;
};
declare class PatternVectorService {
    private readonly store;
    private readonly providerFactory;
    constructor(store?: PatternStore, providerFactory?: ProviderFactory);
    private getIndex;
    getStatus(projectRoot: string): Promise<{
        present: boolean;
        valid: boolean;
        chunk_count: number;
        reason?: string;
    }>;
    rebuild(projectRoot: string, onProgress?: (message: string) => void): Promise<void>;
    refresh(projectRoot: string, onProgress?: (message: string) => void): Promise<void>;
    createSemanticScorer(projectRoot: string, onProgress?: (message: string) => void): Promise<PatternSemanticScorer | undefined>;
    createSuggester(projectRoot: string, relevanceThreshold?: number): Promise<PatternSuggester>;
    private embedPatterns;
}
declare function suggestPatternsForProject(projectRoot: string, keywords: string[], domain: string, frameworks: string[], limit?: number): Promise<PatternMatch[]>;

interface RecordPatternInput {
    classification: {
        workflow?: string;
        description?: string;
        category?: string;
    };
    projectDirName: string;
    domain: string;
    frameworks: string[];
    traits: string[];
    filesInvolved: string[];
    problem: string;
    solution: string;
    tags?: string[];
    verification: {
        tests_passed: boolean;
        build_passed: boolean;
    };
}
declare class PatternRecorder {
    private readonly store;
    constructor(store: PatternStore);
    record(input: RecordPatternInput): Promise<Pattern>;
}

declare class PatternCli {
    private readonly store;
    constructor(store: PatternStore);
    list(filter?: PatternFilter): Promise<void>;
    prune(olderThanDays?: number): Promise<void>;
    exportPatterns(outputPath: string, format: 'json' | 'markdown'): Promise<void>;
}

declare const ANSWER_GROUNDING_STATES: readonly ["observed", "inferred", "missing-evidence"];
type AnswerGroundingState = (typeof ANSWER_GROUNDING_STATES)[number];
declare const ANSWER_MODES: readonly ["quick", "explain", "trace"];
type AnswerMode = (typeof ANSWER_MODES)[number];
declare const CITATION_SOURCE_CLASSES: readonly ["canonical-doc", "generated-instruction", "framework-state", "manifest", "workflow", "code"];
type CitationSourceClass = (typeof CITATION_SOURCE_CLASSES)[number];
interface Citation {
    path: string;
    source_class: CitationSourceClass;
    excerpt?: string;
}
interface FreshnessMetadata {
    stale_sources: string[];
    drift_detected: boolean;
    generated_at?: string;
    note?: string;
}
interface Contradiction {
    source_a: string;
    source_b: string;
    description: string;
}
interface KnowledgeAnswer {
    answer: string;
    grounding_state: AnswerGroundingState;
    citations: Citation[];
    freshness: FreshnessMetadata | null;
    contradictions: Contradiction[];
    next_actions: string[];
    mode: AnswerMode;
    confidence_basis: string;
}
interface AnswerQuery {
    question: string;
    mode: AnswerMode;
    project_root: string;
    mcp_first?: boolean;
}

interface EvidenceFile {
    path: string;
    source_class: CitationSourceClass;
    excerpt: string;
    score: number;
}
declare function extractKeywords(question: string): string[];
declare function scoreFile(filePath: string, excerpt: string, keywords: string[]): number;
declare class EvidenceRetriever {
    retrieve(query: AnswerQuery): Promise<EvidenceFile[]>;
    private retrieveSemanticEvidence;
    private retrieveLexicalEvidence;
}

declare class FreshnessChecker {
    check(projectRoot: string, evidencePaths: string[]): Promise<FreshnessMetadata>;
}

declare class ContradictionDetector {
    detect(files: EvidenceFile[]): Contradiction[];
}

declare class ProjectKnowledgeAnswerer {
    private readonly retriever;
    private readonly freshnessChecker;
    private readonly contradictionDetector;
    constructor(retriever?: EvidenceRetriever, freshnessChecker?: FreshnessChecker, contradictionDetector?: ContradictionDetector);
    answer(query: AnswerQuery): Promise<KnowledgeAnswer>;
}

interface ContractBoundary {
    file: string;
    symbol: string;
    importers: string[];
}
declare function detectContractBoundaries(root: string, touchedFiles: string[]): Promise<ContractBoundary[]>;
declare function injectContractBoundaryCriteria(manifest: PlanningManifest, boundaries: ContractBoundary[]): PlanningManifest;

declare function appendPlanningAudit(projectRoot: string, level: 'INFO' | 'WARN', event: string, fields?: Record<string, unknown>): void;

declare const DECISION_AUDIT_EVENTS: readonly ["decision-pending-written", "decision-resolved-by-human", "decision-resolved-by-rule", "decision-resolved-by-memoization", "decision-resolved-by-rag-confident", "decision-reused", "decision-expired", "decision-superseded", "decision-delegated", "undeclared-decision-flagged", "decision-discarded"];
type DecisionAuditEventType = (typeof DECISION_AUDIT_EVENTS)[number];
interface DecisionAuditEvent {
    event: DecisionAuditEventType;
    decision_id: string;
    fingerprint: string;
    task_session_id: string;
    provider: string;
    timestamp: string;
    category?: DecisionCategory;
    responded_by?: string;
    chosen_option_key?: string | null;
    intent?: DecisionIntent;
}
declare function appendDecisionAuditEvent(projectRoot: string, event: DecisionAuditEvent): string;
declare function ensureDecisionAuditLog(projectRoot: string): string;
declare function readDecisionAuditEvents(projectRoot: string): DecisionAuditEvent[];

interface DecisionCopyIssue {
    field: string;
    message: string;
}
declare function lintDecisionCopy(packet: DecisionPacket): DecisionCopyIssue[];

declare const DECISION_PAUSE_EVENT_TYPES: readonly ["decision-paused", "decision-resolved", "decision-packet-corrupt", "decision-cap-exceeded", "decision-discarded"];
type DecisionPauseEventType = (typeof DECISION_PAUSE_EVENT_TYPES)[number];
type DecisionPauseEvent = Extract<EngineEvent, {
    kind: DecisionPauseEventType;
}>;
type DecisionEventSink = (event: DecisionPauseEvent) => void;
declare function decisionPausedEvent(packet: DecisionPacket, packetPath: string): DecisionPausedEvent;
declare function decisionResolvedEvent(packet: DecisionPacket, resolver: string): DecisionResolvedEvent;
declare function decisionPacketCorruptEvent(decisionId: string, reason: string): DecisionPacketCorruptEvent;
declare function decisionCapExceededEvent(pendingCount: number, cap: number): DecisionCapExceededEvent;
declare function decisionDiscardedEvent(decisionId: string, reason: string): DecisionDiscardedEvent;

interface DetectedDecisionFork {
    category: DecisionCategory;
    confidence: number;
    signal: string;
    matched_text: string;
}
declare function detectDecisionForks(request: string): DetectedDecisionFork[];

interface EvidenceInput {
    projectRoot: string;
    file: string;
    category: DecisionCategory;
    similarity?: number;
}
declare function assembleDecisionEvidence(input: EvidenceInput): DecisionOptionEvidence;
declare function countFileReferences(projectRoot: string, file: string): number;
declare function defaultSimilarityFor(category: DecisionCategory, fileExists: boolean, callers: number): number;

interface RepoStateSignatureInput {
    active_capabilities?: ActiveCapability[];
    stack?: string | null;
    packs?: string[];
}
interface DecisionFingerprintInput {
    category: DecisionCategory;
    question: string;
    option_keys: string[];
    repo_state: RepoStateSignatureInput;
}
declare function computeDecisionFingerprint(input: DecisionFingerprintInput): string;
declare function normalizeDecisionQuestion(value: string): string;
declare function buildRepoStateSignature(input: RepoStateSignatureInput): string;
declare function scoreDecisionOptionOverlap(left: string[], right: string[]): number;

interface BuildDecisionPacketInput {
    projectRoot: string;
    requestedBy: string;
    taskSessionId: string;
    decisionId: string;
    category: DecisionCategory;
    detectorConfidence: number;
    context: SliceContext;
    manifest: PlanningManifest;
}
declare function buildDecisionPacket(input: BuildDecisionPacketInput): DecisionPacket;
declare function computePacketConfidence(options: DecisionOption[], recommendation: string | null, detectorConfidence: number): number;
declare function decisionQuestionForCategory(category: DecisionCategory): string;
declare function decisionOptionsForCategory(projectRoot: string, category: DecisionCategory, targetFile: string): {
    options: DecisionOption[];
};
declare function selectViableDecisionOptions(projectRoot: string, options: DecisionOption[]): DecisionOption[];

type DecisionResolutionSource = 'rule' | 'design-system' | 'profile' | 'rag-confident' | 'ask';
interface DecisionResolutionResult {
    source: DecisionResolutionSource;
    option_key?: string;
    reason?: string;
}
declare function resolveDecisionPacket(projectRoot: string, packet: DecisionPacket): Promise<DecisionResolutionResult>;
declare function askThresholdForProject(projectRoot: string): number;

interface DecisionIndexEntry {
    decision_id: string;
    fingerprint: string;
    category: string;
    chosen_option_key: string | null;
    responded_at: string;
    status: DecisionStatus;
    option_keys: string[];
}
interface DecisionIndexFile {
    fingerprints: Record<string, string>;
    decisions: Record<string, DecisionIndexEntry>;
}
interface ResolveDecisionInput {
    decisionId: string;
    humanResponse: DecisionHumanResponse;
    respondedByProvider?: string;
}
interface ResolveExistingDecisionInput {
    packet: DecisionPacket;
    humanResponse: DecisionHumanResponse;
    event: DecisionAuditEventType;
    respondedByProvider?: string;
}
interface ReadPendingResult {
    packet: DecisionPacket | null;
    error?: string;
}
interface DeferUndeclaredDecisionInput {
    packet: DecisionPacket;
    provider?: string;
}
interface DiscardDecisionInput {
    decisionId: string;
    reason: string;
}
declare const MAX_PENDING_DECISIONS = 20;
declare class DecisionCapExceededError extends Error {
    readonly pendingCount: number;
    readonly cap: number;
    constructor(pendingCount: number, cap: number);
}
interface DecisionStoreOptions {
    onEvent?: DecisionEventSink;
}
declare class DecisionStore {
    private readonly projectRoot;
    private readonly onEvent?;
    constructor(projectRoot: string, options?: DecisionStoreOptions);
    initialize(): void;
    nextDecisionId(): string;
    writePending(packet: DecisionPacket): string;
    private enrichWithPrecedents;
    private enforcePendingCap;
    private maxPendingDecisions;
    discard(input: DiscardDecisionInput): DecisionPacket;
    private emit;
    private relativePendingPath;
    resolve(input: ResolveDecisionInput): string;
    resolveExisting(input: ResolveExistingDecisionInput): string;
    deferUndeclaredDecision(input: DeferUndeclaredDecisionInput): string;
    findReusableDecision(packet: Pick<DecisionPacket, 'fingerprint' | 'category' | 'options'>): string | null;
    private recordReuseToLedger;
    readPending(decisionId: string): DecisionPacket | null;
    readPendingResult(decisionId: string): ReadPendingResult;
    readResolved(decisionId: string): DecisionPacket | null;
    deletePending(decisionId: string): void;
    listPendingDecisionIds(): string[];
    findPendingDecisionForTask(taskSessionId: string): string | null;
    expireResolvedDecision(decisionId: string): string;
    hasInvalidation(packet: DecisionPacket): boolean;
    private readPacket;
    private readReusableDecision;
    private assertWritablePacket;
    private appendAudit;
    private readIndex;
    private writeIndex;
    private indexPath;
    private packetPath;
    private listDirectoryIds;
    private writeResolvedPacket;
    private supersedeConflictingDecision;
}

declare function predictTokenCeiling(root: string, options: {
    lane: PlanningLane;
    complexity: ManifestComplexity;
    scope?: string;
}): Promise<number>;
declare function appendCostEntry(root: string, entry: PlanningCostEntry): Promise<void>;
declare function readCostLog(root: string): Promise<PlanningCostLog>;

declare function buildCoverageOverlay(root: string, modules: string[]): Promise<CoverageOverlayEntry[]>;
declare function markCriteriaFromOverlay(criteria: VerificationCriterion[], overlay: CoverageOverlayEntry[]): VerificationCriterion[];

declare function queryMatchingDefectPatterns(options: {
    stack: string;
    affectedModules: string[];
}): Promise<DefectPatternEntry[]>;
declare function injectDefectAdvisoryCriteria(manifest: PlanningManifest, patterns: DefectPatternEntry[]): PlanningManifest;

declare function mergeDeltaManifest(base: PlanningManifest, delta: PlanningManifest): PlanningManifest;
declare function computeDelta(base: PlanningManifest, updated: PlanningManifest): ManifestDelta;

declare function resolveDocTargets(root: string, executionSlices: ExecutionSlice[], apiImpact?: string | null, uiImpact?: string | null): Promise<DocTarget[]>;

interface FullSuiteRunResult {
    total_tests: number;
    passing: number;
    failing: number;
    failing_tests: string[];
    duration_ms: number;
}
type FullSuiteRunner = () => Promise<FullSuiteRunResult>;
declare function verifyFullSuite(runFullSuite: FullSuiteRunner, baselineFailingTests?: string[]): Promise<SliceFullSuiteCheck>;

declare function assembleIntelligence(root: string, classification: ManifestClassification): Promise<IntelligenceContext>;

declare function loadManifest(root: string, slug: string): Promise<PlanningManifest>;
declare function saveManifest(root: string, manifest: PlanningManifest): Promise<string>;
declare function manifestExists(root: string, slug: string): Promise<boolean>;
declare function listManifestSlugs(root: string): Promise<string[]>;
declare function computeManifestHash(manifest: PlanningManifest): string;

interface ValidationIssue {
    code: string;
    message: string;
    path?: string;
}
interface ManifestValidationError extends ValidationIssue {
    severity: 'error';
}
interface ValidationReport {
    valid: boolean;
    errors: ManifestValidationError[];
    warnings: ValidationIssue[];
}

declare function deriveHealthTier(metrics: ModuleHealthMetrics): HealthTier;
declare function readModuleHealth(root: string, moduleName: string): Promise<ModuleHealthProfile | null>;
declare function writeModuleHealth(root: string, moduleName: string, metrics: ModuleHealthMetrics): Promise<ModuleHealthProfile>;
declare function writeModuleHealthProfile(root: string, profile: ModuleHealthProfile): Promise<ModuleHealthProfile>;
declare function readAllModuleHealth(root: string): Promise<ModuleHealthProfile[]>;
declare function initializeModuleHealth(root: string, moduleName: string): Promise<ModuleHealthProfile>;
declare function moduleHealthPath(root: string, moduleName: string): string;

interface ModuleHealthEvidence {
    schema_version: 1;
    event_id: string;
    source: 'provider-hook' | 'workflow-phase' | 'verification-gate' | 'preflight' | 'session-artifact';
    provider?: string;
    session_id?: string;
    created_at: string;
    affected_files: string[];
    affected_modules: string[];
    signals: {
        tests?: {
            status?: 'pass' | 'fail' | 'partial' | 'unknown';
            passed?: number;
            failed?: number;
            errored?: number;
            coverage_pct?: number;
        };
        verification?: {
            status?: 'pass' | 'fail' | 'partial' | 'unknown';
            gates_passed?: string[];
            gates_failed?: string[];
        };
        compliance?: {
            covered_obligations?: number;
            total_obligations?: number;
            uncovered_critical?: number;
        };
        defects?: {
            new?: number;
            recurring?: number;
            resolved?: number;
        };
        mutation?: {
            kill_rate?: number;
            confidence?: 'mature' | 'lower';
        };
        docs?: {
            doc_targets_total?: number;
            doc_targets_updated?: number;
            doc_targets_missing?: number;
        };
        scope?: {
            scope_clean?: boolean;
            scope_violations?: number;
        };
    };
}
interface ModuleHealthSyncOptions {
    projectRoot: string;
    source?: ModuleHealthEvidence['source'];
    provider?: string;
    sessionId?: string;
    silent?: boolean;
    preflight?: boolean;
}
interface ModuleHealthSyncResult {
    processed_events: number;
    updated_profiles: string[];
    skipped: boolean;
    reason?: string;
}
declare function syncModuleHealth(options: ModuleHealthSyncOptions): Promise<ModuleHealthSyncResult>;
declare function gatesThatPassed(results: readonly GateResult[]): string[];
declare function syncModuleHealthFromVerification(input: {
    projectRoot: string;
    provider?: string;
    sessionId?: string;
    verificationContext: VerificationContext;
    results: GateResult[];
}): Promise<ModuleHealthSyncResult>;
declare function createEvidence(input: {
    source: ModuleHealthEvidence['source'];
    provider?: string;
    sessionId?: string;
    affectedFiles?: string[];
    affectedModules?: string[];
    signals?: ModuleHealthEvidence['signals'];
}): ModuleHealthEvidence;
declare function persistEvidence(projectRoot: string, evidence: ModuleHealthEvidence): Promise<void>;
declare function toProjectRelative(projectRoot: string, path: string): string;

declare function computePlanVsActual(manifest: PlanningManifest, actual: PlanVsActualSnapshot): PlanVsActualDiff;
declare function writePlanVsActual(root: string, slug: string, diff: PlanVsActualDiff): Promise<string>;

declare const SPEC_PIPELINE_ADOPTION_MODES: readonly ["warn", "strict"];
type SpecPipelineAdoptionMode = (typeof SPEC_PIPELINE_ADOPTION_MODES)[number];

type GateMode = 'off' | 'warn' | 'strict';
type AdoptionMode = SpecPipelineAdoptionMode;
interface PipelineConfig {
    enabled: boolean;
    clarification: GateMode;
    final_review: GateMode;
    token_ceiling: number;
    experts_enabled: boolean;
    adoption: AdoptionMode;
    standing_experts: AgentRole[];
    standing_experts_dropped: string[];
}

type ClarityLabel = 'vague' | 'okay' | 'clear';
interface GroundingReference {
    kind: 'doc' | 'glossary' | 'rule';
    ref: string;
}
type GroundingPath = 'rag' | 'docs-fallback';
interface VocabularyEntry {
    term: string;
    definition?: string;
    kind: 'glossary' | 'role' | 'flow' | 'rule' | 'technical';
    source: string;
}

type FindingKind = 'requirement' | 'invariant' | 'acceptance' | 'risk' | 'non-goal';
type FindingSeverity = 'must' | 'should' | 'could';

type FinishOutcome = 'freeze' | 'non-blocking-review' | 'await-human-approval';
interface QuestionCounts {
    asked: number;
    answered: number;
    auto_answered: number;
    deferred: number;
}

type RequirementKind = 'FR' | 'NFR' | 'AC' | 'INV';
interface TraceEntry {
    id: string;
    kind: RequirementKind;
    source: string;
}
interface TraceArtifact {
    entries: TraceEntry[];
}

interface SpecProvenance {
    pipeline_produced: boolean;
    run_dir?: string;
    label?: ClarityLabel;
    grounding?: {
        sparse: boolean;
        path: GroundingPath;
    };
    questions?: QuestionCounts;
    experts?: {
        roles: AgentRole[];
        accepted: number;
        declined: number;
        conflicts: number;
        auto_resolved: number;
        standing?: number;
        renamed?: number;
    };
    findings?: AcceptedFinding[];
    trace?: TraceArtifact;
    manual_reason?: string;
}
interface AcceptedFinding {
    id: string;
    role: AgentRole;
    kind: FindingKind;
    severity: FindingSeverity;
    target: string;
    claim: string;
}
interface SpecTaskSection {
    intent: string;
    scope: Record<string, unknown>;
}
interface SpecGroundingSection {
    path: GroundingPath;
    sparse: boolean;
    references: GroundingReference[];
    vocabulary?: VocabularyEntry[];
}
interface SpecPipelineSection {
    produced: boolean;
    outcome?: FinishOutcome;
    reason?: string;
    a5_live?: boolean;
    enforcement?: Omit<PipelineConfig, 'enabled'>;
    manual_reason?: string;
    skipped?: 'fast-lane';
    experts?: {
        roles: AgentRole[];
        accepted: number;
        declined: number;
        conflicts: number;
        auto_resolved: number;
        standing: number;
        on_call: string[];
        renamed: number;
    };
    findings?: AcceptedFinding[];
}
type SpecTraceMap = Record<string, string>;
type FeatureSpecInvariantSource = 'compiled-rule' | 'module-rule' | 'authored';
interface FeatureSpecInvariant {
    invariant_id: string;
    statement: string;
    source: FeatureSpecInvariantSource;
    rule_id?: string;
    confirmed: boolean;
}
interface FrozenSpecMetadata {
    frozen_at: string;
    spec_hash: string;
    signed_off_by: string;
}
interface SpecReviewSummary {
    reviewed_at: string;
    defect_count: number;
    by_severity: {
        critical: number;
        major: number;
        minor: number;
    };
}
interface FeatureSpec {
    schema_version: string | number;
    spec_id: string;
    spec_file: string;
    spec_hash: string;
    behaviour: string[];
    acceptance_criteria: VerificationCriterion[];
    invariants: FeatureSpecInvariant[];
    open_questions: string[];
    frozen: FrozenSpecMetadata | null;
    spec_review?: SpecReviewSummary;
    non_goals?: string[];
    task?: SpecTaskSection;
    grounding?: SpecGroundingSection;
    pipeline?: SpecPipelineSection;
    trace?: SpecTraceMap;
    provenance?: SpecProvenance;
}

interface ReconnectSeam {
    slice_id: string;
    depends_on: string;
    kind: 'dangling' | 'upstream-unproven';
    detail: string;
}
interface ReconnectContradiction {
    kind: 'double-owned' | 'off-spec';
    criterion_id: string;
    slice_ids: string[];
    detail: string;
}
interface ReconnectReport {
    coherent: boolean;
    anchored: boolean;
    review: 'structural' | 'agent-re-read';
    frozen_criteria_total: number;
    uncovered_criteria: string[];
    unproven_criteria: string[];
    unwired_seams: ReconnectSeam[];
    contradictions: ReconnectContradiction[];
}
interface ReconnectInput {
    spec: FeatureSpec;
    slices: ExecutionSlice[];
    snapshot: PlanVsActualSnapshot;
    lane: PlanningLane;
}
declare function computeReconnect(input: ReconnectInput): ReconnectReport;
declare function renderReconnectReport(report: ReconnectReport): string;

declare function buildRegressionWatchList(root: string, executionSlices: ExecutionSlice[]): Promise<RegressionEntry[]>;

declare function compileRules(root: string): Promise<CompiledRulesStore>;
declare function writeCompiledRules(root: string, store: CompiledRulesStore): Promise<string>;
declare function readCompiledRules(root: string): Promise<CompiledRulesStore | null>;
declare function isCompiledRulesStale(root: string): Promise<boolean>;
declare function computeSourceHash(root: string): Promise<string>;
declare function looksLikeTriggerPattern(candidate: string): boolean;

declare function injectRuleCriteria(manifest: PlanningManifest, compiledRules: CompiledRulesStore | null): PlanningManifest;

declare function emitTestSkeletons(root: string, criteria: VerificationCriterion[], stack: string): Promise<string[]>;

declare function deriveSlug(featureId: string, requestText?: string | null): string;
declare function isSlugSafe(slug: string): boolean;

interface PentestRetestWorkflowOptions {
    projectRoot: string;
    classification: ClassificationResult;
    sourceReportPath?: string;
    targetUrl?: string;
    focusModules?: string[];
    dbConnectionName?: string;
}
interface PentestRetestWorkflowResult {
    run_id: string;
    report_id: string;
    report_path: string;
    sidecar_path: string;
}
declare class PentestRetestWorkflow {
    private readonly introspector;
    private readonly tracker;
    run(options: PentestRetestWorkflowOptions): Promise<PentestRetestWorkflowResult>;
}
declare function extractSourceReportPath(requestText: string): string | null;

interface PentestWorkflowOptions {
    projectRoot: string;
    classification: ClassificationResult;
    targetUrl?: string;
    focusModules?: string[];
    dbConnectionName?: string;
    incremental?: boolean;
    lastRunId?: string;
}
interface PentestWorkflowResult {
    run_id: string;
    report_id: string;
    report_path: string;
    sidecar_path: string;
}
declare class PentestWorkflow {
    private readonly introspector;
    private readonly tracker;
    run(options: PentestWorkflowOptions): Promise<PentestWorkflowResult>;
}
declare function buildCurrentPentestReport(input: {
    projectRoot: string;
    classification: ClassificationResult;
    snapshot: Awaited<ReturnType<StackIntrospector['snapshot']>>;
    targetUrl: string | null;
    focusModules: string[];
    blockedChecks: string[];
    artifactsDir: string;
    progressRunId: string;
    reportTimestamp: Date;
}): Promise<PentestReportIndex>;

interface RootCauseAnalysisWorkflowOptions {
    projectRoot: string;
    classification: ClassificationResult;
}
interface RootCauseAnalysisWorkflowResult {
    output_path: string;
    title: string;
}
declare class RootCauseAnalysisWorkflow {
    run(options: RootCauseAnalysisWorkflowOptions): Promise<RootCauseAnalysisWorkflowResult>;
}

interface StepCondition {
    complexity?: string[];
    risk?: string[];
    workflow?: string[];
}
type OnFailureDirective = 'skip' | 'abort' | 'retry';
interface WorkflowStep {
    skill: string;
    condition?: StepCondition;
    on_failure?: OnFailureDirective;
}
interface ParallelGroup {
    parallel: WorkflowStep[];
    on_failure?: OnFailureDirective;
}
type TemplateStep = WorkflowStep | ParallelGroup;
interface WorkflowTemplate {
    name: string;
    description: string;
    triggers?: {
        workflow?: string[];
        complexity?: string[];
        risk?: string[];
    };
    steps: TemplateStep[];
}
interface WorkflowStepProgress {
    index: number;
    skill: string | null;
    type: 'sequential' | 'parallel';
    status: 'not_started' | 'running' | 'completed' | 'skipped' | 'failed' | 'aborted' | 'cancelled';
    started_at: string | null;
    completed_at: string | null;
    error: string | null;
}
interface WorkflowRunProgress {
    schema_version: '1';
    run_id: string;
    template_name: string;
    status: 'running' | 'completed' | 'failed' | 'aborted' | 'cancelled';
    started_at: string;
    updated_at: string;
    steps: WorkflowStepProgress[];
    cancelled_steps_completed?: number;
}

declare class WorkflowTemplateLoader {
    private readonly projectRoot;
    constructor(projectRoot: string);
    get workflowsDir(): string;
    load(workflowName: string): Promise<WorkflowTemplate>;
    list(): Promise<string[]>;
}

declare class WorkflowTemplateValidator {
    validate(template: WorkflowTemplate, availableSkills: Set<string>): {
        valid: boolean;
        errors: string[];
    };
    isParallelGroup(step: TemplateStep): step is ParallelGroup;
}

interface StepExecutionContext {
    classification: {
        complexity?: string;
        risk?: string;
        workflow?: string;
        [key: string]: unknown;
    };
}
interface StepExecutionResult {
    status: 'completed' | 'skipped' | 'failed';
    error?: string;
}
interface WorkflowStepRunner {
    execute(step: WorkflowStep, signal?: AbortSignal): Promise<StepExecutionResult>;
}
interface StepExecutorOptions {
    sessionId?: string;
    stackKey?: string;
    predictiveCache?: PredictiveCache;
    skillCacheManager?: SkillCacheManager;
}
declare class StepExecutor implements WorkflowStepRunner {
    private readonly context;
    private readonly sessionId;
    private readonly stackKey;
    private readonly predictiveCache;
    private readonly skillCacheManager;
    private lastSkill;
    constructor(context: StepExecutionContext, options?: StepExecutorOptions);
    shouldExecute(step: WorkflowStep): boolean;
    execute(step: WorkflowStep, signal?: AbortSignal): Promise<StepExecutionResult>;
    getLastSkill(): string | undefined;
    protected runStep(payload: WorkflowStep): Promise<void>;
    private evaluateCondition;
}

interface ParallelResult {
    results: Array<{
        skill: string;
        status: 'completed' | 'skipped' | 'failed';
        error?: string;
    }>;
    overall: 'completed' | 'failed' | 'skipped' | 'cancelled';
}
declare class ParallelExecutor {
    private readonly stepExecutor;
    constructor(stepExecutor: WorkflowStepRunner);
    execute(group: ParallelGroup, signal?: AbortSignal): Promise<ParallelResult>;
    private raceAgainstAbort;
    private executeGroup;
}

interface WorkflowRunOptions {
    signal?: AbortSignal;
}
interface WorkflowEngineOptions {
    projectRoot: string;
    availableSkills: Set<string>;
    createStepExecutor?: (context: StepExecutionContext) => WorkflowStepRunner;
    eventBus?: EngineEventBus;
}
declare class WorkflowEngine {
    private readonly options;
    private readonly loader;
    private readonly validator;
    constructor(options: WorkflowEngineOptions);
    getRegisteredWorkflowIds(): Promise<string[]>;
    run(templateName: string, context: StepExecutionContext, options?: WorkflowRunOptions): Promise<WorkflowRunProgress>;
    resume(runId: string, templateName: string, context: StepExecutionContext, options?: WorkflowRunOptions): Promise<WorkflowRunProgress>;
    private executeSteps;
    private initProgress;
    private progressPath;
    private saveProgress;
    private cancelRun;
    private loadProgress;
    private loadAndValidateTemplate;
    private executeSequentialStep;
}

declare const VERSION: string;
declare function getFrameworkName(): string;

export { ACTIVE_CAPABILITY_ORDER, AC_ID_PATTERN, ADAPTER_TYPES, AGENT_ROLES, AIDetector, ANALYTICS_CONFLICTS, ANALYTICS_DECISION_PATH, ANALYTICS_PROVIDERS, ANALYTICS_STRICTNESS_MODES, ANSWER_GROUNDING_STATES, ANSWER_MODES, ARTIFACT_OUTPUT_KEYS, ARTIFACT_TYPES, ATTACHMENT_RETRY_BUDGET_MS, AcTestMappingGate, ActiveCapability, AdapterFactory, AiAssistantAdapter, AiderAdapter, AnalyticsGateStatus, AntigravityAdapter, ApiImpact, ArchitectureComplianceGate, AstChunker, AttachmentPathError, BACKSTOP_VERIFICATION_ORIGINS, BOUNDARY_SCHEMA_VERSION, BehavioralCorrectnessGate, BenchmarkGateConfig, BudgetAllocator, CHUNKER_VERSION, CITATION_SOURCE_CLASSES, CLASSIFICATION_RULES, COLLISION_MAP, COMPLIANCE_EVIDENCE_STRENGTHS, COMPLIANCE_RELATIONS, COMPLIANCE_SCHEMA_VERSION, CONTEXT_LEVELS, CONTEXT_LEVEL_BUDGETS, CRITERION_STATUSES, CacheMetricsTracker, CacheWarmer, CancelledError, Capability, ChangeCompletenessGate, ChunkIndexManager, ClassificationResult, ClassificationScope, ClassificationWorkflow, ClaudeCodeAdapter, CodeTestsLintGate, CodexCliAdapter, CompiledRule, CompiledRulesStore, Complexity, ComplianceSensitivity, ConditionalSectionProcessor, ContextBudgetEnforcer, ContextBudgetHint, ContextBudgetOptimizer, ContextDeduplicator, ContextEvictor, ContextHitTracker, ContinueAdapter, ContradictionDetector, CorruptVectorIndexError, CoverageOverlayEntry, CrsBacklogQueue, CursorAdapter, CustomerFacingImpact, DECISION_AUDIT_EVENTS, DECISION_PAUSE_EVENT_TYPES, DEFAULT_ANALYTICS_STRICTNESS, DEFAULT_BOUNDARY_REPORT_PATH, DEFAULT_CONTEXT_BUDGET, DEFAULT_CRS_BACKLOG_CAP, DEFAULT_GATE_CODES, DEFAULT_HOOK_ADAPTER, DEFAULT_OBLIGATION_INDEX_PATH, DEFAULT_PREDICTIVE_CACHE_OPTIONS, DEFAULT_REBUILD_CACHE_MAX_SIZE, DEFAULT_REDACTION_ALLOWLIST, DEFAULT_SKILL_AUDIT_BUFFER_CAPACITY, DEFECT_PATTERN_SCHEMA_VERSION, DESIGN_TOKENS_PLACEHOLDER_NOTE, DISCLOSURE_ESCALATION_REASONS, DISCLOSURE_LEVELS, DOC_TYPES, DataRetrievalDecider, DataSensitivity, DatabaseImpact, DatabaseQualityGate, DecisionCapExceededError, DecisionCategory, DecisionHumanResponse, DecisionIntent, DecisionOption, DecisionOptionEvidence, DecisionPacket, DecisionPacketCorruptError, DecisionStatus, DecisionStore, DesignTokenService, DesignTokensMissingError, DesignTokensPlaceholderError, DetectedStackProfile, Detector, DifferentialRefresh, DocTarget, DocumentPipeline, DocumentProgressTracker, DocumentationFreshnessGate, DocumentationWorkflow, Domain, DuplicateSkillIdentifierError, ENGINE_ERROR_CODES, ESCALATION_REASONS, EVIDENCE_FAILURE_CATEGORIES, EVIDENCE_GATE_STATUSES, EVIDENCE_OVERALL_STATUSES, EcosystemParserRegistry, EmbeddingBacklogOverflow, EmbeddingProviderError, EmbeddingProviderName, EngineEventBus, EvidenceRetriever, ExecutionSlice, ExtensionSurfaceGate, FAILURE_PHRASES, FINDING_SEVERITIES, FRAMEWORK_PACKAGE_MAP, FileRegistryMapper, FileVectorIndex, FrameworkError, FrameworkUpdater, FreshnessChecker, GATE_CATALOG, GeminiCliAdapter, GithubCopilotAdapter, HEALTH_CHECK_STATUSES, HEALTH_TIERS, HOOK_COVERAGE_MATRIX, HOOK_EXIT_CODES, HOOK_TRIGGERS, HUD_COST_CACHE_SUFFIX, HUD_SNAPSHOT_SCHEMA, HealthChecker, HealthTier, ImplementationReviewGate, InferredTurnClassifierModel, InstalledPackage, InstructionsDocsStructureGate, IntelligenceConfig, IntelligenceContext, JunieAdapter, LANE_PHASES, LATE_GATES, LEGACY_MCP_OUTPUT_PATHS, Lane, LocalEmbeddingProvider, LoggerSinkFailedError, MANAGEABLE_ACTIVE_CAPABILITIES, MAX_PENDING_DECISIONS, MCP_SERVERS, MCP_SERVER_TYPES, MIN_CONSUMER_VERSION, ManifestClassification, ManifestComplexity, ManifestDelta, ManifestProductionTimeoutError, McpConfigManager, McpServerRegistry, MissingPolicyContextError, ModuleDocsStructureGate, ModuleHealthMetrics, ModuleHealthProfile, ModuleResolver, NATIVE_HOOK_EVENTS, OnboardingOrchestrator, OpenAiEmbeddingProvider, PAQAD_HOOK_EVENT_ORDER, PAQAD_LIVE_HOOKS, PAQAD_MUTATING_TOOL_MATCHER, PAQAD_RUNTIME_PREFIX, PAQAD_SCHEMA_VERSION, PAQAD_STAGE_AGENT_MATCHER, PAQAD_STAGE_HELPER_MATCHER, PATHS, PDF_PAGE_CAP, PENTEST_EFFORTS, PENTEST_FINDING_STATUSES, PENTEST_RETEST_STATUSES, PENTEST_RUN_STATUSES, PENTEST_RUN_STEP_STATUSES, PENTEST_SEVERITIES, PENTEST_SOURCE_TYPES, PENTEST_WORKFLOWS, PIPELINE_PHASES, PLACEHOLDER_DESIGN_TOKENS, PLANNING_LANES, PLANNING_MANIFEST_VERSION, PLAN_MODES, PLUGIN_RUNTIME_ROOT, PLUGIN_SESSION_START_HOOK, PROOF_TYPES, ParallelExecutor, PatternCli, PatternRecorder, PatternStore, PatternSuggester, PatternVectorService, PentestProgressTracker, PentestRetestWorkflow, PentestWorkflow, PipelineRouter, PlanVsActualDiff, PlanVsActualSnapshot, PlanningCostEntry, PlanningCostLog, PlanningLane, PlanningManifest, PostClassifier, PreClassifier, PredictiveCache, PriorityClassifier, ProjectKnowledgeAnswerer, ProjectProfile, REDACTION_PLACEHOLDER, REGISTRIES, REQUIREMENT_TYPES, RESOLUTION_LAYERS, RETRIEVAL_ESCALATION_SIGNALS, RETRIEVAL_PATHS, REVIEW_DIMENSIONS, REVIEW_MODES, REVIEW_TIERS, ROLE_TOKEN_BUDGETS, ROLLBACK_CLASSES, ROUTING_MECHANISMS, RUNG_WORDS, RagFileFilter, RagIngestError, RagService, RebuildCache, RebuildFailedError, RegressionEntry, RelevanceScorer, RequestClassifier, RequirementCompletenessGate, ResolutionError, ResolutionMap, ResolutionSource, Resolver, Reversibility, Risk, RootCauseAnalysisWorkflow, RoutingConfig, RunnerScriptGenerator, RuntimeSkillRegistry, SCHEMA_VERSION_UPDATE_HINT, SINGLE_TEST_SELECTORS, SKILL_MODEL_TIERS, SKILL_OUTPUT_FORMATS, SPEC_REVIEW_SCHEMA_VERSION, STABILITY_LEVELS, STRUCTURED_TEST_FORMATS, SUPPORTED_CAPABILITIES, SUPPORTED_DOMAINS, SUPPORTED_EXTRACTION_KINDS, SUPPORTED_STACKS, SUPPORTED_VISION_EXTENSIONS, SURFACE_DOC_PATH, SchemaValidator, SchemaVersionError, SemanticLoader, SessionAttachmentIndexer, SiteMapFreshnessGate, SkillAuditBuffer, SkillCacheManager, SkillFrontmatterParser, SkillLoader, SkillRegistrationError, SkillTriggerEvaluator, SliceContext, SliceFullSuiteCheck, SpecReviewGate, Stack, StackDriftReport, StackEcosystem, StackIntrospector, StackPackLoader, StackSnapshot, StackSnapshotCache, StackSourceReference, StepExecutor, StoryQualityGate, StreamTruncator, TASK_COMPLEXITIES, TEST_ISSUE_CATEGORIES, TEST_OUTPUT_SCHEMA_VERSION, TEST_PARSE_STRATEGIES, TEST_RUNNER_OUTPUT_SOURCES, TEST_RUNNER_PARALLEL_MODES, TIER_DIMENSIONS, TIER_TOKEN_LIMITS, TIMELINE_COMMITS, TIMELINE_ROWS, TOKEN_ARTIFACT_CLASSES, TRACK_RECORD_BUNDLES, TURN_END_SOURCES, TemplateEngine, TemplateRegistry, ToolchainInfo, TransitionLogManager, TurnSummarizer, UNKNOWN_TEST_OUTPUT_TIMESTAMP, UiImpact, UnknownEngineError, UnsupportedFileTypeError, VERIFICATION_EVIDENCE_RELATIVE_PATH, VERIFICATION_EVIDENCE_SCHEMA_VERSION, VERIFICATION_EVIDENCE_STDERR_BUDGET_BYTES, VERIFICATION_GATES, VERSION, VERSION_UNKNOWN, ValidationError, VectorIndexStorageError, VerificationCriterion, VerificationGateRunner, VersionIncompatibleError, WindsurfAdapter, WorkflowAlreadyRunningError, WorkflowEngine, WorkflowRouterService, WorkflowSource, WorkflowTemplateLoader, WorkflowTemplateValidator, ZIP_DECOMPRESSED_LIMIT_BYTES, __test, __testOutputInternals, __tokenEfficiencyInternals, addActiveCapability, addWriteInOption, analyticsEventDocPath, analyticsFeatureDir, analyticsIndexPath, appendAttachmentEvent, appendAuditLog, appendAuditLogFailure, appendCostEntry, appendDecisionAuditEvent, appendMigrationRecord, appendPlanningAudit, appendRagAudit, appendSkillAuditEvent, applyDisclosurePolicy, askThresholdForProject, assembleDecisionEvidence, assembleIntelligence, assertActiveCapability, assertComplianceSummaryInvariants, assertContractDecisionId, assertSafeCloneSource, attachSpecDefectsToObligations, attachmentCollectionsRoot, backstopGates, bootstrapFramework, bootstrapFrameworkHome, buildAgentConfigContext, buildAnalyticsIndex, buildApiDocContext, buildBoundaryReport, buildCompactArtifact, buildControlLayerAudit, buildCoverageOverlay, buildCurrentPentestReport, buildDecisionPacket, buildDesignSystemContext, buildDetectedStackProfile, buildDetectionReport, buildDocumentationDriftDeltaPayload, buildDriftDeltaReasoningPayload, buildErrorCatalogContext, buildEventDoc, buildHostHookChain, buildHudSnapshot, buildIntegrationDocContext, buildModuleScaffoldContext, buildPatternAdvisories, buildPluginHookChain, buildReasoningInputPayload, buildRecordEvents, buildRegistryContext, buildRegressionWatchList, buildRepoStateSignature, buildRepositoryVerificationContext, buildRepositoryVerificationVerdict, buildRunnerScriptContext, buildShip, buildSkillIndex, buildTestDeltaReasoningPayload, buildTimeline, buildTrackRecords, buildVerificationDeltaReasoningPayload, buildVerificationEvidence, buildVerificationGateDeltaPayload, capabilityGateCommand, castMerge, checkAndMigrateSchema, checkSchemaCompatibility, checkSpecCompliance, classifyDefect, cleanupLegacyMcpFiles, clearEngineLogger, clearEphemeralCollection, collectObservedAcIds, collectScopeDriftPaths, collectionVectorPaths, compareConfigurations, compareConsumerCompatibility, compareDefects, compareStackProfiles, compileRules, completionRecordCommand, computeAcTestMapping, computeClassificationConfidence, computeDecisionFingerprint, computeDeliveryPlan, computeDelta, computeHudFlags, computeHudHeadline, computeImplementationReview, computeManifestHash, computePacketConfidence, computePlanVsActual, computeReconnect, computeSourceHash, computeSpecReview, conflictCategory, countFileReferences, createDefaultEcosystemParserRegistry, createDriftDelta, createEmbeddingProvider, createEvidence, createLogger, createPack, createPendingDecision, createTestDelta, createVerificationDelta, crsCollectionDir, crsCollectionLayout, crsCollectionPaths, decisionCapExceededEvent, decisionDiscardedEvent, decisionOptionsForCategory, decisionPacketCorruptEvent, decisionPausedEvent, decisionQuestionForCategory, decisionResolvedEvent, defaultSimilarityFor, defaultStoreRoot, deregisterCollection, deriveHealthTier, deriveOverallStatus, deriveSlug, detectAnalyticsProvider, detectAnalyticsSignals, detectBoundariesInSource, detectContractBoundaries, detectDecisionForks, detectDeltaCandidate, detectFlutterSignals, detectLaravelSignals, detectReactSignals, detectShortVideoSignals, detectSvelteSignals, detectVueSignals, discoverBusinessModules, discoverModules, discoverTargetUrl, doctorBoundaryReport, doctorObligationIndex, doctorSpecReview, ecosystemToLanguage, emitSkillAuditEvent, emitTestSkeletons, engineLog, ensureDecisionAuditLog, ensureSchemaMarkerSync, ensureStoreDir, escapeCollectionId, estimateContextBudgetHint, evaluateAnalyticsCompleteness, evaluateAnalyticsCompletenessForProject, evaluateBenchmarkGates, evaluateEscalation, evaluateRetrievalGate, expectedGateCodes, extractAcIdFromIssue, extractCallSites, extractKeywords, extractModuleNamesFromRequest, extractObligationIndex, extractRelevantTestPaths, extractSourceReportPath, extractUnhandledVariants, failurePhrase, findBracePlaceholders, findPathSegmentsInRun, findProvider, findTouchedFilePaths, formatAgentContextWarnings, formatVerdictSummary, frameworkHomeAbsolute, frameworkSymlinkType, gateCatalogEntry, gateExpectedOnLane, gateOwner, gatesThatPassed, generateBoundaryTests, generateDocumentationScaffold, generateFeatureDevelopmentPolicy, generateInitialRegistries, generateModuleMapYaml, generateModuleScaffold, generateSkillIndex, generateVitestSkeletons, getCollectionId, getConsumerLogger, getEngineLogger, getEngineVersionReport, getFrameworkName, getGlobalPatternVectorPaths, getInheritanceDirectories, getLegacyCapabilities, getPackManifestMap, getPackTestRunners, getPacksForFrameworks, getPrimaryStack, getProjectSecret, getSecretPermissionWarning, getServersForStack, getSharedSkillAuditBuffer, getStackPromptChoices, getTaxonomyEntry, groupBySlug, hasCodeNegation, hasPreMutationBlock, hashRelevantInputs, hashSourceFiles, hookCommand, hudCostCachePath, hudLastBlockPath, hudReceiptPath, hudSnapshotPath, hudVerdictPath, indexAttachment, inferNamingConvention, inferSourceArtifacts, initializeModuleHealth, injectContractBoundaryCriteria, injectDefectAdvisoryCriteria, injectRuleCriteria, installPack, isAboutWorkPrompt, isActiveCapability, isAlwaysLoadRule, isAttachmentIndexingDegraded, isBackstopVerificationOrigin, isCancelledError, isCompiledRulesStale, isContractDecisionId, isCreateArtifactAsk, isEmbeddingBacklogOverflow, isEmbeddingProviderError, isEngineErrorCode, isEnoentError, isIndexAttachmentFailure, isLiveHookCapable, isManageableActiveCapability, isQuestionRoute, isRagIngestError, isRunningUnderPlugin, isSlugSafe, isUnderPluginPath, lexicalDocumentText, lintDecisionCopy, listAvailableActiveCapabilities, listCollections, listContractDecisions, listErrorTaxonomy, listManifestSlugs, listPacks, loadBoundaryReport, loadEntry, loadIndex, loadLoggingConfig, loadManifest, loadModuleDocs, loadModuleMap, loadObligationIndex, loadProjectPackRegistry, loadSpecReviewReport, loadTests, localModelDir, localModelsRoot, looksLikeTriggerPattern, manifestExists, markCriteriaFromOverlay, markStaleEntries, matchRuleTriggers, matchesGlobish, mergeDeltaManifest, mintDecisionId, moduleHealthPath, normalizeActiveCapabilities, normalizeDecisionQuestion, normalizeEngineVersion, normalizeEventSlug, parseAttachment, parseSecretMatches, parseSuspiciousRoutes, parseTestOutput, persistEvidence, planGeneratedFiles, predictTokenCeiling, prunePatterns, queryMatchingDefectPatterns, queryOsv, queryPatterns, readAllModuleHealth, readAnalyticsDecision, readAttachmentEvents, readCompiledRules, readContractDecisions, readCostLog, readDecisionAuditEvents, readExistingOnboardingManifest, readJsonIfExists, readModuleHealth, readProjectSecrets, readSchemaMarker, readSchemaMarkerSync, readSkillAuditEvents, readStackSnapshotSync, rebuildApiConversation, recordFindings, recordFromComplianceReport, recordGapText, redactFields, redactPayload, redactSecrets, registerCollection, reloadLoggingConfig, removeActiveCapability, removePack, removeProjectSecrets, renderHookCommand, renderReconnectReport, renderStackConfirmationSummary, renderVitestSkeleton, rendersFullHookChain, resetGeneratingEntries, resolveActiveLineage, resolveAnalyticsGate, resolveAnalyticsStrictness, resolveAndPersistAnalyticsGate, resolveCapabilityDirectories, resolveCollectionDir, resolveContextBudgetForModel, resolveContextBudgetForModelTier, resolveDecisionPacket, resolveDocTargets, resolveFrameworkInstallPath, resolveImpacts, resolvePackManagerRoots, resolvePendingDecision, resolveScope, resolveSelections, retrieveFromAttachments, reviewSpecification, ruleTriggersMatch, runArtifactsDir, runLogsDir, runOrphanSweep, runProjectScript, runRepositoryVerification, runRoutingDecision, runStatusForSteps, safeBaseName, sanitizeStackSnapshotRepository, saveBoundaryReport, saveManifest, saveObligationIndex, saveSpecReviewReport, scanBoundaries, schemaMarkerPath, schemaMigrationLogPath, scoreDecisionOptionOverlap, scoreFile, selectModelForTier, selectViableDecisionOptions, serializeModuleMap, setEngineLogger, shouldSkipLlm, skillPath, slugify, slugifySpec, specIndexPath, specReportPath, specReviewPath, suggestPatternsForProject, summarizeCommandAvailability, summarizeStack, syncAnalyticsDocs, syncModuleHealth, syncModuleHealthFromVerification, toCrsCollectionId, toEngineError, toEphemeralCollectionId, toLoadedSkill, toLocalTimestamp, toProjectRelative, toProjectRelativeModule, toReportId, toStackDetectionResource, toVerificationSnapshots, toolReferencePath, validateApiDoc, validateErrorCatalogMarkdown, validatePackAt, validateSpecDocument, validateUserFlow, verifyFullSuite, withSchemaMigrationLock, workKindOf, writeCompiledRules, writeDetectionReport, writeFileAtomic, writeFrameworkMetadata, writeFrameworkVersionPreservingTimestamp, writeGeneratedFiles, writeHudReceipt, writeHudSnapshot, writeHudSnapshotSafe, writeJson, writeJsonPreservingTimestamp, writeModuleHealth, writeModuleHealthProfile, writeModuleMap, writeOnboardingManifest, writePlanVsActual, writeProjectProfile, writeProjectSecret, writeSchemaMarker, writeSchemaMarkerSync, writeSkillIndex, writeSkillIndexFromArtifacts, writeVerificationEvidence };
export type { AIDetectorOptions, ActionRecommendation, AdapterCapabilities, AdapterConfig, AdapterContext, AdapterHookCoverage, AdapterInterface, AdapterType, AffectedModule, AgentRole, AnalyticsCallSite, AnalyticsCompletenessResult, AnalyticsConflict, AnalyticsConflictKind, AnalyticsDetection, AnalyticsGateDecision, AnalyticsGateInput, AnalyticsProvider, AnalyticsProviderId, AnalyticsStrictness, AnalyticsSyncEntry, AnalyticsSyncResult, AnswerGroundingState, AnswerMode, AnswerQuery, ApiEndpointDoc, ApiMessage, ApiSchemaField, ArchiveInspection, ArchiveInspector, ArtifactType, AttachmentCollectionScope, AttachmentContentKind, AttachmentEvent, AttachmentEventInput, AttachmentEventKind, AttachmentEventSink, AttachmentIndexingDegradedSignal, AttachmentIndexingOutcome, AttachmentIndexingResult, AttachmentOrphanPurgeRecord, AttachmentRecord, AttachmentRecordStatus, AttachmentRejection, AttachmentRejectionOutcome, AttachmentRejectionReason, AttachmentSessionKind, AttachmentStoredChunk, BootstrapOptions, BoundaryInterface, BoundaryInterfaceReport, BoundaryManifest, BoundaryRelationship, BoundaryReport, BudgetAllocation, BudgetBand, BudgetBreakdown, BudgetBreakdownError, BudgetBreakdownSuccess, BudgetCheckResult, BudgetClassificationHints, BudgetDecision, BudgetEvaluation, BudgetOptimizerConfig, BudgetOptimizerState, BudgetTier, BudgetVerdict, BuildCompactArtifactInput, BuildDecisionPacketInput, BuildHudSnapshotOptions, BuildIndexOptions, BuildRepositoryVerificationContextOptions, BuildVerificationEvidenceInput, CacheMetrics, CacheStats, CancelledByConsumerPayload, CancelledErrorDetails, CanonicalDocOwnershipKind, CanonicalDocTarget, ChangeClosureSummary, CheckComplianceOptions, Chunk, ChunkIndex, ChunkIndexEntry, ChunkIndexSyncResult, Citation, CitationSourceClass, ClassificationHint, ClassificationRule, ClassifierInput, CollisionBehavior, CompactArtifactResult, CompactArtifactSummary, ComparisonMode, CompletedStorySummary, ComplianceClause, ComplianceEvidenceStrength, ComplianceFramework, ComplianceMapping, CompliancePackManifest, CompliancePackRegistry, ComplianceRelation, ComplianceReport, ComplianceReportObligation, ComplianceReportSummary, ComplianceSignal, ComplianceSignalType, ComplianceState, CompressionAuditRecord, ComputeBudgetInput, ConfigurationComparisonResult, ConsumerCompatibility, ContextBudget, ContextBudgetConfig, ContextBudgetEstimateInput, ContextHealthWarning, ContextHitEntry, ContextHitLog, ContextLevel, ContextPriorityTier, ContextSavingsEntry, ContextSegmentPriority, ContractBoundary, ContractDecisionListEntry, ContractDecisionOption, ContractDecisionOrigin, Contradiction, ControlLayerAuditRecord, ConversationRebuildResult, CreateDecisionInput, CreateLoggerOptions, CreatePackOptions, CrsBacklogPersist, CrsChunk, CrsChunkInput, CrsCollectionId, CrsIndexedSessionEvent, CrsRetrievalResult, DataSource, DataSourceType, DecisionAuditEvent, DecisionAuditEventType, DecisionCapExceededEvent, DecisionCopyIssue, DecisionDiscardedEvent, DecisionEventOption, DecisionEventSink, DecisionFingerprintInput, DecisionIndexFile, DecisionPacketCorruptEvent, DecisionPacketCorruptPayload, DecisionPauseEvent, DecisionPauseEventType, DecisionPausedEvent, DecisionResolutionResult, DecisionResolutionSource, DecisionResolvedEvent, DecisionStoreOptions, DeduplicationStats, DeduplicatorArtifact, DefectFinding, DefectPatternEntry, DefectPatternIndex, DefectPatternIndexEntry, DefectSource, DeferUndeclaredDecisionInput, DeliveryPlanInput, DeltaDetectionResult, DeltaReasoningPayload, DesignTokenDocArtifact, DesignTokenGroup, DesignTokenLeaf, DesignTokenNode, DesignTokensDocument, DetectedDecisionFork, DetectionReport, DetectionSignal, DetectorOptions, DiscardDecisionInput, DisclosureAuditRecord, DisclosureEscalationReason, DisclosureLevel, DisclosurePolicyInput, DisclosurePolicyResult, DisplayMessage, DocPath, DocProgressEntry, DocProgressFile, DocProgressState, DocType, DoctorIssue, DoctorResult, DocumentPipelineOptions, DocumentRunResult, DocumentScope, DocumentationWorkflowMode, DocumentationWorkflowOptions, DocumentationWorkflowResult, DocumentationWorkflowStep, DriftDelta, DriftFileSnapshot, DuplicateSkillIdentifierPayload, EcosystemParser, EmbeddingProvider, EmbeddingProviderErrorCode, EngineErrorCode, EngineErrorPayloadBase, EngineEvent, EngineEventBase, EngineEventBusOptions, EngineEventCallback, EngineEventFilter, EngineEventKind, EngineLogEntry, EngineLogger, EngineVersionReport, EnsurePentestRunOptions, EphemeralCollectionId, ErrorCatalogEntry, EscalationDecision, EscalationReason, EvalDatasetItem, EvalQueryClass, EvalRunResult, EvalTrace, EvaluateEscalationInput, EventGroup, EventsCoalescedEvent, EvictionResult, EvidenceFailureCategory, EvidenceFile, EvidenceGateStatus, EvidenceOverallStatus, ExitCode, ExtractObligationsOptions, ExtractionKind, ExtractionResult, FileProbeResult, FileWriteResult, FilterDiagnostics, FilterStats, FindingSeverity$1 as FindingSeverity, FrameworkErrorOptions, FrameworkUpdaterOptions, FreshnessMetadata, FullSuiteRunResult, FullSuiteRunner, FusionDiagnostic, Gate, GateBackstopSource, GateCatalogEntry, GateCode, GateOwner, GateResult, GateSkipKind, GateStrength, GenerateBoundaryTestsOptions, GenerateVitestSkeletonOptions, GeneratedBoundaryTest, GeneratedFile, GeneratedSkillIndexEntry, HandoffArtifact, HealthCheckResult, HealthCheckStatus, HealthCheckerOptions, HealthEfficiencySummary, HealthReport, HitTrackerInput, HookDefinition, HookResult, HookTrigger, HostHookEventMap, HudAcceptanceClaim, HudChief, HudClaim, HudCost, HudDeliveryPlan, HudFindings, HudFindingsScan, HudFindingsStatus, HudFixProofClaim, HudFlag, HudGate, HudGateVerdict, HudHeadline, HudHeadlineInput, HudHighTable, HudPlanProgress, HudProofGate, HudProofStep, HudRung, HudScopeReason, HudSeat, HudShip, HudShipCommit, HudSnapshot, HudStage, HudStageProof, HudTimelineEntry, HudTone, HudTrackRecord, HudVerdictRecord, HudWorkflow, ImpactResolutionInput, ImpactResolutionResult, ImplementationReviewFinding, IndexAttachmentFailure, IndexAttachmentOutcome, IndexAttachmentParams, IndexAttachmentResult, InferenceCompleteOptions, InferenceMessage, InferenceProvider, InheritanceDirectory, InstallPackOptions, InstallResult, InstrumentedEvent, IntegrationContract, IntegrationDoc, IntegrationEvent, IntegrationEventPayloadField, JudgmentSignal, KnowledgeAnswer, LaravelDetectionResult, LateGate, LegacyMcpCleanupOptions, LegacyMcpCleanupResult, ListedPack, LoadObligationIndexOptions, LoadSpecReviewOptions, LoadStats, LoadedCompliancePack, LoadedSkill, LoadedStackPack, LocalEmbeddingExtractor, LocalEmbeddingOutput, LocalEmbeddingProgress, LogLevel, LoggerSinkFailedPayload, LoggingConfig, ManifestProductionTimeoutPayload, ManifestValidationError, McpConfigOutput, McpRecommendation, McpRecommendations, McpServerConfig, McpServerDefinition, McpServerType, MissingPolicyContextPayload, ModelCatalogEntry, ModelGradedScores, ModuleDocEvidence, ModuleDocStage, ModuleFeatureEntry, ModuleHealthEvidence, ModuleHealthSyncOptions, ModuleHealthSyncResult, ModuleMap, ModuleMapEntry, ModuleResolutionResult, Obligation, ObligationCategory, ObligationIndex, ObligationIndexMetadata, OnFailureDirective, OnboardingFileTreeEntry, OnboardingManifest, OnboardingOptions, OnboardingOutput, OnboardingPreviewResult, OnboardingSelections, OpenAiEmbeddingClient, OsvVulnerabilityRecord, PackInstallSource, PackManagerRoots, PackRegistry, PackValidationIssue, PackValidationResult, PaqadHookEvent, PaqadLiveHookSpec, PaqadSchemaMarker, ParallelGroup, ParallelResult, ParseAttachmentOptions, ParseAttachmentResult, ParseTestOutputOptions, ParsedAttachment, ParsedLockfile, ParsedLockfilePackage, ParsedManifest, ParsedManifestPackage, ParsedProjectResult, ParsedSkillDocument, Pattern, PatternAdvisory, PatternFilter, PatternIndex, PatternIndexEntry, PatternMatch, PatternQueryOptions, PatternSemanticScorer, PdfExtraction, PdfTextExtractor, PendingContractDecision, PentestCoverageSummary, PentestEffort, PentestFinding, PentestFindingStatus, PentestReportIndex, PentestRetestFinding, PentestRetestStatus, PentestRetestWorkflowOptions, PentestRetestWorkflowResult, PentestRunProgress, PentestRunStatus, PentestRunStep, PentestRunStepStatus, PentestRuntimeStatus, PentestSeverity, PentestSourceType, PentestWorkflowName, PentestWorkflowOptions, PentestWorkflowResult, PhaseResult, PipelineAnalysisRole, PipelinePhase, PipelineResult, PipelineRunContext, PluginRunSignals, PostClassificationAdjustments, PreClassificationResolved, PreClassificationResult, PreClassifierInput, PredictiveCacheOptions, ProjectScriptResult, ProviderFactory, ProviderProgressUpdate, RagBenchmarkEvaluation, RagBenchmarkMetricResult, RagBenchmarkSnapshot, RagFileFilterOptions, RagIgnoreConfig, RagIndexMeta, RagIngestErrorCode, RagPromptTokenGateResult, RagRetrievalResult, RagScoredCandidate, RagStatus, ReactDetectionResult, ReadPendingResult, ReasoningInputPayload, RebuildCacheKey, RebuildInput, ReconnectContradiction, ReconnectInput, ReconnectReport, ReconnectSeam, RecordEventSources, RecordFromComplianceOptions, RecordPatternInput, RedactPayloadResult, RedactionAllowlist, RedactionEvent, RefreshResult, RegistryChangedEvent, ReindexProgressEvent, ReindexProgressHandler, RenderedHook, RepoStateSignatureInput, RepositoryVerificationContextResult, RepositoryVerificationGateVerdict, RepositoryVerificationVerdict, RequestClassifierOptions, ResolutionLayer, ResolveDecisionInput, ResolveExistingDecisionInput, ResolvedArtifact$1 as ResolvedArtifact, ResolvedArtifacts, ResolvedContractDecision, ResolverOptions, RetrievalAuditRecord, RetrievalCompletedEvent, RetrievalDepth, RetrievalEscalationSignal, RetrievalGateInput, RetrievalGateResult, RetrievalPath, RetrievalStartedEvent, RetrievedChunkRef, ReviewDimension, ReviewFinding, ReviewMode, ReviewReport, ReviewSpecOptions, ReviewTier, RootCauseAnalysisWorkflowOptions, RootCauseAnalysisWorkflowResult, RoutingAuditRecord, RoutingInput, RoutingMechanism, RoutingResult, RunRepositoryVerificationOptions, RuntimeSkillDescriptor, RuntimeSkillListEntry, SaveObligationIndexOptions, SaveSpecReviewOptions, ScanBoundariesOptions, SchemaCompatibility, SchemaMigrationRecord, SchemaValidationIssue, SchemaVersionErrorOptions, ScopeResolutionResult, ScoringContext, SemanticLoadClassification, SemanticLoadOptions, SemanticLoaderOptions, SingleTestSelector, SkillAuditEvent, SkillAuditEventType, SkillCacheEntry, SkillCacheResult, SkillCompletionTrigger, SkillDefinition, SkillInputSchema, SkillInputSchemaField, SkillLoadFailedEvent, SkillModelTier, SkillOutputFormat, SkillPackLoadFailedEvent, SkillRegistrationErrorKind, SkillRegistrationErrorOptions, SkillRequestRoutingRule, SkillResult, SkillSource, SkillTriggerCondition, SliceCompletedEvent, SliceFailedEvent, SliceStartedEvent, SpecDefectSeverity, SpecPatternAdvisory, SpecReviewDefect, SpecReviewDefectCategory, SpecReviewDefectStatus, SpecReviewLocation, SpecReviewReport, SpecReviewReportMetadata, StabilityLevel, StackContext, StackDetectionPermissions, StackDetectionResource, StackPackAstManifest, StackPackAuditCommand, StackPackDetectionRule, StackPackDocsManifest, StackPackFieldRule, StackPackLoaderOptions, StackPackManifest, StackPackMcpDefault, StackPackModuleHealthManifest, StackPackPentestCheckMap, StackPackRagManifest, StackPackTestRunner, StackPackTestRunnerParallel, StackPackTestingFramework, StackPackToolchainManifest, StackPackTraitManifest, StepCondition, StepExecutionContext, StepExecutionResult, StepExecutorOptions, StoredContractDecision, StoredPatternVector, StoredVectorChunk, StoredVectorItem, StoredVisionChunk, StructuredLogRecord, StructuredLogger, StructuredTestFormat, StructuredTestIssue, StructuredTestParseMetadata, StructuredTestResult, StructuredTestSummary, StructuredTestWarning, SubagentConfig, Subscription, SubscriptionState, SummarisationMessage, SummariseFailure, SummariseOptions, SummariseResult, SummariseSuccess, SummarizedTurn, SurfaceEntry, SuspiciousRoute, SvelteDetectionResult, TaggedTurn, TaskComplexity, TaxonomyEntry, TemplateContext, TemplateDefinition, TemplateDescriptor, TemplateStep, TestDelta, TestEvidence, TestIssueCategory, TestIssueSnapshot, TestParseStrategy, TestRunnerOutputSource, TestRunnerParallelMode, ThemeExportArtifact, TimelineChange, ToStackDetectionResourceOptions, TokenArtifactClass, TokenBudget, TokenEfficiencyMetadata, TransformersRuntimeEnv, TransitionEntry, TransitionLog, TruncationResult, TurnClassifierModel, TurnInput, TurnPriority, TurnTagPolicy, TurnTagResult, UnhandledVariant, UnknownEngineErrorPayload, UnsupportedFileTypePayload, UpdateCandidate, UpdateDiff, UpdateReport, ValidationIssue, ValidationReport, ValidationResult, VectorIndexPayload, VectorIndexStorageErrorPayload, VectorQueryResult, VerificationContext, VerificationDelta, VerificationEvidence, VerificationEvidenceFailure, VerificationEvidenceGate, VerificationGate, VerificationGateSnapshot, VerificationGateVerdictEntry, VerificationOrigin, VerificationVerdictEvent, VersionIncompatiblePayload, VisionChunk, VisionIngestInput, VisionIngestResult, VueDetectionResult, WaitingDecision, WorkflowAlreadyRunningPayload, WorkflowEngineOptions, WorkflowRouteResult, WorkflowRouterServiceOptions, WorkflowRunOptions, WorkflowRunProgress, WorkflowStep, WorkflowStepCompletedEvent, WorkflowStepFailedEvent, WorkflowStepProgress, WorkflowStepRunner, WorkflowStepStartedEvent, WorkflowTemplate, WorkspaceCompressionPolicy, WriteGeneratedFilesOptions, WriteVerificationEvidenceOptions, WrittenHudReceipt };
