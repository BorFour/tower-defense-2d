class KeyboardController extends Controller {
  constructor() {
    super(Controller.KEYBOARD);
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.boostKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    this.oneKey = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    this.twoKey = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    this.threeKey = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    this.muteKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
    this.controlsKey = game.input.keyboard.addKey(Phaser.Keyboard.C);
    this.backflipKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    this.frontflipKey = game.input.keyboard.addKey(Phaser.Keyboard.E);
    this.grenadeKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
    this.shopKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
    this.nextItemKey = game.input.keyboard.addKey(Phaser.Keyboard.N);
    this.pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    this.pickItemKey = game.input.keyboard.addKey(Phaser.Keyboard.F);
  }

  setUpControls(main) {
    game.canvas.oncontextmenu = function(e) {
      e.preventDefault();
    }
    this.setUpKeyboard(main);
    this.setUpMouse(main);
  }

  setUpMouse(main) {
    ///////////////
    // Mouse
    ///////////////

    game.input.mouse.mouseWheelCallback = () => {
      if (this.boostDown()) {
        if (game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_UP) {
          handleNextItem();
        } else {
          handlePrevItem();
        }
      } else {
        if (game.input.mouse.wheelDelta === Phaser.Mouse.WHEEL_UP) {
          PJ.nextWeapon();
        } else {
          PJ.prevWeapon();
        }
      }
    }


    game.input.onDown.add(() => {
      if (game.input.activePointer.rightButton.isDown) {
        GAME.HUD.controls.punchIcon.use();
        if (this.boostDown()) {
          handlePunch();
        } else {
          handlePunch2();
        }
      }
      if (game.input.activePointer.middleButton.isDown) {
        handleShop();
      }
      if (game.input.activePointer.leftButton.isDown) {
        let coords = GAME.controller.shootPoint();
        PJ.currentWeapon.onDown(coords);
      }

    }, main);

    game.input.onUp.add(() => {
      if (game.input.activePointer.leftButton.isDown) {
        PJ.currentWeapon.onUp(GAME.controller.shootPoint());
      }
    }, main);

  }

  setUpKeyboard(main) {
    this.jumpKey.onDown.add(handleJump, main);
    this.downKey.onDown.add(handleDownKey, main);
    this.oneKey.onDown.add(() => {
      PJ.currWeapon = 0;
    }, main);
    this.twoKey.onDown.add(() => {
      PJ.currWeapon = 1;
    }, main);
    this.threeKey.onDown.add(() => {
      PJ.currWeapon = 2;
    }, main);
    this.muteKey.onDown.add(handleMute);
    this.controlsKey.onDown.add(handleControls, main);
    this.backflipKey.onDown.add(handleBackflip, main);
    this.frontflipKey.onDown.add(handleFrontflip, main);
    this.grenadeKey.onDown.add(handleGrenadeDown, main);
    this.grenadeKey.onUp.add(handleGrenadeUp, main);
    this.shopKey.onDown.add(handleShop);
    this.nextItemKey.onDown.add(handleNextItem);
    this.pauseKey.onDown.add(handlePause);
    this.pickItemKey.onDown.add(handlePickNearest);
  }

  leftDown() {
    return this.leftKey.isDown;
  }

  rightDown() {
    return this.rightKey.isDown;
  }

  downDown() {
    return this.downKey.isDown;
  }

  boostDown() {
    return this.boostKey.isDown;
  }

  shootDown() {
    return game.input.activePointer.leftButton.isDown;
  }

  shootDirection() {
    let lookingRight = PJ.scale.x > 0;
    let inputX = game.input.x + game.camera.x;

    if (lookingRight && inputX < PJ.x) {
      return null;
    } else if (!lookingRight && inputX > PJ.x) {
      return null;
    }

    return {
      x: inputX,
      y: game.input.y + game.camera.y
    };
  }

  commandPoint() {
    return {
      x: game.input.x + game.camera.x,
      y: game.input.y + game.camera.y
    };
  }

  shootPoint() {
    return this.shootDirection();
  }

}
