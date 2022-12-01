import run from "../runner.js";

const sortCals = (data) => {
  const combinedCals = data.reduce(
    (curr, next) => {
      if (next) {
        curr[curr.length - 1] += parseInt(next);
        return curr;
      } else {
        return [...curr, 0];
      }
    },
    [0]
  );

  return combinedCals.sort((a, b) => {
    if (parseInt(a) > parseInt(b)) return -1;
    if (parseInt(a) < parseInt(b)) return 1;

    return 0;
  });
};

const partOne = (data) => {
  const sortedCalls = sortCals(data);

  console.log(
    `Elf with highest calorie count is carrying ${sortedCalls[0]} calories`
  );
};

const partTwo = (data) => {
  const sortedCalls = sortCals(data);

  console.log(
    `Top 3 elves are carrying ${sortedCalls
      .slice(0, 3)
      .reduce((a, b) => parseInt(a) + parseInt(b))} calories`
  );
};

run(partOne, "input");
