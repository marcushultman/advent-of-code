
function mulInv(a: bigint, b: bigint){
  const b0 = b;
  let x0 = 0n;
  let x1 = 1n;

  if (b == 1n) {
    return 1n;
  }

  while (a > 1n) {
    const q = a / b;
    const amb = a % b;
    a = b;
    b = amb;

    const xqx = x1 - q * x0;
    x1 = x0;
    x0 = xqx;
  }

  if (x1 < 0n) {
    x1 += b0;
  }

  return x1;
}

export default function chineseRemainder(a: bigint[], n: bigint[]){
  const prod = n.reduce((a, b) => a * b, 1n);

  let sm = 0n;
  for (let i = 0; i < n.length; i++) {
    const p = prod / BigInt(n[i]);
    sm += BigInt(a[i]) * mulInv(p, BigInt(n[i]))*p;
  }

  return sm % prod;
}
