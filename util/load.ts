export default async function inputStrings(day: number) {
  const s = await Deno.readTextFile(`${day.toString()}/input`);
  return s.split('\n');
}

export async function inputNumbers(day: number) {
  const s = await inputStrings(day);
  return s.map(s => parseInt(s, 10));
}
