var placeVideo = document.getElementById("place-video");
var transitionVideo = document.getElementById("transition-video");
var reversedTransitionVideo = document.getElementById("reversed-transition-video");
var touring = false;
var transitioning = false;
var loaded = false;
var timeouts = [];

window.mobileAndTabletcheck = function() {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};
if (!window.chrome || window.mobileAndTabletcheck())
    document.querySelector("#incompatibility-screen").style.display = "block";

document.onkeydown = function(e) {
    e = e || window.event;
    if (e.key == "T") {
        document.querySelector("#easter-egg").style.visibility = "visible";
        document.querySelector("#easter-egg").style.opacity = 1;
    }
}

function startTour() {
    touring = true;
    
    setClock(Date.parse(places[place].arrival.date+" "+places[place].arrival.time));
    updateMedia(new Date(places[place].arrival.date+" "+places[place].arrival.time), new Date(places[place].departure.date+" "+places[place].departure.time));
    updateNavigationArrows();
    
    displayDay(1);
    setTimeout(() => {
        document.querySelector("#tour").style.display = "block";
        clearTimeouts();
    }, 500);
    setTimeout(() => {
        jumpToPlace(0);
        arrowKeyControl();
        placeVideo.play();
    }, 2800);
    placeVideo.addEventListener("canplay", function() {placeVideo.play();});
}

function arrowKeyControl() {
    document.onkeydown = function(e) {
        e = e || window.event;
        if (e.key == "ArrowRight") {
            nextPlace();
        } else if (e.key == "ArrowLeft") {
            previousPlace();
        } else if (e.key == "Escape") {
            collapsePlaceSelector();
        }
    }
}

function nextPlace() {
    if (transitioning) {
        place++;
        skipTransition();
    } else if (place < places.length-1) {
        transitioning = true;
        hidePlaceSelector();
        hideAnnouncement();
        fastForward(Date.parse(places[place].departure.date+" "+places[place].departure.time.split("+")[0]), Date.parse(places[place+1].arrival.date+" "+places[place+1].arrival.time.split("+")[0]));
        updateMedia(new Date(places[place].departure.date+" "+places[place].departure.time), new Date(places[place+1].arrival.date+" "+places[place+1].arrival.time));
        timeouts.push(setTimeout(() => {placeVideo.pause();}, 500));
        transitionVideo.play();
        transitionVideo.style.opacity = 1;
        transitionVideo.onended = function() {
            place++;
            loaded = false;
            displayPlaceName(places[place]);
            /* placeVideo.play(); */
            placeVideo.src = places[place].video;
            if (place < places.length-1) timeouts.push(setTimeout(() => {transitionVideo.src = places[place+1].transitionVideo;}, 500));
            placeVideo.oncanplay = function() {
                loaded = true;
                transitionVideo.style.opacity = 0;
                placeVideo.oncanplay = null;
                showPlaceSelector();
            };
            reversedTransitionVideo.src = places[place].reversedTransitionVideo;
            transitioning = false;
            updateNavigationArrows();
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
        transitioning = true;
        hidePlaceSelector();
        hideAnnouncement();
        fastForward(Date.parse(places[place].arrival.date+" "+places[place].arrival.time.split("+")[0]), Date.parse(places[place-1].arrival.date+" "+places[place-1].arrival.time.split("+")[0]));
        updateMedia(new Date(places[place-1].departure.date+" "+places[place-1].departure.time), new Date(places[place].arrival.date+" "+places[place].arrival.time));
        place--;
        timeouts.push(setTimeout(() => {placeVideo.pause();}, 500));
        reversedTransitionVideo.play();
        reversedTransitionVideo.style.opacity = 1;
        reversedTransitionVideo.onended = function() {
            /* placeVideo.play(); */
            placeVideo.src = places[place].video;
            displayPlaceName(places[place]);
            loaded = false;
            if (place > 0) timeouts.push(setTimeout(() => {
                reversedTransitionVideo.src = places[place].reversedTransitionVideo;
            }, 500));
            placeVideo.oncanplay = function() {
                loaded = true;
                reversedTransitionVideo.style.opacity = 0;
                placeVideo.oncanplay = null;
                showPlaceSelector();
            }
            transitionVideo.src = places[place+1].transitionVideo;
            transitioning = false;
            updateNavigationArrows();
            timeouts.push(setTimeout(function() {updateMedia(new Date(places[place].arrival.date+" "+places[place].arrival.time), new Date(places[place].departure.date+" "+places[place].departure.time));}, 500));
        }
    }
}

function jumpToPlace(placeID) {
    place = placeID;
    displayPlaceName(places[place]);
    /* placeVideo.play(); */
    timeouts.push(setTimeout(() => {
        updateNavigationArrows();
        setClock(Date.parse(places[place].arrival.date+" "+places[place].arrival.time.split("+")[0]));
        placeVideo.src = places[place].video;
        loaded = false;
        placeVideo.oncanplay = function() {
            loaded = true;
            placeVideo.oncanplay = null;
            showPlaceSelector();
        }
        updateMedia(new Date(places[place].arrival.date+" "+places[place].arrival.time), new Date(places[place].departure.date+" "+places[place].departure.time));
        transitionVideo.style.opacity = 0;
        reversedTransitionVideo.style.opacity = 0;
        if (place < places.length-1) transitionVideo.src = places[place+1].transitionVideo;
        if (place > 0) reversedTransitionVideo.src = places[place].reversedTransitionVideo;
    }, 500));
}

function skipTransition() {
    hideAnnouncement();
    clearTimeouts();
    clearInterval(clockInterval);
    jumpToPlace(place);
    transitioning = false;
}

function clearTimeouts() {
    for (t of timeouts)
        clearTimeout(t);
    timeouts = [];
    placeVideo.oncanplay = null;
    transitionVideo.onended = null;
    reversedTransitionVideo.onended = null;
}