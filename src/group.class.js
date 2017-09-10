
function getNearestTomb(p, camps) {
  let nearest = null;
  let nearestDistance = 400000;
  for (camp of camps) {
    let currDistance = game.physics.arcade.distanceBetween(p, camp.center);
    if (currDistance < nearestDistance) {
      nearest = camp;
      nearestDistance = currDistance;
    }
  }
  return nearest;
}


class Group {
  constructor(members, center) {
    this.members = members;
    this.nMembers = members.length;
    this.center = center;
    this.rewards = [];
    let cactus = new Item(game, center.x, center.y + 20, "tomb");
    cactus.width = 32;
    cactus.height = 32;
    this.rewards.push(cactus);
    this.rewardsAvailable = true;
  }
  spawn() {
    for (var member in this.members) {
      this.members[member].x = this.center.x + game.rnd.integerInRange(-15, 15);
      this.members[member].y = this.center.y + 50;
      this.members[member].spawn();
    }
  }
  resurrect() {

    let areDead = this.members.reduce((vPrev, vCurr, iCurr) => {
      return vPrev && !vCurr.alive;
    }, true);

    if(!areDead) return;

    this.members = [];
    for (var i = 0; i < this.nMembers; i++) {
      let bot = new SeekerBot(game, this.center.x + 20 * i, this.center.y, "undead", {
        base: {
          x: this.center.x,
          y: this.center.y - 60
        },
        hero: PJ,
        target: PJ
      });

      this.members.push(bot);
      bots.push(bot);
    }

    this.spawn();

  }
  getRewards() {
    this.rewards.map((item) => {
      item.spawn();
      items.push(item);
    });
  }
  update() {
    let areDead = this.members.reduce((vPrev, vCurr, iCurr) => {
      return vPrev && !vCurr.alive;
    }, true);

    if (this.rewardsAvailable && areDead) {
      this.getRewards();
      this.rewardsAvailable = false;
    }
  }
}

class Camp extends Group {
  constructor(members, center) {
    super(members, center);
  }
}

class Raid extends Group {
  constructor(members, center) {
    super(members, center);
  }
}
