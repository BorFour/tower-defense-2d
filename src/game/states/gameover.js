var text;
var pointsText;

var gameOver = function(game) {}
gameOver.prototype = {
  create: function() {

    if (GAME.hardcoreMode) {
      game.camera.flash(0xbb0000, 1000, false);
    }

    if (SOUND.backgroundMusic) SOUND.backgroundMusic.stop();
    game.clearBeforeRender = true;
    game.stage.setBackgroundColor(0x54575e);

    text = game.add.text(game.camera.width / 2, game.camera.height / 2 - 80, 'Game Over');
    text.anchor.set(0.5);
    text.align = 'center';

    text.font = 'Arial Black';
    text.fontSize = 70;
    text.fontWeight = 'bold';
    text.fill = '#263b79';

    text.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);

    pointsText = game.add.text(game.camera.width / 2, game.camera.height / 2 + 20, GAME.score + " points");
    pointsText.anchor.set(0.5);
    pointsText.align = 'center';

    pointsText.font = 'Arial Black';
    pointsText.fontSize = 70;
    pointsText.fontWeight = 'bold';
    pointsText.fill = '#263b79';

    pointsText.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);


    this.menuText = game.add.text(game.camera.width / 2 - 200, game.camera.height / 2 + 120, "Menu");
    this.menuText.inputEnabled = true;
    this.menuText.events.onInputDown.add(() => {
      game.state.start("Menu");
    }, this);

    this.tryAgainText = game.add.text(game.camera.width / 2 + 50, game.camera.height / 2 + 120, "Insert Coin");
    this.tryAgainText.inputEnabled = true;
    this.tryAgainText.events.onInputDown.add(() => {
      if(GAME.gameManager) GAME.gameManager.currentLevel.resetData();
      game.state.start("PreloadGame");
    }, this);





  },

  update: function() {
    var offset = moveToXY(game.input.activePointer, text.x, text.y, 8);
    text.setShadow(offset.x, offset.y, 'rgba(0, 0, 0, 0.5)', distanceToPointer(text, game.input.activePointer) / 30);
  }
};
