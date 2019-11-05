var map;

function showMap() {
    document.querySelector("#map").style.display = "block";
    document.querySelector("#wip").style.animation = "blink 1s ease 0s infinite alternate";
}

function initMap() {
    var home = { lat: 38.761012, lng: -9.164653 };
    var markers = [];
    var lines = [];

    var colors = { walking: "#0066cc", other: "#f92672" };
    var icons = {
        photo: {
            url: "icons/camera-pin.png",
            scaledSize: new google.maps.Size(40, 40),
        },
        video: {
            url: "icons/video-pin.png",
            scaledSize: new google.maps.Size(40, 40),
        }
    }

    map = new google.maps.Map(document.getElementById('map'), {
        center: home,
        zoom: 5
    });

    /* for (let i=0; i<images.length-1; i++) {
        var marker = new google.maps.Marker({
            position: images[i].coordinates,
            icon: icons["camera"],
            map: map
        });
    } */
    
    for (let i = 0; i < points.length - 1; i++) {
        if (points[i].coordinates) {
            var interval = (Date.parse(points[i + 1].date + " " + points[i + 1].time) - Date.parse(points[i].date + " " + points[i].time)) / 1000; // seconds
            var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(points[i].coordinates), new google.maps.LatLng(points[i + 1].coordinates)); //meters
            var speed = (distance / 1000) / (interval / 3600); // km/h
    
            addLine([points[i].coordinates, points[i + 1].coordinates], map, (speed < 7) ? colors["walking"] : colors["other"], (interval < 3600) ? 1 : 0.3);
    
            addMarker(points[i].coordinates, null, points[i].type);
    
            markers[i].addListener('click', function () {
                console.log(points[i].date + " " + points[i].time);
                let infowindow = new google.maps.InfoWindow({
                    content: points[i].date + " " + points[i].time
                });
                infowindow.open(map, markers[i]);
            });
        }
    }

    /* var j = 0;
    map.addListener('click', function () {
        smoothlyAnimatePanTo(map, new google.maps.LatLng(places[j++].coordinates), 15)
    }); */


    /* Functions */

    function addMarker(position, map, type) {
        var marker = new google.maps.Marker({
            position: position,
            map: map,
            type: type,
            icon: icons[type]
        });
        markers.push(marker);
    }

    function addLine(points, map, color, opacity) {
        var line = new google.maps.Polyline({
            path: points,
            geodesic: true,
            strokeColor: color,
            strokeOpacity: opacity,
            strokeWeight: 2,
            map: map
        });

        lines.push(line);
    }

    map.addListener('zoom_changed', function () {
        if (map.zoom > 15) {
            for (var m of markers)
                m.setMap(map);
        } else {
            for (var m of markers)
                m.setMap();
        }
    });

    /* for (var i=0; i<missingPoints.length; i++) {
        if (missingPoints[i].coordinates) {
            missingPoints[i].coordinates = ParseDMS(missingPoints[i].coordinates.lat + " " + missingPoints[i].coordinates.lng);
        }
    }
    console.log(JSON.stringify(missingPoints))

    function ParseDMS(input) {
        var parts = input.split(/\s+/);
        var lat = ConvertDMSToDD(parts[0], parts[1], parts[2], parts[3]);
        var lng = ConvertDMSToDD(parts[4], parts[5], parts[6], parts[7]);
        return {lat: lat, lng: lng};
    }

    function ConvertDMSToDD(degrees, minutes, seconds, direction) {
        var dd = Number(degrees) + Number(minutes)/60 + Number(seconds)/(60*60);
    
        if (direction == "S" || direction == "W") {
            dd = dd * -1;
        } // Don't do anything for N or E
        return dd;
    } */

    /* map.addListener('center_changed', function() {
        console.log(map.center.lat());
    }); */
}