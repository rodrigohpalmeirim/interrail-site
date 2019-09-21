var place = 0;
var placeVideo = document.getElementById("place-video");
var transitionVideo = document.getElementById("transition-video");
var reversedTransitionVideo = document.getElementById("reversed-transition-video");
var transitioning = false;
var timeouts = [];

setClock(Date.parse(places[place].arrival.date+" "+places[place].arrival.time))

placeVideo.addEventListener("loadeddata", function() {placeVideo.play()});

function arrowKeyControl() {
    document.onkeydown = function (e) {
        e = e || window.event;
        if (e.key == "ArrowRight") {
            if (transitioning) {
                setClock(Date.parse(places[place+1].arrival.date+" "+places[place+1].arrival.time.split("+")[0]))
                stopClock();
                placeVideo.src = places[++place].video;
                placeVideo.play();
                transitionVideo.style.opacity = 0;
                reversedTransitionVideo.style.opacity = 0;
                if (place < places.length-1) transitionVideo.src = places[place+1].transitionVideo;
                reversedTransitionVideo.src = places[place].transitionVideo.split(".")[0] + "-reversed.mp4";
                transitioning = false;
                clearTimeouts();
            } else if (place < places.length-1) {
                fastForward(Date.parse(places[place].departure.date+" "+places[place].departure.time.split("+")[0]), Date.parse(places[place+1].arrival.date+" "+places[place+1].arrival.time.split("+")[0]))
                transitioning = true;
                transitionVideo.play();
                transitionVideo.style.opacity = 1;
                timeouts.push(setTimeout(() => {placeVideo.src = places[place+1].video;}, 500));
                timeouts.push(setTimeout(() => {
                    place++;
                    placeVideo.play();
                    transitionVideo.style.opacity = 0;
                    if (place < places.length-1) setTimeout(() => {transitionVideo.src = places[place+1].transitionVideo;}, 500);
                    reversedTransitionVideo.src = places[place].transitionVideo.split(".")[0] + "-reversed.mp4";
                    transitioning = false;
                }, 5000));
            }
        } else if (e.key == "ArrowLeft") {
            if (transitioning) {
                setClock(Date.parse(places[place].arrival.date+" "+places[place].arrival.time.split("+")[0]))
                stopClock();
                placeVideo.src = places[place].video;
                placeVideo.play();
                transitionVideo.style.opacity = 0;
                reversedTransitionVideo.style.opacity = 0;
                transitionVideo.src = places[place+1].transitionVideo;
                if (place > 0) reversedTransitionVideo.src = places[place].transitionVideo.split(".")[0] + "-reversed.mp4";
                transitioning = false;
                clearTimeouts();
            } else if (place > 0) {
                fastForward(Date.parse(places[place].arrival.date+" "+places[place].arrival.time.split("+")[0]), Date.parse(places[place-1].arrival.date+" "+places[place-1].arrival.time.split("+")[0]))
                transitioning = true;
                place--;
                reversedTransitionVideo.play();
                reversedTransitionVideo.style.opacity = 1;
                timeouts.push(setTimeout(() => {placeVideo.src = places[place].video;}, 500));
                timeouts.push(setTimeout(() => {
                    placeVideo.play();
                    reversedTransitionVideo.style.opacity = 0;
                    transitionVideo.src = places[place+1].transitionVideo;
                    if (place > 0) setTimeout(() => {reversedTransitionVideo.src = places[place].transitionVideo.split(".")[0] + "-reversed.mp4";}, 500);
                    transitioning = false;
                }, 5000));
            }
        }
    }
}
arrowKeyControl();

function clearTimeouts() {
    for (t of timeouts)
        clearTimeout(t);
    timeouts = [];
}