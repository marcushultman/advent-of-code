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

//

const N = [new vec2(1, 0), new vec2(.5, 1), new vec2(-.5, 1), new vec2(-1, 0), new vec2(-.5, -1), new vec2(.5, -1)];

function expand(grid: UnboundedGrid<boolean>) {
  grid.coords().forEach(({ c }) => {
    const p = new vec2(...c as [number, number]);
    N.forEach(v => {
      grid.put(grid.get(...p.add(v).coords()) ?? false, ...p.add(v).coords());
    });
  });
}

function numBlackNeighborTiles(grid: UnboundedGrid<boolean>, p: vec2) {
  return N.reduce((sum, v) => sum + Number(grid.get(...p.add(v).coords()) ?? false), 0);
}

for (let day = 0; day < 100; ++day) {
  expand(grid);
  const old = grid.clone();
  old.coords().forEach(({ item, c }) => {
    const p = new vec2(...c as [number, number]);
    const n = numBlackNeighborTiles(old, p);
    if ((item && (n === 0 || n > 2)) || (!item && n === 2)) {
      grid.put(flip(item), ...p.coords());
    }
  });
}

console.log(grid.coords().reduce((sum, tile) => sum + Number(tile.item), 0));
