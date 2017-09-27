class GamepadController extends Controller {
  constructor() {
    super(Controller.GAMEPAD);
    this.type = Controller.GAMEPAD;
    game.input.gamepad.start();
    this.gamepad = game.input.gamepad.pad1;

  }

  handleOnDown(main) {
    var leftStickY = this.gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y);
    // console.log(leftStickY);

    if (this.gamepad.justPressed(Phaser.Gamepad.XBOX360_A)) {
      if (leftStickY > .5) {
        handleDownKey();
      } else {
        handleJump();
      }
    }

    if (this.gamepad.justPressed(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER)) {
      let coords = GAME.controller.shootPoint();
      PJ.currentWeapon.onDown(coords);
    }

    if (this.gamepad.justPressed(Phaser.Gamepad.XBOX360_B)) {
      // handleResurrectKey();
      if (this.boostDown()) {
        handleBackflip();
      } else {
        handleFrontflip();
      }
    }
    if (this.gamepad.justPressed(Phaser.Gamepad.XBOX360_X)) {
      if (this.boostDown()) {
        handlePunch();
      } else {
        handlePunch2();
      }
    }
    if (this.gamepad.justPressed(Phaser.Gamepad.XBOX360_Y)) {
      handlePickNearest();
    }

    if (this.gamepad.justPressed(Phaser.Gamepad.XBOX360_DPAD_DOWN)) {
      handleDownKey();
    }
    if (this.gamepad.justPressed(Phaser.Gamepad.XBOX360_STICK_RIGHT_BUTTON)) {
      handleGrenadeDown();
      handleGrenadeUp();
    }

    if (this.gamepad.justPressed(Phaser.Gamepad.XBOX360_BACK)) {
      handleShop();
    }

    if (this.gamepad.justPressed(Phaser.Gamepad.XBOX360_START)) {
      // handleControls();
      handlePause();
    }

    if (this.gamepad.justPressed(Phaser.Gamepad.XBOX360_DPAD_LEFT)) {
      handlePrevItem();
    }
    if (this.gamepad.justPressed(Phaser.Gamepad.XBOX360_DPAD_RIGHT)) {
      handleNextItem();
    }

    if (this.gamepad.justPressed(Phaser.Gamepad.XBOX360_LEFT_BUMPER)) {
      PJ.prevWeapon();
    }
    if (this.gamepad.justPressed(Phaser.Gamepad.XBOX360_RIGHT_BUMPER)) {
      PJ.nextWeapon();
    }
  }

  handleOnUp(main) {

    // if (this.gamepad.justReleased(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER)) {
    PJ.currentWeapon.onUp(this.shootPoint());
    // }
  }

  setUpControls(main) {
    this.gamepad.addCallbacks(this, {
      onDown: this.handleOnDown,
      onUp: this.handleOnUp
    });

    // this.pauseKey.onDown.add(handlePause);
    // this.gamepad.callbackContext = this;
    this.setUpButtons(main);
  }

  setUpButtons(main) {

  }


  downDown() {
    // TODO:
    return this.gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1;
  }

  leftDown() {
    return this.gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1;
  }

  rightDown() {
    return this.gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1;
  }

  boostDown() {
    return this.gamepad.isDown(Phaser.Gamepad.XBOX360_LEFT_TRIGGER);
  }

  shootDown() {
    return this.gamepad.isDown(Phaser.Gamepad.XBOX360_RIGHT_TRIGGER);
  }

  shootDirection() {
    // var rightStickX = this.gamepad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X);
    // var rightStickY = this.gamepad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y);
    //
    // return {
    //   x: rightStickX,
    //   y: rightStickY
    // };
    return this.shootPoint();
  }

  shootPoint() {
    var rightStickX = this.gamepad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X);
    var rightStickY = this.gamepad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y);

    return {
      x: PJ.x + rightStickX * game.camera.width / 2,
      y: PJ.y + rightStickY * game.camera.height / 2
    };
  }
}
