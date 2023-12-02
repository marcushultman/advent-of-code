import puzzle from '../../util/puzzle.ts';

const lines = await puzzle(import.meta).strings();

const tree = {} as { [bag: string]: { count: number, bag: string}[] };

function go(bag: string): number {
  return tree[bag].reduce((sum, { count, bag }) => sum + count * go(bag), 1);
}

if (import.meta.main) {
  lines.forEach(line => {
    const [_, bag, match] = line.match(/(.*) bags contain (.*)./) as string[];
    tree[bag] = [];
    if (match !== 'no other bags') {
      tree[bag] = [...match.matchAll(/(\d+) (.*?) bags?/g)].map(([_, c, bag]) => ({ count: Number(c), bag }));
    }
  });
  console.log(go('shiny gold') - 1);
}
