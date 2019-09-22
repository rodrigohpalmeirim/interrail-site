var place = 0;
var placeVideo = document.getElementById("place-video");
var transitionVideo = document.getElementById("transition-video");
var reversedTransitionVideo = document.getElementById("reversed-transition-video");
var transitioning = false;
var loaded = true;
var timeouts = [];

setClock(Date.parse(places[place].arrival.date+" "+places[place].arrival.time))

placeVideo.addEventListener("canplay", function() {placeVideo.play();});

function arrowKeyControl() {
    document.onkeydown = function (e) {
        e = e || window.event;
        if (e.key == "ArrowRight") {
            if (transitioning) {
                hideAnnouncement();
                clearTimeouts();
                setClock(Date.parse(places[place+1].arrival.date+" "+places[place+1].arrival.time.split("+")[0]))
                stopClock();
                placeVideo.src = places[++place].video;
                loaded = false;
                placeVideo.oncanplay = function() {
                    loaded = true;
                    placeVideo.oncanplay = null;
                }
                /* placeVideo.play(); */
                timeouts.push(setTimeout(() => {
                    transitionVideo.style.opacity = 0;
                    reversedTransitionVideo.style.opacity = 0;
                    if (place < places.length-1) transitionVideo.src = places[place+1].transitionVideo;
                    reversedTransitionVideo.src = places[place].transitionVideo.split(".")[0] + "-reversed.mp4";
                }, 500));
                transitioning = false;
                displayPlaceName(places[place].name);
            } else if (place < places.length-1) {
                hideAnnouncement();
                fastForward(Date.parse(places[place].departure.date+" "+places[place].departure.time.split("+")[0]), Date.parse(places[place+1].arrival.date+" "+places[place+1].arrival.time.split("+")[0]))
                transitioning = true;
                timeouts.push(setTimeout(() => {placeVideo.pause();}, 500));
                transitionVideo.play();
                transitionVideo.style.opacity = 1;
                transitionVideo.onended = function() {
                    place++;
                    loaded = false;
                    displayPlaceName(places[place].name);
                    /* placeVideo.play(); */
                    placeVideo.src = places[place].video;
                    placeVideo.oncanplay = function() {
                        loaded = true;
                        transitionVideo.style.opacity = 0;
                        if (place < places.length-1) timeouts.push(setTimeout(() => {transitionVideo.src = places[place+1].transitionVideo;}, 500));
                        placeVideo.oncanplay = null;
                    };
                    reversedTransitionVideo.src = places[place].transitionVideo.split(".")[0] + "-reversed.mp4";
                    transitioning = false;
                    transitionVideo.onended = null;
                };
            }
        } else if (e.key == "ArrowLeft") {
            if (transitioning) {
                hideAnnouncement();
                clearTimeouts();
                setClock(Date.parse(places[place].arrival.date+" "+places[place].arrival.time.split("+")[0]))
                stopClock();
                placeVideo.src = places[place].video;
                loaded = false;
                placeVideo.oncanplay = function() {
                    loaded = true;
                    placeVideo.oncanplay = null;
                }
                /* placeVideo.play(); */
                timeouts.push(setTimeout(() => {
                    transitionVideo.style.opacity = 0;
                    reversedTransitionVideo.style.opacity = 0;
                    transitionVideo.src = places[place+1].transitionVideo;
                    if (place > 0) reversedTransitionVideo.src = places[place].transitionVideo.split(".")[0] + "-reversed.mp4";
                }, 500));
                transitioning = false;
                displayPlaceName(places[place].name);
            } else if (place > 0) {
                hideAnnouncement();
                fastForward(Date.parse(places[place].arrival.date+" "+places[place].arrival.time.split("+")[0]), Date.parse(places[place-1].arrival.date+" "+places[place-1].arrival.time.split("+")[0]))
                transitioning = true;
                place--;
                timeouts.push(setTimeout(() => {placeVideo.pause();}, 500));
                reversedTransitionVideo.play();
                reversedTransitionVideo.style.opacity = 1;
                reversedTransitionVideo.onended = function() {
                    /* placeVideo.play(); */
                    placeVideo.src = places[place].video;
                    displayPlaceName(places[place].name);
                    loaded = false;
                    placeVideo.oncanplay = function() {
                        loaded = true;
                        reversedTransitionVideo.style.opacity = 0;
                        if (place > 0) timeouts.push(setTimeout(() => {reversedTransitionVideo.src = places[place].transitionVideo.split(".")[0] + "-reversed.mp4";}, 500));
                        placeVideo.oncanplay = null;
                    }
                    transitionVideo.src = places[place+1].transitionVideo;
                    transitioning = false;
                }
            }
        }
    }
}
arrowKeyControl();

function clearTimeouts() {
    for (t of timeouts)
        clearTimeout(t);
    timeouts = [];
    placeVideo.oncanplay = null;
    transitionVideo.onended = null;
    reversedTransitionVideo.onended = null;
}