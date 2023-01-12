import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-grid-system";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSpring, animated } from "react-spring";

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
  emptyBoard = {
    A: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    B: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    C: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    D: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    E: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    F: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    G: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    H: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    I: [" ", " ", " ", " ", " ", " ", " ", " ", " "],
  }
};
function Popped() {
  const [displayBoard, changeBoard] = useState({ ...board });
  const [displayBoard2, changeBoard2] = useState(untether);
  const [displayBoard3, changeBoard3] = useState({ emptyBoard });
  const [displayBoard4, changeBoard4] = useState({ ...emptyBoard });
  const [narration, changeNarration] = useState("Sudoku");
  const [poppedOverlay, changePoppedOverlay] = useState(true);
  const [activeLayer, chanegActiveLayer] = useState("displayBoard");
  const [pointerIndex, changePointerIndex] = useState(0);
  const [animRowIndex, changeanimRowIndex] = useState(-48.5);
  const [rowAnim, changeRowAnim] = useState(false);
  const [rowAnimMap, changeRowAnimMap] = useState({ ...board["A"] });
  const [play, changePlay] = useState(true);

  //-------------------------------anim-------------------------------

  function tables(inputBoard) {
    return (
      <Container className="poppedContainer">
        <div className="poppedTableOffset">
          <Row>
            <Col className="numHeaderCol" sm={1.06}></Col>
            {dict.map((x) => {
              return (
                <Col className="numHeaderCol" key={x - 1} sm={1.06}>
                  {x - 1}
                </Col>
              );
            })}
          </Row>
          {alph.map((y) => {
            return (
              <div>
                <Row className="popepdBoard" sm={1}>
                  <Col className="poppedCol" sm={1.06}>
                    {y}
                  </Col>
                  {inputBoard[y].map((x) => (
                    <Col className="poppedCol" sm={1.06}>
                      {x}
                    </Col>
                  ))}
                </Row>
              </div>
            );
          })}
        </div>
      </Container>
    );
  }
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

  let 
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

  const spring = useSpring({
    to: {
      transform: rowAnim
        ? `translate(6.22vh, 12.09vh)`
        : `translate(0vh, 0vh) `,
    },
  });
  const { opacity } = useSpring({
    opacity: rowAnim ? 1 : 0,
  });

  //to slow down the execution for a little show and tell
  function wait(ms, msg) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
      changeNarration(msg);
      changeBoard({ ...board });
    });
  }

  async function generate(index) {
    let global = [];
    maxErr = 0;
    if (index) {
      getNext(index[0], index[1]);
    }
    //reset board
    await wait(1000, "Reset Board");
    alph.map((i) => {
      dict.map((c) => {
        board[i][c - 1] = " ";
        global.push(i + c);
      });
    });

    //reset board
    changeBoard2({ ...emptyBoard });
    changeBoard3({ ...emptyBoard });
    changeBoard4({ ...emptyBoard });
    await wait(1000, "Reset board");
    //recurs get next

    async function getNext(y, x) {
      changeRowAnim(false);
      //offset for wraparond
      await wait(0, "Generating random numbers");
      if (y === "I" && x === 9) {
        changePointerIndex(0);
        changeanimRowIndex(-48.5);
        await wait(100, "Board Completed");
        return;
      }
      if (x >= 9) {
        //line has completed, moving on to next
        //call next animation
        changeRowAnim(true);
        changeRowAnimMap(board[y]);
        changePointerIndex((p) => p + 5.15);
        //move animRow
        await wait(1000, "Generating random numbers");
        changeanimRowIndex((p) => p + 5.05);
        //reset x/y for next row
        x = 0;
        y = alph[alph.indexOf(y) + 1];
      }

      let localPoss = possibilities(y, x);
      let randomPoss = Math.floor(Math.random() * Math.floor(localPoss.length));

      if (localPoss.length === 0) {
        if ((x = 0)) {
          board[x][y] = " ";
          backtrack(y - 1);
        }
        backtrack(y);
        return;
      }
      board[y][x] = localPoss[randomPoss];

      let layer2 = { ...displayBoard };
      layer2[y] = { ...displayBoard }[y];
      changeBoard2({ ...layer2 });

      getNext(y, x + 1);
    }
    //recurs delete row
    async function backtrack(y) {
      if (play === false) return;
      board[y] = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
      await wait(500, "Blind alley, backing up");
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

  return (
    <div className="poppedApp">
      <div className="poppedUI">
        <div
          className={
            activeLayer === "displayBoard" ? "Layer1 activeLayer" : "Layer1"
          }
        >
          <div
            className="poppedNarration"
            style={{ marginTop: `${pointerIndex}vh` }}
          >
            {narration}
          </div>
          {tables(displayBoard)}
          {rowAnim ? (
            <div>
              <animated.div
                style={{
                  ...spring,
                  opacity: opacity.interpolate((o) => 1.5 - o),
                  display: "inline-block",
                }}
              >
                <Row
                  style={{
                    marginTop: `${animRowIndex}vh`,
                    transform: "translate(0, 4vh)",
                  }}
                  className="animPoppedRow  "
                >
                  {dict.map((x) => {
                    return (
                      <Col className="animPoppedCol" sm={1.062}>
                        {rowAnimMap[x - 1]}
                      </Col>
                    );
                  })}
                </Row>
              </animated.div>
            </div>
          ) : (
            <div></div>
          )}
        </div>

        <div
          className={
            "Layer2 " + activeLayer === "displayBoard2"
              ? "activeLayer"
              : "Layer2 "
          }
        >
          {tables(displayBoard2)}
        </div>
        <div
          className={
            "Layer3 " + activeLayer === "displayBoard3"
              ? "activeLayer"
              : "Layer3"
          }
        >
          {tables(displayBoard3)}
        </div>
        <div
          className={
            "Layer4 " + activeLayer === "displayBoard4"
              ? "activeLayer"
              : "Layer4"
          }
        >
          {tables(displayBoard4)}
        </div>
      </div>
      <div className="poppedButtons ">
        <button
          type="button"
          class="btn btn-outline-info"
          onClick={() => generate()}
        >
          generate
        </button>
        <button
          type="button"
          class="btn btn-outline-info"
          onClick={() => stripIt(100)}
        >
          stripIt
        </button>
        <button
          type="button"
          class="btn btn-outline-info"
          onClick={async () => {
            solveIt(50, true);
          }}
        >
          solveIt
        </button>
        {/*         <button
          type="button"
          class="btn btn-outline-info"
          onClick={() => changePlay((t) => !t)}
        >
          {play ? "Pause" : "Play"}
        </button> */}
      </div>
    </div>
  );
}

export default Popped;
