import { PriorityQueue } from "./PriorityQueue";
const operations = require("./operation.js")

export function Astar(mapAdjMatrix, arrayOfCoordinates, start, end) {
    function heuristic(start, end) {
        return operations.getEuclidianDistance(arrayOfCoordinates[start], arrayOfCoordinates[end]);
    }

    // comparing the fScore
    function compare(index1, index2) {
        return index1.fScore - index2.fScore;
    }
    
    // initialize the path (element of path: index)
    const hasBeenExpand = new Set();
    
    // Initialize the f(n) and g(n)
    gScore = new Map();
    gScore.Set(start, 0);
    fScore = new Map();
    fScore.Set(start, heuristic);

    // Initialize the queue to expand the path
    const queue = [start]; // openSet

    while (queue.length > 0) {
        // finding the lowest fScore by sorting it
        queue.sort(compare);
        // dequeue the queue, get vertex to expand
        const current = queue.shift();
        
        if (current == end) {
            const path = [current]
            let point = current
            while (point!= start) {
                path.unshift(point);
                point = point.cameFrom;
            }
            path.unshift(start);
            return path
        }

        hasBeenExpand.add(current);

        // get the current neighbor index
        const neighbours = getIndexOfNeighbour(mapAdjMatrix, current);
        for (const neighbour of neighbours) {
            if (hasBeenExpand.has(neighbour)) {
                continue;
            }
            if (!queue.includes(neighbour)) {
                queue.push(neighbour)
            } 
            neighbour.cameFrom = current;
            nGScore = mapAdjMatrix[current][neighbour];
            gScore.Set(neighbour, gScore.Get(current) + mapAdjMatrix[current][neighbour]);
            fScore.Set(neighbour, nGScore);            
        }   
    }
}


function getIndexOfNeighbour(mapAdjMatrix, point) {
    const neighbors = [];
    for (let i = 0; i < mapAdjMatrix[0].length; i++) {
        if (mapAdjMatrix[point][i] != 0 && mapAdjMatrix[point][i] != -1) {
            neighbors.push(i);
        } 
    }
    return neighbors;
}