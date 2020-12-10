import puzzle from '../util/puzzle.ts';

// const numbers = await puzzle(import.meta).numbers();
let numbers = await puzzle(import.meta).numbers();
numbers = numbers.sort((a, b) => a - b);

console.log(numbers);

let d1 = 0, d2 = 0, d3 = 0;

let jolt = 0;
while (numbers.length) {
  if (Number(numbers[0] === jolt + 1)) {
    d1++
    jolt += 1;
  } else if (Number(numbers[0] === jolt + 2)) {
    d2++
    jolt += 2;
  } else if (Number(numbers[0] === jolt + 3)) {
    d3++
    jolt += 3;
  }
  numbers.shift();
}
d3++
jolt += 3;

console.log({ d1, d3 }, d1 * d3, jolt);
