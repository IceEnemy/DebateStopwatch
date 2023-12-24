const started = document.getElementById('start');
const paused = document.getElementById('pause');
const reseting = document.getElementById('reset');
const opt = document.getElementById('options');

let min = 0;
let sec = 0;
let ms = 0;
let sec1 = 10;
let sec2 = 15;
let sec3 = 20;
let sec4 = 25;
let startTime = 0;
let pauseTime = 0;
let timer = false;
let op_bar = false;

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
    return null;
}