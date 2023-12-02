import puzzle from '../../util/puzzle.ts';

const passports = (await puzzle(import.meta).sections()).map(s => s.split(/\s+/));

const between = (s: string, l: number, h: number) => {
  const n = Number(s);
  return l <= n && n <= h;
};

function isValid(passport: string[]) {
  const fields = [
    { name: 'byr', validate: (s: string) => between(s, 1920, 2002) },
    { name: 'iyr', validate: (s: string) => between(s, 2010, 2020) },
    { name: 'eyr', validate: (s: string) => between(s, 2020, 2030) },
    { name: 'hgt', validate: (s: string) => s.endsWith('cm')
        ? between(s.slice(0, -2), 150, 193)
        : between(s.slice(0, -2), 59, 76) },
    { name: 'hcl', validate: (s: string) => /^#[0-9a-f]{6}$/.test(s) },
    { name: 'ecl', validate: (s: string) => /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(s) },
    { name: 'pid', validate: (s: string) => /^[\d]{9}$/.test(s) },
  ];
  const pfields = passport.map(l => ({
    name: l.substr(0, l.indexOf(':')),
    value: l.substr(l.indexOf(':') + 1),
  }));
  for (const { name, validate } of fields) {
    const pfield = pfields.find(p => p.name === name);
    if (!pfield || !validate(pfield.value)) {
      return false;
    }
  }
  return true;
}

console.log(passports.filter(isValid).length);
