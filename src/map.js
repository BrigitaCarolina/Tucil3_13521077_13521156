function initMap() {
  // Create a map object and specify the DOM element for display.
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -6.891725401281734, lng: 107.61046193855061 },
    zoom: 15,
  });

  // Create an array of markers.
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

  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer({
    map: map,
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
      new google.maps.InfoWindow({
        content: marker.position,
      }).open(map, newMarker);
    });
  });
}
