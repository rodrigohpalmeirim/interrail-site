var place = 0;
var placeVideo = document.getElementById("place-video");
var transitionVideo = document.getElementById("transition-video");
var transitioning = false;

function arrowKeyControl() {
    document.onkeydown = function (e) {
        e = e || window.event;
        if (e.key == "ArrowRight") {
            if (transitioning) {
                placeVideo.src = places[++place].video;
                transitionVideo.style.display = "none";
                transitioning = false;
                clearTimeout(timeout);
            } else {
                transitioning = true;
                transitionVideo.src = places[place+1].transitionVideo;
                placeVideo.src = places[place+1].video;
                transitionVideo.style.display = "block";
                timeout = setTimeout(() => {
                    place++;
                    transitionVideo.style.display = "none";
                    transitioning = false;
                }, 5000);
            }
        } else if (e.key == "ArrowLeft") {
            if (transitioning) {
                placeVideo.src = places[place].video;
                transitionVideo.style.display = "none";
                transitioning = false;
                clearTimeout(timeout);
            } else {
                transitioning = true;
                transitionVideo.src = places[place--].transitionVideo.split(".")[0] + "-reversed.mp4";
                placeVideo.src = places[place].video;
                transitionVideo.style.display = "block";
                timeout = setTimeout(() => {
                    transitionVideo.style.display = "none";
                    transitioning = false;
                }, 5000);
            }
        }
    }
}
arrowKeyControl();