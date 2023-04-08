import {getEuclidianDistance} from './operation.js';
export function Astar(mapAdjMatrix, arrayOfCoordinates, start, end) {
    function heuristic(start, end) {
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
    fScore.set(nodeStart, heuristic(start,end));
    
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
            gScore.set(neighbour, gScore.get(current) + mapAdjMatrix[current.index][neighbour.index]);
            fScore.set(neighbour, heuristic(neighbour.index, end) + gScore.get(neighbour));            
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