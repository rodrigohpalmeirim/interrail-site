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
    var date = new Date(startMillis);
    var iterMillis = (endMillis-startMillis) / 100;

    clockInterval = setInterval(function() {
        setClock(date);
        date = new Date(date.getTime() + iterMillis);
    }, 50);

    clockTimeout = setTimeout(function() {
        clearInterval(clockInterval);
        setClock(date);
    }, 5000);
}

function stopClock() {
    clearInterval(clockInterval);
    clearTimeout(clockTimeout);
}