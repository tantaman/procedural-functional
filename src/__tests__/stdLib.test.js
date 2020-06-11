const {intersect} = require('../stdLib');

test('disjoint sets', () => {
  expect(intersect([1], [2])).toEqual([]);
});

test('matching sets', () => {
  expect(intersect([1, 2], [1, 2])).toEqual([1, 2]);
});

test('partial overlap', () => {
  expect(intersect([1, 2], [1])).toEqual([1]);
});
