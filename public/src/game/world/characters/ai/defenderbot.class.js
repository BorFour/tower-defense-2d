class DefenderBot extends SeekerBot {
  constructor(game, x, y, key, args) {
    super(game, x, y, key, args);
    this.base = args.base;
    this.hero = args.hero;
    this.target = this.base;
    this.fsm = new StateMachine({
      init: 'idle',
      transitions: [{
          name: 'startSeekingHero',
          from: 'goingToBase',
          to: 'seekHero'
        },
        {
          name: 'startSeekingHero',
          from: 'idle',
          to: 'seekHero'
        },
        {
          name: 'goBackToBase',
          from: 'seekHero',
          to: 'goingToBase'
        },
        {
          name: 'arriveBase',
          from: 'goingToBase',
          to: 'idle'
        }
      ],
      methods: {
        onStartSeekingHero: () => {
          // console.log('onStartSeekingHero');
          // console.log('Get out of my ranch!!')
          this.loadTexture(this.angryKey);
          this.target = this.hero;
        },
        onGoBackToBase: () => {
          // console.log('onGoBackToBase');
          this.loadTexture(this.defaultKey);
          this.target = this.base;
        },
        onArriveBase: () => {
          // console.log('onArriveBase');
          // this.stop();a
          //  this.body.velocity.y = 0;
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

    let shouldMove = true;
    let newEnemy = getNearestTarget(this, getEnemies(GAME.bots, this.team));

    if (newEnemy) {
      this.hero = newEnemy;
    } else {
      this.hero = PJ;
    }

    if ((Phaser.Point.distance(this, this.hero) < this.attackRange) && (this.fsm.is('idle') || this.fsm.is('goingToBase'))) {
      this.fsm.startSeekingHero();
    } else if (this.fsm.is('seekHero')) {
      if (!this.hero || !this.hero.alive || this.hero && Phaser.Point.distance(this, this.hero) >  this.attackRange*1.5) {
        this.fsm.goBackToBase();
      }
    } else if (this.fsm.is('goingToBase') && this.base && Phaser.Point.distance(this, this.base) < 60) {
      this.fsm.arriveBase();
    }

    if (Phaser.Point.distance(this, this.hero) < this.attackRange) {
      let diff = this.x - this.hero.x;
      this.scale.x = diff < 0 ? Math.abs(this.scale.x) : -Math.abs(this.scale.x);
      this.attack();
    }

    // if (this.fsm.is('idle')) {
    //   shouldMove = false;
    // }
    // if (shouldMove) {
    super.move();
    // }
  }
}
