import run from "../runner.js";

const applyOperation = (operation, value) => {
  return Number(eval(operation.replaceAll("old", value)));
};

const applyModifier = (value) => {
  return Number(Math.floor(value / 3));
};

var mod = 1;
const parseMonkey = (line, index) => {
  var splitLine = line.split("\r\n");

  const startingItems = splitLine[1]
    .replace("Starting items: ", "")
    .split(",")
    .map(Number);

  const operation = splitLine[2].replace("Operation: new = ", "").trim();
  const divisibleBy = Number(splitLine[3].replace("Test: divisible by ", ""));
  const ifTrue = Number(splitLine[4].replace("If true: throw to monkey", ""));
  const ifFalse = Number(
    splitLine[5].replace("If false: throw to monkey ", "")
  );

  // side effect, bleh
  mod *= Number(splitLine[3].replace("Test: divisible by ", ""));

  return {
    monkey: index,
    startingItems,
    operation,
    divisibleBy,
    ifTrue,
    ifFalse,
    count: 0,
  };
};

const partOne = (lines) => {
  const monkeys = lines.map(parseMonkey);

  const numberOfOperations = 20;

  for (var i = 0; i < numberOfOperations; i++) {
    for (var k = 0; k < monkeys.length; k++) {
      const nextMonkey = monkeys[k];

      while (nextMonkey.startingItems.length > 0) {
        const nextValue = nextMonkey.startingItems.shift();

        const appliedValue = applyOperation(
          nextMonkey.operation,
          nextValue % mod
        );
        const modifiedValue = applyModifier(appliedValue);

        if (modifiedValue % nextMonkey.divisibleBy === 0) {
          monkeys[nextMonkey.ifTrue].startingItems.push(modifiedValue);
        } else {
          monkeys[nextMonkey.ifFalse].startingItems.push(modifiedValue);
        }

        nextMonkey.count++;
      }
    }
  }

  monkeys.sort((a, b) => (a.count > b.count ? -1 : a.count < b.count ? 1 : 0));

  console.log(monkeys[0].count * monkeys[1].count);
};

const partTwo = (lines) => {
  const monkeys = lines.map(parseMonkey);

  const numberOfOperations = 10000;

  for (var i = 0; i < numberOfOperations; i++) {
    for (var k = 0; k < monkeys.length; k++) {
      const nextMonkey = monkeys[k];

      while (nextMonkey.startingItems.length > 0) {
        const nextValue = nextMonkey.startingItems.shift();

        const appliedValue = applyOperation(
          nextMonkey.operation,
          nextValue % mod
        );

        if (appliedValue % nextMonkey.divisibleBy === 0) {
          monkeys[nextMonkey.ifTrue].startingItems.push(appliedValue);
        } else {
          monkeys[nextMonkey.ifFalse].startingItems.push(appliedValue);
        }

        nextMonkey.count++;
      }
    }
  }

  monkeys.sort((a, b) => (a.count > b.count ? -1 : a.count < b.count ? 1 : 0));
  console.log(monkeys[0].count * monkeys[1].count);
};

run(partTwo, "input", "\r\n\r\n");
