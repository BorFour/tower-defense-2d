class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class EmptyCell extends Cell {
  get type() {
    return 2;
  }
}

class SolidCell extends Cell {
  get type() {
    return 1;
  }
}

class Door {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }

  isInDoor(p) {
    if (p.x == this.from.x && this.from.x == this.to.x) {
      return (p.y >= this.from.y && p.y <= this.to.y) || (p.y >= this.to.y && p.y <= this.from.y);
    } else if (p.y == this.from.y && this.from.y == this.to.y) {
      return (p.x >= this.from.x && p.x <= this.to.x) || (p.x >= this.to.x && p.x <= this.from.x);
    }
    return false;
  }
}


/**
 * This class holds a single room
 *
 * It has entrances
 *
 */

class Room {
  constructor(arg) {
    this.x = arg.x;
    this.y = arg.y;
    this.leftDoor = arg.leftDoor;
    this.rightDoor = arg.rightDoor;
    this.upDoor = arg.upDoor;
    this.downDoor = arg.downDoor;
    this.cells = []
  }
  putPattern(pattern) {
    let cells = pattern();
    for (var key in cells) {
      this.cells.push(cells[key]);
    }
  }
  removeDuplicates() {
    this.cells = this.cells.filter((elem, index, self) => {
      return index == self.indexOf(elem);
    });
  }
  removeDoors() {
    this.cells = this.cells.filter((currentValue) => {
      let c = currentValue;
      let isDoor = false;
      if (this.leftDoor) isDoor = isDoor || this.leftDoor.isInDoor(c);
      if (this.rightDoor) isDoor = isDoor || this.rightDoor.isInDoor(c);
      if (this.upDoor) isDoor = isDoor || this.upDoor.isInDoor(c);
      if (this.downDoor) isDoor = isDoor || this.downDoor.isInDoor(c);
      return !isDoor;
    })
  }
  applyOffsetCells() {
    return this.cells.map((cell) => {
      let newCell = cell;
      newCell.x += this.x;
      newCell.y += this.y;
      return newCell;
    })
  }
  roomCells() {
    this.removeDuplicates();
    this.removeDoors();
    return this.applyOffsetCells();
  }
}

class Stage {
  constructor(map) {
    this.map = map;
    this.rooms = [];
  }
  addRoom(room) {
    this.rooms.push(room);
  }
  putCell(cell) {
    this.map.putTile(cell.type, cell.x, cell.y)
  }
  putPattern(pattern) {
    let cells = pattern();
    for (var key in cells) {
      stage.putCell(cells[key]);
    }
  }
  putRoom(room) {
    let cells = room.roomCells();
    for (var key in cells) {
      stage.putCell(cells[key]);
    }
  }
  putRooms() {
    for (var key in this.rooms) {
      this.putRoom(this.rooms[key]);
    }
  }
  get length() {
    return 1;
  }
}
