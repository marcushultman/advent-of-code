import puzzle from '../../util/puzzle.ts';

const numbers = new Set(await puzzle(import.meta).numbers());
numbers.add(164);

const m = new Map<number, number>();

function count(jolt) {
  if (m.has(jolt)) {
    return m.get(jolt);
  } else if (!numbers.has(jolt)) {
    return Number(!jolt);
  }
  const a = count(jolt - 3) + count(jolt - 2) + count(jolt - 1);
  m.set(jolt, a);
  return a;
}

console.log(count(164))
