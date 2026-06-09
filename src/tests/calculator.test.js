const { compute, toNumber } = require('../index');

describe('Calculator compute()', () => {
  test('addition: 2 + 3 = 5', () => {
    expect(compute('+', 2, 3)).toBe(5);
    expect(compute('add', 2, 3)).toBe(5);
  });

  test('subtraction: 10 - 4 = 6', () => {
    expect(compute('-', 10, 4)).toBe(6);
    expect(compute('subtract', 10, 4)).toBe(6);
  });

  test('multiplication: 45 * 2 = 90', () => {
    expect(compute('*', 45, 2)).toBe(90);
    expect(compute('x', 45, 2)).toBe(90);
    expect(compute('X', 45, 2)).toBe(90);
    expect(compute('multiply', 45, 2)).toBe(90);
  });

  test('division: 20 / 5 = 4', () => {
    expect(compute('/', 20, 5)).toBe(4);
    expect(compute('divide', 20, 5)).toBe(4);
  });

  test('division by zero throws', () => {
    expect(() => compute('/', 4, 0)).toThrow(/Division by zero/);
    expect(() => compute('divide', 4, 0)).toThrow(/Division by zero/);
  });

  test('unsupported operation throws', () => {
    expect(() => compute('%', 2, 2)).toThrow(/Unsupported operation/);
  });
});

describe('toNumber()', () => {
  test('parses numbers correctly', () => {
    expect(toNumber('3')).toBe(3);
    expect(toNumber('4.5')).toBe(4.5);
    expect(toNumber('0')).toBe(0);
  });

  test('invalid number throws', () => {
    expect(() => toNumber('abc')).toThrow(/Invalid number/);
  });
});
