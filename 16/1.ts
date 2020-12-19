import puzzle from '../util/puzzle.ts';

const [fieldsSection, ticket, nearbySection] = await puzzle(import.meta).sections();

const fields = fieldsSection
  .split('\n')
  .map(s => {
    const m = s.match(/(\w+):(.*)/)!;
    return m[2].split(' or ').map(p => p.split('-').map(Number));
  });

function holds(value: number) {
  return fields.some(field => field.some(([start, end]) => start <= value && value <= end));
}

const e = nearbySection
  .split('\n')
  .slice(1)
  .map(s => s.split(',').map(Number))
  .map(values => values.filter(v => !holds(v)))
  .flat()
  .reduce((a, b) => a + b, 0);

console.log(e);
