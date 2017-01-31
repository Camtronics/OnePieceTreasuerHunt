function Player()
{
    this.x = 0,
    this.y = 0,
    this.width = 50,
    this.height = 40,
    this.speed = 3,
    this.velX = 0,
    this.velY = 0,
    this.jumping = false,
    this.grounded = false,

    // sample method
    this.ShuffleRight = function ()
    {
        // move player 500px right
        this.x += 500;
        return this.x;
    }
};
function Enemy()
{
    this.x = -50,
    this.y = height - 50,
    this.width = 50,
    this.height = 50,
    this.velX = 4,
    this.velY = 1,
    this.direction = "up";
}