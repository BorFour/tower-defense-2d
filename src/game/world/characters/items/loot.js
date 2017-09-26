ITEMS = {};
ITEMS.loots = {};

class Loot {
  constructor(onCreate, onPick) {
    this.onCreate = onCreate;
    this.onPick = onPick;
  }
}

class ContainerLoot {
  constructor(coords) {
    this.x = coords.x;
    this.y = coords.y;
    this.lootEmiter = game.add.emitter(this.x, this.y);
    this.lootEmiter.bounce.setTo(0.5, 0.5);
    this.lootEmiter.setXSpeed(-30, 30);
    this.lootEmiter.setYSpeed(-50, -250);
    this.lootEmiter.makeParticles('money', 0, 50, true, true);
    this.lootEmiter.setSize(10, 10);
    this.lootEmiter.setScale(0.17, 0.17, 0.17, 0.17);
  }

  onPick() {
    this.lootEmiter.start(true, 10000, null, 50);
  }
}

ITEMS.loots.coin = new Loot(
  (enemy, onPick) => {
    let coin = new Pickable(game, enemy.x, enemy.y - 30, 'money', onPick);
    coin.width = 20;
    coin.height = 20;
    coin.team = PJ.team;
    coin.spawn();
    GAME.pickables.push(coin);
  },
  (loot, player, args) => {
    player.money += 2;
    loot.die();
  });
// ITEMS.loots.boss = new Loot(
ITEMS.loots.boss = new Loot(
  (enemy, onPick) => {
    let chest = new PickableManual(game, enemy.x, enemy.y - 30, 'chest', onPick);
    chest.scale.set(.15);
    chest.team = PJ.team;
    chest.spawn();
    chest.lootEmiter = new ContainerLoot(chest);
    GAME.pickablesManual.push(chest);
  },
  (loot, player, args) => {
    loot.lootEmiter.onPick();
    player.money += 10;
    loot.die();
  });

ITEMS.loots.default = new Loot(
  (enemy, onPick) => {
    if (game.rnd.frac() > 0.9) {
      this.onCreate = ITEMS.loots.boss.onCreate;
      this.onPick = ITEMS.loots.boss.onPick;
      ITEMS.loots.boss.onCreate(enemy, this.onPick);
    } else {
      this.onCreate = ITEMS.loots.coin.onCreate;
      this.onPick = ITEMS.loots.coin.onPick;
      ITEMS.loots.coin.onCreate(enemy, this.onPick);
    }
  },
  (loot, player, args) => {

  });
