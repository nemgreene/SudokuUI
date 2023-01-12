let dict = "123456789".split(""),
  alph = "ABCDEFGHI".split("");

//calculate possibilites for [y, x] coordinates
export function possibilities(y, x, board) {
  let range = 0;

  //row possibilities
  let rowPoss = dict
    .map((i) => {
      if (board[y].includes(i) === false) {
        return i;
      } else {
        return undefined;
      }
    })
    .filter((f) => f !== undefined);

  //colum possibilities
  let colPoss = alph
    .map((i) => {
      if (dict.indexOf(board[i][x]) !== -1) {
        return board[i][x];
      } else {
        return undefined;
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
