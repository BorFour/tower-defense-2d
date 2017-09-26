class DataLoader {
  constructor() {
    if (typeof(Storage) !== "undefined") {
      // Code for localStorage/sessionStorage.
    } else {
      throw ('Sorry! No Web Storage support..');
    }
  }


  set firstLevel(arg) {
    localStorage.setItem('firstLevel', arg);
  }

  get firstLevel() {
    let fl = localStorage.getItem('firstLevel');
    return fl ? parseInt(fl) : 1;
  }

  set mute(arg) {
    game.sound.mute = arg;
    localStorage.setItem("mute", JSON.stringify(arg));
  }

  get mute() {
    let mute = localStorage.getItem("mute");
    return mute ? JSON.parse(mute) : false;
  }

  set name(arg) {
    localStorage.setItem("name", arg);
  }

  get name() {
    let name = localStorage.getItem("name");
    return name ? name : '';
  }

  set highscore(arg) {
    let score = localStorage.getItem("highscore");
    if (!score || arg > this.highscore) {
      localStorage.setItem("highscore", arg);
    }
  }

  get highscore() {
    let highscore = localStorage.getItem("highscore");
    return highscore ? highscore : '';
  }

}
