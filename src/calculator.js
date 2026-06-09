#!/usr/bin/env node
// CLI Calculator
// Supported operations:
//  - addition (add or +)
//  - subtraction (subtract or -)
//  - multiplication (multiply or *)
//  - division (divide or /)
//  - modulo (modulo or %)
//  - exponentiation/power (power or pow)
//  - square root (sqrt)

// Pure functions exported for testing and reuse
function add(...nums) {
  if (nums.length < 2) throw new Error('add requires at least two numeric arguments');
  if (nums.some(n => Number.isNaN(Number(n)))) throw new Error('add received non-numeric argument');
  return nums.reduce((s, n) => s + Number(n), 0);
}

function subtract(...nums) {
  if (nums.length < 2) throw new Error('subtract requires at least two numeric arguments');
  if (nums.some(n => Number.isNaN(Number(n)))) throw new Error('subtract received non-numeric argument');
  const numbers = nums.map(Number);
  return numbers.slice(1).reduce((acc, n) => acc - n, numbers[0]);
}

function multiply(...nums) {
  if (nums.length < 2) throw new Error('multiply requires at least two numeric arguments');
  if (nums.some(n => Number.isNaN(Number(n)))) throw new Error('multiply received non-numeric argument');
  return nums.map(Number).reduce((p, n) => p * n, 1);
}

function divide(...nums) {
  if (nums.length < 2) throw new Error('divide requires at least two numeric arguments');
  if (nums.some(n => Number.isNaN(Number(n)))) throw new Error('divide received non-numeric argument');
  const numbers = nums.map(Number);
  if (numbers.slice(1).some(n => n === 0)) throw new Error('division by zero');
  return numbers.slice(1).reduce((acc, n) => acc / n, numbers[0]);
}

function modulo(a, b) {
  if (arguments.length !== 2) throw new Error('modulo requires exactly two numeric arguments');
  if (Number.isNaN(Number(a)) || Number.isNaN(Number(b))) throw new Error('modulo received non-numeric argument');
  const x = Number(a);
  const y = Number(b);
  if (y === 0) throw new Error('modulo by zero');
  return x % y;
}

function power(base, exponent) {
  if (arguments.length !== 2) throw new Error('power requires exactly two numeric arguments');
  if (Number.isNaN(Number(base)) || Number.isNaN(Number(exponent))) throw new Error('power received non-numeric argument');
  return Math.pow(Number(base), Number(exponent));
}

function squareRoot(n) {
  if (arguments.length !== 1) throw new Error('squareRoot requires exactly one numeric argument');
  if (Number.isNaN(Number(n))) throw new Error('squareRoot received non-numeric argument');
  const x = Number(n);
  if (x < 0) throw new Error('square root of negative number');
  return Math.sqrt(x);
}

// Export functions for tests and programmatic use
module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot };

// --- CLI wrapper (preserve original behavior) ---
if (require.main === module) {
  const [,, op, ...args] = process.argv;

  function printUsage() {
    console.log(`Usage:
  node src/calculator.js add 2 3         # -> 5
  node src/calculator.js subtract 5 2    # -> 3
  node src/calculator.js multiply 4 6    # -> 24
  node src/calculator.js divide 10 2     # -> 5
  node src/calculator.js modulo 10 3     # -> 1
  node src/calculator.js power 2 8       # -> 256
  node src/calculator.js sqrt 9          # -> 3

Aliases supported: + - * / % pow ^ sqrt
Note: 'sqrt' accepts a single numeric argument.
`);
  }

  if (!op) {
    printUsage();
    process.exitCode = 1;
  } else {
    const opNormalized = op.toLowerCase();

    try {
      let result;
      switch (opNormalized) {
        case 'add':
        case '+':
          result = add(...args);
          break;
        case 'subtract':
        case '-':
          result = subtract(...args);
          break;
        case 'multiply':
        case '*':
        case 'x':
        case '×':
          result = multiply(...args);
          break;
        case 'divide':
        case '/':
          result = divide(...args);
          break;
        case 'modulo':
        case 'mod':
        case '%':
          result = modulo(...args);
          break;
        case 'power':
        case 'pow':
        case '^':
          result = power(...args);
          break;
        case 'sqrt':
        case 'squareroot':
          result = squareRoot(...args);
          break;
        case 'help':
        case '--help':
        case '-h':
          printUsage();
          process.exit(0);
        default:
          console.error(`Unknown operation: ${op}`);
          printUsage();
          process.exitCode = 4;
      }

      if (result !== undefined) console.log(result);
    } catch (err) {
      console.error('Error:', err.message);
      if (/division by zero|modulo by zero/i.test(err.message)) process.exitCode = 3;
      else process.exitCode = 2;
    }
  }
}
