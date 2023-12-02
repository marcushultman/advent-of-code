import puzzle from '../util/puzzle.ts';
import { union, intersection } from '../util/set.ts';

const foods = await puzzle(import.meta).map(line => {
  const [, a, b] = line.match(/(.*)\s\(contains (.*)\)/)!;
  return { ingredients: new Set(a.split(' ')), allergens: new Set(b.split(', ')) };
});

const candidates = new Map<string, Set<string>>();

foods.forEach(food => {
  food.allergens.forEach(allergen => {
    candidates.set(allergen, candidates.has(allergen)
      ? intersection(candidates.get(allergen)!, food.ingredients)
      : food.ingredients);
  });
});

const allergens = new Map<string, string>();

for (const unique = new Set<string>(['']); unique.size;) {
  unique.clear();
  candidates.forEach((set, allergen) => {
    if (set.size === 1) {
      allergens.set(set.values().next().value, allergen);
      unique.add(set.values().next().value);
    }
  });
  candidates.forEach(set => unique.forEach(ingredient => set.delete(ingredient)));
}

const allergenList = [...allergens.entries()].sort((a, b) => a[1].localeCompare(b[1]));

console.log(allergenList.map(([ingredient]) => ingredient).join(','));
