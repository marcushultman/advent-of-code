
export const intersection = <T>(a: Set<T>, b: Set<T>) => new Set([...a].filter(x => b.has(x)));
