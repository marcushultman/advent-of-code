import { assert } from "std/assert/assert.ts";
import puzzle from "util/puzzle.ts";

export function calibrationValues(lines: string[]) {
  const isAlpha = (c: string) => /[0-9]/.test(c);
  return lines.map((line) => [...line])
    .map((chars) => [chars.find(isAlpha)!, chars.findLast(isAlpha)!])
    .map((alphas) => alphas.map((c) => parseInt(c, 10))).map(([a, b]) =>
      10 * a + b
    );
}

Deno.test("1", async () => {
  const lines = await puzzle(import.meta, true).strings();
  assert(calibrationValues(lines).reduce((a, b) => a + b, 0) === 142);
});

const lines = await puzzle(import.meta).strings();
console.log(calibrationValues(lines).reduce((a, b) => a + b, 0));
