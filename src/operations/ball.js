import { variables } from '../store/variables.js';
import { constants } from '../store/constants.js';

export function setBallPositionX() {
    let ballCenterX = ball.getBoundingClientRect().x + (ball.getBoundingClientRect().width/2);
    const rectSeesaw = constants.seesawElement.getBoundingClientRect();
    const rectGameBox = constants.gameBoxElement.getBoundingClientRect();
    variables.minLeft = constants.seesawElement.getBoundingClientRect().x - rectGameBox.x;
    variables.maxLeft = constants.seesawElement.getBoundingClientRect().x - rectGameBox.x + constants.seesawElement.getBoundingClientRect().width;

    if(ballCenterX < variables.minLeft+rectGameBox.x) ballCenterX = variables.minLeft+rectGameBox.x;
    else if(ballCenterX > variables.maxLeft+rectGameBox.x) ballCenterX = variables.maxLeft+rectGameBox.x;
    console.log("After bounds check ballCenterX: ", ballCenterX - rectGameBox.x);
    
    const seesawCenterX = rectSeesaw.x + (rectSeesaw.width/2);
    const differenceX = ballCenterX - seesawCenterX;
    
    console.log("kg: ", variables.nextBallKG," differenceX: ", differenceX);

    if(ballCenterX < seesawCenterX) {
        variables.leftWeight += variables.nextBallKG;
        constants.leftWeightElement.innerText = `${variables.leftWeight.toFixed(1)} KG`;
        variables.leftBalance += variables.nextBallKG * differenceX;
    } else {
        variables.rightWeight += variables.nextBallKG;
        constants.rightWeightElement.innerText = `${variables.rightWeight.toFixed(1)} KG`;
        variables.rightBalance += variables.nextBallKG * differenceX;
    }  

    return differenceX;
}

export function createNewBall(){
    const newBall = document.createElement("div");
    let ballId = variables.ballId;
    newBall.classList.add("ball-on-seesaw");
    newBall.id = `ball-${++ballId}`;
    newBall.style.backgroundColor = variables.color;
    newBall.style.width = `${(variables.nextBallKG*3.6)+27}px`;
    newBall.style.height = `${(variables.nextBallKG*3.6)+27}px`;
    newBall.innerText = `${variables.nextBallKG} kg`;
    newBall.style.left = `${variables.leftPos - ((variables.nextBallKG*3.6)+27)/2}px`;
    newBall.style.top = `0%`;    
    return newBall;
}

export function setPositionsOfBallsOnSeesaw(){
    const ballsOnSeesaw = document.querySelectorAll('.ball-on-seesaw');
    const rectSeesaw = constants.seesawElement.getBoundingClientRect();
    ballsOnSeesaw.forEach(ballElement => {
        const ballCenterX = ballElement.getBoundingClientRect().x + (ballElement.getBoundingClientRect().width/2);
        const seesawCenterX = rectSeesaw.x + (rectSeesaw.width/2);
        const differenceX = ballCenterX - seesawCenterX;
        const newY = ((variables.tiltAngle / constants.tiltMultiplier) * differenceX * 0.5) - ballElement.getBoundingClientRect().height/2;
        ballElement.style.top = `calc(50% + ${newY}px)`;
    });
}

