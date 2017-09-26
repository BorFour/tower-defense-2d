class Projectile extends Character {
  constructor(game, x, y, key, target, velocity, deviation) {
    super(game, x, y, key);
    this.collideOnHit = true;
    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;
    this.bulletVelocity = velocity || 500;
    this.dmg = 50;
    this.alive = true;
    this.anchor.set(.5);
    this.body.gravity.y = 0;
    deviation = deviation || 0;
    if (target) {
      this.target = target;
      let angle = game.physics.arcade.angleBetween(this, this.target);
      angle += (game.rnd.frac() - .5) * deviation
      game.physics.arcade.velocityFromRotation(angle, this.bulletVelocity, this.body.velocity);
    }
    this.rotation = Math.atan2(this.body.velocity.x, -this.body.velocity.y) + Math.PI / 2;
  }

  hitBot(bot) {
    if (!this || !bot) return;
    if (bot.team != this.team) bot.receiveDamage(this);
    if (!bot || !bot.alive) GAME.bots.remove(bot);
    this.alive = false;
    GAME.bullets.remove(this);
    this.kill();
  }
}

class Bullet extends Projectile {
  constructor(game, x, y, target, velocity, deviation) {
    super(game, x, y, 'bullet', target, velocity, deviation);
  }
}

class MagicOrb extends Projectile {
  constructor(game, x, y, target, velocity, deviation) {
    super(game, x, y, 'magic-orb', target, velocity, deviation);
  }
}


class SMGBullet extends Bullet {
  constructor(game, x, y, target, velocity, deviation) {
    super(game, x, y, target, velocity, deviation);
    this.collideOnHit = false;
  }
}

class SniperBullet extends Bullet {
  constructor(game, x, y, target, velocity, deviation) {
    super(game, x, y, target, velocity, deviation);
  }

  kill() {
    tweenToPJ();
    super.kill();
  }

  destroy() {
    tweenToPJ();
    super.destroy();
  }

  die() {
    tweenToPJ();
    super.die();
  }

}

class ShotgunBullet extends Bullet {
  constructor(game, x, y, target, velocity, deviation) {
    super(game, x, y, target, velocity, deviation);
  }

  hitBot(bot) {
    // if (!this || !bot) return;
    // if (bot.team != this.team) {
    //   bot.knockOut(200);
    //   // bot.body.velocity.x = 0;
    //   // bot.body.velocity.y = 0;
    //   game.physics.arcade.velocityFromRotation(-this.rotation, 500, bot.body.velocity);
    //   // bot.body.velocity.x *= 3;
    // }
    super.hitBot(bot);
  }
}
