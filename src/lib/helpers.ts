export const mostFrequent = <T, K extends PropertyKey>(
  arr: T[],
  mapFn: (x: T) => K = (x) => x as unknown as K
): K | null => {
  const frequencyMap = arr.reduce<Record<PropertyKey, number>>((a, v) => {
    const k = mapFn(v);
    a[k] = (a[k] ?? 0) + 1;
    return a;
  }, {} as Record<PropertyKey, number>);

  return Object.entries(frequencyMap).reduce<[K | null, number]>(
    (a, [k, v]) => (v >= a[1] ? [k as K, v] : a),
    [null, 0]
  )[0];
};