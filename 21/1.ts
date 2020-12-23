import puzzle from '../util/puzzle.ts';
import { union, intersection } from '../util/set.ts';

const foods = await puzzle(import.meta).map(line => {
  const [, a, b] = line.match(/(.*)\s\(contains (.*)\)/)!;
  return { ingredients: new Set(a.split(' ')), allergens: new Set(b.split(', ')) };
});
type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType[number];
type Food = ArrayElement<typeof foods>;

let all = new Set<string>();
const allergenMap = new Map<string, Set<string>>();

foods.forEach(food => (all = union(all, food.ingredients)));

foods.forEach(food => {
  food.allergens.forEach(allergen => {
    allergenMap.set(allergen, allergenMap.has(allergen)
      ? intersection(allergenMap.get(allergen)!, food.ingredients)
      : food.ingredients);
  });
});

for (const unique = new Set<string>(['']); unique.size;) {
  unique.clear();
  allergenMap.forEach(set => set.size === 1 && unique.add(set.values().next().value));
  allergenMap.forEach(set => unique.forEach(ingredient => set.delete(ingredient)));
  unique.forEach(ingredient => all.delete(ingredient));
}

function c(food: Food) {
  return [...food.ingredients.values()].filter(ingredient => all.has(ingredient)).length;
}

console.log(foods.reduce((count, food) => count + c(food), 0));