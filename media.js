var pausedVideo;

function showMediaViewer(src, type) {
    let mediaViewer = document.getElementById("media-viewer");
    let bigVideo = document.getElementById("big-video");
    let bigPhoto = document.getElementById("big-photo");
    let cross = document.getElementById("cross");

    mediaViewer.style.display = "block";
    if (transitioning) {
        pauseClock();
        if (pausedVideo == null && !transitionVideo.paused) {
            transitionVideo.pause();
            pausedVideo = transitionVideo;
        } else if (pausedVideo == null && !reversedTransitionVideo.paused) {
            reversedTransitionVideo.pause();
            pausedVideo = reversedTransitionVideo;
        }
    }
    cross.style.display = "block";
    setTimeout(() => {
        cross.style.opacity = 1;
        mediaViewer.style.opacity = 1;
    }, 1);
    if (type == "photo") {
        bigVideo.src = "";
        bigVideo.style.display = "none";
        bigPhoto.src = src;
        bigPhoto.style.display = "block";
        setTimeout(() => {bigPhoto.style.opacity = 1;}, 1);
    } else if (type == "video") {
        bigPhoto.src = "";
        bigPhoto.style.display = "none";
        bigVideo.src = src;
        bigVideo.style.display = "block";
        setTimeout(() => {bigVideo.style.opacity = 1;}, 1);
    }

    document.onkeydown = function (e) {
        e = e || window.event;
        if (e.key == "Escape") {
            hideMediaViewer();
        }
    }
}

function hideMediaViewer() {
    let mediaViewer = document.getElementById("media-viewer");
    let bigVideo = document.getElementById("big-video");
    let bigPhoto = document.getElementById("big-photo");
    let cross = document.getElementById("cross");

    if (clockPaused) resumeClock();
        if (pausedVideo != null) {
            pausedVideo.play();
            pausedVideo = null;
        }
        bigPhoto.src = "";
        bigVideo.src = "";
        mediaViewer.style.opacity = 0;
        bigPhoto.style.opacity = 0;
        bigVideo.style.opacity = 0;
        cross.style.opacity = 0;
        setTimeout(() => {
            mediaViewer.style.display = "none";
            bigPhoto.style.display = "none";
            bigVideo.style.display = "none";
            cross.style.display = "none";
        }, 200);
        arrowKeyControl();
}

function updateMedia(startDate, endDate) {
    let media = document.querySelector("#media");
    let mediaPane = document.querySelector("#media-pane");
    let mediaViewer = document.querySelector("#media-viewer");
    let next = document.querySelector("#next");
    let cross = document.querySelector("#cross");
    media.innerHTML = "";
    for (let i=0; i<points.length && (new Date(points[i].date+" "+points[i].time)<endDate); i++) {
        if (new Date(points[i].date+" "+points[i].time)>startDate) {
            if (points[i].type == "photo")
                media.innerHTML += `<img class="thumbnail" src="`+"media/"+points[i].file+`" onclick="showMediaViewer('`+"media/"+points[i].file+`', 'photo')">`;
            else if (points[i].type == "video")
                media.innerHTML += `<div style="position: relative"><video class="thumbnail" src="`+"media/"+points[i].file+`" onclick="showMediaViewer('`+"media/"+points[i].file+`', 'video')"></video><img class="play-button" src="icons/play-button.png"></div>`;
        }
    }
    if (media.childElementCount == 0) {
        mediaPane.style.width = "0%";
        next.style.right = "1%";
    } else if (media.childElementCount < 5) {
        mediaPane.style.width = "15%";
        next.style.right = "16%";
        cross.style.right = "16%"
        mediaViewer.style.width = "85%";
        media.style.columnCount = 1;
    } else {
        mediaPane.style.width = "30%";
        next.style.right = "31%";
        cross.style.right = "31%";
        mediaViewer.style.width = "70%";
        media.style.columnCount = 2;
    }
}