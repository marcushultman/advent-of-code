import puzzle from '../../util/puzzle.ts';
import { vec2 } from '../../util/vector.ts';
import { mat2 } from '../../util/matrix.ts';

const s = await puzzle(import.meta).map(s => ({ dir: s.slice(0, 1), amt: Number(s.slice(1)) }));

const DIR = {
  N: new vec2(0, -1),
  E: new vec2(1, 0),
  S: new vec2(0, 1),
  W: new vec2(-1, 0),
} as { [s: string]: vec2 };
const RL = { R: 1, L: -1 } as { [s: string]: number };

const { p } = s.reduce(({ p, d }, { dir, amt }) => {
  if (DIR[dir]) {
    p = p.add(DIR[dir].mul(amt));
  } else if (dir === 'F') {
    p = p.add(d.mul(amt));
  } else {
    d = mat2.fromRotation(RL[dir] * amt).rotate(d);
  }
  return { p, d };
}, { p: new vec2(0, 0), d: new vec2(1, 0) });

console.log(Math.abs(p.x) + Math.abs(p.y));
