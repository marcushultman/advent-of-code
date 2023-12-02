import puzzle from '../../util/puzzle.ts';

export default function solve(numbers: number[], num: number, set = new Set()) {
  const a = numbers.find(a => set.has(num - a) || (set.add(a), 0));
  return a ? [a, num - a] : null;
}

if (import.meta.main) {
  const [a, b] = solve(await puzzle(import.meta).numbers(), 2020)!;
  console.log(a * b);
}
