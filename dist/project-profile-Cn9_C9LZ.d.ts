import { A as ActiveCapability, D as Domain, b as DetectedStackProfile } from './introspection-CLBqo7wO.js';

declare const REQUIREMENT_PRIORITIES: readonly ["must", "should", "could"];
type RequirementPriority = (typeof REQUIREMENT_PRIORITIES)[number];
declare const REQUIREMENT_RISKS: readonly ["low", "medium", "high"];
type RequirementRisk = (typeof REQUIREMENT_RISKS)[number];
type RequirementType = 'functional' | 'non-functional' | 'constraint' | 'edge-case';
type ProofType = 'automated' | 'manual' | 'visual';
type CriterionStatus = 'uncovered' | 'covered' | 'partial' | 'indeterminate';
type HealthTier = 'stable' | 'moderate' | 'fragile' | 'unknown';
type RollbackClass = 'safe' | 'needs-migration' | 'destructive';
type PlanMode = 'full' | 'delta';
type PlanningLane = 'fast' | 'graduated' | 'full';
type SliceExecutionStatus = 'pending' | 'in-progress' | 'completed' | 'failed' | 'escalated' | 'blocked';
type SliceEscalationReason = 'retry_failed' | 'circuit_breaker' | 'protected_scope';
type ExecutionTrackerStatus = 'not-started' | 'in-progress' | 'completed' | 'partial' | 'failed';
type CriterionSource = 'planned' | 'compiled-rule' | 'defect-pattern' | 'contract-boundary' | 'inherited';
type DocTargetStatus = 'pending' | 'updated' | 'skipped';
type RegressionStatus = 'pending' | 'passing' | 'failing';
type ManifestComplexity = 'trivial' | 'low' | 'medium' | 'high' | 'very-high';
type ManifestRisk = 'low' | 'medium' | 'high';
interface RequirementNode {
    id: string;
    type: RequirementType;
    description: string;
    depends_on: string[];
    scope: string[];
    risk: RequirementRisk;
    source_refs?: string[];
    priority?: RequirementPriority;
}
interface ExecutionSlice {
    slice_id: string;
    goal: string;
    covers: string[];
    depends_on: string[];
    touches: string[];
    preconditions?: string[];
    rollback_class?: RollbackClass;
    token_budget?: number;
    combine_reason?: string;
}
interface VerificationCase {
    input: string;
    expected_behavior: string;
}
interface VerificationCriterion {
    criterion_id: string;
    given: string;
    when: string;
    then: string;
    proof_type: ProofType;
    proof_target?: string;
    negative_cases?: VerificationCase[];
    edge_cases?: VerificationCase[];
    adversarial_cases?: VerificationCase[];
    status: CriterionStatus;
    source: CriterionSource;
    linked_requirement_ids: string[];
    rule_id?: string;
    pattern_id?: string;
}
interface RejectedAlternative {
    alternative: string;
    rejection_reason: string;
}
interface DecisionRecord {
    decision_id: string;
    choice: string;
    reason: string;
    alternatives_rejected: RejectedAlternative[];
    linked_requirements: string[];
    reversibility: 'easy' | 'moderate' | 'hard';
}
interface DocTarget {
    target_id: string;
    file: string;
    section: string;
    reason: string;
    slice_id: string;
    status: DocTargetStatus;
}
interface RegressionEntry {
    entry_id: string;
    test_file: string;
    test_name?: string;
    touched_file: string;
    slice_id: string;
    obligation_id?: string;
    status: RegressionStatus;
}
interface ManifestClassification {
    workflow: string;
    complexity: ManifestComplexity;
    risk: ManifestRisk;
    lane: PlanningLane;
    domain: string | null;
    stack: string;
    scope?: string;
    affected_modules: string[];
    affected_module_count?: number;
    api_impact?: string | null;
    ui_impact?: string | null;
}
interface RequirementGraphDelta<T> {
    added: T[];
    changed: Array<{
        id: string;
        field: string;
        old_value: unknown;
        new_value: unknown;
    }>;
    removed: T[];
}
interface ManifestDelta {
    requirement_graph: RequirementGraphDelta<RequirementNode>;
    execution_slices: RequirementGraphDelta<ExecutionSlice>;
    verification_matrix: RequirementGraphDelta<VerificationCriterion>;
    decision_log: {
        added: DecisionRecord[];
    };
}
interface PlanningManifest {
    plan_version: number;
    plan_mode: PlanMode;
    feature_id: string;
    slug: string;
    created_at: string;
    base_manifest_hash: string | null;
    classification: ManifestClassification;
    requirement_graph: RequirementNode[];
    execution_slices: ExecutionSlice[];
    verification_matrix: VerificationCriterion[];
    decision_log: DecisionRecord[];
    doc_targets: DocTarget[];
    regression_watch: RegressionEntry[];
    changes?: ManifestDelta;
}
interface SliceBudgetSummary {
    total: number;
    per_slice_base: number;
    per_slice_with_buffer: number;
    consumed: number;
    remaining: number;
}
interface SliceProgressEntry {
    status: SliceExecutionStatus;
    started_at?: string | null;
    completed_at?: string | null;
    attempt?: number;
    tokens_used?: number | null;
    tests_passed?: number | null;
    tests_failed?: number | null;
    docs_updated?: number | null;
    scope_clean?: boolean | null;
}
interface ExecutionProgressTracker {
    slug: string;
    started_at: string;
    updated_at: string;
    total_slices: number;
    status: ExecutionTrackerStatus;
    slices: Record<string, SliceProgressEntry>;
    token_budget: SliceBudgetSummary;
    baseline_failing_tests?: string[];
    re_planned_slices?: string[];
    last_run_id?: string;
}
interface SliceCheckpoint {
    slice_id: string;
    goal: string;
    status: 'completed' | 'failed' | 'escalated';
    attempt: number;
    started_at: string;
    completed_at: string;
    tokens_used: number;
    files_changed: string[];
    exports_created: string[];
    decisions_made: Array<{
        decision_id: string;
        choice: string;
        linked_requirements: string[];
    }>;
    criteria_results: Record<string, CriterionStatus>;
    doc_targets_updated: string[];
    regression_results: Record<string, RegressionStatus>;
    gate_result: SliceGateResult;
    compression_stats: {
        raw_context_tokens: number;
        summary_tokens: number;
        compression_ratio: number;
    };
}
interface PriorSliceSummary {
    slice_id: string;
    goal: string;
    status: 'completed' | 'failed' | 'escalated';
    files_changed: string[];
    exports_available: string[];
}
interface SliceFailingTest {
    test_file: string;
    test_name?: string;
    error: string;
}
interface SliceFixAttempt {
    attempt: number;
    change_summary: string;
    result: string;
}
interface SliceEscalationReport {
    slice_id: string;
    escalation_reason: SliceEscalationReason;
    attempts: number;
    failing_criteria: string[];
    failing_tests: SliceFailingTest[];
    scope_violations: SliceScopeViolation[];
    regression_failures: string[];
    fix_attempts: SliceFixAttempt[];
    tokens_consumed: number;
    recommendation: string;
    blocked_downstream: string[];
}
interface SliceCriteriaCheck {
    criterion_id: string;
    status: CriterionStatus;
    proof_target?: string;
    passed: boolean;
    detail: string;
}
interface SliceScopeViolation {
    file: string;
    type: 'future-slice' | 'prior-slice' | 'outside-manifest' | 'protected-file';
    severity: 'warning' | 'error';
}
interface SliceScopeCheck {
    status: 'clean' | 'warning' | 'violation';
    modified_files: string[];
    violations: SliceScopeViolation[];
}
interface SliceDocCheck {
    target_id: string;
    status: DocTargetStatus;
    changed: boolean;
}
interface SliceRegressionCheck {
    entry_id: string;
    status: RegressionStatus;
    passed: boolean;
    detail: string;
}
interface SliceFullSuiteCheck {
    total_tests: number;
    passing: number;
    failing: number;
    new_failures: string[];
    pre_existing_failures: string[];
    duration_ms: number;
    slow_suite_warning: boolean;
}
interface SliceGateResult {
    status: 'pass' | 'fail';
    criteria: {
        total: number;
        covered: number;
        uncovered: number;
    };
    scope: SliceScopeCheck;
    docs: {
        total: number;
        updated: number;
        skipped: number;
    };
    regression: {
        total: number;
        passing: number;
        failing: number;
    };
    decision: {
        total: number;
        passing: number;
        failing: number;
    };
    full_suite: SliceFullSuiteCheck;
    warnings: string[];
}
type SliceExecutionEventKind = 'slice-started' | 'slice-gate-evaluated' | 'slice-retried' | 'slice-completed' | 'slice-escalated' | 'slice-cancelled' | 'run-finished' | 'run-resume-after-crash';
interface SliceExecutionEventBase {
    runId: string;
    slug: string;
    seq: number;
    ts: string;
    kind: SliceExecutionEventKind;
    coalesced?: true;
    truncated?: true;
}
interface SliceExecutionStartedEvent extends SliceExecutionEventBase {
    kind: 'slice-started';
    sliceId: string;
    attempt: number;
    tokenBudget: number;
}
interface SliceExecutionGateEvaluatedEvent extends SliceExecutionEventBase {
    kind: 'slice-gate-evaluated';
    sliceId: string;
    status: SliceGateResult['status'];
    reasons: string[];
}
interface SliceExecutionRetriedEvent extends SliceExecutionEventBase {
    kind: 'slice-retried';
    sliceId: string;
    attempt: number;
    feedbackSummary: string;
}
interface SliceExecutionCompletedEvent extends SliceExecutionEventBase {
    kind: 'slice-completed';
    sliceId: string;
    tokensUsed: number;
    filesChanged: number;
}
interface SliceExecutionEscalatedEvent extends SliceExecutionEventBase {
    kind: 'slice-escalated';
    sliceId: string;
    reason: string;
    blockedDownstream: string[];
}
interface SliceExecutionCancelledEvent extends SliceExecutionEventBase {
    kind: 'slice-cancelled';
    stoppedAtSeq: number;
}
interface SliceExecutionRunFinishedEvent extends SliceExecutionEventBase {
    kind: 'run-finished';
    trackerStatus: string;
    completedSliceIds: string[];
    blockedSliceIds: string[];
    escalatedSliceIds: string[];
}
interface SliceExecutionResumeAfterCrashEvent extends SliceExecutionEventBase {
    kind: 'run-resume-after-crash';
    previousRunId: string | null;
    resetSliceIds: string[];
}
type SliceExecutionEvent = SliceExecutionStartedEvent | SliceExecutionGateEvaluatedEvent | SliceExecutionRetriedEvent | SliceExecutionCompletedEvent | SliceExecutionEscalatedEvent | SliceExecutionCancelledEvent | SliceExecutionRunFinishedEvent | SliceExecutionResumeAfterCrashEvent;
interface SliceContext {
    manifest_header: Pick<PlanningManifest, 'plan_version' | 'plan_mode' | 'feature_id' | 'slug' | 'created_at' | 'classification'>;
    current_slice: ExecutionSlice;
    verification_criteria: VerificationCriterion[];
    test_skeletons: string[];
    doc_targets: DocTarget[];
    regression_entries: RegressionEntry[];
    prior_slices: PriorSliceSummary[];
    existing_code_matches: ExistingImplementation[];
    decision_context: DecisionRecord[];
    decision_packets?: DecisionPacket[];
    token_budget: number;
}
interface ModuleHealthMetrics {
    coverage_pct?: number | null;
    defect_frequency?: number | null;
    contract_stability?: number | null;
    change_velocity?: number | null;
    tests_passing?: number | null;
    tests_failing?: number | null;
    tests_total?: number | null;
    mutation_score?: number | null;
}
interface ModuleHealthProfile {
    schema_version?: number;
    module: string;
    tier: HealthTier;
    metrics: ModuleHealthMetrics;
    blocked_metrics?: string[];
    evidence?: {
        last_event_id?: string;
        last_provider?: string;
        last_session_id?: string;
        last_verification_status?: 'pass' | 'fail' | 'partial' | 'unknown';
        last_changed_files?: string[];
        processed_event_ids?: string[];
        rollup?: {
            coverage_format?: string;
            coverage_path?: string;
            test_report_format?: string;
            test_report_path?: string;
            git_window_days?: number;
            ran_at?: string;
            source?: 'rollup' | 'from-report';
        };
    };
    history?: {
        lookback_days?: number;
        events_count?: number;
        last_failure_at?: string | null;
        last_success_at?: string | null;
    };
    updated_at: string;
}
interface CompiledRule {
    rule_id: string;
    title: string;
    source_path: string;
    trigger_patterns: string[];
    severity: RequirementPriority;
    summary: string;
    raw_text?: string;
}
interface CompiledRulesStore {
    schema_version: number;
    generated_at: string;
    source_hash: string;
    rules: CompiledRule[];
}
interface CoverageOverlayEntry {
    criterion_id: string;
    status: CriterionStatus;
    evidence_files: string[];
}
interface DefectPatternSummary {
    pattern_id: string;
    subcategory: string;
    description: string;
    frequency: number;
}
interface ExistingImplementation {
    file_path: string;
    function_name: string;
    description: string;
    relevance_score: number;
}
interface IntelligenceContext {
    module_health: ModuleHealthProfile[];
    compiled_rules: CompiledRulesStore | null;
    inherited_constraints: string[];
    coverage_overlay: CoverageOverlayEntry[];
    defect_patterns: DefectPatternSummary[];
    selective_docs: Array<{
        path: string;
        content: string;
    }>;
    existing_implementations: ExistingImplementation[];
    predicted_tokens: number;
}
interface PlanningCostEntry {
    slug: string;
    timestamp: string;
    classification: Pick<ManifestClassification, 'complexity' | 'risk' | 'lane' | 'scope' | 'affected_module_count'>;
    predicted_tokens: number;
    actual_tokens: number;
    slice_count: number;
    criterion_count: number;
    auto_injected_count: number;
}
interface PlanningCostLog {
    entries: PlanningCostEntry[];
}
interface PlanVsActualSnapshot {
    changed_files: string[];
    used_files?: string[];
    covered_criteria?: string[];
}
interface PlanVsActualDiff {
    scope_accuracy_pct: number;
    criteria_pass_rate_pct: number;
    unplanned_files: string[];
    planned_but_unused_files: string[];
    uncovered_criteria: string[];
}

declare const DECISION_CATEGORIES: readonly ["component-reuse", "create-vs-reuse", "shared-abstraction", "ux-pattern", "architecture-path", "workflow-or-tool", "intake.requirement", "intake.confirm_auto_resolution", "intake.write_back", "delivery.open_pr", "delivery.ci_red", "spec.change", "spec.contradiction", "spec.expert_conflict", "fix.proof_method", "test.flaky_judgement", "finding.triage", "quality.ratchet_exception", "analytics.provider_version_mismatch", "analytics.taxonomy_violation", "analytics.pii_consent", "analytics.no_provider_flag", "analytics.architecture_conflict", "analytics.new_event"];
declare const DECISION_STATUSES: readonly ["pending", "resolved", "delegated", "expired", "superseded"];
declare function isStrictDecisionId(id: string): boolean;
declare const DECISION_INTENTS: readonly ["explicit", "delegated", "safer-default", "safer-default-by-cap", "created-new"];
declare const DECISION_CARRY_OVER_SCOPES: readonly ["session", "task", "none"];
type DecisionCategory = (typeof DECISION_CATEGORIES)[number];
type DecisionStatus = (typeof DECISION_STATUSES)[number];
type DecisionIntent = (typeof DECISION_INTENTS)[number];
type DecisionCarryOverScope = (typeof DECISION_CARRY_OVER_SCOPES)[number];
interface DecisionOptionEvidence {
    file?: string;
    last_modified?: string;
    callers?: number;
    similarity?: number;
    rule_match?: string;
    evidence_partial?: boolean;
    findings?: string[];
}
interface DecisionOption {
    option_key: string;
    label: string;
    one_line_preview: string;
    trade_off: string;
    evidence: DecisionOptionEvidence;
    technical_detail?: string;
}
interface DecisionHumanResponse {
    chosen_option_key: string | null;
    intent: DecisionIntent;
    explanation_rounds_used: number;
    responded_at: string;
    responded_by: string;
    carry_over_scope: DecisionCarryOverScope;
    note?: string;
}
interface DecisionPacket {
    decision_id: string;
    fingerprint: string;
    category: DecisionCategory;
    question: string;
    context: string;
    options: DecisionOption[];
    recommendation?: string | null;
    recommendation_reason?: string;
    confidence: number;
    requested_by: string;
    task_session_id: string;
    linked_requirements?: string[];
    linked_slice_id?: string;
    created_at: string;
    status: DecisionStatus;
    human_response?: DecisionHumanResponse;
    ttl_until: string;
    invalidation_watch: string[];
}
type DecisionCategoryTtlOverrides = Partial<Record<DecisionCategory, number>>;
declare const DECISION_CATEGORY_DEFAULTS: Record<DecisionCategory, {
    create_new: boolean;
    reversibility: DecisionRecord['reversibility'];
    ttl_days: number;
}>;
declare function isDecisionPacket(value: unknown): value is DecisionPacket;
declare function validateDecisionPacket(value: unknown): string[];
declare function toDecisionRecord(packet: DecisionPacket): DecisionRecord | null;

declare const RESEARCH_DEPTHS: readonly ["cutting-edge", "standard", "conservative"];
type ResearchDepth = (typeof RESEARCH_DEPTHS)[number];
declare const ESCALATION_MODES: readonly ["block", "require_approval", "warn"];
type EscalationMode = (typeof ESCALATION_MODES)[number];
interface ProjectMetadata {
    name: string;
    id: string;
    description: string;
}
interface ProjectCommands {
    install: string;
    dev: string;
    test: string;
    test_single: string;
    lint: string;
    format: string;
    migrate: string;
    build: string;
    test_parallel?: string;
}
interface StrictnessConfig {
    full_lane_default: boolean;
    require_adversarial_review: boolean;
    block_on_stale_docs: boolean;
    require_db_review_for_migrations: boolean;
}
interface CompliancePackConfig {
    name: string;
    enabled: boolean;
}
interface ProjectFeatureFlags {
    spec_only_mode: boolean;
    market_research: boolean;
    design_research: boolean;
    team_agents: boolean;
    analytics_instrumentation: boolean;
    site_map: boolean;
    lean_rules: boolean;
    feature_report: boolean;
    metrics_enabled: boolean;
    visual_evidence: boolean;
    checks_parallel: boolean;
    checks_max_processes: number;
}
declare const TICKET_PROVIDER_KINDS: readonly ["jira", "linear", "github-issues", "generic"];
type TicketProviderKind = (typeof TICKET_PROVIDER_KINDS)[number];
interface ProjectMcpServer {
    name: string;
    enabled: boolean;
    kind?: TicketProviderKind;
    config?: Record<string, unknown>;
}
type AutoResolveConfirmation = 'always' | 'batched' | 'never';
type TicketWriteBackMode = 'never' | 'ask' | 'always';
interface ModelRoutingConfig {
    default_model: string;
    reasoning_model: string;
    fast_model: string;
}
declare const EMBEDDING_PROVIDER_NAMES: readonly ["local", "openai"];
type EmbeddingProviderName = (typeof EMBEDDING_PROVIDER_NAMES)[number];
interface BenchmarkGateConfig {
    hit_at_5_improvement_pct: number;
    task_success_rate_improvement_pct: number;
    correction_turn_reduction_pct: number;
    prompt_token_increase_limit_pct: number;
    prompt_token_override_success_improvement_pct: number;
}
interface BenchmarkEvalConfig {
    model_graded?: {
        enabled: boolean;
    };
}
interface AdaptiveRetrievalConfig {
    enabled: boolean;
    thresholds?: {
        min_useful_chunks: number;
    };
}
interface MetadataFiltersConfig {
    enabled: boolean;
}
interface ActionRoutingConfig {
    enabled: boolean;
}
interface RerankingConfig {
    enabled: boolean;
    backend: 'local' | 'cohere' | 'passthrough';
    model?: string;
    candidate_pool_size?: number;
    api_key?: string;
}
interface IntelligenceConfig {
    rag_enabled: boolean;
    embedding_provider?: EmbeddingProviderName;
    embedding_model?: string;
    rag_similarity_threshold: number;
    rag_relief_floor: number;
    rag_top_n: number;
    rag_max_file_size?: number;
    existing_surface_tokens?: number;
    rag_base_branch?: string;
    benchmark_gates?: BenchmarkGateConfig;
    benchmark_eval?: BenchmarkEvalConfig;
    adaptive_retrieval?: AdaptiveRetrievalConfig;
    reranking?: RerankingConfig;
    metadata_filters?: MetadataFiltersConfig;
    action_routing?: ActionRoutingConfig;
}
interface EfficiencyConfig {
    context_hit_rate_target?: number;
    skill_caching?: boolean;
    differential_refresh?: boolean;
    mcp_first?: boolean;
    predictive_cache?: boolean;
    auto_summarize_interval?: number;
    context_budget_strategy?: 'aggressive' | 'balanced' | 'conservative';
    summary_model_preference?: 'local' | 'cheapest' | 'default';
    auto_update?: boolean;
    minimum_version?: string;
    skip_version_check?: boolean;
    version_check_interval_hours?: number;
}
interface EscalationConfig {
    destructive_operations: EscalationMode;
    risky_migrations: EscalationMode;
    security_findings: EscalationMode;
    db_row_threshold: number;
}
interface CustomClassificationDimension {
    name: string;
    values?: string[];
    routing_effects?: string[];
}
interface VerificationPluginConfig {
    name: string;
    entrypoint?: string;
    options?: Record<string, unknown>;
}
interface EscalationRuleConfig {
    trigger: string;
    action: EscalationMode;
    rationale?: string;
}
declare const DECISION_ASK_THRESHOLDS: readonly ["strict", "balanced", "permissive"];
type DecisionAskThreshold = (typeof DECISION_ASK_THRESHOLDS)[number];
interface DecisionProfileConfig {
    ask_threshold?: DecisionAskThreshold;
    max_screens_per_task?: number;
    max_pending?: number;
    idle_timeout_minutes?: number;
    ttl_overrides_days?: Partial<Record<string, number>>;
    preferred_option_keys?: Partial<Record<DecisionCategory, string>>;
}
interface FlakyProfileConfig {
    rerun_count?: number;
}
interface EnterpriseConfig {
    enabled: boolean;
    evidence_ledger: boolean;
    ai_bom: boolean;
    compliance_citations: boolean;
}
interface PaqadConfig {
    enabled?: boolean;
}
type ProjectTestingParallel = 'native' | 'available' | 'unavailable' | 'unknown';
interface ProjectTesting {
    runner_id: string;
    parallel: ProjectTestingParallel;
    reason?: string;
    detected_by: 'script' | 'agent';
    lockfile_hash?: string;
    recorded_at: string;
}
interface AppPreviewConfig {
    url: string;
    command?: string;
    wait_ms?: number;
}
interface ProjectProfile {
    project: ProjectMetadata;
    active_capabilities: ActiveCapability[];
    paqad?: PaqadConfig;
    routing?: {
        domain: Domain;
        stack?: string;
        capabilities?: string[];
    };
    stack_profile?: DetectedStackProfile;
    commands: ProjectCommands;
    testing?: ProjectTesting;
    app_preview?: AppPreviewConfig;
    strictness: StrictnessConfig;
    compliance_packs: CompliancePackConfig[];
    features: ProjectFeatureFlags;
    enterprise?: EnterpriseConfig;
    mcp: {
        servers: ProjectMcpServer[];
    };
    model_routing: ModelRoutingConfig;
    research: {
        depth: ResearchDepth;
    };
    intelligence: IntelligenceConfig;
    efficiency: EfficiencyConfig;
    escalation: EscalationConfig;
    custom: {
        classification_dimensions: CustomClassificationDimension[];
        verification_plugins: VerificationPluginConfig[];
        escalation_rules: EscalationRuleConfig[];
        decisions?: DecisionProfileConfig;
        flaky?: FlakyProfileConfig;
    };
}

export { DECISION_ASK_THRESHOLDS as L, DECISION_CARRY_OVER_SCOPES as N, DECISION_CATEGORIES as O, DECISION_CATEGORY_DEFAULTS as Q, DECISION_INTENTS as T, DECISION_STATUSES as U, EMBEDDING_PROVIDER_NAMES as a1, ESCALATION_MODES as a2, REQUIREMENT_PRIORITIES as ap, REQUIREMENT_RISKS as aq, RESEARCH_DEPTHS as ar, TICKET_PROVIDER_KINDS as b0, isDecisionPacket as b5, isStrictDecisionId as b6, toDecisionRecord as b7, validateDecisionPacket as b8 };
export type { DefectPatternSummary as $, ActionRoutingConfig as A, BenchmarkGateConfig as B, CompiledRule as C, DecisionCategory as D, EmbeddingProviderName as E, CompliancePackConfig as F, CriterionSource as G, HealthTier as H, IntelligenceConfig as I, CriterionStatus as J, CustomClassificationDimension as K, ManifestComplexity as M, ProjectProfile as P, RegressionEntry as R, SliceContext as S, VerificationCriterion as V, DecisionAskThreshold as W, DecisionCarryOverScope as X, DecisionCategoryTtlOverrides as Y, DecisionProfileConfig as Z, DecisionRecord as _, DecisionOptionEvidence as a, StrictnessConfig as a$, DocTargetStatus as a0, EfficiencyConfig as a3, EnterpriseConfig as a4, EscalationConfig as a5, EscalationMode as a6, EscalationRuleConfig as a7, ExecutionProgressTracker as a8, ExecutionTrackerStatus as a9, ResearchDepth as aA, RollbackClass as aB, SliceBudgetSummary as aC, SliceCheckpoint as aD, SliceCriteriaCheck as aE, SliceDocCheck as aF, SliceEscalationReason as aG, SliceEscalationReport as aH, SliceExecutionCancelledEvent as aI, SliceExecutionCompletedEvent as aJ, SliceExecutionEscalatedEvent as aK, SliceExecutionEvent as aL, SliceExecutionEventBase as aM, SliceExecutionEventKind as aN, SliceExecutionGateEvaluatedEvent as aO, SliceExecutionResumeAfterCrashEvent as aP, SliceExecutionRetriedEvent as aQ, SliceExecutionRunFinishedEvent as aR, SliceExecutionStartedEvent as aS, SliceExecutionStatus as aT, SliceFailingTest as aU, SliceFixAttempt as aV, SliceGateResult as aW, SliceProgressEntry as aX, SliceRegressionCheck as aY, SliceScopeCheck as aZ, SliceScopeViolation as a_, ExistingImplementation as aa, FlakyProfileConfig as ab, ManifestRisk as ac, MetadataFiltersConfig as ad, ModelRoutingConfig as ae, PaqadConfig as af, PlanMode as ag, PriorSliceSummary as ah, ProjectCommands as ai, ProjectFeatureFlags as aj, ProjectMcpServer as ak, ProjectMetadata as al, ProjectTesting as am, ProjectTestingParallel as an, ProofType as ao, RegressionStatus as as, RejectedAlternative as at, RequirementGraphDelta as au, RequirementNode as av, RequirementPriority as aw, RequirementRisk as ax, RequirementType as ay, RerankingConfig as az, DecisionPacket as b, TicketProviderKind as b1, TicketWriteBackMode as b2, VerificationCase as b3, VerificationPluginConfig as b4, PlanningManifest as c, DecisionIntent as d, DecisionOption as e, DecisionStatus as f, DecisionHumanResponse as g, PlanningCostEntry as h, PlanningLane as i, PlanningCostLog as j, CoverageOverlayEntry as k, ManifestDelta as l, ExecutionSlice as m, DocTarget as n, SliceFullSuiteCheck as o, ManifestClassification as p, IntelligenceContext as q, ModuleHealthMetrics as r, ModuleHealthProfile as s, PlanVsActualSnapshot as t, PlanVsActualDiff as u, CompiledRulesStore as v, AdaptiveRetrievalConfig as w, AppPreviewConfig as x, AutoResolveConfirmation as y, BenchmarkEvalConfig as z };
