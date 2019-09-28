var placeVideo = document.getElementById("place-video");
var transitionVideo = document.getElementById("transition-video");
var reversedTransitionVideo = document.getElementById("reversed-transition-video");
var transitioning = false;
var loaded = true;
var timeouts = [];

setClock(Date.parse(places[place].arrival.date+" "+places[place].arrival.time))
updateMedia(new Date(places[place].arrival.date+" "+places[place].arrival.time), new Date(places[place].departure.date+" "+places[place].departure.time));

placeVideo.addEventListener("canplay", function() {placeVideo.play();});

function arrowKeyControl() {
    document.onkeydown = function(e) {
        e = e || window.event;
        if (e.key == "ArrowRight") {
            nextPlace();
        } else if (e.key == "ArrowLeft") {
            previousPlace();
        }
    }
}
arrowKeyControl();

function nextPlace() {
    if (transitioning) {
        place++;
        skipTransition();
    } else if (place < places.length-1) {
        hidePlaceSelector();
        hideAnnouncement();
        fastForward(Date.parse(places[place].departure.date+" "+places[place].departure.time.split("+")[0]), Date.parse(places[place+1].arrival.date+" "+places[place+1].arrival.time.split("+")[0]));
        updateMedia(new Date(places[place].departure.date+" "+places[place].departure.time), new Date(places[place+1].arrival.date+" "+places[place+1].arrival.time));
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
            if (place < places.length-1) timeouts.push(setTimeout(() => {transitionVideo.src = places[place+1].transitionVideo;}, 500));
            placeVideo.oncanplay = function() {
                loaded = true;
                transitionVideo.style.opacity = 0;
                placeVideo.oncanplay = null;
                showPlaceSelector();
            };
            reversedTransitionVideo.src = places[place].transitionVideo.split(".")[0] + "-reversed.mp4";
            transitioning = false;
            transitionVideo.onended = null;
            setClock(Date.parse(places[place].arrival.date+" "+places[place].arrival.time.split("+")[0]));
            timeouts.push(setTimeout(function() {updateMedia(new Date(places[place].arrival.date+" "+places[place].arrival.time), new Date(places[place].departure.date+" "+places[place].departure.time));}, 500));
        };
    }
}

function previousPlace() {
    if (transitioning) {
        skipTransition();
    } else if (place > 0) {
        hidePlaceSelector();
        hideAnnouncement();
        fastForward(Date.parse(places[place].arrival.date+" "+places[place].arrival.time.split("+")[0]), Date.parse(places[place-1].arrival.date+" "+places[place-1].arrival.time.split("+")[0]));
        updateMedia(new Date(places[place-1].departure.date+" "+places[place-1].departure.time), new Date(places[place].arrival.date+" "+places[place].arrival.time));
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
            if (place > 0) timeouts.push(setTimeout(() => {
                reversedTransitionVideo.src = places[place].transitionVideo.split(".")[0] + "-reversed.mp4";
            }, 500));
            placeVideo.oncanplay = function() {
                loaded = true;
                reversedTransitionVideo.style.opacity = 0;
                placeVideo.oncanplay = null;
                showPlaceSelector();
            }
            transitionVideo.src = places[place+1].transitionVideo;
            transitioning = false;
            timeouts.push(setTimeout(function() {updateMedia(new Date(places[place].arrival.date+" "+places[place].arrival.time), new Date(places[place].departure.date+" "+places[place].departure.time));}, 500));
        }
    }
}

function jumpToPlace(placeID) {
    place = placeID;
    displayPlaceName(places[place].name);
    /* placeVideo.play(); */
    timeouts.push(setTimeout(() => {
        setClock(Date.parse(places[place].arrival.date+" "+places[place].arrival.time.split("+")[0]));
        placeVideo.src = places[place].video;
        loaded = false;
        placeVideo.oncanplay = function() {
            loaded = true;
            placeVideo.oncanplay = null;
            showPlaceSelector();
        }
        updateMedia(new Date(places[place].arrival.date+" "+places[place].arrival.time), new Date(places[place].departure.date+" "+places[place].departure.time));
        if (place < places.length-1) transitionVideo.src = places[place+1].transitionVideo;
        if (place > 0) reversedTransitionVideo.src = places[place].transitionVideo.split(".")[0] + "-reversed.mp4";
    }, 500));
}

function skipTransition() {
    hideAnnouncement();
    clearTimeouts();
    clearInterval(clockInterval);
    placeVideo.src = places[place].video;
    setClock(Date.parse(places[place].arrival.date+" "+places[place].arrival.time.split("+")[0]));
    loaded = false;
    placeVideo.oncanplay = function() {
        loaded = true;
        placeVideo.oncanplay = null;
        showPlaceSelector();
    }
    /* placeVideo.play(); */
    timeouts.push(setTimeout(() => {
        updateMedia(new Date(places[place].arrival.date+" "+places[place].arrival.time), new Date(places[place].departure.date+" "+places[place].departure.time));
        transitionVideo.style.opacity = 0;
        reversedTransitionVideo.style.opacity = 0;
        if (place < places.length-1) transitionVideo.src = places[place+1].transitionVideo;
        if (place > 0) reversedTransitionVideo.src = places[place].transitionVideo.split(".")[0] + "-reversed.mp4";
    }, 500));
    transitioning = false;
    displayPlaceName(places[place].name);
}

function clearTimeouts() {
    for (t of timeouts)
        clearTimeout(t);
    timeouts = [];
    placeVideo.oncanplay = null;
    transitionVideo.onended = null;
    reversedTransitionVideo.onended = null;
}