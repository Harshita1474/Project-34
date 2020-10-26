//Create variables here
var dog,dogImg;
var happyDogImg;
var foodS;
var foodStock;
var database;

function preload()
{
  //load images here
  dogImg=loadImage("Dog.png");
  happyDogImg=loadImage("/happydog.png");
}

function setup() {
  database= firebase.database();
  createCanvas(500, 500);

    dog = createSprite(250,300,150,150);
    dog.addImage(dogImg);
    dog.scale=0.150;

    foodStock=database.ref('Food');
    foodStock.on("value",readStock,showError)
   
  
  
}


function draw() {  
  background(46,136,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();
  fill("white");
  textSize(20);
  text("Food Left:"+foodS,250,250);

  text("Note: Press up arrow key to feed Vicky milk!!!!!",25,50);
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}

function showError(){
  console.log("error in writing to the database");
}