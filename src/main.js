import { constants }        from "./store/constants.js";
import { variables }        from "./store/variables.js";
import { changeSeesawTilt, updateSeesawValue } from "./operations/seesaw.js";
import getRandomValues      from "./utlis/getRandomValues.js";
import resetTransparentBall from "./utlis/resetTransparentBall.js";
import refreshGame          from "./utlis/refreshGame.js";
import createLog            from "./operations/log.js";
import ballDownAuido        from "./utlis/ballDownAudio.js";

import { setBallPositionX, createNewBall, setPositionsOfBallsOnSeesaw } from "./operations/ball.js";

// const rectSeesaw          = constants.seesawElement.getBoundingClientRect();
// const rectGameBox         = constants.gameBoxElement.getBoundingClientRect();

// variables.minLeft         = rectSeesaw.x - rectGameBox.x;
// variables.maxLeft         = rectSeesaw.x - rectGameBox.x + rectSeesaw.width;


function handleMove(event) {
    if(variables.nextBallKG==0||variables.color=="") {
        var res = getRandomValues();
        variables.nextBallKG = res.nextBallKG;
        variables.color = res.color;
        constants.nextBallElement.innerText = `${variables.nextBallKG} KG`;
        ball.style.backgroundColor = variables.color;
        ball.innerText = `${variables.nextBallKG} kg`;
        ball.style.width = `${(variables.nextBallKG*3.6)+27}px`;
        ball.style.height = `${(variables.nextBallKG*3.6)+27}px`;
    }
    let currentSeesaw = constants.seesawElement.getBoundingClientRect();
    let currentGameBox = constants.gameBoxElement.getBoundingClientRect();
    // gameBoxElement içindeki konumu
    const mouseLocation = event.clientX - currentGameBox.x; 
    
    variables.maxLeft = (currentSeesaw.x + currentSeesaw.width) - currentGameBox.x;
    variables.minLeft = currentSeesaw.x - currentGameBox.x;

    
    //tahta ile gameBoxElement arasındaysa
    if(mouseLocation < currentSeesaw.x-currentGameBox.x) { 
        variables.leftPos = variables.minLeft;
    } else if(mouseLocation > variables.maxLeft) {
        variables.leftPos = variables.maxLeft;
    } else {
        variables.leftPos = mouseLocation;
    }
    ball.style.left = `${variables.leftPos}px`;
}

function handleClick(event) {
    if(variables.nextBallKG==0||variables.color=="") return;
    

    const differenceX = setBallPositionX();
    changeSeesawTilt();
    setPositionsOfBallsOnSeesaw();
    ballDownAuido();
    constants.gameBoxElement.appendChild(createNewBall());
    setPositionsOfBallsOnSeesaw();
    const newLog = createLog(differenceX);
    constants.logs.prepend(newLog);
    
    requestAnimationFrame(() => {
        newLog.style.transform = "translateX(0)";
        newLog.style.opacity = 1;
    });
    updateSeesawValue();
    // topu resetle
    resetTransparentBall();
    handleMove(event);
}


refreshBTN.addEventListener('click', () => refreshGame());

constants.gameBoxElement.addEventListener("mousemove", handleMove);
constants.gameBoxElement.addEventListener("click", handleClick);

constants.gameBoxElement.addEventListener('mouseenter', () => {
    constants.gameBoxElement.addEventListener("mousemove", handleMove);
    constants.gameBoxElement.addEventListener("click", handleClick);
    constants.ball.style.display = "flex";
});

constants.gameBoxElement.addEventListener('mouseleave', () => {
    constants.gameBoxElement.removeEventListener("mousemove", handleMove);
    constants.gameBoxElement.removeEventListener("click", handleClick);
    constants.ball.style.display = "none";
});