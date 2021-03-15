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
let stars;
let score;
let scoreText;
let bombs;

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
    platforms.create(630, 220, "ground");
    platforms.create(800, 110, "ground");
    platforms.create(300, 110, "ground");

    platforms.create(600, 610, "ground").setScale(6).refreshBody();

    //Player
    yellowRaincoat = this.physics.add.image(110, 100, "yellowRaincoat");
    yellowRaincoat.setCollideWorldBounds(true);
    this.physics.add.collider(yellowRaincoat, platforms);

    yellowRaincoat.setBounce(0.2);

    //Cursors
    cursors = this.input.keyboard.createCursorKeys();

    //Items
    stars = this.physics.add.group({

        key: "star",

        repeat: 12,

        setXY: { x: 12, y: 0, stepX: 70 }

    });
    this.physics.add.collider(stars, platforms);
    this.physics.add.overlap(yellowRaincoat, stars, collectStar, null, this);

    stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    //Score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#fff' });

    //Bombs
    bombs = this.physics.add.group();
    this.physics.add.collider(bombs, platforms);
}


//
function collectStar(yellowRaincoat, star) {

    star.disableBody(true, true);


    if (stars.countActive(true) === 0) {

        stars.children.iterate(child => {

            child.enableBody(true, child.x, 0, true, true);
        });
    }

    score += 10;
    scoreText.setText("Score :" + score);

    if (stars.countActive(true) === 0) {
        var x = (yellowRaincoat.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;
    }
}

//3) Create all the logic of the game
//(Example, when you press the right arrow, the character goes to the right)
function update() {


    // Allows to stop the movement of the character
    /*yellowRaincoat.setVelocityX(0);
    yellowRaincoat.setVelocityY(0);*/

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