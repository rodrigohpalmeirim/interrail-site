function displayDay(day) {
    text = document.querySelector("#day-text");
    announcement = document.querySelector("#day-announcement");

    text.textContent = "Day " + day;
    announcement.style.display = "block";
    setTimeout(() => {announcement.style.opacity = 1;}, 10);

    setTimeout(() => {text.style.opacity = 1;}, 500);
    setTimeout(() => {announcement.style.opacity = 0;}, 2500);
    setTimeout(() => {
        announcement.style.display = "none";
        text.style.opacity = 0;
    }, 3000);
}

setTimeout(() => {displayDay(1);}, 1000);