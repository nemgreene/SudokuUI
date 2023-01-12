// let dict = "123456789".split(""),
//   alph = "ABCDEFGHI".split("");

export let skip = true;
export let dict = "123456789".split("");
export let alph = "ABCDEFGHI".split("");
export let unsolved = {
  A: [" ", "4", " ", " ", "2", " ", "8", "6", "5"],
  B: ["7", " ", " ", "6", " ", "8", " ", " ", " "],
  C: ["1", " ", " ", " ", " ", "4", "7", " ", "2"],
  D: [" ", "1", "8", "7", "4", " ", " ", " ", " "],
  E: [" ", " ", "5", "2", " ", "9", "6", " ", " "],
  F: [" ", " ", " ", " ", "8", "6", "1", "5", " "],
  G: ["9", " ", "1", "5", " ", " ", " ", " ", "6"],
  H: [" ", " ", " ", "8", " ", "2", " ", " ", "7"],
  I: ["8", "7", "3", " ", "6", " ", " ", "2", " "],
};
export let filled = {
  A: "675921384".split(""),
  B: "134578926".split(""),
  C: "982634715".split(""),
  D: "419265837".split(""),
  E: "763189452".split(""),
  F: "528347691".split(""),
  G: "256793148".split(""),
  H: "897412563".split(""),
  I: "341856279".split(""),
};
export let board = {
  A: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  B: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  C: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  D: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  E: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  F: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  G: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  H: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  I: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
};
export let emptyBoard = {
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
// calculate vector projection taking into account 30deg skew/.7 scaleY
export let projection = (units) => {
  return { x: units * 0.57749, y: units * 1.53664 };
};
// Extract pod indices in 2d space from 1d array of 81
export let extractPod = (x, y) => {
  // y 0/1/2 = 0-26
  // y 3/4/5 = 27-53
  // y 6/7/8 = 54-90
  let yRange = y < 3 ? [0, 26] : y < 6 ? [27, 53] : [54, 90];
  // make single array inside the y range
  let flats = Array(81)
    .fill("")
    .map((v, i) => i)
    .filter((v) => v >= yRange[0] && v <= yRange[1]);
  // construct to 2d model
  let constructed = [
    flats.slice(0, 9),
    flats.slice(9, 18),
    flats.slice(18, 27),
  ];
  let xRange = x < 3 ? [0, 3] : x < 6 ? [3, 6] : [6, 9];
  let reduced = constructed.map((v) => v.slice(xRange[0], xRange[1]));
  return [...reduced[0], ...reduced[1], ...reduced[2]];
};

export function untether(board) {
  return JSON.parse(JSON.stringify(board));
}

export function wait(ms, msg, changeNarration) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
    changeNarration(msg);
  });
}
