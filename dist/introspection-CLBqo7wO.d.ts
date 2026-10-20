declare const DOMAINS: readonly ["coding", "content"];
type Domain = (typeof DOMAINS)[number];
declare const STACKS: readonly ["laravel", "flutter", "react", "vue", "django", "fastapi", "rails", "spring-boot", "express", "angular", "svelte", "astro", "go-web", "rust-web", "dotnet", "nextjs", "flask", "nestjs", "kotlin-android", "node-cli", "node-library", "node-service", "short-video"];
type Stack = (typeof STACKS)[number];
declare const CAPABILITIES: readonly ["inertia", "vue", "react", "tailwind", "boost", "pest", "phpunit", "docker", "compose", "sail", "next", "remix", "vite-spa", "gatsby", "nuxt", "quasar", "blazor", "ef-core", "minimal-api", "mvc", "razor-pages", "signalr", "azure", "identity", "app-router", "pages-router", "prisma", "trpc", "next-auth", "sqlalchemy", "celery", "blueprints", "flask-login", "flask-restx", "gunicorn", "typeorm", "graphql", "microservices", "swagger", "passport", "fastify", "jetpack-compose", "room", "hilt", "retrofit", "coroutines", "navigation", "datastore"];
type Capability = (typeof CAPABILITIES)[number];
declare const ACTIVE_CAPABILITIES: readonly ["content", "coding", "planning", "security"];
type ActiveCapability = (typeof ACTIVE_CAPABILITIES)[number];
interface DomainStackMapping {
    coding: 'laravel' | 'flutter' | 'react' | 'vue' | 'django' | 'fastapi' | 'rails' | 'spring-boot' | 'express' | 'angular' | 'svelte' | 'astro' | 'go-web' | 'rust-web' | 'dotnet' | 'nextjs' | 'flask' | 'nestjs' | 'kotlin-android';
    content: 'short-video';
}
declare const DOMAIN_STACK_MAP: Record<Domain, readonly Stack[]>;
declare const STACK_CAPABILITIES_MAP: Record<Stack, readonly Capability[]>;

type RepositoryProjectRole = 'standalone' | 'component';
interface RepositoryProjectCandidate {
    root: string;
    role: RepositoryProjectRole;
    parent_root: string | null;
    markers: string[];
    ecosystems: StackEcosystem[];
}
interface RepositoryApplication {
    root: string;
    component_roots: string[];
}
interface RepositoryContext {
    selected_root: string;
    scan_max_depth: number;
    ignored_paths: string[];
    projects: RepositoryProjectCandidate[];
    applications: RepositoryApplication[];
    primary_project_root: string | null;
}

declare const STACK_ECOSYSTEMS: readonly ["node", "php", "python", "ruby", "jvm", "go", "rust", "dart"];
type StackEcosystem = (typeof STACK_ECOSYSTEMS)[number];
type StackProfileSourceKind = 'manifest' | 'lockfile' | 'config' | 'heuristic' | 'fallback';
interface ToolchainInfo {
    ecosystem: StackEcosystem;
    package_manager: string;
    lockfile: string;
}
interface InstalledPackage {
    name: string;
    version_constraint: string;
    locked_version: string;
    ecosystem: StackEcosystem;
    is_dev: boolean;
    root?: string;
}
interface StackSourceReference {
    file: string;
    kind: StackProfileSourceKind;
    detail: string;
}
interface VersionBand {
    name: string;
    package_name: string;
    range: string;
    locked_version: string;
    source: 'lockfile' | 'manifest';
}
interface DetectedStackProfile {
    frameworks: string[];
    traits: string[];
    toolchains: ToolchainInfo[];
    version_bands: VersionBand[];
    sources: StackSourceReference[];
}
interface StackSnapshot {
    generated_at: string;
    source_hashes: Record<string, string>;
    toolchains: ToolchainInfo[];
    packages: InstalledPackage[];
    profile: DetectedStackProfile;
    repository?: RepositoryContext;
}
interface StackDriftChange {
    type: 'framework-added' | 'framework-removed' | 'trait-added' | 'trait-removed' | 'version-band-changed' | 'toolchain-changed';
    key: string;
    before?: string;
    after?: string;
}
interface StackDriftReport {
    generated_at: string;
    status: 'no-drift' | 'drift-detected';
    previous_profile: DetectedStackProfile | null;
    current_profile: DetectedStackProfile;
    material_changes: StackDriftChange[];
    newly_active_rule_bands: string[];
    newly_inactive_rule_bands: string[];
    review_targets: string[];
}

export { ACTIVE_CAPABILITIES as f, CAPABILITIES as g, DOMAINS as h, DOMAIN_STACK_MAP as i, STACKS as k, STACK_CAPABILITIES_MAP as l, STACK_ECOSYSTEMS as m };
export type { ActiveCapability as A, Capability as C, Domain as D, InstalledPackage as I, RepositoryContext as R, Stack as S, ToolchainInfo as T, VersionBand as V, StackSourceReference as a, DetectedStackProfile as b, StackDriftReport as c, StackEcosystem as d, StackSnapshot as e, DomainStackMapping as j, StackDriftChange as n, StackProfileSourceKind as o };
