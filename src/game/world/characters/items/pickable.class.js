class Pickable extends Character {
  constructor(game, x, y, key, onPick) {
    super(game, x, y, key);
    this.onPick = onPick;
  }
}

class PickableManual extends Pickable {
  constructor(game, x, y, key, onPick) {
    super(game, x, y, key, onPick);
    // this.pickSign = game.add.sprite(this.x, this.y, 'pickable_manual');
    // this.pickSign.scale.set(.15);
    // this.pickSign.anchor.set(.50);
    this.halo = game.add.graphics(0, 0);
    this.halo.lineStyle(0);
    this.halo.beginFill(0xFFFF0B, 0.5);
    this.halo.drawCircle(0, 0, 500);
    this.halo.endFill();
    this.halo.alpha = 0;
    this.addChild(this.halo);
    this.keyIcon = game.add.sprite(this.x, this.y - 40, 'key_F');
    this.keyIcon.anchor.set(.5);
    this.keyIcon.scale.set(1.5);
    this.keyIcon.alpha = 0;

    // this.pickSign.spawn();
    // this.pickSign.anchor.set
    // this.addChild(this.pickSign);
  }

  update() {
    super.update();
    this.keyIcon.x = this.x;
    this.keyIcon.y = this.y - 40;
  }

  kill() {
    this.keyIcon.kill();
    super.kill();
  }

  die() {
    this.keyIcon.kill();
    super.die();
  }

  showHalo(shouldShow) {
    this.halo.alpha = shouldShow ? 1 : 0;
    this.keyIcon.alpha = shouldShow ? 1 : 0;
  }
}

function getNearestPickableManual(hero) {
  return getNearestTarget(hero, GAME.pickablesManual);
}
