function updateFirstLevel(context) {
  this.context = context;
  try {

    let time0 = performance.now();
    GAME.HUD.refresh();

    //////////////////////
    // Hero controlls
    //////////////////////
    PJ.updateMove();

    if (GAME.controller.shootDown()) {
      GAME.HUD.controls.shotgunIcon.use();
      PJ.shoot(GAME.controller.shootPoint());
    }

    if (PJ.line1) PJ.line1.fromSprite(PJ, getCursorCoords(), false);
    game.debug.geom(PJ.line1);
    PJ.rotateGun();

    let newPickable = getNearestPickableManual(PJ);
    if (newPickable) {
      if (PJ.nearestPickable) PJ.nearestPickable.showHalo(false);
      newPickable.showHalo(true);
    }
    PJ.nearestPickable = newPickable;

    ///////////////
    // Shop
    ///////////////

    if (GAME.shop) GAME.shop.refresh();

    let time1 = performance.now();
    /////////////////
    // Collisions
    /////////////////

    updateCollisions(this.context);

    let time2 = performance.now();
    ///////////////////
    // Bot movement
    ///////////////////

    // updateBots(this.context);


    // throw(PJ);
    if (!PJ.alive || !GAME.base.granny.alive) {
      GAME.score += PJ.score;
      GAME.gameManager.currentLevel.saveData();
      game.state.start("GameOver");
    }

    let time3 = performance.now();
    ///////////////
    // Debug
    ///////////////

    if (GAME.debug) {
      game.debug.text('FPS: ' + game.time.fps + '/' + game.time.desiredFps || 'FPS: --', 40, game.camera.height - 110, "#00ff00");
      game.debug.text('Sugested FPS: ' + game.time.suggestedFps || 'FPS: --', 40, game.camera.height - 90, "#00ff00");
      game.debug.text('Last AI think time: ' + (MONITOR.thinkTimesAI[MONITOR.thinkTimesAI.length - 1] * game.time.fps / 10).toFixed(2) + "%", 40, game.camera.height - 70, "#00ff00");
      game.debug.text('Last collision detection time: ' + ((time2 - time1) * game.time.fps / 10).toFixed(2) + "%", 40, game.camera.height - 50, "#00ff00");
      game.debug.text('Last hero controls time: ' + ((time1 - time0) * game.time.fps / 10).toFixed(2) + "%", 40, game.camera.height - 30, "#00ff00");
      game.debug.text('Update world time (all): ' + ((time3 - time0) * game.time.fps / 10).toFixed(2) + "%", 40, game.camera.height - 10, "#00ff00");
    }
    // Physics
    if (GAME.debugPhysics) {
      game.debug.body(PJ);
      if (PJ.punch) game.debug.body(PJ.punch);
      GAME.bots.forEach((bot) => {
        game.debug.body(bot);
        if (bot.punch) game.debug.body(bot.punch);
      });
      game.debug.body(GAME.base.granny);
    }

    /////////////
    // Camera
    /////////////

    // game.camera.setBoundsToWorld();
    game.world.bringToTop(PJ);

  } catch (e) {
    throw (e);
    if (!PJ || !PJ.alive) {
      GAME.score += PJ.score;
      GAME.gameManager.currentLevel.saveData();
      game.state.start("GameOver");
    } else {
      throw (e);
    }
  }
}

function updateBots(context) {
  if (!context) return;
  this.context = context;

  if (this.context.camps) this.context.camps.map((camp) => {
    camp.update();
  });
  // GAME.turret.shoot();
  if (GAME.turrets) GAME.turrets.forEach((turret) => {
    if (turret.alive) turret.shoot();
  })

  if (GAME.bots) GAME.bots.forEach((currBot) => {
    if (currBot.alive) currBot.move();
  });

}

function updateCollisions(context) {
  if (!context) return;
  this.context = context;
  game.physics.arcade.collide(GAME.bullets, this.context.layer, (bullet, p2) => {
    bullet.alive = false;
    GAME.bullets.remove(bullet);
    bullet.kill();
  }, null, this);

  game.physics.arcade.collide(GAME.enemyBullets, this.context.layer, (bullet, p2) => {
    bullet.alive = false;
    GAME.enemyBullets.remove(bullet);
    bullet.kill();
  }, null, this);


  PJ.grenades.map((grenade) => {
    game.physics.arcade.collide(grenade, this.context.layer, (p1, p2) => {
      p1.body.velocity.x *= 0.9;
      p1.body.velocity.y *= 0.9;
    });
  })

  GAME.pickables.map((loot) => {
    game.physics.arcade.collide(loot, this.context.layer, (p1, p2) => {
      p1.body.velocity.x *= 0.9;
      p1.body.velocity.y *= 0.9;
    });

    game.physics.arcade.overlap(loot, PJ, loot.onPick);
  })

  GAME.pickablesManual.map((loot) => {
    game.physics.arcade.collide(loot, this.context.layer, (p1, p2) => {
      p1.body.velocity.x *= 0.9;
      p1.body.velocity.y *= 0.9;
    });

    // game.physics.arcade.overlap(loot, PJ, loot.onPick);
  })

  game.physics.arcade.collide(GAME.bots, GAME.base.granny, (granny, bot) => {
    if (!bot.ignoreGranny) { 
      granny.receiveDamage(bot.dmg);
      bot.die(granny);
    }
  });

  game.physics.arcade.collide(GAME.bots, this.context.layer, (p1, p2) => {
    p1.leftWall = p1.body.blocked.left;
    p1.rightWall = p1.body.blocked.right;
    p1.isAttacking = false;
  });

  GAME.bots.forEach((currBot) => {

    game.physics.arcade.collide(currBot, this.context.layer, (p1, p2) => {
      p1.isAttacking = false;
    });

    game.physics.arcade.collide(currBot, PJ);
    PJ.grenades.map((grenade) => {
      game.physics.arcade.collide(currBot, grenade);
    })

    game.physics.arcade.collide(PJ, currBot.punch, () => {
      if (currBot.team == PJ.team) return;
      PJ.receiveDamage(currBot.punch);
      if (currBot.punch) {
        currBot.punch.alive = false;
        currBot.punch.kill();
        currBot.punch = null;
      }
      // delete PJ.punch;
    });

    if (currBot.punch) {
      game.physics.arcade.collide(GAME.bots, currBot.punch, (bot1, bot2) => {
        if (!bot1 || !bot1.alive) return;
        if (bot1.team == bot2.team) return;
        bot1.receiveDamage(bot2.punch);
        if (bot2.punch) {
          bot2.punch.alive = false;
          bot2.punch.kill();
          bot2.punch = null;
        }
      });
    }

    game.physics.arcade.collide(currBot, PJ.punch, () => {
      if (currBot.team != PJ.team) currBot.receiveDamage(PJ.punch);
      if (PJ.punch) {
        PJ.punch.alive = false;
        PJ.punch.kill();
        PJ.punch = null;
      }
    });

    game.physics.arcade.collide(currBot, cactus);

  });

  game.physics.arcade.collide(GAME.bots, GAME.bullets, (bot, bullet) => {
    if (bot.alive) bullet.hitBot(bot);
  });

  game.physics.arcade.collide(PJ, GAME.enemyBullets, (bot, bullet) => {
    if (!bullet || !bot) return;
    if (bot.team != bullet.team) bot.receiveDamage(bullet);
    if (!bot || !bot.alive) GAME.bots.remove(bot);
    bullet.alive = false;
    GAME.enemyBullets.remove(bullet);
    if (bullet) bullet.kill();
  });

  // GAME.bots = GAME.bots.filter((item) => {
  //   return item.alive;
  // })

  for (var item of items) {
    game.physics.arcade.collide(this.context.layer, item);
  }

  game.physics.arcade.collide(PJ, this.context.layer, function(hero, layer) {
    // hero on the ground

    if (hero.isJumping) hero.play("idle");
    hero.isJumping = false;
    hero.backflipCount = 0;

    if (hero.body.blocked.down) {
      hero.isPunching = false;
      if (GAME.controller.boostDown()) {
        PJ.body.maxVelocity.x = 500;
      } else {
        PJ.body.maxVelocity.x = 300;
      }

      if (!PJ.isPunching) {
        if (GAME.controller.leftDown()) {
          PJ.body.velocity.x += -gameOptions.playerSpeed / 10;
        } else if (GAME.controller.rightDown()) {
          PJ.body.velocity.x += gameOptions.playerSpeed / 10;
        } else {
          PJ.body.velocity.x = 0;
          PJ.onWall = false;
        }
      }
    }
    // hero NOT on the ground and touching a wall on the right
    if ((PJ.body.blocked.right || PJ.body.blocked.left) && !PJ.body.blocked.down) {
      PJ.onWall = true;
    }

  }, null, this);

}
