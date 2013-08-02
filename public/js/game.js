// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 480;
document.body.appendChild(canvas);




// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "/img/saha.png";




// Player 1 image
var playerReady = false;
var playerImage = new Image();
playerImage.onload = function () {
    playerReady = true;
};
playerImage.src = "/img/adam.png";



// Player 2 image
var player2Ready = false;
var player2Image = new Image();
player2Image.onload = function () {
    player2Ready = true;
};
player2Image.src = "/img/adam2.png";



// Ball image
var ballReady = false;
var ballImage = new Image();
ballImage.onload = function () {
    ballReady = true;
};
ballImage.src = "/img/top.png";





// Game objects
var hero = {
    speed: 256 // movement in pixels per second
};
var hero2 = {
    speed: 256 // movement in pixels per second
};
var ball = {};
var p1Caught = 0;
var p2Caught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a ball
var reset = function () {
    hero.x = canvas.width / 2;
    hero2.x = canvas.width / 2;
    hero.y = canvas.height / 2;
    hero2.y = canvas.height / 2;

    // Throw the ball somewhere on the screen randomly
    ball.x = 32 + (Math.random() * (canvas.width - 64));
    ball.y = 32 + (Math.random() * (canvas.height - 64));
};

var isGameOver = false;
// Update game objects
var update = function (modifier) {

    // Player 1 key events.
    if (38 in keysDown) { // Player holding up
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown) { // Player holding down
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown) { // Player holding left
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown) { // Player holding right
        hero.x += hero.speed * modifier;
    }

    // Player 2 key events.
    if (87 in keysDown) { // Player holding up
        hero2.y -= hero.speed * modifier;
    }
    if (83 in keysDown) { // Player holding down
        hero2.y += hero.speed * modifier;
    }
    if (65 in keysDown) { // Player holding left
        hero2.x -= hero.speed * modifier;
    }
    if (68 in keysDown) { // Player holding right
        hero2.x += hero.speed * modifier;
    }

    // Are they touching?
    if (
        hero.x <= (ball.x + 32)
            && ball.x <= (hero.x + 32)
            && hero.y <= (ball.y + 32)
            && ball.y <= (hero.y + 32)
        ) {
        ++p1Caught;
        reset();
    }

    if (
        hero2.x <= (ball.x + 32)
            && ball.x <= (hero2.x + 32)
            && hero2.y <= (ball.y + 32)
            && ball.y <= (hero2.y + 32)
        ) {
        ++p2Caught;
        reset();
    }


    if (p1Caught == 10 && !isGameOver){
        isGameOver = true;
        alert('White Win!');
    }
    else if (p2Caught == 10 && !isGameOver){
        isGameOver = true;
        alert('Black Win!');
    }
};


// Draw everything
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (playerReady) {
        ctx.drawImage(playerImage, hero.x, hero.y);
    }

    if (player2Ready) {
        ctx.drawImage(player2Image, hero2.x, hero2.y);
    }

    if (ballReady) {
        ctx.drawImage(ballImage, ball.x, ball.y);
    }

    // Score 1
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Ball Caught: " + p1Caught, 32, 32);

    // Score 2
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Ball Caught: " + p2Caught, 620, 32);
};

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();

    then = now;
};

// Let's play this game!
reset();
var then = Date.now();
setInterval(main, 1); // Execute as fast as possible