function CannonBall(cBallIndex)
{
    this.x = 0,
    this.y = 0,
    this.height = 50,
    this.width = 50,
    this.id = cBallIndex;
}




function Flag(flagIndex, xPos, yPos)
{
    this.x = xPos,
    this.y = yPos,
    this.height = 32,
    this.width = 30,
    this.vx = -1;
    this.vy = 0;
    this.id = flagIndex;
    this.life = 0;
    this.maxLife = 2300;
    this.points = 0;

    this.SetPoints = function (xPos)
    {
        if(xPos >=250 && xPos <=550)
        {
            this.points = 1;
        }
    }
    if (xPos >= 551 && xPos <= 850)
    {
        this.points = 3;
    }
    if (xPos >= 851)
    {
        this.points = 9;
    }

}