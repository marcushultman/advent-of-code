import puzzle from '../util/puzzle.ts';

const PRE = 25;
const numbers = await puzzle(import.meta).numbers();

function sums(n: number[]) {
  const sums = new Set();
  for (let i = 0; i < n.length; i++) {
    for (let j = 0; j < n.length; j++) {
      if (i !== j) {
        sums.add(n[i] + n[j]);
      }
    }
  }
  return sums;
}

if (import.meta.main) {
  for (let i = PRE; i < numbers.length; i++) {
    if (!sums(numbers.slice(i - PRE, i)).has(numbers[i])) {
      console.log(numbers[i]);
      break;
    }
  }
}
