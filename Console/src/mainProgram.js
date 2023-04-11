import { UCS } from "./UCS.js"
import { distance } from "./operation.js"
import { Astar } from "./Astar.js";
import { readFile, readFileCoordinate, validCoordinate, validMap, validNode } from "./input.js";
import promptSync from 'prompt-sync';
const prompt = promptSync();
import { displayMatrix } from "./output.js";
import { displayCoordinate } from "./output.js";
import path from 'path';
import { fileURLToPath } from "url";


// Main Program
console.log("Entering program...\n");

// Arranging file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const parentDir = path.resolve(__dirname, '..');

// Input file        
var arrayOfCoordinates;
var fileName = prompt('Input coordinate file name (without the .txt extension): ');
var valid;
do {
    var filePath = path.join(parentDir, 'test', fileName + '.txt');
    valid = true;
    try {
        arrayOfCoordinates = readFileCoordinate(filePath);
    } catch (err) {
        console.log(err);
        fileName = prompt('Input coordinate file name (without the .txt extension): ');
        valid = false;
    }
} while (!valid);

while (!validCoordinate(arrayOfCoordinates)) {
    var filePath = path.join(parentDir, 'test', fileName + '.txt');
    fileName = prompt("Input coordinate file name (without the .txt extension): ");
    arrayOfCoordinates = readFileCoordinate(filePath);
}
            
displayCoordinate(arrayOfCoordinates);

// Input file and input file validation 
var fileName = prompt('Input adjacency map file name (without the .txt extension): ');
var mapAdjMatrix;
var valid;
do {
    var filePath = path.join(parentDir, 'test', fileName + '.txt');
    valid = true;
    try {
        mapAdjMatrix = readFile(filePath);
    } catch (err) {
        console.log("File not found");
        console.log("Make sure the .txt file is stored in the test folder");
        fileName = prompt('Input adjacency map file name (without the .txt extension): ');
        valid = false;
    }
} while (!valid);

while (!validMap(mapAdjMatrix)) {
    var filePath = path.join(parentDir, 'test', fileName + '.txt');
    fileName = prompt("Input adjacency map file name (without the .txt extension): ");
    mapAdjMatrix = readFile(filePath);
}
displayMatrix(mapAdjMatrix);


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
const pathAstar = Astar(mapAdjMatrix, arrayOfCoordinates, startNode, goalNode);

if (resultPath == "") console.log("No path found!\n");
else {
    console.log(" =================== UCS ===================== ");
    const resultDistance = distance(resultPath, mapAdjMatrix);
    console.log("Path found with total distance " + resultDistance);
    console.log("Shortest path : " + Array.from(resultPath.values()));
}

if (!pathAstar[0]) {
    console.log("No path found!\n")
} else {
    console.log("\n=================== A STAR ===================== ");
    const AsDistance = distance(pathAstar[1], mapAdjMatrix);
        console.log("Path found with total distance " + AsDistance);  
        console.log("Shortest path : " + pathAstar[1]);
}
    