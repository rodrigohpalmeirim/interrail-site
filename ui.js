var place = 0;

showPlaceSelector();

document.addEventListener("click", function(e) {
    if (e.target.id == "current-place") {
        expandPlaceSelector();
    } else {
        collapsePlaceSelector();
    }
});

function expandPlaceSelector() {
    let placeSelector = document.querySelector("#place-selector");
    let currentPlace = document.querySelector("#current-place");
    let previousPlaces = document.querySelector("#previous-places");
    placeSelector.style.height = "235px";
    placeSelector.style.overflow = "scroll";
    placeSelector.scrollTo(0, previousPlaces.scrollHeight-100);
    placeSelector.style.backgroundColor = "#206490";
    currentPlace.style.backgroundColor = "rgba(0,0,0,0.2)";
}

function collapsePlaceSelector() {
    let placeSelector = document.querySelector("#place-selector");
    let currentPlace = document.querySelector("#current-place");
    let previousPlaces = document.querySelector("#previous-places");
    setTimeout(() => {placeSelector.scrollTo(0, previousPlaces.scrollHeight);}, 50);
    setTimeout(() => {placeSelector.scrollTo(0, previousPlaces.scrollHeight);}, 320);
    placeSelector.style.height = "";
    placeSelector.style.overflow = "hidden";
    setTimeout(() => {
        placeSelector.style.backgroundColor = "";
        currentPlace.style.backgroundColor = "rgba(0,0,0,0)";
    }, 300);
}

function showPlaceSelector() {
    let placeSelector = document.querySelector("#place-selector");
    placeSelector.innerHTML = `<div id="previous-places"></div>`;
    let previousPlaces = document.querySelector("#previous-places");
    let i = 0;
    for (; i<place; i++)
        previousPlaces.innerHTML += `<span class="place-name" onclick="jumpToPlace(`+i+`)">`+places[i].name+`</span>`;
    placeSelector.innerHTML += `<span id="current-place">`+places[i].name+`</span>`;
    for (i++; i<places.length; i++)
        placeSelector.innerHTML += `<span class="place-name" onclick="jumpToPlace(`+i+`)">`+places[i].name+`</span>`;
    placeSelector.scrollTo(0, document.querySelector("#previous-places").scrollHeight);
    placeSelector.style.opacity = "";
    placeSelector.style.pointerEvents = "";
}

function hidePlaceSelector() {
    document.querySelector("#place-selector").style.opacity = 0;
    document.querySelector("#place-selector").style.pointerEvents = "none";
}

function updateNavigationArrows() {
    let previous = document.querySelector("#previous");
    let next = document.querySelector("#next");
    if (place == 0 && !transitioning) {
        previous.style.opacity = 0;
        previous.style.pointerEvents = "none";
        next.style.opacity = 1;
        next.style.pointerEvents = "";
    } else if (place == places.length-1 && !transitioning) {
        previous.style.opacity = 1;
        previous.style.pointerEvents = "";
        next.style.opacity = 0;
        next.style.pointerEvents = "none";
    } else {
        previous.style.opacity = 1;
        previous.style.pointerEvents = "";
        next.style.opacity = 1;
        next.style.pointerEvents = "";
    }
}

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

function displayPlaceName(name) {
    let text = document.querySelector("#place-name");
    let announcement = document.querySelector("#announcement");

    document.querySelector(".ml11").style.opacity = 1;
    announcement.style.display = "block";
    announcement.style.backgroundColor = "#206490";
    document.querySelector(".spinner").style.opacity = 1;
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
                /* anime.timeline().add({
                    targets: '.spinner',
                    opacity: [0,1],
                    duration: 300,
                    easing: "easeInExpo"
                }); */
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