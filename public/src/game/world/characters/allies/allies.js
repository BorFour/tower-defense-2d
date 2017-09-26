class CousinCompanionBot extends CompanionBot {
  constructor(game, x, y, args) {
    super(game, x, y, 'cousin', args);
    this.team = 1;
    this.scale.set(.5);
    this.animations.add('walk');
    this.animations.play('walk', 10, true);
  }
}
