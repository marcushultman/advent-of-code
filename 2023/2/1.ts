import { assert } from 'std/assert/assert.ts';
import puzzle from 'util/puzzle.ts';

type C = [number, number, number];
const zero = (): C => [0, 0, 0];

function parseCount(s: string) {
  const [n, c] = s.trim().split(' ', 2);
  const r = zero();
  r[c.charCodeAt(0) % 3] += parseInt(n);
  return r;
}

const sumC = ([r, g, b]: C, [x, y, z]: C): C => [r + x, g + y, b + z];
const maxC = (
  [r, g, b]: C,
  [x, y, z]: C,
): C => [Math.max(r, x), Math.max(g, y), Math.max(b, z)];

function sumGroup(s: string) {
  return s.trim().split(',').map(parseCount).reduce(sumC);
}

export async function parseGames(test: boolean) {
  const lines = await puzzle(import.meta, test).strings();
  return lines.map((line) => {
    const i = parseInt(line.substring(5));
    const max = line.split(':', 2)[1].trim().split(';').map(sumGroup).reduce(maxC);
    return { i, max };
  });
}

async function sum(test: boolean) {
  const games = await parseGames(test);
  const matchingGames = games.filter(({ max: [r, g, b] }) => r <= 12 && g <= 13 && b <= 14);
  return matchingGames.reduce((sum, { i }) => sum + i, 0);
}

Deno.test('1', async () => {
  assert(await sum(true) == 8);
});

if (import.meta.main) {
  console.log(await sum(false));
}
