import { variables } from '../store/variables.js';
import { constants } from '../store/constants.js';
import resetTransparentBall from './resetTransparentBall.js';

export default function refreshGame(){
    variables.leftWeight = 0.0;
    variables.rightWeight = 0.0;
    variables.leftBalance = 0.0;
    variables.rightBalance = 0.0;
    variables.tiltAngle = 0.0;

    constants.tiltAngleElement.innerText = `0.0°`;
    constants.seesawElement.style.transform = `rotate(0deg)`;
    constants.leftWeightElement.innerText = `0.0 KG`;
    constants.rightWeightElement.innerText = `0.0 KG`;
    constants.logs.innerHTML = '';
    
    const ballsOnSeesaw = document.querySelectorAll('.ball-on-seesaw');
    ballsOnSeesaw.forEach(ball => ball.remove());
    resetTransparentBall();
}