var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime;
var ground;


function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(500, 300)

  // GROUND
  ground = createSprite(277, 290, 999, 50);
  ground.velocityX = -5;

  invisibleGround = createSprite(200, 277, 400, 10);
  invisibleGround.visible = false;

  //MONKEY
  monkey = createSprite(56, 245, 40, 40);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1
  monkey.setCollider("rectangle", 0, 0, 15, monkey.height);

  // groups
  obstacleGroup = new Group()
  FoodGroup = new Group();

    //score
  score = 0;
  survialTime = 0;

}


function draw() {
  background("lightblue");
  stroke("black");
  fill("black");
  textSize(20);
  text("Score:" + score, 300, 50);
  text("Survial Time:"+  survialTime, 100, 50);

  if (gameState === PLAY) {
    
      survialTime = Math.ceil(frameCount/frameRate());

    //jump when the space key is pressed
    if (keyDown("space") && monkey.y >= 149) {
      monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY + 0.8


    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (monkey.isTouching(FoodGroup)) {
      score = score + 1;
      FoodGroup.destroyEach();
    }

 
       
    monkey.collide(invisibleGround);


    if (obstacleGroup.isTouching(monkey)) {
      gameState = END;
      monkey.destroy();
      ground.x = 0
      obstacleGroup.destroyEach();
      FoodGroup.destroyEach();
    }

    food();
    obstacles();
    drawSprites();

  } else if (gameState === END) {
    var black = createSprite(250, 150, 500, 300)
    fill("black")
    textSize(25)
    text("GAME OVER", 250, 150)
    text("Monkey Is Dead", 250, 170)
    FoodGroup.visible = false;
    obstacleGroup.visible = false;
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach() ;
    
  }


  //Banana
  function food() {
    if (frameCount % 130 === 0) {
      banana = createSprite(400, 350, 40, 10);
      banana.addImage(bananaImage);
      banana.y = Math.round(random(120, 150));
      banana.scale = 0.1;


      banana.velocityX = -3;
      banana.lifetime = 200;

      FoodGroup.add(banana);
    }
  }

  function obstacles() {
    if (frameCount % 300 === 0) {
      obstacle = createSprite(433, 247,30,30);
      obstacle.addImage(obstacleImage);
      obstacle.velocityX = -5;
      obstacle.lifetime = 200;
      obstacle.scale = 0.1 ;
      obstacleGroup.add(obstacle);
      monkey.depth = obstacle.depth + 1

    }
  }
}