import { assert } from 'std/assert/assert.ts';
import puzzle from 'util/puzzle.ts';
import { intersection } from 'util/set.ts';

export async function parseCards(test: boolean) {
  const lines = await puzzle(import.meta, test).strings();
  return lines.map((line) => {
    const i = parseInt(line.substring(5));
    const [a, b] = line.split(':', 2)[1].split('|').map((s) =>
      new Set(s.match(/.../g)?.map((s) => parseInt(s)).sort())
    );
    const wins = intersection(a, b).size;
    return { i, wins };
  });
}

async function sum(test: boolean) {
  const numbers = await parseCards(test);
  return numbers.reduce((sum, { wins }) => {
    return sum + (wins ? 1 << wins - 1 : 0);
  }, 0);
}

Deno.test('1', async () => {
  assert(await sum(true) == 13);
});

if (import.meta.main) {
  console.log(await sum(false));
}
