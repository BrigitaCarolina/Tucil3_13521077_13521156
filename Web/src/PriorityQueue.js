class PriorityQueue {
    // queue[i][0] menyatakan priority element ke-i yaitu jarak/cost dari start node 
    //                dengan prioritas tertinggi pada nilai terkecil
    // queue[i][1] menyatakan currentNode
    // queue[i][2] menyatakan path untuk mencapai currentNode dari startNode

    constructor() {
        this.queue = [];
    }

    // Insert new element
    enqueue(newElement) {
        let done = false;
        for (let i = 0; !done && i < this.queue.length; i++) {
            if (newElement[0] <= this.queue[i][0]) {
                this.queue.splice(i, 0, newElement);
                done = true;
            }
        }

        if (!done) {
            this.queue.push(newElement);
        }
    }

    // Remove leading element
    dequeue() {
        return this.queue.shift();
    }

    isEmpty() {
        return this.queue.length == 0;
    }
    // Print Queue
    print() {
        if (this.queue.length == 0) console.log("Empty Queue\n");
        else {
            console.log("{");
            for (let i = 0; i < this.queue.length; i++) {
                console.log("0 = " + this.queue[i][0] + ", 1 = " + this.queue[i][1] + ", 2 = " + this.queue[i][2] + ")");
                if (i == this.queue.length - 1) console.log("}\n");
                else console.log(", ");
            }
        }
    }
}
