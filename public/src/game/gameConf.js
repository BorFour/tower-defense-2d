var game;
var mute = false;

var INPUT = {};
var SOUND = {};
var USER = {};
var GAME = {};
var MONITOR = {};
var PJ;

MONITOR.thinkTimesAI = [];
GAME.debugPhysics = true;
GAME.debug = true;
GAME.hardcoreMode = true;
GAME.sandbox_mouseMask = false;
GAME.sandbox_coolTransitions = false;
GAME.sandbox_foggyMode = false;
GAME.dataLoader = new DataLoader();
GAME.gameMode = GameManager.STORYMODE;

USER.name = "Mr. Random User" ;
GAME.pickables = [];
GAME.pickablesManual = [];
GAME.AI = {};
GAME.AI.thinkFrequency = Phaser.Timer.SECOND * .05;
GAME.score = 0;
GAME.controllerType = Controller.KEYBOARD;
GAME.maxLevel = 5;
GAME.waveParams = {};
GAME.waveParams.spawnFreq = 8;
GAME.waveParams.scoreToWin = 10;
GAME.waveParams.enemyMaxSpeed = 100;
GAME.waveParams.waveNumber = 1;
GAME.waveParams.dmg = 20;

GAME.heroArgs = {};
GAME.heroArgs.money = 30;
GAME.heroArgs.nGrenades = 3;
GAME.heroArgs.turretLvl = 1;
GAME.heroArgs.x = (ROOM_W * 2 - 12) * CELL_W;
GAME.heroArgs.y = 150;

GAME.botsContainer = [];

GAME.goGameOver = function() {
  game.camera.fade(0x000000, 1500, false);
  game.state.start("GameOver");
}

GAME.fullscreen = function() {
  var elem = document.getElementById("game-area");
  if (!document.fullscreenElement && !document.mozFullScreenElement &&
    !document.webkitFullscreenElement && !document.msFullscreenElement) {
      if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}
