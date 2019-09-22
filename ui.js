
function displayDay(day) {
    text = document.querySelector("#day-text");
    announcement = document.querySelector("#day-announcement");
    
    announcement.style.display = "block";
    text.textContent = "DAY " + day;
    var textWrapper = document.querySelector('.ml1 .letters'); // Wrap every letter in a span
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    setTimeout(() => {announcement.style.opacity = 1;}, 10);

    setTimeout(() => {
        /* text.style.opacity = 1; */
        anime.timeline({})
            .add({
                targets: '.ml1 .letter',
                scale: [0.3, 1],
                opacity: [0, 1],
                translateZ: 0,
                easing: "easeOutExpo",
                duration: 600,
                delay: (el, i) => 70 * (i + 1)
            }).add({
                targets: '.ml1 .line',
                scaleX: [0, 1],
                opacity: [0.5, 1],
                easing: "easeOutExpo",
                duration: 700,
                offset: '-=875',
                delay: (el, i, l) => 80 * (l - i)
            })/* .add({
                targets: '.ml1',
                opacity: 0,
                duration: 1000,
                easing: "easeOutExpo",
                delay: 1000
            }) */;
    }, 500);
    setTimeout(() => {announcement.style.opacity = 0;}, 2500);
    setTimeout(() => {
        announcement.style.display = "none";
        text.style.opacity = 0;
    }, 3000);
    
}

setTimeout(() => {displayDay(1);}, 1000);