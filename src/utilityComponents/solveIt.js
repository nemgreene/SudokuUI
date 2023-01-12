import { untether, wait } from "../utilityComponents/misc";
import { possibilities } from "../utilityComponents/possibilities";
import { tables } from "../utilityComponents/table";

//initalize board size
let dict = "123456789".split(""),
  alph = "ABCDEFGHI".split(""),
  //global vars set for stripIt function
  deleteArr = [],
  maxErr = 0,
  i = 0,
  left = [],
  //lets pop the hood
  popped = false,
  solveItPopped = false;
//initialize list of all possible coordinates on board
alph.map((y) => {
  dict.map((x) => {
    left.push([y, x - 1]);
  });
});

export default function solveIt(iterations, stateOverlay, board) {
  let localBoard = { ...board };
  maxErr = 0;
  //return if solved or not
  let ret = false;
  //calculate possible numbers for "Y", x coord

  //recursively solve the puzzle, return bool if solved in n recursions
  async function recurs(lifeCycle) {
    let solved = [];
    let globalPoss = 0;
    if (lifeCycle === 0) {
      if (popped && solveItPopped) await wait(1000, "Puzzle Solved");
      return;
    }

    alph.map(async (l) => {
      localBoard[l].map(async (i, it) => {
        if (l.includes("_")) {
          console.log("row filled");
          solved.push(1);
        }
        if (i === "_") {
          let possArr = possibilities(l, it, board);

          if (possArr.length === 1) {
            localBoard[l][it] = possArr[0];
          }
        }
      });
      if (localBoard[l].includes("_") === false) {
        solved.push(1);
        return;
      }
    });
    if (solved.length === 9) {
      ret = true;
      recurs(0);
    } else {
      if (popped && solveItPopped)
        await wait(1000, "Cells with 1 possibility are added");
      recurs(lifeCycle - 1);
    }
    return ret;
  }

  //call recursion with inherited iterations
  recurs(iterations);
  if (stateOverlay) {
    //console.log(localBoard);
  }
  return ret;
}
