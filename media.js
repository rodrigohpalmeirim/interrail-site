function big(src) {
    document.getElementById("big-media").style.display = "block";
    document.getElementById("big-photo").style.display = "block";
    document.getElementById("big-photo").src = src;
}

document.onkeydown = function (e) {
    e = e || window.event;
    if (e.key == "Escape") {
        document.getElementById("big-media").style.display = "none";
        document.getElementById("big-photo").style.display = "none";
    }
};