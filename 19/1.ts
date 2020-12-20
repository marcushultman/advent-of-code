import puzzle from '../util/puzzle.ts';

const [ruleSection, input] = await puzzle(import.meta).sections();

type Rule = (s: string, t: string[]) => boolean;

function test(s: string, [rule, ...rest]: string[]): boolean {
  if (!rule) {
    return !s.length;
  } else if (rule.startsWith('"')) {
    return s[0] === rule[1] && test(s.slice(1), rest);
  }
  return rules.get(rule)!(s, rest);
}

function makeEval(e: string) {
  return (s: string, rules: string[]) => !!e.split(' | ').find(or => test(s, or.split(' ').concat(rules)));
}

const rules = new Map<string, Rule>();
ruleSection.split('\n').forEach(line => {
  const [_, rule, expr] = line.match(/(\d+): (.*)/)!;
  rules.set(rule, makeEval(expr));
});

console.log(input.split('\n').reduce((a, b) => a + Number(rules.get('0')!(b, [])), 0));
