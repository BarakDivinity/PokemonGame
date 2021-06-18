
var playbutton,score=0,obstaclesGroup,ashcollided;
var pokemon,pokemontext,pokeballImg,htp,back,backImg;
var uparrowImg,uparrowkey,spacebarImg,spacebarkey;
var ground,groundImg,ash,ashanimation,ashjump,invisbleground;
var spawnpikachus,pikachurunning,spawnobstacles,arbokImg;
var darkraiImg,gengarImg,something,pikachusGroup,ultraballImg,ultraballGroup,pikachustop,pikachulife,lives=3,restart,restartImg,exit,exitImg,jumpSound,collideSound,pikachuSound,returneS,clickSound,spawpidgeot,pidgeotImg;

START=0;
PLAY=2;
END=3;
HTP=1;
var gameState=START;

function preload(){
  pokemontext=loadImage("Images/pokemon.png");
  pokeballImg=loadImage("Images/pokeballimage.png");
  htpImg=loadImage("Images/How To Play.png");
  backImg=loadImage("Images/return.png");
  uparrowImg=loadImage("Images/uparrowkey.png");
  spacebarImg=loadImage("Images/spacebarkey.png")
  groundImg=loadImage("Images/ground.png")
  arbokImg=loadImage("Images/arbok.png");
  gengarImg=loadImage("Images/gengar.png");
  darkraiImg=loadImage("Images/Darkrai.png");
  ultraballImg=loadImage("Images/ultraball.png");
  restartImg=loadImage("Images/restart.png");
  exitImg=loadImage("Images/exit.png");
  pidgeotImg=loadImage("Images/pidgeot.png");
  jumpSound=loadSound("Sounds/Jump-SoundBible.com-1007297584.mp3");
  collideSound=loadSound("Sounds/Realistic_Punch-Mark_DiAngelo-1609462330 (1).mp3");
  pikachuSound=loadSound("Sounds/pikachu.mp3");
  returneS=loadSound("Sounds/Dry Fire Gun-SoundBible.com-2053652037.mp3")
  clickSound=loadSound("Sounds/Click2-Sebastian-759472264.mp3");
  ashanimation=
loadAnimation("Images/ash2.png","Images/ash3.png","Images/ash4.png","Images/ash5.png");
  
  ashjump=loadAnimation("Images/ash2.png")
  pikachurunning=loadAnimation("Images/pikachu1.png","Images/pikachu2.png","Images/pikachu3.png","Images/pikachu4.png")
  pikachustop=loadAnimation("Images/pikachu2.png")
  
  ashcollided=loadAnimation("Images/ash1.png");
  
}

function setup() {
  createCanvas(600,400);
  
  pikachusGroup=new Group();
  ultraballGroup=new Group();
  obstaclesGroup=new Group();
  pidgeotGroup=new Group();
  
  ash=createSprite(50,320,10,10);
  ash.scale=1.7;
  ash.addAnimation("running",ashanimation);
  ash.addAnimation("jumping",ashjump);
  ash.addAnimation("collided",ashcollided);
  ash.setCollider("rectangle",0,0,20,30);
  
  exit=createSprite(300,170,10,10);
  exit.scale=0.15;
  exit.addImage(exitImg);
  exit.visible=false;
  
  restart=createSprite(300,250,10,10);
  restart.visible=false;
  restart.addImage(restartImg);
  restart.scale=0.2;
  
  playbutton=createSprite(300,250,50,20);
  playbutton.addImage(pokeballImg);
  playbutton.scale=0.7;
  //playbutton.debug=true;
  playbutton.setCollider("rectangle",0,0,120,120);
  
  pokemon=createSprite(285,130,20,20);
  pokemon.addImage(pokemontext);
  pokemon.scale=0.9;
  
  htp=createSprite(285,370,50,20);
  //htp.debug=true;
  htp.setCollider("rectangle",25,-30,370,75);
  htp.addImage(htpImg);
  htp.scale=0.5;
  
  back=createSprite(40,50,10,10);
  back.addImage(backImg);
  back.scale=0.3;
  back.setCollider("rectangle",0,0,200,100);
  //back.debug=true;

  uparrowkey=createSprite(140,90,10,10);
  uparrowkey.addImage(uparrowImg);
  uparrowkey.scale=0.15;
 
  
  spacebarkey=createSprite(175,142,10,10);
  spacebarkey.addImage(spacebarImg);
  spacebarkey.scale=0.2;
  
  ground=createSprite(300,390,700,20);
  ground.addImage(groundImg);
  ground.scale=0.7;
  
  invisibleground=createSprite(300,355,700,20);
  
}

function draw() {
  background("green"); 
  
  
  uparrowkey.visible=false;
  spacebarkey.visible=false;
  ground.visible=false;
  invisibleground.visible=false;
  ash.visible=false;
  
  ash.collide(invisibleground);
  
  //console.log(ground.x)
  
 if(gameState===START){
   
    playbutton.visible=true;
    pokemon.visible=true;
    htp.visible=true;
    back.visible=false;
    exit.visible=false;
    restart.visible=false;
  
    if(mousePressedOver(playbutton)) {
       gameState=PLAY;
       clickSound.play();
     }
    
    if(mousePressedOver(htp)){
       gameState=HTP;
      clickSound.play();
     }
   }
  
   //ash.debug=true;
   //console.log(gameState);

  if(gameState===HTP){
    playbutton.visible=false;
    pokemon.visible=false;
    htp.visible=false;
    back.visible=true;
    uparrowkey.visible=true;
    spacebarkey.visible=true;
    
    textSize(20);
    fill("lightblue")
    text("1.         To Jump",100,100);
    text("2.                      To Throw Ultraball",100,150);
    text("3. Throw Ultraballs At The Pikachu Group.",100,200)
    text("4. Avoid All Other Evil Pokemon's, You Have Three",100,250);
    text("Lives.",125,275)
    text("5. The Score Increases By The Number Of Pikachu's",100,310);
    text("You Catch.",125,340);

    if(mousePressedOver(back)){
      gameState=START;
      returneS.play();
    }
  }
  
  if(gameState===PLAY){
    background("skyblue")
    
    textSize(20);
    stroke("black")
    fill("blue")
    text("Score:"+score,500,30);
    text("Lives:"+lives,40,30);
    
    playbutton.visible=false;
    pokemon.visible=false;
    back.visible=false;
    htp.visible=false;
    ground.visible=true;
    ash.visible=true;
    restart.visible=false;
    exit.visible=false;
    ground.velocityX=-(13+2*score/2);
    
    if(ground.x<140) {
      ground.x=450;
    }
    
    if(keyDown(UP_ARROW)&&ash.y>=316) {
      ash.velocityY=-13;
      jumpSound.play();
    }
    
    ash.velocityY=ash.velocityY+0.8
    
    if(ash.y<319.5){
      ash.changeAnimation("jumping",ashjump);
    }
    
    if(ash.y===319.5){
      ash.changeAnimation("running",ashanimation);
    }
    spawnpikachus();
    spawnobstacles();
    //spawnpidgeot();
    
    if(keyDown("Space")) {
      getultraball();
    }
    
    if(ultraballGroup.isTouching(pikachusGroup)) {
      pikachusGroup.destroyEach();
      ultraballGroup.destroyEach();
      score=score+5;
      pikachuSound.play();
    }
    
    if(obstaclesGroup.isTouching(ash)){
       lives=lives-1;
       obstaclesGroup.destroyEach();
       collideSound.play();
      }
     
     if(pidgeotGroup.isTouching(ash)){
       lives=lives-1;
       pidgeotGroup.destroyEach();
       collideSound.play();
      }
    
    if(lives===0){
       gameState=END;
    }
  }  
  
   //console.log(ash.y)
  //console.log(gameState);
  
  if(gameState===END){
    background("skyblue")
    ground.visible=true;
    ash.visible=true;
    restart.visible=true;
    exit.visible=true;
    ground.velocityX=0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    pidgeotGroup.setVelocityXEach(0);
    pidgeotGroup.setLifetimeEach(-1);
    ash.changeAnimation("collided",ashcollided);
    ash.velocityY=0;
    
    if(mousePressedOver(restart)){
      gameState=PLAY;
      obstaclesGroup.destroyEach();
      pikachusGroup.destroyEach();
      pidgeotGroup.destroyEach();
      score=0;
      lives=3;
      clickSound.play();
    }
    
    if(mousePressedOver(exit)){
      gameState=START;
      pidgeotGroup.destroyEach();
      returneS.play();
    }
    
    textSize(20);
    stroke("black")
    fill("blue")
    text("Score:"+score,500,30);
    text("Lives:"+lives,40,30);
  }
  
  drawSprites();
}

function spawnpikachus() {
  if(frameCount%300===0){
    var pikachus=createSprite(600,320,10,10);
    pikachus.addAnimation("moving",pikachurunning);
    pikachus.velocityX=-(8+score/2);
    pikachus.scale=0.2;
    pikachus.lifetime=150;
    
    pikachusGroup.add(pikachus);
  
  }
}

function spawnobstacles() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(600,320,10,40);    
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(arbokImg);
              break;
      case 2: obstacle.addImage(gengarImg);
              break;
      case 3:obstacle.addImage(darkraiImg);
              break;
    }
        
    obstacle.velocityX = -(10+score/2);        
    obstacle.scale = 0.35;
    obstacle.lifetime = 120;
    obstacle.setCollider("rectangle",0,0,150,130);
    //obstacle.debug=true;
    
    if(rand===1){
      obstacle.setCollider("rectangle",-30,0,120,180)
    }
    
    if(rand===3){
       obstacle.scale=0.2;
       obstacle.setCollider("rectangle",0,0,320,330);
    }
    
    obstaclesGroup.add(obstacle);
  }
}


function getultraball() {
  var ultraball=createSprite(50,310,10,10)
  ultraball.velocityX=10;   
  ultraball.scale=0.06;
  ultraball.velocityY=1;
  ultraball.addImage(ultraballImg);
  ultraball.lifetime=40;
  
  ultraballGroup.add(ultraball);

}

/*function spawnpidgeot() {
  if (frameCount % 180 === 0) {
     pidgeot = createSprite(600,100,40,10);
     pidgeot.y = Math.round(random(60,190));
     pidgeot.addImage(pidgeotImg);
     pidgeot.scale = 0.15;
     pidgeot.velocityX = -3;
  
     pidgeot.lifetime = 200;
     
     pidgeot.depth = ash.depth;
     ash.depth = ash.depth + 1;
  
    pidgeotGroup.add(pidgeot);
  }
}*/