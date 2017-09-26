class DefensiveStructure extends Character {
  constructor(game, x, y, key) {
    super(game, x, y, key);
    this.anchor.x = .5;
    this.anchor.y = 1;
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;
    this.body.moves = false;
  }
}


class Projectile extends Character {
  constructor(game, x, y, key, target) {
    super(game, x, y, key)
    // game.physics.enable(this, Phaser.Physics.ARCADE);
    this.dmg = 50;
    this.isAlive = true;
    this.anchor.x = .5;
    this.anchor.y = 1;
    this.body.gravity.y = 0;
    game.physics.arcade.velocityFromRotation(0, 500, this.body.velocity);
    if (target) {
      this.target = target;
      let angle = game.physics.arcade.angleBetween(this, this.target);
      game.physics.arcade.velocityFromRotation(angle, 500, this.body.velocity);
    }
  }
}

function nearestTarget(p, targets) {
  let nearest = null;
  let nearestDistance = 400000;
  for (target of targets) {
    let currDistance = game.physics.arcade.distanceBetween(p, target);
    if (currDistance < nearestDistance) {
      nearest = target;
      nearestDistance = currDistance;
    }
  }
  return nearest;
}

class Turret extends DefensiveStructure {
  constructor(game, x, y, keyd) {
    super(game, x, y, keyd);
    this.shootTimer = game.time.create(false);
    this.shootTimer.loop(2000, () => {
      this.canShoot = true;
    }, this);
    this.shootTimer.start();
    this.canShoot = true;
  }

  shoot() {
    if (this.canShoot && bots.length > 0) {
      let bullet = new Projectile(game, this.x, this.y, "bullet", nearestTarget(this, bots));
      bullet.width = 50;
      bullet.height = 50;
      bullet.spawn();
      bullets.push(bullet);
      this.canShoot = false;
    }
  }
}
