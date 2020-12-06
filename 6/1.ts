import puzzle from '../util/puzzle.ts';
import { map, reduce } from 'https://raw.githubusercontent.com/marcushultman/rxjs/deno-dist/operators/index.ts'

const sections = await puzzle(import.meta).sections();

const sectionCount = (s: string) => new Set(s.replace(/\n/g, '')).size;

console.log(sections.map(sectionCount).reduce((a, b) => a + b, 0));

puzzle(import.meta).rx.sections()
  .pipe(map(sectionCount), reduce((a, b) => a + b, 0))
  .subscribe(console.log);
