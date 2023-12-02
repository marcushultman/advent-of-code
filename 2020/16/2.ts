import puzzle from '../../util/puzzle.ts';

const [fieldsSection, ticketSection, nearbySection] = await puzzle(import.meta, false).sections();

const fields = fieldsSection
  .split('\n')
  .map(s => {
    const m = s.match(/(.+):(.*)/)!;
    return { name: m[1], index: -1, ranges: m[2].split(' or ').map(p => p.split('-').map(Number)) };
  });


function fholds(ranges: number[][], value: number) {
  return ranges.some(([start, end]) => start <= value && value <= end);
}

function holds(value: number) {
  return fields.some(field => fholds(field.ranges, value));
}

const nearbyValid = nearbySection
  .split('\n')
  .slice(1)
  .map(s => s.split(',').map(Number))
  .filter(values => values.every(holds));

const rem = fields.slice();

while (rem.length) {
  for (let i = 0; i < fields.length; ++i) {
    const matching = rem.filter(field => nearbyValid.every(ticket => fholds(field.ranges, ticket[i])));
    if (matching.length === 1) {
      matching[0].index = i;
      rem.splice(rem.indexOf(matching[0]), 1);
    }
  }
}

const ticket = ticketSection.split('\n')[1].split(',').map(Number);

const n = fields.filter(field => field.name.startsWith('departure')).reduce((n, field) => n * ticket[field.index], 1);

console.log(n);
