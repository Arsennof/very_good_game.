var players = [];
var canvas;

var backgroundImage, player1_img, player2_img, map;
var lifeImage;
var database, gameState;
var form, player, playerCount;
var allPlayers, player1, player2;
var blastImg;
var bushImg,stoneImg,treeImg;
var back_Ground;
var obstacles;
var obstaclesPositions;
var leftKeyActive = false
//image for gun
var gun,gunImg;
var gun2;

var x = 0;
var y = 0;

function preload() {
  backgroundImage = loadImage("assets/background.jpg");
  player1_img = loadImage("assets/player.png");
  player2_img = loadImage("assets/player.png");
  lifeImage = loadImage("assets/life.png");
  blastImg = loadImage("assets/blast.png")
  bushImg = loadImage("assets/bush.png")
  stoneImg = loadImage("assets/stone.png")
  treeImg = loadImage("assets/tree.png")
  back_Ground = loadImage("assets/green.jpg")
  
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function draw() {
  background(backgroundImage);
  
  if (playerCount === 2) {
    game.update(1);
  }

  if (gameState === 1) {
    game.play();
  }

  if (gameState === 2) {
    game.showLeaderboard();
    game.end();
  }



 
}

/*function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
var x = 0;
var y = 0;

function setup() {
  createCanvas(600, 600);
  rectMode(CENTER)
}

function draw() {
    
    background(0);
    let posX = width/2;
    let posY = height/2;
  
    if (keyIsDown(87)) {y = y - 1;}
    if (keyIsDown(83)) {y = y + 1;}
    if (keyIsDown(65)) {x = x - 1;}
    if (keyIsDown(68)) {x = x + 1;}
    
    let angle = Math.atan2(mouseY-posY, mouseX-posX);
    translate(posX, posY);
    rotate(angle)
    square(x,y,100)
}*/