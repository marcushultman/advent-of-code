import { assert } from 'std/assert/assert.ts';
import { AlmanacMap, locationForRange, parseAlmanac } from './1.ts';

function locationForSeedRange(seed: number, size: number, map: AlmanacMap) {
  return locationForRange('seed', seed, size, map);
}

async function lowestLocation(test: boolean) {
  const { seeds, map } = await parseAlmanac(test);

  let lowest = Infinity;
  for (let i = 0; i < seeds.length; i += 2) {
    const ranges = locationForSeedRange(seeds[i], seeds[i + 1], map);
    lowest = ranges.reduce((min, [start, _]) => Math.min(min, start), lowest);
  }
  return lowest;
}

Deno.test('2', async () => {
  assert(await lowestLocation(true) == 46);
});

if (import.meta.main) {
  console.log(await lowestLocation(false));
}
