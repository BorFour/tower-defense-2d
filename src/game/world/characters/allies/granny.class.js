class Granny extends LivingCharacter {
  constructor(game, x, y, key, args) {
    super(game, x, y, key ? key : 'granny', args);
    this.team = 1;
    this.hp = 100;
    this.animations.add('idle', [0, 1, 2, 3, 4, 5], 10, true);
    this.animations.add('swing', [6, 7, 8, 9, 10, 11], 10, true);
    this.animations.play('idle', 5, true);
    this.body.setSize(45, 62, 50, 40);
    this.body.reset(this.x, this.y);
  }
}
