class FleeingBot extends Bot {
  constructor(game, x, y, key, args) {
    super(game, x, y, key, args);
    this.target = args.target;
    this.body.maxVelocity.x = 100;
    this.speed = 25;
  }
  move() {
    this.target.x > this.x ? this.moveLeft() : this.moveRight();
    if (this.target.y >= this.y) {
      this.jump();
    }
  }
}
