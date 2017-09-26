class Bot extends LivingCharacter {
  constructor(game, x, y, key, args) {
    super(game, x, y, key, args);
    this.speed = 25;
    this.width = 32;
    this.height = 32;
    this.defaultKey = key;
    this.team = 0;
  }

  die(killer) {
    super.die(killer);
    this.dieSound.play();
  }

  shoot() {
    if (this.canShoot && GAME.bots.length > 0) {
      let bullet = super.shoot(getNearestTarget(this, getEnemies(GAME.bots, this.team)), null, MagicOrb);
      if (bullet) {
        bullet.width = 50;
        bullet.height = 30;
        bullet.dmg = this.dmg;
        if (bullet.body.velocity.x > 0) {
          this.scale.x = -Math.abs(this.scale.x);
        } else {
          this.scale.x = Math.abs(this.scale.x);
        }
        bullet.spawn();
        bullet.team = this.team;
        if (bullet.team == PJ.team) GAME.bullets.add(bullet);
        if (bullet.team == 0) GAME.enemyBullets.add(bullet);
      }
    }
  }
}
