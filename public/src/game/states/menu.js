var text;

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

var preMenu = function(game) {}
preMenu.prototype = {
  preload: function() {
    game.load.path = "public/assets/";
    // Buttons
    game.load.image("enterRoom", "enterRoom.png");
    game.load.image("changeMap", "change_map.png");
    game.load.image("keyboard", "keyboard.png");
    game.load.image("gamepad", "gamepad.png");
    game.load.image("donpatchojeras", "donpatchojeras.jpg");
    game.load.spritesheet('grannyx4', 'abuela_spritesheet1x512.png', 512, 512, 3);
  },
  create: function() {


    game.sound.mute = GAME.dataLoader.mute;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    if(!GAME.GUI) GAME.GUI = new GUI(); //setUpGui();
    game.clearBeforeRender = true;
    game.stage.setBackgroundColor(0x54575e);

    text = game.add.text(game.camera.width / 2, game.camera.height / 2 - 80, 'Menu');
    text.anchor.set(0.5);
    text.align = 'center';
    text.font = 'Arial Black';
    text.fontSize = 70;
    text.fontWeight = 'bold';
    text.fill = '#263b79';
    text.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);

    this.text2 = game.add.text(game.camera.width / 2, game.camera.height / 2 + 20, 'Dale a F11');
    this.text2.anchor.set(0.5);
    this.text2.align = 'center';
    this.text2.font = 'Arial Black';
    this.text2.fontSize = 20;
    this.text2.fontWeight = 'bold';

    this.textCurrentMap = game.add.text(game.camera.width / 2, game.camera.height / 2 + 80, '');
    this.textCurrentMap.anchor.set(0.5);
    this.textCurrentMap.align = 'center';
    this.textCurrentMap.font = 'Arial Black';
    this.textCurrentMap.fontSize = 20;
    this.textCurrentMap.fontWeight = 'bold';

    this.textHighscore = game.add.text(game.camera.width / 2, game.camera.height / 2 - 180, 'HIGH SCORE: ' + GAME.dataLoader.highscore);
    this.textHighscore.anchor.set(0.5);
    this.textHighscore.align = 'center';
    this.textHighscore.font = 'Arial Black';
    this.textHighscore.fontSize = 20;
    this.textHighscore.fontWeight = 'bold';

    text.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);

    this.textPatchnotes = game.add.text(110, 40, 'Don Patch Notes');
    this.textPatchnotes.anchor.set(0.5);
    this.textPatchnotes.align = 'center';
    this.textPatchnotes.font = 'Arial Black';
    this.textPatchnotes.fontSize = 20;
    this.textPatchnotes.fontWeight = 'bold';
    this.textPatchnotes.inputEnabled = true;
    this.textPatchnotes.events.onInputDown.add(() => {
      window.open('patchnotes.pdf');
    }, this);


    this.patchnotesButton = game.add.sprite(100, 100, 'donpatchojeras');
    this.patchnotesButton.anchor.set(.5)
    this.patchnotesButton.scale.set(.3);

    this.patchnotesButton.inputEnabled = true;
    this.patchnotesButton.events.onInputDown.add(() => {
        window.open('patchnotes.pdf');
    }, this);


    this.storyModeButton =  game.add.text(game.camera.width / 2 - 160, game.camera.height / 2 + 160, 'Story Mode');
    this.storyModeButton.anchor.set(.5);
    this.storyModeButton.inputEnabled = true;
    this.storyModeButton.events.onInputDown.add(() => {
      if(GAME.gameManager) GAME.gameManager.currentLevel.resetData();
      GAME.gameMode = GameManager.STORYMODE;
      game.state.start("PreloadGame");
    }, this);

    this.arcadeModeButton =  game.add.text(game.camera.width / 2 + 160, game.camera.height / 2 + 160, 'Arcade Mode');
    this.arcadeModeButton.anchor.set(.5);
    this.arcadeModeButton.inputEnabled = true;
    this.arcadeModeButton.events.onInputDown.add(() => {
      if(GAME.gameManager) GAME.gameManager.currentLevel.resetData();
      GAME.gameMode = GameManager.ARCADE;
      game.state.start("PreloadGame");
    }, this);

    this.mapButton = game.add.sprite(game.camera.width / 2,  game.camera.height / 2 + 240,  'changeMap');
    this.mapButton.anchor.set(.5)
    this.mapButton.inputEnabled = true;
    this.mapButton.events.onInputDown.add(() => {
      GAME.dataLoader.firstLevel = GAME.dataLoader.firstLevel % GAME.maxLevel + 1;
      GAME.GUI.updateDisplay();
    }, this);

    // this.controllerButton = game.add.sprite(game.camera.width / 2 + 240, game.camera.height / 2 - 200, 'keyboard');
    // this.controllerButton.anchor.set(.5)
    // this.controllerButton.inputEnabled = true;
    // this.controllerButton.events.onInputDown.add(() => {
    //   if (this.controllerButton.key == "keyboard") {
    //     GAME.controllerType = Controller.GAMEPAD;
    //     this.controllerButton.loadTexture('gamepad');
    //   } else if (this.controllerButton.key == "gamepad") {
    //     GAME.controllerType = Controller.KEYBOARD;
    //     this.controllerButton.loadTexture('keyboard');
    //   }
    // }, this);

  },

  update: function() {

    var offset = moveToXY(game.input.activePointer, text.x, text.y, 8);
    text.setShadow(offset.x, offset.y, 'rgba(0, 0, 0, 0.5)', distanceToPointer(text, game.input.activePointer) / 30);
    this.textCurrentMap.text = "Current map: " + GAME.dataLoader.firstLevel + " out of " + GAME.maxLevel;
    this.text2.text = 'Dale a F11, ' + GAME.dataLoader.name;

  }
};
