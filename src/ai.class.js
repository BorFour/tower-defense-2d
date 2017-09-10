class Bot extends Character {
  constructor(game, x, y, key) {
    super(game, x, y, key);
    this.speed = 25;
  }
}

class BooBot extends Bot {
  constructor(game, x, y, key, arg) {
    super(game, x, y, key);
    this.width = 30;
    this.height = 30;
    // this.character = arg.character;
    this.target = arg.target;
    // this.body.maxVelocity.x = 100;
    this.speed = 50;
  }
  move() {
    game.physics.arcade.moveToXY(this, this.target.body.x, this.target.body.y, this.speed);
    // this.target.x < this.x ? this.moveLeft() : this.moveRight();
  }
}

class SeekerBot extends Bot {
  constructor(game, x, y, key, arg) {
    super(game, x, y, key);
    // this.character = arg.character;
    this.target = arg.target;
    this.body.maxVelocity.x = 100;
    this.speed = 25;
  }
  move() {
    // game.physics.arcade.moveToXY(this, this.target.x, this.target.y, this.speed);
    this.target.x < this.x ? this.moveLeft() : this.moveRight();
    this.jump();
    if (this.target.y <= this.y) {
      // this.jump();
    }
  }
}

class FleeingBot extends Bot {
  constructor(game, x, y, key, arg) {
    super(game, x, y, key);
    this.target = arg.target;
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

class JumperBot extends Bot {

  constructor(game, x, y, key, arg) {
    super(game, x, y, key);
    this.speed = 5;
  }
  move() {
    this.scale.x > 0 ? this.moveRight() : this.moveLeft();
    this.jump();
  }
}

class FSM_SimpleBot extends SeekerBot {

  constructor(game, x, y, key, arg) {
    super(game, x, y, key, arg);
    this.fsm = new StateMachine({
      init: 'idle',
      transitions: [{
          name: 'startSeeking',
          from: 'idle',
          to: 'seek'
        },
        {
          name: 'stopSeeking',
          from: 'seek',
          to: 'idle'
        }
      ],
      methods: {
        onStartSeeking: () => {
          this.loadTexture('angry_bot');
          console.log('I am angry!!')
        },
        onStopSeeking: () => {
          this.loadTexture('bot');
          this.body.velocity.x = 0;
          console.log('Damn, where are you?')
        }
      }
    });
  }
  move() {
    if (this.fsm.is('idle') && Phaser.Point.distance(this, this.target) < 80) {
      this.fsm.startSeeking();
    } else if (this.fsm.is('seek')) {
      if (Phaser.Point.distance(this, this.target) > 240) {
        this.fsm.stopSeeking();
      } else {
        super.move();
      }
    }
  }
}

class SeekAndDestroyBot extends SeekerBot {

  constructor(game, x, y, key, arg) {
    super(game, x, y, key, arg);
    this.base = arg.base;
    this.hero = arg.hero;
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
          console.log('I am angry!!')
          this.loadTexture('angry_bot');
          this.target = this.hero;
        },
        onStartSeekingBase: () => {
          console.log("I'll destroy your base!");
          this.loadTexture('bot');
          this.target = this.base;
        }
      }
    });
  }
  move() {
    if (this.fsm.is('seekBase') && Phaser.Point.distance(this, this.hero) < 180) {
      this.fsm.startSeekingHero();
    } else if (this.fsm.is('seekHero') && Phaser.Point.distance(this, this.hero) > 240) {
      this.fsm.startSeekingBase();
    }

    super.move();

  }
}

class DefenderBot extends SeekerBot {

  constructor(game, x, y, key, arg) {
    super(game, x, y, key, arg);
    this.base = arg.base;
    this.hero = arg.hero;
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
          console.log('onStartSeekingHero');
          console.log('Get out of my ranch!!')
          this.loadTexture('angry_bot');
          this.target = this.hero;
        },
        onGoBackToBase: () => {
          console.log('onGoBackToBase');
          this.loadTexture('bot');
          this.target = this.base;
        },
        onArriveBase: () => {
          console.log('onArriveBase');
          this.body.velocity.x = 0;
          //  this.body.velocity.y = 0;
          this.loadTexture('bot');
          this.target = this.base;
        }
      }
    });
  }
  move() {

    let shouldMove = true;

    if ((Phaser.Point.distance(this, this.hero) < 180) && (this.fsm.is('idle') || this.fsm.is('goingToBase'))) {
      this.fsm.startSeekingHero();
    } else if (this.fsm.is('seekHero') && Phaser.Point.distance(this, this.hero) > 240) {
      this.fsm.goBackToBase();
    } else if (this.fsm.is('goingToBase') && Phaser.Point.distance(this, this.base) < 60) {
      console.log("TADAIMA");
      this.fsm.arriveBase();
    }
    if (this.fsm.is('idle')) {
      shouldMove = false;
    }
    if (shouldMove) {
      super.move();
    }
  }
}
