function big(src) {
    document.getElementById("media-viewer").style.display = "block";
    document.getElementById("big-photo").style.display = "block";
    document.getElementById("big-photo").src = src;
}

document.onkeydown = function (e) {
    e = e || window.event;
    if (e.key == "Escape") {
        document.getElementById("media-viewer").style.display = "none";
        document.getElementById("big-photo").style.display = "none";
    }
};