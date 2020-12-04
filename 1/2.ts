import { inputNumbers } from "../util/load.ts";
import solve from "./1.ts";

const numbers = await inputNumbers(1);

for (let i = 0; i < numbers.length; ++i) {
  const a = numbers[i];
  const solved = solve(numbers.slice(i + 1, numbers.length), 2020 - a);
  if (solved) {
    const [b, c] = solved;
    console.log(a * b * c);
    break;
  }
}
