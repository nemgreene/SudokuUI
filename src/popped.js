import React, { useState } from "react";
//import { Container, Row, Col } from "react-grid-system";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Generate from "./poppedComponents/generate";
import StripIt from "./poppedComponents/stripIt";

function Popped(props) {
  const [overlay, changeOverlay] = useState("Generate");
  console.log(props);
  return (
    <div>
      {overlay === "Generate" ? (
        <Generate changeOverlay={props.changeOverlay} />
      ) : overlay === "StripIt" ? (
        <StripIt />
      ) : (
        <div>Solveit</div>
      )}
    </div>
  );
}

export default Popped;
