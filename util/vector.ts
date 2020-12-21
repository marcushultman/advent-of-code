
export class vec2 {
  constructor(public x: number, public y: number) {}
  coords() {
    return [this.x, this.y];
  }
  add(v: vec2): vec2 {
    return new vec2(this.x + v.x, this.y + v.y);
  }
  sub(v: vec2): vec2 {
    return new vec2(this.x - v.x, this.y - v.y);
  }
  norm(): vec2 {
    const l = Math.sqrt(this.x * this.x + this.y * this.y);
    return new vec2(this.x / l, this.y / l);
  }
  mul(d: number): vec2 {
    return new vec2(this.x * d, this.y * d);
  }
  div(d: number): vec2 {
    return new vec2(this.x / d, this.y / d);
  }
}
