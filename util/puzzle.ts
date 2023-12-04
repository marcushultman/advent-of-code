import * as path from "std/path/mod.ts";
import { readLines, readStringDelim } from "std/io/mod.ts";
import { from } from "https://esm.sh/rxjs@7.8.1";
import { BoundedGrid } from "./grid.ts";

export default function puzzle(meta: ImportMeta, test = false) {
  const file = path.join(path.dirname(new URL(meta.url).pathname), test ? 'test' : 'input');
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
  const charGrid = async () => {
    return BoundedGrid.charGridFromLines(await strings());
  }
  const rx = {
    lines: () => from(readLines(Deno.openSync(file))),
    numbers: () => from(readLines(Deno.openSync(file))),
    sections: (delim = '\n\n') => from(readStringDelim(Deno.openSync(file), delim)),
  };
  return { string, strings, numbers, sections, map, charGrid, rx };
}
