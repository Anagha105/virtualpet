var dog,sadDog,happyDog;
var database;
var foodStock, foods;
var button1, button2;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
}

function draw() {
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foods);
    dog.addImage(sadDog)
  }
  drawSprites();
  fill(255, 255, 254);
  stroke("black");
  text ("Food Remaing :" + foods, 170, 200);
  textSize(13);
  
}

getCount(){
  var foodStockRef = database.ref('foodStock');
  foodStockRef.on("value",(data)=>{
    foodStock = data.val();
  })
}

updateCount(count){
  database.ref('/').update({
    foodStock: count
  });
}

update(){ 
  var foodIndex = "players/player" + this.index;
database.ref(foodIndex).set({
  name:this.name,
  distance:this.distance
});
}



//function to add food in stock
