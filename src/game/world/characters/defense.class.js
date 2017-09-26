class DefensiveStructure extends Character {
  constructor(game, x, y, key) {
    super(game, x, y, key);
    this.anchor.x = .5;
    this.anchor.y = 1;
    this.width = 80;
    this.height = 60;
    // game.physics.startSystem(Phaser.Physics.NINJA);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;
    this.body.moves = false;
  }
}

class Turret extends DefensiveStructure {
  constructor(game, x, y, key) {
    super(game, x, y, key);
    this.dmg = 25;
    this.anchor.set(.5);
    this.team = 1;
    this.canShoot = true;
    this.upgrade(GAME.heroArgs.turretLvl);

  }

  shoot() {
    if (this.canShoot && GAME.bots.length > 0) {
      let bullet = super.shoot(getNearestTarget(this, getEnemies(GAME.bots, this.team)));
      if (bullet) {
        bullet.width = 30;
        bullet.height = 20;
        bullet.team = 1;
        bullet.dmg = this.dmg
        if (bullet.body.velocity.x > 0) {
          this.scale.x = -Math.abs(this.scale.x);
        } else {
          this.scale.x = Math.abs(this.scale.x);
        }
      }
    }
  }

  upgrade(lvl) {
    if (lvl == 2) {
      this.tint = 0x00ff00;
      this.dmg = 50;
    } else if (lvl == 3) {
      this.tint = 0xff0000;
      this.dmg = 100;
    } else if (lvl == 4) {
      this.tint = 0x1b2fd7;
      this.fireRate = 750;
      this.dmg = 125;
    } else if (lvl > 4) {
      this.tint = 0x70067a;
      this.fireRate = 500;
      this.dmg = 150;
    }
  }
}
