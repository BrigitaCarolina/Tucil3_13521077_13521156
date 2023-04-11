function Astar(mapAdjMatrix, arrayOfCoordinates, start, end) {
    function getEuclidianDistance (coordinate1, coordinate2) {
        console.log(coordinate1);
        const x1 = coordinate1.x;
        const y1 = coordinate1.y;
        const x2 = coordinate2.x;
        const y2 = coordinate2.y;
        const deltax = x1 - x2;
        const deltay = y1 - y2;
        const distance = Math.sqrt(deltax * deltax + deltay * deltay);
        return distance;
    }
    function heuristic(start, end, arrayOfCoordinates) {
        console.log(arrayOfCoordinates[start]);
        return getEuclidianDistance(arrayOfCoordinates[start], arrayOfCoordinates[end]);
    }
    const hasBeenExpand = new Set();
    
    
    // Initialize the queue to expand the path
    const nodeStart = new Node(start, null);
    const queue = [nodeStart] // openSet
    
    // Initialize the f(n) and g(n)
    const gScore = new Map();
    gScore.set(nodeStart, 0);
    const fScore = new Map();
    fScore.set(nodeStart, heuristic(start,end, arrayOfCoordinates));
    
    while (queue.length > 0) {
        // finding the lowest fScore by sorting it
        queue.sort((node1, node2) => fScore.get(node1) - fScore.get(node2));
        // dequeue the queue, get vertex to expand
        const current = queue.shift();
        
        if (current.index == end) {
            const path = [current.index]
            let point = new Node(current.index, current.cameFrom);
            while (point.index != start) {
                path.unshift(point.cameFrom.index);
                point = point.cameFrom;
            }
            return [true, path]
        }
        
        hasBeenExpand.add(current);
        
        // get the current neighbor 
        const neighbours = getNeighbour(mapAdjMatrix, current);
        for (const neighbour of neighbours) {
            if (hasBeenExpand.has(neighbour)) {
                continue;
            }
            if (!queue.includes(neighbour)) {
                queue.push(neighbour)
            } 
            gScore.set(neighbour, gScore.get(current) + mapAdjMatrix[current.index][neighbour.index]);
            console.log("neighbor index" + neighbour.index)
            fScore.set(neighbour, heuristic(neighbour.index, end, arrayOfCoordinates) + gScore.get(neighbour));            
        }   
    }
    return [false, queue]
}

class Node {
    constructor(index, cameFrom = null) {
        this.index = index;
        this.cameFrom = cameFrom;
    }
}


function getNeighbour(mapAdjMatrix, point) {
    const neighbors = [];
    console.log(mapAdjMatrix[0].length);
    for (let i = 0; i < mapAdjMatrix[0].length; i++) {
        if (mapAdjMatrix[point.index][i] != 0 && mapAdjMatrix[point.index][i] != -1) {
            neighbors.push(new Node(i, point));
        } 
    }
    return neighbors;
}
