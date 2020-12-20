import puzzle from '../util/puzzle.ts';

const lines = await puzzle(import.meta).strings();

const perform = (a: string, op: string, b: string) => String(op === '+' ? (Number(a) + Number(b)) : (Number(a) * Number(b)));

function evalExpr(expr: string[]): string {
  if (expr.length == 1) {
    return expr[0];
  }
  const [a, op, b] = expr;
  return evalExpr([perform(a, op, b), ...expr.slice(3)]);
}

function foo(expr: string) {
  for (let done = false; !done;) {
    done = true;
    expr = expr.replaceAll(/\(([^())]*)\)/g, (_, b) => (done = false, evalExpr(b.split(' '))));
  }
  return Number(evalExpr(expr.split(' ')));
}

// lines.map(foo).forEach(a => console.log(a));

console.log(lines.map(foo).reduce((a, b) => a + b, 0));
