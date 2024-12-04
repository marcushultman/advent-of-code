import { assert } from 'std/assert/assert.ts';
import puzzle from 'util/puzzle.ts';
import { parseLists } from './1.ts';

function simScore(lines: string[]) {
  const [l1, l2] = parseLists(lines);
  const mem = new Map<number, number>();
  return l1.map((a) => {
    if (!mem.has(a)) {
      mem.set(a, l2.filter((b) => a === b).length);
    }
    return a * mem.get(a)!;
  }).reduce((a, b) => a + b, 0);
}

Deno.test('2', async () => {
  const lines = await puzzle(import.meta, true).strings();
  assert(simScore(lines) == 31);
});

if (import.meta.main) {
  const lines = await puzzle(import.meta, false).strings();
  console.log(simScore(lines));
}
