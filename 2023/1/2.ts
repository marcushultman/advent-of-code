import puzzle from 'util/puzzle.ts';
import { assert } from 'std/assert/assert.ts';

const ALPHA = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

export function calibrationValues(lines: string[]) {
  const isAlpha = (c: string) => /[1-9]/.test(c);
  return lines
    .map((line) => {
      let a, b;
      while (a === undefined || b === undefined) {
        for (const [i, w] of ALPHA.entries()) {
          a = a ?? (line.startsWith(w) ? (i + 1) : undefined);
          b = b ?? (line.endsWith(w) ? (i + 1) : undefined);
        }
        a = a ?? (isAlpha(line[0]) ? parseInt(line[0], 10) : undefined);
        b = b ?? (isAlpha(line.at(-1)!) ? parseInt(line.at(-1)!, 10) : undefined);
        line = a === undefined ? line.slice(1) : line;
        line = b === undefined ? line.slice(0, -1) : line;
      }
      return 10 * a + b;
    });
}

Deno.test('2', async () => {
  const lines = await puzzle(import.meta, true).strings();
  assert(calibrationValues(lines).reduce((a, b) => a + b, 0) === 281);
});

const lines = await puzzle(import.meta).strings();
console.log(calibrationValues(lines).reduce((a, b) => a + b, 0));
