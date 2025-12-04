const nextBallElement       = document.getElementById('next-weight');
const leftWeightElement     = document.getElementById('left-weight');
const rightWeightElement    = document.getElementById('right-weight');
const gameBoxElement        = document.getElementById('game-box');
const colorIDElement        = document.getElementById('colorID');
const colorElement          = document.getElementById('color');
const screenElement         = document.getElementById('screen');
const seesawElement         = document.getElementById('seesaw');
const tiltAngleElement      = document.getElementById('tilt-angle');

const rectSeesaw    = seesawElement.getBoundingClientRect();
const rectScreen    = screenElement.getBoundingClientRect();
const rectGameBox   = gameBoxElement.getBoundingClientRect();

const colors    = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
const maxColor  = colors.length;
const maxKG     = 10;

const minLeft = rectSeesaw.x-rectGameBox.x;
const maxLeft = rectSeesaw.x - rectGameBox.x + rectSeesaw.width;

let colorIdx    = 0;
var color       = "";
var isClicked   = false;
let leftPos     = 0;

let nextBallKG      = 0;
let leftWeight      = 0.0;
let rightWeight     = 0.0;
let leftBalance     = 0.0;
let rightBalance    = 0.0;
let tiltAngle       = 0.0;


function getRandomValues() {
    nextBallKG = Math.floor(Math.random() * maxKG)+1;
    colorIdx = Math.floor(Math.random() * maxColor)+1;
    color = colors[colorIdx-1];
}

const gameBox   = document.getElementById('game-box');
const ball      = document.getElementById('ball');


function handleMove(event) {
    if(nextBallKG==0||color=="") {
        getRandomValues();
        nextBallElement.innerText = `${nextBallKG} KG`;
        ball.style.backgroundColor = color;
        ball.innerText = `${nextBallKG} kg`;
        ball.style.width = `${(nextBallKG*3.6)+27}px`;
        ball.style.height = `${(nextBallKG*3.6)+27}px`;
    }
    const mouseLocation = event.clientX - rectGameBox.x; // gameBox içindeki konumu

    if(mouseLocation < rectSeesaw.x-rectGameBox.x) { //tahta ile gameBox arasındaysa
        leftPos = minLeft;
    } else if(mouseLocation > maxLeft) {
        leftPos = maxLeft;
    } else {
        leftPos = mouseLocation;
    }
    ball.style.left = `${leftPos}px`;

}
function handleClick(event) {
    console.log("tiklandi : ", event);
    
    if(nextBallKG==0||color=="") {
        return;
    }

    const ballCenterX = ball.getBoundingClientRect().x + (ball.getBoundingClientRect().width/2);
    const seesawCenterX = rectSeesaw.x + (rectSeesaw.width/2);
    const differenceX = ballCenterX - seesawCenterX;
    console.log("kg: ", nextBallKG," differenceX: ", differenceX);

    if(ballCenterX < seesawCenterX) {
        leftWeight += nextBallKG;
        leftWeightElement.innerText = `${leftWeight.toFixed(1)} KG`;
        leftBalance += nextBallKG * differenceX;
    } else {
        rightWeight += nextBallKG;
        rightWeightElement.innerText = `${rightWeight.toFixed(1)} KG`;
        rightBalance += nextBallKG * differenceX;
    }  
    tiltAngle = (leftBalance+rightBalance) / 30;
    console.log("tiltAngle: ", tiltAngle);
    if(tiltAngle > 30) tiltAngle = 30;
    if(tiltAngle < -30) tiltAngle = -30;
    tiltAngleElement.innerText = `${tiltAngle.toFixed(1)}°`;
    seesawElement.style.transform = `rotate(${tiltAngle}deg)`;

    const newDiv = document.createElement("div");
    newDiv.classList.add("ball-on-seesaw");
    newDiv.style.backgroundColor = color;
    newDiv.style.width = `${(nextBallKG*3.6)+27}px`;
    newDiv.style.height = `${(nextBallKG*3.6)+27}px`;
    newDiv.style.left = `${leftPos - ((nextBallKG*3.6)+27)/2}px`;
    newDiv.innerText = `${nextBallKG} kg`;
    newDiv.style.borderRadius = "100%";
    newDiv.style.textAlign = "center";
    newDiv.style.display = "flex";
    newDiv.style.alignItems = "center";
    newDiv.style.justifyContent = "center";
    newDiv.style.fontSize = `0.8em`;
    newDiv.style.fontWeight = `700`;
    newDiv.style.position = "absolute";
    newDiv.style.top = `-${((nextBallKG*3.6)+27)/2 + 9}px`;
    newDiv.style.boxShadow = `0 2px 5px rgba(0,0,0,0.2)`;
    gameBox.appendChild(newDiv);

    console.log("seesaw.x: ", seesawElement.getBoundingClientRect().x);
    

    // topu resetle
    nextBallKG = 0;
    color = "";
    ball.style.backgroundColor = "transparent";
    ball.innerText = ``;
    ball.style.left = `-100px`;
}

gameBox.addEventListener('mouseenter', () => {
    gameBox.addEventListener("mousemove", handleMove);
    gameBox.addEventListener("click", handleClick);
    ball.style.visibility = "visible";
});

gameBox.addEventListener('mouseleave', () => {
    gameBox.removeEventListener("mousemove", handleMove);
    gameBox.removeEventListener("click", handleClick);
    ball.style.visibility = "hidden";
});