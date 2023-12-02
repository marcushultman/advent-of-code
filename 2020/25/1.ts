import puzzle from '../../util/puzzle.ts';

const publicKeys = await puzzle(import.meta, Deno.args.includes('--test')).map(Number);

function encrypt(subject: number, loop: number) {
  let value = 1;
  for (let i = 0; i < loop; ++i) {
    value *= subject;
    value = value % 20201227;
  }
  return value;
}

const LOG_7 = Math.log(7);

function findDirect(check: number) {
  return (Math.log(check) / LOG_7).toFixed(10) % 1 === 0 ? Math.round(Math.log(check) / LOG_7) : null;
}

function findLoops(check: number) {
  const seen = new Set();
  const queue = [[check, 0]];
  for (;;) {
    const [[check, loops]] = queue.splice(0, 1);
    if (seen.has(check)) {
      continue;
    }
    const direct = findDirect(check);
    if (direct) {
      return direct + loops;
    }
    seen.add(check);
    const candidates = [0, 1, 2, 3, 4, 5, 6, 7]
      .map(n => check + n * 20201227)
      .filter(n => n % 7 === 0)
      .map(n => n / 7);
    queue.push(...candidates.map(c => [c, loops + 1]));
  }
}

console.log(publicKeys);
const loopNrs = publicKeys.map(key => findLoops(key));
console.log(loopNrs);
console.log(encrypt(publicKeys[0], loopNrs[1]));
console.log(encrypt(publicKeys[1], loopNrs[0]));
