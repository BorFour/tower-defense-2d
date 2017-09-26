function distanceToPointer(displayObject, pointer) {
  this._dx = displayObject.x - pointer.x;
  this._dy = displayObject.y - pointer.y;
  return Math.sqrt(this._dx * this._dx + this._dy * this._dy);
}

function moveToXY(displayObject, x, y, speed) {
  var _angle = Math.atan2(y - displayObject.y, x - displayObject.x);
  var x = Math.cos(_angle) * speed;
  var y = Math.sin(_angle) * speed;
  return {
    x: x,
    y: y
  };
}

function getCursorCoords() {
  return {
    x: game.input.x + game.camera.x,
    y: game.input.y + game.camera.y
  };
}

function getEnemies(characters, team) {
  let ret = [];
  if(PJ.alive && team != PJ.team) ret.push(PJ);
  characters.forEach((item) => {
    if(item.alive && item.team != team) ret.push(item);
  });
  return ret;
}

function getNearestTomb(p, tombs) {
  let aliveTombs = tombs.filter((item) => {
    return item.alive;
  })
  let nearest = null;
  let nearestDistance = 400000;
  for (tomb of aliveTombs) {
    let currDistance = game.physics.arcade.distanceBetween(p, tomb);
    if (currDistance < nearestDistance) {
      nearest = tomb;
      nearestDistance = currDistance;
    }
  }
  return nearest;
}

function getNearestTarget(p, targets) {
  let nearest = null;
  let nearestDistance = 400000;
  for (target of targets) {
    let currDistance = game.physics.arcade.distanceBetween(p, target);
    if (currDistance < nearestDistance) {
      nearest = target;
      nearestDistance = currDistance;
    }
  }
  return nearest;
}
