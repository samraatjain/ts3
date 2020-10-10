//Create World ,engine,bodies and constraint
const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

//create variables
var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;

//load thye backround image
function preload()
 {
    getBackgroundImg();
}
//create the canvas and give position and width and height to objects
function setup()
{
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

//display the objects
function draw()
{
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

//create mousedragged and released function for making the bird fly and hit the pigs
function mouseDragged()
{
    //if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    //}
}


function mouseReleased()
{
    slingshot.fly();
    gameState = "launched";
}

//for bringing the bird back to the slingshot for more chances
function keyPressed()
{
    if(keyCode === 32)
    {
       slingshot.attach(bird.body);
       //create empty array for not displaying the smoke iage while the bird comes back 
       bird.trajectory =[];
       Matter.Body.setPosition(bird.body, {x: 200 , y: 50});
    }
}

//Create te function to change the background image according to real time
async function getBackgroundImg()
{
    //give the link to where the real time image should be
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    //create JAVA SCRIPT OBJECT NOTATION 
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    //give if for the background image
    if(hour>=0600 && hour<=1900)
    {
        bg = "sprites/bg.jpg";
    }
    else{
        bg = "sprites/bg.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}