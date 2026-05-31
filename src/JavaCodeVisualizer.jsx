import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Play, Pause, SkipForward, SkipBack, RotateCcw, Code2, ChevronDown, Terminal, Layers, Variable, FileCode, Circle, AlertTriangle, Check, Loader2, Sun, Moon, FilePlus2, Trash2, Send, Download, Maximize2, Minimize2 } from "lucide-react";

const JAVA_LOGO = 'data:image/jpeg;base64,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';

// ============================================================
// JAVA INTERPRETER ENGINE
// ============================================================

class JavaInterpreter {
  constructor() {
    this.reset();
  }

  reset() {
    this.states = [];
    this.output = [];
    this.errors = [];
    this.callStack = [];
    this.globalVars = {};
    this.methods = {};
    this.currentLine = 0;
    this.iterationCounters = {};
    this.maxIterations = 10000;
    this.totalSteps = 0;
    this.executedLines = new Set();
    this.inputQueue = [];
    this.inputIndex = 0;
  }

  tokenize(code) {
    const tokens = [];
    let i = 0;
    const lines = code.split('\n');
    
    for (let lineNum = 0; lineNum < lines.length; lineNum++) {
      let line = lines[lineNum];
      let col = 0;
      
      while (col < line.length) {
        // Skip whitespace
        if (/\s/.test(line[col])) { col++; continue; }
        
        // Single-line comment
        if (line[col] === '/' && line[col + 1] === '/') {
          break; // skip rest of line
        }
        
        // Multi-line comment start (simplified - single line only for now)
        if (line[col] === '/' && line[col + 1] === '*') {
          const end = line.indexOf('*/', col + 2);
          if (end !== -1) { col = end + 2; continue; }
          break;
        }
        
        // String literal
        if (line[col] === '"') {
          let str = '"';
          col++;
          while (col < line.length && line[col] !== '"') {
            if (line[col] === '\\') { str += line[col++]; }
            str += line[col++];
          }
          str += '"';
          col++;
          tokens.push({ type: 'STRING', value: str, line: lineNum + 1 });
          continue;
        }
        
        // Char literal
        if (line[col] === "'") {
          let ch = "'";
          col++;
          while (col < line.length && line[col] !== "'") {
            if (line[col] === '\\') { ch += line[col++]; }
            ch += line[col++];
          }
          ch += "'";
          col++;
          tokens.push({ type: 'CHAR', value: ch, line: lineNum + 1 });
          continue;
        }
        
        // Numbers
        if (/[0-9]/.test(line[col]) || (line[col] === '.' && /[0-9]/.test(line[col + 1]))) {
          let num = '';
          let hasDecimal = false;
          while (col < line.length && (/[0-9]/.test(line[col]) || line[col] === '.')) {
            if (line[col] === '.') {
              if (hasDecimal) break;
              hasDecimal = true;
            }
            num += line[col++];
          }
          tokens.push({ type: 'NUMBER', value: num, line: lineNum + 1 });
          continue;
        }
        
        // Identifiers and keywords
        if (/[a-zA-Z_$]/.test(line[col])) {
          let id = '';
          while (col < line.length && /[a-zA-Z0-9_$]/.test(line[col])) {
            id += line[col++];
          }
          const keywords = ['public', 'private', 'protected', 'static', 'void', 'class', 'int', 'double', 'boolean', 'char', 'String', 'float', 'long', 'short', 'byte', 'if', 'else', 'for', 'while', 'do', 'return', 'new', 'true', 'false', 'null', 'this', 'System', 'out', 'println', 'print', 'length', 'charAt', 'Math', 'abs', 'max', 'min', 'sqrt', 'pow', 'random'];
          if (keywords.includes(id)) {
            tokens.push({ type: 'KEYWORD', value: id, line: lineNum + 1 });
          } else {
            tokens.push({ type: 'IDENTIFIER', value: id, line: lineNum + 1 });
          }
          continue;
        }
        
        // Multi-char operators
        const multiOps = ['==', '!=', '<=', '>=', '&&', '||', '++', '--', '+=', '-=', '*=', '/=', '%='];
        let matched = false;
        for (const op of multiOps) {
          if (line.substring(col, col + op.length) === op) {
            tokens.push({ type: 'OPERATOR', value: op, line: lineNum + 1 });
            col += op.length;
            matched = true;
            break;
          }
        }
        if (matched) continue;
        
        // Single char operators and punctuation
        const singles = '+-*/%=<>!&|^~?:;,.(){}[]';
        if (singles.includes(line[col])) {
          tokens.push({ type: 'OPERATOR', value: line[col], line: lineNum + 1 });
          col++;
          continue;
        }
        
        col++;
      }
      
      tokens.push({ type: 'NEWLINE', value: '\n', line: lineNum + 1 });
    }
    
    return tokens.filter(t => t.type !== 'NEWLINE');
  }

  parse(code) {
    this.reset();
    const tokens = this.tokenize(code);
    const statements = this.parseStatements(tokens, code);
    return statements;
  }

  parseStatements(tokens, code) {
    const stmts = [];
    let i = 0;
    const lines = code.split('\n');
    
    // Extract methods and main logic
    const methodBodies = this.extractMethods(lines);
    
    for (const method of methodBodies) {
      if (method.name === 'main') {
        const mainStmts = this.parseMethodBody(method.bodyLines, method.startLine);
        stmts.push(...mainStmts);
      } else {
        this.methods[method.name] = {
          params: method.params,
          returnType: method.returnType,
          bodyLines: method.bodyLines,
          startLine: method.startLine
        };
      }
    }
    
    return stmts;
  }

  extractMethods(lines) {
    const methods = [];
    let i = 0;
    
    while (i < lines.length) {
      const line = lines[i].trim();
      
      // Match method declarations
      const methodMatch = line.match(/(?:public\s+|private\s+|protected\s+)?(?:static\s+)?(\w+(?:\[\])?)\s+(\w+)\s*\(([^)]*)\)\s*\{?\s*$/);
      
      if (methodMatch && !line.startsWith('//') && !line.includes('class ') && !line.includes('new ')) {
        const returnType = methodMatch[1];
        const name = methodMatch[2];
        const paramsStr = methodMatch[3].trim();
        const params = paramsStr ? paramsStr.split(',').map(p => {
          const parts = p.trim().split(/\s+/);
          return { type: parts.slice(0, -1).join(' '), name: parts[parts.length - 1] };
        }) : [];
        
        // Find matching closing brace
        let braceCount = line.includes('{') ? 1 : 0;
        let bodyStart = i + 1;
        
        if (!line.includes('{')) {
          while (bodyStart < lines.length && !lines[bodyStart].includes('{')) bodyStart++;
          braceCount = 1;
          bodyStart++;
        }
        
        let bodyEnd = bodyStart;
        while (bodyEnd < lines.length && braceCount > 0) {
          for (const ch of lines[bodyEnd]) {
            if (ch === '{') braceCount++;
            if (ch === '}') braceCount--;
          }
          if (braceCount > 0) bodyEnd++;
        }
        
        methods.push({
          name,
          returnType,
          params,
          bodyLines: lines.slice(bodyStart, bodyEnd),
          startLine: bodyStart + 1
        });
        
        i = bodyEnd + 1;
        continue;
      }
      
      i++;
    }
    
    return methods;
  }

  parseMethodBody(bodyLines, startLine) {
    const stmts = [];
    let i = 0;
    
    while (i < bodyLines.length) {
      const line = bodyLines[i].trim();
      const lineNum = startLine + i;
      
      if (!line || line.startsWith('//') || line.startsWith('/*') || line === '{' || line === '}') {
        i++;
        continue;
      }
      
      // For loop
      const forMatch = line.match(/^for\s*\((.+)\)\s*\{?\s*$/);
      if (forMatch) {
        const parts = forMatch[1].split(';').map(s => s.trim());
        let bodyStmts = [];
        let braceCount = line.includes('{') ? 1 : 0;
        let j = i + 1;
        
        if (!line.includes('{')) {
          // Single statement for body
          if (j < bodyLines.length) {
            bodyStmts = this.parseMethodBody([bodyLines[j]], startLine + j);
          }
          j++;
        } else {
          const bodyStart = j;
          while (j < bodyLines.length && braceCount > 0) {
            for (const ch of bodyLines[j]) {
              if (ch === '{') braceCount++;
              if (ch === '}') braceCount--;
            }
            if (braceCount > 0) j++;
          }
          bodyStmts = this.parseMethodBody(bodyLines.slice(bodyStart, j), startLine + bodyStart);
          j++;
        }
        
        stmts.push({
          type: 'for',
          init: parts[0],
          condition: parts[1],
          update: parts[2],
          body: bodyStmts,
          line: lineNum
        });
        i = j;
        continue;
      }
      
      // While loop
      const whileMatch = line.match(/^while\s*\((.+)\)\s*\{?\s*$/);
      if (whileMatch) {
        let bodyStmts = [];
        let braceCount = line.includes('{') ? 1 : 0;
        let j = i + 1;
        
        if (!line.includes('{')) {
          if (j < bodyLines.length) {
            bodyStmts = this.parseMethodBody([bodyLines[j]], startLine + j);
          }
          j++;
        } else {
          const bodyStart = j;
          while (j < bodyLines.length && braceCount > 0) {
            for (const ch of bodyLines[j]) {
              if (ch === '{') braceCount++;
              if (ch === '}') braceCount--;
            }
            if (braceCount > 0) j++;
          }
          bodyStmts = this.parseMethodBody(bodyLines.slice(bodyStart, j), startLine + bodyStart);
          j++;
        }
        
        stmts.push({
          type: 'while',
          condition: whileMatch[1],
          body: bodyStmts,
          line: lineNum
        });
        i = j;
        continue;
      }

      // Do-while loop
      const doMatch = line.match(/^do\s*\{?\s*$/);
      if (doMatch) {
        let bodyStmts = [];
        let braceCount = line.includes('{') ? 1 : 0;
        let j = i + 1;
        const bodyStart = j;
        while (j < bodyLines.length && braceCount > 0) {
          for (const ch of bodyLines[j]) {
            if (ch === '{') braceCount++;
            if (ch === '}') braceCount--;
          }
          if (braceCount > 0) j++;
        }
        // j is now on the "} while(...)" line
        const whileCondMatch = bodyLines[j]?.trim().match(/\}\s*while\s*\((.+)\)\s*;/);
        const cond = whileCondMatch ? whileCondMatch[1] : 'true';
        bodyStmts = this.parseMethodBody(bodyLines.slice(bodyStart, j), startLine + bodyStart);
        stmts.push({
          type: 'dowhile',
          condition: cond,
          body: bodyStmts,
          line: lineNum,
          condLine: startLine + j
        });
        i = j + 1;
        continue;
      }
      
      // If / else if / else
      const ifMatch = line.match(/^if\s*\((.+)\)\s*\{?\s*$/);
      if (ifMatch) {
        const branches = [];
        let condition = ifMatch[1];
        let braceCount = line.includes('{') ? 1 : 0;
        let j = i + 1;
        
        // Parse if body - stop at the line where closing } is found
        const bodyStart = j;
        while (j < bodyLines.length && braceCount > 0) {
          const bLine = bodyLines[j];
          // Check each char but stop if we hit } that closes the if-body
          for (let ci = 0; ci < bLine.length; ci++) {
            if (bLine[ci] === '{') braceCount++;
            if (bLine[ci] === '}') {
              braceCount--;
              if (braceCount === 0) break;
            }
          }
          if (braceCount > 0) j++;
        }
        
        branches.push({
          condition,
          body: this.parseMethodBody(bodyLines.slice(bodyStart, j), startLine + bodyStart),
          line: lineNum
        });
        
        // Check for else if / else - could be on the same line as closing }
        const closingLine = bodyLines[j]?.trim() || '';
        const elseOnSameLine = closingLine.match(/^}\s*else\s+if\s*\((.+)\)\s*\{?\s*$/) || 
                               closingLine.match(/^}\s*else\s*\{?\s*$/);
        
        if (elseOnSameLine) {
          // Process else/else-if from the same line
          const processElseChain = (startJ) => {
            let ej = startJ;
            while (ej < bodyLines.length) {
              const eLine = bodyLines[ej]?.trim() || '';
              
              const eifMatch = eLine.match(/^}\s*else\s+if\s*\((.+)\)\s*\{?\s*$/) ||
                               eLine.match(/^else\s+if\s*\((.+)\)\s*\{?\s*$/);
              const eMatch = eLine.match(/^}\s*else\s*\{?\s*$/) ||
                             eLine.match(/^else\s*\{?\s*$/);
              
              if (eifMatch) {
                const cond = eifMatch[1];
                braceCount = eLine.includes('{') ? 1 : 0;
                ej++;
                const eBodyStart = ej;
                while (ej < bodyLines.length && braceCount > 0) {
                  const bl = bodyLines[ej];
                  for (let ci = 0; ci < bl.length; ci++) {
                    if (bl[ci] === '{') braceCount++;
                    if (bl[ci] === '}') { braceCount--; if (braceCount === 0) break; }
                  }
                  if (braceCount > 0) ej++;
                }
                branches.push({
                  condition: cond,
                  body: this.parseMethodBody(bodyLines.slice(eBodyStart, ej), startLine + eBodyStart),
                  line: startLine + eBodyStart - 1
                });
                // Check if this closing line also has else
                const nextClosing = bodyLines[ej]?.trim() || '';
                if (!nextClosing.match(/else/)) { ej++; break; }
              } else if (eMatch) {
                braceCount = eLine.includes('{') ? 1 : 0;
                ej++;
                const eBodyStart = ej;
                while (ej < bodyLines.length && braceCount > 0) {
                  const bl = bodyLines[ej];
                  for (let ci = 0; ci < bl.length; ci++) {
                    if (bl[ci] === '{') braceCount++;
                    if (bl[ci] === '}') { braceCount--; if (braceCount === 0) break; }
                  }
                  if (braceCount > 0) ej++;
                }
                branches.push({
                  condition: null,
                  body: this.parseMethodBody(bodyLines.slice(eBodyStart, ej), startLine + eBodyStart),
                  line: startLine + eBodyStart - 1
                });
                ej++;
                break;
              } else {
                break;
              }
            }
            return ej;
          };
          j = processElseChain(j);
        } else {
          j++;
          // Check next line for standalone else
          while (j < bodyLines.length) {
            const nextLine = bodyLines[j]?.trim() || '';
            
            const elseIfMatch2 = nextLine.match(/^else\s+if\s*\((.+)\)\s*\{?\s*$/);
            const elseMatch2 = nextLine.match(/^else\s*\{?\s*$/);
            
            if (elseIfMatch2) {
              const cond = elseIfMatch2[1];
              braceCount = nextLine.includes('{') ? 1 : 0;
              j++;
              const eBodyStart = j;
              while (j < bodyLines.length && braceCount > 0) {
                const bl = bodyLines[j];
                for (let ci = 0; ci < bl.length; ci++) {
                  if (bl[ci] === '{') braceCount++;
                  if (bl[ci] === '}') { braceCount--; if (braceCount === 0) break; }
                }
                if (braceCount > 0) j++;
              }
              branches.push({
                condition: cond,
                body: this.parseMethodBody(bodyLines.slice(eBodyStart, j), startLine + eBodyStart),
                line: startLine + eBodyStart - 1
              });
              j++;
            } else if (elseMatch2) {
              braceCount = nextLine.includes('{') ? 1 : 0;
              j++;
              const eBodyStart = j;
              while (j < bodyLines.length && braceCount > 0) {
                const bl = bodyLines[j];
                for (let ci = 0; ci < bl.length; ci++) {
                  if (bl[ci] === '{') braceCount++;
                  if (bl[ci] === '}') { braceCount--; if (braceCount === 0) break; }
                }
                if (braceCount > 0) j++;
              }
              branches.push({
                condition: null,
                body: this.parseMethodBody(bodyLines.slice(eBodyStart, j), startLine + eBodyStart),
                line: startLine + eBodyStart - 1
              });
              j++;
              break;
            } else {
              break;
            }
          }
        }
        
        stmts.push({ type: 'if', branches, line: lineNum });
        i = j;
        continue;
      }
      
      // Handle "} else if" or "} else" at start (already consumed by if parser above)
      if (line.startsWith('} else') || line === '}') {
        i++;
        continue;
      }
      
      // Return statement
      const returnMatch = line.match(/^return\s*(.*?)\s*;$/);
      if (returnMatch) {
        stmts.push({ type: 'return', expr: returnMatch[1], line: lineNum });
        i++;
        continue;
      }
      
      // Regular statement (declaration, assignment, method call, etc.)
      const cleanLine = line.endsWith(';') ? line.slice(0, -1).trim() : line.replace(/[{}]/g, '').trim();
      if (cleanLine) {
        stmts.push({ type: 'statement', code: cleanLine, line: lineNum });
      }
      
      i++;
    }
    
    return stmts;
  }

  evaluateExpression(expr, vars) {
    if (expr === undefined || expr === null) return undefined;
    expr = expr.trim();
    
    if (expr === '') return undefined;
    if (expr === 'true') return true;
    if (expr === 'false') return false;
    if (expr === 'null') return null;
    
    // String literal — must be a single quoted string, not "str" + expr + "str"
    if (expr.startsWith('"') && expr.endsWith('"')) {
      // Find the actual end of the first string literal
      let endIdx = -1;
      for (let si = 1; si < expr.length; si++) {
        if (expr[si] === '\\') { si++; continue; }
        if (expr[si] === '"') { endIdx = si; break; }
      }
      if (endIdx === expr.length - 1) {
        // The entire expression is one string literal
        return expr.slice(1, -1).replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\"/g, '"');
      }
      // Otherwise it's something like "str" + expr + "str" — fall through to concat handler
    }
    
    // Char literal
    if (expr.startsWith("'") && expr.endsWith("'")) {
      return expr.slice(1, -1);
    }
    
    // Number
    if (/^-?\d+(\.\d+)?$/.test(expr)) {
      return expr.includes('.') ? parseFloat(expr) : parseInt(expr);
    }
    
    // Parenthesized expression
    if (expr.startsWith('(') && this.findMatchingParen(expr, 0) === expr.length - 1) {
      // Check for cast
      const inner = expr.slice(1, -1).trim();
      const castMatch = inner.match(/^(int|double|float|long|short|byte|char)\)\s*(.+)$/);
      if (castMatch) {
        // Actually it's (type) value
      }
      return this.evaluateExpression(inner, vars);
    }
    
    // Type cast: (double) expr, (int) expr
    // Only capture the next token (variable or number), not the whole remaining expression
    const castMatch = expr.match(/^\((\w+)\)\s*(.+)$/);
    if (castMatch) {
      const castType = castMatch[1];
      const restExpr = castMatch[2];
      
      // Check if there's an operator after the cast target — e.g. "(double) sum / 5"
      // In that case, cast only applies to the first operand
      const opMatch = restExpr.match(/^(\w+(?:\[.+?\])?)\s*([+\-*/%])\s*(.+)$/);
      if (opMatch) {
        let castVal = this.evaluateExpression(opMatch[1], vars);
        if (castType === 'int') castVal = Math.floor(Number(castVal));
        else if (castType === 'double' || castType === 'float') castVal = Number(castVal);
        else if (castType === 'char') castVal = String.fromCharCode(Number(castVal));
        
        const right = this.evaluateExpression(opMatch[3], vars);
        const op = opMatch[2];
        if (op === '+') return castVal + Number(right);
        if (op === '-') return castVal - Number(right);
        if (op === '*') return castVal * Number(right);
        if (op === '/') {
          if (Number(right) === 0) throw new Error('ArithmeticException: / by zero');
          return castVal / Number(right);
        }
        if (op === '%') return castVal % Number(right);
      }
      
      const castVal = this.evaluateExpression(restExpr, vars);
      if (castType === 'int') return Math.floor(Number(castVal));
      if (castType === 'double' || castType === 'float') return Number(castVal);
      if (castType === 'char') return String.fromCharCode(Number(castVal));
      return castVal;
    }
    
    // String concatenation with + (handle carefully)
    // We need to split on + but not inside strings or parens
    const concatParts = this.splitOnOperator(expr, '+');
    if (concatParts.length > 1) {
      const values = concatParts.map(p => this.evaluateExpression(p.trim(), vars));
      if (values.some(v => typeof v === 'string')) {
        return values.map(v => v === null ? 'null' : v === undefined ? 'undefined' : String(v)).join('');
      }
      // Otherwise it's numeric addition - but only if exactly 2 parts or all numeric
      // For more complex expressions, try to evaluate as math
    }

    // Ternary operator
    const ternaryIdx = this.findTernary(expr);
    if (ternaryIdx !== -1) {
      const condition = expr.slice(0, ternaryIdx).trim();
      const rest = expr.slice(ternaryIdx + 1);
      const colonIdx = this.findColon(rest);
      if (colonIdx !== -1) {
        const trueExpr = rest.slice(0, colonIdx).trim();
        const falseExpr = rest.slice(colonIdx + 1).trim();
        return this.evaluateExpression(condition, vars)
          ? this.evaluateExpression(trueExpr, vars)
          : this.evaluateExpression(falseExpr, vars);
      }
    }
    
    // Logical OR
    const orParts = this.splitOnOperator(expr, '||');
    if (orParts.length > 1) {
      return orParts.some(p => this.evaluateExpression(p.trim(), vars));
    }
    
    // Logical AND
    const andParts = this.splitOnOperator(expr, '&&');
    if (andParts.length > 1) {
      return andParts.every(p => this.evaluateExpression(p.trim(), vars));
    }
    
    // Comparison operators
    for (const op of ['==', '!=', '<=', '>=', '<', '>']) {
      const compParts = this.splitOnOperator(expr, op);
      if (compParts.length === 2) {
        const left = this.evaluateExpression(compParts[0].trim(), vars);
        const right = this.evaluateExpression(compParts[1].trim(), vars);
        switch (op) {
          case '==': return left === right || left == right;
          case '!=': return left !== right;
          case '<': return left < right;
          case '>': return left > right;
          case '<=': return left <= right;
          case '>=': return left >= right;
        }
      }
    }
    
    // Addition and subtraction (only if no string concat was detected)
    for (const op of ['-']) {
      const parts = this.splitOnOperator(expr, op);
      if (parts.length >= 2 && parts[0].trim() !== '') {
        let result = Number(this.evaluateExpression(parts[0].trim(), vars));
        for (let pi = 1; pi < parts.length; pi++) {
          result = result - Number(this.evaluateExpression(parts[pi].trim(), vars));
        }
        return result;
      }
    }
    
    // Handle + for numbers (if we got here, no string was involved)
    if (concatParts.length > 1) {
      const values = concatParts.map(p => this.evaluateExpression(p.trim(), vars));
      if (values.every(v => typeof v === 'number')) {
        return values.reduce((a, b) => a + b, 0);
      }
      // Mixed types with + means string concat
      return values.map(v => v === null ? 'null' : String(v)).join('');
    }
    
    // Multiplication, division, modulo
    for (const op of ['*', '/', '%']) {
      const parts = this.splitOnOperator(expr, op);
      if (parts.length === 2) {
        const left = this.evaluateExpression(parts[0].trim(), vars);
        const right = this.evaluateExpression(parts[1].trim(), vars);
        if (op === '*') return Number(left) * Number(right);
        if (op === '/') {
          if (Number(right) === 0) throw new Error('ArithmeticException: / by zero');
          // Check if both are ints
          if (Number.isInteger(left) && Number.isInteger(right)) return Math.floor(left / right);
          return Number(left) / Number(right);
        }
        if (op === '%') return Number(left) % Number(right);
      }
    }
    
    // Unary negation
    if (expr.startsWith('-') && !expr.startsWith('--')) {
      return -this.evaluateExpression(expr.slice(1), vars);
    }
    
    // Logical NOT
    if (expr.startsWith('!')) {
      return !this.evaluateExpression(expr.slice(1), vars);
    }
    
    // new int[] {...}
    const newArrayMatch = expr.match(/^new\s+(\w+)\s*\[\]\s*\{(.+)\}$/);
    if (newArrayMatch) {
      const elements = this.splitOnOperator(newArrayMatch[2], ',');
      return elements.map(e => this.evaluateExpression(e.trim(), vars));
    }
    
    // new int[size]
    const newArraySizeMatch = expr.match(/^new\s+(\w+)\s*\[(.+)\]$/);
    if (newArraySizeMatch) {
      const size = this.evaluateExpression(newArraySizeMatch[2], vars);
      return new Array(size).fill(0);
    }
    
    // Array literal {1, 2, 3}
    if (expr.startsWith('{') && expr.endsWith('}')) {
      const elements = this.splitOnOperator(expr.slice(1, -1), ',');
      return elements.map(e => this.evaluateExpression(e.trim(), vars));
    }
    
    // Array access: name[index]
    const arrayAccessMatch = expr.match(/^(\w+)\[(.+)\]$/);
    if (arrayAccessMatch) {
      const arrName = arrayAccessMatch[1];
      const idx = this.evaluateExpression(arrayAccessMatch[2], vars);
      const arr = this.getVar(arrName, vars);
      if (!Array.isArray(arr)) throw new Error(`${arrName} is not an array`);
      if (idx < 0 || idx >= arr.length) throw new Error(`ArrayIndexOutOfBoundsException: Index ${idx} out of bounds for length ${arr.length}`);
      return arr[idx];
    }
    
    // Property access: name.length, name.length()
    const propMatch = expr.match(/^(\w+(?:\[.+?\])?)\.(\w+)(\(\))?$/);
    if (propMatch && !propMatch[3]) {
      // Only handle true property access (no parentheses) - method calls with () fall through to methodCallMatch
      const obj = this.evaluateExpression(propMatch[1], vars);
      const prop = propMatch[2];
      if (prop === 'length') {
        if (Array.isArray(obj)) return obj.length;
        if (typeof obj === 'string') return obj.length;
      }
      return undefined;
    }
    
    // Method calls: name.charAt(expr), Math.abs(expr), etc.
    const methodCallMatch = expr.match(/^(\w+(?:\.\w+)*)\.(\w+)\((.*)?\)$/);
    if (methodCallMatch) {
      const obj = methodCallMatch[1];
      const method = methodCallMatch[2];
      const argsStr = methodCallMatch[3] || '';
      const args = argsStr ? this.splitOnOperator(argsStr, ',').map(a => this.evaluateExpression(a.trim(), vars)) : [];
      
      // Scanner methods
      const scannerVal = this.getVar(obj, vars);
      if (scannerVal === '__scanner__') {
        if (this.inputIndex >= this.inputQueue.length) {
          const err = new Error('__INPUT_REQUIRED__');
          err.type = 'input_required';
          err.inputType = method;
          err.line = this.currentLine;
          throw err;
        }
        const rawInput = this.inputQueue[this.inputIndex++];
        // Append the user's input to the current output line (the prompt)
        if (this.output.length > 0) {
          this.output[this.output.length - 1] += rawInput;
        } else {
          this.output.push(rawInput);
        }
        // Start a new line (simulates user pressing Enter)
        this.output.push('');
        if (method === 'nextInt') return parseInt(rawInput, 10);
        if (method === 'nextDouble' || method === 'nextFloat') return parseFloat(rawInput);
        if (method === 'nextLine') return rawInput;
        if (method === 'next') return rawInput.split(/\s+/)[0] || rawInput;
        if (method === 'nextBoolean') return rawInput.toLowerCase() === 'true';
        return rawInput;
      }
      
      if (obj === 'Math') {
        if (method === 'abs') return Math.abs(args[0]);
        if (method === 'max') return Math.max(args[0], args[1]);
        if (method === 'min') return Math.min(args[0], args[1]);
        if (method === 'sqrt') return Math.sqrt(args[0]);
        if (method === 'pow') return Math.pow(args[0], args[1]);
        if (method === 'random') return Math.random();
        if (method === 'floor') return Math.floor(args[0]);
        if (method === 'ceil') return Math.ceil(args[0]);
        if (method === 'round') return Math.round(args[0]);
      }
      
      // String methods
      const strVal = this.getVar(obj, vars);
      if (typeof strVal === 'string') {
        if (method === 'length') return strVal.length;
        if (method === 'charAt') return strVal.charAt(args[0]);
        if (method === 'substring') return args.length === 1 ? strVal.substring(args[0]) : strVal.substring(args[0], args[1]);
        if (method === 'indexOf') return strVal.indexOf(args[0]);
        if (method === 'equals') return strVal === args[0];
        if (method === 'toUpperCase') return strVal.toUpperCase();
        if (method === 'toLowerCase') return strVal.toLowerCase();
        if (method === 'trim') return strVal.trim();
        if (method === 'contains') return strVal.includes(args[0]);
        if (method === 'replace') return strVal.replace(args[0], args[1]);
        if (method === 'startsWith') return strVal.startsWith(args[0]);
        if (method === 'endsWith') return strVal.endsWith(args[0]);
        if (method === 'isEmpty') return strVal.length === 0;
        if (method === 'toCharArray') return [...strVal];
      }
      
      // Array methods
      const arrVal = this.getVar(obj, vars);
      if (Array.isArray(arrVal)) {
        if (method === 'length') return arrVal.length;
      }
      
      // User-defined method call
      if (this.methods[method]) {
        return this.callMethod(method, args, vars);
      }
      
      return undefined;
    }
    
    // Simple function call: methodName(args)
    const funcCallMatch = expr.match(/^(\w+)\((.*)?\)$/);
    if (funcCallMatch) {
      const funcName = funcCallMatch[1];
      const argsStr = funcCallMatch[2] || '';
      const args = argsStr ? this.splitOnOperator(argsStr, ',').map(a => this.evaluateExpression(a.trim(), vars)) : [];
      
      if (this.methods[funcName]) {
        return this.callMethod(funcName, args, vars);
      }
      
      // Integer.parseInt etc
      if (funcName === 'Integer' || funcName === 'Double') {
        return undefined;
      }
    }
    
    // Variable reference
    const varVal = this.getVar(expr, vars);
    if (varVal !== undefined) return varVal;
    
    // If nothing matched, return the expr as string (fallback)
    return undefined;
  }

  callMethod(name, args, callerVars) {
    const method = this.methods[name];
    if (!method) throw new Error(`Method ${name} not found`);
    
    const methodVars = {};
    method.params.forEach((p, i) => {
      methodVars[p.name] = { type: p.type, value: args[i] !== undefined ? args[i] : 0 };
    });
    
    this.callStack.push({ name, line: this.currentLine, vars: { ...callerVars } });
    
    const methodStmts = this.parseMethodBody(method.bodyLines, method.startLine);
    
    let result = undefined;
    try {
      result = this.executeBlock(methodStmts, methodVars, true);
    } catch (e) {
      if (e.type === 'return') {
        result = e.value;
      } else {
        throw e;
      }
    }
    
    this.callStack.pop();
    return result;
  }

  getVar(name, vars) {
    if (vars[name] !== undefined) {
      return typeof vars[name] === 'object' && vars[name] !== null && 'value' in vars[name]
        ? vars[name].value
        : vars[name];
    }
    return undefined;
  }

  setVar(name, value, vars, type) {
    if (vars[name] !== undefined && typeof vars[name] === 'object' && vars[name] !== null && 'value' in vars[name]) {
      const prevVal = vars[name].value;
      vars[name].value = value;
      vars[name].changed = true;
      vars[name].prevValue = prevVal;
    } else {
      vars[name] = { type: type || 'var', value, changed: true };
    }
  }

  splitOnOperator(expr, op) {
    const parts = [];
    let depth = 0;
    let inString = false;
    let stringChar = '';
    let current = '';
    
    for (let i = 0; i < expr.length; i++) {
      const ch = expr[i];
      
      if (inString) {
        current += ch;
        if (ch === '\\') { current += expr[++i] || ''; continue; }
        if (ch === stringChar) inString = false;
        continue;
      }
      
      if (ch === '"' || ch === "'") {
        inString = true;
        stringChar = ch;
        current += ch;
        continue;
      }
      
      if (ch === '(' || ch === '[' || ch === '{') { depth++; current += ch; continue; }
      if (ch === ')' || ch === ']' || ch === '}') { depth--; current += ch; continue; }
      
      if (depth === 0 && expr.substring(i, i + op.length) === op) {
        // For < and >, don't match <= or >=
        if ((op === '<' || op === '>') && expr[i + 1] === '=') {
          current += ch;
          continue;
        }
        // For = don't match ==
        if (op === '=' && expr[i + 1] === '=') {
          current += ch;
          continue;
        }
        // For ! don't match !=
        if (op === '!' && expr[i + 1] === '=') {
          current += ch;
          continue;
        }
        // For + don't match +=, for - don't match -=
        if ((op === '+' || op === '-') && expr[i + 1] === '=') {
          current += ch;
          continue;
        }
        // For + don't match ++, for - don't match --
        if ((op === '+' && expr[i + 1] === '+') || (op === '-' && expr[i + 1] === '-')) {
          current += ch;
          continue;
        }
        parts.push(current);
        current = '';
        i += op.length - 1;
        continue;
      }
      
      current += ch;
    }
    
    parts.push(current);
    return parts;
  }

  findMatchingParen(expr, start) {
    let depth = 0;
    for (let i = start; i < expr.length; i++) {
      if (expr[i] === '(') depth++;
      if (expr[i] === ')') { depth--; if (depth === 0) return i; }
    }
    return -1;
  }

  findTernary(expr) {
    let depth = 0;
    let inString = false;
    for (let i = 0; i < expr.length; i++) {
      if (expr[i] === '"' || expr[i] === "'") { inString = !inString; continue; }
      if (inString) continue;
      if (expr[i] === '(' || expr[i] === '[') depth++;
      if (expr[i] === ')' || expr[i] === ']') depth--;
      if (depth === 0 && expr[i] === '?') return i;
    }
    return -1;
  }

  findColon(expr) {
    let depth = 0;
    let inString = false;
    for (let i = 0; i < expr.length; i++) {
      if (expr[i] === '"' || expr[i] === "'") { inString = !inString; continue; }
      if (inString) continue;
      if (expr[i] === '(' || expr[i] === '[') depth++;
      if (expr[i] === ')' || expr[i] === ']') depth--;
      if (depth === 0 && expr[i] === ':') return i;
    }
    return -1;
  }

  executeStatement(stmt, vars) {
    const code = stmt.code;
    
    // Skip import statements
    if (code.match(/^import\s+/)) return;
    
    // Scanner declaration: Scanner scanner = new Scanner(System.in) — treat as no-op
    if (code.match(/^Scanner\s+\w+\s*=\s*new\s+Scanner\s*\(\s*System\.in\s*\)/)) {
      const nameMatch = code.match(/^Scanner\s+(\w+)/);
      if (nameMatch) this.setVar(nameMatch[1], '__scanner__', vars, 'Scanner');
      return;
    }
    
    // scanner.close() — no-op
    if (code.match(/^\w+\.close\(\)$/)) return;
    
    // Variable declaration with initialization
    // int x = 5; or int[] arr = {1,2,3}; or String s = "hello";
    const declMatch = code.match(/^(int|double|boolean|char|String|float|long|short|byte)(\[\])?\s+(\w+)\s*=\s*(.+)$/);
    if (declMatch) {
      const type = declMatch[1] + (declMatch[2] || '');
      const name = declMatch[3];
      const valueExpr = declMatch[4];
      const value = this.evaluateExpression(valueExpr, vars);
      this.setVar(name, value, vars, type);
      return;
    }
    
    // Variable declaration without initialization
    const declOnlyMatch = code.match(/^(int|double|boolean|char|String|float|long|short|byte)(\[\])?\s+(\w+)\s*$/);
    if (declOnlyMatch) {
      const type = declOnlyMatch[1] + (declOnlyMatch[2] || '');
      const name = declOnlyMatch[3];
      const defaults = { 'int': 0, 'double': 0.0, 'boolean': false, 'char': '\0', 'String': null, 'float': 0.0, 'long': 0, 'short': 0, 'byte': 0 };
      this.setVar(name, defaults[declOnlyMatch[1]] ?? 0, vars, type);
      return;
    }
    
    // Array access assignment: arr[i] = value
    const arrAssignMatch = code.match(/^(\w+)\[(.+)\]\s*=\s*(.+)$/);
    if (arrAssignMatch) {
      const arrName = arrAssignMatch[1];
      const idx = this.evaluateExpression(arrAssignMatch[2], vars);
      const value = this.evaluateExpression(arrAssignMatch[3], vars);
      const arr = this.getVar(arrName, vars);
      if (!Array.isArray(arr)) throw new Error(`${arrName} is not an array`);
      if (idx < 0 || idx >= arr.length) throw new Error(`ArrayIndexOutOfBoundsException: Index ${idx} out of bounds for length ${arr.length}`);
      const oldArr = [...arr];
      arr[idx] = value;
      if (vars[arrName] && typeof vars[arrName] === 'object' && 'value' in vars[arrName]) {
        vars[arrName].changed = true;
        vars[arrName].changedIndex = idx;
        vars[arrName].prevValue = oldArr;
      }
      return;
    }
    
    // Compound assignment: x += 5, x -= 3, etc.
    const compoundMatch = code.match(/^(\w+)\s*(\+=|-=|\*=|\/=|%=)\s*(.+)$/);
    if (compoundMatch) {
      const name = compoundMatch[1];
      const op = compoundMatch[2];
      const right = this.evaluateExpression(compoundMatch[3], vars);
      const current = this.getVar(name, vars);
      let newVal;
      switch (op) {
        case '+=': newVal = typeof current === 'string' ? current + String(right) : current + right; break;
        case '-=': newVal = current - right; break;
        case '*=': newVal = current * right; break;
        case '/=': newVal = current / right; break;
        case '%=': newVal = current % right; break;
      }
      this.setVar(name, newVal, vars);
      return;
    }
    
    // Increment/decrement: i++ or i--
    const incDecMatch = code.match(/^(\w+)(\+\+|--)$/);
    if (incDecMatch) {
      const name = incDecMatch[1];
      const current = this.getVar(name, vars);
      this.setVar(name, incDecMatch[2] === '++' ? current + 1 : current - 1, vars);
      return;
    }
    
    // Pre increment/decrement
    const preIncDecMatch = code.match(/^(\+\+|--)(\w+)$/);
    if (preIncDecMatch) {
      const name = preIncDecMatch[2];
      const current = this.getVar(name, vars);
      this.setVar(name, preIncDecMatch[1] === '++' ? current + 1 : current - 1, vars);
      return;
    }
    
    // Simple assignment: x = value
    const assignMatch = code.match(/^(\w+)\s*=\s*(.+)$/);
    if (assignMatch) {
      const name = assignMatch[1];
      const value = this.evaluateExpression(assignMatch[2], vars);
      this.setVar(name, value, vars);
      return;
    }
    
    // System.out.println / System.out.print
    const printlnMatch = code.match(/^System\.out\.println\((.*)?\)$/);
    if (printlnMatch) {
      const arg = printlnMatch[1];
      const value = arg ? this.evaluateExpression(arg, vars) : '';
      this.output.push(String(value));
      return;
    }
    
    const printMatch = code.match(/^System\.out\.print\((.*)?\)$/);
    if (printMatch) {
      const arg = printMatch[1];
      const value = arg ? this.evaluateExpression(arg, vars) : '';
      if (this.output.length > 0) {
        this.output[this.output.length - 1] += String(value);
      } else {
        this.output.push(String(value));
      }
      return;
    }
    
    // Method call as statement
    const methodStmtMatch = code.match(/^(\w+)\((.*)?\)$/);
    if (methodStmtMatch) {
      const funcName = methodStmtMatch[1];
      const argsStr = methodStmtMatch[2] || '';
      const args = argsStr ? this.splitOnOperator(argsStr, ',').map(a => this.evaluateExpression(a.trim(), vars)) : [];
      if (this.methods[funcName]) {
        this.callMethod(funcName, args, vars);
        return;
      }
    }
    
    // Object method call as statement: obj.method(args)
    const objMethodMatch = code.match(/^(\w+(?:\.\w+)*)\.(\w+)\((.*)?\)$/);
    if (objMethodMatch) {
      this.evaluateExpression(code, vars);
      return;
    }
  }

  executeBlock(stmts, vars, isMethod = false) {
    for (const stmt of stmts) {
      if (this.totalSteps >= this.maxIterations) {
        throw new Error('Execution limit reached (possible infinite loop)');
      }
      
      const result = this.executeNode(stmt, vars);
      if (result && result.type === 'return') {
        if (isMethod) {
          const err = new Error('return');
          err.type = 'return';
          err.value = result.value;
          throw err;
        }
        return result;
      }
    }
    return undefined;
  }

  executeNode(node, vars) {
    this.totalSteps++;
    
    if (this.totalSteps >= this.maxIterations) {
      throw new Error('Execution limit reached (possible infinite loop)');
    }
    
    switch (node.type) {
      case 'statement': {
        this.currentLine = node.line;
        this.executedLines.add(node.line);
        // Clear change flags
        Object.values(vars).forEach(v => {
          if (typeof v === 'object' && v !== null && 'changed' in v) {
            v.changed = false;
            delete v.changedIndex;
          }
        });
        
        this.executeStatement(node, vars);
        this.saveState(vars, node.line);
        break;
      }
      
      case 'for': {
        // Execute init
        this.currentLine = node.line;
        this.executedLines.add(node.line);
        Object.values(vars).forEach(v => {
          if (typeof v === 'object' && v !== null && 'changed' in v) { v.changed = false; delete v.changedIndex; }
        });
        this.executeStatement({ code: node.init }, vars);
        this.saveState(vars, node.line, { loopType: 'for', iteration: 0 });
        
        let iteration = 0;
        while (this.evaluateExpression(node.condition, vars)) {
          iteration++;
          if (iteration > this.maxIterations) throw new Error('Execution limit reached (possible infinite loop)');
          
          for (const bodyStmt of node.body) {
            const result = this.executeNode(bodyStmt, vars);
            if (result && result.type === 'return') return result;
          }
          
          // Execute update
          this.currentLine = node.line;
          this.executedLines.add(node.line);
          Object.values(vars).forEach(v => {
            if (typeof v === 'object' && v !== null && 'changed' in v) { v.changed = false; delete v.changedIndex; }
          });
          this.executeStatement({ code: node.update }, vars);
          this.saveState(vars, node.line, { loopType: 'for', iteration });
        }
        break;
      }
      
      case 'while': {
        let iteration = 0;
        while (this.evaluateExpression(node.condition, vars)) {
          iteration++;
          this.currentLine = node.line;
          this.executedLines.add(node.line);
          if (iteration > this.maxIterations) throw new Error('Execution limit reached (possible infinite loop)');
          this.saveState(vars, node.line, { loopType: 'while', iteration });
          
          for (const bodyStmt of node.body) {
            const result = this.executeNode(bodyStmt, vars);
            if (result && result.type === 'return') return result;
          }
        }
        // Record the failed condition check
        this.currentLine = node.line;
        this.executedLines.add(node.line);
        this.saveState(vars, node.line, { loopType: 'while', iteration, done: true });
        break;
      }
      
      case 'dowhile': {
        let iteration = 0;
        do {
          iteration++;
          this.currentLine = node.line;
          this.executedLines.add(node.line);
          if (iteration > this.maxIterations) throw new Error('Execution limit reached (possible infinite loop)');
          this.saveState(vars, node.line, { loopType: 'do-while', iteration });
          
          for (const bodyStmt of node.body) {
            const result = this.executeNode(bodyStmt, vars);
            if (result && result.type === 'return') return result;
          }
        } while (this.evaluateExpression(node.condition, vars));
        break;
      }
      
      case 'if': {
        for (const branch of node.branches) {
          this.currentLine = branch.line;
          this.executedLines.add(branch.line);
          
          if (branch.condition === null || this.evaluateExpression(branch.condition, vars)) {
            this.saveState(vars, branch.line, { branch: branch.condition ? 'true' : 'else' });
            
            for (const bodyStmt of branch.body) {
              const result = this.executeNode(bodyStmt, vars);
              if (result && result.type === 'return') return result;
            }
            break;
          } else {
            this.saveState(vars, branch.line, { branch: 'false' });
          }
        }
        break;
      }
      
      case 'return': {
        this.currentLine = node.line;
        this.executedLines.add(node.line);
        const value = node.expr ? this.evaluateExpression(node.expr, vars) : undefined;
        this.saveState(vars, node.line);
        return { type: 'return', value };
      }
    }
    
    return undefined;
  }

  saveState(vars, line, meta = {}) {
    const varSnapshot = {};
    for (const [name, val] of Object.entries(vars)) {
      if (typeof val === 'object' && val !== null && 'value' in val) {
        varSnapshot[name] = {
          type: val.type,
          value: Array.isArray(val.value) ? [...val.value] : val.value,
          changed: val.changed || false,
          prevValue: val.prevValue,
          changedIndex: val.changedIndex
        };
      }
    }
    
    this.states.push({
      line,
      vars: varSnapshot,
      output: [...this.output],
      callStack: this.callStack.map(f => ({ ...f })),
      executedLines: new Set(this.executedLines),
      meta
    });
  }

  compile(code) {
    try {
      // Basic syntax checks
      const lines = code.split('\n');
      let braceCount = 0;
      let parenCount = 0;
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        for (const ch of line) {
          if (ch === '{') braceCount++;
          if (ch === '}') braceCount--;
          if (ch === '(') parenCount++;
          if (ch === ')') parenCount--;
        }
      }
      
      if (braceCount !== 0) {
        return { success: false, error: `Mismatched braces: ${braceCount > 0 ? 'missing closing }' : 'extra closing }'}`, line: null };
      }
      if (parenCount !== 0) {
        return { success: false, error: `Mismatched parentheses`, line: null };
      }
      
      // Try to parse
      this.parse(code);
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message, line: null };
    }
  }

  run(code, inputQueue = []) {
    this.reset();
    
    const compileResult = this.compile(code);
    if (!compileResult.success) {
      return { success: false, error: compileResult.error, states: [], output: [] };
    }
    
    this.reset();
    // Set input AFTER all resets (parse() inside compile also calls reset)
    this.inputQueue = inputQueue;
    this.inputIndex = 0;
    
    try {
      const stmts = this.parse(code);
      // Restore input after parse's reset
      this.inputQueue = inputQueue;
      this.inputIndex = 0;
      
      const vars = {};
      this.executeBlock(stmts, vars);
      
      return {
        success: true,
        states: this.states,
        output: this.output,
        finalVars: this.states.length > 0 ? this.states[this.states.length - 1].vars : {}
      };
    } catch (e) {
      if (e.type === 'input_required') {
        return {
          success: false,
          waiting: true,
          inputType: e.inputType,
          inputLine: e.line,
          states: this.states,
          output: this.output,
          error: null
        };
      }
      return {
        success: false,
        error: e.message,
        states: this.states,
        output: this.output,
        errorLine: this.currentLine
      };
    }
  }
}

// ============================================================
// EXAMPLE PROGRAMS
// ============================================================

const EXAMPLES = {
  'Array Sum & Average': `public class ArraySumAverage {
    public static void main(String[] args) {
        // Variable declarations
        int sum = 0;
        int[] numbers = {3, 7, 2, 8, 1};

        // Loop through array
        for (int i = 0; i < numbers.length; i++) {
            sum += numbers[i];
            System.out.println("Added " + numbers[i] + ", sum = " + sum);
        }

        // Calculate average
        double average = (double) sum / numbers.length;
        System.out.println("Average: " + average);

        // Conditional check
        if (average > 4.0) {
            System.out.println("Above threshold!");
        } else {
            System.out.println("Below threshold.");
        }
    }
}`,
  'Bubble Sort': `public class BubbleSort {
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        int n = arr.length;
        System.out.println("Unsorted array:");

        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }

        System.out.println("Sorted!");
        for (int i = 0; i < n; i++) {
            System.out.println("arr[" + i + "] = " + arr[i]);
        }
    }
}`,
  'Fibonacci (Recursive)': `public class Fibonacci {
    public static int fibonacci(int n) {
        if (n <= 1) {
            return n;
        }
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    public static void main(String[] args) {
        int count = 3;
        System.out.println("Fibonacci sequence:");
        for (int i = 0; i < count; i++) {
            int result = fibonacci(i);
            System.out.println("fibonacci(" + i + ") = " + result);
        }
    }
}`,
  'Factorial (Recursive)': `public class Factorial {
    public static int factorial(int n) {
        if (n <= 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }

    public static void main(String[] args) {
        for (int i = 1; i <= 7; i++) {
            int result = factorial(i);
            System.out.println(i + "! = " + result);
        }
    }
}`,
  'Binary Search': `public class BinarySearch {
    public static void main(String[] args) {
        int[] arr = {2, 5, 8, 12, 16, 23, 38, 45, 67, 91};
        int target = 23;
        int low = 0;
        int high = arr.length - 1;
        int result = -1;

        System.out.println("Searching for " + target);

        while (low <= high) {
            int mid = (low + high) / 2;
            System.out.println("Checking index " + mid + " = " + arr[mid]);

            if (arr[mid] == target) {
                result = mid;
                System.out.println("Found at index " + mid + "!");
                low = high + 1;
            } else if (arr[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        if (result == -1) {
            System.out.println("Not found.");
        }
    }
}`,
  'String Reversal': `public class StringReversal {
    public static void main(String[] args) {
        String original = "Hello, World!";
        String reversed = "";
        int len = original.length();

        System.out.println("Original: " + original);

        for (int i = len - 1; i >= 0; i--) {
            char c = original.charAt(i);
            reversed = reversed + c;
            System.out.println("Step: " + reversed);
        }

        System.out.println("Reversed: " + reversed);
    }
}`,
  'FizzBuzz': `public class FizzBuzz {
    public static void main(String[] args) {
        for (int i = 1; i <= 20; i++) {
            if (i % 3 == 0 && i % 5 == 0) {
                System.out.println(i + ": FizzBuzz");
            } else if (i % 3 == 0) {
                System.out.println(i + ": Fizz");
            } else if (i % 5 == 0) {
                System.out.println(i + ": Buzz");
            } else {
                System.out.println(i + ": " + i);
            }
        }
    }
}`,
  'Selection Sort': `public class SelectionSort {
    public static void main(String[] args) {
        int[] arr = {29, 10, 14, 37, 13};
        int n = arr.length;

        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIdx]) {
                    minIdx = j;
                }
            }
            // Swap
            int temp = arr[minIdx];
            arr[minIdx] = arr[i];
            arr[i] = temp;
            System.out.println("After pass " + i + ": placed " + arr[i]);
        }

        System.out.println("Sorted!");
        for (int i = 0; i < n; i++) {
            System.out.print(arr[i] + " ");
        }
        System.out.println("");
    }
}`,
  'Grade Calculator (Scanner)': `import java.util.Scanner;

public class GradeCalculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter student name: ");
        String name = scanner.nextLine();

        System.out.print("Enter number of subjects: ");
        int subjects = scanner.nextInt();

        int total = 0;
        for (int i = 1; i <= subjects; i++) {
            System.out.print("Enter marks for subject " + i + ": ");
            int marks = scanner.nextInt();
            total += marks;
        }

        System.out.println("--- Report Card ---");
        System.out.println("Student: " + name);
        System.out.println("Total: " + total);
        System.out.println("Average: " + (double) total / subjects);

        double average = (double) total / subjects;
        if (average >= 90) {
            System.out.println("Grade: A+");
        } else if (average >= 80) {
            System.out.println("Grade: A");
        } else if (average >= 70) {
            System.out.println("Grade: B");
        } else if (average >= 60) {
            System.out.println("Grade: C");
        } else if (average >= 50) {
            System.out.println("Grade: D");
        } else {
            System.out.println("Grade: F");
        }

        scanner.close();
    }
}`
};

// ============================================================
// THEME DEFINITIONS
// ============================================================

const THEMES = {
  dark: {
    // Backgrounds
    bg: '#0d1117',
    bgDeep: '#010409',
    bgCard: '#161b22',
    bgHover: '#1f2937',
    // Borders
    border: '#21262d',
    borderHover: '#484f58',
    borderActive: '#30363d',
    // Text
    text: '#c9d1d9',
    textBright: '#f0f6fc',
    textMuted: '#8b949e',
    textDim: '#484f58',
    // Accent
    accent: '#58a6ff',
    accentBg: '#1f6feb',
    accentHover: '#388bfd',
    accentGradient: 'linear-gradient(135deg, #1f6feb 0%, #8b5cf6 100%)',
    progressGradient: 'linear-gradient(90deg, #1f6feb, #8b5cf6)',
    // Semantic
    green: '#3fb950',
    red: '#f85149',
    orange: '#f0883e',
    purple: '#d2a8ff',
    caret: '#58a6ff',
    // Syntax highlighting
    tokKeyword: '#ff7b72',
    tokType: '#79c0ff',
    tokBuiltin: '#d2a8ff',
    tokString: '#a5d6ff',
    tokNumber: '#79c0ff',
    tokComment: '#8b949e',
    // Opacity overlays
    currentLineBg: 'rgba(56,139,253,0.12)',
    errorLineBg: 'rgba(248,81,73,0.1)',
    greenGlow: 'rgba(63,185,80,0.15)',
    greenFlash: 'rgba(63,185,80,0.25)',
    orangeOverlay: 'rgba(240,136,62,0.15)',
    orangeBorder: 'rgba(240,136,62,0.3)',
    errorOverlayBg: 'rgba(248,81,73,0.08)',
    errorOverlayBorder: 'rgba(248,81,73,0.2)',
    successOverlayBg: 'rgba(63,185,80,0.08)',
    successOverlayBorder: 'rgba(63,185,80,0.2)',
    consoleBg: '#010409',
    dropShadow: '0 8px 24px rgba(0,0,0,0.4)',
    // Toggle
    toggleBg: '#161b22',
    toggleBorder: '#30363d',
    toggleIcon: '#f0c75e',
  },
  light: {
    // Backgrounds
    bg: '#ffffff',
    bgDeep: '#f6f8fa',
    bgCard: '#f0f3f6',
    bgHover: '#e8ecf0',
    // Borders
    border: '#d0d7de',
    borderHover: '#afb8c1',
    borderActive: '#d0d7de',
    // Text
    text: '#24292f',
    textBright: '#1b1f24',
    textMuted: '#57606a',
    textDim: '#8b949e',
    // Accent
    accent: '#0969da',
    accentBg: '#0969da',
    accentHover: '#0550ae',
    accentGradient: 'linear-gradient(135deg, #0969da 0%, #8250df 100%)',
    progressGradient: 'linear-gradient(90deg, #0969da, #8250df)',
    // Semantic
    green: '#1a7f37',
    red: '#cf222e',
    orange: '#bc4c00',
    purple: '#8250df',
    caret: '#0969da',
    // Syntax highlighting
    tokKeyword: '#cf222e',
    tokType: '#0550ae',
    tokBuiltin: '#8250df',
    tokString: '#0a3069',
    tokNumber: '#0550ae',
    tokComment: '#6e7781',
    // Opacity overlays
    currentLineBg: 'rgba(9,105,218,0.08)',
    errorLineBg: 'rgba(207,34,46,0.06)',
    greenGlow: 'rgba(26,127,55,0.12)',
    greenFlash: 'rgba(26,127,55,0.2)',
    orangeOverlay: 'rgba(188,76,0,0.08)',
    orangeBorder: 'rgba(188,76,0,0.25)',
    errorOverlayBg: 'rgba(207,34,46,0.06)',
    errorOverlayBorder: 'rgba(207,34,46,0.15)',
    successOverlayBg: 'rgba(26,127,55,0.06)',
    successOverlayBorder: 'rgba(26,127,55,0.15)',
    consoleBg: '#f6f8fa',
    dropShadow: '0 8px 24px rgba(0,0,0,0.12)',
    // Toggle
    toggleBg: '#f0f3f6',
    toggleBorder: '#d0d7de',
    toggleIcon: '#0969da',
  }
};

// ============================================================
// SYNTAX HIGHLIGHTER
// ============================================================

function highlightJava(code) {
  const keywords = /\b(public|private|protected|static|void|class|interface|extends|implements|new|return|if|else|for|while|do|switch|case|break|continue|default|try|catch|finally|throw|throws|import|package|this|super|final|abstract|native|synchronized|volatile|transient|strictfp|assert|enum|instanceof)\b/g;
  const types = /\b(int|double|boolean|char|String|float|long|short|byte|Integer|Double|Boolean|Character|Object|void)\b/g;
  const builtins = /\b(System|Math|out|println|print|length|charAt|null|true|false)\b/g;
  const numbers = /\b(\d+\.?\d*)\b/g;
  const strings = /("(?:[^"\\]|\\.)*")/g;
  const chars = /('(?:[^'\\]|\\.)*')/g;
  const comments = /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm;
  
  // Process in correct order to avoid double-highlighting
  let result = code;
  const tokens = [];
  let id = 0;
  
  // Replace strings first
  result = result.replace(strings, (m) => {
    const key = `__STR${id++}__`;
    tokens.push({ key, html: `<span class="tok-string">${escapeHtml(m)}</span>` });
    return key;
  });
  
  result = result.replace(chars, (m) => {
    const key = `__CHR${id++}__`;
    tokens.push({ key, html: `<span class="tok-string">${escapeHtml(m)}</span>` });
    return key;
  });
  
  result = result.replace(comments, (m) => {
    const key = `__CMT${id++}__`;
    tokens.push({ key, html: `<span class="tok-comment">${escapeHtml(m)}</span>` });
    return key;
  });
  
  result = escapeHtml(result);
  
  result = result.replace(keywords, '<span class="tok-keyword">$1</span>');
  result = result.replace(types, '<span class="tok-type">$1</span>');
  result = result.replace(builtins, '<span class="tok-builtin">$1</span>');
  result = result.replace(numbers, '<span class="tok-number">$1</span>');
  
  // Restore tokens
  for (const t of tokens) {
    result = result.replace(t.key, t.html);
  }
  
  return result;
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function JavaCodeVisualizer() {
  const [code, setCode] = useState(EXAMPLES['Array Sum & Average']);
  const codeHistoryRef = useRef([EXAMPLES['Array Sum & Average']]);
  const historyIndexRef = useRef(0);
  const isUndoRedoRef = useRef(false);

  // Wrapper to track code changes for undo/redo
  const updateCode = useCallback((newCode) => {
    if (isUndoRedoRef.current) {
      isUndoRedoRef.current = false;
      setCode(newCode);
      return;
    }
    // Trim future history if we're not at the end
    const history = codeHistoryRef.current;
    const idx = historyIndexRef.current;
    codeHistoryRef.current = history.slice(0, idx + 1);
    codeHistoryRef.current.push(newCode);
    // Cap history at 100 entries
    if (codeHistoryRef.current.length > 100) {
      codeHistoryRef.current = codeHistoryRef.current.slice(-100);
    }
    historyIndexRef.current = codeHistoryRef.current.length - 1;
    setCode(newCode);
  }, []);

  const handleUndo = useCallback(() => {
    if (historyIndexRef.current > 0) {
      historyIndexRef.current--;
      isUndoRedoRef.current = true;
      setCode(codeHistoryRef.current[historyIndexRef.current]);
    }
  }, []);

  const handleRedo = useCallback(() => {
    if (historyIndexRef.current < codeHistoryRef.current.length - 1) {
      historyIndexRef.current++;
      isUndoRedoRef.current = true;
      setCode(codeHistoryRef.current[historyIndexRef.current]);
    }
  }, []);
  const [states, setStates] = useState([]);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const [activeTab, setActiveTab] = useState('variables');
  const [compileLog, setCompileLog] = useState([]);
  const [errorLine, setErrorLine] = useState(null);
  const [breakpoints, setBreakpoints] = useState(new Set());
  const [showExamples, setShowExamples] = useState(false);
  const [compiledSuccess, setCompiledSuccess] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const [localFiles, setLocalFiles] = useState({});
  const [activeFileName, setActiveFileName] = useState(null);
  const [userInputs, setUserInputs] = useState([]);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const [inputPromptType, setInputPromptType] = useState('');
  const [currentInput, setCurrentInput] = useState('');
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const inputRef = useRef(null);
  const appRef = useRef(null);
  
  const t = isDark ? THEMES.dark : THEMES.light;

  const handleReset = useCallback(() => {
    setStates([]);
    setCurrentStep(-1);
    setIsRunning(false);
    setIsAutoPlaying(false);
    setCompileLog([]);
    setCompiledSuccess(null);
    setErrorLine(null);
    setUserInputs([]);
    setWaitingForInput(false);
    setInputPromptType('');
    setCurrentInput('');
  }, []);

  // Load individual .java files
  const handleLoadFiles = useCallback(async () => {
    setShowExamples(false);
    try {
      if (window.showOpenFilePicker) {
        const handles = await window.showOpenFilePicker({
          multiple: true,
          types: [{
            description: 'Java Files',
            accept: { 'text/java': ['.java'] }
          }]
        });
        const files = { ...localFiles };
        for (const handle of handles) {
          const file = await handle.getFile();
          if (file.name.endsWith('.java')) {
            files[file.name] = await file.text();
          }
        }
        setLocalFiles(files);
        const lastName = handles[handles.length - 1] ? (await handles[handles.length - 1].getFile()).name : Object.keys(files)[0];
        setActiveFileName(lastName);
        setCode(files[lastName]);
        handleReset();
        setCompileLog([{ type: 'success', message: `Loaded ${Object.keys(files).length} Java file(s).` }]);
      } else {
        const input = document.createElement('input');
        input.type = 'file';
        input.multiple = true;
        input.accept = '.java';
        input.onchange = async (e) => {
          const files = { ...localFiles };
          for (const file of e.target.files) {
            if (file.name.endsWith('.java')) {
              files[file.name] = await file.text();
            }
          }
          setLocalFiles(files);
          const lastName = e.target.files[e.target.files.length - 1]?.name || Object.keys(files)[0];
          setActiveFileName(lastName);
          setCode(files[lastName]);
          handleReset();
          setCompileLog([{ type: 'success', message: `Loaded ${Object.keys(files).length} Java file(s).` }]);
        };
        input.click();
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setCompileLog([{ type: 'error', message: `Failed to load files: ${err.message}` }]);
        setActiveTab('compilelog');
      }
    }
  }, [handleReset, localFiles]);

  const loadLocalFile = useCallback((name) => {
    setCode(localFiles[name]);
    codeHistoryRef.current = [localFiles[name]];
    historyIndexRef.current = 0;
    setActiveFileName(name);
    handleReset();
    setShowExamples(false);
  }, [localFiles, handleReset]);
  
  const editorRef = useRef(null);
  const textareaRef = useRef(null);
  const overlayScrollRef = useRef(null);
  const autoPlayRef = useRef(null);
  const interpreterRef = useRef(new JavaInterpreter());
  const exampleMenuRef = useRef(null);

  // Close example dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (exampleMenuRef.current && !exampleMenuRef.current.contains(e.target)) {
        setShowExamples(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Auto-play logic
  useEffect(() => {
    if (isAutoPlaying && currentStep < states.length - 1) {
      autoPlayRef.current = setTimeout(() => {
        const nextStep = currentStep + 1;
        // Check breakpoints
        if (breakpoints.has(states[nextStep]?.line) && nextStep !== currentStep + 1) {
          setIsAutoPlaying(false);
          return;
        }
        setCurrentStep(nextStep);
      }, speed);
    } else if (isAutoPlaying && currentStep >= states.length - 1) {
      setIsAutoPlaying(false);
    }
    
    return () => {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    };
  }, [isAutoPlaying, currentStep, states, speed, breakpoints]);

  // Shared run function that handles input waiting
  const runProgram = useCallback((inputs = []) => {
    const interpreter = interpreterRef.current;
    const result = interpreter.run(code, inputs);
    
    if (result.waiting) {
      // Program needs input — show what we have so far and prompt
      setStates(result.states || []);
      setCurrentStep(result.states?.length ? result.states.length - 1 : -1);
      setIsRunning(result.states?.length > 0);
      setWaitingForInput(true);
      setInputPromptType(result.inputType);
      setCompileLog([{ type: 'success', message: 'Program waiting for user input...' }]);
      setCompiledSuccess(true);
      setErrorLine(null);
      setActiveTab('output');
      setTimeout(() => inputRef.current?.focus(), 100);
      return result;
    }
    
    setWaitingForInput(false);
    setInputPromptType('');
    
    if (result.success) {
      setStates(result.states);
      setCurrentStep(result.states.length - 1);
      setIsRunning(true);
      setCompileLog([{ type: 'success', message: 'Compilation successful. Program executed.' }]);
      setCompiledSuccess(true);
      setErrorLine(null);
    } else {
      setStates(result.states || []);
      setCurrentStep(result.states?.length ? result.states.length - 1 : -1);
      setIsRunning(result.states?.length > 0);
      setCompileLog([{ type: 'error', message: result.error, line: result.errorLine }]);
      setCompiledSuccess(false);
      setErrorLine(result.errorLine);
      setActiveTab('compilelog');
    }
    return result;
  }, [code]);

  const handleCompileRun = useCallback(() => {
    setUserInputs([]);
    runProgram([]);
  }, [runProgram]);

  const handleSubmitInput = useCallback(() => {
    if (currentInput.trim() === '' && inputPromptType !== 'nextLine') return;
    const newInputs = [...userInputs, currentInput];
    setUserInputs(newInputs);
    setCurrentInput('');
    setWaitingForInput(false);
    runProgram(newInputs);
  }, [currentInput, userInputs, inputPromptType, runProgram]);

  const handleStepForward = useCallback(() => {
    if (!isRunning) {
      const interpreter = interpreterRef.current;
      const result = interpreter.run(code, userInputs);
      if (result.waiting) {
        setStates(result.states || []);
        setCurrentStep(result.states?.length ? result.states.length - 1 : -1);
        setIsRunning(result.states?.length > 0);
        setWaitingForInput(true);
        setInputPromptType(result.inputType);
        setActiveTab('output');
        setTimeout(() => inputRef.current?.focus(), 100);
        return;
      }
      if (result.success) {
        setStates(result.states);
        setCurrentStep(0);
        setIsRunning(true);
        setCompileLog([{ type: 'success', message: 'Compilation successful.' }]);
        setCompiledSuccess(true);
        setErrorLine(null);
      } else {
        setStates(result.states || []);
        setCompileLog([{ type: 'error', message: result.error }]);
        setCompiledSuccess(false);
        setActiveTab('compilelog');
      }
      return;
    }
    
    if (currentStep < states.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [isRunning, currentStep, states, code, userInputs]);

  const handleStepBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const toggleAutoPlay = useCallback(() => {
    if (!isRunning) {
      const interpreter = interpreterRef.current;
      const result = interpreter.run(code, userInputs);
      if (result.waiting) {
        setStates(result.states || []);
        setCurrentStep(result.states?.length ? result.states.length - 1 : -1);
        setIsRunning(result.states?.length > 0);
        setWaitingForInput(true);
        setInputPromptType(result.inputType);
        setActiveTab('output');
        return;
      }
      if (result.success) {
        setStates(result.states);
        setCurrentStep(0);
        setIsRunning(true);
        setCompileLog([{ type: 'success', message: 'Compilation successful.' }]);
        setCompiledSuccess(true);
        setErrorLine(null);
        setIsAutoPlaying(true);
      }
      return;
    }
    setIsAutoPlaying(prev => !prev);
  }, [isRunning, code, userInputs]);

  const toggleBreakpoint = useCallback((lineNum) => {
    setBreakpoints(prev => {
      const next = new Set(prev);
      if (next.has(lineNum)) next.delete(lineNum);
      else next.add(lineNum);
      return next;
    });
  }, []);

  const loadExample = useCallback((name) => {
    setCode(EXAMPLES[name]);
    codeHistoryRef.current = [EXAMPLES[name]];
    historyIndexRef.current = 0;
    setActiveFileName(null);
    handleReset();
    setShowExamples(false);
  }, [handleReset]);

  const currentState = currentStep >= 0 && currentStep < states.length ? states[currentStep] : null;
  const currentLineNum = currentState?.line;
  const executedLines = currentState?.executedLines || new Set();
  const currentOutput = currentState?.output || [];
  const currentVars = currentState?.vars || {};
  const currentCallStack = currentState?.callStack || [];
  
  // Compute variable changes for diff display
  const prevState = currentStep > 0 && currentStep < states.length ? states[currentStep - 1] : null;
  const prevVars = prevState?.vars || {};
  
  const varChanges = useMemo(() => {
    const changes = [];
    for (const [name, info] of Object.entries(currentVars)) {
      const prev = prevVars[name];
      const isNew = !prev;
      const isChanged = info.changed;
      
      if (isNew) {
        changes.push({ name, type: 'new', value: info.value, varType: info.type });
      } else if (isChanged) {
        const prevVal = info.prevValue;
        const newVal = info.value;
        let delta = null;
        if (typeof prevVal === 'number' && typeof newVal === 'number') {
          delta = newVal - prevVal;
        }
        changes.push({ name, type: 'changed', prevValue: prevVal, newValue: newVal, delta, varType: info.type });
      }
    }
    return changes;
  }, [currentVars, prevVars]);

  const lines = code.split('\n');

  // Derive file name from class declaration
  const derivedFileName = useMemo(() => {
    const classMatch = code.match(/public\s+class\s+(\w+)/);
    return classMatch ? `${classMatch[1]}.java` : 'Main.java';
  }, [code]);

  const displayFileName = activeFileName || derivedFileName;

  // Download current code as .java file
  const handleDownload = useCallback(() => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = displayFileName || 'Main.java';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [code, displayFileName]);

  // Toggle fullscreen mode
  const handleToggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      appRef.current?.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  }, []);

  // Listen for fullscreen changes (e.g., user presses Escape)
  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  // Toggle line comment (// prefix)
  const handleToggleComment = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const allLines = code.split('\n');
    
    // Find which lines are selected
    let charCount = 0;
    let startLine = 0, endLine = 0;
    for (let i = 0; i < allLines.length; i++) {
      if (charCount + allLines[i].length >= start && startLine === 0 && charCount <= start) startLine = i;
      if (charCount + allLines[i].length >= end - 1 || i === allLines.length - 1) { endLine = i; break; }
      charCount += allLines[i].length + 1;
    }
    
    // Check if all selected lines are already commented
    const selectedLines = allLines.slice(startLine, endLine + 1);
    const allCommented = selectedLines.every(l => l.trimStart().startsWith('//'));
    
    // Toggle comments
    const newLines = [...allLines];
    for (let i = startLine; i <= endLine; i++) {
      if (allCommented) {
        // Remove comment
        newLines[i] = newLines[i].replace(/^(\s*)\/\/\s?/, '$1');
      } else {
        // Add comment
        newLines[i] = newLines[i].replace(/^(\s*)/, '$1// ');
      }
    }
    
    updateCode(newLines.join('\n'));
  }, [code, updateCode]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      const isMod = e.metaKey || e.ctrlKey;
      
      // Cmd/Ctrl + Enter → Compile & Run
      if (isMod && e.key === 'Enter') {
        e.preventDefault();
        handleCompileRun();
        return;
      }
      
      // Cmd/Ctrl + S → Download file
      if (isMod && e.key === 's') {
        e.preventDefault();
        handleDownload();
        return;
      }
      
      // Cmd/Ctrl + / → Toggle comment
      if (isMod && e.key === '/') {
        e.preventDefault();
        handleToggleComment();
        return;
      }
      
      // F11 → Toggle fullscreen
      if (e.key === 'F11') {
        e.preventDefault();
        handleToggleFullscreen();
        return;
      }
      
      // Cmd/Ctrl + Z → Undo
      if (isMod && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
        return;
      }
      
      // Cmd/Ctrl + Shift + Z → Redo
      if (isMod && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        handleRedo();
        return;
      }
    };
    
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleCompileRun, handleDownload, handleToggleComment, handleToggleFullscreen, handleUndo, handleRedo]);

  // Track cursor position in textarea
  const updateCursorPos = useCallback(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    const pos = ta.selectionStart;
    const textBefore = ta.value.substring(0, pos);
    const lineNum = textBefore.split('\n').length;
    const lastNewline = textBefore.lastIndexOf('\n');
    const colNum = pos - lastNewline;
    setCursorPos({ line: lineNum, col: colNum });
  }, []);

  // Handle keyboard in textarea
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + '    ' + code.substring(end);
      updateCode(newCode);
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  return (
    <div ref={appRef} style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: t.bg,
      color: t.text,
      fontFamily: "'Fira Code', 'JetBrains Mono', monospace",
      overflow: 'hidden',
      transition: 'background 0.4s, color 0.4s',
      textAlign: 'left'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .tok-keyword { color: ${t.tokKeyword}; font-weight: 600; }
        .tok-type { color: ${t.tokType}; }
        .tok-builtin { color: ${t.tokBuiltin}; }
        .tok-string { color: ${t.tokString}; }
        .tok-number { color: ${t.tokNumber}; }
        .tok-comment { color: ${t.tokComment}; font-style: italic; }
        
        .tab-btn {
          padding: 8px 16px;
          background: transparent;
          border: none;
          color: ${t.textMuted};
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .tab-btn:hover { color: ${t.text}; }
        .tab-btn.active { color: ${t.accent}; border-bottom-color: ${t.accent}; }
        
        .toolbar-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border: 1px solid ${t.borderActive};
          border-radius: 6px;
          background: ${t.bgCard};
          color: ${t.text};
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
        }
        .toolbar-btn:hover { background: ${t.bgHover}; border-color: ${t.borderHover}; }
        .toolbar-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .toolbar-btn.primary {
          background: ${t.accentBg};
          border-color: ${t.accentBg};
          color: #fff;
          font-weight: 600;
        }
        .toolbar-btn.primary:hover { background: ${t.accentHover}; }
        
        .var-card {
          background: ${t.bgCard};
          border: 1px solid ${t.border};
          border-radius: 8px;
          padding: 10px 14px;
          margin-bottom: 8px;
          transition: border-color 0.3s, background 0.4s, box-shadow 0.3s;
        }
        .var-card.changed {
          border-color: ${t.green};
          box-shadow: 0 0 12px ${t.greenGlow};
          animation: card-pulse 0.6s ease-out;
        }
        .var-card.is-new {
          border-color: ${t.accent};
          box-shadow: 0 0 12px rgba(88,166,255,0.15);
          animation: card-pulse 0.6s ease-out;
        }
        @keyframes card-pulse {
          0% { transform: scale(1.02); }
          50% { transform: scale(1.0); }
          100% { transform: scale(1.0); }
        }
        
        .diff-pill {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 2px 8px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          font-family: 'Fira Code', monospace;
        }
        .diff-pill.value-change {
          background: ${t.greenGlow};
          color: ${t.green};
        }
        .diff-pill.new-var {
          background: rgba(88,166,255,0.12);
          color: ${t.accent};
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          padding: 1px 6px;
        }
        .diff-pill .diff-arrow {
          opacity: 0.6;
          font-size: 11px;
        }
        .diff-pill .diff-old {
          text-decoration: line-through;
          opacity: 0.6;
        }
        .diff-pill .diff-new {
          font-weight: 700;
        }
        .diff-delta {
          display: inline-flex;
          padding: 1px 5px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 700;
          font-family: 'Fira Code', monospace;
          margin-left: 4px;
        }
        .diff-delta.positive {
          background: ${t.greenGlow};
          color: ${t.green};
        }
        .diff-delta.negative {
          background: ${isDark ? 'rgba(248,81,73,0.12)' : 'rgba(207,34,46,0.08)'};
          color: ${t.red};
        }
        
        .changes-summary {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 12px;
          margin-bottom: 10px;
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
        }
        .changes-summary.has-changes {
          background: ${t.greenGlow};
          color: ${t.green};
        }
        .changes-summary.no-changes {
          background: ${t.bgCard};
          color: ${t.textDim};
        }
        
        .array-cell {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 36px;
          height: 36px;
          border: 1px solid ${t.borderActive};
          border-radius: 4px;
          font-size: 13px;
          font-weight: 600;
          background: ${t.bg};
          color: ${t.text};
          transition: all 0.3s;
          padding: 0 6px;
          position: relative;
        }
        .array-cell.highlight { border-color: ${t.orange}; background: ${t.orangeOverlay}; color: ${t.orange}; }
        .array-cell.changed {
          border-color: ${t.green};
          background: ${t.greenGlow};
          color: ${t.green};
          animation: cell-flash 0.5s ease-out;
        }
        @keyframes cell-flash {
          0% { transform: scale(1.15); }
          100% { transform: scale(1.0); }
        }
        .array-cell-prev {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 9px;
          color: ${t.red};
          text-decoration: line-through;
          opacity: 0.7;
          white-space: nowrap;
          font-weight: 600;
        }
        
        .stack-frame {
          background: ${t.bgCard};
          border: 1px solid ${t.border};
          border-radius: 6px;
          padding: 10px;
          margin-bottom: 6px;
          transition: background 0.4s;
        }
        
        .console-output {
          font-family: 'Fira Code', monospace;
          font-size: 14px;
          line-height: 1.6;
          padding: 16px;
          white-space: pre-wrap;
          color: ${t.accent};
        }
        
        .line-gutter {
          position: relative;
          width: 52px;
          min-width: 52px;
          text-align: right;
          padding-right: 12px;
          user-select: none;
          cursor: pointer;
        }
        
        .breakpoint-dot {
          position: absolute;
          left: 4px;
          top: 50%;
          transform: translateY(-50%);
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: ${t.red};
        }
        
        .executed-dot {
          position: absolute;
          left: 8px;
          top: 50%;
          transform: translateY(-50%);
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: ${t.textDim};
        }
        
        .speed-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100px;
          height: 4px;
          background: ${t.borderActive};
          border-radius: 2px;
          outline: none;
        }
        .speed-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: ${t.accent};
          cursor: pointer;
        }
        
        .example-menu {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 4px;
          background: ${t.bgCard};
          border: 1px solid ${t.borderActive};
          border-radius: 8px;
          padding: 4px;
          z-index: 100;
          min-width: 200px;
          box-shadow: ${t.dropShadow};
        }
        .example-item {
          display: block;
          width: 100%;
          padding: 8px 12px;
          background: transparent;
          border: none;
          color: ${t.text};
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          text-align: left;
          cursor: pointer;
          border-radius: 6px;
          transition: background 0.15s;
        }
        .example-item:hover { background: ${t.bgHover}; }
        
        .menu-divider {
          height: 1px;
          background: ${t.border};
          margin: 6px 0;
        }
        .menu-section-label {
          padding: 6px 12px 4px;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: ${t.textMuted};
          user-select: none;
        }
        .example-item.folder-action {
          display: flex;
          align-items: center;
          gap: 8px;
          color: ${t.accent};
          font-weight: 600;
        }
        .example-item.local-file {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .example-item.local-file.active {
          background: ${t.accentBg};
          color: #fff;
        }
        .file-badge {
          font-size: 9px;
          font-weight: 700;
          padding: 1px 5px;
          border-radius: 3px;
          background: ${t.orangeOverlay};
          color: ${t.orange};
          font-family: 'Fira Code', monospace;
          letter-spacing: 0.3px;
        }
        
        .editor-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
        }
        
        .editor-textarea {
          position: absolute;
          top: 0;
          left: 55px;
          right: 0;
          bottom: 0;
          background: transparent;
          color: transparent;
          caret-color: ${t.caret};
          border: none;
          outline: none;
          resize: none;
          font-family: 'Fira Code', monospace;
          font-size: 16px;
          line-height: 28px;
          padding: 0 16px;
          white-space: pre;
          overflow: auto;
          tab-size: 4;
          z-index: 3;
          font-variant-ligatures: none;
          letter-spacing: 0px;
          word-spacing: 0px;
          font-feature-settings: normal;
          text-rendering: auto;
        }
        .editor-textarea::selection {
          background: rgba(56,139,253,0.3);
          color: transparent;
        }
        .editor-textarea::-moz-selection {
          background: rgba(56,139,253,0.3);
          color: transparent;
        }
        
        @keyframes flash-green {
          0% { background: ${t.greenFlash}; }
          100% { background: transparent; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .flash-change { animation: flash-green 0.8s ease-out; }
        
        .loop-badge {
          display: inline-flex;
          align-items: center;
          padding: 2px 8px;
          background: ${t.orangeOverlay};
          border: 1px solid ${t.orangeBorder};
          border-radius: 10px;
          font-size: 11px;
          color: ${t.orange};
          font-family: 'DM Sans', sans-serif;
          font-weight: 600;
          margin-left: 8px;
        }

        .theme-toggle {
          position: relative;
          width: 56px;
          height: 30px;
          border-radius: 15px;
          border: 1px solid ${t.toggleBorder};
          background: ${t.toggleBg};
          cursor: pointer;
          transition: all 0.4s ease;
          display: flex;
          align-items: center;
          padding: 0 4px;
          flex-shrink: 0;
        }
        .theme-toggle:hover {
          border-color: ${t.borderHover};
        }
        .theme-toggle-knob {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: ${t.accentGradient};
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.4s cubic-bezier(0.68, -0.15, 0.265, 1.35);
          transform: translateX(${isDark ? '24px' : '0px'});
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>
      
      {/* Header / Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px 16px',
        background: t.bgDeep,
        borderBottom: `1px solid ${t.border}`,
        gap: '8px',
        flexWrap: 'wrap',
        minHeight: 52,
        transition: 'background 0.4s, border-color 0.4s'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 8 }}>
          <img src={JAVA_LOGO} alt="Java" style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            objectFit: 'cover'
          }} />
          <div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 14, color: t.textBright, lineHeight: 1.2 }}>Java Code Visualizer</div>
            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: t.textMuted }}>Compile · Execute · Visualize line-by-line</div>
          </div>
        </div>
        
        <div style={{ flex: 1 }} />

        {/* Theme Toggle */}
        <div
          className="theme-toggle"
          onClick={() => setIsDark(d => !d)}
          title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          role="button"
          aria-label="Toggle theme"
        >
          <div className="theme-toggle-knob">
            {isDark ? (
              <Moon size={13} style={{ color: '#fff' }} />
            ) : (
              <Sun size={13} style={{ color: '#fff' }} />
            )}
          </div>
        </div>
        
        {/* Controls */}
        <button className="toolbar-btn primary" onClick={handleCompileRun}>
          <Code2 size={14} /> Compile &amp; Run
        </button>
        <button className="toolbar-btn" onClick={handleStepBack} disabled={currentStep <= 0}>
          <SkipBack size={14} /> Back
        </button>
        <button className="toolbar-btn" onClick={handleStepForward} disabled={isRunning && currentStep >= states.length - 1}>
          <SkipForward size={14} /> Step
        </button>
        <button className="toolbar-btn" onClick={toggleAutoPlay}>
          {isAutoPlaying ? <><Pause size={14} /> Pause</> : <><Play size={14} /> Auto</>}
        </button>
        <button className="toolbar-btn" onClick={handleReset}>
          <RotateCcw size={14} /> Reset
        </button>
        <button className="toolbar-btn" onClick={handleDownload} title="Download as .java (Cmd/Ctrl+S)">
          <Download size={14} />
        </button>
        <button className="toolbar-btn" onClick={handleToggleFullscreen} title="Toggle Fullscreen (F11)">
          {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
        
        {/* Speed */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 4 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: t.textMuted }}>Speed</span>
          <input
            type="range"
            className="speed-slider"
            min={100}
            max={2000}
            step={100}
            value={2100 - speed}
            onChange={(e) => setSpeed(2100 - parseInt(e.target.value))}
          />
        </div>
        
        {/* Example dropdown */}
        <div ref={exampleMenuRef} style={{ position: 'relative' }}>
          <button className="toolbar-btn" onClick={() => setShowExamples(prev => !prev)}>
            {Object.keys(localFiles).length > 0 ? (
              <><FileCode size={14} /> {displayFileName}</>
            ) : (
              <>Load Example</>
            )}
            <ChevronDown size={14} />
          </button>
          {showExamples && (
            <div className="example-menu" style={{ maxHeight: 420, overflowY: 'auto' }}>
              {/* Load files action */}
              <button className="example-item folder-action" onClick={handleLoadFiles}>
                <FilePlus2 size={14} /> Open Java File(s)…
              </button>
              
              {/* Show loaded local files */}
              {Object.keys(localFiles).length > 0 && (
                <>
                  <div className="menu-divider" />
                  <div className="menu-section-label">Your Files</div>
                  {Object.keys(localFiles).map(name => (
                    <button
                      key={name}
                      className={`example-item local-file ${name === activeFileName ? 'active' : ''}`}
                      onClick={() => loadLocalFile(name)}
                    >
                      <FileCode size={13} />
                      {name}
                      <span className="file-badge">.java</span>
                    </button>
                  ))}
                </>
              )}
              
              {/* Built-in examples */}
              <div className="menu-divider" />
              <div className="menu-section-label">Built-in Examples</div>
              {Object.keys(EXAMPLES).map(name => (
                <button key={name} className="example-item" onClick={() => loadExample(name)}>
                  {name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Step indicator */}
      {isRunning && (
        <div style={{
          padding: '4px 16px',
          background: t.bg,
          borderBottom: `1px solid ${t.border}`,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          color: t.textMuted,
          transition: 'background 0.4s, border-color 0.4s'
        }}>
          <span>Step <strong style={{ color: t.text }}>{currentStep + 1}</strong> of {states.length}</span>
          {currentLineNum && <span>Line <strong style={{ color: t.orange }}>{currentLineNum}</strong></span>}
          {currentState?.meta?.loopType && (
            <span className="loop-badge">
              {currentState.meta.loopType} · iteration {currentState.meta.iteration}
            </span>
          )}
          {/* Progress bar */}
          <div style={{ flex: 1, height: 3, background: t.border, borderRadius: 2 }}>
            <div style={{
              width: `${states.length > 0 ? ((currentStep + 1) / states.length) * 100 : 0}%`,
              height: '100%',
              background: t.progressGradient,
              borderRadius: 2,
              transition: 'width 0.2s'
            }} />
          </div>
        </div>
      )}
      
      {/* Main content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Left pane: Code Editor */}
        <div style={{ flex: '0 0 50%', display: 'flex', flexDirection: 'column', borderRight: `1px solid ${t.border}`, overflow: 'hidden' }}>
          {/* File label */}
          <div style={{
            padding: '6px 16px',
            borderBottom: `1px solid ${t.border}`,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 12,
            color: t.textMuted,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: t.bgDeep,
            transition: 'background 0.4s'
          }}>
            <FileCode size={13} /> {displayFileName}
          </div>
          
          {/* Editor area */}
          <div ref={editorRef} style={{ position: 'relative', flex: 1, overflow: 'hidden', background: t.bg, transition: 'background 0.4s', font: '16px/28px "Fira Code", monospace', letterSpacing: '0px', fontVariantLigatures: 'none' }}>
            {/* Scrollable container */}
            <div
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'auto' }}
              onScroll={(e) => {
                if (textareaRef.current) {
                  textareaRef.current.scrollTop = e.target.scrollTop;
                  textareaRef.current.scrollLeft = e.target.scrollLeft;
                }
              }}
              ref={overlayScrollRef}
            >
              {/* Syntax-highlighted overlay */}
              <div style={{ minHeight: '100%', pointerEvents: 'none' }}>
                {lines.map((line, idx) => {
                  const lineNum = idx + 1;
                  const isCurrentLine = isRunning && lineNum === currentLineNum;
                  const isExecuted = executedLines.has(lineNum);
                  const isError = lineNum === errorLine;
                  const hasBreakpoint = breakpoints.has(lineNum);
                  
                  return (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        minHeight: 28,
                        lineHeight: '28px',
                        background: isCurrentLine
                          ? t.currentLineBg
                          : isError
                          ? t.errorLineBg
                          : 'transparent',
                        borderLeft: isCurrentLine ? `3px solid ${t.accent}` : isError ? `3px solid ${t.red}` : '3px solid transparent',
                        transition: 'background 0.1s'
                      }}
                    >
                      <div
                        className="line-gutter"
                        onClick={() => toggleBreakpoint(lineNum)}
                        style={{ lineHeight: '28px', fontSize: 12, color: isCurrentLine ? t.accent : t.textDim, pointerEvents: 'auto' }}
                      >
                        {hasBreakpoint && <div className="breakpoint-dot" />}
                        {!hasBreakpoint && isExecuted && !isCurrentLine && <div className="executed-dot" />}
                        {lineNum}
                      </div>
                      <div
                        style={{
                          flex: 1,
                          padding: '0 16px',
                          fontSize: 16,
                          whiteSpace: 'pre',
                          fontFamily: "'Fira Code', monospace",
                          fontVariantLigatures: 'none',
                          letterSpacing: '0px',
                          wordSpacing: '0px',
                          fontFeatureSettings: 'normal',
                          textRendering: 'auto'
                        }}
                        dangerouslySetInnerHTML={{ __html: highlightJava(line) || ' ' }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Textarea for editing — sits behind overlay, covers code area only */}
            <textarea
              ref={textareaRef}
              className="editor-textarea"
              value={code}
              onChange={(e) => { updateCode(e.target.value); if (isRunning) handleReset(); setTimeout(updateCursorPos, 0); }}
              onKeyDown={handleKeyDown}
              onKeyUp={updateCursorPos}
              onClick={updateCursorPos}
              onSelect={updateCursorPos}
              onScroll={(e) => {
                if (overlayScrollRef.current) {
                  overlayScrollRef.current.scrollTop = e.target.scrollTop;
                  overlayScrollRef.current.scrollLeft = e.target.scrollLeft;
                }
              }}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />
          </div>
          
          {/* Status Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '4px 16px',
            borderTop: `1px solid ${t.border}`,
            background: t.bgDeep,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 11,
            color: t.textMuted,
            transition: 'background 0.4s, border-color 0.4s',
            userSelect: 'none',
            flexShrink: 0
          }}>
            <div style={{ display: 'flex', gap: 16 }}>
              <span>Ln <span style={{ color: t.text, fontWeight: 600 }}>{cursorPos.line}</span>, Col <span style={{ color: t.text, fontWeight: 600 }}>{cursorPos.col}</span></span>
            </div>
            <div style={{ display: 'flex', gap: 10, opacity: 0.6 }}>
              <span style={{ padding: '1px 5px', borderRadius: 3, background: t.bgCard, fontSize: 10 }}>⌘↵ Run</span>
              <span style={{ padding: '1px 5px', borderRadius: 3, background: t.bgCard, fontSize: 10 }}>⌘S Save</span>
              <span style={{ padding: '1px 5px', borderRadius: 3, background: t.bgCard, fontSize: 10 }}>⌘/ Comment</span>
              <span style={{ padding: '1px 5px', borderRadius: 3, background: t.bgCard, fontSize: 10 }}>⌘Z Undo</span>
              <span style={{ padding: '1px 5px', borderRadius: 3, background: t.bgCard, fontSize: 10 }}>F11 Fullscreen</span>
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <span><span style={{ color: t.text, fontWeight: 600 }}>{lines.length}</span> lines</span>
              <span><span style={{ color: t.text, fontWeight: 600 }}>{code.length}</span> chars</span>
              <span>Java</span>
            </div>
          </div>
        </div>
        
        {/* Right pane: Inspection panels */}
        <div style={{ flex: '0 0 50%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: `1px solid ${t.border}`, background: t.bgDeep, transition: 'background 0.4s' }}>
            <button className={`tab-btn ${activeTab === 'variables' ? 'active' : ''}`} onClick={() => setActiveTab('variables')}>
              <Variable size={14} /> Variables
            </button>
            <button className={`tab-btn ${activeTab === 'callstack' ? 'active' : ''}`} onClick={() => setActiveTab('callstack')}>
              <Layers size={14} /> Call Stack
            </button>
            <button className={`tab-btn ${activeTab === 'output' ? 'active' : ''}`} onClick={() => setActiveTab('output')}>
              <Terminal size={14} /> Output
              {waitingForInput && <span style={{ width: 8, height: 8, borderRadius: '50%', background: t.orange, display: 'inline-block', animation: 'pulse 1.5s infinite' }} />}
            </button>
            <button className={`tab-btn ${activeTab === 'compilelog' ? 'active' : ''}`} onClick={() => setActiveTab('compilelog')}>
              {compiledSuccess === false ? <AlertTriangle size={14} style={{ color: t.red }} /> : <Code2 size={14} />}
              Compile Log
            </button>
            <div style={{ flex: 1 }} />
            {activeTab === 'output' && (
              <button
                className="tab-btn"
                onClick={() => {
                  // Clear output display by resetting to current state minus output
                  if (states.length > 0) {
                    const cleared = states.map(s => ({ ...s, output: [] }));
                    setStates(cleared);
                  }
                }}
                style={{ fontSize: 12 }}
                title="Clear Output"
              >
                <Trash2 size={13} /> Clear
              </button>
            )}
          </div>
          
          {/* Tab content */}
          <div style={{ flex: 1, overflow: 'auto', padding: 16, background: t.bg, transition: 'background 0.4s' }}>
            
            {/* Variables Tab */}
            {activeTab === 'variables' && (
              !isRunning ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  color: t.textDim,
                  fontFamily: "'DM Sans', sans-serif"
                }}>
                  <Code2 size={40} strokeWidth={1} style={{ marginBottom: 12, opacity: 0.4 }} />
                  <div style={{ fontSize: 14 }}>Compile &amp; run your code to see variables</div>
                </div>
              ) : (
                <div>
                  {/* Changes summary */}
                  {Object.entries(currentVars).length > 0 && (
                    <div className={`changes-summary ${varChanges.length > 0 ? 'has-changes' : 'no-changes'}`}>
                      {varChanges.length > 0 ? (
                        <>
                          <span>⚡ {varChanges.length} change{varChanges.length > 1 ? 's' : ''} on this step:</span>
                          <span style={{ fontWeight: 400, opacity: 0.8 }}>
                            {varChanges.map(c => c.name).join(', ')}
                          </span>
                        </>
                      ) : (
                        <span>No variable changes on this step</span>
                      )}
                    </div>
                  )}
                  
                  {Object.entries(currentVars).length === 0 && (
                    <div style={{ color: t.textDim, fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>No variables in scope yet.</div>
                  )}
                  {Object.entries(currentVars).map(([name, info]) => {
                    const isNew = info.changed && info.prevValue === undefined && !Array.isArray(info.value);
                    const isChanged = info.changed && !isNew;
                    const cardClass = isNew ? 'var-card is-new' : isChanged ? 'var-card changed' : 'var-card';
                    
                    // Compute delta for numeric values
                    let delta = null;
                    if (isChanged && typeof info.prevValue === 'number' && typeof info.value === 'number') {
                      delta = info.value - info.prevValue;
                    }
                    
                    return (
                      <div key={`${name}-${currentStep}`} className={cardClass}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: Array.isArray(info.value) ? 8 : 0, flexWrap: 'wrap' }}>
                          <span style={{ color: t.textMuted, fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 600, textTransform: 'uppercase' }}>
                            {info.type || 'var'}
                          </span>
                          <span style={{ color: t.textBright, fontWeight: 600, fontSize: 14 }}>{name}</span>
                          
                          {/* NEW badge for freshly declared variables */}
                          {isNew && (
                            <span className="diff-pill new-var">NEW</span>
                          )}
                          
                          {!Array.isArray(info.value) && (
                            <>
                              <span style={{ color: t.textDim }}>=</span>
                              
                              {/* Changed value — show diff pill */}
                              {isChanged && info.prevValue !== undefined ? (
                                <>
                                  <span className="diff-pill value-change">
                                    <span className="diff-old">
                                      {typeof info.prevValue === 'string' ? `"${info.prevValue}"` : String(info.prevValue)}
                                    </span>
                                    <span className="diff-arrow">→</span>
                                    <span className="diff-new">
                                      {typeof info.value === 'string' ? `"${info.value}"` : String(info.value)}
                                    </span>
                                  </span>
                                  {delta !== null && delta !== 0 && (
                                    <span className={`diff-delta ${delta > 0 ? 'positive' : 'negative'}`}>
                                      {delta > 0 ? '+' : ''}{delta}
                                    </span>
                                  )}
                                </>
                              ) : (
                                /* Unchanged or new value — show normally */
                                <span style={{ color: isNew ? t.accent : t.tokType, fontWeight: 600, fontSize: 14 }}>
                                  {typeof info.value === 'string' ? `"${info.value}"` : String(info.value)}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                        
                        {/* Array visualization */}
                        {Array.isArray(info.value) && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 4 }}>
                            {info.value.map((val, idx) => {
                              const isIdxChanged = info.changedIndex === idx;
                              const indexVars = Object.entries(currentVars).filter(
                                ([n, v]) => !Array.isArray(v.value) && typeof v.value === 'number' && v.value === idx && n !== name
                              );
                              const isPointed = indexVars.length > 0;
                              
                              // Get previous value for this cell
                              const prevArr = info.prevValue;
                              const prevCellVal = Array.isArray(prevArr) && isIdxChanged ? prevArr[idx] : null;
                              
                              return (
                                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                                  <span style={{ fontSize: 10, color: t.textDim, fontFamily: "'DM Sans', sans-serif" }}>{idx}</span>
                                  <div className={`array-cell ${isIdxChanged ? 'changed' : ''} ${isPointed ? 'highlight' : ''}`}>
                                    {prevCellVal !== null && prevCellVal !== undefined && (
                                      <span className="array-cell-prev">{prevCellVal}</span>
                                    )}
                                    {typeof val === 'string' ? `"${val}"` : val}
                                  </div>
                                  {isPointed && (
                                    <span style={{ fontSize: 10, color: t.orange, fontWeight: 600 }}>
                                      ↑ {indexVars.map(([n]) => n).join(',')}
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 8 }}>
                              <span style={{ fontSize: 11, color: t.textDim, fontFamily: "'DM Sans', sans-serif" }}>.length = {info.value.length}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )
            )}
            
            {/* Call Stack Tab */}
            {activeTab === 'callstack' && (
              <div>
                <div className="stack-frame" style={{ borderColor: t.accentBg }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'DM Sans', sans-serif" }}>
                    <span style={{ fontSize: 11, color: t.accent, fontWeight: 600 }}>▸</span>
                    <span style={{ fontSize: 13, color: t.textBright, fontWeight: 600 }}>main(String[] args)</span>
                    {currentLineNum && <span style={{ fontSize: 11, color: t.textDim }}>line {currentLineNum}</span>}
                  </div>
                </div>
                {currentCallStack.map((frame, idx) => (
                  <div key={idx} className="stack-frame">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: "'DM Sans', sans-serif" }}>
                      <span style={{ fontSize: 11, color: t.textMuted }}>▸</span>
                      <span style={{ fontSize: 13, color: t.text }}>{frame.name}()</span>
                      <span style={{ fontSize: 11, color: t.textDim }}>line {frame.line}</span>
                    </div>
                  </div>
                ))}
                {!isRunning && (
                  <div style={{ color: t.textDim, fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
                    Run your code to see the call stack.
                  </div>
                )}
              </div>
            )}
            
            {/* Output Tab */}
            {activeTab === 'output' && (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ background: t.consoleBg, borderRadius: 8, border: `1px solid ${t.border}`, flex: 1, overflow: 'auto', transition: 'background 0.4s' }}>
                  <div className="console-output">
                    {currentOutput.length === 0 && !waitingForInput ? (
                      <span style={{ color: t.textDim }}>
                        {isRunning ? 'No output yet.' : 'Run your code to see output.'}
                      </span>
                    ) : (
                      currentOutput.map((line, idx) => (
                        <div key={idx} style={{ color: t.textBright }}>{line}</div>
                      ))
                    )}
                  </div>
                </div>
                
                {/* Input prompt */}
                {waitingForInput && (
                  <div style={{
                    marginTop: 8,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '8px 12px',
                    background: t.bgCard,
                    border: `1px solid ${t.orange}`,
                    borderRadius: 8,
                    transition: 'background 0.4s'
                  }}>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      color: t.orange,
                      fontWeight: 600,
                      whiteSpace: 'nowrap'
                    }}>
                      {inputPromptType === 'nextInt' ? 'Enter int:' :
                       inputPromptType === 'nextDouble' || inputPromptType === 'nextFloat' ? 'Enter number:' :
                       inputPromptType === 'nextBoolean' ? 'Enter boolean:' :
                       'Enter Input:'}
                    </span>
                    <input
                      ref={inputRef}
                      type={inputPromptType === 'nextInt' ? 'number' : inputPromptType === 'nextDouble' || inputPromptType === 'nextFloat' ? 'number' : 'text'}
                      step={inputPromptType === 'nextDouble' || inputPromptType === 'nextFloat' ? 'any' : undefined}
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleSubmitInput(); }}
                      style={{
                        flex: 1,
                        background: t.bg,
                        border: `1px solid ${t.border}`,
                        borderRadius: 6,
                        padding: '6px 10px',
                        color: t.textBright,
                        fontFamily: "'Fira Code', monospace",
                        fontSize: 16,
                        outline: 'none',
                        caretColor: t.caret
                      }}
                      placeholder="Type your input and press Enter..."
                      autoFocus
                    />
                    <button
                      onClick={handleSubmitInput}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        padding: '6px 12px',
                        background: t.accentBg,
                        border: 'none',
                        borderRadius: 6,
                        color: '#fff',
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      <Send size={13} /> Submit
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {/* Compile Log Tab */}
            {activeTab === 'compilelog' && (
              <div>
                {compileLog.length === 0 ? (
                  <div style={{ color: t.textDim, fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}>
                    Compile your code to see results.
                  </div>
                ) : (
                  compileLog.map((entry, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 8,
                        padding: 12,
                        background: entry.type === 'error' ? t.errorOverlayBg : t.successOverlayBg,
                        border: `1px solid ${entry.type === 'error' ? t.errorOverlayBorder : t.successOverlayBorder}`,
                        borderRadius: 8,
                        marginBottom: 8
                      }}
                    >
                      {entry.type === 'error' ? (
                        <AlertTriangle size={16} style={{ color: t.red, flexShrink: 0, marginTop: 2 }} />
                      ) : (
                        <Check size={16} style={{ color: t.green, flexShrink: 0, marginTop: 2 }} />
                      )}
                      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: entry.type === 'error' ? t.red : t.green }}>
                        {entry.message}
                        {entry.line && <span style={{ color: t.textMuted, marginLeft: 8 }}>at line {entry.line}</span>}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
