// @flow

function intersect<T>(
  a: $ReadOnlyArray<T>,
  b: $ReadOnlyArray<T>
): $ReadOnlyArray<T> {
  const left = new Set(a);
  return b.filter((x) => left.has(x));
}

function flatMap<T, R>(
  a: $ReadOnlyArray<T>,
  f: (T) => $ReadOnlyArray<R>
): $ReadOnlyArray<R> {
  const ret = [];
  a.forEach((x) => {
    f(x).forEach((y) => ret.push(y));
  });

  return ret;
}

module.exports = {
  intersect,
  flatMap,
};
