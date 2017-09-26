function saveHeroArgs(hero) {
  GAME.heroArgs.money = hero.money;
}


var cactus;
var items = [];

// var hive1;
// var camps = [];
// var camp2;

var playGame = function(game) {}
playGame.prototype = {
  preload: function() {
    if (GAME.sandbox_coolTransitions) game.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/Pixelate.js');
    if (GAME.sandbox_foggyMode) game.load.script('BlurX', 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/BlurX.js');
    if (GAME.sandbox_foggyMode) game.load.script('BlurY', 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/BlurY.js');
  },
  create: function() {

    // game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    // game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    // game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.clearBeforeRender = false;
    game.camera.flash(0x000000, 1500, false);

    // game.physics.startSystem(Phaser.Physics.NINJA);
    // game.physics.startSystem(Phaser.Physics.ARCADE);

    // Background
    background = game.add.image(0, 0, 'background');
    background.width = MAX_W;
    background.height = MAX_H;

    SOUND.backgroundMusic = game.add.audio("background_music", 0.25, false);
    SOUND.backgroundMusic.loop = true;
    SOUND.backgroundMusic.play();


    GAME.collisionGroups = {};

    for (var key in Team) {
      GAME.collisionGroups[key] = game.add.group();
    }

    GAME.bots = game.add.group();
    GAME.bots.enableBody = true;
    GAME.tombs = game.add.group();
    GAME.tombs.enableBody = true;
    GAME.turrets = game.add.group();
    GAME.turrets.enableBody = true;
    GAME.bullets = game.add.group();
    GAME.bullets.enableBody = true;
    GAME.enemyBullets = game.add.group();
    GAME.enemyBullets.enableBody = true;


    GAME.gameManager.start(this);

    if (GAME.sandbox_coolTransitions) {
      var filter = game.add.filter('Pixelate', 800, 600);
      game.world.filters = [filter];
      game.add.tween(filter).to({
        sizeX: 25,
        sizeY: 25
      }, 1250, "Quad.easeInOut", true, 1, 0, true);
    }

    if (GAME.sandbox_foggyMode) {
      var blurX = game.add.filter('BlurX');
      var blurY = game.add.filter('BlurY');

      blurX.blur = 15;
      blurY.blur = 1;

      game.world.filters = [blurX, blurY];
    }

    if (GAME.sandbox_mouseMask) {
      //	A mask is a Graphics object
      this.mask = game.add.graphics(0, 0);

      //	Shapes drawn to the Graphics object must be filled.
      this.mask.beginFill(0xffffff);

      //	Here we'll draw a circle
      this.mask.drawCircle(0, 0, 500);

      game.world.mask = this.mask;
      game.world.blendMode = 10;
      this.mask.blendMode = 10;

    }


    game.time.events.loop(GAME.AI.thinkFrequency, () => {
      ///////////////////
      // Bot movement
      ///////////////////
      if (game.time.advancedTiming) {
        t0 = performance.now();
      }
      updateBots(this);
      if (game.time.advancedTiming) {
        t1 = performance.now();
        MONITOR.thinkTimesAI.push(t1 - t0);
      }
    }, this);


    game.world.bringToTop(GAME.turrets);
    game.world.bringToTop(GAME.tombs);
    game.world.bringToTop(GAME.bullets);
    game.world.bringToTop(GAME.bots);
    game.world.bringToTop(GAME.base.granny);
    game.world.bringToTop(GAME.base.granny.healthbar);
    game.world.bringToTop(PJ);


  },
  update: function() {

    if (GAME.sandbox_mouseMask && this.mask) {
      this.mask.x = game.input.x + game.camera.x;
      this.mask.y = game.input.y + game.camera.y;
    }

    GAME.gameManager.update();
    if (GAME.gameManager.currentLevel.isComplete()) {
      // GAME.HUD.youWin();
      GAME.gameManager.nextStage();
    }
    // game.debug.spriteInfo(PJ, 32, 32);
  }
}
