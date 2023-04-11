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