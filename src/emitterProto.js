import React from "react";
// import { Texture } from "pixi.js";

function Emitter() {
  return (
    <div className="emitterContainder">
      <div
        className="emitter1"
        style={{
          position: "absolute",
          color: "aqua",
          height: "10vw",
          width: "10vw",
          backgroundColor: "lightCoral",
        }}
      >
        Test1
      </div>
      <div
        className="emitter2"
        style={{
          top: "10vh",
          position: "absolute",
          color: "aqua",
          height: "10vw",
          width: "10vw",
          backgroundColor: "lightCoral",
        }}
      >
        test2
      </div>
    </div>
  );
}

export default Emitter;
