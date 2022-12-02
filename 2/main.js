import run from "../runner.js";

const points = {
  rock: 1,
  paper: 2,
  scissor: 3,
};

const partOne = (lines) => {
  const result = lines
    .map((line) => {
      const input = line.split(" ");

      const gameResult = game(
        inputFromValue(input[1]),
        inputFromValue(input[0])
      );

      return {
        pick: inputFromValue(input[1]),
        result: gameResult,
      };
    })
    .reduce((cur, next) => {
      return cur + points[next.pick] + next.result;
    }, 0);

  console.log(result);
};

const partTwo = (lines) => {
  const result = lines
    .map((line) => {
      const input = line.split(" ");

      const myPick = pickFromResult(inputFromValue(input[0]), input[1]);

      const gameResult = game(myPick, inputFromValue(input[0]));

      return {
        pick: myPick,
        result: gameResult,
      };
    })
    .reduce((cur, next) => {
      return cur + points[next.pick] + next.result;
    }, 0);

  console.log(result);
};

const inputFromValue = (input) => {
  if (input === "A" || input === "X") return "rock";
  if (input === "B" || input === "Y") return "paper";
  if (input === "C" || input === "Z") return "scissor";
};

const pickFromResult = (opponent, result) => {
  const WIN = "Z";
  const DRAW = "Y";
  const LOSE = "X";

  if (opponent === "rock") {
    if (result === WIN) return "paper";
    if (result === DRAW) return "rock";
    if (result === LOSE) return "scissor";
  }

  if (opponent === "paper") {
    if (result === WIN) return "scissor";
    if (result === DRAW) return "paper";
    if (result === LOSE) return "rock";
  }

  if (opponent === "scissor") {
    if (result === WIN) return "rock";
    if (result === DRAW) return "scissor";
    if (result === LOSE) return "paper";
  }
};

const game = (playerOne, playerTwo) => {
  if (playerOne === "rock") {
    if (playerTwo === "rock") return 3;
    if (playerTwo === "paper") return 0;
    if (playerTwo === "scissor") return 6;
  }

  if (playerOne === "paper") {
    if (playerTwo === "rock") return 6;
    if (playerTwo === "paper") return 3;
    if (playerTwo === "scissor") return 0;
  }

  if (playerOne === "scissor") {
    if (playerTwo === "rock") return 0;
    if (playerTwo === "paper") return 6;
    if (playerTwo === "scissor") return 3;
  }
};

run(partTwo, "input");
