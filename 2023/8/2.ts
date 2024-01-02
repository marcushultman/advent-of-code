import { assert } from 'std/assert/assert.ts';
import puzzle from 'util/puzzle.ts';

async function parseMap(test: boolean) {
  const [steps, map] = await puzzle(import.meta, test ? 'test2' : false).sections();
  return [
    [...steps].map((c) => 'LR'.indexOf(c)),
    Object.fromEntries(
      map.split('\n').map((l) =>
        [l.substring(0, 3), [l.substring(7, 10), l.substring(12, 15)]] as const
      ),
    ),
  ] as const;
}

type Map = Awaited<ReturnType<typeof parseMap>>[1];

function calc(start: string, steps: number[], map: Map) {
  const seen: string[] = [];
  const phases = [];
  let step = start, num = 0;
  for (;;) {
    const ins = num % steps.length;
    const seenIndex = seen.indexOf(step + ins);
    if (seenIndex >= 0) {
      return { period: seen.length - seenIndex, phases: phases };
    }
    if (step.endsWith('Z')) {
      phases.push(num);
    }
    seen.push(step + ins);
    step = map[step][steps[ins]];
    ++num;
  }
}

type Eq = ReturnType<typeof calc>;

const gcd = (a: number, b: number, c = 1, d = 0): [number, number] =>
  b == 0 ? [a, c] : gcd(b, a % b, d, c - Math.floor(a / b) * d);

async function minSteps(test: boolean) {
  const [steps, map] = await parseMap(test);

  const ghosts = Object.keys(map).filter((s) => s.endsWith('A')).map((s) => calc(s, steps, map));

  const firstPhase = ({ period, phases: [phase] }: Eq) => ({ period, phase });

  // loop madness - all combinations of all two-dimens arrays...
  for (let i = 0; i < ghosts.length; ++i) {
    for (let j = 0; j < ghosts[i].phases.length; ++j) {
      for (let k = 0; k < i; ++k) {
        for (let l = 0; l < ghosts[k].phases.length; ++l) {
          const eqs = [
            ...ghosts.slice(0, k).map(firstPhase),
            { period: ghosts[k].period, phase: ghosts[k].phases[l] },
            ...ghosts.slice(k + 1, i).map(firstPhase),
            { period: ghosts[i].period, phase: ghosts[i].phases[j] },
            ...ghosts.slice(i + 1).map(firstPhase),
          ];

          try {
            const { period, phase } = eqs.reduce((lhs, rhs) => {
              const [periodGCD, s] = gcd(lhs.period, rhs.period);

              const phaseDiff = rhs.phase - lhs.phase;
              if (phaseDiff % periodGCD !== 0) {
                throw new Error();
              }

              const period = lhs.period * rhs.period / periodGCD;
              const phase = (-lhs.phase - lhs.period * s * phaseDiff / periodGCD) % period;
              return { period, phase };
            });
            const start = -phase % period;
            return start ? start : period;
          } catch (_) {
            // ignore this eq setup
          }
        }
      }
    }
  }
  throw new Error();
}

Deno.test('2', async () => {
  assert(await minSteps(true) == 6);
});

if (import.meta.main) {
  console.log(await minSteps(false));
}
