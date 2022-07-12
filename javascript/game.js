class Game {
  constructor() {
    // Game properties

    // in-game background
    this.bg = new Image();
    this.bg.src = "./images/deep-sea-background.png";

    //player
    this.player = new Player();

    this.blowFishArr = [];
    this.oxigenArr = []
    

    this.score = 0;
    this.oxigen = 100;

    this.framesCounter = 0;

    this.isGameOn = true;
 

  }

  // Game methods and functions

  



  removeBlowfishFromArray = () => {
    //console.log("blowFishArr:",this.blowFishArr.length)
    if (this.blowFishArr[0].x  + this.blowFishArr[0].w < 0) {
        this.blowFishArr.shift()
      }
  }

  spawnBlowfish = () => {
    if (
      this.blowFishArr.length === 0 ||
      this.blowFishArr[this.blowFishArr.length - 1].x < canvas.width * 0.6
    ) {

        let randomPositionY = Math.random() * (canvas.height -300)
        let newBlowfish = new Blowfish(randomPositionY)
        this.blowFishArr.push(newBlowfish)

    }
  };

  deleteBlowfish = () => {

    if (blowfishCollision === true) {
        this.blowFishArr.shift()

    }

  }

  playerBlowfishCollision = () => {

    this.blowFishArr.forEach((eachBlowfish) => {
        // Check if each of the blowfish collision with player
        // EachBlowfish
        // This.player

        if (eachBlowfish.x < this.player.x + this.player.w &&
            eachBlowfish.x + eachBlowfish.w > this.player.x &&
            eachBlowfish.y < this.player.y + (this.player.h / 2) &&
            (eachBlowfish.h / 2) + eachBlowfish.y > this.player.y) {
           
                this.oxigen -= 30;
                oxigenDOM.innerText = this.oxigen
                this.blowFishArr.shift(eachBlowfish)

           //console.log("BLOWFISH COLLISION")
        }

    })

  }

  removeOxigenFromArray = () => {
    //console.log( "oxigenArr:",this.oxigenArr.length)
    if (this.oxigenArr[0].x  + this.oxigenArr[0].w < 0) {
        this.oxigenArr.shift()
      }
  }


  spawnOxigen = () => {
    if (
      this.oxigenArr.length === 0 ||
      this.oxigenArr[this.oxigenArr.length - 1].x < canvas.width * 0.4
    ) {

        let randomPositionY = Math.random() * (canvas.height -300)
        let newOxigen = new Oxigen(randomPositionY)
        this.oxigenArr.push(newOxigen)

    }
  };

  playerOxigenCollision = () => {

    this.oxigenArr.forEach((eachOxigen) => {
        // Check if each of the blowfish collision with player
        // EachOxigen
        // This.player

        if (eachOxigen.x < this.player.x + this.player.w &&
            eachOxigen.x + eachOxigen.w > this.player.x &&
            eachOxigen.y < this.player.y + (this.player.h / 2) &&
            (eachOxigen.h / 2) + eachOxigen.y > this.player.y) {

                this.oxigen += 20;
                oxigenDOM.innerText = this.oxigen
                this.oxigenArr.shift(eachOxigen)
            
           //console.log(" OXIGEN COLLISION")
        }

    })

  }

  updateOxigen = () => {

    if( this.framesCounter % 180 === 0){

        this.oxigen -= 15;

        oxigenDOM.innerText = this.oxigen
    }

  }
  
 

  updateScore = () => {

    if( this.framesCounter % 240 === 0){

        this.score += 50;

        scoreDOM.innerText = this.score
    }

  }


  gameLoop = () => {

    //* Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //* Movement & actions

    this.blowFishArr.forEach((eachBlowfish) => {
        eachBlowfish.blowfishMovement()

    })
    this.oxigenArr.forEach((eachOxigen) => {
        eachOxigen.oxigenMovement()

    })
    this.playerBlowfishCollision();
    this.playerOxigenCollision()

    //* Draw elements
    ctx.drawImage(this.bg, 0, 0, canvas.width, canvas.height);

    // Player
    this.player.drawPlayer();

    // Blowfish
    this.spawnBlowfish();
    this.blowFishArr.forEach((eachBlowfish) => {
        eachBlowfish.drawBlowfish()

    })
    this.updateOxigen()
    this.removeBlowfishFromArray()

   // Oxigen Bottle
    this.spawnOxigen();
    this.oxigenArr.forEach((eachOxigen) => {
        eachOxigen.drawOxigen()

    })
    this.removeOxigenFromArray()

    this.updateScore()

    this.framesCounter ++;

    // Recursion effect
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop);
    }
  };
}
