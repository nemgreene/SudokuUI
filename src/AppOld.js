import React, { useState } from "react";
import { Container, Row, Col } from "react-grid-system";
import Popped from "./popped";
import "./App.css";
import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";
// import SpringBoard from "./springBoard";

//calculate possibilites for [y, x] coordinates
function possibilities(y, x) {
  let range = 0;

  //row possibilities
  let rowPoss = dict
    .map((i) => {
      if (board[y].includes(i) === false) {
        return i;
      }
    })
    .filter((f) => f !== undefined);

  //colum possibilities
  let colPoss = alph
    .map((i) => {
      if (dict.indexOf(board[i][x]) !== -1) {
        return board[i][x];
      }
    })
    .filter((f) => f !== undefined);
  colPoss = dict.filter((i) => {
    return colPoss.indexOf(i) === -1 ? i : null;
  });

  //pod possibilities
  let podPoss = [],
    podCoord = [0, 0];
  //round down y to nearest 3rd
  podCoord[0] = "ABC".split("").includes(y)
    ? "A"
    : "DEF".split("").includes(y)
    ? "D"
    : "G";
  podCoord[1] = x < 3 ? 0 : x >= 3 && x < 6 ? 3 : 6;

  //iterate through 3y/3x
  while (range < 3) {
    let letter = alph[alph.indexOf(podCoord[0]) + range];
    for (let i = 0; i < 3; i++) {
      podPoss.push(board[letter][i + podCoord[1]]);
    }
    range++;
  }

  podPoss = dict.filter((i) => !podPoss.includes(i));
  //return poss = [1, 2, 3, 4, ] all possibilities for coord entered
  let poss = dict.filter(
    (i) => rowPoss.includes(i) && colPoss.includes(i) && podPoss.includes(i)
  );

  return poss;
}
let board = {
    A: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    B: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    C: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    D: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    E: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    F: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    G: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    H: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    I: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  },
  sample = [
    "__3__4_95".split(""),
    "__1_3_6__".split(""),
    "_____6_32".split(""),
    "5__673_24".split(""),
    "2__4_1__3".split(""),
    "93_825__6".split(""),
    "74_1_____".split(""),
    "__2_6_5__".split(""),
    "36_9__2__".split(""),
  ],
  //initalize board size
  dict = "123456789".split(""),
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

function App() {
  const [displayBoard, changeBoard] = useState({
    A: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    B: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    C: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    D: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    E: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    F: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    G: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    H: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    I: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  });
  const [narration, changeNarration] = useState("Sudoku");
  const [popped, changePopped] = useState(false);
  const [poppedOverlay, changePoppedOverlay] = useState(false);

  //to slow down the execution for a little show and tell
  function wait(ms, msg) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
      changeNarration(msg);
      changeBoard({ ...board });
    });
  }

  async function generate() {
    let global = [];
    maxErr = 0;

    //reset board
    if (popped) await wait(1000, "Reset Board");

    alph.map((i) => {
      dict.map((c) => {
        board[i][c - 1] = "_";
        global.push(i + c);
      });
    });
    changeBoard(board);

    //await this.wait(1000, "Reset board");
    //recurs get next
    async function getNext(y, x) {
      //offset for wraparond
      if (popped) await wait(10, "Generating random numbers");
      if (y === "I" && x === 9) {
        if (popped) await wait(10, "Board Completed");
        return;
      }
      if (x >= 9) {
        x = 0;
        y = alph[alph.indexOf(y) + 1];
      }

      let localPoss = possibilities(y, x);
      let randomPoss = Math.floor(Math.random() * Math.floor(localPoss.length));

      if (localPoss.length === 0) {
        backtrack(y);
        return;
      }
      board[y][x] = localPoss[randomPoss];
      getNext(y, x + 1);
    }
    //recurs delete row
    async function backtrack(y) {
      board[y] = "_________".split("");
      if (popped) await wait(500, "Blind alley, backing up");
      getNext(y, 0);
    }
    //generate new board
    getNext("A", 0);
    //on avg we reach successful reduction @ around 80 - 90 recursions
    return;
  }

  async function stripIt(l) {
    //end recursion condition
    solveItPopped = false;
    if (l === 0 || maxErr === 20) {
      if (popped) await wait(500, "No more cells can be deleted");
      if (popped) await wait(1000, "Puzzle completed!");
      solveItPopped = true;
      deleteArr = [];
      maxErr = 0;
      left = [];
      alph.map((y) => {
        dict.map((x) => {
          left.push([y, x - 1]);
        });
      });
      return;
    }
    //random [y, x] coord from remaining positions
    //that have not been removed
    let r = left[Math.floor(Math.random() * left.length)];
    //should be impossible, if we reach this, well have to
    //check solveIt function
    if (r === undefined) {
      stripIt(0);
      maxErr = 0;
      deleteArr = [];
      changeBoard({ ...board });
      return;
    }
    let [y, x] = r;
    let current = board[r[0]][r[1]];
    //delete from board, left, add to delete
    left.map((f) => {
      if (f === r) {
        deleteArr.push(f);
        left.splice(left.indexOf(r), 1);
      }
    });
    board[r[0]][r[1]] = "_";

    let solveable = solveIt(10);
    deleteArr.map((r) => {
      board[r[0]][r[1]] = "_";
    });

    if (solveable) {
      if (popped) await wait(100, "Puzzle remains solveable, deleting next");
      stripIt(l - 1);
    } else {
      if (popped) await wait(500, "Unsolveable without cell, put it back");
      maxErr++;
      deleteArr.splice(deleteArr.indexOf(r), 1);
      board[r[0]][r[1]] = current;
      stripIt(l - 1);
    }
  }

  function solveIt(iterations, stateOverlay) {
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
            let possArr = possibilities(l, it);

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
      changeBoard(localBoard);
    }
    return ret;
  }
  function popIt() {
    console.log("pop the hood");
  }
  const changeOverlay = () => {
    changePoppedOverlay((t) => !t);
  };
  return (
    <div className="App-body">
      <div className="App">
        {poppedOverlay ? (
          <Popped changeOverlay={changeOverlay} />
        ) : (
          <div className="UI">
            <div className="narration">{narration}</div>
            <Container className="container">
              <div className="tableOffset">
                <Row>
                  <Col className="headerCol" sm={1.06}></Col>
                  {dict.map((x) => {
                    return (
                      <Col className="headerCol" key={x - 1} sm={1.06}>
                        {x - 1}
                      </Col>
                    );
                  })}
                </Row>
                {alph.map((y) => {
                  return (
                    <div>
                      <Row sm={1}>
                        <Col className="headerCol" sm={1.06}>
                          {y}
                        </Col>
                        {displayBoard[y].map((x) => (
                          <Col className="col" sm={1.06}>
                            {x}
                          </Col>
                        ))}
                      </Row>
                    </div>
                  );
                })}
              </div>
            </Container>

            <div className="buttons">
              <button onClick={() => generate()}>generate</button>
              <button onClick={() => stripIt(100)}>stripIt</button>
              <button
                onClick={async () => {
                  if (popped && solveItPopped)
                    await wait(500, "Start Solving the puzzle");
                  solveIt(50, true);
                }}
              >
                solveIt
              </button>
              <button onClick={() => changeOverlay()}>Pop The Hood</button>
            </div>
          </div>
        )}
        <div></div>
      </div>
    </div>
  );
}

export default App;
