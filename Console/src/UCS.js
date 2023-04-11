import { PriorityQueue } from "./PriorityQueue.js";

export function UCS(mapAdjMatrix, startNode, goalNode) {
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

        if (!found) {
            for (let i = 0; i < Object.keys(mapAdjMatrix).length; i++) {
                if (mapAdjMatrix[currentExpand[1]][i] > 0 && !expandNode.has(i)) {
                    isThereAdj = true;
                    newCost = currentExpand[0] + mapAdjMatrix[currentExpand[1]][i];
                    newPath = currentExpand[2].slice();
                    newPath.push(i);
                    livingNode.enqueue([newCost, i, newPath]);
                }
            }

            
        }
    }

    if (!found) return "";
    else return currentExpand[2];
}

