import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);

// src/planning/ticket-ref-detect.ts
var JIRA_REF = /\b[A-Z][A-Z0-9]+-\d+\b/g;
var GITHUB_REF = /(?<![\w/])#(\d+)\b/g;
function patternsFor(kind) {
  switch (kind) {
    case "github-issues":
      return [GITHUB_REF];
    case "jira":
    case "linear":
      return [JIRA_REF];
    default:
      return [JIRA_REF, GITHUB_REF];
  }
}
function detectTicketRefs(prompt, kind) {
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  for (const pattern of patternsFor(kind)) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(prompt)) !== null) {
      const ref = match[0];
      if (!seen.has(ref)) {
        seen.add(ref);
        out.push(ref);
      }
    }
  }
  return out;
}
var BRANCH_NUMBERS = /^(\d+(?:-\d+)*)(?=-|$)/;
function parseBranchTickets(branch) {
  if (!branch) return [];
  const leaf = branch.split("/").filter(Boolean).at(-1) ?? "";
  const out = detectTicketRefs(leaf, "jira");
  const numbers = BRANCH_NUMBERS.exec(leaf);
  if (numbers) {
    for (const n of numbers[1].split("-")) {
      const ref = `#${Number(n)}`;
      if (!out.includes(ref)) out.push(ref);
    }
  }
  return out;
}
function armIntakeNarration(refs) {
  if (refs.length === 0) return "";
  const first = refs[0];
  const list = refs.join(", ");
  return `**\u25B8 paqad** \xB7 detected a ticket reference (${list})
> Ground the work in the real ticket: run \`paqad-ai intake fetch ${first}\` so I build what it actually says, not a guess from the id.`;
}
export {
  armIntakeNarration,
  detectTicketRefs,
  parseBranchTickets
};
//# sourceMappingURL=ticket-ref-detect.js.map