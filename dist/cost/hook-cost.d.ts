import { C as CostHookPayload } from '../change-cost-wxi_e6ZH.js';

interface RefreshChangeCostInput {
    projectRoot: string;
    payload: CostHookPayload;
    now?: () => Date;
}
type RefreshChangeCostOutcome = 'written' | 'no-feature' | 'no-window' | 'no-sources';
declare function refreshChangeCostFromHook(input: RefreshChangeCostInput): RefreshChangeCostOutcome;

export { refreshChangeCostFromHook };
export type { RefreshChangeCostInput, RefreshChangeCostOutcome };
