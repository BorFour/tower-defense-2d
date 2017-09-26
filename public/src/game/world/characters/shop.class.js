var stylePrice = {
  font: "22px Arial",
  fill: "#090317",
  wordWrap: false,
  wordWrapWidth: this.width * 4,
  align: "center"
};

class Purchasable extends Phaser.Sprite {
  constructor(game, key, arg) {
    super(game, 0, 0, key);
    this.price = arg.price;
    this.onPurchase = arg.onPurchase;
    this.anchor.set(0.5);
    this.width = 50;
    this.height = 50;
    this.priceText = game.add.text(this.x, this.y + 80, "$" + this.price, stylePrice);
    // this.addChild(this.priceText);
  }

  setPrice(price) {
    this.price = price;
    this.priceText = game.add.text(this.x, this.y + 80, "$" + this.price, stylePrice);
  }

  onPurchase() {
    throw ('Method not implemented');
  }

  spawn() {
    game.add.existing(this);
  }

  setPosition(shop) {
    this.x = shop.x;
    this.y = shop.y - 180;
    this.priceText.x = shop.x - 20;
    this.priceText.y = shop.y - 230;
  }

  hide() {
    this.visible = false;
    this.priceText.visible = false;
  }

  show() {
    this.visible = true;
    this.priceText.visible = true;
  }
}

class Shop extends Building {
  constructor(game, x, y, key, items) {
    super(game, x, y, key);
    this.items = items;
    this.selected = 0;
    this.range = 100;
    SOUND.itemPurchased = game.add.audio("item_purchased", 0.35, false);
    this.showSelected();
  }

  hideSelected() {
    this.items[this.selected].hide();
  }

  showSelected() {
    this.items[this.selected].setPosition(this);
    this.items[this.selected].show();
    this.items[this.selected].spawn();
  }

  prevSelected() {
    this.hideSelected();
    this.selected -= 1;
    this.selected = (this.selected + this.items.length) % this.items.length;
    this.showSelected();
  }

  nextSelected() {
    this.hideSelected();
    this.selected += 1;
    this.selected = this.selected % this.items.length;
    this.showSelected();
  }

  purchaseItem() {
    if (PJ.money < this.items[this.selected].price || !this.isInRange(PJ)) return;

    this.items[this.selected].onPurchase();
    PJ.money -= this.items[this.selected].price;
    SOUND.itemPurchased.play();
  }

  refresh() {
    if (this.isInRange(PJ)) {
      this.showSelected()
    } else {
      this.hideSelected();
    }
  }
}
