import { assert } from 'std/assert/assert.ts';
import { parseGames } from './1.ts';

async function sum(test: boolean) {
  const games = await parseGames(test);
  return games.map(({ max: [r, g, b] }) => r * g * b).reduce((sum, power) => sum + power, 0);
}

Deno.test('2', async () => {
  assert(await sum(true) == 2286);
});

if (import.meta.main) {
  console.log(await sum(false));
}
