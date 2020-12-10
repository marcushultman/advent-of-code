import puzzle from '../util/puzzle.ts';

// 220

let numbersa = await puzzle(import.meta).numbers();
// numbers = new Set(numbers.sort((a, b) => a - b));
let numbers = new Set(numbersa);

const m = new Map<number, number>();
m.set(0, 1);
m.set(1, 1);
m.set(2, 2);
m.set(3, 4);

function arr(jolt) {
  if (m.has(jolt)) {
    return m.get(jolt);
  }
  let a = 0;
  if (numbers.has(jolt - 3)) {
    a += (arr(jolt - 3));
  }
  if (numbers.has(jolt - 2)) {
    a += (arr(jolt - 2));
  }
  if (numbers.has(jolt - 1)) {
    a += (arr(jolt - 1));
  }
  m.set(jolt, a);
  return a;
}

console.log(arr(164))
