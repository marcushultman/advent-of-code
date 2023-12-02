import puzzle from '../../util/puzzle.ts';
import { extractPassword } from './common.ts';

const lines = await puzzle(import.meta).strings();

function isValid({ n1, n2, c, word }: ReturnType<typeof extractPassword>) {
  const d = [...word].map(q => Number(q === c)).reduce((s, i) => s + i, 0);
  return Number(n1 <= d && d <= n2);
}

console.log(lines.map(extractPassword).map(isValid).reduce((s, i) => s + i, 0));
