
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

  game.load.path = "public/assets/";

  // Maps
  // game.load.tilemap("level", 'level.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.tilemap("level3", 'levels/level3.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.tilemap("level4", 'levels/level4.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.tilemap("level5", 'levels/level5.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.tilemap("level6", 'levels/level6.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.tilemap("level7", 'levels/level7.json', null, Phaser.Tilemap.TILED_JSON);
  game.load.image("tileset02", "3c817ff046.png");
  game.load.image("tileset_platformer01", "tileset_platformer01.png");
  game.load.image("tile", "tile.png");
  game.load.image("tile_turret", "turret_icon.png");

  game.load.image("bullet", "bullet.png");
  game.load.image("cactus", "cactus.png");
  game.load.image("tomb", "tomb.png");
  game.load.image("gun", "gun.png");
  game.load.image("punch", "boxing-glove.png");
  game.load.image('hat', 'mexican-hat.png');
  game.load.image('pinata', 'pinata.png');
  game.load.image('kazoo_fish', 'kazoo_fish.jpg');
  game.load.image('grenade', 'grenade.png');
  game.load.image('magic-orb', 'magic-orb.png');
  game.load.image('healthbar', 'healthbar2.png');
  // game.load.image('arrow', 'arrow.png');
  game.load.image('arrow', 'gun.png');
  game.load.image('pickable_manual', 'pickable_manual.ico');


  // Characters
  game.load.image("hero", "hero.png");
  game.load.image("bot", "bot.png");
  game.load.image("angry_bot", "angry_bot.png");
  game.load.image("undead", "undead.png");
  game.load.image("boss1", "boss1.png");

  // Items
  game.load.image('pineapple', 'pineapple.png');
  game.load.image('money', 'money_skull.png');
  game.load.image('chest', 'zelda_big_chest.png');
  game.load.image('heart', 'heart.png');
  // Buildings
  game.load.image("turret", "turret.png");
  game.load.image("house", "house.png");
  game.load.image("shop", "shop.png");
  // Background
  game.load.image('background', 'background_tower.png');
  game.load.image('background_night_forest', 'background_night_forest.jpg');
  // Decoration
  game.load.image('painting_waifu', 'waifu_painting.png');
  // HUD
  // game.load.image('cross', 'cross.png');
  game.load.image('cross', 'dickman.gif');
  game.load.image('punch_icon', 'punch-icon.png');
  game.load.image('shotgun_icon', 'shotgun-icon.png');
  game.load.image("army_dead", "army-of-the-dead.png");
  game.load.image('attack', 'attack.png');
  game.load.image('home', 'home.ico');
  game.load.image('hide_icon', 'hide_icon.png');
  game.load.image('backflip_icon', 'backflip_icon.png');
  game.load.image('mute_icon', 'mute_icon.png');
  // Spritesheets
  game.load.spritesheet('explosion', 'explosion_spritesheet.png', 128, 128, 13);
  game.load.spritesheet('doge', 'doge_spritesheet.png', 500, 397, 4);
  game.load.spritesheet('harry', 'hero_spritesheet1.png', 80, 94, 40);
  game.load.spritesheet('granny', 'abuela meneando-metiendo.png', 128, 128, 12);
  game.load.spritesheet('gator_derp', 'gator_derp4x4.png', 128, 128, 4);
  game.load.spritesheet('frog', 'rana64x64.png', 64, 64, 16);
  game.load.spritesheet('cauldron', 'caldero64x48.png', 64, 48, 4);
  game.load.spritesheet('cousin', 'primo4x4.png', 128, 161, 4);
  // Keys
  game.load.image('key_F', 'key_F.png');
  // Audio
  game.load.audio('death', 'audio/hehe_croket.mp3');
  game.load.audio('hit', 'audio/pingas_hit.mp3');
  game.load.audio('rise_undead', 'audio/rise_undead.mp3');
  game.load.audio('item_purchased', 'audio/cash_register.mp3');
  game.load.audio('you_are_dead', 'audio/elias_risa.mp3');
  game.load.audio('not_bad_elias', 'audio/no_esta_mal_elias.m4a');
  game.load.audio('not_bad_adri', 'audio/no_esta_mal_adri.mp3');
  game.load.audio('congratulations', 'audio/congratulations.mp3');
  // Weapons
  game.load.audio('shotgun', 'audio/shotgun-fire.mp3');
  game.load.audio('reload', 'audio/shotgun-reload.mp3');
  game.load.audio('sniper', 'audio/sniper-kibblesbob.mp3');
  game.load.audio('machinegun', 'audio/machinegun_edit1.mp3');
  game.load.audio('change_weapon', 'audio/leather_inventory.wav');
  // game.load.audio('background_music', 'audio/kazoo_trap.mp3');
  // game.load.audio('background_music', 'audio/shootingstars.mp3');
  // game.load.audio('background_music', 'audio/themexicanhat.mp3');

  game.load.video('congratulations_video', 'video/congratulations_video.webm');
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
