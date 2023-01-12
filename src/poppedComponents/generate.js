import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-grid-system";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSpring, animated } from "react-spring";
import { untether, wait, tables } from "../utilityComponents/misc";
//import { possibilities } from "../utilityComponents/possibilities";
import { solveIt } from "../utilityComponents/solveIt";

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
  };
function Popped(passed) {
  const [displayBoard, changeBoard] = useState({ ...board });
  const [displayBoard2, changeBoard2] = useState(untether(emptyBoard));
  const [displayBoard3, changeBoard3] = useState(untether(emptyBoard));
  const [displayBoard4, changeBoard4] = useState(untether(emptyBoard));
  const [narration, changeNarration] = useState("Sudoku");
  const [activeLayer, chanegActiveLayer] = useState("displayBoard");
  const [pointerIndex, changePointerIndex] = useState(0);
  const [animRowIndex, changeanimRowIndex] = useState(-48.5); //start -48.5 -- -8.41
  const [animPodIndex, changeanimPodIndex] = useState(-48.5); //-57.8 -- end -18.5
  const [rowAnim, changeRowAnim] = useState(false);
  const [podAnim, changePodAnim] = useState(false);
  const [rowAnimMap, changeRowAnimMap] = useState("A");
  const [podAnimMap, changePodAnimMap] = useState(["A", "B", "C"]);
  const [rowAnimIndex, changeRowAnimMapIndex] = useState("");
  const [running, changeRunning] = useState(false);
  const [animate4, changeAnimate4] = useState(false);
  const [frameFinished, changeFrameFinished] = useState(false);

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

  function possibilities(y, x, board) {
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

  //------------------------------Spring----------------------------------
  const spring = useSpring({
    to: {
      opacity: rowAnim ? 1 : 0,
      color: rowAnim ? "aqua" : "hotpink",
      transform: rowAnim ? `translate(6.36vh, 15.7vh)` : `translate(0vh, 0vh) `,
    },
  });
  const spring2 = useSpring({
    to: {
      color: podAnim ? "hotpink" : "aqua",
      transform: podAnim ? `translate(6.34vh, 15.5vh)` : `translate(0vh, 0vh) `,
    },
  });

  const props = useSpring({ x: frameFinished ? 1 : 0 });
  const finished1 = useSpring({
    to: {
      marginTop: animate4 ? "6.45vh" : "-6.5vh",
      marginLeft: animate4 ? "13vh" : "15%",
      transform: animate4 ? "skew(0deg) scaleY(1)" : "skew(-30deg) scaleY(0.7)",
    },
  });
  const finished2 = useSpring({
    to: {
      marginTop: animate4 ? "10vh" : "6.7%",
      marginLeft: animate4 ? "13vh" : "15%",
      transform: animate4 ? "skew(0deg) scaleY(1)" : "skew(-30deg) scaleY(0.7)",
    },
  });
  const finished3 = useSpring({
    to: {
      marginTop: animate4 ? "10vh" : "23.3%",
      marginLeft: animate4 ? "13vh" : "15%",
      transform: animate4 ? "skew(0deg) scaleY(1)" : "skew(-30deg) scaleY(0.7)",
    },
  });
  const finished4 = useSpring({
    to: {
      marginTop: animate4 ? "10vh" : "40%",
      marginLeft: animate4 ? "13vh" : "15%",
      transform: animate4 ? "skew(0deg) scaleY(1)" : "skew(-30deg) scaleY(0.7)",
    },
  });
  const frame = useSpring({
    to: [
      {
        opacity: 1,
        transform: "translate(0vh, -5vh)",
      },
      {
        opacity: 1,
        transform: "translate(0vh, 32.4vh)",
      },
    ],
    from: {
      opacity: 1,
      transform: "translate(0vh, 32vh)",
    },
    config: { mass: 1, tension: 170, friction: 26, velocity: 10 },
  });

  //--------------------------------Table--------------------------------
  function tables(inputBoard, bool) {
    return (
      <Container className="poppedContainer">
        <div className="poppedTableOffset">
          <Row>
            <Col className="numHeaderCol" sm={1.06}></Col>
            {dict.map((x) => {
              return (
                <Col
                  className="numHeaderCol"
                  style={{ color: "aqua" }}
                  key={x - 1}
                  sm={1.06}
                >
                  {x - 1}
                </Col>
              );
            })}
          </Row>
          {alph.map((y) => {
            return (
              <div>
                <Row className="popepdBoard" sm={1}>
                  <Col
                    className="poppedCol"
                    style={{ color: "aqua" }}
                    sm={1.06}
                  >
                    {y}
                  </Col>
                  {inputBoard[y].map((x) => (
                    <Col
                      style={{
                        color: bool && rowAnimIndex === y ? "hotpink" : null,
                      }}
                      className="poppedCol"
                      sm={1.06}
                    >
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

  //--------------------------------Generate----------------------------

  async function generate(index) {
    let maxErr = 0,
      timeoutErr = 0;

    if (running) return;
    //reset board2

    changeBoard(untether(emptyBoard));
    changeBoard2(untether(emptyBoard));
    changeBoard3(untether(emptyBoard));
    changeBoard4(untether(emptyBoard));

    changeAnimate4(false);
    changeFrameFinished(false);
    changeBoard2(untether(emptyBoard));
    changePointerIndex(0);

    //reset board
    alph.map((i) => {
      dict.map((c) => {
        board[i][c - 1] = " ";
      });
    });

    //reset boards

    await wait(1000, "Reset board", changeNarration);

    //recurs get next
    //-----------------------------Generate Recursion-------------------------------
    async function getNext(y, x) {
      //reset visibility of animRow
      changePodAnim(false);
      changeRowAnimMapIndex(y);

      //if we err out too many times, reset last 3 rows

      if (timeoutErr === 10) {
        timeoutErr = 0;
        await wait(1000, "Looks like trouble, lets back up", changeNarration);
        let index = alph.indexOf(y);
        timeoutErr = 0;
        if (y === "A" || y === "B") {
          board = untether(emptyBoard);
          changeBoard(untether(emptyBoard));
          changePointerIndex(0);
          changeRowAnim(true);
          getNext("A", 0);
        } else {
          board[alph[index]] = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
          board[alph[index - 1]] = [
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
            " ",
          ];

          changeRowAnim(false);
          changeRowAnimMap(alph[alph.indexOf(y) - 2]);
          changeRowAnimMapIndex("X");
          changePointerIndex((p) => p - 5.15);
          changeBoard(untether(board));
          getNext(alph[index - 1], 0);
          return;
        }
      } else if (timeoutErr < 10) {
        await wait(0, "Generating random numbers", changeNarration);
      }
      //board finished, reset
      if (y === "I" && x === 9) {
        //fire final animation
        changeRowAnimMap(y);
        changePodAnimMap(["G", "H", "I"]);
        changePodAnim(true);
        changeRowAnim(true);

        await wait(1000, "Board Completed", changeNarration);
        changeRowAnim(false);
        changePodAnim(false);
        changeBoard3(untether(board));
        changeFrameFinished(true);
        changeBoard4(untether(board));
        await wait(500, "Board Completed", changeNarration);
        changeFrameFinished(false);
        changeAnimate4(true);

        //reset position
        changeBoard2(untether(board));
        changeRunning(false);
        return;
      }

      //line has completed, moving on to next
      if (x >= 9) {
        //call next animation
        changeRowAnimMap(y);
        changePointerIndex((p) => p + 5.15);
        timeoutErr = 0;

        if (y == "C" || y == "F") {
          if (y === "C") changePodAnimMap(["A", "B", "C"]);
          if (y === "F") changePodAnimMap(["D", "E", "F"]);
          changePodAnim(true);
        }
        changeRowAnim(true);
        await wait(500, "Next line", changeNarration);
        changeRowAnim(false);
        changeBoard2(untether(board));
        if (y == "C" || y == "F") {
          changeBoard3(untether(board));
        }
        await wait(500, "Next line", changeNarration);

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
      await wait(500, "Blind alley, backing up", changeNarration);

      getNext(y, 0);
    }
    //generate new board
    getNext("A", 0);
    //on avg we reach successful reduction @ around 80 - 90 recursions
    return;
  }

  //---------------------------------Solve It-------------------

  //------------------------------------Render---------------------------
  return (
    <div className="poppedApp">
      <div className="poppedUI">
        <div
          className="animContainer"
          style={{
            //bottom = 32.3
            transform: `translateY(0vh)`,
            opacity: frameFinished ? 1 : 0,
          }}
        >
          <animated.div style={frame}>
            <div className="animFrame">
              <div className="animFrameTable">
                {/* {tables(displayBoard)}
                 */}
              </div>
            </div>
          </animated.div>
        </div>
        {/* -----------------------Layer 1--------------------- */}
        <animated.div
          style={finished1}
          className={
            activeLayer === "displayBoard" ? "Layer1 activeLayer" : "Layer1"
          }
        >
          <div className="poppedNarration">{narration}</div>
          {tables(displayBoard, true)}
          <div>
            <animated.div
              className="animPoppedOffset"
              style={{
                ...spring,
              }}
            >
              {alph.map((y) => {
                return (
                  <Row
                    className="animPoppedRow2"
                    style={{
                      opacity: rowAnimMap === y ? 1 : 0,
                    }}
                  >
                    {dict.map((x) => {
                      return (
                        <Col className="animPoppedCol2" sm={1.062}>
                          {displayBoard[y][x - 1]}
                        </Col>
                      );
                    })}
                  </Row>
                );
              })}
            </animated.div>
          </div>
        </animated.div>
        {/* -----------------------Layer 2--------------------- */}
        <animated.div
          style={finished2}
          className={
            "Layer2 " + activeLayer === "displayBoard2"
              ? "activeLayer"
              : "Layer2 "
          }
        >
          {tables(displayBoard2)}
          {podAnim ? (
            <div style={{ opacity: rowAnim ? 1 : 0 }}>
              <animated.div
                style={{
                  marginLeft: "1.7vh",
                  marginRight: "-1.6vh",
                  marginTop: "-45.1vh",
                  ...spring2,
                }}
              >
                {alph.map((y) => {
                  return (
                    <Row
                      className="animPoppedRow2"
                      style={{
                        opacity: podAnimMap.includes(y) ? 1 : 0,
                      }}
                    >
                      {dict.map((x) => {
                        return (
                          <Col className="animPoppedCol2" sm={1.062}>
                            {displayBoard[y][x - 1]}
                          </Col>
                        );
                      })}
                    </Row>
                  );
                })}
              </animated.div>
            </div>
          ) : (
            <div></div>
          )}
        </animated.div>
        {/* -----------------------Layer 3--------------------- */}
        <animated.div
          style={finished3}
          className={
            activeLayer === "displayBoard3" ? "Layer3 activeLayer" : "Layer3"
          }
        >
          {tables(displayBoard3)}
        </animated.div>
        {/* -----------------------Layer 4--------------------- */}
        <animated.div
          style={finished4}
          className={
            activeLayer === "displayBoard4" ? "Layer4 activeLayer" : "Layer4"
          }
        >
          {tables(displayBoard4)}
        </animated.div>
      </div>
      <div className="poppedButtons" style={{ zIndex: 10 }}>
        <button
          type="button"
          class="btn btn-outline-info"
          onClick={() => {
            changeRunning(true);
            generate();
          }}
        >
          GENERATE
        </button>
        {/*         <button
          type="button"
          class="btn btn-outline-info"
          onClick={() => {
            changeFrameFinished((p) => !p);
          }}
        >
          Animate
        </button> */}
        <button class="btn btn-outline-info" onClick={passed.changeOverlay}>
          Drop the Hood
        </button>
      </div>
    </div>
  );
}

export default Popped;
