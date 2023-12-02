import { vec2 } from './vector.ts';

function toRad(deg: number) {
  return deg * (Math.PI / 180);
}

export class mat2 {
  constructor(
    private x0y0: number,
    private x1y0: number,
    private x0y1: number,
    private x1y1: number) {}
  
  static fromRotation(deg: number) {
    const r = toRad(deg);
    return new mat2(Math.cos(r), -Math.sin(r), Math.sin(r), Math.cos(r));
  }
  static fromFlip(flipV: boolean, flipH: boolean) {
    return new mat2(flipH ? -1 : 1, 0, 0, flipV ? -1 : 1);
  }
  
  rotate(v: vec2): vec2 {
    return new vec2(
      Math.round(this.x0y0 * v.x + this.x1y0 * v.y),
      Math.round(this.x0y1 * v.x + this.x1y1 * v.y)
    );
  }
  apply(v: vec2): vec2 {
    return new vec2(
      Math.round(this.x0y0 * v.x + this.x1y0 * v.y),
      Math.round(this.x0y1 * v.x + this.x1y1 * v.y)
    );
  }
}
