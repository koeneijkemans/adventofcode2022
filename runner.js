import { readFile } from "fs";

const run = (func, input) => {
  readFile(input, "utf-8", (err, data) => func(data));
};

export default run;
