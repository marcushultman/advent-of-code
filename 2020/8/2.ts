import puzzle from '../util/puzzle.ts';

const oops = await puzzle(import.meta).map(l => {
  return { op : l.substr(0, 3), val: (l[4] === '-' ? -1 : 1) * Number(l.substr(5)) };
})

if (import.meta.main) {
  for (let start = 0; start < oops.length; ++start) {
    const ops = oops.map(({ op, val }) => ({ op, val}));
    if (ops[start].op === 'acc') {
      continue;
    } else {
      ops[start].op = ops[start].op == 'jmp' ? 'nop' : 'jmp';
    }
    let acc = 0;
    let pos = 0;
    const seen = new Set();
    for (;;) {
      seen.add(pos);
      if (ops[pos].op === 'acc') {
        acc += ops[pos].val;
      }
      pos += ops[pos].op === 'jmp' ? ops[pos].val : 1;
      if (pos === ops.length) {
        console.log(acc);
        Deno.exit(0);
      }
      if (seen.has(pos)) {
        break;
      }
    }
  }
}
