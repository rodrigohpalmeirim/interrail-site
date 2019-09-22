const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
var clockInterval;
var clockTimeout;

function setClock(millis) {
    
    const date = new Date(millis);

    const seconds = date.getSeconds();

    const mins = date.getMinutes();
    const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
    minsHand.style.transform = `rotate(${minsDegrees}deg)`;

    const hour = date.getHours();
    const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;

    document.querySelector(".time").textContent = (""+hour).padStart(2, "0")+":"+(""+mins).padStart(2, "0");
}

function fastForward(startMillis, endMillis) {
    let date = new Date(startMillis);
    let endDate = new Date(endMillis);
    let iterMillis = (endMillis-startMillis) / 100;
    let day = date.getDate();

    clearInterval(clockInterval);

    clockInterval = setInterval(function f() {
        setClock(date);
        date = new Date(date.getTime() + iterMillis);
        if (date.getDate() > day) {
            displayDay(date.getDate() - 6);
            day = date.getDate();
            timeouts.push(setTimeout(() => {
                transitionVideo.pause();
                clearInterval(clockInterval);
            }, 500));
            timeouts.push(setTimeout(() => {
                clockInterval = setInterval(f, 50);
                transitionVideo.play()
            }, 2000));
        }
        if ((date - endDate) * (endMillis - startMillis) >= 0) {
            clearInterval(clockInterval);
            setClock(endDate);
        }
    }, 50);
}