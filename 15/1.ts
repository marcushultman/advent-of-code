import puzzle from '../util/puzzle.ts';

const s = await puzzle(import.meta).string();
const start = s.split(',').map(Number);

const ages = new Map<number, number[]>();

start.forEach((n, i) => ages.set(n, [i]));

let turn = start.length;
let prev = start[turn - 1];
for (;; ++turn) {
  if ((ages.get(prev)?.length ?? 0) > 1) {
    const [a, b] = ages.get(prev)!;
    ages.set(prev = a - b, [turn, ...ages.get(a - b) ?? []]);
  } else {
    ages.set(prev = 0, [turn, ...(ages.get(0)!)]);
  }
  ages.set(prev, ages.get(prev)!.slice(0, 2));
  if (turn + 1 === 2020) {
    console.log(prev);
    break;
  }
}
