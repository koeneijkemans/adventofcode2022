import run from "../runner.js";

const fileSizeTreshold = 100000;

const partOne = (lines) => {
  var tree = {
    name: "/",
    children: [],
  };

  var currentNode = tree;

  for (var i = 0; i < lines.length; i++) {
    const currentLine = lines[i];
    if (currentLine.startsWith("$")) {
      if (currentLine.startsWith("$ cd")) {
        const split = currentLine.split(" ");

        if (split[2] === "/") {
          currentNode = tree;
        } else if (split[2] === "..") {
          currentNode = currentNode.parent;
        } else {
          currentNode = currentNode.children.find((n) => n.name === split[2]);
        }
      }
    } else {
      if (currentLine.startsWith("dir")) {
        currentNode.children.push({
          name: currentLine.split(" ")[1],
          parent: currentNode,
          children: [],
        });
      } else {
        currentNode.children.push({
          name: currentLine.split(" ")[1],
          fileSize: currentLine.split(" ")[0],
        });
      }
    }
  }

  const calculateSize = (node) => {
    return node.children.reduce((prev, cur) => {
      if ("children" in cur) return prev + calculateSize(cur);
      return prev + parseInt(cur.fileSize);
    }, 0);
  };

  const getSizes = (node) => {
    var sizes = [{ name: node.name, size: calculateSize(node) }];

    for (var i = 0; i < node.children.length; i++) {
      if ("children" in node.children[i]) {
        sizes = [...sizes, ...getSizes(node.children[i])];
      }
    }

    return sizes;
  };

  const sizes = getSizes(tree);
  console.log(
    sizes
      .filter((a) => a.size < fileSizeTreshold)
      .reduce((a, b) => a + b.size, 0)
  );

  console.log("---");

  const totalSpace = 70000000;
  const spaceRequired = 30000000;
  const totalTreeSize = calculateSize(tree);

  const freeSpaceNeeded = totalSpace - totalTreeSize;

  const bigEnough = sizes.filter(
    (a) => freeSpaceNeeded + a.size > spaceRequired
  );

  bigEnough.sort((a, b) => {
    if (a.size > b.size) return 1;
    if (b.size > a.size) return -1;
    return 0;
  });

  console.log(bigEnough[0].size);
};

run(partOne, "input");
