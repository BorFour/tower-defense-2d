var stage;

var mapHeight = 62;
var mapWidth = 100;

const CELL_H = 16;
const CELL_W = 16;
const ROOM_H = 30;
const ROOM_W = 50;
const MAX_W = ROOM_W * 2 * CELL_W;
const MAX_H = ROOM_H * 2 * CELL_H;

function loadObjects(objects, context) {
  this.context = context;
  if (objects) {
    let bumpers2 = objects.layer02;
    bumpers2.map((bumper) => {
      switch (bumper.name) {
        case "turret":
          let turret = new CousinTurret(game, bumper.x, bumper.y, "turret");
          turret.spawn();
          GAME.turrets.add(turret);
          break;
        case "base":
          GAME.base = new Base(game, bumper.x, bumper.y + 30, "house");
          GAME.base.spawn();
          break;
        case "secret_shop":
        case "shop":
          shopItems = getShopItems();
          if (bumper.name == "secret_shop") shopItems.map((item) => {
            item.setPrice(item.price / 2);
          });
          GAME.shop = new Shop(game, bumper.x, bumper.y, "shop", shopItems);
          GAME.shop.scale.set(.27);
          GAME.shop.spawn();
          break;
        default:

      }
    });

    // adding the hero sprite
    createHero(this.context);

    this.context.hives = [];
    this.context.camps = [];
    bumpers2.map((bumper) => {
      switch (bumper.name) {
        case "hive":
          hive = new BeeHive(FrogFoe, {
            x: bumper.x,
            y: bumper.y
          }, GAME.base);
          this.context.hives.push(hive);
          break;
        case "beehive":
          hive = new BeeHive(FlyingFoe, {
            x: bumper.x,
            y: bumper.y
          }, GAME.base);
          this.context.hives.push(hive);
          break;
        case "raid":
          break;
        case "boss":
          this.context.boss = new DefenderBossBot(game,  bumper.x, bumper.y, {
            base: {
              x: bumper.x,
              y: bumper.y
            },
            target: {
              x: bumper.x,
              y: bumper.y
            },
            hero: PJ,
            hp: 500,
            maxHp: 500,
          });
          GAME.botsContainer.push(this.context.boss);
          this.context.boss.spawn();
          GAME.bots.add(this.context.boss);
          break;
        default:

      }
    });
  }
}

function getShopItems() {
  var shopItems = [];
  let grenadeItem = new Purchasable(game, 'grenade', {
    price: 10,
    onPurchase: function() {
      PJ.nGrenades += 1;
    }
  });

  let dogeItem = new Purchasable(game, 'doge', {
    price: 30,
    onPurchase: function() {
      let doge = new CompanionBot(game, PJ.x + 20, PJ.y, "undead", {
        base: PJ,
        target: PJ,
        hero: null
      });
      doge.team = PJ.team;
      doge.dmg = 50;
      doge.angryKey = "undead";
      doge.width = 26;
      doge.height = 26;
      doge.attackRange = 166;
      // doge.animations.add('walk');
      // doge.animations.play('walk', 10, false);
      doge.spawn();
      GAME.bots.add(doge);
      GAME.botsContainer.push(doge);
      PJ.minions.push(doge);

    }
  });

  let turretUpgradeItem = new Purchasable(game, 'turret', {
    price: 50,
    onPurchase: function() {
      GAME.heroArgs.turretLvl += 1;
      GAME.turrets.forEach((turret) => {
        turret.upgrade(GAME.heroArgs.turretLvl);
      });
    }
  });

  let pineappleItem = new Purchasable(game, 'pineapple', {
    price: 150,
    onPurchase: function() {
      PJ.hp += 50;
    }
  });

  let heartItem = new Purchasable(game, 'heart', {
    price: 25,
    onPurchase: function() {
      PJ.heal(50);
    }
  });

  shopItems.push(grenadeItem);
  shopItems.push(heartItem);
  shopItems.push(dogeItem);
  shopItems.push(turretUpgradeItem);
  shopItems.push(pineappleItem);
  return shopItems;
}

// House, shop, turret, etc.
function createBaseElements(args) {

  if (args.base) {
    GAME.base = new Building(game, args.base.x, args.base.y, "house");
    GAME.base.spawn();
  }

  if (args.turret) {
    let turret = new CousinTurret(game, args.turret.x, args.turret.y, "turret");
    turret.spawn();
    GAME.turrets.add(turret);
  }

  /////////////
  // Shop
  /////////////

  if (args.shop) {
    shopItems = getShopItems();
    GAME.shop = new Shop(game, args.shop.x, args.shop.y, "shop", shopItems);
    GAME.shop.scale.set(.27);
    GAME.shop.spawn();
  }
}

function createHero(context) {
  this.context = context;
  if (!PJ || !PJ.alive) {
    PJ = new Hero(game, GAME.base.x, GAME.base.y - 100, "harry", GAME.heroArgs);
    PJ.anchor.set(0.5);
    PJ.body.gravity.y = gameOptions.playerGravity;
    PJ.body.maxVelocity.x = 300;
    PJ.body.collideWorldBounds = true;
    PJ.spawn();
  }
}

function createGroups(context, args) {

  this.context = context;
  this.context.camps = [];
  this.context.hives = [];

  for (var i in args.camps) {
    let campMembers = [];

    for (var j = 0; j < 3; j++) {
      let bot = new DefenderBot(game, args.camps[i].x + 20 * j, args.camps[i].y, "bot", {
        base: {
          x: args.camps[i].x,
          y: args.camps[i].y
        },
        hero: PJ,
        target: GAME.base
      });
      campMembers.push(bot);
      GAME.bots.add(bot);
    }

    let camp = new Camp(campMembers, {
      x: args.camps[i].x,
      y: args.camps[i].y
    });

    this.context.camps.push(camp);
  }

  for (var i in args.raids) {
    let campMembers = [];

    for (var j = 0; j < 3; j++) {
      let bot = new FrogFoe(game, args.raids[i].x + 20 * j, args.raids[i].y, "bot", {
        base: {
          x: args.raids[i].x,
          y: args.raids[i].y
        },
        base: GAME.base,
        hero: PJ,
        target: GAME.base
      });
      campMembers.push(bot);
      GAME.bots.add(bot);
    }

    let camp = new Raid(campMembers, {
      x: args.raids[i].x,
      y: args.raids[i].y
    });

    this.context.camps.push(camp);
  }

  for (var i in args.hives) {
    let hive = new BeeHive(args.hives[i].creator, {
      x: args.hives[i].x,
      y: args.hives[i].y
    }, GAME.base);
    this.context.hives.push(hive);
  }

  GAME.bots.forEach((item) => {
    item.spawn();
  });
}

function createMapProc2(map) {
  stage = new Stage(map)

  // Room1
  room1 = new Room({
    x: 0,
    y: 0,
    rightDoor: new Door({
      x: ROOM_W - 1,
      y: 5
    }, {
      x: ROOM_W - 1,
      y: 15
    }),
    downDoor: new Door({
      x: ROOM_W / 2 + 8,
      y: ROOM_H - 1
    }, {
      x: ROOM_W / 2 + 15,
      y: ROOM_H - 1
    })
  });

  // Room2
  room2 = new Room({
    x: ROOM_W,
    y: 0,
    leftDoor: new Door({
      x: 0,
      y: 5
    }, {
      x: 0,
      y: 15
    })
  });

  // Room3
  room3 = new Room({
    x: 0,
    y: ROOM_H,
    upDoor: new Door({
      x: ROOM_W / 2 + 8,
      y: 0
    }, {
      x: ROOM_W / 2 + 15,
      y: 0
    })
  });

  room1.putPattern(createBorders);
  // room1.putPattern(Patterns.column.bind(null, 40, 20, mapHeight-1));
  // room1.putPattern(Patterns.stairs.bind(null, 1, 15, 30, ROOM_H - 1 - 15, false, true));
  room1.putPattern(Patterns.stairs.bind(null, 9, ROOM_H - 17, 40, 80, true, true));

  room2.putPattern(createBorders);
  // room2.putPattern(Patterns.column.bind(null, 40, 20, ROOM_H-1));
  // room2.putPattern(Patterns.stairs.bind(null, 1, 15, 40, ROOM_H - 1 - 15, false, true));

  room3.putPattern(createBorders);
  // room3.putPattern(Patterns.column.bind(null, 40, 20, ROOM_H - 1));
  // room3.putPattern(Patterns.stairs.bind(null, 1, 10, 40, ROOM_H - 1 - 15, false, true));

  // Add the room to the stage
  stage.addRoom(room1);
  stage.addRoom(room2);
  stage.addRoom(room3);
  stage.putRooms();
}

function createMapProc(map) {
  stage = new Stage(map)

  // Room1
  room1 = new Room({
    x: 0,
    y: 0,
    rightDoor: new Door({
      x: ROOM_W - 1,
      y: 0
    }, {
      x: ROOM_W - 1,
      y: ROOM_H - 1
    }),
  });

  // Room2
  room2 = new Room({
    x: ROOM_W,
    y: 0,
    leftDoor: new Door({
      x: 0,
      y: 0
    }, {
      x: 0,
      y: ROOM_H - 1
    })
  });


  room1.putPattern(createBorders);
  // room1.putPattern(Patterns.column.bind(null, 40, 20, mapHeight-1));
  room1.putPattern(Patterns.stairs.bind(null, 1, 15, 30, ROOM_H - 1 - 15, false, true));
  // room1.putPattern(Patterns.stairs.bind(null, 9, ROOM_H - 17, 40, 80, true, true));

  room2.putPattern(createBorders);
  // room2.putPattern(Patterns.column.bind(null, 40, 20, ROOM_H-1));
  room2.putPattern(Patterns.stairs.bind(null, 1, 25, 20, ROOM_H - 1 - 25, true, true));

  // Add the room to the stage
  stage.addRoom(room1);
  stage.addRoom(room2);
  stage.putRooms();
}
