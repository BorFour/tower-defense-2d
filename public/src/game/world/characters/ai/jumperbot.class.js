class JumperBot extends Bot {
  constructor(game, x, y, key, args) {
    super(game, x, y, key, args);
    this.speed = 5;
  }
  move() {
    this.scale.x > 0 ? this.moveRight() : this.moveLeft();
    this.jump();
  }
}
