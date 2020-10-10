//create hypnoticball,position,database
var hypnoticBall,database;
var position;

function setup(){
    //give refrence  for changing position
 database=firebase.database();
    createCanvas(500,500);
    hypnoticBall = createSprite(250,250,10,10);
    hypnoticBall.shapeColor = "red";
    var hypnoticBallPosition=database.ref('ball/position');
    //create on listner to capture every movement of the ball
    hypnoticBallPosition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
    //create a function write position
    database.ref('ball/position').set({
        'x':position.x+x,
        'y':position.y+y,
    })
    
}

function readPosition(data)
{
    //create function read position
    position=data.val();
    console.log(position);
    hypnoticBall.x=position.x;
    hypnoticBall.y=position.y;

}

function showError()
{
    //for showing errors
    console.log('ERROR');
}