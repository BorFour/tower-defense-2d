
class BooBot extends Bot {
  constructor(game, x, y, key, args) {
    super(game, x, y, key, args);
    this.width = 30;
    this.height = 30;
    this.dmg = 15;
    this.target = args.target;
    this.speed = 50;
    this.fireRate = 3000;
  }

  spawn() {
    super.spawn();
    if (this.body) this.body.gravity.y = 0;
  }

  move() {
    game.physics.arcade.moveToXY(this, this.target.body.x, this.target.body.y, this.speed);
  }
}

class FlyingShooterBot extends BooBot {
  constructor(game, x, y, key, args) {
    super(game, x, y, key, args);
  }
  move() {
    super.move();
    this.shoot();
  }
}

class FlyingFoe extends FlyingShooterBot{
  constructor(game, x, y, key, args) {
    super(game, x, y, key, args);
    this.body.setSize(128, 128, 0, 0);
    this.body.reset(this.x, this.y);
  }
}
