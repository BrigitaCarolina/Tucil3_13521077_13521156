import { PriorityQueue } from "./PriorityQueue.js";
import { UCS, distance } from "./UCS.js"

// Main Program
console.log("Entering program...\n");

// Array to find straight line distance
const arrayOfCoordinates = [{x: 0, y: 0}, {x: 1, y: 1}, {x:2, y:2}, {x:3, y:3}, {x:4, y:4}, {x:5, y:5}, {x:6, y:6}];

// ceritanya udah diitung (jarak std)
const matrixOfSTD = [
    [0, 1, 1, 1, 1, 1],
    [2, 0, 1, 1, 1, 1],
    [3, 1, 0, 1, 1, 1],
    [5, 1, 1, 0, 1, 1],
    [6, 1, 1, 1, 0, 1],
    [3, 1, 1, 1, 1, 0],
]

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

if (resultPath == "") console.log("No path found\n");
else {
    const resultDistance = distance(resultPath, mapAdjMatrix);
    console.log("Path found with total distance " + resultDistance);
    console.log("Shortest path : " + Array.from(resultPath.values()));
    console.log("\n");
}