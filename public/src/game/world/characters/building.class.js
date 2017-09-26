class Building extends Character {
  constructor(game, x, y, key) {
    super(game, x, y, key);
    this.anchor.x = .5;
    this.anchor.y = 1;
    this.body.immovable = true;
    this.body.moves = false;
    this.width = 260;
    this.height = 260;
    this.range = 80;
  }

  isInRange(target) {
    return game.physics.arcade.distanceBetween(this, target) < this.range;
  }
}

class Base extends Building {
  constructor(game, x, y, key) {
    super(game, x, y, key);
    this.granny = new Granny(game, x, y - 75);
    this.granny.spawn();
    this.granny.body.moves = false;
    // this.granny.events.onAnimationComplete.add(() => {
    //   this.granny.scale.x *= -1;
    //   this.granny.animations.play('idle', 5, false);
    // }, this);
  }
}

class Tomb extends Building {
  constructor(game, x, y, key, group) {
    super(game, x, y, key);
    this.group = group;
    this.wasUsed = false;
  }

  use() {
    if (this.wasUsed || !this.isInRange(PJ)) return false;

    // this.members = [];
    // for (var i = 0; i < this.nMembers; i++) {
    for (var i = 0; i < 1; i++) {
      let bot = new CompanionBot(game, this.group.center.x + 20 * i, this.group.center.y, "undead", {
        base: PJ,
        target: PJ,
        hero: null
      });
      bot.team = PJ.team;
      bot.dmg = 50;
      bot.angryKey = "undead";
      // this.members.push(bot);
      GAME.bots.add(bot);
      PJ.minions.push(bot);
      bot.spawn();
    }

    // this.spawn();
    if (!SOUND.resurrectSound || !SOUND.resurrectSound.isPlaying) {
      // SOUND.resurrectSound = game.add.audio("rise_undead", 0.15, false);
      // SOUND.resurrectSound.play();
    }
    this.wasUsed = true;
    this.remove();
    return true;
  }


}
