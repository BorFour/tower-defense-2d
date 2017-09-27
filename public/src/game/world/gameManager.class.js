class Level {
  constructor(onStart, onUpdate, onNewWave, onRemove, context, tilemapName) {
    this.context = context;
    this.onStart = onStart;
    this.onUpdate = onUpdate;
    this.onNewWave = onNewWave;
    this.onRemove = onRemove;
    this.tilemapName = tilemapName;
    this.nWaves = 1;
    this.currentWave = 1;
  }

  start() {
    this.onStart(this.context, this.tilemapName);
    // game.time.events.loop(Phaser.Timer.SECOND * .25, () => {
    //   updateBots(this.context);
    // }, this);
  }

  update() {
    this.onUpdate(this.context);
  }

  remove() {
    this.onRemove(this.context);
  }

  diffToComplete() {
    return PJ.score + " of " + GAME.waveParams.scoreToWin + " points";
  }

  isComplete() {
    return PJ.score >= GAME.waveParams.scoreToWin;
  }

  saveData() {
    GAME.score += PJ.score;
    GAME.dataLoader.highscore = GAME.score;
    PJ.reset();
    GAME.heroArgs.money = PJ.money;
    GAME.heroArgs.nGrenades = PJ.nGrenades;
    GAME.waveParams.spawnFreq *= .9;
    GAME.waveParams.scoreToWin += 5;
    GAME.waveParams.enemyMaxSpeed *= 1.15;
    GAME.waveParams.dmg += 5;
    this.currentWave += 1;
    GAME.waveParams.waveNumber = this.currentWave;
    GAME.heroArgs.nGrenades = PJ.nGrenades;
    GAME.heroArgs.x = PJ.x;
    GAME.heroArgs.y = PJ.y;
  }

  resetData() {
    PJ.reset();
    GAME.score = 0;
    GAME.waveParams.spawnFreq = 8;
    GAME.waveParams.scoreToWin = 10;
    GAME.waveParams.enemyMaxSpeed = 100;
    GAME.waveParams.dmg = 20;
    this.currentWave = 0;
    GAME.waveParams.waveNumber = 1;
    GAME.heroArgs.money = 30;
    GAME.heroArgs.turretLvl = 1;
    GAME.heroArgs.nGrenades = 3;
    GAME.heroArgs.x = (ROOM_W * 2 - 12) * CELL_W;
    GAME.heroArgs.y = 150;
  }

  onNextWave() {
    this.saveData();
    this.onNewWave(this.context);
    if (this.currentWave >= this.nWaves) {
      return true;
    } else {
      return false;
    }
  }

  onEnemyDied(enemy, killer) {
    if (enemy.team != PJ.team) {
      let mult = PJ.backflipCount + 1 + (PJ.angle < 0 ? 1 : 0);
      for (var i = 0; i < mult; i++) {
        enemy.loot.onCreate(enemy, enemy.loot.onPick);
      }
      PJ.score += enemy.points * mult;
    }
  }
}

class GameManager {
  constructor(context) {
    this.context = context;
    // let firstStage = new Level(createFirstLevel, updateFirstLevel, newWaveFirstLevel, removeFirstLevel, this.context);
    // let secondStage = new Level(createFirstLevel2, updateFirstLevel, newWaveFirstLevel, removeFirstLevel, this.context);
    let thirdStage = new Level(createFirstLevel3, updateFirstLevel, newWaveFirstLevel, removeFirstLevel, this.context, 'level3');
    let fourthStage = new Level(createFirstLevel3, updateFirstLevel, newWaveFirstLevel, removeFirstLevel, this.context, 'level4');
    let fifthStage = new Level(createFirstLevel3, updateFirstLevel, newWaveFirstLevel, removeFirstLevel, this.context, 'level5');
    let sixthStage = new Level(createFirstLevel3, updateFirstLevel, newWaveFirstLevel, removeFirstLevel, this.context, 'level6');
    let seventhStage = new Level(createFirstLevel7, updateFirstLevel, newWaveFirstLevel, removeFirstLevel, this.context, 'level7');

    seventhStage.isComplete = function() {
      return PJ.score >= 2;
    };

    this.stages = [];
    // this.stages.push(firstStage);
    // this.stages.push(secondStage);
    this.stages.push(thirdStage);
    this.stages.push(fourthStage);
    this.stages.push(fifthStage);
    this.stages.push(sixthStage);
    this.stages.push(seventhStage);
    this.currentIndex = GAME.dataLoader.firstLevel - 1;
  }

  get currentLevel() {
    return this.stages[this.currentIndex];
  }

  start(context) {
    this.context = context;
    this.currentLevel.start();
  }

  nextStage() {
    saveHeroArgs(PJ);
    let isOverLevel = this.currentLevel.onNextWave();
    if (isOverLevel) {
      console.log('NEXT LEVEEEEEEEEL');
      this.currentIndex += 1;



      this.currentIndex = this.currentIndex % this.stages.length;
      GAME.heroArgs.x = (ROOM_W * 2 - 12) * CELL_W;
      GAME.heroArgs.y = 150;
      game.camera.fade(0x000000, 1500, false);
      game.state.start("PlayGame", true, false);
    }
  }

  update() {
    this.currentLevel.update();
  }
}

GameManager.ARCADE = 0;
GameManager.STORYMODE = 1;

class GameManagerArcade extends GameManager {

}

class GameManagerStoryMode extends GameManager {

  nextStage() {
    saveHeroArgs(PJ);
    let isOverLevel = this.currentLevel.onNextWave();
    if (isOverLevel) {
      // console.log('NEXT LEVEEEEEEEEL');
      this.currentIndex += 1;
      console.log(this.currentIndex);
      console.log(this.stages.length);
      if(this.currentIndex >= this.stages.length) {
        console.log('CUAAAAAAAAAACK');
        GAME.goGameOver();
      } else {
        this.currentIndex = this.currentIndex % this.stages.length;
        GAME.heroArgs.x = (ROOM_W * 2 - 12) * CELL_W;
        GAME.heroArgs.y = 150;
        game.camera.fade(0x000000, 1500, false);
        game.state.start("PlayGame", true, false);
      }
    }
  }
}
