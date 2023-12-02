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
  insert({ grid, offset }: GridInsertion<T>) {
    grid.coords().forEach(({ item, x, y }) => {
      this.put(offset.x + x, offset.y + y, item);
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
  rows() {
    return range(this.height)
        .map(y => this.index(0, y))
        .map(i => this.data.slice(i, i + this.width).join(''));
  }
  toString() {
    return this.rows().join('\n');
  }
  coords() {
    return this.data.map((item, i) => ({ item, x: i % this.width, y: Math.floor(i / this.width) }));
  }
  shrink(x0: number, x1: number, y0: number, y1: number) {
    this.data.splice((this.height - y1) * this.width);
    this.data.splice(0, y0 * this.width);
    this.data = this.data.filter((_, i) => (i % this.width) >= x0 && (i % this.width) < (this.width - x1))
    this.width -= (x0 + x1);
  }
  transpose() {
    const old = this.clone();
    for (let x = 0; x < this.width; ++x) {
      for (let y = 0; y < this.height; ++y) {
        this.put(y, x, old.get(x, y)!);
      }
    }
  }
  flipHorizontal() {
    const old = this.clone();
    for (let x = 0; x < this.width; ++x) {
      for (let y = 0; y < this.height; ++y) {
        this.put(this.width - 1 - x, y, old.get(x, y)!);
      }
    }
  }
  flipVertical() {
    const old = this.clone();
    for (let x = 0; x < this.width; ++x) {
      for (let y = 0; y < this.height; ++y) {
        this.put(x, this.height - 1 - y, old.get(x, y)!);
      }
    }
  }
  static charGridFromLines(lines: string[]) {
    return this.fromLines(lines, line => [...line]);
  }
  static fromLines<T>(lines: string[], map: (s: string) => T[]): BoundedGrid<T> {
    return new BoundedGrid<T>(lines.map(map).flat(), lines.length ? lines[0].length : 0);
  }
}

export class UnboundedGrid<T> {
  constructor(private dimens: number, private data = new Map<string, T>()) {
  }
  private static index(c: number[]) {
    return c.join(',');
  }
  has(...c: number[]) {
    return this.data.has(UnboundedGrid.index(c));
  }
  get(...c: number[]) {
    return this.data.get(UnboundedGrid.index(c));
  }
  put(item: T, ...c: number[]): UnboundedGrid<T> {
    this.data.set(UnboundedGrid.index(c), item);
    return this;
  }
  delete(...c: number[]) {
    this.data.delete(UnboundedGrid.index(c));
    return this;
  }
  equals(other: UnboundedGrid<T>, eq = defaultEq) {
    const keys = [...this.data.keys()].sort();
    const otherKeys = [...other.data.keys()].sort();
    return keys.length === otherKeys.length &&
        keys.every((k, i) => eq(this.data.get(k)!, other.data.get(otherKeys[i])));
  }
  clone(clone = defaultClone) {
    return new UnboundedGrid(this.dimens, new Map([...this.data.entries()].map(([k, v]) => [k, clone(v)])));
  }
  toString() {
    return this.coords().join(',');
  }
  coords() {
    return [...this.data.entries()].map(([k, item]) => {
      return { item, c: k.split(',').map(Number) };
    });
  }
}
