let playerState = "run";
const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", function(e){
    playerState = e.target.value;
})

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

//set image size to prevent distortion
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

//bring in image with frames
const playerImage = new Image();
playerImage.src ="images/shadow_dog.png";
//define size of "cutout" from image
const spriteWidth = 575;
const spriteHeight = 523;

let gameFrame = 0;
//slow down animation
const staggerFrames = 5;

const spriteAnimations = [];
//create array of object for different animation states
const animationStates = [
    {
        name: "idle",
        frames: 7,
    },
    {
        name: "jump",
        frames: 7,
    },
    {
        name: "fall",
        frames: 7,
    },
    {
        name: "run",
        frames: 9,
    },
    {
        name: "dizzy",
        frames: 11,
    },
    {
        name: "sit",
        frames: 5,
    },
    {
        name: "roll",
        frames: 7,
    },
    {
        name: "bite",
        frames: 7,
    },
    {
        name: "ko",
        frames: 12,
    },
    {
        name: "getHit",
        frames: 4,
    }
];
//loop through each object, "states", give each an index number
animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    }
    //creates position for each frame as it cycles through the image
    for (let j=0; j< state.frames; j++){
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x: positionX, y: positionY}); //add coordinates to location array
    }
    spriteAnimations[state.name] = frames;
});

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    //game frames must be increased by the number of stagger frames before we get 1. 
    //the result of the modulo cycles between loc.length and 0
    //When the result of the modulo is 0 (e.g.6%6) the postion returns to 0
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;
    ctx.drawImage(playerImage, frameX, frameY,
    spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    

    gameFrame++;
    requestAnimationFrame(animate);

};
animate();

