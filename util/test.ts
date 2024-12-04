export function testName(meta: ImportMeta) {
  const [year, day, test] = meta.url.split('/').slice(-3);
  return `${year} - Day ${day}: Part ${test.replace('.ts', '')}`;
}
