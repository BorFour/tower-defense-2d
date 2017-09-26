class Inventory {
  constructor() {

  }
}



class Character extends Phaser.Sprite {
  constructor(game, x, y, key) {
    super(game, x, y, key)
    this.anchor.set(0.5);
    this.hp = 100;
    this.isAlive = true;
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.gravity.y = 900;
    this.body.maxVelocity.x = 300;
  }

  spawn() {
    game.add.existing(this);
  }

  receiveDamage(dmg) {
    this.hp -= dmg;
    if (this.hp <= 0) {
      this.isAlive = false;
      this.destroy();
    }
  }

  moveLeft() {
    this.body.velocity.x += -this.speed;
  }
  moveRight() {
    this.body.velocity.x += this.speed;
  }

  jump() {
    if (this.body.blocked.down) {
      this.body.velocity.y = -350;
      if (this.body.blocked.right || this.body.blocked.left) {

        // flip horizontally the sprite
        this.scale.x *= -1;

        // change the horizontal velocity too. This way the sprite will jump off the wall
        this.body.velocity.x = this.speed * this.scale.x;
      }
    }
  }
}

class Item extends Character {
  constructor(game, x, y, key) {
    super(game, x, y, key);
  }
}

class Hero extends Character {
  constructor(game, x, y, key) {
    super(game, x, y, key);
    this.score = 0;
    this.items = game.add.group();
    this.gun = game.add.sprite(20, 5, "gun");
    this.gun.anchor.setTo(0.5, 0.5);
    this.gun.width = 40;
    this.gun.height = 60;
    this.addChild(this.gun);
  }

  rotateGun() {
    this.gun.rotation = game.physics.arcade.angleBetween(this.gun, game.input) + 45;
  }
  carryItem(item) {
    this.items.add(item);
  }

  dropItem() {
    this.items.remove(this.carryingItem);
  }

}
