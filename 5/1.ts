import puzzle from '../util/puzzle.ts';

export const seatId = (s: string) => parseInt([...s].map(c => 'FBLR'.indexOf(c) & 1).join(''), 2);

if (import.meta.main) {
  const ids = await puzzle(import.meta).map(seatId);
  console.log(ids.reduce((a, b) => Math.max(a, b), 0));
}
