var game;

var leftKey;
var rightKey;
var downKey;
var upKey;
var jumpKey;
var boostKey;
var grabKey;
var heroes = [];

var bot;
var bots = [];
var base;
var turret;
var bullets = [];
var PJ;
var cactus;
var items = [];

var camps = [];
var camp2;

var gameOptions = {

  // width of the game, in pixels
  gameWidth: 640,

  // height of the game, in pixels
  gameHeight: 480,

  // background color
  bgColor: 0x444444,

  // player gravity
  playerGravity: 900,

  // player horizontal speed
  playerSpeed: 200,

  // player force
  playerJump: 400
}
window.onload = function() {
  game = new Phaser.Game(gameOptions.gameWidth, gameOptions.gameHeight);
  game.state.add("PreloadGame", preloadGame);
  game.state.add("PlayGame", playGame);
  game.state.start("PreloadGame");
}
var preloadGame = function(game) {}
preloadGame.prototype = {
  preload: function() {
    game.stage.backgroundColor = gameOptions.bgColor;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.disableVisibilityChange = true;

    // loading level tilemap
    game.load.tilemap("level", 'level.json', null, Phaser.Tilemap.TILED_JSON);

    game.load.image("tile", "tile.png");
    game.load.image("hero", "hero.png");
    game.load.image("bot", "bot.png");
    game.load.image("angry_bot", "angry_bot.png");
    game.load.image("undead", "undead.png");
    game.load.image("house", "house.png");
    game.load.image("turret", "turret.png");
    game.load.image("bullet", "bullet.png");
    game.load.image("cactus", "cactus.png");
    game.load.image("tomb", "tomb.png");
    game.load.image("gun", "gun.png");
  },
  create: function() {
    game.state.start("PlayGame");
  }
}
var playGame = function(game) {}
playGame.prototype = {
  create: function() {

    // starting ARCADE physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // creatin of "level" tilemap
    this.map = game.add.tilemap();


    // adding tiles (actually one tile) to tilemap
    this.map.addTilesetImage("tile");

    // tile 1 (the black tile) has the collision enabled
    this.map.setCollision(1);

    // which layer should we render? That's right, "layer01"
    this.layer = this.map.create("layer01", mapWidth, mapHeight, 16, 16);
    this.map.addTilesetImage("layer01", "tile");
    game.add.existing(this.layer);

    createMapProc(this.map);

    base = new Building(game, (ROOM_W * 2 - 12) * CELL_W, (ROOM_H - 1) * CELL_H, "house");
    base.spawn();
    turret = new Turret(game, (ROOM_W * 2 - 15) * CELL_W, (ROOM_H - 1) * CELL_H, "turret");
    turret.spawn();

    // adding the hero sprite
    PJ = new Hero(game, (ROOM_W * 2 - 12) * CELL_W, 150, "hero");
    cactus = new Item(game, (ROOM_W * 2 - 8) * CELL_W, 150, "cactus");
    cactus.width = 30;
    cactus.height = 30;
    items.push(cactus);
    PJ.carryItem(cactus);

    // setting hero anchor point
    PJ.anchor.set(0.5);

    // enabling ARCADE physics for the  hero
    game.physics.enable([PJ, this.layer], Phaser.Physics.ARCADE);
    // this.map.setCollision(1, 10000, true, this.layer)

    // setting hero gravity
    PJ.body.gravity.y = gameOptions.playerGravity;
    PJ.body.maxVelocity.x = 300;
    PJ.body.collideWorldBounds = true;

    PJ.spawn();

    // bots.push(new JumperBot(game, 135, 150, "bot", {
    //   target: PJ
    // }));
    //
    // bots.push(new SeekerBot(game, 155, 150, "bot", {
    //   target: base
    // }));
    //
    // for (var i = 0; i < 1; i++) {
    //   bots.push(new SeekAndDestroyBot(game, game.world.randomX, 50, "bot", {
    //     target: base,
    //     hero: PJ,
    //     base: base
    //   }));
    // }
    // bots.push(new FleeingBot(game, 55, 150, "bot", {
    //   target: PJ
    // }));
    //
    // bots.push(new BooBot(game, 275, 150, "bot", {
    //   target: PJ
    // }));
    //
    // bots.push(new FSM_SimpleBot(game, 475, 150, "bot", {
    //   target: PJ
    // }));

    let camp1Members = [];
    for (var i = 0; i < 3; i++) {
      let bot = new DefenderBot(game, 40 + 20 * i, 200, "bot", {
        base: {
          x: 40,
          y: 200
        },
        hero: PJ,
        target: base
      });
      camp1Members.push(bot);
      bots.push(bot);
    }

    camp1 = new Camp(camp1Members, {
       x: 60,
       y: 200
    });

    camps.push(camp1);

    let camp2Members = [];
    for (var i = 0; i < 3; i++) {
      let bot = new DefenderBot(game, 82 + 20 * i, 550, "bot", {
        base: {
          x: 82,
          y: 550
        },
        hero: PJ,
        target: base
      });
      camp2Members.push(bot);
      bots.push(bot);
    }

    camp2 = new Camp(camp2Members, {
      x: 82,
      y: 550
    });

    camps.push(camp2);


    let camp3Members = [];
    for (var i = 0; i < 3; i++) {
      let bot = new SeekAndDestroyBot(game, 82 + 20 * i, 550, "bot", {
        base: base,
        hero: PJ,
        target: base
      });
      camp3Members.push(bot);
      bots.push(bot);
    }

    camp3 = new Raid(camp3Members, {
      x: base.x,
      y: base.y - 130
    });

    camps.push(camp3);



    bots.map((item) => {
      item.spawn();
    });

    game.world.setBounds(0, 0, mapWidth * 16, mapHeight * 16);
    this.onWall = false;

    leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    boostKey = game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    grabKey = game.input.keyboard.addKey(Phaser.Keyboard.TWO);
    jumpKey.onDown.add(this.handleJump, this)
    downKey.onDown.add(() => {
      // console.log('Pingassss');
      PJ.body.velocity.y = gameOptions.playerJump;
    }, this)
    grabKey.onDown.add(() => {
      let nearestCamp = getNearestTomb(PJ, camps);
      nearestCamp.resurrect();
    }, this)

    game.input.onDown.add(() => {
      let bullet = new Projectile(game, PJ.x, PJ.y, "bullet", {
        x: game.input.x + game.camera.x,
        y: game.input.y + game.camera.y
      });
      bullet.width = 15;
      bullet.height = 15;
      bullet.dmg = 20;
      bullets.push(bullet);
      bullet.spawn();
    }, this);


    // Camera
    game.camera.follow(PJ, Phaser.Camera.FOLLOW_PLATFORMER);

  },
  handleJump: function() {

    // the hero can jump when:
    // canJump is true AND the hero is on the ground (blocked.down)
    // OR
    // the hero is on the wall
    if (PJ.body.blocked.down || this.onWall) {

      // is the hero on a wall?
      //
      // applying jump force
      PJ.body.velocity.y = -gameOptions.playerJump;

      if (PJ.body.blocked.right || PJ.body.blocked.left) {

        // flip horizontally the hero
        PJ.scale.x *= -1;

        // change the horizontal velocity too. This way the hero will jump off the wall
        PJ.body.velocity.x = gameOptions.playerSpeed * PJ.scale.x;
      }

      // hero is not on the wall anymore
      this.onWall = false;
    }
  },
  update: function() {

    camps.map((camp) => {
      camp.update();
    });

    PJ.rotateGun();
    turret.shoot();

    for (var key in bullets) {
      game.physics.arcade.collide(bullets[key], this.layer, (p1, p2) => {
        p1.alive = false;
        p1.kill();
      }, null, this);
    }

    bots.map((currBot) => {
      game.physics.arcade.collide(currBot, this.layer)
      game.physics.arcade.collide(currBot, PJ)
      game.physics.arcade.collide(currBot, cactus);
      game.physics.arcade.collide(currBot, turret)
      for (var key in bullets) {
        game.physics.arcade.collide(currBot, bullets[key], () => {
          currBot.receiveDamage(bullets[key].dmg);
          if (bullets[key]) bullets[key].kill();
          bullets[key].alive = false;
          delete bullets[key];
        });
      }
    });

    bots = bots.filter((item) => {
      return item.alive;
    })

    if (!PJ.body.blocked.down) {
      if (leftKey.isDown) {
        PJ.scale.x = -Math.abs(PJ.scale.x);
        PJ.body.velocity.x += -gameOptions.playerSpeed / 10;
      }
      if (rightKey.isDown) {
        PJ.scale.x = Math.abs(PJ.scale.x);
        PJ.body.velocity.x += gameOptions.playerSpeed / 10;
      }

    }

    // handling collision between the hero and the tiles

    for (item of items) {
      game.physics.arcade.collide(this.layer, item);
    }

    game.physics.arcade.collide(PJ, this.layer, function(hero, layer) {
      // hero on the ground
      if (hero.body.blocked.down) {

        if (boostKey.isDown) {
          PJ.body.maxVelocity.x = 900;
        } else {
          PJ.body.maxVelocity.x = 300;
        }

        if (leftKey.isDown) {
          PJ.body.velocity.x += -gameOptions.playerSpeed / 10;
        } else if (rightKey.isDown) {
          PJ.body.velocity.x += gameOptions.playerSpeed / 10;
        } else {

          PJ.body.velocity.x = 0;
          this.onWall = false;
        }
      }

      // hero NOT on the ground and touching a wall on the right
      if (PJ.body.blocked.right && !PJ.body.blocked.down) {

        // hero on a wall
        this.onWall = true;
      }

      if (PJ.body.blocked.left && !PJ.body.blocked.down) {
        this.onWall = true;
      }

      game.camera.setBoundsToWorld();
    }, null, this);

    bots.map((currBot) => {
      currBot.move();
    })

  }
}
