import { PriorityQueue } from "./PriorityQueue.js";

export function UCS(mapAdjMatrix, startNode, goalNode) {
    // console.log("Entering UCS\n");
    // Node = [jarak/cost, currentNode, path]
    let livingNode = new PriorityQueue();
    let expandNode = new Set();             // Unique list node yang telah di expand
    let found = false;

    let currentExpand;
    let newPath;
    let newCost;
    let isThereAdj = false;

    livingNode.enqueue([0, startNode, [startNode]]);

    // Start Searching
    while (!found && !livingNode.isEmpty()) {
        currentExpand = livingNode.dequeue();
        expandNode.add(currentExpand[1]);

        if (currentExpand[1] == goalNode) {
            found = true;
        }
        // console.log("Here " + currentExpand[1] + " = " + goalNode + " - " + found);

        if (!found) {
            // console.log("Masuk if, len = " + Object.keys(mapAdjMatrix).length + "\n");
            for (let i = 0; i < Object.keys(mapAdjMatrix).length; i++) {
                // console.log(currentExpand[1] + " ke " + i + " = " + mapAdjMatrix[currentExpand[1]][i] + " && " + !expandNode.has(i) + "\n");
                if (mapAdjMatrix[currentExpand[1]][i] > 0 && !expandNode.has(i)) {
                    // Node adjacent and never been expanded
                    // console.log("->" + i);
                    isThereAdj = true;
                    newCost = currentExpand[0] + mapAdjMatrix[currentExpand[1]][i];
                    newPath = currentExpand[2].slice();
                    newPath.push(i);
                    livingNode.enqueue([newCost, i, newPath]);
                    // livingNode.print();
                }
            }

            
        }
        // console.log("In ujung while - " + !found + " - " + !livingNode.isEmpty());
    }

    if (!found) return "";
    else return currentExpand[2];
}

export function distance(path, mapAdjMatrix) {
    // console.log("Dist path = " + path);
    let resDist = 0;
    for (let i = 0; i < path.length - 1; i++) {
        // console.log(path[i] + " ke " + path[i + 1] + " = " + mapAdjMatrix[path[i]][path[i + 1]]);
        resDist += mapAdjMatrix[path[i]][path[i + 1]];
    }
    return resDist;
}