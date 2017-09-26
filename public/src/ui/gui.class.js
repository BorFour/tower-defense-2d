// Classy...! HA HA

class GUI extends dat.GUI {
  constructor() {
    super();
    // this.add(game.time, "slowMotion", 1, 16).step(.1);
    this.add(GAME, "debug");
    this.add(GAME, "debugPhysics");
    this.add(GAME, "hardcoreMode");
    this.add(GAME, "sandbox_mouseMask");
    this.add(GAME, "sandbox_coolTransitions");
    this.add(GAME, "sandbox_foggyMode");
    this.add(GAME.dataLoader, "mute");
    GAME.restart = () => {
      game.paused = false;
      this.close();
      game.state.start("PreloadGame");
    };
    this.add(GAME, "restart");
    GAME.goToMenu = () => {
      game.paused = false;
      this.close();
      game.state.start("Menu");
    };
    this.add(GAME, "goToMenu");
    this.add(GAME, "goGameOver");
    this.add(GAME.dataLoader, "firstLevel", 1, GAME.maxLevel).step(1);
    this.add(GAME.dataLoader, "name");
    this.close();
  }
}
