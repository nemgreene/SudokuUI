import React, { useEffect, useState, useRef } from "react";
import {
  emptyBoard,
  projection,
  // board,
  filled,
  unsolved,
} from "./utilityComponents/misc.js";
import { generate } from "./poppedComponents/generateLogic.js";
import { solveIt } from "./poppedComponents/solveItLogic.js";
import { stripIt } from "./poppedComponents/stripItLogic.js";
import { useSprings, useSpring, animated, Globals } from "@react-spring/web";
import SpringBoard from "./springBoard";
import { exposeStart, exposeFinish } from "./utilityComponents/animObjects.jsx";
import Button from "react-bootstrap/Button";

import "./Beta.scss";

const App = () => {
  const isMounted = useRef(false);
  const [expand, cExpand] = useState(false);
  // const [skip, cSkip] = useState(false);
  const skip = false;
  const [running, cRunning] = useState(false);
  const [completed, cCompleted] = useState(false);
  const [board1, cBoard1] = useState(emptyBoard);
  const [board2, cBoard2] = useState(emptyBoard);
  const [board3, cBoard3] = useState(filled);
  const [narration, changeNarration] = useState("Waiting...");
  const [pointerIndex, changePointerIndex] = useState(0);
  const [coords, cCoords] = useState({
    c: { x: 0, y: 0 },
    b: { x: 0, y: 0 },
    a: { x: 0, y: 0 },
  });
  const [activeButton, changeActiveButton] = useState([true, false, true]);

  const positions = [projection(110), projection(0), projection(-110)];

  //   constructs 3 springs ready for 3 expanded boards
  const [boards, boardApi] = useSprings(3, (index) => ({
    transform: "skew(0deg) scaleY(1) translate(0px, 0px)",
  }));

  const generateHandler = () => {
    changeActiveButton([true, false, true]);
    generate(
      running,
      // cBoard4,
      cBoard3,
      cBoard2,
      cBoard1,
      cRunning,
      changeNarration,
      changePointerIndex,
      cCoords,
      cCompleted,
      cExpand,
      skip
    );
  };

  const solveItHandler = async () => {
    changeActiveButton([true, false, true]);
    await solveIt(
      50,
      board3,
      skip,
      changeNarration,
      cBoard3,
      cBoard2,
      cBoard1,
      cExpand,
      cCoords,
      cCompleted
    );
  };

  const stripItHandler = async () => {
    changeActiveButton([true, true, false]);
    stripIt(
      200,
      board3,
      changeNarration,
      cBoard3,
      cBoard2,
      cBoard1,
      cCompleted,
      cRunning,
      cCoords,
      cExpand,
      skip
    );
  };

  // useEffect(() => {
  //   if (isMounted.current) {
  //     Globals.assign({
  //       skipAnimation: skip,
  //     });
  //     boardApi.start((index) =>
  //       expand ? exposeFinish(positions[index]) : exposeStart
  //     );
  //   } else {
  //     isMounted.current = true;
  //   }
  // }, [expand, boardApi, positions, skip]);

  useEffect(() => {
    boardApi.start((index) => {
      return expand
        ? { ...exposeFinish(positions[index]) }
        : { ...exposeStart };
    });
  }, [expand]);

  return (
    <div className="App-body">
      {/* <div className="col">{coords.x}</div> */}

      <div className="hudContainer">
        {boards.map((styles, key) => (
          <animated.div
            className={`springboard${key} hudOffset`}
            key={key}
            style={{ opacity: key * 0.4 + 0.3, ...styles }}
            // style={{ ...styles }}
          >
            <SpringBoard
              // board={[board1, board2, board3, board4][key]}
              board={[board1, board2, board3][key]}
              coords={coords[Object.keys(coords)[key]]}
              narration={key === 2 ? narration : null}
              pointerIndex={pointerIndex}
              isBase={key === 0}
              completed={completed}
              cExpand={cExpand}
              expand={expand}
              cCompleted={cCompleted}
            />
          </animated.div>
        ))}
      </div>
      <div className="buttonContainer">
        <Button
          disabled={!activeButton[0] || running}
          className="controlButtons btn-dark btn-outline-info"
          onClick={() => {
            generateHandler();
          }}
        >
          Generate
        </Button>
        <Button
          disabled={!activeButton[1] || running}
          className="controlButtons btn-dark  btn-outline-info"
          onClick={() => {
            solveItHandler();
            // cCoords((v) => v);
            // cPositions((v) => v);
          }}
        >
          Solve It
        </Button>
        <Button
          disabled={!activeButton[2] || running}
          className="controlButtons btn-dark btn-outline-info"
          onClick={() => stripItHandler()}
        >
          Strip It
        </Button>
        <Button
          // disabled={running || expand}
          className="controlButtons btn-dark btn-outline-info"
          onClick={() => cExpand((p) => !p)}
        >
          Expand
        </Button>
      </div>
    </div>
  );
};

export default App;
