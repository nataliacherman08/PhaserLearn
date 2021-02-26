let config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);
let octopus;
let cursors;

//1) Allows you to preload files (95% of the time they are images) 
function preload() {
    this.load.image('octopus', 'assets/img/octopusRight.png');
}


//2) Initialize the game
function create() {
    octopus = this.physics.add.image(100, 100, 'octopus');
    //produces a collision effect with the background
    octopus.body.collideWorldBounds = true;
    //makes it easier to take into account the directional keys in the update function
    cursors = this.input.keyboard.createCursorKeys();
    console.log(cursors); //to check the buttons
}


//3) Create all the logic of the game
//(Example, when you press the right arrow, the character goes to the right)
function update() {

    // Allows to stop the movement of the character
    octopus.setVelocityX(0);
    octopus.setVelocityY(0);

    // If the key is pressed "isDown", then the velocity interacts with gravity
    if (cursors.up.isDown) {
        octopus.setVelocity(0, -300);
    }

    if (cursors.down.isDown) {
        octopus.setVelocity(0, 300);
    }

    if (cursors.right.isDown) {
        octopus.setVelocity(300, 0);
    }

    if (cursors.left.isDown) {
        octopus.setVelocity(-300, 0);
    }
}