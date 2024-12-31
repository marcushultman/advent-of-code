import { fetchInput } from 'util/fetch.ts';
import { assertEquals } from 'jsr:@std/assert';
import { toLines } from 'jsr:@std/streams/unstable-to-lines';

function toReport(line: string) {
  return line.split(/\s+/).map(Number);
}

function isSafe(report: ReturnType<typeof toReport>) {
  const diffTest = report[0] < report.at(-1)!
    ? (d: number) => 1 <= d && d <= 3
    : (d: number) => -3 <= d && d <= -1;
  return report.every((n, i) => i === 0 || diffTest(n - report[i - 1]));
}

const EXAMPLE = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`.split('\n');

Deno.test('part 1 example', () => {
  assertEquals(EXAMPLE.map(toReport).filter(isSafe).length, 2);
});

Deno.test('part 1', async () => {
  const bytes = await fetchInput(import.meta);
  const lines = await Array.fromAsync(toLines(bytes));
  console.log(lines.map(toReport).filter(isSafe).length);
});
