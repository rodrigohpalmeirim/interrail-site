var pausedVideo;
var temp;
function showGallery() {
    let media = document.querySelector("#gallery .media");

    document.querySelector("#media-viewer").style.width = "100%";

    document.querySelector("#gallery").style.display = "block";
    setTimeout(() => {document.querySelector("#gallery").style.opacity = 1;}, 10);

    media.innerHTML = galleryMedia;
    lazyload();
    /* let i = 0;
    temp = setInterval(() => {
        if (mediaItems[i].type == "photo")
            media.innerHTML += `
                <div style="--w: `+mediaItems[i].width+`; --h: `+mediaItems[i].height+`">
                    <img class="lazyload thumbnail" data-src="`+"media/thumbnails/"+mediaItems[i].file+`" onclick="showMediaViewer('`+"media/"+mediaItems[i].file+`', 'photo')">
                </div>`;
        else if (mediaItems[i].type == "video")
            media.innerHTML += `
                <div style="--w: `+mediaItems[i].width+`; --h: `+mediaItems[i].height+`; position: relative;">
                    <img class="lazyload thumbnail" data-src="`+"media/thumbnails/"+mediaItems[i].file.replace(".mp4", ".jpg")+`" onclick="showMediaViewer('`+"media/"+mediaItems[i].file+`', 'video')"><img class="play-button" src="icons/play-button.png">
                </div>`;
        if (i++ + 1 >= mediaItems.length) {
            clearInterval(temp);
            lazyload();
        }
    }, 0); */
}

function showMediaViewer(element) {
    let mediaViewer = document.getElementById("media-viewer");
    let bigVideo = document.getElementById("big-video");
    let bigPhoto = document.getElementById("big-photo");
    let src = element.firstElementChild.getAttribute("big-src");
    let type = element.firstElementChild.getAttribute("type");
    let previous = document.querySelector("#previous-item");
    let next = document.querySelector("#next-item");

    currentItem = element;

    if (currentItem.previousElementSibling)
        previous.style.opacity = 1;
    else
        previous.style.opacity = 0;

    if (currentItem.nextElementSibling)
        next.style.opacity = 1;
    else
        next.style.opacity = 0;

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
    setTimeout(() => {
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
        setTimeout(() => {
            mediaViewer.style.display = "none";
            bigPhoto.style.display = "none";
            bigVideo.style.display = "none";
        }, 200);
        arrowKeyControl();
}

function updateMedia(startDate, endDate) {
    let media = document.querySelector("#media-pane .media");
    let mediaPane = document.querySelector("#media-pane");
    let mediaViewer = document.querySelector("#media-viewer");
    let next = document.querySelector("#next");
    media.innerHTML = "";
    for (let i=0; i<mediaItems.length && (new Date(mediaItems[i].date+" "+mediaItems[i].time)<endDate); i++) {
        if (new Date(mediaItems[i].date+" "+mediaItems[i].time)>startDate) {
            if (mediaItems[i].type == "photo")
                media.innerHTML += `
                    <div style="--w: `+mediaItems[i].width+`; --h: `+mediaItems[i].height+`">
                        <img class="thumbnail" src="`+"media/thumbnails/"+mediaItems[i].file+`" big-src="media/`+mediaItems[i].file+`" type="photo" onclick="showMediaViewer(this.parentElement)">
                    </div>`;
            else if (mediaItems[i].type == "video")
                media.innerHTML += `
                    <div style="--w: `+mediaItems[i].width+`; --h: `+mediaItems[i].height+`; position: relative;">
                        <img class="thumbnail" src="`+"media/thumbnails/"+mediaItems[i].file.replace("mp4", "jpg")+`" big-src="media/`+mediaItems[i].file+`" type="video" onclick="showMediaViewer(this.parentElement)"><img class="play-button" src="icons/play-button.png">
                    </div>`;
        }
    }
    if (media.childElementCount == 0) {
        mediaPane.style.width = "0%";
        next.style.right = "1%";
    } else if (media.childElementCount < 5) {
        mediaPane.style.width = "15%";
        next.style.right = "16%";
        mediaViewer.style.width = "85%";
        media.style.columnCount = 1;
    } else {
        mediaPane.style.width = "30%";
        next.style.right = "31%";
        mediaViewer.style.width = "70%";
        media.style.columnCount = 2;
    }
}