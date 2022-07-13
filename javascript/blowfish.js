class Blowfish {
  constructor(yParam) {
    console.log("entrando en constructor de blowfish ")
    // Background image
    this.blowfishImage = new Image();
    this.blowfishImage.src = "./images/enemy.png";

    this.x = canvas.width; // X-Axix
    this.y = yParam + 100; // Y-Axix
    this.w = 130; // Width
    this.h = 130; // height

    this.speed = 3;
  }

  drawBlowfish = () => {
    ctx.drawImage(this.blowfishImage, this.x, this.y, this.w, this.h);
  };

  blowfishMovement = () => {
    this.x = this.x - this.speed;
  };
}
