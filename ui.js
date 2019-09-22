
function displayDay(day) {
    let text = document.querySelector("#day-text");
    let announcement = document.querySelector("#announcement");
    
    document.querySelector(".ml1").style.opacity = 1;
    announcement.style.display = "block";
    announcement.style.backgroundColor = "#1f273c";
    text.textContent = "DAY " + day;
    let textWrapper = document.querySelector('.ml1 .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>"); // Wrap every letter in a span

    setTimeout(() => {announcement.style.opacity = 1;}, 50);

    timeouts.push(setTimeout(() => {
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
    }, 500));

    timeouts.push(setTimeout(() => {hideAnnouncement();}, 2500));
}

setTimeout(() => {displayPlaceName(places[0].name);}, 2000);


function displayPlaceName(name) {
    let text = document.querySelector("#place-name");
    let announcement = document.querySelector("#announcement");

    document.querySelector(".ml11").style.opacity = 1;
    announcement.style.display = "block";
    announcement.style.backgroundColor = "#206490";
    document.querySelector(".spinner").style.opacity = 0;
    text.textContent = name;

    setTimeout(() => {announcement.style.opacity = 1;}, 50);

    var textWrapper = document.querySelector('.ml11 .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"); // Wrap every letter in a span

    timeouts.push(setTimeout(() => {
        anime.timeline({})
            .add({
                targets: '.ml11 .line',
                scaleY: [0,1],
                opacity: [0.5,1],
                easing: "easeOutExpo",
                duration: 700
            }).add({
                targets: '.ml11 .line',
                translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 10],
                easing: "easeOutExpo",
                duration: 700,
                delay: 100
            }).add({
                targets: '.ml11 .letter',
                opacity: [0,1],
                easing: "easeOutExpo",
                duration: 600,
                offset: '-=775',
                delay: (el, i) => 30 * (i+1)
            }).add({
                targets: '.ml11 .line',
                opacity: 0,
                duration: 700,
                easing: "easeOutExpo"
            });
        }, 500));
        
        timeouts.push(setTimeout(() => {
            if (loaded) {
                timeouts.push(setTimeout(() => {hideAnnouncement();}, 500));
            } else {
                anime.timeline().add({
                    targets: '.spinner',
                    opacity: [0,1],
                    duration: 300,
                    easing: "easeInExpo"
                });
                timeouts.push(setTimeout(() => {
                    let interval = setInterval(() => {
                        if (loaded) {
                            hideAnnouncement();
                            clearInterval(interval);
                        }
                    }, 100);
                }, 500));
            }
        }, 2500));
}

function hideAnnouncement() {
    let announcement = document.querySelector("#announcement");
    announcement.style.opacity = 0;
    timeouts.push(setTimeout(() => {
        announcement.style.display = "none";
        document.querySelector(".ml1").style.opacity = 0;
        document.querySelector(".ml11").style.opacity = 0;
        document.querySelector(".spinner").style.opacity = 0;
        document.querySelector(".line1").style.opacity = 0;
        document.querySelector(".line2").style.opacity = 0;
    }, 500));
}