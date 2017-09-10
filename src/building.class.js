class Building extends Character {
  constructor(game, x, y, key) {
    super(game, x, y, key);
    this.anchor.x = .5;
    this.anchor.y = 1;
    this.body.immovable = true;
    this.body.moves = false;
  }
}
