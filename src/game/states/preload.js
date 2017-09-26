
var oliastxt = `Agradezco que se me haya metido de nuevo en este grupo pero ya no quiero formar parte de el. Hay ciertas personas que no me respetan y no voy a pasar por el aro otra vez de que me pidan perdón, se me vuelva a faltar al respeto y así constantemente. Hay gente aqui que sigo considerando mis amigos pero dentro de la poca oficialidad y formalidad que hay, no quiero seguir formando parte de este grupillo ni quiero que se me metan en grupillos, partidas u otras actividades. Tamooco quiero que se utilice o comparta informacion personal mia, si no emprendere acciones legales si lo considero necesario. SI sigues siendo amigo mío o voy a ignorarte, despende del juicio de cada uno en relación con los eventos ocurridos hace unos días en ts. Quien quiera seguir en contacto conmigo, ya sabéis que tenéis medios de sobra para contactar, no pienso eliminar a nadie de ninguna red social hasta que no lo vea estrictamente necesario. Esta decisión es irrevocable pero sia lguien quiere pedirme disculpas o tener la última palabra, tiene libertad para hacerlo.`;
var oliastxt2 = `Mención especial AdriKS y Guaneuro que me parecen unos putos pedazos de mierda sin remedio, y probablemente de las peores y más hostiables personas que conozco.`;


// responsiveVoice.setDefaultVoice("Japanese Female");

var loadText;

var gameOptions = {

  gameWidth: 1280,
  gameHeight: 720,
  bgColor: 0x444444,
  playerGravity: 900,
  playerSpeed: 200,
  playerJump: 400

}

function synthetizeText(text, voice) {
    voice = voice || "Japanese Female";
    if(!mute)  {
      responsiveVoice.setDefaultVoice(voice);
      responsiveVoice.speak(text);
    }
}

window.onload = function() {
  game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight, Phaser.WEBGL, 'game-area');
  game.forceSingleUpdate = true;

  // game.sound.mute = true;
  game.state.add("Menu", preMenu);
  game.state.add("PreloadGame", preloadGame);
  game.state.add("PlayGame", playGame);
  game.state.add("GameOver", gameOver);
  game.state.start("Menu");
}

function loadStart() {
  loadText.setText("Loading ...");
  // synthetizeText("Loading items");
}

function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
  loadText.setText("Loading items: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
}

function loadComplete() {
  loadText.setText("Load Complete");
  // responsiveVoice.setDefaultVoice("Japanese Female");
  // synthetizeText("Load complete");
}



function loadResources() {
  // loading level tilemap
  game.sound.mute = mute;


  // Maps
  // game.load.tilemap("level", 'level.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.tilemap("level3", 'level3.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.tilemap("level4", 'level4.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.tilemap("level5", 'level5.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.tilemap("level6", 'level6.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image("tileset02", "3c817ff046.png");
  game.load.image("tileset_platformer01", "assets/tileset_platformer01.png");
  game.load.image("tile", "assets/tile.png");
  game.load.image("tile_turret", "turret_icon.png");


  game.load.image("bullet", "assets/bullet.png");
  game.load.image("cactus", "assets/cactus.png");
  game.load.image("tomb", "assets/tomb.png");
  game.load.image("gun", "assets/gun.png");
  game.load.image("punch", "assets/boxing-glove.png");
  game.load.image('hat', 'assets/mexican-hat.png');
  game.load.image('pinata', 'assets/pinata.png');
  game.load.image('kazoo_fish', 'assets/kazoo_fish.jpg');
  game.load.image('grenade', 'assets/grenade.png');
  game.load.image('magic-orb', 'assets/magic-orb.png');
  game.load.image('healthbar', 'assets/healthbar2.png');
  // game.load.image('arrow', 'assets/arrow.png');
  game.load.image('arrow', 'assets/gun.png');
  game.load.image('pickable_manual', 'assets/pickable_manual.ico');


  // Characters
  game.load.image("hero", "assets/hero.png");
  game.load.image("bot", "assets/bot.png");
  game.load.image("angry_bot", "assets/angry_bot.png");
  game.load.image("undead", "assets/undead.png");
  game.load.image("boss1", "assets/boss1.png");

  // Items
  game.load.image('pineapple', 'assets/pineapple.png');
  game.load.image('money', 'assets/money_skull.png');
  game.load.image('chest', 'assets/zelda_big_chest.png');
  game.load.image('heart', 'assets/heart.png');
  // Buildings
  game.load.image("turret", "assets/turret.png");
  game.load.image("house", "assets/house.png");
  game.load.image("shop", "assets/shop.png");
  // Background
  game.load.image('background', 'assets/background_tower.png');
  game.load.image('background_night_forest', 'assets/background_night_forest.jpg');
  // Decoration
  game.load.image('painting_waifu', 'assets/waifu_painting.png');
  // HUD
  // game.load.image('cross', 'assets/cross.png');
  game.load.image('cross', 'assets/dickman.gif');
  game.load.image('punch_icon', 'assets/punch-icon.png');
  game.load.image('shotgun_icon', 'assets/shotgun-icon.png');
  game.load.image("army_dead", "assets/army-of-the-dead.png");
  game.load.image('attack', 'assets/attack.png');
  game.load.image('home', 'assets/home.ico');
  game.load.image('hide_icon', 'assets/hide_icon.png');
  game.load.image('backflip_icon', 'assets/backflip_icon.png');
  game.load.image('mute_icon', 'assets/mute_icon.png');
  // Spritesheets
  game.load.spritesheet('explosion', 'assets/explosion_spritesheet.png', 128, 128, 13);
  game.load.spritesheet('doge', 'assets/doge_spritesheet.png', 500, 397, 4);
  game.load.spritesheet('harry', 'assets/hero_spritesheet1.png', 80, 94, 40);
  game.load.spritesheet('granny', 'assets/abuela meneando-metiendo.png', 128, 128, 12);
  game.load.spritesheet('gator_derp', 'assets/gator_derp4x4.png', 128, 128, 4);
  game.load.spritesheet('frog', 'assets/rana64x64.png', 64, 64, 16);
  // Keys
  game.load.image('key_F', 'assets/key_F.png');
  // Audio
  game.load.audio('death', 'assets/audio/hehe_croket.mp3');
  game.load.audio('hit', 'assets/audio/pingas_hit.mp3');
  game.load.audio('rise_undead', 'assets/audio/rise_undead.mp3');
  game.load.audio('item_purchased', 'assets/audio/cash_register.mp3');
  game.load.audio('you_are_dead', 'assets/audio/elias_risa.mp3');
  game.load.audio('not_bad_elias', 'assets/audio/no_esta_mal_elias.m4a');
  game.load.audio('not_bad_adri', 'assets/audio/no_esta_mal_adri.mp3');
  game.load.audio('congratulations', 'assets/audio/congratulations.mp3');
  // Weapons
  game.load.audio('shotgun', 'assets/audio/shotgun-fire.mp3');
  game.load.audio('reload', 'assets/audio/shotgun-reload.mp3');
  game.load.audio('sniper', 'assets/audio/sniper-kibblesbob.mp3');
  game.load.audio('machinegun', 'assets/audio/machinegun_edit1.mp3');
  game.load.audio('change_weapon', 'assets/audio/leather_inventory.wav');
  // game.load.audio('background_music', 'assets/audio/kazoo_trap.mp3');
  // game.load.audio('background_music', 'assets/audio/shootingstars.mp3');
  // game.load.audio('background_music', 'assets/audio/themexicanhat.mp3');

  game.load.video('congratulations_video', 'assets/video/congratulations_video.webm');
}
var preloadGame = function(game) {}
preloadGame.prototype = {
  preload: function() {

    this.granny =  game.add.sprite(game.camera.width/2, game.camera.height/2, 'grannyx4');
    this.granny.anchor.set(.5);
    // this.granny.scale.set(5);
    this.granny.animations.add('idle', [0, 1, 2], 10, true);
    this.granny.animations.play('idle', 15, false);
    this.granny.events.onAnimationComplete.add(() => {
      this.granny.scale.x *= -1;
      this.granny.animations.play('idle', 5, false);
    }, this);

    loadText = game.add.text(32, 32, 'Click to start load', {
      fill: '#ffffff'
    });

    game.load.onLoadStart.add(loadStart, this);
    game.load.onFileComplete.add(fileComplete, this);
    game.load.onLoadComplete.add(loadComplete, this);
    loadResources();
    game.stage.backgroundColor = gameOptions.bgColor;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.disableVisibilityChange = true;
  },
  create: function() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    if(SOUND.congratulationsAudio) SOUND.congratulationsAudio.stop();
    GAME.gameManager = new GameManager(this);
    game.time.advancedTiming = true;
    game.state.start("PlayGame");
  }
}
