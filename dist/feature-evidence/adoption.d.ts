import { S as SessionLedgerRow } from '../ledger-DjtUKw_R.js';

declare function isBundleMaterialized(projectRoot: string, dirName: string): boolean;
declare function isBundleClosed(projectRoot: string, dirName: string): boolean;
declare function featureBranch(projectRoot: string, dirName: string, rows?: SessionLedgerRow[]): string | null;
declare function listAdoptableFeatures(projectRoot: string, branch: string | null): string[];
declare function listInFlightFeatures(projectRoot: string): string[];
declare function sessionClosedAnyFeature(projectRoot: string, sessionId: string): boolean;
declare function sessionReattachableFeature(projectRoot: string, sessionId: string, branch: string | null): string | null;
declare function reconcileSessionControl(projectRoot: string, sessionId: string, now?: () => Date): string | null;
declare function adoptableInFlightOnBranch(projectRoot: string, sessionId: string, now?: () => Date): string[];

export { adoptableInFlightOnBranch, featureBranch, isBundleClosed, isBundleMaterialized, listAdoptableFeatures, listInFlightFeatures, reconcileSessionControl, sessionClosedAnyFeature, sessionReattachableFeature };
