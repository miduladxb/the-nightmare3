var bg,girl,berry,apple,gh1,gh2,gh3,key,bush1,bush2;
var girlImg,berryImg,appleImg,gh1Img,gh2Img,gh3Img,keyImg;
var bush1Img,bush2Img,bgImg,bushes,apples,berries,ghosts,startimg,startpg;
var gameState = 1 ;
var button1,button2,lifeImage,keys;
var life = 200;
var appleCount = 0;

function preload(){
 bgImg = loadImage("assets/garden.png");
 girlImg = loadImage("assets/a girl.png");
 berryImg = loadImage("assets/berry.png");
 appleImg = loadImage("assets/food1.png");
 gh1Img = loadImage("assets/ghost1.png");
 gh2Img = loadImage("assets/ghost2.png");
 gh3Img = loadImage("assets/ghost3.png");
 keyImg = loadImage("assets/Dream key.png");
 bush1Img = loadImage("assets/bush 1.png");
 bush2Img = loadImage("assets/bush 2.png");
 startimg = loadImage("assets/startingPage.png");
 lifeImage = loadImage("assets/life.png");
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  
  bg = createSprite(width/2,height/2,10,10);
  bg.addImage(bgImg);
  bg.scale = 2.9;
  bg.velocityY = 3;

  girl = createSprite(width/2,height-30,10,10);
  girl.addImage(girlImg);
  girl.scale = 0.45;
  
  girl.setCollider("rectangle",0,0,100,300);
  

 bushes = createGroup();
 apples = createGroup();
 ghosts = createGroup();
 berries = createGroup();
 keys = createGroup();
  
 button1 = createButton("START");
 button1.position(width/2-100,500);
 button1.size(150,50);

 
 

}

function draw() {
  background("black");
 
  if (gameState == 1) {
    introPg();
   
  
  
  }

  if (gameState == 2) {
    button1.hide()
    if (bg.y>900) {
      bg.y = height/2 ;
    }
    spawnGhosts();
    spawnBushes();
    spawnFood();
    showLife();

  
    if (keyDown("a")||keyDown("left")) {
      girl.x = girl.x-3;
    }
    if (keyDown("d")||keyDown("right")) {
      girl.x = girl.x+3;
    }
  
    girl.overlap(berries,(girl,berry)=>{
      life=life-25;
      berry.remove();
    })

    girl.overlap(apples,(girl,apple)=>{
      life=life+25;
      appleCount = appleCount+1;
      apple.remove();
    })

    girl.overlap(keys,(girl,key)=>{
      gameWin();
    })

    girl.overlap(ghosts,(girl,ghost)=>{
     gameState = 3;
      gameOver(); 
    })
    
    if (appleCount  >1) {
      spawnKey();
    }

    if (life <= 0) {
      gameOver();
    }
    
    
    drawSprites();
    
    
    showLife();
   
    
  }
  
  
}



function spawnBushes() {
  if (frameCount % 80 === 0) {
   bush1 = createSprite(random(150,width-150),0);

   var ran = Math.round(random(1,3));
    if (ran==1) {
      bush1.addImage(bush1Img);
      bush1.scale = 0.45;
    } else {
      bush1.addImage(bush2Img);
      bush1.scale = 0.45; 
    }
    bush1.velocityY = 3;
    bush1.lifetime = 1000;
    girl.depth = bush1.depth +1

    bushes.add(bush1);

  }
}

function spawnFood() {
  if (frameCount % 80 === 0) {
   
   var ran = Math.round(random(1,3));
    if (ran==1) {
      apple = createSprite(random(150,width-100),0);
      apples.add(apple);
      apple.addImage(appleImg);
      apple.scale = 0.1;
      apple.velocityY = 3;
    apple.lifetime = 1000;
    } else {
      berry = createSprite(random(150,width-100),0);
     berries.add(berry);
      berry.addImage(berryImg);
      berry.scale = 0.1;
      berry.velocityY = 3;
      berry.lifetime = 1000; 
    }
    
    

  }
}

function spawnKey() {
  if (frameCount % 1000 === 0){
  key = createSprite(random(150,width - 100),random(0,height - 150));
  key.addImage(keyImg);
  key.scale = 0.25
  key.velocityY = 3;
  keys.add(key);
  }
}


function spawnGhosts() {
    if (frameCount % 150 === 0) {
   
   var ran = Math.round(random(1,3));
    if (ran==1) {
       gh1 = createSprite(150,random(0,height - 150));
        gh1.addImage(gh1Img);
        gh1.scale = 0.45;
        gh1.velocityX = 3;
        gh1.velocityY = 3;
        
    } else {
        gh1 = createSprite(width-150,random(0,height - 150));
        gh1.addImage(gh2Img);
        gh1.scale = 0.2;
        gh1.velocityX = -3;
        gh1.velocityY = 3;
        gh1.setCollider("rectangle",0,0,80,150)
        
    }
    
    gh1.lifetime = 1000;
    

    ghosts.add(gh1);

  }
}

function introPg() {
  background(startimg);

  textSize(30);
  fill("white");
  text("THE NIGHTMARE",width/2 - 100,50);

  textSize(20);
  text("Welcome to my GAME.",width/2-100,150);

  textSize(40);
  text("THE RULES",width/2-125,250);

  textSize(20);
  text("*USE ARROWS OR WASD TO MOVE",width/2-100,290);
  text("*BEAWARE OF THE GHOSTS",width/2-100,330);
  text("*COLLECT APPLES AND LEAVE BERRIES",width/2-100,370);
  text("*COLLECT THE DREAM KEY TO ESCAPE",width/2-100,410);

  

  button1.mousePressed(()=>{
 
  
    gameState=2;
    
  })
 
  
}






 function showLife() {
  
  image(lifeImage, 100,100 , 20, 20);
  fill("white");
  rect(150,100, 200, 20);
  fill("#f50057");
  rect(150,100, life, 20);
  noStroke();
  
}
function gameWin() {
  swal({
    title: `U HAVE WON THE GAME`,
    text: "YOU HAVE ESCAPED THE NIGHTMARE....!!!",
    imageUrl:"assets/Dream key.png",
      
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing"
  });
}

 

 function gameOver() {
  swal({
    title: `Game Over`,
    text: "Oops you lost to the ghost.....!!!",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Thanks For Playing"
  });
}


