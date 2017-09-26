
class FrogFoe extends SeekAndDestroyBot {
  constructor(game, x, y, args) {
    super(game, x, y, 'frog', args);
    this.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    this.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    this.animations.add('jump', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
    this.scale.set(1.25);
    this.play('walk');
    this.angryKey = 'frog';
    this.body.setSize(48, 32, 8, 0);
    this.body.reset(this.x, this.y);
  }
}


class FlyingFoe extends FlyingShooterBot{
  constructor(game, x, y, args) {
    super(game, x, y, 'gator_derp', args);
    this.angryKey = 'gator_derp';
    this.body.setSize(128, 128, 0, 0);
    this.body.reset(this.x, this.y);
  }
}
