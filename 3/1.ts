import inputStrings from "../util/load.ts";

const lines = await inputStrings(3);
const concat = [...lines.reduce((all, line) => all + line, '')];
const width = lines[0].length;

export function countTrees(right: number, down: number) {
  let trees = 0;
  for (let i = width; i < concat.length; i += (down * width) + right) {
    if (i % width < right) {
      i -= width;
    }
    trees += Number(concat[i] === '#');
  }
  return trees;
}

if (import.meta.main) {
  console.log(countTrees(3, 1));
}
