class Hero extends LivingCharacter {
  constructor(game, x, y, key, args) {
    super(game, x, y, key);
    this.anchor.set(.5);
    this.backflipCount = 0;
    this.money = args.money;
    this.nGrenades = args.nGrenades;
    this.score = 0;
    this.items = game.add.group();
    this.minions = [];
    this.team = 1;
    this.fireRate = 750;
    this.attackRate = 200;
    this.grenades = [];
    this.weapons = [new WeaponShotgun(this), new WeaponMachinegun(this), new WeaponSniper(this)];
    this._currWeapon = 0;
    this._attacking = false;
    this.changeWeaponSound = game.add.audio("change_weapon", 0.16, false);
    this.arrow = game.add.sprite(0, 0, 'arrow');
    this.arrow.anchor.set(.5);
    this.arrow.scale.set(.6);
    this.addChild(this.arrow);

    // this.gun = game.add.sprite(0, 0, "gun");
    // this.gun.anchor.setTo(.5, 1);
    // this.gun.width = 40;
    // this.gun.height = 30;
    // this.addChild(this.gun);
    this.canReceiveDamage = true;

    this.body.setSize(25, 62, 25, 20);
    this.body.reset(this.x, this.y);

    this.animations.add('walk', [8, 9, 10, 11, 12, 13], 10, true);
    this.animations.add('walk_gun', [16, 17, 18, 19, 20, 21], 10, true);
    this.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    this.animations.add('jump', [33, 32, 26, 27, 27, 27, 27, 26, 32, 33], 15, false);
    this.animations.add('crouch', [32, 33], 15, false);
    // this.animations.add('shoot', [32, 33], 20, false);
    this.animations.play('idle', 5, true);

    // this.hat = game.add.sprite(0, -15, "hat");
    // this.hat.anchor.set(.5);
    // this.hat.width = 32;
    // this.hat.height = 32;
    // this.addChild(this.hat);
  }

  nextWeapon() {
    this.line1 = null;
    this.changeWeaponSound.play();
    this._currWeapon += 1;
    this._currWeapon %= this.weapons.length;
    this.changeWeapon();
  }

  prevWeapon() {
    this.line1 = null;
    this.changeWeaponSound.play();
    this._currWeapon -= 1;
    this._currWeapon += this.weapons.length;
    this._currWeapon %= this.weapons.length;
    this.changeWeapon();
  }

  changeWeapon() {
    this.line1 = null;
    this.canShoot = false;
    this.shootTimer = game.time.create(true);
    this.shootTimer.add(500, () => {
      this.canShoot = true;
    }, this);
    this.shootTimer.start();
  }

  set currWeapon(arg) {
    if (arg != this._currWeapon) {
      if (this.changeWeaponSound) this.changeWeaponSound.play();
      this._currWeapon = arg;
      this.changeWeapon();
    }
  }

  get currentWeapon() {
    return this.weapons[this._currWeapon];
  }

  shoot(target) {
    if (!this.canShoot) return;
    this.currentWeapon.onDown(target);
  }

  jump() {
    let jumped = false;
    if (this.body.blocked.down || this.onWall) {
      this.body.velocity.y = -gameOptions.playerJump;

      if (this.body.blocked.right || this.body.blocked.left) {
        this.scale.x *= -1;
        this.body.velocity.x = gameOptions.playerSpeed * this.scale.x;
      }
      this.onWall = false;
      jumped = true;
    }

    if (jumped) {
      this.play('jump');
      this.isJumping = true;
    }
  }

  dash(left) {
    // this.dashAnimation = game.add.tween(this.body).to({
    //   x: this.x + (left ? 100 : -100)
    // }, 150, Phaser.Easing.Linear.None, true);
    // this.dashAnimation.onComplete.add(() => {}, this);
  }

  backflip() {
    if (this.body.blocked.down || this.onWall) {
      this.dash(false);
    } else {
      super.backflip();
      this.makeImmune(Phaser.Timer.SECOND * 0.3);
    }
  }

  frontflip() {
    if (this.body.blocked.down || this.onWall) {
      this.dash(true);
    } else {
      super.frontflip();
      this.makeImmune(Phaser.Timer.SECOND * 0.3);
    }
  }

  heal(hp) {
    this.hp = Math.min(this.maxHp, this.hp + hp);
  }

  reset() {
    this.score = 0;
    this.hp = 100;
  }

  rotateGun() {
    // x: game.input.x + game.camera.x,
    // y: game.input.y + game.camera.y
    // this.gun.rotation = game.physics.arcade.rotationBetween(this, game.input);

    let dir = GAME.controller.shootDirection();
    if (!dir) return;

    if (this.scale.x < 0) {
      dir.x += (this.x - dir.x) * 2;
    }

    let angle = game.physics.arcade.angleBetween(this, dir);
    this.arrow.rotation = angle;
    return;

    if (GAME.controller.type == Controller.GAMEPAD) {
      this.gun.rotation = Math.atan2(dir.y, (this.scale.x < 0 ? -1 : 1) * dir.x);
    } else {
      let boundedX =
        this.gun.rotation = Math.atan2((game.input.y - game.camera.height / 2), (this.scale.x < 0 ? -1 : 1) * (game.input.x - game.camera.width / 2));
    }

    // if (this.scale.x < 0) {
    //   if (this.gun.rotation < -Math.PI / 2) {
    //     this.gun.x = -Math.abs(this.gun.x);
    //   } else {
    //     this.gun.x = Math.abs(this.gun.x);
    //   }
    // }
  }

  carryItem(item) {
    this.items.add(item);
  }

  dropItem() {
    this.items.remove(this.carryingItem);
  }

  makePunchDash2(dmg) {

    if (this._attacking) return;

    this._attacking = true;
    this.body.maxVelocity.x = 900;
    this.attackTimer = game.time.events.add(this.attackRate, () => {
      PJ.body.maxVelocity.x = 900;
      this._attacking = false;
    }, this);

    super.makePunchDash2(dmg);
  }

  updateMove() {

    if (this._attacking) return;

    if (!this.isPunching) {
      if (!this.body.blocked.down) {

        if (GAME.controller.leftDown()) {
          this.scale.x = -Math.abs(this.scale.x);

          this.body.velocity.x += -gameOptions.playerSpeed / 10;
          if (!this.isJumping) {
            if (GAME.controller.shootDirection()) {
              this.play("walk_gun");
            } else {
              this.play("walk");
            }
          }
        } else if (GAME.controller.rightDown()) {
          this.scale.x = Math.abs(this.scale.x);

          this.body.velocity.x += gameOptions.playerSpeed / 10;
          if (!this.isJumping) {
            if (GAME.controller.shootDirection()) {
              this.play("walk_gun");
            } else {
              this.play("walk");
            }
          }
        } else {
          if (!this.isJumping) this.play("idle");
        }

        if (GAME.controller.downDown()) {
          this.crouch();
        } else {
          this.standUp();
        }

      }
    }
  }

  standUp() {
    if (this.body.height < 60) {
      this.body.setSize(25, 62, 25, 20);
      // this.body.reset(this.x, this.y);
    }
  }

  crouch() {
    if (this.animations.currentAnim.name != "crouch") this.play("crouch");
    if (this.body.height > 60) this.body.setSize(25, 42, 25, 35);
    let prevVelocityX = this.body.velocity.x;
    // this.body.reset(this.x, this.y);
    this.body.velocity.x = prevVelocityX/1.5;

  }

  makeImmune(time) {
    super.makeImmune(time);
    this.changeWeapon();
  }

  receiveDamage(source) {
    if (!this.canReceiveDamage) return;

    this.alpha = 0.5;
    this.canReceiveDamage = false;
    super.receiveDamage(source);

    this.damageTimer = game.time.events.add(Phaser.Timer.SECOND * 1.5, () => {
      this.alpha = 1;
      this.canReceiveDamage = true;
    }, this);

    if (GAME.hardcoreMode) {
      game.camera.flash(0xbb0000, 350, false);
      game.camera.shake(0.005, 350);
    }
  }

}
