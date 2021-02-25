let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let game = new Phaser.Game(config);

//1) Allows you to preload files (95% of the time they are images) 
function preload() {
    this.load.image('octopus', 'assets/img/octopusRight.png');
}


//2) Initialize the game
function create() {
    this.add.image(100, 100, 'octopus');

}


//3) Create all the logic of the game
//(Example, when you press the right arrow, the character goes to the right)
function update() {

}