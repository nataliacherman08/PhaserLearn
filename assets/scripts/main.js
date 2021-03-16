let config = {
    type: Phaser.AUTO,
    width: 810,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 400, x: 0 }
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
let roses;
let score = 0;
let scoreText;

//1) Allows you to preload files (95% of the time they are images) 
function preload() {
    this.load.image("forest", "assets/img/darkBg.png");
    this.load.image("ground", "assets/img/platform.png");
    this.load.image("rose", "assets/img/rose.png");
    this.load.image("bomb", "assets/img/bomb.png");
    this.load.spritesheet("yellowRaincoat", "assets/img/yellowraincoat.png", { frameWidth: 40, frameHeight: 50 });
}


//2) Initialize the game
function create() {
    this.add.image(405, 320, "forest");

    //Ground
    platforms = this.physics.add.staticGroup();
    platforms.create(50, 250, "ground");
    platforms.create(600, 400, "ground");
    platforms.create(630, 220, "ground");
    platforms.create(800, 110, "ground");
    platforms.create(300, 110, "ground");

    platforms.create(600, 610, "ground").setScale(6).refreshBody();

    //Player
    /*this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("yelllowRaincoat", { start: 0, end: 1 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("yelllowRaincoat", { start: 2, end: 3 }),
        frameRate: 10,
        repeat: -1
    });*/

    yellowRaincoat = this.physics.add.image(110, 100, "yellowRaincoat");
    yellowRaincoat.setCollideWorldBounds(true);
    this.physics.add.collider(yellowRaincoat, platforms);

    yellowRaincoat.setBounce(0.2);

    //Cursors
    cursors = this.input.keyboard.createCursorKeys();

    //Items
    roses = this.physics.add.group({

        key: "rose",

        repeat: 12,

        setXY: { x: 12, y: 0, stepX: 70 }

    });
    this.physics.add.collider(roses, platforms);
    this.physics.add.overlap(yellowRaincoat, roses, collectRoses, null, this);

    roses.children.iterate((child) => {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });


    //score
    scoreText = this.add.text(16, 40, 'score: 0', { fontSize: '25px', fill: '#fff' });
}


//Function to collect roses
function collectRoses(yellowRaincoat, rose) {

    rose.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);

    if (roses.countActive(true) === 0) {

        roses.children.iterate(child => {

            child.enableBody(true, child.x, 0, true, true);
        });
    }

    if (roses.countActive(true) === 0) {
        let x = (yellowRaincoat.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
    }
}

//3) Create all the logic of the game
//(Example, when you press the right arrow, the character goes to the right)
function update() {
    // Allows to stop the movement of the character
    yellowRaincoat.setVelocityX(0);
    //yellowRaincoat.setVelocityY(0);

    // If the key is pressed "isDown", then the velocity interacts with gravity
    if (cursors.up.isDown) {
        yellowRaincoat.setVelocity(0, -300);
    }

    if (cursors.down.isDown) {
        yellowRaincoat.setVelocity(0, 300);
    }

    if (cursors.right.isDown) {
        yellowRaincoat.setVelocity(300, 0);
        //yellowRaincoat.anims.play("right", true);
    }

    if (cursors.left.isDown) {
        yellowRaincoat.setVelocity(-300, 0);
        //yellowRaincoat.anims.play("left", true);
    }
}