class HUD extends Phaser.Sprite {
  constructor(game, x, y) {
    super(game, x, y, null);
    game.add.existing(this);
    this.fixedToCamera = true;
    this.controls = game.add.sprite(0, 0, null);
    this.controls.anchor.set(.5);
    this.addChild(this.controls);
    this.anchor.set(.5);
    this.texture.baseTexture.skipRender = false;

    var style = {
      font: "18px Arial",
      fill: "#090317",
      wordWrap: false,
      wordWrapWidth: this.width * 4,
      align: "center",
      backgroundColor: "#00ff3a"
    };

    let offsetX = -game.camera.view.width / 4;
    let offsetY = -game.camera.view.height / 4 - 70;

    this.playerHP = game.add.text(240 - +offsetX, 40, PJ.hp + "HP", style);
    this.playerHP.anchor.set(0.5);
    this.addChild(this.playerHP);

    // Left text
    this.goalText = game.add.text(-290 + offsetX, -340 + offsetY, "", style);
    this.addChild(this.goalText);

    this.playerScore = game.add.text(-290 + offsetX, -290 + offsetY, (GAME.score + PJ.score) + " score", style);
    this.addChild(this.playerScore);

    this.playerGrenades = game.add.text(-290 + offsetX, -240 + offsetY, PJ.nGrenades + " grenades", style);
    this.addChild(this.playerGrenades);

    this.playerMoney = game.add.text(-290 + offsetX, -190 + offsetY, "$" + PJ.money, style);
    this.addChild(this.playerMoney);

    this.currentWave = game.add.text(-290 + offsetX, -140 + offsetY, "$" + PJ.money, style);
    this.addChild(this.currentWave);

    this.currentLevel = game.add.text(-290 + offsetX, -90 + offsetY, "$" + PJ.money, style);
    this.addChild(this.currentLevel);

    this.playerWeapon = game.add.text(-290 + offsetX, -40 + offsetY, "", style);
    this.addChild(this.playerWeapon);

    this.playerWeaponCooldown = game.add.text(-290 + offsetX, 10 + offsetY, "", style);
    this.addChild(this.playerWeaponCooldown);

    this.playerReloadCooldown = game.add.text(-290 + offsetX, 60 + offsetY, "", style);
    this.addChild(this.playerReloadCooldown);

    this.controls.inputEnabled = true;
    this.controls.input.enableDrag();
    this.controls.scale.set(0);

    this.pauseText = game.add.text(game.camera.width / 2, game.camera.height / 2, "Pause");
    this.pauseText.anchor.set(.5);
    this.pauseText.fixedToCamera = true;
    this.pauseText.align = 'center';
    this.pauseText.font = 'Arial Black';
    this.pauseText.fontSize = 90;
    this.pauseText.fontWeight = 'bold';
    this.pauseText.alpha = 0;


  }

  showPause(paused) {
    if (paused) {
      this.pauseText.alpha = 1;
    } else {
      this.pauseText.alpha = 0;
    }
  }

  setUpKeybindings() {
    this.keybindings = game.add.sprite(-420, -580, null);
    this.keybindings.anchor.set(.5);
    this.addChild(this.keybindings);
    this.keybindings.items = [];

    this.keybindings.scale.x = 0;
    this.keybindings.scale.y = 0;

    let kbStyle = {
      font: "36px Arial",
      fill: "#ffffff",
      wordWrap: false,
      wordWrapWidth: this.width * 4,
      align: "center"
    };

    let i = 0;
    for (var key in KEYBINDINGS) {
      let kbKeyText = game.add.text(0, i * 38, key, kbStyle);
      let kbText = game.add.text(350, i * 38, KEYBINDINGS[key], kbStyle);
      this.keybindings.items.push(kbText);
      this.keybindings.items.push(kbKeyText);
      this.keybindings.addChild(kbText);
      this.keybindings.addChild(kbKeyText);
      i += 1;
    }
  }



  setUpButtons() {
    this.controls.goToIcon = new Button(game, this, -210, 10, 60, 50, 'attack', 'button 1');
    this.controls.armyOfDead = new Button(game, this, -140, 2, 70, 70, 'army_dead', 'button 2');
    this.controls.homeIcon = new Button(game, this, -55, 10, 50, 50, 'home', 'button 3');
    this.controls.shotgunIcon = new Button(game, this, 20, 15, 50, 50, 'shotgun_icon', 'LCa');
    this.controls.punchIcon = new Button(game, this, 100, 10, 50, 50, 'punch_icon', 'RC/SHIFT RC');
    this.controls.hideIcon = new Button(game, this, 100, -110, 50, 50, 'hide_icon', 'hide controls/C');
    this.controls.backflipIcon = new Button(game, this, -120, -110, 50, 50, 'backflip_icon', 'backflip/Q');
    this.controls.frontflipIcon = new Button(game, this, -20, -110, 50, 50, 'backflip_icon', 'frontflip/E');
    this.controls.frontflipIcon.scale.x *= -1;
    this.controls.frontflipIcon.x += 40;
    this.controls.muteIcon = new Button(game, this, -200, -110, 50, 50, 'mute_icon', 'mute/M');
    // this.controls.muteIcon.events.onInputDown.add(() => {
    //   game.sound.mute = !game.sound.mute;
    // }, this);
    this.controls.grenadeIcon = new Button(game, this, -300, -110, 50, 50, 'grenade', 'grenade/R');
  }

  youWin() {
    // this.video = game.add.video('congratulations_video');
    // this.video.play(true);
    // this.video.fixedToCamera = true;
    // this.video.alpha = 0.3;
    // this.video.addToWorld(game.camera.width, game.camera.height, 0.5, 0.5);
    // this.video.grab(false, .3);

    this.winText = game.add.text(game.camera.width / 2, game.camera.height / 2, "OMEDETTO!");
    this.winText.fixedToCamera = true;
    this.winText.anchor.set(0.5);
    this.winText.align = 'center';

    this.winText.font = 'Arial Black';
    this.winText.fontSize = 70;
    this.winText.fontWeight = 'bold';
    this.winText.fill = '#263b79';

    this.winText.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);
    // Add a simple bounce tween to each character's position.
    // game.add.tween(this.winText.scale).to({y: 240}, 2400, Phaser.Easing.Bounce.Out, true, 1000 + 400 * i, 0);

    // Add another rotation tween to the same character.
    game.add.tween(this.winText.angle).to({
      angle: 360
    }, 2400, Phaser.Easing.Cubic.In, true, 1000 + 400, 0).start();
  }

  nextWave() {
    this.nextWaveAnimation = game.add.tween(this.currentWave.scale).to({
      x: 1.50,
      y: 1.50
    }, 750, Phaser.Easing.Linear.None, true, 1, 0, false);

    this.nextWaveAnimation.yoyo(true, 0);
  }

  refresh() {
    game.world.bringToTop(this);
    this.playerHP.text = PJ.hp + "HP";
    this.playerHP.scale.setTo(PJ.hp / PJ.maxHp, 1);
    this.playerScore.text = (GAME.score + PJ.score) + " score";
    this.playerGrenades.text = PJ.nGrenades + " grenades";
    this.playerMoney.text = "$" + PJ.money;
    this.currentWave.text = "Wave " + GAME.gameManager.currentLevel.currentWave + " out of " + GAME.gameManager.currentLevel.nWaves;
    this.currentLevel.text = "Level " + (GAME.gameManager.currentIndex + 1) + " out of " + GAME.gameManager.stages.length;
    this.playerWeapon.text = "Weapon: " + PJ.currentWeapon;
    this.playerWeaponCooldown.text = "Weapon cooldown: " + (PJ.currentWeapon.fireTimer ? (PJ.currentWeapon.fireTimer.duration / 1000.0).toFixed(2) : "0.00");
    this.playerReloadCooldown.text = "nBullets: " + PJ.currentWeapon.nBullets + " reload: " + (PJ.currentWeapon.reloadTimer ? (PJ.currentWeapon.reloadTimer.duration / 1000.0).toFixed(2) : "0.00");
    this.goalText.text = GAME.gameManager ? GAME.gameManager.currentLevel.diffToComplete() : "";
  }
}

class Button extends Phaser.Sprite {
  constructor(game, gui, x, y, w, h, key, text) {
    var style = {
      font: "18px Arial",
      fill: "#11262a",
      wordWrap: false,
      wordWrapWidth: 0,
      align: "center",
      backgroundColor: "#344443"
    };
    super(game, x, y, key);
    this.width = w;
    this.height = h;
    this.text = game.add.text(x + w / 2, y - 30, text, style);
    this.text.anchor.set(0.5);
    gui.controls.addChild(this.text);
    gui.controls.addChild(this);
  }

  use() {
    this.alpha = 0;
    game.add.tween(this).to({
      alpha: 1
    }, 3000, Phaser.Easing.Linear.None, true, 1, 0, false);
  }
}
