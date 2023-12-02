import puzzle from '../../util/puzzle.ts';

const lines = await puzzle(import.meta).strings();

const tree = {} as { [bag: string]: string[] };

function go(bag: string): boolean {
  return bag === 'shiny gold' || tree[bag].some(go);
}

if (import.meta.main) {
  lines.forEach(line => {
    const [_, bag, match] = line.match(/(.*) bags contain (.*)./) as string[];
    tree[bag] = [];
    if (match !== 'no other bags') {
      tree[bag] = [...match.matchAll(/\d+ (.*?) bags?/g)].map(([a, b]) => b);
    }
  });
  const found = Object.keys(tree).reduce((set, bag) => go(bag) ? set.add(bag) : set, new Set());
  console.log(found.size - 1);
}
