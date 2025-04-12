const { add, subtract, multiply, divide } = require('../src/index')

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3)
})

test('throws error for division by zero', () => {
  expect(() => divide(1, 0)).toThrowError('Division by zero')
})
