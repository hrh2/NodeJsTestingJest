// math_functions.test.js
const { add, subtract } = require('../../intro/math_functions');

/*
test('adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
});

test('subtracts 5 - 2 to equal 3', () => {
    expect(subtract(5, 2)).toBe(3);
});

 */

// more advanced Way
const operands = [
    [5, 2],
    [10, 5],
    [-1, -1],
    [0, 0],
    [10, -5]
];

describe('Addition function', () => {
    test.each(operands)('adds %i + %i', (a, b) => {
        expect(add(a, b)).toBe(a + b);
    });
});

describe('Subtraction function', () => {
    test.each(operands)('subtracts %i - %i ', (a, b) => {
        expect(subtract(a, b)).toBe(a - b);
    });
});
