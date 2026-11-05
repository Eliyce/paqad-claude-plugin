type FeatureLane = 'fast' | 'graduated' | 'full' | null;
type FeatureStatus = 'active' | 'paused' | 'done' | 'spec-only' | 'abandoned';
type FeatureChangeKind = 'fix' | 'other';
type FeatureLaneSource = 'classifier' | 'manual' | 'plan';
type AuthoringPathKind = 'skill' | 'agent';
interface AuthoringMatchedPath {
    kind: AuthoringPathKind;
    path: string;
}

export type { AuthoringMatchedPath as A, FeatureChangeKind as F, FeatureLane as a, FeatureStatus as b, FeatureLaneSource as c };
