const colors    = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
const maxColor  = colors.length;
const maxKG     = 10;

const nextBallElement    = document.getElementById('next-weight');
const leftWeightElement  = document.getElementById('left-weight');
const rightWeightElement = document.getElementById('right-weight');

let colorIdx    = 0;
var color       = "";

let nextBallKG      = 0;
let leftWeight      = 0.0;
let rightWeight     = 0.0;
let leftBalance     = 0.0;
let rightBalance    = 0.0;


function getRandomValues() {
    nextBallKG = Math.floor(Math.random() * maxKG)+1;
    colorIdx = Math.floor(Math.random() * maxColor)+1;
    color = colors[colorIdx];
}

const gameBox   = document.getElementById('game-box');
const ball      = document.getElementById('ball');


function handleMove(event) {
    console.log(event);  
    if(nextBallKG==0||color=="") {
        getRandomValues();
        nextBallElement.innerText = `${nextBallKG} KG`;
        ball.style.backgroundColor = color;
        ball.innerText = `${nextBallKG}`;
        ball.style.width = `${(nextBallKG*3.6)+27}px`;
        ball.style.height = `${(nextBallKG*3.6)+27}px`;
    }
    ball.style.left = `${event.clientX}px`;
}

gameBox.addEventListener('mouseenter', () => {
    gameBox.addEventListener("mousemove", handleMove);
});

gameBox.addEventListener('mouseleave', () => {
    gameBox.removeEventListener("mousemove", handleMove);
});