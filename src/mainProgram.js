import { PriorityQueue } from "./PriorityQueue.js";
import { UCS, distance } from "./UCS.js"

// Main Program
console.log("Entering program...\n");

const mapAdjMatrix = [
    [0, 10, 2, -1, 5, -1],
    [10, 0, -1, 3, -1, 6],
    [2, -1, 0, 3, -1, -1],
    [-1, 3, 3, 0, 4, -1],
    [5, -1, -1, 4, 0, 10],
    [-1, 6, -1, -1, 10, 0]
]

const startNode = 0;
const goalNode = 5;

const resultPath = UCS(mapAdjMatrix, startNode, goalNode);

if (resultPath == "") console.log("No path found\n");
else {
    const resultDistance = distance(resultPath, mapAdjMatrix);
    console.log("Path found with total distance " + resultDistance);
    console.log("Shortest path : " + Array.from(resultPath.values()));
    console.log("\n");
}