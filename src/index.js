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
    console.error(`Invalid number: ${s}`);
    process.exit(1);
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
        console.error('Error: Division by zero');
        process.exit(1);
      }
      return a / b;
    default:
      console.error(`Unsupported operation: ${operation}`);
      printHelp();
      process.exit(1);
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

if (!op || !aStr || !bStr) {
  // Interactive fallback
  const readline = require('readline');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  rl.question('Enter operation (add, -, *, /): ', (operation) => {
    rl.question('Enter first number: ', (aIn) => {
      rl.question('Enter second number: ', (bIn) => {
        const a = toNumber(aIn.trim());
        const b = toNumber(bIn.trim());
        const result = compute(operation.trim(), a, b);
        console.log(`Result: ${result}`);
        rl.close();
      });
    });
  });
} else {
  const a = toNumber(aStr);
  const b = toNumber(bStr);
  const result = compute(op, a, b);
  console.log(result);
}
