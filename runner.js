import { readFile } from "fs";

const run = (func, input, split = "\r\n") => {
  readFile(input, "utf-8", (err, data) => func(data.split(split)));
};

export default run;
