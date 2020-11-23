var monkey, monkey_running, monkey_stop;
var stone, stoneImg, stonesGroup;
var banana, bananaImg, bananasGroup;
var invisibleGround;

var backGround, backGroundImg;

var PLAY = 1;
var END = 0;
var gameState = 1;

var score = 0;

function preload(){
  
  monkey_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  monkey_stop = loadAnimation("Monkey_08.png");
  
  bananaImg = loadImage("banana.png");
  stoneImg = loadImage("stone.png");
  
  backGroundImg = loadImage("jungle.jpg");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  backGround = createSprite(250, -300);
  backGround.addImage(backGroundImg);
  backGround.scale = 3;
  backGround.velocityX = -7;
  
  monkey = createSprite(width - width/1.2, height -  height/3);
  monkey.addAnimation("monkey running", monkey_running);
  monkey.addAnimation("monkey stops", monkey_stop);
  monkey.scale = 0.2;
  
  invisibleGround = createSprite(width - width/2, height - height/5, width, 10);
  invisibleGround.visible = false;
  
  stonesGroup = new Group();
  bananasGroup = new Group();
  
  //backGround.debug = true;
}

function draw() {
  //background("white");
  
  if (backGround.x < 0){
    backGround.x = backGround.width/2;
  }
  
  if (gameState === PLAY){
     
  
     
  if (keyDown("space") && monkey.y >= 50){
    monkey.velocityY = -32;
   }  
    monkey.velocityY = monkey.velocityY + 2.6;
      
    console.log(monkey.y); 
    
  if (bananasGroup.isTouching(monkey)){
    bananasGroup.setLifetimeEach(0); 
    score = score + 1;  
    monkey.scale = monkey.scale + 0.02;  
  }
  
  if(stonesGroup.isTouching(monkey)){
    //gameState = END;
    monkey.scale = 0.2;
  }
      
    if (keyDown("o")){
      gameState = END;
    }
  spawnStones();
  spawnBananas();
  
}

  
  
  
  monkey.collide(invisibleGround);

 monkey.debug = false;
//monkey.setCollider("rectangle", 0, 0, monkey.width - 200, monkey.height);
 
  //console.log(monkey.y);
  
  drawSprites();
  
  fill("white");
  stroke("white");
  textSize(20);
  text("Score: " + score, width/1.2, height/11);
  
 if (gameState === END){
   
   bananasGroup.setVelocityXEach(0);
   bananasGroup.setLifetimeEach(-1);
   stonesGroup.setVelocityXEach(0);
   stonesGroup.setLifetimeEach(-1);
   backGround.velocityX = 0;
   monkey.changeAnimation( "monkey stops",monkey_stop);
   
   fill("white");
   stroke("white");
   textSize(30);
   text("Congrats!", width/2.2, height/2.5);
   
   text("Your Score Is " + score, width/2.35, height/2);
 }
  
  if (gameState === PLAY){
  fill("white");
  stroke("white");
  textSize(20);
  text("Press O To End The Game", width/30, height/11);  
  }
}

 function spawnStones(){
  
  if (frameCount % 200 === 0){
    stone = createSprite(width + 20, height/1.3);
    stone.addImage(stoneImg);
    stone.scale = 0.17;
    stone.velocityX = -7;
    stone.lifetime = width/3;
    stonesGroup.add(stone);  
   }
  
}

function spawnBananas(){
  if (frameCount % 150 === 0){
    banana = createSprite(width + 20, height/2.3);
    banana.addImage(bananaImg);
    banana.scale = 0.09;
    banana.velocityX = -7;
    banana.lifetime = width/3;
    bananasGroup.add(banana);  
    
    banana.y = Math.round(random(height - height/1.4, height - height/1.7));
  } 
}