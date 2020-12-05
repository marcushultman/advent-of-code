import * as path from 'https://deno.land/std@0.79.0/path/mod.ts';

export default function puzzle(meta: ImportMeta) {
  const file = path.join(path.dirname(new URL(meta.url).pathname), 'input');
  const string = () => Deno.readTextFile(file);
  const strings = async () => {
    return (await string()).split('\n');
  };
  const numbers = async () => {
    return (await strings()).map(s => parseInt(s, 10));
  };
  const sections = async () => {
    return (await string()).split(/\n\n+/);
  };
  const map = async <T>(f: (line: string) => T) => {
    return (await strings()).map(f);
  }
  return { string, strings, numbers, sections, map };
}
