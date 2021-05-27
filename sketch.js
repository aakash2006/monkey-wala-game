var backImage,backgr;
var player, player_running;
var ground,ground_img;
var FoodGroup;

var END =0;
var PLAY =1;
var gameState = PLAY;
var txt;

var score = 0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImg = loadImage("banana.png");
  rockImg = loadImage("stone.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  FoodGroup = new Group();
  RockGroup = new Group();
  
 score = 0
  
}

function draw() { 
  background(0);
  
 if(backgr.x<100){
    backgr.x=backgr.width/2;
  }


  
  if(gameState===PLAY){

    spawnFood();
    spawnObstacles();
    
  
  if(FoodGroup.isTouching(player))
  {
    FoodGroup.destroyEach();
    score = score+2;
    player.scale += + 0.01
  }
  
    if(keyDown("space") && player.y>310 ) {
      player.velocityY = -15;
    }
    player.velocityY = player.velocityY + 0.8;
  }

    player.collide(ground);

    if(RockGroup.isTouching(player))
    {
      gameState = END;
    }
    if(gameState === END)
    {
      backgr.visible = false;
      backgr.velocityX = 0;
      player.visible = false;

      FoodGroup.destroyEach();
      RockGroup.destroyEach();
      textSize(30);
      fill(225);
      text("Game Over",300,220);
    }
  
  
  drawSprites();

  textSize(20);
  fill(225);
  text("score: "+ score,400,20);
 

  }
function spawnFood(){
  if(frameCount % 300=== 0){
    var banana = createSprite(840,100,10,10);
    banana.y = Math.round(random(120,140))
       banana.addImage(bananaImg);
       banana.scale = 0.05
       banana.velocityX = -4;
       banana.lifetime = 435;
       player.depth = banana.depth+1;
       FoodGroup.add(banana);
      }

}
function spawnObstacles(){
  if(frameCount % 350 === 0){
    var rock = createSprite(840,310,10,10);
       rock.addImage(rockImg);
       rock.scale = 0.2
       rock.velocityX = -4;
       rock.lifetime = 435;
       player.depth = rock.depth+1;
       RockGroup.add(rock);
      }

}

 