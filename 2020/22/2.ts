import puzzle from '../../util/puzzle.ts';

const playerSections = await puzzle(import.meta, Deno.args.includes('--test')).sections();
const players = playerSections.map(section => section.split('\n').slice(1).map(Number));
const total = players.reduce((sum, cards) => sum + cards.length, 0);

console.log(players, total);

function hash(players: number[][]) {
  return players.map(p => btoa(p.join())).join();
}

function play(players: number[][]): number {
  const prev = new Set<string>();
  while (players.every(p => p.length)) {
    const id = hash(players);
    if (prev.has(id)) {
      return 0;
    }
    prev.add(id);
    const p = players.map(p => p.shift()!);
    let player: number[];
    let cards: number[];
    if (players[0].length >= p[0] && players[1].length >= p[1]) {
      const index = play([players[0].slice(0, p[0]), players[1].slice(0, p[1])]);
      player = players[index];
      cards = index === 0 ? [p[0], p[1]] : [p[1], p[0]];
    } else {
      player = p[0] > p[1] ? players[0] : players[1];
      cards = [Math.max(p[0], p[1]), Math.min(p[0], p[1])];
    }
    player.push(...cards);
  }
  return players.findIndex(p => p.length);
}

const winner = players[play(players)];

console.log(winner.reduce((sum, score, i) => sum + score * (total - i), 0));

