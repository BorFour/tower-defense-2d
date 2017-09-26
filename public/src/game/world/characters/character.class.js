class Inventory {
  constructor() {
    this.items = {};
  }

  addItem(key) {
    if (this.items[key]) {
      this.items[key] += 1;
    } else {
      this.items[key] = 1;
    }
  }
}

class Character extends Phaser.Sprite {
  constructor(game, x, y, key, args) {
    super(game, x, y, key)
    this.anchor.set(0.5);

    this.alive = true;
    this.points = 1;
    this.nGrenades = 0;
    this.backflipCount = 0;

    // Booleans
    this._canMove = true;
    this.isAttacking = false;
    this.canShoot = true;

    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.body.gravity.y = 900;
    this.body.maxVelocity.x = 300;
    this.body.maxVelocity.y = 900;
    this.team = Team.NPC;
    this.attackRate = 1500;
    this.fireRate = 1000;
    this.epsilon = 40;
    this.attackRange = 180;
    this.speed = 50;
    this._climbSpeed = -150;
    this.dmg = 20;
    this.dieSound = game.add.audio("death", 0.25, false);

    this.loot = args && args.loot ? args.loot : ITEMS.loots.default;

  }

  spawn() {
    game.add.existing(this);
  }

  knockOut(time) {
    this._canMove = false;
    this.moveTimer = game.time.create(true);
    this.moveTimer.add(time, () => {
      this._canMove = true;
    }, this);
    this.moveTimer.start();
  }

  moveLeft() {
    if (this.isAttacking || !this._canMove) return;
    this.body.velocity.x += -this.speed;
    this.scale.x = -Math.abs(this.scale.x);
  }

  moveRight() {
    if (this.isAttacking || !this._canMove) return;
    this.body.velocity.x += this.speed;
    this.scale.x = Math.abs(this.scale.x);
  }

  stop() {
    if (!this.body.blocked.down || this.isAttacking) return;
    this.play('idle');
    this.body.velocity.x = 0;
  }

  jump() {
    if (this.isAttacking || !this._canMove) return false;
    if (this.body.blocked.down) {
      this.body.velocity.y = -350;
      this.play('jump');
    } else if (this.body.blocked.right || this.body.blocked.left) {
      this.body.velocity.y = -350;
      this.scale.x *= -1;
      this.body.velocity.x = this.speed * this.scale.x;
      this.play('jump');
    } else if (this.leftWall || this.rightWall) {
      this.leftWall = false;
      this.rightWall = false;
      this.body.velocity.y = this._climbSpeed;
    }

    return true;
  }

  createClimbTimer() {
    // this.isClimbing = true;
    // this.body.gravity.y = -900;
    // this.climbTimer = game.time.events.add(2250, () => {
    //   this.isClimbing = false;
    //   // this.body.gravity.y = 900;
    // }, this);
  }

  climb(to) {
    // if (!this.isClimbing) {
    // this.createClimbTimer();
    // } else {
    // game.physics.arcade.moveToXY(this, this.x, to.y - 90, 900);
    // }
    // } else {
    // this.body.gravity.y = 900;
    // }
  }

  backflip() {
    this.jump();
    this.backflipAnimation = game.add.tween(this).to({
      angle: (this.scale.x < 0 ? 1 : -1) * 360
    }, 300, Phaser.Easing.Linear.None, true);
    this.backflipAnimation.onComplete.add(() => {
      this.backflipCount += 1;
    }, this);
  }

  frontflip() {
    this.jump();
    this.backflipAnimation = game.add.tween(this).to({
      angle: (this.scale.x < 0 ? -1 : 1) * 360
    }, 300, Phaser.Easing.Linear.None, true);
    this.backflipAnimation.onComplete.add(() => {
      this.backflipCount += 1;
    }, this);
  }

  makePunchDash2(dmg) {
    if (this.punch || !this._canMove) return;

    // this.body.maxVelocity *= 1.5;
    // if (game.rnd.frac() > 0.5) this.jump();
    this.body.velocity.x += this.scale.x * 250;
    this.punch = new Attack(game, 0, 0, 'punch', this);
    this.punch.team = this.team;
    // this.punch.width = 15;
    // this.punch.height = 15;
    this.punch.dmg = dmg;
    this.addChild(this.punch);
    // this.punch.spawn();
    game.add.tween(this.punch).to({
      x: [30],
      y: [0]
    }, 125, Phaser.Easing.Cubic.None, true, 1, 0, false).onComplete.add(() => {
      if (this.punch) {
        if (this.key == "doge") console.log(this.punch);
        this.punch.kill();
      }
      this.punch = null;
    }, this);
    this.punch.hitSound = game.add.audio("hit", 0.25, false);
  }

  makePunchDash(dmg) {
    if (this.punch || !this._canMove) return;

    // this.body.maxVelocity *= 1.5;
    // if (game.rnd.frac() > 0.5) this.jump();
    this.body.velocity.x += this.scale.x * 250;
    this.punch = new Attack(game, 0, 0, 'punch', this);
    this.punch.team = this.team;
    // this.punch.width = 15;
    // this.punch.height = 15;
    this.punch.dmg = dmg;
    this.addChild(this.punch);
    // this.punch.spawn
    game.add.tween(this.punch).to({
      x: [15, 30, 30],
      y: [0, -25, -50]
    }, 500, Phaser.Easing.Cubic.None, true, 1, 0, false).onComplete.add(() => {
      if (this.punch) {
        if (this.key == "doge") console.log(this.punch);
        this.punch.kill();
      }
      this.punch = null;
    }, this);
    this.punch.hitSound = game.add.audio("hit", 0.25, false);
  }

  makePunchJump(dmg) {
    if (this.punch || !this.body.blocked.down || !this._canMove) return;
    this.jump();
    this.makePunchDash(dmg);
  }

  makePunch(dmg) {
    // if(this.team == 1) console.log(this);
    game.rnd.frac() > 0.5 ? this.makePunchDash(dmg) : this.makePunchJump(dmg);
    // this.makePunchJump(dmg);
  }

  shoot(target, velocity, projectile) {
    projectile = projectile || Bullet;
    if (!target) return null;
    if (target) {
      this.canShoot = false;
      let bullet = new projectile(game, this.x, this.y - 15, {
        x: target.body ? target.body.center.x : target.x,
        y: target.body ? target.body.center.y - 15: target.y
      }, velocity);
      bullet.team = this.team;
      bullet.width = 15;
      bullet.height = 15;
      bullet.dmg = 25;
      bullet.spawn();
      GAME.bullets.add(bullet);
      this.canShoot = false;

      this.fireTimer = game.time.events.add(this.fireRate, () => {
        this.canShoot = true;
      }, this);

      return bullet;
    }
  }

  create_grenade(target) {
    // if (this.grenade || this.grande) return;
    if (this.nGrenades < 1 || !target) return;
    let grenade = new Projectile(game, this.x, this.y, "grenade", {
      x: target.x,
      y: target.y
    });
    this.grenade = grenade;
    grenade.team = this.team;
    grenade.dmg = 500;
    grenade.AoE = 64;
    grenade.alive = false;
    grenade.explodeTimer = game.time.events.add(2000, () => {
      this.explosionAnimation = game.add.sprite(grenade.x, grenade.y, 'explosion');
      this.explosionAnimation.anchor.set(.5);
      this.explosionAnimation.animations.add('walk');
      this.explosionAnimation.animations.play('walk', 50, false);
      let charsExploded = getCharactersInDistance(grenade, GAME.bots, grenade.AoE);
      // console.log(charsExploded);
      charsExploded.map((item) => {
        item.receiveDamage(grenade);
      });

      grenade.die();
      grenade = null;
    }, this);
    this.nGrenades -= 1;
    this.grenades.push(grenade);
  }

  throw_grenade() {
    if (!this.grenade) return;
    // if(this.nGrenades < 1) return;
    this.grenade.x = this.x;
    this.grenade.y = this.y - 10;
    this.grenade.scale.set(.15);
    this.grenade.spawn();
    this.grenade.body.gravity.y = 850;
    this.grenade = null;
  }

  die(killer) {
    GAME.gameManager.currentLevel.onEnemyDied(this, killer);
    this.alive = false;
    // this.body = null;
    this.kill();
  }

  remove() {
    this.destroy();
  }
}

class LivingCharacter extends Character {

  constructor(game, x, y, key, args) {
    super(game, x, y, key, args);
    if (!args) args = {};
    this.hp = args.hp || 100;
    this.maxHp = args.maxHp || 100;
    this.healthbar = game.add.sprite(0, -this.height / 2 - 8, 'healthbar');
    this.healthbar.anchor.set(.5);
    this.healthbar.height = 5;
    this.healthbar.scale.x = .18 * (this.hp / this.maxHp);
  }

  update() {
    super.update();
    this.healthbar.x = this.x;
    this.healthbar.y = this.y - this.height / 2 - 8;
  }

  receiveDamage(source) {
    if (!source) return;
    if (typeof source == 'number') {
      this.hp -= source;
    } else {
      if (source.hitSound) source.hitSound.play();
      this.hp -= source.dmg;
    }
    if (this.hp <= 0) {
      this.die();
    } else {
      this.healthbar.scale.x = .18 * (this.hp / this.maxHp);
    }
  }

  makeImmune(time) {
    if (this.canReceiveDamage) {
      this.alpha = 0.5;
      this.canReceiveDamage = false;
      this.canShoot = false;
      this.damageTimer = game.time.events.add(Phaser.Timer.SECOND * 0.3, () => {
        this.alpha = 1;
        this.canReceiveDamage = true;
      }, this);
    }
  }

  kill() {
    super.kill();
    this.healthbar.kill();
  }
}

class Attack extends Character {
  constructor(game, x, y, key, parent) {
    super(game, x, y, key, parent);
    this._parent = parent;
    this.body.gravity.y = 0;
    this.dmg = 100;
    this.scale.set(.0625);
    this.scale.x *= 1 / this._parent.scale.x;
    this.scale.y *= 1 / this._parent.scale.y;
    this.scale.x = parent.scale.x < 0 ? -this.scale.x : this.scale.x;
  }
}

class Item extends Character {
  constructor(game, x, y, key) {
    super(game, x, y, key);
  }
}
