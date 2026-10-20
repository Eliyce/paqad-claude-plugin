import { C as CostHookPayload } from '../change-cost-BP38eC_A.js';

interface RefreshChangeCostInput {
    projectRoot: string;
    payload: CostHookPayload;
    now?: () => Date;
}
type RefreshChangeCostOutcome = 'written' | 'no-feature' | 'no-window' | 'no-sources';
declare function refreshChangeCostFromHook(input: RefreshChangeCostInput): RefreshChangeCostOutcome;

export { refreshChangeCostFromHook };
export type { RefreshChangeCostInput, RefreshChangeCostOutcome };
