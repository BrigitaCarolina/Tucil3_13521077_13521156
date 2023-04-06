class PriorityQueue {
    // elements[i][0] menyatakan priority element ke i dengan prioritas tertinggi pada nilai terkecil
    // elements[i][1] menyatakan value element ke i

    constructor() {
        this.queue = [];
    }

    // Insert new element
    enqueue(newElement) {
        let done = false;
        let i = 0;
        while (!done && i < this.queue.length) {
            if (newElement[0] < this.queue[i][0]) {
                // insert element at index i
                this.queue.splice(i, 0, newElement);
                done = true;
            }
            i++;
        }

        if (!done) {
            // Insert at the end of element
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
        if (this.isEmpty) console.log("Empty Queue\n");
        else {
            console.log("{");
            for (i = 0; i < this.queue.length; i++) {
                console.log("(" + this.queue[i][0] + ", " + this.queue[i][1] + ")");
                if (i == this.queue.length -1) console.log("}\n");
                else console.log(", ");
            }
        }
    }
}