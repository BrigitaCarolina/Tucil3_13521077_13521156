import { PriorityQueue } from "./PriorityQueue.js";
import { UCS, distance } from "./UCS.js"
import { Astar } from "./Astar.js";
import { readFile, readFileCoordinate, validMap, validNode } from "./input.js";
import promptSync from 'prompt-sync';
const prompt = promptSync();
import { displayMatrix } from "./operation.js";
import { displayCoordinate } from "./operation.js";
import path from 'path';


// Main Program
console.log("Entering program...\n");

// Array to find straight line distance
const arrayOfCoordinates = [
    { x: -6.921060932511885, y: 107.60653401156785 },
    { x: -6.921305897537567, y: 107.60688806316733 },
    { x: -6.921412404030811, y: 107.60744059823928 },
    { x: -6.922259129797078, y: 107.60648573180427 },
    { x: -6.92234966013503, y: 107.60729575894858 },
    { x: -6.921140812425525, y: 107.60748887800287 },
    { x: -6.922541371381588, y: 107.60730112336675 },
    { x: -6.922557347319368, y: 107.60751570009187 },
    { x: -6.921215367003489, y: 107.60778392100059 },
    { x: -6.922567997941536, y: 107.6076337172917 },
    { x: -6.9212632949328325, y: 107.6080306842067 },
    { x: -6.921305897536867, y: 107.60876560949657 },
    { x: -6.9214443559741925, y: 107.60979557776281 },
    { x: -6.921508259854394, y: 107.60998869681119 },
    { x: -6.922770359713114, y: 107.60979021333873 },
    { x: -6.92266917884569, y: 107.60840082904143 },
    { x: -6.921140812430106, y: 107.60984385751702 },
    { x: -6.922418889229562, y: 107.6063838078644 },
    { x: -6.920842594008965, y: 107.60810042164739 },
    { x: -6.922536046082426, y: 107.60708118222088 },
]

// jarak aslinya ke tetangga pake yang bawah
displayCoordinate(arrayOfCoordinates);

// const mapAdjMatrix = [
//     [0, 10, 2, -1, 5, -1],
//     [10, 0, -1, 3, -1, 6],
//     [2, -1, 0, 3, -1, -1],
//     [-1, 3, 3, 0, 4, -1],
//     [5, -1, -1, 4, 0, 10],
//     [-1, 6, -1, -1, 10, 0]
// ]
/*
const mapAdjMatrix = [
    [-1, 47 , -1, -1,  -1,  105,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1],  
    [47 , -1, 62,  114,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1],  
    [-1, 62 , -1, -1,  105,  30 ,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1],  
    [-1, 114, -1, -1,  89 ,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1],  
    [-1, -1, 105, 89 ,  -1,  -1,  21 ,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1],  
    [105, -1, 30,  -1,  -1,  -1,  -1,  157,  33 ,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1],  
    [-1, -1, -1, -1,  21 ,  -1,  -1,  23 ,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  24 ],  
    [-1, -1, -1, -1,  -1,  157,  23 ,  -1,  -1,  13 ,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1],  
    [-1, -1, -1, -1,  -1,  33 ,  -1,  -1,  -1,  151,  27 ,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1],  
    [-1, -1, -1, -1,  -1,  -1,  -1,  13 ,  151,  -1,  -1,  -1,  -1,  -1,  -1,  85 ,  -1,  -1,  -1,  -1],  
    [-1, -1, -1, -1,  -1,  -1,  -1,  -1,  27 ,  -1,  -1,  81 ,  -1,  -1,  -1,  -1,  -1,  -1,  47 ,  -1],  
    [-1, -1, -1, -1,  -1,  -1,  -1,  -1,  -1,  -1,  81 ,  -1,  114,  -1,  -1,  -1,  -1,  -1,  -1,  -1],  
    [-1, -1, -1, -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  114,  -1,  22 ,  -1,  -1,  34 ,  -1,  -1,  -1],  
    [-1, -1, -1, -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  22 ,  -1,  142,  -1,  -1,  -1,  -1,  -1],  
    [-1, -1, -1, -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  142,  -1,  153,  -1,  -1,  -1,  -1],  
    [-1, -1, -1, -1,  -1,  -1,  -1,  -1,  -1,  85 ,  -1,  -1,  -1,  -1,  153,  -1,  -1,  -1,  -1,  -1],  
    [-1, -1, -1, -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  34 ,  -1,  -1,  -1,  -1,  -1,  -1,  -1],  
    [-1, -1, -1, -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  78 ],  
    [-1, -1, -1, -1,  -1,  -1,  -1,  -1,  -1,  -1,  47 ,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1],  
    [-1, -1, -1, -1,  -1,  -1,  24 ,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  -1,  78 ,  -1,  -1]
]
*/

// Input file
//const prompt = require("prompt-sync")();
// var fileName = prompt('Input file name (coordinate) without txt extension: ');
// var arrayOfCoordinates1;

// try {
//     arrayOfCoordinates1 = readFileCoordinate("test/" + fileName + ".txt");
// } catch (err) {
//     console.log("File not found");
//     console.log("Make sure the .txt file is stored in the test folder");
// }

var fileName = prompt('Input file name : ');
const cwd = process.cwd();
const parent = path.dirname(cwd);
var mapAdjMatrix;

try {
    console.log(parent + "\\test\\" + fileName + ".txt");
    mapAdjMatrix = readFile(parent + "\\test\\" + fileName + ".txt");
} catch (err) {
    console.log("File not found");
    console.log("Make sure the .txt file is stored in the test folder");
}

while (!validMap(mapAdjMatrix)) {
    fileName = prompt("Input file name : ");
    mapAdjMatrix = readFile("test/" + fileName + ".txt");
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

if (resultPath == "") console.log("No path found\n");
else {
    console.log(" =================== UCS ===================== ");
    const resultDistance = distance(resultPath, mapAdjMatrix);
    console.log("Path found with total distance " + resultDistance);
    console.log("Shortest path : " + Array.from(resultPath.values()));
}

console.log("\n=================== A STAR ===================== ");
const AsDistance = distance(pathAstar, mapAdjMatrix);
console.log("Path found with total distance " + AsDistance);
console.log("Shortest path : " + path);