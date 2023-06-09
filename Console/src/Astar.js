import {getEuclidianDistance} from './operation.js';
export function Astar(mapAdjMatrix, arrayOfCoordinates, start, end) {
    // calculating heuristic score by euclidian distance 
    function heuristic(start, end) {
        return getEuclidianDistance(arrayOfCoordinates[start], arrayOfCoordinates[end]);
    }

    // initialize the has been expand node set 
    const hasBeenExpand = new Set(); // close-set
    
    // Initialize the queue to expand the path
    const nodeStart = new Node(start, null);
    const queue = [nodeStart] // openset

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
        // checking if current node is the goal
        if (current.index == end) {
            const path = [current.index]
            let point = new Node(current.index, current.cameFrom);
            while (point.index != start) {
                var parent = point.cameFrom
                path.unshift(parent.index);
                point = point.cameFrom;
            }
            return [true, path]
        }

        // adding the current node to sign it has been expand
        hasBeenExpand.add(current.index);


        // get the current neighbor 
        const neighbours = getNeighbour(mapAdjMatrix, current);
        for (const neighbour of neighbours) {
            if (hasBeenExpand.has(neighbour.index)) {
                continue;
            }
            if (!queue.includes(neighbour)) {
                queue.push(neighbour)
            } 
            gScore.set(neighbour, gScore.get(current) + mapAdjMatrix[current.index][neighbour.index]);
            fScore.set(neighbour, heuristic(neighbour.index, end) + gScore.get(neighbour));            
        }   
    }
    return [false, queue]
}

// custom node class 
class Node {
    constructor(index, cameFrom = null) {
        this.index = index;
        this.cameFrom = cameFrom;
    }
}

// getting the neighbour of current expanded node 
function getNeighbour(mapAdjMatrix, point) {
    const neighbors = [];
    for (let i = 0; i < mapAdjMatrix[0].length; i++) {
        if (mapAdjMatrix[point.index][i] != 0 && mapAdjMatrix[point.index][i] != -1) {
            neighbors.push(new Node(i, point));
        } 
    }
    return neighbors;
}