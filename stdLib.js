function intersect<T>(a: $ReadOnlyArray<T>, b: $ReadOnlyArray<T>): $ReadOnlyArray<T> {
  const left = new Set(a);
  return b.filter(x => left.contains(x));
}

module.exports = {
  intersect,
};
