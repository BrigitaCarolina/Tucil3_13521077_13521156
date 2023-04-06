function getEuclidianDistance (coordinate1, coordinate2) {
    const x1 = coordinate1.x;
    const y1 = coordinate1.y;
    const x2 = coordinate2.x;
    const y2 = coordinate2.y;
    const deltax = x1 - x2;
    const deltay = y1 - y2;
    const distance = Math.sqrt(deltax * deltax + deltay * deltay);
    return distance;
}

module.exports = {
    getEuclidianDistance: getEuclidianDistance
}