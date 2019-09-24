function big(src) {
    document.getElementById("big-photo").src = src;
    document.getElementById("media-viewer").style.display = "block";
    setTimeout(() => {document.getElementById("media-viewer").style.opacity = 1;}, 1);
    document.getElementById("big-photo").style.display = "block";
    setTimeout(() => {document.getElementById("big-photo").style.opacity = 1;}, 1);

    document.onkeydown = function (e) {
        e = e || window.event;
        if (e.key == "Escape") {
            document.getElementById("media-viewer").style.opacity = 0;
            setTimeout(() => {document.getElementById("media-viewer").style.display = "none";}, 200);
            document.getElementById("big-photo").style.opacity = 0;
            setTimeout(() => {document.getElementById("big-photo").style.display = "none";}, 200);
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
        if (new Date(points[i].date+" "+points[i].time)>startDate && (points[i].type == "photo" || points[i].type == "video")) {
            media.innerHTML += `<img class="thumbnail" src="`+"media/"+points[i].file+`" onclick="big('`+"media/"+points[i].file+`')">`;
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