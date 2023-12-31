import { assert } from 'std/assert/assert.ts';
import puzzle from 'util/puzzle.ts';

export function rootDiff(a: number, b: number, c: number) {
  const root = Math.sqrt((b * b) - (4 * a * c));
  const den = 2 * a;
  const [r1, r2] = [(-b + root) / den, (-b - root) / den];
  return -Math.round(-r2 + .5) - Math.round(r1 + .5) + 1;
}

async function numberOfWaysProduct(test: boolean) {
  const lines = await puzzle(import.meta, test).strings();
  const [times, distances] = lines.map((l) => l.split(/\s+/).slice(1).map((s) => parseInt(s)));
  // x * (t - x) > d
  // -x^2 + tx - d > 0
  return times.reduce((p, time, i) => p * rootDiff(-1, time, -distances[i]), 1);
}

Deno.test('1', async () => {
  assert(await numberOfWaysProduct(true) == 288);
});

if (import.meta.main) {
  console.log(await numberOfWaysProduct(false));
}
