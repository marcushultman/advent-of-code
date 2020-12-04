import inputStrings from "../util/load.ts";
import { extractPassword } from "./common.ts";

const lines = await inputStrings(2);

function isValid({ n1, n2, c, word }: ReturnType<typeof extractPassword>) {
  return Number((word[n1 - 1] === c) !== (word[n2 - 1] === c));
}

console.log(lines.map(extractPassword).map(isValid).reduce((s, i) => s + i, 0));
