import puzzle from '../util/puzzle.ts';

const lines = await puzzle(import.meta).strings();

const eq = (a: string[][], b: string[][]) => {
  return a.map(l => l.join()).join() === b.map(l => l.join()).join();
}

function adj(a: string[][], i: number, j: number) {
  let adj = 0;
  for (const [u, v] of [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]]) {
    const o = a[i + u] && a[i + u][j + v];
    adj += o ? Number(o === '#') : 0;
  }
  return adj;
}

function round(input: string[][]) {
  const next = input.map(i => i.slice());
  for (let i = 0; i < input.length; ++i) {
    for (let j = 0; j < input[i].length; ++j) {
      if (input[i][j] === '.') {
        continue;
      }
      const f = adj(input, i, j);
      if (input[i][j] === 'L' && !f) {
        next[i][j] = '#';
      } else if (input[i][j] === '#' && f >= 4) {
        next[i][j] = 'L';
      }
    }
  }
  return next;
}

for (let prev = lines.map(l => [...l]), next;; prev = next) {
  next = round(prev);
  if (eq(prev, next)) {
    console.log(next.flat().reduce((sum, c) => sum + Number(c === '#'), 0));
    break;
  }
}
