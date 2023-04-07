var routeMarkers = [];
var directionsService;
var directionsRenderer;
var waypoints = [];

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: new google.maps.LatLng(-6.88490548204114, 107.61148290864757),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });

  const markers = [
    {
      position: { lat: -6.885196682648061, lng: 107.61370535846539 },
      title: "Simpang Dago",
    },
    {
      position: { lat: -6.898675616317532, lng: 107.61281708483281 },
      title: "Simpang A",
    },
    {
      position: { lat: -6.88490548204114, lng: 107.61148290864757 },
      title: "Babakan Siliwangi",
    },
    {
      position: { lat: -6.884740729538353, lng: 107.6044532507617 },
      title: "Cihampelas Atas",
    },
    {
      position: { lat: -6.900180058993096, lng: 107.60455236144489 },
      title: "Cihampelas Bawah",
    },
    {
      position: { lat: -6.9002309994850215, lng: 107.59738668882694 },
      title: "RSHS",
    },
    {
      position: { lat: -6.883524334076055, lng: 107.61435778474123 },
      title: "Tubagus Ismail",
    },
  ];

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

  if (routeMarkers.length == 4) {
    for (var i = 0; i < routeMarkers.length; i++) {
      waypoints.push({
        location: routeMarkers[i].getPosition(),
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