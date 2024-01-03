import { assert } from 'std/assert/assert.ts';
import puzzle from 'util/puzzle.ts';

function prevValue(sequence: number[]) {
  const prev: number[] = [];
  while (sequence.some((a) => a)) {
    prev.unshift(sequence.shift()!);
    sequence = sequence.map((a, i) => a - (sequence[i - 1] ?? prev.at(0)!));
  }
  return prev.reduce((a, b) => b - a);
}

async function sum(test: boolean) {
  const lines = await puzzle(import.meta, test).strings();
  const sequences = lines.map((line) => line.split(' ').map((n) => parseInt(n)));
  return sequences.reduce((sum, seq) => sum + prevValue(seq), 0);
}

Deno.test('2', async () => {
  assert(await sum(true) == 2);
});

if (import.meta.main) {
  console.log(await sum(false));
}
