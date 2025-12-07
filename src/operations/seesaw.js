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

export function updateSeesawValue(){
    if(variables.oldTiltAngle<variables.tiltAngle){
        const stepCount = (variables.tiltAngle - variables.oldTiltAngle) / 0.5;
        for(let i=1; i<=stepCount; i++){
            setTimeout(()=>{
                const intermediateAngle = variables.oldTiltAngle + i * 0.5;
                constants.tiltAngleElement.innerText = `${intermediateAngle.toFixed(1)}°`;
                
            }, i * 10);
        }
    } else if(variables.oldTiltAngle>variables.tiltAngle){
        const stepCount = (variables.oldTiltAngle - variables.tiltAngle) / 0.5;
        for(let i=1; i<=stepCount; i++){
            setTimeout(()=>{
                const intermediateAngle = variables.oldTiltAngle - i * 0.5;
                constants.tiltAngleElement.innerText = `${intermediateAngle.toFixed(1)}°`;
            }, i * 10);
        }
    }
    
    constants.tiltAngleElement.innerText = `${variables.tiltAngle.toFixed(1)}°`;
}