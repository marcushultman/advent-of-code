import puzzle from '../../util/puzzle.ts';

const ops = await puzzle(import.meta, false).map(l => {
  return { op : l.substr(0, 3), val: (l[4] === '-' ? -1 : 1) * Number(l.substr(5)) };
})

if (import.meta.main) {
  let acc = 0;
  let pos = 0;
  const seen = new Set([pos]);
  for (;;) {
    seen.add(pos);
    if (ops[pos].op === 'acc') {
      acc += ops[pos].val;
    }
    pos += ops[pos].op === 'jmp' ? ops[pos].val : 1;
    if (seen.has(pos)) {
      break;
    }
  }
  console.log(acc);
}
