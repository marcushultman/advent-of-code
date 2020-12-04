export function extractPassword(s: string) {
  const [_, s1, s2, c, word] = s.match(/(\d+)-(\d+)\s(\w):\s(\w+)/)!;
  const [n1, n2] = [s1, s2].map(Number);
  return { n1, n2, c, word };
}
