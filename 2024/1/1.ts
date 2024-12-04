import { assert } from 'std/assert/assert.ts';
import puzzle from 'util/puzzle.ts';
import { testName } from 'util/test.ts';

export function parseLists(lines: string[]) {
  const { l1, l2 } = lines
    .map((line) => line.split(/\s+/g, 2))
    .reduce(
      ({ l1, l2 }, [a, b]) => ({ l1: [...l1, parseInt(a)], l2: [...l2, parseInt(b)] }),
      { l1: [] as number[], l2: [] as number[] },
    );
  l1.sort();
  l2.sort();
  return [l1, l2];
}

function sumDist(lines: string[]) {
  const [l1, l2] = parseLists(lines);
  return l1.map((a, i) => Math.abs(a - l2[i])).reduce((a, b) => a + b, 0);
}

Deno.test(testName(import.meta), async () => {
  const lines = await puzzle(import.meta, true).strings();
  assert(sumDist(lines) == 11);
});

if (import.meta.main) {
  const lines = await puzzle(import.meta, false).strings();
  console.log(sumDist(lines));
}
