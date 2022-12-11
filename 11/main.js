import run from "../runner.js";

const partOne = (lines) => {
  const applyOperation = (operation, value) => {
    return parseInt(eval(operation.replaceAll("old", value)));
  };

  const applyModifier = (value) => {
    return parseInt(Math.round(value / 3));
  };

  const parseMonkey = (line, index) => {
    var splitLine = line.split("\n");

    const startingItems = splitLine[1]
      .replace("Starting items: ", "")
      .split(",")
      .map(Number);

    const operation = splitLine[2].replace("Operation: new = ", "").trim();
    const divisibleBy = parseInt(
      splitLine[3].replace("Test: divisible by ", "")
    );
    const ifTrue = parseInt(
      splitLine[4].replace("If true: throw to monkey", "")
    );
    const ifFalse = parseInt(
      splitLine[5].replace("If false: throw to monkey ", "")
    );

    return {
      monkey: index,
      startingItems,
      operation,
      divisibleBy,
      ifTrue,
      ifFalse,
    };
  };

  const monkeys = lines.map(parseMonkey);

  const numberOfOperations = 1;

  for (var i = 0; i < numberOfOperations; i++) {
    for (var k = 0; k < monkeys.length; k++) {
      const nextMonkey = monkeys[k];

      while (nextMonkey.startingItems.length > 0) {
        const nextValue = nextMonkey.startingItems.shift();

        const appliedValue = applyOperation(nextMonkey.operation, nextValue);
        const modifiedValue = applyModifier(appliedValue);

        console.log(
          nextValue,
          nextMonkey.operation,
          appliedValue,
          modifiedValue
        );

        if (modifiedValue % nextMonkey.divisibleBy) {
          monkeys[nextMonkey.ifTrue].startingItems.push(modifiedValue);
        } else {
          monkeys[nextMonkey.ifFalse].startingItems.push(modifiedValue);
        }
      }
    }
  }

  console.log(monkeys);
};

run(partOne, "input.sample", "\n\n");
