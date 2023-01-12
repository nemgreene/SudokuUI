import React from "react";
import { board, emptyBoard, dict, alph } from "../utilityComponents/var";
import { Container, Row, Col } from "react-grid-system";

export default function tables(inputBoard, bool) {
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
                <Col className="poppedCol" style={{ color: "aqua" }} sm={1.06}>
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
