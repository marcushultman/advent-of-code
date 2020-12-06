import puzzle from '../util/puzzle.ts';
import { intersection } from '../util/set.ts';

const sections = await puzzle(import.meta).sections();

const sectionCount = (s: string) => s.split('\n').map(s => new Set([...s])).reduce(intersection).size;

console.log(sections.map(sectionCount).reduce((a, b) => a + b, 0));
