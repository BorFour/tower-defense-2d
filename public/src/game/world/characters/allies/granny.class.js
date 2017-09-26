class Granny extends Turret {
  constructor(game, x, y, key, args) {
    super(game, x, y, key ? key : 'granny', args);

    this.team = 1;
    this.hp = 100;
    this.attackRange = 300;
    this.projectile = MagicOrb;

    this.animations.add('cook', [0, 1, 2, 3, 4, 5], 10, true);
    let swing = this.animations.add('swing', [6, 7, 8, 9, 10, 11], 10, true);
    this.play('cook', 5, true);
    swing.onComplete.add(() => {
      this.cook();
    }, this);
    this.body.setSize(45, 62, 50, 40);
    this.body.reset(this.x, this.y);
    this.cauldron = new Character(game, x , y + 25, 'cauldron');
    this.addChild(this.cauldron);
    this.cauldron.animations.add('cook', [0, 1, 2, 3,], 10, true);
    this.cauldron.animations.play('cook', 5, true);

    // this.changeAnimations = game.time.events.repeat(Phaser.Timer.SECOND * 3, 50, () => {
    //   if(this.isAttacking) {
    //     this.cook();
    //   } else {
    //     this.attack();
    //   }
    // }, this);
  }

  shoot() {
    if(super.shoot()) {
      this.attack();
      console.log('Shooting granny');
    }
  }

  spawn() {
    super.spawn();
    this.cauldron.spawn();
    this.body.moves = false;
    this.cauldron.body.moves = false;
  }

  attack() {
    this.isAttacking = true;
    this.cauldron.alpha = 1;
    this.animations.play('swing', 5, false);
  }

  cook() {
    this.isAttacking = false;
    this.cauldron.alpha = 0;
    this.animations.play('cook', 5, true);
  }

}
