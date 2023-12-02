import puzzle from '../../util/puzzle.ts';

const playerSections = await puzzle(import.meta).sections();
const players = playerSections.map(section => section.split('\n').slice(1).map(Number));
const total = players.reduce((sum, cards) => sum + cards.length, 0);

console.log(players, total);

while (players.every(p => p.length)) {
  const p = players.map(p => p.shift()!);
  const player = p[0] > p[1] ? players[0] : players[1];
  player.push(Math.max(p[0], p[1]), Math.min(p[0], p[1]));
}

console.log(players.find(p => p.length)?.reduce((sum, score, i) => sum + score * (total - i), 0));
