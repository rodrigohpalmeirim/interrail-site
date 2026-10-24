# Interrail 2019

An interactive web album of a three-week Interrail trip in August 2019: Lisbon → Paris → London → Amsterdam → Copenhagen → Berlin → Munich → Zurich → Lisbon. Built in 2019 in plain HTML, CSS and JavaScript.

**Visit: [rodrigohpalmeirim.github.io/interrail-site](https://rodrigohpalmeirim.github.io/interrail-site)** (desktop Chrome only)

> This project is finished and no longer maintained.

## Features

The title screen shows a few randomly picked photos and three sections:

- **Gallery**: every photo and video from the trip in a justified grid with lazy-loaded thumbnails and a full-screen viewer.
- **Tour**: a chronological walk through about 60 stops. Each stop has a looping background video, an animated transition video to the next stop, an animated "Day N" / place-name announcement, a clock showing the local date, time and timezone (it fast-forwards between stops), and a side pane with the photos and videos taken there. Navigate with the on-screen arrows, the <kbd>←</kbd>/<kbd>→</kbd> keys, or the place selector.
- **Map** (left unfinished, marked "Work in Progress"): a Google Map of the GPS route, with segments coloured by speed (walking vs. transport) and clickable markers.

## How it works

- Trip data lives in JavaScript files: `places.js` (stops with arrival/departure times and video URLs), `points.js` (GPS points), `media-items.js` (photo/video metadata) and `gallery-media.js` (the gallery markup).
- Thumbnails are in `media/thumbnails/`; full-size photos and the videos are hosted on Google Drive and fetched through the Drive API.
- Uses the Google Maps JavaScript API for the map and [anime.js](https://animejs.com/) for the animated day and place-name announcements.

## Run locally

It's a static site with no build step:

```sh
git clone https://github.com/rodrigohpalmeirim/interrail-site.git
cd interrail-site
python3 -m http.server 8000
# open http://localhost:8000 in Chrome on a desktop
```
