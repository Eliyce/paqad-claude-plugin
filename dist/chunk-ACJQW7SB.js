import { createRequire as __paqadCreateRequire } from 'module'; const require = __paqadCreateRequire(import.meta.url);
import {
  DEFAULT_TRACKER_PATTERNS,
  NOT_A_SETTING_LINE,
  TEAM_FILE_SCHEMA_VERSION,
  defaultGitWorkflow,
  isHigherStamp,
  isNewerTeamFile,
  newerTeamFileLine,
  readTeamFileStamp,
  renderWriteBlock,
  swapTeamFileStamp
} from "./chunk-YA6SCYMC.js";
import {
  PATHS
} from "./chunk-IHMBVS6H.js";
import {
  __commonJS,
  __require,
  __toESM,
  init_esm_shims
} from "./chunk-IDFRWBMN.js";

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/codegen/code.js
var require_code = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/codegen/code.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.regexpCode = exports.getEsmExportName = exports.getProperty = exports.safeStringify = exports.stringify = exports.strConcat = exports.addCodeArg = exports.str = exports._ = exports.nil = exports._Code = exports.Name = exports.IDENTIFIER = exports._CodeOrName = void 0;
    var _CodeOrName = class {
    };
    exports._CodeOrName = _CodeOrName;
    exports.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
    var Name = class extends _CodeOrName {
      constructor(s) {
        super();
        if (!exports.IDENTIFIER.test(s))
          throw new Error("CodeGen: name must be a valid identifier");
        this.str = s;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        return false;
      }
      get names() {
        return { [this.str]: 1 };
      }
    };
    exports.Name = Name;
    var _Code = class extends _CodeOrName {
      constructor(code) {
        super();
        this._items = typeof code === "string" ? [code] : code;
      }
      toString() {
        return this.str;
      }
      emptyStr() {
        if (this._items.length > 1)
          return false;
        const item = this._items[0];
        return item === "" || item === '""';
      }
      get str() {
        var _a;
        return (_a = this._str) !== null && _a !== void 0 ? _a : this._str = this._items.reduce((s, c) => `${s}${c}`, "");
      }
      get names() {
        var _a;
        return (_a = this._names) !== null && _a !== void 0 ? _a : this._names = this._items.reduce((names, c) => {
          if (c instanceof Name)
            names[c.str] = (names[c.str] || 0) + 1;
          return names;
        }, {});
      }
    };
    exports._Code = _Code;
    exports.nil = new _Code("");
    function _(strs, ...args) {
      const code = [strs[0]];
      let i = 0;
      while (i < args.length) {
        addCodeArg(code, args[i]);
        code.push(strs[++i]);
      }
      return new _Code(code);
    }
    exports._ = _;
    var plus = new _Code("+");
    function str(strs, ...args) {
      const expr = [safeStringify(strs[0])];
      let i = 0;
      while (i < args.length) {
        expr.push(plus);
        addCodeArg(expr, args[i]);
        expr.push(plus, safeStringify(strs[++i]));
      }
      optimize(expr);
      return new _Code(expr);
    }
    exports.str = str;
    function addCodeArg(code, arg) {
      if (arg instanceof _Code)
        code.push(...arg._items);
      else if (arg instanceof Name)
        code.push(arg);
      else
        code.push(interpolate(arg));
    }
    exports.addCodeArg = addCodeArg;
    function optimize(expr) {
      let i = 1;
      while (i < expr.length - 1) {
        if (expr[i] === plus) {
          const res = mergeExprItems(expr[i - 1], expr[i + 1]);
          if (res !== void 0) {
            expr.splice(i - 1, 3, res);
            continue;
          }
          expr[i++] = "+";
        }
        i++;
      }
    }
    function mergeExprItems(a, b) {
      if (b === '""')
        return a;
      if (a === '""')
        return b;
      if (typeof a == "string") {
        if (b instanceof Name || a[a.length - 1] !== '"')
          return;
        if (typeof b != "string")
          return `${a.slice(0, -1)}${b}"`;
        if (b[0] === '"')
          return a.slice(0, -1) + b.slice(1);
        return;
      }
      if (typeof b == "string" && b[0] === '"' && !(a instanceof Name))
        return `"${a}${b.slice(1)}`;
      return;
    }
    function strConcat(c1, c2) {
      return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str`${c1}${c2}`;
    }
    exports.strConcat = strConcat;
    function interpolate(x) {
      return typeof x == "number" || typeof x == "boolean" || x === null ? x : safeStringify(Array.isArray(x) ? x.join(",") : x);
    }
    function stringify(x) {
      return new _Code(safeStringify(x));
    }
    exports.stringify = stringify;
    function safeStringify(x) {
      return JSON.stringify(x).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
    }
    exports.safeStringify = safeStringify;
    function getProperty(key) {
      return typeof key == "string" && exports.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _`[${key}]`;
    }
    exports.getProperty = getProperty;
    function getEsmExportName(key) {
      if (typeof key == "string" && exports.IDENTIFIER.test(key)) {
        return new _Code(`${key}`);
      }
      throw new Error(`CodeGen: invalid export name: ${key}, use explicit $id name mapping`);
    }
    exports.getEsmExportName = getEsmExportName;
    function regexpCode(rx) {
      return new _Code(rx.toString());
    }
    exports.regexpCode = regexpCode;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/codegen/scope.js
var require_scope = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/codegen/scope.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ValueScope = exports.ValueScopeName = exports.Scope = exports.varKinds = exports.UsedValueState = void 0;
    var code_1 = require_code();
    var ValueError = class extends Error {
      constructor(name) {
        super(`CodeGen: "code" for ${name} not defined`);
        this.value = name.value;
      }
    };
    var UsedValueState;
    (function(UsedValueState2) {
      UsedValueState2[UsedValueState2["Started"] = 0] = "Started";
      UsedValueState2[UsedValueState2["Completed"] = 1] = "Completed";
    })(UsedValueState || (exports.UsedValueState = UsedValueState = {}));
    exports.varKinds = {
      const: new code_1.Name("const"),
      let: new code_1.Name("let"),
      var: new code_1.Name("var")
    };
    var Scope = class {
      constructor({ prefixes, parent } = {}) {
        this._names = {};
        this._prefixes = prefixes;
        this._parent = parent;
      }
      toName(nameOrPrefix) {
        return nameOrPrefix instanceof code_1.Name ? nameOrPrefix : this.name(nameOrPrefix);
      }
      name(prefix) {
        return new code_1.Name(this._newName(prefix));
      }
      _newName(prefix) {
        const ng = this._names[prefix] || this._nameGroup(prefix);
        return `${prefix}${ng.index++}`;
      }
      _nameGroup(prefix) {
        var _a, _b;
        if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || this._prefixes && !this._prefixes.has(prefix)) {
          throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
        }
        return this._names[prefix] = { prefix, index: 0 };
      }
    };
    exports.Scope = Scope;
    var ValueScopeName = class extends code_1.Name {
      constructor(prefix, nameStr) {
        super(nameStr);
        this.prefix = prefix;
      }
      setValue(value, { property, itemIndex }) {
        this.value = value;
        this.scopePath = (0, code_1._)`.${new code_1.Name(property)}[${itemIndex}]`;
      }
    };
    exports.ValueScopeName = ValueScopeName;
    var line = (0, code_1._)`\n`;
    var ValueScope = class extends Scope {
      constructor(opts) {
        super(opts);
        this._values = {};
        this._scope = opts.scope;
        this.opts = { ...opts, _n: opts.lines ? line : code_1.nil };
      }
      get() {
        return this._scope;
      }
      name(prefix) {
        return new ValueScopeName(prefix, this._newName(prefix));
      }
      value(nameOrPrefix, value) {
        var _a;
        if (value.ref === void 0)
          throw new Error("CodeGen: ref must be passed in value");
        const name = this.toName(nameOrPrefix);
        const { prefix } = name;
        const valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref;
        let vs = this._values[prefix];
        if (vs) {
          const _name = vs.get(valueKey);
          if (_name)
            return _name;
        } else {
          vs = this._values[prefix] = /* @__PURE__ */ new Map();
        }
        vs.set(valueKey, name);
        const s = this._scope[prefix] || (this._scope[prefix] = []);
        const itemIndex = s.length;
        s[itemIndex] = value.ref;
        name.setValue(value, { property: prefix, itemIndex });
        return name;
      }
      getValue(prefix, keyOrRef) {
        const vs = this._values[prefix];
        if (!vs)
          return;
        return vs.get(keyOrRef);
      }
      scopeRefs(scopeName, values = this._values) {
        return this._reduceValues(values, (name) => {
          if (name.scopePath === void 0)
            throw new Error(`CodeGen: name "${name}" has no value`);
          return (0, code_1._)`${scopeName}${name.scopePath}`;
        });
      }
      scopeCode(values = this._values, usedValues, getCode) {
        return this._reduceValues(values, (name) => {
          if (name.value === void 0)
            throw new Error(`CodeGen: name "${name}" has no value`);
          return name.value.code;
        }, usedValues, getCode);
      }
      _reduceValues(values, valueCode, usedValues = {}, getCode) {
        let code = code_1.nil;
        for (const prefix in values) {
          const vs = values[prefix];
          if (!vs)
            continue;
          const nameSet = usedValues[prefix] = usedValues[prefix] || /* @__PURE__ */ new Map();
          vs.forEach((name) => {
            if (nameSet.has(name))
              return;
            nameSet.set(name, UsedValueState.Started);
            let c = valueCode(name);
            if (c) {
              const def = this.opts.es5 ? exports.varKinds.var : exports.varKinds.const;
              code = (0, code_1._)`${code}${def} ${name} = ${c};${this.opts._n}`;
            } else if (c = getCode === null || getCode === void 0 ? void 0 : getCode(name)) {
              code = (0, code_1._)`${code}${c}${this.opts._n}`;
            } else {
              throw new ValueError(name);
            }
            nameSet.set(name, UsedValueState.Completed);
          });
        }
        return code;
      }
    };
    exports.ValueScope = ValueScope;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/codegen/index.js
var require_codegen = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/codegen/index.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.or = exports.and = exports.not = exports.CodeGen = exports.operators = exports.varKinds = exports.ValueScopeName = exports.ValueScope = exports.Scope = exports.Name = exports.regexpCode = exports.stringify = exports.getProperty = exports.nil = exports.strConcat = exports.str = exports._ = void 0;
    var code_1 = require_code();
    var scope_1 = require_scope();
    var code_2 = require_code();
    Object.defineProperty(exports, "_", { enumerable: true, get: function() {
      return code_2._;
    } });
    Object.defineProperty(exports, "str", { enumerable: true, get: function() {
      return code_2.str;
    } });
    Object.defineProperty(exports, "strConcat", { enumerable: true, get: function() {
      return code_2.strConcat;
    } });
    Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
      return code_2.nil;
    } });
    Object.defineProperty(exports, "getProperty", { enumerable: true, get: function() {
      return code_2.getProperty;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return code_2.stringify;
    } });
    Object.defineProperty(exports, "regexpCode", { enumerable: true, get: function() {
      return code_2.regexpCode;
    } });
    Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
      return code_2.Name;
    } });
    var scope_2 = require_scope();
    Object.defineProperty(exports, "Scope", { enumerable: true, get: function() {
      return scope_2.Scope;
    } });
    Object.defineProperty(exports, "ValueScope", { enumerable: true, get: function() {
      return scope_2.ValueScope;
    } });
    Object.defineProperty(exports, "ValueScopeName", { enumerable: true, get: function() {
      return scope_2.ValueScopeName;
    } });
    Object.defineProperty(exports, "varKinds", { enumerable: true, get: function() {
      return scope_2.varKinds;
    } });
    exports.operators = {
      GT: new code_1._Code(">"),
      GTE: new code_1._Code(">="),
      LT: new code_1._Code("<"),
      LTE: new code_1._Code("<="),
      EQ: new code_1._Code("==="),
      NEQ: new code_1._Code("!=="),
      NOT: new code_1._Code("!"),
      OR: new code_1._Code("||"),
      AND: new code_1._Code("&&"),
      ADD: new code_1._Code("+")
    };
    var Node = class {
      optimizeNodes() {
        return this;
      }
      optimizeNames(_names, _constants) {
        return this;
      }
    };
    var Def = class extends Node {
      constructor(varKind, name, rhs) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.rhs = rhs;
      }
      render({ es5, _n }) {
        const varKind = es5 ? scope_1.varKinds.var : this.varKind;
        const rhs = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
        return `${varKind} ${this.name}${rhs};` + _n;
      }
      optimizeNames(names, constants) {
        if (!names[this.name.str])
          return;
        if (this.rhs)
          this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
      }
      get names() {
        return this.rhs instanceof code_1._CodeOrName ? this.rhs.names : {};
      }
    };
    var Assign = class extends Node {
      constructor(lhs, rhs, sideEffects) {
        super();
        this.lhs = lhs;
        this.rhs = rhs;
        this.sideEffects = sideEffects;
      }
      render({ _n }) {
        return `${this.lhs} = ${this.rhs};` + _n;
      }
      optimizeNames(names, constants) {
        if (this.lhs instanceof code_1.Name && !names[this.lhs.str] && !this.sideEffects)
          return;
        this.rhs = optimizeExpr(this.rhs, names, constants);
        return this;
      }
      get names() {
        const names = this.lhs instanceof code_1.Name ? {} : { ...this.lhs.names };
        return addExprNames(names, this.rhs);
      }
    };
    var AssignOp = class extends Assign {
      constructor(lhs, op, rhs, sideEffects) {
        super(lhs, rhs, sideEffects);
        this.op = op;
      }
      render({ _n }) {
        return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
      }
    };
    var Label = class extends Node {
      constructor(label) {
        super();
        this.label = label;
        this.names = {};
      }
      render({ _n }) {
        return `${this.label}:` + _n;
      }
    };
    var Break = class extends Node {
      constructor(label) {
        super();
        this.label = label;
        this.names = {};
      }
      render({ _n }) {
        const label = this.label ? ` ${this.label}` : "";
        return `break${label};` + _n;
      }
    };
    var Throw = class extends Node {
      constructor(error) {
        super();
        this.error = error;
      }
      render({ _n }) {
        return `throw ${this.error};` + _n;
      }
      get names() {
        return this.error.names;
      }
    };
    var AnyCode = class extends Node {
      constructor(code) {
        super();
        this.code = code;
      }
      render({ _n }) {
        return `${this.code};` + _n;
      }
      optimizeNodes() {
        return `${this.code}` ? this : void 0;
      }
      optimizeNames(names, constants) {
        this.code = optimizeExpr(this.code, names, constants);
        return this;
      }
      get names() {
        return this.code instanceof code_1._CodeOrName ? this.code.names : {};
      }
    };
    var ParentNode = class extends Node {
      constructor(nodes = []) {
        super();
        this.nodes = nodes;
      }
      render(opts) {
        return this.nodes.reduce((code, n) => code + n.render(opts), "");
      }
      optimizeNodes() {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
          const n = nodes[i].optimizeNodes();
          if (Array.isArray(n))
            nodes.splice(i, 1, ...n);
          else if (n)
            nodes[i] = n;
          else
            nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : void 0;
      }
      optimizeNames(names, constants) {
        const { nodes } = this;
        let i = nodes.length;
        while (i--) {
          const n = nodes[i];
          if (n.optimizeNames(names, constants))
            continue;
          subtractNames(names, n.names);
          nodes.splice(i, 1);
        }
        return nodes.length > 0 ? this : void 0;
      }
      get names() {
        return this.nodes.reduce((names, n) => addNames(names, n.names), {});
      }
    };
    var BlockNode = class extends ParentNode {
      render(opts) {
        return "{" + opts._n + super.render(opts) + "}" + opts._n;
      }
    };
    var Root = class extends ParentNode {
    };
    var Else = class extends BlockNode {
    };
    Else.kind = "else";
    var If = class _If extends BlockNode {
      constructor(condition, nodes) {
        super(nodes);
        this.condition = condition;
      }
      render(opts) {
        let code = `if(${this.condition})` + super.render(opts);
        if (this.else)
          code += "else " + this.else.render(opts);
        return code;
      }
      optimizeNodes() {
        super.optimizeNodes();
        const cond = this.condition;
        if (cond === true)
          return this.nodes;
        let e = this.else;
        if (e) {
          const ns = e.optimizeNodes();
          e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
        }
        if (e) {
          if (cond === false)
            return e instanceof _If ? e : e.nodes;
          if (this.nodes.length)
            return this;
          return new _If(not(cond), e instanceof _If ? [e] : e.nodes);
        }
        if (cond === false || !this.nodes.length)
          return void 0;
        return this;
      }
      optimizeNames(names, constants) {
        var _a;
        this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        if (!(super.optimizeNames(names, constants) || this.else))
          return;
        this.condition = optimizeExpr(this.condition, names, constants);
        return this;
      }
      get names() {
        const names = super.names;
        addExprNames(names, this.condition);
        if (this.else)
          addNames(names, this.else.names);
        return names;
      }
    };
    If.kind = "if";
    var For = class extends BlockNode {
    };
    For.kind = "for";
    var ForLoop = class extends For {
      constructor(iteration) {
        super();
        this.iteration = iteration;
      }
      render(opts) {
        return `for(${this.iteration})` + super.render(opts);
      }
      optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants))
          return;
        this.iteration = optimizeExpr(this.iteration, names, constants);
        return this;
      }
      get names() {
        return addNames(super.names, this.iteration.names);
      }
    };
    var ForRange = class extends For {
      constructor(varKind, name, from, to) {
        super();
        this.varKind = varKind;
        this.name = name;
        this.from = from;
        this.to = to;
      }
      render(opts) {
        const varKind = opts.es5 ? scope_1.varKinds.var : this.varKind;
        const { name, from, to } = this;
        return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts);
      }
      get names() {
        const names = addExprNames(super.names, this.from);
        return addExprNames(names, this.to);
      }
    };
    var ForIter = class extends For {
      constructor(loop, varKind, name, iterable) {
        super();
        this.loop = loop;
        this.varKind = varKind;
        this.name = name;
        this.iterable = iterable;
      }
      render(opts) {
        return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts);
      }
      optimizeNames(names, constants) {
        if (!super.optimizeNames(names, constants))
          return;
        this.iterable = optimizeExpr(this.iterable, names, constants);
        return this;
      }
      get names() {
        return addNames(super.names, this.iterable.names);
      }
    };
    var Func = class extends BlockNode {
      constructor(name, args, async) {
        super();
        this.name = name;
        this.args = args;
        this.async = async;
      }
      render(opts) {
        const _async = this.async ? "async " : "";
        return `${_async}function ${this.name}(${this.args})` + super.render(opts);
      }
    };
    Func.kind = "func";
    var Return = class extends ParentNode {
      render(opts) {
        return "return " + super.render(opts);
      }
    };
    Return.kind = "return";
    var Try = class extends BlockNode {
      render(opts) {
        let code = "try" + super.render(opts);
        if (this.catch)
          code += this.catch.render(opts);
        if (this.finally)
          code += this.finally.render(opts);
        return code;
      }
      optimizeNodes() {
        var _a, _b;
        super.optimizeNodes();
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNodes();
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
        return this;
      }
      optimizeNames(names, constants) {
        var _a, _b;
        super.optimizeNames(names, constants);
        (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names, constants);
        (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names, constants);
        return this;
      }
      get names() {
        const names = super.names;
        if (this.catch)
          addNames(names, this.catch.names);
        if (this.finally)
          addNames(names, this.finally.names);
        return names;
      }
    };
    var Catch = class extends BlockNode {
      constructor(error) {
        super();
        this.error = error;
      }
      render(opts) {
        return `catch(${this.error})` + super.render(opts);
      }
    };
    Catch.kind = "catch";
    var Finally = class extends BlockNode {
      render(opts) {
        return "finally" + super.render(opts);
      }
    };
    Finally.kind = "finally";
    var CodeGen = class {
      constructor(extScope, opts = {}) {
        this._values = {};
        this._blockStarts = [];
        this._constants = {};
        this.opts = { ...opts, _n: opts.lines ? "\n" : "" };
        this._extScope = extScope;
        this._scope = new scope_1.Scope({ parent: extScope });
        this._nodes = [new Root()];
      }
      toString() {
        return this._root.render(this.opts);
      }
      // returns unique name in the internal scope
      name(prefix) {
        return this._scope.name(prefix);
      }
      // reserves unique name in the external scope
      scopeName(prefix) {
        return this._extScope.name(prefix);
      }
      // reserves unique name in the external scope and assigns value to it
      scopeValue(prefixOrName, value) {
        const name = this._extScope.value(prefixOrName, value);
        const vs = this._values[name.prefix] || (this._values[name.prefix] = /* @__PURE__ */ new Set());
        vs.add(name);
        return name;
      }
      getScopeValue(prefix, keyOrRef) {
        return this._extScope.getValue(prefix, keyOrRef);
      }
      // return code that assigns values in the external scope to the names that are used internally
      // (same names that were returned by gen.scopeName or gen.scopeValue)
      scopeRefs(scopeName) {
        return this._extScope.scopeRefs(scopeName, this._values);
      }
      scopeCode() {
        return this._extScope.scopeCode(this._values);
      }
      _def(varKind, nameOrPrefix, rhs, constant) {
        const name = this._scope.toName(nameOrPrefix);
        if (rhs !== void 0 && constant)
          this._constants[name.str] = rhs;
        this._leafNode(new Def(varKind, name, rhs));
        return name;
      }
      // `const` declaration (`var` in es5 mode)
      const(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
      }
      // `let` declaration with optional assignment (`var` in es5 mode)
      let(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
      }
      // `var` declaration with optional assignment
      var(nameOrPrefix, rhs, _constant) {
        return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
      }
      // assignment code
      assign(lhs, rhs, sideEffects) {
        return this._leafNode(new Assign(lhs, rhs, sideEffects));
      }
      // `+=` code
      add(lhs, rhs) {
        return this._leafNode(new AssignOp(lhs, exports.operators.ADD, rhs));
      }
      // appends passed SafeExpr to code or executes Block
      code(c) {
        if (typeof c == "function")
          c();
        else if (c !== code_1.nil)
          this._leafNode(new AnyCode(c));
        return this;
      }
      // returns code for object literal for the passed argument list of key-value pairs
      object(...keyValues) {
        const code = ["{"];
        for (const [key, value] of keyValues) {
          if (code.length > 1)
            code.push(",");
          code.push(key);
          if (key !== value || this.opts.es5) {
            code.push(":");
            (0, code_1.addCodeArg)(code, value);
          }
        }
        code.push("}");
        return new code_1._Code(code);
      }
      // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
      if(condition, thenBody, elseBody) {
        this._blockNode(new If(condition));
        if (thenBody && elseBody) {
          this.code(thenBody).else().code(elseBody).endIf();
        } else if (thenBody) {
          this.code(thenBody).endIf();
        } else if (elseBody) {
          throw new Error('CodeGen: "else" body without "then" body');
        }
        return this;
      }
      // `else if` clause - invalid without `if` or after `else` clauses
      elseIf(condition) {
        return this._elseNode(new If(condition));
      }
      // `else` clause - only valid after `if` or `else if` clauses
      else() {
        return this._elseNode(new Else());
      }
      // end `if` statement (needed if gen.if was used only with condition)
      endIf() {
        return this._endBlockNode(If, Else);
      }
      _for(node, forBody) {
        this._blockNode(node);
        if (forBody)
          this.code(forBody).endFor();
        return this;
      }
      // a generic `for` clause (or statement if `forBody` is passed)
      for(iteration, forBody) {
        return this._for(new ForLoop(iteration), forBody);
      }
      // `for` statement for a range of values
      forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
      }
      // `for-of` statement (in es5 mode replace with a normal for loop)
      forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
        const name = this._scope.toName(nameOrPrefix);
        if (this.opts.es5) {
          const arr = iterable instanceof code_1.Name ? iterable : this.var("_arr", iterable);
          return this.forRange("_i", 0, (0, code_1._)`${arr}.length`, (i) => {
            this.var(name, (0, code_1._)`${arr}[${i}]`);
            forBody(name);
          });
        }
        return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
      }
      // `for-in` statement.
      // With option `ownProperties` replaced with a `for-of` loop for object keys
      forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
        if (this.opts.ownProperties) {
          return this.forOf(nameOrPrefix, (0, code_1._)`Object.keys(${obj})`, forBody);
        }
        const name = this._scope.toName(nameOrPrefix);
        return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
      }
      // end `for` loop
      endFor() {
        return this._endBlockNode(For);
      }
      // `label` statement
      label(label) {
        return this._leafNode(new Label(label));
      }
      // `break` statement
      break(label) {
        return this._leafNode(new Break(label));
      }
      // `return` statement
      return(value) {
        const node = new Return();
        this._blockNode(node);
        this.code(value);
        if (node.nodes.length !== 1)
          throw new Error('CodeGen: "return" should have one node');
        return this._endBlockNode(Return);
      }
      // `try` statement
      try(tryBody, catchCode, finallyCode) {
        if (!catchCode && !finallyCode)
          throw new Error('CodeGen: "try" without "catch" and "finally"');
        const node = new Try();
        this._blockNode(node);
        this.code(tryBody);
        if (catchCode) {
          const error = this.name("e");
          this._currNode = node.catch = new Catch(error);
          catchCode(error);
        }
        if (finallyCode) {
          this._currNode = node.finally = new Finally();
          this.code(finallyCode);
        }
        return this._endBlockNode(Catch, Finally);
      }
      // `throw` statement
      throw(error) {
        return this._leafNode(new Throw(error));
      }
      // start self-balancing block
      block(body, nodeCount) {
        this._blockStarts.push(this._nodes.length);
        if (body)
          this.code(body).endBlock(nodeCount);
        return this;
      }
      // end the current self-balancing block
      endBlock(nodeCount) {
        const len = this._blockStarts.pop();
        if (len === void 0)
          throw new Error("CodeGen: not in self-balancing block");
        const toClose = this._nodes.length - len;
        if (toClose < 0 || nodeCount !== void 0 && toClose !== nodeCount) {
          throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
        }
        this._nodes.length = len;
        return this;
      }
      // `function` heading (or definition if funcBody is passed)
      func(name, args = code_1.nil, async, funcBody) {
        this._blockNode(new Func(name, args, async));
        if (funcBody)
          this.code(funcBody).endFunc();
        return this;
      }
      // end function definition
      endFunc() {
        return this._endBlockNode(Func);
      }
      optimize(n = 1) {
        while (n-- > 0) {
          this._root.optimizeNodes();
          this._root.optimizeNames(this._root.names, this._constants);
        }
      }
      _leafNode(node) {
        this._currNode.nodes.push(node);
        return this;
      }
      _blockNode(node) {
        this._currNode.nodes.push(node);
        this._nodes.push(node);
      }
      _endBlockNode(N1, N2) {
        const n = this._currNode;
        if (n instanceof N1 || N2 && n instanceof N2) {
          this._nodes.pop();
          return this;
        }
        throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
      }
      _elseNode(node) {
        const n = this._currNode;
        if (!(n instanceof If)) {
          throw new Error('CodeGen: "else" without "if"');
        }
        this._currNode = n.else = node;
        return this;
      }
      get _root() {
        return this._nodes[0];
      }
      get _currNode() {
        const ns = this._nodes;
        return ns[ns.length - 1];
      }
      set _currNode(node) {
        const ns = this._nodes;
        ns[ns.length - 1] = node;
      }
    };
    exports.CodeGen = CodeGen;
    function addNames(names, from) {
      for (const n in from)
        names[n] = (names[n] || 0) + (from[n] || 0);
      return names;
    }
    function addExprNames(names, from) {
      return from instanceof code_1._CodeOrName ? addNames(names, from.names) : names;
    }
    function optimizeExpr(expr, names, constants) {
      if (expr instanceof code_1.Name)
        return replaceName(expr);
      if (!canOptimize(expr))
        return expr;
      return new code_1._Code(expr._items.reduce((items, c) => {
        if (c instanceof code_1.Name)
          c = replaceName(c);
        if (c instanceof code_1._Code)
          items.push(...c._items);
        else
          items.push(c);
        return items;
      }, []));
      function replaceName(n) {
        const c = constants[n.str];
        if (c === void 0 || names[n.str] !== 1)
          return n;
        delete names[n.str];
        return c;
      }
      function canOptimize(e) {
        return e instanceof code_1._Code && e._items.some((c) => c instanceof code_1.Name && names[c.str] === 1 && constants[c.str] !== void 0);
      }
    }
    function subtractNames(names, from) {
      for (const n in from)
        names[n] = (names[n] || 0) - (from[n] || 0);
    }
    function not(x) {
      return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, code_1._)`!${par(x)}`;
    }
    exports.not = not;
    var andCode = mappend(exports.operators.AND);
    function and(...args) {
      return args.reduce(andCode);
    }
    exports.and = and;
    var orCode = mappend(exports.operators.OR);
    function or(...args) {
      return args.reduce(orCode);
    }
    exports.or = or;
    function mappend(op) {
      return (x, y) => x === code_1.nil ? y : y === code_1.nil ? x : (0, code_1._)`${par(x)} ${op} ${par(y)}`;
    }
    function par(x) {
      return x instanceof code_1.Name ? x : (0, code_1._)`(${x})`;
    }
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/util.js
var require_util = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/util.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.checkStrictMode = exports.getErrorPath = exports.Type = exports.useFunc = exports.setEvaluated = exports.evaluatedPropsToName = exports.mergeEvaluated = exports.eachItem = exports.unescapeJsonPointer = exports.escapeJsonPointer = exports.escapeFragment = exports.unescapeFragment = exports.schemaRefOrVal = exports.schemaHasRulesButRef = exports.schemaHasRules = exports.checkUnknownRules = exports.alwaysValidSchema = exports.toHash = void 0;
    var codegen_1 = require_codegen();
    var code_1 = require_code();
    function toHash(arr) {
      const hash = {};
      for (const item of arr)
        hash[item] = true;
      return hash;
    }
    exports.toHash = toHash;
    function alwaysValidSchema(it, schema) {
      if (typeof schema == "boolean")
        return schema;
      if (Object.keys(schema).length === 0)
        return true;
      checkUnknownRules(it, schema);
      return !schemaHasRules(schema, it.self.RULES.all);
    }
    exports.alwaysValidSchema = alwaysValidSchema;
    function checkUnknownRules(it, schema = it.schema) {
      const { opts, self } = it;
      if (!opts.strictSchema)
        return;
      if (typeof schema === "boolean")
        return;
      const rules = self.RULES.keywords;
      for (const key in schema) {
        if (!rules[key])
          checkStrictMode(it, `unknown keyword: "${key}"`);
      }
    }
    exports.checkUnknownRules = checkUnknownRules;
    function schemaHasRules(schema, rules) {
      if (typeof schema == "boolean")
        return !schema;
      for (const key in schema)
        if (rules[key])
          return true;
      return false;
    }
    exports.schemaHasRules = schemaHasRules;
    function schemaHasRulesButRef(schema, RULES2) {
      if (typeof schema == "boolean")
        return !schema;
      for (const key in schema)
        if (key !== "$ref" && RULES2.all[key])
          return true;
      return false;
    }
    exports.schemaHasRulesButRef = schemaHasRulesButRef;
    function schemaRefOrVal({ topSchemaRef, schemaPath }, schema, keyword, $data) {
      if (!$data) {
        if (typeof schema == "number" || typeof schema == "boolean")
          return schema;
        if (typeof schema == "string")
          return (0, codegen_1._)`${schema}`;
      }
      return (0, codegen_1._)`${topSchemaRef}${schemaPath}${(0, codegen_1.getProperty)(keyword)}`;
    }
    exports.schemaRefOrVal = schemaRefOrVal;
    function unescapeFragment(str) {
      return unescapeJsonPointer(decodeURIComponent(str));
    }
    exports.unescapeFragment = unescapeFragment;
    function escapeFragment(str) {
      return encodeURIComponent(escapeJsonPointer(str));
    }
    exports.escapeFragment = escapeFragment;
    function escapeJsonPointer(str) {
      if (typeof str == "number")
        return `${str}`;
      return str.replace(/~/g, "~0").replace(/\//g, "~1");
    }
    exports.escapeJsonPointer = escapeJsonPointer;
    function unescapeJsonPointer(str) {
      return str.replace(/~1/g, "/").replace(/~0/g, "~");
    }
    exports.unescapeJsonPointer = unescapeJsonPointer;
    function eachItem(xs, f) {
      if (Array.isArray(xs)) {
        for (const x of xs)
          f(x);
      } else {
        f(xs);
      }
    }
    exports.eachItem = eachItem;
    function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues, resultToName }) {
      return (gen, from, to, toName) => {
        const res = to === void 0 ? from : to instanceof codegen_1.Name ? (from instanceof codegen_1.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to) : from instanceof codegen_1.Name ? (mergeToName(gen, to, from), from) : mergeValues(from, to);
        return toName === codegen_1.Name && !(res instanceof codegen_1.Name) ? resultToName(gen, res) : res;
      };
    }
    exports.mergeEvaluated = {
      props: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true && ${from} !== undefined`, () => {
          gen.if((0, codegen_1._)`${from} === true`, () => gen.assign(to, true), () => gen.assign(to, (0, codegen_1._)`${to} || {}`).code((0, codegen_1._)`Object.assign(${to}, ${from})`));
        }),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true`, () => {
          if (from === true) {
            gen.assign(to, true);
          } else {
            gen.assign(to, (0, codegen_1._)`${to} || {}`);
            setEvaluated(gen, to, from);
          }
        }),
        mergeValues: (from, to) => from === true ? true : { ...from, ...to },
        resultToName: evaluatedPropsToName
      }),
      items: makeMergeEvaluated({
        mergeNames: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true && ${from} !== undefined`, () => gen.assign(to, (0, codegen_1._)`${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
        mergeToName: (gen, from, to) => gen.if((0, codegen_1._)`${to} !== true`, () => gen.assign(to, from === true ? true : (0, codegen_1._)`${to} > ${from} ? ${to} : ${from}`)),
        mergeValues: (from, to) => from === true ? true : Math.max(from, to),
        resultToName: (gen, items) => gen.var("items", items)
      })
    };
    function evaluatedPropsToName(gen, ps) {
      if (ps === true)
        return gen.var("props", true);
      const props = gen.var("props", (0, codegen_1._)`{}`);
      if (ps !== void 0)
        setEvaluated(gen, props, ps);
      return props;
    }
    exports.evaluatedPropsToName = evaluatedPropsToName;
    function setEvaluated(gen, props, ps) {
      Object.keys(ps).forEach((p) => gen.assign((0, codegen_1._)`${props}${(0, codegen_1.getProperty)(p)}`, true));
    }
    exports.setEvaluated = setEvaluated;
    var snippets = {};
    function useFunc(gen, f) {
      return gen.scopeValue("func", {
        ref: f,
        code: snippets[f.code] || (snippets[f.code] = new code_1._Code(f.code))
      });
    }
    exports.useFunc = useFunc;
    var Type;
    (function(Type2) {
      Type2[Type2["Num"] = 0] = "Num";
      Type2[Type2["Str"] = 1] = "Str";
    })(Type || (exports.Type = Type = {}));
    function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
      if (dataProp instanceof codegen_1.Name) {
        const isNumber = dataPropType === Type.Num;
        return jsPropertySyntax ? isNumber ? (0, codegen_1._)`"[" + ${dataProp} + "]"` : (0, codegen_1._)`"['" + ${dataProp} + "']"` : isNumber ? (0, codegen_1._)`"/" + ${dataProp}` : (0, codegen_1._)`"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
      }
      return jsPropertySyntax ? (0, codegen_1.getProperty)(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
    }
    exports.getErrorPath = getErrorPath;
    function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
      if (!mode)
        return;
      msg = `strict mode: ${msg}`;
      if (mode === true)
        throw new Error(msg);
      it.self.logger.warn(msg);
    }
    exports.checkStrictMode = checkStrictMode;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/names.js
var require_names = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/names.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var names = {
      // validation function arguments
      data: new codegen_1.Name("data"),
      // data passed to validation function
      // args passed from referencing schema
      valCxt: new codegen_1.Name("valCxt"),
      // validation/data context - should not be used directly, it is destructured to the names below
      instancePath: new codegen_1.Name("instancePath"),
      parentData: new codegen_1.Name("parentData"),
      parentDataProperty: new codegen_1.Name("parentDataProperty"),
      rootData: new codegen_1.Name("rootData"),
      // root data - same as the data passed to the first/top validation function
      dynamicAnchors: new codegen_1.Name("dynamicAnchors"),
      // used to support recursiveRef and dynamicRef
      // function scoped variables
      vErrors: new codegen_1.Name("vErrors"),
      // null or array of validation errors
      errors: new codegen_1.Name("errors"),
      // counter of validation errors
      this: new codegen_1.Name("this"),
      // "globals"
      self: new codegen_1.Name("self"),
      scope: new codegen_1.Name("scope"),
      // JTD serialize/parse name for JSON string and position
      json: new codegen_1.Name("json"),
      jsonPos: new codegen_1.Name("jsonPos"),
      jsonLen: new codegen_1.Name("jsonLen"),
      jsonPart: new codegen_1.Name("jsonPart")
    };
    exports.default = names;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/errors.js
var require_errors = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/errors.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.extendErrors = exports.resetErrorsCount = exports.reportExtraError = exports.reportError = exports.keyword$DataError = exports.keywordError = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var names_1 = require_names();
    exports.keywordError = {
      message: ({ keyword }) => (0, codegen_1.str)`must pass "${keyword}" keyword validation`
    };
    exports.keyword$DataError = {
      message: ({ keyword, schemaType }) => schemaType ? (0, codegen_1.str)`"${keyword}" keyword must be ${schemaType} ($data)` : (0, codegen_1.str)`"${keyword}" keyword is invalid ($data)`
    };
    function reportError(cxt, error = exports.keywordError, errorPaths, overrideAllErrors) {
      const { it } = cxt;
      const { gen, compositeRule, allErrors } = it;
      const errObj = errorObjectCode(cxt, error, errorPaths);
      if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : compositeRule || allErrors) {
        addError(gen, errObj);
      } else {
        returnErrors(it, (0, codegen_1._)`[${errObj}]`);
      }
    }
    exports.reportError = reportError;
    function reportExtraError(cxt, error = exports.keywordError, errorPaths) {
      const { it } = cxt;
      const { gen, compositeRule, allErrors } = it;
      const errObj = errorObjectCode(cxt, error, errorPaths);
      addError(gen, errObj);
      if (!(compositeRule || allErrors)) {
        returnErrors(it, names_1.default.vErrors);
      }
    }
    exports.reportExtraError = reportExtraError;
    function resetErrorsCount(gen, errsCount) {
      gen.assign(names_1.default.errors, errsCount);
      gen.if((0, codegen_1._)`${names_1.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign((0, codegen_1._)`${names_1.default.vErrors}.length`, errsCount), () => gen.assign(names_1.default.vErrors, null)));
    }
    exports.resetErrorsCount = resetErrorsCount;
    function extendErrors({ gen, keyword, schemaValue, data, errsCount, it }) {
      if (errsCount === void 0)
        throw new Error("ajv implementation error");
      const err = gen.name("err");
      gen.forRange("i", errsCount, names_1.default.errors, (i) => {
        gen.const(err, (0, codegen_1._)`${names_1.default.vErrors}[${i}]`);
        gen.if((0, codegen_1._)`${err}.instancePath === undefined`, () => gen.assign((0, codegen_1._)`${err}.instancePath`, (0, codegen_1.strConcat)(names_1.default.instancePath, it.errorPath)));
        gen.assign((0, codegen_1._)`${err}.schemaPath`, (0, codegen_1.str)`${it.errSchemaPath}/${keyword}`);
        if (it.opts.verbose) {
          gen.assign((0, codegen_1._)`${err}.schema`, schemaValue);
          gen.assign((0, codegen_1._)`${err}.data`, data);
        }
      });
    }
    exports.extendErrors = extendErrors;
    function addError(gen, errObj) {
      const err = gen.const("err", errObj);
      gen.if((0, codegen_1._)`${names_1.default.vErrors} === null`, () => gen.assign(names_1.default.vErrors, (0, codegen_1._)`[${err}]`), (0, codegen_1._)`${names_1.default.vErrors}.push(${err})`);
      gen.code((0, codegen_1._)`${names_1.default.errors}++`);
    }
    function returnErrors(it, errs) {
      const { gen, validateName, schemaEnv } = it;
      if (schemaEnv.$async) {
        gen.throw((0, codegen_1._)`new ${it.ValidationError}(${errs})`);
      } else {
        gen.assign((0, codegen_1._)`${validateName}.errors`, errs);
        gen.return(false);
      }
    }
    var E = {
      keyword: new codegen_1.Name("keyword"),
      schemaPath: new codegen_1.Name("schemaPath"),
      // also used in JTD errors
      params: new codegen_1.Name("params"),
      propertyName: new codegen_1.Name("propertyName"),
      message: new codegen_1.Name("message"),
      schema: new codegen_1.Name("schema"),
      parentSchema: new codegen_1.Name("parentSchema")
    };
    function errorObjectCode(cxt, error, errorPaths) {
      const { createErrors } = cxt.it;
      if (createErrors === false)
        return (0, codegen_1._)`{}`;
      return errorObject(cxt, error, errorPaths);
    }
    function errorObject(cxt, error, errorPaths = {}) {
      const { gen, it } = cxt;
      const keyValues = [
        errorInstancePath(it, errorPaths),
        errorSchemaPath(cxt, errorPaths)
      ];
      extraErrorProps(cxt, error, keyValues);
      return gen.object(...keyValues);
    }
    function errorInstancePath({ errorPath }, { instancePath }) {
      const instPath = instancePath ? (0, codegen_1.str)`${errorPath}${(0, util_1.getErrorPath)(instancePath, util_1.Type.Str)}` : errorPath;
      return [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, instPath)];
    }
    function errorSchemaPath({ keyword, it: { errSchemaPath } }, { schemaPath, parentSchema }) {
      let schPath = parentSchema ? errSchemaPath : (0, codegen_1.str)`${errSchemaPath}/${keyword}`;
      if (schemaPath) {
        schPath = (0, codegen_1.str)`${schPath}${(0, util_1.getErrorPath)(schemaPath, util_1.Type.Str)}`;
      }
      return [E.schemaPath, schPath];
    }
    function extraErrorProps(cxt, { params, message }, keyValues) {
      const { keyword, data, schemaValue, it } = cxt;
      const { opts, propertyName, topSchemaRef, schemaPath } = it;
      keyValues.push([E.keyword, keyword], [E.params, typeof params == "function" ? params(cxt) : params || (0, codegen_1._)`{}`]);
      if (opts.messages) {
        keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
      }
      if (opts.verbose) {
        keyValues.push([E.schema, schemaValue], [E.parentSchema, (0, codegen_1._)`${topSchemaRef}${schemaPath}`], [names_1.default.data, data]);
      }
      if (propertyName)
        keyValues.push([E.propertyName, propertyName]);
    }
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/validate/boolSchema.js
var require_boolSchema = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/validate/boolSchema.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.boolOrEmptySchema = exports.topBoolOrEmptySchema = void 0;
    var errors_1 = require_errors();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var boolError = {
      message: "boolean schema is false"
    };
    function topBoolOrEmptySchema(it) {
      const { gen, schema, validateName } = it;
      if (schema === false) {
        falseSchemaError(it, false);
      } else if (typeof schema == "object" && schema.$async === true) {
        gen.return(names_1.default.data);
      } else {
        gen.assign((0, codegen_1._)`${validateName}.errors`, null);
        gen.return(true);
      }
    }
    exports.topBoolOrEmptySchema = topBoolOrEmptySchema;
    function boolOrEmptySchema(it, valid) {
      const { gen, schema } = it;
      if (schema === false) {
        gen.var(valid, false);
        falseSchemaError(it);
      } else {
        gen.var(valid, true);
      }
    }
    exports.boolOrEmptySchema = boolOrEmptySchema;
    function falseSchemaError(it, overrideAllErrors) {
      const { gen, data } = it;
      const cxt = {
        gen,
        keyword: "false schema",
        data,
        schema: false,
        schemaCode: false,
        schemaValue: false,
        params: {},
        it
      };
      (0, errors_1.reportError)(cxt, boolError, void 0, overrideAllErrors);
    }
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/rules.js
var require_rules = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/rules.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getRules = exports.isJSONType = void 0;
    var _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
    var jsonTypes = new Set(_jsonTypes);
    function isJSONType(x) {
      return typeof x == "string" && jsonTypes.has(x);
    }
    exports.isJSONType = isJSONType;
    function getRules() {
      const groups = {
        number: { type: "number", rules: [] },
        string: { type: "string", rules: [] },
        array: { type: "array", rules: [] },
        object: { type: "object", rules: [] }
      };
      return {
        types: { ...groups, integer: true, boolean: true, null: true },
        rules: [{ rules: [] }, groups.number, groups.string, groups.array, groups.object],
        post: { rules: [] },
        all: {},
        keywords: {}
      };
    }
    exports.getRules = getRules;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/validate/applicability.js
var require_applicability = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/validate/applicability.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.shouldUseRule = exports.shouldUseGroup = exports.schemaHasRulesForType = void 0;
    function schemaHasRulesForType({ schema, self }, type) {
      const group = self.RULES.types[type];
      return group && group !== true && shouldUseGroup(schema, group);
    }
    exports.schemaHasRulesForType = schemaHasRulesForType;
    function shouldUseGroup(schema, group) {
      return group.rules.some((rule) => shouldUseRule(schema, rule));
    }
    exports.shouldUseGroup = shouldUseGroup;
    function shouldUseRule(schema, rule) {
      var _a;
      return schema[rule.keyword] !== void 0 || ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema[kwd] !== void 0));
    }
    exports.shouldUseRule = shouldUseRule;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/validate/dataType.js
var require_dataType = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/validate/dataType.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.reportTypeError = exports.checkDataTypes = exports.checkDataType = exports.coerceAndCheckDataType = exports.getJSONTypes = exports.getSchemaTypes = exports.DataType = void 0;
    var rules_1 = require_rules();
    var applicability_1 = require_applicability();
    var errors_1 = require_errors();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var DataType;
    (function(DataType2) {
      DataType2[DataType2["Correct"] = 0] = "Correct";
      DataType2[DataType2["Wrong"] = 1] = "Wrong";
    })(DataType || (exports.DataType = DataType = {}));
    function getSchemaTypes(schema) {
      const types = getJSONTypes(schema.type);
      const hasNull = types.includes("null");
      if (hasNull) {
        if (schema.nullable === false)
          throw new Error("type: null contradicts nullable: false");
      } else {
        if (!types.length && schema.nullable !== void 0) {
          throw new Error('"nullable" cannot be used without "type"');
        }
        if (schema.nullable === true)
          types.push("null");
      }
      return types;
    }
    exports.getSchemaTypes = getSchemaTypes;
    function getJSONTypes(ts) {
      const types = Array.isArray(ts) ? ts : ts ? [ts] : [];
      if (types.every(rules_1.isJSONType))
        return types;
      throw new Error("type must be JSONType or JSONType[]: " + types.join(","));
    }
    exports.getJSONTypes = getJSONTypes;
    function coerceAndCheckDataType(it, types) {
      const { gen, data, opts } = it;
      const coerceTo = coerceToTypes(types, opts.coerceTypes);
      const checkTypes = types.length > 0 && !(coerceTo.length === 0 && types.length === 1 && (0, applicability_1.schemaHasRulesForType)(it, types[0]));
      if (checkTypes) {
        const wrongType = checkDataTypes(types, data, opts.strictNumbers, DataType.Wrong);
        gen.if(wrongType, () => {
          if (coerceTo.length)
            coerceData(it, types, coerceTo);
          else
            reportTypeError(it);
        });
      }
      return checkTypes;
    }
    exports.coerceAndCheckDataType = coerceAndCheckDataType;
    var COERCIBLE = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
    function coerceToTypes(types, coerceTypes) {
      return coerceTypes ? types.filter((t) => COERCIBLE.has(t) || coerceTypes === "array" && t === "array") : [];
    }
    function coerceData(it, types, coerceTo) {
      const { gen, data, opts } = it;
      const dataType = gen.let("dataType", (0, codegen_1._)`typeof ${data}`);
      const coerced = gen.let("coerced", (0, codegen_1._)`undefined`);
      if (opts.coerceTypes === "array") {
        gen.if((0, codegen_1._)`${dataType} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen.assign(data, (0, codegen_1._)`${data}[0]`).assign(dataType, (0, codegen_1._)`typeof ${data}`).if(checkDataTypes(types, data, opts.strictNumbers), () => gen.assign(coerced, data)));
      }
      gen.if((0, codegen_1._)`${coerced} !== undefined`);
      for (const t of coerceTo) {
        if (COERCIBLE.has(t) || t === "array" && opts.coerceTypes === "array") {
          coerceSpecificType(t);
        }
      }
      gen.else();
      reportTypeError(it);
      gen.endIf();
      gen.if((0, codegen_1._)`${coerced} !== undefined`, () => {
        gen.assign(data, coerced);
        assignParentData(it, coerced);
      });
      function coerceSpecificType(t) {
        switch (t) {
          case "string":
            gen.elseIf((0, codegen_1._)`${dataType} == "number" || ${dataType} == "boolean"`).assign(coerced, (0, codegen_1._)`"" + ${data}`).elseIf((0, codegen_1._)`${data} === null`).assign(coerced, (0, codegen_1._)`""`);
            return;
          case "number":
            gen.elseIf((0, codegen_1._)`${dataType} == "boolean" || ${data} === null
              || (${dataType} == "string" && ${data} && ${data} == +${data})`).assign(coerced, (0, codegen_1._)`+${data}`);
            return;
          case "integer":
            gen.elseIf((0, codegen_1._)`${dataType} === "boolean" || ${data} === null
              || (${dataType} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`).assign(coerced, (0, codegen_1._)`+${data}`);
            return;
          case "boolean":
            gen.elseIf((0, codegen_1._)`${data} === "false" || ${data} === 0 || ${data} === null`).assign(coerced, false).elseIf((0, codegen_1._)`${data} === "true" || ${data} === 1`).assign(coerced, true);
            return;
          case "null":
            gen.elseIf((0, codegen_1._)`${data} === "" || ${data} === 0 || ${data} === false`);
            gen.assign(coerced, null);
            return;
          case "array":
            gen.elseIf((0, codegen_1._)`${dataType} === "string" || ${dataType} === "number"
              || ${dataType} === "boolean" || ${data} === null`).assign(coerced, (0, codegen_1._)`[${data}]`);
        }
      }
    }
    function assignParentData({ gen, parentData, parentDataProperty }, expr) {
      gen.if((0, codegen_1._)`${parentData} !== undefined`, () => gen.assign((0, codegen_1._)`${parentData}[${parentDataProperty}]`, expr));
    }
    function checkDataType(dataType, data, strictNums, correct = DataType.Correct) {
      const EQ = correct === DataType.Correct ? codegen_1.operators.EQ : codegen_1.operators.NEQ;
      let cond;
      switch (dataType) {
        case "null":
          return (0, codegen_1._)`${data} ${EQ} null`;
        case "array":
          cond = (0, codegen_1._)`Array.isArray(${data})`;
          break;
        case "object":
          cond = (0, codegen_1._)`${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
          break;
        case "integer":
          cond = numCond((0, codegen_1._)`!(${data} % 1) && !isNaN(${data})`);
          break;
        case "number":
          cond = numCond();
          break;
        default:
          return (0, codegen_1._)`typeof ${data} ${EQ} ${dataType}`;
      }
      return correct === DataType.Correct ? cond : (0, codegen_1.not)(cond);
      function numCond(_cond = codegen_1.nil) {
        return (0, codegen_1.and)((0, codegen_1._)`typeof ${data} == "number"`, _cond, strictNums ? (0, codegen_1._)`isFinite(${data})` : codegen_1.nil);
      }
    }
    exports.checkDataType = checkDataType;
    function checkDataTypes(dataTypes, data, strictNums, correct) {
      if (dataTypes.length === 1) {
        return checkDataType(dataTypes[0], data, strictNums, correct);
      }
      let cond;
      const types = (0, util_1.toHash)(dataTypes);
      if (types.array && types.object) {
        const notObj = (0, codegen_1._)`typeof ${data} != "object"`;
        cond = types.null ? notObj : (0, codegen_1._)`!${data} || ${notObj}`;
        delete types.null;
        delete types.array;
        delete types.object;
      } else {
        cond = codegen_1.nil;
      }
      if (types.number)
        delete types.integer;
      for (const t in types)
        cond = (0, codegen_1.and)(cond, checkDataType(t, data, strictNums, correct));
      return cond;
    }
    exports.checkDataTypes = checkDataTypes;
    var typeError = {
      message: ({ schema }) => `must be ${schema}`,
      params: ({ schema, schemaValue }) => typeof schema == "string" ? (0, codegen_1._)`{type: ${schema}}` : (0, codegen_1._)`{type: ${schemaValue}}`
    };
    function reportTypeError(it) {
      const cxt = getTypeErrorContext(it);
      (0, errors_1.reportError)(cxt, typeError);
    }
    exports.reportTypeError = reportTypeError;
    function getTypeErrorContext(it) {
      const { gen, data, schema } = it;
      const schemaCode = (0, util_1.schemaRefOrVal)(it, schema, "type");
      return {
        gen,
        keyword: "type",
        data,
        schema: schema.type,
        schemaCode,
        schemaValue: schemaCode,
        parentSchema: schema,
        params: {},
        it
      };
    }
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/validate/defaults.js
var require_defaults = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/validate/defaults.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.assignDefaults = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    function assignDefaults(it, ty) {
      const { properties, items } = it.schema;
      if (ty === "object" && properties) {
        for (const key in properties) {
          assignDefault(it, key, properties[key].default);
        }
      } else if (ty === "array" && Array.isArray(items)) {
        items.forEach((sch, i) => assignDefault(it, i, sch.default));
      }
    }
    exports.assignDefaults = assignDefaults;
    function assignDefault(it, prop, defaultValue) {
      const { gen, compositeRule, data, opts } = it;
      if (defaultValue === void 0)
        return;
      const childData = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(prop)}`;
      if (compositeRule) {
        (0, util_1.checkStrictMode)(it, `default is ignored for: ${childData}`);
        return;
      }
      let condition = (0, codegen_1._)`${childData} === undefined`;
      if (opts.useDefaults === "empty") {
        condition = (0, codegen_1._)`${condition} || ${childData} === null || ${childData} === ""`;
      }
      gen.if(condition, (0, codegen_1._)`${childData} = ${(0, codegen_1.stringify)(defaultValue)}`);
    }
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/code.js
var require_code2 = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/code.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateUnion = exports.validateArray = exports.usePattern = exports.callValidateCode = exports.schemaProperties = exports.allSchemaProperties = exports.noPropertyInData = exports.propertyInData = exports.isOwnProperty = exports.hasPropFunc = exports.reportMissingProp = exports.checkMissingProp = exports.checkReportMissingProp = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var names_1 = require_names();
    var util_2 = require_util();
    function checkReportMissingProp(cxt, prop) {
      const { gen, data, it } = cxt;
      gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), () => {
        cxt.setParams({ missingProperty: (0, codegen_1._)`${prop}` }, true);
        cxt.error();
      });
    }
    exports.checkReportMissingProp = checkReportMissingProp;
    function checkMissingProp({ gen, data, it: { opts } }, properties, missing) {
      return (0, codegen_1.or)(...properties.map((prop) => (0, codegen_1.and)(noPropertyInData(gen, data, prop, opts.ownProperties), (0, codegen_1._)`${missing} = ${prop}`)));
    }
    exports.checkMissingProp = checkMissingProp;
    function reportMissingProp(cxt, missing) {
      cxt.setParams({ missingProperty: missing }, true);
      cxt.error();
    }
    exports.reportMissingProp = reportMissingProp;
    function hasPropFunc(gen) {
      return gen.scopeValue("func", {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        ref: Object.prototype.hasOwnProperty,
        code: (0, codegen_1._)`Object.prototype.hasOwnProperty`
      });
    }
    exports.hasPropFunc = hasPropFunc;
    function isOwnProperty(gen, data, property) {
      return (0, codegen_1._)`${hasPropFunc(gen)}.call(${data}, ${property})`;
    }
    exports.isOwnProperty = isOwnProperty;
    function propertyInData(gen, data, property, ownProperties) {
      const cond = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(property)} !== undefined`;
      return ownProperties ? (0, codegen_1._)`${cond} && ${isOwnProperty(gen, data, property)}` : cond;
    }
    exports.propertyInData = propertyInData;
    function noPropertyInData(gen, data, property, ownProperties) {
      const cond = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(property)} === undefined`;
      return ownProperties ? (0, codegen_1.or)(cond, (0, codegen_1.not)(isOwnProperty(gen, data, property))) : cond;
    }
    exports.noPropertyInData = noPropertyInData;
    function allSchemaProperties(schemaMap) {
      return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
    }
    exports.allSchemaProperties = allSchemaProperties;
    function schemaProperties(it, schemaMap) {
      return allSchemaProperties(schemaMap).filter((p) => !(0, util_1.alwaysValidSchema)(it, schemaMap[p]));
    }
    exports.schemaProperties = schemaProperties;
    function callValidateCode({ schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context, passSchema) {
      const dataAndSchema = passSchema ? (0, codegen_1._)`${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data;
      const valCxt = [
        [names_1.default.instancePath, (0, codegen_1.strConcat)(names_1.default.instancePath, errorPath)],
        [names_1.default.parentData, it.parentData],
        [names_1.default.parentDataProperty, it.parentDataProperty],
        [names_1.default.rootData, names_1.default.rootData]
      ];
      if (it.opts.dynamicRef)
        valCxt.push([names_1.default.dynamicAnchors, names_1.default.dynamicAnchors]);
      const args = (0, codegen_1._)`${dataAndSchema}, ${gen.object(...valCxt)}`;
      return context !== codegen_1.nil ? (0, codegen_1._)`${func}.call(${context}, ${args})` : (0, codegen_1._)`${func}(${args})`;
    }
    exports.callValidateCode = callValidateCode;
    var newRegExp = (0, codegen_1._)`new RegExp`;
    function usePattern({ gen, it: { opts } }, pattern) {
      const u = opts.unicodeRegExp ? "u" : "";
      const { regExp } = opts.code;
      const rx = regExp(pattern, u);
      return gen.scopeValue("pattern", {
        key: rx.toString(),
        ref: rx,
        code: (0, codegen_1._)`${regExp.code === "new RegExp" ? newRegExp : (0, util_2.useFunc)(gen, regExp)}(${pattern}, ${u})`
      });
    }
    exports.usePattern = usePattern;
    function validateArray(cxt) {
      const { gen, data, keyword, it } = cxt;
      const valid = gen.name("valid");
      if (it.allErrors) {
        const validArr = gen.let("valid", true);
        validateItems(() => gen.assign(validArr, false));
        return validArr;
      }
      gen.var(valid, true);
      validateItems(() => gen.break());
      return valid;
      function validateItems(notValid) {
        const len = gen.const("len", (0, codegen_1._)`${data}.length`);
        gen.forRange("i", 0, len, (i) => {
          cxt.subschema({
            keyword,
            dataProp: i,
            dataPropType: util_1.Type.Num
          }, valid);
          gen.if((0, codegen_1.not)(valid), notValid);
        });
      }
    }
    exports.validateArray = validateArray;
    function validateUnion(cxt) {
      const { gen, schema, keyword, it } = cxt;
      if (!Array.isArray(schema))
        throw new Error("ajv implementation error");
      const alwaysValid = schema.some((sch) => (0, util_1.alwaysValidSchema)(it, sch));
      if (alwaysValid && !it.opts.unevaluated)
        return;
      const valid = gen.let("valid", false);
      const schValid = gen.name("_valid");
      gen.block(() => schema.forEach((_sch, i) => {
        const schCxt = cxt.subschema({
          keyword,
          schemaProp: i,
          compositeRule: true
        }, schValid);
        gen.assign(valid, (0, codegen_1._)`${valid} || ${schValid}`);
        const merged = cxt.mergeValidEvaluated(schCxt, schValid);
        if (!merged)
          gen.if((0, codegen_1.not)(valid));
      }));
      cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
    }
    exports.validateUnion = validateUnion;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/validate/keyword.js
var require_keyword = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/validate/keyword.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateKeywordUsage = exports.validSchemaType = exports.funcKeywordCode = exports.macroKeywordCode = void 0;
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var code_1 = require_code2();
    var errors_1 = require_errors();
    function macroKeywordCode(cxt, def) {
      const { gen, keyword, schema, parentSchema, it } = cxt;
      const macroSchema = def.macro.call(it.self, schema, parentSchema, it);
      const schemaRef = useKeyword(gen, keyword, macroSchema);
      if (it.opts.validateSchema !== false)
        it.self.validateSchema(macroSchema, true);
      const valid = gen.name("valid");
      cxt.subschema({
        schema: macroSchema,
        schemaPath: codegen_1.nil,
        errSchemaPath: `${it.errSchemaPath}/${keyword}`,
        topSchemaRef: schemaRef,
        compositeRule: true
      }, valid);
      cxt.pass(valid, () => cxt.error(true));
    }
    exports.macroKeywordCode = macroKeywordCode;
    function funcKeywordCode(cxt, def) {
      var _a;
      const { gen, keyword, schema, parentSchema, $data, it } = cxt;
      checkAsyncKeyword(it, def);
      const validate = !$data && def.compile ? def.compile.call(it.self, schema, parentSchema, it) : def.validate;
      const validateRef = useKeyword(gen, keyword, validate);
      const valid = gen.let("valid");
      cxt.block$data(valid, validateKeyword);
      cxt.ok((_a = def.valid) !== null && _a !== void 0 ? _a : valid);
      function validateKeyword() {
        if (def.errors === false) {
          assignValid();
          if (def.modifying)
            modifyData(cxt);
          reportErrs(() => cxt.error());
        } else {
          const ruleErrs = def.async ? validateAsync() : validateSync();
          if (def.modifying)
            modifyData(cxt);
          reportErrs(() => addErrs(cxt, ruleErrs));
        }
      }
      function validateAsync() {
        const ruleErrs = gen.let("ruleErrs", null);
        gen.try(() => assignValid((0, codegen_1._)`await `), (e) => gen.assign(valid, false).if((0, codegen_1._)`${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, (0, codegen_1._)`${e}.errors`), () => gen.throw(e)));
        return ruleErrs;
      }
      function validateSync() {
        const validateErrs = (0, codegen_1._)`${validateRef}.errors`;
        gen.assign(validateErrs, null);
        assignValid(codegen_1.nil);
        return validateErrs;
      }
      function assignValid(_await = def.async ? (0, codegen_1._)`await ` : codegen_1.nil) {
        const passCxt = it.opts.passContext ? names_1.default.this : names_1.default.self;
        const passSchema = !("compile" in def && !$data || def.schema === false);
        gen.assign(valid, (0, codegen_1._)`${_await}${(0, code_1.callValidateCode)(cxt, validateRef, passCxt, passSchema)}`, def.modifying);
      }
      function reportErrs(errors) {
        var _a2;
        gen.if((0, codegen_1.not)((_a2 = def.valid) !== null && _a2 !== void 0 ? _a2 : valid), errors);
      }
    }
    exports.funcKeywordCode = funcKeywordCode;
    function modifyData(cxt) {
      const { gen, data, it } = cxt;
      gen.if(it.parentData, () => gen.assign(data, (0, codegen_1._)`${it.parentData}[${it.parentDataProperty}]`));
    }
    function addErrs(cxt, errs) {
      const { gen } = cxt;
      gen.if((0, codegen_1._)`Array.isArray(${errs})`, () => {
        gen.assign(names_1.default.vErrors, (0, codegen_1._)`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`).assign(names_1.default.errors, (0, codegen_1._)`${names_1.default.vErrors}.length`);
        (0, errors_1.extendErrors)(cxt);
      }, () => cxt.error());
    }
    function checkAsyncKeyword({ schemaEnv }, def) {
      if (def.async && !schemaEnv.$async)
        throw new Error("async keyword in sync schema");
    }
    function useKeyword(gen, keyword, result) {
      if (result === void 0)
        throw new Error(`keyword "${keyword}" failed to compile`);
      return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : { ref: result, code: (0, codegen_1.stringify)(result) });
    }
    function validSchemaType(schema, schemaType, allowUndefined = false) {
      return !schemaType.length || schemaType.some((st) => st === "array" ? Array.isArray(schema) : st === "object" ? schema && typeof schema == "object" && !Array.isArray(schema) : typeof schema == st || allowUndefined && typeof schema == "undefined");
    }
    exports.validSchemaType = validSchemaType;
    function validateKeywordUsage({ schema, opts, self, errSchemaPath }, def, keyword) {
      if (Array.isArray(def.keyword) ? !def.keyword.includes(keyword) : def.keyword !== keyword) {
        throw new Error("ajv implementation error");
      }
      const deps = def.dependencies;
      if (deps === null || deps === void 0 ? void 0 : deps.some((kwd) => !Object.prototype.hasOwnProperty.call(schema, kwd))) {
        throw new Error(`parent schema must have dependencies of ${keyword}: ${deps.join(",")}`);
      }
      if (def.validateSchema) {
        const valid = def.validateSchema(schema[keyword]);
        if (!valid) {
          const msg = `keyword "${keyword}" value is invalid at path "${errSchemaPath}": ` + self.errorsText(def.validateSchema.errors);
          if (opts.validateSchema === "log")
            self.logger.error(msg);
          else
            throw new Error(msg);
        }
      }
    }
    exports.validateKeywordUsage = validateKeywordUsage;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/validate/subschema.js
var require_subschema = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/validate/subschema.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.extendSubschemaMode = exports.extendSubschemaData = exports.getSubschema = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    function getSubschema(it, { keyword, schemaProp, schema, schemaPath, errSchemaPath, topSchemaRef }) {
      if (keyword !== void 0 && schema !== void 0) {
        throw new Error('both "keyword" and "schema" passed, only one allowed');
      }
      if (keyword !== void 0) {
        const sch = it.schema[keyword];
        return schemaProp === void 0 ? {
          schema: sch,
          schemaPath: (0, codegen_1._)`${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}`,
          errSchemaPath: `${it.errSchemaPath}/${keyword}`
        } : {
          schema: sch[schemaProp],
          schemaPath: (0, codegen_1._)`${it.schemaPath}${(0, codegen_1.getProperty)(keyword)}${(0, codegen_1.getProperty)(schemaProp)}`,
          errSchemaPath: `${it.errSchemaPath}/${keyword}/${(0, util_1.escapeFragment)(schemaProp)}`
        };
      }
      if (schema !== void 0) {
        if (schemaPath === void 0 || errSchemaPath === void 0 || topSchemaRef === void 0) {
          throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
        }
        return {
          schema,
          schemaPath,
          topSchemaRef,
          errSchemaPath
        };
      }
      throw new Error('either "keyword" or "schema" must be passed');
    }
    exports.getSubschema = getSubschema;
    function extendSubschemaData(subschema, it, { dataProp, dataPropType: dpType, data, dataTypes, propertyName }) {
      if (data !== void 0 && dataProp !== void 0) {
        throw new Error('both "data" and "dataProp" passed, only one allowed');
      }
      const { gen } = it;
      if (dataProp !== void 0) {
        const { errorPath, dataPathArr, opts } = it;
        const nextData = gen.let("data", (0, codegen_1._)`${it.data}${(0, codegen_1.getProperty)(dataProp)}`, true);
        dataContextProps(nextData);
        subschema.errorPath = (0, codegen_1.str)`${errorPath}${(0, util_1.getErrorPath)(dataProp, dpType, opts.jsPropertySyntax)}`;
        subschema.parentDataProperty = (0, codegen_1._)`${dataProp}`;
        subschema.dataPathArr = [...dataPathArr, subschema.parentDataProperty];
      }
      if (data !== void 0) {
        const nextData = data instanceof codegen_1.Name ? data : gen.let("data", data, true);
        dataContextProps(nextData);
        if (propertyName !== void 0)
          subschema.propertyName = propertyName;
      }
      if (dataTypes)
        subschema.dataTypes = dataTypes;
      function dataContextProps(_nextData) {
        subschema.data = _nextData;
        subschema.dataLevel = it.dataLevel + 1;
        subschema.dataTypes = [];
        it.definedProperties = /* @__PURE__ */ new Set();
        subschema.parentData = it.data;
        subschema.dataNames = [...it.dataNames, _nextData];
      }
    }
    exports.extendSubschemaData = extendSubschemaData;
    function extendSubschemaMode(subschema, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
      if (compositeRule !== void 0)
        subschema.compositeRule = compositeRule;
      if (createErrors !== void 0)
        subschema.createErrors = createErrors;
      if (allErrors !== void 0)
        subschema.allErrors = allErrors;
      subschema.jtdDiscriminator = jtdDiscriminator;
      subschema.jtdMetadata = jtdMetadata;
    }
    exports.extendSubschemaMode = extendSubschemaMode;
  }
});

// node_modules/.pnpm/fast-deep-equal@3.1.3/node_modules/fast-deep-equal/index.js
var require_fast_deep_equal = __commonJS({
  "node_modules/.pnpm/fast-deep-equal@3.1.3/node_modules/fast-deep-equal/index.js"(exports, module) {
    "use strict";
    init_esm_shims();
    module.exports = function equal(a, b) {
      if (a === b) return true;
      if (a && b && typeof a == "object" && typeof b == "object") {
        if (a.constructor !== b.constructor) return false;
        var length, i, keys;
        if (Array.isArray(a)) {
          length = a.length;
          if (length != b.length) return false;
          for (i = length; i-- !== 0; )
            if (!equal(a[i], b[i])) return false;
          return true;
        }
        if (a.constructor === RegExp) return a.source === b.source && a.flags === b.flags;
        if (a.valueOf !== Object.prototype.valueOf) return a.valueOf() === b.valueOf();
        if (a.toString !== Object.prototype.toString) return a.toString() === b.toString();
        keys = Object.keys(a);
        length = keys.length;
        if (length !== Object.keys(b).length) return false;
        for (i = length; i-- !== 0; )
          if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
        for (i = length; i-- !== 0; ) {
          var key = keys[i];
          if (!equal(a[key], b[key])) return false;
        }
        return true;
      }
      return a !== a && b !== b;
    };
  }
});

// node_modules/.pnpm/json-schema-traverse@1.0.0/node_modules/json-schema-traverse/index.js
var require_json_schema_traverse = __commonJS({
  "node_modules/.pnpm/json-schema-traverse@1.0.0/node_modules/json-schema-traverse/index.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var traverse = module.exports = function(schema, opts, cb) {
      if (typeof opts == "function") {
        cb = opts;
        opts = {};
      }
      cb = opts.cb || cb;
      var pre = typeof cb == "function" ? cb : cb.pre || function() {
      };
      var post = cb.post || function() {
      };
      _traverse(opts, pre, post, schema, "", schema);
    };
    traverse.keywords = {
      additionalItems: true,
      items: true,
      contains: true,
      additionalProperties: true,
      propertyNames: true,
      not: true,
      if: true,
      then: true,
      else: true
    };
    traverse.arrayKeywords = {
      items: true,
      allOf: true,
      anyOf: true,
      oneOf: true
    };
    traverse.propsKeywords = {
      $defs: true,
      definitions: true,
      properties: true,
      patternProperties: true,
      dependencies: true
    };
    traverse.skipKeywords = {
      default: true,
      enum: true,
      const: true,
      required: true,
      maximum: true,
      minimum: true,
      exclusiveMaximum: true,
      exclusiveMinimum: true,
      multipleOf: true,
      maxLength: true,
      minLength: true,
      pattern: true,
      format: true,
      maxItems: true,
      minItems: true,
      uniqueItems: true,
      maxProperties: true,
      minProperties: true
    };
    function _traverse(opts, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
      if (schema && typeof schema == "object" && !Array.isArray(schema)) {
        pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
        for (var key in schema) {
          var sch = schema[key];
          if (Array.isArray(sch)) {
            if (key in traverse.arrayKeywords) {
              for (var i = 0; i < sch.length; i++)
                _traverse(opts, pre, post, sch[i], jsonPtr + "/" + key + "/" + i, rootSchema, jsonPtr, key, schema, i);
            }
          } else if (key in traverse.propsKeywords) {
            if (sch && typeof sch == "object") {
              for (var prop in sch)
                _traverse(opts, pre, post, sch[prop], jsonPtr + "/" + key + "/" + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
            }
          } else if (key in traverse.keywords || opts.allKeys && !(key in traverse.skipKeywords)) {
            _traverse(opts, pre, post, sch, jsonPtr + "/" + key, rootSchema, jsonPtr, key, schema);
          }
        }
        post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
      }
    }
    function escapeJsonPtr(str) {
      return str.replace(/~/g, "~0").replace(/\//g, "~1");
    }
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/resolve.js
var require_resolve = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/resolve.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSchemaRefs = exports.resolveUrl = exports.normalizeId = exports._getFullPath = exports.getFullPath = exports.inlineRef = void 0;
    var util_1 = require_util();
    var equal = require_fast_deep_equal();
    var traverse = require_json_schema_traverse();
    var SIMPLE_INLINED = /* @__PURE__ */ new Set([
      "type",
      "format",
      "pattern",
      "maxLength",
      "minLength",
      "maxProperties",
      "minProperties",
      "maxItems",
      "minItems",
      "maximum",
      "minimum",
      "uniqueItems",
      "multipleOf",
      "required",
      "enum",
      "const"
    ]);
    function inlineRef(schema, limit = true) {
      if (typeof schema == "boolean")
        return true;
      if (limit === true)
        return !hasRef(schema);
      if (!limit)
        return false;
      return countKeys(schema) <= limit;
    }
    exports.inlineRef = inlineRef;
    var REF_KEYWORDS = /* @__PURE__ */ new Set([
      "$ref",
      "$recursiveRef",
      "$recursiveAnchor",
      "$dynamicRef",
      "$dynamicAnchor"
    ]);
    function hasRef(schema) {
      for (const key in schema) {
        if (REF_KEYWORDS.has(key))
          return true;
        const sch = schema[key];
        if (Array.isArray(sch) && sch.some(hasRef))
          return true;
        if (typeof sch == "object" && hasRef(sch))
          return true;
      }
      return false;
    }
    function countKeys(schema) {
      let count = 0;
      for (const key in schema) {
        if (key === "$ref")
          return Infinity;
        count++;
        if (SIMPLE_INLINED.has(key))
          continue;
        if (typeof schema[key] == "object") {
          (0, util_1.eachItem)(schema[key], (sch) => count += countKeys(sch));
        }
        if (count === Infinity)
          return Infinity;
      }
      return count;
    }
    function getFullPath(resolver, id = "", normalize) {
      if (normalize !== false)
        id = normalizeId(id);
      const p = resolver.parse(id);
      return _getFullPath(resolver, p);
    }
    exports.getFullPath = getFullPath;
    function _getFullPath(resolver, p) {
      const serialized = resolver.serialize(p);
      return serialized.split("#")[0] + "#";
    }
    exports._getFullPath = _getFullPath;
    var TRAILING_SLASH_HASH = /#\/?$/;
    function normalizeId(id) {
      return id ? id.replace(TRAILING_SLASH_HASH, "") : "";
    }
    exports.normalizeId = normalizeId;
    function resolveUrl(resolver, baseId, id) {
      id = normalizeId(id);
      return resolver.resolve(baseId, id);
    }
    exports.resolveUrl = resolveUrl;
    var ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
    function getSchemaRefs(schema, baseId) {
      if (typeof schema == "boolean")
        return {};
      const { schemaId, uriResolver } = this.opts;
      const schId = normalizeId(schema[schemaId] || baseId);
      const baseIds = { "": schId };
      const pathPrefix = getFullPath(uriResolver, schId, false);
      const localRefs = {};
      const schemaRefs = /* @__PURE__ */ new Set();
      traverse(schema, { allKeys: true }, (sch, jsonPtr, _, parentJsonPtr) => {
        if (parentJsonPtr === void 0)
          return;
        const fullPath = pathPrefix + jsonPtr;
        let innerBaseId = baseIds[parentJsonPtr];
        if (typeof sch[schemaId] == "string")
          innerBaseId = addRef.call(this, sch[schemaId]);
        addAnchor.call(this, sch.$anchor);
        addAnchor.call(this, sch.$dynamicAnchor);
        baseIds[jsonPtr] = innerBaseId;
        function addRef(ref) {
          const _resolve = this.opts.uriResolver.resolve;
          ref = normalizeId(innerBaseId ? _resolve(innerBaseId, ref) : ref);
          if (schemaRefs.has(ref))
            throw ambiguos(ref);
          schemaRefs.add(ref);
          let schOrRef = this.refs[ref];
          if (typeof schOrRef == "string")
            schOrRef = this.refs[schOrRef];
          if (typeof schOrRef == "object") {
            checkAmbiguosRef(sch, schOrRef.schema, ref);
          } else if (ref !== normalizeId(fullPath)) {
            if (ref[0] === "#") {
              checkAmbiguosRef(sch, localRefs[ref], ref);
              localRefs[ref] = sch;
            } else {
              this.refs[ref] = fullPath;
            }
          }
          return ref;
        }
        function addAnchor(anchor) {
          if (typeof anchor == "string") {
            if (!ANCHOR.test(anchor))
              throw new Error(`invalid anchor "${anchor}"`);
            addRef.call(this, `#${anchor}`);
          }
        }
      });
      return localRefs;
      function checkAmbiguosRef(sch1, sch2, ref) {
        if (sch2 !== void 0 && !equal(sch1, sch2))
          throw ambiguos(ref);
      }
      function ambiguos(ref) {
        return new Error(`reference "${ref}" resolves to more than one schema`);
      }
    }
    exports.getSchemaRefs = getSchemaRefs;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/validate/index.js
var require_validate = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/validate/index.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getData = exports.KeywordCxt = exports.validateFunctionCode = void 0;
    var boolSchema_1 = require_boolSchema();
    var dataType_1 = require_dataType();
    var applicability_1 = require_applicability();
    var dataType_2 = require_dataType();
    var defaults_1 = require_defaults();
    var keyword_1 = require_keyword();
    var subschema_1 = require_subschema();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var resolve_1 = require_resolve();
    var util_1 = require_util();
    var errors_1 = require_errors();
    function validateFunctionCode(it) {
      if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
          topSchemaObjCode(it);
          return;
        }
      }
      validateFunction(it, () => (0, boolSchema_1.topBoolOrEmptySchema)(it));
    }
    exports.validateFunctionCode = validateFunctionCode;
    function validateFunction({ gen, validateName, schema, schemaEnv, opts }, body) {
      if (opts.code.es5) {
        gen.func(validateName, (0, codegen_1._)`${names_1.default.data}, ${names_1.default.valCxt}`, schemaEnv.$async, () => {
          gen.code((0, codegen_1._)`"use strict"; ${funcSourceUrl(schema, opts)}`);
          destructureValCxtES5(gen, opts);
          gen.code(body);
        });
      } else {
        gen.func(validateName, (0, codegen_1._)`${names_1.default.data}, ${destructureValCxt(opts)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema, opts)).code(body));
      }
    }
    function destructureValCxt(opts) {
      return (0, codegen_1._)`{${names_1.default.instancePath}="", ${names_1.default.parentData}, ${names_1.default.parentDataProperty}, ${names_1.default.rootData}=${names_1.default.data}${opts.dynamicRef ? (0, codegen_1._)`, ${names_1.default.dynamicAnchors}={}` : codegen_1.nil}}={}`;
    }
    function destructureValCxtES5(gen, opts) {
      gen.if(names_1.default.valCxt, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.instancePath}`);
        gen.var(names_1.default.parentData, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.parentData}`);
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.parentDataProperty}`);
        gen.var(names_1.default.rootData, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.rootData}`);
        if (opts.dynamicRef)
          gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)`${names_1.default.valCxt}.${names_1.default.dynamicAnchors}`);
      }, () => {
        gen.var(names_1.default.instancePath, (0, codegen_1._)`""`);
        gen.var(names_1.default.parentData, (0, codegen_1._)`undefined`);
        gen.var(names_1.default.parentDataProperty, (0, codegen_1._)`undefined`);
        gen.var(names_1.default.rootData, names_1.default.data);
        if (opts.dynamicRef)
          gen.var(names_1.default.dynamicAnchors, (0, codegen_1._)`{}`);
      });
    }
    function topSchemaObjCode(it) {
      const { schema, opts, gen } = it;
      validateFunction(it, () => {
        if (opts.$comment && schema.$comment)
          commentKeyword(it);
        checkNoDefault(it);
        gen.let(names_1.default.vErrors, null);
        gen.let(names_1.default.errors, 0);
        if (opts.unevaluated)
          resetEvaluated(it);
        typeAndKeywords(it);
        returnResults(it);
      });
      return;
    }
    function resetEvaluated(it) {
      const { gen, validateName } = it;
      it.evaluated = gen.const("evaluated", (0, codegen_1._)`${validateName}.evaluated`);
      gen.if((0, codegen_1._)`${it.evaluated}.dynamicProps`, () => gen.assign((0, codegen_1._)`${it.evaluated}.props`, (0, codegen_1._)`undefined`));
      gen.if((0, codegen_1._)`${it.evaluated}.dynamicItems`, () => gen.assign((0, codegen_1._)`${it.evaluated}.items`, (0, codegen_1._)`undefined`));
    }
    function funcSourceUrl(schema, opts) {
      const schId = typeof schema == "object" && schema[opts.schemaId];
      return schId && (opts.code.source || opts.code.process) ? (0, codegen_1._)`/*# sourceURL=${schId} */` : codegen_1.nil;
    }
    function subschemaCode(it, valid) {
      if (isSchemaObj(it)) {
        checkKeywords(it);
        if (schemaCxtHasRules(it)) {
          subSchemaObjCode(it, valid);
          return;
        }
      }
      (0, boolSchema_1.boolOrEmptySchema)(it, valid);
    }
    function schemaCxtHasRules({ schema, self }) {
      if (typeof schema == "boolean")
        return !schema;
      for (const key in schema)
        if (self.RULES.all[key])
          return true;
      return false;
    }
    function isSchemaObj(it) {
      return typeof it.schema != "boolean";
    }
    function subSchemaObjCode(it, valid) {
      const { schema, gen, opts } = it;
      if (opts.$comment && schema.$comment)
        commentKeyword(it);
      updateContext(it);
      checkAsyncSchema(it);
      const errsCount = gen.const("_errs", names_1.default.errors);
      typeAndKeywords(it, errsCount);
      gen.var(valid, (0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
    }
    function checkKeywords(it) {
      (0, util_1.checkUnknownRules)(it);
      checkRefsAndKeywords(it);
    }
    function typeAndKeywords(it, errsCount) {
      if (it.opts.jtd)
        return schemaKeywords(it, [], false, errsCount);
      const types = (0, dataType_1.getSchemaTypes)(it.schema);
      const checkedTypes = (0, dataType_1.coerceAndCheckDataType)(it, types);
      schemaKeywords(it, types, !checkedTypes, errsCount);
    }
    function checkRefsAndKeywords(it) {
      const { schema, errSchemaPath, opts, self } = it;
      if (schema.$ref && opts.ignoreKeywordsWithRef && (0, util_1.schemaHasRulesButRef)(schema, self.RULES)) {
        self.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
      }
    }
    function checkNoDefault(it) {
      const { schema, opts } = it;
      if (schema.default !== void 0 && opts.useDefaults && opts.strictSchema) {
        (0, util_1.checkStrictMode)(it, "default is ignored in the schema root");
      }
    }
    function updateContext(it) {
      const schId = it.schema[it.opts.schemaId];
      if (schId)
        it.baseId = (0, resolve_1.resolveUrl)(it.opts.uriResolver, it.baseId, schId);
    }
    function checkAsyncSchema(it) {
      if (it.schema.$async && !it.schemaEnv.$async)
        throw new Error("async schema in sync schema");
    }
    function commentKeyword({ gen, schemaEnv, schema, errSchemaPath, opts }) {
      const msg = schema.$comment;
      if (opts.$comment === true) {
        gen.code((0, codegen_1._)`${names_1.default.self}.logger.log(${msg})`);
      } else if (typeof opts.$comment == "function") {
        const schemaPath = (0, codegen_1.str)`${errSchemaPath}/$comment`;
        const rootName = gen.scopeValue("root", { ref: schemaEnv.root });
        gen.code((0, codegen_1._)`${names_1.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
      }
    }
    function returnResults(it) {
      const { gen, schemaEnv, validateName, ValidationError, opts } = it;
      if (schemaEnv.$async) {
        gen.if((0, codegen_1._)`${names_1.default.errors} === 0`, () => gen.return(names_1.default.data), () => gen.throw((0, codegen_1._)`new ${ValidationError}(${names_1.default.vErrors})`));
      } else {
        gen.assign((0, codegen_1._)`${validateName}.errors`, names_1.default.vErrors);
        if (opts.unevaluated)
          assignEvaluated(it);
        gen.return((0, codegen_1._)`${names_1.default.errors} === 0`);
      }
    }
    function assignEvaluated({ gen, evaluated, props, items }) {
      if (props instanceof codegen_1.Name)
        gen.assign((0, codegen_1._)`${evaluated}.props`, props);
      if (items instanceof codegen_1.Name)
        gen.assign((0, codegen_1._)`${evaluated}.items`, items);
    }
    function schemaKeywords(it, types, typeErrors, errsCount) {
      const { gen, schema, data, allErrors, opts, self } = it;
      const { RULES: RULES2 } = self;
      if (schema.$ref && (opts.ignoreKeywordsWithRef || !(0, util_1.schemaHasRulesButRef)(schema, RULES2))) {
        gen.block(() => keywordCode(it, "$ref", RULES2.all.$ref.definition));
        return;
      }
      if (!opts.jtd)
        checkStrictTypes(it, types);
      gen.block(() => {
        for (const group of RULES2.rules)
          groupKeywords(group);
        groupKeywords(RULES2.post);
      });
      function groupKeywords(group) {
        if (!(0, applicability_1.shouldUseGroup)(schema, group))
          return;
        if (group.type) {
          gen.if((0, dataType_2.checkDataType)(group.type, data, opts.strictNumbers));
          iterateKeywords(it, group);
          if (types.length === 1 && types[0] === group.type && typeErrors) {
            gen.else();
            (0, dataType_2.reportTypeError)(it);
          }
          gen.endIf();
        } else {
          iterateKeywords(it, group);
        }
        if (!allErrors)
          gen.if((0, codegen_1._)`${names_1.default.errors} === ${errsCount || 0}`);
      }
    }
    function iterateKeywords(it, group) {
      const { gen, schema, opts: { useDefaults } } = it;
      if (useDefaults)
        (0, defaults_1.assignDefaults)(it, group.type);
      gen.block(() => {
        for (const rule of group.rules) {
          if ((0, applicability_1.shouldUseRule)(schema, rule)) {
            keywordCode(it, rule.keyword, rule.definition, group.type);
          }
        }
      });
    }
    function checkStrictTypes(it, types) {
      if (it.schemaEnv.meta || !it.opts.strictTypes)
        return;
      checkContextTypes(it, types);
      if (!it.opts.allowUnionTypes)
        checkMultipleTypes(it, types);
      checkKeywordTypes(it, it.dataTypes);
    }
    function checkContextTypes(it, types) {
      if (!types.length)
        return;
      if (!it.dataTypes.length) {
        it.dataTypes = types;
        return;
      }
      types.forEach((t) => {
        if (!includesType(it.dataTypes, t)) {
          strictTypesError(it, `type "${t}" not allowed by context "${it.dataTypes.join(",")}"`);
        }
      });
      narrowSchemaTypes(it, types);
    }
    function checkMultipleTypes(it, ts) {
      if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
        strictTypesError(it, "use allowUnionTypes to allow union type keyword");
      }
    }
    function checkKeywordTypes(it, ts) {
      const rules = it.self.RULES.all;
      for (const keyword in rules) {
        const rule = rules[keyword];
        if (typeof rule == "object" && (0, applicability_1.shouldUseRule)(it.schema, rule)) {
          const { type } = rule.definition;
          if (type.length && !type.some((t) => hasApplicableType(ts, t))) {
            strictTypesError(it, `missing type "${type.join(",")}" for keyword "${keyword}"`);
          }
        }
      }
    }
    function hasApplicableType(schTs, kwdT) {
      return schTs.includes(kwdT) || kwdT === "number" && schTs.includes("integer");
    }
    function includesType(ts, t) {
      return ts.includes(t) || t === "integer" && ts.includes("number");
    }
    function narrowSchemaTypes(it, withTypes) {
      const ts = [];
      for (const t of it.dataTypes) {
        if (includesType(withTypes, t))
          ts.push(t);
        else if (withTypes.includes("integer") && t === "number")
          ts.push("integer");
      }
      it.dataTypes = ts;
    }
    function strictTypesError(it, msg) {
      const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
      msg += ` at "${schemaPath}" (strictTypes)`;
      (0, util_1.checkStrictMode)(it, msg, it.opts.strictTypes);
    }
    var KeywordCxt = class {
      constructor(it, def, keyword) {
        (0, keyword_1.validateKeywordUsage)(it, def, keyword);
        this.gen = it.gen;
        this.allErrors = it.allErrors;
        this.keyword = keyword;
        this.data = it.data;
        this.schema = it.schema[keyword];
        this.$data = def.$data && it.opts.$data && this.schema && this.schema.$data;
        this.schemaValue = (0, util_1.schemaRefOrVal)(it, this.schema, keyword, this.$data);
        this.schemaType = def.schemaType;
        this.parentSchema = it.schema;
        this.params = {};
        this.it = it;
        this.def = def;
        if (this.$data) {
          this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
        } else {
          this.schemaCode = this.schemaValue;
          if (!(0, keyword_1.validSchemaType)(this.schema, def.schemaType, def.allowUndefined)) {
            throw new Error(`${keyword} value must be ${JSON.stringify(def.schemaType)}`);
          }
        }
        if ("code" in def ? def.trackErrors : def.errors !== false) {
          this.errsCount = it.gen.const("_errs", names_1.default.errors);
        }
      }
      result(condition, successAction, failAction) {
        this.failResult((0, codegen_1.not)(condition), successAction, failAction);
      }
      failResult(condition, successAction, failAction) {
        this.gen.if(condition);
        if (failAction)
          failAction();
        else
          this.error();
        if (successAction) {
          this.gen.else();
          successAction();
          if (this.allErrors)
            this.gen.endIf();
        } else {
          if (this.allErrors)
            this.gen.endIf();
          else
            this.gen.else();
        }
      }
      pass(condition, failAction) {
        this.failResult((0, codegen_1.not)(condition), void 0, failAction);
      }
      fail(condition) {
        if (condition === void 0) {
          this.error();
          if (!this.allErrors)
            this.gen.if(false);
          return;
        }
        this.gen.if(condition);
        this.error();
        if (this.allErrors)
          this.gen.endIf();
        else
          this.gen.else();
      }
      fail$data(condition) {
        if (!this.$data)
          return this.fail(condition);
        const { schemaCode } = this;
        this.fail((0, codegen_1._)`${schemaCode} !== undefined && (${(0, codegen_1.or)(this.invalid$data(), condition)})`);
      }
      error(append, errorParams, errorPaths) {
        if (errorParams) {
          this.setParams(errorParams);
          this._error(append, errorPaths);
          this.setParams({});
          return;
        }
        this._error(append, errorPaths);
      }
      _error(append, errorPaths) {
        ;
        (append ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error, errorPaths);
      }
      $dataError() {
        (0, errors_1.reportError)(this, this.def.$dataError || errors_1.keyword$DataError);
      }
      reset() {
        if (this.errsCount === void 0)
          throw new Error('add "trackErrors" to keyword definition');
        (0, errors_1.resetErrorsCount)(this.gen, this.errsCount);
      }
      ok(cond) {
        if (!this.allErrors)
          this.gen.if(cond);
      }
      setParams(obj, assign) {
        if (assign)
          Object.assign(this.params, obj);
        else
          this.params = obj;
      }
      block$data(valid, codeBlock, $dataValid = codegen_1.nil) {
        this.gen.block(() => {
          this.check$data(valid, $dataValid);
          codeBlock();
        });
      }
      check$data(valid = codegen_1.nil, $dataValid = codegen_1.nil) {
        if (!this.$data)
          return;
        const { gen, schemaCode, schemaType, def } = this;
        gen.if((0, codegen_1.or)((0, codegen_1._)`${schemaCode} === undefined`, $dataValid));
        if (valid !== codegen_1.nil)
          gen.assign(valid, true);
        if (schemaType.length || def.validateSchema) {
          gen.elseIf(this.invalid$data());
          this.$dataError();
          if (valid !== codegen_1.nil)
            gen.assign(valid, false);
        }
        gen.else();
      }
      invalid$data() {
        const { gen, schemaCode, schemaType, def, it } = this;
        return (0, codegen_1.or)(wrong$DataType(), invalid$DataSchema());
        function wrong$DataType() {
          if (schemaType.length) {
            if (!(schemaCode instanceof codegen_1.Name))
              throw new Error("ajv implementation error");
            const st = Array.isArray(schemaType) ? schemaType : [schemaType];
            return (0, codegen_1._)`${(0, dataType_2.checkDataTypes)(st, schemaCode, it.opts.strictNumbers, dataType_2.DataType.Wrong)}`;
          }
          return codegen_1.nil;
        }
        function invalid$DataSchema() {
          if (def.validateSchema) {
            const validateSchemaRef = gen.scopeValue("validate$data", { ref: def.validateSchema });
            return (0, codegen_1._)`!${validateSchemaRef}(${schemaCode})`;
          }
          return codegen_1.nil;
        }
      }
      subschema(appl, valid) {
        const subschema = (0, subschema_1.getSubschema)(this.it, appl);
        (0, subschema_1.extendSubschemaData)(subschema, this.it, appl);
        (0, subschema_1.extendSubschemaMode)(subschema, appl);
        const nextContext = { ...this.it, ...subschema, items: void 0, props: void 0 };
        subschemaCode(nextContext, valid);
        return nextContext;
      }
      mergeEvaluated(schemaCxt, toName) {
        const { it, gen } = this;
        if (!it.opts.unevaluated)
          return;
        if (it.props !== true && schemaCxt.props !== void 0) {
          it.props = util_1.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
        }
        if (it.items !== true && schemaCxt.items !== void 0) {
          it.items = util_1.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
        }
      }
      mergeValidEvaluated(schemaCxt, valid) {
        const { it, gen } = this;
        if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
          gen.if(valid, () => this.mergeEvaluated(schemaCxt, codegen_1.Name));
          return true;
        }
      }
    };
    exports.KeywordCxt = KeywordCxt;
    function keywordCode(it, keyword, def, ruleType) {
      const cxt = new KeywordCxt(it, def, keyword);
      if ("code" in def) {
        def.code(cxt, ruleType);
      } else if (cxt.$data && def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
      } else if ("macro" in def) {
        (0, keyword_1.macroKeywordCode)(cxt, def);
      } else if (def.compile || def.validate) {
        (0, keyword_1.funcKeywordCode)(cxt, def);
      }
    }
    var JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
    var RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
    function getData($data, { dataLevel, dataNames, dataPathArr }) {
      let jsonPointer;
      let data;
      if ($data === "")
        return names_1.default.rootData;
      if ($data[0] === "/") {
        if (!JSON_POINTER.test($data))
          throw new Error(`Invalid JSON-pointer: ${$data}`);
        jsonPointer = $data;
        data = names_1.default.rootData;
      } else {
        const matches = RELATIVE_JSON_POINTER.exec($data);
        if (!matches)
          throw new Error(`Invalid JSON-pointer: ${$data}`);
        const up = +matches[1];
        jsonPointer = matches[2];
        if (jsonPointer === "#") {
          if (up >= dataLevel)
            throw new Error(errorMsg("property/index", up));
          return dataPathArr[dataLevel - up];
        }
        if (up > dataLevel)
          throw new Error(errorMsg("data", up));
        data = dataNames[dataLevel - up];
        if (!jsonPointer)
          return data;
      }
      let expr = data;
      const segments = jsonPointer.split("/");
      for (const segment of segments) {
        if (segment) {
          data = (0, codegen_1._)`${data}${(0, codegen_1.getProperty)((0, util_1.unescapeJsonPointer)(segment))}`;
          expr = (0, codegen_1._)`${expr} && ${data}`;
        }
      }
      return expr;
      function errorMsg(pointerType, up) {
        return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
      }
    }
    exports.getData = getData;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/runtime/validation_error.js
var require_validation_error = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/runtime/validation_error.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var ValidationError = class extends Error {
      constructor(errors) {
        super("validation failed");
        this.errors = errors;
        this.ajv = this.validation = true;
      }
    };
    exports.default = ValidationError;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/ref_error.js
var require_ref_error = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/ref_error.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var resolve_1 = require_resolve();
    var MissingRefError = class extends Error {
      constructor(resolver, baseId, ref, msg) {
        super(msg || `can't resolve reference ${ref} from id ${baseId}`);
        this.missingRef = (0, resolve_1.resolveUrl)(resolver, baseId, ref);
        this.missingSchema = (0, resolve_1.normalizeId)((0, resolve_1.getFullPath)(resolver, this.missingRef));
      }
    };
    exports.default = MissingRefError;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/index.js
var require_compile = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/compile/index.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.resolveSchema = exports.getCompilingSchema = exports.resolveRef = exports.compileSchema = exports.SchemaEnv = void 0;
    var codegen_1 = require_codegen();
    var validation_error_1 = require_validation_error();
    var names_1 = require_names();
    var resolve_1 = require_resolve();
    var util_1 = require_util();
    var validate_1 = require_validate();
    var SchemaEnv = class {
      constructor(env) {
        var _a;
        this.refs = {};
        this.dynamicAnchors = {};
        let schema;
        if (typeof env.schema == "object")
          schema = env.schema;
        this.schema = env.schema;
        this.schemaId = env.schemaId;
        this.root = env.root || this;
        this.baseId = (_a = env.baseId) !== null && _a !== void 0 ? _a : (0, resolve_1.normalizeId)(schema === null || schema === void 0 ? void 0 : schema[env.schemaId || "$id"]);
        this.schemaPath = env.schemaPath;
        this.localRefs = env.localRefs;
        this.meta = env.meta;
        this.$async = schema === null || schema === void 0 ? void 0 : schema.$async;
        this.refs = {};
      }
    };
    exports.SchemaEnv = SchemaEnv;
    function compileSchema(sch) {
      const _sch = getCompilingSchema.call(this, sch);
      if (_sch)
        return _sch;
      const rootId = (0, resolve_1.getFullPath)(this.opts.uriResolver, sch.root.baseId);
      const { es5, lines } = this.opts.code;
      const { ownProperties } = this.opts;
      const gen = new codegen_1.CodeGen(this.scope, { es5, lines, ownProperties });
      let _ValidationError;
      if (sch.$async) {
        _ValidationError = gen.scopeValue("Error", {
          ref: validation_error_1.default,
          code: (0, codegen_1._)`require("ajv/dist/runtime/validation_error").default`
        });
      }
      const validateName = gen.scopeName("validate");
      sch.validateName = validateName;
      const schemaCxt = {
        gen,
        allErrors: this.opts.allErrors,
        data: names_1.default.data,
        parentData: names_1.default.parentData,
        parentDataProperty: names_1.default.parentDataProperty,
        dataNames: [names_1.default.data],
        dataPathArr: [codegen_1.nil],
        // TODO can its length be used as dataLevel if nil is removed?
        dataLevel: 0,
        dataTypes: [],
        definedProperties: /* @__PURE__ */ new Set(),
        topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true ? { ref: sch.schema, code: (0, codegen_1.stringify)(sch.schema) } : { ref: sch.schema }),
        validateName,
        ValidationError: _ValidationError,
        schema: sch.schema,
        schemaEnv: sch,
        rootId,
        baseId: sch.baseId || rootId,
        schemaPath: codegen_1.nil,
        errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
        errorPath: (0, codegen_1._)`""`,
        opts: this.opts,
        self: this
      };
      let sourceCode;
      try {
        this._compilations.add(sch);
        (0, validate_1.validateFunctionCode)(schemaCxt);
        gen.optimize(this.opts.code.optimize);
        const validateCode = gen.toString();
        sourceCode = `${gen.scopeRefs(names_1.default.scope)}return ${validateCode}`;
        if (this.opts.code.process)
          sourceCode = this.opts.code.process(sourceCode, sch);
        const makeValidate = new Function(`${names_1.default.self}`, `${names_1.default.scope}`, sourceCode);
        const validate = makeValidate(this, this.scope.get());
        this.scope.value(validateName, { ref: validate });
        validate.errors = null;
        validate.schema = sch.schema;
        validate.schemaEnv = sch;
        if (sch.$async)
          validate.$async = true;
        if (this.opts.code.source === true) {
          validate.source = { validateName, validateCode, scopeValues: gen._values };
        }
        if (this.opts.unevaluated) {
          const { props, items } = schemaCxt;
          validate.evaluated = {
            props: props instanceof codegen_1.Name ? void 0 : props,
            items: items instanceof codegen_1.Name ? void 0 : items,
            dynamicProps: props instanceof codegen_1.Name,
            dynamicItems: items instanceof codegen_1.Name
          };
          if (validate.source)
            validate.source.evaluated = (0, codegen_1.stringify)(validate.evaluated);
        }
        sch.validate = validate;
        return sch;
      } catch (e) {
        delete sch.validate;
        delete sch.validateName;
        if (sourceCode)
          this.logger.error("Error compiling schema, function code:", sourceCode);
        throw e;
      } finally {
        this._compilations.delete(sch);
      }
    }
    exports.compileSchema = compileSchema;
    function resolveRef(root, baseId, ref) {
      var _a;
      ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, ref);
      const schOrFunc = root.refs[ref];
      if (schOrFunc)
        return schOrFunc;
      let _sch = resolve.call(this, root, ref);
      if (_sch === void 0) {
        const schema = (_a = root.localRefs) === null || _a === void 0 ? void 0 : _a[ref];
        const { schemaId } = this.opts;
        if (schema)
          _sch = new SchemaEnv({ schema, schemaId, root, baseId });
      }
      if (_sch === void 0)
        return;
      return root.refs[ref] = inlineOrCompile.call(this, _sch);
    }
    exports.resolveRef = resolveRef;
    function inlineOrCompile(sch) {
      if ((0, resolve_1.inlineRef)(sch.schema, this.opts.inlineRefs))
        return sch.schema;
      return sch.validate ? sch : compileSchema.call(this, sch);
    }
    function getCompilingSchema(schEnv) {
      for (const sch of this._compilations) {
        if (sameSchemaEnv(sch, schEnv))
          return sch;
      }
    }
    exports.getCompilingSchema = getCompilingSchema;
    function sameSchemaEnv(s1, s2) {
      return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
    }
    function resolve(root, ref) {
      let sch;
      while (typeof (sch = this.refs[ref]) == "string")
        ref = sch;
      return sch || this.schemas[ref] || resolveSchema.call(this, root, ref);
    }
    function resolveSchema(root, ref) {
      const p = this.opts.uriResolver.parse(ref);
      const refPath = (0, resolve_1._getFullPath)(this.opts.uriResolver, p);
      let baseId = (0, resolve_1.getFullPath)(this.opts.uriResolver, root.baseId, void 0);
      if (Object.keys(root.schema).length > 0 && refPath === baseId) {
        return getJsonPointer.call(this, p, root);
      }
      const id = (0, resolve_1.normalizeId)(refPath);
      const schOrRef = this.refs[id] || this.schemas[id];
      if (typeof schOrRef == "string") {
        const sch = resolveSchema.call(this, root, schOrRef);
        if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object")
          return;
        return getJsonPointer.call(this, p, sch);
      }
      if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object")
        return;
      if (!schOrRef.validate)
        compileSchema.call(this, schOrRef);
      if (id === (0, resolve_1.normalizeId)(ref)) {
        const { schema } = schOrRef;
        const { schemaId } = this.opts;
        const schId = schema[schemaId];
        if (schId)
          baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
        return new SchemaEnv({ schema, schemaId, root, baseId });
      }
      return getJsonPointer.call(this, p, schOrRef);
    }
    exports.resolveSchema = resolveSchema;
    var PREVENT_SCOPE_CHANGE = /* @__PURE__ */ new Set([
      "properties",
      "patternProperties",
      "enum",
      "dependencies",
      "definitions"
    ]);
    function getJsonPointer(parsedRef, { baseId, schema, root }) {
      var _a;
      if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/")
        return;
      for (const part of parsedRef.fragment.slice(1).split("/")) {
        if (typeof schema === "boolean")
          return;
        const partSchema = schema[(0, util_1.unescapeFragment)(part)];
        if (partSchema === void 0)
          return;
        schema = partSchema;
        const schId = typeof schema === "object" && schema[this.opts.schemaId];
        if (!PREVENT_SCOPE_CHANGE.has(part) && schId) {
          baseId = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schId);
        }
      }
      let env;
      if (typeof schema != "boolean" && schema.$ref && !(0, util_1.schemaHasRulesButRef)(schema, this.RULES)) {
        const $ref = (0, resolve_1.resolveUrl)(this.opts.uriResolver, baseId, schema.$ref);
        env = resolveSchema.call(this, root, $ref);
      }
      const { schemaId } = this.opts;
      env = env || new SchemaEnv({ schema, schemaId, root, baseId });
      if (env.schema !== env.root.schema)
        return env;
      return void 0;
    }
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/refs/data.json
var require_data = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/refs/data.json"(exports, module) {
    module.exports = {
      $id: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#",
      description: "Meta-schema for $data reference (JSON AnySchema extension proposal)",
      type: "object",
      required: ["$data"],
      properties: {
        $data: {
          type: "string",
          anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }]
        }
      },
      additionalProperties: false
    };
  }
});

// node_modules/.pnpm/fast-uri@3.1.9/node_modules/fast-uri/lib/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/fast-uri@3.1.9/node_modules/fast-uri/lib/utils.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var isUUID = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu);
    var isIPv4 = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u);
    var isPort = RegExp.prototype.test.bind(/^\d*$/u);
    var isHexPair = RegExp.prototype.test.bind(/^[\da-f]{2}$/iu);
    var isUnreserved = RegExp.prototype.test.bind(/^[\da-z\-._~]$/iu);
    var isPathCharacter = RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:@/]$/u);
    var isQueryFragmentCharacter = RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:@/?]$/u);
    var isUserinfoCharacter = RegExp.prototype.test.bind(/^[A-Za-z0-9\-._~!$&'()*+,;=:]$/u);
    var BYTE_HEX = new Array(256);
    {
      const HEX_DIGITS = "0123456789ABCDEF";
      for (let i = 0; i < 256; i++) {
        BYTE_HEX[i] = "%" + HEX_DIGITS[i >> 4] + HEX_DIGITS[i & 15];
      }
    }
    function percentEncodeNonAscii(cp) {
      if (cp < 2048) {
        return BYTE_HEX[192 | cp >> 6] + BYTE_HEX[128 | cp & 63];
      }
      if (cp < 65536) {
        return BYTE_HEX[224 | cp >> 12] + BYTE_HEX[128 | cp >> 6 & 63] + BYTE_HEX[128 | cp & 63];
      }
      return BYTE_HEX[240 | cp >> 18] + BYTE_HEX[128 | cp >> 12 & 63] + BYTE_HEX[128 | cp >> 6 & 63] + BYTE_HEX[128 | cp & 63];
    }
    function stringArrayToHexStripped(input) {
      let acc = "";
      let code = 0;
      let i = 0;
      for (i = 0; i < input.length; i++) {
        code = input[i].charCodeAt(0);
        if (code === 48) {
          continue;
        }
        if (!(code >= 48 && code <= 57 || code >= 65 && code <= 70 || code >= 97 && code <= 102)) {
          return "";
        }
        acc += input[i];
        break;
      }
      for (i += 1; i < input.length; i++) {
        code = input[i].charCodeAt(0);
        if (!(code >= 48 && code <= 57 || code >= 65 && code <= 70 || code >= 97 && code <= 102)) {
          return "";
        }
        acc += input[i];
      }
      return acc;
    }
    var isHextet = RegExp.prototype.test.bind(/^[\dA-Fa-f]{1,4}$/);
    var isIPvFuture = RegExp.prototype.test.bind(/^[vV][\dA-Fa-f]+\.[A-Za-z\d\-._~!$&'()*+,;=:]+$/);
    var isZoneCharacter = RegExp.prototype.test.bind(/^[A-Za-z\d\-._~]$/);
    var nonSimpleDomain = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
    function isZoneIdentifier(zone) {
      if (zone.length === 0) return false;
      for (let i = 0; i < zone.length; i++) {
        if (isZoneCharacter(zone[i])) continue;
        if (zone[i] === "%" && i + 2 < zone.length && isHexPair(zone.slice(i + 1, i + 3))) {
          i += 2;
          continue;
        }
        return false;
      }
      return true;
    }
    function compressIPv6ZeroRun(hextets) {
      let bestStart = -1;
      let bestLength = 0;
      let runStart = -1;
      let runLength = 0;
      for (let i = 0; i < hextets.length; i++) {
        if (hextets[i] === "0") {
          if (runStart === -1) runStart = i;
          runLength++;
          if (runLength > bestLength) {
            bestLength = runLength;
            bestStart = runStart;
          }
        } else {
          runStart = -1;
          runLength = 0;
        }
      }
      if (bestLength < 2) return hextets.join(":");
      const head = hextets.slice(0, bestStart).join(":");
      const tail = hextets.slice(bestStart + bestLength).join(":");
      return head + "::" + tail;
    }
    function normalizeIPv6Address(input) {
      const compression = input.indexOf("::");
      if (compression !== -1 && input.indexOf("::", compression + 1) !== -1) return void 0;
      const left = compression === -1 ? input.split(":") : input.slice(0, compression).split(":");
      const right = compression === -1 ? [] : input.slice(compression + 2).split(":");
      if (compression !== -1) {
        if (left.length === 1 && left[0] === "") left.length = 0;
        if (right.length === 1 && right[0] === "") right.length = 0;
      }
      const parts = left.concat(right);
      let hextetCount = 0;
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (part === "") return void 0;
        if (part.indexOf(".") !== -1) {
          if (i !== parts.length - 1 || compression !== -1 && right.length === 0 || !isIPv4(part)) return void 0;
          hextetCount += 2;
          continue;
        }
        if (!isHextet(part)) return void 0;
        parts[i] = parseInt(part, 16).toString(16);
        hextetCount++;
      }
      if (compression === -1) {
        if (hextetCount !== 8) return void 0;
        return compressIPv6ZeroRun(parts);
      }
      if (hextetCount >= 8) return void 0;
      const expanded = parts.slice(0, left.length);
      for (let i = hextetCount; i < 8; i++) expanded.push("0");
      for (let i = left.length; i < parts.length; i++) expanded.push(parts[i]);
      return compressIPv6ZeroRun(expanded);
    }
    function normalizeIPv6(host) {
      const bracketed = host[0] === "[" && host[host.length - 1] === "]";
      const hasBracket = host[0] === "[" || host[host.length - 1] === "]";
      if (hasBracket && !bracketed) return { host, isIPV6: false, error: true };
      let input = bracketed ? host.slice(1, -1) : host;
      if (bracketed && isIPvFuture(input)) {
        input = input.toLowerCase();
        return { host: `[${input}]`, escapedHost: input, isIPV6: false, isIPVFuture: true };
      }
      if (findToken(input, ":") < 2) {
        return { host, isIPV6: false, error: bracketed };
      }
      let zoneIdentifier = "";
      const zoneSeparator = input.indexOf("%");
      if (zoneSeparator !== -1) {
        const separatorLength = input.slice(zoneSeparator, zoneSeparator + 3).toLowerCase() === "%25" ? 3 : 1;
        zoneIdentifier = input.slice(zoneSeparator + separatorLength);
        if (!isZoneIdentifier(zoneIdentifier)) return { host, isIPV6: false, error: true };
        input = input.slice(0, zoneSeparator);
      }
      const address = normalizeIPv6Address(input);
      if (address === void 0) return { host, isIPV6: false, error: true };
      return {
        host: address + (zoneIdentifier ? "%" + zoneIdentifier : ""),
        escapedHost: address + (zoneIdentifier ? "%25" + zoneIdentifier : ""),
        isIPV6: true
      };
    }
    function findToken(str, token) {
      let ind = 0;
      for (let i = 0; i < str.length; i++) {
        if (str[i] === token) ind++;
      }
      return ind;
    }
    function removeDotSegments(path) {
      let input = path;
      const output = [];
      let nextSlash = -1;
      let len = 0;
      while (len = input.length) {
        if (len === 1) {
          if (input === ".") {
            break;
          } else if (input === "/") {
            output.push("/");
            break;
          } else {
            output.push(input);
            break;
          }
        } else if (len === 2) {
          if (input[0] === ".") {
            if (input[1] === ".") {
              break;
            } else if (input[1] === "/") {
              input = input.slice(2);
              continue;
            }
          } else if (input[0] === "/") {
            if (input[1] === "." || input[1] === "/") {
              output.push("/");
              break;
            }
          }
        } else if (len === 3) {
          if (input === "/..") {
            if (output.length !== 0) {
              output.pop();
            }
            output.push("/");
            break;
          }
        }
        if (input[0] === ".") {
          if (input[1] === ".") {
            if (input[2] === "/") {
              input = input.slice(3);
              continue;
            }
          } else if (input[1] === "/") {
            input = input.slice(2);
            continue;
          }
        } else if (input[0] === "/") {
          if (input[1] === ".") {
            if (input[2] === "/") {
              input = input.slice(2);
              continue;
            } else if (input[2] === ".") {
              if (input[3] === "/") {
                input = input.slice(3);
                if (output.length !== 0) {
                  output.pop();
                }
                continue;
              }
            }
          }
        }
        if ((nextSlash = input.indexOf("/", 1)) === -1) {
          output.push(input);
          break;
        } else {
          output.push(input.slice(0, nextSlash));
          input = input.slice(nextSlash);
        }
      }
      return output.join("");
    }
    function removeDotSegmentsRelative(path) {
      if (path === "" || path[0] === "/") {
        return removeDotSegments(path);
      }
      const segments = path.split("/");
      const last = segments.length - 1;
      const output = [];
      let trailingDirectory = false;
      for (let i = 0; i <= last; i++) {
        const segment = segments[i];
        if (segment === "." || segment === "..") {
          if (segment === "..") {
            if (output.length !== 0 && output[output.length - 1] !== "..") {
              output.pop();
            } else {
              output.push("..");
            }
          }
          trailingDirectory = i === last;
        } else {
          output.push(segment);
        }
      }
      if (trailingDirectory && output[output.length - 1] !== "..") {
        output.push("");
      }
      if (output.length === 0 || output[0] === "" || output[0].includes(":")) {
        output.unshift(".");
      }
      return output.join("/");
    }
    var HOST_DELIMS = { "@": "%40", "/": "%2F", "?": "%3F", "#": "%23", ":": "%3A" };
    var HOST_DELIM_RE = /[@/?#:]/g;
    var HOST_DELIM_NO_COLON_RE = /[@/?#]/g;
    function reescapeHostDelimiters(host, isIP) {
      const re = isIP ? HOST_DELIM_NO_COLON_RE : HOST_DELIM_RE;
      re.lastIndex = 0;
      return host.replace(re, (ch) => HOST_DELIMS[ch]);
    }
    function normalizePercentEncoding(input, decodeUnreserved = false) {
      if (input.indexOf("%") === -1) {
        return input;
      }
      let output = "";
      for (let i = 0; i < input.length; i++) {
        if (input[i] === "%" && i + 2 < input.length) {
          const hex = input.slice(i + 1, i + 3);
          if (isHexPair(hex)) {
            const normalizedHex = hex.toUpperCase();
            const decoded = String.fromCharCode(parseInt(normalizedHex, 16));
            if (decodeUnreserved && isUnreserved(decoded)) {
              output += decoded;
            } else {
              output += "%" + normalizedHex;
            }
            i += 2;
            continue;
          }
        }
        output += input[i];
      }
      return output;
    }
    function normalizePathEncoding(input) {
      let output = "";
      for (let i = 0; i < input.length; i++) {
        const ch = input[i];
        if (ch === "%" && i + 2 < input.length) {
          const hex = input.slice(i + 1, i + 3);
          if (isHexPair(hex)) {
            const normalizedHex = hex.toUpperCase();
            const decoded = String.fromCharCode(parseInt(normalizedHex, 16));
            if (decoded !== "." && isUnreserved(decoded)) {
              output += decoded;
            } else {
              output += "%" + normalizedHex;
            }
            i += 2;
            continue;
          }
        }
        if (isPathCharacter(ch)) {
          output += ch;
        } else {
          const code = input.charCodeAt(i);
          if (code < 128) {
            output += isEscapeSafe(code) ? ch : BYTE_HEX[code];
          } else if (code < 55296 || code > 57343) {
            output += percentEncodeNonAscii(code);
          } else if (code <= 56319 && i + 1 < input.length) {
            const low = input.charCodeAt(i + 1);
            if (low >= 56320 && low <= 57343) {
              output += percentEncodeNonAscii(65536 + (code - 55296 << 10) + (low - 56320));
              i++;
            } else {
              output += percentEncodeNonAscii(65533);
            }
          } else {
            output += percentEncodeNonAscii(65533);
          }
        }
      }
      return output;
    }
    function serializePathEncoding(input, pathNoScheme = false) {
      let output = "";
      let firstSegment = pathNoScheme && input[0] !== "/";
      for (let i = 0; i < input.length; i++) {
        const ch = input[i];
        if (ch === "%" && i + 2 < input.length) {
          const hex = input.slice(i + 1, i + 3);
          if (isHexPair(hex)) {
            output += "%" + hex.toUpperCase();
            i += 2;
            continue;
          }
        }
        if (ch === "/") {
          firstSegment = false;
        }
        if (isPathCharacter(ch) && (ch !== ":" || !firstSegment)) {
          output += ch;
        } else {
          const code = input.charCodeAt(i);
          if (code < 128) {
            output += BYTE_HEX[code];
          } else if (code < 55296 || code > 57343) {
            output += percentEncodeNonAscii(code);
          } else if (code <= 56319 && i + 1 < input.length) {
            const low = input.charCodeAt(i + 1);
            if (low >= 56320 && low <= 57343) {
              output += percentEncodeNonAscii(65536 + (code - 55296 << 10) + (low - 56320));
              i++;
            } else {
              output += percentEncodeNonAscii(65533);
            }
          } else {
            output += percentEncodeNonAscii(65533);
          }
        }
      }
      return output;
    }
    function encodeComponent(input, isAllowed) {
      let output = "";
      for (let i = 0; i < input.length; i++) {
        const ch = input[i];
        if (ch === "%" && i + 2 < input.length) {
          const hex = input.slice(i + 1, i + 3);
          if (isHexPair(hex)) {
            output += "%" + hex.toUpperCase();
            i += 2;
            continue;
          }
        }
        if (isAllowed(ch)) {
          output += ch;
        } else {
          const code = input.charCodeAt(i);
          if (code < 128) {
            output += BYTE_HEX[code];
          } else if (code < 55296 || code > 57343) {
            output += percentEncodeNonAscii(code);
          } else if (code <= 56319 && i + 1 < input.length) {
            const low = input.charCodeAt(i + 1);
            if (low >= 56320 && low <= 57343) {
              output += percentEncodeNonAscii(65536 + (code - 55296 << 10) + (low - 56320));
              i++;
            } else {
              output += percentEncodeNonAscii(65533);
            }
          } else {
            output += percentEncodeNonAscii(65533);
          }
        }
      }
      return output;
    }
    function encodeUserinfo(input) {
      return encodeComponent(input, isUserinfoCharacter);
    }
    function encodeQuery(input) {
      return encodeComponent(input, isQueryFragmentCharacter);
    }
    function encodeFragment(input) {
      return encodeComponent(input, isQueryFragmentCharacter);
    }
    function isEscapeSafe(cp) {
      return cp >= 48 && cp <= 57 || cp >= 65 && cp <= 90 || cp >= 97 && cp <= 122 || cp === 42 || cp === 43 || cp === 45 || cp === 46 || cp === 47 || cp === 64 || cp === 95;
    }
    function normalizeQueryFragmentEncoding(input) {
      let output = "";
      for (let i = 0; i < input.length; i++) {
        const ch = input[i];
        if (ch === "%" && i + 2 < input.length) {
          const hex = input.slice(i + 1, i + 3);
          if (isHexPair(hex)) {
            const normalizedHex = hex.toUpperCase();
            const decoded = String.fromCharCode(parseInt(normalizedHex, 16));
            if (isUnreserved(decoded)) {
              output += decoded;
            } else {
              output += "%" + normalizedHex;
            }
            i += 2;
            continue;
          }
        }
        if (isQueryFragmentCharacter(ch)) {
          output += ch;
        } else {
          const code = input.charCodeAt(i);
          if (code < 128) {
            output += isEscapeSafe(code) ? ch : BYTE_HEX[code];
          } else if (code < 55296 || code > 57343) {
            output += percentEncodeNonAscii(code);
          } else if (code <= 56319 && i + 1 < input.length) {
            const low = input.charCodeAt(i + 1);
            if (low >= 56320 && low <= 57343) {
              output += percentEncodeNonAscii(65536 + (code - 55296 << 10) + (low - 56320));
              i++;
            } else {
              output += percentEncodeNonAscii(65533);
            }
          } else {
            output += percentEncodeNonAscii(65533);
          }
        }
      }
      return output;
    }
    function escapePreservingEscapes(input) {
      let output = "";
      for (let i = 0; i < input.length; i++) {
        if (input[i] === "%" && i + 2 < input.length) {
          const hex = input.slice(i + 1, i + 3);
          if (isHexPair(hex)) {
            output += "%" + hex.toUpperCase();
            i += 2;
            continue;
          }
        }
        output += escape(input[i]);
      }
      return output;
    }
    function recomposeAuthority(component) {
      const uriTokens = [];
      if (component.userinfo !== void 0) {
        uriTokens.push(encodeUserinfo(component.userinfo));
        uriTokens.push("@");
      }
      if (component.host !== void 0) {
        let host = component.host;
        if (!isIPv4(host)) {
          let ipV6res = normalizeIPv6(host);
          if (ipV6res.isIPV6 !== true && ipV6res.isIPVFuture !== true) {
            host = normalizePercentEncoding(host, true);
            ipV6res = normalizeIPv6(host);
          }
          if (ipV6res.isIPV6 === true || ipV6res.isIPVFuture === true) {
            host = `[${ipV6res.escapedHost}]`;
          } else {
            host = reescapeHostDelimiters(host, false);
          }
        }
        uriTokens.push(host);
      }
      if (typeof component.port === "number" || typeof component.port === "string") {
        const port = String(component.port);
        if (!isPort(port)) {
          throw new TypeError("URI port is malformed.");
        }
        uriTokens.push(":");
        uriTokens.push(port);
      }
      return uriTokens.length ? uriTokens.join("") : void 0;
    }
    module.exports = {
      nonSimpleDomain,
      recomposeAuthority,
      reescapeHostDelimiters,
      normalizePercentEncoding,
      normalizePathEncoding,
      serializePathEncoding,
      normalizeQueryFragmentEncoding,
      encodeUserinfo,
      encodeQuery,
      encodeFragment,
      escapePreservingEscapes,
      removeDotSegments,
      removeDotSegmentsRelative,
      isIPv4,
      isUUID,
      normalizeIPv6,
      stringArrayToHexStripped
    };
  }
});

// node_modules/.pnpm/fast-uri@3.1.9/node_modules/fast-uri/lib/schemes.js
var require_schemes = __commonJS({
  "node_modules/.pnpm/fast-uri@3.1.9/node_modules/fast-uri/lib/schemes.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var { isUUID } = require_utils();
    var URN_REG = /^([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-./:;=@]|%[\da-f]{2})+)$/iu;
    var supportedSchemeNames = (
      /** @type {const} */
      [
        "http",
        "https",
        "ws",
        "wss",
        "urn",
        "urn:uuid"
      ]
    );
    function isValidSchemeName(name) {
      return supportedSchemeNames.indexOf(
        /** @type {*} */
        name
      ) !== -1;
    }
    function wsIsSecure(wsComponent) {
      if (wsComponent.secure === true) {
        return true;
      } else if (wsComponent.secure === false) {
        return false;
      } else if (wsComponent.scheme) {
        return wsComponent.scheme.length === 3 && (wsComponent.scheme[0] === "w" || wsComponent.scheme[0] === "W") && (wsComponent.scheme[1] === "s" || wsComponent.scheme[1] === "S") && (wsComponent.scheme[2] === "s" || wsComponent.scheme[2] === "S");
      } else {
        return false;
      }
    }
    function httpParse(component) {
      if (!component.host) {
        component.error = component.error || "HTTP URIs must have a host.";
      }
      return component;
    }
    function httpSerialize(component) {
      const secure = String(component.scheme).toLowerCase() === "https";
      if (component.port === (secure ? 443 : 80) || component.port === "") {
        component.port = void 0;
      }
      if (!component.path) {
        component.path = "/";
      }
      return component;
    }
    function wsParse(wsComponent) {
      wsComponent.secure = wsIsSecure(wsComponent);
      wsComponent.resourceName = (wsComponent.path || "/") + (wsComponent.query ? "?" + wsComponent.query : "");
      wsComponent.path = void 0;
      wsComponent.query = void 0;
      return wsComponent;
    }
    function wsSerialize(wsComponent) {
      if (wsComponent.port === (wsIsSecure(wsComponent) ? 443 : 80) || wsComponent.port === "") {
        wsComponent.port = void 0;
      }
      if (typeof wsComponent.secure === "boolean") {
        wsComponent.scheme = wsComponent.secure ? "wss" : "ws";
        wsComponent.secure = void 0;
      }
      if (wsComponent.resourceName) {
        const queryIndex = wsComponent.resourceName.indexOf("?");
        const path = queryIndex === -1 ? wsComponent.resourceName : wsComponent.resourceName.slice(0, queryIndex);
        wsComponent.path = path && path !== "/" ? path : void 0;
        wsComponent.query = queryIndex === -1 ? void 0 : wsComponent.resourceName.slice(queryIndex + 1);
        wsComponent.resourceName = void 0;
      }
      wsComponent.fragment = void 0;
      return wsComponent;
    }
    function urnParse(urnComponent, options) {
      if (!urnComponent.path) {
        urnComponent.error = "URN can not be parsed";
        return urnComponent;
      }
      const matches = urnComponent.path.match(URN_REG);
      if (matches && matches[0] === urnComponent.path) {
        const scheme = options.scheme || urnComponent.scheme || "urn";
        urnComponent.nid = matches[1].toLowerCase();
        urnComponent.nss = matches[2];
        const urnScheme = `${scheme}:${options.nid || urnComponent.nid}`;
        const schemeHandler = getSchemeHandler(urnScheme);
        urnComponent.path = void 0;
        if (schemeHandler) {
          urnComponent = schemeHandler.parse(urnComponent, options);
        }
      } else {
        urnComponent.error = urnComponent.error || "URN can not be parsed.";
      }
      return urnComponent;
    }
    function urnSerialize(urnComponent, options) {
      if (urnComponent.nid === void 0) {
        throw new Error("URN without nid cannot be serialized");
      }
      const scheme = options.scheme || urnComponent.scheme || "urn";
      const nid = urnComponent.nid.toLowerCase();
      const urnScheme = `${scheme}:${options.nid || nid}`;
      const schemeHandler = getSchemeHandler(urnScheme);
      if (schemeHandler) {
        urnComponent = schemeHandler.serialize(urnComponent, options);
      }
      const uriComponent = urnComponent;
      const nss = urnComponent.nss;
      uriComponent.path = `${nid || options.nid}:${nss}`;
      options.skipEscape = true;
      return uriComponent;
    }
    function urnuuidParse(urnComponent, options) {
      const uuidComponent = urnComponent;
      uuidComponent.uuid = uuidComponent.nss;
      uuidComponent.nss = void 0;
      if (!options.tolerant && (!uuidComponent.uuid || !isUUID(uuidComponent.uuid))) {
        uuidComponent.error = uuidComponent.error || "UUID is not valid.";
      }
      return uuidComponent;
    }
    function urnuuidSerialize(uuidComponent) {
      const urnComponent = uuidComponent;
      urnComponent.nss = (uuidComponent.uuid || "").toLowerCase();
      return urnComponent;
    }
    var http = (
      /** @type {SchemeHandler} */
      {
        scheme: "http",
        domainHost: true,
        parse: httpParse,
        serialize: httpSerialize
      }
    );
    var https = (
      /** @type {SchemeHandler} */
      {
        scheme: "https",
        domainHost: http.domainHost,
        parse: httpParse,
        serialize: httpSerialize
      }
    );
    var ws = (
      /** @type {SchemeHandler} */
      {
        scheme: "ws",
        domainHost: true,
        parse: wsParse,
        serialize: wsSerialize
      }
    );
    var wss = (
      /** @type {SchemeHandler} */
      {
        scheme: "wss",
        domainHost: ws.domainHost,
        parse: ws.parse,
        serialize: ws.serialize
      }
    );
    var urn = (
      /** @type {SchemeHandler} */
      {
        scheme: "urn",
        parse: urnParse,
        serialize: urnSerialize,
        skipNormalize: true
      }
    );
    var urnuuid = (
      /** @type {SchemeHandler} */
      {
        scheme: "urn:uuid",
        parse: urnuuidParse,
        serialize: urnuuidSerialize,
        skipNormalize: true
      }
    );
    var SCHEMES = (
      /** @type {Record<SchemeName, SchemeHandler>} */
      {
        http,
        https,
        ws,
        wss,
        urn,
        "urn:uuid": urnuuid
      }
    );
    Object.setPrototypeOf(SCHEMES, null);
    function getSchemeHandler(scheme) {
      return scheme && (SCHEMES[
        /** @type {SchemeName} */
        scheme
      ] || SCHEMES[
        /** @type {SchemeName} */
        scheme.toLowerCase()
      ]) || void 0;
    }
    module.exports = {
      wsIsSecure,
      SCHEMES,
      isValidSchemeName,
      getSchemeHandler
    };
  }
});

// node_modules/.pnpm/fast-uri@3.1.9/node_modules/fast-uri/index.js
var require_fast_uri = __commonJS({
  "node_modules/.pnpm/fast-uri@3.1.9/node_modules/fast-uri/index.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var { normalizeIPv6, removeDotSegments, removeDotSegmentsRelative, recomposeAuthority, normalizePercentEncoding, normalizePathEncoding, serializePathEncoding, normalizeQueryFragmentEncoding, encodeQuery, encodeFragment, reescapeHostDelimiters, isIPv4, nonSimpleDomain } = require_utils();
    var { SCHEMES, getSchemeHandler } = require_schemes();
    var VALID_SCHEME = /^[A-Za-z][A-Za-z0-9+.-]*$/u;
    var MALFORMED_SCHEME_ERROR = "URI scheme is malformed.";
    var MALFORMED_HOST_ERROR = "URI host is malformed.";
    var FORBIDDEN_DOMAIN_HOST_CHARACTER = /[\0-\x20"#/:<>?@[\\\]^`{|}\x7F]/u;
    function validateScheme(scheme) {
      const stringScheme = String(scheme);
      if (!VALID_SCHEME.test(stringScheme)) {
        throw new TypeError(MALFORMED_SCHEME_ERROR);
      }
      return stringScheme;
    }
    function normalize(uri, options) {
      if (typeof uri === "string") {
        uri = /** @type {T} */
        normalizeString(uri, options);
      } else if (typeof uri === "object") {
        uri = /** @type {T} */
        parse2(serialize(uri, options), options);
      }
      return uri;
    }
    function resolve(baseURI, relativeURI, options) {
      const schemelessOptions = options ? Object.assign({ scheme: "null" }, options) : { scheme: "null" };
      const {
        parsed: baseParsed,
        malformedAuthorityOrPort: baseMalformed,
        malformedPercentEncoding: baseMalformedPercentEncoding,
        malformedSchemeSpecific: baseMalformedSchemeSpecific,
        malformedHost: baseMalformedHost,
        malformedScheme: baseMalformedScheme
      } = parseWithStatus(baseURI, schemelessOptions);
      const {
        parsed: relativeParsed,
        malformedAuthorityOrPort: relativeMalformed,
        malformedPercentEncoding: relativeMalformedPercentEncoding,
        malformedSchemeSpecific: relativeMalformedSchemeSpecific,
        malformedHost: relativeMalformedHost,
        malformedScheme: relativeMalformedScheme
      } = parseWithStatus(relativeURI, schemelessOptions);
      if (baseMalformed || relativeMalformed || baseMalformedPercentEncoding || relativeMalformedPercentEncoding || baseMalformedSchemeSpecific || relativeMalformedSchemeSpecific || baseMalformedHost || relativeMalformedHost || baseMalformedScheme || relativeMalformedScheme) {
        throw new Error(baseParsed.error || relativeParsed.error || "URI is malformed.");
      }
      const resolved = resolveComponent(baseParsed, relativeParsed, schemelessOptions, true);
      const resolvedSchemeHandler = getSchemeHandler(options && options.scheme || resolved.scheme);
      const resolvedHost = resolved.host;
      const resolvedHostIsIP = resolvedHost !== void 0 && resolvedHost !== "" && (isIPv4(resolvedHost) || normalizeIPv6(resolvedHost).isIPV6);
      if (hasForbiddenDomainHost(resolved, options || {}, resolvedSchemeHandler, resolvedHostIsIP)) {
        throw new Error(MALFORMED_HOST_ERROR);
      }
      canonicalizeHost(resolved, options || {}, resolvedSchemeHandler, resolvedHostIsIP);
      const encodedASCIIHost = resolvedHost && resolvedHost.indexOf("%") !== -1 && !new RegExp("\\P{ASCII}", "u").test(resolvedHost);
      if (resolved.error && !encodedASCIIHost) {
        throw new Error(resolved.error);
      }
      schemelessOptions.skipEscape = true;
      return serialize(resolved, schemelessOptions);
    }
    function resolveComponent(base, relative, options, skipNormalization) {
      const target = {};
      if (!skipNormalization) {
        base = parse2(serialize(base, options), options);
        relative = parse2(serialize(relative, options), options);
      }
      options = options || {};
      if (!options.tolerant && relative.scheme) {
        target.scheme = relative.scheme;
        target.userinfo = relative.userinfo;
        target.host = relative.host;
        target.port = relative.port;
        target.path = removeDotSegments(relative.path || "");
        target.query = relative.query;
      } else {
        if (relative.userinfo !== void 0 || relative.host !== void 0 || relative.port !== void 0) {
          target.userinfo = relative.userinfo;
          target.host = relative.host;
          target.port = relative.port;
          target.path = removeDotSegments(relative.path || "");
          target.query = relative.query;
        } else {
          if (!relative.path) {
            target.path = base.path;
            if (relative.query !== void 0) {
              target.query = relative.query;
            } else {
              target.query = base.query;
            }
          } else {
            if (relative.path[0] === "/") {
              target.path = removeDotSegments(relative.path);
            } else {
              const baseHasAuthority = base.userinfo !== void 0 || base.host !== void 0 || base.port !== void 0;
              if (baseHasAuthority && !base.path) {
                target.path = "/" + relative.path;
              } else if (!base.path) {
                target.path = relative.path;
              } else {
                target.path = base.path.slice(0, base.path.lastIndexOf("/") + 1) + relative.path;
              }
              target.path = base.scheme === void 0 && !baseHasAuthority && target.path[0] !== "/" ? removeDotSegmentsRelative(target.path) : removeDotSegments(target.path);
            }
            target.query = relative.query;
          }
          target.userinfo = base.userinfo;
          target.host = base.host;
          target.port = base.port;
        }
        target.scheme = base.scheme;
      }
      target.fragment = relative.fragment;
      return target;
    }
    function equal(uriA, uriB, options) {
      const normalizedA = normalizeComparableURI(uriA, options);
      const normalizedB = normalizeComparableURI(uriB, options);
      return normalizedA !== void 0 && normalizedB !== void 0 && normalizedA === normalizedB;
    }
    function serialize(cmpts, opts) {
      const component = {
        host: cmpts.host,
        scheme: cmpts.scheme,
        userinfo: cmpts.userinfo,
        port: cmpts.port,
        path: cmpts.path,
        query: cmpts.query,
        nid: cmpts.nid,
        nss: cmpts.nss,
        uuid: cmpts.uuid,
        fragment: cmpts.fragment,
        reference: cmpts.reference,
        resourceName: cmpts.resourceName,
        secure: cmpts.secure,
        error: ""
      };
      const options = Object.assign({}, opts);
      const uriTokens = [];
      if (component.scheme) {
        component.scheme = validateScheme(component.scheme);
      }
      const schemeHandler = getSchemeHandler(options.scheme || component.scheme);
      if (schemeHandler && schemeHandler.serialize) schemeHandler.serialize(component, options);
      const hasAuthority = component.userinfo !== void 0 || component.host !== void 0 || component.port !== void 0;
      const schemelessReference = (component.scheme === void 0 || options.reference === "suffix") && !hasAuthority;
      const pathNoScheme = !options.skipEscape && schemelessReference;
      if (component.path !== void 0) {
        if (!options.skipEscape) {
          component.path = serializePathEncoding(component.path, pathNoScheme);
        } else {
          component.path = normalizePercentEncoding(component.path);
        }
      }
      if (options.reference !== "suffix" && component.scheme) {
        component.scheme = validateScheme(component.scheme);
        uriTokens.push(component.scheme, ":");
      }
      const authority = recomposeAuthority(component);
      if (authority !== void 0) {
        if (options.reference !== "suffix") {
          uriTokens.push("//");
        }
        uriTokens.push(authority);
        if (component.path && component.path[0] !== "/") {
          uriTokens.push("/");
        }
      }
      if (component.path !== void 0) {
        let s = component.path;
        if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
          s = schemelessReference && s[0] !== "/" ? removeDotSegmentsRelative(s) : removeDotSegments(s);
        }
        if (schemelessReference) {
          s = serializePathEncoding(s, true);
        }
        if (authority === void 0 && s[0] === "/" && s[1] === "/") {
          s = "/%2F" + s.slice(2);
        }
        uriTokens.push(s);
      }
      if (component.query !== void 0) {
        uriTokens.push("?", encodeQuery(component.query));
      }
      if (component.fragment !== void 0) {
        uriTokens.push("#", encodeFragment(component.fragment));
      }
      return uriTokens.join("");
    }
    var URI_PARSE = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
    var AUTHORITY_PREFIX = /^(?:[^#/:?]+:)?\/\/([^/?#]*)/;
    var AUTHORITY_INTRODUCER_REGION = /^(?:[^#/:?]+:)?([/\\\t\n\r]*)/;
    function getParseError(parsed, matches) {
      if (matches[2] !== void 0 && parsed.path && parsed.path[0] !== "/") {
        return 'URI path must start with "/" when authority is present.';
      }
      if (typeof parsed.port === "number" && (parsed.port < 0 || parsed.port > 65535)) {
        return "URI port is malformed.";
      }
      return void 0;
    }
    function hasMalformedPercentEncoding(component) {
      if (component === void 0) return false;
      let percent = component.indexOf("%");
      while (percent !== -1) {
        if (percent + 2 >= component.length || !/^[\da-f]{2}$/iu.test(component.slice(percent + 1, percent + 3))) {
          return true;
        }
        percent = component.indexOf("%", percent + 3);
      }
      return false;
    }
    function isIPLiteral(host) {
      return host[0] === "[" && host[host.length - 1] === "]";
    }
    function hasMalformedComponentPercentEncoding(matches) {
      const host = matches[4];
      return hasMalformedPercentEncoding(matches[3]) || host !== void 0 && !isIPLiteral(host) && hasMalformedPercentEncoding(host) || hasMalformedPercentEncoding(matches[6]) || hasMalformedPercentEncoding(matches[7]) || hasMalformedPercentEncoding(matches[8]);
    }
    function canonicalizeHost(parsed, options, schemeHandler, isIP) {
      if (hasForbiddenDomainHost(parsed, options, schemeHandler, isIP)) {
        parsed.error = parsed.error || MALFORMED_HOST_ERROR;
        return true;
      }
      if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport) && parsed.host && !isIPLiteral(parsed.host) && (options.domainHost || schemeHandler && schemeHandler.domainHost) && isIP === false && nonSimpleDomain(parsed.host)) {
        let url;
        try {
          url = new URL("http://" + parsed.host);
        } catch (e) {
          parsed.error = parsed.error || "Host's domain name can not be converted to ASCII: " + e;
          return true;
        }
        if (!isHostOnlyURL(url)) {
          parsed.error = parsed.error || MALFORMED_HOST_ERROR;
          return true;
        }
        parsed.host = url.hostname;
      }
      return false;
    }
    function hasForbiddenDomainHost(parsed, options, schemeHandler, isIP) {
      return Boolean(
        parsed.host && isIP === false && !isIPLiteral(parsed.host) && (options.domainHost || schemeHandler && schemeHandler.domainHost) && FORBIDDEN_DOMAIN_HOST_CHARACTER.test(parsed.host)
      );
    }
    function isHostOnlyURL(url) {
      return url.username === "" && url.password === "" && url.port === "" && url.pathname === "/" && url.search === "" && url.hash === "" && url.hostname !== "";
    }
    function parseWithStatus(uri, opts) {
      const options = Object.assign({}, opts);
      const parsed = {
        scheme: void 0,
        userinfo: void 0,
        host: "",
        port: void 0,
        path: "",
        query: void 0,
        fragment: void 0
      };
      let malformedAuthorityOrPort = false;
      let malformedPercentEncoding = false;
      let malformedSchemeSpecific = false;
      let malformedHost = false;
      let malformedIPLiteral = false;
      let malformedScheme = false;
      let isIP = false;
      if (options.reference === "suffix") {
        if (options.scheme) {
          uri = options.scheme + ":" + uri;
        } else {
          uri = "//" + uri;
        }
      }
      const authorityMatch = uri.match(AUTHORITY_PREFIX);
      if (authorityMatch !== null && authorityMatch[1].indexOf("\\") !== -1) {
        parsed.error = "URI authority must not contain a literal backslash.";
        malformedAuthorityOrPort = true;
      }
      const introducerMatch = uri.match(AUTHORITY_INTRODUCER_REGION);
      if (introducerMatch !== null) {
        const region = introducerMatch[1];
        const normalizedRegion = region.replace(/[\t\n\r]/g, "");
        if (normalizedRegion.length >= 2) {
          if (normalizedRegion.slice(0, 2) !== "//") {
            parsed.error = parsed.error || "URI authority must not contain a literal backslash.";
            malformedAuthorityOrPort = true;
          } else if (region.length !== normalizedRegion.length) {
            parsed.error = parsed.error || "URI authority introducer must not contain whitespace.";
            malformedAuthorityOrPort = true;
          }
        }
      }
      const matches = uri.match(URI_PARSE);
      if (matches) {
        parsed.scheme = matches[1];
        parsed.userinfo = matches[3];
        parsed.host = matches[4];
        parsed.port = parseInt(matches[5], 10);
        parsed.path = matches[6] || "";
        parsed.query = matches[7];
        parsed.fragment = matches[8];
        if (parsed.scheme !== void 0) {
          if (VALID_SCHEME.test(parsed.scheme)) {
            parsed.scheme = parsed.scheme.toLowerCase();
          } else {
            parsed.error = parsed.error || MALFORMED_SCHEME_ERROR;
            malformedScheme = true;
          }
        }
        malformedPercentEncoding = hasMalformedComponentPercentEncoding(matches);
        if (malformedPercentEncoding) {
          parsed.error = parsed.error || "URI contains malformed percent-encoding.";
        }
        if (isNaN(parsed.port)) {
          parsed.port = matches[5];
        }
        const parseError = getParseError(parsed, matches);
        if (parseError !== void 0) {
          parsed.error = parsed.error || parseError;
          malformedAuthorityOrPort = true;
        }
        if (parsed.host) {
          const ipv4result = isIPv4(parsed.host);
          if (ipv4result === false) {
            const bracketedIPLiteral = isIPLiteral(parsed.host);
            const hasIPLiteralBracket = parsed.host.indexOf("[") !== -1 || parsed.host.indexOf("]") !== -1;
            const ipv6result = normalizeIPv6(parsed.host);
            isIP = ipv6result.isIPV6 || ipv6result.isIPVFuture === true;
            malformedIPLiteral = hasIPLiteralBracket && (!bracketedIPLiteral || ipv6result.error === true);
            parsed.host = isIP ? ipv6result.host : ipv6result.host.toLowerCase();
            if (malformedIPLiteral) {
              parsed.error = parsed.error || MALFORMED_HOST_ERROR;
              malformedAuthorityOrPort = true;
            }
          } else {
            isIP = true;
          }
        }
        if (parsed.scheme === void 0 && parsed.userinfo === void 0 && parsed.host === void 0 && parsed.port === void 0 && parsed.query === void 0 && !parsed.path) {
          parsed.reference = "same-document";
        } else if (parsed.scheme === void 0) {
          parsed.reference = "relative";
        } else if (parsed.fragment === void 0) {
          parsed.reference = "absolute";
        } else {
          parsed.reference = "uri";
        }
        if (options.reference && options.reference !== "suffix" && options.reference !== parsed.reference) {
          parsed.error = parsed.error || "URI is not a " + options.reference + " reference.";
        }
        const schemeHandler = getSchemeHandler(options.scheme || parsed.scheme);
        if (!malformedIPLiteral) {
          malformedHost = canonicalizeHost(parsed, options, schemeHandler, isIP);
        }
        if (uri.indexOf("%") !== -1 && parsed.host !== void 0 && !malformedIPLiteral) {
          let host = isIP ? parsed.host : normalizePercentEncoding(parsed.host, true);
          if (!isIP) {
            host = normalizePercentEncoding(host.toLowerCase());
          }
          parsed.host = isIP || options.scheme !== "null" ? reescapeHostDelimiters(host, isIP) : host;
        }
        if (!schemeHandler || schemeHandler && !schemeHandler.skipNormalize) {
          if (parsed.path) {
            parsed.path = normalizePathEncoding(parsed.path);
          }
          if (parsed.query) {
            parsed.query = normalizeQueryFragmentEncoding(parsed.query);
          }
          if (parsed.fragment) {
            parsed.fragment = normalizeQueryFragmentEncoding(parsed.fragment);
          }
        }
        if (schemeHandler && schemeHandler.parse) {
          schemeHandler.parse(parsed, options);
          if (schemeHandler === SCHEMES.urn && parsed.nid === void 0) {
            malformedSchemeSpecific = true;
          }
        }
      } else {
        parsed.error = parsed.error || "URI can not be parsed.";
      }
      return { parsed, malformedAuthorityOrPort, malformedPercentEncoding, malformedSchemeSpecific, malformedHost, malformedScheme };
    }
    function parse2(uri, opts) {
      return parseWithStatus(uri, opts).parsed;
    }
    function normalizeString(uri, opts) {
      return normalizeStringWithStatus(uri, opts).normalized;
    }
    function normalizeStringWithStatus(uri, opts) {
      const { parsed, malformedAuthorityOrPort, malformedPercentEncoding, malformedSchemeSpecific, malformedHost, malformedScheme } = parseWithStatus(uri, opts);
      return {
        normalized: malformedAuthorityOrPort || malformedPercentEncoding || malformedSchemeSpecific || malformedHost || malformedScheme ? uri : serialize(parsed, opts),
        malformedAuthorityOrPort,
        malformedPercentEncoding,
        malformedSchemeSpecific,
        malformedHost,
        malformedScheme
      };
    }
    function normalizeComparableURI(uri, opts) {
      if (typeof uri !== "string" && typeof uri !== "object") {
        return void 0;
      }
      let value;
      try {
        value = typeof uri === "string" ? uri : serialize(uri, opts);
      } catch {
        return void 0;
      }
      const { normalized, malformedAuthorityOrPort, malformedPercentEncoding, malformedSchemeSpecific, malformedHost, malformedScheme } = normalizeStringWithStatus(value, opts);
      return malformedAuthorityOrPort || malformedPercentEncoding || malformedSchemeSpecific || malformedHost || malformedScheme ? void 0 : normalized;
    }
    var fastUri = {
      SCHEMES,
      normalize,
      resolve,
      resolveComponent,
      equal,
      serialize,
      parse: parse2
    };
    module.exports = fastUri;
    module.exports.default = fastUri;
    module.exports.fastUri = fastUri;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/runtime/uri.js
var require_uri = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/runtime/uri.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var uri = require_fast_uri();
    uri.code = 'require("ajv/dist/runtime/uri").default';
    exports.default = uri;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/core.js
var require_core = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/core.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
    var validate_1 = require_validate();
    Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function() {
      return validate_1.KeywordCxt;
    } });
    var codegen_1 = require_codegen();
    Object.defineProperty(exports, "_", { enumerable: true, get: function() {
      return codegen_1._;
    } });
    Object.defineProperty(exports, "str", { enumerable: true, get: function() {
      return codegen_1.str;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return codegen_1.stringify;
    } });
    Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
      return codegen_1.nil;
    } });
    Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
      return codegen_1.Name;
    } });
    Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function() {
      return codegen_1.CodeGen;
    } });
    var validation_error_1 = require_validation_error();
    var ref_error_1 = require_ref_error();
    var rules_1 = require_rules();
    var compile_1 = require_compile();
    var codegen_2 = require_codegen();
    var resolve_1 = require_resolve();
    var dataType_1 = require_dataType();
    var util_1 = require_util();
    var $dataRefSchema = require_data();
    var uri_1 = require_uri();
    var defaultRegExp = (str, flags) => new RegExp(str, flags);
    defaultRegExp.code = "new RegExp";
    var META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"];
    var EXT_SCOPE_NAMES = /* @__PURE__ */ new Set([
      "validate",
      "serialize",
      "parse",
      "wrapper",
      "root",
      "schema",
      "keyword",
      "pattern",
      "formats",
      "validate$data",
      "func",
      "obj",
      "Error"
    ]);
    var removedOptions = {
      errorDataPath: "",
      format: "`validateFormats: false` can be used instead.",
      nullable: '"nullable" keyword is supported by default.',
      jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
      extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
      missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
      processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
      sourceCode: "Use option `code: {source: true}`",
      strictDefaults: "It is default now, see option `strict`.",
      strictKeywords: "It is default now, see option `strict`.",
      uniqueItems: '"uniqueItems" keyword is always validated.',
      unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
      cache: "Map is used as cache, schema object as key.",
      serialize: "Map is used as cache, schema object as key.",
      ajvErrors: "It is default now."
    };
    var deprecatedOptions = {
      ignoreKeywordsWithRef: "",
      jsPropertySyntax: "",
      unicode: '"minLength"/"maxLength" account for unicode characters by default.'
    };
    var MAX_EXPRESSION = 200;
    function requiredOptions(o) {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0;
      const s = o.strict;
      const _optz = (_a = o.code) === null || _a === void 0 ? void 0 : _a.optimize;
      const optimize = _optz === true || _optz === void 0 ? 1 : _optz || 0;
      const regExp = (_c = (_b = o.code) === null || _b === void 0 ? void 0 : _b.regExp) !== null && _c !== void 0 ? _c : defaultRegExp;
      const uriResolver = (_d = o.uriResolver) !== null && _d !== void 0 ? _d : uri_1.default;
      return {
        strictSchema: (_f = (_e = o.strictSchema) !== null && _e !== void 0 ? _e : s) !== null && _f !== void 0 ? _f : true,
        strictNumbers: (_h = (_g = o.strictNumbers) !== null && _g !== void 0 ? _g : s) !== null && _h !== void 0 ? _h : true,
        strictTypes: (_k = (_j = o.strictTypes) !== null && _j !== void 0 ? _j : s) !== null && _k !== void 0 ? _k : "log",
        strictTuples: (_m = (_l = o.strictTuples) !== null && _l !== void 0 ? _l : s) !== null && _m !== void 0 ? _m : "log",
        strictRequired: (_p = (_o = o.strictRequired) !== null && _o !== void 0 ? _o : s) !== null && _p !== void 0 ? _p : false,
        code: o.code ? { ...o.code, optimize, regExp } : { optimize, regExp },
        loopRequired: (_q = o.loopRequired) !== null && _q !== void 0 ? _q : MAX_EXPRESSION,
        loopEnum: (_r = o.loopEnum) !== null && _r !== void 0 ? _r : MAX_EXPRESSION,
        meta: (_s = o.meta) !== null && _s !== void 0 ? _s : true,
        messages: (_t = o.messages) !== null && _t !== void 0 ? _t : true,
        inlineRefs: (_u = o.inlineRefs) !== null && _u !== void 0 ? _u : true,
        schemaId: (_v = o.schemaId) !== null && _v !== void 0 ? _v : "$id",
        addUsedSchema: (_w = o.addUsedSchema) !== null && _w !== void 0 ? _w : true,
        validateSchema: (_x = o.validateSchema) !== null && _x !== void 0 ? _x : true,
        validateFormats: (_y = o.validateFormats) !== null && _y !== void 0 ? _y : true,
        unicodeRegExp: (_z = o.unicodeRegExp) !== null && _z !== void 0 ? _z : true,
        int32range: (_0 = o.int32range) !== null && _0 !== void 0 ? _0 : true,
        uriResolver
      };
    }
    var Ajv2 = class {
      constructor(opts = {}) {
        this.schemas = {};
        this.refs = {};
        this.formats = /* @__PURE__ */ Object.create(null);
        this._compilations = /* @__PURE__ */ new Set();
        this._loading = {};
        this._cache = /* @__PURE__ */ new Map();
        opts = this.opts = { ...opts, ...requiredOptions(opts) };
        const { es5, lines } = this.opts.code;
        this.scope = new codegen_2.ValueScope({ scope: {}, prefixes: EXT_SCOPE_NAMES, es5, lines });
        this.logger = getLogger(opts.logger);
        const formatOpt = opts.validateFormats;
        opts.validateFormats = false;
        this.RULES = (0, rules_1.getRules)();
        checkOptions.call(this, removedOptions, opts, "NOT SUPPORTED");
        checkOptions.call(this, deprecatedOptions, opts, "DEPRECATED", "warn");
        this._metaOpts = getMetaSchemaOptions.call(this);
        if (opts.formats)
          addInitialFormats.call(this);
        this._addVocabularies();
        this._addDefaultMetaSchema();
        if (opts.keywords)
          addInitialKeywords.call(this, opts.keywords);
        if (typeof opts.meta == "object")
          this.addMetaSchema(opts.meta);
        addInitialSchemas.call(this);
        opts.validateFormats = formatOpt;
      }
      _addVocabularies() {
        this.addKeyword("$async");
      }
      _addDefaultMetaSchema() {
        const { $data, meta, schemaId } = this.opts;
        let _dataRefSchema = $dataRefSchema;
        if (schemaId === "id") {
          _dataRefSchema = { ...$dataRefSchema };
          _dataRefSchema.id = _dataRefSchema.$id;
          delete _dataRefSchema.$id;
        }
        if (meta && $data)
          this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], false);
      }
      defaultMeta() {
        const { meta, schemaId } = this.opts;
        return this.opts.defaultMeta = typeof meta == "object" ? meta[schemaId] || meta : void 0;
      }
      validate(schemaKeyRef, data) {
        let v;
        if (typeof schemaKeyRef == "string") {
          v = this.getSchema(schemaKeyRef);
          if (!v)
            throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
        } else {
          v = this.compile(schemaKeyRef);
        }
        const valid = v(data);
        if (!("$async" in v))
          this.errors = v.errors;
        return valid;
      }
      compile(schema, _meta) {
        const sch = this._addSchema(schema, _meta);
        return sch.validate || this._compileSchemaEnv(sch);
      }
      compileAsync(schema, meta) {
        if (typeof this.opts.loadSchema != "function") {
          throw new Error("options.loadSchema should be a function");
        }
        const { loadSchema } = this.opts;
        return runCompileAsync.call(this, schema, meta);
        async function runCompileAsync(_schema, _meta) {
          await loadMetaSchema.call(this, _schema.$schema);
          const sch = this._addSchema(_schema, _meta);
          return sch.validate || _compileAsync.call(this, sch);
        }
        async function loadMetaSchema($ref) {
          if ($ref && !this.getSchema($ref)) {
            await runCompileAsync.call(this, { $ref }, true);
          }
        }
        async function _compileAsync(sch) {
          try {
            return this._compileSchemaEnv(sch);
          } catch (e) {
            if (!(e instanceof ref_error_1.default))
              throw e;
            checkLoaded.call(this, e);
            await loadMissingSchema.call(this, e.missingSchema);
            return _compileAsync.call(this, sch);
          }
        }
        function checkLoaded({ missingSchema: ref, missingRef }) {
          if (this.refs[ref]) {
            throw new Error(`AnySchema ${ref} is loaded but ${missingRef} cannot be resolved`);
          }
        }
        async function loadMissingSchema(ref) {
          const _schema = await _loadSchema.call(this, ref);
          if (!this.refs[ref])
            await loadMetaSchema.call(this, _schema.$schema);
          if (!this.refs[ref])
            this.addSchema(_schema, ref, meta);
        }
        async function _loadSchema(ref) {
          const p = this._loading[ref];
          if (p)
            return p;
          try {
            return await (this._loading[ref] = loadSchema(ref));
          } finally {
            delete this._loading[ref];
          }
        }
      }
      // Adds schema to the instance
      addSchema(schema, key, _meta, _validateSchema = this.opts.validateSchema) {
        if (Array.isArray(schema)) {
          for (const sch of schema)
            this.addSchema(sch, void 0, _meta, _validateSchema);
          return this;
        }
        let id;
        if (typeof schema === "object") {
          const { schemaId } = this.opts;
          id = schema[schemaId];
          if (id !== void 0 && typeof id != "string") {
            throw new Error(`schema ${schemaId} must be string`);
          }
        }
        key = (0, resolve_1.normalizeId)(key || id);
        this._checkUnique(key);
        this.schemas[key] = this._addSchema(schema, _meta, key, _validateSchema, true);
        return this;
      }
      // Add schema that will be used to validate other schemas
      // options in META_IGNORE_OPTIONS are alway set to false
      addMetaSchema(schema, key, _validateSchema = this.opts.validateSchema) {
        this.addSchema(schema, key, true, _validateSchema);
        return this;
      }
      //  Validate schema against its meta-schema
      validateSchema(schema, throwOrLogError) {
        if (typeof schema == "boolean")
          return true;
        let $schema;
        $schema = schema.$schema;
        if ($schema !== void 0 && typeof $schema != "string") {
          throw new Error("$schema must be a string");
        }
        $schema = $schema || this.opts.defaultMeta || this.defaultMeta();
        if (!$schema) {
          this.logger.warn("meta-schema not available");
          this.errors = null;
          return true;
        }
        const valid = this.validate($schema, schema);
        if (!valid && throwOrLogError) {
          const message = "schema is invalid: " + this.errorsText();
          if (this.opts.validateSchema === "log")
            this.logger.error(message);
          else
            throw new Error(message);
        }
        return valid;
      }
      // Get compiled schema by `key` or `ref`.
      // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
      getSchema(keyRef) {
        let sch;
        while (typeof (sch = getSchEnv.call(this, keyRef)) == "string")
          keyRef = sch;
        if (sch === void 0) {
          const { schemaId } = this.opts;
          const root = new compile_1.SchemaEnv({ schema: {}, schemaId });
          sch = compile_1.resolveSchema.call(this, root, keyRef);
          if (!sch)
            return;
          this.refs[keyRef] = sch;
        }
        return sch.validate || this._compileSchemaEnv(sch);
      }
      // Remove cached schema(s).
      // If no parameter is passed all schemas but meta-schemas are removed.
      // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
      // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
      removeSchema(schemaKeyRef) {
        if (schemaKeyRef instanceof RegExp) {
          this._removeAllSchemas(this.schemas, schemaKeyRef);
          this._removeAllSchemas(this.refs, schemaKeyRef);
          return this;
        }
        switch (typeof schemaKeyRef) {
          case "undefined":
            this._removeAllSchemas(this.schemas);
            this._removeAllSchemas(this.refs);
            this._cache.clear();
            return this;
          case "string": {
            const sch = getSchEnv.call(this, schemaKeyRef);
            if (typeof sch == "object")
              this._cache.delete(sch.schema);
            delete this.schemas[schemaKeyRef];
            delete this.refs[schemaKeyRef];
            return this;
          }
          case "object": {
            const cacheKey = schemaKeyRef;
            this._cache.delete(cacheKey);
            let id = schemaKeyRef[this.opts.schemaId];
            if (id) {
              id = (0, resolve_1.normalizeId)(id);
              delete this.schemas[id];
              delete this.refs[id];
            }
            return this;
          }
          default:
            throw new Error("ajv.removeSchema: invalid parameter");
        }
      }
      // add "vocabulary" - a collection of keywords
      addVocabulary(definitions) {
        for (const def of definitions)
          this.addKeyword(def);
        return this;
      }
      addKeyword(kwdOrDef, def) {
        let keyword;
        if (typeof kwdOrDef == "string") {
          keyword = kwdOrDef;
          if (typeof def == "object") {
            this.logger.warn("these parameters are deprecated, see docs for addKeyword");
            def.keyword = keyword;
          }
        } else if (typeof kwdOrDef == "object" && def === void 0) {
          def = kwdOrDef;
          keyword = def.keyword;
          if (Array.isArray(keyword) && !keyword.length) {
            throw new Error("addKeywords: keyword must be string or non-empty array");
          }
        } else {
          throw new Error("invalid addKeywords parameters");
        }
        checkKeyword.call(this, keyword, def);
        if (!def) {
          (0, util_1.eachItem)(keyword, (kwd) => addRule.call(this, kwd));
          return this;
        }
        keywordMetaschema.call(this, def);
        const definition = {
          ...def,
          type: (0, dataType_1.getJSONTypes)(def.type),
          schemaType: (0, dataType_1.getJSONTypes)(def.schemaType)
        };
        (0, util_1.eachItem)(keyword, definition.type.length === 0 ? (k) => addRule.call(this, k, definition) : (k) => definition.type.forEach((t) => addRule.call(this, k, definition, t)));
        return this;
      }
      getKeyword(keyword) {
        const rule = this.RULES.all[keyword];
        return typeof rule == "object" ? rule.definition : !!rule;
      }
      // Remove keyword
      removeKeyword(keyword) {
        const { RULES: RULES2 } = this;
        delete RULES2.keywords[keyword];
        delete RULES2.all[keyword];
        for (const group of RULES2.rules) {
          const i = group.rules.findIndex((rule) => rule.keyword === keyword);
          if (i >= 0)
            group.rules.splice(i, 1);
        }
        return this;
      }
      // Add format
      addFormat(name, format) {
        if (typeof format == "string")
          format = new RegExp(format);
        this.formats[name] = format;
        return this;
      }
      errorsText(errors = this.errors, { separator = ", ", dataVar = "data" } = {}) {
        if (!errors || errors.length === 0)
          return "No errors";
        return errors.map((e) => `${dataVar}${e.instancePath} ${e.message}`).reduce((text, msg) => text + separator + msg);
      }
      $dataMetaSchema(metaSchema, keywordsJsonPointers) {
        const rules = this.RULES.all;
        metaSchema = JSON.parse(JSON.stringify(metaSchema));
        for (const jsonPointer of keywordsJsonPointers) {
          const segments = jsonPointer.split("/").slice(1);
          let keywords = metaSchema;
          for (const seg of segments)
            keywords = keywords[seg];
          for (const key in rules) {
            const rule = rules[key];
            if (typeof rule != "object")
              continue;
            const { $data } = rule.definition;
            const schema = keywords[key];
            if ($data && schema)
              keywords[key] = schemaOrData(schema);
          }
        }
        return metaSchema;
      }
      _removeAllSchemas(schemas, regex) {
        for (const keyRef in schemas) {
          const sch = schemas[keyRef];
          if (!regex || regex.test(keyRef)) {
            if (typeof sch == "string") {
              delete schemas[keyRef];
            } else if (sch && !sch.meta) {
              this._cache.delete(sch.schema);
              delete schemas[keyRef];
            }
          }
        }
      }
      _addSchema(schema, meta, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
        let id;
        const { schemaId } = this.opts;
        if (typeof schema == "object") {
          id = schema[schemaId];
        } else {
          if (this.opts.jtd)
            throw new Error("schema must be object");
          else if (typeof schema != "boolean")
            throw new Error("schema must be object or boolean");
        }
        let sch = this._cache.get(schema);
        if (sch !== void 0)
          return sch;
        baseId = (0, resolve_1.normalizeId)(id || baseId);
        const localRefs = resolve_1.getSchemaRefs.call(this, schema, baseId);
        sch = new compile_1.SchemaEnv({ schema, schemaId, meta, baseId, localRefs });
        this._cache.set(sch.schema, sch);
        if (addSchema && !baseId.startsWith("#")) {
          if (baseId)
            this._checkUnique(baseId);
          this.refs[baseId] = sch;
        }
        if (validateSchema)
          this.validateSchema(schema, true);
        return sch;
      }
      _checkUnique(id) {
        if (this.schemas[id] || this.refs[id]) {
          throw new Error(`schema with key or id "${id}" already exists`);
        }
      }
      _compileSchemaEnv(sch) {
        if (sch.meta)
          this._compileMetaSchema(sch);
        else
          compile_1.compileSchema.call(this, sch);
        if (!sch.validate)
          throw new Error("ajv implementation error");
        return sch.validate;
      }
      _compileMetaSchema(sch) {
        const currentOpts = this.opts;
        this.opts = this._metaOpts;
        try {
          compile_1.compileSchema.call(this, sch);
        } finally {
          this.opts = currentOpts;
        }
      }
    };
    Ajv2.ValidationError = validation_error_1.default;
    Ajv2.MissingRefError = ref_error_1.default;
    exports.default = Ajv2;
    function checkOptions(checkOpts, options, msg, log = "error") {
      for (const key in checkOpts) {
        const opt = key;
        if (opt in options)
          this.logger[log](`${msg}: option ${key}. ${checkOpts[opt]}`);
      }
    }
    function getSchEnv(keyRef) {
      keyRef = (0, resolve_1.normalizeId)(keyRef);
      return this.schemas[keyRef] || this.refs[keyRef];
    }
    function addInitialSchemas() {
      const optsSchemas = this.opts.schemas;
      if (!optsSchemas)
        return;
      if (Array.isArray(optsSchemas))
        this.addSchema(optsSchemas);
      else
        for (const key in optsSchemas)
          this.addSchema(optsSchemas[key], key);
    }
    function addInitialFormats() {
      for (const name in this.opts.formats) {
        const format = this.opts.formats[name];
        if (format)
          this.addFormat(name, format);
      }
    }
    function addInitialKeywords(defs) {
      if (Array.isArray(defs)) {
        this.addVocabulary(defs);
        return;
      }
      this.logger.warn("keywords option as map is deprecated, pass array");
      for (const keyword in defs) {
        const def = defs[keyword];
        if (!def.keyword)
          def.keyword = keyword;
        this.addKeyword(def);
      }
    }
    function getMetaSchemaOptions() {
      const metaOpts = { ...this.opts };
      for (const opt of META_IGNORE_OPTIONS)
        delete metaOpts[opt];
      return metaOpts;
    }
    var noLogs = { log() {
    }, warn() {
    }, error() {
    } };
    function getLogger(logger) {
      if (logger === false)
        return noLogs;
      if (logger === void 0)
        return console;
      if (logger.log && logger.warn && logger.error)
        return logger;
      throw new Error("logger must implement log, warn and error methods");
    }
    var KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
    function checkKeyword(keyword, def) {
      const { RULES: RULES2 } = this;
      (0, util_1.eachItem)(keyword, (kwd) => {
        if (RULES2.keywords[kwd])
          throw new Error(`Keyword ${kwd} is already defined`);
        if (!KEYWORD_NAME.test(kwd))
          throw new Error(`Keyword ${kwd} has invalid name`);
      });
      if (!def)
        return;
      if (def.$data && !("code" in def || "validate" in def)) {
        throw new Error('$data keyword must have "code" or "validate" function');
      }
    }
    function addRule(keyword, definition, dataType) {
      var _a;
      const post = definition === null || definition === void 0 ? void 0 : definition.post;
      if (dataType && post)
        throw new Error('keyword with "post" flag cannot have "type"');
      const { RULES: RULES2 } = this;
      let ruleGroup = post ? RULES2.post : RULES2.rules.find(({ type: t }) => t === dataType);
      if (!ruleGroup) {
        ruleGroup = { type: dataType, rules: [] };
        RULES2.rules.push(ruleGroup);
      }
      RULES2.keywords[keyword] = true;
      if (!definition)
        return;
      const rule = {
        keyword,
        definition: {
          ...definition,
          type: (0, dataType_1.getJSONTypes)(definition.type),
          schemaType: (0, dataType_1.getJSONTypes)(definition.schemaType)
        }
      };
      if (definition.before)
        addBeforeRule.call(this, ruleGroup, rule, definition.before);
      else
        ruleGroup.rules.push(rule);
      RULES2.all[keyword] = rule;
      (_a = definition.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd) => this.addKeyword(kwd));
    }
    function addBeforeRule(ruleGroup, rule, before) {
      const i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
      if (i >= 0) {
        ruleGroup.rules.splice(i, 0, rule);
      } else {
        ruleGroup.rules.push(rule);
        this.logger.warn(`rule ${before} is not defined`);
      }
    }
    function keywordMetaschema(def) {
      let { metaSchema } = def;
      if (metaSchema === void 0)
        return;
      if (def.$data && this.opts.$data)
        metaSchema = schemaOrData(metaSchema);
      def.validateSchema = this.compile(metaSchema, true);
    }
    var $dataRef = {
      $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
    };
    function schemaOrData(schema) {
      return { anyOf: [schema, $dataRef] };
    }
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/core/id.js
var require_id = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/core/id.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var def = {
      keyword: "id",
      code() {
        throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
      }
    };
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/core/ref.js
var require_ref = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/core/ref.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.callRef = exports.getValidate = void 0;
    var ref_error_1 = require_ref_error();
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var compile_1 = require_compile();
    var util_1 = require_util();
    var def = {
      keyword: "$ref",
      schemaType: "string",
      code(cxt) {
        const { gen, schema: $ref, it } = cxt;
        const { baseId, schemaEnv: env, validateName, opts, self } = it;
        const { root } = env;
        if (($ref === "#" || $ref === "#/") && baseId === root.baseId)
          return callRootRef();
        const schOrEnv = compile_1.resolveRef.call(self, root, baseId, $ref);
        if (schOrEnv === void 0)
          throw new ref_error_1.default(it.opts.uriResolver, baseId, $ref);
        if (schOrEnv instanceof compile_1.SchemaEnv)
          return callValidate(schOrEnv);
        return inlineRefSchema(schOrEnv);
        function callRootRef() {
          if (env === root)
            return callRef(cxt, validateName, env, env.$async);
          const rootName = gen.scopeValue("root", { ref: root });
          return callRef(cxt, (0, codegen_1._)`${rootName}.validate`, root, root.$async);
        }
        function callValidate(sch) {
          const v = getValidate(cxt, sch);
          callRef(cxt, v, sch, sch.$async);
        }
        function inlineRefSchema(sch) {
          const schName = gen.scopeValue("schema", opts.code.source === true ? { ref: sch, code: (0, codegen_1.stringify)(sch) } : { ref: sch });
          const valid = gen.name("valid");
          const schCxt = cxt.subschema({
            schema: sch,
            dataTypes: [],
            schemaPath: codegen_1.nil,
            topSchemaRef: schName,
            errSchemaPath: $ref
          }, valid);
          cxt.mergeEvaluated(schCxt);
          cxt.ok(valid);
        }
      }
    };
    function getValidate(cxt, sch) {
      const { gen } = cxt;
      return sch.validate ? gen.scopeValue("validate", { ref: sch.validate }) : (0, codegen_1._)`${gen.scopeValue("wrapper", { ref: sch })}.validate`;
    }
    exports.getValidate = getValidate;
    function callRef(cxt, v, sch, $async) {
      const { gen, it } = cxt;
      const { allErrors, schemaEnv: env, opts } = it;
      const passCxt = opts.passContext ? names_1.default.this : codegen_1.nil;
      if ($async)
        callAsyncRef();
      else
        callSyncRef();
      function callAsyncRef() {
        if (!env.$async)
          throw new Error("async schema referenced by sync schema");
        const valid = gen.let("valid");
        gen.try(() => {
          gen.code((0, codegen_1._)`await ${(0, code_1.callValidateCode)(cxt, v, passCxt)}`);
          addEvaluatedFrom(v);
          if (!allErrors)
            gen.assign(valid, true);
        }, (e) => {
          gen.if((0, codegen_1._)`!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e));
          addErrorsFrom(e);
          if (!allErrors)
            gen.assign(valid, false);
        });
        cxt.ok(valid);
      }
      function callSyncRef() {
        cxt.result((0, code_1.callValidateCode)(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
      }
      function addErrorsFrom(source) {
        const errs = (0, codegen_1._)`${source}.errors`;
        gen.assign(names_1.default.vErrors, (0, codegen_1._)`${names_1.default.vErrors} === null ? ${errs} : ${names_1.default.vErrors}.concat(${errs})`);
        gen.assign(names_1.default.errors, (0, codegen_1._)`${names_1.default.vErrors}.length`);
      }
      function addEvaluatedFrom(source) {
        var _a;
        if (!it.opts.unevaluated)
          return;
        const schEvaluated = (_a = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
        if (it.props !== true) {
          if (schEvaluated && !schEvaluated.dynamicProps) {
            if (schEvaluated.props !== void 0) {
              it.props = util_1.mergeEvaluated.props(gen, schEvaluated.props, it.props);
            }
          } else {
            const props = gen.var("props", (0, codegen_1._)`${source}.evaluated.props`);
            it.props = util_1.mergeEvaluated.props(gen, props, it.props, codegen_1.Name);
          }
        }
        if (it.items !== true) {
          if (schEvaluated && !schEvaluated.dynamicItems) {
            if (schEvaluated.items !== void 0) {
              it.items = util_1.mergeEvaluated.items(gen, schEvaluated.items, it.items);
            }
          } else {
            const items = gen.var("items", (0, codegen_1._)`${source}.evaluated.items`);
            it.items = util_1.mergeEvaluated.items(gen, items, it.items, codegen_1.Name);
          }
        }
      }
    }
    exports.callRef = callRef;
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/core/index.js
var require_core2 = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/core/index.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var id_1 = require_id();
    var ref_1 = require_ref();
    var core = [
      "$schema",
      "$id",
      "$defs",
      "$vocabulary",
      { keyword: "$comment" },
      "definitions",
      id_1.default,
      ref_1.default
    ];
    exports.default = core;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/limitNumber.js
var require_limitNumber = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/limitNumber.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var ops = codegen_1.operators;
    var KWDs = {
      maximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
      minimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
      exclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
      exclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE }
    };
    var error = {
      message: ({ keyword, schemaCode }) => (0, codegen_1.str)`must be ${KWDs[keyword].okStr} ${schemaCode}`,
      params: ({ keyword, schemaCode }) => (0, codegen_1._)`{comparison: ${KWDs[keyword].okStr}, limit: ${schemaCode}}`
    };
    var def = {
      keyword: Object.keys(KWDs),
      type: "number",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        cxt.fail$data((0, codegen_1._)`${data} ${KWDs[keyword].fail} ${schemaCode} || isNaN(${data})`);
      }
    };
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/multipleOf.js
var require_multipleOf = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/multipleOf.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message: ({ schemaCode }) => (0, codegen_1.str)`must be multiple of ${schemaCode}`,
      params: ({ schemaCode }) => (0, codegen_1._)`{multipleOf: ${schemaCode}}`
    };
    var def = {
      keyword: "multipleOf",
      type: "number",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, schemaCode, it } = cxt;
        const prec = it.opts.multipleOfPrecision;
        const res = gen.let("res");
        const invalid = prec ? (0, codegen_1._)`Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}` : (0, codegen_1._)`${res} !== parseInt(${res})`;
        cxt.fail$data((0, codegen_1._)`(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
      }
    };
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/runtime/ucs2length.js
var require_ucs2length = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/runtime/ucs2length.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    function ucs2length(str) {
      const len = str.length;
      let length = 0;
      let pos = 0;
      let value;
      while (pos < len) {
        length++;
        value = str.charCodeAt(pos++);
        if (value >= 55296 && value <= 56319 && pos < len) {
          value = str.charCodeAt(pos);
          if ((value & 64512) === 56320)
            pos++;
        }
      }
      return length;
    }
    exports.default = ucs2length;
    ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/limitLength.js
var require_limitLength = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/limitLength.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var ucs2length_1 = require_ucs2length();
    var error = {
      message({ keyword, schemaCode }) {
        const comp = keyword === "maxLength" ? "more" : "fewer";
        return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} characters`;
      },
      params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
    };
    var def = {
      keyword: ["maxLength", "minLength"],
      type: "string",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode, it } = cxt;
        const op = keyword === "maxLength" ? codegen_1.operators.GT : codegen_1.operators.LT;
        const len = it.opts.unicode === false ? (0, codegen_1._)`${data}.length` : (0, codegen_1._)`${(0, util_1.useFunc)(cxt.gen, ucs2length_1.default)}(${data})`;
        cxt.fail$data((0, codegen_1._)`${len} ${op} ${schemaCode}`);
      }
    };
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/pattern.js
var require_pattern = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/pattern.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var util_1 = require_util();
    var codegen_1 = require_codegen();
    var error = {
      message: ({ schemaCode }) => (0, codegen_1.str)`must match pattern "${schemaCode}"`,
      params: ({ schemaCode }) => (0, codegen_1._)`{pattern: ${schemaCode}}`
    };
    var def = {
      keyword: "pattern",
      type: "string",
      schemaType: "string",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        const u = it.opts.unicodeRegExp ? "u" : "";
        if ($data) {
          const { regExp } = it.opts.code;
          const regExpCode = regExp.code === "new RegExp" ? (0, codegen_1._)`new RegExp` : (0, util_1.useFunc)(gen, regExp);
          const valid = gen.let("valid");
          gen.try(() => gen.assign(valid, (0, codegen_1._)`${regExpCode}(${schemaCode}, ${u}).test(${data})`), () => gen.assign(valid, false));
          cxt.fail$data((0, codegen_1._)`!${valid}`);
        } else {
          const regExp = (0, code_1.usePattern)(cxt, schema);
          cxt.fail$data((0, codegen_1._)`!${regExp}.test(${data})`);
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/limitProperties.js
var require_limitProperties = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/limitProperties.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message({ keyword, schemaCode }) {
        const comp = keyword === "maxProperties" ? "more" : "fewer";
        return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} properties`;
      },
      params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
    };
    var def = {
      keyword: ["maxProperties", "minProperties"],
      type: "object",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxProperties" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._)`Object.keys(${data}).length ${op} ${schemaCode}`);
      }
    };
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/required.js
var require_required = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/required.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params: { missingProperty } }) => (0, codegen_1.str)`must have required property '${missingProperty}'`,
      params: ({ params: { missingProperty } }) => (0, codegen_1._)`{missingProperty: ${missingProperty}}`
    };
    var def = {
      keyword: "required",
      type: "object",
      schemaType: "array",
      $data: true,
      error,
      code(cxt) {
        const { gen, schema, schemaCode, data, $data, it } = cxt;
        const { opts } = it;
        if (!$data && schema.length === 0)
          return;
        const useLoop = schema.length >= opts.loopRequired;
        if (it.allErrors)
          allErrorsMode();
        else
          exitOnErrorMode();
        if (opts.strictRequired) {
          const props = cxt.parentSchema.properties;
          const { definedProperties } = cxt.it;
          for (const requiredKey of schema) {
            if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === void 0 && !definedProperties.has(requiredKey)) {
              const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
              const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
              (0, util_1.checkStrictMode)(it, msg, it.opts.strictRequired);
            }
          }
        }
        function allErrorsMode() {
          if (useLoop || $data) {
            cxt.block$data(codegen_1.nil, loopAllRequired);
          } else {
            for (const prop of schema) {
              (0, code_1.checkReportMissingProp)(cxt, prop);
            }
          }
        }
        function exitOnErrorMode() {
          const missing = gen.let("missing");
          if (useLoop || $data) {
            const valid = gen.let("valid", true);
            cxt.block$data(valid, () => loopUntilMissing(missing, valid));
            cxt.ok(valid);
          } else {
            gen.if((0, code_1.checkMissingProp)(cxt, schema, missing));
            (0, code_1.reportMissingProp)(cxt, missing);
            gen.else();
          }
        }
        function loopAllRequired() {
          gen.forOf("prop", schemaCode, (prop) => {
            cxt.setParams({ missingProperty: prop });
            gen.if((0, code_1.noPropertyInData)(gen, data, prop, opts.ownProperties), () => cxt.error());
          });
        }
        function loopUntilMissing(missing, valid) {
          cxt.setParams({ missingProperty: missing });
          gen.forOf(missing, schemaCode, () => {
            gen.assign(valid, (0, code_1.propertyInData)(gen, data, missing, opts.ownProperties));
            gen.if((0, codegen_1.not)(valid), () => {
              cxt.error();
              gen.break();
            });
          }, codegen_1.nil);
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/limitItems.js
var require_limitItems = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/limitItems.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message({ keyword, schemaCode }) {
        const comp = keyword === "maxItems" ? "more" : "fewer";
        return (0, codegen_1.str)`must NOT have ${comp} than ${schemaCode} items`;
      },
      params: ({ schemaCode }) => (0, codegen_1._)`{limit: ${schemaCode}}`
    };
    var def = {
      keyword: ["maxItems", "minItems"],
      type: "array",
      schemaType: "number",
      $data: true,
      error,
      code(cxt) {
        const { keyword, data, schemaCode } = cxt;
        const op = keyword === "maxItems" ? codegen_1.operators.GT : codegen_1.operators.LT;
        cxt.fail$data((0, codegen_1._)`${data}.length ${op} ${schemaCode}`);
      }
    };
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/runtime/equal.js
var require_equal = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/runtime/equal.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var equal = require_fast_deep_equal();
    equal.code = 'require("ajv/dist/runtime/equal").default';
    exports.default = equal;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/uniqueItems.js
var require_uniqueItems = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/uniqueItems.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var dataType_1 = require_dataType();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var equal_1 = require_equal();
    var error = {
      message: ({ params: { i, j } }) => (0, codegen_1.str)`must NOT have duplicate items (items ## ${j} and ${i} are identical)`,
      params: ({ params: { i, j } }) => (0, codegen_1._)`{i: ${i}, j: ${j}}`
    };
    var def = {
      keyword: "uniqueItems",
      type: "array",
      schemaType: "boolean",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, $data, schema, parentSchema, schemaCode, it } = cxt;
        if (!$data && !schema)
          return;
        const valid = gen.let("valid");
        const itemTypes = parentSchema.items ? (0, dataType_1.getSchemaTypes)(parentSchema.items) : [];
        cxt.block$data(valid, validateUniqueItems, (0, codegen_1._)`${schemaCode} === false`);
        cxt.ok(valid);
        function validateUniqueItems() {
          const i = gen.let("i", (0, codegen_1._)`${data}.length`);
          const j = gen.let("j");
          cxt.setParams({ i, j });
          gen.assign(valid, true);
          gen.if((0, codegen_1._)`${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j));
        }
        function canOptimize() {
          return itemTypes.length > 0 && !itemTypes.some((t) => t === "object" || t === "array");
        }
        function loopN(i, j) {
          const item = gen.name("item");
          const wrongType = (0, dataType_1.checkDataTypes)(itemTypes, item, it.opts.strictNumbers, dataType_1.DataType.Wrong);
          const indices = gen.const("indices", (0, codegen_1._)`{}`);
          gen.for((0, codegen_1._)`;${i}--;`, () => {
            gen.let(item, (0, codegen_1._)`${data}[${i}]`);
            gen.if(wrongType, (0, codegen_1._)`continue`);
            if (itemTypes.length > 1)
              gen.if((0, codegen_1._)`typeof ${item} == "string"`, (0, codegen_1._)`${item} += "_"`);
            gen.if((0, codegen_1._)`typeof ${indices}[${item}] == "number"`, () => {
              gen.assign(j, (0, codegen_1._)`${indices}[${item}]`);
              cxt.error();
              gen.assign(valid, false).break();
            }).code((0, codegen_1._)`${indices}[${item}] = ${i}`);
          });
        }
        function loopN2(i, j) {
          const eql = (0, util_1.useFunc)(gen, equal_1.default);
          const outer = gen.name("outer");
          gen.label(outer).for((0, codegen_1._)`;${i}--;`, () => gen.for((0, codegen_1._)`${j} = ${i}; ${j}--;`, () => gen.if((0, codegen_1._)`${eql}(${data}[${i}], ${data}[${j}])`, () => {
            cxt.error();
            gen.assign(valid, false).break(outer);
          })));
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/const.js
var require_const = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/const.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var equal_1 = require_equal();
    var error = {
      message: "must be equal to constant",
      params: ({ schemaCode }) => (0, codegen_1._)`{allowedValue: ${schemaCode}}`
    };
    var def = {
      keyword: "const",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, $data, schemaCode, schema } = cxt;
        if ($data || schema && typeof schema == "object") {
          cxt.fail$data((0, codegen_1._)`!${(0, util_1.useFunc)(gen, equal_1.default)}(${data}, ${schemaCode})`);
        } else {
          cxt.fail((0, codegen_1._)`${schema} !== ${data}`);
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/enum.js
var require_enum = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/enum.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var equal_1 = require_equal();
    var error = {
      message: "must be equal to one of the allowed values",
      params: ({ schemaCode }) => (0, codegen_1._)`{allowedValues: ${schemaCode}}`
    };
    var def = {
      keyword: "enum",
      schemaType: "array",
      $data: true,
      error,
      code(cxt) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        if (!$data && schema.length === 0)
          throw new Error("enum must have non-empty array");
        const useLoop = schema.length >= it.opts.loopEnum;
        let eql;
        const getEql = () => eql !== null && eql !== void 0 ? eql : eql = (0, util_1.useFunc)(gen, equal_1.default);
        let valid;
        if (useLoop || $data) {
          valid = gen.let("valid");
          cxt.block$data(valid, loopEnum);
        } else {
          if (!Array.isArray(schema))
            throw new Error("ajv implementation error");
          const vSchema = gen.const("vSchema", schemaCode);
          valid = (0, codegen_1.or)(...schema.map((_x, i) => equalCode(vSchema, i)));
        }
        cxt.pass(valid);
        function loopEnum() {
          gen.assign(valid, false);
          gen.forOf("v", schemaCode, (v) => gen.if((0, codegen_1._)`${getEql()}(${data}, ${v})`, () => gen.assign(valid, true).break()));
        }
        function equalCode(vSchema, i) {
          const sch = schema[i];
          return typeof sch === "object" && sch !== null ? (0, codegen_1._)`${getEql()}(${data}, ${vSchema}[${i}])` : (0, codegen_1._)`${data} === ${sch}`;
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/index.js
var require_validation = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/validation/index.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var limitNumber_1 = require_limitNumber();
    var multipleOf_1 = require_multipleOf();
    var limitLength_1 = require_limitLength();
    var pattern_1 = require_pattern();
    var limitProperties_1 = require_limitProperties();
    var required_1 = require_required();
    var limitItems_1 = require_limitItems();
    var uniqueItems_1 = require_uniqueItems();
    var const_1 = require_const();
    var enum_1 = require_enum();
    var validation = [
      // number
      limitNumber_1.default,
      multipleOf_1.default,
      // string
      limitLength_1.default,
      pattern_1.default,
      // object
      limitProperties_1.default,
      required_1.default,
      // array
      limitItems_1.default,
      uniqueItems_1.default,
      // any
      { keyword: "type", schemaType: ["string", "array"] },
      { keyword: "nullable", schemaType: "boolean" },
      const_1.default,
      enum_1.default
    ];
    exports.default = validation;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/additionalItems.js
var require_additionalItems = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/additionalItems.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateAdditionalItems = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params: { len } }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
      params: ({ params: { len } }) => (0, codegen_1._)`{limit: ${len}}`
    };
    var def = {
      keyword: "additionalItems",
      type: "array",
      schemaType: ["boolean", "object"],
      before: "uniqueItems",
      error,
      code(cxt) {
        const { parentSchema, it } = cxt;
        const { items } = parentSchema;
        if (!Array.isArray(items)) {
          (0, util_1.checkStrictMode)(it, '"additionalItems" is ignored when "items" is not an array of schemas');
          return;
        }
        validateAdditionalItems(cxt, items);
      }
    };
    function validateAdditionalItems(cxt, items) {
      const { gen, schema, data, keyword, it } = cxt;
      it.items = true;
      const len = gen.const("len", (0, codegen_1._)`${data}.length`);
      if (schema === false) {
        cxt.setParams({ len: items.length });
        cxt.pass((0, codegen_1._)`${len} <= ${items.length}`);
      } else if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
        const valid = gen.var("valid", (0, codegen_1._)`${len} <= ${items.length}`);
        gen.if((0, codegen_1.not)(valid), () => validateItems(valid));
        cxt.ok(valid);
      }
      function validateItems(valid) {
        gen.forRange("i", items.length, len, (i) => {
          cxt.subschema({ keyword, dataProp: i, dataPropType: util_1.Type.Num }, valid);
          if (!it.allErrors)
            gen.if((0, codegen_1.not)(valid), () => gen.break());
        });
      }
    }
    exports.validateAdditionalItems = validateAdditionalItems;
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/items.js
var require_items = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/items.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateTuple = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var code_1 = require_code2();
    var def = {
      keyword: "items",
      type: "array",
      schemaType: ["object", "array", "boolean"],
      before: "uniqueItems",
      code(cxt) {
        const { schema, it } = cxt;
        if (Array.isArray(schema))
          return validateTuple(cxt, "additionalItems", schema);
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema))
          return;
        cxt.ok((0, code_1.validateArray)(cxt));
      }
    };
    function validateTuple(cxt, extraItems, schArr = cxt.schema) {
      const { gen, parentSchema, data, keyword, it } = cxt;
      checkStrictTuple(parentSchema);
      if (it.opts.unevaluated && schArr.length && it.items !== true) {
        it.items = util_1.mergeEvaluated.items(gen, schArr.length, it.items);
      }
      const valid = gen.name("valid");
      const len = gen.const("len", (0, codegen_1._)`${data}.length`);
      schArr.forEach((sch, i) => {
        if ((0, util_1.alwaysValidSchema)(it, sch))
          return;
        gen.if((0, codegen_1._)`${len} > ${i}`, () => cxt.subschema({
          keyword,
          schemaProp: i,
          dataProp: i
        }, valid));
        cxt.ok(valid);
      });
      function checkStrictTuple(sch) {
        const { opts, errSchemaPath } = it;
        const l = schArr.length;
        const fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === false);
        if (opts.strictTuples && !fullTuple) {
          const msg = `"${keyword}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
          (0, util_1.checkStrictMode)(it, msg, opts.strictTuples);
        }
      }
    }
    exports.validateTuple = validateTuple;
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/prefixItems.js
var require_prefixItems = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/prefixItems.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var items_1 = require_items();
    var def = {
      keyword: "prefixItems",
      type: "array",
      schemaType: ["array"],
      before: "uniqueItems",
      code: (cxt) => (0, items_1.validateTuple)(cxt, "items")
    };
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/items2020.js
var require_items2020 = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/items2020.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var code_1 = require_code2();
    var additionalItems_1 = require_additionalItems();
    var error = {
      message: ({ params: { len } }) => (0, codegen_1.str)`must NOT have more than ${len} items`,
      params: ({ params: { len } }) => (0, codegen_1._)`{limit: ${len}}`
    };
    var def = {
      keyword: "items",
      type: "array",
      schemaType: ["object", "boolean"],
      before: "uniqueItems",
      error,
      code(cxt) {
        const { schema, parentSchema, it } = cxt;
        const { prefixItems } = parentSchema;
        it.items = true;
        if ((0, util_1.alwaysValidSchema)(it, schema))
          return;
        if (prefixItems)
          (0, additionalItems_1.validateAdditionalItems)(cxt, prefixItems);
        else
          cxt.ok((0, code_1.validateArray)(cxt));
      }
    };
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/contains.js
var require_contains = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/contains.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1.str)`must contain at least ${min} valid item(s)` : (0, codegen_1.str)`must contain at least ${min} and no more than ${max} valid item(s)`,
      params: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1._)`{minContains: ${min}}` : (0, codegen_1._)`{minContains: ${min}, maxContains: ${max}}`
    };
    var def = {
      keyword: "contains",
      type: "array",
      schemaType: ["object", "boolean"],
      before: "uniqueItems",
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        let min;
        let max;
        const { minContains, maxContains } = parentSchema;
        if (it.opts.next) {
          min = minContains === void 0 ? 1 : minContains;
          max = maxContains;
        } else {
          min = 1;
        }
        const len = gen.const("len", (0, codegen_1._)`${data}.length`);
        cxt.setParams({ min, max });
        if (max === void 0 && min === 0) {
          (0, util_1.checkStrictMode)(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`);
          return;
        }
        if (max !== void 0 && min > max) {
          (0, util_1.checkStrictMode)(it, `"minContains" > "maxContains" is always invalid`);
          cxt.fail();
          return;
        }
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
          let cond = (0, codegen_1._)`${len} >= ${min}`;
          if (max !== void 0)
            cond = (0, codegen_1._)`${cond} && ${len} <= ${max}`;
          cxt.pass(cond);
          return;
        }
        it.items = true;
        const valid = gen.name("valid");
        if (max === void 0 && min === 1) {
          validateItems(valid, () => gen.if(valid, () => gen.break()));
        } else if (min === 0) {
          gen.let(valid, true);
          if (max !== void 0)
            gen.if((0, codegen_1._)`${data}.length > 0`, validateItemsWithCount);
        } else {
          gen.let(valid, false);
          validateItemsWithCount();
        }
        cxt.result(valid, () => cxt.reset());
        function validateItemsWithCount() {
          const schValid = gen.name("_valid");
          const count = gen.let("count", 0);
          validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
        }
        function validateItems(_valid, block) {
          gen.forRange("i", 0, len, (i) => {
            cxt.subschema({
              keyword: "contains",
              dataProp: i,
              dataPropType: util_1.Type.Num,
              compositeRule: true
            }, _valid);
            block();
          });
        }
        function checkLimits(count) {
          gen.code((0, codegen_1._)`${count}++`);
          if (max === void 0) {
            gen.if((0, codegen_1._)`${count} >= ${min}`, () => gen.assign(valid, true).break());
          } else {
            gen.if((0, codegen_1._)`${count} > ${max}`, () => gen.assign(valid, false).break());
            if (min === 1)
              gen.assign(valid, true);
            else
              gen.if((0, codegen_1._)`${count} >= ${min}`, () => gen.assign(valid, true));
          }
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/dependencies.js
var require_dependencies = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/dependencies.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.validateSchemaDeps = exports.validatePropertyDeps = exports.error = void 0;
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var code_1 = require_code2();
    exports.error = {
      message: ({ params: { property, depsCount, deps } }) => {
        const property_ies = depsCount === 1 ? "property" : "properties";
        return (0, codegen_1.str)`must have ${property_ies} ${deps} when property ${property} is present`;
      },
      params: ({ params: { property, depsCount, deps, missingProperty } }) => (0, codegen_1._)`{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`
      // TODO change to reference
    };
    var def = {
      keyword: "dependencies",
      type: "object",
      schemaType: "object",
      error: exports.error,
      code(cxt) {
        const [propDeps, schDeps] = splitDependencies(cxt);
        validatePropertyDeps(cxt, propDeps);
        validateSchemaDeps(cxt, schDeps);
      }
    };
    function splitDependencies({ schema }) {
      const propertyDeps = {};
      const schemaDeps = {};
      for (const key in schema) {
        if (key === "__proto__")
          continue;
        const deps = Array.isArray(schema[key]) ? propertyDeps : schemaDeps;
        deps[key] = schema[key];
      }
      return [propertyDeps, schemaDeps];
    }
    function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
      const { gen, data, it } = cxt;
      if (Object.keys(propertyDeps).length === 0)
        return;
      const missing = gen.let("missing");
      for (const prop in propertyDeps) {
        const deps = propertyDeps[prop];
        if (deps.length === 0)
          continue;
        const hasProperty = (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties);
        cxt.setParams({
          property: prop,
          depsCount: deps.length,
          deps: deps.join(", ")
        });
        if (it.allErrors) {
          gen.if(hasProperty, () => {
            for (const depProp of deps) {
              (0, code_1.checkReportMissingProp)(cxt, depProp);
            }
          });
        } else {
          gen.if((0, codegen_1._)`${hasProperty} && (${(0, code_1.checkMissingProp)(cxt, deps, missing)})`);
          (0, code_1.reportMissingProp)(cxt, missing);
          gen.else();
        }
      }
    }
    exports.validatePropertyDeps = validatePropertyDeps;
    function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
      const { gen, data, keyword, it } = cxt;
      const valid = gen.name("valid");
      for (const prop in schemaDeps) {
        if ((0, util_1.alwaysValidSchema)(it, schemaDeps[prop]))
          continue;
        gen.if(
          (0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties),
          () => {
            const schCxt = cxt.subschema({ keyword, schemaProp: prop }, valid);
            cxt.mergeValidEvaluated(schCxt, valid);
          },
          () => gen.var(valid, true)
          // TODO var
        );
        cxt.ok(valid);
      }
    }
    exports.validateSchemaDeps = validateSchemaDeps;
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/propertyNames.js
var require_propertyNames = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/propertyNames.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: "property name must be valid",
      params: ({ params }) => (0, codegen_1._)`{propertyName: ${params.propertyName}}`
    };
    var def = {
      keyword: "propertyNames",
      type: "object",
      schemaType: ["object", "boolean"],
      error,
      code(cxt) {
        const { gen, schema, data, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema))
          return;
        const valid = gen.name("valid");
        gen.forIn("key", data, (key) => {
          cxt.setParams({ propertyName: key });
          cxt.subschema({
            keyword: "propertyNames",
            data: key,
            dataTypes: ["string"],
            propertyName: key,
            compositeRule: true
          }, valid);
          gen.if((0, codegen_1.not)(valid), () => {
            cxt.error(true);
            if (!it.allErrors)
              gen.break();
          });
        });
        cxt.ok(valid);
      }
    };
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js
var require_additionalProperties = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/additionalProperties.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var names_1 = require_names();
    var util_1 = require_util();
    var error = {
      message: "must NOT have additional properties",
      params: ({ params }) => (0, codegen_1._)`{additionalProperty: ${params.additionalProperty}}`
    };
    var def = {
      keyword: "additionalProperties",
      type: ["object"],
      schemaType: ["boolean", "object"],
      allowUndefined: true,
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, schema, parentSchema, data, errsCount, it } = cxt;
        if (!errsCount)
          throw new Error("ajv implementation error");
        const { allErrors, opts } = it;
        it.props = true;
        if (opts.removeAdditional !== "all" && (0, util_1.alwaysValidSchema)(it, schema))
          return;
        const props = (0, code_1.allSchemaProperties)(parentSchema.properties);
        const patProps = (0, code_1.allSchemaProperties)(parentSchema.patternProperties);
        checkAdditionalProperties();
        cxt.ok((0, codegen_1._)`${errsCount} === ${names_1.default.errors}`);
        function checkAdditionalProperties() {
          gen.forIn("key", data, (key) => {
            if (!props.length && !patProps.length)
              additionalPropertyCode(key);
            else
              gen.if(isAdditional(key), () => additionalPropertyCode(key));
          });
        }
        function isAdditional(key) {
          let definedProp;
          if (props.length > 8) {
            const propsSchema = (0, util_1.schemaRefOrVal)(it, parentSchema.properties, "properties");
            definedProp = (0, code_1.isOwnProperty)(gen, propsSchema, key);
          } else if (props.length) {
            definedProp = (0, codegen_1.or)(...props.map((p) => (0, codegen_1._)`${key} === ${p}`));
          } else {
            definedProp = codegen_1.nil;
          }
          if (patProps.length) {
            definedProp = (0, codegen_1.or)(definedProp, ...patProps.map((p) => (0, codegen_1._)`${(0, code_1.usePattern)(cxt, p)}.test(${key})`));
          }
          return (0, codegen_1.not)(definedProp);
        }
        function deleteAdditional(key) {
          gen.code((0, codegen_1._)`delete ${data}[${key}]`);
        }
        function additionalPropertyCode(key) {
          if (opts.removeAdditional === "all" || opts.removeAdditional && schema === false) {
            deleteAdditional(key);
            return;
          }
          if (schema === false) {
            cxt.setParams({ additionalProperty: key });
            cxt.error();
            if (!allErrors)
              gen.break();
            return;
          }
          if (typeof schema == "object" && !(0, util_1.alwaysValidSchema)(it, schema)) {
            const valid = gen.name("valid");
            if (opts.removeAdditional === "failing") {
              applyAdditionalSchema(key, valid, false);
              gen.if((0, codegen_1.not)(valid), () => {
                cxt.reset();
                deleteAdditional(key);
              });
            } else {
              applyAdditionalSchema(key, valid);
              if (!allErrors)
                gen.if((0, codegen_1.not)(valid), () => gen.break());
            }
          }
        }
        function applyAdditionalSchema(key, valid, errors) {
          const subschema = {
            keyword: "additionalProperties",
            dataProp: key,
            dataPropType: util_1.Type.Str
          };
          if (errors === false) {
            Object.assign(subschema, {
              compositeRule: true,
              createErrors: false,
              allErrors: false
            });
          }
          cxt.subschema(subschema, valid);
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/properties.js
var require_properties = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/properties.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var validate_1 = require_validate();
    var code_1 = require_code2();
    var util_1 = require_util();
    var additionalProperties_1 = require_additionalProperties();
    var def = {
      keyword: "properties",
      type: "object",
      schemaType: "object",
      code(cxt) {
        const { gen, schema, parentSchema, data, it } = cxt;
        if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === void 0) {
          additionalProperties_1.default.code(new validate_1.KeywordCxt(it, additionalProperties_1.default, "additionalProperties"));
        }
        const allProps = (0, code_1.allSchemaProperties)(schema);
        for (const prop of allProps) {
          it.definedProperties.add(prop);
        }
        if (it.opts.unevaluated && allProps.length && it.props !== true) {
          it.props = util_1.mergeEvaluated.props(gen, (0, util_1.toHash)(allProps), it.props);
        }
        const properties = allProps.filter((p) => !(0, util_1.alwaysValidSchema)(it, schema[p]));
        if (properties.length === 0)
          return;
        const valid = gen.name("valid");
        for (const prop of properties) {
          if (hasDefault(prop)) {
            applyPropertySchema(prop);
          } else {
            gen.if((0, code_1.propertyInData)(gen, data, prop, it.opts.ownProperties));
            applyPropertySchema(prop);
            if (!it.allErrors)
              gen.else().var(valid, true);
            gen.endIf();
          }
          cxt.it.definedProperties.add(prop);
          cxt.ok(valid);
        }
        function hasDefault(prop) {
          return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== void 0;
        }
        function applyPropertySchema(prop) {
          cxt.subschema({
            keyword: "properties",
            schemaProp: prop,
            dataProp: prop
          }, valid);
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/patternProperties.js
var require_patternProperties = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/patternProperties.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var util_2 = require_util();
    var def = {
      keyword: "patternProperties",
      type: "object",
      schemaType: "object",
      code(cxt) {
        const { gen, schema, data, parentSchema, it } = cxt;
        const { opts } = it;
        const patterns = (0, code_1.allSchemaProperties)(schema);
        const alwaysValidPatterns = patterns.filter((p) => (0, util_1.alwaysValidSchema)(it, schema[p]));
        if (patterns.length === 0 || alwaysValidPatterns.length === patterns.length && (!it.opts.unevaluated || it.props === true)) {
          return;
        }
        const checkProperties = opts.strictSchema && !opts.allowMatchingProperties && parentSchema.properties;
        const valid = gen.name("valid");
        if (it.props !== true && !(it.props instanceof codegen_1.Name)) {
          it.props = (0, util_2.evaluatedPropsToName)(gen, it.props);
        }
        const { props } = it;
        validatePatternProperties();
        function validatePatternProperties() {
          for (const pat of patterns) {
            if (checkProperties)
              checkMatchingProperties(pat);
            if (it.allErrors) {
              validateProperties(pat);
            } else {
              gen.var(valid, true);
              validateProperties(pat);
              gen.if(valid);
            }
          }
        }
        function checkMatchingProperties(pat) {
          for (const prop in checkProperties) {
            if (new RegExp(pat).test(prop)) {
              (0, util_1.checkStrictMode)(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
            }
          }
        }
        function validateProperties(pat) {
          gen.forIn("key", data, (key) => {
            gen.if((0, codegen_1._)`${(0, code_1.usePattern)(cxt, pat)}.test(${key})`, () => {
              const alwaysValid = alwaysValidPatterns.includes(pat);
              if (!alwaysValid) {
                cxt.subschema({
                  keyword: "patternProperties",
                  schemaProp: pat,
                  dataProp: key,
                  dataPropType: util_2.Type.Str
                }, valid);
              }
              if (it.opts.unevaluated && props !== true) {
                gen.assign((0, codegen_1._)`${props}[${key}]`, true);
              } else if (!alwaysValid && !it.allErrors) {
                gen.if((0, codegen_1.not)(valid), () => gen.break());
              }
            });
          });
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/not.js
var require_not = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/not.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require_util();
    var def = {
      keyword: "not",
      schemaType: ["object", "boolean"],
      trackErrors: true,
      code(cxt) {
        const { gen, schema, it } = cxt;
        if ((0, util_1.alwaysValidSchema)(it, schema)) {
          cxt.fail();
          return;
        }
        const valid = gen.name("valid");
        cxt.subschema({
          keyword: "not",
          compositeRule: true,
          createErrors: false,
          allErrors: false
        }, valid);
        cxt.failResult(valid, () => cxt.reset(), () => cxt.error());
      },
      error: { message: "must NOT be valid" }
    };
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/anyOf.js
var require_anyOf = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/anyOf.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var code_1 = require_code2();
    var def = {
      keyword: "anyOf",
      schemaType: "array",
      trackErrors: true,
      code: code_1.validateUnion,
      error: { message: "must match a schema in anyOf" }
    };
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/oneOf.js
var require_oneOf = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/oneOf.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: "must match exactly one schema in oneOf",
      params: ({ params }) => (0, codegen_1._)`{passingSchemas: ${params.passing}}`
    };
    var def = {
      keyword: "oneOf",
      schemaType: "array",
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, schema, parentSchema, it } = cxt;
        if (!Array.isArray(schema))
          throw new Error("ajv implementation error");
        if (it.opts.discriminator && parentSchema.discriminator)
          return;
        const schArr = schema;
        const valid = gen.let("valid", false);
        const passing = gen.let("passing", null);
        const schValid = gen.name("_valid");
        cxt.setParams({ passing });
        gen.block(validateOneOf);
        cxt.result(valid, () => cxt.reset(), () => cxt.error(true));
        function validateOneOf() {
          schArr.forEach((sch, i) => {
            let schCxt;
            if ((0, util_1.alwaysValidSchema)(it, sch)) {
              gen.var(schValid, true);
            } else {
              schCxt = cxt.subschema({
                keyword: "oneOf",
                schemaProp: i,
                compositeRule: true
              }, schValid);
            }
            if (i > 0) {
              gen.if((0, codegen_1._)`${schValid} && ${valid}`).assign(valid, false).assign(passing, (0, codegen_1._)`[${passing}, ${i}]`).else();
            }
            gen.if(schValid, () => {
              gen.assign(valid, true);
              gen.assign(passing, i);
              if (schCxt)
                cxt.mergeEvaluated(schCxt, codegen_1.Name);
            });
          });
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/allOf.js
var require_allOf = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/allOf.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require_util();
    var def = {
      keyword: "allOf",
      schemaType: "array",
      code(cxt) {
        const { gen, schema, it } = cxt;
        if (!Array.isArray(schema))
          throw new Error("ajv implementation error");
        const valid = gen.name("valid");
        schema.forEach((sch, i) => {
          if ((0, util_1.alwaysValidSchema)(it, sch))
            return;
          const schCxt = cxt.subschema({ keyword: "allOf", schemaProp: i }, valid);
          cxt.ok(valid);
          cxt.mergeEvaluated(schCxt);
        });
      }
    };
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/if.js
var require_if = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/if.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var util_1 = require_util();
    var error = {
      message: ({ params }) => (0, codegen_1.str)`must match "${params.ifClause}" schema`,
      params: ({ params }) => (0, codegen_1._)`{failingKeyword: ${params.ifClause}}`
    };
    var def = {
      keyword: "if",
      schemaType: ["object", "boolean"],
      trackErrors: true,
      error,
      code(cxt) {
        const { gen, parentSchema, it } = cxt;
        if (parentSchema.then === void 0 && parentSchema.else === void 0) {
          (0, util_1.checkStrictMode)(it, '"if" without "then" and "else" is ignored');
        }
        const hasThen = hasSchema(it, "then");
        const hasElse = hasSchema(it, "else");
        if (!hasThen && !hasElse)
          return;
        const valid = gen.let("valid", true);
        const schValid = gen.name("_valid");
        validateIf();
        cxt.reset();
        if (hasThen && hasElse) {
          const ifClause = gen.let("ifClause");
          cxt.setParams({ ifClause });
          gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
        } else if (hasThen) {
          gen.if(schValid, validateClause("then"));
        } else {
          gen.if((0, codegen_1.not)(schValid), validateClause("else"));
        }
        cxt.pass(valid, () => cxt.error(true));
        function validateIf() {
          const schCxt = cxt.subschema({
            keyword: "if",
            compositeRule: true,
            createErrors: false,
            allErrors: false
          }, schValid);
          cxt.mergeEvaluated(schCxt);
        }
        function validateClause(keyword, ifClause) {
          return () => {
            const schCxt = cxt.subschema({ keyword }, schValid);
            gen.assign(valid, schValid);
            cxt.mergeValidEvaluated(schCxt, valid);
            if (ifClause)
              gen.assign(ifClause, (0, codegen_1._)`${keyword}`);
            else
              cxt.setParams({ ifClause: keyword });
          };
        }
      }
    };
    function hasSchema(it, keyword) {
      const schema = it.schema[keyword];
      return schema !== void 0 && !(0, util_1.alwaysValidSchema)(it, schema);
    }
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/thenElse.js
var require_thenElse = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/thenElse.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var util_1 = require_util();
    var def = {
      keyword: ["then", "else"],
      schemaType: ["object", "boolean"],
      code({ keyword, parentSchema, it }) {
        if (parentSchema.if === void 0)
          (0, util_1.checkStrictMode)(it, `"${keyword}" without "if" is ignored`);
      }
    };
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/index.js
var require_applicator = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/applicator/index.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var additionalItems_1 = require_additionalItems();
    var prefixItems_1 = require_prefixItems();
    var items_1 = require_items();
    var items2020_1 = require_items2020();
    var contains_1 = require_contains();
    var dependencies_1 = require_dependencies();
    var propertyNames_1 = require_propertyNames();
    var additionalProperties_1 = require_additionalProperties();
    var properties_1 = require_properties();
    var patternProperties_1 = require_patternProperties();
    var not_1 = require_not();
    var anyOf_1 = require_anyOf();
    var oneOf_1 = require_oneOf();
    var allOf_1 = require_allOf();
    var if_1 = require_if();
    var thenElse_1 = require_thenElse();
    function getApplicator(draft2020 = false) {
      const applicator = [
        // any
        not_1.default,
        anyOf_1.default,
        oneOf_1.default,
        allOf_1.default,
        if_1.default,
        thenElse_1.default,
        // object
        propertyNames_1.default,
        additionalProperties_1.default,
        dependencies_1.default,
        properties_1.default,
        patternProperties_1.default
      ];
      if (draft2020)
        applicator.push(prefixItems_1.default, items2020_1.default);
      else
        applicator.push(additionalItems_1.default, items_1.default);
      applicator.push(contains_1.default);
      return applicator;
    }
    exports.default = getApplicator;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/format/format.js
var require_format = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/format/format.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var error = {
      message: ({ schemaCode }) => (0, codegen_1.str)`must match format "${schemaCode}"`,
      params: ({ schemaCode }) => (0, codegen_1._)`{format: ${schemaCode}}`
    };
    var def = {
      keyword: "format",
      type: ["number", "string"],
      schemaType: "string",
      $data: true,
      error,
      code(cxt, ruleType) {
        const { gen, data, $data, schema, schemaCode, it } = cxt;
        const { opts, errSchemaPath, schemaEnv, self } = it;
        if (!opts.validateFormats)
          return;
        if ($data)
          validate$DataFormat();
        else
          validateFormat();
        function validate$DataFormat() {
          const fmts = gen.scopeValue("formats", {
            ref: self.formats,
            code: opts.code.formats
          });
          const fDef = gen.const("fDef", (0, codegen_1._)`${fmts}[${schemaCode}]`);
          const fType = gen.let("fType");
          const format = gen.let("format");
          gen.if((0, codegen_1._)`typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, (0, codegen_1._)`${fDef}.type || "string"`).assign(format, (0, codegen_1._)`${fDef}.validate`), () => gen.assign(fType, (0, codegen_1._)`"string"`).assign(format, fDef));
          cxt.fail$data((0, codegen_1.or)(unknownFmt(), invalidFmt()));
          function unknownFmt() {
            if (opts.strictSchema === false)
              return codegen_1.nil;
            return (0, codegen_1._)`${schemaCode} && !${format}`;
          }
          function invalidFmt() {
            const callFormat = schemaEnv.$async ? (0, codegen_1._)`(${fDef}.async ? await ${format}(${data}) : ${format}(${data}))` : (0, codegen_1._)`${format}(${data})`;
            const validData = (0, codegen_1._)`(typeof ${format} == "function" ? ${callFormat} : ${format}.test(${data}))`;
            return (0, codegen_1._)`${format} && ${format} !== true && ${fType} === ${ruleType} && !${validData}`;
          }
        }
        function validateFormat() {
          const formatDef = self.formats[schema];
          if (!formatDef) {
            unknownFormat();
            return;
          }
          if (formatDef === true)
            return;
          const [fmtType, format, fmtRef] = getFormat(formatDef);
          if (fmtType === ruleType)
            cxt.pass(validCondition());
          function unknownFormat() {
            if (opts.strictSchema === false) {
              self.logger.warn(unknownMsg());
              return;
            }
            throw new Error(unknownMsg());
            function unknownMsg() {
              return `unknown format "${schema}" ignored in schema at path "${errSchemaPath}"`;
            }
          }
          function getFormat(fmtDef) {
            const code = fmtDef instanceof RegExp ? (0, codegen_1.regexpCode)(fmtDef) : opts.code.formats ? (0, codegen_1._)`${opts.code.formats}${(0, codegen_1.getProperty)(schema)}` : void 0;
            const fmt = gen.scopeValue("formats", { key: schema, ref: fmtDef, code });
            if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
              return [fmtDef.type || "string", fmtDef.validate, (0, codegen_1._)`${fmt}.validate`];
            }
            return ["string", fmtDef, fmt];
          }
          function validCondition() {
            if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
              if (!schemaEnv.$async)
                throw new Error("async format in sync schema");
              return (0, codegen_1._)`await ${fmtRef}(${data})`;
            }
            return typeof format == "function" ? (0, codegen_1._)`${fmtRef}(${data})` : (0, codegen_1._)`${fmtRef}.test(${data})`;
          }
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/format/index.js
var require_format2 = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/format/index.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var format_1 = require_format();
    var format = [format_1.default];
    exports.default = format;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/metadata.js
var require_metadata = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/metadata.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.contentVocabulary = exports.metadataVocabulary = void 0;
    exports.metadataVocabulary = [
      "title",
      "description",
      "default",
      "deprecated",
      "readOnly",
      "writeOnly",
      "examples"
    ];
    exports.contentVocabulary = [
      "contentMediaType",
      "contentEncoding",
      "contentSchema"
    ];
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/draft7.js
var require_draft7 = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/draft7.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var core_1 = require_core2();
    var validation_1 = require_validation();
    var applicator_1 = require_applicator();
    var format_1 = require_format2();
    var metadata_1 = require_metadata();
    var draft7Vocabularies = [
      core_1.default,
      validation_1.default,
      (0, applicator_1.default)(),
      format_1.default,
      metadata_1.metadataVocabulary,
      metadata_1.contentVocabulary
    ];
    exports.default = draft7Vocabularies;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/discriminator/types.js
var require_types = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/discriminator/types.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DiscrError = void 0;
    var DiscrError;
    (function(DiscrError2) {
      DiscrError2["Tag"] = "tag";
      DiscrError2["Mapping"] = "mapping";
    })(DiscrError || (exports.DiscrError = DiscrError = {}));
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/discriminator/index.js
var require_discriminator = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/vocabularies/discriminator/index.js"(exports) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    var codegen_1 = require_codegen();
    var types_1 = require_types();
    var compile_1 = require_compile();
    var ref_error_1 = require_ref_error();
    var util_1 = require_util();
    var error = {
      message: ({ params: { discrError, tagName } }) => discrError === types_1.DiscrError.Tag ? `tag "${tagName}" must be string` : `value of tag "${tagName}" must be in oneOf`,
      params: ({ params: { discrError, tag, tagName } }) => (0, codegen_1._)`{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`
    };
    var def = {
      keyword: "discriminator",
      type: "object",
      schemaType: "object",
      error,
      code(cxt) {
        const { gen, data, schema, parentSchema, it } = cxt;
        const { oneOf } = parentSchema;
        if (!it.opts.discriminator) {
          throw new Error("discriminator: requires discriminator option");
        }
        const tagName = schema.propertyName;
        if (typeof tagName != "string")
          throw new Error("discriminator: requires propertyName");
        if (schema.mapping)
          throw new Error("discriminator: mapping is not supported");
        if (!oneOf)
          throw new Error("discriminator: requires oneOf keyword");
        const valid = gen.let("valid", false);
        const tag = gen.const("tag", (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(tagName)}`);
        gen.if((0, codegen_1._)`typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(false, { discrError: types_1.DiscrError.Tag, tag, tagName }));
        cxt.ok(valid);
        function validateMapping() {
          const mapping = getMapping();
          gen.if(false);
          for (const tagValue in mapping) {
            gen.elseIf((0, codegen_1._)`${tag} === ${tagValue}`);
            gen.assign(valid, applyTagSchema(mapping[tagValue]));
          }
          gen.else();
          cxt.error(false, { discrError: types_1.DiscrError.Mapping, tag, tagName });
          gen.endIf();
        }
        function applyTagSchema(schemaProp) {
          const _valid = gen.name("valid");
          const schCxt = cxt.subschema({ keyword: "oneOf", schemaProp }, _valid);
          cxt.mergeEvaluated(schCxt, codegen_1.Name);
          return _valid;
        }
        function getMapping() {
          var _a;
          const oneOfMapping = {};
          const topRequired = hasRequired(parentSchema);
          let tagRequired = true;
          for (let i = 0; i < oneOf.length; i++) {
            let sch = oneOf[i];
            if ((sch === null || sch === void 0 ? void 0 : sch.$ref) && !(0, util_1.schemaHasRulesButRef)(sch, it.self.RULES)) {
              const ref = sch.$ref;
              sch = compile_1.resolveRef.call(it.self, it.schemaEnv.root, it.baseId, ref);
              if (sch instanceof compile_1.SchemaEnv)
                sch = sch.schema;
              if (sch === void 0)
                throw new ref_error_1.default(it.opts.uriResolver, it.baseId, ref);
            }
            const propSch = (_a = sch === null || sch === void 0 ? void 0 : sch.properties) === null || _a === void 0 ? void 0 : _a[tagName];
            if (typeof propSch != "object") {
              throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${tagName}"`);
            }
            tagRequired = tagRequired && (topRequired || hasRequired(sch));
            addMappings(propSch, i);
          }
          if (!tagRequired)
            throw new Error(`discriminator: "${tagName}" must be required`);
          return oneOfMapping;
          function hasRequired({ required }) {
            return Array.isArray(required) && required.includes(tagName);
          }
          function addMappings(sch, i) {
            if (sch.const) {
              addMapping(sch.const, i);
            } else if (sch.enum) {
              for (const tagValue of sch.enum) {
                addMapping(tagValue, i);
              }
            } else {
              throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
            }
          }
          function addMapping(tagValue, i) {
            if (typeof tagValue != "string" || tagValue in oneOfMapping) {
              throw new Error(`discriminator: "${tagName}" values must be unique strings`);
            }
            oneOfMapping[tagValue] = i;
          }
        }
      }
    };
    exports.default = def;
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/refs/json-schema-draft-07.json
var require_json_schema_draft_07 = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/refs/json-schema-draft-07.json"(exports, module) {
    module.exports = {
      $schema: "http://json-schema.org/draft-07/schema#",
      $id: "http://json-schema.org/draft-07/schema#",
      title: "Core schema meta-schema",
      definitions: {
        schemaArray: {
          type: "array",
          minItems: 1,
          items: { $ref: "#" }
        },
        nonNegativeInteger: {
          type: "integer",
          minimum: 0
        },
        nonNegativeIntegerDefault0: {
          allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }]
        },
        simpleTypes: {
          enum: ["array", "boolean", "integer", "null", "number", "object", "string"]
        },
        stringArray: {
          type: "array",
          items: { type: "string" },
          uniqueItems: true,
          default: []
        }
      },
      type: ["object", "boolean"],
      properties: {
        $id: {
          type: "string",
          format: "uri-reference"
        },
        $schema: {
          type: "string",
          format: "uri"
        },
        $ref: {
          type: "string",
          format: "uri-reference"
        },
        $comment: {
          type: "string"
        },
        title: {
          type: "string"
        },
        description: {
          type: "string"
        },
        default: true,
        readOnly: {
          type: "boolean",
          default: false
        },
        examples: {
          type: "array",
          items: true
        },
        multipleOf: {
          type: "number",
          exclusiveMinimum: 0
        },
        maximum: {
          type: "number"
        },
        exclusiveMaximum: {
          type: "number"
        },
        minimum: {
          type: "number"
        },
        exclusiveMinimum: {
          type: "number"
        },
        maxLength: { $ref: "#/definitions/nonNegativeInteger" },
        minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        pattern: {
          type: "string",
          format: "regex"
        },
        additionalItems: { $ref: "#" },
        items: {
          anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }],
          default: true
        },
        maxItems: { $ref: "#/definitions/nonNegativeInteger" },
        minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        uniqueItems: {
          type: "boolean",
          default: false
        },
        contains: { $ref: "#" },
        maxProperties: { $ref: "#/definitions/nonNegativeInteger" },
        minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
        required: { $ref: "#/definitions/stringArray" },
        additionalProperties: { $ref: "#" },
        definitions: {
          type: "object",
          additionalProperties: { $ref: "#" },
          default: {}
        },
        properties: {
          type: "object",
          additionalProperties: { $ref: "#" },
          default: {}
        },
        patternProperties: {
          type: "object",
          additionalProperties: { $ref: "#" },
          propertyNames: { format: "regex" },
          default: {}
        },
        dependencies: {
          type: "object",
          additionalProperties: {
            anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }]
          }
        },
        propertyNames: { $ref: "#" },
        const: true,
        enum: {
          type: "array",
          items: true,
          minItems: 1,
          uniqueItems: true
        },
        type: {
          anyOf: [
            { $ref: "#/definitions/simpleTypes" },
            {
              type: "array",
              items: { $ref: "#/definitions/simpleTypes" },
              minItems: 1,
              uniqueItems: true
            }
          ]
        },
        format: { type: "string" },
        contentMediaType: { type: "string" },
        contentEncoding: { type: "string" },
        if: { $ref: "#" },
        then: { $ref: "#" },
        else: { $ref: "#" },
        allOf: { $ref: "#/definitions/schemaArray" },
        anyOf: { $ref: "#/definitions/schemaArray" },
        oneOf: { $ref: "#/definitions/schemaArray" },
        not: { $ref: "#" }
      },
      default: true
    };
  }
});

// node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/ajv.js
var require_ajv = __commonJS({
  "node_modules/.pnpm/ajv@8.20.0/node_modules/ajv/dist/ajv.js"(exports, module) {
    "use strict";
    init_esm_shims();
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MissingRefError = exports.ValidationError = exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = exports.Ajv = void 0;
    var core_1 = require_core();
    var draft7_1 = require_draft7();
    var discriminator_1 = require_discriminator();
    var draft7MetaSchema = require_json_schema_draft_07();
    var META_SUPPORT_DATA = ["/properties"];
    var META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
    var Ajv2 = class extends core_1.default {
      _addVocabularies() {
        super._addVocabularies();
        draft7_1.default.forEach((v) => this.addVocabulary(v));
        if (this.opts.discriminator)
          this.addKeyword(discriminator_1.default);
      }
      _addDefaultMetaSchema() {
        super._addDefaultMetaSchema();
        if (!this.opts.meta)
          return;
        const metaSchema = this.opts.$data ? this.$dataMetaSchema(draft7MetaSchema, META_SUPPORT_DATA) : draft7MetaSchema;
        this.addMetaSchema(metaSchema, META_SCHEMA_ID, false);
        this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
      }
      defaultMeta() {
        return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : void 0);
      }
    };
    exports.Ajv = Ajv2;
    module.exports = exports = Ajv2;
    module.exports.Ajv = Ajv2;
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = Ajv2;
    var validate_1 = require_validate();
    Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function() {
      return validate_1.KeywordCxt;
    } });
    var codegen_1 = require_codegen();
    Object.defineProperty(exports, "_", { enumerable: true, get: function() {
      return codegen_1._;
    } });
    Object.defineProperty(exports, "str", { enumerable: true, get: function() {
      return codegen_1.str;
    } });
    Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
      return codegen_1.stringify;
    } });
    Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
      return codegen_1.nil;
    } });
    Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
      return codegen_1.Name;
    } });
    Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function() {
      return codegen_1.CodeGen;
    } });
    var validation_error_1 = require_validation_error();
    Object.defineProperty(exports, "ValidationError", { enumerable: true, get: function() {
      return validation_error_1.default;
    } });
    var ref_error_1 = require_ref_error();
    Object.defineProperty(exports, "MissingRefError", { enumerable: true, get: function() {
      return ref_error_1.default;
    } });
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/nodes/identity.js
var require_identity = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/nodes/identity.js"(exports) {
    "use strict";
    init_esm_shims();
    var ALIAS = /* @__PURE__ */ Symbol.for("yaml.alias");
    var DOC = /* @__PURE__ */ Symbol.for("yaml.document");
    var MAP = /* @__PURE__ */ Symbol.for("yaml.map");
    var PAIR = /* @__PURE__ */ Symbol.for("yaml.pair");
    var SCALAR = /* @__PURE__ */ Symbol.for("yaml.scalar");
    var SEQ = /* @__PURE__ */ Symbol.for("yaml.seq");
    var NODE_TYPE = /* @__PURE__ */ Symbol.for("yaml.node.type");
    var isAlias = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === ALIAS;
    var isDocument = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === DOC;
    var isMap2 = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === MAP;
    var isPair = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === PAIR;
    var isScalar3 = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SCALAR;
    var isSeq = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SEQ;
    function isCollection2(node) {
      if (node && typeof node === "object")
        switch (node[NODE_TYPE]) {
          case MAP:
          case SEQ:
            return true;
        }
      return false;
    }
    function isNode(node) {
      if (node && typeof node === "object")
        switch (node[NODE_TYPE]) {
          case ALIAS:
          case MAP:
          case SCALAR:
          case SEQ:
            return true;
        }
      return false;
    }
    var hasAnchor = (node) => (isScalar3(node) || isCollection2(node)) && !!node.anchor;
    exports.ALIAS = ALIAS;
    exports.DOC = DOC;
    exports.MAP = MAP;
    exports.NODE_TYPE = NODE_TYPE;
    exports.PAIR = PAIR;
    exports.SCALAR = SCALAR;
    exports.SEQ = SEQ;
    exports.hasAnchor = hasAnchor;
    exports.isAlias = isAlias;
    exports.isCollection = isCollection2;
    exports.isDocument = isDocument;
    exports.isMap = isMap2;
    exports.isNode = isNode;
    exports.isPair = isPair;
    exports.isScalar = isScalar3;
    exports.isSeq = isSeq;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/visit.js
var require_visit = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/visit.js"(exports) {
    "use strict";
    init_esm_shims();
    var identity = require_identity();
    var BREAK = /* @__PURE__ */ Symbol("break visit");
    var SKIP = /* @__PURE__ */ Symbol("skip children");
    var REMOVE = /* @__PURE__ */ Symbol("remove node");
    function visit(node, visitor) {
      const visitor_ = initVisitor(visitor);
      if (identity.isDocument(node)) {
        const cd = visit_(null, node.contents, visitor_, Object.freeze([node]));
        if (cd === REMOVE)
          node.contents = null;
      } else
        visit_(null, node, visitor_, Object.freeze([]));
    }
    visit.BREAK = BREAK;
    visit.SKIP = SKIP;
    visit.REMOVE = REMOVE;
    function visit_(key, node, visitor, path) {
      const ctrl = callVisitor(key, node, visitor, path);
      if (identity.isNode(ctrl) || identity.isPair(ctrl)) {
        replaceNode(key, path, ctrl);
        return visit_(key, ctrl, visitor, path);
      }
      if (typeof ctrl !== "symbol") {
        if (identity.isCollection(node)) {
          path = Object.freeze(path.concat(node));
          for (let i = 0; i < node.items.length; ++i) {
            const ci = visit_(i, node.items[i], visitor, path);
            if (typeof ci === "number")
              i = ci - 1;
            else if (ci === BREAK)
              return BREAK;
            else if (ci === REMOVE) {
              node.items.splice(i, 1);
              i -= 1;
            }
          }
        } else if (identity.isPair(node)) {
          path = Object.freeze(path.concat(node));
          const ck = visit_("key", node.key, visitor, path);
          if (ck === BREAK)
            return BREAK;
          else if (ck === REMOVE)
            node.key = null;
          const cv = visit_("value", node.value, visitor, path);
          if (cv === BREAK)
            return BREAK;
          else if (cv === REMOVE)
            node.value = null;
        }
      }
      return ctrl;
    }
    async function visitAsync(node, visitor) {
      const visitor_ = initVisitor(visitor);
      if (identity.isDocument(node)) {
        const cd = await visitAsync_(null, node.contents, visitor_, Object.freeze([node]));
        if (cd === REMOVE)
          node.contents = null;
      } else
        await visitAsync_(null, node, visitor_, Object.freeze([]));
    }
    visitAsync.BREAK = BREAK;
    visitAsync.SKIP = SKIP;
    visitAsync.REMOVE = REMOVE;
    async function visitAsync_(key, node, visitor, path) {
      const ctrl = await callVisitor(key, node, visitor, path);
      if (identity.isNode(ctrl) || identity.isPair(ctrl)) {
        replaceNode(key, path, ctrl);
        return visitAsync_(key, ctrl, visitor, path);
      }
      if (typeof ctrl !== "symbol") {
        if (identity.isCollection(node)) {
          path = Object.freeze(path.concat(node));
          for (let i = 0; i < node.items.length; ++i) {
            const ci = await visitAsync_(i, node.items[i], visitor, path);
            if (typeof ci === "number")
              i = ci - 1;
            else if (ci === BREAK)
              return BREAK;
            else if (ci === REMOVE) {
              node.items.splice(i, 1);
              i -= 1;
            }
          }
        } else if (identity.isPair(node)) {
          path = Object.freeze(path.concat(node));
          const ck = await visitAsync_("key", node.key, visitor, path);
          if (ck === BREAK)
            return BREAK;
          else if (ck === REMOVE)
            node.key = null;
          const cv = await visitAsync_("value", node.value, visitor, path);
          if (cv === BREAK)
            return BREAK;
          else if (cv === REMOVE)
            node.value = null;
        }
      }
      return ctrl;
    }
    function initVisitor(visitor) {
      if (typeof visitor === "object" && (visitor.Collection || visitor.Node || visitor.Value)) {
        return Object.assign({
          Alias: visitor.Node,
          Map: visitor.Node,
          Scalar: visitor.Node,
          Seq: visitor.Node
        }, visitor.Value && {
          Map: visitor.Value,
          Scalar: visitor.Value,
          Seq: visitor.Value
        }, visitor.Collection && {
          Map: visitor.Collection,
          Seq: visitor.Collection
        }, visitor);
      }
      return visitor;
    }
    function callVisitor(key, node, visitor, path) {
      if (typeof visitor === "function")
        return visitor(key, node, path);
      if (identity.isMap(node))
        return visitor.Map?.(key, node, path);
      if (identity.isSeq(node))
        return visitor.Seq?.(key, node, path);
      if (identity.isPair(node))
        return visitor.Pair?.(key, node, path);
      if (identity.isScalar(node))
        return visitor.Scalar?.(key, node, path);
      if (identity.isAlias(node))
        return visitor.Alias?.(key, node, path);
      return void 0;
    }
    function replaceNode(key, path, node) {
      const parent = path[path.length - 1];
      if (identity.isCollection(parent)) {
        parent.items[key] = node;
      } else if (identity.isPair(parent)) {
        if (key === "key")
          parent.key = node;
        else
          parent.value = node;
      } else if (identity.isDocument(parent)) {
        parent.contents = node;
      } else {
        const pt = identity.isAlias(parent) ? "alias" : "scalar";
        throw new Error(`Cannot replace node with ${pt} parent`);
      }
    }
    exports.visit = visit;
    exports.visitAsync = visitAsync;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/doc/directives.js
var require_directives = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/doc/directives.js"(exports) {
    "use strict";
    init_esm_shims();
    var identity = require_identity();
    var visit = require_visit();
    var escapeChars = {
      "!": "%21",
      ",": "%2C",
      "[": "%5B",
      "]": "%5D",
      "{": "%7B",
      "}": "%7D"
    };
    var escapeTagName = (tn) => tn.replace(/[!,[\]{}]/g, (ch) => escapeChars[ch]);
    var Directives = class _Directives {
      constructor(yaml, tags) {
        this.docStart = null;
        this.docEnd = false;
        this.yaml = Object.assign({}, _Directives.defaultYaml, yaml);
        this.tags = Object.assign({}, _Directives.defaultTags, tags);
      }
      clone() {
        const copy = new _Directives(this.yaml, this.tags);
        copy.docStart = this.docStart;
        return copy;
      }
      /**
       * During parsing, get a Directives instance for the current document and
       * update the stream state according to the current version's spec.
       */
      atDocument() {
        const res = new _Directives(this.yaml, this.tags);
        switch (this.yaml.version) {
          case "1.1":
            this.atNextDocument = true;
            break;
          case "1.2":
            this.atNextDocument = false;
            this.yaml = {
              explicit: _Directives.defaultYaml.explicit,
              version: "1.2"
            };
            this.tags = Object.assign({}, _Directives.defaultTags);
            break;
        }
        return res;
      }
      /**
       * @param onError - May be called even if the action was successful
       * @returns `true` on success
       */
      add(line, onError) {
        if (this.atNextDocument) {
          this.yaml = { explicit: _Directives.defaultYaml.explicit, version: "1.1" };
          this.tags = Object.assign({}, _Directives.defaultTags);
          this.atNextDocument = false;
        }
        const parts = line.trim().split(/[ \t]+/);
        const name = parts.shift();
        switch (name) {
          case "%TAG": {
            if (parts.length !== 2) {
              onError(0, "%TAG directive should contain exactly two parts");
              if (parts.length < 2)
                return false;
            }
            const [handle, prefix] = parts;
            this.tags[handle] = prefix;
            return true;
          }
          case "%YAML": {
            this.yaml.explicit = true;
            if (parts.length !== 1) {
              onError(0, "%YAML directive should contain exactly one part");
              return false;
            }
            const [version] = parts;
            if (version === "1.1" || version === "1.2") {
              this.yaml.version = version;
              return true;
            } else {
              const isValid = /^\d+\.\d+$/.test(version);
              onError(6, `Unsupported YAML version ${version}`, isValid);
              return false;
            }
          }
          default:
            onError(0, `Unknown directive ${name}`, true);
            return false;
        }
      }
      /**
       * Resolves a tag, matching handles to those defined in %TAG directives.
       *
       * @returns Resolved tag, which may also be the non-specific tag `'!'` or a
       *   `'!local'` tag, or `null` if unresolvable.
       */
      tagName(source, onError) {
        if (source === "!")
          return "!";
        if (source[0] !== "!") {
          onError(`Not a valid tag: ${source}`);
          return null;
        }
        if (source[1] === "<") {
          const verbatim = source.slice(2, -1);
          if (verbatim === "!" || verbatim === "!!") {
            onError(`Verbatim tags aren't resolved, so ${source} is invalid.`);
            return null;
          }
          if (source[source.length - 1] !== ">")
            onError("Verbatim tags must end with a >");
          return verbatim;
        }
        const [, handle, suffix] = source.match(/^(.*!)([^!]*)$/s);
        if (!suffix)
          onError(`The ${source} tag has no suffix`);
        const prefix = this.tags[handle];
        if (prefix) {
          try {
            return prefix + decodeURIComponent(suffix);
          } catch (error) {
            onError(String(error));
            return null;
          }
        }
        if (handle === "!")
          return source;
        onError(`Could not resolve tag: ${source}`);
        return null;
      }
      /**
       * Given a fully resolved tag, returns its printable string form,
       * taking into account current tag prefixes and defaults.
       */
      tagString(tag) {
        for (const [handle, prefix] of Object.entries(this.tags)) {
          if (tag.startsWith(prefix))
            return handle + escapeTagName(tag.substring(prefix.length));
        }
        return tag[0] === "!" ? tag : `!<${tag}>`;
      }
      toString(doc) {
        const lines = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [];
        const tagEntries = Object.entries(this.tags);
        let tagNames;
        if (doc && tagEntries.length > 0 && identity.isNode(doc.contents)) {
          const tags = {};
          visit.visit(doc.contents, (_key, node) => {
            if (identity.isNode(node) && node.tag)
              tags[node.tag] = true;
          });
          tagNames = Object.keys(tags);
        } else
          tagNames = [];
        for (const [handle, prefix] of tagEntries) {
          if (handle === "!!" && prefix === "tag:yaml.org,2002:")
            continue;
          if (!doc || tagNames.some((tn) => tn.startsWith(prefix)))
            lines.push(`%TAG ${handle} ${prefix}`);
        }
        return lines.join("\n");
      }
    };
    Directives.defaultYaml = { explicit: false, version: "1.2" };
    Directives.defaultTags = { "!!": "tag:yaml.org,2002:" };
    exports.Directives = Directives;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/doc/anchors.js
var require_anchors = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/doc/anchors.js"(exports) {
    "use strict";
    init_esm_shims();
    var identity = require_identity();
    var visit = require_visit();
    function anchorIsValid(anchor) {
      if (/[\x00-\x19\s,[\]{}]/.test(anchor)) {
        const sa = JSON.stringify(anchor);
        const msg = `Anchor must not contain whitespace or control characters: ${sa}`;
        throw new Error(msg);
      }
      return true;
    }
    function anchorNames(root) {
      const anchors = /* @__PURE__ */ new Set();
      visit.visit(root, {
        Value(_key, node) {
          if (node.anchor)
            anchors.add(node.anchor);
        }
      });
      return anchors;
    }
    function findNewAnchor(prefix, exclude) {
      for (let i = 1; true; ++i) {
        const name = `${prefix}${i}`;
        if (!exclude.has(name))
          return name;
      }
    }
    function createNodeAnchors(doc, prefix) {
      const aliasObjects = [];
      const sourceObjects = /* @__PURE__ */ new Map();
      let prevAnchors = null;
      return {
        onAnchor: (source) => {
          aliasObjects.push(source);
          prevAnchors ?? (prevAnchors = anchorNames(doc));
          const anchor = findNewAnchor(prefix, prevAnchors);
          prevAnchors.add(anchor);
          return anchor;
        },
        /**
         * With circular references, the source node is only resolved after all
         * of its child nodes are. This is why anchors are set only after all of
         * the nodes have been created.
         */
        setAnchors: () => {
          for (const source of aliasObjects) {
            const ref = sourceObjects.get(source);
            if (typeof ref === "object" && ref.anchor && (identity.isScalar(ref.node) || identity.isCollection(ref.node))) {
              ref.node.anchor = ref.anchor;
            } else {
              const error = new Error("Failed to resolve repeated object (this should not happen)");
              error.source = source;
              throw error;
            }
          }
        },
        sourceObjects
      };
    }
    exports.anchorIsValid = anchorIsValid;
    exports.anchorNames = anchorNames;
    exports.createNodeAnchors = createNodeAnchors;
    exports.findNewAnchor = findNewAnchor;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/doc/applyReviver.js
var require_applyReviver = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/doc/applyReviver.js"(exports) {
    "use strict";
    init_esm_shims();
    function applyReviver(reviver, obj, key, val) {
      if (val && typeof val === "object") {
        if (Array.isArray(val)) {
          for (let i = 0, len = val.length; i < len; ++i) {
            const v0 = val[i];
            const v1 = applyReviver(reviver, val, String(i), v0);
            if (v1 === void 0)
              delete val[i];
            else if (v1 !== v0)
              val[i] = v1;
          }
        } else if (val instanceof Map) {
          for (const k of Array.from(val.keys())) {
            const v0 = val.get(k);
            const v1 = applyReviver(reviver, val, k, v0);
            if (v1 === void 0)
              val.delete(k);
            else if (v1 !== v0)
              val.set(k, v1);
          }
        } else if (val instanceof Set) {
          for (const v0 of Array.from(val)) {
            const v1 = applyReviver(reviver, val, v0, v0);
            if (v1 === void 0)
              val.delete(v0);
            else if (v1 !== v0) {
              val.delete(v0);
              val.add(v1);
            }
          }
        } else {
          for (const [k, v0] of Object.entries(val)) {
            const v1 = applyReviver(reviver, val, k, v0);
            if (v1 === void 0)
              delete val[k];
            else if (v1 !== v0)
              val[k] = v1;
          }
        }
      }
      return reviver.call(obj, key, val);
    }
    exports.applyReviver = applyReviver;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/nodes/toJS.js
var require_toJS = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/nodes/toJS.js"(exports) {
    "use strict";
    init_esm_shims();
    var identity = require_identity();
    function toJS(value, arg, ctx) {
      if (Array.isArray(value))
        return value.map((v, i) => toJS(v, String(i), ctx));
      if (value && typeof value.toJSON === "function") {
        if (!ctx || !identity.hasAnchor(value))
          return value.toJSON(arg, ctx);
        const data = { aliasCount: 0, count: 1, res: void 0 };
        ctx.anchors.set(value, data);
        ctx.onCreate = (res2) => {
          data.res = res2;
          delete ctx.onCreate;
        };
        const res = value.toJSON(arg, ctx);
        if (ctx.onCreate)
          ctx.onCreate(res);
        return res;
      }
      if (typeof value === "bigint" && !ctx?.keep)
        return Number(value);
      return value;
    }
    exports.toJS = toJS;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/nodes/Node.js
var require_Node = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/nodes/Node.js"(exports) {
    "use strict";
    init_esm_shims();
    var applyReviver = require_applyReviver();
    var identity = require_identity();
    var toJS = require_toJS();
    var NodeBase = class {
      constructor(type) {
        Object.defineProperty(this, identity.NODE_TYPE, { value: type });
      }
      /** Create a copy of this node.  */
      clone() {
        const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      /** A plain JavaScript representation of this node. */
      toJS(doc, { mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
        if (!identity.isDocument(doc))
          throw new TypeError("A document argument is required");
        const ctx = {
          anchors: /* @__PURE__ */ new Map(),
          doc,
          keep: true,
          mapAsMap: mapAsMap === true,
          mapKeyWarned: false,
          maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
        };
        const res = toJS.toJS(this, "", ctx);
        if (typeof onAnchor === "function")
          for (const { count, res: res2 } of ctx.anchors.values())
            onAnchor(res2, count);
        return typeof reviver === "function" ? applyReviver.applyReviver(reviver, { "": res }, "", res) : res;
      }
    };
    exports.NodeBase = NodeBase;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/nodes/Alias.js
var require_Alias = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/nodes/Alias.js"(exports) {
    "use strict";
    init_esm_shims();
    var anchors = require_anchors();
    var visit = require_visit();
    var identity = require_identity();
    var Node = require_Node();
    var toJS = require_toJS();
    var Alias = class extends Node.NodeBase {
      constructor(source) {
        super(identity.ALIAS);
        this.source = source;
        Object.defineProperty(this, "tag", {
          set() {
            throw new Error("Alias nodes cannot have tags");
          }
        });
      }
      /**
       * Resolve the value of this alias within `doc`, finding the last
       * instance of the `source` anchor before this node.
       */
      resolve(doc, ctx) {
        if (ctx?.maxAliasCount === 0)
          throw new ReferenceError("Alias resolution is disabled");
        let nodes;
        if (ctx?.aliasResolveCache) {
          nodes = ctx.aliasResolveCache;
        } else {
          nodes = [];
          visit.visit(doc, {
            Node: (_key, node) => {
              if (identity.isAlias(node) || identity.hasAnchor(node))
                nodes.push(node);
            }
          });
          if (ctx)
            ctx.aliasResolveCache = nodes;
        }
        let found = void 0;
        for (const node of nodes) {
          if (node === this)
            break;
          if (node.anchor === this.source)
            found = node;
        }
        if (found && ctx) {
          const { anchors: anchors2, doc: doc2, maxAliasCount } = ctx;
          let data = anchors2.get(found);
          if (!data) {
            toJS.toJS(found, null, ctx);
            data = anchors2.get(found);
          }
          if (data?.res === void 0) {
            const msg = "This should not happen: Alias anchor was not resolved?";
            throw new ReferenceError(msg);
          }
          if (maxAliasCount >= 0) {
            data.count += 1;
            if (data.aliasCount === 0)
              data.aliasCount = getAliasCount(doc2, found, anchors2);
            if (data.count * data.aliasCount > maxAliasCount) {
              const msg = "Excessive alias count indicates a resource exhaustion attack";
              throw new ReferenceError(msg);
            }
          }
        }
        return found;
      }
      toJSON(_arg, ctx) {
        if (!ctx)
          return { source: this.source };
        const source = this.resolve(ctx.doc, ctx);
        if (!source) {
          const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
          throw new ReferenceError(msg);
        }
        return ctx.anchors.get(source).res;
      }
      toString(ctx, _onComment, _onChompKeep) {
        const src = `*${this.source}`;
        if (ctx) {
          anchors.anchorIsValid(this.source);
          if (ctx.options.verifyAliasOrder && !ctx.anchors.has(this.source)) {
            const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
            throw new Error(msg);
          }
          if (ctx.implicitKey)
            return `${src} `;
        }
        return src;
      }
    };
    function getAliasCount(doc, node, anchors2) {
      if (identity.isAlias(node)) {
        const source = node.resolve(doc);
        const anchor = anchors2 && source && anchors2.get(source);
        return anchor ? anchor.count * anchor.aliasCount : 0;
      } else if (identity.isCollection(node)) {
        let count = 0;
        for (const item of node.items) {
          const c = getAliasCount(doc, item, anchors2);
          if (c > count)
            count = c;
        }
        return count;
      } else if (identity.isPair(node)) {
        const kc = getAliasCount(doc, node.key, anchors2);
        const vc = getAliasCount(doc, node.value, anchors2);
        return Math.max(kc, vc);
      }
      return 1;
    }
    exports.Alias = Alias;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/nodes/Scalar.js
var require_Scalar = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/nodes/Scalar.js"(exports) {
    "use strict";
    init_esm_shims();
    var identity = require_identity();
    var Node = require_Node();
    var toJS = require_toJS();
    var isScalarValue = (value) => !value || typeof value !== "function" && typeof value !== "object";
    var Scalar = class extends Node.NodeBase {
      constructor(value) {
        super(identity.SCALAR);
        this.value = value;
      }
      toJSON(arg, ctx) {
        return ctx?.keep ? this.value : toJS.toJS(this.value, arg, ctx);
      }
      toString() {
        return String(this.value);
      }
    };
    Scalar.BLOCK_FOLDED = "BLOCK_FOLDED";
    Scalar.BLOCK_LITERAL = "BLOCK_LITERAL";
    Scalar.PLAIN = "PLAIN";
    Scalar.QUOTE_DOUBLE = "QUOTE_DOUBLE";
    Scalar.QUOTE_SINGLE = "QUOTE_SINGLE";
    exports.Scalar = Scalar;
    exports.isScalarValue = isScalarValue;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/doc/createNode.js
var require_createNode = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/doc/createNode.js"(exports) {
    "use strict";
    init_esm_shims();
    var Alias = require_Alias();
    var identity = require_identity();
    var Scalar = require_Scalar();
    var defaultTagPrefix = "tag:yaml.org,2002:";
    function findTagObject(value, tagName, tags) {
      if (tagName) {
        const match = tags.filter((t) => t.tag === tagName);
        const tagObj = match.find((t) => !t.format) ?? match[0];
        if (!tagObj)
          throw new Error(`Tag ${tagName} not found`);
        return tagObj;
      }
      return tags.find((t) => t.identify?.(value) && !t.format);
    }
    function createNode(value, tagName, ctx) {
      if (identity.isDocument(value))
        value = value.contents;
      if (identity.isNode(value))
        return value;
      if (identity.isPair(value)) {
        const map = ctx.schema[identity.MAP].createNode?.(ctx.schema, null, ctx);
        map.items.push(value);
        return map;
      }
      if (value instanceof String || value instanceof Number || value instanceof Boolean || typeof BigInt !== "undefined" && value instanceof BigInt) {
        value = value.valueOf();
      }
      const { aliasDuplicateObjects, onAnchor, onTagObj, schema, sourceObjects } = ctx;
      let ref = void 0;
      if (aliasDuplicateObjects && value && typeof value === "object") {
        ref = sourceObjects.get(value);
        if (ref) {
          ref.anchor ?? (ref.anchor = onAnchor(value));
          return new Alias.Alias(ref.anchor);
        } else {
          ref = { anchor: null, node: null };
          sourceObjects.set(value, ref);
        }
      }
      if (tagName?.startsWith("!!"))
        tagName = defaultTagPrefix + tagName.slice(2);
      let tagObj = findTagObject(value, tagName, schema.tags);
      if (!tagObj) {
        if (value && typeof value.toJSON === "function") {
          value = value.toJSON();
        }
        if (!value || typeof value !== "object") {
          const node2 = new Scalar.Scalar(value);
          if (ref)
            ref.node = node2;
          return node2;
        }
        tagObj = value instanceof Map ? schema[identity.MAP] : Symbol.iterator in Object(value) ? schema[identity.SEQ] : schema[identity.MAP];
      }
      if (onTagObj) {
        onTagObj(tagObj);
        delete ctx.onTagObj;
      }
      const node = tagObj?.createNode ? tagObj.createNode(ctx.schema, value, ctx) : typeof tagObj?.nodeClass?.from === "function" ? tagObj.nodeClass.from(ctx.schema, value, ctx) : new Scalar.Scalar(value);
      if (tagName)
        node.tag = tagName;
      else if (!tagObj.default)
        node.tag = tagObj.tag;
      if (ref)
        ref.node = node;
      return node;
    }
    exports.createNode = createNode;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/nodes/Collection.js
var require_Collection = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/nodes/Collection.js"(exports) {
    "use strict";
    init_esm_shims();
    var createNode = require_createNode();
    var identity = require_identity();
    var Node = require_Node();
    function collectionFromPath(schema, path, value) {
      let v = value;
      for (let i = path.length - 1; i >= 0; --i) {
        const k = path[i];
        if (typeof k === "number" && Number.isInteger(k) && k >= 0) {
          const a = [];
          a[k] = v;
          v = a;
        } else {
          v = /* @__PURE__ */ new Map([[k, v]]);
        }
      }
      return createNode.createNode(v, void 0, {
        aliasDuplicateObjects: false,
        keepUndefined: false,
        onAnchor: () => {
          throw new Error("This should not happen, please report a bug.");
        },
        schema,
        sourceObjects: /* @__PURE__ */ new Map()
      });
    }
    var isEmptyPath = (path) => path == null || typeof path === "object" && !!path[Symbol.iterator]().next().done;
    var Collection = class extends Node.NodeBase {
      constructor(type, schema) {
        super(type);
        Object.defineProperty(this, "schema", {
          value: schema,
          configurable: true,
          enumerable: false,
          writable: true
        });
      }
      /**
       * Create a copy of this collection.
       *
       * @param schema - If defined, overwrites the original's schema
       */
      clone(schema) {
        const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (schema)
          copy.schema = schema;
        copy.items = copy.items.map((it) => identity.isNode(it) || identity.isPair(it) ? it.clone(schema) : it);
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      /**
       * Adds a value to the collection. For `!!map` and `!!omap` the value must
       * be a Pair instance or a `{ key, value }` object, which may not have a key
       * that already exists in the map.
       */
      addIn(path, value) {
        if (isEmptyPath(path))
          this.add(value);
        else {
          const [key, ...rest] = path;
          const node = this.get(key, true);
          if (identity.isCollection(node))
            node.addIn(rest, value);
          else if (node === void 0 && this.schema)
            this.set(key, collectionFromPath(this.schema, rest, value));
          else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
      /**
       * Removes a value from the collection.
       * @returns `true` if the item was found and removed.
       */
      deleteIn(path) {
        const [key, ...rest] = path;
        if (rest.length === 0)
          return this.delete(key);
        const node = this.get(key, true);
        if (identity.isCollection(node))
          return node.deleteIn(rest);
        else
          throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
      }
      /**
       * Returns item at `key`, or `undefined` if not found. By default unwraps
       * scalar values from their surrounding node; to disable set `keepScalar` to
       * `true` (collections are always returned intact).
       */
      getIn(path, keepScalar) {
        const [key, ...rest] = path;
        const node = this.get(key, true);
        if (rest.length === 0)
          return !keepScalar && identity.isScalar(node) ? node.value : node;
        else
          return identity.isCollection(node) ? node.getIn(rest, keepScalar) : void 0;
      }
      hasAllNullValues(allowScalar) {
        return this.items.every((node) => {
          if (!identity.isPair(node))
            return false;
          const n = node.value;
          return n == null || allowScalar && identity.isScalar(n) && n.value == null && !n.commentBefore && !n.comment && !n.tag;
        });
      }
      /**
       * Checks if the collection includes a value with the key `key`.
       */
      hasIn(path) {
        const [key, ...rest] = path;
        if (rest.length === 0)
          return this.has(key);
        const node = this.get(key, true);
        return identity.isCollection(node) ? node.hasIn(rest) : false;
      }
      /**
       * Sets a value in this collection. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       */
      setIn(path, value) {
        const [key, ...rest] = path;
        if (rest.length === 0) {
          this.set(key, value);
        } else {
          const node = this.get(key, true);
          if (identity.isCollection(node))
            node.setIn(rest, value);
          else if (node === void 0 && this.schema)
            this.set(key, collectionFromPath(this.schema, rest, value));
          else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
    };
    exports.Collection = Collection;
    exports.collectionFromPath = collectionFromPath;
    exports.isEmptyPath = isEmptyPath;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/stringify/stringifyComment.js
var require_stringifyComment = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/stringify/stringifyComment.js"(exports) {
    "use strict";
    init_esm_shims();
    var stringifyComment = (str) => str.replace(/^(?!$)(?: $)?/gm, "#");
    function indentComment(comment, indent) {
      if (/^\n+$/.test(comment))
        return comment.substring(1);
      return indent ? comment.replace(/^(?! *$)/gm, indent) : comment;
    }
    var lineComment = (str, indent, comment) => str.endsWith("\n") ? indentComment(comment, indent) : comment.includes("\n") ? "\n" + indentComment(comment, indent) : (str.endsWith(" ") ? "" : " ") + comment;
    exports.indentComment = indentComment;
    exports.lineComment = lineComment;
    exports.stringifyComment = stringifyComment;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/stringify/foldFlowLines.js
var require_foldFlowLines = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/stringify/foldFlowLines.js"(exports) {
    "use strict";
    init_esm_shims();
    var FOLD_FLOW = "flow";
    var FOLD_BLOCK = "block";
    var FOLD_QUOTED = "quoted";
    function foldFlowLines(text, indent, mode = "flow", { indentAtStart, lineWidth = 80, minContentWidth = 20, onFold, onOverflow } = {}) {
      if (!lineWidth || lineWidth < 0)
        return text;
      if (lineWidth < minContentWidth)
        minContentWidth = 0;
      const endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent.length);
      if (text.length <= endStep)
        return text;
      const folds = [];
      const escapedFolds = {};
      let end = lineWidth - indent.length;
      if (typeof indentAtStart === "number") {
        if (indentAtStart > lineWidth - Math.max(2, minContentWidth))
          folds.push(0);
        else
          end = lineWidth - indentAtStart;
      }
      let split = void 0;
      let prev = void 0;
      let overflow = false;
      let i = -1;
      let escStart = -1;
      let escEnd = -1;
      if (mode === FOLD_BLOCK) {
        i = consumeMoreIndentedLines(text, i, indent.length);
        if (i !== -1)
          end = i + endStep;
      }
      for (let ch; ch = text[i += 1]; ) {
        if (mode === FOLD_QUOTED && ch === "\\") {
          escStart = i;
          switch (text[i + 1]) {
            case "x":
              i += 3;
              break;
            case "u":
              i += 5;
              break;
            case "U":
              i += 9;
              break;
            default:
              i += 1;
          }
          escEnd = i;
        }
        if (ch === "\n") {
          if (mode === FOLD_BLOCK)
            i = consumeMoreIndentedLines(text, i, indent.length);
          end = i + indent.length + endStep;
          split = void 0;
        } else {
          if (ch === " " && prev && prev !== " " && prev !== "\n" && prev !== "	") {
            const next = text[i + 1];
            if (next && next !== " " && next !== "\n" && next !== "	")
              split = i;
          }
          if (i >= end) {
            if (split) {
              folds.push(split);
              end = split + endStep;
              split = void 0;
            } else if (mode === FOLD_QUOTED) {
              while (prev === " " || prev === "	") {
                prev = ch;
                ch = text[i += 1];
                overflow = true;
              }
              const j = i > escEnd + 1 ? i - 2 : escStart - 1;
              if (escapedFolds[j])
                return text;
              folds.push(j);
              escapedFolds[j] = true;
              end = j + endStep;
              split = void 0;
            } else {
              overflow = true;
            }
          }
        }
        prev = ch;
      }
      if (overflow && onOverflow)
        onOverflow();
      if (folds.length === 0)
        return text;
      if (onFold)
        onFold();
      let res = text.slice(0, folds[0]);
      for (let i2 = 0; i2 < folds.length; ++i2) {
        const fold = folds[i2];
        const end2 = folds[i2 + 1] || text.length;
        if (fold === 0)
          res = `
${indent}${text.slice(0, end2)}`;
        else {
          if (mode === FOLD_QUOTED && escapedFolds[fold])
            res += `${text[fold]}\\`;
          res += `
${indent}${text.slice(fold + 1, end2)}`;
        }
      }
      return res;
    }
    function consumeMoreIndentedLines(text, i, indent) {
      let end = i;
      let start = i + 1;
      let ch = text[start];
      while (ch === " " || ch === "	") {
        if (i < start + indent) {
          ch = text[++i];
        } else {
          do {
            ch = text[++i];
          } while (ch && ch !== "\n");
          end = i;
          start = i + 1;
          ch = text[start];
        }
      }
      return end;
    }
    exports.FOLD_BLOCK = FOLD_BLOCK;
    exports.FOLD_FLOW = FOLD_FLOW;
    exports.FOLD_QUOTED = FOLD_QUOTED;
    exports.foldFlowLines = foldFlowLines;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/stringify/stringifyString.js
var require_stringifyString = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/stringify/stringifyString.js"(exports) {
    "use strict";
    init_esm_shims();
    var Scalar = require_Scalar();
    var foldFlowLines = require_foldFlowLines();
    var getFoldOptions = (ctx, isBlock) => ({
      indentAtStart: isBlock ? ctx.indent.length : ctx.indentAtStart,
      lineWidth: ctx.options.lineWidth,
      minContentWidth: ctx.options.minContentWidth
    });
    var containsDocumentMarker = (str) => /^(%|---|\.\.\.)/m.test(str);
    function lineLengthOverLimit(str, lineWidth, indentLength) {
      if (!lineWidth || lineWidth < 0)
        return false;
      const limit = lineWidth - indentLength;
      const strLen = str.length;
      if (strLen <= limit)
        return false;
      for (let i = 0, start = 0; i < strLen; ++i) {
        if (str[i] === "\n") {
          if (i - start > limit)
            return true;
          start = i + 1;
          if (strLen - start <= limit)
            return false;
        }
      }
      return true;
    }
    function doubleQuotedString(value, ctx) {
      const json = JSON.stringify(value);
      if (ctx.options.doubleQuotedAsJSON)
        return json;
      const { implicitKey } = ctx;
      const minMultiLineLength = ctx.options.doubleQuotedMinMultiLineLength;
      const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
      let str = "";
      let start = 0;
      for (let i = 0, ch = json[i]; ch; ch = json[++i]) {
        if (ch === " " && json[i + 1] === "\\" && json[i + 2] === "n") {
          str += json.slice(start, i) + "\\ ";
          i += 1;
          start = i;
          ch = "\\";
        }
        if (ch === "\\")
          switch (json[i + 1]) {
            case "u":
              {
                str += json.slice(start, i);
                const code = json.substr(i + 2, 4);
                switch (code) {
                  case "0000":
                    str += "\\0";
                    break;
                  case "0007":
                    str += "\\a";
                    break;
                  case "000b":
                    str += "\\v";
                    break;
                  case "001b":
                    str += "\\e";
                    break;
                  case "0085":
                    str += "\\N";
                    break;
                  case "00a0":
                    str += "\\_";
                    break;
                  case "2028":
                    str += "\\L";
                    break;
                  case "2029":
                    str += "\\P";
                    break;
                  default:
                    if (code.substr(0, 2) === "00")
                      str += "\\x" + code.substr(2);
                    else
                      str += json.substr(i, 6);
                }
                i += 5;
                start = i + 1;
              }
              break;
            case "n":
              if (implicitKey || json[i + 2] === '"' || json.length < minMultiLineLength) {
                i += 1;
              } else {
                str += json.slice(start, i) + "\n\n";
                while (json[i + 2] === "\\" && json[i + 3] === "n" && json[i + 4] !== '"') {
                  str += "\n";
                  i += 2;
                }
                str += indent;
                if (json[i + 2] === " ")
                  str += "\\";
                i += 1;
                start = i + 1;
              }
              break;
            default:
              i += 1;
          }
      }
      str = start ? str + json.slice(start) : json;
      return implicitKey ? str : foldFlowLines.foldFlowLines(str, indent, foldFlowLines.FOLD_QUOTED, getFoldOptions(ctx, false));
    }
    function singleQuotedString(value, ctx) {
      if (ctx.options.singleQuote === false || ctx.implicitKey && value.includes("\n") || /[ \t]\n|\n[ \t]/.test(value))
        return doubleQuotedString(value, ctx);
      const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
      const res = "'" + value.replace(/'/g, "''").replace(/\n+/g, `$&
${indent}`) + "'";
      return ctx.implicitKey ? res : foldFlowLines.foldFlowLines(res, indent, foldFlowLines.FOLD_FLOW, getFoldOptions(ctx, false));
    }
    function quotedString(value, ctx) {
      const { singleQuote } = ctx.options;
      let qs;
      if (singleQuote === false)
        qs = doubleQuotedString;
      else {
        const hasDouble = value.includes('"');
        const hasSingle = value.includes("'");
        if (hasDouble && !hasSingle)
          qs = singleQuotedString;
        else if (hasSingle && !hasDouble)
          qs = doubleQuotedString;
        else
          qs = singleQuote ? singleQuotedString : doubleQuotedString;
      }
      return qs(value, ctx);
    }
    var blockEndNewlines;
    try {
      blockEndNewlines = new RegExp("(^|(?<!\n))\n+(?!\n|$)", "g");
    } catch {
      blockEndNewlines = /\n+(?!\n|$)/g;
    }
    function blockString({ comment, type, value }, ctx, onComment, onChompKeep) {
      const { blockQuote, commentString, lineWidth } = ctx.options;
      if (!blockQuote || /\n[\t ]+$/.test(value)) {
        return quotedString(value, ctx);
      }
      const indent = ctx.indent || (ctx.forceBlockIndent || containsDocumentMarker(value) ? "  " : "");
      const literal = blockQuote === "literal" ? true : blockQuote === "folded" || type === Scalar.Scalar.BLOCK_FOLDED ? false : type === Scalar.Scalar.BLOCK_LITERAL ? true : !lineLengthOverLimit(value, lineWidth, indent.length);
      if (!value)
        return literal ? "|\n" : ">\n";
      let chomp;
      let endStart;
      for (endStart = value.length; endStart > 0; --endStart) {
        const ch = value[endStart - 1];
        if (ch !== "\n" && ch !== "	" && ch !== " ")
          break;
      }
      let end = value.substring(endStart);
      const endNlPos = end.indexOf("\n");
      if (endNlPos === -1) {
        chomp = "-";
      } else if (value === end || endNlPos !== end.length - 1) {
        chomp = "+";
        if (onChompKeep)
          onChompKeep();
      } else {
        chomp = "";
      }
      if (end) {
        value = value.slice(0, -end.length);
        if (end[end.length - 1] === "\n")
          end = end.slice(0, -1);
        end = end.replace(blockEndNewlines, `$&${indent}`);
      }
      let startWithSpace = false;
      let startEnd;
      let startNlPos = -1;
      for (startEnd = 0; startEnd < value.length; ++startEnd) {
        const ch = value[startEnd];
        if (ch === " ")
          startWithSpace = true;
        else if (ch === "\n")
          startNlPos = startEnd;
        else
          break;
      }
      let start = value.substring(0, startNlPos < startEnd ? startNlPos + 1 : startEnd);
      if (start) {
        value = value.substring(start.length);
        start = start.replace(/\n+/g, `$&${indent}`);
      }
      const indentSize = indent ? "2" : "1";
      let header = (startWithSpace ? indentSize : "") + chomp;
      if (comment) {
        header += " " + commentString(comment.replace(/ ?[\r\n]+/g, " "));
        if (onComment)
          onComment();
      }
      if (!literal) {
        const foldedValue = value.replace(/\n+/g, "\n$&").replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${indent}`);
        let literalFallback = false;
        const foldOptions = getFoldOptions(ctx, true);
        if (blockQuote !== "folded" && type !== Scalar.Scalar.BLOCK_FOLDED) {
          foldOptions.onOverflow = () => {
            literalFallback = true;
          };
        }
        const body = foldFlowLines.foldFlowLines(`${start}${foldedValue}${end}`, indent, foldFlowLines.FOLD_BLOCK, foldOptions);
        if (!literalFallback)
          return `>${header}
${indent}${body}`;
      }
      value = value.replace(/\n+/g, `$&${indent}`);
      return `|${header}
${indent}${start}${value}${end}`;
    }
    function plainString(item, ctx, onComment, onChompKeep) {
      const { type, value } = item;
      const { actualString, implicitKey, indent, indentStep, inFlow } = ctx;
      if (implicitKey && value.includes("\n") || inFlow && /[[\]{},]/.test(value)) {
        return quotedString(value, ctx);
      }
      if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(value)) {
        return implicitKey || inFlow || !value.includes("\n") ? quotedString(value, ctx) : blockString(item, ctx, onComment, onChompKeep);
      }
      if (!implicitKey && !inFlow && type !== Scalar.Scalar.PLAIN && value.includes("\n")) {
        return blockString(item, ctx, onComment, onChompKeep);
      }
      if (containsDocumentMarker(value)) {
        if (indent === "") {
          ctx.forceBlockIndent = true;
          return blockString(item, ctx, onComment, onChompKeep);
        } else if (implicitKey && indent === indentStep) {
          return quotedString(value, ctx);
        }
      }
      const str = value.replace(/\n+/g, `$&
${indent}`);
      if (actualString) {
        const test = (tag) => tag.default && tag.tag !== "tag:yaml.org,2002:str" && tag.test?.test(str);
        const { compat, tags } = ctx.doc.schema;
        if (tags.some(test) || compat?.some(test))
          return quotedString(value, ctx);
      }
      return implicitKey ? str : foldFlowLines.foldFlowLines(str, indent, foldFlowLines.FOLD_FLOW, getFoldOptions(ctx, false));
    }
    function stringifyString(item, ctx, onComment, onChompKeep) {
      const { implicitKey, inFlow } = ctx;
      const ss = typeof item.value === "string" ? item : Object.assign({}, item, { value: String(item.value) });
      let { type } = item;
      if (type !== Scalar.Scalar.QUOTE_DOUBLE) {
        if (/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(ss.value))
          type = Scalar.Scalar.QUOTE_DOUBLE;
      }
      const _stringify = (_type) => {
        switch (_type) {
          case Scalar.Scalar.BLOCK_FOLDED:
          case Scalar.Scalar.BLOCK_LITERAL:
            return implicitKey || inFlow ? quotedString(ss.value, ctx) : blockString(ss, ctx, onComment, onChompKeep);
          case Scalar.Scalar.QUOTE_DOUBLE:
            return doubleQuotedString(ss.value, ctx);
          case Scalar.Scalar.QUOTE_SINGLE:
            return singleQuotedString(ss.value, ctx);
          case Scalar.Scalar.PLAIN:
            return plainString(ss, ctx, onComment, onChompKeep);
          default:
            return null;
        }
      };
      let res = _stringify(type);
      if (res === null) {
        const { defaultKeyType, defaultStringType } = ctx.options;
        const t = implicitKey && defaultKeyType || defaultStringType;
        res = _stringify(t);
        if (res === null)
          throw new Error(`Unsupported default string type ${t}`);
      }
      return res;
    }
    exports.stringifyString = stringifyString;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/stringify/stringify.js
var require_stringify = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/stringify/stringify.js"(exports) {
    "use strict";
    init_esm_shims();
    var anchors = require_anchors();
    var identity = require_identity();
    var stringifyComment = require_stringifyComment();
    var stringifyString = require_stringifyString();
    function createStringifyContext(doc, options) {
      const opt = Object.assign({
        blockQuote: true,
        commentString: stringifyComment.stringifyComment,
        defaultKeyType: null,
        defaultStringType: "PLAIN",
        directives: null,
        doubleQuotedAsJSON: false,
        doubleQuotedMinMultiLineLength: 40,
        falseStr: "false",
        flowCollectionPadding: true,
        indentSeq: true,
        lineWidth: 80,
        minContentWidth: 20,
        nullStr: "null",
        simpleKeys: false,
        singleQuote: null,
        trailingComma: false,
        trueStr: "true",
        verifyAliasOrder: true
      }, doc.schema.toStringOptions, options);
      let inFlow;
      switch (opt.collectionStyle) {
        case "block":
          inFlow = false;
          break;
        case "flow":
          inFlow = true;
          break;
        default:
          inFlow = null;
      }
      return {
        anchors: /* @__PURE__ */ new Set(),
        doc,
        flowCollectionPadding: opt.flowCollectionPadding ? " " : "",
        indent: "",
        indentStep: typeof opt.indent === "number" ? " ".repeat(opt.indent) : "  ",
        inFlow,
        options: opt
      };
    }
    function getTagObject(tags, item) {
      if (item.tag) {
        const match = tags.filter((t) => t.tag === item.tag);
        if (match.length > 0)
          return match.find((t) => t.format === item.format) ?? match[0];
      }
      let tagObj = void 0;
      let obj;
      if (identity.isScalar(item)) {
        obj = item.value;
        let match = tags.filter((t) => t.identify?.(obj));
        if (match.length > 1) {
          const testMatch = match.filter((t) => t.test);
          if (testMatch.length > 0)
            match = testMatch;
        }
        tagObj = match.find((t) => t.format === item.format) ?? match.find((t) => !t.format);
      } else {
        obj = item;
        tagObj = tags.find((t) => t.nodeClass && obj instanceof t.nodeClass);
      }
      if (!tagObj) {
        const name = obj?.constructor?.name ?? (obj === null ? "null" : typeof obj);
        throw new Error(`Tag not resolved for ${name} value`);
      }
      return tagObj;
    }
    function stringifyProps(node, tagObj, { anchors: anchors$1, doc }) {
      if (!doc.directives)
        return "";
      const props = [];
      const anchor = (identity.isScalar(node) || identity.isCollection(node)) && node.anchor;
      if (anchor && anchors.anchorIsValid(anchor)) {
        anchors$1.add(anchor);
        props.push(`&${anchor}`);
      }
      const tag = node.tag ?? (tagObj.default ? null : tagObj.tag);
      if (tag)
        props.push(doc.directives.tagString(tag));
      return props.join(" ");
    }
    function stringify(item, ctx, onComment, onChompKeep) {
      if (identity.isPair(item))
        return item.toString(ctx, onComment, onChompKeep);
      if (identity.isAlias(item)) {
        if (ctx.doc.directives)
          return item.toString(ctx);
        if (ctx.resolvedAliases?.has(item)) {
          throw new TypeError(`Cannot stringify circular structure without alias nodes`);
        } else {
          if (ctx.resolvedAliases)
            ctx.resolvedAliases.add(item);
          else
            ctx.resolvedAliases = /* @__PURE__ */ new Set([item]);
          item = item.resolve(ctx.doc);
        }
      }
      let tagObj = void 0;
      const node = identity.isNode(item) ? item : ctx.doc.createNode(item, { onTagObj: (o) => tagObj = o });
      tagObj ?? (tagObj = getTagObject(ctx.doc.schema.tags, node));
      const props = stringifyProps(node, tagObj, ctx);
      if (props.length > 0)
        ctx.indentAtStart = (ctx.indentAtStart ?? 0) + props.length + 1;
      const str = typeof tagObj.stringify === "function" ? tagObj.stringify(node, ctx, onComment, onChompKeep) : identity.isScalar(node) ? stringifyString.stringifyString(node, ctx, onComment, onChompKeep) : node.toString(ctx, onComment, onChompKeep);
      if (!props)
        return str;
      return identity.isScalar(node) || str[0] === "{" || str[0] === "[" ? `${props} ${str}` : `${props}
${ctx.indent}${str}`;
    }
    exports.createStringifyContext = createStringifyContext;
    exports.stringify = stringify;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/stringify/stringifyPair.js
var require_stringifyPair = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/stringify/stringifyPair.js"(exports) {
    "use strict";
    init_esm_shims();
    var identity = require_identity();
    var Scalar = require_Scalar();
    var stringify = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyPair({ key, value }, ctx, onComment, onChompKeep) {
      const { allNullValues, doc, indent, indentStep, options: { commentString, indentSeq, simpleKeys } } = ctx;
      let keyComment = identity.isNode(key) && key.comment || null;
      if (simpleKeys) {
        if (keyComment) {
          throw new Error("With simple keys, key nodes cannot have comments");
        }
        if (identity.isCollection(key) || !identity.isNode(key) && typeof key === "object") {
          const msg = "With simple keys, collection cannot be used as a key value";
          throw new Error(msg);
        }
      }
      let explicitKey = !simpleKeys && (!key || keyComment && value == null && !ctx.inFlow || identity.isCollection(key) || (identity.isScalar(key) ? key.type === Scalar.Scalar.BLOCK_FOLDED || key.type === Scalar.Scalar.BLOCK_LITERAL : typeof key === "object"));
      ctx = Object.assign({}, ctx, {
        allNullValues: false,
        implicitKey: !explicitKey && (simpleKeys || !allNullValues),
        indent: indent + indentStep
      });
      let keyCommentDone = false;
      let chompKeep = false;
      let str = stringify.stringify(key, ctx, () => keyCommentDone = true, () => chompKeep = true);
      if (!explicitKey && !ctx.inFlow && str.length > 1024) {
        if (simpleKeys)
          throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
        explicitKey = true;
      }
      if (ctx.inFlow) {
        if (allNullValues || value == null) {
          if (keyCommentDone && onComment)
            onComment();
          return str === "" ? "?" : explicitKey ? `? ${str}` : str;
        }
      } else if (allNullValues && !simpleKeys || value == null && explicitKey) {
        str = `? ${str}`;
        if (keyComment && !keyCommentDone) {
          str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
        } else if (chompKeep && onChompKeep)
          onChompKeep();
        return str;
      }
      if (keyCommentDone)
        keyComment = null;
      if (explicitKey) {
        if (keyComment)
          str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
        str = `? ${str}
${indent}:`;
      } else {
        str = `${str}:`;
        if (keyComment)
          str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
      }
      let vsb, vcb, valueComment;
      if (identity.isNode(value)) {
        vsb = !!value.spaceBefore;
        vcb = value.commentBefore;
        valueComment = value.comment;
      } else {
        vsb = false;
        vcb = null;
        valueComment = null;
        if (value && typeof value === "object")
          value = doc.createNode(value);
      }
      ctx.implicitKey = false;
      if (!explicitKey && !keyComment && identity.isScalar(value))
        ctx.indentAtStart = str.length + 1;
      chompKeep = false;
      if (!indentSeq && indentStep.length >= 2 && !ctx.inFlow && !explicitKey && identity.isSeq(value) && !value.flow && !value.tag && !value.anchor) {
        ctx.indent = ctx.indent.substring(2);
      }
      let valueCommentDone = false;
      const valueStr = stringify.stringify(value, ctx, () => valueCommentDone = true, () => chompKeep = true);
      let ws = " ";
      if (keyComment || vsb || vcb) {
        ws = vsb ? "\n" : "";
        if (vcb) {
          const cs = commentString(vcb);
          ws += `
${stringifyComment.indentComment(cs, ctx.indent)}`;
        }
        if (valueStr === "" && !ctx.inFlow) {
          if (ws === "\n" && valueComment)
            ws = "\n\n";
        } else {
          ws += `
${ctx.indent}`;
        }
      } else if (!explicitKey && identity.isCollection(value)) {
        const vs0 = valueStr[0];
        const nl0 = valueStr.indexOf("\n");
        const hasNewline = nl0 !== -1;
        const flow2 = ctx.inFlow ?? value.flow ?? value.items.length === 0;
        if (hasNewline || !flow2) {
          let hasPropsLine = false;
          if (hasNewline && (vs0 === "&" || vs0 === "!")) {
            let sp0 = valueStr.indexOf(" ");
            if (vs0 === "&" && sp0 !== -1 && sp0 < nl0 && valueStr[sp0 + 1] === "!") {
              sp0 = valueStr.indexOf(" ", sp0 + 1);
            }
            if (sp0 === -1 || nl0 < sp0)
              hasPropsLine = true;
          }
          if (!hasPropsLine)
            ws = `
${ctx.indent}`;
        }
      } else if (valueStr === "" || valueStr[0] === "\n") {
        ws = "";
      }
      str += ws + valueStr;
      if (ctx.inFlow) {
        if (valueCommentDone && onComment)
          onComment();
      } else if (valueComment && !valueCommentDone) {
        str += stringifyComment.lineComment(str, ctx.indent, commentString(valueComment));
      } else if (chompKeep && onChompKeep) {
        onChompKeep();
      }
      return str;
    }
    exports.stringifyPair = stringifyPair;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/log.js
var require_log = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/log.js"(exports) {
    "use strict";
    init_esm_shims();
    var node_process = __require("process");
    function debug(logLevel, ...messages) {
      if (logLevel === "debug")
        console.log(...messages);
    }
    function warn(logLevel, warning) {
      if (logLevel === "debug" || logLevel === "warn") {
        if (typeof node_process.emitWarning === "function")
          node_process.emitWarning(warning);
        else
          console.warn(warning);
      }
    }
    exports.debug = debug;
    exports.warn = warn;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/yaml-1.1/merge.js
var require_merge = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/yaml-1.1/merge.js"(exports) {
    "use strict";
    init_esm_shims();
    var identity = require_identity();
    var Scalar = require_Scalar();
    var MERGE_KEY = "<<";
    var merge = {
      identify: (value) => value === MERGE_KEY || typeof value === "symbol" && value.description === MERGE_KEY,
      default: "key",
      tag: "tag:yaml.org,2002:merge",
      test: /^<<$/,
      resolve: () => Object.assign(new Scalar.Scalar(Symbol(MERGE_KEY)), {
        addToJSMap: addMergeToJSMap
      }),
      stringify: () => MERGE_KEY
    };
    var isMergeKey = (ctx, key) => (merge.identify(key) || identity.isScalar(key) && (!key.type || key.type === Scalar.Scalar.PLAIN) && merge.identify(key.value)) && ctx?.doc.schema.tags.some((tag) => tag.tag === merge.tag && tag.default);
    function addMergeToJSMap(ctx, map, value) {
      const source = resolveAliasValue(ctx, value);
      if (identity.isSeq(source))
        for (const it of source.items)
          mergeValue(ctx, map, it);
      else if (Array.isArray(source))
        for (const it of source)
          mergeValue(ctx, map, it);
      else
        mergeValue(ctx, map, source);
    }
    function mergeValue(ctx, map, value) {
      const source = resolveAliasValue(ctx, value);
      if (!identity.isMap(source))
        throw new Error("Merge sources must be maps or map aliases");
      const srcMap = source.toJSON(null, ctx, Map);
      for (const [key, value2] of srcMap) {
        if (map instanceof Map) {
          if (!map.has(key))
            map.set(key, value2);
        } else if (map instanceof Set) {
          map.add(key);
        } else if (!Object.prototype.hasOwnProperty.call(map, key)) {
          Object.defineProperty(map, key, {
            value: value2,
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
      }
      return map;
    }
    function resolveAliasValue(ctx, value) {
      return ctx && identity.isAlias(value) ? value.resolve(ctx.doc, ctx) : value;
    }
    exports.addMergeToJSMap = addMergeToJSMap;
    exports.isMergeKey = isMergeKey;
    exports.merge = merge;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/nodes/addPairToJSMap.js
var require_addPairToJSMap = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/nodes/addPairToJSMap.js"(exports) {
    "use strict";
    init_esm_shims();
    var log = require_log();
    var merge = require_merge();
    var stringify = require_stringify();
    var identity = require_identity();
    var toJS = require_toJS();
    function addPairToJSMap(ctx, map, { key, value }) {
      if (identity.isNode(key) && key.addToJSMap)
        key.addToJSMap(ctx, map, value);
      else if (merge.isMergeKey(ctx, key))
        merge.addMergeToJSMap(ctx, map, value);
      else {
        const jsKey = toJS.toJS(key, "", ctx);
        if (map instanceof Map) {
          map.set(jsKey, toJS.toJS(value, jsKey, ctx));
        } else if (map instanceof Set) {
          map.add(jsKey);
        } else {
          const stringKey = stringifyKey(key, jsKey, ctx);
          const jsValue = toJS.toJS(value, stringKey, ctx);
          if (stringKey in map)
            Object.defineProperty(map, stringKey, {
              value: jsValue,
              writable: true,
              enumerable: true,
              configurable: true
            });
          else
            map[stringKey] = jsValue;
        }
      }
      return map;
    }
    function stringifyKey(key, jsKey, ctx) {
      if (jsKey === null)
        return "";
      if (typeof jsKey !== "object")
        return String(jsKey);
      if (identity.isNode(key) && ctx?.doc) {
        const strCtx = stringify.createStringifyContext(ctx.doc, {});
        strCtx.anchors = /* @__PURE__ */ new Set();
        for (const node of ctx.anchors.keys())
          strCtx.anchors.add(node.anchor);
        strCtx.inFlow = true;
        strCtx.inStringifyKey = true;
        const strKey = key.toString(strCtx);
        if (!ctx.mapKeyWarned) {
          let jsonStr = JSON.stringify(strKey);
          if (jsonStr.length > 40)
            jsonStr = jsonStr.substring(0, 36) + '..."';
          log.warn(ctx.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${jsonStr}. Set mapAsMap: true to use object keys.`);
          ctx.mapKeyWarned = true;
        }
        return strKey;
      }
      return JSON.stringify(jsKey);
    }
    exports.addPairToJSMap = addPairToJSMap;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/nodes/Pair.js
var require_Pair = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/nodes/Pair.js"(exports) {
    "use strict";
    init_esm_shims();
    var createNode = require_createNode();
    var stringifyPair = require_stringifyPair();
    var addPairToJSMap = require_addPairToJSMap();
    var identity = require_identity();
    function createPair(key, value, ctx) {
      const k = createNode.createNode(key, void 0, ctx);
      const v = createNode.createNode(value, void 0, ctx);
      return new Pair(k, v);
    }
    var Pair = class _Pair {
      constructor(key, value = null) {
        Object.defineProperty(this, identity.NODE_TYPE, { value: identity.PAIR });
        this.key = key;
        this.value = value;
      }
      clone(schema) {
        let { key, value } = this;
        if (identity.isNode(key))
          key = key.clone(schema);
        if (identity.isNode(value))
          value = value.clone(schema);
        return new _Pair(key, value);
      }
      toJSON(_, ctx) {
        const pair = ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {};
        return addPairToJSMap.addPairToJSMap(ctx, pair, this);
      }
      toString(ctx, onComment, onChompKeep) {
        return ctx?.doc ? stringifyPair.stringifyPair(this, ctx, onComment, onChompKeep) : JSON.stringify(this);
      }
    };
    exports.Pair = Pair;
    exports.createPair = createPair;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/stringify/stringifyCollection.js
var require_stringifyCollection = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/stringify/stringifyCollection.js"(exports) {
    "use strict";
    init_esm_shims();
    var identity = require_identity();
    var stringify = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyCollection(collection, ctx, options) {
      const flow2 = ctx.inFlow ?? collection.flow;
      const stringify2 = flow2 ? stringifyFlowCollection : stringifyBlockCollection;
      return stringify2(collection, ctx, options);
    }
    function stringifyBlockCollection({ comment, items }, ctx, { blockItemPrefix, flowChars, itemIndent, onChompKeep, onComment }) {
      const { indent, options: { commentString } } = ctx;
      const itemCtx = Object.assign({}, ctx, { indent: itemIndent, type: null });
      let chompKeep = false;
      const lines = [];
      for (let i = 0; i < items.length; ++i) {
        const item = items[i];
        let comment2 = null;
        if (identity.isNode(item)) {
          if (!chompKeep && item.spaceBefore)
            lines.push("");
          addCommentBefore(ctx, lines, item.commentBefore, chompKeep);
          if (item.comment)
            comment2 = item.comment;
        } else if (identity.isPair(item)) {
          const ik = identity.isNode(item.key) ? item.key : null;
          if (ik) {
            if (!chompKeep && ik.spaceBefore)
              lines.push("");
            addCommentBefore(ctx, lines, ik.commentBefore, chompKeep);
          }
        }
        chompKeep = false;
        let str2 = stringify.stringify(item, itemCtx, () => comment2 = null, () => chompKeep = true);
        if (comment2)
          str2 += stringifyComment.lineComment(str2, itemIndent, commentString(comment2));
        if (chompKeep && comment2)
          chompKeep = false;
        lines.push(blockItemPrefix + str2);
      }
      let str;
      if (lines.length === 0) {
        str = flowChars.start + flowChars.end;
      } else {
        str = lines[0];
        for (let i = 1; i < lines.length; ++i) {
          const line = lines[i];
          str += line ? `
${indent}${line}` : "\n";
        }
      }
      if (comment) {
        str += "\n" + stringifyComment.indentComment(commentString(comment), indent);
        if (onComment)
          onComment();
      } else if (chompKeep && onChompKeep)
        onChompKeep();
      return str;
    }
    function stringifyFlowCollection({ items }, ctx, { flowChars, itemIndent }) {
      const { indent, indentStep, flowCollectionPadding: fcPadding, options: { commentString } } = ctx;
      itemIndent += indentStep;
      const itemCtx = Object.assign({}, ctx, {
        indent: itemIndent,
        inFlow: true,
        type: null
      });
      let reqNewline = false;
      let linesAtValue = 0;
      const lines = [];
      for (let i = 0; i < items.length; ++i) {
        const item = items[i];
        let comment = null;
        if (identity.isNode(item)) {
          if (item.spaceBefore)
            lines.push("");
          addCommentBefore(ctx, lines, item.commentBefore, false);
          if (item.comment)
            comment = item.comment;
        } else if (identity.isPair(item)) {
          const ik = identity.isNode(item.key) ? item.key : null;
          if (ik) {
            if (ik.spaceBefore)
              lines.push("");
            addCommentBefore(ctx, lines, ik.commentBefore, false);
            if (ik.comment)
              reqNewline = true;
          }
          const iv = identity.isNode(item.value) ? item.value : null;
          if (iv) {
            if (iv.comment)
              comment = iv.comment;
            if (iv.commentBefore)
              reqNewline = true;
          } else if (item.value == null && ik?.comment) {
            comment = ik.comment;
          }
        }
        if (comment)
          reqNewline = true;
        let str = stringify.stringify(item, itemCtx, () => comment = null);
        reqNewline || (reqNewline = lines.length > linesAtValue || str.includes("\n"));
        if (i < items.length - 1) {
          str += ",";
        } else if (ctx.options.trailingComma) {
          if (ctx.options.lineWidth > 0) {
            reqNewline || (reqNewline = lines.reduce((sum, line) => sum + line.length + 2, 2) + (str.length + 2) > ctx.options.lineWidth);
          }
          if (reqNewline) {
            str += ",";
          }
        }
        if (comment)
          str += stringifyComment.lineComment(str, itemIndent, commentString(comment));
        lines.push(str);
        linesAtValue = lines.length;
      }
      const { start, end } = flowChars;
      if (lines.length === 0) {
        return start + end;
      } else {
        if (!reqNewline) {
          const len = lines.reduce((sum, line) => sum + line.length + 2, 2);
          reqNewline = ctx.options.lineWidth > 0 && len > ctx.options.lineWidth;
        }
        if (reqNewline) {
          let str = start;
          for (const line of lines)
            str += line ? `
${indentStep}${indent}${line}` : "\n";
          return `${str}
${indent}${end}`;
        } else {
          return `${start}${fcPadding}${lines.join(" ")}${fcPadding}${end}`;
        }
      }
    }
    function addCommentBefore({ indent, options: { commentString } }, lines, comment, chompKeep) {
      if (comment && chompKeep)
        comment = comment.replace(/^\n+/, "");
      if (comment) {
        const ic = stringifyComment.indentComment(commentString(comment), indent);
        lines.push(ic.trimStart());
      }
    }
    exports.stringifyCollection = stringifyCollection;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/nodes/YAMLMap.js
var require_YAMLMap = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/nodes/YAMLMap.js"(exports) {
    "use strict";
    init_esm_shims();
    var stringifyCollection = require_stringifyCollection();
    var addPairToJSMap = require_addPairToJSMap();
    var Collection = require_Collection();
    var identity = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    function findPair2(items, key) {
      const k = identity.isScalar(key) ? key.value : key;
      for (const it of items) {
        if (identity.isPair(it)) {
          if (it.key === key || it.key === k)
            return it;
          if (identity.isScalar(it.key) && it.key.value === k)
            return it;
        }
      }
      return void 0;
    }
    var YAMLMap = class extends Collection.Collection {
      static get tagName() {
        return "tag:yaml.org,2002:map";
      }
      constructor(schema) {
        super(identity.MAP, schema);
        this.items = [];
      }
      /**
       * A generic collection parsing method that can be extended
       * to other node classes that inherit from YAMLMap
       */
      static from(schema, obj, ctx) {
        const { keepUndefined, replacer } = ctx;
        const map = new this(schema);
        const add = (key, value) => {
          if (typeof replacer === "function")
            value = replacer.call(obj, key, value);
          else if (Array.isArray(replacer) && !replacer.includes(key))
            return;
          if (value !== void 0 || keepUndefined)
            map.items.push(Pair.createPair(key, value, ctx));
        };
        if (obj instanceof Map) {
          for (const [key, value] of obj)
            add(key, value);
        } else if (obj && typeof obj === "object") {
          for (const key of Object.keys(obj))
            add(key, obj[key]);
        }
        if (typeof schema.sortMapEntries === "function") {
          map.items.sort(schema.sortMapEntries);
        }
        return map;
      }
      /**
       * Adds a value to the collection.
       *
       * @param overwrite - If not set `true`, using a key that is already in the
       *   collection will throw. Otherwise, overwrites the previous value.
       */
      add(pair, overwrite) {
        let _pair;
        if (identity.isPair(pair))
          _pair = pair;
        else if (!pair || typeof pair !== "object" || !("key" in pair)) {
          _pair = new Pair.Pair(pair, pair?.value);
        } else
          _pair = new Pair.Pair(pair.key, pair.value);
        const prev = findPair2(this.items, _pair.key);
        const sortEntries = this.schema?.sortMapEntries;
        if (prev) {
          if (!overwrite)
            throw new Error(`Key ${_pair.key} already set`);
          if (identity.isScalar(prev.value) && Scalar.isScalarValue(_pair.value))
            prev.value.value = _pair.value;
          else
            prev.value = _pair.value;
        } else if (sortEntries) {
          const i = this.items.findIndex((item) => sortEntries(_pair, item) < 0);
          if (i === -1)
            this.items.push(_pair);
          else
            this.items.splice(i, 0, _pair);
        } else {
          this.items.push(_pair);
        }
      }
      delete(key) {
        const it = findPair2(this.items, key);
        if (!it)
          return false;
        const del = this.items.splice(this.items.indexOf(it), 1);
        return del.length > 0;
      }
      get(key, keepScalar) {
        const it = findPair2(this.items, key);
        const node = it?.value;
        return (!keepScalar && identity.isScalar(node) ? node.value : node) ?? void 0;
      }
      has(key) {
        return !!findPair2(this.items, key);
      }
      set(key, value) {
        this.add(new Pair.Pair(key, value), true);
      }
      /**
       * @param ctx - Conversion context, originally set in Document#toJS()
       * @param {Class} Type - If set, forces the returned collection type
       * @returns Instance of Type, Map, or Object
       */
      toJSON(_, ctx, Type) {
        const map = Type ? new Type() : ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {};
        if (ctx?.onCreate)
          ctx.onCreate(map);
        for (const item of this.items)
          addPairToJSMap.addPairToJSMap(ctx, map, item);
        return map;
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        for (const item of this.items) {
          if (!identity.isPair(item))
            throw new Error(`Map items must all be pairs; found ${JSON.stringify(item)} instead`);
        }
        if (!ctx.allNullValues && this.hasAllNullValues(false))
          ctx = Object.assign({}, ctx, { allNullValues: true });
        return stringifyCollection.stringifyCollection(this, ctx, {
          blockItemPrefix: "",
          flowChars: { start: "{", end: "}" },
          itemIndent: ctx.indent || "",
          onChompKeep,
          onComment
        });
      }
    };
    exports.YAMLMap = YAMLMap;
    exports.findPair = findPair2;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/common/map.js
var require_map = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/common/map.js"(exports) {
    "use strict";
    init_esm_shims();
    var identity = require_identity();
    var YAMLMap = require_YAMLMap();
    var map = {
      collection: "map",
      default: true,
      nodeClass: YAMLMap.YAMLMap,
      tag: "tag:yaml.org,2002:map",
      resolve(map2, onError) {
        if (!identity.isMap(map2))
          onError("Expected a mapping for this tag");
        return map2;
      },
      createNode: (schema, obj, ctx) => YAMLMap.YAMLMap.from(schema, obj, ctx)
    };
    exports.map = map;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/nodes/YAMLSeq.js
var require_YAMLSeq = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/nodes/YAMLSeq.js"(exports) {
    "use strict";
    init_esm_shims();
    var createNode = require_createNode();
    var stringifyCollection = require_stringifyCollection();
    var Collection = require_Collection();
    var identity = require_identity();
    var Scalar = require_Scalar();
    var toJS = require_toJS();
    var YAMLSeq = class extends Collection.Collection {
      static get tagName() {
        return "tag:yaml.org,2002:seq";
      }
      constructor(schema) {
        super(identity.SEQ, schema);
        this.items = [];
      }
      add(value) {
        this.items.push(value);
      }
      /**
       * Removes a value from the collection.
       *
       * `key` must contain a representation of an integer for this to succeed.
       * It may be wrapped in a `Scalar`.
       *
       * @returns `true` if the item was found and removed.
       */
      delete(key) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          return false;
        const del = this.items.splice(idx, 1);
        return del.length > 0;
      }
      get(key, keepScalar) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          return void 0;
        const it = this.items[idx];
        return !keepScalar && identity.isScalar(it) ? it.value : it;
      }
      /**
       * Checks if the collection includes a value with the key `key`.
       *
       * `key` must contain a representation of an integer for this to succeed.
       * It may be wrapped in a `Scalar`.
       */
      has(key) {
        const idx = asItemIndex(key);
        return typeof idx === "number" && idx < this.items.length;
      }
      /**
       * Sets a value in this collection. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       *
       * If `key` does not contain a representation of an integer, this will throw.
       * It may be wrapped in a `Scalar`.
       */
      set(key, value) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          throw new Error(`Expected a valid index, not ${key}.`);
        const prev = this.items[idx];
        if (identity.isScalar(prev) && Scalar.isScalarValue(value))
          prev.value = value;
        else
          this.items[idx] = value;
      }
      toJSON(_, ctx) {
        const seq = [];
        if (ctx?.onCreate)
          ctx.onCreate(seq);
        let i = 0;
        for (const item of this.items)
          seq.push(toJS.toJS(item, String(i++), ctx));
        return seq;
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        return stringifyCollection.stringifyCollection(this, ctx, {
          blockItemPrefix: "- ",
          flowChars: { start: "[", end: "]" },
          itemIndent: (ctx.indent || "") + "  ",
          onChompKeep,
          onComment
        });
      }
      static from(schema, obj, ctx) {
        const { replacer } = ctx;
        const seq = new this(schema);
        if (obj && Symbol.iterator in Object(obj)) {
          let i = 0;
          for (let it of obj) {
            if (typeof replacer === "function") {
              const key = obj instanceof Set ? it : String(i++);
              it = replacer.call(obj, key, it);
            }
            seq.items.push(createNode.createNode(it, void 0, ctx));
          }
        }
        return seq;
      }
    };
    function asItemIndex(key) {
      let idx = identity.isScalar(key) ? key.value : key;
      if (idx && typeof idx === "string")
        idx = Number(idx);
      return typeof idx === "number" && Number.isInteger(idx) && idx >= 0 ? idx : null;
    }
    exports.YAMLSeq = YAMLSeq;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/common/seq.js
var require_seq = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/common/seq.js"(exports) {
    "use strict";
    init_esm_shims();
    var identity = require_identity();
    var YAMLSeq = require_YAMLSeq();
    var seq = {
      collection: "seq",
      default: true,
      nodeClass: YAMLSeq.YAMLSeq,
      tag: "tag:yaml.org,2002:seq",
      resolve(seq2, onError) {
        if (!identity.isSeq(seq2))
          onError("Expected a sequence for this tag");
        return seq2;
      },
      createNode: (schema, obj, ctx) => YAMLSeq.YAMLSeq.from(schema, obj, ctx)
    };
    exports.seq = seq;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/common/string.js
var require_string = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/common/string.js"(exports) {
    "use strict";
    init_esm_shims();
    var stringifyString = require_stringifyString();
    var string = {
      identify: (value) => typeof value === "string",
      default: true,
      tag: "tag:yaml.org,2002:str",
      resolve: (str) => str,
      stringify(item, ctx, onComment, onChompKeep) {
        ctx = Object.assign({ actualString: true }, ctx);
        return stringifyString.stringifyString(item, ctx, onComment, onChompKeep);
      }
    };
    exports.string = string;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/common/null.js
var require_null = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/common/null.js"(exports) {
    "use strict";
    init_esm_shims();
    var Scalar = require_Scalar();
    var nullTag = {
      identify: (value) => value == null,
      createNode: () => new Scalar.Scalar(null),
      default: true,
      tag: "tag:yaml.org,2002:null",
      test: /^(?:~|[Nn]ull|NULL)?$/,
      resolve: () => new Scalar.Scalar(null),
      stringify: ({ source }, ctx) => typeof source === "string" && nullTag.test.test(source) ? source : ctx.options.nullStr
    };
    exports.nullTag = nullTag;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/core/bool.js
var require_bool = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/core/bool.js"(exports) {
    "use strict";
    init_esm_shims();
    var Scalar = require_Scalar();
    var boolTag = {
      identify: (value) => typeof value === "boolean",
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
      resolve: (str) => new Scalar.Scalar(str[0] === "t" || str[0] === "T"),
      stringify({ source, value }, ctx) {
        if (source && boolTag.test.test(source)) {
          const sv = source[0] === "t" || source[0] === "T";
          if (value === sv)
            return source;
        }
        return value ? ctx.options.trueStr : ctx.options.falseStr;
      }
    };
    exports.boolTag = boolTag;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/stringify/stringifyNumber.js
var require_stringifyNumber = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/stringify/stringifyNumber.js"(exports) {
    "use strict";
    init_esm_shims();
    function stringifyNumber({ format, minFractionDigits, tag, value }) {
      if (typeof value === "bigint")
        return String(value);
      const num = typeof value === "number" ? value : Number(value);
      if (!isFinite(num))
        return isNaN(num) ? ".nan" : num < 0 ? "-.inf" : ".inf";
      let n = Object.is(value, -0) ? "-0" : JSON.stringify(value);
      if (!format && minFractionDigits && (!tag || tag === "tag:yaml.org,2002:float") && /^-?\d/.test(n) && !n.includes("e")) {
        let i = n.indexOf(".");
        if (i < 0) {
          i = n.length;
          n += ".";
        }
        let d = minFractionDigits - (n.length - i - 1);
        while (d-- > 0)
          n += "0";
      }
      return n;
    }
    exports.stringifyNumber = stringifyNumber;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/core/float.js
var require_float = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/core/float.js"(exports) {
    "use strict";
    init_esm_shims();
    var Scalar = require_Scalar();
    var stringifyNumber = require_stringifyNumber();
    var floatNaN = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
      resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
      stringify: stringifyNumber.stringifyNumber
    };
    var floatExp = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "EXP",
      test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
      resolve: (str) => parseFloat(str),
      stringify(node) {
        const num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber.stringifyNumber(node);
      }
    };
    var float = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
      resolve(str) {
        const node = new Scalar.Scalar(parseFloat(str));
        const dot = str.indexOf(".");
        if (dot !== -1 && str[str.length - 1] === "0")
          node.minFractionDigits = str.length - dot - 1;
        return node;
      },
      stringify: stringifyNumber.stringifyNumber
    };
    exports.float = float;
    exports.floatExp = floatExp;
    exports.floatNaN = floatNaN;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/core/int.js
var require_int = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/core/int.js"(exports) {
    "use strict";
    init_esm_shims();
    var stringifyNumber = require_stringifyNumber();
    var intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
    var intResolve = (str, offset, radix, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str.substring(offset), radix);
    function intStringify(node, radix, prefix) {
      const { value } = node;
      if (intIdentify(value) && value >= 0)
        return prefix + value.toString(radix);
      return stringifyNumber.stringifyNumber(node);
    }
    var intOct = {
      identify: (value) => intIdentify(value) && value >= 0,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "OCT",
      test: /^0o[0-7]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 8, opt),
      stringify: (node) => intStringify(node, 8, "0o")
    };
    var int = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^[-+]?[0-9]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
      stringify: stringifyNumber.stringifyNumber
    };
    var intHex = {
      identify: (value) => intIdentify(value) && value >= 0,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "HEX",
      test: /^0x[0-9a-fA-F]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
      stringify: (node) => intStringify(node, 16, "0x")
    };
    exports.int = int;
    exports.intHex = intHex;
    exports.intOct = intOct;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/core/schema.js
var require_schema = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/core/schema.js"(exports) {
    "use strict";
    init_esm_shims();
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string();
    var bool = require_bool();
    var float = require_float();
    var int = require_int();
    var schema = [
      map.map,
      seq.seq,
      string.string,
      _null.nullTag,
      bool.boolTag,
      int.intOct,
      int.int,
      int.intHex,
      float.floatNaN,
      float.floatExp,
      float.float
    ];
    exports.schema = schema;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/json/schema.js
var require_schema2 = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/json/schema.js"(exports) {
    "use strict";
    init_esm_shims();
    var Scalar = require_Scalar();
    var map = require_map();
    var seq = require_seq();
    function intIdentify(value) {
      return typeof value === "bigint" || Number.isInteger(value);
    }
    var stringifyJSON = ({ value }) => JSON.stringify(value);
    var jsonScalars = [
      {
        identify: (value) => typeof value === "string",
        default: true,
        tag: "tag:yaml.org,2002:str",
        resolve: (str) => str,
        stringify: stringifyJSON
      },
      {
        identify: (value) => value == null,
        createNode: () => new Scalar.Scalar(null),
        default: true,
        tag: "tag:yaml.org,2002:null",
        test: /^null$/,
        resolve: () => null,
        stringify: stringifyJSON
      },
      {
        identify: (value) => typeof value === "boolean",
        default: true,
        tag: "tag:yaml.org,2002:bool",
        test: /^true$|^false$/,
        resolve: (str) => str === "true",
        stringify: stringifyJSON
      },
      {
        identify: intIdentify,
        default: true,
        tag: "tag:yaml.org,2002:int",
        test: /^-?(?:0|[1-9][0-9]*)$/,
        resolve: (str, _onError, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str, 10),
        stringify: ({ value }) => intIdentify(value) ? value.toString() : JSON.stringify(value)
      },
      {
        identify: (value) => typeof value === "number",
        default: true,
        tag: "tag:yaml.org,2002:float",
        test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
        resolve: (str) => parseFloat(str),
        stringify: stringifyJSON
      }
    ];
    var jsonError = {
      default: true,
      tag: "",
      test: /^/,
      resolve(str, onError) {
        onError(`Unresolved plain scalar ${JSON.stringify(str)}`);
        return str;
      }
    };
    var schema = [map.map, seq.seq].concat(jsonScalars, jsonError);
    exports.schema = schema;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/yaml-1.1/binary.js
var require_binary = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/yaml-1.1/binary.js"(exports) {
    "use strict";
    init_esm_shims();
    var node_buffer = __require("buffer");
    var Scalar = require_Scalar();
    var stringifyString = require_stringifyString();
    var binary = {
      identify: (value) => value instanceof Uint8Array,
      // Buffer inherits from Uint8Array
      default: false,
      tag: "tag:yaml.org,2002:binary",
      /**
       * Returns a Buffer in node and an Uint8Array in browsers
       *
       * To use the resulting buffer as an image, you'll want to do something like:
       *
       *   const blob = new Blob([buffer], { type: 'image/jpeg' })
       *   document.querySelector('#photo').src = URL.createObjectURL(blob)
       */
      resolve(src, onError) {
        if (typeof node_buffer.Buffer === "function") {
          return node_buffer.Buffer.from(src, "base64");
        } else if (typeof atob === "function") {
          const str = atob(src.replace(/[\n\r]/g, ""));
          const buffer = new Uint8Array(str.length);
          for (let i = 0; i < str.length; ++i)
            buffer[i] = str.charCodeAt(i);
          return buffer;
        } else {
          onError("This environment does not support reading binary tags; either Buffer or atob is required");
          return src;
        }
      },
      stringify({ comment, type, value }, ctx, onComment, onChompKeep) {
        if (!value)
          return "";
        const buf = value;
        let str;
        if (typeof node_buffer.Buffer === "function") {
          str = buf instanceof node_buffer.Buffer ? buf.toString("base64") : node_buffer.Buffer.from(buf.buffer).toString("base64");
        } else if (typeof btoa === "function") {
          let s = "";
          for (let i = 0; i < buf.length; ++i)
            s += String.fromCharCode(buf[i]);
          str = btoa(s);
        } else {
          throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
        }
        type ?? (type = Scalar.Scalar.BLOCK_LITERAL);
        if (type !== Scalar.Scalar.QUOTE_DOUBLE) {
          const lineWidth = Math.max(ctx.options.lineWidth - ctx.indent.length, ctx.options.minContentWidth);
          const n = Math.ceil(str.length / lineWidth);
          const lines = new Array(n);
          for (let i = 0, o = 0; i < n; ++i, o += lineWidth) {
            lines[i] = str.substr(o, lineWidth);
          }
          str = lines.join(type === Scalar.Scalar.BLOCK_LITERAL ? "\n" : " ");
        }
        return stringifyString.stringifyString({ comment, type, value: str }, ctx, onComment, onChompKeep);
      }
    };
    exports.binary = binary;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/yaml-1.1/pairs.js
var require_pairs = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/yaml-1.1/pairs.js"(exports) {
    "use strict";
    init_esm_shims();
    var identity = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    var YAMLSeq = require_YAMLSeq();
    function resolvePairs(seq, onError) {
      if (identity.isSeq(seq)) {
        for (let i = 0; i < seq.items.length; ++i) {
          let item = seq.items[i];
          if (identity.isPair(item))
            continue;
          else if (identity.isMap(item)) {
            if (item.items.length > 1)
              onError("Each pair must have its own sequence indicator");
            const pair = item.items[0] || new Pair.Pair(new Scalar.Scalar(null));
            if (item.commentBefore)
              pair.key.commentBefore = pair.key.commentBefore ? `${item.commentBefore}
${pair.key.commentBefore}` : item.commentBefore;
            if (item.comment) {
              const cn = pair.value ?? pair.key;
              cn.comment = cn.comment ? `${item.comment}
${cn.comment}` : item.comment;
            }
            item = pair;
          }
          seq.items[i] = identity.isPair(item) ? item : new Pair.Pair(item);
        }
      } else
        onError("Expected a sequence for this tag");
      return seq;
    }
    function createPairs(schema, iterable, ctx) {
      const { replacer } = ctx;
      const pairs2 = new YAMLSeq.YAMLSeq(schema);
      pairs2.tag = "tag:yaml.org,2002:pairs";
      let i = 0;
      if (iterable && Symbol.iterator in Object(iterable))
        for (let it of iterable) {
          if (typeof replacer === "function")
            it = replacer.call(iterable, String(i++), it);
          let key, value;
          if (Array.isArray(it)) {
            if (it.length === 2) {
              key = it[0];
              value = it[1];
            } else
              throw new TypeError(`Expected [key, value] tuple: ${it}`);
          } else if (it && it instanceof Object) {
            const keys = Object.keys(it);
            if (keys.length === 1) {
              key = keys[0];
              value = it[key];
            } else {
              throw new TypeError(`Expected tuple with one key, not ${keys.length} keys`);
            }
          } else {
            key = it;
          }
          pairs2.items.push(Pair.createPair(key, value, ctx));
        }
      return pairs2;
    }
    var pairs = {
      collection: "seq",
      default: false,
      tag: "tag:yaml.org,2002:pairs",
      resolve: resolvePairs,
      createNode: createPairs
    };
    exports.createPairs = createPairs;
    exports.pairs = pairs;
    exports.resolvePairs = resolvePairs;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/yaml-1.1/omap.js
var require_omap = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/yaml-1.1/omap.js"(exports) {
    "use strict";
    init_esm_shims();
    var identity = require_identity();
    var toJS = require_toJS();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var pairs = require_pairs();
    var YAMLOMap = class _YAMLOMap extends YAMLSeq.YAMLSeq {
      constructor() {
        super();
        this.add = YAMLMap.YAMLMap.prototype.add.bind(this);
        this.delete = YAMLMap.YAMLMap.prototype.delete.bind(this);
        this.get = YAMLMap.YAMLMap.prototype.get.bind(this);
        this.has = YAMLMap.YAMLMap.prototype.has.bind(this);
        this.set = YAMLMap.YAMLMap.prototype.set.bind(this);
        this.tag = _YAMLOMap.tag;
      }
      /**
       * If `ctx` is given, the return type is actually `Map<unknown, unknown>`,
       * but TypeScript won't allow widening the signature of a child method.
       */
      toJSON(_, ctx) {
        if (!ctx)
          return super.toJSON(_);
        const map = /* @__PURE__ */ new Map();
        if (ctx?.onCreate)
          ctx.onCreate(map);
        for (const pair of this.items) {
          let key, value;
          if (identity.isPair(pair)) {
            key = toJS.toJS(pair.key, "", ctx);
            value = toJS.toJS(pair.value, key, ctx);
          } else {
            key = toJS.toJS(pair, "", ctx);
          }
          if (map.has(key))
            throw new Error("Ordered maps must not include duplicate keys");
          map.set(key, value);
        }
        return map;
      }
      static from(schema, iterable, ctx) {
        const pairs$1 = pairs.createPairs(schema, iterable, ctx);
        const omap2 = new this();
        omap2.items = pairs$1.items;
        return omap2;
      }
    };
    YAMLOMap.tag = "tag:yaml.org,2002:omap";
    var omap = {
      collection: "seq",
      identify: (value) => value instanceof Map,
      nodeClass: YAMLOMap,
      default: false,
      tag: "tag:yaml.org,2002:omap",
      resolve(seq, onError) {
        const pairs$1 = pairs.resolvePairs(seq, onError);
        const seenKeys = [];
        for (const { key } of pairs$1.items) {
          if (identity.isScalar(key)) {
            if (seenKeys.includes(key.value)) {
              onError(`Ordered maps must not include duplicate keys: ${key.value}`);
            } else {
              seenKeys.push(key.value);
            }
          }
        }
        return Object.assign(new YAMLOMap(), pairs$1);
      },
      createNode: (schema, iterable, ctx) => YAMLOMap.from(schema, iterable, ctx)
    };
    exports.YAMLOMap = YAMLOMap;
    exports.omap = omap;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/yaml-1.1/bool.js
var require_bool2 = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/yaml-1.1/bool.js"(exports) {
    "use strict";
    init_esm_shims();
    var Scalar = require_Scalar();
    function boolStringify({ value, source }, ctx) {
      const boolObj = value ? trueTag : falseTag;
      if (source && boolObj.test.test(source))
        return source;
      return value ? ctx.options.trueStr : ctx.options.falseStr;
    }
    var trueTag = {
      identify: (value) => value === true,
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
      resolve: () => new Scalar.Scalar(true),
      stringify: boolStringify
    };
    var falseTag = {
      identify: (value) => value === false,
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
      resolve: () => new Scalar.Scalar(false),
      stringify: boolStringify
    };
    exports.falseTag = falseTag;
    exports.trueTag = trueTag;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/yaml-1.1/float.js
var require_float2 = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/yaml-1.1/float.js"(exports) {
    "use strict";
    init_esm_shims();
    var Scalar = require_Scalar();
    var stringifyNumber = require_stringifyNumber();
    var floatNaN = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
      resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
      stringify: stringifyNumber.stringifyNumber
    };
    var floatExp = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "EXP",
      test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
      resolve: (str) => parseFloat(str.replace(/_/g, "")),
      stringify(node) {
        const num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber.stringifyNumber(node);
      }
    };
    var float = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
      resolve(str) {
        const node = new Scalar.Scalar(parseFloat(str.replace(/_/g, "")));
        const dot = str.indexOf(".");
        if (dot !== -1) {
          const f = str.substring(dot + 1).replace(/_/g, "");
          if (f[f.length - 1] === "0")
            node.minFractionDigits = f.length;
        }
        return node;
      },
      stringify: stringifyNumber.stringifyNumber
    };
    exports.float = float;
    exports.floatExp = floatExp;
    exports.floatNaN = floatNaN;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/yaml-1.1/int.js
var require_int2 = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/yaml-1.1/int.js"(exports) {
    "use strict";
    init_esm_shims();
    var stringifyNumber = require_stringifyNumber();
    var intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
    function intResolve(str, offset, radix, { intAsBigInt }) {
      const sign = str[0];
      if (sign === "-" || sign === "+")
        offset += 1;
      str = str.substring(offset).replace(/_/g, "");
      if (intAsBigInt) {
        switch (radix) {
          case 2:
            str = `0b${str}`;
            break;
          case 8:
            str = `0o${str}`;
            break;
          case 16:
            str = `0x${str}`;
            break;
        }
        const n2 = BigInt(str);
        return sign === "-" ? BigInt(-1) * n2 : n2;
      }
      const n = parseInt(str, radix);
      return sign === "-" ? -1 * n : n;
    }
    function intStringify(node, radix, prefix) {
      const { value } = node;
      if (intIdentify(value)) {
        const str = value.toString(radix);
        return value < 0 ? "-" + prefix + str.substr(1) : prefix + str;
      }
      return stringifyNumber.stringifyNumber(node);
    }
    var intBin = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "BIN",
      test: /^[-+]?0b[0-1_]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 2, opt),
      stringify: (node) => intStringify(node, 2, "0b")
    };
    var intOct = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "OCT",
      test: /^[-+]?0[0-7_]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 1, 8, opt),
      stringify: (node) => intStringify(node, 8, "0")
    };
    var int = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^[-+]?[0-9][0-9_]*$/,
      resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
      stringify: stringifyNumber.stringifyNumber
    };
    var intHex = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "HEX",
      test: /^[-+]?0x[0-9a-fA-F_]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
      stringify: (node) => intStringify(node, 16, "0x")
    };
    exports.int = int;
    exports.intBin = intBin;
    exports.intHex = intHex;
    exports.intOct = intOct;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/yaml-1.1/set.js
var require_set = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/yaml-1.1/set.js"(exports) {
    "use strict";
    init_esm_shims();
    var identity = require_identity();
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var YAMLSet = class _YAMLSet extends YAMLMap.YAMLMap {
      constructor(schema) {
        super(schema);
        this.tag = _YAMLSet.tag;
      }
      add(key) {
        let pair;
        if (identity.isPair(key))
          pair = key;
        else if (key && typeof key === "object" && "key" in key && "value" in key && key.value === null)
          pair = new Pair.Pair(key.key, null);
        else
          pair = new Pair.Pair(key, null);
        const prev = YAMLMap.findPair(this.items, pair.key);
        if (!prev)
          this.items.push(pair);
      }
      /**
       * If `keepPair` is `true`, returns the Pair matching `key`.
       * Otherwise, returns the value of that Pair's key.
       */
      get(key, keepPair) {
        const pair = YAMLMap.findPair(this.items, key);
        return !keepPair && identity.isPair(pair) ? identity.isScalar(pair.key) ? pair.key.value : pair.key : pair;
      }
      set(key, value) {
        if (typeof value !== "boolean")
          throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof value}`);
        const prev = YAMLMap.findPair(this.items, key);
        if (prev && !value) {
          this.items.splice(this.items.indexOf(prev), 1);
        } else if (!prev && value) {
          this.items.push(new Pair.Pair(key));
        }
      }
      toJSON(_, ctx) {
        return super.toJSON(_, ctx, Set);
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        if (this.hasAllNullValues(true))
          return super.toString(Object.assign({}, ctx, { allNullValues: true }), onComment, onChompKeep);
        else
          throw new Error("Set items must all have null values");
      }
      static from(schema, iterable, ctx) {
        const { replacer } = ctx;
        const set2 = new this(schema);
        if (iterable && Symbol.iterator in Object(iterable))
          for (let value of iterable) {
            if (typeof replacer === "function")
              value = replacer.call(iterable, value, value);
            set2.items.push(Pair.createPair(value, null, ctx));
          }
        return set2;
      }
    };
    YAMLSet.tag = "tag:yaml.org,2002:set";
    var set = {
      collection: "map",
      identify: (value) => value instanceof Set,
      nodeClass: YAMLSet,
      default: false,
      tag: "tag:yaml.org,2002:set",
      createNode: (schema, iterable, ctx) => YAMLSet.from(schema, iterable, ctx),
      resolve(map, onError) {
        if (identity.isMap(map)) {
          if (map.hasAllNullValues(true))
            return Object.assign(new YAMLSet(), map);
          else
            onError("Set items must all have null values");
        } else
          onError("Expected a mapping for this tag");
        return map;
      }
    };
    exports.YAMLSet = YAMLSet;
    exports.set = set;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/yaml-1.1/timestamp.js
var require_timestamp = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/yaml-1.1/timestamp.js"(exports) {
    "use strict";
    init_esm_shims();
    var stringifyNumber = require_stringifyNumber();
    function parseSexagesimal(str, asBigInt) {
      const sign = str[0];
      const parts = sign === "-" || sign === "+" ? str.substring(1) : str;
      const num = (n) => asBigInt ? BigInt(n) : Number(n);
      const res = parts.replace(/_/g, "").split(":").reduce((res2, p) => res2 * num(60) + num(p), num(0));
      return sign === "-" ? num(-1) * res : res;
    }
    function stringifySexagesimal(node) {
      let { value } = node;
      let num = (n) => n;
      if (typeof value === "bigint")
        num = (n) => BigInt(n);
      else if (isNaN(value) || !isFinite(value))
        return stringifyNumber.stringifyNumber(node);
      let sign = "";
      if (value < 0) {
        sign = "-";
        value *= num(-1);
      }
      const _60 = num(60);
      const parts = [value % _60];
      if (value < 60) {
        parts.unshift(0);
      } else {
        value = (value - parts[0]) / _60;
        parts.unshift(value % _60);
        if (value >= 60) {
          value = (value - parts[0]) / _60;
          parts.unshift(value);
        }
      }
      return sign + parts.map((n) => String(n).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
    }
    var intTime = {
      identify: (value) => typeof value === "bigint" || Number.isInteger(value),
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "TIME",
      test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
      resolve: (str, _onError, { intAsBigInt }) => parseSexagesimal(str, intAsBigInt),
      stringify: stringifySexagesimal
    };
    var floatTime = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "TIME",
      test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
      resolve: (str) => parseSexagesimal(str, false),
      stringify: stringifySexagesimal
    };
    var timestamp = {
      identify: (value) => value instanceof Date,
      default: true,
      tag: "tag:yaml.org,2002:timestamp",
      // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
      // may be omitted altogether, resulting in a date format. In such a case, the time part is
      // assumed to be 00:00:00Z (start of day, UTC).
      test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
      resolve(str) {
        const match = str.match(timestamp.test);
        if (!match)
          throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
        const [, year, month, day, hour, minute, second] = match.map(Number);
        const millisec = match[7] ? Number((match[7] + "00").substr(1, 3)) : 0;
        let date = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec);
        const tz = match[8];
        if (tz && tz !== "Z") {
          let d = parseSexagesimal(tz, false);
          if (Math.abs(d) < 30)
            d *= 60;
          date -= 6e4 * d;
        }
        return new Date(date);
      },
      stringify: ({ value }) => value?.toISOString().replace(/(T00:00:00)?\.000Z$/, "") ?? ""
    };
    exports.floatTime = floatTime;
    exports.intTime = intTime;
    exports.timestamp = timestamp;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/yaml-1.1/schema.js
var require_schema3 = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/yaml-1.1/schema.js"(exports) {
    "use strict";
    init_esm_shims();
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string();
    var binary = require_binary();
    var bool = require_bool2();
    var float = require_float2();
    var int = require_int2();
    var merge = require_merge();
    var omap = require_omap();
    var pairs = require_pairs();
    var set = require_set();
    var timestamp = require_timestamp();
    var schema = [
      map.map,
      seq.seq,
      string.string,
      _null.nullTag,
      bool.trueTag,
      bool.falseTag,
      int.intBin,
      int.intOct,
      int.int,
      int.intHex,
      float.floatNaN,
      float.floatExp,
      float.float,
      binary.binary,
      merge.merge,
      omap.omap,
      pairs.pairs,
      set.set,
      timestamp.intTime,
      timestamp.floatTime,
      timestamp.timestamp
    ];
    exports.schema = schema;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/tags.js
var require_tags = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/tags.js"(exports) {
    "use strict";
    init_esm_shims();
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string();
    var bool = require_bool();
    var float = require_float();
    var int = require_int();
    var schema = require_schema();
    var schema$1 = require_schema2();
    var binary = require_binary();
    var merge = require_merge();
    var omap = require_omap();
    var pairs = require_pairs();
    var schema$2 = require_schema3();
    var set = require_set();
    var timestamp = require_timestamp();
    var schemas = /* @__PURE__ */ new Map([
      ["core", schema.schema],
      ["failsafe", [map.map, seq.seq, string.string]],
      ["json", schema$1.schema],
      ["yaml11", schema$2.schema],
      ["yaml-1.1", schema$2.schema]
    ]);
    var tagsByName = {
      binary: binary.binary,
      bool: bool.boolTag,
      float: float.float,
      floatExp: float.floatExp,
      floatNaN: float.floatNaN,
      floatTime: timestamp.floatTime,
      int: int.int,
      intHex: int.intHex,
      intOct: int.intOct,
      intTime: timestamp.intTime,
      map: map.map,
      merge: merge.merge,
      null: _null.nullTag,
      omap: omap.omap,
      pairs: pairs.pairs,
      seq: seq.seq,
      set: set.set,
      timestamp: timestamp.timestamp
    };
    var coreKnownTags = {
      "tag:yaml.org,2002:binary": binary.binary,
      "tag:yaml.org,2002:merge": merge.merge,
      "tag:yaml.org,2002:omap": omap.omap,
      "tag:yaml.org,2002:pairs": pairs.pairs,
      "tag:yaml.org,2002:set": set.set,
      "tag:yaml.org,2002:timestamp": timestamp.timestamp
    };
    function getTags(customTags, schemaName, addMergeTag) {
      const schemaTags = schemas.get(schemaName);
      if (schemaTags && !customTags) {
        return addMergeTag && !schemaTags.includes(merge.merge) ? schemaTags.concat(merge.merge) : schemaTags.slice();
      }
      let tags = schemaTags;
      if (!tags) {
        if (Array.isArray(customTags))
          tags = [];
        else {
          const keys = Array.from(schemas.keys()).filter((key) => key !== "yaml11").map((key) => JSON.stringify(key)).join(", ");
          throw new Error(`Unknown schema "${schemaName}"; use one of ${keys} or define customTags array`);
        }
      }
      if (Array.isArray(customTags)) {
        for (const tag of customTags)
          tags = tags.concat(tag);
      } else if (typeof customTags === "function") {
        tags = customTags(tags.slice());
      }
      if (addMergeTag)
        tags = tags.concat(merge.merge);
      return tags.reduce((tags2, tag) => {
        const tagObj = typeof tag === "string" ? tagsByName[tag] : tag;
        if (!tagObj) {
          const tagName = JSON.stringify(tag);
          const keys = Object.keys(tagsByName).map((key) => JSON.stringify(key)).join(", ");
          throw new Error(`Unknown custom tag ${tagName}; use one of ${keys}`);
        }
        if (!tags2.includes(tagObj))
          tags2.push(tagObj);
        return tags2;
      }, []);
    }
    exports.coreKnownTags = coreKnownTags;
    exports.getTags = getTags;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/Schema.js
var require_Schema = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/schema/Schema.js"(exports) {
    "use strict";
    init_esm_shims();
    var identity = require_identity();
    var map = require_map();
    var seq = require_seq();
    var string = require_string();
    var tags = require_tags();
    var sortMapEntriesByKey = (a, b) => a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
    var Schema = class _Schema {
      constructor({ compat, customTags, merge, resolveKnownTags, schema, sortMapEntries, toStringDefaults }) {
        this.compat = Array.isArray(compat) ? tags.getTags(compat, "compat") : compat ? tags.getTags(null, compat) : null;
        this.name = typeof schema === "string" && schema || "core";
        this.knownTags = resolveKnownTags ? tags.coreKnownTags : {};
        this.tags = tags.getTags(customTags, this.name, merge);
        this.toStringOptions = toStringDefaults ?? null;
        Object.defineProperty(this, identity.MAP, { value: map.map });
        Object.defineProperty(this, identity.SCALAR, { value: string.string });
        Object.defineProperty(this, identity.SEQ, { value: seq.seq });
        this.sortMapEntries = typeof sortMapEntries === "function" ? sortMapEntries : sortMapEntries === true ? sortMapEntriesByKey : null;
      }
      clone() {
        const copy = Object.create(_Schema.prototype, Object.getOwnPropertyDescriptors(this));
        copy.tags = this.tags.slice();
        return copy;
      }
    };
    exports.Schema = Schema;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/stringify/stringifyDocument.js
var require_stringifyDocument = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/stringify/stringifyDocument.js"(exports) {
    "use strict";
    init_esm_shims();
    var identity = require_identity();
    var stringify = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyDocument(doc, options) {
      const lines = [];
      let hasDirectives = options.directives === true;
      if (options.directives !== false && doc.directives) {
        const dir = doc.directives.toString(doc);
        if (dir) {
          lines.push(dir);
          hasDirectives = true;
        } else if (doc.directives.docStart)
          hasDirectives = true;
      }
      if (hasDirectives)
        lines.push("---");
      const ctx = stringify.createStringifyContext(doc, options);
      const { commentString } = ctx.options;
      if (doc.commentBefore) {
        if (lines.length !== 1)
          lines.unshift("");
        const cs = commentString(doc.commentBefore);
        lines.unshift(stringifyComment.indentComment(cs, ""));
      }
      let chompKeep = false;
      let contentComment = null;
      if (doc.contents) {
        if (identity.isNode(doc.contents)) {
          if (doc.contents.spaceBefore && hasDirectives)
            lines.push("");
          if (doc.contents.commentBefore) {
            const cs = commentString(doc.contents.commentBefore);
            lines.push(stringifyComment.indentComment(cs, ""));
          }
          ctx.forceBlockIndent = !!doc.comment;
          contentComment = doc.contents.comment;
        }
        const onChompKeep = contentComment ? void 0 : () => chompKeep = true;
        let body = stringify.stringify(doc.contents, ctx, () => contentComment = null, onChompKeep);
        if (contentComment)
          body += stringifyComment.lineComment(body, "", commentString(contentComment));
        if ((body[0] === "|" || body[0] === ">") && lines[lines.length - 1] === "---") {
          lines[lines.length - 1] = `--- ${body}`;
        } else
          lines.push(body);
      } else {
        lines.push(stringify.stringify(doc.contents, ctx));
      }
      if (doc.directives?.docEnd) {
        if (doc.comment) {
          const cs = commentString(doc.comment);
          if (cs.includes("\n")) {
            lines.push("...");
            lines.push(stringifyComment.indentComment(cs, ""));
          } else {
            lines.push(`... ${cs}`);
          }
        } else {
          lines.push("...");
        }
      } else {
        let dc = doc.comment;
        if (dc && chompKeep)
          dc = dc.replace(/^\n+/, "");
        if (dc) {
          if ((!chompKeep || contentComment) && lines[lines.length - 1] !== "")
            lines.push("");
          lines.push(stringifyComment.indentComment(commentString(dc), ""));
        }
      }
      return lines.join("\n") + "\n";
    }
    exports.stringifyDocument = stringifyDocument;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/doc/Document.js
var require_Document = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/doc/Document.js"(exports) {
    "use strict";
    init_esm_shims();
    var Alias = require_Alias();
    var Collection = require_Collection();
    var identity = require_identity();
    var Pair = require_Pair();
    var toJS = require_toJS();
    var Schema = require_Schema();
    var stringifyDocument = require_stringifyDocument();
    var anchors = require_anchors();
    var applyReviver = require_applyReviver();
    var createNode = require_createNode();
    var directives = require_directives();
    var Document = class _Document {
      constructor(value, replacer, options) {
        this.commentBefore = null;
        this.comment = null;
        this.errors = [];
        this.warnings = [];
        Object.defineProperty(this, identity.NODE_TYPE, { value: identity.DOC });
        let _replacer = null;
        if (typeof replacer === "function" || Array.isArray(replacer)) {
          _replacer = replacer;
        } else if (options === void 0 && replacer) {
          options = replacer;
          replacer = void 0;
        }
        const opt = Object.assign({
          intAsBigInt: false,
          keepSourceTokens: false,
          logLevel: "warn",
          prettyErrors: true,
          strict: true,
          stringKeys: false,
          uniqueKeys: true,
          version: "1.2"
        }, options);
        this.options = opt;
        let { version } = opt;
        if (options?._directives) {
          this.directives = options._directives.atDocument();
          if (this.directives.yaml.explicit)
            version = this.directives.yaml.version;
        } else
          this.directives = new directives.Directives({ version });
        this.setSchema(version, options);
        this.contents = value === void 0 ? null : this.createNode(value, _replacer, options);
      }
      /**
       * Create a deep copy of this Document and its contents.
       *
       * Custom Node values that inherit from `Object` still refer to their original instances.
       */
      clone() {
        const copy = Object.create(_Document.prototype, {
          [identity.NODE_TYPE]: { value: identity.DOC }
        });
        copy.commentBefore = this.commentBefore;
        copy.comment = this.comment;
        copy.errors = this.errors.slice();
        copy.warnings = this.warnings.slice();
        copy.options = Object.assign({}, this.options);
        if (this.directives)
          copy.directives = this.directives.clone();
        copy.schema = this.schema.clone();
        copy.contents = identity.isNode(this.contents) ? this.contents.clone(copy.schema) : this.contents;
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      /** Adds a value to the document. */
      add(value) {
        if (assertCollection(this.contents))
          this.contents.add(value);
      }
      /** Adds a value to the document. */
      addIn(path, value) {
        if (assertCollection(this.contents))
          this.contents.addIn(path, value);
      }
      /**
       * Create a new `Alias` node, ensuring that the target `node` has the required anchor.
       *
       * If `node` already has an anchor, `name` is ignored.
       * Otherwise, the `node.anchor` value will be set to `name`,
       * or if an anchor with that name is already present in the document,
       * `name` will be used as a prefix for a new unique anchor.
       * If `name` is undefined, the generated anchor will use 'a' as a prefix.
       */
      createAlias(node, name) {
        if (!node.anchor) {
          const prev = anchors.anchorNames(this);
          node.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          !name || prev.has(name) ? anchors.findNewAnchor(name || "a", prev) : name;
        }
        return new Alias.Alias(node.anchor);
      }
      createNode(value, replacer, options) {
        let _replacer = void 0;
        if (typeof replacer === "function") {
          value = replacer.call({ "": value }, "", value);
          _replacer = replacer;
        } else if (Array.isArray(replacer)) {
          const keyToStr = (v) => typeof v === "number" || v instanceof String || v instanceof Number;
          const asStr2 = replacer.filter(keyToStr).map(String);
          if (asStr2.length > 0)
            replacer = replacer.concat(asStr2);
          _replacer = replacer;
        } else if (options === void 0 && replacer) {
          options = replacer;
          replacer = void 0;
        }
        const { aliasDuplicateObjects, anchorPrefix, flow: flow2, keepUndefined, onTagObj, tag } = options ?? {};
        const { onAnchor, setAnchors, sourceObjects } = anchors.createNodeAnchors(
          this,
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          anchorPrefix || "a"
        );
        const ctx = {
          aliasDuplicateObjects: aliasDuplicateObjects ?? true,
          keepUndefined: keepUndefined ?? false,
          onAnchor,
          onTagObj,
          replacer: _replacer,
          schema: this.schema,
          sourceObjects
        };
        const node = createNode.createNode(value, tag, ctx);
        if (flow2 && identity.isCollection(node))
          node.flow = true;
        setAnchors();
        return node;
      }
      /**
       * Convert a key and a value into a `Pair` using the current schema,
       * recursively wrapping all values as `Scalar` or `Collection` nodes.
       */
      createPair(key, value, options = {}) {
        const k = this.createNode(key, null, options);
        const v = this.createNode(value, null, options);
        return new Pair.Pair(k, v);
      }
      /**
       * Removes a value from the document.
       * @returns `true` if the item was found and removed.
       */
      delete(key) {
        return assertCollection(this.contents) ? this.contents.delete(key) : false;
      }
      /**
       * Removes a value from the document.
       * @returns `true` if the item was found and removed.
       */
      deleteIn(path) {
        if (Collection.isEmptyPath(path)) {
          if (this.contents == null)
            return false;
          this.contents = null;
          return true;
        }
        return assertCollection(this.contents) ? this.contents.deleteIn(path) : false;
      }
      /**
       * Returns item at `key`, or `undefined` if not found. By default unwraps
       * scalar values from their surrounding node; to disable set `keepScalar` to
       * `true` (collections are always returned intact).
       */
      get(key, keepScalar) {
        return identity.isCollection(this.contents) ? this.contents.get(key, keepScalar) : void 0;
      }
      /**
       * Returns item at `path`, or `undefined` if not found. By default unwraps
       * scalar values from their surrounding node; to disable set `keepScalar` to
       * `true` (collections are always returned intact).
       */
      getIn(path, keepScalar) {
        if (Collection.isEmptyPath(path))
          return !keepScalar && identity.isScalar(this.contents) ? this.contents.value : this.contents;
        return identity.isCollection(this.contents) ? this.contents.getIn(path, keepScalar) : void 0;
      }
      /**
       * Checks if the document includes a value with the key `key`.
       */
      has(key) {
        return identity.isCollection(this.contents) ? this.contents.has(key) : false;
      }
      /**
       * Checks if the document includes a value at `path`.
       */
      hasIn(path) {
        if (Collection.isEmptyPath(path))
          return this.contents !== void 0;
        return identity.isCollection(this.contents) ? this.contents.hasIn(path) : false;
      }
      /**
       * Sets a value in this document. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       */
      set(key, value) {
        if (this.contents == null) {
          this.contents = Collection.collectionFromPath(this.schema, [key], value);
        } else if (assertCollection(this.contents)) {
          this.contents.set(key, value);
        }
      }
      /**
       * Sets a value in this document. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       */
      setIn(path, value) {
        if (Collection.isEmptyPath(path)) {
          this.contents = value;
        } else if (this.contents == null) {
          this.contents = Collection.collectionFromPath(this.schema, Array.from(path), value);
        } else if (assertCollection(this.contents)) {
          this.contents.setIn(path, value);
        }
      }
      /**
       * Change the YAML version and schema used by the document.
       * A `null` version disables support for directives, explicit tags, anchors, and aliases.
       * It also requires the `schema` option to be given as a `Schema` instance value.
       *
       * Overrides all previously set schema options.
       */
      setSchema(version, options = {}) {
        if (typeof version === "number")
          version = String(version);
        let opt;
        switch (version) {
          case "1.1":
            if (this.directives)
              this.directives.yaml.version = "1.1";
            else
              this.directives = new directives.Directives({ version: "1.1" });
            opt = { resolveKnownTags: false, schema: "yaml-1.1" };
            break;
          case "1.2":
          case "next":
            if (this.directives)
              this.directives.yaml.version = version;
            else
              this.directives = new directives.Directives({ version });
            opt = { resolveKnownTags: true, schema: "core" };
            break;
          case null:
            if (this.directives)
              delete this.directives;
            opt = null;
            break;
          default: {
            const sv = JSON.stringify(version);
            throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${sv}`);
          }
        }
        if (options.schema instanceof Object)
          this.schema = options.schema;
        else if (opt)
          this.schema = new Schema.Schema(Object.assign(opt, options));
        else
          throw new Error(`With a null YAML version, the { schema: Schema } option is required`);
      }
      // json & jsonArg are only used from toJSON()
      toJS({ json, jsonArg, mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
        const ctx = {
          anchors: /* @__PURE__ */ new Map(),
          doc: this,
          keep: !json,
          mapAsMap: mapAsMap === true,
          mapKeyWarned: false,
          maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
        };
        const res = toJS.toJS(this.contents, jsonArg ?? "", ctx);
        if (typeof onAnchor === "function")
          for (const { count, res: res2 } of ctx.anchors.values())
            onAnchor(res2, count);
        return typeof reviver === "function" ? applyReviver.applyReviver(reviver, { "": res }, "", res) : res;
      }
      /**
       * A JSON representation of the document `contents`.
       *
       * @param jsonArg Used by `JSON.stringify` to indicate the array index or
       *   property name.
       */
      toJSON(jsonArg, onAnchor) {
        return this.toJS({ json: true, jsonArg, mapAsMap: false, onAnchor });
      }
      /** A YAML representation of the document. */
      toString(options = {}) {
        if (this.errors.length > 0)
          throw new Error("Document with errors cannot be stringified");
        if ("indent" in options && (!Number.isInteger(options.indent) || Number(options.indent) <= 0)) {
          const s = JSON.stringify(options.indent);
          throw new Error(`"indent" option must be a positive integer, not ${s}`);
        }
        return stringifyDocument.stringifyDocument(this, options);
      }
    };
    function assertCollection(contents) {
      if (identity.isCollection(contents))
        return true;
      throw new Error("Expected a YAML collection as document contents");
    }
    exports.Document = Document;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/errors.js
var require_errors2 = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/errors.js"(exports) {
    "use strict";
    init_esm_shims();
    var YAMLError = class extends Error {
      constructor(name, pos, code, message) {
        super();
        this.name = name;
        this.code = code;
        this.message = message;
        this.pos = pos;
      }
    };
    var YAMLParseError = class extends YAMLError {
      constructor(pos, code, message) {
        super("YAMLParseError", pos, code, message);
      }
    };
    var YAMLWarning = class extends YAMLError {
      constructor(pos, code, message) {
        super("YAMLWarning", pos, code, message);
      }
    };
    var prettifyError = (src, lc) => (error) => {
      if (error.pos[0] === -1)
        return;
      error.linePos = error.pos.map((pos) => lc.linePos(pos));
      const { line, col } = error.linePos[0];
      error.message += ` at line ${line}, column ${col}`;
      let ci = col - 1;
      let lineStr = src.substring(lc.lineStarts[line - 1], lc.lineStarts[line]).replace(/[\n\r]+$/, "");
      if (ci >= 60 && lineStr.length > 80) {
        const trimStart = Math.min(ci - 39, lineStr.length - 79);
        lineStr = "\u2026" + lineStr.substring(trimStart);
        ci -= trimStart - 1;
      }
      if (lineStr.length > 80)
        lineStr = lineStr.substring(0, 79) + "\u2026";
      if (line > 1 && /^ *$/.test(lineStr.substring(0, ci))) {
        let prev = src.substring(lc.lineStarts[line - 2], lc.lineStarts[line - 1]);
        if (prev.length > 80)
          prev = prev.substring(0, 79) + "\u2026\n";
        lineStr = prev + lineStr;
      }
      if (/[^ ]/.test(lineStr)) {
        let count = 1;
        const end = error.linePos[1];
        if (end?.line === line && end.col > col) {
          count = Math.max(1, Math.min(end.col - col, 80 - ci));
        }
        const pointer = " ".repeat(ci) + "^".repeat(count);
        error.message += `:

${lineStr}
${pointer}
`;
      }
    };
    exports.YAMLError = YAMLError;
    exports.YAMLParseError = YAMLParseError;
    exports.YAMLWarning = YAMLWarning;
    exports.prettifyError = prettifyError;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/resolve-props.js
var require_resolve_props = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/resolve-props.js"(exports) {
    "use strict";
    init_esm_shims();
    function resolveProps(tokens, { flow: flow2, indicator, next, offset, onError, parentIndent, startOnNewline }) {
      let spaceBefore = false;
      let atNewline = startOnNewline;
      let hasSpace = startOnNewline;
      let comment = "";
      let commentSep = "";
      let hasNewline = false;
      let reqSpace = false;
      let tab = null;
      let anchor = null;
      let tag = null;
      let newlineAfterProp = null;
      let comma = null;
      let found = null;
      let start = null;
      for (const token of tokens) {
        if (reqSpace) {
          if (token.type !== "space" && token.type !== "newline" && token.type !== "comma")
            onError(token.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
          reqSpace = false;
        }
        if (tab) {
          if (atNewline && token.type !== "comment" && token.type !== "newline") {
            onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
          }
          tab = null;
        }
        switch (token.type) {
          case "space":
            if (!flow2 && (indicator !== "doc-start" || next?.type !== "flow-collection") && token.source.includes("	")) {
              tab = token;
            }
            hasSpace = true;
            break;
          case "comment": {
            if (!hasSpace)
              onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
            const cb = token.source.substring(1) || " ";
            if (!comment)
              comment = cb;
            else
              comment += commentSep + cb;
            commentSep = "";
            atNewline = false;
            break;
          }
          case "newline":
            if (atNewline) {
              if (comment)
                comment += token.source;
              else if (!found || indicator !== "seq-item-ind")
                spaceBefore = true;
            } else
              commentSep += token.source;
            atNewline = true;
            hasNewline = true;
            if (anchor || tag)
              newlineAfterProp = token;
            hasSpace = true;
            break;
          case "anchor":
            if (anchor)
              onError(token, "MULTIPLE_ANCHORS", "A node can have at most one anchor");
            if (token.source.endsWith(":"))
              onError(token.offset + token.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", true);
            anchor = token;
            start ?? (start = token.offset);
            atNewline = false;
            hasSpace = false;
            reqSpace = true;
            break;
          case "tag": {
            if (tag)
              onError(token, "MULTIPLE_TAGS", "A node can have at most one tag");
            tag = token;
            start ?? (start = token.offset);
            atNewline = false;
            hasSpace = false;
            reqSpace = true;
            break;
          }
          case indicator:
            if (anchor || tag)
              onError(token, "BAD_PROP_ORDER", `Anchors and tags must be after the ${token.source} indicator`);
            if (found)
              onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.source} in ${flow2 ?? "collection"}`);
            found = token;
            atNewline = indicator === "seq-item-ind" || indicator === "explicit-key-ind";
            hasSpace = false;
            break;
          case "comma":
            if (flow2) {
              if (comma)
                onError(token, "UNEXPECTED_TOKEN", `Unexpected , in ${flow2}`);
              comma = token;
              atNewline = false;
              hasSpace = false;
              break;
            }
          // else fallthrough
          default:
            onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.type} token`);
            atNewline = false;
            hasSpace = false;
        }
      }
      const last = tokens[tokens.length - 1];
      const end = last ? last.offset + last.source.length : offset;
      if (reqSpace && next && next.type !== "space" && next.type !== "newline" && next.type !== "comma" && (next.type !== "scalar" || next.source !== "")) {
        onError(next.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
      }
      if (tab && (atNewline && tab.indent <= parentIndent || next?.type === "block-map" || next?.type === "block-seq"))
        onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
      return {
        comma,
        found,
        spaceBefore,
        comment,
        hasNewline,
        anchor,
        tag,
        newlineAfterProp,
        end,
        start: start ?? end
      };
    }
    exports.resolveProps = resolveProps;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/util-contains-newline.js
var require_util_contains_newline = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/util-contains-newline.js"(exports) {
    "use strict";
    init_esm_shims();
    function containsNewline(key) {
      if (!key)
        return null;
      switch (key.type) {
        case "alias":
        case "scalar":
        case "double-quoted-scalar":
        case "single-quoted-scalar":
          if (key.source.includes("\n"))
            return true;
          if (key.end) {
            for (const st of key.end)
              if (st.type === "newline")
                return true;
          }
          return false;
        case "flow-collection":
          for (const it of key.items) {
            for (const st of it.start)
              if (st.type === "newline")
                return true;
            if (it.sep) {
              for (const st of it.sep)
                if (st.type === "newline")
                  return true;
            }
            if (containsNewline(it.key) || containsNewline(it.value))
              return true;
          }
          return false;
        default:
          return true;
      }
    }
    exports.containsNewline = containsNewline;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/util-flow-indent-check.js
var require_util_flow_indent_check = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/util-flow-indent-check.js"(exports) {
    "use strict";
    init_esm_shims();
    var utilContainsNewline = require_util_contains_newline();
    function flowIndentCheck(indent, fc, onError) {
      if (fc?.type === "flow-collection") {
        const end = fc.end[0];
        if (end.indent === indent && (end.source === "]" || end.source === "}") && utilContainsNewline.containsNewline(fc)) {
          const msg = "Flow end indicator should be more indented than parent";
          onError(end, "BAD_INDENT", msg, true);
        }
      }
    }
    exports.flowIndentCheck = flowIndentCheck;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/util-map-includes.js
var require_util_map_includes = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/util-map-includes.js"(exports) {
    "use strict";
    init_esm_shims();
    var identity = require_identity();
    function mapIncludes(ctx, items, search) {
      const { uniqueKeys } = ctx.options;
      if (uniqueKeys === false)
        return false;
      const isEqual = typeof uniqueKeys === "function" ? uniqueKeys : (a, b) => a === b || identity.isScalar(a) && identity.isScalar(b) && a.value === b.value;
      return items.some((pair) => isEqual(pair.key, search));
    }
    exports.mapIncludes = mapIncludes;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/resolve-block-map.js
var require_resolve_block_map = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/resolve-block-map.js"(exports) {
    "use strict";
    init_esm_shims();
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var resolveProps = require_resolve_props();
    var utilContainsNewline = require_util_contains_newline();
    var utilFlowIndentCheck = require_util_flow_indent_check();
    var utilMapIncludes = require_util_map_includes();
    var startColMsg = "All mapping items must start at the same column";
    function resolveBlockMap({ composeNode, composeEmptyNode }, ctx, bm, onError, tag) {
      const NodeClass = tag?.nodeClass ?? YAMLMap.YAMLMap;
      const map = new NodeClass(ctx.schema);
      if (ctx.atRoot)
        ctx.atRoot = false;
      let offset = bm.offset;
      let commentEnd = null;
      for (const collItem of bm.items) {
        const { start, key, sep, value } = collItem;
        const keyProps = resolveProps.resolveProps(start, {
          indicator: "explicit-key-ind",
          next: key ?? sep?.[0],
          offset,
          onError,
          parentIndent: bm.indent,
          startOnNewline: true
        });
        const implicitKey = !keyProps.found;
        if (implicitKey) {
          if (key) {
            if (key.type === "block-seq")
              onError(offset, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key");
            else if ("indent" in key && key.indent !== bm.indent)
              onError(offset, "BAD_INDENT", startColMsg);
          }
          if (!keyProps.anchor && !keyProps.tag && !sep) {
            commentEnd = keyProps.end;
            if (keyProps.comment) {
              if (map.comment)
                map.comment += "\n" + keyProps.comment;
              else
                map.comment = keyProps.comment;
            }
            continue;
          }
          if (keyProps.newlineAfterProp || utilContainsNewline.containsNewline(key)) {
            onError(key ?? start[start.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
          }
        } else if (keyProps.found?.indent !== bm.indent) {
          onError(offset, "BAD_INDENT", startColMsg);
        }
        ctx.atKey = true;
        const keyStart = keyProps.end;
        const keyNode = key ? composeNode(ctx, key, keyProps, onError) : composeEmptyNode(ctx, keyStart, start, null, keyProps, onError);
        if (ctx.schema.compat)
          utilFlowIndentCheck.flowIndentCheck(bm.indent, key, onError);
        ctx.atKey = false;
        if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode))
          onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
        const valueProps = resolveProps.resolveProps(sep ?? [], {
          indicator: "map-value-ind",
          next: value,
          offset: keyNode.range[2],
          onError,
          parentIndent: bm.indent,
          startOnNewline: !key || key.type === "block-scalar"
        });
        offset = valueProps.end;
        if (valueProps.found) {
          if (implicitKey) {
            if (value?.type === "block-map" && !valueProps.hasNewline)
              onError(offset, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings");
            if (ctx.options.strict && keyProps.start < valueProps.found.offset - 1024)
              onError(keyNode.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key");
          }
          const valueNode = value ? composeNode(ctx, value, valueProps, onError) : composeEmptyNode(ctx, offset, sep, null, valueProps, onError);
          if (ctx.schema.compat)
            utilFlowIndentCheck.flowIndentCheck(bm.indent, value, onError);
          offset = valueNode.range[2];
          const pair = new Pair.Pair(keyNode, valueNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          map.items.push(pair);
        } else {
          if (implicitKey)
            onError(keyNode.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values");
          if (valueProps.comment) {
            if (keyNode.comment)
              keyNode.comment += "\n" + valueProps.comment;
            else
              keyNode.comment = valueProps.comment;
          }
          const pair = new Pair.Pair(keyNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          map.items.push(pair);
        }
      }
      if (commentEnd && commentEnd < offset)
        onError(commentEnd, "IMPOSSIBLE", "Map comment with trailing content");
      map.range = [bm.offset, offset, commentEnd ?? offset];
      return map;
    }
    exports.resolveBlockMap = resolveBlockMap;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/resolve-block-seq.js
var require_resolve_block_seq = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/resolve-block-seq.js"(exports) {
    "use strict";
    init_esm_shims();
    var YAMLSeq = require_YAMLSeq();
    var resolveProps = require_resolve_props();
    var utilFlowIndentCheck = require_util_flow_indent_check();
    function resolveBlockSeq({ composeNode, composeEmptyNode }, ctx, bs, onError, tag) {
      const NodeClass = tag?.nodeClass ?? YAMLSeq.YAMLSeq;
      const seq = new NodeClass(ctx.schema);
      if (ctx.atRoot)
        ctx.atRoot = false;
      if (ctx.atKey)
        ctx.atKey = false;
      let offset = bs.offset;
      let commentEnd = null;
      for (const { start, value } of bs.items) {
        const props = resolveProps.resolveProps(start, {
          indicator: "seq-item-ind",
          next: value,
          offset,
          onError,
          parentIndent: bs.indent,
          startOnNewline: true
        });
        if (!props.found) {
          if (props.anchor || props.tag || value) {
            if (value?.type === "block-seq")
              onError(props.end, "BAD_INDENT", "All sequence items must start at the same column");
            else
              onError(offset, "MISSING_CHAR", "Sequence item without - indicator");
          } else {
            commentEnd = props.end;
            if (props.comment)
              seq.comment = props.comment;
            continue;
          }
        }
        const node = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, start, null, props, onError);
        if (ctx.schema.compat)
          utilFlowIndentCheck.flowIndentCheck(bs.indent, value, onError);
        offset = node.range[2];
        seq.items.push(node);
      }
      seq.range = [bs.offset, offset, commentEnd ?? offset];
      return seq;
    }
    exports.resolveBlockSeq = resolveBlockSeq;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/resolve-end.js
var require_resolve_end = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/resolve-end.js"(exports) {
    "use strict";
    init_esm_shims();
    function resolveEnd(end, offset, reqSpace, onError) {
      let comment = "";
      if (end) {
        let hasSpace = false;
        let sep = "";
        for (const token of end) {
          const { source, type } = token;
          switch (type) {
            case "space":
              hasSpace = true;
              break;
            case "comment": {
              if (reqSpace && !hasSpace)
                onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
              const cb = source.substring(1) || " ";
              if (!comment)
                comment = cb;
              else
                comment += sep + cb;
              sep = "";
              break;
            }
            case "newline":
              if (comment)
                sep += source;
              hasSpace = true;
              break;
            default:
              onError(token, "UNEXPECTED_TOKEN", `Unexpected ${type} at node end`);
          }
          offset += source.length;
        }
      }
      return { comment, offset };
    }
    exports.resolveEnd = resolveEnd;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/resolve-flow-collection.js
var require_resolve_flow_collection = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/resolve-flow-collection.js"(exports) {
    "use strict";
    init_esm_shims();
    var identity = require_identity();
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var resolveEnd = require_resolve_end();
    var resolveProps = require_resolve_props();
    var utilContainsNewline = require_util_contains_newline();
    var utilMapIncludes = require_util_map_includes();
    var blockMsg = "Block collections are not allowed within flow collections";
    var isBlock = (token) => token && (token.type === "block-map" || token.type === "block-seq");
    function resolveFlowCollection({ composeNode, composeEmptyNode }, ctx, fc, onError, tag) {
      const isMap2 = fc.start.source === "{";
      const fcName = isMap2 ? "flow map" : "flow sequence";
      const NodeClass = tag?.nodeClass ?? (isMap2 ? YAMLMap.YAMLMap : YAMLSeq.YAMLSeq);
      const coll = new NodeClass(ctx.schema);
      coll.flow = true;
      const atRoot = ctx.atRoot;
      if (atRoot)
        ctx.atRoot = false;
      if (ctx.atKey)
        ctx.atKey = false;
      let offset = fc.offset + fc.start.source.length;
      for (let i = 0; i < fc.items.length; ++i) {
        const collItem = fc.items[i];
        const { start, key, sep, value } = collItem;
        const props = resolveProps.resolveProps(start, {
          flow: fcName,
          indicator: "explicit-key-ind",
          next: key ?? sep?.[0],
          offset,
          onError,
          parentIndent: fc.indent,
          startOnNewline: false
        });
        if (!props.found) {
          if (!props.anchor && !props.tag && !sep && !value) {
            if (i === 0 && props.comma)
              onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
            else if (i < fc.items.length - 1)
              onError(props.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${fcName}`);
            if (props.comment) {
              if (coll.comment)
                coll.comment += "\n" + props.comment;
              else
                coll.comment = props.comment;
            }
            offset = props.end;
            continue;
          }
          if (!isMap2 && ctx.options.strict && utilContainsNewline.containsNewline(key))
            onError(
              key,
              // checked by containsNewline()
              "MULTILINE_IMPLICIT_KEY",
              "Implicit keys of flow sequence pairs need to be on a single line"
            );
        }
        if (i === 0) {
          if (props.comma)
            onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
        } else {
          if (!props.comma)
            onError(props.start, "MISSING_CHAR", `Missing , between ${fcName} items`);
          if (props.comment) {
            let prevItemComment = "";
            loop: for (const st of start) {
              switch (st.type) {
                case "comma":
                case "space":
                  break;
                case "comment":
                  prevItemComment = st.source.substring(1);
                  break loop;
                default:
                  break loop;
              }
            }
            if (prevItemComment) {
              let prev = coll.items[coll.items.length - 1];
              if (identity.isPair(prev))
                prev = prev.value ?? prev.key;
              if (prev.comment)
                prev.comment += "\n" + prevItemComment;
              else
                prev.comment = prevItemComment;
              props.comment = props.comment.substring(prevItemComment.length + 1);
            }
          }
        }
        if (!isMap2 && !sep && !props.found) {
          const valueNode = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, sep, null, props, onError);
          coll.items.push(valueNode);
          offset = valueNode.range[2];
          if (isBlock(value))
            onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
        } else {
          ctx.atKey = true;
          const keyStart = props.end;
          const keyNode = key ? composeNode(ctx, key, props, onError) : composeEmptyNode(ctx, keyStart, start, null, props, onError);
          if (isBlock(key))
            onError(keyNode.range, "BLOCK_IN_FLOW", blockMsg);
          ctx.atKey = false;
          const valueProps = resolveProps.resolveProps(sep ?? [], {
            flow: fcName,
            indicator: "map-value-ind",
            next: value,
            offset: keyNode.range[2],
            onError,
            parentIndent: fc.indent,
            startOnNewline: false
          });
          if (valueProps.found) {
            if (!isMap2 && !props.found && ctx.options.strict) {
              if (sep)
                for (const st of sep) {
                  if (st === valueProps.found)
                    break;
                  if (st.type === "newline") {
                    onError(st, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                    break;
                  }
                }
              if (props.start < valueProps.found.offset - 1024)
                onError(valueProps.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
            }
          } else if (value) {
            if ("source" in value && value.source?.[0] === ":")
              onError(value, "MISSING_CHAR", `Missing space after : in ${fcName}`);
            else
              onError(valueProps.start, "MISSING_CHAR", `Missing , or : between ${fcName} items`);
          }
          const valueNode = value ? composeNode(ctx, value, valueProps, onError) : valueProps.found ? composeEmptyNode(ctx, valueProps.end, sep, null, valueProps, onError) : null;
          if (valueNode) {
            if (isBlock(value))
              onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
          } else if (valueProps.comment) {
            if (keyNode.comment)
              keyNode.comment += "\n" + valueProps.comment;
            else
              keyNode.comment = valueProps.comment;
          }
          const pair = new Pair.Pair(keyNode, valueNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          if (isMap2) {
            const map = coll;
            if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode))
              onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
            map.items.push(pair);
          } else {
            const map = new YAMLMap.YAMLMap(ctx.schema);
            map.flow = true;
            map.items.push(pair);
            const endRange = (valueNode ?? keyNode).range;
            map.range = [keyNode.range[0], endRange[1], endRange[2]];
            coll.items.push(map);
          }
          offset = valueNode ? valueNode.range[2] : valueProps.end;
        }
      }
      const expectedEnd = isMap2 ? "}" : "]";
      const [ce, ...ee] = fc.end;
      let cePos = offset;
      if (ce?.source === expectedEnd)
        cePos = ce.offset + ce.source.length;
      else {
        const name = fcName[0].toUpperCase() + fcName.substring(1);
        const msg = atRoot ? `${name} must end with a ${expectedEnd}` : `${name} in block collection must be sufficiently indented and end with a ${expectedEnd}`;
        onError(offset, atRoot ? "MISSING_CHAR" : "BAD_INDENT", msg);
        if (ce && ce.source.length !== 1)
          ee.unshift(ce);
      }
      if (ee.length > 0) {
        const end = resolveEnd.resolveEnd(ee, cePos, ctx.options.strict, onError);
        if (end.comment) {
          if (coll.comment)
            coll.comment += "\n" + end.comment;
          else
            coll.comment = end.comment;
        }
        coll.range = [fc.offset, cePos, end.offset];
      } else {
        coll.range = [fc.offset, cePos, cePos];
      }
      return coll;
    }
    exports.resolveFlowCollection = resolveFlowCollection;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/compose-collection.js
var require_compose_collection = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/compose-collection.js"(exports) {
    "use strict";
    init_esm_shims();
    var identity = require_identity();
    var Scalar = require_Scalar();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var resolveBlockMap = require_resolve_block_map();
    var resolveBlockSeq = require_resolve_block_seq();
    var resolveFlowCollection = require_resolve_flow_collection();
    function resolveCollection(CN, ctx, token, onError, tagName, tag) {
      const coll = token.type === "block-map" ? resolveBlockMap.resolveBlockMap(CN, ctx, token, onError, tag) : token.type === "block-seq" ? resolveBlockSeq.resolveBlockSeq(CN, ctx, token, onError, tag) : resolveFlowCollection.resolveFlowCollection(CN, ctx, token, onError, tag);
      const Coll = coll.constructor;
      if (tagName === "!" || tagName === Coll.tagName) {
        coll.tag = Coll.tagName;
        return coll;
      }
      if (tagName)
        coll.tag = tagName;
      return coll;
    }
    function composeCollection(CN, ctx, token, props, onError) {
      const tagToken = props.tag;
      const tagName = !tagToken ? null : ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg));
      if (token.type === "block-seq") {
        const { anchor, newlineAfterProp: nl } = props;
        const lastProp = anchor && tagToken ? anchor.offset > tagToken.offset ? anchor : tagToken : anchor ?? tagToken;
        if (lastProp && (!nl || nl.offset < lastProp.offset)) {
          const message = "Missing newline after block sequence props";
          onError(lastProp, "MISSING_CHAR", message);
        }
      }
      const expType = token.type === "block-map" ? "map" : token.type === "block-seq" ? "seq" : token.start.source === "{" ? "map" : "seq";
      if (!tagToken || !tagName || tagName === "!" || tagName === YAMLMap.YAMLMap.tagName && expType === "map" || tagName === YAMLSeq.YAMLSeq.tagName && expType === "seq") {
        return resolveCollection(CN, ctx, token, onError, tagName);
      }
      let tag = ctx.schema.tags.find((t) => t.tag === tagName && t.collection === expType);
      if (!tag) {
        const kt = ctx.schema.knownTags[tagName];
        if (kt?.collection === expType) {
          ctx.schema.tags.push(Object.assign({}, kt, { default: false }));
          tag = kt;
        } else {
          if (kt) {
            onError(tagToken, "BAD_COLLECTION_TYPE", `${kt.tag} used for ${expType} collection, but expects ${kt.collection ?? "scalar"}`, true);
          } else {
            onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, true);
          }
          return resolveCollection(CN, ctx, token, onError, tagName);
        }
      }
      const coll = resolveCollection(CN, ctx, token, onError, tagName, tag);
      const res = tag.resolve?.(coll, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg), ctx.options) ?? coll;
      const node = identity.isNode(res) ? res : new Scalar.Scalar(res);
      node.range = coll.range;
      node.tag = tagName;
      if (tag?.format)
        node.format = tag.format;
      return node;
    }
    exports.composeCollection = composeCollection;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/resolve-block-scalar.js
var require_resolve_block_scalar = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/resolve-block-scalar.js"(exports) {
    "use strict";
    init_esm_shims();
    var Scalar = require_Scalar();
    function resolveBlockScalar(ctx, scalar, onError) {
      const start = scalar.offset;
      const header = parseBlockScalarHeader(scalar, ctx.options.strict, onError);
      if (!header)
        return { value: "", type: null, comment: "", range: [start, start, start] };
      const type = header.mode === ">" ? Scalar.Scalar.BLOCK_FOLDED : Scalar.Scalar.BLOCK_LITERAL;
      const lines = scalar.source ? splitLines(scalar.source) : [];
      let chompStart = lines.length;
      for (let i = lines.length - 1; i >= 0; --i) {
        const content = lines[i][1];
        if (content === "" || content === "\r")
          chompStart = i;
        else
          break;
      }
      if (chompStart === 0) {
        const value2 = header.chomp === "+" && lines.length > 0 ? "\n".repeat(Math.max(1, lines.length - 1)) : "";
        let end2 = start + header.length;
        if (scalar.source)
          end2 += scalar.source.length;
        return { value: value2, type, comment: header.comment, range: [start, end2, end2] };
      }
      let trimIndent = scalar.indent + header.indent;
      let offset = scalar.offset + header.length;
      let contentStart = 0;
      for (let i = 0; i < chompStart; ++i) {
        const [indent, content] = lines[i];
        if (content === "" || content === "\r") {
          if (header.indent === 0 && indent.length > trimIndent)
            trimIndent = indent.length;
        } else {
          if (indent.length < trimIndent) {
            const message = "Block scalars with more-indented leading empty lines must use an explicit indentation indicator";
            onError(offset + indent.length, "MISSING_CHAR", message);
          }
          if (header.indent === 0)
            trimIndent = indent.length;
          contentStart = i;
          if (trimIndent === 0 && !ctx.atRoot) {
            const message = "Block scalar values in collections must be indented";
            onError(offset, "BAD_INDENT", message);
          }
          break;
        }
        offset += indent.length + content.length + 1;
      }
      for (let i = lines.length - 1; i >= chompStart; --i) {
        if (lines[i][0].length > trimIndent)
          chompStart = i + 1;
      }
      let value = "";
      let sep = "";
      let prevMoreIndented = false;
      for (let i = 0; i < contentStart; ++i)
        value += lines[i][0].slice(trimIndent) + "\n";
      for (let i = contentStart; i < chompStart; ++i) {
        let [indent, content] = lines[i];
        offset += indent.length + content.length + 1;
        const crlf = content[content.length - 1] === "\r";
        if (crlf)
          content = content.slice(0, -1);
        if (content && indent.length < trimIndent) {
          const src = header.indent ? "explicit indentation indicator" : "first line";
          const message = `Block scalar lines must not be less indented than their ${src}`;
          onError(offset - content.length - (crlf ? 2 : 1), "BAD_INDENT", message);
          indent = "";
        }
        if (type === Scalar.Scalar.BLOCK_LITERAL) {
          value += sep + indent.slice(trimIndent) + content;
          sep = "\n";
        } else if (indent.length > trimIndent || content[0] === "	") {
          if (sep === " ")
            sep = "\n";
          else if (!prevMoreIndented && sep === "\n")
            sep = "\n\n";
          value += sep + indent.slice(trimIndent) + content;
          sep = "\n";
          prevMoreIndented = true;
        } else if (content === "") {
          if (sep === "\n")
            value += "\n";
          else
            sep = "\n";
        } else {
          value += sep + content;
          sep = " ";
          prevMoreIndented = false;
        }
      }
      switch (header.chomp) {
        case "-":
          break;
        case "+":
          for (let i = chompStart; i < lines.length; ++i)
            value += "\n" + lines[i][0].slice(trimIndent);
          if (value[value.length - 1] !== "\n")
            value += "\n";
          break;
        default:
          value += "\n";
      }
      const end = start + header.length + scalar.source.length;
      return { value, type, comment: header.comment, range: [start, end, end] };
    }
    function parseBlockScalarHeader({ offset, props }, strict, onError) {
      if (props[0].type !== "block-scalar-header") {
        onError(props[0], "IMPOSSIBLE", "Block scalar header not found");
        return null;
      }
      const { source } = props[0];
      const mode = source[0];
      let indent = 0;
      let chomp = "";
      let error = -1;
      for (let i = 1; i < source.length; ++i) {
        const ch = source[i];
        if (!chomp && (ch === "-" || ch === "+"))
          chomp = ch;
        else {
          const n = Number(ch);
          if (!indent && n)
            indent = n;
          else if (error === -1)
            error = offset + i;
        }
      }
      if (error !== -1)
        onError(error, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${source}`);
      let hasSpace = false;
      let comment = "";
      let length = source.length;
      for (let i = 1; i < props.length; ++i) {
        const token = props[i];
        switch (token.type) {
          case "space":
            hasSpace = true;
          // fallthrough
          case "newline":
            length += token.source.length;
            break;
          case "comment":
            if (strict && !hasSpace) {
              const message = "Comments must be separated from other tokens by white space characters";
              onError(token, "MISSING_CHAR", message);
            }
            length += token.source.length;
            comment = token.source.substring(1);
            break;
          case "error":
            onError(token, "UNEXPECTED_TOKEN", token.message);
            length += token.source.length;
            break;
          /* istanbul ignore next should not happen */
          default: {
            const message = `Unexpected token in block scalar header: ${token.type}`;
            onError(token, "UNEXPECTED_TOKEN", message);
            const ts = token.source;
            if (ts && typeof ts === "string")
              length += ts.length;
          }
        }
      }
      return { mode, indent, chomp, comment, length };
    }
    function splitLines(source) {
      const split = source.split(/\n( *)/);
      const first = split[0];
      const m = first.match(/^( *)/);
      const line0 = m?.[1] ? [m[1], first.slice(m[1].length)] : ["", first];
      const lines = [line0];
      for (let i = 1; i < split.length; i += 2)
        lines.push([split[i], split[i + 1]]);
      return lines;
    }
    exports.resolveBlockScalar = resolveBlockScalar;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/resolve-flow-scalar.js
var require_resolve_flow_scalar = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/resolve-flow-scalar.js"(exports) {
    "use strict";
    init_esm_shims();
    var Scalar = require_Scalar();
    var resolveEnd = require_resolve_end();
    function resolveFlowScalar(scalar, strict, onError) {
      const { offset, type, source, end } = scalar;
      let _type;
      let value;
      const _onError = (rel, code, msg) => onError(offset + rel, code, msg);
      switch (type) {
        case "scalar":
          _type = Scalar.Scalar.PLAIN;
          value = plainValue(source, _onError);
          break;
        case "single-quoted-scalar":
          _type = Scalar.Scalar.QUOTE_SINGLE;
          value = singleQuotedValue(source, _onError);
          break;
        case "double-quoted-scalar":
          _type = Scalar.Scalar.QUOTE_DOUBLE;
          value = doubleQuotedValue(source, _onError);
          break;
        /* istanbul ignore next should not happen */
        default:
          onError(scalar, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${type}`);
          return {
            value: "",
            type: null,
            comment: "",
            range: [offset, offset + source.length, offset + source.length]
          };
      }
      const valueEnd = offset + source.length;
      const re = resolveEnd.resolveEnd(end, valueEnd, strict, onError);
      return {
        value,
        type: _type,
        comment: re.comment,
        range: [offset, valueEnd, re.offset]
      };
    }
    function plainValue(source, onError) {
      let badChar = "";
      switch (source[0]) {
        /* istanbul ignore next should not happen */
        case "	":
          badChar = "a tab character";
          break;
        case ",":
          badChar = "flow indicator character ,";
          break;
        case "%":
          badChar = "directive indicator character %";
          break;
        case "|":
        case ">": {
          badChar = `block scalar indicator ${source[0]}`;
          break;
        }
        case "@":
        case "`": {
          badChar = `reserved character ${source[0]}`;
          break;
        }
      }
      if (badChar)
        onError(0, "BAD_SCALAR_START", `Plain value cannot start with ${badChar}`);
      return unfoldLines(source);
    }
    function singleQuotedValue(source, onError) {
      if (source[source.length - 1] !== "'" || source.length === 1)
        onError(source.length, "MISSING_CHAR", "Missing closing 'quote");
      return unfoldLines(source.slice(1, -1)).replace(/''/g, "'");
    }
    function unfoldLines(source) {
      const line = /(.*?)\r?\n/sy;
      let match = line.exec(source);
      if (!match)
        return source;
      let trimEnd, trimBoth;
      try {
        trimEnd = new RegExp("(?<![ 	])[ 	]+$");
        trimBoth = new RegExp("^[ 	]+|(?<![ 	])[ 	]+$", "g");
      } catch {
        trimEnd = /[ \t]+$/;
        trimBoth = /^[ \t]+|[ \t]+$/g;
      }
      let res = match[1].replace(trimEnd, "");
      let sep = " ";
      let pos = line.lastIndex;
      while (match = line.exec(source)) {
        const lm = match[1].replace(trimBoth, "");
        if (lm === "") {
          if (sep === "\n")
            res += sep;
          else
            sep = "\n";
        } else {
          res += sep + lm;
          sep = " ";
        }
        pos = line.lastIndex;
      }
      const last = /[ \t]*(.*)/sy;
      last.lastIndex = pos;
      match = last.exec(source);
      return res + sep + (match?.[1] ?? "");
    }
    function doubleQuotedValue(source, onError) {
      let res = "";
      for (let i = 1; i < source.length - 1; ++i) {
        const ch = source[i];
        if (ch === "\r" && source[i + 1] === "\n")
          continue;
        if (ch === "\n") {
          const { fold, offset } = foldNewline(source, i);
          res += fold;
          i = offset;
        } else if (ch === "\\") {
          let next = source[++i];
          const cc = escapeCodes[next];
          if (cc)
            res += cc;
          else if (next === "\n") {
            next = source[i + 1];
            while (next === " " || next === "	")
              next = source[++i + 1];
          } else if (next === "\r" && source[i + 1] === "\n") {
            next = source[++i + 1];
            while (next === " " || next === "	")
              next = source[++i + 1];
          } else if (next === "x" || next === "u" || next === "U") {
            const length = next === "x" ? 2 : next === "u" ? 4 : 8;
            res += parseCharCode(source, i + 1, length, onError);
            i += length;
          } else {
            const raw = source.substr(i - 1, 2);
            onError(i - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
            res += raw;
          }
        } else if (ch === " " || ch === "	") {
          const wsStart = i;
          let next = source[i + 1];
          while (next === " " || next === "	")
            next = source[++i + 1];
          if (next !== "\n" && !(next === "\r" && source[i + 2] === "\n"))
            res += i > wsStart ? source.slice(wsStart, i + 1) : ch;
        } else {
          res += ch;
        }
      }
      if (source[source.length - 1] !== '"' || source.length === 1)
        onError(source.length, "MISSING_CHAR", 'Missing closing "quote');
      return res;
    }
    function foldNewline(source, offset) {
      let fold = "";
      let ch = source[offset + 1];
      while (ch === " " || ch === "	" || ch === "\n" || ch === "\r") {
        if (ch === "\r" && source[offset + 2] !== "\n")
          break;
        if (ch === "\n")
          fold += "\n";
        offset += 1;
        ch = source[offset + 1];
      }
      if (!fold)
        fold = " ";
      return { fold, offset };
    }
    var escapeCodes = {
      "0": "\0",
      // null character
      a: "\x07",
      // bell character
      b: "\b",
      // backspace
      e: "\x1B",
      // escape character
      f: "\f",
      // form feed
      n: "\n",
      // line feed
      r: "\r",
      // carriage return
      t: "	",
      // horizontal tab
      v: "\v",
      // vertical tab
      N: "\x85",
      // Unicode next line
      _: "\xA0",
      // Unicode non-breaking space
      L: "\u2028",
      // Unicode line separator
      P: "\u2029",
      // Unicode paragraph separator
      " ": " ",
      '"': '"',
      "/": "/",
      "\\": "\\",
      "	": "	"
    };
    function parseCharCode(source, offset, length, onError) {
      const cc = source.substr(offset, length);
      const ok = cc.length === length && /^[0-9a-fA-F]+$/.test(cc);
      const code = ok ? parseInt(cc, 16) : NaN;
      try {
        return String.fromCodePoint(code);
      } catch {
        const raw = source.substr(offset - 2, length + 2);
        onError(offset - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
        return raw;
      }
    }
    exports.resolveFlowScalar = resolveFlowScalar;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/compose-scalar.js
var require_compose_scalar = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/compose-scalar.js"(exports) {
    "use strict";
    init_esm_shims();
    var identity = require_identity();
    var Scalar = require_Scalar();
    var resolveBlockScalar = require_resolve_block_scalar();
    var resolveFlowScalar = require_resolve_flow_scalar();
    function composeScalar(ctx, token, tagToken, onError) {
      const { value, type, comment, range } = token.type === "block-scalar" ? resolveBlockScalar.resolveBlockScalar(ctx, token, onError) : resolveFlowScalar.resolveFlowScalar(token, ctx.options.strict, onError);
      const tagName = tagToken ? ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg)) : null;
      let tag;
      if (ctx.options.stringKeys && ctx.atKey) {
        tag = ctx.schema[identity.SCALAR];
      } else if (tagName)
        tag = findScalarTagByName(ctx.schema, value, tagName, tagToken, onError);
      else if (token.type === "scalar")
        tag = findScalarTagByTest(ctx, value, token, onError);
      else
        tag = ctx.schema[identity.SCALAR];
      let scalar;
      try {
        const res = tag.resolve(value, (msg) => onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg), ctx.options);
        scalar = identity.isScalar(res) ? res : new Scalar.Scalar(res);
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg);
        scalar = new Scalar.Scalar(value);
      }
      scalar.range = range;
      scalar.source = value;
      if (type)
        scalar.type = type;
      if (tagName)
        scalar.tag = tagName;
      if (tag.format)
        scalar.format = tag.format;
      if (comment)
        scalar.comment = comment;
      return scalar;
    }
    function findScalarTagByName(schema, value, tagName, tagToken, onError) {
      if (tagName === "!")
        return schema[identity.SCALAR];
      const matchWithTest = [];
      for (const tag of schema.tags) {
        if (!tag.collection && tag.tag === tagName) {
          if (tag.default && tag.test)
            matchWithTest.push(tag);
          else
            return tag;
        }
      }
      for (const tag of matchWithTest)
        if (tag.test?.test(value))
          return tag;
      const kt = schema.knownTags[tagName];
      if (kt && !kt.collection) {
        schema.tags.push(Object.assign({}, kt, { default: false, test: void 0 }));
        return kt;
      }
      onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, tagName !== "tag:yaml.org,2002:str");
      return schema[identity.SCALAR];
    }
    function findScalarTagByTest({ atKey, directives, schema }, value, token, onError) {
      const tag = schema.tags.find((tag2) => (tag2.default === true || atKey && tag2.default === "key") && tag2.test?.test(value)) || schema[identity.SCALAR];
      if (schema.compat) {
        const compat = schema.compat.find((tag2) => tag2.default && tag2.test?.test(value)) ?? schema[identity.SCALAR];
        if (tag.tag !== compat.tag) {
          const ts = directives.tagString(tag.tag);
          const cs = directives.tagString(compat.tag);
          const msg = `Value may be parsed as either ${ts} or ${cs}`;
          onError(token, "TAG_RESOLVE_FAILED", msg, true);
        }
      }
      return tag;
    }
    exports.composeScalar = composeScalar;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/util-empty-scalar-position.js
var require_util_empty_scalar_position = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/util-empty-scalar-position.js"(exports) {
    "use strict";
    init_esm_shims();
    function emptyScalarPosition(offset, before, pos) {
      if (before) {
        pos ?? (pos = before.length);
        for (let i = pos - 1; i >= 0; --i) {
          let st = before[i];
          switch (st.type) {
            case "space":
            case "comment":
            case "newline":
              offset -= st.source.length;
              continue;
          }
          st = before[++i];
          while (st?.type === "space") {
            offset += st.source.length;
            st = before[++i];
          }
          break;
        }
      }
      return offset;
    }
    exports.emptyScalarPosition = emptyScalarPosition;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/compose-node.js
var require_compose_node = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/compose-node.js"(exports) {
    "use strict";
    init_esm_shims();
    var Alias = require_Alias();
    var identity = require_identity();
    var composeCollection = require_compose_collection();
    var composeScalar = require_compose_scalar();
    var resolveEnd = require_resolve_end();
    var utilEmptyScalarPosition = require_util_empty_scalar_position();
    var CN = { composeNode, composeEmptyNode };
    function composeNode(ctx, token, props, onError) {
      const atKey = ctx.atKey;
      const { spaceBefore, comment, anchor, tag } = props;
      let node;
      let isSrcToken = true;
      switch (token.type) {
        case "alias":
          node = composeAlias(ctx, token, onError);
          if (anchor || tag)
            onError(token, "ALIAS_PROPS", "An alias node must not specify any properties");
          break;
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
        case "block-scalar":
          node = composeScalar.composeScalar(ctx, token, tag, onError);
          if (anchor)
            node.anchor = anchor.source.substring(1);
          break;
        case "block-map":
        case "block-seq":
        case "flow-collection":
          try {
            node = composeCollection.composeCollection(CN, ctx, token, props, onError);
            if (anchor)
              node.anchor = anchor.source.substring(1);
          } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            onError(token, "RESOURCE_EXHAUSTION", message);
          }
          break;
        default: {
          const message = token.type === "error" ? token.message : `Unsupported token (type: ${token.type})`;
          onError(token, "UNEXPECTED_TOKEN", message);
          isSrcToken = false;
        }
      }
      node ?? (node = composeEmptyNode(ctx, token.offset, void 0, null, props, onError));
      if (anchor && node.anchor === "")
        onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
      if (atKey && ctx.options.stringKeys && (!identity.isScalar(node) || typeof node.value !== "string" || node.tag && node.tag !== "tag:yaml.org,2002:str")) {
        const msg = "With stringKeys, all keys must be strings";
        onError(tag ?? token, "NON_STRING_KEY", msg);
      }
      if (spaceBefore)
        node.spaceBefore = true;
      if (comment) {
        if (token.type === "scalar" && token.source === "")
          node.comment = comment;
        else
          node.commentBefore = comment;
      }
      if (ctx.options.keepSourceTokens && isSrcToken)
        node.srcToken = token;
      return node;
    }
    function composeEmptyNode(ctx, offset, before, pos, { spaceBefore, comment, anchor, tag, end }, onError) {
      const token = {
        type: "scalar",
        offset: utilEmptyScalarPosition.emptyScalarPosition(offset, before, pos),
        indent: -1,
        source: ""
      };
      const node = composeScalar.composeScalar(ctx, token, tag, onError);
      if (anchor) {
        node.anchor = anchor.source.substring(1);
        if (node.anchor === "")
          onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
      }
      if (spaceBefore)
        node.spaceBefore = true;
      if (comment) {
        node.comment = comment;
        node.range[2] = end;
      }
      return node;
    }
    function composeAlias({ options }, { offset, source, end }, onError) {
      const alias = new Alias.Alias(source.substring(1));
      if (alias.source === "")
        onError(offset, "BAD_ALIAS", "Alias cannot be an empty string");
      if (alias.source.endsWith(":"))
        onError(offset + source.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", true);
      const valueEnd = offset + source.length;
      const re = resolveEnd.resolveEnd(end, valueEnd, options.strict, onError);
      alias.range = [offset, valueEnd, re.offset];
      if (re.comment)
        alias.comment = re.comment;
      return alias;
    }
    exports.composeEmptyNode = composeEmptyNode;
    exports.composeNode = composeNode;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/compose-doc.js
var require_compose_doc = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/compose-doc.js"(exports) {
    "use strict";
    init_esm_shims();
    var Document = require_Document();
    var composeNode = require_compose_node();
    var resolveEnd = require_resolve_end();
    var resolveProps = require_resolve_props();
    function composeDoc(options, directives, { offset, start, value, end }, onError) {
      const opts = Object.assign({ _directives: directives }, options);
      const doc = new Document.Document(void 0, opts);
      const ctx = {
        atKey: false,
        atRoot: true,
        directives: doc.directives,
        options: doc.options,
        schema: doc.schema
      };
      const props = resolveProps.resolveProps(start, {
        indicator: "doc-start",
        next: value ?? end?.[0],
        offset,
        onError,
        parentIndent: 0,
        startOnNewline: true
      });
      if (props.found) {
        doc.directives.docStart = true;
        if (value && (value.type === "block-map" || value.type === "block-seq") && !props.hasNewline)
          onError(props.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker");
      }
      doc.contents = value ? composeNode.composeNode(ctx, value, props, onError) : composeNode.composeEmptyNode(ctx, props.end, start, null, props, onError);
      const contentEnd = doc.contents.range[2];
      const re = resolveEnd.resolveEnd(end, contentEnd, false, onError);
      if (re.comment)
        doc.comment = re.comment;
      doc.range = [offset, contentEnd, re.offset];
      return doc;
    }
    exports.composeDoc = composeDoc;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/composer.js
var require_composer = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/compose/composer.js"(exports) {
    "use strict";
    init_esm_shims();
    var node_process = __require("process");
    var directives = require_directives();
    var Document = require_Document();
    var errors = require_errors2();
    var identity = require_identity();
    var composeDoc = require_compose_doc();
    var resolveEnd = require_resolve_end();
    function getErrorPos(src) {
      if (typeof src === "number")
        return [src, src + 1];
      if (Array.isArray(src))
        return src.length === 2 ? src : [src[0], src[1]];
      const { offset, source } = src;
      return [offset, offset + (typeof source === "string" ? source.length : 1)];
    }
    function parsePrelude(prelude) {
      let comment = "";
      let atComment = false;
      let afterEmptyLine = false;
      for (let i = 0; i < prelude.length; ++i) {
        const source = prelude[i];
        switch (source[0]) {
          case "#":
            comment += (comment === "" ? "" : afterEmptyLine ? "\n\n" : "\n") + (source.substring(1) || " ");
            atComment = true;
            afterEmptyLine = false;
            break;
          case "%":
            if (prelude[i + 1]?.[0] !== "#")
              i += 1;
            atComment = false;
            break;
          default:
            if (!atComment)
              afterEmptyLine = true;
            atComment = false;
        }
      }
      return { comment, afterEmptyLine };
    }
    var Composer = class {
      constructor(options = {}) {
        this.doc = null;
        this.atDirectives = false;
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
        this.onError = (source, code, message, warning) => {
          const pos = getErrorPos(source);
          if (warning)
            this.warnings.push(new errors.YAMLWarning(pos, code, message));
          else
            this.errors.push(new errors.YAMLParseError(pos, code, message));
        };
        this.directives = new directives.Directives({ version: options.version || "1.2" });
        this.options = options;
      }
      decorate(doc, afterDoc) {
        const { comment, afterEmptyLine } = parsePrelude(this.prelude);
        if (comment) {
          const dc = doc.contents;
          if (afterDoc) {
            doc.comment = doc.comment ? `${doc.comment}
${comment}` : comment;
          } else if (afterEmptyLine || doc.directives.docStart || !dc) {
            doc.commentBefore = comment;
          } else if (identity.isCollection(dc) && !dc.flow && dc.items.length > 0) {
            let it = dc.items[0];
            if (identity.isPair(it))
              it = it.key;
            const cb = it.commentBefore;
            it.commentBefore = cb ? `${comment}
${cb}` : comment;
          } else {
            const cb = dc.commentBefore;
            dc.commentBefore = cb ? `${comment}
${cb}` : comment;
          }
        }
        if (afterDoc) {
          for (let i = 0; i < this.errors.length; ++i)
            doc.errors.push(this.errors[i]);
          for (let i = 0; i < this.warnings.length; ++i)
            doc.warnings.push(this.warnings[i]);
        } else {
          doc.errors = this.errors;
          doc.warnings = this.warnings;
        }
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
      }
      /**
       * Current stream status information.
       *
       * Mostly useful at the end of input for an empty stream.
       */
      streamInfo() {
        return {
          comment: parsePrelude(this.prelude).comment,
          directives: this.directives,
          errors: this.errors,
          warnings: this.warnings
        };
      }
      /**
       * Compose tokens into documents.
       *
       * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
       * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
       */
      *compose(tokens, forceDoc = false, endOffset = -1) {
        for (const token of tokens)
          yield* this.next(token);
        yield* this.end(forceDoc, endOffset);
      }
      /** Advance the composer by one CST token. */
      *next(token) {
        if (node_process.env.LOG_STREAM)
          console.dir(token, { depth: null });
        switch (token.type) {
          case "directive":
            this.directives.add(token.source, (offset, message, warning) => {
              const pos = getErrorPos(token);
              pos[0] += offset;
              this.onError(pos, "BAD_DIRECTIVE", message, warning);
            });
            this.prelude.push(token.source);
            this.atDirectives = true;
            break;
          case "document": {
            const doc = composeDoc.composeDoc(this.options, this.directives, token, this.onError);
            if (this.atDirectives && !doc.directives.docStart)
              this.onError(token, "MISSING_CHAR", "Missing directives-end/doc-start indicator line");
            this.decorate(doc, false);
            if (this.doc)
              yield this.doc;
            this.doc = doc;
            this.atDirectives = false;
            break;
          }
          case "byte-order-mark":
          case "space":
            break;
          case "comment":
          case "newline":
            this.prelude.push(token.source);
            break;
          case "error": {
            const msg = token.source ? `${token.message}: ${JSON.stringify(token.source)}` : token.message;
            const error = new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg);
            if (this.atDirectives || !this.doc)
              this.errors.push(error);
            else
              this.doc.errors.push(error);
            break;
          }
          case "doc-end": {
            if (!this.doc) {
              const msg = "Unexpected doc-end without preceding document";
              this.errors.push(new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg));
              break;
            }
            this.doc.directives.docEnd = true;
            const end = resolveEnd.resolveEnd(token.end, token.offset + token.source.length, this.doc.options.strict, this.onError);
            this.decorate(this.doc, true);
            if (end.comment) {
              const dc = this.doc.comment;
              this.doc.comment = dc ? `${dc}
${end.comment}` : end.comment;
            }
            this.doc.range[2] = end.offset;
            break;
          }
          default:
            this.errors.push(new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", `Unsupported token ${token.type}`));
        }
      }
      /**
       * Call at end of input to yield any remaining document.
       *
       * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
       * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
       */
      *end(forceDoc = false, endOffset = -1) {
        if (this.doc) {
          this.decorate(this.doc, true);
          yield this.doc;
          this.doc = null;
        } else if (forceDoc) {
          const opts = Object.assign({ _directives: this.directives }, this.options);
          const doc = new Document.Document(void 0, opts);
          if (this.atDirectives)
            this.onError(endOffset, "MISSING_CHAR", "Missing directives-end indicator line");
          doc.range = [0, endOffset, endOffset];
          this.decorate(doc, false);
          yield doc;
        }
      }
    };
    exports.Composer = Composer;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/parse/cst-scalar.js
var require_cst_scalar = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/parse/cst-scalar.js"(exports) {
    "use strict";
    init_esm_shims();
    var resolveBlockScalar = require_resolve_block_scalar();
    var resolveFlowScalar = require_resolve_flow_scalar();
    var errors = require_errors2();
    var stringifyString = require_stringifyString();
    function resolveAsScalar(token, strict = true, onError) {
      if (token) {
        const _onError = (pos, code, message) => {
          const offset = typeof pos === "number" ? pos : Array.isArray(pos) ? pos[0] : pos.offset;
          if (onError)
            onError(offset, code, message);
          else
            throw new errors.YAMLParseError([offset, offset + 1], code, message);
        };
        switch (token.type) {
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return resolveFlowScalar.resolveFlowScalar(token, strict, _onError);
          case "block-scalar":
            return resolveBlockScalar.resolveBlockScalar({ options: { strict } }, token, _onError);
        }
      }
      return null;
    }
    function createScalarToken(value, context) {
      const { implicitKey = false, indent, inFlow = false, offset = -1, type = "PLAIN" } = context;
      const source = stringifyString.stringifyString({ type, value }, {
        implicitKey,
        indent: indent > 0 ? " ".repeat(indent) : "",
        inFlow,
        options: { blockQuote: true, lineWidth: -1 }
      });
      const end = context.end ?? [
        { type: "newline", offset: -1, indent, source: "\n" }
      ];
      switch (source[0]) {
        case "|":
        case ">": {
          const he = source.indexOf("\n");
          const head = source.substring(0, he);
          const body = source.substring(he + 1) + "\n";
          const props = [
            { type: "block-scalar-header", offset, indent, source: head }
          ];
          if (!addEndtoBlockProps(props, end))
            props.push({ type: "newline", offset: -1, indent, source: "\n" });
          return { type: "block-scalar", offset, indent, props, source: body };
        }
        case '"':
          return { type: "double-quoted-scalar", offset, indent, source, end };
        case "'":
          return { type: "single-quoted-scalar", offset, indent, source, end };
        default:
          return { type: "scalar", offset, indent, source, end };
      }
    }
    function setScalarValue(token, value, context = {}) {
      let { afterKey = false, implicitKey = false, inFlow = false, type } = context;
      let indent = "indent" in token ? token.indent : null;
      if (afterKey && typeof indent === "number")
        indent += 2;
      if (!type)
        switch (token.type) {
          case "single-quoted-scalar":
            type = "QUOTE_SINGLE";
            break;
          case "double-quoted-scalar":
            type = "QUOTE_DOUBLE";
            break;
          case "block-scalar": {
            const header = token.props[0];
            if (header.type !== "block-scalar-header")
              throw new Error("Invalid block scalar header");
            type = header.source[0] === ">" ? "BLOCK_FOLDED" : "BLOCK_LITERAL";
            break;
          }
          default:
            type = "PLAIN";
        }
      const source = stringifyString.stringifyString({ type, value }, {
        implicitKey: implicitKey || indent === null,
        indent: indent !== null && indent > 0 ? " ".repeat(indent) : "",
        inFlow,
        options: { blockQuote: true, lineWidth: -1 }
      });
      switch (source[0]) {
        case "|":
        case ">":
          setBlockScalarValue(token, source);
          break;
        case '"':
          setFlowScalarValue(token, source, "double-quoted-scalar");
          break;
        case "'":
          setFlowScalarValue(token, source, "single-quoted-scalar");
          break;
        default:
          setFlowScalarValue(token, source, "scalar");
      }
    }
    function setBlockScalarValue(token, source) {
      const he = source.indexOf("\n");
      const head = source.substring(0, he);
      const body = source.substring(he + 1) + "\n";
      if (token.type === "block-scalar") {
        const header = token.props[0];
        if (header.type !== "block-scalar-header")
          throw new Error("Invalid block scalar header");
        header.source = head;
        token.source = body;
      } else {
        const { offset } = token;
        const indent = "indent" in token ? token.indent : -1;
        const props = [
          { type: "block-scalar-header", offset, indent, source: head }
        ];
        if (!addEndtoBlockProps(props, "end" in token ? token.end : void 0))
          props.push({ type: "newline", offset: -1, indent, source: "\n" });
        for (const key of Object.keys(token))
          if (key !== "type" && key !== "offset")
            delete token[key];
        Object.assign(token, { type: "block-scalar", indent, props, source: body });
      }
    }
    function addEndtoBlockProps(props, end) {
      if (end)
        for (const st of end)
          switch (st.type) {
            case "space":
            case "comment":
              props.push(st);
              break;
            case "newline":
              props.push(st);
              return true;
          }
      return false;
    }
    function setFlowScalarValue(token, source, type) {
      switch (token.type) {
        case "scalar":
        case "double-quoted-scalar":
        case "single-quoted-scalar":
          token.type = type;
          token.source = source;
          break;
        case "block-scalar": {
          const end = token.props.slice(1);
          let oa = source.length;
          if (token.props[0].type === "block-scalar-header")
            oa -= token.props[0].source.length;
          for (const tok of end)
            tok.offset += oa;
          delete token.props;
          Object.assign(token, { type, source, end });
          break;
        }
        case "block-map":
        case "block-seq": {
          const offset = token.offset + source.length;
          const nl = { type: "newline", offset, indent: token.indent, source: "\n" };
          delete token.items;
          Object.assign(token, { type, source, end: [nl] });
          break;
        }
        default: {
          const indent = "indent" in token ? token.indent : -1;
          const end = "end" in token && Array.isArray(token.end) ? token.end.filter((st) => st.type === "space" || st.type === "comment" || st.type === "newline") : [];
          for (const key of Object.keys(token))
            if (key !== "type" && key !== "offset")
              delete token[key];
          Object.assign(token, { type, indent, source, end });
        }
      }
    }
    exports.createScalarToken = createScalarToken;
    exports.resolveAsScalar = resolveAsScalar;
    exports.setScalarValue = setScalarValue;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/parse/cst-stringify.js
var require_cst_stringify = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/parse/cst-stringify.js"(exports) {
    "use strict";
    init_esm_shims();
    var stringify = (cst) => "type" in cst ? stringifyToken(cst) : stringifyItem(cst);
    function stringifyToken(token) {
      switch (token.type) {
        case "block-scalar": {
          let res = "";
          for (const tok of token.props)
            res += stringifyToken(tok);
          return res + token.source;
        }
        case "block-map":
        case "block-seq": {
          let res = "";
          for (const item of token.items)
            res += stringifyItem(item);
          return res;
        }
        case "flow-collection": {
          let res = token.start.source;
          for (const item of token.items)
            res += stringifyItem(item);
          for (const st of token.end)
            res += st.source;
          return res;
        }
        case "document": {
          let res = stringifyItem(token);
          if (token.end)
            for (const st of token.end)
              res += st.source;
          return res;
        }
        default: {
          let res = token.source;
          if ("end" in token && token.end)
            for (const st of token.end)
              res += st.source;
          return res;
        }
      }
    }
    function stringifyItem({ start, key, sep, value }) {
      let res = "";
      for (const st of start)
        res += st.source;
      if (key)
        res += stringifyToken(key);
      if (sep)
        for (const st of sep)
          res += st.source;
      if (value)
        res += stringifyToken(value);
      return res;
    }
    exports.stringify = stringify;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/parse/cst-visit.js
var require_cst_visit = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/parse/cst-visit.js"(exports) {
    "use strict";
    init_esm_shims();
    var BREAK = /* @__PURE__ */ Symbol("break visit");
    var SKIP = /* @__PURE__ */ Symbol("skip children");
    var REMOVE = /* @__PURE__ */ Symbol("remove item");
    function visit(cst, visitor) {
      if ("type" in cst && cst.type === "document")
        cst = { start: cst.start, value: cst.value };
      _visit(Object.freeze([]), cst, visitor);
    }
    visit.BREAK = BREAK;
    visit.SKIP = SKIP;
    visit.REMOVE = REMOVE;
    visit.itemAtPath = (cst, path) => {
      let item = cst;
      for (const [field, index] of path) {
        const tok = item?.[field];
        if (tok && "items" in tok) {
          item = tok.items[index];
        } else
          return void 0;
      }
      return item;
    };
    visit.parentCollection = (cst, path) => {
      const parent = visit.itemAtPath(cst, path.slice(0, -1));
      const field = path[path.length - 1][0];
      const coll = parent?.[field];
      if (coll && "items" in coll)
        return coll;
      throw new Error("Parent collection not found");
    };
    function _visit(path, item, visitor) {
      let ctrl = visitor(item, path);
      if (typeof ctrl === "symbol")
        return ctrl;
      for (const field of ["key", "value"]) {
        const token = item[field];
        if (token && "items" in token) {
          for (let i = 0; i < token.items.length; ++i) {
            const ci = _visit(Object.freeze(path.concat([[field, i]])), token.items[i], visitor);
            if (typeof ci === "number")
              i = ci - 1;
            else if (ci === BREAK)
              return BREAK;
            else if (ci === REMOVE) {
              token.items.splice(i, 1);
              i -= 1;
            }
          }
          if (typeof ctrl === "function" && field === "key")
            ctrl = ctrl(item, path);
        }
      }
      return typeof ctrl === "function" ? ctrl(item, path) : ctrl;
    }
    exports.visit = visit;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/parse/cst.js
var require_cst = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/parse/cst.js"(exports) {
    "use strict";
    init_esm_shims();
    var cstScalar = require_cst_scalar();
    var cstStringify = require_cst_stringify();
    var cstVisit = require_cst_visit();
    var BOM = "\uFEFF";
    var DOCUMENT = "\x02";
    var FLOW_END = "\x18";
    var SCALAR = "\x1f";
    var isCollection2 = (token) => !!token && "items" in token;
    var isScalar3 = (token) => !!token && (token.type === "scalar" || token.type === "single-quoted-scalar" || token.type === "double-quoted-scalar" || token.type === "block-scalar");
    function prettyToken(token) {
      switch (token) {
        case BOM:
          return "<BOM>";
        case DOCUMENT:
          return "<DOC>";
        case FLOW_END:
          return "<FLOW_END>";
        case SCALAR:
          return "<SCALAR>";
        default:
          return JSON.stringify(token);
      }
    }
    function tokenType(source) {
      switch (source) {
        case BOM:
          return "byte-order-mark";
        case DOCUMENT:
          return "doc-mode";
        case FLOW_END:
          return "flow-error-end";
        case SCALAR:
          return "scalar";
        case "---":
          return "doc-start";
        case "...":
          return "doc-end";
        case "":
        case "\n":
        case "\r\n":
          return "newline";
        case "-":
          return "seq-item-ind";
        case "?":
          return "explicit-key-ind";
        case ":":
          return "map-value-ind";
        case "{":
          return "flow-map-start";
        case "}":
          return "flow-map-end";
        case "[":
          return "flow-seq-start";
        case "]":
          return "flow-seq-end";
        case ",":
          return "comma";
      }
      switch (source[0]) {
        case " ":
        case "	":
          return "space";
        case "#":
          return "comment";
        case "%":
          return "directive-line";
        case "*":
          return "alias";
        case "&":
          return "anchor";
        case "!":
          return "tag";
        case "'":
          return "single-quoted-scalar";
        case '"':
          return "double-quoted-scalar";
        case "|":
        case ">":
          return "block-scalar-header";
      }
      return null;
    }
    exports.createScalarToken = cstScalar.createScalarToken;
    exports.resolveAsScalar = cstScalar.resolveAsScalar;
    exports.setScalarValue = cstScalar.setScalarValue;
    exports.stringify = cstStringify.stringify;
    exports.visit = cstVisit.visit;
    exports.BOM = BOM;
    exports.DOCUMENT = DOCUMENT;
    exports.FLOW_END = FLOW_END;
    exports.SCALAR = SCALAR;
    exports.isCollection = isCollection2;
    exports.isScalar = isScalar3;
    exports.prettyToken = prettyToken;
    exports.tokenType = tokenType;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/parse/lexer.js
var require_lexer = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/parse/lexer.js"(exports) {
    "use strict";
    init_esm_shims();
    var cst = require_cst();
    function isEmpty(ch) {
      switch (ch) {
        case void 0:
        case " ":
        case "\n":
        case "\r":
        case "	":
          return true;
        default:
          return false;
      }
    }
    var hexDigits = new Set("0123456789ABCDEFabcdef");
    var tagChars = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()");
    var flowIndicatorChars = new Set(",[]{}");
    var invalidAnchorChars = new Set(" ,[]{}\n\r	");
    var isNotAnchorChar = (ch) => !ch || invalidAnchorChars.has(ch);
    var Lexer = class {
      constructor() {
        this.atEnd = false;
        this.blockScalarIndent = -1;
        this.blockScalarKeep = false;
        this.buffer = "";
        this.flowKey = false;
        this.flowLevel = 0;
        this.indentNext = 0;
        this.indentValue = 0;
        this.lineEndPos = null;
        this.next = null;
        this.pos = 0;
      }
      /**
       * Generate YAML tokens from the `source` string. If `incomplete`,
       * a part of the last line may be left as a buffer for the next call.
       *
       * @returns A generator of lexical tokens
       */
      *lex(source, incomplete = false) {
        if (source) {
          if (typeof source !== "string")
            throw TypeError("source is not a string");
          this.buffer = this.buffer ? this.buffer + source : source;
          this.lineEndPos = null;
        }
        this.atEnd = !incomplete;
        let next = this.next ?? "stream";
        while (next && (incomplete || this.hasChars(1)))
          next = yield* this.parseNext(next);
      }
      atLineEnd() {
        let i = this.pos;
        let ch = this.buffer[i];
        while (ch === " " || ch === "	")
          ch = this.buffer[++i];
        if (!ch || ch === "#" || ch === "\n")
          return true;
        if (ch === "\r")
          return this.buffer[i + 1] === "\n";
        return false;
      }
      charAt(n) {
        return this.buffer[this.pos + n];
      }
      continueScalar(offset) {
        let ch = this.buffer[offset];
        if (this.indentNext > 0) {
          let indent = 0;
          while (ch === " ")
            ch = this.buffer[++indent + offset];
          if (ch === "\r") {
            const next = this.buffer[indent + offset + 1];
            if (next === "\n" || !next && !this.atEnd)
              return offset + indent + 1;
          }
          return ch === "\n" || indent >= this.indentNext || !ch && !this.atEnd ? offset + indent : -1;
        }
        if (ch === "-" || ch === ".") {
          const dt = this.buffer.substr(offset, 3);
          if ((dt === "---" || dt === "...") && isEmpty(this.buffer[offset + 3]))
            return -1;
        }
        return offset;
      }
      getLine() {
        let end = this.lineEndPos;
        if (typeof end !== "number" || end !== -1 && end < this.pos) {
          end = this.buffer.indexOf("\n", this.pos);
          this.lineEndPos = end;
        }
        if (end === -1)
          return this.atEnd ? this.buffer.substring(this.pos) : null;
        if (this.buffer[end - 1] === "\r")
          end -= 1;
        return this.buffer.substring(this.pos, end);
      }
      hasChars(n) {
        return this.pos + n <= this.buffer.length;
      }
      setNext(state) {
        this.buffer = this.buffer.substring(this.pos);
        this.pos = 0;
        this.lineEndPos = null;
        this.next = state;
        return null;
      }
      peek(n) {
        return this.buffer.substr(this.pos, n);
      }
      *parseNext(next) {
        switch (next) {
          case "stream":
            return yield* this.parseStream();
          case "line-start":
            return yield* this.parseLineStart();
          case "block-start":
            return yield* this.parseBlockStart();
          case "doc":
            return yield* this.parseDocument();
          case "flow":
            return yield* this.parseFlowCollection();
          case "quoted-scalar":
            return yield* this.parseQuotedScalar();
          case "block-scalar":
            return yield* this.parseBlockScalar();
          case "plain-scalar":
            return yield* this.parsePlainScalar();
        }
      }
      *parseStream() {
        let line = this.getLine();
        if (line === null)
          return this.setNext("stream");
        if (line[0] === cst.BOM) {
          yield* this.pushCount(1);
          line = line.substring(1);
        }
        if (line[0] === "%") {
          let dirEnd = line.length;
          let cs = line.indexOf("#");
          while (cs !== -1) {
            const ch = line[cs - 1];
            if (ch === " " || ch === "	") {
              dirEnd = cs - 1;
              break;
            } else {
              cs = line.indexOf("#", cs + 1);
            }
          }
          while (true) {
            const ch = line[dirEnd - 1];
            if (ch === " " || ch === "	")
              dirEnd -= 1;
            else
              break;
          }
          const n = (yield* this.pushCount(dirEnd)) + (yield* this.pushSpaces(true));
          yield* this.pushCount(line.length - n);
          this.pushNewline();
          return "stream";
        }
        if (this.atLineEnd()) {
          const sp = yield* this.pushSpaces(true);
          yield* this.pushCount(line.length - sp);
          yield* this.pushNewline();
          return "stream";
        }
        yield cst.DOCUMENT;
        return yield* this.parseLineStart();
      }
      *parseLineStart() {
        const ch = this.charAt(0);
        if (!ch && !this.atEnd)
          return this.setNext("line-start");
        if (ch === "-" || ch === ".") {
          if (!this.atEnd && !this.hasChars(4))
            return this.setNext("line-start");
          const s = this.peek(3);
          if ((s === "---" || s === "...") && isEmpty(this.charAt(3))) {
            yield* this.pushCount(3);
            this.indentValue = 0;
            this.indentNext = 0;
            return s === "---" ? "doc" : "stream";
          }
        }
        this.indentValue = yield* this.pushSpaces(false);
        if (this.indentNext > this.indentValue && !isEmpty(this.charAt(1)))
          this.indentNext = this.indentValue;
        return yield* this.parseBlockStart();
      }
      *parseBlockStart() {
        const [ch0, ch1] = this.peek(2);
        if (!ch1 && !this.atEnd)
          return this.setNext("block-start");
        if ((ch0 === "-" || ch0 === "?" || ch0 === ":") && isEmpty(ch1)) {
          const n = (yield* this.pushCount(1)) + (yield* this.pushSpaces(true));
          this.indentNext = this.indentValue + 1;
          this.indentValue += n;
          return "block-start";
        }
        return "doc";
      }
      *parseDocument() {
        yield* this.pushSpaces(true);
        const line = this.getLine();
        if (line === null)
          return this.setNext("doc");
        let n = yield* this.pushIndicators();
        switch (line[n]) {
          case "#":
            yield* this.pushCount(line.length - n);
          // fallthrough
          case void 0:
            yield* this.pushNewline();
            return yield* this.parseLineStart();
          case "{":
          case "[":
            yield* this.pushCount(1);
            this.flowKey = false;
            this.flowLevel = 1;
            return "flow";
          case "}":
          case "]":
            yield* this.pushCount(1);
            return "doc";
          case "*":
            yield* this.pushUntil(isNotAnchorChar);
            return "doc";
          case '"':
          case "'":
            return yield* this.parseQuotedScalar();
          case "|":
          case ">":
            n += yield* this.parseBlockScalarHeader();
            n += yield* this.pushSpaces(true);
            yield* this.pushCount(line.length - n);
            yield* this.pushNewline();
            return yield* this.parseBlockScalar();
          default:
            return yield* this.parsePlainScalar();
        }
      }
      *parseFlowCollection() {
        let nl, sp;
        let indent = -1;
        do {
          nl = yield* this.pushNewline();
          if (nl > 0) {
            sp = yield* this.pushSpaces(false);
            this.indentValue = indent = sp;
          } else {
            sp = 0;
          }
          sp += yield* this.pushSpaces(true);
        } while (nl + sp > 0);
        const line = this.getLine();
        if (line === null)
          return this.setNext("flow");
        if (indent !== -1 && indent < this.indentNext && line[0] !== "#" || indent === 0 && (line.startsWith("---") || line.startsWith("...")) && isEmpty(line[3])) {
          const atFlowEndMarker = indent === this.indentNext - 1 && this.flowLevel === 1 && (line[0] === "]" || line[0] === "}");
          if (!atFlowEndMarker) {
            this.flowLevel = 0;
            yield cst.FLOW_END;
            return yield* this.parseLineStart();
          }
        }
        let n = 0;
        while (line[n] === ",") {
          n += yield* this.pushCount(1);
          n += yield* this.pushSpaces(true);
          this.flowKey = false;
        }
        n += yield* this.pushIndicators();
        switch (line[n]) {
          case void 0:
            return "flow";
          case "#":
            yield* this.pushCount(line.length - n);
            return "flow";
          case "{":
          case "[":
            yield* this.pushCount(1);
            this.flowKey = false;
            this.flowLevel += 1;
            return "flow";
          case "}":
          case "]":
            yield* this.pushCount(1);
            this.flowKey = true;
            this.flowLevel -= 1;
            return this.flowLevel ? "flow" : "doc";
          case "*":
            yield* this.pushUntil(isNotAnchorChar);
            return "flow";
          case '"':
          case "'":
            this.flowKey = true;
            return yield* this.parseQuotedScalar();
          case ":": {
            const next = this.charAt(1);
            if (this.flowKey || isEmpty(next) || next === ",") {
              this.flowKey = false;
              yield* this.pushCount(1);
              yield* this.pushSpaces(true);
              return "flow";
            }
          }
          // fallthrough
          default:
            this.flowKey = false;
            return yield* this.parsePlainScalar();
        }
      }
      *parseQuotedScalar() {
        const quote = this.charAt(0);
        let end = this.buffer.indexOf(quote, this.pos + 1);
        if (quote === "'") {
          while (end !== -1 && this.buffer[end + 1] === "'")
            end = this.buffer.indexOf("'", end + 2);
        } else {
          while (end !== -1) {
            let n = 0;
            while (this.buffer[end - 1 - n] === "\\")
              n += 1;
            if (n % 2 === 0)
              break;
            end = this.buffer.indexOf('"', end + 1);
          }
        }
        const qb = this.buffer.substring(0, end);
        let nl = qb.indexOf("\n", this.pos);
        if (nl !== -1) {
          while (nl !== -1) {
            const cs = this.continueScalar(nl + 1);
            if (cs === -1)
              break;
            nl = qb.indexOf("\n", cs);
          }
          if (nl !== -1) {
            end = nl - (qb[nl - 1] === "\r" ? 2 : 1);
          }
        }
        if (end === -1) {
          if (!this.atEnd)
            return this.setNext("quoted-scalar");
          end = this.buffer.length;
        }
        yield* this.pushToIndex(end + 1, false);
        return this.flowLevel ? "flow" : "doc";
      }
      *parseBlockScalarHeader() {
        this.blockScalarIndent = -1;
        this.blockScalarKeep = false;
        let i = this.pos;
        while (true) {
          const ch = this.buffer[++i];
          if (ch === "+")
            this.blockScalarKeep = true;
          else if (ch > "0" && ch <= "9")
            this.blockScalarIndent = Number(ch) - 1;
          else if (ch !== "-")
            break;
        }
        return yield* this.pushUntil((ch) => isEmpty(ch) || ch === "#");
      }
      *parseBlockScalar() {
        let nl = this.pos - 1;
        let indent = 0;
        let ch;
        loop: for (let i2 = this.pos; ch = this.buffer[i2]; ++i2) {
          switch (ch) {
            case " ":
              indent += 1;
              break;
            case "\n":
              nl = i2;
              indent = 0;
              break;
            case "\r": {
              const next = this.buffer[i2 + 1];
              if (!next && !this.atEnd)
                return this.setNext("block-scalar");
              if (next === "\n")
                break;
            }
            // fallthrough
            default:
              break loop;
          }
        }
        if (!ch && !this.atEnd)
          return this.setNext("block-scalar");
        if (indent >= this.indentNext) {
          if (this.blockScalarIndent === -1)
            this.indentNext = indent;
          else {
            this.indentNext = this.blockScalarIndent + (this.indentNext === 0 ? 1 : this.indentNext);
          }
          do {
            const cs = this.continueScalar(nl + 1);
            if (cs === -1)
              break;
            nl = this.buffer.indexOf("\n", cs);
          } while (nl !== -1);
          if (nl === -1) {
            if (!this.atEnd)
              return this.setNext("block-scalar");
            nl = this.buffer.length;
          }
        }
        let i = nl + 1;
        ch = this.buffer[i];
        while (ch === " ")
          ch = this.buffer[++i];
        if (ch === "	") {
          while (ch === "	" || ch === " " || ch === "\r" || ch === "\n")
            ch = this.buffer[++i];
          nl = i - 1;
        } else if (!this.blockScalarKeep) {
          do {
            let i2 = nl - 1;
            let ch2 = this.buffer[i2];
            if (ch2 === "\r")
              ch2 = this.buffer[--i2];
            const lastChar = i2;
            while (ch2 === " ")
              ch2 = this.buffer[--i2];
            if (ch2 === "\n" && i2 >= this.pos && i2 + 1 + indent > lastChar)
              nl = i2;
            else
              break;
          } while (true);
        }
        yield cst.SCALAR;
        yield* this.pushToIndex(nl + 1, true);
        return yield* this.parseLineStart();
      }
      *parsePlainScalar() {
        const inFlow = this.flowLevel > 0;
        let end = this.pos - 1;
        let i = this.pos - 1;
        let ch;
        while (ch = this.buffer[++i]) {
          if (ch === ":") {
            const next = this.buffer[i + 1];
            if (isEmpty(next) || inFlow && flowIndicatorChars.has(next))
              break;
            end = i;
          } else if (isEmpty(ch)) {
            let next = this.buffer[i + 1];
            if (ch === "\r") {
              if (next === "\n") {
                i += 1;
                ch = "\n";
                next = this.buffer[i + 1];
              } else
                end = i;
            }
            if (next === "#" || inFlow && flowIndicatorChars.has(next))
              break;
            if (ch === "\n") {
              const cs = this.continueScalar(i + 1);
              if (cs === -1)
                break;
              i = Math.max(i, cs - 2);
            }
          } else {
            if (inFlow && flowIndicatorChars.has(ch))
              break;
            end = i;
          }
        }
        if (!ch && !this.atEnd)
          return this.setNext("plain-scalar");
        yield cst.SCALAR;
        yield* this.pushToIndex(end + 1, true);
        return inFlow ? "flow" : "doc";
      }
      *pushCount(n) {
        if (n > 0) {
          yield this.buffer.substr(this.pos, n);
          this.pos += n;
          return n;
        }
        return 0;
      }
      *pushToIndex(i, allowEmpty) {
        const s = this.buffer.slice(this.pos, i);
        if (s) {
          yield s;
          this.pos += s.length;
          return s.length;
        } else if (allowEmpty)
          yield "";
        return 0;
      }
      *pushIndicators() {
        let n = 0;
        loop: while (true) {
          switch (this.charAt(0)) {
            case "!":
              n += yield* this.pushTag();
              n += yield* this.pushSpaces(true);
              continue loop;
            case "&":
              n += yield* this.pushUntil(isNotAnchorChar);
              n += yield* this.pushSpaces(true);
              continue loop;
            case "-":
            // this is an error
            case "?":
            // this is an error outside flow collections
            case ":": {
              const inFlow = this.flowLevel > 0;
              const ch1 = this.charAt(1);
              if (isEmpty(ch1) || inFlow && flowIndicatorChars.has(ch1)) {
                if (!inFlow)
                  this.indentNext = this.indentValue + 1;
                else if (this.flowKey)
                  this.flowKey = false;
                n += yield* this.pushCount(1);
                n += yield* this.pushSpaces(true);
                continue loop;
              }
            }
          }
          break loop;
        }
        return n;
      }
      *pushTag() {
        if (this.charAt(1) === "<") {
          let i = this.pos + 2;
          let ch = this.buffer[i];
          while (!isEmpty(ch) && ch !== ">")
            ch = this.buffer[++i];
          return yield* this.pushToIndex(ch === ">" ? i + 1 : i, false);
        } else {
          let i = this.pos + 1;
          let ch = this.buffer[i];
          while (ch) {
            if (tagChars.has(ch))
              ch = this.buffer[++i];
            else if (ch === "%" && hexDigits.has(this.buffer[i + 1]) && hexDigits.has(this.buffer[i + 2])) {
              ch = this.buffer[i += 3];
            } else
              break;
          }
          return yield* this.pushToIndex(i, false);
        }
      }
      *pushNewline() {
        const ch = this.buffer[this.pos];
        if (ch === "\n")
          return yield* this.pushCount(1);
        else if (ch === "\r" && this.charAt(1) === "\n")
          return yield* this.pushCount(2);
        else
          return 0;
      }
      *pushSpaces(allowTabs) {
        let i = this.pos - 1;
        let ch;
        do {
          ch = this.buffer[++i];
        } while (ch === " " || allowTabs && ch === "	");
        const n = i - this.pos;
        if (n > 0) {
          yield this.buffer.substr(this.pos, n);
          this.pos = i;
        }
        return n;
      }
      *pushUntil(test) {
        let i = this.pos;
        let ch = this.buffer[i];
        while (!test(ch))
          ch = this.buffer[++i];
        return yield* this.pushToIndex(i, false);
      }
    };
    exports.Lexer = Lexer;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/parse/line-counter.js
var require_line_counter = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/parse/line-counter.js"(exports) {
    "use strict";
    init_esm_shims();
    var LineCounter = class {
      constructor() {
        this.lineStarts = [];
        this.addNewLine = (offset) => this.lineStarts.push(offset);
        this.linePos = (offset) => {
          let low = 0;
          let high = this.lineStarts.length;
          while (low < high) {
            const mid = low + high >> 1;
            if (this.lineStarts[mid] < offset)
              low = mid + 1;
            else
              high = mid;
          }
          if (this.lineStarts[low] === offset)
            return { line: low + 1, col: 1 };
          if (low === 0)
            return { line: 0, col: offset };
          const start = this.lineStarts[low - 1];
          return { line: low, col: offset - start + 1 };
        };
      }
    };
    exports.LineCounter = LineCounter;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/parse/parser.js
var require_parser = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/parse/parser.js"(exports) {
    "use strict";
    init_esm_shims();
    var node_process = __require("process");
    var cst = require_cst();
    var lexer = require_lexer();
    function includesToken(list, type) {
      for (let i = 0; i < list.length; ++i)
        if (list[i].type === type)
          return true;
      return false;
    }
    function findNonEmptyIndex(list) {
      for (let i = 0; i < list.length; ++i) {
        switch (list[i].type) {
          case "space":
          case "comment":
          case "newline":
            break;
          default:
            return i;
        }
      }
      return -1;
    }
    function isFlowToken(token) {
      switch (token?.type) {
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
        case "flow-collection":
          return true;
        default:
          return false;
      }
    }
    function getPrevProps(parent) {
      switch (parent.type) {
        case "document":
          return parent.start;
        case "block-map": {
          const it = parent.items[parent.items.length - 1];
          return it.sep ?? it.start;
        }
        case "block-seq":
          return parent.items[parent.items.length - 1].start;
        /* istanbul ignore next should not happen */
        default:
          return [];
      }
    }
    function getFirstKeyStartProps(prev) {
      if (prev.length === 0)
        return [];
      let i = prev.length;
      loop: while (--i >= 0) {
        switch (prev[i].type) {
          case "doc-start":
          case "explicit-key-ind":
          case "map-value-ind":
          case "seq-item-ind":
          case "newline":
            break loop;
        }
      }
      while (prev[++i]?.type === "space") {
      }
      return prev.splice(i, prev.length);
    }
    function arrayPushArray(target, source) {
      if (source.length < 1e5)
        Array.prototype.push.apply(target, source);
      else
        for (let i = 0; i < source.length; ++i)
          target.push(source[i]);
    }
    function fixFlowSeqItems(fc) {
      if (fc.start.type === "flow-seq-start") {
        for (const it of fc.items) {
          if (it.sep && !it.value && !includesToken(it.start, "explicit-key-ind") && !includesToken(it.sep, "map-value-ind")) {
            if (it.key)
              it.value = it.key;
            delete it.key;
            if (isFlowToken(it.value)) {
              if (it.value.end)
                arrayPushArray(it.value.end, it.sep);
              else
                it.value.end = it.sep;
            } else
              arrayPushArray(it.start, it.sep);
            delete it.sep;
          }
        }
      }
    }
    var Parser = class {
      /**
       * @param onNewLine - If defined, called separately with the start position of
       *   each new line (in `parse()`, including the start of input).
       */
      constructor(onNewLine) {
        this.atNewLine = true;
        this.atScalar = false;
        this.indent = 0;
        this.offset = 0;
        this.onKeyLine = false;
        this.stack = [];
        this.source = "";
        this.type = "";
        this.lexer = new lexer.Lexer();
        this.onNewLine = onNewLine;
      }
      /**
       * Parse `source` as a YAML stream.
       * If `incomplete`, a part of the last line may be left as a buffer for the next call.
       *
       * Errors are not thrown, but yielded as `{ type: 'error', message }` tokens.
       *
       * @returns A generator of tokens representing each directive, document, and other structure.
       */
      *parse(source, incomplete = false) {
        if (this.onNewLine && this.offset === 0)
          this.onNewLine(0);
        for (const lexeme of this.lexer.lex(source, incomplete))
          yield* this.next(lexeme);
        if (!incomplete)
          yield* this.end();
      }
      /**
       * Advance the parser by the `source` of one lexical token.
       */
      *next(source) {
        this.source = source;
        if (node_process.env.LOG_TOKENS)
          console.log("|", cst.prettyToken(source));
        if (this.atScalar) {
          this.atScalar = false;
          yield* this.step();
          this.offset += source.length;
          return;
        }
        const type = cst.tokenType(source);
        if (!type) {
          const message = `Not a YAML token: ${source}`;
          yield* this.pop({ type: "error", offset: this.offset, message, source });
          this.offset += source.length;
        } else if (type === "scalar") {
          this.atNewLine = false;
          this.atScalar = true;
          this.type = "scalar";
        } else {
          this.type = type;
          yield* this.step();
          switch (type) {
            case "newline":
              this.atNewLine = true;
              this.indent = 0;
              if (this.onNewLine)
                this.onNewLine(this.offset + source.length);
              break;
            case "space":
              if (this.atNewLine && source[0] === " ")
                this.indent += source.length;
              break;
            case "explicit-key-ind":
            case "map-value-ind":
            case "seq-item-ind":
              if (this.atNewLine)
                this.indent += source.length;
              break;
            case "doc-mode":
            case "flow-error-end":
              return;
            default:
              this.atNewLine = false;
          }
          this.offset += source.length;
        }
      }
      /** Call at end of input to push out any remaining constructions */
      *end() {
        while (this.stack.length > 0)
          yield* this.pop();
      }
      get sourceToken() {
        const st = {
          type: this.type,
          offset: this.offset,
          indent: this.indent,
          source: this.source
        };
        return st;
      }
      *step() {
        const top = this.peek(1);
        if (this.type === "doc-end" && top?.type !== "doc-end") {
          while (this.stack.length > 0)
            yield* this.pop();
          this.stack.push({
            type: "doc-end",
            offset: this.offset,
            source: this.source
          });
          return;
        }
        if (!top)
          return yield* this.stream();
        switch (top.type) {
          case "document":
            return yield* this.document(top);
          case "alias":
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return yield* this.scalar(top);
          case "block-scalar":
            return yield* this.blockScalar(top);
          case "block-map":
            return yield* this.blockMap(top);
          case "block-seq":
            return yield* this.blockSequence(top);
          case "flow-collection":
            return yield* this.flowCollection(top);
          case "doc-end":
            return yield* this.documentEnd(top);
        }
        yield* this.pop();
      }
      peek(n) {
        return this.stack[this.stack.length - n];
      }
      *pop(error) {
        const token = error ?? this.stack.pop();
        if (!token) {
          const message = "Tried to pop an empty stack";
          yield { type: "error", offset: this.offset, source: "", message };
        } else if (this.stack.length === 0) {
          yield token;
        } else {
          const top = this.peek(1);
          if (token.type === "block-scalar") {
            token.indent = "indent" in top ? top.indent : 0;
          } else if (token.type === "flow-collection" && top.type === "document") {
            token.indent = 0;
          }
          if (token.type === "flow-collection")
            fixFlowSeqItems(token);
          switch (top.type) {
            case "document":
              top.value = token;
              break;
            case "block-scalar":
              top.props.push(token);
              break;
            case "block-map": {
              const it = top.items[top.items.length - 1];
              if (it.value) {
                top.items.push({ start: [], key: token, sep: [] });
                this.onKeyLine = true;
                return;
              } else if (it.sep) {
                it.value = token;
              } else {
                Object.assign(it, { key: token, sep: [] });
                this.onKeyLine = !it.explicitKey;
                return;
              }
              break;
            }
            case "block-seq": {
              const it = top.items[top.items.length - 1];
              if (it.value)
                top.items.push({ start: [], value: token });
              else
                it.value = token;
              break;
            }
            case "flow-collection": {
              const it = top.items[top.items.length - 1];
              if (!it || it.value)
                top.items.push({ start: [], key: token, sep: [] });
              else if (it.sep)
                it.value = token;
              else
                Object.assign(it, { key: token, sep: [] });
              return;
            }
            /* istanbul ignore next should not happen */
            default:
              yield* this.pop();
              yield* this.pop(token);
          }
          if ((top.type === "document" || top.type === "block-map" || top.type === "block-seq") && (token.type === "block-map" || token.type === "block-seq")) {
            const last = token.items[token.items.length - 1];
            if (last && !last.sep && !last.value && last.start.length > 0 && findNonEmptyIndex(last.start) === -1 && (token.indent === 0 || last.start.every((st) => st.type !== "comment" || st.indent < token.indent))) {
              if (top.type === "document")
                top.end = last.start;
              else
                top.items.push({ start: last.start });
              token.items.splice(-1, 1);
            }
          }
        }
      }
      *stream() {
        switch (this.type) {
          case "directive-line":
            yield { type: "directive", offset: this.offset, source: this.source };
            return;
          case "byte-order-mark":
          case "space":
          case "comment":
          case "newline":
            yield this.sourceToken;
            return;
          case "doc-mode":
          case "doc-start": {
            const doc = {
              type: "document",
              offset: this.offset,
              start: []
            };
            if (this.type === "doc-start")
              doc.start.push(this.sourceToken);
            this.stack.push(doc);
            return;
          }
        }
        yield {
          type: "error",
          offset: this.offset,
          message: `Unexpected ${this.type} token in YAML stream`,
          source: this.source
        };
      }
      *document(doc) {
        if (doc.value)
          return yield* this.lineEnd(doc);
        switch (this.type) {
          case "doc-start": {
            if (findNonEmptyIndex(doc.start) !== -1) {
              yield* this.pop();
              yield* this.step();
            } else
              doc.start.push(this.sourceToken);
            return;
          }
          case "anchor":
          case "tag":
          case "space":
          case "comment":
          case "newline":
            doc.start.push(this.sourceToken);
            return;
        }
        const bv = this.startBlockValue(doc);
        if (bv)
          this.stack.push(bv);
        else {
          yield {
            type: "error",
            offset: this.offset,
            message: `Unexpected ${this.type} token in YAML document`,
            source: this.source
          };
        }
      }
      *scalar(scalar) {
        if (this.type === "map-value-ind") {
          const prev = getPrevProps(this.peek(2));
          const start = getFirstKeyStartProps(prev);
          let sep;
          if (scalar.end) {
            sep = scalar.end;
            sep.push(this.sourceToken);
            delete scalar.end;
          } else
            sep = [this.sourceToken];
          const map = {
            type: "block-map",
            offset: scalar.offset,
            indent: scalar.indent,
            items: [{ start, key: scalar, sep }]
          };
          this.onKeyLine = true;
          this.stack[this.stack.length - 1] = map;
        } else
          yield* this.lineEnd(scalar);
      }
      *blockScalar(scalar) {
        switch (this.type) {
          case "space":
          case "comment":
          case "newline":
            scalar.props.push(this.sourceToken);
            return;
          case "scalar":
            scalar.source = this.source;
            this.atNewLine = true;
            this.indent = 0;
            if (this.onNewLine) {
              let nl = this.source.indexOf("\n") + 1;
              while (nl !== 0) {
                this.onNewLine(this.offset + nl);
                nl = this.source.indexOf("\n", nl) + 1;
              }
            }
            yield* this.pop();
            break;
          /* istanbul ignore next should not happen */
          default:
            yield* this.pop();
            yield* this.step();
        }
      }
      *blockMap(map) {
        const it = map.items[map.items.length - 1];
        switch (this.type) {
          case "newline":
            this.onKeyLine = false;
            if (it.value) {
              const end = "end" in it.value ? it.value.end : void 0;
              const last = Array.isArray(end) ? end[end.length - 1] : void 0;
              if (last?.type === "comment")
                end?.push(this.sourceToken);
              else
                map.items.push({ start: [this.sourceToken] });
            } else if (it.sep) {
              it.sep.push(this.sourceToken);
            } else {
              it.start.push(this.sourceToken);
            }
            return;
          case "space":
          case "comment":
            if (it.value) {
              map.items.push({ start: [this.sourceToken] });
            } else if (it.sep) {
              it.sep.push(this.sourceToken);
            } else {
              if (this.atIndentedComment(it.start, map.indent)) {
                const prev = map.items[map.items.length - 2];
                const end = prev?.value?.end;
                if (Array.isArray(end)) {
                  arrayPushArray(end, it.start);
                  end.push(this.sourceToken);
                  map.items.pop();
                  return;
                }
              }
              it.start.push(this.sourceToken);
            }
            return;
        }
        if (this.indent >= map.indent) {
          const atMapIndent = !this.onKeyLine && this.indent === map.indent;
          const atNextItem = atMapIndent && (it.sep || it.explicitKey) && this.type !== "seq-item-ind";
          let start = [];
          if (atNextItem && it.sep && !it.value) {
            const nl = [];
            for (let i = 0; i < it.sep.length; ++i) {
              const st = it.sep[i];
              switch (st.type) {
                case "newline":
                  nl.push(i);
                  break;
                case "space":
                  break;
                case "comment":
                  if (st.indent > map.indent)
                    nl.length = 0;
                  break;
                default:
                  nl.length = 0;
              }
            }
            if (nl.length >= 2)
              start = it.sep.splice(nl[1]);
          }
          switch (this.type) {
            case "anchor":
            case "tag":
              if (atNextItem || it.value) {
                start.push(this.sourceToken);
                map.items.push({ start });
                this.onKeyLine = true;
              } else if (it.sep) {
                it.sep.push(this.sourceToken);
              } else {
                it.start.push(this.sourceToken);
              }
              return;
            case "explicit-key-ind":
              if (!it.sep && !it.explicitKey) {
                it.start.push(this.sourceToken);
                it.explicitKey = true;
              } else if (atNextItem || it.value) {
                start.push(this.sourceToken);
                map.items.push({ start, explicitKey: true });
              } else {
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: [this.sourceToken], explicitKey: true }]
                });
              }
              this.onKeyLine = true;
              return;
            case "map-value-ind":
              if (it.explicitKey) {
                if (!it.sep) {
                  if (includesToken(it.start, "newline")) {
                    Object.assign(it, { key: null, sep: [this.sourceToken] });
                  } else {
                    const start2 = getFirstKeyStartProps(it.start);
                    this.stack.push({
                      type: "block-map",
                      offset: this.offset,
                      indent: this.indent,
                      items: [{ start: start2, key: null, sep: [this.sourceToken] }]
                    });
                  }
                } else if (it.value) {
                  map.items.push({ start: [], key: null, sep: [this.sourceToken] });
                } else if (includesToken(it.sep, "map-value-ind")) {
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start, key: null, sep: [this.sourceToken] }]
                  });
                } else if (isFlowToken(it.key) && !includesToken(it.sep, "newline")) {
                  const start2 = getFirstKeyStartProps(it.start);
                  const key = it.key;
                  const sep = it.sep;
                  sep.push(this.sourceToken);
                  delete it.key;
                  delete it.sep;
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: start2, key, sep }]
                  });
                } else if (start.length > 0) {
                  it.sep = it.sep.concat(start, this.sourceToken);
                } else {
                  it.sep.push(this.sourceToken);
                }
              } else {
                if (!it.sep) {
                  Object.assign(it, { key: null, sep: [this.sourceToken] });
                } else if (it.value || atNextItem) {
                  map.items.push({ start, key: null, sep: [this.sourceToken] });
                } else if (includesToken(it.sep, "map-value-ind")) {
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: [], key: null, sep: [this.sourceToken] }]
                  });
                } else {
                  it.sep.push(this.sourceToken);
                }
              }
              this.onKeyLine = true;
              return;
            case "alias":
            case "scalar":
            case "single-quoted-scalar":
            case "double-quoted-scalar": {
              const fs = this.flowScalar(this.type);
              if (atNextItem || it.value) {
                map.items.push({ start, key: fs, sep: [] });
                this.onKeyLine = true;
              } else if (it.sep) {
                this.stack.push(fs);
              } else {
                Object.assign(it, { key: fs, sep: [] });
                this.onKeyLine = true;
              }
              return;
            }
            default: {
              const bv = this.startBlockValue(map);
              if (bv) {
                if (bv.type === "block-seq") {
                  if (!it.explicitKey && it.sep && !includesToken(it.sep, "newline")) {
                    yield* this.pop({
                      type: "error",
                      offset: this.offset,
                      message: "Unexpected block-seq-ind on same line with key",
                      source: this.source
                    });
                    return;
                  }
                } else if (atMapIndent) {
                  map.items.push({ start });
                }
                this.stack.push(bv);
                return;
              }
            }
          }
        }
        yield* this.pop();
        yield* this.step();
      }
      *blockSequence(seq) {
        const it = seq.items[seq.items.length - 1];
        switch (this.type) {
          case "newline":
            if (it.value) {
              const end = "end" in it.value ? it.value.end : void 0;
              const last = Array.isArray(end) ? end[end.length - 1] : void 0;
              if (last?.type === "comment")
                end?.push(this.sourceToken);
              else
                seq.items.push({ start: [this.sourceToken] });
            } else
              it.start.push(this.sourceToken);
            return;
          case "space":
          case "comment":
            if (it.value)
              seq.items.push({ start: [this.sourceToken] });
            else {
              if (this.atIndentedComment(it.start, seq.indent)) {
                const prev = seq.items[seq.items.length - 2];
                const end = prev?.value?.end;
                if (Array.isArray(end)) {
                  arrayPushArray(end, it.start);
                  end.push(this.sourceToken);
                  seq.items.pop();
                  return;
                }
              }
              it.start.push(this.sourceToken);
            }
            return;
          case "anchor":
          case "tag":
            if (it.value || this.indent <= seq.indent)
              break;
            it.start.push(this.sourceToken);
            return;
          case "seq-item-ind":
            if (this.indent !== seq.indent)
              break;
            if (it.value || includesToken(it.start, "seq-item-ind"))
              seq.items.push({ start: [this.sourceToken] });
            else
              it.start.push(this.sourceToken);
            return;
        }
        if (this.indent > seq.indent) {
          const bv = this.startBlockValue(seq);
          if (bv) {
            this.stack.push(bv);
            return;
          }
        }
        yield* this.pop();
        yield* this.step();
      }
      *flowCollection(fc) {
        const it = fc.items[fc.items.length - 1];
        if (this.type === "flow-error-end") {
          let top;
          do {
            yield* this.pop();
            top = this.peek(1);
          } while (top?.type === "flow-collection");
        } else if (fc.end.length === 0) {
          switch (this.type) {
            case "comma":
            case "explicit-key-ind":
              if (!it || it.sep)
                fc.items.push({ start: [this.sourceToken] });
              else
                it.start.push(this.sourceToken);
              return;
            case "map-value-ind":
              if (!it || it.value)
                fc.items.push({ start: [], key: null, sep: [this.sourceToken] });
              else if (it.sep)
                it.sep.push(this.sourceToken);
              else
                Object.assign(it, { key: null, sep: [this.sourceToken] });
              return;
            case "space":
            case "comment":
            case "newline":
            case "anchor":
            case "tag":
              if (!it || it.value)
                fc.items.push({ start: [this.sourceToken] });
              else if (it.sep)
                it.sep.push(this.sourceToken);
              else
                it.start.push(this.sourceToken);
              return;
            case "alias":
            case "scalar":
            case "single-quoted-scalar":
            case "double-quoted-scalar": {
              const fs = this.flowScalar(this.type);
              if (!it || it.value)
                fc.items.push({ start: [], key: fs, sep: [] });
              else if (it.sep)
                this.stack.push(fs);
              else
                Object.assign(it, { key: fs, sep: [] });
              return;
            }
            case "flow-map-end":
            case "flow-seq-end":
              fc.end.push(this.sourceToken);
              return;
          }
          const bv = this.startBlockValue(fc);
          if (bv)
            this.stack.push(bv);
          else {
            yield* this.pop();
            yield* this.step();
          }
        } else {
          const parent = this.peek(2);
          if (parent.type === "block-map" && (this.type === "map-value-ind" && parent.indent === fc.indent || this.type === "newline" && !parent.items[parent.items.length - 1].sep)) {
            yield* this.pop();
            yield* this.step();
          } else if (this.type === "map-value-ind" && parent.type !== "flow-collection") {
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            fixFlowSeqItems(fc);
            const sep = fc.end.splice(1, fc.end.length);
            sep.push(this.sourceToken);
            const map = {
              type: "block-map",
              offset: fc.offset,
              indent: fc.indent,
              items: [{ start, key: fc, sep }]
            };
            this.onKeyLine = true;
            this.stack[this.stack.length - 1] = map;
          } else {
            yield* this.lineEnd(fc);
          }
        }
      }
      flowScalar(type) {
        if (this.onNewLine) {
          let nl = this.source.indexOf("\n") + 1;
          while (nl !== 0) {
            this.onNewLine(this.offset + nl);
            nl = this.source.indexOf("\n", nl) + 1;
          }
        }
        return {
          type,
          offset: this.offset,
          indent: this.indent,
          source: this.source
        };
      }
      startBlockValue(parent) {
        switch (this.type) {
          case "alias":
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return this.flowScalar(this.type);
          case "block-scalar-header":
            return {
              type: "block-scalar",
              offset: this.offset,
              indent: this.indent,
              props: [this.sourceToken],
              source: ""
            };
          case "flow-map-start":
          case "flow-seq-start":
            return {
              type: "flow-collection",
              offset: this.offset,
              indent: this.indent,
              start: this.sourceToken,
              items: [],
              end: []
            };
          case "seq-item-ind":
            return {
              type: "block-seq",
              offset: this.offset,
              indent: this.indent,
              items: [{ start: [this.sourceToken] }]
            };
          case "explicit-key-ind": {
            this.onKeyLine = true;
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            start.push(this.sourceToken);
            return {
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start, explicitKey: true }]
            };
          }
          case "map-value-ind": {
            this.onKeyLine = true;
            const prev = getPrevProps(parent);
            const start = getFirstKeyStartProps(prev);
            return {
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start, key: null, sep: [this.sourceToken] }]
            };
          }
        }
        return null;
      }
      atIndentedComment(start, indent) {
        if (this.type !== "comment")
          return false;
        if (this.indent <= indent)
          return false;
        return start.every((st) => st.type === "newline" || st.type === "space");
      }
      *documentEnd(docEnd) {
        if (this.type !== "doc-mode") {
          if (docEnd.end)
            docEnd.end.push(this.sourceToken);
          else
            docEnd.end = [this.sourceToken];
          if (this.type === "newline")
            yield* this.pop();
        }
      }
      *lineEnd(token) {
        switch (this.type) {
          case "comma":
          case "doc-start":
          case "doc-end":
          case "flow-seq-end":
          case "flow-map-end":
          case "map-value-ind":
            yield* this.pop();
            yield* this.step();
            break;
          case "newline":
            this.onKeyLine = false;
          // fallthrough
          case "space":
          case "comment":
          default:
            if (token.end)
              token.end.push(this.sourceToken);
            else
              token.end = [this.sourceToken];
            if (this.type === "newline")
              yield* this.pop();
        }
      }
    };
    exports.Parser = Parser;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/public-api.js
var require_public_api = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/public-api.js"(exports) {
    "use strict";
    init_esm_shims();
    var composer = require_composer();
    var Document = require_Document();
    var errors = require_errors2();
    var log = require_log();
    var identity = require_identity();
    var lineCounter = require_line_counter();
    var parser = require_parser();
    function parseOptions(options) {
      const prettyErrors = options.prettyErrors !== false;
      const lineCounter$1 = options.lineCounter || prettyErrors && new lineCounter.LineCounter() || null;
      return { lineCounter: lineCounter$1, prettyErrors };
    }
    function parseAllDocuments(source, options = {}) {
      const { lineCounter: lineCounter2, prettyErrors } = parseOptions(options);
      const parser$1 = new parser.Parser(lineCounter2?.addNewLine);
      const composer$1 = new composer.Composer(options);
      const docs = Array.from(composer$1.compose(parser$1.parse(source)));
      if (prettyErrors && lineCounter2)
        for (const doc of docs) {
          doc.errors.forEach(errors.prettifyError(source, lineCounter2));
          doc.warnings.forEach(errors.prettifyError(source, lineCounter2));
        }
      if (docs.length > 0)
        return docs;
      return Object.assign([], { empty: true }, composer$1.streamInfo());
    }
    function parseDocument(source, options = {}) {
      const { lineCounter: lineCounter2, prettyErrors } = parseOptions(options);
      const parser$1 = new parser.Parser(lineCounter2?.addNewLine);
      const composer$1 = new composer.Composer(options);
      let doc = null;
      for (const _doc of composer$1.compose(parser$1.parse(source), true, source.length)) {
        if (!doc)
          doc = _doc;
        else if (doc.options.logLevel !== "silent") {
          doc.errors.push(new errors.YAMLParseError(_doc.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
          break;
        }
      }
      if (prettyErrors && lineCounter2) {
        doc.errors.forEach(errors.prettifyError(source, lineCounter2));
        doc.warnings.forEach(errors.prettifyError(source, lineCounter2));
      }
      return doc;
    }
    function parse2(src, reviver, options) {
      let _reviver = void 0;
      if (typeof reviver === "function") {
        _reviver = reviver;
      } else if (options === void 0 && reviver && typeof reviver === "object") {
        options = reviver;
      }
      const doc = parseDocument(src, options);
      if (!doc)
        return null;
      doc.warnings.forEach((warning) => log.warn(doc.options.logLevel, warning));
      if (doc.errors.length > 0) {
        if (doc.options.logLevel !== "silent")
          throw doc.errors[0];
        else
          doc.errors = [];
      }
      return doc.toJS(Object.assign({ reviver: _reviver }, options));
    }
    function stringify(value, replacer, options) {
      let _replacer = null;
      if (typeof replacer === "function" || Array.isArray(replacer)) {
        _replacer = replacer;
      } else if (options === void 0 && replacer) {
        options = replacer;
      }
      if (typeof options === "string")
        options = options.length;
      if (typeof options === "number") {
        const indent = Math.round(options);
        options = indent < 1 ? void 0 : indent > 8 ? { indent: 8 } : { indent };
      }
      if (value === void 0) {
        const { keepUndefined } = options ?? replacer ?? {};
        if (!keepUndefined)
          return void 0;
      }
      if (identity.isDocument(value) && !_replacer)
        return value.toString(options);
      return new Document.Document(value, _replacer, options).toString(options);
    }
    exports.parse = parse2;
    exports.parseAllDocuments = parseAllDocuments;
    exports.parseDocument = parseDocument;
    exports.stringify = stringify;
  }
});

// node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/index.js
var require_dist = __commonJS({
  "node_modules/.pnpm/yaml@2.9.1/node_modules/yaml/dist/index.js"(exports) {
    "use strict";
    init_esm_shims();
    var composer = require_composer();
    var Document = require_Document();
    var Schema = require_Schema();
    var errors = require_errors2();
    var Alias = require_Alias();
    var identity = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var cst = require_cst();
    var lexer = require_lexer();
    var lineCounter = require_line_counter();
    var parser = require_parser();
    var publicApi = require_public_api();
    var visit = require_visit();
    exports.Composer = composer.Composer;
    exports.Document = Document.Document;
    exports.Schema = Schema.Schema;
    exports.YAMLError = errors.YAMLError;
    exports.YAMLParseError = errors.YAMLParseError;
    exports.YAMLWarning = errors.YAMLWarning;
    exports.Alias = Alias.Alias;
    exports.isAlias = identity.isAlias;
    exports.isCollection = identity.isCollection;
    exports.isDocument = identity.isDocument;
    exports.isMap = identity.isMap;
    exports.isNode = identity.isNode;
    exports.isPair = identity.isPair;
    exports.isScalar = identity.isScalar;
    exports.isSeq = identity.isSeq;
    exports.Pair = Pair.Pair;
    exports.Scalar = Scalar.Scalar;
    exports.YAMLMap = YAMLMap.YAMLMap;
    exports.YAMLSeq = YAMLSeq.YAMLSeq;
    exports.CST = cst;
    exports.Lexer = lexer.Lexer;
    exports.LineCounter = lineCounter.LineCounter;
    exports.Parser = parser.Parser;
    exports.parse = publicApi.parse;
    exports.parseAllDocuments = publicApi.parseAllDocuments;
    exports.parseDocument = publicApi.parseDocument;
    exports.stringify = publicApi.stringify;
    exports.visit = visit.visit;
    exports.visitAsync = visit.visitAsync;
  }
});

// src/validators/validator.ts
init_esm_shims();
var import_ajv = __toESM(require_ajv(), 1);

// src/validators/schemas/adversarial-review-report.schema.json
var adversarial_review_report_schema_default = {
  $id: "adversarial-review-report",
  type: "object",
  additionalProperties: false,
  required: [
    "point",
    "tier",
    "mode",
    "verdict",
    "summary",
    "findings",
    "dimensions_passed_clean",
    "dimensions_deferred"
  ],
  properties: {
    point: { type: "string", enum: ["after-spec", "after-implementation"] },
    tier: { type: "string", enum: ["full", "standard", "spot-check"] },
    mode: { type: "string", enum: ["fresh", "diff"] },
    verdict: { type: "string", enum: ["pass", "fail"] },
    summary: { type: "string" },
    findings: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "dimension", "severity", "finding", "impact", "required_action"],
        properties: {
          id: { type: "string" },
          dimension: { type: "string" },
          severity: { type: "string", enum: ["critical", "high", "medium", "low"] },
          finding: { type: "string" },
          impact: { type: "string" },
          required_action: { type: "string" }
        }
      }
    },
    dimensions_passed_clean: { type: "array", items: { type: "string" } },
    dimensions_deferred: { type: "array", items: { type: "string" } }
  }
};

// src/validators/schemas/api-endpoint-doc.schema.json
var api_endpoint_doc_schema_default = {
  $id: "api-endpoint-doc",
  type: "object",
  additionalProperties: false,
  required: [
    "method",
    "route",
    "auth",
    "description",
    "request_schema_ref",
    "response_schema_ref"
  ],
  properties: {
    method: { type: "string", enum: ["GET", "POST", "PUT", "PATCH", "DELETE"] },
    route: { type: "string", pattern: "^/" },
    auth: { type: "string", enum: ["required", "public"] },
    permissions: { type: "array", items: { type: "string" } },
    rate_limit: { type: "string" },
    description: { type: "string", minLength: 1 },
    request_schema_ref: { type: "string" },
    response_schema_ref: { type: "string" },
    error_codes_ref: { type: "string" },
    added_in: { type: "string" },
    last_updated: { type: "string" }
  }
};

// src/validators/schemas/compliance-pack.schema.json
var compliance_pack_schema_default = {
  $id: "compliance-pack",
  type: "object",
  additionalProperties: false,
  required: ["kind", "name", "framework", "disclaimer", "mappings"],
  properties: {
    kind: { const: "compliance-pack" },
    name: { type: "string", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" },
    description: { type: "string", minLength: 1 },
    maintainer: { type: "string", minLength: 1 },
    framework: {
      type: "object",
      additionalProperties: false,
      required: ["id", "title"],
      properties: {
        id: { type: "string", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" },
        title: { type: "string", minLength: 1 },
        authority_url: { type: "string", minLength: 1 },
        version: { type: "string", minLength: 1 }
      }
    },
    disclaimer: { type: "string", minLength: 1 },
    mappings: {
      type: "array",
      minItems: 1,
      items: { $ref: "#/$defs/mapping" }
    }
  },
  $defs: {
    mapping: {
      type: "object",
      additionalProperties: false,
      required: ["clause", "satisfied_by", "evidence_strength"],
      properties: {
        clause: {
          type: "object",
          additionalProperties: false,
          required: ["id", "title"],
          properties: {
            id: { type: "string", minLength: 1 },
            title: { type: "string", minLength: 1 },
            url: { type: "string", minLength: 1 }
          }
        },
        satisfied_by: {
          type: "array",
          minItems: 1,
          items: { $ref: "#/$defs/signal" }
        },
        evidence_strength: {
          type: "string",
          enum: ["partial", "substantial"]
        },
        reviewed_by: { type: "string", minLength: 1 }
      }
    },
    signal: {
      type: "object",
      additionalProperties: false,
      required: ["type", "ref", "relation"],
      properties: {
        type: { type: "string", enum: ["gate", "obligation_category"] },
        ref: { type: "string", minLength: 1 },
        relation: {
          type: "string",
          enum: [
            "equivalent-to",
            "equal-to",
            "subset-of",
            "superset-of",
            "intersects-with",
            "no-relationship"
          ]
        }
      }
    }
  }
};

// src/validators/schemas/context-hit-log.schema.json
var context_hit_log_schema_default = {
  $id: "context-hit-log",
  type: "object",
  additionalProperties: false,
  required: [
    "session_id",
    "phase",
    "files_loaded",
    "files_referenced",
    "hit_rate",
    "unreferenced_files",
    "timestamp"
  ],
  properties: {
    session_id: { type: "string" },
    phase: { type: "string" },
    story: { type: "string" },
    files_loaded: { type: "integer", minimum: 0 },
    files_referenced: { type: "integer", minimum: 0 },
    hit_rate: { type: "number", minimum: 0, maximum: 1 },
    unreferenced_files: { type: "array", items: { type: "string" } },
    timestamp: { type: "string", format: "date-time" }
  }
};

// src/validators/schemas/detection-report.schema.json
var detection_report_schema_default = {
  $id: "detection-report",
  type: "object",
  additionalProperties: false,
  required: [
    "detected_domain",
    "detected_stack",
    "detected_capabilities",
    "confidence",
    "signals",
    "timestamp"
  ],
  properties: {
    detected_domain: { type: ["string", "null"], enum: ["coding", "content", null] },
    detected_stack: {
      type: ["string", "null"],
      enum: [
        "laravel",
        "flutter",
        "react",
        "vue",
        "django",
        "fastapi",
        "rails",
        "spring-boot",
        "express",
        "angular",
        "svelte",
        "astro",
        "go-web",
        "rust-web",
        "dotnet",
        "nextjs",
        "flask",
        "nestjs",
        "kotlin-android",
        "short-video",
        "node-cli",
        "node-library",
        "node-service",
        null
      ]
    },
    detected_capabilities: {
      type: "array",
      items: {
        type: "string",
        enum: [
          "inertia",
          "vue",
          "react",
          "tailwind",
          "boost",
          "pest",
          "phpunit",
          "docker",
          "compose",
          "sail",
          "next",
          "remix",
          "vite-spa",
          "gatsby",
          "nuxt",
          "quasar",
          "blazor",
          "ef-core",
          "minimal-api",
          "mvc",
          "razor-pages",
          "signalr",
          "azure",
          "identity",
          "app-router",
          "pages-router",
          "prisma",
          "trpc",
          "next-auth",
          "sqlalchemy",
          "celery",
          "blueprints",
          "flask-login",
          "flask-restx",
          "gunicorn",
          "typeorm",
          "graphql",
          "microservices",
          "swagger",
          "passport",
          "fastify",
          "jetpack-compose",
          "room",
          "hilt",
          "retrofit",
          "coroutines",
          "navigation",
          "datastore"
        ]
      }
    },
    matched_packs: {
      type: "array",
      items: { type: "string" }
    },
    detected_traits: {
      type: "array",
      items: { type: "string" }
    },
    recommended_capabilities: {
      type: "array",
      items: {
        type: "string",
        enum: ["content", "coding", "security"]
      }
    },
    detection_phase: {
      type: "string",
      enum: ["framework", "archetype", "none"]
    },
    confidence: { type: "string", enum: ["high", "medium", "low"] },
    confidence_score: { type: "number", minimum: 0, maximum: 1 },
    primary_language: { type: ["string", "null"] },
    source: { type: "string", enum: ["ai", "static"] },
    signals: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["signal", "file", "implies", "confidence"],
        properties: {
          signal: { type: "string" },
          file: { type: "string" },
          implies: { type: "string" },
          confidence: { type: "string", enum: ["high", "medium", "low"] }
        }
      }
    },
    timestamp: { type: "string" },
    repository: {
      type: "object",
      additionalProperties: false,
      required: [
        "selected_root",
        "scan_max_depth",
        "ignored_paths",
        "projects",
        "applications",
        "primary_project_root"
      ],
      properties: {
        selected_root: { type: "string" },
        scan_max_depth: { type: "integer" },
        ignored_paths: { type: "array", items: { type: "string" } },
        primary_project_root: { type: ["string", "null"] },
        projects: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["root", "role", "parent_root", "markers", "ecosystems"],
            properties: {
              root: { type: "string" },
              role: { type: "string", enum: ["standalone", "component"] },
              parent_root: { type: ["string", "null"] },
              markers: { type: "array", items: { type: "string" } },
              ecosystems: {
                type: "array",
                items: {
                  type: "string",
                  enum: ["node", "php", "python", "ruby", "jvm", "go", "rust", "dart", "dotnet"]
                }
              }
            }
          }
        },
        applications: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["root", "component_roots"],
            properties: {
              root: { type: "string" },
              component_roots: { type: "array", items: { type: "string" } }
            }
          }
        }
      }
    }
  }
};

// src/validators/schemas/design-tokens.schema.json
var design_tokens_schema_default = {
  $id: "design-tokens",
  type: "object",
  patternProperties: {
    "^\\$": { type: "string" }
  },
  additionalProperties: {
    $ref: "#/$defs/node"
  },
  $defs: {
    leaf: {
      type: "object",
      required: ["$value", "$type"],
      properties: {
        $value: {},
        $type: { type: "string" },
        $description: { type: "string" }
      },
      additionalProperties: true
    },
    group: {
      type: "object",
      minProperties: 1,
      additionalProperties: {
        $ref: "#/$defs/node"
      }
    },
    node: {
      anyOf: [{ $ref: "#/$defs/leaf" }, { $ref: "#/$defs/group" }]
    }
  }
};

// src/validators/schemas/doc-progress.schema.json
var doc_progress_schema_default = {
  $id: "doc-progress",
  type: "object",
  required: ["schema_version", "generated_by", "framework_version", "modules", "global"],
  properties: {
    schema_version: { const: "1" },
    generated_by: { const: "paqad-ai" },
    framework_version: { type: "string" },
    modules: {
      type: "object",
      additionalProperties: {
        type: "object",
        additionalProperties: { $ref: "#/$defs/entry" }
      }
    },
    global: {
      type: "object",
      additionalProperties: {
        type: "object",
        additionalProperties: { $ref: "#/$defs/entry" }
      }
    },
    moduleDocStage: {
      enum: ["pending_map_review", "complete"]
    }
  },
  $defs: {
    state: {
      enum: ["not_started", "generating", "done", "failed"]
    },
    entry: {
      type: "object",
      required: [
        "output_path",
        "state",
        "started_at",
        "completed_at",
        "source_files",
        "source_hash",
        "tokens_used",
        "error"
      ],
      properties: {
        output_path: { type: "string" },
        state: { $ref: "#/$defs/state" },
        started_at: { type: ["string", "null"] },
        completed_at: { type: ["string", "null"] },
        source_files: {
          type: "array",
          items: { type: "string" }
        },
        source_hash: { type: ["string", "null"] },
        tokens_used: { type: ["number", "null"] },
        error: { type: ["string", "null"] },
        design_tokens: {
          type: "object",
          required: [
            "extraction_state",
            "total_tokens_found",
            "placeholder_count",
            "populated_count",
            "placeholder_keys"
          ],
          properties: {
            extraction_state: { $ref: "#/$defs/state" },
            total_tokens_found: { type: "number" },
            placeholder_count: { type: "number" },
            populated_count: { type: "number" },
            placeholder_keys: {
              type: "array",
              items: { type: "string" }
            }
          },
          additionalProperties: false
        }
      },
      additionalProperties: false
    }
  },
  additionalProperties: false
};

// src/validators/schemas/error-catalog.schema.json
var error_catalog_schema_default = {
  $id: "error-catalog",
  type: "object",
  additionalProperties: false,
  required: ["code", "user_message", "trigger", "recovery_path", "retry_safe"],
  properties: {
    code: { type: "string", pattern: "^[A-Z]{2,5}-[0-9]{3}$" },
    http_status: { type: "integer", minimum: 400, maximum: 599 },
    user_message: { type: "string", minLength: 1 },
    internal_message: { type: "string" },
    trigger: { type: "string", minLength: 1 },
    recovery_path: { type: "string", minLength: 1 },
    retry_safe: { type: "boolean" },
    logged: { type: "boolean" },
    alerted: { type: "boolean" },
    added_in: { type: "string" },
    last_updated: { type: "string" }
  }
};

// src/validators/schemas/feature-development-policy.schema.json
var feature_development_policy_schema_default = {
  $id: "feature-development-policy",
  type: "object",
  additionalProperties: false,
  required: ["schema_version", "stages"],
  properties: {
    schema_version: { type: "string", const: "1" },
    merge_mode: { type: "string", enum: ["append"] },
    rounds: {
      type: "object",
      description: "Issue #108 \u2014 per-lane build-check-fix loop round caps. Omitted lanes use the framework defaults (fast 2, graduated 3, full 5).",
      additionalProperties: false,
      properties: {
        fast: { type: "integer", minimum: 1 },
        graduated: { type: "integer", minimum: 1 },
        full: { type: "integer", minimum: 1 }
      }
    },
    stages: {
      type: "object",
      additionalProperties: false,
      properties: {
        ticket_intake: { $ref: "#/$defs/stagePolicy" },
        planning: { $ref: "#/$defs/stagePolicy" },
        specification: { $ref: "#/$defs/stagePolicy" },
        development: { $ref: "#/$defs/stagePolicy" },
        review: { $ref: "#/$defs/stagePolicy" },
        checks: { $ref: "#/$defs/stagePolicy" },
        documentation_sync: { $ref: "#/$defs/stagePolicy" },
        delivery: { $ref: "#/$defs/stagePolicy" }
      }
    }
  },
  $defs: {
    stagePolicy: {
      type: "object",
      additionalProperties: false,
      properties: {
        read: {
          type: "array",
          items: { type: "string" }
        },
        instructions: {
          type: "array",
          items: { type: "string" }
        },
        required_inputs: {
          type: "array",
          items: { type: "string" }
        },
        strictness: {
          type: "object",
          additionalProperties: { type: "boolean" }
        },
        escalation: {
          type: "object",
          additionalProperties: {
            type: "string",
            enum: ["warn", "ask", "stop", "defer"]
          }
        },
        artifacts: {
          type: "array",
          items: { type: "string" }
        },
        attribution_gate: {
          type: "object",
          additionalProperties: false,
          properties: {
            pipeline: {
              type: "array",
              items: {
                type: "object",
                additionalProperties: true
              }
            }
          }
        },
        checks: {
          type: "object",
          additionalProperties: false,
          properties: {
            use_project_profile_commands: { type: "boolean" },
            commands: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "install",
                  "dev",
                  "test",
                  "test_single",
                  "lint",
                  "format",
                  "migrate",
                  "build"
                ]
              }
            },
            shell_commands: {
              type: "array",
              items: { type: "string" }
            },
            block_on_failure: { type: "boolean" }
          }
        },
        module_health_rollup: {
          type: "object",
          additionalProperties: false,
          properties: {
            enabled: { type: "boolean" },
            command: { type: "string" },
            escalation: {
              type: "string",
              enum: ["warn", "ask", "stop", "defer"]
            }
          }
        },
        rule_compliance: {
          type: "object",
          description: "Rules-as-scripts gate (issue #89). Declared on the shared stagePolicy for schema simplicity, but the default policy renders it only on the `checks` stage.",
          additionalProperties: false,
          properties: {
            enabled: { type: "boolean" },
            mode: { type: "string", enum: ["off", "warn", "strict"] },
            scope: { type: "string", enum: ["changed-files", "whole-tree"] },
            diff_scope: { type: "boolean" },
            cache_path: { type: "string" },
            escalation: {
              type: "string",
              enum: ["warn", "ask", "stop", "defer"]
            }
          }
        }
      }
    }
  }
};

// src/validators/schemas/feature-spec.schema.json
var feature_spec_schema_default = {
  $id: "feature-spec",
  type: "object",
  additionalProperties: false,
  required: [
    "schema_version",
    "spec_id",
    "spec_file",
    "spec_hash",
    "behaviour",
    "acceptance_criteria",
    "invariants",
    "open_questions",
    "frozen"
  ],
  properties: {
    schema_version: { type: "string" },
    spec_id: { type: "string", pattern: "^S-[A-Za-z0-9-]+$" },
    spec_file: { type: "string", minLength: 1 },
    spec_hash: { type: "string", minLength: 1 },
    behaviour: {
      type: "array",
      items: { type: "string", minLength: 1 }
    },
    acceptance_criteria: {
      type: "array",
      items: { $ref: "#/$defs/verificationCriterion" }
    },
    invariants: {
      type: "array",
      items: { $ref: "#/$defs/invariant" }
    },
    open_questions: {
      type: "array",
      items: { type: "string", minLength: 1 }
    },
    frozen: {
      oneOf: [{ type: "null" }, { $ref: "#/$defs/frozenMetadata" }]
    },
    spec_review: { $ref: "#/$defs/specReviewSummary" },
    non_goals: {
      type: "array",
      items: { type: "string", minLength: 1 }
    }
  },
  $defs: {
    specReviewSummary: {
      type: "object",
      additionalProperties: false,
      required: ["reviewed_at", "defect_count", "by_severity"],
      properties: {
        reviewed_at: { type: "string", format: "date-time" },
        defect_count: { type: "integer", minimum: 0 },
        by_severity: {
          type: "object",
          additionalProperties: false,
          required: ["critical", "major", "minor"],
          properties: {
            critical: { type: "integer", minimum: 0 },
            major: { type: "integer", minimum: 0 },
            minor: { type: "integer", minimum: 0 }
          }
        }
      }
    },
    verificationCase: {
      type: "object",
      additionalProperties: false,
      required: ["input", "expected_behavior"],
      properties: {
        input: { type: "string" },
        expected_behavior: { type: "string" }
      }
    },
    verificationCriterion: {
      type: "object",
      additionalProperties: false,
      required: [
        "criterion_id",
        "given",
        "when",
        "then",
        "proof_type",
        "status",
        "source",
        "linked_requirement_ids"
      ],
      properties: {
        criterion_id: { type: "string", pattern: "^AC-\\d+$" },
        given: { type: "string" },
        when: { type: "string" },
        then: { type: "string" },
        proof_type: { type: "string", enum: ["automated", "manual", "visual"] },
        proof_target: { type: "string" },
        negative_cases: { type: "array", items: { $ref: "#/$defs/verificationCase" } },
        edge_cases: { type: "array", items: { $ref: "#/$defs/verificationCase" } },
        adversarial_cases: { type: "array", items: { $ref: "#/$defs/verificationCase" } },
        status: {
          type: "string",
          enum: ["uncovered", "covered", "partial", "indeterminate"]
        },
        source: {
          type: "string",
          enum: ["planned", "compiled-rule", "defect-pattern", "contract-boundary", "inherited"]
        },
        linked_requirement_ids: { type: "array", items: { type: "string" } },
        rule_id: { type: "string" },
        pattern_id: { type: "string" }
      }
    },
    invariant: {
      type: "object",
      additionalProperties: false,
      required: ["invariant_id", "statement", "source", "confirmed"],
      properties: {
        invariant_id: { type: "string", pattern: "^INV-\\d+$" },
        statement: { type: "string", minLength: 1 },
        source: { type: "string", enum: ["compiled-rule", "module-rule", "authored"] },
        rule_id: { type: "string" },
        confirmed: { type: "boolean" }
      }
    },
    frozenMetadata: {
      type: "object",
      additionalProperties: false,
      required: ["frozen_at", "spec_hash", "signed_off_by"],
      properties: {
        frozen_at: { type: "string", format: "date-time" },
        spec_hash: { type: "string", minLength: 1 },
        signed_off_by: { type: "string", minLength: 1 }
      }
    }
  }
};

// src/validators/schemas/gate-result.schema.json
var gate_result_schema_default = {
  $id: "gate-result",
  type: "object",
  additionalProperties: false,
  required: ["gate", "passed", "detail"],
  properties: {
    gate: { type: "string" },
    passed: { type: "boolean" },
    detail: { type: "string" },
    remediation: { type: "string" }
  }
};

// src/validators/schemas/git-workflow/branches.schema.json
var branches_schema_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "git-workflow-branches",
  title: "branches.yaml",
  description: "How branches are named and where changes start.",
  type: "object",
  additionalProperties: true,
  properties: {
    schema_version: { type: "integer", minimum: 1 },
    paqad_version: { type: "string" },
    base_branch: { type: "string", minLength: 1 },
    template: { type: "string", minLength: 1 },
    slug_max_length: { type: "integer", minimum: 1 },
    types: {
      type: "object",
      additionalProperties: {
        type: "object",
        additionalProperties: true,
        properties: {
          prefix: { type: "string", minLength: 1 },
          commit_type: { type: "string", minLength: 1 },
          tickets: { type: "array", items: { type: "string" } },
          ticket_types: { type: "array", items: { type: "string" } },
          base_branch: { type: "string", minLength: 1 },
          labels: { type: "array", items: { type: "string" } },
          template: { type: "string", minLength: 1 }
        }
      }
    },
    default_type: { type: "string", minLength: 1 }
  }
};

// src/validators/schemas/git-workflow/commits.schema.json
var commits_schema_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "git-workflow-commits",
  title: "commits.yaml",
  description: "How commit messages are written.",
  type: "object",
  additionalProperties: true,
  properties: {
    schema_version: { type: "integer", minimum: 1 },
    paqad_version: { type: "string" },
    template: { type: "string", minLength: 1 },
    sign_off: { type: "boolean" },
    ask_when_unspecified: { type: "boolean" },
    ai_attribution: { type: "string", enum: ["keep", "strip"] },
    summary: {
      type: "object",
      additionalProperties: true,
      properties: {
        style: { type: "string", enum: ["plain", "free"] },
        max_length: { type: "integer", minimum: 1 }
      }
    }
  }
};

// src/validators/schemas/git-workflow/design-sign-off.schema.json
var design_sign_off_schema_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "git-workflow-design-sign-off",
  title: "design-sign-off.yaml",
  description: "A short, plain-language design of each change for the team to sign off before any code is written.",
  type: "object",
  additionalProperties: false,
  properties: {
    schema_version: { type: "integer", minimum: 1 },
    paqad_version: { type: "string" },
    enabled: { type: "boolean" },
    lanes: {
      type: "array",
      items: { type: "string", enum: ["graduated", "full"] },
      uniqueItems: true
    },
    approval_channel: {
      type: "object",
      additionalProperties: false,
      properties: {
        server: { type: "string" },
        channel: { type: "string" }
      }
    },
    format: {
      type: "object",
      additionalProperties: false,
      properties: {
        summary_max_words: { type: "integer", minimum: 1 },
        detail_max_words: { type: "integer", minimum: 1 }
      }
    },
    wait_for_approval: { type: "boolean" },
    approve_by: { type: "string", enum: ["reply", "status", "either"] },
    approve_words: { type: "array", items: { type: "string", minLength: 1 } },
    approvers: { type: "array", items: { type: "string" } },
    move_to_on_post: { type: "string" },
    approved_status: { type: "string" },
    allow_skip_with_reason: { type: "boolean" }
  }
};

// src/validators/schemas/git-workflow/enforcement.schema.json
var enforcement_schema_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "git-workflow-enforcement",
  title: "enforcement.yaml",
  description: "How strictly paqad holds everyone to these rules.",
  type: "object",
  additionalProperties: true,
  properties: {
    schema_version: { type: "integer", minimum: 1 },
    paqad_version: { type: "string" },
    enabled: { type: "boolean" },
    agents: { type: "string", enum: ["warn", "block"] },
    people: { type: "string", enum: ["warn", "block", "off"] }
  }
};

// src/validators/schemas/git-workflow/pull-requests.schema.json
var pull_requests_schema_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "git-workflow-pull-requests",
  title: "pull-requests.yaml",
  description: "How pull requests are opened.",
  type: "object",
  additionalProperties: true,
  properties: {
    schema_version: { type: "integer", minimum: 1 },
    paqad_version: { type: "string" },
    host: { type: "string", enum: ["github"] },
    host_server: { type: "string" },
    title_template: { type: "string", minLength: 1 },
    body_template: { type: "string", minLength: 1 },
    draft: { type: "boolean" },
    reviewers: { type: "array", items: { type: "string" } },
    labels: { type: "array", items: { type: "string" } },
    link_ticket: { type: "boolean" },
    also_open_against: { type: "array", items: { type: "string" } },
    ci: {
      type: "object",
      additionalProperties: true,
      properties: {
        gate: { type: "string", enum: ["wait_for_green", "warn_only", "off"] },
        timeout_minutes: { type: "integer", minimum: 1 },
        on_red: { type: "string", enum: ["stop", "comment_and_stop"] }
      }
    }
  }
};

// src/validators/schemas/git-workflow/tickets.schema.json
var tickets_schema_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "git-workflow-tickets",
  title: "tickets.yaml",
  description: "Where this team's tickets come from and how they move.",
  type: "object",
  additionalProperties: true,
  properties: {
    schema_version: { type: "integer", minimum: 1 },
    paqad_version: { type: "string" },
    require_ticket: { type: "boolean" },
    sources: {
      type: "object",
      additionalProperties: {
        type: "object",
        additionalProperties: true,
        required: ["tracker"],
        properties: {
          tracker: {
            type: "string",
            enum: ["jira", "servicenow", "github-issues", "linear", "generic"]
          },
          pattern: { type: "string", minLength: 1 },
          server: { type: "string" },
          transitions: {
            type: "object",
            additionalProperties: true,
            properties: {
              on_pr_open: { type: "string" },
              on_ci_green: { type: "string" }
            }
          }
        }
      }
    },
    write_back_refined: { type: "string", enum: ["never", "ask", "always"] },
    intake_decisions: {
      type: "object",
      additionalProperties: true,
      properties: {
        auto_resolve_from_priors: { type: "boolean" },
        auto_resolve_from_rules: { type: "boolean" },
        confirm_auto_resolutions: { type: "string", enum: ["always", "batched", "never"] },
        max_options_per_packet: { type: "integer", minimum: 1 },
        fingerprint_scope: { type: "array", items: { type: "string" } }
      }
    }
  }
};

// src/validators/schemas/handoff-artifact.schema.json
var handoff_artifact_schema_default = {
  $id: "handoff-artifact",
  type: "object",
  additionalProperties: false,
  required: [
    "framework_version",
    "workflow",
    "current_phase",
    "current_story",
    "completed_stories",
    "key_decisions",
    "verification_results",
    "changed_files",
    "context_hit_rate",
    "warnings",
    "unresolved_items",
    "closure_summary",
    "references"
  ],
  properties: {
    framework_version: { type: "string" },
    workflow: { type: "string" },
    current_phase: { type: "string" },
    current_story: {
      anyOf: [
        { type: "null" },
        {
          type: "object",
          additionalProperties: false,
          required: ["id", "title"],
          properties: { id: { type: "string" }, title: { type: "string" } }
        }
      ]
    },
    completed_stories: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "title", "verification_status"],
        properties: {
          id: { type: "string" },
          title: { type: "string" },
          verification_status: { type: "string", enum: ["passed", "failed", "partial"] }
        }
      }
    },
    key_decisions: { type: "array", items: { type: "string" } },
    verification_results: { type: "array", items: { $ref: "gate-result" } },
    changed_files: { type: "array", items: { type: "string" } },
    context_hit_rate: { type: "number" },
    warnings: { type: "array", items: { type: "string" } },
    unresolved_items: { type: "array", items: { type: "string" } },
    closure_summary: {
      type: "object",
      additionalProperties: false,
      required: [
        "code_changed",
        "test_evidence_changed",
        "canonical_docs_changed",
        "blocked",
        "primary_blocking_reason",
        "summary"
      ],
      properties: {
        code_changed: { type: "boolean" },
        test_evidence_changed: { type: "boolean" },
        canonical_docs_changed: { type: "boolean" },
        blocked: { type: "boolean" },
        primary_blocking_reason: {
          anyOf: [{ type: "null" }, { type: "string" }]
        },
        summary: { type: "string" }
      }
    },
    references: {
      type: "object",
      additionalProperties: false,
      required: ["spec", "flow", "review_report"],
      properties: {
        spec: { type: "string" },
        flow: { type: "string" },
        review_report: { type: "string" }
      }
    }
  }
};

// src/validators/schemas/integration-doc.schema.json
var integration_doc_schema_default = {
  $id: "integration-doc",
  type: "object",
  additionalProperties: false,
  required: ["event_class", "published_by", "subscribers", "async"],
  properties: {
    event_class: { type: "string", minLength: 1 },
    published_by: { type: "string", minLength: 1 },
    payload_fields: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "type", "description"],
        properties: {
          name: { type: "string" },
          type: { type: "string" },
          description: { type: "string" }
        }
      }
    },
    subscribers: { type: "array", items: { type: "string" } },
    async: { type: "boolean" },
    added_in: { type: "string" }
  }
};

// src/validators/schemas/onboarding-manifest.schema.json
var onboarding_manifest_schema_default = {
  $id: "onboarding-manifest",
  type: "object",
  additionalProperties: false,
  required: [
    "adapter",
    "project_root",
    "profile",
    "detected",
    "repository",
    "generated_at",
    "generated_artifacts"
  ],
  properties: {
    framework_version: { type: "string" },
    adapter: {
      type: "string",
      enum: [
        "claude-code",
        "codex-cli",
        "antigravity",
        "gemini-cli",
        "junie",
        "cursor",
        "github-copilot",
        "windsurf",
        "continue",
        "aider",
        "aiassistant"
      ]
    },
    providers: {
      type: "array",
      items: {
        type: "string",
        enum: [
          "claude-code",
          "codex-cli",
          "antigravity",
          "gemini-cli",
          "junie",
          "cursor",
          "github-copilot",
          "windsurf",
          "continue",
          "aider",
          "aiassistant"
        ]
      }
    },
    project_root: { type: "string" },
    profile: { $ref: "project-profile" },
    detected: { anyOf: [{ $ref: "detection-report" }, { type: "null" }] },
    repository: {
      anyOf: [{ $ref: "detection-report#/properties/repository" }, { type: "null" }]
    },
    generated_at: { type: "string" },
    generated_artifacts: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["path", "auto_update"],
        properties: {
          path: { type: "string" },
          auto_update: { type: "boolean" },
          executable: { type: "boolean" }
        }
      }
    },
    planning_artifacts: {
      type: "object",
      additionalProperties: false,
      required: ["compiled_rules_path", "module_health_initialized"],
      properties: {
        compiled_rules_path: { type: "string" },
        classifier_config_path: { type: "string" },
        module_health_initialized: {
          type: "array",
          items: { type: "string" }
        }
      }
    }
  }
};

// src/validators/schemas/pentest-progress.schema.json
var pentest_progress_schema_default = {
  $id: "pentest-progress",
  type: "object",
  additionalProperties: false,
  required: [
    "schema_version",
    "generated_by",
    "framework_version",
    "run_id",
    "workflow",
    "status",
    "started_at",
    "updated_at",
    "report_path",
    "sidecar_path",
    "target_url",
    "source_report_path",
    "steps",
    "skill_invocations",
    "script_artifacts",
    "current_finding_ids"
  ],
  properties: {
    schema_version: { const: "1" },
    generated_by: { const: "paqad-ai" },
    framework_version: { type: "string", minLength: 1 },
    run_id: { type: "string", minLength: 1 },
    workflow: { type: "string", enum: ["pentest", "pentest-retest"] },
    status: { type: "string", enum: ["running", "completed", "blocked", "failed"] },
    started_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
    report_path: { type: ["string", "null"] },
    sidecar_path: { type: ["string", "null"] },
    target_url: { type: ["string", "null"] },
    source_report_path: { type: ["string", "null"] },
    steps: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: [
          "id",
          "title",
          "status",
          "input_hash",
          "artifact_paths",
          "skill_names",
          "error",
          "started_at",
          "completed_at"
        ],
        properties: {
          id: { type: "string", minLength: 1 },
          title: { type: "string", minLength: 1 },
          status: {
            type: "string",
            enum: ["not_started", "running", "completed", "blocked", "failed"]
          },
          input_hash: { type: ["string", "null"] },
          artifact_paths: { type: "array", items: { type: "string" } },
          skill_names: { type: "array", items: { type: "string" } },
          error: { type: ["string", "null"] },
          started_at: { type: ["string", "null"], format: "date-time" },
          completed_at: { type: ["string", "null"], format: "date-time" }
        }
      }
    },
    skill_invocations: { type: "array", items: { type: "string" } },
    script_artifacts: { type: "array", items: { type: "string" } },
    current_finding_ids: { type: "array", items: { type: "string" } },
    incremental_type: { type: "string", enum: ["full", "incremental"] },
    git_commit: { type: "string" },
    file_hashes: { type: "object", additionalProperties: { type: "string" } }
  }
};

// src/validators/schemas/pentest-report.schema.json
var pentest_report_schema_default = {
  $id: "pentest-report",
  type: "object",
  additionalProperties: false,
  required: [
    "schema_version",
    "generated_by",
    "framework_version",
    "report_id",
    "workflow",
    "generated_at",
    "report_path",
    "sidecar_path",
    "source_report_path",
    "source_report_id",
    "stack",
    "runtime",
    "coverage",
    "findings",
    "blocked_checks",
    "sources_used",
    "methodology",
    "next_remediation_priorities",
    "raw_evidence_paths"
  ],
  properties: {
    schema_version: { const: "1" },
    generated_by: { const: "paqad-ai" },
    framework_version: { type: "string", minLength: 1 },
    report_id: { type: "string", minLength: 1 },
    workflow: { type: "string", enum: ["pentest", "pentest-retest"] },
    generated_at: { type: "string", format: "date-time" },
    report_path: { type: "string", minLength: 1 },
    sidecar_path: { type: "string", minLength: 1 },
    source_report_path: { type: ["string", "null"] },
    source_report_id: { type: ["string", "null"] },
    stack: {
      type: "object",
      additionalProperties: false,
      required: ["primary", "traits", "toolchains"],
      properties: {
        primary: { type: "string", minLength: 1 },
        traits: { type: "array", items: { type: "string" } },
        toolchains: { type: "array", items: { type: "string" } }
      }
    },
    runtime: {
      type: "object",
      additionalProperties: false,
      required: ["target_url", "status", "detail"],
      properties: {
        target_url: { type: ["string", "null"] },
        status: {
          type: "string",
          enum: ["reachable", "unreachable", "not-configured", "blocked"]
        },
        detail: { type: "string", minLength: 1 }
      }
    },
    coverage: {
      type: "object",
      additionalProperties: false,
      required: ["docs", "tests", "code", "runtime", "database", "blocked_checks"],
      properties: {
        docs: { type: "boolean" },
        tests: { type: "boolean" },
        code: { type: "boolean" },
        runtime: { type: "boolean" },
        database: { type: "boolean" },
        blocked_checks: { type: "array", items: { type: "string" } }
      }
    },
    findings: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: true,
        required: [
          "id",
          "title",
          "description",
          "impact",
          "effort",
          "possible_solution_direction",
          "how_to_reproduce",
          "impact_area",
          "evidence",
          "category",
          "status",
          "confidence",
          "source_types",
          "affected_modules",
          "affected_packages",
          "runtime_required",
          "manual_follow_up"
        ],
        properties: {
          id: { type: "string", minLength: 1 },
          title: { type: "string", minLength: 1 },
          description: { type: "string", minLength: 1 },
          impact: { type: "string", enum: ["high", "medium", "low"] },
          effort: { type: "string", enum: ["low", "medium", "high"] },
          possible_solution_direction: { type: "string", minLength: 1 },
          how_to_reproduce: { type: "array", items: { type: "string" } },
          impact_area: { type: "array", items: { type: "string" } },
          evidence: { type: "array", items: { type: "string" } },
          category: { type: "string", minLength: 1 },
          status: {
            type: "string",
            enum: ["open", "coverage-gap", "fixed", "still-open", "needs-manual-verification"]
          },
          confidence: { type: "number", minimum: 0, maximum: 1 },
          source_types: {
            type: "array",
            items: { type: "string", enum: ["docs", "tests", "code", "runtime", "advisory"] }
          },
          affected_modules: { type: "array", items: { type: "string" } },
          affected_packages: { type: "array", items: { type: "string" } },
          runtime_required: { type: "boolean" },
          manual_follow_up: { type: "boolean" },
          retest_status: {
            type: "string",
            enum: ["fixed", "still-open", "needs-manual-verification"]
          }
        }
      }
    },
    blocked_checks: { type: "array", items: { type: "string" } },
    sources_used: { type: "array", items: { type: "string" } },
    methodology: { type: "array", items: { type: "string" } },
    next_remediation_priorities: { type: "array", items: { type: "string" } },
    raw_evidence_paths: { type: "array", items: { type: "string" } }
  }
};

// src/validators/schemas/project-profile.schema.json
var project_profile_schema_default = {
  $id: "project-profile",
  type: "object",
  additionalProperties: false,
  $comment: "Framework knobs (strictness, features, model_routing, research, intelligence, efficiency, escalation, enterprise, paqad, custom.decisions) moved to `.paqad/.config`. Their property schemas are kept OPTIONAL here so a legacy fat profile still validates; they are no longer required and a lean profile omits them.",
  required: ["project", "active_capabilities", "commands", "compliance_packs", "mcp", "custom"],
  properties: {
    project: {
      type: "object",
      additionalProperties: false,
      required: ["name", "id", "description"],
      properties: {
        name: { type: "string" },
        id: { type: "string" },
        description: { type: "string" }
      }
    },
    active_capabilities: {
      type: "array",
      minItems: 1,
      items: { type: "string", enum: ["content", "coding", "security"] }
    },
    stack_profile: {
      type: "object",
      additionalProperties: false,
      required: ["frameworks", "traits", "toolchains", "version_bands", "sources"],
      properties: {
        frameworks: {
          type: "array",
          items: {
            type: "string",
            enum: [
              "laravel",
              "flutter",
              "react",
              "vue",
              "django",
              "fastapi",
              "rails",
              "spring-boot",
              "express",
              "angular",
              "svelte",
              "astro",
              "go-web",
              "rust-web",
              "dotnet",
              "nextjs",
              "flask",
              "nestjs",
              "kotlin-android",
              "node-cli",
              "node-library",
              "node-service"
            ]
          }
        },
        traits: {
          type: "array",
          items: { type: "string" }
        },
        toolchains: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["ecosystem", "package_manager", "lockfile"],
            properties: {
              ecosystem: {
                type: "string",
                enum: ["node", "php", "python", "ruby", "jvm", "go", "rust", "dart", "dotnet"]
              },
              package_manager: { type: "string" },
              lockfile: { type: "string" }
            }
          }
        },
        version_bands: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["name", "package_name", "range", "locked_version", "source"],
            properties: {
              name: { type: "string" },
              package_name: { type: "string" },
              range: { type: "string" },
              locked_version: { type: "string" },
              source: { type: "string", enum: ["lockfile", "manifest"] }
            }
          }
        },
        sources: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["file", "kind", "detail"],
            properties: {
              file: { type: "string" },
              kind: {
                type: "string",
                enum: ["manifest", "lockfile", "config", "heuristic", "fallback"]
              },
              detail: { type: "string" }
            }
          }
        }
      }
    },
    app_preview: {
      type: "object",
      additionalProperties: false,
      $comment: "Issue #551 \u2014 the single shared boot contract for visual evidence (and, going forward, design-test). Named app_preview, NOT design_test.* or visual_evidence.*: the design-test spec's dev_command/app_url block was never implemented, so this block replaces it as the one place both features read the app URL and boot command from.",
      required: ["url"],
      properties: {
        url: { type: "string", minLength: 1 },
        command: { type: "string" },
        wait_ms: { type: "integer", minimum: 0 }
      }
    },
    commands: {
      type: "object",
      additionalProperties: false,
      required: ["install", "dev", "test", "test_single", "lint", "format", "migrate", "build"],
      properties: {
        install: { type: "string" },
        dev: { type: "string" },
        test: { type: "string" },
        test_single: { type: "string" },
        lint: { type: "string" },
        format: { type: "string" },
        migrate: { type: "string" },
        build: { type: "string" },
        test_parallel: { type: "string" }
      }
    },
    testing: {
      type: "object",
      additionalProperties: false,
      $comment: "Issue #554 \u2014 the recorded parallel-test decision. Optional; written by onboarding, checks run, and checks record-runner.",
      required: ["runner_id", "parallel", "detected_by", "recorded_at"],
      properties: {
        runner_id: { type: "string" },
        parallel: { type: "string", enum: ["native", "available", "unavailable", "unknown"] },
        reason: { type: "string" },
        detected_by: { type: "string", enum: ["script", "agent"] },
        lockfile_hash: { type: "string" },
        recorded_at: { type: "string" }
      }
    },
    strictness: {
      type: "object",
      additionalProperties: false,
      required: [
        "full_lane_default",
        "require_adversarial_review",
        "block_on_stale_docs",
        "require_db_review_for_migrations"
      ],
      properties: {
        full_lane_default: { type: "boolean" },
        require_adversarial_review: { type: "boolean" },
        block_on_stale_docs: { type: "boolean" },
        require_db_review_for_migrations: { type: "boolean" }
      }
    },
    compliance_packs: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "enabled"],
        properties: {
          name: { type: "string" },
          enabled: { type: "boolean" }
        }
      }
    },
    features: {
      type: "object",
      additionalProperties: false,
      required: ["spec_only_mode", "market_research", "design_research", "team_agents"],
      properties: {
        spec_only_mode: { type: "boolean" },
        market_research: { type: "boolean" },
        design_research: { type: "boolean" },
        team_agents: { type: "boolean" },
        analytics_instrumentation: { type: "boolean" },
        site_map: { type: "boolean" },
        lean_rules: { type: "boolean" },
        feature_report: { type: "boolean" },
        metrics_enabled: { type: "boolean" },
        visual_evidence: { type: "boolean" },
        checks_parallel: { type: "boolean" },
        checks_max_processes: { type: "integer", minimum: 0 }
      }
    },
    enterprise: {
      type: "object",
      additionalProperties: false,
      required: ["enabled", "evidence_ledger", "ai_bom", "compliance_citations"],
      properties: {
        enabled: { type: "boolean" },
        evidence_ledger: { type: "boolean" },
        ai_bom: { type: "boolean" },
        compliance_citations: { type: "boolean" }
      }
    },
    paqad: {
      type: "object",
      additionalProperties: false,
      properties: {
        enabled: { type: "boolean" }
      }
    },
    mcp: {
      type: "object",
      additionalProperties: false,
      required: ["servers"],
      properties: {
        servers: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["name", "enabled"],
            properties: {
              name: { type: "string" },
              enabled: { type: "boolean" },
              kind: {
                type: "string",
                description: "Optional discriminator used by ticket_intake/delivery to find the right server. Existing servers without `kind` continue to validate.",
                enum: ["jira", "linear", "servicenow", "github-issues", "generic"]
              },
              config: { type: "object" }
            }
          }
        }
      }
    },
    model_routing: {
      type: "object",
      additionalProperties: false,
      required: ["default_model", "reasoning_model", "fast_model"],
      properties: {
        default_model: { type: "string" },
        reasoning_model: { type: "string" },
        fast_model: { type: "string" }
      }
    },
    research: {
      type: "object",
      additionalProperties: false,
      required: ["depth"],
      properties: {
        depth: { type: "string", enum: ["cutting-edge", "standard", "conservative"] }
      }
    },
    intelligence: {
      type: "object",
      additionalProperties: false,
      required: ["rag_enabled", "rag_similarity_threshold", "rag_top_n"],
      properties: {
        rag_enabled: { type: "boolean" },
        embedding_provider: {
          type: "string",
          enum: ["local", "openai"]
        },
        embedding_model: { type: "string" },
        rag_similarity_threshold: { type: "number" },
        rag_relief_floor: { type: "number" },
        rag_top_n: { type: "integer", minimum: 1 },
        rag_max_file_size: { type: "integer", minimum: 1 },
        rag_base_branch: { type: "string" },
        existing_surface_tokens: { type: "integer", minimum: 1 },
        benchmark_gates: {
          type: "object",
          additionalProperties: false,
          properties: {
            hit_at_5_improvement_pct: { type: "number" },
            task_success_rate_improvement_pct: { type: "number" },
            correction_turn_reduction_pct: { type: "number" },
            prompt_token_increase_limit_pct: { type: "number" },
            prompt_token_override_success_improvement_pct: { type: "number" }
          }
        },
        benchmark_eval: {
          type: "object",
          additionalProperties: false,
          properties: {
            model_graded: {
              type: "object",
              additionalProperties: false,
              properties: {
                enabled: { type: "boolean" }
              }
            }
          }
        },
        adaptive_retrieval: {
          type: "object",
          additionalProperties: false,
          properties: {
            enabled: { type: "boolean" },
            thresholds: {
              type: "object",
              additionalProperties: false,
              properties: {
                min_useful_chunks: { type: "integer", minimum: 0 }
              }
            }
          }
        },
        reranking: {
          type: "object",
          additionalProperties: false,
          properties: {
            enabled: { type: "boolean" },
            backend: { type: "string", enum: ["local", "cohere", "passthrough"] },
            model: { type: "string" },
            candidate_pool_size: { type: "integer", minimum: 1 },
            api_key: { type: "string" }
          }
        },
        metadata_filters: {
          type: "object",
          additionalProperties: false,
          properties: {
            enabled: { type: "boolean" }
          }
        },
        action_routing: {
          type: "object",
          additionalProperties: false,
          properties: {
            enabled: { type: "boolean" }
          }
        }
      }
    },
    efficiency: {
      type: "object",
      additionalProperties: false,
      properties: {
        context_hit_rate_target: { type: "number" },
        skill_caching: { type: "boolean" },
        differential_refresh: { type: "boolean" },
        mcp_first: { type: "boolean" },
        auto_update: { type: "boolean" },
        minimum_version: { type: "string" },
        skip_version_check: { type: "boolean" },
        version_check_interval_hours: { type: "number" }
      }
    },
    escalation: {
      type: "object",
      additionalProperties: false,
      required: [
        "destructive_operations",
        "risky_migrations",
        "security_findings",
        "db_row_threshold"
      ],
      properties: {
        destructive_operations: {
          type: "string",
          enum: ["block", "require_approval", "warn"]
        },
        risky_migrations: { type: "string", enum: ["block", "require_approval", "warn"] },
        security_findings: { type: "string", enum: ["block", "require_approval", "warn"] },
        db_row_threshold: { type: "integer" }
      }
    },
    custom: {
      type: "object",
      additionalProperties: false,
      required: ["classification_dimensions", "verification_plugins", "escalation_rules"],
      properties: {
        classification_dimensions: { type: "array", items: { type: "object" } },
        verification_plugins: { type: "array", items: { type: "object" } },
        escalation_rules: { type: "array", items: { type: "object" } },
        decisions: {
          type: "object",
          additionalProperties: false,
          properties: {
            ask_threshold: {
              type: "string",
              enum: ["strict", "balanced", "permissive"]
            },
            max_screens_per_task: { type: "integer", minimum: 1 },
            max_pending: { type: "integer", minimum: 1 },
            idle_timeout_minutes: { type: "integer", minimum: 1 },
            ttl_overrides_days: {
              type: "object",
              additionalProperties: { type: "number", minimum: 1 }
            },
            preferred_option_keys: {
              type: "object",
              additionalProperties: {
                type: "string"
              }
            }
          }
        }
      }
    }
  }
};

// src/validators/schemas/site-map-progress.schema.json
var site_map_progress_schema_default = {
  $id: "site-map-progress",
  type: "object",
  additionalProperties: false,
  required: [
    "schema_version",
    "generated_by",
    "framework_version",
    "created_at",
    "updated_at",
    "inventory",
    "units"
  ],
  properties: {
    schema_version: { const: "1" },
    generated_by: { const: "paqad-ai" },
    framework_version: { type: "string", minLength: 1 },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
    inventory: {
      type: "object",
      additionalProperties: false,
      required: ["screens", "groups"],
      properties: {
        screens: { type: "number" },
        groups: { type: "array", items: { type: "string" } }
      }
    },
    units: {
      type: "object",
      additionalProperties: { $ref: "#/$defs/unit" }
    }
  },
  $defs: {
    unit: {
      type: "object",
      additionalProperties: false,
      required: [
        "id",
        "kind",
        "label",
        "state",
        "started_at",
        "completed_at",
        "artifact",
        "source_files",
        "source_hash",
        "error"
      ],
      properties: {
        id: { type: "string", minLength: 1 },
        kind: { enum: ["group", "journey", "stage"] },
        label: { type: "string" },
        state: { enum: ["not_started", "writing", "done", "failed"] },
        started_at: { type: ["string", "null"] },
        completed_at: { type: ["string", "null"] },
        artifact: { type: ["string", "null"] },
        source_files: { type: "array", items: { type: "string" } },
        source_hash: { type: ["string", "null"] },
        error: { type: ["string", "null"] }
      }
    }
  }
};

// src/validators/schemas/skill-frontmatter.schema.json
var skill_frontmatter_schema_default = {
  $id: "skill-frontmatter",
  type: "object",
  additionalProperties: false,
  required: [
    "name",
    "description",
    "model_tier",
    "cacheable",
    "cache_key_inputs",
    "output_format",
    "input_schema"
  ],
  anyOf: [{ required: ["triggers"] }, { required: ["request_routing"] }],
  properties: {
    name: { type: "string", minLength: 1 },
    description: { type: "string", minLength: 1 },
    model_tier: { type: "string", enum: ["fast", "medium", "reasoning", "deep"] },
    triggers: { type: "array" },
    request_routing: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["priority", "patterns", "target_workflow"],
        properties: {
          priority: { type: "integer", minimum: 1 },
          patterns: {
            type: "array",
            minItems: 1,
            items: { type: "string", minLength: 1 }
          },
          target_workflow: {
            anyOf: [
              {
                type: "string",
                enum: [
                  "project-question",
                  "ticket-refinement",
                  "writing",
                  "editing",
                  "planning",
                  "research",
                  "feature-development",
                  "bug-fix",
                  "refactor",
                  "migration",
                  "content-update",
                  "investigation",
                  "cleanup",
                  "architecture-change",
                  "test-improvement",
                  "documentation-update",
                  "root-cause-analysis",
                  "pentest",
                  "pentest-retest",
                  "schema-change",
                  "query-optimization",
                  "custom"
                ]
              },
              {
                type: "string",
                pattern: "^custom:.+"
              }
            ]
          }
        }
      }
    },
    max_lines: { type: "integer", maximum: 300 },
    cacheable: { type: "boolean" },
    cache_key_inputs: { type: "array", items: { type: "string" } },
    output_format: { type: "string", enum: ["markdown", "yaml", "json"] },
    input_schema: {
      type: "object",
      minProperties: 1,
      additionalProperties: {
        type: "object",
        additionalProperties: false,
        required: ["type", "required"],
        properties: {
          type: {
            type: "string",
            enum: ["string", "string[]", "boolean", "path", "path[]", "object"]
          },
          required: { type: "boolean" },
          description: { type: "string", minLength: 1 }
        }
      }
    },
    on_complete: {
      type: "object",
      additionalProperties: false,
      required: ["emit", "triggers"],
      properties: {
        emit: { type: "string", minLength: 1 },
        triggers: { type: "array", minItems: 1, items: { type: "string" } }
      }
    },
    tools: { type: "array", items: { type: "string" } }
  }
};

// src/validators/schemas/stack-pack.schema.json
var stack_pack_schema_default = {
  $id: "stack-pack",
  type: "object",
  additionalProperties: false,
  required: [
    "name",
    "display_name",
    "ecosystem",
    "version",
    "description",
    "maintainer",
    "detection"
  ],
  properties: {
    name: { type: "string", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" },
    display_name: { type: "string", minLength: 1 },
    ecosystem: { type: "string", minLength: 1 },
    tier: { type: "string", enum: ["framework", "archetype"] },
    version: { type: "string", minLength: 1 },
    description: { type: "string", minLength: 1 },
    maintainer: { type: "string", minLength: 1 },
    detection: {
      type: "object",
      additionalProperties: false,
      properties: {
        manifests: {
          type: "array",
          items: { $ref: "#/$defs/detectionRule" }
        },
        lockfiles: {
          type: "array",
          items: { $ref: "#/$defs/detectionRule" }
        },
        heuristics: {
          type: "array",
          items: { $ref: "#/$defs/detectionRule" }
        },
        priority: {
          type: "integer"
        },
        excludes: {
          type: "array",
          items: { type: "string" }
        }
      },
      anyOf: [
        { required: ["manifests"] },
        { required: ["lockfiles"] },
        { required: ["heuristics"] }
      ]
    },
    traits: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "display_name", "description"],
        properties: {
          name: { type: "string", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$" },
          display_name: { type: "string" },
          detect_package: { type: "string" },
          detect_file: { type: "string" },
          detect_directory: { type: "string" },
          description: { type: "string" }
        }
      }
    },
    toolchains: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["ecosystem", "package_managers", "lockfiles"],
        properties: {
          ecosystem: { type: "string" },
          package_managers: { type: "array", items: { type: "string" } },
          lockfiles: { type: "array", items: { type: "string" } },
          audit_command: { type: "string" }
        }
      }
    },
    mcp_defaults: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["name", "when"],
        properties: {
          name: { type: "string" },
          when: { type: "string", enum: ["always", "when_trait"] },
          trait: { type: "string" }
        }
      }
    },
    pentest: {
      type: "object",
      additionalProperties: false,
      properties: {
        file_check_map: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["glob", "checks"],
            properties: {
              glob: { type: "string" },
              checks: { type: "array", items: { type: "string" } }
            }
          }
        },
        audit_commands: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["command", "parser"],
            properties: {
              command: { type: "string" },
              parser: { type: "string" }
            }
          }
        }
      }
    },
    ast: {
      type: "object",
      additionalProperties: false,
      required: ["language", "tree_sitter_grammar", "file_extensions"],
      properties: {
        language: { type: "string" },
        tree_sitter_grammar: { type: "string" },
        file_extensions: { type: "array", items: { type: "string" } }
      }
    },
    testing: {
      type: "object",
      additionalProperties: false,
      properties: {
        frameworks: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["name"],
            properties: {
              name: { type: "string" },
              detect_package: { type: "string" },
              detect_file: { type: "string" },
              run_command: { type: "string" }
            }
          }
        }
      }
    },
    test_runners: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["runner_id", "structured_format"],
        properties: {
          runner_id: { type: "string", minLength: 1 },
          structured_format: {
            type: "string",
            enum: [
              "jest-json",
              "junit-xml",
              "pytest-json",
              "go-json",
              "rspec-json",
              "tap",
              "none"
            ]
          },
          structured_flags: { type: "string" },
          default_command: { type: "string" },
          output_source: { type: "string", enum: ["stdout", "file"] },
          output_path_pattern: { type: "string" },
          single_test_selector: { type: "string", enum: ["test_id", "file"] },
          parallel: {
            type: "object",
            additionalProperties: false,
            required: ["mode"],
            properties: {
              mode: { type: "string", enum: ["native", "flag", "unavailable"] },
              flag: { type: "string" },
              requires_package: { type: "string" },
              reason: { type: "string" }
            }
          }
        }
      }
    },
    docs: {
      type: "object",
      additionalProperties: false,
      properties: {
        overview_template: { type: "string" },
        conventions_template: { type: "string" }
      }
    },
    rag: {
      type: "object",
      additionalProperties: false,
      properties: {
        exclude_directories: {
          type: "array",
          items: { type: "string" }
        },
        basename_includes: {
          type: "array",
          items: { type: "string" }
        }
      }
    },
    module_health: {
      type: "object",
      additionalProperties: false,
      required: ["source_roots"],
      properties: {
        source_roots: { type: "array", items: { type: "string" }, minItems: 1 },
        source_globs: { type: "array", items: { type: "string" } },
        public_api_extractor: { type: ["string", "null"] },
        test_command: { type: "string" },
        coverage_format: {
          type: "string",
          enum: [
            "lcov",
            "cobertura",
            "coverage-py-xml",
            "gocover",
            "junit-xml",
            "go-json",
            "jacoco",
            "opencover",
            "vitest-json"
          ]
        },
        coverage_path: { type: "string" },
        test_report_format: {
          type: "string",
          enum: [
            "lcov",
            "cobertura",
            "coverage-py-xml",
            "gocover",
            "junit-xml",
            "go-json",
            "jacoco",
            "opencover",
            "vitest-json"
          ]
        },
        test_report_path: { type: "string" },
        git_window_days: { type: "integer", minimum: 1, maximum: 365 }
      }
    },
    format_changed: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["default_command", "script", "command"],
        properties: {
          default_command: { type: "string", minLength: 1 },
          script: { type: "string", minLength: 1 },
          command: { type: "string", minLength: 1 }
        }
      }
    },
    build_outputs: {
      type: "array",
      items: { type: "string", minLength: 1 }
    },
    visual_evidence: {
      type: "object",
      additionalProperties: false,
      properties: {
        frontend_globs: { type: "array", items: { type: "string" } }
      }
    }
  },
  $defs: {
    detectionRule: {
      type: "object",
      additionalProperties: false,
      properties: {
        file: { type: "string" },
        packages: { type: "array", items: { type: "string" } },
        patterns: { type: "array", items: { type: "string" } },
        directory: { type: "string" },
        content_match: { type: "string" },
        fields: {
          type: "array",
          items: {
            type: "object",
            additionalProperties: false,
            required: ["name"],
            properties: {
              name: { type: "string" },
              presence: { type: "string", enum: ["required", "absent"] },
              value: {}
            }
          }
        },
        field_absent: { type: "array", items: { type: "string" } }
      },
      anyOf: [{ required: ["file"] }, { required: ["directory"] }]
    }
  }
};

// src/validators/schemas/test-output-result.schema.json
var test_output_result_schema_default = {
  $id: "test-output-result",
  type: "object",
  additionalProperties: false,
  required: ["schema_version", "summary", "failures", "warnings", "parse_metadata", "errors"],
  properties: {
    schema_version: { const: "1.0.0" },
    summary: {
      type: "object",
      additionalProperties: false,
      required: [
        "total",
        "passed",
        "failed",
        "skipped",
        "errored",
        "duration_ms",
        "timestamp",
        "runner_id"
      ],
      properties: {
        total: { type: "number" },
        passed: { type: "number" },
        failed: { type: "number" },
        skipped: { type: "number" },
        errored: { type: "number" },
        duration_ms: { type: "number" },
        timestamp: { type: "string", format: "date-time" },
        runner_id: { type: "string", minLength: 1 }
      }
    },
    failures: {
      type: "array",
      items: { $ref: "#/$defs/testIssue" }
    },
    warnings: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["type", "message", "source_test_id"],
        properties: {
          type: { type: "string", minLength: 1 },
          message: { type: "string", minLength: 1 },
          source_test_id: { type: ["string", "null"] }
        }
      }
    },
    parse_metadata: {
      type: "object",
      additionalProperties: false,
      required: [
        "raw_byte_size",
        "structured_byte_size",
        "compression_ratio",
        "original_size",
        "compact_size",
        "reduction_ratio",
        "delta_mode_used",
        "escalation_occurred",
        "escalation_reason",
        "delta_summary",
        "parse_strategy",
        "parse_warnings"
      ],
      properties: {
        raw_byte_size: { type: "number" },
        structured_byte_size: { type: "number" },
        compression_ratio: { type: "number" },
        original_size: { type: "number" },
        compact_size: { type: "number" },
        reduction_ratio: { type: "number" },
        delta_mode_used: { type: "boolean" },
        escalation_occurred: { type: "boolean" },
        escalation_reason: {
          type: ["string", "null"],
          enum: [
            "structured-parse-failed-or-degraded",
            "summary-confidence-low",
            "compact-signals-contradict",
            "diagnosis-unresolved-after-compact-pass",
            null
          ]
        },
        delta_summary: {
          anyOf: [
            { type: "null" },
            {
              type: "object",
              additionalProperties: false,
              required: [
                "newly_failing_tests",
                "newly_passing_tests",
                "newly_errored_tests",
                "changed_failure_messages"
              ],
              properties: {
                newly_failing_tests: { type: "number" },
                newly_passing_tests: { type: "number" },
                newly_errored_tests: { type: "number" },
                changed_failure_messages: { type: "number" }
              }
            }
          ]
        },
        parse_strategy: {
          type: "string",
          enum: ["structured", "plain-text-fallback", "degraded"]
        },
        parse_warnings: {
          type: "array",
          items: { type: "string" }
        }
      }
    },
    errors: {
      type: "array",
      items: { $ref: "#/$defs/testIssue" }
    }
  },
  $defs: {
    testIssue: {
      type: "object",
      additionalProperties: false,
      required: [
        "test_id",
        "suite",
        "message",
        "stack_trace",
        "file_path",
        "line_number",
        "category",
        "duration_ms"
      ],
      properties: {
        test_id: { type: "string", minLength: 1 },
        suite: { type: ["string", "null"] },
        message: { type: "string", minLength: 1 },
        stack_trace: { type: ["string", "null"] },
        file_path: { type: ["string", "null"] },
        line_number: { type: ["integer", "null"] },
        category: {
          type: "string",
          enum: ["assertion", "error", "timeout", "unknown"]
        },
        duration_ms: { type: ["number", "null"] }
      }
    }
  }
};

// src/validators/validator.ts
var SCHEMAS = [
  project_profile_schema_default,
  detection_report_schema_default,
  design_tokens_schema_default,
  doc_progress_schema_default,
  onboarding_manifest_schema_default,
  pentest_progress_schema_default,
  pentest_report_schema_default,
  handoff_artifact_schema_default,
  adversarial_review_report_schema_default,
  context_hit_log_schema_default,
  api_endpoint_doc_schema_default,
  integration_doc_schema_default,
  error_catalog_schema_default,
  feature_development_policy_schema_default,
  tickets_schema_default,
  branches_schema_default,
  commits_schema_default,
  pull_requests_schema_default,
  enforcement_schema_default,
  design_sign_off_schema_default,
  feature_spec_schema_default,
  skill_frontmatter_schema_default,
  gate_result_schema_default,
  stack_pack_schema_default,
  compliance_pack_schema_default,
  test_output_result_schema_default,
  site_map_progress_schema_default
];
var SchemaValidator = class {
  ajv;
  constructor() {
    this.ajv = new import_ajv.default({ verbose: true });
    this.ajv.addFormat(
      "date-time",
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/
    );
    this.registerSchemas();
  }
  validate(schemaId, data) {
    const valid = this.ajv.validate(schemaId, data);
    return {
      valid,
      errors: valid ? [] : this.formatErrors(this.ajv.errors)
    };
  }
  registerSchemas() {
    for (const schema of SCHEMAS) {
      this.ajv.addSchema(schema);
    }
  }
  formatErrors(errors) {
    if (errors === null || errors === void 0) {
      return [];
    }
    return errors.map((error) => ({
      path: error.instancePath || "/",
      message: error.message ?? "Validation failed",
      keyword: error.keyword,
      expected: error.schemaPath,
      actual: error.data === void 0 ? void 0 : JSON.stringify(error.data)
    }));
  }
};

// src/git-workflow/load.ts
init_esm_shims();
var import_yaml = __toESM(require_dist(), 1);
import { existsSync, readFileSync } from "fs";
import { join } from "path";

// src/git-workflow/types.ts
init_esm_shims();
var GIT_WORKFLOW_FILES = [
  "tickets.yaml",
  "branches.yaml",
  "commits.yaml",
  "pull-requests.yaml",
  "enforcement.yaml",
  "design-sign-off.yaml"
];

// src/git-workflow/load.ts
var GIT_WORKFLOW_SCHEMAS = {
  "tickets.yaml": tickets_schema_default,
  "branches.yaml": branches_schema_default,
  "commits.yaml": commits_schema_default,
  "pull-requests.yaml": pull_requests_schema_default,
  "enforcement.yaml": enforcement_schema_default,
  "design-sign-off.yaml": design_sign_off_schema_default
};
function gitWorkflowDir(projectRoot) {
  return join(projectRoot, PATHS.GIT_WORKFLOW_DIR);
}
function gitWorkflowFilePath(projectRoot, file) {
  return join(gitWorkflowDir(projectRoot), file);
}
function readGitWorkflowContents(projectRoot) {
  const contents = {};
  for (const file of GIT_WORKFLOW_FILES) {
    const path = gitWorkflowFilePath(projectRoot, file);
    if (existsSync(path)) contents[file] = readFileSync(path, "utf8");
  }
  return contents;
}
function loadGitWorkflow(projectRoot) {
  const result = resolveGitWorkflow(readGitWorkflowContents(projectRoot));
  const source = existsSync(gitWorkflowDir(projectRoot)) ? "git-workflow" : "defaults";
  return { ...result, source };
}
function resolveGitWorkflow(contents) {
  const errors = [];
  const warnings = [];
  const raw = {};
  const validator = new SchemaValidator();
  for (const file of GIT_WORKFLOW_FILES) {
    const text = contents[file];
    if (text === void 0) continue;
    let parsed;
    try {
      parsed = import_yaml.default.parse(text) ?? {};
    } catch (error) {
      errors.push({
        file,
        path: "",
        message: `${file} isn't valid YAML: ${error instanceof Error ? error.message : String(error)}`
      });
      continue;
    }
    if (!isRecord(parsed)) {
      errors.push({
        file,
        path: "",
        message: `${file} must hold settings, not a list or a value.`
      });
      continue;
    }
    const validation = validator.validate(GIT_WORKFLOW_SCHEMAS[file].$id ?? "", parsed);
    for (const issue of validation.errors) {
      const path = dotted(issue.path);
      errors.push({ file, path, message: `${file} ${path || "(top level)"} ${issue.message}.` });
    }
    for (const path of unknownKeys(parsed, GIT_WORKFLOW_SCHEMAS[file], [])) {
      warnings.push({
        file,
        path,
        message: `${file} has a setting paqad doesn't know: ${path}. It may be from a newer paqad or a typo.`
      });
    }
    if (validation.valid) raw[file] = parsed;
  }
  const branchesRaw = raw["branches.yaml"] ?? {};
  const base = stringOr(branchesRaw.base_branch, defaultGitWorkflow().branches.base_branch);
  const config = mergeGitWorkflow(defaultGitWorkflow(base), raw);
  if (errors.length === 0) errors.push(...crossFileErrors(config, raw));
  return { config, valid: errors.length === 0, errors, warnings };
}
function mergeGitWorkflow(defaults, raw) {
  const t = raw["tickets.yaml"] ?? {};
  const b = raw["branches.yaml"] ?? {};
  const c = raw["commits.yaml"] ?? {};
  const p = raw["pull-requests.yaml"] ?? {};
  const e = raw["enforcement.yaml"] ?? {};
  const s = raw["design-sign-off.yaml"] ?? {};
  const template = stringOr(b.template, defaults.branches.template);
  const base = defaults.branches.base_branch;
  const rawTypes = isRecord(b.types) ? b.types : null;
  const types = {};
  for (const [name, value] of Object.entries(rawTypes ?? defaults.branches.types)) {
    const entry = rawTypes ? isRecord(value) ? value : {} : value;
    types[name] = resolveBranchType(name, rawTypes ? entry : pickTypeBasics(entry), base, template);
  }
  const sources = {};
  for (const [name, value] of Object.entries(isRecord(t.sources) ? t.sources : {})) {
    sources[name] = resolveSource(isRecord(value) ? value : {});
  }
  const intake = isRecord(t.intake_decisions) ? t.intake_decisions : {};
  const summary = isRecord(c.summary) ? c.summary : {};
  const ci = isRecord(p.ci) ? p.ci : {};
  const dt = defaults.tickets;
  const dp = defaults.pull_requests;
  return {
    tickets: {
      require_ticket: boolOr(t.require_ticket, dt.require_ticket),
      sources,
      write_back_refined: t.write_back_refined ?? dt.write_back_refined,
      intake_decisions: {
        ...dt.intake_decisions,
        ...intake
      }
    },
    branches: {
      base_branch: base,
      template,
      slug_max_length: numberOr(b.slug_max_length, defaults.branches.slug_max_length),
      types,
      default_type: stringOr(b.default_type, defaults.branches.default_type)
    },
    commits: {
      template: stringOr(c.template, defaults.commits.template),
      sign_off: boolOr(c.sign_off, defaults.commits.sign_off),
      ask_when_unspecified: boolOr(c.ask_when_unspecified, defaults.commits.ask_when_unspecified),
      summary: {
        style: summary.style ?? defaults.commits.summary.style,
        max_length: numberOr(summary.max_length, defaults.commits.summary.max_length)
      }
    },
    pull_requests: {
      host: p.host ?? dp.host,
      host_server: stringOr(p.host_server, dp.host_server, true),
      title_template: stringOr(p.title_template, dp.title_template),
      body_template: stringOr(p.body_template, dp.body_template),
      draft: boolOr(p.draft, dp.draft),
      reviewers: stringList(p.reviewers, dp.reviewers),
      labels: stringList(p.labels, dp.labels),
      link_ticket: boolOr(p.link_ticket, dp.link_ticket),
      also_open_against: stringList(p.also_open_against, dp.also_open_against),
      ci: {
        gate: ci.gate ?? dp.ci.gate,
        timeout_minutes: numberOr(ci.timeout_minutes, dp.ci.timeout_minutes),
        on_red: ci.on_red ?? dp.ci.on_red
      }
    },
    enforcement: {
      enabled: boolOr(e.enabled, defaults.enforcement.enabled),
      agents: e.agents ?? defaults.enforcement.agents,
      people: e.people ?? defaults.enforcement.people
    },
    design_sign_off: resolveDesignSignOff(s, defaults.design_sign_off)
  };
}
function resolveDesignSignOff(raw, defaults) {
  const channel = isRecord(raw.approval_channel) ? raw.approval_channel : {};
  const format = isRecord(raw.format) ? raw.format : {};
  return {
    enabled: boolOr(raw.enabled, defaults.enabled),
    lanes: stringList(raw.lanes, defaults.lanes),
    approval_channel: {
      server: stringOr(channel.server, defaults.approval_channel.server, true),
      channel: stringOr(channel.channel, defaults.approval_channel.channel, true)
    },
    format: {
      summary_max_words: numberOr(format.summary_max_words, defaults.format.summary_max_words),
      detail_max_words: numberOr(format.detail_max_words, defaults.format.detail_max_words)
    },
    wait_for_approval: boolOr(raw.wait_for_approval, defaults.wait_for_approval),
    approve_by: raw.approve_by ?? defaults.approve_by,
    approve_words: stringList(raw.approve_words, defaults.approve_words),
    approvers: stringList(raw.approvers, defaults.approvers),
    move_to_on_post: stringOr(raw.move_to_on_post, defaults.move_to_on_post, true),
    approved_status: stringOr(raw.approved_status, defaults.approved_status, true),
    allow_skip_with_reason: boolOr(raw.allow_skip_with_reason, defaults.allow_skip_with_reason)
  };
}
function pickTypeBasics(entry) {
  return { prefix: entry.prefix, commit_type: entry.commit_type };
}
function resolveBranchType(name, raw, base, template) {
  return {
    prefix: stringOr(raw.prefix, name),
    commit_type: stringOr(raw.commit_type, name),
    tickets: stringList(raw.tickets, []),
    ticket_types: stringList(raw.ticket_types, []),
    base_branch: stringOr(raw.base_branch, base),
    labels: stringList(raw.labels, []),
    template: stringOr(raw.template, template)
  };
}
function resolveSource(raw) {
  const tracker = raw.tracker;
  const transitions = isRecord(raw.transitions) ? raw.transitions : {};
  return {
    tracker,
    pattern: stringOr(raw.pattern, DEFAULT_TRACKER_PATTERNS[tracker] ?? ""),
    server: stringOr(raw.server, "", true),
    transitions: {
      on_pr_open: stringOr(transitions.on_pr_open, "", true),
      on_ci_green: stringOr(transitions.on_ci_green, "", true)
    }
  };
}
function crossFileErrors(config, raw) {
  const errors = [];
  const sources = config.tickets.sources;
  const types = config.branches.types;
  const sourceNames = Object.keys(sources);
  for (const [name, type] of Object.entries(types)) {
    for (const source of type.tickets) {
      if (!sourceNames.includes(source)) {
        errors.push({
          file: "branches.yaml",
          path: `types.${name}.tickets`,
          message: `branches.yaml types.${name}.tickets names "${source}", which isn't a source in tickets.yaml.`
        });
      }
    }
  }
  if (!Object.prototype.hasOwnProperty.call(types, config.branches.default_type)) {
    errors.push({
      file: "branches.yaml",
      path: "default_type",
      message: `branches.yaml default_type is "${config.branches.default_type}", but there's no branch type with that name.`
    });
  }
  const byPrefix = /* @__PURE__ */ new Map();
  for (const [name, type] of Object.entries(types)) {
    const other = byPrefix.get(type.prefix);
    if (other !== void 0) {
      errors.push({
        file: "branches.yaml",
        path: `types.${name}.prefix`,
        message: `branches.yaml types.${name}.prefix "${type.prefix}" is already used by types.${other}. Each type needs its own prefix.`
      });
    } else {
      byPrefix.set(type.prefix, name);
    }
  }
  const ticketsRaw = raw["tickets.yaml"];
  const rawSources = ticketsRaw && isRecord(ticketsRaw.sources) ? ticketsRaw.sources : {};
  for (const [name, source] of Object.entries(sources)) {
    const rawSource = isRecord(rawSources[name]) ? rawSources[name] : {};
    if (source.tracker === "generic" && typeof rawSource.pattern !== "string") {
      errors.push({
        file: "tickets.yaml",
        path: `sources.${name}.pattern`,
        message: `tickets.yaml sources.${name} is a generic source, so it needs a pattern.`
      });
      continue;
    }
    try {
      new RegExp(source.pattern);
    } catch (error) {
      errors.push({
        file: "tickets.yaml",
        path: `sources.${name}.pattern`,
        message: `tickets.yaml sources.${name}.pattern isn't a valid regular expression: ${error instanceof Error ? error.message : String(error)}`
      });
    }
  }
  if (config.tickets.require_ticket && sourceNames.length === 0) {
    errors.push({
      file: "tickets.yaml",
      path: "require_ticket",
      message: "tickets.yaml require_ticket is true, but there are no sources to match a ticket against."
    });
  }
  return errors;
}
function unknownKeys(value, schema, path) {
  const found = [];
  const properties = schema.properties ?? {};
  const additional = schema.additionalProperties;
  for (const [key, child] of Object.entries(value)) {
    const childSchema = properties[key] ?? (typeof additional === "object" ? additional : null);
    if (!childSchema) {
      found.push([...path, key].join("."));
      continue;
    }
    const nested = childSchema.properties !== void 0 || typeof childSchema.additionalProperties === "object";
    if (isRecord(child) && nested) found.push(...unknownKeys(child, childSchema, [...path, key]));
  }
  return found;
}
function dotted(pointer) {
  return pointer === "/" ? "" : pointer.replace(/^\//, "").split("/").join(".");
}
function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function stringOr(value, fallback, allowEmpty = false) {
  return typeof value === "string" && (allowEmpty || value !== "") ? value : fallback;
}
function boolOr(value, fallback) {
  return typeof value === "boolean" ? value : fallback;
}
function numberOr(value, fallback) {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}
function stringList(value, fallback) {
  return Array.isArray(value) ? value.filter((v) => typeof v === "string") : [...fallback];
}

// src/core/fs/read-if-exists.ts
init_esm_shims();
import { readFileSync as readFileSync2 } from "fs";
import { readFile } from "fs/promises";
function isMissingFileError(error) {
  return typeof error === "object" && error !== null && error.code === "ENOENT";
}
function readTextIfExistsSync(path) {
  try {
    return readFileSync2(path, "utf8");
  } catch (error) {
    if (isMissingFileError(error)) return null;
    throw error;
  }
}

// src/rule-scripts/rule-id.ts
init_esm_shims();
import { createHash } from "crypto";
var ID_PREFIX = "RL-";
var MIN_HEX = 4;
var MAX_HEX = 12;
var MARKER_RE = /<!--\s*@rule\s+(RL-[0-9a-f]+)(?:\s+discovered:([A-Za-z0-9._-]+))?\s*-->/i;
function sha256(input) {
  return createHash("sha256").update(input).digest("hex");
}
function ruleTextHash(text) {
  return sha256(text);
}
function parseRuleMarker(line) {
  const m = MARKER_RE.exec(line);
  if (!m) {
    return null;
  }
  return `${ID_PREFIX}${m[1].slice(ID_PREFIX.length).toLowerCase()}`;
}
function parseRuleMarkerRun(line) {
  return MARKER_RE.exec(line)?.[2] ?? null;
}
function stripRuleMarker(line) {
  const id = parseRuleMarker(line);
  const text = line.replace(MARKER_RE, "").trimEnd();
  return { text, id };
}
function embedRuleMarker(line, id, discovered) {
  const existing = parseRuleMarker(line);
  if (existing === id && (discovered === void 0 || parseRuleMarkerRun(line) === discovered)) {
    return line;
  }
  const clean = line.replace(MARKER_RE, "").trimEnd();
  const run = discovered === void 0 ? "" : ` discovered:${discovered}`;
  return `${clean} <!-- @rule ${id}${run} -->`;
}
function mintRuleId(source, text, takenIds) {
  const digest = sha256(`${source}\0${text}`);
  for (let len = MIN_HEX; len <= MAX_HEX; len++) {
    const candidate = `${ID_PREFIX}${digest.slice(0, len)}`;
    if (!takenIds.has(candidate)) {
      return candidate;
    }
  }
  return `${ID_PREFIX}${digest}`;
}
function isRuleId(value) {
  return /^RL-[0-9a-f]{4,}$/i.test(value);
}

// src/core/team-config-retired.ts
init_esm_shims();
var import_yaml3 = __toESM(require_dist(), 1);
import { rmSync, writeFileSync } from "fs";
import { join as join2 } from "path";

// src/git-workflow/yaml-edit.ts
init_esm_shims();
var import_yaml2 = __toESM(require_dist(), 1);
function parse(text) {
  const doc = import_yaml2.default.parseDocument(text);
  if (doc.errors.length > 0) {
    throw new Error(doc.errors[0].message);
  }
  return doc;
}
function lineStart(text, offset) {
  return text.lastIndexOf("\n", offset - 1) + 1;
}
function lineEnd(text, offset) {
  const at = text.indexOf("\n", Math.max(offset - 1, 0));
  return at === -1 ? text.length : at + 1;
}
function rangeOf(node) {
  const range = node?.range;
  return range ? [range[0], range[1]] : null;
}
function findPair(map, key) {
  return map.items.find(
    (pair) => (0, import_yaml2.isScalar)(pair.key) && String(pair.key.value) === key
  );
}
function mapAt(text, path) {
  const doc = parse(text);
  const node = path.length === 0 ? doc.contents : doc.getIn(path, true);
  return (0, import_yaml2.isMap)(node) ? node : null;
}
function renderPair(key, value, indent) {
  const body = import_yaml2.default.stringify({ [key]: value }, { lineWidth: 0, flowCollectionPadding: false });
  return body.split("\n").filter((line, i, all) => !(i === all.length - 1 && line === "")).map((line) => `${indent}${line}`).join("\n");
}
function flow(value) {
  return import_yaml2.default.stringify(value, {
    lineWidth: 0,
    collectionStyle: "flow",
    flowCollectionPadding: false
  }).trimEnd();
}
function scalarText(node, value) {
  if ((0, import_yaml2.isScalar)(node) && typeof value === "string") {
    if (node.type === "QUOTE_DOUBLE") return JSON.stringify(value);
    if (node.type === "QUOTE_SINGLE") return `'${value.replace(/'/g, "''")}'`;
  }
  return flow(value);
}
function hasPath(text, path) {
  return parse(text).hasIn(path);
}
function readPath(text, path) {
  const value = parse(text).getIn(path);
  return (0, import_yaml2.isCollection)(value) ? value.toJSON() : value;
}
function insertKey(text, parentPath, key, value, comment = null) {
  const parent = mapAt(text, parentPath);
  if (!parent || parent.flow) {
    throw new Error(`can't add ${[...parentPath, key].join(".")}: its parent isn't a block map`);
  }
  if (parentPath.length === 0) {
    const base = text.length === 0 || text.endsWith("\n") ? text : `${text}
`;
    const lead = base.length === 0 ? "" : "\n";
    const commentLine2 = comment ? `# ${comment}
` : "";
    return `${base}${lead}${commentLine2}${renderPair(key, value, "")}
`;
  }
  const first = parent.items[0];
  const firstKey = rangeOf(first?.key);
  const parentRange = rangeOf(parent);
  if (!firstKey || !parentRange) {
    throw new Error(`can't add ${[...parentPath, key].join(".")}: its parent is empty`);
  }
  const indent = " ".repeat(firstKey[0] - lineStart(text, firstKey[0]));
  const last = parent.items[parent.items.length - 1];
  const lastEnd = rangeOf(last.value)?.[1] ?? rangeOf(last.key)?.[1] ?? parentRange[1];
  const at = lineEnd(text, lastEnd);
  const head = at > 0 && text[at - 1] !== "\n" ? `${text.slice(0, at)}
` : text.slice(0, at);
  const commentLine = comment ? `${indent}# ${comment}
` : "";
  return `${head}${commentLine}${renderPair(key, value, indent)}
${text.slice(at)}`;
}
function setValue(text, path, value) {
  const doc = parse(text);
  const node = doc.getIn(path, true);
  const range = rangeOf(node);
  if (!node || !range) {
    const parentPath = path.slice(0, -1);
    return insertKey(text, parentPath, path[path.length - 1], value);
  }
  if (JSON.stringify(readPath(text, path)) === JSON.stringify(value)) return text;
  const isBlock = (0, import_yaml2.isCollection)(node) && !node.flow;
  const isObject = typeof value === "object" && value !== null && !Array.isArray(value);
  if (isBlock && isObject && Object.keys(value).length > 0) {
    const start = lineStart(text, range[0]);
    const end = lineEnd(text, range[1]);
    const indent = " ".repeat(range[0] - start);
    const body = import_yaml2.default.stringify(value, { lineWidth: 0, flowCollectionPadding: false }).split("\n").filter((line) => line !== "").map((line) => `${indent}${line}`).join("\n");
    return `${text.slice(0, start)}${body}
${text.slice(end)}`;
  }
  if ((0, import_yaml2.isCollection)(node) && !isBlock && isObject && Object.keys(value).length > 0) {
    const start = lineStart(text, range[0]);
    const keyIndent = /^[ \t]*/.exec(text.slice(start))?.[0] ?? "";
    const body = import_yaml2.default.stringify(value, { lineWidth: 0, flowCollectionPadding: false }).split("\n").filter((line) => line !== "").map((line) => `${keyIndent}  ${line}`).join("\n");
    const before = text.slice(0, range[0]).replace(/[ \t]+$/, "");
    return `${before}
${body}${text.slice(range[1])}`;
  }
  if (isBlock) {
    const start = range[0];
    const end = lineEnd(text, range[1]);
    const before = text.slice(0, start).replace(/\n[ \t]*$/, " ");
    return `${before}${flow(value)}
${text.slice(end)}`;
  }
  return `${text.slice(0, range[0])}${scalarText(node, value)}${text.slice(range[1])}`;
}
function removeKey(text, path) {
  const parent = mapAt(text, path.slice(0, -1));
  const pair = parent ? findPair(parent, path[path.length - 1]) : void 0;
  const keyRange = rangeOf(pair?.key);
  if (!pair || !keyRange) return text;
  const valueEnd = rangeOf(pair.value)?.[1] ?? keyRange[1];
  return `${text.slice(0, lineStart(text, keyRange[0]))}${text.slice(lineEnd(text, valueEnd))}`;
}

// src/update/legacy-schema-line.ts
init_esm_shims();
var LEGACY_SCHEMA_LINE_PREFIX = "# yaml-language-server: $schema=";

// src/core/team-config-retired.ts
var RETIRED_SAFETY_FILE = "feature-development/safety.yaml";
var WORKFLOW_FILE = "feature-development/workflow.yaml";
var GROUP_LINE = /^\s*#?\s*([A-Za-z0-9_][A-Za-z0-9_.-]*):\s*(?:#.*)?$/u;
var STAMP_LINE = /^(?:schema_version|paqad_version)[ \t]*:/u;
var RETIRED_TEAM_SETTINGS = [
  {
    key: "research_depth",
    file: "models.yaml",
    path: ["research", "depth"],
    note: "How far planning research looks, from the newest options to proven ones.",
    value: "standard"
  },
  {
    key: "full_lane_default",
    file: WORKFLOW_FILE,
    path: ["lanes", "default"],
    note: "Sends every change through the full lane, the most thorough one.",
    value: "auto"
  },
  {
    key: "require_adversarial_review",
    file: WORKFLOW_FILE,
    path: ["stages", "review", "adversarial_pass"],
    note: "Requires an adversarial review pass before a change is delivered.",
    value: "required"
  },
  {
    key: "block_on_stale_docs",
    file: WORKFLOW_FILE,
    path: ["stages", "documentation_sync", "stale_docs"],
    note: "Blocks delivery while the project docs are out of date.",
    value: "block"
  },
  {
    key: "decisions_max_screens_per_task",
    file: "decisions.yaml",
    path: ["max_screens_per_change"],
    note: "The most decision screens paqad shows for one change.",
    value: "3"
  },
  {
    key: "decisions_idle_timeout_minutes",
    file: "decisions.yaml",
    path: ["auto_resolve_after_minutes"],
    note: "Minutes a pending decision waits for an answer before paqad settles it itself.",
    value: "30"
  },
  {
    key: "require_db_review_for_migrations",
    file: RETIRED_SAFETY_FILE,
    path: ["database_review_for_migrations"],
    note: "Requires a database review when a change includes migrations.",
    value: "required"
  },
  {
    key: "escalate_destructive_operations",
    file: RETIRED_SAFETY_FILE,
    path: ["destructive_operations"],
    note: "Whether paqad blocks, asks you about or warns on a destructive operation.",
    value: "block"
  },
  {
    key: "escalate_risky_migrations",
    file: RETIRED_SAFETY_FILE,
    path: ["risky_migrations"],
    note: "Whether paqad blocks, asks you about or warns on a risky migration.",
    value: "warn"
  },
  {
    key: "escalate_security_findings",
    file: RETIRED_SAFETY_FILE,
    path: ["security_findings"],
    note: "Whether paqad blocks, asks you about or warns on a security finding.",
    value: "block"
  },
  {
    key: "escalate_db_row_threshold",
    file: RETIRED_SAFETY_FILE,
    path: ["large_data_change_rows"],
    note: "A data change that touches more rows than this is treated as risky.",
    value: "10000"
  }
];
var RETIRED_KEYS = new Set(RETIRED_TEAM_SETTINGS.map((row) => row.key));
function isRetiredSettingKey(key) {
  return RETIRED_KEYS.has(key);
}
function retiredPathsFor(file) {
  return RETIRED_TEAM_SETTINGS.filter((row) => row.file === file).map((row) => row.path.join("."));
}
function retiredSettingLine(file, path) {
  return `${file}: removed ${path}, which paqad doesn't read any more.`;
}
function withoutLiveSetting(text, setting) {
  let next = removeKey(text, setting.path);
  for (let depth = setting.path.length - 1; depth > 0; depth -= 1) {
    const parent = setting.path.slice(0, depth);
    const value = readPath(next, parent);
    const empty = value === null || typeof value === "object" && Object.keys(value).length === 0;
    if (!empty) break;
    next = removeKey(next, parent);
  }
  return next;
}
function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}
function bodyOf(line) {
  return line.replace(/\r?\n$/u, "");
}
function commentColumn(line) {
  const match = /^(\s*)#(\s*)\S/u.exec(bodyOf(line));
  return match === null ? null : match[1].length + 1 + match[2].length;
}
function keyColumn(line) {
  return commentColumn(line) ?? bodyOf(line).search(/\S/u);
}
function enclosingGroups(lines, at) {
  const groups = [];
  let column = keyColumn(lines[at]);
  for (let index = at - 1; index >= 0; index -= 1) {
    const body = bodyOf(lines[index]);
    if (body.trim() === "") break;
    const key = GROUP_LINE.exec(body)?.[1];
    if (key === void 0 || keyColumn(lines[index]) >= column) continue;
    groups.unshift(key);
    column = keyColumn(lines[index]);
  }
  return groups;
}
function isEmptyCommentedGroup(lines, index, key) {
  const header = new RegExp(`^\\s*#\\s*${escapeRegExp(key)}:\\s*$`, "u");
  if (!header.test(bodyOf(lines[index] ?? ""))) return false;
  const column = commentColumn(lines[index]);
  const next = lines[index + 1];
  if (next === void 0 || bodyOf(next).trim() === "") return true;
  const nextColumn = commentColumn(next);
  if (nextColumn !== null) return nextColumn <= column;
  return bodyOf(next).search(/\S/u) <= column;
}
function withoutCommentedCopy(text, setting) {
  const leaf = setting.path[setting.path.length - 1];
  const copy = new RegExp(
    `^\\s*#\\s*${escapeRegExp(leaf)}:\\s*${escapeRegExp(setting.value)}\\s*$`,
    "u"
  );
  const note = new RegExp(`^\\s*#\\s*(?:#\\s*)?${escapeRegExp(setting.note)}\\s*$`, "u");
  const lines = text.split(/(?<=\n)/u);
  const parents = setting.path.slice(0, -1).join(".");
  const at = lines.findIndex(
    (line, index) => copy.test(bodyOf(line)) && enclosingGroups(lines, index).join(".") === parents
  );
  if (at < 0) return text;
  lines.splice(at, 1);
  let above = at - 1;
  if (above >= 0 && note.test(bodyOf(lines[above]))) {
    lines.splice(above, 1);
    above -= 1;
  }
  for (let depth = setting.path.length - 2; depth >= 0 && above >= 0; depth -= 1) {
    if (!isEmptyCommentedGroup(lines, above, setting.path[depth])) break;
    lines.splice(above, 1);
    above -= 1;
  }
  return lines.join("");
}
function removeRetiredSettings(file, text, shownFile, notes) {
  let next = text;
  for (const setting of RETIRED_TEAM_SETTINGS) {
    if (setting.file !== file) continue;
    next = withoutCommentedCopy(next, setting);
    if (import_yaml3.default.parseDocument(next).errors.length > 0 || !hasPath(next, setting.path)) continue;
    next = withoutLiveSetting(next, setting);
    notes.push(retiredSettingLine(shownFile, setting.path.join(".")));
  }
  return next;
}
function holdsOnlyPaqadLines(text, ownLines) {
  return text.split(/\r?\n/u).every((line) => {
    const trimmed = line.trim();
    return trimmed === "" || STAMP_LINE.test(line) || ownLines.has(trimmed) || trimmed.startsWith(LEGACY_SCHEMA_LINE_PREFIX);
  });
}
function settleRetiredSafetyFile(projectRoot, ownLines, notes) {
  const shown = `${PATHS.PROJECT_CONFIGS_DIR}/${RETIRED_SAFETY_FILE}`;
  const path = join2(projectRoot, PATHS.PROJECT_CONFIGS_DIR, RETIRED_SAFETY_FILE);
  const text = readTextIfExistsSync(path);
  if (text === null) return;
  if (isNewerTeamFile(text)) {
    notes.push(newerTeamFileLine(shown));
    return;
  }
  const lines = [];
  const next = removeRetiredSettings(RETIRED_SAFETY_FILE, swapTeamFileStamp(text), shown, lines);
  try {
    if (holdsOnlyPaqadLines(next, ownLines)) {
      rmSync(path);
      notes.push(...lines, `Removed ${shown}, which paqad doesn't read any more.`);
      return;
    }
    if (next === text) return;
    writeFileSync(path, next, "utf8");
    notes.push(
      ...lines,
      `${shown} holds notes your team wrote, so it stayed. paqad doesn't read it any more.`
    );
  } catch (error) {
    notes.push(
      `Couldn't change ${shown}: ${error instanceof Error ? error.message : "unknown error"}. The next update tries again.`
    );
  }
}

// src/core/team-config-schema.ts
init_esm_shims();
var WORKFLOW_POLICY_STAGES = [
  "planning",
  "specification",
  "development",
  "review",
  "checks",
  "documentation_sync",
  "delivery"
];
var MODULE_ATTRIBUTION_MODES = ["defer", "stop"];
var CHECKS_ON_FAILURE_MODES = ["block", "warn"];
var STRING_LIST = { type: "array", items: { type: "string" } };
var STRUCTURED_TEAM_SETTINGS = [
  ...WORKFLOW_POLICY_STAGES.flatMap((stage) => [
    {
      file: "feature-development/workflow.yaml",
      path: ["stages", stage, "read"],
      schema: {
        ...STRING_LIST,
        description: `Paths added to paqad's own read list for the ${stage} stage.`
      }
    },
    {
      file: "feature-development/workflow.yaml",
      path: ["stages", stage, "instructions"],
      schema: {
        ...STRING_LIST,
        description: `Instructions added after paqad's own instructions for the ${stage} stage.`
      }
    }
  ]),
  {
    file: "feature-development/workflow.yaml",
    path: ["stages", "planning", "module_attribution"],
    schema: {
      type: "string",
      enum: [...MODULE_ATTRIBUTION_MODES],
      default: "defer",
      description: "What planning does when a change has no module owner yet: defer it to later, or stop."
    }
  },
  {
    file: "feature-development/checks.yaml",
    path: ["commands", "from_project_profile"],
    schema: {
      ...STRING_LIST,
      description: "Command names from the project profile that the checks stage runs; [] runs none."
    }
  },
  {
    file: "feature-development/checks.yaml",
    path: ["commands", "extra"],
    schema: {
      type: "object",
      additionalProperties: { type: "string" },
      description: "Extra shell commands the checks stage runs, by name."
    }
  },
  {
    file: "feature-development/checks.yaml",
    path: ["on_failure"],
    schema: {
      type: "string",
      enum: [...CHECKS_ON_FAILURE_MODES],
      default: "block",
      description: "block stops the change when a check fails; warn records it and carries on."
    }
  }
];

// src/core/team-config-legacy.ts
init_esm_shims();
import { existsSync as existsSync3, readFileSync as readFileSync6, readdirSync } from "fs";
import { join as join6 } from "path";

// src/core/framework-config.ts
init_esm_shims();
var import_yaml5 = __toESM(require_dist(), 1);
import { mkdirSync as mkdirSync3, readFileSync as readFileSync5, writeFileSync as writeFileSync4 } from "fs";
import { availableParallelism } from "os";
import { dirname as dirname2, join as join5 } from "path";

// src/core/team-config.ts
init_esm_shims();
var import_yaml4 = __toESM(require_dist(), 1);
import { mkdirSync as mkdirSync2, readFileSync as readFileSync4, writeFileSync as writeFileSync3 } from "fs";
import { dirname, join as join4 } from "path";

// src/git-workflow/last-applied.ts
init_esm_shims();
import { createHash as createHash2 } from "crypto";
import { existsSync as existsSync2, mkdirSync, readFileSync as readFileSync3, writeFileSync as writeFileSync2 } from "fs";
import { join as join3 } from "path";
var LAST_APPLIED_FILE = ".last-applied.json";
function lastAppliedPath(projectRoot) {
  return join3(gitWorkflowDir(projectRoot), LAST_APPLIED_FILE);
}
function hashText(text) {
  return createHash2("sha256").update(text).digest("hex");
}
function readLastApplied(projectRoot) {
  try {
    const parsed = JSON.parse(readFileSync3(lastAppliedPath(projectRoot), "utf8"));
    return parsed && typeof parsed.files === "object" && parsed.files !== null ? parsed : null;
  } catch {
    return null;
  }
}
function currentHash(projectRoot, file) {
  const path = gitWorkflowFilePath(projectRoot, file);
  return existsSync2(path) ? hashText(readFileSync3(path, "utf8")) : null;
}
function stampLastApplied(projectRoot, files = GIT_WORKFLOW_FILES, options = {}) {
  const previous = readLastApplied(projectRoot);
  const hashes = { ...previous?.files ?? {} };
  for (const file of files) {
    const hash = currentHash(projectRoot, file);
    if (hash === null) delete hashes[file];
    else hashes[file] = hash;
  }
  const record = {
    applied_at: (options.now ?? (() => /* @__PURE__ */ new Date()))().toISOString(),
    paqad_version: options.version ?? "1.128.1",
    files: Object.fromEntries(
      GIT_WORKFLOW_FILES.filter((file) => hashes[file] !== void 0).map((file) => [
        file,
        hashes[file]
      ])
    )
  };
  const path = lastAppliedPath(projectRoot);
  mkdirSync(gitWorkflowDir(projectRoot), { recursive: true });
  writeFileSync2(path, `${JSON.stringify(record, null, 2)}
`, "utf8");
  return path;
}
function changedOutside(projectRoot) {
  const record = readLastApplied(projectRoot);
  return GIT_WORKFLOW_FILES.filter((file) => {
    const hash = currentHash(projectRoot, file);
    if (hash === null) return false;
    return record?.files[file] !== hash;
  });
}
function refreshLastAppliedHashes(projectRoot, files) {
  const record = readLastApplied(projectRoot);
  if (record === null || files.length === 0) return;
  const hashes = { ...record.files };
  for (const file of files) {
    const hash = currentHash(projectRoot, file);
    if (hash !== null) hashes[file] = hash;
  }
  writeFileSync2(
    lastAppliedPath(projectRoot),
    `${JSON.stringify({ ...record, files: hashes }, null, 2)}
`,
    "utf8"
  );
}

// src/core/shipped-workflow-entries.ts
init_esm_shims();
var SHIPPED_WORKFLOW_ENTRIES = {
  planning: {
    instructions: [
      "1ce8f3f499cc5a5267623630d547768356826ee48fa3f6939c5a27b35b15e710",
      "4ac7fc9778c4d77ca202fc3b2afe89b6d68e43e27ebc3824ace073009c7be832",
      "801c0bf826abd37e4a1e6ed8934d437ef2030f4cd6d88024c22e6e9a5fc6e71c",
      "86357b5b4233ab4e27a9bb572e0234f68e97fa2f62064c66ba9936576a5167fa",
      "953b0a9f2c917ea7faccb94ee7cd42483d93891b09c498e55ff8269c23f7b471",
      "9f92289c7056056a7b814a32664c50c8c9adfd0cc95c04067641c7a0adf4c1a1",
      "b9edc7bb3de249a381045afde243b6e3b5a5c26c6ee96c6a2108068f9b469082",
      "d34df5e908bc5992c57445d030247f9d6c154b867c31b01e76ab464f31aa03a0"
    ],
    read: [
      "02bf4e6b7ed51d19105fe1b389d85257a342c6b73123e5321cca2e50937e5038",
      "8daefb2f7279a537d6a6dd0ce581c53d2bf2715ff67057971b0b49ed3fef249a",
      "b3e3a3470b3aa727e195b77e3a02e398f0ca24f7ffa1fb58466644ad6986b890",
      "b94631224b0529bde91a072aad18f43434fadd4f9ceab0ec64da9c1b5f4c86c6",
      "c4f52b341a4c444d443e1177c0bc3194f4d8b3ca3b48c709451ec39483b8c879"
    ]
  },
  specification: {
    instructions: [
      "0d4a03cc5b195c308e0657bea295d09fdff2ab1d7d904a5c2179f9057f7c2ff3",
      "10a1dfb39538be6e02a361bf0a55bcb7ee08f00a3cd98a0d0b3ca4dbfd9032b1",
      "203d9aa128fa6555f1c39cbbe49c7b41797c0ad7694f7485a17d2347b26d28f9",
      "287c4e725cc0ea6602521ae246ce787acc98c9f47dd6d82dc141f8c040d0252a",
      "3cd393226ceb6a21936d1c8249f72fc17061721518a057d03f7c42e773dcece4",
      "529e23092769803d8abcdd81bbec3959596d727dddfa6e9007599b6afed47e8e",
      "728d8fd32f0465fd951c14b4bc95979876809810d2b1fd02210bce79e07bc3ff",
      "939fe17663c07f5a0ddcdb7cbd80a5b8b08b1b5c583c47ff231b996ac0f5fbd6",
      "a4eab722e1a0d1390a82be87ab9c7259c920793a63502f030e378c26b8938e18",
      "cbbed688f3db1e4f25bdc05e51ea3651db95a0367830143a2158676279e80f8b",
      "e6904489526866e2ee5d4b4e3947a1f43084efb054d4ef556eadc62f4d31b76e",
      "f5ea78cf17a527ce8932d0a8483914fbd540c799da8d301aa1a3ba7ceeff88c0",
      "f66116ac7ecbbb9e81e703e4b604cd6e1780f57edd5ff9630c6db8954063209f"
    ],
    read: []
  },
  development: {
    instructions: [
      "18bec3d3df0a86532aaef48f127be9cfa04c9ca5e5b28d832cf89266664d586e",
      "8b0328fc2eea65470223ddebf2142d30d71997e3c2c11a70262d6ab217b43ad9"
    ],
    read: []
  },
  review: {
    instructions: [
      "0bc2c195b12572c21f8638f4b5f1124a7844977880387c401ce9bda3f53a3f8a",
      "3b5bc059c24e85b6170ed7f9ab24b4673b399774b02e0a61cbeac905196c65d6",
      "424432a63dd68339b6c75897fbc327d982dd7d971a24c01e7542171180759f80",
      "5cbbdcd40026ab0a53b0f855cfbeb4181ccc50802d4ae3e20d185829d8e8a5c7",
      "7db7c7cdce46aed7d8c3c954949a7193e54b8469a57310614a6ebdf1049b35c7",
      "7f71e64ffc7ee311aca8d75cb2087352310eb166d677410ac0d5a00d4129491c",
      "b6dac6bab99a4dc745899077e5c9c814b7a4656e5d92758ec81dd8330e66a170",
      "d747c93f72d9e7e0a638af87c44ad512f5b23e01eda225a983c73d66e6145ad1"
    ],
    read: []
  },
  checks: {
    instructions: [
      "238d233be61e4e65a462668e5109f13b0619cc8d9edc98b632a1fe078297dcb1",
      "342b23d279474ca2e3bf6641a395adfc0a6803551688335cc1d4566309b22aa0",
      "38e05f96b31def89ce66f6a5bca68bbe85e4a8e3e20946d1532f25f187f5e0a2",
      "8ec76a52b7876ab63f4c9219500fe20f623f2ab07185d6de5694a4865dd2e416",
      "a0a8c6a4596311bb628496c38c10cc63aa92d0015df65d50969864c498feae0a"
    ],
    read: []
  },
  documentation_sync: {
    instructions: [
      "7db7c7cdce46aed7d8c3c954949a7193e54b8469a57310614a6ebdf1049b35c7",
      "ddbf78cb3f2699e57d80a4210e1a7d9ef5aa4d78ebd3b00efdbad10efd17a3df"
    ],
    read: []
  },
  delivery: {
    instructions: [
      "21b327f17a4bb4923eb45d6a216195f8f86d4e4aa636697871b5a9bf4674c9e3",
      "285f9aa79338ed6576c4bc2852aeb043f3591c8f8378ffcd76b388d7c14332da",
      "45a534df9df405f749724f6142dee5873e7dc974a2c532b8ded8501475db4bd9",
      "552c7b75a38d6d34acaeaf0561cd1c847e7826b1b3e4c3dc22d2cc2d42c1ddcc",
      "5820e2202c597bb227312c97dd40f4f586d75cd4269434f737efbc571e7b4470",
      "595ceba7e0d78777470363549de32c2ec261d2e0c87ba6fcab9619b4aadecfaa",
      "77f53599ec7c91502c606159ea939e2803c2ddf37db7cc806feda675474da963",
      "89b4e07519330bf528e0ac5e7e0cfb80e9a44327fe49b0935bc0970f06fd8001",
      "90123dbdbb99e7032e9fa72dd5dd1f06b98b2ef9de2c9fd56a938a8d8a00cd93",
      "907f052ae5105d0456b0b2cbc3e3d12a394619feb98465ce5b055f75301c0c72",
      "a210482935ffaaa7c963f68df4da024269a688737908ed1f49f5d4e7dec68686",
      "a8e228db0a4661bb322500775fe3a3912ee27c32d3a3bff164ef0f8929b55c2b",
      "a9bcfa8a946a60fc63652b1cebf94f027fadccafa858c6ed935138076b345bb4",
      "ac380805692d109f30877e9e64aa51ece5d9ba34d0b4a36c7c75635d6936dde5",
      "c4cdd933749cf03a0e20622b2624dcc845c412796bf95bb8083561bb0da2567c",
      "c8d1d37d06dbe9787a2927ca4da52769948aed0b505001697c4103a933242031",
      "ef2c3235d3fc88d81d3c4c00d5a20eb8e8eb4351752ddf79f4169d7f91c1c47d",
      "f977c930cbaae29482f3e9941094ef7184c012b3e47d9864bd3cb6485df96b77"
    ],
    read: []
  }
};
var STAGE_DEFINITION_LINE_START = "The definition of these stages is ";
var DELIVERY_LINE_START = "When the change is delivered, follow ";
var SHIPPED_RULE_LINES = {
  cc6bf55c079e2de3d681f74f20db927d587a666635fc68a7b4bf6a8535005a5a: STAGE_DEFINITION_LINE_START,
  "203fd3ff0d91a615cbf338f0e9f94d149e5e317d07522cb9366853d6cd822ec8": STAGE_DEFINITION_LINE_START,
  "793fe5a5d156fd52ccf77c7c5433b1d48925e5a229806f9ff043f4e34835c4ba": DELIVERY_LINE_START,
  "5e389792ed0469b8edcb2e07a5a6a61cd498dd5398607183f86faf0568094331": DELIVERY_LINE_START,
  "9485b127af47e5a2aa88686f49686465a7935d4a02dd19e5e0d191eb6a5ca3d4": DELIVERY_LINE_START
};
function shippedRuleLineStart(line) {
  return SHIPPED_RULE_LINES[shippedWorkflowEntryHash(stripRuleMarker(line).text)] ?? null;
}
function shippedWorkflowEntryHash(text) {
  return sha256(text.replace(/\s+/gu, " ").trim());
}
function isShippedWorkflowEntry(stage, kind, text) {
  return SHIPPED_WORKFLOW_ENTRIES[stage]?.[kind].includes(shippedWorkflowEntryHash(text)) === true;
}

// src/core/team-config-values.ts
init_esm_shims();
var TEAM_CONFIG_FILES = [
  "paqad.yaml",
  "models.yaml",
  "retrieval.yaml",
  "decisions.yaml",
  "authoring.yaml",
  "feature-development/workflow.yaml",
  "feature-development/specification.yaml",
  "feature-development/rules.yaml",
  "feature-development/reuse.yaml",
  "feature-development/checks.yaml",
  "feature-development/evidence.yaml",
  "feature-development/analytics.yaml"
];
var GIT_WORKFLOW_COMMITS_FILE = "git-workflow/commits.yaml";
var TEAM_CONFIG_FILE_DESCRIPTIONS = {
  "paqad.yaml": "The package itself: on/off, updates, Claude Code install, HUD and Site Map.",
  "models.yaml": "Which models paqad uses.",
  "retrieval.yaml": "How paqad finds relevant code and docs (RAG).",
  "decisions.yaml": "When paqad stops to ask you, in any workflow.",
  "authoring.yaml": "How paqad writes and tests skills and helper agents, and its eval runs.",
  "feature-development/workflow.yaml": "Lanes, stage helpers, stage tracking, and per stage: effort, model, extra reads and instructions.",
  "feature-development/specification.yaml": "The spec pipeline, its questions, the final review and the experts.",
  "feature-development/rules.yaml": "How project rules are loaded and enforced.",
  "feature-development/reuse.yaml": "The existing-code digest, the duplication gate and the create-vs-reuse pause.",
  "feature-development/checks.yaml": "What the checks stage runs and how: commands, parallel runs, flaky tests, mutation testing.",
  "feature-development/evidence.yaml": "The proof a change leaves: bundle, report, metrics, screenshots and enterprise outputs.",
  "feature-development/analytics.yaml": "Analytics instrumentation (opt-in).",
  "git-workflow/commits.yaml": "The commit rules (owned by the git-workflow skill)."
};
var TRUTHY = /* @__PURE__ */ new Set(["1", "true", "yes", "on"]);
var FALSY = /* @__PURE__ */ new Set(["0", "false", "no", "off"]);
function scalarText2(value) {
  return typeof value === "string" ? value : String(value);
}
function renameMap(pairs) {
  const reverse = new Map(Object.entries(pairs).map(([legacy, yaml]) => [yaml, legacy]));
  return {
    toYaml: (legacy) => pairs[legacy.trim()] ?? legacy.trim(),
    fromYaml: (yaml) => {
      const text = scalarText2(yaml).trim();
      return reverse.get(text) ?? text;
    }
  };
}
function retiredValueMap(retired) {
  const retiredValues = new Map(Object.entries(retired));
  const current = (value) => retiredValues.get(value) ?? value;
  return {
    toYaml: (legacy) => current(legacy.trim()),
    fromYaml: (yaml) => current(scalarText2(yaml).trim()),
    retiredValues
  };
}
function booleanEnumMap(whenTrue, whenFalse) {
  return {
    toYaml: (legacy) => {
      const text = legacy.trim().toLowerCase();
      if (TRUTHY.has(text)) return whenTrue;
      if (FALSY.has(text)) return whenFalse;
      return legacy.trim();
    },
    fromYaml: (yaml) => {
      if (yaml === true) return "true";
      if (yaml === false) return "false";
      const text = scalarText2(yaml).trim();
      if (text === whenTrue) return "true";
      if (text === whenFalse) return "false";
      return text;
    },
    yamlEnum: [whenTrue, whenFalse]
  };
}
var ZERO_IS_AUTO = {
  toYaml: (legacy) => {
    const parsed = Number(legacy.trim());
    if (legacy.trim() !== "" && Number.isFinite(parsed)) return parsed === 0 ? "auto" : parsed;
    return legacy.trim();
  },
  fromYaml: (yaml) => {
    const text = scalarText2(yaml).trim();
    return text === "auto" ? "0" : text;
  },
  yamlEnum: ["auto"],
  zeroIsAuto: true
};
var COMMA_LIST = {
  toYaml: (legacy) => legacy.split(",").map((entry) => entry.trim()).filter((entry) => entry !== ""),
  fromYaml: (yaml) => Array.isArray(yaml) ? yaml.map((entry) => scalarText2(entry).trim()).filter((entry) => entry !== "").join(",") : scalarText2(yaml).trim(),
  list: true
};
var STRICT_TO_BLOCK = renameMap({ strict: "block" });
var FAIL_TO_BLOCK = renameMap({ fail: "block" });
var BLOCKING_ONLY = renameMap({ "blocking-only": "blocking_only" });
var ASK_OFTEN = renameMap({ strict: "often", balanced: "balanced", permissive: "rarely" });
var EXISTING = "1.0.0";
function home(file, dotted2, yaml) {
  return yaml === void 0 ? { file, path: dotted2.split("."), since: EXISTING } : { file, path: dotted2.split("."), yaml, since: EXISTING };
}
var WF = "feature-development/workflow.yaml";
var SPEC = "feature-development/specification.yaml";
var RULES = "feature-development/rules.yaml";
var REUSE = "feature-development/reuse.yaml";
var CHECKS = "feature-development/checks.yaml";
var EVIDENCE = "feature-development/evidence.yaml";
var ANALYTICS = "feature-development/analytics.yaml";
var AUTHORING = "authoring.yaml";
var STAGE_HOMES = Object.fromEntries(
  ["planning", "specification", "development", "review", "checks", "documentation_sync"].flatMap(
    (stage) => [
      [`stage_effort_${stage}`, home(WF, `stages.${stage}.effort`)],
      [`stage_model_${stage}`, home(WF, `stages.${stage}.model`)]
    ]
  )
);
var TEAM_CONFIG_HOMES = {
  paqad_enable: home("paqad.yaml", "enabled"),
  team_bootstrap_enabled: home("paqad.yaml", "team_bootstrap.enabled"),
  auto_update: home("paqad.yaml", "updates.automatic"),
  minimum_version: home("paqad.yaml", "updates.minimum_version"),
  version_check_interval_hours: home("paqad.yaml", "updates.check_every_hours"),
  site_map: home("paqad.yaml", "site_map.enabled"),
  rules_discovery_private_packages: home(
    "paqad.yaml",
    "rules_discovery.private_packages",
    COMMA_LIST
  ),
  hud_view: home("paqad.yaml", "hud.band"),
  hud_chime: home("paqad.yaml", "hud.chime"),
  plugin_migration: home("paqad.yaml", "claude_code.plugin_migration"),
  claude_install_mode: home("paqad.yaml", "claude_code.install_mode"),
  model_default: home("models.yaml", "models.default"),
  model_reasoning: home("models.yaml", "models.reasoning"),
  model_fast: home("models.yaml", "models.fast"),
  rag_enabled: home("retrieval.yaml", "enabled"),
  rag_embedding_provider: home("retrieval.yaml", "embeddings.provider"),
  rag_embedding_model: home("retrieval.yaml", "embeddings.model"),
  rag_similarity_threshold: home("retrieval.yaml", "match.min_similarity"),
  rag_relief_floor: home("retrieval.yaml", "match.fallback_min_similarity"),
  rag_top_n: home("retrieval.yaml", "match.max_results"),
  rag_max_file_size: home("retrieval.yaml", "index.max_file_size_bytes"),
  rag_base_branch: home("retrieval.yaml", "index.base_branch"),
  decisions_ask_threshold: home("decisions.yaml", "ask", {
    ...ASK_OFTEN,
    yamlEnum: ["often", "balanced", "rarely"]
  }),
  ai_attribution: home(GIT_WORKFLOW_COMMITS_FILE, "ai_attribution"),
  spec_only_mode: home(WF, "stop_after", booleanEnumMap("specification", "none")),
  market_research: home(WF, "stages.planning.research.market"),
  design_research: home(WF, "stages.planning.research.design"),
  team_agents: home(WF, "stage_helpers.team_agents"),
  ...STAGE_HOMES,
  stages_mode: home(WF, "stage_tracking", STRICT_TO_BLOCK),
  stage_isolation_lanes: home(WF, "stage_helpers.on_lanes", COMMA_LIST),
  spec_pipeline_enabled: home(SPEC, "pipeline.enabled"),
  spec_pipeline_clarification: home(SPEC, "questions", STRICT_TO_BLOCK),
  spec_pipeline_final_review: home(SPEC, "final_review", STRICT_TO_BLOCK),
  spec_pipeline_token_ceiling: home(SPEC, "pipeline.max_tokens"),
  spec_grounding_budget_ms: home(SPEC, "pipeline.grounding_timeout_ms"),
  spec_pipeline_experts_enabled: home(SPEC, "experts.enabled"),
  spec_pipeline_adoption: home(SPEC, "hand_written_specs", STRICT_TO_BLOCK),
  spec_pipeline_experts_lanes: home(SPEC, "experts.standing_on_lanes", COMMA_LIST),
  spec_pipeline_standing_experts: home(SPEC, "experts.standing", COMMA_LIST),
  lean_rules: home(RULES, "loading", booleanEnumMap("lean", "full")),
  rule_compliance: home(RULES, "enforcement", STRICT_TO_BLOCK),
  rule_gate_pre_edit: home(RULES, "before_edit.run", BLOCKING_ONLY),
  rule_gate_concurrency: home(RULES, "max_parallel"),
  rule_gate_budget_ms: home(RULES, "before_edit.budget_ms"),
  existing_surface_tokens: home(REUSE, "existing_code_digest.max_tokens"),
  duplication_mode: home(REUSE, "duplication.gate", STRICT_TO_BLOCK),
  duplication_similarity_threshold: home(REUSE, "duplication.min_similarity"),
  duplication_min_lines: home(REUSE, "duplication.min_lines"),
  decision_arm_mode: home(REUSE, "create_vs_reuse.pause", STRICT_TO_BLOCK),
  decision_arm_plan_threshold: home(REUSE, "create_vs_reuse.min_similarity"),
  decision_arm_max_per_change: home(REUSE, "create_vs_reuse.max_pauses_per_change"),
  checks_parallel: home(CHECKS, "parallel"),
  checks_max_processes: home(CHECKS, "max_processes", ZERO_IS_AUTO),
  mutation_mode: home(CHECKS, "mutation_testing", STRICT_TO_BLOCK),
  checks_flaky_under_parallel: home(CHECKS, "flaky_tests", FAIL_TO_BLOCK),
  enterprise: home(EVIDENCE, "enterprise.enabled"),
  enterprise_evidence_ledger: home(EVIDENCE, "enterprise.ledger"),
  enterprise_ai_bom: home(EVIDENCE, "enterprise.ai_bom"),
  enterprise_compliance_citations: home(EVIDENCE, "enterprise.compliance_citations"),
  visual_evidence: home(EVIDENCE, "screenshots.enabled"),
  feature_report: home(EVIDENCE, "report"),
  metrics_enabled: home(EVIDENCE, "change_metrics"),
  bundle_completeness: home(EVIDENCE, "bundle", STRICT_TO_BLOCK),
  visual_evidence_mode: home(EVIDENCE, "screenshots.gate", STRICT_TO_BLOCK),
  evidence_existence_gate: home(
    EVIDENCE,
    "legacy_existence_check",
    retiredValueMap({ strict: "warn" })
  ),
  analytics_instrumentation: home(ANALYTICS, "enabled"),
  analytics_strictness: home(ANALYTICS, "gate", STRICT_TO_BLOCK),
  skill_orchestrator_enabled: home(AUTHORING, "skills.enabled"),
  authoring_trigger_threshold: home(AUTHORING, "skills.trigger_threshold"),
  authoring_trigger_min_runs: home(AUTHORING, "skills.trigger_min_runs"),
  skill_eval_min_gain_points: home(AUTHORING, "skills.eval_min_gain_points"),
  skill_eval_max_token_multiple: home(AUTHORING, "skills.eval_max_token_multiple"),
  authoring_fact_max_age_days: home(AUTHORING, "skills.fact_max_age_days"),
  authoring_collision_jaccard: home(AUTHORING, "skills.collision_jaccard"),
  authoring_description_budget_chars: home(AUTHORING, "skills.description_budget_chars"),
  skill_body_max_tokens: home(AUTHORING, "skills.body_max_tokens"),
  authoring_regression_tolerance: home(AUTHORING, "skills.regression_tolerance"),
  authoring_dark_window_days: home(AUTHORING, "skills.dark_window_days"),
  agent_orchestrator_enabled: home(AUTHORING, "agents.enabled"),
  agent_pass_k_threshold: home(AUTHORING, "agents.pass_k_threshold"),
  agent_stage_pass_k_threshold: home(AUTHORING, "agents.stage_pass_k_threshold"),
  agent_delegation_threshold: home(AUTHORING, "agents.delegation_threshold"),
  agent_description_max_tokens: home(AUTHORING, "agents.description_max_tokens"),
  agent_report_max_tokens: home(AUTHORING, "agents.report_max_tokens"),
  agent_prompt_max_tokens: home(AUTHORING, "agents.prompt_max_tokens"),
  agent_max_tools: home(AUTHORING, "agents.max_tools"),
  agent_max_cost_multiple: home(AUTHORING, "agents.max_cost_multiple"),
  agent_catalog_description_max_tokens: home(AUTHORING, "agents.catalog_description_max_tokens"),
  agent_memory_max_lines: home(AUTHORING, "agents.memory_max_lines"),
  authoring_runs_per_arm: home(AUTHORING, "runs.per_arm"),
  authoring_max_iterations: home(AUTHORING, "runs.max_iterations"),
  authoring_tool_result_max_tokens: home(AUTHORING, "runs.tool_result_max_tokens"),
  authoring_cache_hit_min: home(AUTHORING, "runs.cache_hit_min"),
  authoring_batch_mode: home(AUTHORING, "runs.batch"),
  authoring_run_max_cost_usd: home(AUTHORING, "runs.max_cost_usd"),
  authoring_otel_endpoint: home(AUTHORING, "runs.otel_endpoint")
};
function teamConfigHome(key) {
  const found = TEAM_CONFIG_HOMES[key];
  if (found === void 0) {
    throw new Error(`Setting ${key} has no home in the team YAML files.`);
  }
  return found;
}
function toYamlValue(spec, legacy) {
  if (spec.yaml !== void 0) return spec.yaml.toYaml(legacy);
  const text = legacy.trim();
  if (spec.type === "boolean") {
    const lower = text.toLowerCase();
    if (TRUTHY.has(lower)) return true;
    if (FALSY.has(lower)) return false;
    return text;
  }
  if (spec.type === "number") {
    const parsed = Number(text);
    return text !== "" && Number.isFinite(parsed) ? parsed : text;
  }
  return text;
}
function fromYamlValue(spec, yaml) {
  if (spec.yaml !== void 0) return spec.yaml.fromYaml(yaml);
  return scalarText2(yaml).trim();
}
function yamlDefault(spec) {
  return spec.default === void 0 ? void 0 : toYamlValue(spec, String(spec.default));
}
function yamlEnumOf(spec) {
  if (spec.yaml?.zeroIsAuto || spec.yaml?.list) return void 0;
  if (spec.yaml?.yamlEnum !== void 0) return spec.yaml.yamlEnum;
  if (spec.enumValues === void 0) return void 0;
  return spec.enumValues.map((value) => scalarText2(toYamlValue(spec, value)));
}
function isScalar2(value) {
  return typeof value === "string" || typeof value === "number" || typeof value === "boolean";
}
function isNumeric(value) {
  if (typeof value === "number") return Number.isFinite(value);
  return typeof value === "string" && value.trim() !== "" && Number.isFinite(Number(value));
}
function checkYamlValue(spec, yaml) {
  if (spec.yaml?.list) {
    if (typeof yaml === "string") return null;
    return Array.isArray(yaml) && yaml.every(isScalar2) ? null : "It must be a list of names.";
  }
  if (spec.yaml?.zeroIsAuto) {
    return yaml === "auto" || isNumeric(yaml) ? null : "It must be a number or auto.";
  }
  if (isScalar2(yaml) && spec.yaml?.retiredValues?.has(scalarText2(yaml).trim())) return null;
  const allowed = yamlEnumOf(spec);
  if (allowed !== void 0) {
    return isScalar2(yaml) && allowed.includes(scalarText2(yaml).trim()) ? null : `It must be one of: ${allowed.join(", ")}.`;
  }
  if (spec.type === "boolean") {
    if (typeof yaml === "boolean") return null;
    return typeof yaml === "string" && (TRUTHY.has(yaml.trim().toLowerCase()) || FALSY.has(yaml.trim().toLowerCase())) ? null : "It must be true or false.";
  }
  if (spec.type === "number") return isNumeric(yaml) ? null : "It must be a number.";
  return isScalar2(yaml) ? null : "It must be a single value.";
}
function personalValue(spec, raw) {
  if (spec?.yaml === void 0 || spec.yaml.list) return raw;
  return spec.yaml.fromYaml(raw);
}

// src/core/team-config.ts
var TEAM_CONFIG_READ_FILES = [
  ...TEAM_CONFIG_FILES,
  GIT_WORKFLOW_COMMITS_FILE
];
function teamConfigPath(projectRoot, file) {
  return join4(projectRoot, PATHS.PROJECT_CONFIGS_DIR, file);
}
function renderValue(value) {
  return typeof value === "string" ? value : JSON.stringify(value);
}
function invalidValueMessage(spec, value, reason) {
  const def = spec.default === void 0 ? "(unset)" : renderValue(toYamlValue(spec, String(spec.default)));
  return `${spec.file}: ${spec.path.join(".")} has an invalid value ${renderValue(value)}, so paqad uses the default ${def}. ${reason}`;
}
function invalidFileMessage(file, parserMessage) {
  return `${file} isn't valid YAML, so none of its settings are used: ${parserMessage}`;
}
function notSettingsMapMessage(file) {
  return `${file} holds a list or a single value instead of settings, so none of its settings are used.`;
}
function isOwnTeamConfigFile(file) {
  return TEAM_CONFIG_FILES.includes(file);
}
function holdsSettings(document) {
  return document.contents === null || import_yaml4.default.isMap(document.contents);
}
function parseTeamConfigText(file, text) {
  const repaired = isOwnTeamConfigFile(file) ? repairTeamConfigText(file, text) : { text, repairs: [] };
  const document = import_yaml4.default.parseDocument(repaired.text);
  if (document.errors.length > 0) {
    return {
      document: null,
      error: document.errors[0].message.split("\n")[0],
      repairs: repaired.repairs
    };
  }
  return { document, repairs: repaired.repairs };
}
function readTeamYamlFile(projectRoot, file) {
  const path = teamConfigPath(projectRoot, file);
  let text;
  try {
    text = readFileSync4(path, "utf8");
  } catch {
    return { document: null, repairs: [] };
  }
  return parseTeamConfigText(file, text);
}
function valueAt(data, path) {
  let node = data;
  for (const segment of path) {
    if (node === null || typeof node !== "object" || Array.isArray(node)) return void 0;
    node = node[segment];
  }
  return node;
}
function readTeamConfig(projectRoot) {
  const merged = /* @__PURE__ */ new Map();
  const sources = /* @__PURE__ */ new Map();
  const issues = [];
  const claimed = /* @__PURE__ */ new Set();
  for (const file of TEAM_CONFIG_READ_FILES) {
    const { document, error, repairs } = readTeamYamlFile(projectRoot, file);
    if (error !== void 0) {
      issues.push({ file, kind: "invalid", message: invalidFileMessage(file, error) });
      continue;
    }
    if (document === null) continue;
    if (!holdsSettings(document)) {
      issues.push({ file, kind: "invalid", message: notSettingsMapMessage(file) });
      continue;
    }
    for (const repair of repairs) issues.push({ file, kind: "repaired", message: repair.message });
    const data = document.toJS();
    for (const spec of FRAMEWORK_CONFIG_SPECS) {
      if (spec.file !== file) continue;
      const value = valueAt(data, spec.path);
      if (value === void 0 || value === null) continue;
      claimed.add(spec.key);
      const reason = checkYamlValue(spec, value);
      if (reason !== null) {
        issues.push({
          file,
          key: spec.key,
          path: spec.path.join("."),
          message: invalidValueMessage(spec, value, reason)
        });
        continue;
      }
      merged.set(spec.key, fromYamlValue(spec, value));
      sources.set(spec.key, teamConfigPath(projectRoot, file));
    }
  }
  if (!legacyTeamConfigReadable()) return { merged, collisions: [], sources, issues };
  const legacy = readLegacyTeamConfig(projectRoot);
  for (const [key, value] of legacy.merged) {
    const source = legacy.sources.get(key);
    const oldFile = source.split(/[\\/]/u).pop();
    if (claimed.has(key)) {
      const spec = FRAMEWORK_CONFIG_SPECS.find((row) => row.key === key);
      issues.push({
        file: oldFile,
        key,
        kind: "legacy",
        message: legacyBothLine(key, oldFile, spec.file)
      });
      continue;
    }
    merged.set(key, value);
    sources.set(key, source);
    issues.push({ file: oldFile, key, kind: "legacy", message: legacyStillLine(key, oldFile) });
  }
  return { merged, collisions: legacy.collisions, sources, issues };
}
function setLiveValue(document, path, value) {
  if (!import_yaml4.default.isMap(document.contents)) document.contents = new import_yaml4.default.YAMLMap();
  let map = document.contents;
  for (const segment of path.slice(0, -1)) {
    const next = map.get(segment, true);
    if (import_yaml4.default.isMap(next)) {
      map = next;
      continue;
    }
    const created = new import_yaml4.default.YAMLMap();
    map.set(segment, created);
    map = created;
  }
  map.set(path[path.length - 1], document.createNode(value));
}
function writeTeamYamlValue(projectRoot, file, path, value) {
  const target = teamConfigPath(projectRoot, file);
  const existing = readTextIfExistsSync(target);
  mkdirSync2(dirname(target), { recursive: true });
  if (existing !== null && isNewerTeamFile(existing)) {
    throw new Error(newerTeamFileLine(`${PATHS.PROJECT_CONFIGS_DIR}/${file}`));
  }
  if (!isOwnTeamConfigFile(file)) {
    const document2 = import_yaml4.default.parseDocument(existing ?? "");
    if (document2.errors.length > 0) {
      throw new Error(invalidFileMessage(file, document2.errors[0].message));
    }
    document2.setIn([...path], value);
    writeFileSync3(target, document2.toString({ lineWidth: 0 }), "utf8");
    stampLastApplied(projectRoot, ["commits.yaml"]);
    return target;
  }
  const blocked = existing === null ? null : renderWriteBlock(existing, `${PATHS.PROJECT_CONFIGS_DIR}/${file}`);
  if (blocked !== null) throw new Error(blocked);
  const { document, error } = existing === null ? { document: new import_yaml4.default.Document(), error: void 0 } : parseTeamConfigText(file, existing);
  if (error !== void 0 || document === null) {
    throw new Error(invalidFileMessage(file, error ?? ""));
  }
  if (!holdsSettings(document)) throw new Error(notSettingsMapMessage(file));
  setLiveValue(document, path, value);
  writeFileSync3(target, renderTeamConfigFile(file, document), "utf8");
  return target;
}
function setTeamConfigValue(projectRoot, key, legacyValue) {
  const spec = FRAMEWORK_CONFIG_SPECS.find((row) => row.key === key);
  if (spec === void 0) {
    throw new Error(`${key} isn't a paqad setting.`);
  }
  return writeTeamYamlValue(projectRoot, spec.file, spec.path, toYamlValue(spec, legacyValue));
}
function ensureTeamConfigFiles(projectRoot) {
  const created = [];
  for (const file of TEAM_CONFIG_FILES) {
    const path = teamConfigPath(projectRoot, file);
    mkdirSync2(dirname(path), { recursive: true });
    try {
      writeFileSync3(path, renderTeamConfigFile(file, null), { encoding: "utf8", flag: "wx" });
    } catch (error) {
      if (error.code === "EEXIST") continue;
      throw error;
    }
    created.push(path);
  }
  return created;
}
function replaceRetiredValues(file, text, document, notes) {
  let next = text;
  for (const spec of FRAMEWORK_CONFIG_SPECS) {
    if (spec.file !== file) continue;
    const value = document.getIn([...spec.path]);
    if (typeof value !== "string") continue;
    const replacement = spec.yaml?.retiredValues?.get(value.trim());
    if (replacement === void 0) continue;
    next = setValue(repairTeamConfigText(file, next).text, spec.path, replacement);
    notes.push(
      `${PATHS.PROJECT_CONFIGS_DIR}/${file}: ${spec.path.join(".")} was ${value.trim()}, which this check doesn't have any more, so it is now ${replacement}.`
    );
  }
  return next;
}
var SHIPPED_ENTRY_LABELS = [
  ["read", "read path"],
  ["instructions", "instruction"]
];
var WORKFLOW_TEAM_FILE = "feature-development/workflow.yaml";
var REMOVED_ENTRY_PREFIX = "Removed an old copy of paqad's ";
function keepComments(document, node) {
  if (!import_yaml4.default.isNode(node)) return;
  const kept = [node.commentBefore, node.comment].filter(
    (comment) => typeof comment === "string" && comment.trim() !== ""
  );
  if (kept.length === 0) return;
  document.comment = [document.comment, ...kept].filter(Boolean).join("\n");
}
function pruneEmptyMap(document, path) {
  const node = document.getIn(path, true);
  if (import_yaml4.default.isMap(node) && node.items.length === 0) document.deleteIn(path);
}
function removeShippedWorkflowEntries(document, notes) {
  const before = notes.length;
  for (const stage of WORKFLOW_POLICY_STAGES) {
    for (const [kind, label] of SHIPPED_ENTRY_LABELS) {
      const path = ["stages", stage, kind];
      const list = document.getIn(path, true);
      if (!import_yaml4.default.isSeq(list)) continue;
      const kept = list.items.filter((item) => {
        if (!import_yaml4.default.isScalar(item) || typeof item.value !== "string") return true;
        if (!isShippedWorkflowEntry(stage, kind, item.value)) return true;
        keepComments(document, item);
        const start = item.value.replace(/\s+/gu, " ").trim().slice(0, 60);
        notes.push(`${REMOVED_ENTRY_PREFIX}${stage} ${label} from ${WORKFLOW_TEAM_FILE}: ${start}`);
        return false;
      });
      if (kept.length === list.items.length) continue;
      list.items = kept;
      if (kept.length > 0) continue;
      const parent = document.getIn(["stages", stage], true);
      if (import_yaml4.default.isMap(parent)) {
        keepComments(
          document,
          parent.items.find((pair) => import_yaml4.default.isScalar(pair.key) && pair.key.value === kind)?.key
        );
      }
      keepComments(document, list);
      document.deleteIn(path);
    }
    pruneEmptyMap(document, ["stages", stage]);
  }
  pruneEmptyMap(document, ["stages"]);
  return notes.length > before;
}
function withoutShippedWorkflowEntries(text, notes) {
  const crlf = text.includes("\r\n");
  const document = import_yaml4.default.parseDocument(crlf ? text.replace(/\r\n/gu, "\n") : text);
  if (!removeShippedWorkflowEntries(document, notes)) return text;
  const next = document.toString({ lineWidth: 0 });
  return crlf ? next.replace(/\n/gu, "\r\n") : next;
}
function swapOwnHeader(text) {
  return OLD_RENDERED_LINES.reduce(
    (current, [oldLine, newLine]) => current.replace(oldLine, () => newLine),
    text
  );
}
function settledTeamFileText(file, text, document, notes) {
  const malformed = readTeamFileStamp(text).kind === "malformed";
  let next = malformed ? text : swapOwnHeader(swapTeamFileStamp(text));
  next = removeRetiredSettings(file, next, `${PATHS.PROJECT_CONFIGS_DIR}/${file}`, notes);
  next = replaceRetiredValues(file, next, document, notes);
  if (file === WORKFLOW_TEAM_FILE) next = withoutShippedWorkflowEntries(next, notes);
  return next;
}
function syncTeamConfigFiles(projectRoot, problems = [], version = "1.128.1") {
  if (checkoutIsNewer(projectRoot, version)) return [];
  const written = ensureTeamConfigFiles(projectRoot);
  for (const file of TEAM_CONFIG_FILES) {
    const path = teamConfigPath(projectRoot, file);
    if (written.includes(path)) continue;
    const text = readTextIfExistsSync(path);
    if (text === null) continue;
    if (isNewerTeamFile(text)) {
      problems.push(newerTeamFileLine(`${PATHS.PROJECT_CONFIGS_DIR}/${file}`));
      continue;
    }
    const { document, error } = parseTeamConfigText(file, text);
    if (error !== void 0 || document === null) {
      problems.push(invalidFileMessage(file, error ?? ""));
      continue;
    }
    if (!holdsSettings(document)) {
      problems.push(notSettingsMapMessage(file));
      continue;
    }
    const next = settledTeamFileText(file, text, document, problems);
    if (next === text) continue;
    try {
      writeFileSync3(path, next, "utf8");
    } catch (error2) {
      problems.push(
        `Couldn't write ${PATHS.PROJECT_CONFIGS_DIR}/${file}: ${error2 instanceof Error ? error2.message : "unknown error"}. The next update tries again.`
      );
      continue;
    }
    written.push(path);
  }
  settleRetiredSafetyFile(projectRoot, retiredSafetyOwnLines(), problems);
  return written;
}
var RETIRED_SAFETY_DESCRIPTION = "# Destructive operations, risky migrations, security findings and database review.";
var OLD_MODELS_DESCRIPTION = "# Which models paqad uses and how deep research goes.";
function retiredSafetyOwnLines() {
  return /* @__PURE__ */ new Set([RETIRED_SAFETY_DESCRIPTION, ...TEAM_CONFIG_HEADER_LINES, ...OLD_HEADER_LINES]);
}
var TEAM_CONFIG_HEADER_LINES = [
  "# To change a setting, remove the # in front of it. Settings added later aren't listed here. See .paqad/.config.example or run paqad-ai config show.",
  "# A setting left commented out uses paqad's default, which can improve in a later version.",
  "# Inside a group, also remove the # in front of the group name, such as updates:."
];
var OLD_RENDERED_FIRST_LINE = "# Every setting is listed with paqad's default. To change one, remove the # in front of it.";
var OLD_RENDERED_GROUP_LINE = "# Inside a group, also remove the # in front of the group name, such as updates:. paqad-ai update does this for you.";
var OLD_RENDERED_LINES = [
  [OLD_RENDERED_FIRST_LINE, TEAM_CONFIG_HEADER_LINES[0]],
  [OLD_RENDERED_GROUP_LINE, TEAM_CONFIG_HEADER_LINES[2]]
];
var OLD_HEADER_LINES = [
  "# Only settings this team changed live here; everything else uses paqad's default.",
  "# See every setting, its value and where it comes from: paqad-ai config show",
  OLD_RENDERED_FIRST_LINE,
  OLD_RENDERED_GROUP_LINE
];
var TEAM_NOTES_LINE = "# Notes the team wrote, kept as written:";
var NOT_SET_BY_DEFAULT = " Not set by default.";
function teamFileSettings(file) {
  const settings = [];
  for (const spec of FRAMEWORK_CONFIG_SPECS) {
    if (spec.file !== file) continue;
    settings.push({
      path: spec.path,
      note: spec.comment,
      value: yamlDefault(spec),
      list: spec.yaml?.list === true
    });
  }
  for (const setting of STRUCTURED_TEAM_SETTINGS) {
    if (setting.file !== file) continue;
    settings.push({
      path: setting.path,
      note: typeof setting.schema.description === "string" ? setting.schema.description : "",
      value: setting.schema.default,
      list: setting.schema.type === "array"
    });
  }
  return settings;
}
function settingsTree(file) {
  const root = { key: "", path: [], children: /* @__PURE__ */ new Map() };
  for (const setting of teamFileSettings(file)) {
    let node = root;
    for (const segment of setting.path) {
      let child = node.children.get(segment);
      if (child === void 0) {
        child = { key: segment, path: [...node.path, segment], children: /* @__PURE__ */ new Map() };
        node.children.set(segment, child);
      }
      node = child;
    }
    node.setting = setting;
  }
  return root;
}
function settingNote(setting) {
  return setting.value === void 0 && !setting.list ? `${setting.note}${NOT_SET_BY_DEFAULT}` : setting.note;
}
function inlineYaml(value) {
  if (value !== null && typeof value === "object") {
    const document = new import_yaml4.default.Document(value);
    if (import_yaml4.default.isCollection(document.contents)) document.contents.flow = true;
    return document.toString({ lineWidth: 0 }).trimEnd();
  }
  return import_yaml4.default.stringify(value, { lineWidth: 0 }).trimEnd();
}
function defaultText(setting) {
  if (setting.value !== void 0) return ` ${inlineYaml(setting.value)}`;
  return setting.list ? " []" : "";
}
function commentAt(line, column) {
  return column === null ? line : `${line.slice(0, column)}# ${line.slice(column)}`;
}
function stripNodeComments(node) {
  const copy = node.clone();
  const clear = (target) => {
    const inline = (import_yaml4.default.isScalar(target) || import_yaml4.default.isCollection(target) && target.flow === true) && typeof target.comment === "string" ? target.comment.split("\n")[0] : "";
    target.commentBefore = null;
    target.comment = inline.trim() === "" ? null : inline;
    target.spaceBefore = false;
  };
  clear(copy);
  import_yaml4.default.visit(copy, {
    Node: (_key, target) => clear(target),
    Pair: (_key, pair) => {
      if (import_yaml4.default.isNode(pair.key)) clear(pair.key);
    }
  });
  return copy;
}
function yamlLines(map, indent) {
  const document = new import_yaml4.default.Document();
  document.contents = map;
  return document.toString({ lineWidth: 0 }).trimEnd().split("\n").map((line) => `${indent}${line}`);
}
function liveValueLines(key, node, indent) {
  const map = new import_yaml4.default.YAMLMap();
  const value = import_yaml4.default.isNode(node) ? stripNodeComments(node) : node;
  map.items.push(new import_yaml4.default.Pair(new import_yaml4.default.Scalar(key), value));
  return yamlLines(map, indent);
}
var KEY_LINE = /^(\s*)(?:"([^"]+)"|'([^']+)'|([A-Za-z0-9_][A-Za-z0-9_.-]*))\s*:(?:\s|$)/u;
var BLOCK_SCALAR = /:\s*[|>][-+0-9]*\s*(?:#.*)?$|^\s*-\s+[|>][-+0-9]*\s*(?:#.*)?$/u;
var SETTING_SHAPE = /^([a-z0-9_]+):(\s.*)?$/u;
var SEQUENCE_MARK = "\0seq";
var PATH_SEPARATOR = "\n";
function indentOf(line) {
  return line.length - line.trimStart().length;
}
function unwrapComment(body) {
  let text = body.trim();
  while (text.startsWith("#")) text = text.slice(1).trim();
  return text;
}
function scanComments(text) {
  const blocks = [];
  const notes = [];
  let rendered = false;
  let inNotes = false;
  let pending = [];
  const stack = [];
  let blockColumn = -1;
  const flush = (path) => {
    if (pending.length > 0)
      blocks.push(path === void 0 ? { bodies: pending } : { bodies: pending, path });
    pending = [];
  };
  for (const line of text.split("\n")) {
    if (blockColumn >= 0) {
      if (line.trim() === "" || indentOf(line) > blockColumn) continue;
      blockColumn = -1;
    }
    const trimmed = line.trim();
    if (trimmed === "") {
      flush();
      continue;
    }
    if (trimmed.startsWith("#")) {
      if (trimmed === TEAM_CONFIG_HEADER_LINES[0] || trimmed === OLD_RENDERED_FIRST_LINE) {
        rendered = true;
      }
      if (trimmed === TEAM_NOTES_LINE) {
        flush();
        inNotes = true;
        continue;
      }
      const body = line.trimStart().slice(1);
      if (inNotes) notes.push(body);
      else pending.push(body);
      continue;
    }
    const column = indentOf(line);
    while (stack.length > 0 && stack[stack.length - 1].column >= column) stack.pop();
    const match = KEY_LINE.exec(line);
    if (match === null) {
      flush();
      if (trimmed.startsWith("-")) stack.push({ column, key: SEQUENCE_MARK });
      if (BLOCK_SCALAR.test(line)) blockColumn = column;
      continue;
    }
    const key = match[2] ?? match[3] ?? match[4];
    stack.push({ column, key });
    flush(stack.map((frame) => frame.key).join(PATH_SEPARATOR));
    if (BLOCK_SCALAR.test(line)) blockColumn = column;
  }
  flush();
  return { rendered, blocks, notes };
}
function pathKey(path) {
  return path.join(PATH_SEPARATOR);
}
function teamLines(context, bodies, noteFor) {
  const own = bodies.map(() => false);
  const settingLine = bodies.map(() => false);
  bodies.forEach((body, index) => {
    const line = `#${body}`.trim();
    if (context.ownLines.has(line) || line.startsWith(LEGACY_SCHEMA_LINE_PREFIX)) {
      own[index] = true;
      return;
    }
    const text = unwrapComment(body);
    if (context.notes.has(text)) {
      own[index] = true;
      return;
    }
    const shape = SETTING_SHAPE.exec(text);
    if (shape !== null && (context.keys.has(shape[1]) || context.scanned.rendered)) {
      own[index] = true;
      const groupLine = (shape[2] ?? "").trim() === "" && context.groupKeys.has(shape[1]) && !context.leafKeys.has(shape[1]);
      settingLine[index] = !groupLine;
      return;
    }
    if (context.scanned.rendered && text.startsWith("-") && index > 0 && (settingLine[index - 1] || own[index - 1] && unwrapComment(bodies[index - 1]).startsWith("-"))) {
      own[index] = true;
    }
  });
  if (context.scanned.rendered) {
    settingLine.forEach((isSetting, index) => {
      if (isSetting && index > 0) own[index - 1] = true;
    });
    if (noteFor !== void 0 && bodies.length > 0 && !bodies.some((body) => unwrapComment(body) === noteFor)) {
      own[bodies.length - 1] = true;
    }
  }
  return bodies.filter((_body, index) => !own[index]);
}
function teamLinesAbove(context, path, noteFor) {
  const key = pathKey(path);
  context.used.add(key);
  const block = context.scanned.blocks.find((entry) => entry.path === key);
  return block === void 0 ? [] : teamLines(context, block.bodies, noteFor);
}
function isLiveValue(value) {
  return value !== void 0 && value !== null;
}
function nodeIsLive(context, node) {
  if (node.setting !== void 0) return isLiveValue(valueAt(context.data, node.path));
  for (const child of node.children.values()) if (nodeIsLive(context, child)) return true;
  return false;
}
function isPlainMap(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
function collectUnknownPaths(value, node, out) {
  for (const [key, child] of Object.entries(value)) {
    if (node.path.length === 0 && (key === "paqad_version" || key === "schema_version")) continue;
    const known = node.children.get(key);
    if (known === void 0) {
      out.push([...node.path, key]);
      continue;
    }
    if (known.setting !== void 0 || child === null || child === void 0) continue;
    if (isPlainMap(child)) collectUnknownPaths(child, known, out);
    else out.push([...node.path, key]);
  }
}
function anchorFor(context, path) {
  let node = context.tree;
  let anchor = [];
  for (const segment of path.slice(0, -1)) {
    const child = node.children.get(segment);
    if (child === void 0 || !nodeIsLive(context, child)) break;
    anchor = child.path;
    node = child;
  }
  return anchor;
}
function unknownLines(context, anchor, depth) {
  const paths = context.anchors.get(pathKey(anchor)) ?? [];
  if (paths.length === 0) return [];
  const map = new import_yaml4.default.YAMLMap();
  for (const path of paths) {
    let target = map;
    const relative = path.slice(anchor.length);
    for (const segment of relative.slice(0, -1)) {
      const found = target.get(segment, true);
      if (import_yaml4.default.isMap(found)) {
        target = found;
        continue;
      }
      const next = new import_yaml4.default.YAMLMap();
      target.items.push(new import_yaml4.default.Pair(new import_yaml4.default.Scalar(segment), next));
      target = next;
    }
    const node = context.document.getIn([...path], true);
    const value = import_yaml4.default.isNode(node) ? stripNodeComments(node) : node;
    target.items.push(new import_yaml4.default.Pair(new import_yaml4.default.Scalar(relative[relative.length - 1]), value));
  }
  return yamlLines(map, "  ".repeat(depth));
}
function renderSettingNode(context, node, depth, column, out) {
  const indent = "  ".repeat(depth);
  const live = column === null && nodeIsLive(context, node);
  if (node.setting !== void 0) {
    const note = settingNote(node.setting);
    if (live) {
      for (const line of teamLinesAbove(context, node.path, note)) out.push(`${indent}#${line}`);
      out.push(`${indent}# ${note}`);
      out.push(...liveValueLines(node.key, context.document.getIn([...node.path], true), indent));
      return;
    }
    out.push(commentAt(`${indent}# ${note}`, column));
    out.push(commentAt(`${indent}${node.key}:${defaultText(node.setting)}`, column ?? depth * 2));
    return;
  }
  if (live) {
    for (const line of teamLinesAbove(context, node.path)) out.push(`${indent}#${line}`);
    out.push(`${indent}${node.key}:`);
    for (const child of node.children.values())
      renderSettingNode(context, child, depth + 1, null, out);
    const extra = unknownLines(context, node.path, depth + 1);
    if (extra.length > 0) out.push(`${indent}  ${NOT_A_SETTING_LINE}`, ...extra);
    return;
  }
  const own = column ?? depth * 2;
  out.push(commentAt(`${indent}${node.key}:`, own));
  for (const child of node.children.values())
    renderSettingNode(context, child, depth + 1, own, out);
}
function renderTeamConfigFile(file, live) {
  const tree = settingsTree(file);
  const data = live === null ? null : live.toJS();
  const notes = /* @__PURE__ */ new Set();
  const keys = /* @__PURE__ */ new Set();
  const groupKeys = /* @__PURE__ */ new Set();
  const leafKeys = /* @__PURE__ */ new Set();
  const walk = (node) => {
    for (const child of node.children.values()) {
      keys.add(child.key);
      (child.setting === void 0 ? groupKeys : leafKeys).add(child.key);
      if (child.setting !== void 0) {
        notes.add(child.setting.note);
        notes.add(settingNote(child.setting));
      }
      walk(child);
    }
  };
  walk(tree);
  const context = {
    file,
    data,
    document: live,
    tree,
    scanned: live === null ? { rendered: false, blocks: [], notes: [] } : scanComments(live.toString({ lineWidth: 0 })),
    ownLines: /* @__PURE__ */ new Set([
      `# ${TEAM_CONFIG_FILE_DESCRIPTIONS[file]}`,
      ...TEAM_CONFIG_HEADER_LINES,
      ...OLD_HEADER_LINES,
      OLD_MODELS_DESCRIPTION,
      NOT_A_SETTING_LINE,
      TEAM_NOTES_LINE
    ]),
    notes,
    keys,
    groupKeys,
    leafKeys,
    used: /* @__PURE__ */ new Set(),
    anchors: /* @__PURE__ */ new Map()
  };
  if (isPlainMap(data)) {
    const unknown = [];
    collectUnknownPaths(data, tree, unknown);
    for (const path of unknown) {
      const anchor = pathKey(anchorFor(context, path));
      context.anchors.set(anchor, [...context.anchors.get(anchor) ?? [], path]);
    }
  }
  const out = [
    `# ${TEAM_CONFIG_FILE_DESCRIPTIONS[file]}`,
    ...TEAM_CONFIG_HEADER_LINES,
    `schema_version: ${TEAM_FILE_SCHEMA_VERSION}`
  ];
  for (const node of tree.children.values()) {
    out.push("");
    renderSettingNode(context, node, 0, null, out);
  }
  const rootUnknown = unknownLines(context, [], 0);
  if (rootUnknown.length > 0) out.push("", NOT_A_SETTING_LINE, ...rootUnknown);
  const loose = [];
  for (const block of context.scanned.blocks) {
    if (block.path !== void 0 && context.used.has(block.path)) continue;
    loose.push(...teamLines(context, block.bodies));
  }
  const kept = [...context.scanned.notes, ...loose].filter((body) => body.trim() !== "");
  if (kept.length > 0) out.push("", TEAM_NOTES_LINE, ...kept.map((body) => `#${body}`));
  return `${out.join("\n")}
`;
}
function uncommentLine(line) {
  const column = indentOf(line);
  const rest = line.slice(column + 1);
  return `${line.slice(0, column)}${rest.startsWith(" ") ? rest.slice(1) : rest}`;
}
function childAt(tree, path) {
  let node = tree;
  for (const segment of path) {
    node = node?.children.get(segment);
    if (node === void 0) return void 0;
  }
  return node;
}
function groupLineKey(line) {
  if (line.trimStart().startsWith("#")) return null;
  const match = /^\s*([A-Za-z0-9_][A-Za-z0-9_.-]*):\s*(?:#.*)?$/u.exec(line);
  return match === null ? null : match[1];
}
function repairTeamConfigText(file, text) {
  const tree = settingsTree(file);
  const lines = text.split("\n");
  const repairs = [];
  const stack = [];
  let blockColumn = -1;
  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (blockColumn >= 0) {
      if (line.trim() === "" || indentOf(line) > blockColumn) continue;
      blockColumn = -1;
    }
    const trimmed = line.trim();
    if (trimmed === "" || trimmed.startsWith("#")) continue;
    let column = indentOf(line);
    const match = KEY_LINE.exec(line);
    if (match === null) {
      while (stack.length > 0 && stack[stack.length - 1].column >= column) stack.pop();
      if (trimmed.startsWith("-")) stack.push({ column, key: SEQUENCE_MARK });
      if (BLOCK_SCALAR.test(line)) blockColumn = column;
      continue;
    }
    const key = match[2] ?? match[3] ?? match[4];
    let start = index;
    while (start > 0 && lines[start - 1].trim().startsWith("#")) start -= 1;
    const chain = [];
    let limit = column % 2 === 1 ? column - 1 : column;
    for (let row = index - 1; row >= start; row -= 1) {
      const virtual = uncommentLine(lines[row]);
      const virtualColumn = indentOf(virtual);
      if (virtualColumn >= limit || virtual.trimStart().startsWith("#")) continue;
      const groupKey = groupLineKey(virtual);
      if (groupKey === null) break;
      chain.unshift({ index: row, column: virtualColumn, key: groupKey });
      limit = virtualColumn;
    }
    let repaired = false;
    if (chain.length > 0) {
      const outer = chain[0].column;
      const parents2 = stack.filter((frame) => frame.column < outer);
      const parentPath2 = parents2.map((frame) => frame.key);
      const path = [...parentPath2, ...chain.map((link) => link.key), key];
      if (childAt(tree, path) !== void 0) {
        for (const link of chain) lines[link.index] = uncommentLine(lines[link.index]);
        stack.length = parents2.length;
        for (const link of chain) stack.push({ column: link.column, key: link.key });
        const group = chain[chain.length - 1];
        repairs.push({
          line: index + 1,
          message: `${file} line ${index + 1}: ${key} is set, but the # is still in front of ${group.key}: on line ${group.index + 1}. paqad reads ${key} anyway; remove the # in front of ${group.key}:.`
        });
        repaired = true;
        if (column === group.column + 3) {
          lines[index] = line.slice(1);
          column -= 1;
        }
      }
    }
    while (stack.length > 0 && stack[stack.length - 1].column >= column) stack.pop();
    const parents = stack.filter((frame) => frame.column < column - 1);
    const parent = parents[parents.length - 1];
    const expected = parent === void 0 ? 0 : parent.column + 2;
    const parentPath = parents.map((frame) => frame.key);
    if (!repaired && column === expected + 1 && childAt(tree, [...parentPath, key]) !== void 0) {
      stack.length = parents.length;
      lines[index] = line.slice(1);
      for (let next = index + 1; next < lines.length; next += 1) {
        const following = lines[next];
        if (following.trim() === "") continue;
        if (following.trimStart().startsWith("#") || indentOf(following) <= column) break;
        lines[next] = following.slice(1);
      }
      repairs.push({
        line: index + 1,
        message: `${file} line ${index + 1}: ${key} is one column deeper than paqad's layout. paqad reads it at its own column; remove the extra space.`
      });
      column -= 1;
    }
    stack.push({ column, key });
    if (BLOCK_SCALAR.test(lines[index])) blockColumn = column;
  }
  return { text: lines.join("\n"), repairs };
}

// src/core/version-compare.ts
init_esm_shims();
function parseVersion(v) {
  return v.trim().replace(/^v/, "").split(".").map((n) => Number.parseInt(n, 10) || 0);
}
function versionAtLeast(a, b) {
  const pa = parseVersion(a);
  const pb = parseVersion(b);
  for (let i = 0; i < Math.max(pa.length, pb.length); i += 1) {
    const d = (pa[i] ?? 0) - (pb[i] ?? 0);
    if (d !== 0) return d > 0;
  }
  return true;
}

// src/core/project-intelligence.ts
init_esm_shims();
var EMBEDDING_PROVIDERS = ["local", "openai"];
var LOCAL_EMBEDDING_MODELS = [
  {
    id: "Xenova/all-MiniLM-L6-v2",
    label: "MiniLM (default, smallest)",
    description: "General-purpose 384-dim model. Small, fast, fully offline after a one-time shared download.",
    codeTuned: false,
    isDefault: true
  },
  {
    id: "Xenova/jina-embeddings-v2-base-code",
    label: "Jina code (code-tuned, larger)",
    description: "Code-tuned 768-dim model for stronger code retrieval. Opt-in: a larger one-time download, still fully offline afterwards.",
    codeTuned: true
  }
];
var DEFAULT_LOCAL_EMBEDDING_MODEL = LOCAL_EMBEDDING_MODELS.find((model) => model.isDefault)?.id ?? "Xenova/all-MiniLM-L6-v2";
var DEFAULT_BENCHMARK_EVAL = {
  model_graded: { enabled: false }
};
var DEFAULT_ADAPTIVE_RETRIEVAL = {
  enabled: true,
  thresholds: { min_useful_chunks: 3 }
};
var DEFAULT_RERANKING = {
  enabled: false,
  backend: "local",
  candidate_pool_size: 50
};
var DEFAULT_METADATA_FILTERS = {
  enabled: true
};
var DEFAULT_ACTION_ROUTING = {
  enabled: false
};
var DEFAULT_EXISTING_SURFACE_TOKENS = 1e3;
var DEFAULT_BENCHMARK_GATES = {
  hit_at_5_improvement_pct: 20,
  task_success_rate_improvement_pct: 10,
  correction_turn_reduction_pct: 15,
  prompt_token_increase_limit_pct: 10,
  prompt_token_override_success_improvement_pct: 15
};
function getDefaultEmbeddingModel(provider) {
  switch (provider) {
    case "openai":
      return "text-embedding-3-small";
    case "local":
    default:
      return DEFAULT_LOCAL_EMBEDDING_MODEL;
  }
}
function defaultIntelligenceConfig() {
  return {
    rag_enabled: false,
    rag_similarity_threshold: 0.75,
    rag_relief_floor: 0.35,
    rag_top_n: 20,
    rag_max_file_size: 153600,
    existing_surface_tokens: DEFAULT_EXISTING_SURFACE_TOKENS,
    benchmark_gates: { ...DEFAULT_BENCHMARK_GATES },
    benchmark_eval: { ...DEFAULT_BENCHMARK_EVAL },
    adaptive_retrieval: {
      ...DEFAULT_ADAPTIVE_RETRIEVAL,
      thresholds: { ...DEFAULT_ADAPTIVE_RETRIEVAL.thresholds }
    },
    reranking: { ...DEFAULT_RERANKING },
    metadata_filters: { ...DEFAULT_METADATA_FILTERS },
    action_routing: { ...DEFAULT_ACTION_ROUTING }
  };
}
function normalizeIntelligenceConfig(input) {
  const defaults = defaultIntelligenceConfig();
  if (!input) {
    return defaults;
  }
  const provider = input.embedding_provider;
  const normalized = {
    rag_enabled: input.rag_enabled ?? defaults.rag_enabled,
    embedding_provider: provider,
    embedding_model: input.embedding_model ?? (provider ? getDefaultEmbeddingModel(provider) : void 0),
    rag_similarity_threshold: input.rag_similarity_threshold ?? defaults.rag_similarity_threshold,
    rag_relief_floor: input.rag_relief_floor ?? defaults.rag_relief_floor,
    rag_top_n: input.rag_top_n ?? defaults.rag_top_n,
    rag_max_file_size: input.rag_max_file_size ?? defaults.rag_max_file_size,
    existing_surface_tokens: input.existing_surface_tokens ?? defaults.existing_surface_tokens,
    rag_base_branch: input.rag_base_branch ?? defaults.rag_base_branch,
    benchmark_gates: {
      ...DEFAULT_BENCHMARK_GATES,
      ...input.benchmark_gates ?? {}
    },
    benchmark_eval: {
      ...DEFAULT_BENCHMARK_EVAL,
      ...input.benchmark_eval ?? {},
      model_graded: {
        enabled: input.benchmark_eval?.model_graded?.enabled ?? DEFAULT_BENCHMARK_EVAL.model_graded?.enabled ?? false
      }
    },
    adaptive_retrieval: {
      ...DEFAULT_ADAPTIVE_RETRIEVAL,
      ...input.adaptive_retrieval ?? {},
      thresholds: {
        min_useful_chunks: input.adaptive_retrieval?.thresholds?.min_useful_chunks ?? DEFAULT_ADAPTIVE_RETRIEVAL.thresholds.min_useful_chunks
      }
    },
    reranking: {
      ...DEFAULT_RERANKING,
      ...input.reranking ?? {}
    },
    metadata_filters: {
      ...DEFAULT_METADATA_FILTERS,
      ...input.metadata_filters ?? {}
    },
    action_routing: {
      ...DEFAULT_ACTION_ROUTING,
      ...input.action_routing ?? {}
    }
  };
  if (normalized.rag_enabled && normalized.embedding_provider && !normalized.embedding_model) {
    normalized.embedding_model = getDefaultEmbeddingModel(normalized.embedding_provider);
  }
  return normalized;
}

// src/core/types/routing.ts
init_esm_shims();
var LANES = ["fast", "graduated", "full"];
var PROCESS_DEPTHS = ["fast lane", "graduated lane", "full lane"];
var COMPLEXITY_LEVELS = ["trivial", "low", "medium", "high", "very-high"];
var RISK_LEVELS = ["low", "medium", "high"];
function selectLane(complexity, risk) {
  if (complexity === "trivial") {
    return "fast";
  }
  if (complexity === "low" && risk === "low") {
    return "fast";
  }
  if (complexity === "low" && risk !== "low") {
    return "graduated";
  }
  if (complexity === "medium" && risk !== "high") {
    return "graduated";
  }
  return "full";
}

// src/core/framework-config.ts
var LEGACY_TEAM_CONFIG_READ_UNTIL = "2027-02-01";
var EMBEDDING_PROVIDERS2 = ["local", "openai"];
var ASK_THRESHOLDS = ["strict", "balanced", "permissive"];
var STAGE_RULE_MODES = ["off", "warn", "strict"];
var CHECKS_FLAKY_MODES = ["pass", "warn", "fail"];
var SPEC_PIPELINE_ADOPTION_MODES = ["warn", "strict"];
var RULE_GATE_PRE_EDIT_MODES = ["blocking-only", "all"];
var RULE_GATE_DEFAULTS = {
  pre_edit: "blocking-only",
  budget_ms: 6e3,
  min_budget_ms: 500,
  max_budget_ms: 9e3,
  max_concurrency: 8
};
var SPEC_PIPELINE_DEFAULTS = Object.freeze({
  spec_pipeline_enabled: true,
  spec_pipeline_experts_enabled: true,
  spec_pipeline_adoption: "strict"
});
var VISUAL_EVIDENCE_MODES = ["warn", "strict"];
var EVIDENCE_EXISTENCE_MODES = ["off", "warn"];
var AI_ATTRIBUTION_MODES = ["keep", "strip"];
var PLUGIN_MIGRATION_MODES = ["on", "off"];
var CLAUDE_INSTALL_MODES = ["auto", "plugin", "settings"];
var AUTHORING_BATCH_MODES = ["auto", "off"];
var AUTHORING_SECTION = "Skill and agent authoring";
var STAGE_EFFORT_LEVELS = ["low", "medium", "high", "xhigh", "inherit"];
var STAGE_MODELS = ["inherit", "haiku", "sonnet", "opus"];
var STAGE_SETTING_STAGES = [
  "planning",
  "specification",
  "development",
  "review",
  "checks",
  "documentation_sync"
];
var STAGE_EFFORT_DEFAULTS = {
  planning: "high",
  specification: "high",
  development: "inherit",
  review: "high",
  checks: "low",
  documentation_sync: "low"
};
var TRUTHY2 = /* @__PURE__ */ new Set(["1", "true", "yes", "on"]);
var FALSY2 = /* @__PURE__ */ new Set(["0", "false", "no", "off"]);
var BASE_CONFIG_SPECS = [
  {
    key: "paqad_enable",
    env: "PAQAD_ENABLE",
    type: "boolean",
    default: true,
    group: "app",
    section: "Framework master switch",
    comment: "Turns paqad on or off for this project, and false lets you work without paqad."
  },
  {
    key: "team_bootstrap_enabled",
    env: "PAQAD_TEAM_BOOTSTRAP_ENABLED",
    type: "boolean",
    default: true,
    group: "app",
    section: "Team and cloud setup",
    comment: "Lets teammates and Claude Code cloud sessions set paqad up from this repo on their own."
  },
  {
    key: "auto_update",
    env: "PAQAD_AUTO_UPDATE",
    type: "boolean",
    default: true,
    group: "app",
    section: "Version & updates",
    comment: "Pulls newer paqad versions in the background when a session starts."
  },
  {
    key: "minimum_version",
    env: "PAQAD_MINIMUM_VERSION",
    type: "string",
    default: "latest",
    group: "app",
    section: "Version & updates",
    comment: "The lowest paqad version this project runs on, where latest always tracks the newest version."
  },
  {
    key: "version_check_interval_hours",
    env: "PAQAD_VERSION_CHECK_INTERVAL_HOURS",
    type: "number",
    default: 12,
    group: "app",
    section: "Version & updates",
    comment: "How many hours pass between background checks for a newer paqad version."
  },
  {
    key: "enterprise",
    env: "PAQAD_ENTERPRISE",
    type: "boolean",
    default: false,
    group: "app",
    section: "Enterprise / governance (licensed, off by default)",
    comment: "Turns on the enterprise and governance outputs as a group."
  },
  {
    key: "enterprise_evidence_ledger",
    env: "PAQAD_ENTERPRISE_EVIDENCE_LEDGER",
    type: "boolean",
    default: false,
    group: "app",
    section: "Enterprise / governance (licensed, off by default)",
    comment: "Writes the receipt and evidence ledger for each change under .paqad/ledger/."
  },
  {
    key: "enterprise_ai_bom",
    env: "PAQAD_ENTERPRISE_AI_BOM",
    type: "boolean",
    default: false,
    group: "app",
    section: "Enterprise / governance (licensed, off by default)",
    comment: "Writes an AI bill of materials (ai-bom.json, in CycloneDX format) for each change."
  },
  {
    key: "enterprise_compliance_citations",
    env: "PAQAD_ENTERPRISE_COMPLIANCE_CITATIONS",
    type: "boolean",
    default: false,
    group: "app",
    section: "Enterprise / governance (licensed, off by default)",
    comment: "Adds compliance framework citations to the receipt, which spends extra tokens."
  },
  {
    key: "spec_only_mode",
    env: "PAQAD_SPEC_ONLY_MODE",
    type: "boolean",
    default: false,
    group: "app",
    section: "Feature flags",
    comment: "Stops a change once the spec is written, so nothing is implemented."
  },
  {
    key: "market_research",
    env: "PAQAD_MARKET_RESEARCH",
    type: "boolean",
    default: false,
    group: "app",
    section: "Feature flags",
    comment: "Runs the market research helper during planning."
  },
  {
    key: "design_research",
    env: "PAQAD_DESIGN_RESEARCH",
    type: "boolean",
    default: false,
    group: "app",
    section: "Feature flags",
    comment: "Runs the design research helper during planning."
  },
  {
    key: "team_agents",
    env: "PAQAD_TEAM_AGENTS",
    type: "boolean",
    default: true,
    group: "app",
    section: "Feature flags",
    comment: "Uses a team of helper agents for work on the full lane."
  },
  {
    key: "analytics_instrumentation",
    env: "PAQAD_ANALYTICS_INSTRUMENTATION",
    type: "boolean",
    default: false,
    group: "app",
    section: "Feature flags",
    comment: "Lets paqad wire analytics tracking into the app and keep a tracking plan doc for each event."
  },
  {
    key: "site_map",
    env: "PAQAD_SITE_MAP",
    type: "boolean",
    default: false,
    group: "app",
    section: "Feature flags",
    comment: "Keeps a checked map of the app's screens and user journeys under docs/site-map/ for coding projects."
  },
  {
    key: "rules_discovery_private_packages",
    env: "PAQAD_RULES_DISCOVERY_PRIVATE_PACKAGES",
    type: "string",
    default: "",
    group: "app",
    section: "Feature flags",
    comment: "Package names or patterns (use * for any text) that rules discovery treats as private and never looks up on the web."
  },
  {
    key: "visual_evidence",
    env: "PAQAD_VISUAL_EVIDENCE",
    type: "boolean",
    default: false,
    group: "app",
    section: "Feature flags",
    comment: "Captures screenshots of documented flows as proof for frontend changes in coding projects."
  },
  {
    key: "lean_rules",
    env: "PAQAD_LEAN_RULES",
    type: "boolean",
    default: true,
    group: "app",
    section: "Feature flags",
    comment: "Loads only the rule text that applies to the files in play, instead of every rule in full each session."
  },
  {
    key: "feature_report",
    env: "PAQAD_FEATURE_REPORT",
    type: "boolean",
    default: true,
    group: "app",
    section: "Feature flags",
    comment: "Writes a local evidence report page for each change when it finishes, at no model cost."
  },
  {
    key: "metrics_enabled",
    env: "PAQAD_METRICS_ENABLED",
    type: "boolean",
    default: true,
    group: "app",
    section: "Feature flags",
    comment: "Measures duplication and reuse in the new code of each change and shows them on the receipt and dashboard."
  },
  {
    key: "checks_parallel",
    env: "PAQAD_CHECKS_PARALLEL",
    type: "boolean",
    default: true,
    group: "app",
    section: "Feature flags",
    comment: "Runs the checks at the same time, using the test runner's own parallel mode when it has one."
  },
  {
    key: "checks_max_processes",
    env: "PAQAD_CHECKS_MAX_PROCESSES",
    type: "number",
    default: 0,
    group: "app",
    section: "Feature flags",
    comment: "The most test processes that run at once, where auto uses the CPU cores minus one within memory limits."
  },
  {
    key: "hud_view",
    env: "PAQAD_HUD_VIEW",
    type: "boolean",
    default: true,
    group: "app",
    section: "Feature flags",
    comment: "Shows the paqad status band above the prompt in the Claude Code plugin, along with the /paqad command."
  },
  {
    key: "hud_chime",
    env: "PAQAD_HUD_CHIME",
    type: "boolean",
    default: false,
    group: "app",
    section: "Feature flags",
    comment: "Plays a short chime in the Claude Code plugin once each verdict lands."
  },
  {
    key: "plugin_migration",
    env: "PAQAD_PLUGIN_MIGRATION",
    type: "enum",
    enumValues: PLUGIN_MIGRATION_MODES,
    default: "off",
    group: "app",
    section: "Claude Code plugin migration",
    comment: "Moves existing npm Claude Code users to the paqad plugin in the background, with npm kept as the fallback."
  },
  {
    key: "claude_install_mode",
    env: "PAQAD_CLAUDE_INSTALL_MODE",
    type: "enum",
    enumValues: CLAUDE_INSTALL_MODES,
    default: "auto",
    group: "app",
    section: "Claude Code plugin migration",
    comment: "How this project installs paqad into Claude Code, where auto follows the plugin migration switch, plugin forces the plugin and settings keeps the npm hooks."
  },
  {
    key: "rag_enabled",
    env: "PAQAD_RAG_ENABLED",
    type: "boolean",
    default: false,
    group: "rag",
    section: "Intelligence / RAG",
    comment: "Loads relevant code and docs into context through search."
  },
  {
    key: "rag_embedding_provider",
    env: "PAQAD_RAG_EMBEDDING_PROVIDER",
    type: "enum",
    enumValues: EMBEDDING_PROVIDERS2,
    default: void 0,
    optional: true,
    group: "rag",
    section: "Intelligence / RAG",
    comment: "Which embedding service builds the search index, and the local model is used when it is left unset."
  },
  {
    key: "rag_embedding_model",
    env: "PAQAD_RAG_EMBEDDING_MODEL",
    type: "string",
    default: void 0,
    optional: true,
    group: "rag",
    section: "Intelligence / RAG",
    comment: "The embedding model to use instead of the default model of the provider."
  },
  {
    key: "rag_similarity_threshold",
    env: "PAQAD_RAG_SIMILARITY_THRESHOLD",
    type: "number",
    default: 0.75,
    group: "rag",
    section: "Intelligence / RAG",
    comment: "How similar (0 to 1) a piece of code or docs must be to the request before it is loaded."
  },
  {
    key: "rag_relief_floor",
    env: "PAQAD_RAG_RELIEF_FLOOR",
    type: "number",
    default: 0.35,
    group: "rag",
    section: "Intelligence / RAG",
    comment: "A lower similarity score used when nothing reaches the main one, and the pieces it lets through are marked low confidence."
  },
  {
    key: "rag_top_n",
    env: "PAQAD_RAG_TOP_N",
    type: "number",
    default: 20,
    group: "rag",
    section: "Intelligence / RAG",
    comment: "The most pieces of code or docs loaded for one search."
  },
  {
    key: "rag_max_file_size",
    env: "PAQAD_RAG_MAX_FILE_SIZE",
    type: "number",
    default: 153600,
    group: "rag",
    section: "Intelligence / RAG",
    comment: "Files larger than this many bytes are left out of the search index."
  },
  {
    key: "rag_base_branch",
    env: "PAQAD_RAG_BASE_BRANCH",
    type: "string",
    default: void 0,
    optional: true,
    group: "rag",
    section: "Intelligence / RAG",
    comment: "The base branch the search index compares against, found on its own (main, then master) when left unset."
  },
  {
    key: "existing_surface_tokens",
    env: "PAQAD_EXISTING_SURFACE_TOKENS",
    type: "number",
    default: 1e3,
    group: "rag",
    section: "Intelligence / RAG",
    comment: "The token budget for the list of existing code that planning asks the model to reuse."
  },
  {
    key: "model_default",
    env: "PAQAD_MODEL_DEFAULT",
    type: "string",
    default: "gpt-5",
    group: "models",
    section: "Research & model routing",
    comment: "The model used for routine work."
  },
  {
    key: "model_reasoning",
    env: "PAQAD_MODEL_REASONING",
    type: "string",
    default: "gpt-5",
    group: "models",
    section: "Research & model routing",
    comment: "The model used for heavy reasoning and planning."
  },
  {
    key: "model_fast",
    env: "PAQAD_MODEL_FAST",
    type: "string",
    default: "gpt-5-mini",
    group: "models",
    section: "Research & model routing",
    comment: "The cheap, fast model used for light steps."
  },
  ...STAGE_SETTING_STAGES.flatMap((stage) => [
    {
      key: `stage_effort_${stage}`,
      env: `PAQAD_STAGE_EFFORT_${stage.toUpperCase()}`,
      type: "enum",
      enumValues: STAGE_EFFORT_LEVELS,
      default: STAGE_EFFORT_DEFAULTS[stage],
      group: "models",
      section: "Stage agents",
      comment: stageEffortComment(stage)
    },
    {
      key: `stage_model_${stage}`,
      env: `PAQAD_STAGE_MODEL_${stage.toUpperCase()}`,
      type: "enum",
      enumValues: STAGE_MODELS,
      default: "inherit",
      group: "models",
      section: "Stage agents",
      comment: `The model the ${stage} stage helper runs on, where inherit uses the model of the main session and \`paqad-ai stage settings\` applies a change.`
    }
  ]),
  {
    key: "decisions_ask_threshold",
    env: "PAQAD_DECISIONS_ASK_THRESHOLD",
    type: "enum",
    enumValues: ASK_THRESHOLDS,
    default: "strict",
    group: "policy",
    section: "Decisions (pause-contract tuning)",
    comment: "How often paqad stops to ask you instead of making a choice itself."
  },
  {
    key: "stages_mode",
    env: "PAQAD_STAGES_MODE",
    type: "enum",
    enumValues: STAGE_RULE_MODES,
    default: "strict",
    group: "policy",
    section: "Enforcement (capability modes \u2014 team value is a floor)",
    comment: "How firmly paqad checks that every feature-development stage was run and recorded."
  },
  {
    key: "rule_compliance",
    env: "PAQAD_RULE_COMPLIANCE",
    type: "enum",
    enumValues: STAGE_RULE_MODES,
    default: "warn",
    group: "policy",
    section: "Enforcement (capability modes \u2014 team value is a floor)",
    comment: "How firmly the scripted project rules are enforced on the working tree."
  },
  {
    key: "rule_gate_pre_edit",
    env: "PAQAD_RULE_GATE_PRE_EDIT",
    type: "enum",
    enumValues: RULE_GATE_PRE_EDIT_MODES,
    default: RULE_GATE_DEFAULTS.pre_edit,
    group: "policy",
    section: "Enforcement (capability modes \u2014 team value is a floor)",
    comment: "Which rule scripts run before an edit, either only the fast blocking ones or all of them."
  },
  {
    key: "rule_gate_concurrency",
    env: "PAQAD_RULE_GATE_CONCURRENCY",
    type: "string",
    default: "auto",
    group: "policy",
    section: "Enforcement (capability modes \u2014 team value is a floor)",
    comment: "How many rule scripts run at once, from 1 to 8, where auto uses the CPU cores minus one."
  },
  {
    key: "rule_gate_budget_ms",
    env: "PAQAD_RULE_GATE_BUDGET_MS",
    type: "number",
    default: RULE_GATE_DEFAULTS.budget_ms,
    group: "policy",
    section: "Enforcement (capability modes \u2014 team value is a floor)",
    comment: "Milliseconds (500 to 9000) the rule check before an edit may take, after which the edit goes ahead and the checks run at turn end."
  },
  {
    key: "analytics_strictness",
    env: "PAQAD_ANALYTICS_STRICTNESS",
    type: "enum",
    enumValues: STAGE_RULE_MODES,
    default: "warn",
    group: "policy",
    section: "Enforcement (capability modes \u2014 team value is a floor)",
    comment: "How firmly paqad checks that each analytics event has its tracking plan doc."
  },
  {
    key: "duplication_mode",
    env: "PAQAD_DUPLICATION_MODE",
    type: "enum",
    enumValues: STAGE_RULE_MODES,
    default: "warn",
    group: "policy",
    section: "Enforcement (capability modes \u2014 team value is a floor)",
    comment: "How paqad treats new code that nearly copies existing code, from a warning to a block."
  },
  {
    key: "mutation_mode",
    env: "PAQAD_MUTATION_MODE",
    type: "enum",
    enumValues: STAGE_RULE_MODES,
    default: "off",
    group: "policy",
    section: "Enforcement (capability modes \u2014 team value is a floor)",
    comment: "Mutation testing on changed code, which runs only from the CI or pre-push hook of the project with its own mutation tool."
  },
  {
    key: "bundle_completeness",
    env: "PAQAD_BUNDLE_COMPLETENESS",
    type: "enum",
    enumValues: STAGE_RULE_MODES,
    default: "strict",
    group: "policy",
    section: "Enforcement (capability modes \u2014 team value is a floor)",
    comment: "How firmly paqad checks at the end of a change that its evidence bundle holds every required file."
  },
  {
    key: "checks_flaky_under_parallel",
    env: "PAQAD_CHECKS_FLAKY_UNDER_PARALLEL",
    type: "enum",
    enumValues: CHECKS_FLAKY_MODES,
    default: "warn",
    group: "policy",
    section: "Enforcement (capability modes \u2014 team value is a floor)",
    comment: "What happens to a test that fails in the parallel run but passes alone, and a personal setting may only make it stricter."
  },
  {
    key: "visual_evidence_mode",
    env: "PAQAD_VISUAL_EVIDENCE_MODE",
    type: "enum",
    enumValues: VISUAL_EVIDENCE_MODES,
    default: "warn",
    group: "policy",
    section: "Enforcement (capability modes \u2014 team value is a floor)",
    comment: "How firmly the screenshot check holds a frontend change with missing screenshots, and a personal setting may only make it stricter."
  },
  {
    key: "evidence_existence_gate",
    env: "PAQAD_EVIDENCE_EXISTENCE_GATE",
    type: "enum",
    enumValues: EVIDENCE_EXISTENCE_MODES,
    default: "warn",
    group: "policy",
    section: "Enforcement (capability modes \u2014 team value is a floor)",
    comment: "An older evidence check that runs only while the bundle check is off and never blocks a change."
  },
  {
    key: "duplication_similarity_threshold",
    env: "PAQAD_DUPLICATION_SIMILARITY_THRESHOLD",
    type: "number",
    default: 0.9,
    group: "policy",
    section: "Enforcement (capability modes \u2014 team value is a floor)",
    comment: "How similar (0 to 1) new code must be to existing code before the duplication check blocks it."
  },
  {
    key: "duplication_min_lines",
    env: "PAQAD_DUPLICATION_MIN_LINES",
    type: "number",
    default: 8,
    group: "policy",
    section: "Enforcement (capability modes \u2014 team value is a floor)",
    comment: "The fewest meaningful lines a new block of code needs before it is checked for duplication."
  },
  {
    key: "decision_arm_mode",
    env: "PAQAD_DECISION_ARM_MODE",
    type: "enum",
    enumValues: STAGE_RULE_MODES,
    default: "warn",
    group: "policy",
    section: "Enforcement (capability modes \u2014 team value is a floor)",
    comment: "How paqad handles a planned new piece of code that looks like existing code, from a report to a pause that waits for your answer."
  },
  {
    key: "decision_arm_plan_threshold",
    env: "PAQAD_DECISION_ARM_PLAN_THRESHOLD",
    type: "number",
    default: 0.85,
    group: "policy",
    section: "Enforcement (capability modes \u2014 team value is a floor)",
    comment: "How similar (0 to 1) a planned new name must be to an existing one before paqad asks whether to reuse it."
  },
  {
    key: "decision_arm_max_per_change",
    env: "PAQAD_DECISION_ARM_MAX_PER_CHANGE",
    type: "number",
    default: 1,
    group: "policy",
    section: "Enforcement (capability modes \u2014 team value is a floor)",
    comment: "The most reuse pauses one change may open, with the rest reported as warnings."
  },
  {
    key: "ai_attribution",
    env: "PAQAD_AI_ATTRIBUTION",
    type: "enum",
    enumValues: AI_ATTRIBUTION_MODES,
    default: "strip",
    group: "policy",
    section: "Enforcement (capability modes \u2014 team value is a floor)",
    comment: "Whether the attribution of the coding agent stays on your commits and pull requests, while the paqad delivery footer is never changed."
  },
  {
    key: "stage_isolation_lanes",
    env: "PAQAD_STAGE_ISOLATION_LANES",
    type: "string",
    default: "full",
    group: "policy",
    section: "Stage isolation",
    comment: "The lanes on which each feature-development stage runs in its own helper agent, and full is always included."
  },
  {
    key: "spec_pipeline_enabled",
    env: "PAQAD_SPEC_PIPELINE_ENABLED",
    type: "boolean",
    default: SPEC_PIPELINE_DEFAULTS.spec_pipeline_enabled,
    group: "policy",
    section: "Spec pipeline",
    comment: "Writes the spec through the grounded spec pipeline on the graduated and full lanes."
  },
  {
    key: "spec_pipeline_clarification",
    env: "PAQAD_SPEC_PIPELINE_CLARIFICATION",
    type: "enum",
    enumValues: STAGE_RULE_MODES,
    default: "warn",
    group: "policy",
    section: "Spec pipeline",
    comment: "How firmly the spec pipeline asks about an unclear request, from never asking to holding until you answer."
  },
  {
    key: "spec_pipeline_final_review",
    env: "PAQAD_SPEC_PIPELINE_FINAL_REVIEW",
    type: "enum",
    enumValues: STAGE_RULE_MODES,
    default: "off",
    group: "policy",
    section: "Spec pipeline",
    comment: "Whether a person must read and approve the spec before it is frozen."
  },
  {
    key: "spec_pipeline_token_ceiling",
    env: "PAQAD_SPEC_PIPELINE_TOKEN_CEILING",
    type: "number",
    default: 4e4,
    group: "policy",
    section: "Spec pipeline",
    comment: "The model tokens one spec pipeline run may use before paqad records a warning."
  },
  {
    key: "spec_grounding_budget_ms",
    env: "PAQAD_SPEC_GROUNDING_BUDGET_MS",
    type: "number",
    default: 15e3,
    group: "policy",
    section: "Spec pipeline",
    comment: "Milliseconds the spec pipeline gives search to ground a request before it grounds on the docs alone."
  },
  {
    key: "spec_pipeline_experts_enabled",
    env: "PAQAD_SPEC_PIPELINE_EXPERTS_ENABLED",
    type: "boolean",
    default: SPEC_PIPELINE_DEFAULTS.spec_pipeline_experts_enabled,
    group: "policy",
    section: "Spec pipeline",
    comment: "Seats the experts a request needs, such as database or security, and adds their notes to the spec."
  },
  {
    key: "spec_pipeline_adoption",
    env: "PAQAD_SPEC_PIPELINE_ADOPTION",
    type: "enum",
    enumValues: SPEC_PIPELINE_ADOPTION_MODES,
    default: SPEC_PIPELINE_DEFAULTS.spec_pipeline_adoption,
    group: "policy",
    section: "Spec pipeline",
    comment: "Whether the specification stage refuses a hand-written spec or only records that the pipeline did not write it."
  },
  {
    key: "spec_pipeline_experts_lanes",
    env: "PAQAD_SPEC_PIPELINE_EXPERTS_LANES",
    type: "string",
    default: "full",
    group: "policy",
    section: "Spec pipeline",
    comment: "The lanes on which the standing experts join every spec, and full is always included."
  },
  {
    key: "spec_pipeline_standing_experts",
    env: "PAQAD_SPEC_PIPELINE_STANDING_EXPERTS",
    type: "string",
    default: "product-owner,application-architect,user-flow-writer,qa-engineer",
    group: "policy",
    section: "Spec pipeline",
    comment: "The expert roles that join every spec run, whatever the request needs."
  },
  {
    key: "skill_orchestrator_enabled",
    env: "PAQAD_SKILL_ORCHESTRATOR_ENABLED",
    type: "boolean",
    default: true,
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "Turns on the checks and pipeline paqad runs when a skill is written or changed."
  },
  {
    key: "authoring_trigger_threshold",
    env: "PAQAD_AUTHORING_TRIGGER_THRESHOLD",
    type: "number",
    default: 0.9,
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "The share of test queries (0 to 1) a skill description must handle correctly to pass its trigger test."
  },
  {
    key: "authoring_trigger_min_runs",
    env: "PAQAD_AUTHORING_TRIGGER_MIN_RUNS",
    type: "number",
    default: 2,
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "How many of the three runs of each test query must fire the skill."
  },
  {
    key: "skill_eval_min_gain_points",
    env: "PAQAD_SKILL_EVAL_MIN_GAIN_POINTS",
    type: "number",
    default: 10,
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "How many percentage points a skill must raise the pass rate over running without it."
  },
  {
    key: "skill_eval_max_token_multiple",
    env: "PAQAD_SKILL_EVAL_MAX_TOKEN_MULTIPLE",
    type: "number",
    default: 2,
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "The most tokens a skill run may use, as a multiple of a run without the skill."
  },
  {
    key: "authoring_runs_per_arm",
    env: "PAQAD_AUTHORING_RUNS_PER_ARM",
    type: "number",
    default: 3,
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "How many times each eval case runs with the skill and without it."
  },
  {
    key: "authoring_max_iterations",
    env: "PAQAD_AUTHORING_MAX_ITERATIONS",
    type: "number",
    default: 3,
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "The most revision rounds an eval loop runs before it stops."
  },
  {
    key: "authoring_fact_max_age_days",
    env: "PAQAD_AUTHORING_FACT_MAX_AGE_DAYS",
    type: "number",
    default: 60,
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "Days a checked outside fact in the sources of a skill stays fresh before release asks for a recheck."
  },
  {
    key: "authoring_collision_jaccard",
    env: "PAQAD_AUTHORING_COLLISION_JACCARD",
    type: "number",
    default: 0.4,
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "How much word overlap (0 to 1) a new skill may have with an installed one before it counts as a clash."
  },
  {
    key: "authoring_description_budget_chars",
    env: "PAQAD_AUTHORING_DESCRIPTION_BUDGET_CHARS",
    type: "number",
    default: 8e3,
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "The total characters of all installed skill descriptions before release warns that some may be dropped."
  },
  {
    key: "skill_body_max_tokens",
    env: "PAQAD_SKILL_BODY_MAX_TOKENS",
    type: "number",
    default: 5e3,
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "The most tokens the body of a skill file may hold."
  },
  {
    key: "authoring_tool_result_max_tokens",
    env: "PAQAD_AUTHORING_TOOL_RESULT_MAX_TOKENS",
    type: "number",
    default: 1e4,
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "A tool result larger than this many tokens is flagged as too large in an eval run."
  },
  {
    key: "authoring_cache_hit_min",
    env: "PAQAD_AUTHORING_CACHE_HIT_MIN",
    type: "number",
    default: 0.7,
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "The share of cache hits (0 to 1) below which an eval run is recorded as slow."
  },
  {
    key: "authoring_regression_tolerance",
    env: "PAQAD_AUTHORING_REGRESSION_TOLERANCE",
    type: "number",
    default: 0.2,
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "How far (0 to 1) the pass rate of a changed skill may fall below the old version before it fails."
  },
  {
    key: "authoring_dark_window_days",
    env: "PAQAD_AUTHORING_DARK_WINDOW_DAYS",
    type: "number",
    default: 30,
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "Days without a firing before a skill is reported as unused."
  },
  {
    key: "authoring_batch_mode",
    env: "PAQAD_AUTHORING_BATCH_MODE",
    type: "enum",
    enumValues: AUTHORING_BATCH_MODES,
    default: "auto",
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "Whether trigger test queries are sent as one batch when the host offers it."
  },
  {
    key: "authoring_run_max_cost_usd",
    env: "PAQAD_AUTHORING_RUN_MAX_COST_USD",
    type: "number",
    default: 5,
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "The most US dollars one eval or trigger run may spend before it stops and counts as failed."
  },
  {
    key: "authoring_otel_endpoint",
    env: "PAQAD_AUTHORING_OTEL_ENDPOINT",
    type: "string",
    default: "",
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "An OpenTelemetry address to also read usage numbers from, where empty reads them from the host only and paqad never sends transcripts there."
  },
  {
    key: "agent_orchestrator_enabled",
    env: "PAQAD_AGENT_ORCHESTRATOR_ENABLED",
    type: "boolean",
    default: true,
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "Turns on the checks and pipeline paqad runs when a helper agent is written or changed."
  },
  {
    key: "agent_pass_k_threshold",
    env: "PAQAD_AGENT_PASS_K_THRESHOLD",
    type: "number",
    default: 0.9,
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "The score (0 to 1) an agent must reach when each of its eval cases runs three times."
  },
  {
    key: "agent_stage_pass_k_threshold",
    env: "PAQAD_AGENT_STAGE_PASS_K_THRESHOLD",
    type: "number",
    default: 0.95,
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "The score (0 to 1) an unattended stage agent must reach when each of its eval cases runs three times."
  },
  {
    key: "agent_delegation_threshold",
    env: "PAQAD_AGENT_DELEGATION_THRESHOLD",
    type: "number",
    default: 0.9,
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "The share of test requests (0 to 1) an agent description must route to the agent correctly."
  },
  {
    key: "agent_description_max_tokens",
    env: "PAQAD_AGENT_DESCRIPTION_MAX_TOKENS",
    type: "number",
    default: 300,
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "The most tokens an agent description may hold."
  },
  {
    key: "agent_report_max_tokens",
    env: "PAQAD_AGENT_REPORT_MAX_TOKENS",
    type: "number",
    default: 2e3,
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "The most tokens an agent report may hold when the agent names no smaller limit."
  },
  {
    key: "agent_prompt_max_tokens",
    env: "PAQAD_AGENT_PROMPT_MAX_TOKENS",
    type: "number",
    default: 3e3,
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "The most tokens the instructions of an agent may hold."
  },
  {
    key: "agent_max_tools",
    env: "PAQAD_AGENT_MAX_TOOLS",
    type: "number",
    default: 10,
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "The most tools an agent may list before it needs an approval."
  },
  {
    key: "agent_max_cost_multiple",
    env: "PAQAD_AGENT_MAX_COST_MULTIPLE",
    type: "number",
    default: 4,
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "The most an agent run may cost, as a multiple of doing the work in the main session, unless it saves time by running in parallel."
  },
  {
    key: "agent_catalog_description_max_tokens",
    env: "PAQAD_AGENT_CATALOG_DESCRIPTION_MAX_TOKENS",
    type: "number",
    default: 15e3,
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "The most tokens all installed agent descriptions may hold together."
  },
  {
    key: "agent_memory_max_lines",
    env: "PAQAD_AGENT_MEMORY_MAX_LINES",
    type: "number",
    default: 200,
    group: "policy",
    section: AUTHORING_SECTION,
    comment: "The most lines the memory file of an agent may hold."
  }
];
var FRAMEWORK_CONFIG_SPECS = BASE_CONFIG_SPECS.map(
  (spec) => ({ ...spec, ...teamConfigHome(spec.key) })
);
function stageEffortComment(stage) {
  const base = `How hard the ${stage} stage helper thinks, where inherit uses the effort of the main session and \`paqad-ai stage settings\` applies a change`;
  return stage === "review" ? `${base}, and a lighter review catches less.` : `${base}.`;
}
var SPEC_BY_KEY = new Map(
  FRAMEWORK_CONFIG_SPECS.map((spec) => [spec.key, spec])
);
var KNOWN_CONFIG_KEYS = new Set(
  FRAMEWORK_CONFIG_SPECS.map((spec) => spec.key)
);
var DEFAULT_EFFICIENCY_TUNING = {
  context_hit_rate_target: 0.7,
  skill_caching: true,
  differential_refresh: true,
  mcp_first: true
};
function parseDotConfig(text) {
  const out = /* @__PURE__ */ new Map();
  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (line === "" || line.startsWith("#")) {
      continue;
    }
    const eq = line.indexOf("=");
    if (eq === -1) {
      continue;
    }
    let key = line.slice(0, eq).trim();
    if (key.startsWith("export ")) {
      key = key.slice("export ".length).trim();
    }
    if (key === "") {
      continue;
    }
    out.set(key, stripValue(line.slice(eq + 1)));
  }
  return out;
}
function stripValue(raw) {
  const v = raw.trim();
  if (v.length >= 2 && (v.startsWith('"') && v.endsWith('"') || v.startsWith("'") && v.endsWith("'"))) {
    return v.slice(1, -1);
  }
  const inlineComment = v.search(/\s#/u);
  return inlineComment === -1 ? v : v.slice(0, inlineComment).trim();
}
function readRawDotConfig(projectRoot) {
  try {
    return parseDotConfig(readFileSync5(join5(projectRoot, PATHS.PROJECT_CONFIG), "utf8"));
  } catch {
    return /* @__PURE__ */ new Map();
  }
}
function readDotConfig(projectRoot) {
  const out = /* @__PURE__ */ new Map();
  for (const [key, value] of readRawDotConfig(projectRoot)) {
    out.set(key, personalValue(SPEC_BY_KEY.get(key), value));
  }
  return out;
}
function envConfigValue(env, key) {
  const spec = SPEC_BY_KEY.get(key);
  const raw = spec === void 0 ? void 0 : env[spec.env];
  return raw === void 0 ? void 0 : personalValue(spec, raw);
}
function readConfigsDir(projectRoot) {
  return readTeamConfig(projectRoot);
}
function layeredConfigMap(projectRoot, env = process.env) {
  const merged = /* @__PURE__ */ new Map();
  for (const [key, value] of readTeamConfig(projectRoot).merged) {
    merged.set(key, value);
  }
  for (const [key, value] of readDotConfig(projectRoot)) {
    merged.set(key, value);
  }
  for (const spec of FRAMEWORK_CONFIG_SPECS) {
    const raw = env[spec.env];
    if (typeof raw === "string" && raw.trim() !== "") {
      merged.set(spec.key, personalValue(spec, raw));
    }
  }
  return merged;
}
function resolveNumericConfig(projectRoot, env, key, fallback, valid) {
  const raw = layeredConfigMap(projectRoot, env).get(key);
  if (raw === void 0) {
    return fallback;
  }
  const parsed = Number(raw.trim());
  return Number.isFinite(parsed) && valid(parsed) ? parsed : fallback;
}
function autoRuleGateConcurrency(cores = availableParallelism()) {
  return Math.max(1, Math.min(RULE_GATE_DEFAULTS.max_concurrency, cores - 1));
}
function positiveNumber(raw) {
  const parsed = raw === void 0 || raw.trim() === "" ? NaN : Number(raw.trim());
  return Number.isFinite(parsed) && parsed > 0 ? parsed : void 0;
}
function resolveRuleGateConfig(projectRoot, env = process.env, cores = availableParallelism()) {
  const raw = layeredConfigMap(projectRoot, env);
  const budget = positiveNumber(raw.get("rule_gate_budget_ms"));
  const concurrency = positiveNumber(raw.get("rule_gate_concurrency"));
  const wholeConcurrency = concurrency === void 0 ? 0 : Math.floor(concurrency);
  return {
    preEdit: asEnum(
      raw.get("rule_gate_pre_edit")?.toLowerCase(),
      RULE_GATE_PRE_EDIT_MODES,
      RULE_GATE_DEFAULTS.pre_edit
    ),
    concurrency: wholeConcurrency >= 1 ? Math.min(RULE_GATE_DEFAULTS.max_concurrency, wholeConcurrency) : autoRuleGateConcurrency(cores),
    budgetMs: budget === void 0 ? RULE_GATE_DEFAULTS.budget_ms : Math.min(
      RULE_GATE_DEFAULTS.max_budget_ms,
      Math.max(RULE_GATE_DEFAULTS.min_budget_ms, budget)
    )
  };
}
function configSaysPaqadDisabled(projectRoot, env = process.env) {
  const raw = layeredConfigMap(projectRoot, env).get("paqad_enable");
  return raw !== void 0 && FALSY2.has(raw.trim().toLowerCase());
}
function resolveTeamBootstrapEnabled(projectRoot, env = process.env) {
  const raw = layeredConfigMap(projectRoot, env).get("team_bootstrap_enabled");
  return raw === void 0 || !FALSY2.has(raw.trim().toLowerCase());
}
function teamSetsInstallModeSettings(projectRoot) {
  const raw = readConfigsDir(projectRoot).merged.get("claude_install_mode");
  return raw?.trim().toLowerCase() === "settings";
}
function resolvePluginMigrationConfig(projectRoot, env = process.env) {
  const raw = layeredConfigMap(projectRoot, env);
  return {
    migration: asEnum(
      raw.get("plugin_migration"),
      PLUGIN_MIGRATION_MODES,
      defOf("plugin_migration")
    ),
    install_mode: asEnum(
      raw.get("claude_install_mode"),
      CLAUDE_INSTALL_MODES,
      defOf("claude_install_mode")
    )
  };
}
function resolveStageAgentSettings(projectRoot, env = process.env) {
  const raw = projectRoot === void 0 ? /* @__PURE__ */ new Map() : layeredConfigMap(projectRoot, env);
  const settings = {};
  for (const stage of STAGE_SETTING_STAGES) {
    settings[stage] = {
      effort: asEnum(
        raw.get(`stage_effort_${stage}`),
        STAGE_EFFORT_LEVELS,
        STAGE_EFFORT_DEFAULTS[stage]
      ),
      model: asEnum(raw.get(`stage_model_${stage}`), STAGE_MODELS, "inherit")
    };
  }
  return settings;
}
function escapeRegExp2(input) {
  return input.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
}
function setConfigValue(projectRoot, key, value) {
  const path = join5(projectRoot, PATHS.PROJECT_CONFIG);
  let existing = "";
  try {
    existing = readFileSync5(path, "utf8");
  } catch {
  }
  const lines = existing.replace(/\n+$/u, "").split(/\r?\n/);
  const assignRe = new RegExp(`^\\s*(?:export\\s+)?${escapeRegExp2(key)}\\s*=`, "u");
  let replaced = false;
  const next = lines.map((line) => {
    if (!replaced && !line.trimStart().startsWith("#") && assignRe.test(line)) {
      replaced = true;
      return `${key}=${value}`;
    }
    return line;
  });
  if (!replaced) {
    if (next.length === 1 && next[0] === "") {
      next[0] = `${key}=${value}`;
    } else {
      next.push(`${key}=${value}`);
    }
  }
  mkdirSync3(dirname2(path), { recursive: true });
  writeFileSync4(path, `${next.join("\n")}
`, "utf8");
  return path;
}
function asBool(raw, def) {
  if (raw === void 0) {
    return def;
  }
  const t = raw.trim().toLowerCase();
  if (TRUTHY2.has(t)) {
    return true;
  }
  if (FALSY2.has(t)) {
    return false;
  }
  return def;
}
function asNum(raw, def) {
  if (raw === void 0 || raw.trim() === "") {
    return def;
  }
  const n = Number(raw.trim());
  return Number.isFinite(n) ? n : def;
}
function asStr(raw, def) {
  if (raw === void 0 || raw.trim() === "") {
    return def;
  }
  return raw.trim();
}
function asEnum(raw, allowed, def) {
  if (raw === void 0) {
    return def;
  }
  const t = raw.trim();
  return allowed.includes(t) ? t : def;
}
function resolveSpecPipelineSwitches(map) {
  return {
    enabled: asBool(map.get("spec_pipeline_enabled"), SPEC_PIPELINE_DEFAULTS.spec_pipeline_enabled),
    experts_enabled: asBool(
      map.get("spec_pipeline_experts_enabled"),
      SPEC_PIPELINE_DEFAULTS.spec_pipeline_experts_enabled
    ),
    adoption: asEnum(
      map.get("spec_pipeline_adoption")?.toLowerCase(),
      SPEC_PIPELINE_ADOPTION_MODES,
      SPEC_PIPELINE_DEFAULTS.spec_pipeline_adoption
    ),
    experts_lanes: resolveLaneList(map.get("spec_pipeline_experts_lanes"), ["full"])
  };
}
function resolveLaneList(raw, fallback) {
  const known = (raw ?? "").split(",").map((part) => part.trim().toLowerCase()).filter((part) => LANES.includes(part));
  const lanes = [...new Set(known.length > 0 ? known : fallback)];
  return lanes.includes("full") ? lanes : [...lanes, "full"];
}
function resolveStageIsolationLanes(map) {
  return resolveLaneList(map.get("stage_isolation_lanes"), ["full"]);
}
function asOptEnum(raw, allowed) {
  if (raw === void 0 || raw.trim() === "") {
    return void 0;
  }
  const t = raw.trim();
  return allowed.includes(t) ? t : void 0;
}
function defOf(key) {
  return SPEC_BY_KEY.get(key)?.default;
}
function resolveFrameworkConfigFromMap(raw) {
  const rb = (key) => asBool(raw.get(key), defOf(key));
  const rn = (key) => asNum(raw.get(key), defOf(key));
  const rs = (key) => asStr(raw.get(key), defOf(key));
  const provider = asOptEnum(raw.get("rag_embedding_provider"), EMBEDDING_PROVIDERS2);
  const embeddingModel = raw.get("rag_embedding_model")?.trim() || void 0;
  const intelligence = normalizeIntelligenceConfig({
    rag_enabled: rb("rag_enabled"),
    embedding_provider: provider,
    embedding_model: embeddingModel,
    rag_similarity_threshold: rn("rag_similarity_threshold"),
    rag_relief_floor: rn("rag_relief_floor"),
    rag_top_n: rn("rag_top_n"),
    rag_max_file_size: rn("rag_max_file_size"),
    rag_base_branch: raw.get("rag_base_branch")?.trim() || void 0,
    existing_surface_tokens: rn("existing_surface_tokens")
  });
  return {
    paqad: { enabled: rb("paqad_enable") },
    enterprise: {
      enabled: rb("enterprise"),
      evidence_ledger: rb("enterprise_evidence_ledger"),
      ai_bom: rb("enterprise_ai_bom"),
      compliance_citations: rb("enterprise_compliance_citations")
    },
    intelligence,
    features: {
      spec_only_mode: rb("spec_only_mode"),
      market_research: rb("market_research"),
      design_research: rb("design_research"),
      team_agents: rb("team_agents"),
      analytics_instrumentation: rb("analytics_instrumentation"),
      site_map: rb("site_map"),
      lean_rules: rb("lean_rules"),
      feature_report: rb("feature_report"),
      metrics_enabled: rb("metrics_enabled"),
      visual_evidence: rb("visual_evidence"),
      checks_parallel: rb("checks_parallel"),
      checks_max_processes: rn("checks_max_processes")
    },
    model_routing: {
      default_model: rs("model_default"),
      reasoning_model: rs("model_reasoning"),
      fast_model: rs("model_fast")
    },
    decisions: {
      ask_threshold: asEnum(
        raw.get("decisions_ask_threshold"),
        ASK_THRESHOLDS,
        defOf("decisions_ask_threshold")
      )
    },
    efficiency: {
      ...DEFAULT_EFFICIENCY_TUNING,
      auto_update: rb("auto_update"),
      minimum_version: rs("minimum_version"),
      version_check_interval_hours: rn("version_check_interval_hours")
    }
  };
}
function resolveFrameworkConfig(projectRoot, env = process.env) {
  return resolveFrameworkConfigFromMap(layeredConfigMap(projectRoot, env));
}
var DEFAULT_FRAMEWORK_CONFIG = resolveFrameworkConfigFromMap(
  /* @__PURE__ */ new Map()
);
var DECISION_CONFIG_KEYS = [
  "ask_threshold",
  "max_screens_per_task",
  "idle_timeout_minutes"
];
var REMOVED_PROFILE_SECTIONS = ["strictness", "escalation", "research"];
var FRAMEWORK_CONFIG_SECTIONS = [
  "paqad",
  "enterprise",
  "intelligence",
  ...REMOVED_PROFILE_SECTIONS,
  "features",
  "model_routing",
  "efficiency"
];
function withoutRemovedSections(base) {
  const clone = { ...base };
  for (const section of REMOVED_PROFILE_SECTIONS) delete clone[section];
  return clone;
}
function applyFrameworkConfigToProfile(base, resolved = DEFAULT_FRAMEWORK_CONFIG) {
  return {
    ...withoutRemovedSections(base),
    paqad: resolved.paqad,
    enterprise: resolved.enterprise,
    intelligence: resolved.intelligence,
    features: resolved.features,
    model_routing: resolved.model_routing,
    efficiency: resolved.efficiency,
    custom: {
      classification_dimensions: base.custom?.classification_dimensions ?? [],
      verification_plugins: base.custom?.verification_plugins ?? [],
      escalation_rules: base.custom?.escalation_rules ?? [],
      decisions: { ...base.custom?.decisions, ...resolved.decisions },
      ...base.custom?.flaky ? { flaky: base.custom.flaky } : {}
    }
  };
}
function stripFrameworkConfigFromProfile(profile) {
  const clone = { ...profile };
  for (const section of FRAMEWORK_CONFIG_SECTIONS) {
    delete clone[section];
  }
  const custom = profile.custom;
  if (custom) {
    const { decisions, ...customRest } = custom;
    if (decisions) {
      const kept = { ...decisions };
      for (const key of DECISION_CONFIG_KEYS) {
        delete kept[key];
      }
      if (Object.keys(kept).length > 0) {
        customRest.decisions = kept;
      }
    }
    clone.custom = customRest;
  }
  return clone;
}
function generateConfigsReadme() {
  const fileLines = TEAM_CONFIG_FILES.map(
    (file) => `- \`${file}\` \u2014 ${TEAM_CONFIG_FILE_DESCRIPTIONS[file]}`
  );
  const settingSections = [...TEAM_CONFIG_FILES, GIT_WORKFLOW_COMMITS_FILE].flatMap((file) => {
    const rows = FRAMEWORK_CONFIG_SPECS.filter((spec) => spec.file === file);
    return [
      `### \`${file}\``,
      "",
      "| Path | Default | Allowed values | Description | `.paqad/.config` name | Env var |",
      "|---|---|---|---|---|---|",
      ...rows.map((spec) => readmeRow(spec)),
      ""
    ];
  });
  return [
    "# paqad team configuration (`.paqad/configs/`)",
    "",
    "Tracked, team-shared settings, in YAML files that list the settings they could hold",
    "when they were written, commented out with paqad's default and a note. A setting left",
    "commented out uses paqad's default. Settings added later aren't listed in them.",
    "",
    ...fileLines,
    "- `git-workflow/` \u2014 the team rules for tickets, branches, commits, pull requests and",
    "  enforcement (see below).",
    "",
    "Run `paqad-ai config show` to see every setting, its value and where it comes from",
    "(`--changed` lists only the ones that differ from the default).",
    "",
    "## How to use",
    "",
    "- Remove the `#` in front of a setting (and in front of its group name) to change it;",
    "  put the `#` back to go back to the default.",
    "- Gates use one vocabulary: `off | warn | block`.",
    "- `paqad-ai update` regenerates this README when the settings list changes. It rewrites",
    "  a team file only for a migration, a retired value or setting, or a stale workflow",
    "  entry, and it says so. Find new settings in `../.config.example`.",
    "",
    "## Personal overrides",
    "",
    "A teammate can override a setting for themselves in the git-ignored `../.config`",
    "(`<name>=<value>`, using the `.paqad/.config` name below), and a `PAQAD_*` env var",
    "overrides everything. Both accept the values below as well as the older values.",
    "`../.config.example` lists every name with its YAML home.",
    "",
    "## Every setting",
    "",
    ...settingSections,
    "## git-workflow/",
    "",
    "`git-workflow/` holds this team's rules for tickets, branches, commits, pull requests",
    "and how strictly they're checked, in six YAML files: `tickets.yaml`, `branches.yaml`,",
    "`commits.yaml`, `pull-requests.yaml`, `enforcement.yaml` and `design-sign-off.yaml`.",
    "",
    "- No personal override applies: `../.config` and `PAQAD_*` env vars don't change them.",
    "  The one exception is `ai_attribution` in `commits.yaml`, which keeps its personal",
    "  and env override.",
    "- `paqad-ai update` adds no settings to these files, and changes one only for a",
    "  migration.",
    "- The commit-msg and pre-push hooks check people's commits and pushes;",
    "  `git commit --no-verify` skips them.",
    '- Changes go through the `git-workflow` skill. Ask your agent, for example "make hotfix',
    '  branches start from main".',
    ""
  ].join("\n");
}
function yamlText(value) {
  if (value === void 0) return "(unset)";
  if (Array.isArray(value)) return `[${value.join(", ")}]`;
  return String(value);
}
function readmeRow(spec) {
  const allowed = spec.yaml?.list ? "a list" : spec.yaml?.zeroIsAuto ? "a number or auto" : yamlEnumOf(spec)?.join(" \\| ") ?? (spec.type === "boolean" ? "true \\| false" : spec.type === "number" ? "a number" : "text");
  const description = spec.comment.replace(/\\/gu, "\\\\").replace(/\|/gu, "\\|");
  return `| \`${spec.path.join(".")}\` | \`${yamlText(yamlDefault(spec))}\` | ${allowed} | ${description} | \`${spec.key}\` | \`${spec.env}\` |`;
}
function writeConfigsReadme(projectRoot) {
  const path = join5(projectRoot, PATHS.PROJECT_CONFIGS_README);
  if (checkoutIsNewer(projectRoot)) return path;
  mkdirSync3(dirname2(path), { recursive: true });
  writeFileSync4(path, generateConfigsReadme(), "utf8");
  return path;
}
var CATALOG_VERSION = 2;
var CATALOG_VERSION_STAMP = "# catalog_version: ";
function generateConfigExample() {
  const lines = [
    "# paqad framework configuration \u2014 catalog of every knob (.paqad/.config.example)",
    `${CATALOG_VERSION_STAMP}${CATALOG_VERSION}`,
    "#",
    "# The reference for personal overrides: every setting, with its default, a one-line",
    "# explanation and its PAQAD_* env equivalent, grouped by its team YAML file. This",
    "# file is NEVER read at runtime. To override a setting for yourself, copy its line",
    "# into your git-ignored .config, uncomment it and set a value. To change it for the",
    "# team, set it at the YAML file and path named above it (see configs/README.md).",
    "#",
    "# Precedence, highest first: PAQAD_* env var > .config (personal) > configs/*.yaml",
    "# (team) > code default. With nothing set anywhere, every setting is at the",
    "# default shown below \u2014 identical to a fresh install.",
    ""
  ];
  for (const file of [...TEAM_CONFIG_FILES, GIT_WORKFLOW_COMMITS_FILE]) {
    lines.push(`# \u2500\u2500 ${file} ${"\u2500".repeat(Math.max(0, 56 - file.length))}`);
    for (const spec of FRAMEWORK_CONFIG_SPECS.filter((row) => row.file === file)) {
      lines.push(`# ${file}: ${spec.path.join(".")}`);
      lines.push(`# ${spec.comment} (env: ${spec.env})`);
      lines.push(`# ${spec.key}=${renderDefault(spec)}`);
    }
    lines.push("");
  }
  return lines.join("\n");
}
function renderDefault(spec) {
  return spec.default === void 0 ? "" : String(spec.default);
}
function writeConfigExample(projectRoot) {
  const path = join5(projectRoot, PATHS.PROJECT_CONFIG_EXAMPLE);
  if (checkoutIsNewer(projectRoot)) return path;
  mkdirSync3(dirname2(path), { recursive: true });
  writeFileSync4(path, generateConfigExample(), "utf8");
  return path;
}
var CONFIG_EXAMPLE_STAMP = "# generated by paqad-ai ";
var CATALOG_STAMP_LINE = /^# catalog_version:[ \t]*(\S*)[ \t]*\r?$/mu;
function checkoutIsNewer(projectRoot, version = "1.128.1") {
  let example;
  try {
    example = readFileSync5(join5(projectRoot, PATHS.PROJECT_CONFIG_EXAMPLE), "utf8");
  } catch {
    return false;
  }
  const catalog = CATALOG_STAMP_LINE.exec(example);
  if (catalog !== null) return isHigherStamp(catalog[1], CATALOG_VERSION);
  const stamp = example.split("\n").find((line) => line.startsWith(CONFIG_EXAMPLE_STAMP));
  if (stamp === void 0) return false;
  const stamped = stamp.slice(CONFIG_EXAMPLE_STAMP.length).trim();
  return !versionAtLeast(version, stamped);
}
function pruneUnknownKeysFromText(text, known = KNOWN_CONFIG_KEYS) {
  const removed = [];
  const kept = text.split("\n").filter((line) => {
    const trimmed = line.trimStart();
    if (trimmed === "" || trimmed.startsWith("#")) {
      return true;
    }
    const m = trimmed.match(/^(?:export\s+)?([^=\s]+)\s*=/u);
    if (!m) {
      return true;
    }
    if (known.has(m[1])) {
      return true;
    }
    removed.push(m[1]);
    return false;
  });
  return { text: kept.join("\n"), removed };
}
function reconcileConfigOverrides(projectRoot) {
  const report = [];
  if (checkoutIsNewer(projectRoot)) return report;
  const localConfig = join5(projectRoot, PATHS.PROJECT_CONFIG);
  const targets = [localConfig, ...listConfigsFiles(projectRoot)];
  for (const file of targets) {
    let original;
    try {
      original = readFileSync5(file, "utf8");
    } catch {
      continue;
    }
    const { text, removed } = pruneUnknownKeysFromText(original);
    if (removed.length === 0) {
      continue;
    }
    writeFileSync4(file, text, "utf8");
    report.push({ path: file.slice(projectRoot.length + 1), removed });
  }
  return report;
}
function detectFlippedFrameworkValues(projectRoot) {
  let raw;
  try {
    raw = readFileSync5(join5(projectRoot, PATHS.PROJECT_PROFILE), "utf8");
  } catch {
    return [];
  }
  let parsed;
  try {
    parsed = import_yaml5.default.parse(raw);
  } catch {
    return [];
  }
  if (!parsed || typeof parsed !== "object") {
    return [];
  }
  return [...frameworkOverridesToFlat(parsed)].map(
    ([key, value]) => `${key}=${value}`
  );
}
function frameworkOverridesToFlat(overrides) {
  const out = /* @__PURE__ */ new Map();
  const d = DEFAULT_FRAMEWORK_CONFIG;
  const put = (key, value, def) => {
    if (value !== void 0 && String(value) !== String(def)) {
      out.set(key, String(value));
    }
  };
  if (overrides.paqad) {
    put("paqad_enable", overrides.paqad.enabled, d.paqad.enabled);
  }
  if (overrides.enterprise) {
    put("enterprise", overrides.enterprise.enabled, d.enterprise.enabled);
    put(
      "enterprise_evidence_ledger",
      overrides.enterprise.evidence_ledger,
      d.enterprise.evidence_ledger
    );
    put("enterprise_ai_bom", overrides.enterprise.ai_bom, d.enterprise.ai_bom);
    put(
      "enterprise_compliance_citations",
      overrides.enterprise.compliance_citations,
      d.enterprise.compliance_citations
    );
  }
  if (overrides.intelligence) {
    const i = overrides.intelligence;
    put("rag_enabled", i.rag_enabled, d.intelligence.rag_enabled);
    put("rag_embedding_provider", i.embedding_provider, d.intelligence.embedding_provider);
    put("rag_embedding_model", i.embedding_model, d.intelligence.embedding_model);
    put(
      "rag_similarity_threshold",
      i.rag_similarity_threshold,
      d.intelligence.rag_similarity_threshold
    );
    put("rag_relief_floor", i.rag_relief_floor, d.intelligence.rag_relief_floor);
    put("rag_top_n", i.rag_top_n, d.intelligence.rag_top_n);
    put("rag_max_file_size", i.rag_max_file_size, d.intelligence.rag_max_file_size);
    put("rag_base_branch", i.rag_base_branch, d.intelligence.rag_base_branch);
    put(
      "existing_surface_tokens",
      i.existing_surface_tokens,
      d.intelligence.existing_surface_tokens
    );
  }
  if (overrides.features) {
    const f = overrides.features;
    put("spec_only_mode", f.spec_only_mode, d.features.spec_only_mode);
    put("market_research", f.market_research, d.features.market_research);
    put("design_research", f.design_research, d.features.design_research);
    put("team_agents", f.team_agents, d.features.team_agents);
    put(
      "analytics_instrumentation",
      f.analytics_instrumentation,
      d.features.analytics_instrumentation
    );
    put("lean_rules", f.lean_rules, d.features.lean_rules);
    put("feature_report", f.feature_report, d.features.feature_report);
    put("metrics_enabled", f.metrics_enabled, d.features.metrics_enabled);
    put("checks_parallel", f.checks_parallel, d.features.checks_parallel);
    put("checks_max_processes", f.checks_max_processes, d.features.checks_max_processes);
  }
  if (overrides.model_routing) {
    const m = overrides.model_routing;
    put("model_default", m.default_model, d.model_routing.default_model);
    put("model_reasoning", m.reasoning_model, d.model_routing.reasoning_model);
    put("model_fast", m.fast_model, d.model_routing.fast_model);
  }
  if (overrides.custom?.decisions) {
    const dec = overrides.custom.decisions;
    put("decisions_ask_threshold", dec.ask_threshold, d.decisions.ask_threshold);
  }
  if (overrides.efficiency) {
    const ef = overrides.efficiency;
    put("auto_update", ef.auto_update, d.efficiency.auto_update);
    put("minimum_version", ef.minimum_version, d.efficiency.minimum_version);
    put(
      "version_check_interval_hours",
      ef.version_check_interval_hours,
      d.efficiency.version_check_interval_hours
    );
  }
  return out;
}
function writeFrameworkOverridesToConfig(projectRoot, overrides) {
  const written = [];
  for (const [key, value] of frameworkOverridesToFlat(overrides)) {
    setConfigValue(projectRoot, key, value);
    written.push(key);
  }
  return written;
}
function removeConfigValue(projectRoot, key) {
  const path = join5(projectRoot, PATHS.PROJECT_CONFIG);
  let existing;
  try {
    existing = readFileSync5(path, "utf8");
  } catch {
    return;
  }
  const assignRe = new RegExp(`^\\s*(?:export\\s+)?${escapeRegExp2(key)}\\s*=`, "u");
  const kept = existing.split(/\r?\n/).filter((line) => line.trimStart().startsWith("#") || !assignRe.test(line));
  writeFileSync4(path, kept.join("\n"), "utf8");
}
var CONFIG_KEY_SECTIONS = [
  { present: (p) => p.paqad !== void 0, keys: ["paqad_enable"] },
  {
    present: (p) => p.enterprise !== void 0,
    keys: [
      "enterprise",
      "enterprise_evidence_ledger",
      "enterprise_ai_bom",
      "enterprise_compliance_citations"
    ]
  },
  {
    present: (p) => p.intelligence !== void 0,
    keys: [
      "rag_enabled",
      "rag_embedding_provider",
      "rag_embedding_model",
      "rag_similarity_threshold",
      "rag_relief_floor",
      "rag_top_n",
      "rag_max_file_size",
      "rag_base_branch",
      "existing_surface_tokens"
    ]
  },
  {
    present: (p) => p.features !== void 0,
    keys: [
      "spec_only_mode",
      "market_research",
      "design_research",
      "team_agents",
      "analytics_instrumentation",
      "site_map",
      "rules_discovery_private_packages",
      "lean_rules",
      "feature_report",
      "metrics_enabled",
      "visual_evidence",
      "checks_parallel",
      "checks_max_processes"
    ]
  },
  {
    present: (p) => p.model_routing !== void 0,
    keys: ["model_default", "model_reasoning", "model_fast"]
  },
  {
    present: (p) => p.custom?.decisions !== void 0,
    keys: ["decisions_ask_threshold"]
  },
  {
    present: (p) => p.efficiency !== void 0,
    keys: ["auto_update", "minimum_version", "version_check_interval_hours"]
  },
  {
    present: () => false,
    keys: [
      "stages_mode",
      "rule_compliance",
      "rule_gate_pre_edit",
      "rule_gate_concurrency",
      "rule_gate_budget_ms",
      "analytics_strictness",
      "duplication_mode",
      "mutation_mode",
      "duplication_similarity_threshold",
      "duplication_min_lines",
      "bundle_completeness",
      "evidence_existence_gate",
      "decision_arm_mode",
      "decision_arm_plan_threshold",
      "decision_arm_max_per_change",
      "ai_attribution",
      "stage_isolation_lanes",
      "spec_pipeline_enabled",
      "spec_pipeline_clarification",
      "spec_pipeline_final_review",
      "spec_pipeline_token_ceiling",
      "spec_grounding_budget_ms",
      "spec_pipeline_experts_enabled",
      "spec_pipeline_adoption",
      "spec_pipeline_experts_lanes",
      "spec_pipeline_standing_experts",
      "visual_evidence_mode",
      "checks_flaky_under_parallel"
    ]
  },
  {
    present: () => false,
    keys: ["plugin_migration", "claude_install_mode"]
  },
  {
    present: () => false,
    keys: ["team_bootstrap_enabled"]
  },
  {
    present: () => false,
    keys: ["hud_view", "hud_chime"]
  },
  {
    present: () => false,
    keys: FRAMEWORK_CONFIG_SPECS.filter((spec) => spec.section === AUTHORING_SECTION).map(
      (spec) => spec.key
    )
  },
  {
    present: () => false,
    keys: STAGE_SETTING_STAGES.flatMap((stage) => [
      `stage_effort_${stage}`,
      `stage_model_${stage}`
    ])
  }
];
function syncFrameworkConfig(projectRoot, profile) {
  const nonDefault = frameworkOverridesToFlat(profile);
  for (const section of CONFIG_KEY_SECTIONS) {
    if (!section.present(profile)) {
      continue;
    }
    for (const key of section.keys) {
      const value = nonDefault.get(key);
      if (value !== void 0) {
        setConfigValue(projectRoot, key, value);
      } else {
        removeConfigValue(projectRoot, key);
      }
    }
  }
}

// src/core/team-config-legacy.ts
var SYSTEM_CLOCK = {
  today: () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
  releaseDate: () => "2026-11-12"
};
var clock = SYSTEM_CLOCK;
function legacyTeamConfigReadable() {
  return clock.today() <= LEGACY_TEAM_CONFIG_READ_UNTIL;
}
function releasedAfterLegacyWindow() {
  return clock.releaseDate() > LEGACY_TEAM_CONFIG_READ_UNTIL;
}
function legacyStillLine(key, oldFile) {
  return `${key} is still in .paqad/configs/${oldFile}. Run paqad-ai config migrate to move it.`;
}
function legacyBothLine(key, oldFile, yamlFile) {
  return `${key} is set in both .paqad/configs/${oldFile} and ${yamlFile}; paqad uses the YAML value. Run paqad-ai config migrate to clean up.`;
}
function legacyNoLongerReadLine(oldFile) {
  return `Old settings in .paqad/configs/${oldFile} are no longer read. Run paqad-ai config migrate to move them.`;
}
function legacyShouldMoveLine(oldFile) {
  return `Old settings in .paqad/configs/${oldFile} should be moved. Run paqad-ai config migrate.`;
}
var CONFIG_GROUP_FILES = {
  app: ".config.app",
  rag: ".config.rag",
  models: ".config.models",
  policy: ".config.policy"
};
var MIGRATED_STUB_MARKER = "# paqad-migrated-stub";
function listConfigsFiles(projectRoot) {
  const dir = join6(projectRoot, PATHS.PROJECT_CONFIGS_DIR);
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return [];
  }
  return entries.filter((name) => /^\.config\..+/u.test(name) && name !== ".config.example").sort().map((name) => join6(dir, name));
}
function isMigratedStub(text) {
  return text.split(/\r?\n/u, 1)[0]?.trim() === MIGRATED_STUB_MARKER;
}
function legacyFilesWithSettings(projectRoot) {
  const names = [];
  for (const file of listConfigsFiles(projectRoot)) {
    let text;
    try {
      text = readFileSync6(file, "utf8");
    } catch {
      continue;
    }
    if (!isMigratedStub(text) && parseDotConfig(text).size > 0) {
      names.push(file.split(/[\\/]/u).pop());
    }
  }
  return names;
}
function readLegacyTeamConfig(projectRoot) {
  const merged = /* @__PURE__ */ new Map();
  const seenIn = /* @__PURE__ */ new Map();
  for (const file of listConfigsFiles(projectRoot)) {
    let text;
    try {
      text = readFileSync6(file, "utf8");
    } catch {
      continue;
    }
    if (isMigratedStub(text)) continue;
    for (const [key, value] of parseDotConfig(text)) {
      merged.set(key, value);
      seenIn.set(key, [...seenIn.get(key) ?? [], file]);
    }
  }
  const collisions = [];
  const sources = /* @__PURE__ */ new Map();
  for (const [key, files] of seenIn) {
    sources.set(key, files[files.length - 1]);
    if (files.length > 1) collisions.push({ key, files });
  }
  return { merged, collisions, sources };
}
function teamConfigMigrated(projectRoot) {
  const app = join6(projectRoot, PATHS.PROJECT_CONFIGS_DIR, CONFIG_GROUP_FILES.app);
  if (!existsSync3(app)) return legacyFilesWithSettings(projectRoot).length === 0;
  try {
    return isMigratedStub(readFileSync6(app, "utf8"));
  } catch {
    return false;
  }
}

export {
  require_dist,
  require_ajv,
  design_tokens_schema_default,
  project_profile_schema_default,
  SchemaValidator,
  GIT_WORKFLOW_FILES,
  GIT_WORKFLOW_SCHEMAS,
  gitWorkflowDir,
  gitWorkflowFilePath,
  readGitWorkflowContents,
  loadGitWorkflow,
  resolveGitWorkflow,
  lastAppliedPath,
  readLastApplied,
  stampLastApplied,
  changedOutside,
  refreshLastAppliedHashes,
  LEGACY_SCHEMA_LINE_PREFIX,
  isMissingFileError,
  readTextIfExistsSync,
  insertKey,
  setValue,
  removeKey,
  sha256,
  ruleTextHash,
  parseRuleMarker,
  parseRuleMarkerRun,
  stripRuleMarker,
  embedRuleMarker,
  mintRuleId,
  isRuleId,
  shippedRuleLineStart,
  isShippedWorkflowEntry,
  RETIRED_SAFETY_FILE,
  isRetiredSettingKey,
  retiredPathsFor,
  retiredSettingLine,
  WORKFLOW_POLICY_STAGES,
  STRUCTURED_TEAM_SETTINGS,
  legacyTeamConfigReadable,
  releasedAfterLegacyWindow,
  legacyNoLongerReadLine,
  legacyShouldMoveLine,
  CONFIG_GROUP_FILES,
  MIGRATED_STUB_MARKER,
  isMigratedStub,
  legacyFilesWithSettings,
  teamConfigMigrated,
  TEAM_CONFIG_FILES,
  GIT_WORKFLOW_COMMITS_FILE,
  toYamlValue,
  yamlDefault,
  checkYamlValue,
  teamConfigPath,
  invalidFileMessage,
  parseTeamConfigText,
  readTeamYamlFile,
  readTeamConfig,
  setTeamConfigValue,
  syncTeamConfigFiles,
  renderTeamConfigFile,
  versionAtLeast,
  EMBEDDING_PROVIDERS,
  LOCAL_EMBEDDING_MODELS,
  DEFAULT_LOCAL_EMBEDDING_MODEL,
  DEFAULT_EXISTING_SURFACE_TOKENS,
  DEFAULT_BENCHMARK_GATES,
  getDefaultEmbeddingModel,
  defaultIntelligenceConfig,
  normalizeIntelligenceConfig,
  LANES,
  PROCESS_DEPTHS,
  COMPLEXITY_LEVELS,
  RISK_LEVELS,
  selectLane,
  AUTHORING_BATCH_MODES,
  AUTHORING_SECTION,
  STAGE_EFFORT_LEVELS,
  STAGE_MODELS,
  STAGE_SETTING_STAGES,
  FRAMEWORK_CONFIG_SPECS,
  parseDotConfig,
  readDotConfig,
  envConfigValue,
  readConfigsDir,
  layeredConfigMap,
  resolveNumericConfig,
  resolveRuleGateConfig,
  configSaysPaqadDisabled,
  resolveTeamBootstrapEnabled,
  teamSetsInstallModeSettings,
  resolvePluginMigrationConfig,
  resolveStageAgentSettings,
  setConfigValue,
  resolveSpecPipelineSwitches,
  resolveStageIsolationLanes,
  resolveFrameworkConfig,
  DEFAULT_FRAMEWORK_CONFIG,
  applyFrameworkConfigToProfile,
  stripFrameworkConfigFromProfile,
  writeConfigsReadme,
  writeConfigExample,
  checkoutIsNewer,
  reconcileConfigOverrides,
  detectFlippedFrameworkValues,
  writeFrameworkOverridesToConfig,
  syncFrameworkConfig
};
