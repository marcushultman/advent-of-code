import puzzle from '../../util/puzzle.ts';

const circle = [...await puzzle(import.meta, Deno.args.includes('--test')).string()].map(Number);

function findDest(dest: number, circle: number[], cups: number[]): number {
  if (cups.includes(dest)) {
    return findDest(dest - 1, circle, cups);
  } else if (!circle.includes(dest)) {
    return circle.reduce((a, b) => Math.max(a, b));
  } else {
    return dest;
  }
}

for (let i = 0; i < 100; ++i){
  const cups = circle.splice(1, 3);
  const currentValue = circle[0];
  const dest = findDest(currentValue - 1, circle, cups);
  circle.splice(circle.indexOf(dest) + 1, 0, ...cups);
  circle.push(...circle.splice(0, circle.indexOf(currentValue) + 1));
}

circle.push(...circle.splice(0, circle.indexOf(1) + 1).slice(0, -1));
console.log(circle.join(''));

