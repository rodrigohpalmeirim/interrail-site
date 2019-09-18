function big(src) {
    document.getElementById("big-photo").src = src;
    document.getElementById("media-viewer").style.display = "block";
    setTimeout(() => {document.getElementById("media-viewer").style.opacity = 1;}, 1);
    document.getElementById("big-photo").style.display = "block";
    setTimeout(() => {document.getElementById("big-photo").style.opacity = 1;}, 1);
}

document.onkeydown = function (e) {
    e = e || window.event;
    if (e.key == "Escape") {
        document.getElementById("media-viewer").style.opacity = 0;
        setTimeout(() => {document.getElementById("media-viewer").style.display = "none";}, 200);
        document.getElementById("big-photo").style.opacity = 0;
        setTimeout(() => {document.getElementById("big-photo").style.display = "none";}, 200);
    }
};