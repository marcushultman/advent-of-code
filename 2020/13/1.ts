import puzzle from '../../util/puzzle.ts';

const lines = await puzzle(import.meta).strings();
const [t, deps] = [Number(lines[0]), lines[1].split(',').filter(id => id !== 'x').map(Number)]

const ranks = deps.map(id => ({ id, diff: id - (t % id) }));
ranks.sort((a, b) => a.diff - b.diff);

console.log(ranks[0].diff * ranks[0].id);
