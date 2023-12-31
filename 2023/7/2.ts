import { assert } from 'std/assert/assert.ts';
import { winnings } from './1.ts';

const RANKS = 'J23456789TQKA';

Deno.test('2', async () => {
  assert(await winnings(true, true, RANKS) == 5905);
});

if (import.meta.main) {
  console.log(await winnings(false, true, RANKS));
}
