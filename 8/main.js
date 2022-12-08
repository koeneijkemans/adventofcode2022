import run from "../runner.js";

const partOne = (lines) => {
  var grid = [];

  for (var i = 0; i < lines.length; i++) {
    grid = [...grid, [...lines[i]]];
  }

  var numberOfTreesVisible = grid.length * 2 + grid[0].length * 2 - 4;
  for (var i = 1; i < grid.length - 1; i++) {
    for (var k = 1; k < grid[i].length - 1; k++) {
      const currentTree = parseInt(grid[i][k]);
      var up = [];
      var down = [];
      var left = [];
      var right = [];

      for (var l = 0; l < i; l++) {
        up.push(grid[l][k]);
      }

      for (var l = i + 1; l < grid.length; l++) {
        down.push(grid[l][k]);
      }

      for (var l = k + 1; l < grid.length; l++) {
        right.push(grid[i][l]);
      }

      for (var l = 0; l < k; l++) {
        left.push(grid[i][l]);
      }
      const surroundingTrees = [up, down, right, left];

      if (
        surroundingTrees.some((trees) =>
          trees.every((tree) => {
            return currentTree > tree;
          })
        )
      ) {
        numberOfTreesVisible++;
      }
    }
  }

  console.log(numberOfTreesVisible);
};

const partTwo = (lines) => {
  var grid = [];

  for (var i = 0; i < lines.length; i++) {
    grid = [...grid, [...lines[i]]];
  }

  var highest = 0;
  for (var i = 1; i < grid.length - 1; i++) {
    for (var k = 1; k < grid[i].length - 1; k++) {
      const currentTree = parseInt(grid[i][k]);
      var up = [];
      var down = [];
      var left = [];
      var right = [];

      for (var l = 0; l < i; l++) {
        up.push(grid[l][k]);
      }

      for (var l = i + 1; l < grid.length; l++) {
        down.push(grid[l][k]);
      }

      for (var l = k + 1; l < grid.length; l++) {
        right.push(grid[i][l]);
      }

      for (var l = 0; l < k; l++) {
        left.push(grid[i][l]);
      }
      const surroundingTrees = [up.reverse(), down, left.reverse(), right];

      var visibleInSight = [];
      for (var l = 0; l < surroundingTrees.length; l++) {
        const nextLineOfSight = surroundingTrees[l];

        var lineOfSightVisible = 0;
        for (var m = 0; m < nextLineOfSight.length; m++) {
          const nextTreeInSight = parseInt(nextLineOfSight[m]);
          if (currentTree > nextTreeInSight) {
            lineOfSightVisible++;
          } else {
            lineOfSightVisible++;
            break;
          }
        }

        visibleInSight = [...visibleInSight, lineOfSightVisible];
      }

      const newPossibleHighest = visibleInSight
        .filter((f) => f)
        .reduce((a, b) => a * b, 1);

      if (newPossibleHighest > highest) highest = newPossibleHighest;
    }
  }

  console.log(highest);
};

run(partTwo, "input");
