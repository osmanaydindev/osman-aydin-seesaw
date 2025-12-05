const nextBallElement       = document.getElementById('next-weight');
const leftWeightElement     = document.getElementById('left-weight');
const rightWeightElement    = document.getElementById('right-weight');
const gameBoxElement        = document.getElementById('game-box');
const colorIDElement        = document.getElementById('colorID');
const colorElement          = document.getElementById('color');
const screenElement         = document.getElementById('screen');
const seesawElement         = document.getElementById('seesaw');
const tiltAngleElement      = document.getElementById('tilt-angle');
const logs                  = document.getElementById('logs');
const refreshBTN            = document.getElementById('refreshBTN');
const gameBox               = document.getElementById('game-box');
const ball                  = document.getElementById('ball');

const rectSeesaw    = seesawElement.getBoundingClientRect();
const rectScreen    = screenElement.getBoundingClientRect();
const rectGameBox   = gameBoxElement.getBoundingClientRect();

const colors        = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
const maxColor      = colors.length;
const maxKG         = 10;
const tiltMultiplier= 30;
const maxTiltAngle  = 30;
const minTiltAngle  = -30;


const minLeft = rectSeesaw.x-rectGameBox.x;
const maxLeft = rectSeesaw.x - rectGameBox.x + rectSeesaw.width;

let colorIdx    = 0;    //şeffaf topun rengi indexi
var color       = "";   //şeffaf topun rengi
var isClicked   = false;
let leftPos     = 0;    //şeffaf topun left pozisyonu

let nextBallKG      = 0;
let leftWeight      = 0.0;
let rightWeight     = 0.0;
let leftBalance     = 0.0;
let rightBalance    = 0.0;
let tiltAngle       = 0.0;
let ballId          = 0;
let logId           = 0;


function getRandomValues() {
    nextBallKG = Math.floor(Math.random() * maxKG)+1;
    colorIdx = Math.floor(Math.random() * maxColor)+1;
    color = colors[colorIdx-1];
}


function setBallPositionX() {
    const ballCenterX = ball.getBoundingClientRect().x + (ball.getBoundingClientRect().width/2);
    const seesawCenterX = rectSeesaw.x + (rectSeesaw.width/2);
    const differenceX = ballCenterX - seesawCenterX;
    
    // console.log("kg: ", nextBallKG," differenceX: ", differenceX);

    if(ballCenterX < seesawCenterX) {
        leftWeight += nextBallKG;
        leftWeightElement.innerText = `${leftWeight.toFixed(1)} KG`;
        leftBalance += nextBallKG * differenceX;
    } else {
        rightWeight += nextBallKG;
        rightWeightElement.innerText = `${rightWeight.toFixed(1)} KG`;
        rightBalance += nextBallKG * differenceX;
    }  
    return differenceX;
}
function changeSeesawTilt(){
    tiltAngle = (leftBalance+rightBalance) / tiltMultiplier;
    if(tiltAngle > maxTiltAngle) tiltAngle = maxTiltAngle;
    if(tiltAngle < minTiltAngle) tiltAngle = minTiltAngle;
    tiltAngleElement.innerText = `${tiltAngle.toFixed(1)}°`;
    seesawElement.style.transform = `rotate(${tiltAngle}deg)`;
}

function createNewBall(){
    const newBall = document.createElement("div");
    newBall.classList.add("ball-on-seesaw");
    newBall.id = `ball-${++ballId}`;
    newBall.style.backgroundColor = color;
    newBall.style.width = `${(nextBallKG*3.6)+27}px`;
    newBall.style.height = `${(nextBallKG*3.6)+27}px`;
    newBall.innerText = `${nextBallKG} kg`;
    newBall.style.left = `${leftPos - ((nextBallKG*3.6)+27)/2}px`;
    // const seesawPosition = seesawElement.getBoundingClientRect();
    newBall.style.top = `0%`;
    const ballCenterX = newBall.getBoundingClientRect().x + (newBall.getBoundingClientRect().width/2);
    const seesawCenterX = rectSeesaw.x + (rectSeesaw.width/2);
    const differenceX = ballCenterX - seesawCenterX;
    const newY = (tiltAngle / tiltMultiplier) * differenceX * 0.5;
    requestAnimationFrame(() => {
        newBall.style.top = `calc(50% + ${newY}px)`;
    });
        
    return newBall;
}
function createLog(differenceX){
    const newLog = document.createElement("div");
    newLog.classList.add("log");
    newLog.id = `log-${++logId}`;
    newLog.style.transform= `translateX(-20px)`;
    newLog.style.opacity= "0.5"; 
    newLog.innerText = `📦 ${nextBallKG}kg dropped on ${ differenceX > 0 ? 'right':'left'} side at ${Math.abs(differenceX.toFixed(0))}px from center`;
    return newLog;
}
function resetTransparentBall(){
    nextBallKG = 0;
    color = "";
    ball.style.backgroundColor = "transparent";
    ball.innerText = ``;
    ball.style.left = `-100px`;
}

function setPositionsOfBallsOnSeesaw(){
    const ballsOnSeesaw = document.querySelectorAll('.ball-on-seesaw');
    ballsOnSeesaw.forEach(ballElement => {
        const ballCenterX = ballElement.getBoundingClientRect().x + (ballElement.getBoundingClientRect().width/2);
        const seesawCenterX = rectSeesaw.x + (rectSeesaw.width/2);
        const differenceX = ballCenterX - seesawCenterX;
        const newY = ((tiltAngle / tiltMultiplier) * differenceX * 0.5) - ballElement.getBoundingClientRect().height/2;
        ballElement.style.top = `calc(50% + ${newY}px)`;
    });
}

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
    if(nextBallKG==0||color=="") {
        return;
    }

        
    console.log("seesaw.x: ", seesawElement.getBoundingClientRect().x);
    console.log("seesaw.y: ", seesawElement.getBoundingClientRect().y);
    console.log("------------------------------------------------");
    const differenceX = setBallPositionX();
    changeSeesawTilt();

    setPositionsOfBallsOnSeesaw();
    console.log("seesaw.x: ", seesawElement.getBoundingClientRect().x);
    console.log("seesaw.y: ", seesawElement.getBoundingClientRect().y);
    console.log("*************************************************");

    const newBall = createNewBall();
    gameBox.appendChild(newBall);

    // eğime göre topların y pozisypnu ayarlanacak. 
    // eğim - ise sol taraf aşağı sağ taraf yukarı
    // eğim + ise sol yukarı sağ aşağı. 
    // seesaw 0 sabit. eğim ve seesaw uzunluğu ile topların y pozisyonu hesaplanacak.
    // diğer toplar eğime göre yeniden hesaplanacak. 


    
    
    const newLog = createLog(differenceX);
    logs.prepend(newLog);

    requestAnimationFrame(() => {
        newLog.style.transform = "translateX(0)";
        newLog.style.opacity = 1;
    });

    // topu resetle
    resetTransparentBall();
    handleMove(event);
}


refreshBTN.addEventListener('click', () => {
    leftWeight = 0.0;
    rightWeight = 0.0;
    leftBalance = 0.0;
    rightBalance = 0.0;
    tiltAngle = 0.0;
    tiltAngleElement.innerText = `0.0°`;
    seesawElement.style.transform = `rotate(0deg)`;
    leftWeightElement.innerText = `0.0 KG`;
    rightWeightElement.innerText = `0.0 KG`;
    const ballsOnSeesaw = document.querySelectorAll('.ball-on-seesaw');
    ballsOnSeesaw.forEach(ball => ball.remove());
    logs.innerHTML = '';
});

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