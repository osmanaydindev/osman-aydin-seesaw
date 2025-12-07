import { constants } from "./constants.js";
import getRandomValues from "./utlis/getRandomValues.js";

const rectSeesaw          = constants.seesawElement.getBoundingClientRect();
const rectGameBox         = constants.gameBoxElement.getBoundingClientRect();

let colorIdx        = 0;    //şeffaf topun rengi indexi
var color           = "";   //şeffaf topun rengi
let leftPos         = 0;    //şeffaf topun left pozisyonu

let nextBallKG      = 0;
let leftWeight      = 0.0;
let rightWeight     = 0.0;
let leftBalance     = 0.0;
let rightBalance    = 0.0;

let tiltAngle       = 0.0;
let oldTiltAngle    = 0.0;

let ballId          = 0;
let logId           = 0;

let minLeft         = rectSeesaw.x - rectGameBox.x;
let maxLeft         = rectSeesaw.x - rectGameBox.x + rectSeesaw.width;


function setBallPositionX() {

    let ballCenterX = ball.getBoundingClientRect().x + (ball.getBoundingClientRect().width/2);
    minLeft = constants.seesawElement.getBoundingClientRect().x - rectGameBox.x;
    maxLeft = constants.seesawElement.getBoundingClientRect().x - rectGameBox.x + constants.seesawElement.getBoundingClientRect().width;

    if(ballCenterX < minLeft+rectGameBox.x) ballCenterX = minLeft+rectGameBox.x;
    else if(ballCenterX > maxLeft+rectGameBox.x) ballCenterX = maxLeft+rectGameBox.x;
    console.log("After bounds check ballCenterX: ", ballCenterX - rectGameBox.x);
    
    const seesawCenterX = rectSeesaw.x + (rectSeesaw.width/2);
    const differenceX = ballCenterX - seesawCenterX;
    
    console.log("kg: ", nextBallKG," differenceX: ", differenceX);

    if(ballCenterX < seesawCenterX) {
        leftWeight += nextBallKG;
        constants.leftWeightElement.innerText = `${leftWeight.toFixed(1)} KG`;
        leftBalance += nextBallKG * differenceX;
    } else {
        rightWeight += nextBallKG;
        constants.rightWeightElement.innerText = `${rightWeight.toFixed(1)} KG`;
        rightBalance += nextBallKG * differenceX;
    }  

    return differenceX;
}
function changeSeesawTilt(){
    oldTiltAngle = tiltAngle;
    tiltAngle = (leftBalance+rightBalance) / constants.tiltMultiplier;
    if(tiltAngle > constants.maxTiltAngle) tiltAngle = constants.maxTiltAngle;
    if(tiltAngle < constants.minTiltAngle) tiltAngle = constants.minTiltAngle;
    constants.tiltAngleElement.innerText = `${tiltAngle.toFixed(1)}°`;
    constants.seesawElement.style.transform = `rotate(${tiltAngle}deg)`;
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
    newBall.style.top = `0%`;    
    return newBall;
}
function setPositionOfNewBall(newBall, differenceX){
    const newY = ((tiltAngle) * differenceX/100 * 0.5) - newBall.getBoundingClientRect().height/2;
    newBall.style.top = `calc(50% + ${newY}px)`;
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
        const newY = ((tiltAngle / constants.tiltMultiplier) * differenceX * 0.5) - ballElement.getBoundingClientRect().height/2;
        ballElement.style.top = `calc(50% + ${newY}px)`;
    });
}

function handleMove(event) {
    if(nextBallKG==0||color=="") {
        var res = getRandomValues();
        nextBallKG = res.nextBallKG;
        color = res.color;
        constants.nextBallElement.innerText = `${nextBallKG} KG`;
        ball.style.backgroundColor = color;
        ball.innerText = `${nextBallKG} kg`;
        ball.style.width = `${(nextBallKG*3.6)+27}px`;
        ball.style.height = `${(nextBallKG*3.6)+27}px`;
    }
    const mouseLocation = event.clientX - rectGameBox.x; // gameBoxElement içindeki konumu

    if(mouseLocation < rectSeesaw.x-rectGameBox.x) { //tahta ile gameBoxElement arasındaysa
        leftPos = minLeft;
    } else if(mouseLocation > maxLeft) {
        leftPos = maxLeft;
    } else {
        leftPos = mouseLocation;
    }
    ball.style.left = `${leftPos}px`;
}

function handleClick(event) {
    console.log(nextBallKG, color);
    
    if(nextBallKG==0||color=="") {
        return;
    }

    const differenceX = setBallPositionX();
    changeSeesawTilt();

    setPositionsOfBallsOnSeesaw();
    const newBall = createNewBall();
    constants.gameBoxElement.appendChild(newBall);
    setPositionOfNewBall(newBall, differenceX);
    setPositionsOfBallsOnSeesaw();
    
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
    constants.tiltAngleElement.innerText = `0.0°`;
    constants.seesawElement.style.transform = `rotate(0deg)`;
    constants.leftWeightElement.innerText = `0.0 KG`;
    constants.rightWeightElement.innerText = `0.0 KG`;
    const ballsOnSeesaw = document.querySelectorAll('.ball-on-seesaw');
    ballsOnSeesaw.forEach(ball => ball.remove());
    logs.innerHTML = '';
});

constants.gameBoxElement.addEventListener("mousemove", handleMove);
constants.gameBoxElement.addEventListener("click", handleClick);

constants.gameBoxElement.addEventListener('mouseenter', () => {
    constants.gameBoxElement.addEventListener("mousemove", handleMove);
    constants.gameBoxElement.addEventListener("click", handleClick);
    constants.gameBoxElement.addEventListener("mousemove", handleMove);
    constants.ball.style.visibility = "visible";
});

constants.gameBoxElement.addEventListener('mouseleave', () => {
    constants.gameBoxElement.removeEventListener("mousemove", handleMove);
    constants.gameBoxElement.removeEventListener("click", handleClick);
    constants.ball.style.visibility = "hidden";
});