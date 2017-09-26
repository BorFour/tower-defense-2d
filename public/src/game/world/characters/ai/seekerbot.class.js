class SeekerBot extends Bot {
  constructor(game, x, y, key, args) {
    super(game, x, y, key, args);
    // this.character = args.character;
    this.target = args.target;
    this.body.maxVelocity.x = 100;
    this.speed = 25;
  }

  move() {
    let incX = this.target.x - this.x;
    let incY = this.target.y - this.y;
    if (incX < -this.epsilon || (incX < 0 && incY != -this.epsilon)) {
      this.moveLeft()
      this.jump();
    } else if (incX > this.epsilon || (incX > 0 && incY != -this.epsilon)) {
      this.moveRight()
      this.jump();
    } else {
      this.stop()
    }
  }
}
