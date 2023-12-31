import { assert } from 'std/assert/assert.ts';
import puzzle from 'util/puzzle.ts';

function getType(hand: string, withJokers: boolean) {
  const c = [...hand].toSorted();
  const counts = c.reduce((m, c) => (m.set(c, (m.get(c) ?? 0) + 1), m), new Map<string, number>());
  const jokers = counts.get('J');
  if (withJokers && jokers !== undefined) {
    counts.delete('J');
    const highest = [...counts.entries()].toSorted((lhs, rhs) => lhs[1] - rhs[1]).at(-1);
    if (!highest) {
      return [5, 1]; // all jokers
    }
    counts.set(highest[0], highest[1] + jokers);
  }
  return [[...counts.values()].toSorted().at(-1)!, counts.size] as const;
}

function tieBreak(h1: string, h2: string, ranks: string) {
  for (let i = 0; i < h1.length; ++i) {
    if (h1[i] !== h2[i]) {
      return ranks.indexOf(h1[i]) - ranks.indexOf(h2[i]);
    }
  }
  throw new Error();
}

export async function parseHands(test: boolean, withJokers = false) {
  const lines = await puzzle(import.meta, test).strings();
  return lines.map((l) => l.split(' ')).map(([hand, bid]) =>
    [hand, ...getType(hand, withJokers), parseInt(bid)] as const
  );
}

export async function winnings(test: boolean, withJokers: boolean, ranks: string) {
  const hands = await parseHands(test, withJokers);
  hands.sort(([h1, p1, n1, _1], [h2, p2, n2, _2]) =>
    p1 !== p2 ? p1 - p2 : n1 !== n2 ? n2 - n1 : tieBreak(h1, h2, ranks)
  );
  return hands.map((t) => t[3]).reduce((p, bid, i) => p + bid * (i + 1), 0);
}

const RANKS = '23456789TJQKA';

Deno.test('1', async () => {
  assert(await winnings(true, false, RANKS) == 6440);
});

if (import.meta.main) {
  console.log(await winnings(false, false, RANKS));
}
