import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";
import { readFileFromWeb } from './input.js'
import { UCS } from './UCS.js';

var routeMarkers = [];
var directionsService;
var directionsRenderer;
var waypoints = [];
var routeIdx = [];
var hasil;
var markers;

export function initMap() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const parentDir = path.resolve(__dirname, '..');
  window.alert('Here');

  hasil = readFileFromWeb(path.join(parentDir, 'test', "webinput.txt"))

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: new google.maps.LatLng(hasil[0].lat, hasil[0].lng),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });

  markers = hasil[1];

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({
    map: map,
    suppressMarkers: true
  });

  // Create markers for each location.
  markers.forEach((marker) => {
    const newMarker = new google.maps.Marker({
      position: marker.position,
      map: map,
      title: marker.title,
    });

    // Add accessibility text to marker.
    newMarker.addListener("click", () => {
      routeIdx.push(markers.indexOf(marker));
      addMarker(marker.position, map);
      new google.maps.InfoWindow({
        content: marker.title,
      }).open(map, newMarker);
    });
  });
}

function addMarker(location, map) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  routeMarkers.push(marker);

  if (routeMarkers.length == 2) {
    let UCSPath = UCS(hasil[2], routeIdx[0], routeIdx[1]);

    for (var i = 0; i < UCSPath.length; i++) {
      waypoints.push({
        location: markers[UCSPath[i]].getPosition(),
        stopover: true
      });
    }
    calculateAndDisplayRoute(waypoints);
  }
}

function calculateAndDisplayRoute(waypoints) {
  directionsService.route({
    origin: waypoints[0].location,
    destination: waypoints[waypoints.length - 1].location,
    waypoints: waypoints.slice(1, -1),
    optimizeWaypoints: true,
    travelMode: 'DRIVING'
  }, function (response, status) {
    if (status === 'OK') {
      directionsRenderer.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

initMap();