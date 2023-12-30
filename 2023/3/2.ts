import { assert } from 'std/assert/assert.ts';
import { contains, parseMachine } from './1.ts';

async function sum(test: boolean) {
  const { boxes, symbols } = await parseMachine(test);
  const gearSymbols = symbols.filter((s) => s.c === '*');

  const adjGears = ({ l, x, y }: (typeof boxes)[0]) =>
    gearSymbols.flatMap((s, i) => contains(x - 1, y - 1, x + l, y + 1, s) ? [i] : []);

  const gears = boxes.reduce((parts, box) => {
    adjGears(box).map((i) => parts[i].push(box.n));
    return parts;
  }, gearSymbols.map(() => [] as number[])).filter((parts) => parts.length === 2);

  return gears.reduce((sum, [a, b]) => sum + a * b, 0);
}

Deno.test('2', async () => {
  assert(await sum(true) == 467835);
});

if (import.meta.main) {
  console.log(await sum(false));
}
