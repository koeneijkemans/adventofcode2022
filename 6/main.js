import run from "../runner.js";

const code = (line, markerLength) => {
  for (var i = 0; i < line.length; i++) {
    const nextMarker = line.substring(i, i + markerLength);
    const uniqueMarkers = [...nextMarker].reduce((prev, cur) =>
      prev.indexOf(cur) < 0 ? prev + cur : prev
    );

    if (uniqueMarkers.length === markerLength) {
      console.log(i + markerLength);

      return;
    }
  }
};

run((lines) => code(lines[0], 4), "input");
run((lines) => code(lines[0], 14), "input");
