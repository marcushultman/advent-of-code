import { assert } from 'std/assert/assert.ts';
import puzzle from 'util/puzzle.ts';

function nextValue(sequence: number[]) {
  const prev: number[] = [];
  while (sequence.some((a) => a)) {
    prev.push(sequence.pop()!);
    sequence = sequence.map((a, i) => (sequence[i + 1] ?? prev.at(-1)!) - a);
  }
  return prev.reduce((a, b) => a + b);
}

async function sum(test: boolean) {
  const lines = await puzzle(import.meta, test).strings();
  const sequences = lines.map((line) => line.split(' ').map((n) => parseInt(n)));
  return sequences.reduce((sum, seq) => sum + nextValue(seq), 0);
}

Deno.test('1', async () => {
  assert(await sum(true) == 114);
});

if (import.meta.main) {
  console.log(await sum(false));
}
