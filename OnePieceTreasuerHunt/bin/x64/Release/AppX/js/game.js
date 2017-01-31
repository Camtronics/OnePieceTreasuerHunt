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
backgroundMusic.volume = 0.33;
//backgroundMusic.play();

//var psJump = new Audio("audio/psJump.mp3");
// psJump.play();
//var xboxJump = new Audio("audio/phase.wav");
// xboxJump.play();

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

//-------------------------------> TIMER VARIABLES <-----------------------------//
var CannonTimer = setInterval("ShootCannon();", 2000);

function ShootCannon()
{
        cannonBallIndex++;
        cb = new CannonBall(cannonBallIndex);
        if (cannonBallIndex % 2 == 0)
        {
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

var GametTimer = setInterval("CountTime();", 1000);

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
boxes.push({ x: 403, y: 134, width: 300, height: 5 });
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


//--------------------------> UPDATE FUNCTION GAME LOOP <---------------------------//
function update() {
    //Scoring
    if (counterTime == 0)
    {

    }
    else
    {
        if (hasOnePiece)
        {
            score++;
            $('#luffyScore').html(score);
        }
        
        //--------------------------> XBOX PLAYER KEYCODE PRESS <---------------------------//



        if (keys[38] || keys[37] || keys[39]) {
            if (keys[38]) {
                if (!luffy.jumping && luffy.grounded) {
                    //luffyJump.play();
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
        //if (keys[191]) {
        //    if (luffy.ridingAst) {
        //        var theX = 0;
        //        var theY = 0;
        //        for (var i = 0; i < smallAst.length; i++) {
        //            if (smallAst[i].id == luffyAstID) {
        //                if (smallAst[i].isFlagged == false) {
        //                    xFlagIndex++;
        //                    theX = smallAst[i].x;
        //                    theY = smallAst[i].y;
        //                    smallAst[i].isFlagged = true;
        //                    smallAst[i].flaggedBy = "luffy";
        //                    smallAst[i].flagID = xFlagIndex;
        //                    xf = new Flag(xFlagIndex, theX + 13, theY - 15);
        //                    xf.SetPoints(theX);
        //                    xFlags.push(xf);
        //                }
        //                else if (smallAst[i].flaggedBy == "ps") {
        //                    var flagID = smallAst[i].flagID;
        //                    for (var k = 0; k < pFlags.length; k++) {
        //                        if (flagID == pFlags[k].id) {
        //                            pFlags.splice(k, 1);

        //                        }
        //                    }
        //                    xFlagIndex++;
        //                    luffyScore += 2;
        //                    $('#luffyScore').html(luffyScore);
        //                    theX = smallAst[i].x;
        //                    theY = smallAst[i].y;
        //                    smallAst[i].isFlagged = true;
        //                    smallAst[i].flaggedBy = "luffy";
        //                    smallAst[i].flagID = xFlagIndex;
        //                    xf = new Flag(xFlagIndex, theX + 13, theY - 15);
        //                    xf.SetPoints(theX);
        //                    xFlags.push(xf);
        //                }
        //                else {

        //                }
        //            }
        //        }
        //    }
        //}

        //-------------------------> PS PLAYER KEYCODE PRESS <----------------------------//
        //if (keys[87]) {
        //    if (!ps.jumping && ps.grounded) {
        //        psJump.play();
        //        ps.jumping = true;
        //        ps.ridingAst = false;
        //        ps.grounded = false;
        //        ps.velY = -ps.speed * 2;
        //    }
        //}

        //if (keys[68]) {
        //    if (ps.velX < ps.speed) {
        //        ps.velX++;
        //    }
        //}

        //if (keys[65]) {
        //    if (ps.velX > -ps.speed) {
        //        ps.velX--;
        //    }
        //}
        //if (keys[69]) {
        //    if (ps.ridingAst) {
        //        var theX = 0;
        //        var theY = 0;
        //        for (var i = 0; i < smallAst.length; i++) {
        //            if (smallAst[i].id == psAstID) {
        //                if (smallAst[i].isFlagged == false) {
        //                    pFlagIndex++;
        //                    theX = smallAst[i].x;
        //                    theY = smallAst[i].y;
        //                    smallAst[i].isFlagged = true;
        //                    smallAst[i].flaggedBy = "ps";
        //                    smallAst[i].flagID = pFlagIndex;
        //                    pf = new Flag(pFlagIndex, theX + 13, theY - 15);
        //                    pf.SetPoints(theX);
        //                    pFlags.push(pf);
        //                }
        //                else if (smallAst[i].flaggedBy == "xbox") {
        //                    var flagID = smallAst[i].flagID;
        //                    for (var k = 0; k < xFlags.length; k++) {
        //                        if (flagID == xFlags[k].id) {
        //                            xFlags.splice(k, 1);
        //                        }
        //                    }
        //                    pFlagIndex++;
        //                    psScore += 2;
        //                    $('#psScore').html(psScore);
        //                    theX = smallAst[i].x;
        //                    theY = smallAst[i].y;
        //                    smallAst[i].isFlagged = true;
        //                    smallAst[i].flaggedBy = "ps";
        //                    smallAst[i].flagID = pFlagIndex;
        //                    pf = new Flag(pFlagIndex, theX + 13, theY - 15);
        //                    pf.SetPoints(theX);
        //                    pFlags.push(pf);
        //                }
        //                else {

        //                }
        //            }
        //        }
        //    }
        //}
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
        //psDude.src = "images/psDude.png";
        onePiece.src = "images/xFlag.Png";
        //pFlagImage.src = "images/pFlag.Png";

        luffy.grounded = false;
        //ps.grounded = false;

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
            }
        }

        //---------------------------> PLAYER VELOCITY <----------------------//
        luffy.x += luffy.velX;
        luffy.y += luffy.velY;


        //-------------------------> Enemy PATH CONTROLS <--------------------------//


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

        ////cloud one
        //    if (cloud1direction == "right")
        //    {
        //        cloud1x += 5;
        //        if(cloud1x >=1155)
        //        {
        //            cloud1direction = "left";
        //        }
        //    }
        //    else
        //    {
        //        cloud1x -= 5;
        //        if (cloud1x <= -1400)
        //        {
        //            cloud1direction = "right";
        //        }
        //    }

        ////cloud two
        //    if (cloud2direction == "right")
        //    {
        //        cloud2x += 7;
        //        if (cloud2x >= 1155) {
        //            cloud2direction = "left";
        //        }
        //    }
        //    else
        //    {
        //        cloud2x -= 7;
        //        if (cloud2x <= -1400) {
        //            cloud2direction = "right";
        //        }
        //    }

        //cloud three
        if (cloud3direction == "right") {
            cloud3x += 2;
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
        else {
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
    }

    
   
    requestAnimationFrame(update);

    
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
});