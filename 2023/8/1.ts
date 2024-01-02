import { assert } from 'std/assert/assert.ts';
import puzzle from 'util/puzzle.ts';

async function parseMap(test: boolean) {
  const [steps, map] = await puzzle(import.meta, test).sections();
  return [
    [...steps].map((c) => 'LR'.indexOf(c)),
    Object.fromEntries(
      map.split('\n').map((l) =>
        [l.substring(0, 3), [l.substring(7, 10), l.substring(12, 15)]] as const
      ),
    ),
  ] as const;
}

async function steps(test: boolean) {
  const [steps, map] = await parseMap(test);

  let step = 'AAA', num = 0;
  while (step !== 'ZZZ') {
    step = map[step][steps[num % steps.length]];
    ++num;
  }
  return num;
}

Deno.test('1', async () => {
  assert(await steps(true) == 6);
});

if (import.meta.main) {
  console.log(await steps(false));
}
