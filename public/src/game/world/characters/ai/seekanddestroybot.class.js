class SeekAndDestroyBot extends SeekerBot {
  constructor(game, x, y, key, args) {
    super(game, x, y, key, args);
    this.base = args.base;
    this.hero = args.hero;
    this.target = this.base;
    this.fsm = new StateMachine({
      init: 'seekBase',
      transitions: [{
          name: 'startSeekingHero',
          from: 'seekBase',
          to: 'seekHero'
        },
        {
          name: 'startSeekingBase',
          from: 'seekHero',
          to: 'seekBase'
        }
      ],
      methods: {
        onStartSeekingHero: () => {
          // console.log('I am angry!!')
          this.loadTexture(this.angryKey);
          this.target = this.hero;
        },
        onStartSeekingBase: () => {
          // console.log("I'll destroy your base!");
          this.loadTexture(this.defaultKey);
          this.target = this.base;
        }
      }
    });
  }

  attack() {
    this.makePunch(this.dmg);
  }

  move() {
    if (this.fsm.is('seekBase') && this.hero && Phaser.Point.distance(this, this.hero) < 180) {
      this.fsm.startSeekingHero();

    } else if (this.fsm.is('seekHero') && this.hero) {
      if (Phaser.Point.distance(this, this.hero) > 240) {
        this.fsm.startSeekingBase();
      }
    } else if (this.fsm.is('seekHero') && !this.hero) {
      this.fsm.startSeekingBase();
    }

    if (this.hero && Phaser.Point.distance(this, this.hero) < this.attackRange) {
      let diff = this.x - this.hero.x;
      this.scale.x = diff < 0 ? Math.abs(this.scale.x) : -Math.abs(this.scale.x);
      // console.log('TRYING TO MAKE PUNCH @ SEEK AND DESTROY');
      this.attack();
    }
    super.move();
  }
}

class FrogFoe extends SeekAndDestroyBot {
  constructor(game, x, y, key, args) {
    super(game, x, y, key, args);
    this.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    this.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    this.animations.add('jump', [8, 9, 10, 11, 12, 13, 14, 15], 10, true);
    this.play('walk');
    this.angryKey = key;
    this.body.setSize(64, 32, 0, 0);
    this.body.reset(this.x, this.y);
  }
}

class CompanionBot extends SeekAndDestroyBot {
  constructor(game, x, y, key, args) {
    super(game, x, y, key, args);
  }

  move() {
    if (GAME.debug && this.hero) this.hero.tint = 0xffffff;
    this.hero = getNearestTarget(this, getEnemies(GAME.bots, this.team));
    if (GAME.debug && this.hero) this.hero.tint = 0x00ff00;
    super.move();
    // this.makePunch(this.dmg);
  }
}
