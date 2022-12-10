import run from "../runner.js";

const partOne = (lines) => {
  var currentCycle = 1;
  var currentSignalStrength = 1;
  var nextSnapshot = 20;
  const snapshotIncrement = 40;
  var snapshots = [];

  const processNoop = () => {
    currentCycle++;
  };

  const processAddX = (signalStrength) => {
    currentCycle++;
    currentSignalStrength += signalStrength;
  };

  const snapshot = () => {
    snapshots = [...snapshots, currentSignalStrength * nextSnapshot];
    nextSnapshot += snapshotIncrement;
  };

  const enhancedLines = lines.reduce((prev, cur) => {
    if (cur.startsWith("addx")) return [...prev, "noop", cur];
    return [...prev, cur];
  }, []);

  enhancedLines.forEach((line) => {
    if (currentCycle === nextSnapshot) {
      snapshot();
    }

    if (line.startsWith("addx")) {
      processAddX(parseInt(line.split(" ")[1]));
    } else if (line.startsWith("noop")) {
      processNoop();
    }
  });

  console.log(snapshots.reduce((a, b) => a + b));
};

const partTwo = (lines) => {
  var spritePosition = 1;
  var currentCycle = 1;
  const pixelsPerRow = 40;
  const rows = 6;
  var display = Array.from(Array(rows).keys()).map(() => "");

  const processNoop = () => {
    currentCycle++;
  };

  const processAddX = (x) => {
    currentCycle++;
    spritePosition += x;
  };

  const drawPixel = () => {
    const currentRow = Math.ceil(currentCycle / pixelsPerRow);
    const currentPixelInRow = currentCycle - (currentRow - 1) * pixelsPerRow;
    const difference = currentPixelInRow - spritePosition - 1;

    if (currentRow == 2) {
      console.log(currentCycle, currentPixelInRow, spritePosition, difference);
    }

    if (difference >= -1 && difference <= 1) {
      display[currentRow - 1] += "#";
    } else {
      display[currentRow - 1] += ".";
    }
  };

  const enhancedLines = lines.reduce((prev, cur) => {
    if (cur.startsWith("addx")) return [...prev, "noop", cur];
    return [...prev, cur];
  }, []);

  enhancedLines.forEach((line) => {
    drawPixel();
    if (line.startsWith("addx")) {
      processAddX(parseInt(line.split(" ")[1]));
    } else if (line.startsWith("noop")) {
      processNoop();
    }
  });

  display.forEach((line) => console.log(line));
};

run(partTwo, "input");
