import run from "../runner.js";

const partOne = (lines) => {
  var positionOfHead = { x: 0, y: 0 };
  var positionOfTail = { x: 0, y: 0 };

  var positionsTailVisited = [positionOfTail];

  const moveTail = (direction, currentPosition, positionOfHead) => {
    if (tailTouchesHead(positionOfHead, currentPosition))
      return currentPosition;

    var next = move(direction, currentPosition);

    const diagonalMove = needsDiagonalMove(direction, positionOfHead, next);

    if (diagonalMove) {
      next = move(diagonalMove, next);
    }

    return next;
  };

  const tailTouchesHead = (positionOfHead, positionOfTail) => {
    const x = positionOfHead.x - positionOfTail.x;
    const y = positionOfHead.y - positionOfTail.y;
    return x >= -1 && x <= 1 && y >= -1 && y <= 1;
  };

  const needsDiagonalMove = (direction, positionOfHead, positionOfTail) => {
    if (
      (direction === "U" || direction === "D") &&
      positionOfTail.x !== positionOfHead.x
    ) {
      if (positionOfTail.x + 1 === positionOfHead.x) return "R";
      else return "L";
    } else if (
      (direction === "R" || direction === "L") &&
      positionOfHead.y !== positionOfTail.y
    ) {
      if (positionOfTail.y + 1 === positionOfHead.y) return "U";
      else return "D";
    }

    return "";
  };

  const move = (direction, currentPosition) => {
    switch (direction) {
      case "U":
        return { x: currentPosition.x, y: currentPosition.y + 1 };
      case "D":
        return { x: currentPosition.x, y: currentPosition.y - 1 };
      case "R":
        return { x: currentPosition.x + 1, y: currentPosition.y };
      case "L":
        return { x: currentPosition.x - 1, y: currentPosition.y };
    }
  };

  for (var i = 0; i < lines.length; i++) {
    const nextLine = lines[i];
    const [direction, numberOfSteps] = nextLine.split(" ");

    for (var step = 0; step < numberOfSteps; step++) {
      positionOfHead = move(direction, positionOfHead);
      positionOfTail = moveTail(direction, positionOfTail, positionOfHead);
      positionsTailVisited = [...positionsTailVisited, positionOfTail];
    }
  }

  const a = positionsTailVisited.reduce((prev, cur) => {
    if (prev.find((v) => v.x === cur.x && v.y === cur.y)) return prev;

    return [...prev, cur];
  }, []);

  a.sort((a, b) => {
    if (a.y > b.y) return 1;
    if (a.y < b.y) return -1;
    return 0;
  });

  console.log(a.length);
};

const partOne2 = (lines) => {
  var positionOfHead = { x: 0, y: 0 };
  var positionOfTail = { x: 0, y: 0 };

  var positionsTailVisited = [positionOfTail];

  var previousDirection;

  const moveTail = (direction, currentPosition, positionOfHead) => {
    if (tailTouchesHead(positionOfHead, currentPosition))
      return currentPosition;

    var next = move(direction, currentPosition);

    const diagonalMove = needsDiagonalMove(direction, positionOfHead, next);

    if (diagonalMove) {
      next = move(diagonalMove, next);
    }

    return next;
  };

  const tailTouchesHead = (positionOfHead, positionOfTail) => {
    const x = positionOfHead.x - positionOfTail.x;
    const y = positionOfHead.y - positionOfTail.y;
    return x >= -1 && x <= 1 && y >= -1 && y <= 1;
  };

  const needsDiagonalMove = (direction, positionOfHead, positionOfTail) => {
    if (
      (direction === "U" || direction === "D") &&
      positionOfTail.x !== positionOfHead.x
    ) {
      return previousDirection;
    } else if (
      (direction === "R" || direction === "L") &&
      positionOfHead.y !== positionOfTail.y
    ) {
      return previousDirection;
    }

    return "";
  };

  const move = (direction, currentPosition) => {
    switch (direction) {
      case "U":
        return { x: currentPosition.x, y: currentPosition.y + 1 };
      case "D":
        return { x: currentPosition.x, y: currentPosition.y - 1 };
      case "R":
        return { x: currentPosition.x + 1, y: currentPosition.y };
      case "L":
        return { x: currentPosition.x - 1, y: currentPosition.y };
    }
  };

  for (var i = 0; i < lines.length; i++) {
    const nextLine = lines[i];
    const [direction, numberOfSteps] = nextLine.split(" ");

    for (var step = 0; step < numberOfSteps; step++) {
      positionOfHead = move(direction, positionOfHead);
      positionOfTail = moveTail(direction, positionOfTail, positionOfHead);
      positionsTailVisited = [...positionsTailVisited, positionOfTail];
    }

    previousDirection = direction;
  }

  const a = positionsTailVisited.reduce((prev, cur) => {
    if (prev.find((v) => v.x === cur.x && v.y === cur.y)) return prev;

    return [...prev, cur];
  }, []);

  a.sort((a, b) => {
    if (a.y > b.y) return 1;
    if (a.y < b.y) return -1;
    return 0;
  });

  console.log(a.length);
};

const partTwo = (lines) => {
  var positionOfHead = { x: 0, y: 0 };
  var positionOfTail = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ];

  var positionsTailVisited = [positionOfTail[8]];

  var previousDirection;

  const moveTail = (direction, currentPosition, positionOfHead) => {
    if (tailTouchesHead(positionOfHead, currentPosition))
      return currentPosition;

    var next = move(direction, currentPosition);

    const diagonalMove = needsDiagonalMove(direction, positionOfHead, next);

    if (diagonalMove) {
      next = move(diagonalMove, next);
    }

    return next;
  };

  const tailTouchesHead = (positionOfHead, positionOfTail) => {
    const x = positionOfHead.x - positionOfTail.x;
    const y = positionOfHead.y - positionOfTail.y;
    return x >= -1 && x <= 1 && y >= -1 && y <= 1;
  };

  const needsDiagonalMove = (direction, positionOfHead, positionOfTail) => {
    if (
      (direction === "U" || direction === "D") &&
      positionOfTail.x !== positionOfHead.x
    ) {
      return previousDirection;
    } else if (
      (direction === "R" || direction === "L") &&
      positionOfHead.y !== positionOfTail.y
    ) {
      return previousDirection;
    }

    return "";
  };

  const move = (direction, currentPosition) => {
    switch (direction) {
      case "U":
        return { x: currentPosition.x, y: currentPosition.y + 1 };
      case "D":
        return { x: currentPosition.x, y: currentPosition.y - 1 };
      case "R":
        return { x: currentPosition.x + 1, y: currentPosition.y };
      case "L":
        return { x: currentPosition.x - 1, y: currentPosition.y };
    }
  };

  for (var i = 0; i < 3; i++) {
    const nextLine = lines[i];
    const [direction, numberOfSteps] = nextLine.split(" ");

    for (var step = 0; step < numberOfSteps; step++) {
      positionOfHead = move(direction, positionOfHead);

      if (i == 2) console.log("h", positionOfHead);
      var following = positionOfHead;
      for (var tails = 0; tails < positionOfTail.length; tails++) {
        following = moveTail(direction, positionOfTail[tails], following);
        positionOfTail[tails] = following;
        if (i == 2) console.log(tails, following);
      }
      console.log("---");
      positionsTailVisited = [...positionsTailVisited, positionOfTail[8]];
    }

    previousDirection = direction;
  }

  const a = positionsTailVisited.reduce((prev, cur) => {
    if (prev.find((v) => v.x === cur.x && v.y === cur.y)) return prev;

    return [...prev, cur];
  }, []);

  console.log(a.length);
};

run(partTwo, "input.sample");
