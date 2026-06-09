const { add, subtract, multiply, divide, modulo, power, squareRoot } = require('../calculator');

describe('CLI calculator functions', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('division: 20 / 5 = 4', () => {
    expect(divide(20, 5)).toBe(4);
  });

  // Examples from image: extended operations
  test('modulo: 5 % 2 = 1', () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test('power: 2 ^ 3 = 8', () => {
    expect(power(2, 3)).toBe(8);
  });

  test('sqrt: sqrt(16) = 4', () => {
    expect(squareRoot(16)).toBe(4);
  });

  // previous extra tests
  test('modulo: 10 % 3 = 1', () => {
    expect(modulo(10, 3)).toBe(1);
  });

  test('power: 2 ^ 8 = 256', () => {
    expect(power(2, 8)).toBe(256);
  });

  test('sqrt: sqrt(9) = 3', () => {
    expect(squareRoot(9)).toBe(3);
  });

  test('addition with many args', () => {
    expect(add(1, 2, 3, 4)).toBe(10);
  });

  test('multiplication with many args', () => {
    expect(multiply(2, 3, 4)).toBe(24);
  });

  test('sequential subtraction', () => {
    expect(subtract(10, 2, 3)).toBe(5); // 10 - 2 - 3 = 5
  });

  test('sequential division', () => {
    expect(divide(100, 2, 5)).toBe(10); // 100 / 2 / 5 = 10
  });

  test('division by zero throws', () => {
    expect(() => divide(5, 0)).toThrow(/division by zero/i);
  });

  test('modulo by zero throws', () => {
    expect(() => modulo(5, 0)).toThrow(/modulo by zero/i);
  });

  test('sqrt negative throws', () => {
    expect(() => squareRoot(-4)).toThrow(/negative/i);
  });

  test('non-numeric input throws', () => {
    expect(() => add('a', 2)).toThrow(/non-numeric|requires at least/i);
  });
});
