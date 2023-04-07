import { PriorityQueue } from "./PriorityQueue.js";
import { UCS, distance } from "./UCS.js"
import { Astar } from "./Astar.js";
import { readFile, validMap, validNode } from "./input.js";
import promptSync from 'prompt-sync';
const prompt = promptSync();

// Main Program
console.log("Entering program...\n");

// Array to find straight line distance
const arrayOfCoordinates = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 5 }, { x: 6, y: 6 }];

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
/*
const mapAdjMatrix = [
    [0, 10, 2, -1, 5, -1],
    [10, 0, -1, 3, -1, 6],
    [2, -1, 0, 3, -1, -1],
    [-1, 3, 3, 0, 4, -1],
    [5, -1, -1, 4, 0, 10],
    [-1, 6, -1, -1, 10, 0]
]
*/

// Input file
//const prompt = require("prompt-sync")();

var fileName = prompt('Input file name : ');
var mapAdjMatrix;

try {
    mapAdjMatrix = readFile("test/" + fileName + ".txt");
} catch (err) {
    console.log("File not found");
    console.log("Make sure the .txt file is stored in the test folder");
}

while (!validMap(mapAdjMatrix)) {
    fileName = prompt("Input file name : ");
    mapAdjMatrix = readFile("test/" + fileName + ".txt");
}

console.log("There is", mapAdjMatrix.length, "node : 0 -", mapAdjMatrix[0].length - 1);
var startNode = prompt("Input start node : ");
while (!validNode(startNode, mapAdjMatrix)) {
    startNode = prompt("Input start node : ");
}
var goalNode = prompt("Input goal node : ");
while (!validNode(goalNode, mapAdjMatrix)) {
    goalNode = prompt("Input goal node : ");
}

const resultPath = UCS(mapAdjMatrix, startNode, goalNode);
const path = Astar(mapAdjMatrix, arrayOfCoordinates, startNode, goalNode);

if (resultPath == "") console.log("No path found\n");
else {
    const resultDistance = distance(resultPath, mapAdjMatrix);
    console.log("Path found with total distance " + resultDistance);
    console.log("Shortest path : " + Array.from(resultPath.values()));
}

console.log("\n=================== A STAR ===================== ");
const AsDistance = distance(path, mapAdjMatrix);
console.log("Path found with total distance " + AsDistance);
console.log("Shortest path : " + path);