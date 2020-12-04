import inputStrings from "../util/load.ts";
import { extractPassword } from "./common.ts";

const lines = await inputStrings(2);

function isValid({ n1, n2, c, word }: ReturnType<typeof extractPassword>) {
  const d = [...word].map(q => Number(q === c)).reduce((s, i) => s + i, 0);
  return Number(n1 <= d && d <= n2);
}

console.log(lines.map(extractPassword).map(isValid).reduce((s, i) => s + i, 0));
