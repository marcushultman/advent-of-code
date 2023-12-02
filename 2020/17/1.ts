import { UnboundedGrid } from "../../util/grid.ts";
import puzzle from '../../util/puzzle.ts';

function recurse(n: number): number[][] {
  const l = n > 1 ? recurse(n - 1) : [[]];
  return [...l.map(a => [-1, ...a]), ...l.map(a => [0, ...a]), ...l.map(a => [1, ...a])];
}
const N = (d: number) => recurse(d).filter(c => !c.every(v => v === 0));

function extend(a: UnboundedGrid<string>) {
  a.coords().forEach(({ c }) => N(3)
    .map((dc) => c.map((c, i) => c + dc[i]))
    .forEach(c => a.put(a.get(...c) || '.', ...c)));
  return a;
}

function adj(a: UnboundedGrid<string>, ...c: number[]) {
  return N(3)
    .reduce((adj, dc) => adj + Number(a.get(...c.map((c, i) => c + dc[i])) === '#'), 0);
}

function round(grid: UnboundedGrid<string>) {
  return grid.coords()
    .map(({ item, c }) => ({ item, c, adj: adj(grid, ...c) }))
    .reduce((next, { item, c, adj }) =>
      item === '#' && adj !== 2 && adj !== 3 && next.put('.', ...c) ||
      item === '.' && adj === 3 && next.put('#', ...c) ||
      next,
      extend(grid.clone()
)    );
}

let next = new UnboundedGrid<string>(3);
const charGrid = await puzzle(import.meta).charGrid();
charGrid.coords().forEach(c => next.put(c.item, c.x, c.y, 0));

extend(next);

for (let i = 0; i < 6; ++i) {
  next = round(next);
}

function active(grid: UnboundedGrid<string>) {
  return grid.coords().filter(c => c.item === '#').length;
}

const numActive = active(next);
console.log(numActive);
