
function recurse(n: number): number[][] {
  const l = n > 1 ? recurse(n - 1) : [[]];
  return [...l.map(a => [-1, ...a]), ...l.map(a => [0, ...a]), ...l.map(a => [1, ...a])];
}
export default (d: number) => recurse(d).filter(c => !c.every(v => v === 0));
