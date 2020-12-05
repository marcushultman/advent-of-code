import inputStrings from "../util/load.ts";

export function bin(s: string, c: string, n: number): number {
  return s.length ? (s[0] === c ? 0 : n / 2 ) + bin(s.slice(1), c, n / 2) : 0;
}
export const seatId = (s: string) => bin(s.slice(0, 7), 'F', 128) * 8 + bin(s.slice(7), 'L', 8);

if (import.meta.main) {
  const lines = await inputStrings(5);
  console.log(lines.reduce((max, line) => Math.max(max, seatId(line)), 0));
}
