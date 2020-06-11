const {intersect, flatMap} = require('../stdLib');

test('disjoint sets', () => {
  expect(intersect([1], [2])).toEqual([]);
});

test('matching sets', () => {
  expect(intersect([1, 2], [1, 2])).toEqual([1, 2]);
});

test('partial overlap', () => {
  expect(intersect([1, 2], [1])).toEqual([1]);
});

test('flat map an empty array', () => {
  expect(flatMap([], (x) => x)).toEqual([]);
});

test('flap map actually flattens results', () => {
  expect(flatMap([1, 2, 3], (x) => new Array(x).fill(x)))
    .toEqual([
      1,
      2, 2,
      3, 3, 3,
    ]);
});
