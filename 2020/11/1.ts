import type { BoundedGrid } from "../../util/grid.ts";
import puzzle from '../../util/puzzle.ts';

function adj(a: BoundedGrid<string>, x: number, y: number) {
  return [[-1,-1],[0,-1],[1,-1],[-1,0],[1,0],[-1,1],[0,1],[1,1]]
    .reduce((adj, [dx, dy]) => adj + Number(a.get(x + dx, y + dy) === '#'), 0);
}

function round(grid: BoundedGrid<string>) {
  return grid.coords()
    .filter(({ item }) => item !== '.')
    .map(({ item, x, y }) => ({ item, x, y, adj: adj(grid, x, y) }))
    .reduce((next, { item, x, y, adj }) =>
      item === 'L' && !adj && next.put(x, y, '#') ||
      item === '#' && adj >= 4 && next.put(x, y, 'L') ||
      next,
      grid.clone()
    );
}

for (let prev = await puzzle(import.meta).charGrid(), next;; prev = next) {
  next = round(prev);
  if (prev.equals(next)) {
    console.log(next.data.reduce((sum, c) => sum + Number(c === '#'), 0));
    break;
  }
}
