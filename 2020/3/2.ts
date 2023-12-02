import { countTrees } from './1.ts';

const p = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
console.log(p.reduce((p, [right, down]) => p * countTrees(right, down), 1));
