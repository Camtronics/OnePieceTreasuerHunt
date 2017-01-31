//---------------------------> REQUEST ANIMATION FRAME <---------------------------//
(function () {
    var requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

//-------------------------------> CREATE CANVASES <------------------------------//
var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var width = 1150;
var height = 800;

var backgroundCanvas = document.getElementById("backgroundCanvas");
var bkg = backgroundCanvas.getContext("2d");

var cloudCanvas = document.getElementById("cloudCanvas");
var cld = cloudCanvas.getContext("2d");

canvas.width = width;
canvas.height = height;

//-----------------------------> CREATE AUDIO FILES <-----------------------------//
var backgroundMusic = new Audio("audio/TestSound2.mp3");
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;
backgroundMusic.play();

var luffyKing = new Audio("audio/LuffyKing.mp3");

var luffyJump = new Audio("audio/Jump.mp3");
luffyJump.volume = 0.5;


var cannonSS = new Audio("audio/CannonShot.mp3");

//---------------------------> GAME ELEMENT VARIABLES <---------------------------//
var boxes = [];
var keys = [];
var friction = 0.80;
var gravity = 0.15;

//-------------------------> PARTICLE ELEMENT VARIABLES <--------------------------//
var maxV = 9;
var minV = -9;
var botPlats = [];
var cannonBalls = [];

var luffyScore = 0;
var cannonBallIndex = 0;
var cannonStage = 1;
//Animation Vars
var playerDirection = 0;
var frameWidth = 400 / 8;
var frameHeight = 164 / 4;
var curAnimCount = 0;
var curFrame = 0;
var firingOne = false;
var firingTwo = false;
hasOnePiece = false;
var score = 0;
var counterTime = 180;


var cloud1direction = "right";
var cloud1x = -1260;
var cloud1y = 100;

var cloud2direction = "left";
var cloud2x = 1050;
var cloud2y = -100;

var cloud3direction = "right";
var cloud3x = -1400;
var cloud3y = 600;

var highscore = 5500;


//-------------------------------> TIMER VARIABLES <-----------------------------//
var CannonTimer;
CannonTimer = setInterval("ShootCannon();", 2000);

function ShootCannon()
{
    if (cannonStage == 1 || cannonStage == 2)
    {
        cannonSS.play();
        cannonBallIndex++;
        cb = new CannonBall(cannonBallIndex);
        if (cannonBallIndex % 2 == 0) {
            cb.x = enem1.x;
            cb.y = enem1.y;
            firingOne = true;
            setTimeout(function () { firingOne = false; }, 500);
        }
        else
        {
            cb.x = enem2.x;
            cb.y = enem2.y;
            firingTwo = true;
            setTimeout(function () { firingTwo = false; }, 500);
        }
        cannonBalls.push(cb);
    }
}

function ShootCannon2()
{
    if (cannonStage == 3)
    {
        cannonSS.play();
        cannonBallIndex++;
        cb = new CannonBall(cannonBallIndex);
        if (cannonBallIndex % 2 == 0)
        {
            cb.x = enem1.x;
            cb.y = enem1.y;
            firingOne = true;
            setTimeout(function () { firingOne = false; }, 500);
        }
        else {
            cb.x = enem2.x;
            cb.y = enem2.y;
            firingTwo = true;
            setTimeout(function () { firingTwo = false; }, 500);
        }
        cannonBalls.push(cb);
    }
}

function ShootCannon3()
{
    if (cannonStage == 4)
    {
        cannonSS.play();
        cannonBallIndex++;
        cb = new CannonBall(cannonBallIndex);
        if (cannonBallIndex % 2 == 0) {
            cb.x = enem1.x;
            cb.y = enem1.y;
            firingOne = true;
            setTimeout(function () { firingOne = false; }, 500);
        }
        else {
            cb.x = enem2.x;
            cb.y = enem2.y;
            firingTwo = true;
            setTimeout(function () { firingTwo = false; }, 500);
        }
        cannonBalls.push(cb);
    }
}



var GameTimer = setInterval("CountTime();", 1000);

function CountTime()
{
    counterTime--;
    $('#remainingTime').html(counterTime)
}





//--------------------------> CREATE PLAYERS & ENEMIES <--------------------------//
luffy = new Player();
luffy.id = "luffy";
luffy.y = height/2;
luffy.x = width/2;

OnePiece = new OnePiece();

enem1 = new Enemy();
enem2 = new Enemy();
enem2.x = width - 50;
enem2.direction = "down";
enem2.y = 30;

//---------------------------> CREATE CANVAS BORDERS and Add Boxes for Sails <----------------------------//
//Edges 0-2
boxes.push({ x: 0, y: 0, width: 13, height: height });
boxes.push({ x: width - 10, y: 0, width: 13, height: height });
boxes.push({ x: 0, y: 0, width: width, height: 13 });

//Platforms 3-19
boxes.push({ x: 453, y: 134, width: 200, height: 5 });
boxes.push({ x: 401, y: 241, width: 300, height: 5 });
boxes.push({ x: 156, y: 292, width: 187, height: 5 });
boxes.push({ x: 770, y: 285, width: 167, height: 5 });
boxes.push({ x: 20, y: 369, width: 123, height: 5 });
boxes.push({ x: 400, y: 355, width: 257, height: 5 });
boxes.push({ x: 1007, y: 369, width: 123, height: 5 });
boxes.push({ x: 154, y: 442, width: 194, height: 5 });
boxes.push({ x: 487, y: 481, width: 106, height: 5 });
boxes.push({ x: 787, y: 433, width: 195, height: 5 });
boxes.push({ x: 119, y: 546, width: 144, height: 5 });
boxes.push({ x: 770, y: 546, width: 144, height: 5 });
boxes.push({ x: 1007, y: 492, width: 75, height: 5 });
boxes.push({ x: 75, y: 492, width: 75, height: 5 });
boxes.push({ x: 462, y: 560, width: 173, height: 5 });
boxes.push({ x: 650, y: 649, width: 123, height: 5 });
boxes.push({ x: 312, y: 649, width: 123, height: 5 });

// -- Start Functions 
function MoveInStart() {
    $('#CoverLogo').animate({ left: 200 }, 1000, 'swing', function () {
        $('#CLine1').animate({ opacity: 1 }, 1000, 'swing');
        $('#playButton').animate({ opacity: 1 }, 1000, 'swing');
    });
}

function PlayGame() {
    alert("non");

    //$('#Cover').css("visibility", "hidden");
    //    update();
}




//--------------------------> UPDATE FUNCTION GAME LOOP <---------------------------//
function update() {
    //Scoring
    if (counterTime == 0)
    {
        window.clearInterval(CannonTimer);
        window.clearInterval(GameTimer);
        if (score > highscore)
        {
            highscore = score;
            $("#CoverBG").attr('src', 'images/Cover-HighScore.png');
            $("#CLine1").html("Your New High Score <br>" + score);
            $("#Cover").css("visibility", "visible");
        }
        else
        {
            $("#CoverBG").attr('src', 'images/Cover-LowScore.png');
            $("#CLine1").html("Your Score is " + score);
            $("#highscore").html("High Score: " + score);
            $("#Cover").css("visibility", "visible");
        }
    }
    else
    {
        if (hasOnePiece)
        {
            score++;
            $('#luffyScore').html(score);
        }
        
        //--------------------------> XBOX PLAYER KEYCODE PRESS <---------------------------//



        if (keys[38] || keys[37] || keys[39])
        {
            if (keys[38]) {
                if (!luffy.jumping && luffy.grounded) {
                    luffyJump.play();
                    luffy.jumping = true;
                    luffy.grounded = false;
                    luffy.velY = -luffy.speed * 2;
                }
            }
            if (keys[37]) {
                if (luffy.velX > -luffy.speed) {
                    curAnimCount += 0.2;
                    if (luffy.jumping) {
                        playerDirection = 1;
                    }
                    else {
                        playerDirection = 3;
                    }
                    luffy.velX--;
                }
            }
            if (keys[39]) {
                if (luffy.velX < luffy.speed) {
                    curAnimCount += 0.2;
                    if (luffy.jumping) {
                        playerDirection = 0;
                    }
                    else {
                        playerDirection = 2;
                    }
                    luffy.velX++;
                }
            }
        }
        else {
            playerDirection: 0;
            curAnimCount = 0;
        }
 

        //-------------------------> PLAYER FRICTION & GRAVITY <-------------------------//
        luffy.velX *= friction;

        if (luffy.velY <= maxV) {
            luffy.velY += gravity;
        }

        //---------------------------> CLEAR CANVAS AND DRAW IMAGES <----------------------//
        ctx.clearRect(0, 0, width, height);
        bkg.clearRect(0, 0, width, height);
        cld.clearRect(0, 0, width, height);

        var enemPat = new Image();
        var enemPat2 = new Image();
        var luffyPat = new Image();
        var onePiece = new Image();


        enemPat.src = "images/cannon.png";
        enemPat2.src = "images/cannon2.png";
        luffyPat.src = "images/LuffySpriteSheet.png";
        onePiece.src = "images/TheOnePiece.png";

        luffy.grounded = false;

        //---------------------------> DIRECTION-BASED COLLISION <----------------------//

        for (var i = 0; i < boxes.length; i++) {
            var dir = colCheck(luffy, boxes[i]);

            if (dir === "l" || dir === "r") {
                luffy.velX = 0;
                luffy.jumping = false;
            }
            else if (dir === "b") {
                luffy.grounded = true;
                luffy.jumping = false;
                luffy.velY *= -1;
            }
            else if (dir === "t") {
                luffy.grounded = false;
                luffy.jumping = true;
                luffy.velY *= +1;
            }

        }

        if (luffy.grounded) {
            luffy.velY = 0;
        }


        //----------------------> OnePiece-Luffy COLLISIONS <-----------------------//    
        if (!hasOnePiece) {
            var hitOnePiece = colCheck(luffy, OnePiece);

            if (hitOnePiece != null) {
                hasOnePiece = true;
                luffyKing.play();
            }
        }

        //---------------------------> PLAYER VELOCITY <----------------------//
        luffy.x += luffy.velX;
        luffy.y += luffy.velY;


        //-------------------------> Enemy PATH CONTROLS <--------------------------//
        if (counterTime == 120)
        {
            if (cannonStage == 1)
            {
                enem1.velX = 6;
                enem2.velX = 6;
                cannonStage = 2;
            }
        }

        if (counterTime == 60)
        {
            if (cannonStage == 2)
            {
                CannonTimer = setInterval("ShootCannon2();", 800);
                enem1.velX = 8;
                enem2.velX = 8;
                cannonStage = 3;
            }
        }

        if (counterTime == 30) {
            if (cannonStage == 3)
            {
                CannonTimer = setInterval("ShootCannon3();", 500);
                enem1.velX = 10;
                enem2.velX = 10;
                cannonStage = 4;
            }
        }

        // move enem's based on direction
        if (enem1.direction == "down") {
            if (!firingOne) {
                enem1.y += enem1.velX;
            }
        }
        else {
            if (!firingOne) {
                enem1.y -= enem1.velX;
            }
        }

        if (enem2.direction == "down") {
            if (!firingTwo) {
                enem2.y += enem2.velX;
            }
        }
        else {
            if (!firingTwo) {
                enem2.y -= enem2.velX;
            }
        }

        if (enem1.y >= height - 100) {
            enem1.direction = "up";
        }
        if (enem1.y <= 50) {
            enem1.direction = "down";
        }

        if (enem2.y >= height - 100) {
            enem2.direction = "up";
        }
        if (enem2.y <= 50) {
            enem2.direction = "down";
        }

        //---------------------------> Catch Luffy if Fall off Boat <----------------------//

        if (luffy.y >= height + 50) {
            // reset player
            luffy.y = height / 2;
            luffy.x = width / 2;
            luffy.velX = 0;
            luffy.velY = 0;
        }

        //---------------------------> DRAW Images & SPRITES <----------------------//


        var cannonBallImage = new Image();
        cannonBallImage.src = "images/cannonBall.png";
        var cannonSmoke = new Image();
        cannonSmoke.src = "images/smokeCloud.png";
        var onePiece = new Image();
        onePiece.src = "images/TheOnePiece.png";
        var cloudOne = new Image();
        cloudOne.src = "images/cloudMashUp1.png";
        var cloudTwo = new Image();
        cloudTwo.src = "images/cloudMashUp2.png";
        var cloudThree = new Image();
        cloudThree.src = "images/cloudMashUp3.png";

        cld.fill();

        //cloud one
        if (cloud1direction == "right")
        {
            cloud1x += 2;
            if(cloud1x >=1155)
            {
                cloud1direction = "left";
            }
        }
        else
        {
            cloud1x -= 2;
            if (cloud1x <= -1400)
            {
                cloud1direction = "right";
            }
        }

        //cloud two
        if (cloud2direction == "right")
        {
            cloud2x += 3;
            if (cloud2x >= 1155) {
                cloud2direction = "left";
            }
        }
        else
        {
            cloud2x -= 3;
            if (cloud2x <= -1400) {
                cloud2direction = "right";
            }
        }

        //cloud three
        if (cloud3direction == "right") {
            cloud3x += 1;
            if (cloud3x >= 1155) {
                cloud3direction = "left";
            }
        }
        else {
            cloud3x -= 2;
            if (cloud3x <= -1400) {
                cloud3direction = "right";
            }
        }


        cld.drawImage(cloudOne, cloud1x, cloud1y);
        cld.drawImage(cloudTwo, cloud2x, cloud2y);
        cld.drawImage(cloudThree, cloud3x, cloud3y);

        ctx.fill();

        if (!hasOnePiece) {
            ctx.drawImage(onePiece, OnePiece.x, OnePiece.y);
        }
        else
        {
            ctx.drawImage(onePiece, luffy.x + 10, luffy.y);
        }

        ctx.beginPath();
        for (var i = 0; i < cannonBalls.length; i++) {
            ctx.drawImage(cannonBallImage, cannonBalls[i].x, cannonBalls[i].y);
        }
        if (firingOne) {
            ctx.drawImage(cannonSmoke, enem1.x + 15, enem1.y - 60);
        }
        if (firingTwo) {
            ctx.drawImage(cannonSmoke, enem2.x - 125, enem2.y - 60);
        }
        curFrame = Math.floor(curAnimCount) % 3;
        if (curFrame >= 3) {
            curFrame = 0;
        }
        ctx.drawImage(luffyPat, curFrame * frameWidth, playerDirection * frameHeight, frameWidth, frameHeight, luffy.x, luffy.y, frameWidth, frameHeight);
        ctx.drawImage(enemPat, enem1.x, enem1.y);
        ctx.drawImage(enemPat2, enem2.x, enem2.y);


        //---------------------------> FILL CANVAS BORDERS <-------------------------//

        ctx.fillStyle = '#000';
        ctx.fillRect(boxes[0].x, boxes[0].y, boxes[0].width, boxes[0].height);
        ctx.fillRect(boxes[1].x, boxes[1].y, boxes[1].width, boxes[1].height);
        ctx.fillRect(boxes[2].x, boxes[2].y, boxes[2].width, boxes[2].height);
        ctx.fillStyle = "rgba(94, 69, 0, 0.8)";
        for (var i = 3; i < boxes.length; i++) {
            ctx.fillRect(boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
        }


        //-----------------> Cannon Generation  <---------------//

        for (var j = 0; j < cannonBalls.length; j++) {
            if (cannonBalls[j].id % 2 == 0) {
                cannonBalls[j].x += 10;
                if (cannonBalls[j].x <= 475) {
                    cannonBalls[j].y -= 2;
                }
                else if (cannonBalls[j].x <= 575) {

                }
                else if (cannonBalls[j].x <= 1150) {
                    cannonBalls[j].y += 2;
                }
                else {
                    cannonBalls.splice(j, 1);
                }
            }
            else {
                cannonBalls[j].x -= 10;
                if (cannonBalls[j].x <= 1150) {
                    cannonBalls[j].y -= 1;
                }
                else if (cannonBalls[j].x <= 575) {
                    cannonBalls[j].y += 1;
                }
                else {
                    cannonBalls.splice(j, 1);
                }
            }
        }

        //-----------------> Coin Generation  <---------------//
        if (hasOnePiece) {
            for (var i = 0; i < cannonBalls.length; i++) {
                var cannonVsLuffy = colCheck(luffy, cannonBalls[i])

                if (cannonVsLuffy != null) {
                    hasOnePiece = false;
                }
            }
        }
        requestAnimationFrame(update);
    }

 
    
   
    
  
}//end update

//----------------------> COLLISION CHECK ALGORITHM  <------------------------//
function colCheck(shapeA, shapeB) {
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2));
    var vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2));
    var hWidths = (shapeA.width / 2) + (shapeB.width / 2);
    var hHeights = (shapeA.height / 2) + (shapeB.height / 2);
    var colDir = null;

    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
        var oX = hWidths - Math.abs(vX);
        var oY = hHeights - Math.abs(vY);

        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            }
            else {
                colDir = "b";
                shapeA.y -= oY;
            }
        }
        else {
            if (vX > 0) {
                colDir = "l";
                shapeA.x += oX;
            }
            else {
                colDir = "r";
                shapeA.x -= oX;
            }
        }
    }

    return colDir;
}

//--------------------> KEYDOWN EVENT LISTENER  <---------------------//
document.body.addEventListener("keydown", function (e) {
    keys[e.keyCode] = true;
});

//----------------------> KEYUP EVENT LISTENER <---------------------//
document.body.addEventListener("keyup", function (e) {
    keys[e.keyCode] = false;
});

//--------------------> ONLOAD EVENT LISTENER <---------------------//
window.addEventListener("load", function () {
    update();
    //MoveInStart();
});

