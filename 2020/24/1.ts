import puzzle from '../../util/puzzle.ts';
import { UnboundedGrid } from '../../util/grid.ts';
import { vec2 } from '../../util/vector.ts';

const lines = await puzzle(import.meta, Deno.args.includes('--test')).map(l => [...l]);

const grid = new UnboundedGrid<boolean>(2);

const coord = {
  e: new vec2(1, 0),
  se: new vec2(.5, 1),
  sw: new vec2(-.5, 1),
  w: new vec2(-1, 0),
  nw: new vec2(-.5, -1),
  ne: new vec2(.5, -1),
} as { [s: string]: vec2 };

function nextInner(line: string[], n: number, p: vec2) {
  return coord[line.splice(0, n).join('')];
}

function next(line: string[], p: vec2) {
  if (!line.length) {
    return null;
  } else if (line[0] === 'e' || line[0] === 'w') {
    return nextInner(line, 1, p);
  } else if (line[0] === 's' || line[0] === 'n') {
    return nextInner(line, 2, p);
  } else {
    throw new Error();
  }
}

function flip(v?: boolean) {
  return !(v ?? false);
}

for (const line of lines) {
  let p = new vec2(0, 0);
  for (let v = next(line, p); v; v = next(line, p)) {
    p = p.add(v);
  }
  grid.put(flip(grid.get(...p.coords())), ...p.coords());
}

const numBlack = grid.coords().reduce((sum, tile) => sum + Number(tile.item), 0);
console.log(numBlack);

