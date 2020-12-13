import puzzle from '../util/puzzle.ts';
import chineseRemainder from '../util/crt.ts';

function findT(lines: string[]) {
  const deps = lines[1]
    .split(',')
    .map((a, b) => [a,b])
    .filter(([a]) => a !== 'x')
    .map(s => s.map(Number))
    .map(s => s.map(BigInt));
  return chineseRemainder(deps.map(([a, b]) => a-b), deps.map(([a]) => a)).toString();
}

console.log(findT(await puzzle(import.meta).strings()));
