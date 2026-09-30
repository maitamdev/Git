import { WorkflowContexts } from './contexts';

export class ExpressionEvaluator {
  /**
   * Safely resolves a dotted property path against WorkflowContexts.
   * e.g. "github.ref" -> "refs/heads/main", "needs.test.result" -> "success".
   */
  public static resolvePath(pathStr: string, contexts: WorkflowContexts): any {
    const trimmed = pathStr.trim();
    if (trimmed === 'true') return true;
    if (trimmed === 'false') return false;
    if (trimmed === 'null') return null;
    if (!isNaN(Number(trimmed)) && trimmed !== '') return Number(trimmed);

    // String literal in single or double quotes
    if (
      (trimmed.startsWith("'") && trimmed.endsWith("'")) ||
      (trimmed.startsWith('"') && trimmed.endsWith('"'))
    ) {
      return trimmed.slice(1, -1);
    }

    const parts = trimmed.split('.');
    let current: any = contexts;

    for (const part of parts) {
      if (current === undefined || current === null) return undefined;
      current = current[part];
    }
    return current;
  }

  /**
   * Evaluates a single condition expression (for `if:` keys in jobs and steps).
   * Supports: ==, !=, &&, ||, !, contains(), startsWith(), endsWith(), success(), failure(), always().
   * NEVER uses eval or new Function!
   */
  public static evaluateCondition(
    conditionExpr: string,
    contexts: WorkflowContexts,
    options?: { previousFailed?: boolean; cancelled?: boolean }
  ): boolean {
    if (!conditionExpr || typeof conditionExpr !== 'string') return true;

    let expr = conditionExpr.trim();
    // Strip ${{ ... }} wrapper if present
    if (expr.startsWith('${{') && expr.endsWith('}}')) {
      expr = expr.slice(3, -2).trim();
    }

    // Handle functions first
    const previousFailed = options?.previousFailed ?? false;
    const cancelled = options?.cancelled ?? false;

    // Check always()
    if (expr.includes('always()')) {
      expr = expr.replace(/always\(\)/g, 'true');
    }
    // Check success()
    if (expr.includes('success()')) {
      expr = expr.replace(/success\(\)/g, (!previousFailed && !cancelled).toString());
    }
    // Check failure()
    if (expr.includes('failure()')) {
      expr = expr.replace(/failure\(\)/g, previousFailed.toString());
    }
    // Check cancelled()
    if (expr.includes('cancelled()')) {
      expr = expr.replace(/cancelled\(\)/g, cancelled.toString());
    }

    // Evaluate contains(arg1, arg2)
    expr = expr.replace(/contains\(([^,]+),\s*([^)]+)\)/g, (_, a1, a2) => {
      const val1 = this.resolvePath(a1, contexts);
      const val2 = this.resolvePath(a2, contexts);
      if (typeof val1 === 'string' && typeof val2 === 'string') {
        return val1.includes(val2) ? 'true' : 'false';
      }
      if (Array.isArray(val1)) {
        return val1.includes(val2) ? 'true' : 'false';
      }
      return 'false';
    });

    // Evaluate startsWith(arg1, arg2)
    expr = expr.replace(/startsWith\(([^,]+),\s*([^)]+)\)/g, (_, a1, a2) => {
      const val1 = String(this.resolvePath(a1, contexts) ?? '');
      const val2 = String(this.resolvePath(a2, contexts) ?? '');
      return val1.startsWith(val2) ? 'true' : 'false';
    });

    // Evaluate endsWith(arg1, arg2)
    expr = expr.replace(/endsWith\(([^,]+),\s*([^)]+)\)/g, (_, a1, a2) => {
      const val1 = String(this.resolvePath(a1, contexts) ?? '');
      const val2 = String(this.resolvePath(a2, contexts) ?? '');
      return val1.endsWith(val2) ? 'true' : 'false';
    });

    // Handle logical OR (||)
    if (expr.includes('||')) {
      const parts = expr.split('||');
      return parts.some((part) => this.evaluateCondition(part, contexts, options));
    }

    // Handle logical AND (&&)
    if (expr.includes('&&')) {
      const parts = expr.split('&&');
      return parts.every((part) => this.evaluateCondition(part, contexts, options));
    }

    // Handle equality (==)
    if (expr.includes('==')) {
      const [left, right] = expr.split('==');
      const leftVal = this.resolvePath(left, contexts);
      const rightVal = this.resolvePath(right, contexts);
      return String(leftVal ?? '') === String(rightVal ?? '');
    }

    // Handle inequality (!=)
    if (expr.includes('!=')) {
      const [left, right] = expr.split('!=');
      const leftVal = this.resolvePath(left, contexts);
      const rightVal = this.resolvePath(right, contexts);
      return String(leftVal ?? '') !== String(rightVal ?? '');
    }

    // Handle negation (!)
    if (expr.startsWith('!')) {
      return !this.evaluateCondition(expr.slice(1), contexts, options);
    }

    // Direct path truthiness
    const val = this.resolvePath(expr, contexts);
    return Boolean(val);
  }

  /**
   * Replaces ${{ ... }} interpolation in strings.
   * e.g. "Run with Node ${{ matrix.node }} on ${{ github.ref }}"
   */
  public static interpolate(template: string, contexts: WorkflowContexts): string {
    if (!template || typeof template !== 'string') return template;

    return template.replace(/\${{\s*(.*?)\s*}}/g, (_, expr) => {
      const val = this.resolvePath(expr, contexts);
      if (val === undefined || val === null) return '';
      if (typeof val === 'object') return JSON.stringify(val);
      return String(val);
    });
  }

  /**
   * Recursively interpolates string values within an object or array.
   */
  public static interpolateDeep<T>(target: T, contexts: WorkflowContexts): T {
    if (typeof target === 'string') {
      return this.interpolate(target, contexts) as any;
    }
    if (Array.isArray(target)) {
      return target.map((item) => this.interpolateDeep(item, contexts)) as any;
    }
    if (target && typeof target === 'object') {
      const result: Record<string, any> = {};
      for (const [key, value] of Object.entries(target)) {
        result[key] = this.interpolateDeep(value, contexts);
      }
      return result as any;
    }
    return target;
  }
}
