var pausedVideo;
var temp;
var currentItem;

pinPhotos();

function pinPhotos() {
    let pinnedPhotos = document.querySelectorAll(".pinned-photo");
    let categories = [nature, urban, urban, us];

    for (p of pinnedPhotos) {
        category = Math.floor(Math.random()*categories.length);
        photo = Math.floor(Math.random()*categories[category].length);
        for (item of mediaItems) {
            if (item.file == categories[category][photo]) {
                p.src = item.url;
                break;
            }
        }
        categories[category].splice(photo, 1); // Attention
        categories.splice(category, 1);
        p.onload = function() {this.style.opacity = 1;}
    }
}

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
                    <img class="lazyload thumbnail" data-src="`+"media/thumbnails/"+mediaItems[i].file+`" big-src="`+mediaItems[i].url+`" type="photo" onclick="showMediaViewer(this.parentElement)">
                </div>`;
        else if (mediaItems[i].type == "video")
            media.innerHTML += `
                <div style="--w: `+mediaItems[i].width+`; --h: `+mediaItems[i].height+`; position: relative;">
                    <img class="lazyload thumbnail" data-src="`+"media/thumbnails/"+mediaItems[i].file.replace(".mp4", ".jpg")+`" big-src="`+mediaItems[i].url+`" type="video" onclick="showMediaViewer(this.parentElement)"><img class="play-button" src="icons/play-button.png">
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
        bigPhoto.src = "";
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
        } else if (e.key == "ArrowLeft") {
            previousItem();
        } else if (e.key == "ArrowRight") {
            nextItem();
        }
    }
}

function previousItem() {
    if (currentItem.previousElementSibling) {
        showMediaViewer(currentItem.previousElementSibling);
    }
}
function nextItem() {
    if (currentItem.nextElementSibling) {
        showMediaViewer(currentItem.nextElementSibling);
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

        if (touring)
            arrowKeyControl();
        else
            document.onkeydown = null;
}

function updateMedia(startDate, endDate) {
    let media = document.querySelector("#media-pane .media");
    let mediaPane = document.querySelector("#media-pane");
    let mediaViewer = document.querySelector("#media-viewer");
    let nextPlace = document.querySelector("#next-place");
    let nextItem = document.querySelector("#next-item");
    media.innerHTML = "";
    for (let i=0; i<mediaItems.length; i++) {
        if (new Date(mediaItems[i].date+" "+mediaItems[i].time)>startDate && (new Date(mediaItems[i].date+" "+mediaItems[i].time)<endDate)) {
            if (mediaItems[i].type == "photo")
                media.innerHTML += `
                    <div style="--w: `+mediaItems[i].width+`; --h: `+mediaItems[i].height+`">
                        <img class="thumbnail" src="`+"media/thumbnails/"+mediaItems[i].file+`" big-src="`+mediaItems[i].url+`" type="photo" onclick="showMediaViewer(this.parentElement)">
                    </div>`;
            else if (mediaItems[i].type == "video")
                media.innerHTML += `
                    <div style="--w: `+mediaItems[i].width+`; --h: `+mediaItems[i].height+`; position: relative;">
                        <img class="thumbnail" src="`+"media/thumbnails/"+mediaItems[i].file.replace("mp4", "jpg")+`" big-src="`+mediaItems[i].url+`" type="video" onclick="showMediaViewer(this.parentElement)"><img class="play-button" src="icons/play-button.png">
                    </div>`;
        }
    }
    if (media.childElementCount == 0) {
        mediaPane.style.width = "0%";
        nextPlace.style.right = "20px";
    } else if (media.childElementCount < 5) {
        mediaPane.style.width = "15%";
        nextPlace.style.right = "calc(15% + 20px)";
        mediaViewer.style.width = "85%";
        media.style.columnCount = 1;
    } else {
        mediaPane.style.width = "30%";
        nextPlace.style.right = "calc(30% + 20px)";
        mediaViewer.style.width = "70%";
        media.style.columnCount = 2;
    }
}