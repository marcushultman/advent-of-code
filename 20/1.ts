import { BoundedGrid, UnboundedGrid } from "../util/grid.ts";
import puzzle from '../util/puzzle.ts';
import genN from '../util/neighbor.ts';
import { vec2 } from '../util/vector.ts';

const toVec2 = (c: number[]) => new vec2(c[0], c[1]);
const N = genN(2).filter(e => Math.abs(e[0]) != Math.abs(e[1])).map(toVec2);

const sections = await puzzle(import.meta).sections()

class Tile {
  id: string;
  original: BoundedGrid<string>;
  grid: BoundedGrid<string>;

  constructor(s: string) {
    this.id = s.slice(5, s.indexOf('\n') - 1);
    this.original = BoundedGrid.charGridFromLines(s.split('\n').slice(1));
    this.grid = this.original;
  }
  resetTransform() {
    this.grid = this.original.clone();
  }
  setFlipped(flipV: boolean, flipH: boolean) {
    flipV && this.grid.flipVertical();
    flipH && this.grid.flipHorizontal();
  }
  setRotation(r: 0 | 90 | 180 | 270) {
    switch (r) {
      case 0:
        break;
      case 90:
        this.grid.transpose();
        this.grid.flipHorizontal();
        break;
      case 180:
        this.grid.transpose();
        this.grid.flipHorizontal();
        this.grid.transpose();
        this.grid.flipHorizontal();
        break;
      case 270:
        this.grid.transpose();
        this.grid.flipVertical();
        break;
    }
  }
}


const tiles = sections.map(s => new Tile(s));
const grid = new UnboundedGrid<Tile>(2);

grid.put(tiles.splice(0, 1)[0], 0, 0);

function matches(tile: Tile, other: Tile, edge: vec2): boolean {
  if (edge === N[0]) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].every(i => tile.grid.get(0, i) === other.grid.get(9, i));
  } else if (edge === N[1]) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].every(i => tile.grid.get(i, 0) === other.grid.get(i, 9));
  } else if (edge === N[2]) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].every(i => tile.grid.get(i, 9) === other.grid.get(i, 0));
  } else if (edge === N[3]) {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].every(i => tile.grid.get(9, i) === other.grid.get(0, i));
  }
  throw new Error();
}

function insert(pos: vec2, tile: Tile) {
  for (const edge of N) {
    const other = grid.get(...pos.add(edge).coords())!;
    if (!other) {
      continue;
    }
    let matched = false;
    for (const [flipV, flipH] of [[false, false], [true, false], [false, true], [true, true]]) {
      tile.resetTransform();
      tile.setFlipped(flipV, flipH);

      for (const rotation of [0, 90, 180, 270]) {
        tile.setRotation(rotation as 0 | 90 | 180 | 270);
        matched = matches(tile, other, edge);
        if (matched) {
          break;
        }
      }
      if (matched) {
        break;
      }
    }
    if (!matched) {
      return false;
    }
  }
  grid.put(tile, ...pos.coords());
  return true;
}

while (tiles.length) {
  const tile = tiles.splice(0, 1)[0];
  const inserted = grid
    .coords()
    .map(({ c }) => toVec2(c))
    .some(vec => N.some(n => !grid.has(...vec.add(n).coords()) && insert(vec.add(n), tile)));
  !inserted && tiles.push(tile);
}

type F = (...n: number[]) => number;
const g = (f: F, i: number) => grid.coords().reduce((n, { c }) => f(n, c[i]), 0);
const corners = [g(Math.min, 0), g(Math.max, 0), g(Math.min, 1), g(Math.max, 1)];

console.log(corners, grid);

const control = [
  grid.get(corners[0], corners[2])!.id,
  grid.get(corners[0], corners[3])!.id,
  grid.get(corners[1], corners[2])!.id,
  grid.get(corners[1], corners[3])!.id,
].reduce((a, b) => a * Number(b), 1);

console.log(control);
