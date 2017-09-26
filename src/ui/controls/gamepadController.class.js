class GamepadController extends KeyboardController {
  constructor() {
    super(Controller.GAMEPAD);
    this.type = Controller.GAMEPAD;
    game.input.gamepad.start();
    this.gamepad = game.input.gamepad.pad1;

    // super(Controller.KEYBOARD);
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.boostKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    this.commandMinionsKey = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
    this.resurrectKey = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    this.comeBackKey = game.input.keyboard.addKey(Phaser.Keyboard.THREE);
    this.muteKey = game.input.keyboard.addKey(Phaser.Keyboard.M);
    this.controlsKey = game.input.keyboard.addKey(Phaser.Keyboard.C);
    this.backflipKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    this.frontflipKey = game.input.keyboard.addKey(Phaser.Keyboard.E);
    this.grenadeKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
    this.shopKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
    this.nextItemKey = game.input.keyboard.addKey(Phaser.Keyboard.N);
    this.pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    
  }


  handleButtons(main) {


    var leftStickY = this.gamepad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y);
    console.log(leftStickY);

    if (this.gamepad.justPressed(Phaser.Gamepad.XBOX360_A)) {
      if (leftStickY > .5) {
        handleDownKey();
      } else {
        handleJump();
      }
    }
    if (this.gamepad.justPressed(Phaser.Gamepad.XBOX360_B)) {
      handleResurrectKey();
    }
    if (this.gamepad.justPressed(Phaser.Gamepad.XBOX360_X)) {
      if (this.boostDown()) {
        handlePunch();
      } else {
        handlePunch2();
      }
    }
    if (this.gamepad.justPressed(Phaser.Gamepad.XBOX360_LEFT_BUMPER)) {
      if (this.boostDown()) {
        handleComeBack();
      } else {
        handleCommandMinions();
      }

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

    }
    if (this.gamepad.justPressed(Phaser.Gamepad.XBOX360_RIGHT_BUMPER)) {
      handleFrontflip();
      if (this.boostDown()) {
        handleBackflip();
      } else {
        handleFrontflip();
      }
    }
  }

  setUpControls(main) {
    this.gamepad.addCallbacks(this, {
      onDown: this.handleButtons
    });

    this.pauseKey.onDown.add(handlePause);
    // this.gamepad.callbackContext = this;
    this.setUpButtons(main);
  }

  setUpButtons(main) {

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
    var rightStickX = this.gamepad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X);
    var rightStickY = this.gamepad.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y);

    return {
      x: rightStickX,
      y: rightStickY
    };
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
