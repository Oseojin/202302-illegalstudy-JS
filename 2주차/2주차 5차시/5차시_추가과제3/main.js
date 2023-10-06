var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var speed = 5;
const jumpPower = 5;
const frame = 120;

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;


// 캐릭터 오브젝트
var imgDino = new Image();
imgDino.src = 'doyun_bird.png';

var dino =
{
    x : 50,
    y : 200,
    width : 50,
    height: 50,
    draw()
    {
        ctx.drawImage(imgDino, this.x, this.y);
    }
}

// 장애물 클래스
class Cactus
{
    constructor(x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw()
    {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

// 오브젝트 이동
var timer = 0;
var jumpTimer = 0;
var cactusArr = [];
var isJump = false;
var animation;

function movePerFrame()
{
    animation = requestAnimationFrame(movePerFrame);
    timer++;

    ctx.clearRect(0,0, canvas.width, canvas.height);
    
    if(timer % frame === 0)
    {
        var cactus = new Cactus(500, 200, 50, 50);
        cactusArr.push(cactus);
    }

    cactusArr.forEach((cactus, i, o) => 
    {
        if(cactus.x < 0)
        {
            o.splice(i, 1);
        }
        cactus.x -= speed;

        collisionCheck(dino, cactus);

        cactus.draw();
    })

    if(isSpaceDown == true)
    {
        dino.y -= jumpPower;
        jumpTimer++;
        isJump = true;
    }
    if(isSpaceDown == false)
    {
        if(dino.y < 200)
        {
            dino.y += jumpPower;
        }
        else
        {
            isJump = false;
        }
    }
    if(jumpTimer > 30)
    {
        isSpaceDown = false;
        jumpTimer = 0
    }
    dino.draw();
}

// 10초마다 속도 증가
function speedUp()
{
    setTimeout(() => 
    {
        speed++;
        speedUp();
        console.log(speed);
    }, 10000);
}

// 충돌 체크

function collisionCheck(dino, cactus)
{
    if(cactus.x - (dino.x + dino.width) < 0 && cactus.y - (dino.y + dino.height) < 0)
    {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
        alert("GameOver!!");
        gameStart();
    }
}

var isSpaceDown = false;
document.addEventListener('keydown', function(e)
{
    if(e.code === 'Space' && isJump == false)
    {
        isSpaceDown = true;
    }
})

function gameStart()
{
    speed = 5;
    timer = 0;
    jumpTimer = 0;
    cactusArr = [];
    isJump = false;
    animation;
    isSpaceDown = false;

    movePerFrame();
    speedUp();
}

gameStart();