import run from "../runner.js";

const partOne = (lines) => {
  var grid = [];
  const heightMap = "SabcdefghijklmnopqrstuvwxyzE";

  var startPosition = { x: 0, y: 0 };
  var targetPosition = { x: 0, y: 0 };

  const isAtPosition = (pos) =>
    pos.x == targetPosition.x && pos.y == targetPosition.y;

  const gridAtPosition = (x, y) =>
    x >= 0 && y >= 0 && x <= grid[0].length - 1 && y <= grid.length - 1
      ? grid[y][x]
      : null;

  const isAccessibleStep = (from, to) => {
    const fromElevation = gridAtPosition(from.x, from.y).elevation;
    const toElevation = gridAtPosition(to.x, to.y).elevation;

    return (
      fromElevation &&
      toElevation &&
      heightMap.indexOf(toElevation) - heightMap.indexOf(fromElevation) <= 1
    );
  };

  const getPossibleNextSteps = (position, nextPossibleSteps) => {
    var steps = [
      { x: position.x, y: position.y - 1 },
      { x: position.x, y: position.y + 1 },
      { x: position.x - 1, y: position.y },
      { x: position.x + 1, y: position.y },
    ];

    for (const step of steps) {
      const stepIsInsideGrid =
        step.x >= 0 &&
        step.y >= 0 &&
        step.x <= grid[0].length - 1 &&
        step.y <= grid.length - 1;

      if (!stepIsInsideGrid) continue;

      const isAccessible = isAccessibleStep(position, step);

      if (!isAccessible) continue;

      const isNotVisitedYet = grid[step.y][step.x].distance === -1;

      if (!isNotVisitedYet) continue;

      const notAddedAlready = !nextPossibleSteps.some(
        (p) => p.x === step.x && p.y === step.y
      );

      if (!notAddedAlready) continue;

      nextPossibleSteps.push(step);
    }
  };

  const doStep = (possibleSteps, currentSteps = 1) => {
    if (!possibleSteps.length) return;

    console.log(currentSteps, "Marking steps for round");
    for (var step of possibleSteps) {
      grid[step.y][step.x].distance = currentSteps;

      if (isAtPosition(step)) return;
    }

    var nextPossibleSteps = [];
    for (var step of possibleSteps) {
      getPossibleNextSteps(step, nextPossibleSteps);
    }

    console.log("number of next steps found:", nextPossibleSteps.length);

    doStep(nextPossibleSteps, currentSteps + 1);
  };

  grid = Array.from(Array(lines.length).keys()).map(() =>
    Array.from(Array(lines[0].length).keys()).map(() => "")
  );

  for (var y = 0; y < lines.length; y++) {
    var l = [...lines[y]];
    for (var x = 0; x < l.length; x++) {
      if (l[x] === "S") startPosition = { x, y };
      if (l[x] === "E") targetPosition = { x, y };

      grid[y][x] = { elevation: l[x], distance: l[x] === "S" ? 0 : -1 };
    }
  }
  console.log(
    lines.reduce((a, b) => a + "\n\r" + b),
    "\n\r"
  );

  const firstPossibleSteps = [];
  getPossibleNextSteps(startPosition, firstPossibleSteps);

  doStep(firstPossibleSteps);

  console.log(grid[targetPosition.y][targetPosition.x].distance);
};

const partTwo = (lines) => {
  var grid = [];
  const heightMap = "SabcdefghijklmnopqrstuvwxyzE";

  var startPositions = [];
  var targetPosition = { x: 0, y: 0 };

  const isAtPosition = (pos) =>
    pos.x == targetPosition.x && pos.y == targetPosition.y;

  const gridAtPosition = (x, y) =>
    x >= 0 && y >= 0 && x <= grid[0].length - 1 && y <= grid.length - 1
      ? grid[y][x]
      : null;

  const isAccessibleStep = (from, to) => {
    const fromElevation = gridAtPosition(from.x, from.y).elevation;
    const toElevation = gridAtPosition(to.x, to.y).elevation;

    return (
      fromElevation &&
      toElevation &&
      heightMap.indexOf(toElevation) - heightMap.indexOf(fromElevation) <= 1
    );
  };

  const getPossibleNextSteps = (position, nextPossibleSteps) => {
    var steps = [
      { x: position.x, y: position.y - 1 },
      { x: position.x, y: position.y + 1 },
      { x: position.x - 1, y: position.y },
      { x: position.x + 1, y: position.y },
    ];

    for (const step of steps) {
      const stepIsInsideGrid =
        step.x >= 0 &&
        step.y >= 0 &&
        step.x <= grid[0].length - 1 &&
        step.y <= grid.length - 1;

      if (!stepIsInsideGrid) continue;

      const isAccessible = isAccessibleStep(position, step);

      if (!isAccessible) continue;

      const isNotVisitedYet = grid[step.y][step.x].distance === -1;

      if (!isNotVisitedYet) continue;

      const notAddedAlready = !nextPossibleSteps.some(
        (p) => p.x === step.x && p.y === step.y
      );

      if (!notAddedAlready) continue;

      nextPossibleSteps.push(step);
    }
  };

  const doStep = (possibleSteps, currentSteps = 1) => {
    if (!possibleSteps.length) return;

    for (var step of possibleSteps) {
      grid[step.y][step.x].distance = currentSteps;

      if (isAtPosition(step)) return;
    }

    var nextPossibleSteps = [];
    for (var step of possibleSteps) {
      getPossibleNextSteps(step, nextPossibleSteps);
    }

    doStep(nextPossibleSteps, currentSteps + 1);
  };

  for (var y = 0; y < lines.length; y++) {
    var l = [...lines[y]];
    for (var x = 0; x < l.length; x++) {
      if (l[x] === "a") startPositions.push({ x, y });
      if (l[x] === "E") targetPosition = { x, y };
    }
  }

  console.log(
    lines.reduce((a, b) => a + "\n\r" + b),
    "\n\r"
  );

  var maxSteps = [];
  for (var startPosition of startPositions) {
    grid = Array.from(Array(lines.length).keys()).map(() =>
      Array.from(Array(lines[0].length).keys()).map(() => "")
    );

    for (var y = 0; y < lines.length; y++) {
      var l = [...lines[y]];
      for (var x = 0; x < l.length; x++) {
        grid[y][x] = {
          elevation: l[x],
          distance: -1,
        };
      }
    }
    grid[startPosition.y][startPosition.x].distance = 0;

    const firstPossibleSteps = [];
    getPossibleNextSteps(startPosition, firstPossibleSteps);

    doStep(firstPossibleSteps);

    maxSteps.push(grid[targetPosition.y][targetPosition.x].distance);
  }

  console.log(Math.min(...maxSteps.filter((a) => a > -1)));
};

run(partTwo, "input");
