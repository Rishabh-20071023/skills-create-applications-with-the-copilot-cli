#!/usr/bin/env node

// Simple CLI Calculator
// Supported operations: add (+), subtract (-), multiply (x or *), divide (÷ or /)
// Usage examples:
//   node src/index.js add 2 3
//   node src/index.js + 10 4
//   node src/index.js divide 9 3

const [,, op, aStr, bStr] = process.argv;

function toNumber(s) {
  const n = Number(s);
  if (Number.isNaN(n)) {
    throw new Error(`Invalid number: ${s}`);
  }
  return n;
}

function compute(operation, a, b) {
  switch (operation) {
    case 'add':
    case '+':
      return a + b;
    case 'subtract':
    case '-':
      return a - b;
    case 'multiply':
    case 'x':
    case 'X':
    case '*':
      return a * b;
    case 'divide':
    case '÷':
    case '/':
      if (b === 0) {
        throw new Error('Division by zero');
      }
      return a / b;
    default:
      throw new Error(`Unsupported operation: ${operation}`);
  }
}

function printHelp() {
  console.log('Simple CLI Calculator');
  console.log('Supported operations: add (+), subtract (-), multiply (x or *), divide (÷ or /)');
  console.log('Usage: node src/index.js <operation> <numberA> <numberB>');
  console.log('Examples:');
  console.log('  node src/index.js add 2 3');
  console.log('  node src/index.js * 4 5');
}

// Export for testing
module.exports = { toNumber, compute };

// CLI behavior (preserve original UX)
if (require.main === module) {
  if (!op || !aStr || !bStr) {
    // Interactive fallback
    const readline = require('readline');
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

    rl.question('Enter operation (add, -, *, /): ', (operation) => {
      rl.question('Enter first number: ', (aIn) => {
        rl.question('Enter second number: ', (bIn) => {
          try {
            const a = toNumber(aIn.trim());
            const b = toNumber(bIn.trim());
            const result = compute(operation.trim(), a, b);
            console.log(`Result: ${result}`);
          } catch (err) {
            console.error(err.message);
            process.exit(1);
          }
          rl.close();
        });
      });
    });
  } else {
    try {
      const a = toNumber(aStr);
      const b = toNumber(bStr);
      const result = compute(op, a, b);
      console.log(result);
    } catch (err) {
      console.error(err.message);
      printHelp();
      process.exit(1);
    }
  }
}
