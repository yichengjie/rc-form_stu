let sum = require('../src/common/sum.js') ;
//import sum from '../src/common/sum.js' ;

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
})

