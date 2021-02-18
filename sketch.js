var mario, marioRunning;
var ground;
var cloud, cloudsGroup;
var obstacle, obstaclesGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function setup() {
  createCanvas(800,300);
  ground = createSprite(400,278,1500,40);
  ground.shapeColor= rgb(188,97,16)
  

  mario = createSprite(50,230,20,40);

  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
}

function draw() {
  background(118, 134, 255);  

  if(gameState === PLAY){
    ground.velocityX = -2;
    if(ground.x <50){
      ground.x = 400;
    }
  
    console.log(mario.y);
    if(keyDown("space") && mario.y > 230){
      mario.velocityY = -12;
    }
  
    mario.velocityY = mario.velocityY + 0.5;
    
    if(obstaclesGroup.isTouching(mario)){
      gameState = END;
    }
    spawnObstacles();
    spawnClouds();
  }
  else if(gameState === END){
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
  }
  
  mario.collide(ground);

  

  drawSprites();
}

function spawnClouds(){
  if(frameCount % 150 === 0){
    cloud = createSprite(800, Math.round(random(10,200)),40,20);
    cloud.velocityX = -3;
    cloud.lifetime = 300;
    cloud.depth = mario.depth;
    mario.depth+=1;
    cloudsGroup.add(cloud);
  }
}

function spawnObstacles(){
  if(frameCount%300 ===0){
    obstacle=createSprite(800,230,20,40);
    var rand = Math.round(random(1,5));
    switch(rand){
      case 1: obstacle.velocityX = -2;
              break;
      case 2: obstacle.velocityX = -4;
              break;       
      case 3: obstacle.velocityX = -6;
              break;
      case 4: obstacle.velocityX = -7;
              break;
      case 5: obstacle.velocityX = -3;
              break;
      default: break;
    }
    obstacle.lifetime = 500;
    obstaclesGroup.add(obstacle); 
  }
}