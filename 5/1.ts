import inputStrings from "../util/load.ts";

export const seatId = (s: string) => parseInt([...s].map(c => 'FBLR'.indexOf(c) & 1).join(''), 2);

if (import.meta.main) {
  const lines = await inputStrings(5);
  console.log(lines.reduce((max, line) => Math.max(max, seatId(line)), 0));
}
