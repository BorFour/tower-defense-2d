

function getCharactersInDistance(p, chars, distance) {
  let nearChars = [];
  chars.forEach((char) => {
    let currDistance = game.physics.arcade.distanceBetween(p, char);
    if (currDistance < distance) {
      nearChars.push(char);
    }
  });
  return nearChars;
}


class Group {
  constructor(members, center) {
    this.wasRevived = false;
    this.members = members;
    this.nMembers = members.length;
    this.center = center;
    this.rewards = [];
    this.tomb = new Tomb(game, center.x, center.y + 45, "tomb", this);
    this.tomb.width = 32;
    this.tomb.height = 32;
    this.rewards.push(this.tomb);
    this.rewardsAvailable = true;
  }
  spawn() {
    for (var member in this.members) {
      this.members[member].x = this.center.x + game.rnd.integerInRange(-15, 15);
      this.members[member].y = this.center.y;
      this.members[member].spawn();
    }
  }

  getRewards() {
    this.rewards.map((item) => {
      item.spawn();
      items.push(item);
    });
    GAME.tombs.add(this.tomb);
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

  remove() {

    this.tomb.remove();

    this.rewards.map((item) => {
      if(item) item.remove();
    });

    this.members.map((item) => {
      if(item) item.remove();
    });
    // super.remove();
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

class BeeHive extends Group{
  constructor(creator, center, target) {
    super([], center);
    this.spawnRate = GAME.waveParams.spawnFreq;
    this.beeMaxSpeed = GAME.waveParams.enemyMaxSpeed;
    this.creator = creator;
    this.target = target;
    this.botKey =  creator == FlyingShooterBot ? 'gator_derp' : 'frog';
    this.spawnBee();
    this.createTimer = game.time.events.repeat(Phaser.Timer.SECOND * this.spawnRate, 50, () => {
      if(!GAME.gameManager.currentLevel.isComplete()) {
        this.spawnBee();
      }
    }, this);
  }
  spawnBee() {
    let member = new this.creator(game, this.center.x, this.center.y, this.botKey, {
      hero: PJ,
      base: this.target,
      target: this.target
    });
    member.dmg = GAME.waveParams.dmg;
    this.members.push(member);
    member.spawn();
    GAME.bots.add(member);
    member.body.maxVelocity.x = this.beeMaxSpeed;
  }

  updateValues() {
    this.spawnRate = GAME.waveParams.spawnFreq;
    this.beeMaxSpeed = GAME.waveParams.enemyMaxSpeed;
  }

}
