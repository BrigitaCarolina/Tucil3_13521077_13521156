const fileInput = document.getElementById('file-input');
const fileContents = document.getElementById('file-contents');

function read() {
    initMapBlank();
fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  
  const reader = new FileReader();
  reader.addEventListener('load', (event) => {
    const contents = event.target.result;
    // fileContents.textContent = contents;
    const center = [];
    const marker = [];
    const adjmatrix = [];
    let splitted;
    // Read per line
    const lines = contents.trim().split('\n');
    let simpul; 
    let positions;
    // Split lines
    for (let i = 0; i < lines.length; i++) {
        if (i == 0) {
            splitted = lines[i].trim().split(/\s+/).map(Number);
            simpul = splitted[0];
        } else if (i == 1) {
            splitted = lines[i].trim().split(/\s+/).map(Number);
            centers = {
                lat: splitted[0],
                lng: splitted[1] 
            }
            center.push(centers);
        } else if (i <= simpul * 2 + 1) {
            if (i % 2 == 0) {
                splitted = lines[i].trim().split(/\s+/).map(Number);
                positions = {
                    lat: splitted[0],
                    lng: splitted[1]
                }
            } else {
                splitted = lines[i].trim().split().map(String);
                marker.push({
                    position: positions,
                    title: splitted[0]
                });
            }
        } else {
            splitted = lines[i].trim().split(/\s+/).map(Number);
            adjmatrix.push(splitted);
        }
    }
    // console.log(center)
    // console.log(marker)
    initMap(center, marker, adjmatrix);
  });

  reader.readAsText(file);
});
}