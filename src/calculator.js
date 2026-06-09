#!/usr/bin/env node
// CLI Calculator
// Supported operations:
//  - addition (add or +)
//  - subtraction (subtract or -)
//  - multiplication (multiply or *)
//  - division (divide or /)

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

// Export functions for tests and programmatic use
module.exports = { add, subtract, multiply, divide };

// --- CLI wrapper (preserve original behavior) ---
if (require.main === module) {
  const [,, op, ...args] = process.argv;

  function printUsage() {
    console.log(`Usage:
  node src/calculator.js add 2 3       # -> 5
  node src/calculator.js subtract 5 2  # -> 3
  node src/calculator.js multiply 4 6  # -> 24
  node src/calculator.js divide 10 2   # -> 5

Aliases supported: + - * /
Accepts two or more numeric arguments (for add/multiply can accept many).
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
      if (/division by zero/i.test(err.message)) process.exitCode = 3;
      else process.exitCode = 2;
    }
  }
}
