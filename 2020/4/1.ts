import puzzle from '../../util/puzzle.ts';

const passports = (await puzzle(import.meta).sections()).map(s => s.split(/\s+/));

function isValid(passport: string[]) {
  const fields = ['byr','iyr','eyr','hgt','hcl','ecl','pid'];
  const pfields = passport.map(l => l.substr(0, l.indexOf(':')));
  return fields.every(f => pfields.includes(f));
}

console.log(passports.filter(isValid).length);
