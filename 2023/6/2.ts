import { assert } from 'std/assert/assert.ts';
import puzzle from 'util/puzzle.ts';
import { rootDiff } from './1.ts';

async function numberOfWays(test: boolean) {
  const lines = await puzzle(import.meta, test).strings();
  const [time, distance] = lines.map((l) => l.split(':')[1].replaceAll(' ', '')).map((s) =>
    parseInt(s)
  );
  return rootDiff(-1, time, -distance);
}

Deno.test('2', async () => {
  assert(await numberOfWays(true) == 71503);
});

if (import.meta.main) {
  console.log(await numberOfWays(false));
}
