import puzzle from '../util/puzzle.ts';
import solve from "./1.ts";

const numbers = await puzzle(import.meta).numbers();

for (let i = 0; i < numbers.length; ++i) {
  const a = numbers[i];
  const solved = solve(numbers.slice(i + 1, numbers.length), 2020 - a);
  if (solved) {
    const [b, c] = solved;
    console.log(a * b * c);
    break;
  }
}
