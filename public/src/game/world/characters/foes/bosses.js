
class DefenderBossBot extends DefenderBot {
  constructor(game, x, y, args) {
    super(game, x, y, "boss1", args);
    this.ignoreGranny = true;
    this.team = Team.NPC;
    this.width = 126;
    this.height = 226;
    this.dmg = 50;
    this.attackRange = 1300;
    this.loot = ITEMS.loots.boss;
    this.angryKey = "boss1";
  }

  attack() {
    this.shoot();
  }
}
