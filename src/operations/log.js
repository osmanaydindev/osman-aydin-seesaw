import { variables } from '../store/variables.js';

export default function createLog(differenceX){
    const newLog = document.createElement("div");
    let logId = variables.logId;
    newLog.classList.add("log");
    newLog.id = `log-${++logId}`;
    newLog.style.transform= `translateX(-10px)`;
    newLog.style.opacity= "0.5"; 
    newLog.innerText = `📦 ${variables.nextBallKG}kg dropped on ${ differenceX > 0 ? 'right':'left'} side at ${Math.abs(differenceX.toFixed(0))}px from center`;
    return newLog;
}
