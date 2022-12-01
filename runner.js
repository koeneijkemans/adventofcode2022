import { readFile } from "fs";

const run = (func, input) => {
  readFile(input, "utf-8", (err, data) => func(data.split("\r\n")));
};

export default run;
