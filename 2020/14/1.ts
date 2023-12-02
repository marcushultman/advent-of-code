import puzzle from '../../util/puzzle.ts';

const lines = await puzzle(import.meta).strings();

function makeMask(line: string) {
  const [_, ms ] = line.match(/mask = (.*)/)!;  
  const or = BigInt(parseInt(ms.replaceAll('X', '0'), 2));
  const and = BigInt(parseInt(ms.replaceAll('X', '1'), 2));
  return { or, and };
}
  

const mem = new Map<number, bigint>();

let mask = { and: 0n, or: 0n };

for (const line of lines) {
  if (line.startsWith('mask')) {
    mask = makeMask(line);
    continue;
  }
  const [_, s1, s2] = line.match(/mem\[(\d+)\] = (\d+)/)!
  const value = BigInt(s2);
  mem.set(Number(s1), (value | mask.or) & mask.and);
}

console.log([...mem.values()].reduce((a, b) => a + b).toString());
