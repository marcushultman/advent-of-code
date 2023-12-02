import puzzle from '../../util/puzzle.ts';

const lines = await puzzle(import.meta).strings();

function makeMask(line: string) {
  const [_, ms ] = line.match(/mask = (.*)/)!;

  const or = BigInt(parseInt(ms.replaceAll('X', '0'), 2));
  const and = BigInt(parseInt(ms.replaceAll('0', '1').replaceAll('X', '0'), 2));

  function rec(or: bigint, bits: bigint[]): bigint[] {
    if (!bits.length) return [or];
    return [
      ...rec(or | 1n << bits[0], bits.slice(1)),
      ...rec(or, bits.slice(1))
    ];  
  }
  const vo = [...ms].map((b,i) => ({b,i})).filter(({b}) => b === 'X').map(({ i }) => 35n - BigInt(i));
  const addrs = new Set(rec(0n, vo));
  return { or, and, addrs };
}

const mem = new Map<bigint, bigint>();

let mask = { or: 0n, and: 0n, addrs: new Set<bigint>() };

for (const line of lines) {
  if (line.startsWith('mask')) {
    mask = makeMask(line);
    continue;
  }
  const [_, s1, s2] = line.match(/mem\[(\d+)\] = (\d+)/)!
  const a = BigInt(s1);
  for (const addr of mask.addrs) {
    mem.set((addr | mask.or) | (a & mask.and), BigInt(s2));
  }
}

console.log([...mem.values()].reduce((a, b) => a + b).toString());
