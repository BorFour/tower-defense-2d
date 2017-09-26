var kazoo_fish = [];

function createFirstLevel2(context) {
  this.context = context;
  // starting ARCADE physics
  game.physics.startSystem(Phaser.Physics.ARCADE);

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
  createMapProc2(this.context.map);
  background = game.load.image(0, 0, 'background_night_forest');

  createBaseElements({
    shop: {
      x: (ROOM_W * 2 - 42) * CELL_W,
      y: (ROOM_H - 1) * CELL_H + 20
    },
    turret: {
      x: (ROOM_W * 2 - 15) * CELL_W,
      y: (ROOM_H - 1) * CELL_H - 15
    },
    base: {
      x: (ROOM_W * 2 - 23) * CELL_W ,
      y: (ROOM_H + .5) * CELL_H+ 30
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
    creator: BooBot,
    x: 500,
    y: 300
  }, {
    creator: SeekAndDestroyBot,
    x: 100,
    y: 100
  }];

  createGroups(this.context, groupArgs);

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
  game.camera.follow(PJ, Phaser.Camera.FOLLOW_PLATFORMER);

}
