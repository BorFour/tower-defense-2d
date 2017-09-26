/**
 * createColumn - creates a column made of cells
 *
 * @param  {Integer} x  X-coordinate
 * @param  {Integer} c0 initial height
 * @param  {Integer} cF final height
 * @return {Array}    list of cells that compose the column
 */

function createColumn(x, c0, cF) {
  let cells = [];
  x = Math.max(x, 0);
  for (var i = c0; i <= cF; i++) {
    cells.push(new SolidCell(x, i))
  }

  return cells;
}

function createHill(x, c0, cF) {
  let cells = [];
  x = Math.max(x, 0);
  for (var i = c0; i <= cF; i++) {
    cells.push(new SolidCell(x, i))
  }

  return cells;
}

function createBorders() {
  let cells = [];

  for (var i = 0; i <= ROOM_W; i++) {
    cells.push(new SolidCell(i, 0))
    cells.push(new SolidCell(i, ROOM_H))
  }

  for (var i = 0; i < ROOM_H; i++) {
    cells.push(new SolidCell(0, i))
    cells.push(new SolidCell(ROOM_W - 1, i))
  }

  return cells;
}

function createStairs(x, y, w, h, upstairs, fill) {

  let cells = [];

  for (var i = 0; i <= w; i++) {
    var j;
    let currentHeight = upstairs ? Math.floor(h * (i / w)) : Math.floor(h * ((w - i) / w));

    for (j = 0; j < currentHeight; j++) {
      if (fill) {
        new_y = y + h - j;
        cells.push(new SolidCell(x + i, new_y));
      }
    }
    if (!fill) {
      new_y = y + h - j;
      cells.push(new SolidCell(x + i, new_y));
    }

  }

  return cells;
}

const Patterns = {
  column: createColumn,
  borders: createBorders,
  stairs: createStairs
};
