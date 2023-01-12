const { projection } = require("./misc");
// import { config } from "react-spring";

export let springDuration = 300;
export let mediumDuration = 500;
export let snappyDuration = 100;
export let stampStart = {
  config: {
    duration: springDuration,
  },
  from: {
    opacity: 1,
    color: "aqua",
    transform: "translate3d(0px,0px,0px)",
    border: "1px aqua solid",
    backgroundColor: "#282c3400",
  },
};
export let stampFinish = {
  loop: () => ({
    color: "aqua",
    transform: "translate3d(0px,0px,0px)",
    border: "1px aqua solid",
  }),
  to: {
    color: "hotpink",
    transform: `translate3d(${projection(110).x}px, ${projection(110).y}px, 0)`,
    border: "1px hotpink solid",
  },
};
export let stripItFloat = {
  config: { duration: snappyDuration },
  loop: () => ({
    transform: "translate3d(0px,0px,0px)",
  }),
  to: {
    transform: `translate3d(${projection(-20).x}px, ${projection(-20).y}px, 0)`,
  },
};
export let stripItStamp = {
  config: { duration: springDuration },
  loop: () => ({
    // hello this is updated
    backgroundColor: "#FF69B477",
    transform: "translate3d(0px,0px,0px)",
  }),
  to: {
    color: "red",
    color: "hotpink",
    transform: `translate3d(${projection(110).x}px, ${projection(110).y}px, 0)`,
  },
};
export let highStart = {
  config: {
    duration: springDuration,
  },
  from: {
    opacity: 1,
    color: "aqua",
    transform: "translate3d(0px,0px,0px)",
    border: "1px aqua solid",
  },
};
export let highFinish = {
  loop: () => ({
    color: "aqua",
    transform: "translate3d(0px,0px,0px)",
    border: "1px aqua solid",
  }),
  to: {
    color: "hotpink",
    transform: `translate3d(${projection(-40).x}px, ${projection(-40).y}px, 0)`,
    border: "1px hotpink solid",
  },
};
export let exposeStart = {
  to: {
    transform: "skew(0deg) scaleY(1) translate(0px, 0px)",
    opacity: 1,
  },
};
export let exposeFinish = (position) => ({
  to: {
    transform: `skew(-30deg) scaleY(0.7) translate(${position.x}px, ${position.y}px)`,
    opacity: 1,
  },
});
export let pointerStart = () => ({
  from: {
    transform: `translate(0vh, 0vh) `,
  },
});
export let pointerAnim = (pointerIndex) => ({
  transform: `translate(0%, ${pointerIndex}%)`,
});

export let borderAnimStart = {
  // config: config.wobbly,
  opacity: 0,
  transform: `translate3d(0px,0px,0px) scale(1, 1) `,
};
export let borderAnimEnd = (cExpand) => ({
  loop: () => ({
    opacity: 0,
    transform: `translate3d(0px,0px,0px) scale(1, 1) `,
  }),
  onRest: () => {
    cExpand(false);
  },
  opacity: 1,
  transform: `translate3d(${projection(-240).x}px,${
    projection(-240).y
  }px,0px) scale(1.2, 1.2) `,
});
