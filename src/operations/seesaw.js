import { variables } from '../store/variables.js';
import { constants } from '../store/constants.js';

export function changeSeesawTilt(){
    variables.oldTiltAngle = variables.tiltAngle;
    variables.tiltAngle = (variables.leftBalance+variables.rightBalance) / constants.tiltMultiplier;
    if(variables.tiltAngle < constants.minTiltAngle) variables.tiltAngle = constants.minTiltAngle;
    if(variables.tiltAngle > constants.maxTiltAngle) variables.tiltAngle = constants.maxTiltAngle;
    constants.tiltAngleElement.innerText = `${variables.tiltAngle.toFixed(1)}°`;
    constants.seesawElement.style.transform = `rotate(${variables.tiltAngle}deg)`;
}