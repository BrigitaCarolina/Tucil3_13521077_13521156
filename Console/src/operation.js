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

export function distance(path, mapAdjMatrix) {
    let resDist = 0;
    for (let i = 0; i < path.length - 1; i++) {
        resDist += mapAdjMatrix[path[i]][path[i + 1]];
    }
    return resDist;
}