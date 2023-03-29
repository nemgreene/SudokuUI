let {
  alph,
  dict,
  untether,
  wait,
  emptyBoard,
} = require("../utilityComponents/misc");

const {
  springDuration,
  mediumDuration,
  snappyDuration,
  stripItFloat,
  stripItStamp,
} = require("../utilityComponents/animObjects");
// const { possibilities } = require("../utilityComponents/possibilities");
const { solveItSkinny } = require("./solveItLogic");

export let stripIt = async (
  l,
  board,
  changeNarration = () => {},
  changeBoard = () => {},
  changeBoard2 = () => {},
  changeBoard3 = () => {},
  cCompleted = () => {},
  changeRunning = () => {},
  cCoords = () => {},
  cExpand = () => {},
  skip = true,
  left = undefined
) => {
  let recursion = async (l, board, left) => {
    // terminate conidtions
    if (l === 0) {
      console.log("unsolveable, completed");
      return;
    }
    // begin stripping it
    // initialize left array
    if (!left) {
      left = [];
      alph.forEach((y) => {
        dict.forEach((x) => {
          if (board[y][x] !== " ") {
            left.push([y, x - 1]);
          }
        });
      });
    }
    // establish remaining options
    // select one randomly
    let r = left[Math.floor(Math.random() * left.length)];
    // if no r, board is complete
    if (!r) {
      // fire final animation
      if (!skip) {
        cCoords((p) => ({ ...p, b: { x: 0, y: 0, section: "board" } }));
        await wait(springDuration, "Board Completed", changeNarration);
        cCompleted(true);
        await wait(mediumDuration, "Board Completed", changeNarration);
        cCoords((p) => ({
          ...p,
          a: {
            x: 0,
            y: 0,
            section: "board",
            trans: { backgroundColor: "#282c3466", color: "aqua" },
          },
        }));
      }
      changeRunning(false);
      changeBoard2(untether(emptyBoard));
      changeBoard3(untether(emptyBoard));
      return;
    }
    // remove from board
    let temp = untether(board);
    temp[r[0]][r[1]] = " ";
    // if still solveable
    let solveable = await solveItSkinny(20, temp, true);
    left = left.filter((p) => JSON.stringify(p) !== JSON.stringify(r));

    if (!skip && r) {
      cCoords((p) => ({
        ...p,
        a: {
          x: alph.indexOf(r[0]),
          y: r[1],
          trans: { ...stripItFloat },
        },
      }));
      await wait(snappyDuration, "Checking Cells...", changeNarration);
    }
    // if can be solved
    if (solveable) {
      changeBoard(temp);
      recursion(l - 1, temp, left);
    } else {
      // if not solveable
      if (!skip && r) {
        cCoords((p) => ({
          ...p,
          a: {
            x: alph.indexOf(r[0]),
            y: r[1],
            trans: { ...stripItStamp },
          },
        }));
        await wait(springDuration, "Checking Cells...", changeNarration);
        changeBoard2((prev) => {
          let update = untether({ ...prev });
          update[r[0]][r[1]] = board[r[0]][r[1]];
          return update;
        });
      }
      recursion(l - 1, board, left);
    }
    // else return it
    // remove option from left
    //
  };

  changeBoard2(untether(emptyBoard));
  changeBoard3(untether(emptyBoard));

  cCompleted(false);
  changeRunning(true);

  if (!skip) {
    await wait(mediumDuration, "Beginning removal", changeNarration);
    cExpand(true);
  }
  recursion(l, board, left);

  return;
};
