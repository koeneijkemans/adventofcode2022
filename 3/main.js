import run from "../runner.js";

const reference = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const partOne = (lines) => {
  const compartmentNumbers = lines
    .map((line) => {
      const compartments = [
        line.slice(0, line.length / 2),
        line.slice(line.length / 2),
      ];

      const numbers = compartments.map((c) =>
        [...c].map((l) => getPriorityFor(l))
      );

      return numbers[0].filter((n) => numbers[1].includes(n))[0];
    })
    .reduce((a, b) => a + b);

  console.log(compartmentNumbers);
};

const partTwo = (lines) => {
  const groupSize = 3;
  var groups = [];
  for (var i = 0; i < lines.length; i += groupSize) {
    groups = [...groups, [...lines.slice(i, i + groupSize)]];
  }

  const indexedGroups = groups.map((group) =>
    group.map((g) => [...g].map((l) => getPriorityFor(l)))
  );

  const patches = indexedGroups
    .map((group) => {
      return group[0]
        .filter((g) => group[1].includes(g))
        .filter((g) => group[2].includes(g))[0];
    })
    .reduce((a, b) => a + b);

  console.log(patches);
};

run(partTwo, "input");

const getPriorityFor = (char) => {
  return reference.indexOf(char) + 1;
};
