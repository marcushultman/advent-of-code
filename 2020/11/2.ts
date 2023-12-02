import puzzle from '../../util/puzzle.ts';

const lines = await puzzle(import.meta).strings();

const eq = (a: string[][], b: string[][]) => {
  return a.map(l => l.join()).join() === b.map(l => l.join()).join();
}

function adj(a: string[][], i: number, j: number) {
  let adj = 0;
  for (const [u, v] of [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]]) {
    for (let o = 1; ; ++o) {
      const c = a[i + u * o] && a[i + u * o][j + v * o];
      if (!c || c === '#' || c === 'L') {
        adj += Number(c === '#');
        break;
      }
    }
  }
  return adj;
}

function round(input: string[][]) {
  const b = input.map(i => i.slice());
  for (let i = 0; i < input.length; ++i) {
    for (let j = 0; j < input[i].length; ++j) {
      if (input[i][j] === '.') {
        continue;
      }
      const f = adj(input, i, j);
      if (input[i][j] === 'L' && !f) {
        b[i][j] = '#';
      }
      if (input[i][j] === '#' && f >= 5) {
        b[i][j] = 'L';
      }
    }
  }
  return b;
}

for (let prev = lines.map(l => [...l]), next;; prev = next) {
  next = round(prev);
  if (eq(prev, next)) {
    console.log(next.flat().reduce((sum, c) => sum + Number(c === '#'), 0));
    break;
  }
}
