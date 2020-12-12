const range = (length: number) => Array.from({ length }).map((u, i) => i);

const defaultEq = <T>(lhs: T, rhs: T) => lhs === rhs;
const defaultClone = <T>(item: T) => item;

interface GridInsertion<T> {
  grid: BoundedGrid<T>
  offset: { x: number, y: number };
}

export class BoundedGrid<T> {
  constructor(public data: T[] , public width: number, moved?: GridInsertion<T>) {
    moved && this.insert(moved);
  }
  public get height() {
    return this.data.length / this.width;
  }
  private get length() {
    return this.data.length;
  }
  private check(x: number, y: number) {
    return 0 <= x && x < this.width && 0 <= y && y < this.height;
  }
  private index(x: number, y: number) {
    return y * this.width + x;
  }
  private insert({ grid, offset }: GridInsertion<T>) {
    const copyRange = (start: number, arr: T[]) => this.data.splice(start, arr.length, ...arr);
    range(Math.min(this.height, offset.y, grid.height)).forEach(dy => {
      const start = grid.index(0, dy);
      const end = start + Math.min(this.width, offset.x + grid.width);
      copyRange(this.index(offset.y + dy, offset.x), grid.data.slice(start, end));
    });
  }

  get(x: number, y: number) {
    return this.check(x, y) ? this.data[this.index(x, y)] : undefined;
  }
  put(x: number, y: number, item: T): BoundedGrid<T> {
    this.check(x, y) && (this.data[this.index(x, y)] = item);
    return this;
  }
  equals(other: BoundedGrid<T>, eq = defaultEq) {
    return this.length === other.length && this.data.every((e, i) => eq(e, other.data[i]));
  }
  clone(clone = defaultClone) {
    return new BoundedGrid(this.data.map(clone), this.width);
  }
  toString() {
    return range(this.height)
        .map(y => this.index(0, y))
        .map(i => this.data.slice(i, i + this.width).join(''))
        .join('\n');
  }
  coords() {
    return this.data.map((item, i) => ({ item, x: i % this.width, y: Math.floor(i / this.width) }));
  }
  static charGridFromLines(lines: string[]) {
    return this.fromLines(lines, line => [...line]);
  }
  static fromLines<T>(lines: string[], map: (s: string) => T[]): BoundedGrid<T> {
    return new BoundedGrid<T>(lines.map(map).flat(), lines.length ? lines[0].length : 0);
  }
}
