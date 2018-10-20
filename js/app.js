// Enemies our player must avoid
var Enemy = function (count) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = Resources.get("images/enemy-bug.png");
    this.width = this.sprite.width;
    this.height = this.sprite.height / 4;
    this.x = 0;
    this.y = 83 * count - 25;
    this.spawned = false;
    this.speed = 0;
    this.speedMultiplier = 450;
    this.reset();
};

Enemy.prototype.reset = function (){
    this.x = -100;
    this.spawned = false;
    this.speed = Math.random() * 100 + this.speedMultiplier;
    if(this.speedMultiplier < 650){
        this.speedMultiplier += 10;
    }
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (!this.spawned) {
        setTimeout(() => {
            this.spawned = true;
        }, Math.random() * 15000)
    } else {
        if (this.x > 600){
            this.reset();
        }else {
            this.x += dt * this.speed;
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(this.sprite, this.x, this.y);
};

//This class is for the type of character the player is having
var Character = function(player){
    this.player = player;
    this.characterContainer = document.querySelector(".characters");
    
    const defaultCharacter = 'pink-girl';
    const imgPath = 'images/char-';
    const ext = '.png';

    //Place all the character img in the modal
    this.renderCharacters = function(){
        const df = document.createDocumentFragment();
        [
            'boy',
            'princess-girl',
            'cat-girl',
            'horn-girl',
            'pink-girl'
        ].map((value) => {
            const img = Resources.get(`${imgPath}${value}${ext}`);
            img.setAttribute("class", 'char');
            df.appendChild(img);
        });

        this.characterContainer.appendChild(df);
        this.characterContainer.addEventListener('click', this.selectCharacter.bind(this))
    }

    this.selectCharacter = function (event){
        if(event.target.nodeName === 'IMG'){
            this.player.setCharacter(event.target.getAttribute('src'));
        }
    }

    //Put all the available character inside the modal from the same Resource cache.
    this.renderCharacters();
    //Setting the default character type
    this.player.setCharacter(`${imgPath}${defaultCharacter}${ext}`);
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (){

    this._score = 0;
    this.scoreEl = document.getElementById('score');
    this.setScore = function(score){
        this._score = score;
        this.scoreEl.textContent = `Score: ${score}`;
    };
    this.getScore = function(){
        return this._score;
    }
    this.setScore(0);
    this.reset();
}

Player.prototype.setCharacter = function(imgpath){
    this.sprite = Resources.get(imgpath);
    this.width = this.sprite.width;
    this.height = this.sprite.height / 4;
}

Player.prototype.reset = function(){
    //To put on the 3rd column (3 - 1), i.e. 2nd index
    this.x = 101 * 2;
    //To put on the 6th row (6 - 1), i.e. 5th index,
    // -25 is for half of the height of the image.
    this.y = 83 * 5 - 25;
}

Player.prototype.reduceScore = function(){
    const score = this.getScore();
    if (score > 0) {
      this.setScore(score - 5);
    }
}

Player.prototype.update = function(dt){

}

Player.prototype.render = function(){
    ctx.drawImage(this.sprite, this.x, this.y);
}

Player.prototype.handleInput = function(keyPressed){
    switch (keyPressed) {
      case "left":
            if(this.x > 0)
                this.x -= 101;
      break;
      case "up":
            if(this.y < 0)
                break;
            if (this.y > 0)
                this.y -= 83;
            if (this.y < 0){
                this.setScore(this.getScore() + 10);
            }
      break;
      case "right":
            if (this.x < 404)
                this.x += 101;
      break;
      case "down":
            if (this.y < 390 || this.x > 400 && this.y < 400){
                this.y += 83;
                if(this.y > 400){
                    MODAL.open();
                }
            }
      break;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player;

let allEnemies = [];

function addEvent() {
  document.addEventListener("keyup", function(e) {
    var allowedKeys = {
      37: "left",
      38: "up",
      39: "right",
      40: "down"
    };

    player.handleInput(allowedKeys[e.keyCode]);
  });
}
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

