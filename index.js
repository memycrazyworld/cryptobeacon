function add(a, b) {
  return a + b
}

function subtract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero')
  }
  return a / b
}

const _ = require('lodash')

function sum(numbers) {
  // Use lodash's `_.sum` for efficient array summation
  return _.sum(numbers)
}

function average(numbers) {
  const total = sum(numbers)
  return total / numbers.length
}

// Usage example
const numbers = [2, 4, 6, 8]
const avg = average(numbers)
console.log(avg)

const validator = require('validator')

function calculateArea(length, width) {
  if (
    !validator.isNumeric(length.toString()) ||
    !validator.isNumeric(width.toString())
  ) {
    throw new Error(
      'Invalid input: Please provide numbers for length and width.'
    )
  }

  const area = length * width
  return area
}

// Usage example (with potential error handling)
try {
  const result = calculateArea(5, 3)
  console.log(result) // Output: 15
} catch (error) {
  console.error(error.message)
}

module.exports = {
  add,
  subtract,
  multiply,
  divide,
}
