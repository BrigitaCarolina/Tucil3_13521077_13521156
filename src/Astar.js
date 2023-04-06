import {getEuclidianDistance} from './Operation.js';
export function Astar(mapAdjMatrix, arrayOfCoordinates, start, end) {
    function heuristic(start, end) {
        return getEuclidianDistance(arrayOfCoordinates[start], arrayOfCoordinates[end]);
    }

    // comparing the fScore
    function compare(index1, index2) {
        return index1.fScore - index2.fScore;
    }
    
    // initialize the path (element of path: index)
    const hasBeenExpand = new Set();
    
    // Initialize the f(n) and g(n)
    const gScore = new Map();
    gScore.set(start, 0);
    const fScore = new Map();
    fScore.set(start, heuristic(start,end));

    // Initialize the queue to expand the path
    const nodeStart = new Node(start, null);
    const queue = [nodeStart]; // openSet

    while (queue.length > 0) {
        // finding the lowest fScore by sorting it
        queue.sort(compare);
        // dequeue the queue, get vertex to expand
        const current = queue.shift();
        
        if (current.index == end) {
            const path = [current.index]
            let point = new Node(current.index, current.cameFrom);
            while (point.index != start) {
                path.unshift(point.cameFrom.index);
                point = point.cameFrom;
            }
            return path
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
            gScore.set(neighbour.index, gScore.get(current.index) + mapAdjMatrix[current.index][neighbour.index]);
            fScore.set(neighbour.index, heuristic(neighbour.index, end) + neighbour.index.gScore);            
        }   
    }
}

class Node {
    constructor(index, cameFrom = null) {
        this.index = index;
        this.cameFrom = cameFrom;
    }
}

function getNeighbour(mapAdjMatrix, point) {
    const neighbors = [];
    for (let i = 0; i < mapAdjMatrix[0].length; i++) {
        if (mapAdjMatrix[point.index][i] != 0 && mapAdjMatrix[point.index][i] != -1) {
            neighbors.push(new Node(i, point));
        } 
    }
    return neighbors;
}