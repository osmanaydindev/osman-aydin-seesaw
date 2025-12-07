import { constants } from "../store/constants.js";

export default function getRandomValues() {
    let nextBallKG = Math.floor(Math.random() * constants.maxKG)+1;
    let colorIdx = Math.floor(Math.random() * constants.colors.length)+1;
    var color = constants.colors[colorIdx-1];
    return { nextBallKG, color };
}