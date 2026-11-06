import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  unresolvedStageAgent
} from "./chunk-X7QSRLMR.js";
import {
  isHighTableAgent,
  stageForAgentName,
  stripPluginAgentNamespace
} from "./chunk-G4TAWNZH.js";
import {
  init_esm_shims
} from "./chunk-EMKBJVIL.js";

// src/stage-isolation/bash-write-guard.ts
init_esm_shims();
import { tmpdir } from "os";
import * as nodePath from "path";
import { resolve } from "path";
var READ_ONLY_STAGES = [
  "planning",
  "specification",
  "review",
  "checks"
];
var HIGH_TABLE_WRITE_ROOT = ".paqad/tmp/high-table/";
var STAGE_SCRATCH_ROOT = ".paqad/tmp/";
function readOnlyAgentScope(agentType) {
  if (typeof agentType !== "string") return null;
  const agent = stripPluginAgentNamespace(agentType.trim());
  if (isHighTableAgent(agent)) {
    return { agent, allowedRoots: [HIGH_TABLE_WRITE_ROOT], allowTempDir: false };
  }
  const stage = stageForAgentName(agent);
  if (stage === null || !READ_ONLY_STAGES.includes(stage)) return null;
  return { agent, allowedRoots: [STAGE_SCRATCH_ROOT], allowTempDir: true };
}
var REDIRECT_OUT = /^(?:\d*>>?|\d*>\||&>>?)$/u;
var SEPARATORS = /* @__PURE__ */ new Set([";", "&&", "||", "|", "&", "\n", "(", ")"]);
function readHeredocDelimiter(source, start) {
  let index = start;
  while (source[index] === " " || source[index] === "	") index += 1;
  let word = "";
  while (index < source.length && !/[\s;&|<>()]/u.test(source[index])) {
    const char = source[index];
    if (char !== "'" && char !== '"' && char !== "\\") word += char;
    index += 1;
  }
  return { word, end: index };
}
function skipHeredocBody(source, start, delimiter, dash) {
  let index = source.indexOf("\n", start);
  if (index < 0) return source.length;
  index += 1;
  while (index < source.length) {
    const lineEnd = source.indexOf("\n", index);
    const end = lineEnd < 0 ? source.length : lineEnd;
    const line = source.slice(index, end);
    if ((dash ? line.replace(/^\t+/u, "") : line) === delimiter) {
      return lineEnd < 0 ? source.length : lineEnd;
    }
    index = end + 1;
  }
  return source.length;
}
function lexShell(source) {
  const tokens = [];
  const heredocs = [];
  let word = "";
  let dynamic = false;
  let inWord = false;
  const flush = () => {
    if (inWord) tokens.push({ kind: "word", text: word, dynamic });
    word = "";
    dynamic = false;
    inWord = false;
  };
  let index = 0;
  while (index < source.length) {
    const char = source[index];
    if (char === "\n") {
      flush();
      tokens.push({ kind: "op", text: "\n" });
      let next = index + 1;
      for (const heredoc of heredocs.splice(0)) {
        next = skipHeredocBody(source, next - 1, heredoc.delimiter, heredoc.dash) + 1;
      }
      index = next;
      continue;
    }
    if (char === " " || char === "	") {
      flush();
      index += 1;
      continue;
    }
    if (char === "#" && !inWord) {
      while (index < source.length && source[index] !== "\n") index += 1;
      continue;
    }
    if (char === "'") {
      const close = source.indexOf("'", index + 1);
      const end = close < 0 ? source.length : close;
      word += source.slice(index + 1, end);
      inWord = true;
      index = end + 1;
      continue;
    }
    if (char === '"') {
      index += 1;
      while (index < source.length && source[index] !== '"') {
        if (source[index] === "\\" && index + 1 < source.length) {
          word += source[index + 1];
          index += 2;
          continue;
        }
        if (source[index] === "$" || source[index] === "`") dynamic = true;
        word += source[index];
        index += 1;
      }
      inWord = true;
      index += 1;
      continue;
    }
    if (char === "\\" && index + 1 < source.length) {
      if (source[index + 1] !== "\n") word += source[index + 1];
      inWord = inWord || source[index + 1] !== "\n";
      index += 2;
      continue;
    }
    if (char === "<" && source.startsWith("<<", index) && !source.startsWith("<<<", index)) {
      flush();
      const dash = source[index + 2] === "-";
      const { word: delimiter, end } = readHeredocDelimiter(source, index + (dash ? 3 : 2));
      heredocs.push({ delimiter, dash });
      tokens.push({ kind: "op", text: "<<" });
      index = end;
      continue;
    }
    if (char === ">" || char === "<" || char === "&" && source[index + 1] === ">") {
      const fd = /^\d+$/u.test(word) && inWord ? word : "";
      if (fd !== "") {
        word = "";
        inWord = false;
      } else {
        flush();
      }
      const match = /^(?:&>>?|>>|>\||>&|<&|<<<|<>|>|<)/u.exec(source.slice(index))[0];
      index += match.length;
      if (match === ">&" || match === "<&") {
        const target = /^\s*([^\s;&|<>()]+)/u.exec(source.slice(index));
        if (target && /^(?:\d+|-)$/u.test(target[1])) {
          index += target[0].length;
          continue;
        }
        tokens.push({ kind: "op", text: `${fd}>` });
        continue;
      }
      tokens.push({ kind: "op", text: `${fd}${match}` });
      continue;
    }
    if (char === ";" || char === "|" || char === "&" || char === "(" || char === ")") {
      flush();
      const two = source.slice(index, index + 2);
      if (two === "&&" || two === "||" || two === ";;") {
        tokens.push({ kind: "op", text: two === ";;" ? ";" : two });
        index += 2;
        continue;
      }
      tokens.push({ kind: "op", text: char });
      index += 1;
      continue;
    }
    if (char === "$" || char === "`" || char === "*" || char === "?" || char === "[") {
      dynamic = true;
    }
    word += char;
    inWord = true;
    index += 1;
  }
  flush();
  return tokens;
}
var WRAPPERS = /* @__PURE__ */ new Set([
  "sudo",
  "env",
  "command",
  "nohup",
  "time",
  "nice",
  "exec",
  "xargs"
]);
var ALL_ARGS = /* @__PURE__ */ new Set(["rm", "rmdir", "unlink", "touch", "mkdir", "truncate", "shred", "mv"]);
var LAST_ARG = /* @__PURE__ */ new Set(["cp", "install", "ln", "rsync", "scp"]);
var AFTER_FIRST = /* @__PURE__ */ new Set(["chmod", "chown", "chgrp"]);
var GIT_WRITES = /* @__PURE__ */ new Set([
  "add",
  "am",
  "apply",
  "checkout",
  "cherry-pick",
  "clean",
  "commit",
  "merge",
  "mv",
  "pull",
  "rebase",
  "reset",
  "restore",
  "revert",
  "rm",
  "stash",
  "switch"
]);
function operands(words) {
  return words.filter((word) => !word.text.startsWith("-") || word.dynamic);
}
function isWriteCommand(name) {
  return name === "tee" || name === "dd" || ALL_ARGS.has(name) || LAST_ARG.has(name) || AFTER_FIRST.has(name);
}
function commandWrites(words) {
  let start = 0;
  let viaXargs = false;
  while (start < words.length) {
    const text = words[start].text;
    if (/^[A-Za-z_][A-Za-z0-9_]*=/u.test(text) || WRAPPERS.has(text)) {
      if (text === "xargs") viaXargs = true;
      start += 1;
      continue;
    }
    if (viaXargs && text.startsWith("-")) {
      start += 1;
      continue;
    }
    break;
  }
  const head = words[start];
  if (!head) return [];
  if (/[$`]/u.test(head.text)) return [null];
  const name = head.text.split("/").pop() ?? head.text;
  const rest = words.slice(start + 1);
  if (viaXargs && isWriteCommand(name)) return [null];
  if (name === "tee") return operands(rest);
  if (ALL_ARGS.has(name)) return operands(rest);
  if (LAST_ARG.has(name)) {
    const args = operands(rest);
    return args.length > 0 ? [args[args.length - 1]] : [];
  }
  if (AFTER_FIRST.has(name)) return operands(rest).slice(1);
  if (name === "dd") {
    return rest.filter((word) => word.text.startsWith("of=")).map((word) => ({ ...word, text: word.text.slice(3) }));
  }
  if (name === "sed" || name === "perl") {
    const inPlace = rest.some(
      (word) => word.text === "--in-place" || word.text.startsWith("--in-place=") || /^-[a-zA-Z]*i/u.test(word.text)
    );
    if (!inPlace) return [];
    const scripted = rest.some((word) => word.text === "-e" || word.text === "-f");
    const args = operands(rest);
    return scripted ? args : args.slice(1);
  }
  if (name === "patch") return [null];
  if (name === "git") {
    const sub = operands(rest).find((word) => !word.text.startsWith("-"));
    return sub && GIT_WRITES.has(sub.text) ? [null] : [];
  }
  return [];
}
function bashWrites(command, cwd) {
  const tokens = lexShell(command);
  const writes = [];
  let current = cwd;
  let words = [];
  const endCommand = () => {
    const head = words.find((word) => !/^[A-Za-z_][A-Za-z0-9_]*=/u.test(word.text));
    if (head?.text === "cd") {
      const target = words[words.indexOf(head) + 1];
      current = target === void 0 ? null : target.dynamic || target.text === "-" || current === null ? null : resolve(current, target.text.replace(/^~(?=\/|$)/u, process.env.HOME ?? "~"));
    } else {
      for (const word of commandWrites(words)) {
        writes.push({ target: word === null || word.dynamic ? null : word.text, cwd: current });
      }
    }
    words = [];
  };
  for (let index = 0; index < tokens.length; index += 1) {
    const token = tokens[index];
    if (token.kind === "word") {
      words.push(token);
      continue;
    }
    if (REDIRECT_OUT.test(token.text)) {
      const next = tokens[index + 1];
      if (next?.kind === "word") {
        writes.push({ target: next.dynamic ? null : next.text, cwd: current });
        index += 1;
      } else {
        writes.push({ target: null, cwd: current });
      }
      continue;
    }
    if (token.text === "<" || token.text === "<<<" || token.text === "<>") {
      if (token.text === "<>") writes.push({ target: null, cwd: current });
      if (tokens[index + 1]?.kind === "word") index += 1;
      continue;
    }
    if (token.text === "<<") continue;
    if (SEPARATORS.has(token.text)) endCommand();
  }
  endCommand();
  return writes;
}
var DEVICE_TARGETS = /^\/dev\/(?:null|stdout|stderr|tty|fd\/\d+)$/u;
var WINDOWS_NULL_DEVICE = /^nul(?::)?$/iu;
var BASH_TEMP_DIR = /^\/tmp(?:\/|$)/u;
function defaultHost() {
  return { path: nodePath, tmpdir: tmpdir(), home: process.env.HOME };
}
function under(path, child, root) {
  const rel = path.relative(root, child);
  return rel === "" || !rel.startsWith("..") && !path.isAbsolute(rel);
}
function isDeviceTarget(target) {
  return DEVICE_TARGETS.test(target) || WINDOWS_NULL_DEVICE.test(target);
}
function writeAllowed(scope, projectRoot, write, host = defaultHost()) {
  if (write.target === null || write.cwd === null || write.target === "") return false;
  const target = write.target.replace(/^~(?=\/|$)/u, host.home ?? "~");
  if (isDeviceTarget(target)) return true;
  const { path } = host;
  const abs = path.resolve(write.cwd, target);
  if (isDeviceTarget(abs)) return true;
  const root = path.resolve(projectRoot);
  if (under(path, abs, root)) {
    const rel = path.relative(root, abs).split(path.sep).join("/");
    return scope.allowedRoots.some((allowed) => `${rel}/`.startsWith(allowed));
  }
  if (!scope.allowTempDir) return false;
  if (BASH_TEMP_DIR.test(target) && !target.split("/").includes("..")) return true;
  return [host.tmpdir, "/tmp"].some((dir) => under(path, abs, path.resolve(dir)));
}
var EDIT_TOOLS = /* @__PURE__ */ new Set(["Edit", "Write", "NotebookEdit", "MultiEdit"]);
var ALLOW = { blocked: false, agent: null, target: null };
function scopeFor(input) {
  const scope = readOnlyAgentScope(input.agentType);
  if (scope !== null || input.toolName !== "Bash") return scope;
  const unresolved = unresolvedStageAgent(input.agentType);
  return unresolved === null ? null : { agent: unresolved, allowedRoots: [], allowTempDir: false };
}
function stageAgentWriteDecision(input) {
  const scope = scopeFor(input);
  if (scope === null) return ALLOW;
  const cwd = input.cwd ?? input.projectRoot;
  let writes;
  if (input.toolName === "Bash") {
    if (typeof input.command !== "string") {
      return { blocked: true, agent: scope.agent, target: null };
    }
    writes = bashWrites(input.command, cwd);
  } else if (input.toolName !== void 0 && EDIT_TOOLS.has(input.toolName)) {
    const targets = input.targets ?? [];
    writes = targets.length === 0 ? [{ target: null, cwd }] : targets.map((target) => ({ target, cwd }));
  } else {
    return ALLOW;
  }
  const denied = writes.find((write) => !writeAllowed(scope, input.projectRoot, write));
  if (denied === void 0) return { blocked: false, agent: scope.agent, target: null };
  return { blocked: true, agent: scope.agent, target: denied.target };
}
function formatStageAgentWriteSummary(decision) {
  const scope = readOnlyAgentScope(decision.agent);
  const where = scope === null ? "nowhere, because no paqad stage matches it" : isHighTableAgent(scope.agent) ? `\`${HIGH_TABLE_WRITE_ROOT}\`` : `\`${STAGE_SCRATCH_ROOT}\` or the system temp folder`;
  const target = decision.target === null ? "a file paqad cannot resolve" : `\`${decision.target}\``;
  return `**\u25B8 paqad** \xB7 write blocked: \`${decision.agent ?? "this agent"}\` is read-only
> \u{1F534} Needs your attention \u2014 \`${decision.agent ?? "this agent"}\` tried to write ${target}. It may write only under ${where}; record the stage result with its paqad-ai verb instead.`;
}

export {
  READ_ONLY_STAGES,
  HIGH_TABLE_WRITE_ROOT,
  STAGE_SCRATCH_ROOT,
  readOnlyAgentScope,
  lexShell,
  bashWrites,
  writeAllowed,
  stageAgentWriteDecision,
  formatStageAgentWriteSummary
};
