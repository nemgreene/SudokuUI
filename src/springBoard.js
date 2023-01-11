import React, { useEffect, useRef } from "react";
// import { Container, Row, Col } from "react-grid-system";
// import Table from "react-bootstrap/Table";
import { useSpring, useSprings, animated } from "@react-spring/web";
import { extractPod, dict, alph } from "./utilityComponents/misc.js";
import {
  stampStart,
  stampFinish,
  pointerAnim,
  borderAnimStart,
  borderAnimEnd,
} from "./utilityComponents/animObjects.jsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function SpringBoard({
  board,
  coords,
  narration,
  pointerIndex,
  isBase,
  completed,
  cExpand,
  expand,
  cCompleted,
}) {
  const isMounted = useRef(false);
  // consruct spring for pointer
  const pointer = useSpring(pointerAnim(pointerIndex));
  // construct spring for animated border effect
  const finalBorder = useSpring(
    completed ? borderAnimEnd(cExpand) : borderAnimStart
  );
  //constructs 81 springs ready for papa
  const [rows, rowApi] = useSprings(81, (index) => stampStart);
  //   destructures strings into 9 arrays of 9
  const switchBoard = Array(9)
    .fill("")
    .map((_, i) => rows.slice(i * 9, (i + 1) * 9));

  // This function will operate the switchboard of what cell/s need to move
  useEffect(() => {
    const handler = (coordX, coordY, trans = {}, section = null) => {
      switch (section) {
        // used to drop a whole row
        case "parallel":
          rowApi.start((index) => (coordX.includes(index) ? trans : null));
          break;
        // used to drop a whole board
        case "board":
          rowApi.start((index) => trans);
          break;
        case "row":
          rowApi.start((index) =>
            index >= coordY * 9 && index < coordY * 9 + 9 ? trans : null
          );
          break;
        // used to drop a whole block
        case "block":
          let pod = extractPod(coordX, coordY);
          rowApi.start((index) => (pod.includes(index) ? trans : null));
          break;
        case "section":
          let pods = [
            ...extractPod(coordX - 8, coordY),
            ...extractPod(coordX - 4, coordY),
            ...extractPod(coordX, coordY),
          ];
          rowApi.start((index) => (pods.includes(index) ? trans : null));
          break;
        default:
          rowApi.start((index) =>
            index === coordX * 9 + coordY ? trans : null
          );
      }
    };
    if (isMounted.current) {
      handler(
        coords.x,
        coords.y,
        coords.trans ? coords.trans : stampFinish,
        coords.section
      );
    } else {
      isMounted.current = true;
    }
  }, [coords, rowApi]);

  // useEffect(() => {
  //   return () => {
  //     if (expand) {
  //       return;
  //     }
  //     finalBorderApi.start(() => borderAnimEnd(cExpand));
  //   };
  // }, [completed, expand, cExpand, finalBorderApi]);

  return (
    <div>
      <Container className="hudContainer">
        <div className="crossContainer">
          <div className="hLines"></div>
          <div className="vLines"></div>
        </div>
        {/* animated border effect */}
        {isBase ? (
          <animated.div style={{ ...finalBorder }} className="waveContainer" />
        ) : null}
        {/* animated narration */}
        {narration ? (
          <div className="narrationContainer">
            <animated.div style={pointer} className="narrationCol">
              {`${narration}`}
            </animated.div>
          </div>
        ) : null}
        {/* Table */}
        <Row className="headerRow flex-nowrap">
          <Col className="borderCell"></Col>
          {dict.map((x) => {
            return (
              <Col
                className="borderCell nthCell"
                style={{ color: "aqua" }}
                key={x - 1}
              >
                {x - 1}
              </Col>
            );
          })}
          <Col className="borderCell"></Col>
        </Row>
        {switchBoard.map((row, rowIndex) => (
          <Row className="ContainerRow flex-nowrap nthRow" key={rowIndex}>
            <Col className="borderCell">{rowIndex}</Col>
            {row.map((styles, key) => (
              <animated.div className="col nthCell" key={key} style={styles}>
                <Col className="animCell ">{board[alph[rowIndex]][key]}</Col>
              </animated.div>
            ))}
            <Col className="borderCell"></Col>
          </Row>
        ))}
      </Container>
    </div>
  );
}
export default React.memo(SpringBoard);
