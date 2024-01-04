const started = document.getElementById('start');
const paused = document.getElementById('pause');
const reseting = document.getElementById('reset');
const opt = document.getElementById('options');

let min = 0;
let sec = 0;
let ms = 0;
let sec1 = 60;
let sec2 = 360;
let sec3 = 420;
let sec4 = 440;
let startTime = 0;
let pauseTime = 0;
let timer = false;
let op_bar = true;

document.getElementById('g_time').placeholder = formatTime(sec1)
document.getElementById('y_time').placeholder = formatTime(sec2)
document.getElementById('o_time').placeholder = formatTime(sec3)
document.getElementById('r_time').placeholder = formatTime(sec4)

opt.addEventListener('click', function(){
    if(!op_bar){
        document.getElementById('bar').style.visibility='hidden';
        document.getElementById('bar').style.opacity='0';
        document.querySelector('.option_container').classList.add('transp');
        op_bar = true;
    }
    else{
        document.getElementById('bar').style.visibility='visible';
        document.getElementById('bar').style.opacity='1';
        document.querySelector('.option_container').classList.remove('transp');
        op_bar = false;
    }
})

started.addEventListener('click', function () {
    if (!timer) {
        timer = true;
        disableButton(started);
        enableButton(paused);
        enableButton(reseting);

        document.querySelector('.time_container').classList.add('transp');
        document.querySelector('.container').classList.add('transp');
        document.getElementById('options').style.visibility='hidden';
        document.getElementById('options').style.opacity='0';

        if(!startTime){
            startTime = performance.now();
        }
        else{
            startTime += (performance.now() - pauseTime);
        }
        counter();
        setButtonColor(started)
    }
});

paused.addEventListener('click', function () {
    timer = false;
    pauseTime = performance.now();
    disableButton(paused);
    enableButton(started);
    enableButton(reseting);
    setButtonColor(paused);
});

reseting.addEventListener('click', function () {
    timer = false;
    disableButton(reseting);
    enableButton(paused);
    enableButton(started);
    min = 0;
    sec = 0;
    ms = 0;
    document.getElementById('min').innerHTML = "00";
    document.getElementById('sec').innerHTML = "00";
    document.getElementById('ms').innerHTML = "00";
    startTime = 0;
    setButtonColor(reseting);
    document.body.classList.remove('warn1', 'warn2', 'warn3', 'warn4');
    document.querySelector('.time_container').classList.remove('transp');
    document.querySelector('.container').classList.remove('transp');
    document.getElementById('options').style.visibility='visible';
    document.getElementById('options').style.opacity='1';
    buttonUp('reset');
});

function counter() {
    if (timer) {
        const elapsedTime = performance.now() - startTime;
        ms = Math.floor(elapsedTime) % 1000;
        sec = Math.floor(elapsedTime / 1000) % 60;
        min = Math.floor(elapsedTime / (1000 * 60));

        let msString = ms.toString().padStart(3, '0').substring(0,2);
        let secString = sec.toString().padStart(2, '0');
        let minString = min.toString().padStart(2, '0');

        document.getElementById('min').innerHTML = minString;
        document.getElementById('sec').innerHTML = secString;
        document.getElementById('ms').innerHTML = msString;

        requestAnimationFrame(counter);
        setBackgroundColor(min,sec);
    }
}

function disableButton(button) {
    button.setAttribute('disabled', 'true');
}

function enableButton(button) {
    button.removeAttribute('disabled');
}

function setButtonColor(button) {
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(b => b.classList.remove('pressed'));
    button.classList.add('pressed');
}

function buttonUp(button){
    document.getElementById(button).classList.remove('pressed');
}

function setBackgroundColor(min,sec){
    const currColor = colorClass(min,sec)
    if(currColor){
        if(!document.body.classList.contains(currColor)){
            document.body.classList.remove('warn1', 'warn2', 'warn3', 'warn4');
            document.body.classList.add(currColor);
        }
    }
    else{
        // alert('done');
        document.body.classList.remove('warn1', 'warn2', 'warn3', 'warn4');
    }
}

function colorClass(min,sec){
    const totalSec = min*60 + sec;
    if(totalSec < sec1){
        return 'warn1';
    }
    else if(totalSec < sec2){
        return 'warn2';
    }
    else if(totalSec < sec3){
        return 'warn3';
    }
    else if(totalSec < sec4){
        return 'warn4';
    }
    // alert('hey');
    return null;
}

function parseTimeInput(input) {
    var timeArr = input.split(':');
    var minutes = parseInt(timeArr[0],10) || 0;
    var seconds = parseInt(timeArr[1],10) || 0;
    return minutes * 60 + seconds;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

document.getElementById('g_form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const gInput = document.getElementById('g_time');
    const userInput = gInput.value

    gInput.value = '';
    if(isValidTimeFormat(userInput)){
        sec1 = parseTimeInput(userInput);
        gInput.placeholder = formatTime(sec1);
        document.getElementById('g_error').textContent = ''
    }
    else{
        document.getElementById('g_error').textContent = 'Invalid Input!'
    }
});

document.getElementById('y_form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const gInput = document.getElementById('y_time');
    const userInput = gInput.value

    gInput.value = '';
    if(isValidTimeFormat(userInput)){
        sec2 = parseTimeInput(userInput);
        gInput.placeholder = formatTime(sec2);
        document.getElementById('y_error').textContent = ''
    }
    else{
        document.getElementById('y_error').textContent = 'Invalid Input!'
    }
});

document.getElementById('o_form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const gInput = document.getElementById('o_time');
    const userInput = gInput.value

    gInput.value = '';
    if(isValidTimeFormat(userInput)){
        sec3 = parseTimeInput(userInput);
        gInput.placeholder = formatTime(sec3);
        document.getElementById('o_error').textContent = ''
    }
    else{
        document.getElementById('o_error').textContent = 'Invalid Input!'
    }
});

document.getElementById('r_form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const gInput = document.getElementById('r_time');
    const userInput = gInput.value

    gInput.value = '';
    if(isValidTimeFormat(userInput)){
        sec4 = parseTimeInput(userInput);
        gInput.placeholder = formatTime(sec4);
        document.getElementById('r_error').textContent = ''
    }
    else{
        document.getElementById('r_error').textContent = 'Invalid Input!'
    }
});

function isValidTimeFormat(timeString) {
    const timeRegex = /^([0-5]?[0-9]):([0-5][0-9])$/;
    return timeRegex.test(timeString);
}