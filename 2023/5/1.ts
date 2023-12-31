import { assert } from 'std/assert/assert.ts';
import puzzle from 'util/puzzle.ts';

export async function parseAlmanac(test: boolean) {
  const [seedSection, ...sections] = await puzzle(import.meta, test).sections();
  const seeds = seedSection.substring('seeds: '.length).split(' ').map((s) => parseInt(s));
  const map = Object.fromEntries(sections.map((s) => {
    const [a, b] = s.split(':', 2);
    const [src, _, dst] = a.slice(0, a.indexOf(' ')).split('-', 3);
    const ranges = b.trim().split('\n').map((s) => s.split(' ', 3).map((s) => parseInt(s)));
    ranges.sort((lhs, rhs) => lhs[1] - rhs[1]); // sort by src
    return [src, { dst, ranges }];
  }));
  return { seeds, map };
}

export type AlmanacMap = Awaited<ReturnType<typeof parseAlmanac>>['map'];

export function locationForRange(
  type: string,
  begin: number,
  size: number,
  map: AlmanacMap,
): [number, number][] {
  if (begin < 0 || size <= 0) {
    return [];
  } else if (type === 'location') {
    return [[begin, size]];
  }
  const { dst, ranges } = map[type];
  const overlaps = ranges.filter(([_, p, len]) => begin < p + len && p < begin + size);
  if (!overlaps.length) {
    return locationForRange(dst, begin, size, map);
  }
  const dstMap = new Map<number, number>();
  dstMap.set(begin, begin);
  const points = [
    begin,
    ...overlaps.flatMap(([dst, src, len]) => {
      const start = Math.max(0, begin - src);
      const end = Math.max(0, (src + len) - (begin + size));
      dstMap.set(src + start, dst + start);
      dstMap.set(src + len - end, src + len - end);
      return [src + start, src + len - end];
    }),
    begin + size,
  ].sort();
  dstMap.set(begin + size, begin + size);

  const locationRanges = [];
  for (let i = 0; i < points.length - 1; ++i) {
    locationRanges.push(
      ...locationForRange(dst, dstMap.get(points[i])!, points[i + 1] - points[i], map),
    );
  }
  return locationRanges;
}

function locationForSeed(seed: number, map: AlmanacMap) {
  const ranges = locationForRange('seed', seed, 1, map);
  return ranges[0][0];
}

function lowestLocationForSeeds(seeds: number[], map: AlmanacMap) {
  return seeds.map((seed) => locationForSeed(seed, map)).reduce((min, loc) => Math.min(min, loc));
}

async function lowestLocation(test: boolean) {
  const { seeds, map } = await parseAlmanac(test);
  return lowestLocationForSeeds(seeds, map);
}

Deno.test('1', async () => {
  assert(await lowestLocation(true) == 35);
});

if (import.meta.main) {
  console.log(await lowestLocation(false));
}
