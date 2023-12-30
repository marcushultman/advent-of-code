import { assert } from 'std/assert/assert.ts';
import { parseCards } from './1.ts';

async function sum(test: boolean) {
  const cards = await parseCards(test);
  const copies = cards.slice();

  for (let j = 0; j < copies.length; ++j) {
    const { i, wins } = copies[j];
    for (let k = 0; k < wins; ++k) {
      copies.push(cards[i + k]);
    }
  }

  return copies.length;
}

Deno.test('1', async () => {
  assert(await sum(true) == 30);
});

if (import.meta.main) {
  console.log(await sum(false));
}
