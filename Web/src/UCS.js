function UCS(mapAdjMatrix, startNode, goalNode) {
    let livingNode = new PriorityQueue();   // Menyimpan simpul hidup yang dapat di expand
    let expandNode = new Set();             // Unique list simpul yang telah di expand
    let found = false;

    let currentExpand;
    let newPath;
    let newCost;

    // Inserts the root node into the priority queue with 0 cost
    livingNode.enqueue([0, startNode, [startNode]]);

    // Start Searching
    while (!found && !livingNode.isEmpty()) {
        // Goal node not found and there are still expandable nodes
        // Get the leading node with the lowest cost/distance to expand
        currentExpand = livingNode.dequeue();
        expandNode.add(currentExpand[1]);


        // if currentNode is goal node, then the search ends
        if (currentExpand[1] == goalNode) {
            found = true;
        }

        // if currentNode isn't goal node, continue to find adjacent node
        if (!found) {
            for (let i = 0; i < Object.keys(mapAdjMatrix).length; i++) {
                if (mapAdjMatrix[currentExpand[1]][i] > 0 && !expandNode.has(i)) {
                    // Insert adjacency node to priority queue
                    newCost = currentExpand[0] + mapAdjMatrix[currentExpand[1]][i];
                    newPath = currentExpand[2].slice();
                    newPath.push(i);
                    livingNode.enqueue([newCost, i, newPath]);
                }
            }


        }
    }
    // found || livingNode.isEmpty()

    if (!found) return "";
    else return currentExpand[2];
}

// Function to calculate total path distance
function distance(path, mapAdjMatrix) {
    let resDist = 0;
    for (let i = 0; i < path.length - 1; i++) {
        resDist += mapAdjMatrix[path[i]][path[i + 1]];
    }
    return resDist;
}