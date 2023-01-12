import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-grid-system";
import { board, emptyBoard, alph, dict } from "../utilityComponents/var";
import { untether, wait } from "../utilityComponents/misc";
import { useSpring, animated, config } from "react-spring";
import solveIt from "../utilityComponents/solveIt";
import tables from "../utilityComponents/table";
import { possibilities } from "../utilityComponents/possibilities";

let //global vars set for stripIt function
  deleteArr = [],
  maxErr = 0,
  i = 0,
  left = [],
  //lets pop the hood
  popped = false,
  solveItPopped = false,
  replace = { y: "x", x: 10 },
  replace2 = { y: "A", x: 0 };
//initialize list of all possible coordinates on board
alph.map((y) => {
  dict.map((x) => {
    left.push([y, x - 1]);
  });
});
let sample = {
  A: "__3__4_95".split(""),
  B: "__1_3_6__".split(""),
  C: "_____6_32".split(""),
  D: "5__673_24".split(""),
  E: "2__4_1__3".split(""),
  F: "93_825__6".split(""),
  G: "74_1_____".split(""),
  H: "__2_6_5__".split(""),
  I: "36_9__2__".split(""),
};

function StripIt() {
  const [displayBoard, changeBoard] = useState({ ...board });
  const [displayBoard2, changeBoard2] = useState(untether(emptyBoard));
  const [displayBoard3, changeBoard3] = useState(untether(emptyBoard));
  const [displayBoard4, changeBoard4] = useState(untether(emptyBoard));
  const [narration, changeNarration] = useState(untether("Stripping"));
  const [animateDrops, changeAnimateDrops] = useState(false);
  const [animateStay, changeAnimateStay] = useState(false);
  const [activeDrop, changeActiveDrop] = useState(replace);
  const [activeStay, changeActiveStay] = useState(replace2);
  const [animate4, changeAnimate4] = useState(false);
  const [hideBoards, changeHideBoards] = useState(false);
  const [hideAnims, changeHideAnims] = useState(true);

  useEffect(() => {
    generate();
  }, []);

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
  const spring1 = useSpring({
    to: {
      transform: animateDrops
        ? "translate(6.25vh, 15.45vh)"
        : "translate(0vh, 0vh)",
      opacity: animateDrops ? 0.5 : 1,
    },
    from: {
      transform: "translate(0vh, 0vh)",
      opacity: 1,
    },
  });
  const spring2 = useSpring({
    to: {
      transform: animateStay
        ? "translate(12.5vh, 30.9vh)"
        : "translate(0vh, 0vh)",
    },
    from: {
      transform: "translate(0vh, 0vh)",
    },
  });
  async function generate() {
    let global = [];
    maxErr = 0;

    //reset board
    alph.map((i) => {
      dict.map((c) => {
        board[i][c - 1] = " ";
        global.push(i + c);
      });
    });

    //reset board
    //recurs get next

    async function getNext(y, x) {
      //offset for wraparond
      if (y === "I" && x === 9) {
        changeBoard(untether(board));
        return;
      }
      if (x >= 9) {
        //line has completed, moving on to next
        //call next animation
        //reset x/y for next row
        x = 0;
        y = alph[alph.indexOf(y) + 1];
      }
      let localPoss = possibilities(y, x, board);
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

      getNext(y, x + 1);
    }
    //recurs delete row
    async function backtrack(y) {
      board[y] = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
      getNext(y, 0);
    }
    //generate new board
    getNext("A", 0);
    //on avg we reach successful reduction @ around 80 - 90 recursions
    return;
  }

  async function stripIt(l) {
    changeHideBoards(false);
    changeAnimate4(false);
    //await wait(300, "Puzzle solveable, deleting next", changeNarration);
    //end recursion condition
    if (l === 0 || maxErr === 20) {
      changeHideAnims(true);
      changeAnimate4(true);
      await wait(1000, "No more cells can be deleted", changeNarration);
      changeHideBoards(true);
      await wait(1000, "Puzzle completed!", changeNarration);
      //reset vars
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
      //solved
      await wait(1000, "Finished!", changeNarration);
      stripIt(0);
      maxErr = 0;
      deleteArr = [];
      changeBoard({ ...board });
      return;
    }
    let [y, x] = r;
    replace.y = y;
    replace.x = x;

    let current = board[r[0]][r[1]];
    //delete from board, left, add to delete
    left.map((f) => {
      if (f === r) {
        deleteArr.push(f);
        left.splice(left.indexOf(r), 1);
      }
    });
    board[r[0]][r[1]] = "_";
    let solveable = solveIt(10, true, board);
    deleteArr.map((r) => {
      board[r[0]][r[1]] = "_";
    });
    changeBoard(untether(board));
    //can be solved, call recurs
    if (solveable) {
      changeHideAnims(false);
      changeAnimateDrops(true);
      await wait(500, "Puzzle solveable, deleting next", changeNarration);
      let dashBoard = untether(board);
      alph.map((y) => {
        dict.map((x) => {
          dashBoard[y][x] = dashBoard[y][x] === "_" ? "_" : " ";
        });
      });
      changeBoard2(dashBoard);

      changeAnimateDrops(false);
      await wait(600, "Puzzle solveable, deleting next", changeNarration);
      changeHideAnims(true);
      await wait(0, "Puzzle solveable, deleting next", changeNarration);
      stripIt(l - 1);
      //cannot be solved, backtracking
    } else {
      replace2.y = y;
      replace2.x = x;
      board[r[0]][r[1]] = current;

      changeHideAnims(false);
      changeAnimateStay(true);
      await wait(500, "Unsolveable without cell, put it back", changeNarration);
      changeAnimateStay(false);
      await wait(800, "Unsolveable without cell, put it back", changeNarration);
      changeBoard(untether(board));
      changeHideAnims(true);
      await wait(0, "Unsolveable without cell, put it back", changeNarration);
      maxErr++;
      replace2.y = "X";
      replace2.x = "0";
      deleteArr.splice(deleteArr.indexOf(r), 1);
      console.log("Unsolveable");
      stripIt(l - 1);
    }
  }
  return (
    <div className="poppedApp">
      <div className="poppedUI">
        <div className="animContainer">
          {/* 
            --------------------------First anim layer--------------------------
            */}
        </div>
        {/* -----------------------Layer 1--------------------- */}
        <animated.div style={finished1} className={"Layer1 activeLayer"}>
          <div className="stripItNarration">{narration}</div>
          <div>
            <animated.div style={spring1}>
              <div className="animStripIt1">
                {alph.map((y) => {
                  return (
                    <Row className="animPoppedRow2" style={{}}>
                      {dict.map((x) => {
                        return (
                          <Col
                            className="stripItCol2"
                            sm={1.07}
                            style={{
                              opacity:
                                `${activeDrop.x + 1}` === x &&
                                activeDrop.y === y &&
                                hideAnims === false
                                  ? 1
                                  : 0,
                              color:
                                `${activeDrop.x + 1}` === x &&
                                activeDrop.y === y
                                  ? "hotpink"
                                  : "aqua",
                            }}
                          >
                            {displayBoard[y][x - 1]}
                          </Col>
                        );
                      })}
                    </Row>
                  );
                })}
              </div>
            </animated.div>
            <animated.div style={spring2}>
              <div className="animStripIt2">
                {alph.map((y) => {
                  return (
                    <Row
                      className="animPoppedRow2"
                      style={{
                        opacity: hideAnims ? 0 : 1,
                      }}
                    >
                      {dict.map((x) => {
                        return (
                          <Col
                            sm={1.07}
                            className="stripItCol"
                            style={{
                              marginLeft: ".98vh",
                              marginTop: "-.01vh",
                              opacity: hideAnims ? 0 : 1,
                            }}
                          >
                            {`${replace2.x + 1}` === x && replace2.y === y
                              ? board[y][x - 1]
                              : " "}
                          </Col>
                        );
                      })}
                    </Row>
                  );
                })}
              </div>
            </animated.div>
          </div>
          <div style={{ opactiy: hideAnims ? 0 : 1 }}>
            {tables(emptyBoard, true)}
          </div>
          <div style={{ opactiy: hideAnims ? 0 : 1 }}>
            <animated.div className="animPoppedOffset">
              {alph.map((y) => {
                return (
                  <Row className="animPoppedRow2">
                    {dict.map((x) => {
                      return (
                        <Col
                          className="animPoppedCol2"
                          style={{
                            color:
                              displayBoard[y][x - 1] === "_"
                                ? "hotpink"
                                : "aqua",
                          }}
                          sm={1.062}
                        >
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
        <div style={{ opacity: hideBoards ? 0 : 1 }}>
          <animated.div style={finished2} className={"Layer2 "}>
            {tables(displayBoard2)}
          </animated.div>
          {/* -----------------------Layer 3--------------------- */}
          <animated.div style={finished3} className="Layer3">
            {tables(displayBoard3)}
          </animated.div>
          {/* -----------------------Layer 4--------------------- */}
          <animated.div style={finished4} className={"Layer4"}>
            {tables(displayBoard4)}
          </animated.div>
        </div>
      </div>
      <div className="poppedButtons" style={{ zIndex: 10 }}>
        <button
          type="button"
          className="btn btn-outline-info"
          onClick={() => stripIt(100)}
        >
          STRIP IT
        </button>
        <button
          type="button"
          className="btn btn-outline-info"
          onClick={() => {
            changeAnimate4((p) => !p);
          }}
        >
          Animate
        </button>
      </div>
    </div>
  );
}

export default StripIt;
