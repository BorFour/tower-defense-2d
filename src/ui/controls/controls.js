class Controller {
  constructor(type) {
    this.type = type;
  }
}

Controller.KEYBOARD = 0;
Controller.GAMEPAD = 1;
Controller.getInstance = () => {
  if (GAME.controllerType == Controller.KEYBOARD) {
    return new KeyboardController();
  } else if (GAME.controllerType == Controller.GAMEPAD) {
    return new GamepadController();
  }
}

function handleJump() {
  PJ.jump();
}

function handleDownKey() {
  PJ.body.velocity.y = gameOptions.playerJump;
  PJ.play('crouch');
}

function handleResurrectKey() {
  let nearestTomb = getNearestTomb(PJ, GAME.tombs);
  if (nearestTomb && nearestTomb.use()) {
    GAME.HUD.controls.armyOfDead.use();
  }
}

function handleCommandMinions() {
  let newTarget = GAME.controller.commandPoint();

  PJ.minions.map((item) => {
    item.base = newTarget;
    item.target = newTarget;
  });
  GAME.HUD.cross = game.add.sprite(newTarget.x, newTarget.y, 'cross');
  GAME.HUD.cross.anchor.set(.5);
  GAME.HUD.cross.width = 30;
  GAME.HUD.cross.height = 30;
  GAME.HUD.cross.scale.set(0);

  GAME.HUD.crossAnimation = game.add.tween(GAME.HUD.cross.scale).to({
    x: .1,
    y: .1
  }, 250, "Linear", true, 0, 0);
  GAME.HUD.crossAnimation.onComplete.add(() => {
    GAME.HUD.cross.kill();
  }, this);
  GAME.HUD.crossAnimation.yoyo(true, 1);

  if (PJ.minions.length > 0) {
    GAME.HUD.controls.goToIcon.use();
  }
}

function handleComeBack() {
  PJ.minions.map((item) => {
    item.base = PJ;
    item.target = PJ;
  });
  if (PJ.minions.length > 0) GAME.HUD.controls.homeIcon.use();
}

function handleMute() {
  game.sound.mute = !game.sound.mute;
}

function handlePause() {
  game.paused = !game.paused;
  if(game.paused) {
    // GAME.HUD.showPause(true);
    GAME.HUD.keybindings.scale.x = 1;
    GAME.HUD.keybindings.scale.y = 1;
    GAME.GUI.open();
  } else {
    // GAME.HUD.showPause(false);
    GAME.HUD.keybindings.scale.x = 0;
    GAME.HUD.keybindings.scale.y = 0;
    GAME.GUI.close();
  }
}

function handleControls() {
  // let newScale = GAME.HUD.controls.scale.x == 0 ? 1 : 0;
  // game.add.tween(GAME.HUD.controls.scale).to({
  //   x: newScale,
  //   y: newScale
  // }, 500, Phaser.Easing.Cubic.None, true, 1, 0, false);
    let newScale = GAME.HUD.keybindings.scale.x == 0 ? 1 : 0;
    game.add.tween(GAME.HUD.keybindings.scale).to({
      x: newScale,
      y: newScale
    }, 500, Phaser.Easing.Cubic.None, true, 1, 0, false);
}

function handleBackflip() {
  if (GAME.controller.boostDown()) {
    PJ.minions.map((minion) => {
      if (minion.key == "undead") {
        minion.backflip();
      }
    });
  }
  PJ.backflip();
}

function handleFrontflip() {
  if (GAME.controller.boostDown()) {
    PJ.minions.map((minion) => {
      if (minion.key == "undead") {
        minion.frontflip();
      }
    });
  }
  PJ.frontflip();

}

function handleGrenadeDown() {
  if (PJ.grenade) {
    game.time.events.remove(PJ.grenade.explodeTimer);
    PJ.grenade.die();
  }
  let coords = GAME.controller.shootPoint();
  PJ.create_grenade(coords);
  if (PJ.grenade) {
    PJ.line1 = new Phaser.Line(PJ.x, PJ.y, PJ.grenade.x, PJ.grenade.y);
    PJ.graphics = game.add.graphics(PJ.x, PJ.y);
    PJ.graphics.quadraticCurveTo(coords.x, coords.y, 480, 100);
    window.graphics = PJ.graphics;
  }
}

function handleGrenadeUp() {
  PJ.throw_grenade();
  PJ.line1 = null;
}

function handleShop() {
  GAME.shop.purchaseItem();
}

function handleNextItem() {
  GAME.shop.nextSelected();
}

function handlePrevItem() {
  GAME.shop.prevSelected();
}

function handlePunch() {
  PJ.makePunchJump(150);
}

function handlePunch2() {
  PJ.makePunchDash2(50);
}

function handlePickNearest() {
  if(PJ.nearestPickable) PJ.nearestPickable.onPick(PJ.nearestPickable, PJ);
  GAME.pickablesManual = GAME.pickablesManual.filter((item) => {
    return item && item.alive;
  })
}
