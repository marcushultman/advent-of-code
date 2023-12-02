import puzzle from '../util/puzzle.ts';

class Node {
  public next?: Node;
  constructor(public value: number) {}
}

const nodes = [...await puzzle(import.meta, Deno.args.includes('--test')).string()]
  .map(Number)
  .map(n => new Node(n));
nodes.reduce((prev, node) => (prev.next = node));

const start = nodes[0];
let current = nodes[0];

let prev = nodes[nodes.length - 1];
for (let i = 10; i <= 1000000; ++i) {
  prev.next = new Node(i);
  prev = prev.next;
}
prev.next = start;

const entries = new Map<number, Node>();
for (let node = start; !entries.has(1000000); node = node.next!) {
  entries.set(node.value, node);
}

function findNode(start: Node, v: number) {
  for (let node = start;; node = node.next) {
    if (node.value === v) {
      return node;
    } else if (!node.next) {
      return null;
    }
  }
}

function findDest(dest: number, cups: Node): number {
  if (findNode(cups, dest)) {
    return findDest(dest - 1, cups);
  } else if (dest === 0) {
    return 1000000;
  } else {
    return dest;
  }
}

for (let i = 0; i < 10000000; ++i){
  // const cups = circle.splice(1, 3);
  const cups = current.next!;
  current.next = cups.next!.next!.next!;
  cups.next!.next!.next = undefined;

  const currentValue = current.value;

  // circle.splice(circle.indexOf(dest) + 1, 0, ...cups);
  const destValue = findDest(currentValue - 1, cups);
  const dest = findNode(entries.get(destValue)!, destValue)!;
  const next = dest.next!;
  dest.next = cups;
  cups.next!.next!.next = next;

  // circle.push(...circle.splice(0, circle.indexOf(currentValue) + 1));
  current = current.next!;
}

const n = entries.get(1);
console.log(n.next!.value, n.next!.next!.value);
console.log(n.next!.value * n.next!.next!.value);

