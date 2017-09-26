class Weapon extends Phaser.Weapon {
  constructor(parent, arg) {
    super(game, parent);
    this._parent = parent;
    this.canShoot = true;
    this.nBullets = 0;
    this.magSize = 0;
    this._reloadSound = game.add.audio("reload", 0.06, false);
  }

  shoot(projectile, target, velocity, deviation) {
    if (!target || !this._parent.canShoot) return null;
    if (target) {
      this.canShoot = false;
      let bullet = new projectile(game, this._parent.x, this._parent.y, {
        x: target.x,
        y: target.y
      }, velocity, deviation);
      bullet.team = this.team;
      bullet.width = 15;
      bullet.height = 15;
      bullet.dmg = 25;
      bullet.spawn();
      GAME.bullets.add(bullet);
      this.canShoot = false;

      this.fireTimer = game.time.create(true);
      this.fireTimer.add(this._fireRate, () => {
        this.canShoot = true;
      }, this);
      this.fireTimer.start();

      return bullet;

    }
  }


  reload(t) {
    t = t || 1000;
    this.reloadTimer = game.time.create(true);
    this.reloadTimer.add(t, () => {
      this.nBullets = this.magSize;
      this._reloadSound.play();
    }, this);
    this.reloadTimer.start();
  }

  onDown(target) {
    throw ("Method not implemented");
  }

  onUp(target) {
    throw ("Method not implemented");
  }

  fire(target) {
    // TODO
    this.onDown(target);
  }

  toString() {
    return this._name;
  }

  isType(type) {
    return type == this._name;
  }
}

class WeaponShotgun extends Weapon {
  constructor(parent) {
    super(parent);
    this._name = "shotgun";
    this._fireRate = 1250;
    this._sound = game.add.audio("shotgun", 0.06, false);
    this.magSize = 5;
    this.nBullets = this.magSize;
  }

  onDown(target) {
    if (!target || !this.canShoot || this.nBullets <= 0) return;
    let currentBullets = this.nBullets;
    for (var i = 0; i < currentBullets; i++) {
      let newTarget = {
        x: target.x,
        y: target.y
      };
      let bullet = this.shoot(ShotgunBullet, newTarget, 600, .5);
      if (!bullet) return;
      bullet.body.maxVelocity = 1200;
      bullet.dmg = 20;
      bullet.width = 15;
      bullet.height = 10;
      this.nBullets -= 1;
    }
    this._sound.play();
  }

  onUp(target) {
    this.reload(this._fireRate);
  }
}

class WeaponMachinegun extends Weapon {
  constructor(parent) {
    super(parent);
    this._name = "machinegun";
    this._fireRate = 125;
    this._sound = game.add.audio("machinegun", 0.06, true);
    this.magSize = 10;
    this.nBullets = this.magSize;
  }

  onDown(target) {
    if (!target || !this.canShoot) return;
    // if(!this._sound.isPlaying) this._sound.play();
    if(this.nBullets > 0) {
      let bullet = this.shoot(SMGBullet, target, 900, .2);
      if (!bullet) return;
      bullet.body.maxVelocity = 1900;
      bullet.dmg = 9;
      bullet.width = 15;
      bullet.height = 10;
      this.nBullets -= 1;
    }
  }

  onUp(target) {
    this.reload();
  }
}

function tweenToPJ() {
  if(!PJ || !PJ.alive) return;
  let moveToPJAnimation = game.add.tween(game.camera).to({
    x: PJ.x - (game.camera.width / 2),
    y: PJ.y - (game.camera.height / 2)
  }, 500, Phaser.Easing.Quadratic.InOut, true);

  moveToPJAnimation.onComplete.add(() => {
    game.camera.follow(PJ, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
  }, this);

}

class WeaponSniper extends Weapon {
  constructor(parent) {
    super(parent);
    this._name = "sniper";
    this._fireRate = 3000;
    this._sound = game.add.audio("sniper", 0.06, false);
    this.magSize = 1;
    this.nBullets = this.magSize;
  }

  onDown(target) {
    if (!target) return;
    PJ.line1 = new Phaser.Line(PJ.x, PJ.y, target.x, target.y);
    PJ.graphics = game.add.graphics(PJ.x, PJ.y);
    PJ.graphics.quadraticCurveTo(target.x, target.y, 480, 100);
    window.graphics = PJ.graphics;
    let coords = GAME.controller.shootPoint();
    if (!GAME.controller.downDown() && coords) {
      game.camera.follow(null, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);
      game.camera.x -= (game.camera.view.centerX - coords.x) / 35;
      game.camera.y -= (game.camera.view.centerY - coords.y) / 35;
    }
  }

  onUp(target) {
    PJ.line1 = null;
    if (!target || !this.canShoot) {
      tweenToPJ();
      return;
    }
    let bullet = this.shoot(SniperBullet, target, 1500, 0);
    if (!bullet) {
      tweenToPJ();
      return
    } else if (!GAME.controller.boostDown()) {
      tweenToPJ();
    } else {
      game.camera.follow(bullet, Phaser.Camera.FOLLOW_PLATFORMER);
    }
    this._sound.play();
    bullet.dmg = 150;
    bullet.body.maxVelocity = 2900;
    bullet.width = 15;
    bullet.height = 10;
    this.nBullets -= 1;
    this.reload(this._fireRate);
  }
}
