function big(src, type) {
    document.getElementById("media-viewer").style.display = "block";
    setTimeout(() => {document.getElementById("media-viewer").style.opacity = 1;}, 1);
    if (type == "photo") {
        document.getElementById("big-video").src = "";
        document.getElementById("big-video").style.display = "none";
        document.getElementById("big-photo").src = src;
        document.getElementById("big-photo").style.display = "block";
        setTimeout(() => {document.getElementById("big-photo").style.opacity = 1;}, 1);
    } else if (type == "video") {
        document.getElementById("big-photo").src = "";
        document.getElementById("big-photo").style.display = "none";
        document.getElementById("big-video").src = src;
        document.getElementById("big-video").style.display = "block";
        setTimeout(() => {document.getElementById("big-video").style.opacity = 1;}, 1);
    }

    document.onkeydown = function (e) {
        e = e || window.event;
        if (e.key == "Escape") {
            document.getElementById("big-photo").src = "";
            document.getElementById("big-video").src = "";
            document.getElementById("media-viewer").style.opacity = 0;
            setTimeout(() => {document.getElementById("media-viewer").style.display = "none";}, 200);
            document.getElementById("big-photo").style.opacity = 0;
            setTimeout(() => {document.getElementById("big-photo").style.display = "none";}, 200);
            document.getElementById("big-video").style.opacity = 0;
            setTimeout(() => {document.getElementById("big-video").style.display = "none";}, 200);
            arrowKeyControl();
        }
    }
}

function updateMedia(startDate, endDate) {
    media = document.querySelector("#media");
    mediaPane = document.querySelector("#media-pane");
    mediaViewer = document.querySelector("#media-viewer");
    media.innerHTML = "";
    for (let i=0; i<points.length && (new Date(points[i].date+" "+points[i].time)<endDate); i++) {
        if (new Date(points[i].date+" "+points[i].time)>startDate) {
            if (points[i].type == "photo")
                media.innerHTML += `<img class="thumbnail" src="`+"media/"+points[i].file+`" onclick="big('`+"media/"+points[i].file+`', 'photo')">`;
            else if (points[i].type == "video")
                media.innerHTML += `<div style="position: relative"><video class="thumbnail" src="`+"media/"+points[i].file+`" onclick="big('`+"media/"+points[i].file+`', 'video')"></video><img class="play-button" src="icons/play-button.png"></div>`;
        }
    }
    if (media.childElementCount == 0)
        mediaPane.style.width = "0%";
    else if (media.childElementCount < 5) {
        mediaPane.style.width = "15%";
        mediaViewer.style.width = "85%";
        media.style.columnCount = 1;
    } else {
        mediaPane.style.width = "30%";
        mediaViewer.style.width = "70%";
        media.style.columnCount = 2;
    }
}