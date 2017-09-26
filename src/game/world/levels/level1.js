var kazoo_fish = [];

function createFirstLevel(context) {
  this.context = context;
  // starting ARCADE physics
  game.physics.startSystem(Phaser.Physics.ARCADE);
  // game.physics.startSystem(Phaser.Physics.NINJA);
  // creatin of "level" tilemap
  this.context.map = game.add.tilemap();
  // adding tiles (actually one tile) to tilemap
  this.context.map.addTilesetImage("tile");
  // tile 1 (the black tile) has the collision enabled
  this.context.map.setCollision(1);
  // which layer should we render? That's right, "layer01"
  this.context.layer = this.context.map.create("layer01", mapWidth, mapHeight, 16, 16);
  this.context.map.addTilesetImage("layer01", "tile");
  game.add.existing(this.context.layer);
  createMapProc(this.context.map);
  background = game.load.image(0, 0, 'background_night_forest');

  var style = {
    font: "9px Comic Sans",
    fill: "#090317",
    wordWrap: false,
    wordWrapWidth: this.context.width * 4,
    align: "center"
  };
  let waifu_text = game.add.text((ROOM_W * 2 - 12) * CELL_W + 75, (ROOM_H - 1) * CELL_H - 47, "Employee of the month", style);

  var style = {
    font: "12px Comic Sans",
    fill: "#090317",
    wordWrap: false,
    wordWrapWidth: this.context.width * 4,
    align: "center"
  };
  let date_text = game.add.text((ROOM_W * 2 - 12) * CELL_W + 90, (ROOM_H - 1) * CELL_H - 420, "07/09/2017", style);

  let waifu_painting = game.add.sprite((ROOM_W * 2 - 12) * CELL_W + 90, (ROOM_H - 1) * CELL_H - 120, "painting_waifu");
  waifu_painting.scale.set(.15);


  createBaseElements({
    base: {
      x: (ROOM_W * 2 - 12) * CELL_W,
      y: (ROOM_H - 1) * CELL_H + 55
    },
    turret: {
      x: (ROOM_W * 2 - 15) * CELL_W,
      y: (ROOM_H - 1) * CELL_H - 15
    },
    shop: {
      x: (ROOM_W * 2 - 23) * CELL_W,
      y: (ROOM_H + .5) * CELL_H
    }
  });

  // adding the hero sprite
  createHero(this.context);

  ////////////////
  // Groups
  ////////////////

  let groupArgs = {};
  groupArgs.camps = [{
      type: "camp",
      x: 60,
      y: CELL_H * ROOM_H / 2
    },
    {
      type: "camp",
      x: 450,
      y: GAME.base.y - 50
    }
  ];

  groupArgs.raids = [{
    type: "raid",
    x: 82,
    y: ROOM_H - 10
  }];

  groupArgs.hives = [{
    creator: FlyingFoe,
    x: 500,
    y: 300
  }, {
    creator: SeekAndDestroyBot,
    x: 100,
    y: 100
  }];


  this.boss = new DefenderBossBot(game, 1000, 300, "boss1", {
    base: {
      x: 1000,
      y: 100
    },
    target: {
      x: 100,
      y: 100
    },
    hero: PJ
  });

  this.boss.loot = ITEMS.loots.boss;

  this.boss.team = 0;
  this.boss.dmg = 50;
  this.boss.angryKey = "boss1";
  this.boss.scale.set(.3);
  this.boss.attackRange = 366;
  this.boss.hp = 300;
  //
  // this.boss.animations.add('walk');
  // this.boss.animations.play('walk', 10, false);
  // this.boss.spawn();
  // GAME.bots.add(this.boss);

  createGroups(this.context, groupArgs);

  this.context.camps[0].members.push(this.boss);
  this.boss.spawn();
  GAME.bots.add(this.boss);

  ////////////
  // Events
  ///////////

  game.world.setBounds(0, 0, mapWidth * 16, mapHeight * 16);
  PJ.onWall = false;

  // Controls
  GAME.controller = Controller.getInstance();
  GAME.controller.setUpControls(this.context);
  // Controls.setUpControls(this.context);

  // HUD
  GAME.HUD = new HUD(game, game.camera.view.width / 2, game.camera.view.height - 80);
  GAME.HUD.setUpButtons();
  GAME.HUD.setUpKeybindings();

  // Camera
  game.camera.follow(PJ, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);



}

function newWaveFirstLevel(context) {

  GAME.HUD.nextWave();

  let camp3Members = [];
  for (var i = 0; i < 3; i++) {
    let bot = new SeekAndDestroyBot(game, 82 + 20 * i, ROOM_H - 10, "bot", {
      base: GAME.base,
      hero: PJ,
      target: GAME.base
    });
    camp3Members.push(bot);
    GAME.bots.add(bot);
  }

  this.context.camp3 = new Raid(camp3Members, {
    x: GAME.base.x,
    y: GAME.base.y - 50
  });

  // camps.push(this.context.camp3);

  GAME.bots.forEach((item) => {
    item.spawn();
  });

  ////////////////////
  // Update values
  ////////////////////

  if( this.context.hives[1]) this.context.hives[1].updateValues();

}

function removeFirstLevel(context) {
  camps.map((camp) => {
    camp.remove();
  })
}
