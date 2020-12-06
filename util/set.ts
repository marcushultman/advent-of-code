
export const union = <T>(a: Set<T>, b: Set<T>) => new Set([...a, ...b]);
export const intersection = <T>(a: Set<T>, b: Set<T>) => new Set([...a].filter(x => b.has(x)));
export const complement = <T>(a: Set<T>, b: Set<T>) => new Set([...a].filter(x => !b.has(x)));
export const symDiff = <T>(a: Set<T>, b: Set<T>) => new Set([...complement(a, b), ...complement(b, a)]);
