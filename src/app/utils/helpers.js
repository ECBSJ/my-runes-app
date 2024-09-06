export const mostFrequent = (arr, mapFn = x => x) =>
  Object.entries(
    arr.reduce((a, v) => {
      const k = mapFn(v)
      a[k] = (a[k] ?? 0) + 1
      return a
    }, {})
  ).reduce((a, v) => (v[1] >= a[1] ? v : a), [null, 0])[0]
