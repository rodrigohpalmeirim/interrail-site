/**
 * Handy functions to project lat/lng to pixel
 * Extracted from: https://developers.google.com/maps/documentation/javascript/examples/map-coordinates
 **/
function project(latLng) {
	var TILE_SIZE = 256

	var siny = Math.sin(latLng.lat() * Math.PI / 180)

	// Truncating to 0.9999 effectively limits latitude to 89.189. This is
	// about a third of a tile past the edge of the world tile.
	siny = Math.min(Math.max(siny, -0.9999), 0.9999)

	return new google.maps.Point(
		TILE_SIZE * (0.5 + latLng.lng() / 360),
		TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI)))
}

/**
 * Handy functions to project lat/lng to pixel
 * Extracted from: https://developers.google.com/maps/documentation/javascript/examples/map-coordinates
 **/
function getPixel(latLng, zoom) {
	var scale = 1 << zoom
	var worldCoordinate = project(latLng)
	return new google.maps.Point(
            Math.floor(worldCoordinate.x * scale),
            Math.floor(worldCoordinate.y * scale))
}

/**
 * Given a map, return the map dimension (width and height)
 * in pixels.
 **/
function getMapDimenInPixels(map) {
	var zoom = map.getZoom()
	var bounds = map.getBounds()
	var southWestPixel = getPixel(bounds.getSouthWest(), zoom)
	var northEastPixel = getPixel(bounds.getNorthEast(), zoom)
	return {
		width: Math.abs(southWestPixel.x - northEastPixel.x),
		height: Math.abs(southWestPixel.y - northEastPixel.y)
	}
}

/**
 * Given a map and a destLatLng returns true if calling
 * map.panTo(destLatLng) will be smoothly animated or false
 * otherwise.
 *
 * optionalZoomLevel can be optionally be provided and if so
 * returns true if map.panTo(destLatLng) would be smoothly animated
 * at optionalZoomLevel.
 **/
function willAnimatePanTo(map, destLatLng, optionalZoomLevel) {
	var dimen = getMapDimenInPixels(map)

	var mapCenter = map.getCenter()
	optionalZoomLevel = !!optionalZoomLevel ? optionalZoomLevel : map.getZoom()

	var destPixel = getPixel(destLatLng, optionalZoomLevel)
	var mapPixel = getPixel(mapCenter, optionalZoomLevel)
	var diffX = Math.abs(destPixel.x - mapPixel.x)
	var diffY = Math.abs(destPixel.y - mapPixel.y)

	return diffX < dimen.width && diffY < dimen.height
}

var listener

function zoomIn(finalZoom) {
	if (map.getZoom() < finalZoom) {
		map.setZoom(Math.min(map.getZoom() + 3, finalZoom))
	} else {
		google.maps.event.removeListener(listener)

		//here you should (re?)enable only the ui controls that make sense to your app 
		map.setOptions({draggable: true, zoomControl: true, scrollwheel: true, disableDoubleClickZoom: false})
	}
}

function zoomOut(map, destLatLng, finalZoom) {
	if (willAnimatePanTo(map, destLatLng)) {
		if (map.getZoom() > finalZoom) {
			map.setZoom(Math.max(map.getZoom() - 3, finalZoom))
		} else {
			map.panTo(destLatLng)
			google.maps.event.removeListener(listener)
			listener = google.maps.event.addListener(map, 'idle', function() {zoomIn(finalZoom)})
		}
	} else {
		if (willAnimatePanTo(map, destLatLng, map.getZoom() - 1))
			map.setZoom(map.getZoom() - 1)
		else if (willAnimatePanTo(map, destLatLng, map.getZoom() - 2))
			map.setZoom(map.getZoom() - 2)
		else
			map.setZoom(map.getZoom() - 3)
	}
}

/**
 * Given a map and a destLatLng, smoothly animates the map center to
 * destLatLng by zooming out until distance (in pixels) between map center
 * and destLatLng are less than map width and height, then panTo to destLatLng
 * and finally animate to restore the initial zoom.
 *
 * optionalAnimationEndCallback can be optionally be provided and if so
 * it will be called when the animation ends
 **/
function smoothlyAnimatePanTo(map, destLatLng, finalZoom, optionalAnimationEndCallback) {
	//here you should disable all the ui controls that your app uses
	map.setOptions({draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true})
	listener = google.maps.event.addListener(map, 'idle', function() {zoomOut(map, destLatLng, finalZoom)})
	zoomOut(map, destLatLng, finalZoom)
}