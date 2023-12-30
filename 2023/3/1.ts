import { assert } from 'std/assert/assert.ts';
import puzzle from 'util/puzzle.ts';

const isSymbol = (c: string) => c !== '.' && !/^\d$/.test(c);

function execAll(re: RegExp, str: string) {
  let match: RegExpExecArray | null;
  const matches: RegExpExecArray[] = [];
  while ((match = re.exec(str)) !== null) {
    match && matches.push(match);
  }
  return matches;
}

type C = { x: number; y: number };

export const contains = (x1: number, y1: number, x2: number, y2: number, c: C) =>
  x1 <= c.x && c.x <= x2 && y1 <= c.y && c.y <= y2;

export async function parseMachine(test: boolean) {
  const lines = await puzzle(import.meta, test).strings();
  const boxes = lines.flatMap((l, y) =>
    execAll(/\d+/g, l).map((m) => ({ n: parseInt(m[0]), l: m[0].length, x: m.index, y }))
  );
  const symbols = lines.flatMap((l, y) =>
    [...l].flatMap((c, x) => isSymbol(c) ? [{ c, x, y }] : [])
  );
  return { symbols, boxes };
}

async function sum(test: boolean) {
  const { boxes, symbols } = await parseMachine(test);
  const containsSymbol = ({ l, x, y }: (typeof boxes)[0]) =>
    symbols.some((s) => contains(x - 1, y - 1, x + l, y + 1, s));
  return boxes.filter(containsSymbol).reduce((sum, { n }) => sum + n, 0);
}

Deno.test('1', async () => {
  assert(await sum(true) == 4361);
});

if (import.meta.main) {
  console.log(await sum(false));
}
