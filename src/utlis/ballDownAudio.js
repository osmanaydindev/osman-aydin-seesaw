const ballDownAudio       = new Audio('../assets/sounds/new-ball-down.mp3');
let timer                 = null;

export default function ballDownAuido() {
    if (timer) clearTimeout(timer);
    ballDownAudio.currentTime = 0;
    ballDownAudio.play();
    timer = setTimeout(() => {
        ballDownAudio.pause();
        ballDownAudio.currentTime = 0;
    }, 500);
}