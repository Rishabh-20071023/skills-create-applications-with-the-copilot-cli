#!/usr/bin/env node
// CLI Calculator
// Supported operations:
//  - addition (add or +)
//  - subtraction (subtract or -)
//  - multiplication (multiply or *)
//  - division (divide or /)

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
  return;
}

const opNormalized = op.toLowerCase();
const nums = args.map(a => Number(a));

if (nums.length < 2 || nums.some(n => Number.isNaN(n))) {
  console.error('Error: provide at least two numeric arguments.');
  printUsage();
  process.exitCode = 2;
  return;
}

let result;
switch (opNormalized) {
  case 'add':
  case '+':
    // addition: sum all arguments
    result = nums.reduce((s, n) => s + n, 0);
    break;
  case 'subtract':
  case '-':
    // subtraction: subtract subsequent args from the first
    result = nums.slice(1).reduce((acc, n) => acc - n, nums[0]);
    break;
  case 'multiply':
  case '*':
  case 'x':
  case '×':
    // multiplication: product of all args
    result = nums.reduce((p, n) => p * n, 1);
    break;
  case 'divide':
  case '/':
    // division: divide the first by each of the following sequentially
    if (nums.slice(1).some(n => n === 0)) {
      console.error('Error: division by zero is not allowed.');
      process.exitCode = 3;
      break;
    }
    result = nums.slice(1).reduce((acc, n) => acc / n, nums[0]);
    break;
  case 'help':
  case '--help':
  case '-h':
    printUsage();
    process.exitCode = 0;
    process.exit();
  default:
    console.error(`Unknown operation: ${op}`);
    printUsage();
    process.exitCode = 4;
}

if (result !== undefined) {
  // Print result to stdout
  console.log(result);
}
