const fileInput = document.getElementById('file-input');
const fileContents = document.getElementById('file-contents');

function read() {
    console.log("here")
    initMapBlank();
    console.log("disini")
    const center = [];
    const marker = [];
    const adjmatrix = [];
    center.length = 0;
    marker.length = 0;
    let isvalid = false;
    // while (!isvalid) {
    fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
  const reader = new FileReader();
  reader.addEventListener('load', (event) => {
    const contents = event.target.result;
    // fileContents.textContent = contents;
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
    console.log(adjmatrix.length)
     if (!validateJumlah(marker, adjmatrix)) {
        alert("Jumlah koordinat simpul yang dimasukkan tidak sesuai dengan jumlah simpul pada matriks ketetanggaan!")
        return
    }
    else if (!validateMarker(marker) || !validateMatrix(adjmatrix)) {
        alert("Masukan koordinat berupa angka!")
        return
    }
    // console.log(center)
    // console.log(marker)
    initMap(center, marker, adjmatrix);
    // isvalid = true;
  });

  reader.readAsText(file);
});
    // }

// }
}

function validateJumlah(marker, adjmatrix) {
    if (marker.length == 0) {
        return false;
    }
    if (marker.length != adjmatrix.length) {
        return false;
    }
    return true
}

function validateMarker(marker) {
    if (marker.length == 0) {
        return false;
    }
    for (let i = 0; i < marker; i++) {
        if (Number.isNaN(marker[i].position.lat || Number.isNaN(marker[i].position.lng))) {
            return false;
        }
    }
    return true;
}

function validateMatrix(Matrix) {
    if (Matrix.length == 0) {
        return false;
    } 
    for (let i = 0; i < Matrix[1].length; i++) {
        for (let j = 0; j < Matrix[0].length; j++) {
            if (Number.isNaN(Matrix[i][j])) {
                return false;
            }
        }
    }
    return true;
}