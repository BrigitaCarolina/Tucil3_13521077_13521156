import fs from 'fs';

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
