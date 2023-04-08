
var routeMarkers1 = [];
var routeMarkers2 = [];
var directionsService;
var directionsRenderer;
var waypoints = [];
var waypoints2 = [];
var routeIdx = [];
var string1 = [];
var string2 = [];

function initMapBlank() {
  var map11 = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: new google.maps.LatLng(-6.89067290133392, 107.61002829330324),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });
  var map22 = new google.maps.Map(document.getElementById("map2"), {
    zoom: 15,
    center: new google.maps.LatLng(-6.89067290133392, 107.61002829330324),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });

}

function initMap(center, markers, adjmatrix) {
  console.log(adjmatrix);
  var map1 = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: new google.maps.LatLng(center[0].lat, center[0].lng),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });
  var map2 = new google.maps.Map(document.getElementById("map2"), {
    zoom: 15,
    center: new google.maps.LatLng(center[0].lat, center[0].lng),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });
      
      directionsService1 = new google.maps.DirectionsService();

      directionsService2 = new google.maps.DirectionsService();

      directionsRenderer1 = new google.maps.DirectionsRenderer({
        map: map1,
        suppressMarkers: true
      });

      directionsRenderer2 = new google.maps.DirectionsRenderer({
        map: map2,
        suppressMarkers: true
      });
      
      // Create markers for each location.
      markers.forEach((marker) => {
        const newMarker1 = new google.maps.Marker({
          position: marker.position,
          map: map1,
          title: marker.title,
        });
        
        // Add accessibility text to marker.
        newMarker1.addListener("click", () => {
          routeIdx.push(markers.indexOf(marker));
          addMarker(marker.position, map1, adjmatrix, markers, 1);
          new google.maps.InfoWindow({
            content: marker.title,
          }).open(map1, newMarker1);
        });
    });
      markers.forEach((marker) => {
        const newMarker2 = new google.maps.Marker({
          position: marker.position,
          map: map2,
          title: marker.title,
        });
        
        // Add accessibility text to marker.
        newMarker2.addListener("click", () => {
          routeIdx.push(markers.indexOf(marker));
          addMarker(marker.position, map2, adjmatrix, markers, 2);
          new google.maps.InfoWindow({
            content: marker.title,
          }).open(map2, newMarker2);
        });
    });
}

function addMarker(location, map, adj, markers, id) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  if (id == 1) {
    routeMarkers1.push(marker);
  } else {
    routeMarkers2.push(marker);
  }
  console.log(id);
  console.log("routemarker1" + routeMarkers1.length);
  
  // if (routeMarkers.length == 4) {
    //   for (var i = 0; i < routeMarkers.length; i++) {
      //     waypoints.push({
        //       location: routeMarkers[i].getPosition(),
        //       stopover: true
        //     });
        //   }
  //   calculateAndDisplayRoute(waypoints);
  // }
  const array = []
  for (let i = 0; i < markers.length; i++) {
    array.push({x: markers[i].position.lat, y: markers[i].position.lng})
  }
  if (routeMarkers1.length == 2) {
      let UCSPath = UCS(adj, routeIdx[0], routeIdx[1]);
  
      for (var i = 0; i < UCSPath.length; i++) {
        waypoints.push({
          location: markers[UCSPath[i]].position,
          stopover: true
        });
        routeMarkers1.length = 0;
        string1.push(markers[UCSPath[i]].title);
      } 
      var content1 = ""
      for (let i = 0; i < string1.length; i++) {
        content1 += string1[i]
        if (i != string1.length - 1) {
          content1 += " - "
        }
      }
      console.log(content1);
      document.getElementById("string1").textContent = content1
      calculateAndDisplayRoute(waypoints, 1);
    } else if (routeMarkers2.length == 2) {
      console.log(array);
      let AstarPath = Astar(adj, array, routeIdx[0], routeIdx[1]);
      for (var i = 0; i < AstarPath.length; i++) {
        waypoints2.push({
          location: markers[AstarPath[i]].position,
          stopover: true
        });
        string2.push(markers[AstarPath[i]].title);
      }
      var content2 = ""
      for (let i = 0; i < string2.length; i++) {
        content2 += string2[i]
        if (i != string2.length - 1) {
          content2 += " - "
        }
      }
      console.log(content2);
      document.getElementById("string2").textContent = content2
        routeMarkers2.length = 0;
        calculateAndDisplayRoute(waypoints2, 2);

    }
    
}

function calculateAndDisplayRoute(waypoints, id) {
  console.log(id)
  if (id == 1) {
    directionsService1.route({
      origin: waypoints[0].location,
      destination: waypoints[waypoints.length - 1].location,
      waypoints: waypoints.slice(1, -1),
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
          directionsRenderer1.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
    
  } else {
    directionsService2.route({
      origin: waypoints[0].location,
      destination: waypoints[waypoints.length - 1].location,
      waypoints: waypoints.slice(1, -1),
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
          directionsRenderer2.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });

  }
}