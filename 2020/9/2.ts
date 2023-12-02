import puzzle from '../util/puzzle.ts';

const numbers = await puzzle(import.meta).numbers();

if (import.meta.main) {
  for (let PRE = 2;; ++PRE) {
    for (let i = PRE; i < numbers.length; i++) {
      const tail = numbers.slice(i - PRE, i);
      if (tail.reduce((a, b) => a + b, 0) === 22477624) {
        console.log(tail.reduce((a, b) => Math.min(a, b)) + tail.reduce((a, b) => Math.max(a, b)));
        Deno.exit(0);
      }
    }
  }
}
