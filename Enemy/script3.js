/**@type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
//set canvas measurements to override default
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;

const numberOfEnemies = 20;
const enemiesArray = [];


let gameFrame = 0;

//Create class for making several enemies
class Enemy {
    constructor(){
        this.image = new Image();
        this.image.src = "enemies/enemy3.png";
        
        
        this.speed = Math.random() * 4 + 1;
        this.spriteWidth = 218;
        this.spriteHeight = 177;
        this.width = this.spriteWidth / 2.5;
        this.height = this.spriteHeight / 2.5;
        //randomize starting points to prevent stacking
        this.x = Math.random() * (canvas.width - this.width);
        this.y = Math.random() * (canvas.height - this.height);

        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.angle = Math.random() * 2;
        this.angleSpeed = Math.random() * 2 + 0.5;
        //this.curve = Math.random() * 200 + 50;
    }
    update(){
        //horizontal and vertical movement
        this.x = canvas.width/2 * Math.sin(this.angle * Math.PI/360) + (canvas.width/2 - this.width/2);
        this.y = canvas.height/2 * Math.cos(this.angle * Math.PI/180) + (canvas.height/2 - this.height/2);

        this.angle += this.angleSpeed;
        if (this.x + this.width < 0) this.x = canvas.width;
        //animate sprites with ternary operator (if-else statement)
        if (gameFrame % this.flapSpeed === 0){
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw(){
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, 
        this.x, this.y, this.width, this.height);
    }
};

//create new enemies based on class

for (let i=0; i<numberOfEnemies; i++){
    enemiesArray.push(new Enemy());
}


function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    enemiesArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    });
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();