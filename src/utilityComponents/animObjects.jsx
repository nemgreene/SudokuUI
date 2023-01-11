const { projection } = require("./misc");
// import { config } from "react-spring";

module.exports = {
  springDuration: 200,
  mediumDuration: 500,
  snappyDuration: 5,

  stampStart: {
    config: {
      duration: this.springDuration,
    },
    from: {
      opacity: 1,
      color: "aqua",
      transform: "translate3d(0px,0px,0px)",
      border: "1px aqua solid",
      backgroundColor: "#282c3400",
    },
  },
  stampFinish: {
    loop: () => ({
      color: "aqua",
      transform: "translate3d(0px,0px,0px)",
      border: "1px aqua solid",
    }),
    to: {
      color: "hotpink",
      transform: `translate3d(${projection(110).x}px, ${
        projection(110).y
      }px, 0)`,
      border: "1px hotpink solid",
    },
  },
  stripItFloat: {
    config: { duration: this.snappyDuration },
    loop: () => ({
      transform: "translate3d(0px,0px,0px)",
    }),
    to: {
      transform: `translate3d(${projection(-10).x}px, ${
        projection(-10).y
      }px, 0)`,
    },
  },
  stripItStamp: {
    config: { duration: this.springDuration },
    loop: () => ({
      backgroundColor: "#fc200355",
      transform: "translate3d(0px,0px,0px)",
    }),
    to: {
      backgroundColor: "#282c3400",
      transform: `translate3d(${projection(110).x}px, ${
        projection(110).y
      }px, 0)`,
    },
  },

  highStart: {
    config: {
      duration: this.springDuration,
    },
    from: {
      opacity: 1,
      color: "aqua",
      transform: "translate3d(0px,0px,0px)",
      border: "1px aqua solid",
    },
  },
  highFinish: {
    loop: () => ({
      color: "aqua",
      transform: "translate3d(0px,0px,0px)",
      border: "1px aqua solid",
    }),
    to: {
      color: "hotpink",
      transform: `translate3d(${projection(-40).x}px, ${
        projection(-40).y
      }px, 0)`,
      border: "1px hotpink solid",
    },
  },
  exposeStart: {
    to: {
      transform: "skew(0deg) scaleY(1) translate(0px, 0px)",
      opacity: 1,
    },
  },
  exposeFinish: (position) => ({
    to: {
      transform: `skew(-30deg) scaleY(0.7) translate(${position.x}px, ${position.y}px)`,
      opacity: 1,
    },
  }),

  pointerStart: () => ({
    from: {
      transform: `translate(0vh, 0vh) `,
    },
  }),
  pointerAnim: (pointerIndex) => ({
    transform: `translate(0%, ${pointerIndex}%)`,
  }),

  borderAnimStart: {
    // config: config.wobbly,
    opacity: 0,
    transform: `translate3d(0px,0px,0px) scale(1, 1) `,
  },
  borderAnimEnd: (cExpand) => ({
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
  }),
};
