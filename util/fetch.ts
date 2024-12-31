import 'jsr:@std/dotenv/load';

const AOC_SESSION = Deno.env.get('AOC_SESSION');

async function getSessionKey(req: Request) {
  const match = req.headers.get('cookie')?.match(/session=([^;]+)/);
  if (!match) {
    return;
  }
  const key = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(match[1]));
  return Array.from(new Uint8Array(key)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function fetchFromCache(req: Request) {
  const session = await getSessionKey(req);
  if (session) {
    const cache = await caches.open(session);
    return cache.match(req);
  }
}

async function cacheResponse(req: Request, res: Response) {
  const session = await getSessionKey(req);
  if (session) {
    const cache = await caches.open(session);
    await cache.put(req, res);
  }
}

export async function fetchCached(req: Request) {
  let res = await fetchFromCache(req);
  if (!res) {
    res = await fetch(req);
    res.ok && cacheResponse(req, res.clone());
  }
  return res;
}

function toYearAndDate(url: string) {
  const match = /\/(\d{4})\/(1|2)[\/\.]/.exec(url);
  if (!match) {
    throw new Error('solution not saved in <year>/<date>/');
  }
  return [Number(match[1]), Number(match[2])];
}

function assertExists(stream: ReadableStream<Uint8Array> | null): asserts stream {
  if (!stream) {
    throw new Error('body not set');
  }
}

export type ByteStream = ReadableStream<Uint8Array>;

export async function fetchInput(date?: Date): Promise<ByteStream>;
export async function fetchInput(meta: ImportMeta): Promise<ByteStream>;
export async function fetchInput(year: number, day: number): Promise<ByteStream>;
export async function fetchInput(arg0?: Date | ImportMeta | number, arg1?: number) {
  if (!AOC_SESSION) {
    throw new Error('session not provided');
  }
  arg0 = arg0 ?? new Date();
  const [year, day] = arg0 instanceof Date
    ? [arg0.getFullYear(), arg0.getDate()]
    : typeof arg0 !== 'number'
    ? toYearAndDate(arg0.url)
    : [arg0, arg1];
  const headers = { 'cookie': `session=${AOC_SESSION}` };
  const res = await fetchCached(
    new Request(`https://adventofcode.com/${year}/day/${day}/input`, { headers }),
  );
  assertExists(res.body);
  return res.body;
}
