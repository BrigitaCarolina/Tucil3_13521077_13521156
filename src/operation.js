import fs from 'fs';

export function getEuclidianDistance (coordinate1, coordinate2) {
    const x1 = coordinate1.x;
    const y1 = coordinate1.y;
    const x2 = coordinate2.x;
    const y2 = coordinate2.y;
    const deltax = x1 - x2;
    const deltay = y1 - y2;
    const distance = Math.sqrt(deltax * deltax + deltay * deltay);
    return distance;
}

export function displayMatrix (mapAdjMatrix) {
    console.log(" ================= Matrix of Adjacency =================== ");
    const matrix = mapAdjMatrix;
    for (let i = 0; i < matrix[1].length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            process.stdout.write(matrix[i][j].toString() + " ");
        }
        console.log();
    }
    console.log();
}

export function displayCoordinate (array) {
    console.log(" ================= Array of Coordinates =================== ");
    for (let i = 0; i < array.length; i++) {
        console.log(i + ": " + array[i].x.toString() + ", " + array[i].y.toString());
    }
    console.log();
}

export function readCoordinate(data1) {
    fs.readFile('test1.txt', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        data1 = data;
        console.log(data);
    });
}