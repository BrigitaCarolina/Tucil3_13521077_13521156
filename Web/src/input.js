const fileInput = document.getElementById('file-input');
const fileContents = document.getElementById('file-contents');
const center = [];
const marker = [];
const adjmatrix = [];

function read() {
    initMapBlank();
    center.length = 0;
    marker.length = 0;
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            const contents = event.target.result;
            let splitted;
            const lines = contents.trim().split('\n');
            let simpul;
            let positions;
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
            if (!validateJumlah(marker, adjmatrix)) {
                Swal.fire({
                    title: 'Oops!',
                    text: 'Jumlah koordinat simpul yang dimasukkan tidak sesuai dengan jumlah simpul pada matriks ketetanggaan!',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'custombutton',
                    }
                })
                return
            } else if (!validateMarker(marker) || !validateMatrix(adjmatrix)) {
                Swal.fire({
                    title: 'Oops!',
                    text: 'Masukan koordinat hanya berupa angka!',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    customClass: {
                        confirmButton: 'custombutton',
                    }
                })
                return
            }
            initMap(center, marker, adjmatrix);
        });
        reader.readAsText(file);
    });
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
    if (marker.length < 2) {
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
    } else if (Matrix[1].length != Matrix[0].length) {
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