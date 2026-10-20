import { TicketProviderKind } from '../index.js';
import '../introspection-CLBqo7wO.js';

declare function detectTicketRefs(prompt: string, kind: TicketProviderKind): string[];
declare function parseBranchTickets(branch: string | null | undefined): string[];
declare function armIntakeNarration(refs: readonly string[]): string;

export { armIntakeNarration, detectTicketRefs, parseBranchTickets };
