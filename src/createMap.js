var stage;

var mapHeight = 62;
var mapWidth = 100;

const ROOM_H = 30;
const ROOM_W = 50;
const CELL_H = 16;
const CELL_W = 16;

function createMapProc(map) {
  stage = new Stage(map)

  // Room1
  room1 = new Room({
    x: 0,
    y: 0,
    rightDoor: new Door({
      x: ROOM_W - 1,
      y: 5
    }, {
      x: ROOM_W - 1,
      y: 15
    }),
    downDoor: new Door({
      x: ROOM_W / 2 + 8,
      y: ROOM_H - 1
    }, {
      x: ROOM_W / 2 + 15,
      y: ROOM_H - 1
    })
  });

  // Room2
  room2 = new Room({
    x: ROOM_W,
    y: 0,
    leftDoor: new Door({
      x: 0,
      y: 5
    }, {
      x: 0,
      y: 15
    })
  });

  // Room3
  room3 = new Room({
    x: 0,
    y: ROOM_H,
    upDoor: new Door({
      x: ROOM_W / 2 + 8,
      y: 0
    }, {
      x: ROOM_W / 2 + 15,
      y: 0
    })
  });

  room1.putPattern(createBorders);
  // room1.putPattern(Patterns.column.bind(null, 40, 20, mapHeight-1));
  room1.putPattern(Patterns.stairs.bind(null, 1, 15, 30, ROOM_H - 1 - 15, false, true));
  room1.putPattern(Patterns.stairs.bind(null, 9, ROOM_H - 17, 40, 80, true, true));

  room2.putPattern(createBorders);
  // room2.putPattern(Patterns.column.bind(null, 40, 20, ROOM_H-1));
  room2.putPattern(Patterns.stairs.bind(null, 1, 15, 40, ROOM_H - 1 - 15, false, true));

  room3.putPattern(createBorders);
  room3.putPattern(Patterns.column.bind(null, 40, 20, ROOM_H - 1));
  room3.putPattern(Patterns.stairs.bind(null, 1, 10, 40, ROOM_H - 1 - 15, false, true));

  // Add the room to the stage
  stage.addRoom(room1);
  stage.addRoom(room2);
  stage.addRoom(room3);
  stage.putRooms();
}
