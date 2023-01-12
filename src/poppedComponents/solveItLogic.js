let { alph, untether, wait } = require("../utilityComponents/misc");

const {
  mediumDuration,
  springDuration,
} = require("../utilityComponents/animObjects");
const { possibilities } = require("../utilityComponents/possibilities");
const { highFinish } = require("../utilityComponents/animObjects");

export let solveIt = async (
  iterations,
  board,
  skip,
  changeNarration = () => {},
  changeBoard = () => {},
  changeBoard2 = () => {},
  changeBoard3 = () => {},
  cExpand = () => {},
  cCoords = () => {},
  cCompleted = () => {}
) => {
  let localBoard = { ...untether(board) };
  // array to track all cells that can be added per iteration
  let exposition = [];

  // find all cells that are not empty
  let sum = alph
    .map((v, t) => {
      return localBoard[v]
        .map((val, index) => (val !== " " ? index : " "))
        .filter((i) => i !== " ")
        .map((c, z) => c + t * 9);
    })
    .reduce((p, c) => (p ? [...p, ...c] : []));

  // If all cells are filled, do nothing
  if (sum.length === 81) {
    await wait(mediumDuration, "Checking...", changeNarration);
    await wait(mediumDuration, "Board is complete", changeNarration);
    if (!skip) {
      return;
    }
  }
  cCompleted(false);

  // initial animations
  if (!skip) {
    cExpand(true);
    await wait(mediumDuration, "Initializing", changeNarration);

    await wait(mediumDuration, "Initializing", changeNarration);
    cCoords((p) => ({ ...p, a: { x: sum, y: 0, section: "parallel" } }));

    await wait(mediumDuration, "Initializing", changeNarration);
    changeBoard2(localBoard);

    await wait(mediumDuration, "Beginning recursion", changeNarration);
  }

  //recursively solve the puzzle, return bool if solved in n recursions
  async function recurs(lifeCycle) {
    // arr to track how many rows have been completed
    let solved = [];
    // end recursion condition
    if (lifeCycle === 0) {
      return false;
    }

    // iterate over board
    alph.map(async (l) => {
      if (localBoard[l].includes(" ") === false) {
        solved.push(1);
        return;
      }
      localBoard[l].map(async (i, it) => {
        // once weve found an empty cell
        if (i === " ") {
          // calculate all possibilites for that cell
          let possArr = possibilities(l, it, localBoard);
          // if there is only 1 possibility, update board
          if (possArr.length === 1) {
            exposition.push(it + alph.indexOf(l) * 9);
            // enact change
            localBoard[l][it] = possArr[0];
            return;
          }
        }
      });
    });

    //animation
    if (!skip) {
      await wait(
        springDuration,
        "Found all cells with only one possibility",
        changeNarration
      );
      changeBoard(untether(localBoard));

      cCoords((p) => ({
        ...p,
        a: { x: exposition, y: 0, trans: highFinish, section: "parallel" },
      }));
      await wait(
        springDuration,
        "Found all cells with only one possibility",
        changeNarration
      );

      cCoords((p) => ({
        ...p,
        a: { x: exposition, y: 0, section: "parallel" },
      }));
      await wait(
        springDuration,
        "Found all cells with only one possibility",
        changeNarration
      );
      changeBoard2(untether(localBoard));
    }
    // If we have solved all 9 rows
    if (solved.length === 9) {
      // animation
      if (!skip) {
        cCoords((p) => ({
          ...p,
          b: { x: exposition, y: 0, section: "board" },
        }));
        await wait(springDuration, "Board completed", changeNarration);
        changeBoard3(untether(localBoard));
        await wait(mediumDuration, "Board completed", changeNarration);
        cCompleted(true);
      }
      // update board
      changeBoard(untether(localBoard));
      // end recursion
      return true;
      // call recursion
    } else {
      // rteset exposition
      exposition = [];
      // animation
      if (!skip) {
        await wait(
          mediumDuration * 2,
          "Current confiiguration checked, recursing",
          changeNarration
        );
      }
      // recurse
      return recurs(lifeCycle - 1);
    }
  }

  //call recursion with inherited iterations
  return recurs(iterations);
};
export let solveItSkinny = async (iterations, board) => {
  let localBoard = { ...untether(board) };
  let exposition = [];
  // find all cells that are not empty
  // let sum = alph
  //   .map((v, t) => {
  //     return localBoard[v]
  //       .map((val, index) => (val !== " " ? index : " "))
  //       .filter((i) => i !== " ")
  //       .map((c, z) => c + t * 9);
  //   })
  //   .reduce((p, c) => (p ? [...p, ...c] : []));
  // let maxErr = 0;
  //recursively solve the puzzle, return bool if solved in n recursions
  async function recurs(lifeCycle) {
    let solved = [];
    if (lifeCycle === 0) {
      return false;
    }
    alph.map(async (l) => {
      localBoard[l].map(async (i, it) => {
        if (i === " ") {
          let possArr = possibilities(l, it, localBoard);
          if (possArr.length === 1) {
            exposition.push(it + alph.indexOf(l) * 9);
            localBoard[l][it] = possArr[0];
            return;
          }
        }
      });
      if (localBoard[l].includes(" ") === false) {
        solved.push(1);
        return;
      }
    });

    //animation
    if (solved.length === 9) {
      return true;
    } else {
      exposition = [];
      return recurs(lifeCycle - 1);
    }
  }

  //call recursion with inherited iterations
  return recurs(iterations);
  // changeBoard(localBoard);
  // if (stateOverlay) {
  //   //   changeBoard(localBoard);
  // }
};
