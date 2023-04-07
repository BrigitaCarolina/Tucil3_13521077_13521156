import { PriorityQueue } from "./PriorityQueue.js";
import { UCS, distance } from "./UCS.js"
import { Astar } from "./Astar.js";

// Main Program
console.log("Entering program...\n");

// Array to find straight line distance
const arrayOfCoordinates = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 5 }, { x: 6, y: 6 }];

// jarak aslinya ke tetangga pake yang bawah

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
const path = Astar(mapAdjMatrix, arrayOfCoordinates, startNode, goalNode);

if (resultPath == "") console.log("No path found\n");
else {
    const resultDistance = distance(resultPath, mapAdjMatrix);
    console.log("Path found with total distance " + resultDistance);
    console.log("Shortest path : " + Array.from(resultPath.values()));
    console.log("\n");
}

console.log(" =================== A STAR ===================== ");
const AsDistance = distance(path, mapAdjMatrix);
console.log("Path found with total distance " + AsDistance);
console.log("Shortest path : " + path);
console.log("\n");