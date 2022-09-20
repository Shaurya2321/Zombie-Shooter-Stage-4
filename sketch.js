var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg, zombieGrp;
var bullet, bulletImg;
var score = 0;
var life = 3;
var bullets = 80;
var heart1,heart2,heart3;
var heart1Img,heart2Img,heart3Img;
var bulletGrp;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombieImg = loadImage("assets/zombie.png");
  bulletImg = loadImage("assets/bullet1.png");
  heart1Img = loadImage("assets/heart_1.png");
  heart2Img = loadImage("assets/heart_2.png");
  heart3Img = loadImage("assets/heart_3.png");
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);
  console.log(windowWidth,windowHeight);
  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

   zombieGrp = new Group();
   bulletGrp = new Group();

   heart1=createSprite(displayWidth-100,40,20,20);
   heart1.addImage(heart1Img);
   heart1.scale = 0.27

   heart2=createSprite(displayWidth-150,40,20,20);
   heart2.addImage(heart1Img);
   heart2.scale = 0.27;

   heart3=createSprite(displayWidth-200,40,20,20);
   heart3.addImage(heart1Img);
   heart3.scale = 0.27;

}



function draw() {
  background(0);   


 


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")&&player.y>70||touches.length>0){
  console.log(player.y);
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")&&player.y<530||touches.length>0){
  console.log(player.y);
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
  bullet = createSprite(displayWidth-1100,player.y-20,20,10);
  bulletGrp.add(bullet);
  bullet.addImage(bulletImg);
  bullet.scale = 0.15;
  bullet.velocityX = 8;
  bullets = bullets-1;
}

//destroying zombie when bullet touches it
if (zombieGrp.isTouching(bulletGrp)) {
  for(var i=0; i<zombieGrp.length; i++) {
    if(zombieGrp[i].isTouching(bulletGrp)) {
      zombieGrp[i].destroy();
      bulletGrp.destroyEach();
      score = score+1;

    }
  }
}

//taking out a life when zombie touches hunter
if(zombieGrp.isTouching(player)) {
  for(var i=0; i<zombieGrp.length; i++) {
    if(zombieGrp[i].isTouching(player)) {
      zombieGrp[i].destroy();
      life = life-1;
    }
  }
}
enemy();

if (life === 2) {
  heart1.destroy();
}
else if (life === 1) {
  heart2.destroy();
}
else if (life === 0) {
  heart3.destroy();  
}

if (life === 0) {
  gameOver();
}
if (bullets === 0) {
  gameOver();
}




drawSprites();

//displaying score, life and bullets
textSize(20);
fill("white");
text("Life ="+ life,displayWidth-150,70);
text("Score ="+ score,displayWidth-150,85);
text("Bullets ="+ bullets,displayWidth-150,100);

}

//creating function to spawn zombies
function enemy() {
  if (frameCount % 50 === 0) {
    zombie = createSprite(random(500,1100),random(100,500),45,45);
    zombie.addImage(zombieImg);
    zombie.scale = 0.15;
    zombie.velocityX = -3;
    zombie.debug = true;
    zombie.setCollider("rectangle",0,0,350,350);
    zombie.lifetime=400;
    zombieGrp.add(zombie);

  }
}

function gameOver() {
  zombieGrp.setVelocityXEach(0);
  player.x = displayWidth-1150;
  player.y = displayHeight-300;
  bulletGrp.setVelocityXEach(0);
  bulletGrp.destroyEach();  
  zombieGrp.destroyEach();
  zombieGrp.setLifetimeEach(-1);
  swal({
    title: `Game Over`,
    text: "Very Good Try!!! Next Time You Can Get Better!",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Up_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing"
  },function(confirm){
    if (confirm) {
      location.reload();
    }
  });
}