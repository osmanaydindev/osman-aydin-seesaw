import { variables } from '../store/variables.js';
import { constants } from '../store/constants.js';

export default function resetTransparentBall(){
    variables.nextBallKG = 0;
    variables.color = "";
    constants.ball.style.backgroundColor = "transparent";
    constants.ball.innerText = ``;
    constants.ball.style.left = `-100px`;
}