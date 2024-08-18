var displayEl = document.getElementById('display');
var ulEl = document.getElementById('ul-el');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const resumeBtn = document.getElementById('resume-btn');
const controlDiv = document.getElementById('controls-container');
let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
let timer = null;

// Inner control
function updateTimer() {
  
    milliseconds ++;
    if (milliseconds === 100) {
        seconds++;
        milliseconds = 0;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
            if (minutes === 60) {
                hours++;
                minutes = 0;
            }
        }
    }
    let h = hours< 10 ? '0' +hours : hours;
    let m = minutes < 10 ? '0' + minutes : minutes;
    let s = seconds < 10 ? '0' + seconds : seconds;
    displayEl.innerHTML = `${h}:${m}:${s}.${milliseconds}`;
}

// start the timer
startBtn.addEventListener('click',function startStopwatch() {
    if (timer !== null) {
        clearInterval(timer);
    }
    timer = setInterval(updateTimer, 10);
    startBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
    lapBtn.disabled = false;
}   
);

// pause the timer
pauseBtn.addEventListener('click', function pauseStopwatch() {
    clearInterval(timer);
    timer = null;
    startBtn.style.display = 'none';
    pauseBtn.style.display = 'none';
    resumeBtn.style.display = 'block';
    resetBtn.style.display = 'block';
    lapBtn.style.display = 'none';
    lapBtn.disabled = true;
    controlDiv.style.flexDirection = 'row-reverse';
}); 

// resume animation
resumeBtn.addEventListener('click', function ResumeWatch(){
    timer = setInterval(updateTimer, 10);
    startBtn.style.display = 'none';
    pauseBtn.style.display = 'block';
    resumeBtn.style.display = 'none';
    resetBtn.style.display = 'none';
    lapBtn.style.display = 'block';
    lapBtn.disabled = false;
    controlDiv.style.flexDirection = 'row';
});

// reset the timer and clear lap list
resetBtn.addEventListener('click', function resetStopwatch() {
    clearInterval(timer);
    timer = null;
    [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
    displayEl.innerHTML = '00:00:00.00';
    startBtn.style.display = 'block';
    pauseBtn.style.display = 'none';
    resumeBtn.style.display = 'none';
    resetBtn.style.display = 'none';
    lapBtn.style.display = 'block';
    lapBtn.disabled = true;
    controlDiv.style.flexDirection = 'row';
    ulEl.innerHTML = '';
});

// lap list
lapBtn.addEventListener('click', function addLap() {
    let h = hours< 10 ? '0' +hours : hours;
    let m = minutes < 10 ? '0' + minutes : minutes;
    let s = seconds < 10 ? '0' + seconds : seconds;
    let lapNumber = ulEl.childElementCount + 1;
    let lapCount = lapNumber <10 ? "0"+ lapNumber : lapNumber;
    ulEl.innerHTML += `<li>
                        <span class="lap-number">${lapCount}</span>
                        <span class="laps">
                               ${h}:${m}:${s}.${milliseconds} 
                        </span> 
                        </li>`;
});
