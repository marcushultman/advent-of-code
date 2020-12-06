import * as path from 'https://deno.land/std@0.79.0/path/mod.ts';
import { readLines, readStringDelim } from "https://deno.land/std@0.79.0/io/mod.ts";
import { from } from 'https://raw.githubusercontent.com/marcushultman/rxjs/deno-dist/index.ts'

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
  const rx = {
    lines: () => from(readLines(Deno.openSync(file))),
    numbers: () => from(readLines(Deno.openSync(file))),
    sections: (delim = '\n\n') => from(readStringDelim(Deno.openSync(file), delim)),
  };
  return { string, strings, numbers, sections, map, rx };
}
