var kazoo_fish = [];

function createFirstLevel3(context, tilemapName) {
  this.context = context;
  // starting ARCADE physics
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.stage.backgroundColor = "#888888";

  // tilemapName = "level3"
  this.context.map = game.add.tilemap(tilemapName);
  // this.context.map.addTilesetImage("tileset01", "tile");
  // this.context.map.addTilesetImage("tileset01", "tile_turret");
  this.context.map.addTilesetImage("tileset_platformer01", "tileset_platformer01");
  this.context.map.setCollision(1);

  for (var i = 0; i < 250; i++) {
    this.context.map.setCollision(i);
  }

  this.context.layer = this.context.map.createLayer("layer01");
  this.context.layerbackground = this.context.map.createLayer("background");
  this.context.objectLayer2 = this.context.map.createLayer("layer02");
  // this.context.objectLayer3 = this.context.map.createLayer("layer03");
  game.add.existing(this.context.layer);
  game.add.existing(this.context.layerbackground);

  console.log(this.context.map.objects);

  this.context.W = this.context.map.width * CELL_W * 2;
  this.context.H = this.context.map.height * CELL_H * 2

  // createMapProc2(this.context.map);
  background = game.add.tileSprite(0, 0, this.context.W, this.context.H, "background_night_forest");
  background.width = this.context.W;
  background.height = this.context.H;
  game.world.sendToBack(background);

  createBaseElements({
    // shop: {
    //   x: (ROOM_W * 2 - 23) * CELL_W,
    //   y: (ROOM_H + .5) * CELL_H
    // }
  });



  ////////////////
  // Groups
  ////////////////

  // let groupArgs = {};
  // groupArgs.camps = [{
  //     type: "camp",
  //     x: 60,
  //     y: CELL_H * ROOM_H / 2
  //   },
  //   {
  //     type: "camp",
  //     x: 450,
  //     y: GAME.base.y - 50
  //   }
  // ];
  //
  // groupArgs.raids = [{
  //   type: "raid",
  //   x: 82,
  //   y: ROOM_H - 10
  // }];
  //
  // groupArgs.hives = [{
  //   creator: BooBot,
  //   x: 500,
  //   y: 300
  // }, {
  //   creator: SeekAndDestroyBot,
  //   x: 100,
  //   y: 100
  // }];

  // createGroups(this.context, groupArgs);


  loadObjects(this.context.map.objects, this.context);

  game.world.setBounds(0, 0, this.context.W, this.context.H);
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
  game.camera.width = gameOptions.gameWidth;
  game.camera.height = gameOptions.gameHeight;
  game.camera.follow(PJ, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);

}
