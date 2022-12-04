import run from "../runner.js";

const partOne = (lines) => {
  var numberOfOverlappingTasks = 0;
  for (var i = 0; i < lines.length; i++) {
    const tasks = lines[i].split(",");

    var elf1 = tasks[0].split("-");
    var elf2 = tasks[1].split("-");

    elf1 = elf1.map((a) => parseInt(a));
    elf2 = elf2.map((a) => parseInt(a));

    const allTasksForElf1 = fillTasks(elf1);
    const allTasksForElf2 = fillTasks(elf2);

    if (
      allTasksForElf1.every((t) => allTasksForElf2.includes(t)) ||
      allTasksForElf2.every((t) => allTasksForElf1.includes(t))
    )
      numberOfOverlappingTasks++;
  }
  console.log(numberOfOverlappingTasks);
};

const partTwo = (lines) => {
  var numberOfOverlappingTasks = 0;
  for (var i = 0; i < lines.length; i++) {
    const tasks = lines[i].split(",");

    var elf1 = tasks[0].split("-").map((a) => parseInt(a));
    var elf2 = tasks[1].split("-").map((a) => parseInt(a));

    const allTasksForElf1 = fillTasks(elf1);
    const allTasksForElf2 = fillTasks(elf2);

    if (allTasksForElf1.some((t) => allTasksForElf2.includes(t))) {
      numberOfOverlappingTasks++;
    }
  }
  console.log(numberOfOverlappingTasks);
};

const fillTasks = (tasks) => {
  var newTasks = [];
  for (var i = tasks[0]; i <= tasks[1]; i++) {
    newTasks.push(i);
  }

  return newTasks;
};

run(partTwo, "input");
