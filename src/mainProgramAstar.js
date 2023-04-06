import { Astar } from "./Astar.js";
const mapAdjMatrix = [
    [0, 10, 2, -1, 5, -1],
    [10, 0, -1, 3, -1, 6],
    [2, -1, 0, 3, -1, -1],
    [-1, 3, 3, 0, 4, -1],
    [5, -1, -1, 4, 0, 10],
    [-1, 6, -1, -1, 10, 0]
]

const arrayOfCoordinates = [{x: 0, y: 0}, {x: 1, y: 1}, {x:2, y:2}, {x:3, y:3}, {x:4, y:4}, {x:5, y:5}, {x:6, y:6}];

const path = Astar(mapAdjMatrix, arrayOfCoordinates, 0, 5);

console.log(path);