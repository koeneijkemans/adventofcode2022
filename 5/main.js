import run from "../runner.js";

const partOne = (lines) => {
  var stackLines = [];
  var operationLines = [];
  var numberOfStacks = 0;

  var parsingStackLines = true;
  for (var i = 0; i < lines.length; i++) {
    const currentLine = lines[i];

    if (!currentLine) {
      parsingStackLines = false;
      continue;
    }

    if (!numberOfStacks && currentLine.indexOf("]") < 0) {
      numberOfStacks = currentLine
        .split(" ")
        .map(Number)
        .filter((a) => a > 0)
        .pop();
      continue;
    }

    if (parsingStackLines) stackLines = [...stackLines, currentLine];
    else operationLines = [...operationLines, currentLine];
  }

  var stacks = [];

  for (var i = 0; i < numberOfStacks; i++) stacks.push(new Array());

  for (var i = 0; i < stackLines.length; i++) {
    const currentLine = stackLines[i];
    for (var k = 0; k < numberOfStacks; k++) {
      const startIndex = k * 4;
      const endIndex = k * 4 + 4;

      const currentStackItem = currentLine
        .substring(startIndex, endIndex)
        .trim()
        .replace("[", "")
        .replace("]", "");

      if (currentStackItem) stacks[k].push(currentStackItem);
    }
  }

  for (var i = 0; i < operationLines.length; i++) {
    const currentLine = operationLines[i];
    const numbers = currentLine
      .split(" ")
      .map(Number)
      .filter((a) => a);

    const amountToMove = numbers[0];
    const source = numbers[1] - 1;
    const target = numbers[2] - 1;

    for (var k = 0; k < amountToMove; k++) {
      const nextItem = stacks[source].shift();

      stacks[target].unshift(nextItem);
    }
  }

  console.log(
    stacks.reduce((cur, nex) => cur + nex[0]),
    ""
  );
};

const partTwo = (lines) => {
  var stackLines = [];
  var operationLines = [];
  var numberOfStacks = 0;

  var parsingStackLines = true;
  for (var i = 0; i < lines.length; i++) {
    const currentLine = lines[i];

    if (!currentLine) {
      parsingStackLines = false;
      continue;
    }

    if (!numberOfStacks && currentLine.indexOf("]") < 0) {
      numberOfStacks = currentLine
        .split(" ")
        .map(Number)
        .filter((a) => a > 0)
        .pop();
      continue;
    }

    if (parsingStackLines) stackLines = [...stackLines, currentLine];
    else operationLines = [...operationLines, currentLine];
  }

  var stacks = [];

  for (var i = 0; i < numberOfStacks; i++) stacks.push(new Array());

  for (var i = 0; i < stackLines.length; i++) {
    const currentLine = stackLines[i];
    for (var k = 0; k < numberOfStacks; k++) {
      const startIndex = k * 4;
      const endIndex = k * 4 + 4;

      const currentStackItem = currentLine
        .substring(startIndex, endIndex)
        .trim()
        .replace("[", "")
        .replace("]", "");

      if (currentStackItem) stacks[k].push(currentStackItem);
    }
  }

  for (var i = 0; i < operationLines.length; i++) {
    const currentLine = operationLines[i];
    const numbers = currentLine
      .split(" ")
      .map(Number)
      .filter((a) => a);

    const amountToMove = numbers[0];
    const source = numbers[1] - 1;
    const target = numbers[2] - 1;

    const itemsToShift = [];
    for (var k = 0; k < amountToMove; k++) {
      const nextItem = stacks[source].shift();

      itemsToShift.push(nextItem);
    }

    stacks[target].unshift(...itemsToShift);
  }

  console.log(
    stacks.reduce((cur, nex) => cur + nex[0]),
    ""
  );
};

run(partTwo, "input");
