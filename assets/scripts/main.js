let config = {
    type: Phaser.AUTO,
    width: 810,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300, x: 0 }
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);
let platforms;
let yellowRaincoat;
let cursors;

//1) Allows you to preload files (95% of the time they are images) 
function preload() {
    this.load.image("forest", "assets/img/darkBg.png");
    this.load.image("ground", "assets/img/platform.png");
    this.load.image("star", "assets/img/star.png");
    this.load.image("bomb", "assets/img/bomb.png");
    this.load.image("yellowRaincoat", "assets/img/yellowraincoat.png");
}


//2) Initialize the game
function create() {
    this.add.image(405, 320, "forest");

    //Ground
    platforms = this.physics.add.staticGroup();
    platforms.create(50, 250, "ground");
    platforms.create(600, 400, "ground");
    platforms.create(750, 220, "ground");

    platforms.create(600, 610, "ground").setScale(6).refreshBody();

    //Player
    yellowRaincoat = this.physics.add.image(110, 100, "yellowRaincoat");
    yellowRaincoat.setCollideWorldBounds(true);
    this.physics.add.collider(yellowRaincoat, platforms);

    yellowRaincoat.setBounce(0.2);

    //Cursors
    cursors = this.input.keyboard.createCursorKeys();
}


//3) Create all the logic of the game
//(Example, when you press the right arrow, the character goes to the right)
function update() {


    // Allows to stop the movement of the character
    /* octopus.setVelocityX(0);
     octopus.setVelocityY(0);*/

    // If the key is pressed "isDown", then the velocity interacts with gravity
    if (cursors.up.isDown) {
        yellowRaincoat.setVelocity(0, -300);
    }

    if (cursors.down.isDown) {
        yellowRaincoat.setVelocity(0, 300);
    }

    if (cursors.right.isDown) {
        yellowRaincoat.setVelocity(300, 0);
    }

    if (cursors.left.isDown) {
        yellowRaincoat.setVelocity(-300, 0);
    }
}