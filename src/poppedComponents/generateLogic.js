let {
  alph,
  dict,
  untether,
  wait,
  emptyBoard,
  board,
} = require("../utilityComponents/misc");

const {
  springDuration,
  mediumDuration,
} = require("../utilityComponents/animObjects");
const { possibilities } = require("../utilityComponents/possibilities");
export async function generate(
  running,
  changeBoard = () => {},
  changeBoard2 = () => {},
  changeBoard3 = () => {},
  changeRunning,
  changeNarration,
  changePointerIndex,
  cCoords,
  cCompleted,
  cExpand,
  skip
) {
  // let maxErr = 0,
  //   timeoutErr = 0;
  let timeoutErr = 0;

  cCompleted(false);
  changeRunning(true);

  if (running) return;

  changeBoard(untether(emptyBoard));
  if (!skip) {
    // rest all boards in hud
    cExpand(true);
    changeBoard(untether(emptyBoard));
    changeBoard2(untether(emptyBoard));
    changeBoard3(untether(emptyBoard));
    changePointerIndex(0);
  }

  //reset board
  alph.map((i) => dict.map((c) => (board[i][c - 1] = " ")));

  //reset boards
  if (!skip) {
    await wait(500, "Reset board", changeNarration);
  }

  //recurs get next
  //-----------------------------Generate Recursion-------------------------------
  async function getNext(y, x) {
    //if we err out too many times, reset last 3 rows
    if (timeoutErr === 10) {
      timeoutErr = 0;
      if (!skip) {
        await wait(1000, "Looks like trouble, lets back up", changeNarration);
      }
      let index = alph.indexOf(y);
      timeoutErr = 0;
      if (y === "A" || y === "B") {
        board = untether(emptyBoard);
        if (!skip) {
          changeBoard(untether(emptyBoard));
          changePointerIndex(0);
          //   changeRowAnim(true);
        }
        getNext("A", 0);
      } else {
        board[alph[index]] = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        board[alph[index - 1]] = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
        if (!skip) {
          changePointerIndex((p) => p - 100);
          changeBoard(untether(board));
        }
        getNext(alph[index - 1], 0);
        return;
      }
    } else if (timeoutErr < 10) {
      if (!skip) {
        await wait(0, "Generating random numbers", changeNarration);
      }
    }
    //board finished, reset
    if (y === "I" && x === 9) {
      //fire final animation
      if (!skip) {
        cCoords((p) => ({
          ...p,
          a: { x: x, y: alph.indexOf(y), section: "row" },
        }));
        changePointerIndex(0);
        await wait(springDuration, "Board Completed", changeNarration);
        changeBoard2(untether(board));
        cCoords((p) => ({
          ...p,
          b: { x: x, y: alph.indexOf(y), section: "section" },
        }));
        await wait(springDuration, "Board Completed", changeNarration);
        changeBoard3(untether(board));

        // cCoords((p) => ({ ...p, c: { x: 0, y: 0, section: "board" } }));
        // await wait(springDuration, "Board Completed", changeNarration);

        await wait(mediumDuration, "Board Completed", changeNarration);
        cCompleted(true);

        //reset position
      }
      changeRunning(false);
      return;
    }

    //line has completed, moving on to next
    if (x >= 9) {
      if (!skip) {
        cCoords((p) => ({
          ...p,
          a: { x: x, y: alph.indexOf(y), section: "row" },
        }));
        //call next animation
        // changeRowAnimMap(y);
        changePointerIndex((p) => p + 100);
      }
      timeoutErr = 0;
      if (!skip) {
        await wait(springDuration, "Next line", changeNarration);
        if (y === "C" || y === "F") {
          cCoords((p) => ({
            ...p,
            b: { x: x, y: alph.indexOf(y), section: "section" },
          }));
        }
        // changeRowAnim(true);
        // changeRowAnim(false);
        changeBoard2(untether(board));
        if (y === "C" || y === "F") {
          await wait(springDuration, "Next line", changeNarration);
          changeBoard3(untether(board));
        }
        await wait(springDuration, "Next line", changeNarration);
      }
      //reset x/y for next row
      x = 0;
      y = alph[alph.indexOf(y) + 1];
    }

    let localPoss = possibilities(y, x, board);
    let randomPoss = Math.floor(Math.random() * Math.floor(localPoss.length));
    //if blind alley
    if (localPoss.length === 0) {
      //if were at the index and having some trouble, reset previous row too
      if ((x = 0)) {
        board[x][y] = " ";
        backtrack(y - 1);
      }

      backtrack(y);
      return;
    }
    board[y][x] = localPoss[randomPoss];
    changeBoard({ ...board });
    getNext(y, x + 1);
  }
  //recurs delete row
  async function backtrack(y) {
    timeoutErr++;
    board[y] = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    changeBoard(untether(board));
    if (!skip) {
      await wait(springDuration, "Blind alley, backing up", changeNarration);
    }

    getNext(y, 0);
  }
  //generate new board
  getNext("A", 0);
  //on avg we reach successful reduction @ around 80 - 90 recursions
  return;
}
