import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

// const fs = require('fs');
export function readFile(filePath) {
    const result = [];
    const contents = fs.readFileSync(filePath, 'utf-8');
    // Read per line
    const lines = contents.trim().split('\n');
    // Split lines
    for (let i = 0; i < lines.length; i++) {
        const splitted = lines[i].trim().split(/\s+/).map(Number);
        result.push(splitted);
    }
    
    return result;
}

export function readFileCoordinate(filePath) {
    const result = [];
    let contents;
    try {
        contents = fs.readFileSync(filePath, 'utf-8');
    } catch (err) {
        throw new Error("File not found\nMake sure the .txt file is stored in the test folder") 
    }
    // Read per line
    const lines = contents.trim().split('\n');
    // Split lines
    for (let i = 0; i < lines.length; i++) {
        const splitted = lines[i].trim().split(/\s+/).map(Number);
        result.push({x: splitted[0], y: splitted[1]});
    }
    return result;
}

export function validCoordinate(arrayOfCoordinates) {
    for (let i = 0; i < arrayOfCoordinates.length; i++) {
        if (Number.isNaN(arrayOfCoordinates[i].x) || Number.isNaN(arrayOfCoordinates[i].y)) {
            return false;
        }
    }
    return true;
}
export function validMap(adjMatrix) {
    for (let i = 0; i < adjMatrix.length; i++) {
        for (let j = 0; j < adjMatrix[0].length; j++) {
            if (Number.isNaN(adjMatrix[i][j]) || adjMatrix[i][j] < -1) {
                console.log("Invalid element in (", i, ",", j, ")");
                console.log("Element must be integer. The minimum value of -1 denotes a non-neighboring node");
                return false;
            }
        }
    }
    if (adjMatrix.length == 0) {
        console.log("Empty Adjacency Matrix. Try Again!");
        return false;
    }
    if (adjMatrix.length != adjMatrix[0].length) {
        console.log("Invalid Map AdjacencyMatrix. Try Again!");
        console.log("Adjacency Matrix must be square and separated by spaces between their columns.");
        return false;
    }
    return true;
}

export function validNode(inputNode, adjMatrix) {
    if (inputNode < 0 || inputNode >= adjMatrix.length) {
        console.log("Invalid input! Choose node 0 -", adjMatrix[0].length - 1);
        return false;
    } else return true;
}

// const markers = [
//     {
//       position: { lat: -6.885196682648061, lng: 107.61370535846539 },
//       title: "Simpang Dago",
//     },

export function readFileFromWeb(filePath) {
    let center;
    const marker = [];
    const adjmatrix = [];
    const contents = fs.readFileSync(filePath, 'utf-8');
    // Read per line
    const lines = contents.trim().split('\n');
    let simpul;
    let positions;
    // Split lines
    for (let i = 0; i < lines.length; i++) {
        if (i == 0) {
            const splitted = lines[i].trim().split(/\s+/).map(Number);
            simpul = splitted[0];
        } else if (i == 1) {
            const splitted = lines[i].trim().split(/\s+/).map(Number);
            center = {
                lat: splitted[0],
                lng: splitted[1] 
            }
        } else if (i <= simpul * 2 + 1) {
            if (i % 2 == 0) {
                const splitted = lines[i].trim().split(/\s+/).map(Number);
                positions = {
                    lat: splitted[0],
                    lng: splitted[1]
                }
            } else {
                marker.push({
                    position: positions,
                    title: splitted
                });
            }
        } else {
            const splitted = lines[i].trim().split(/\s+/).map(Number);
            adjmatrix.push(splitted);
        }
    }
    // console.log(center);
    // console.log(marker);
    // console.log(adjmatrix);

    return [center, marker, adjmatrix]; 
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const parentDir = path.resolve(__dirname, '..');

const hasil = readFileFromWeb(path.join(parentDir, 'test', "webinput.txt"))
const center = hasil[0];
console.log(center);
const marker = hasil[1];
console.log(marker);
const adjmatrix = hasil[2];
console.log(adjmatrix);
