// In order to create a linked list
// We have to create a node first.

// Node

// [10] -> [20] -> [30] -> [40] -> [50] -> null
class Node {
    constructor(data) {
        this.data = data; // Data on that node
        this.next = null; // Pointer to the next node
    }
}

let node1 = new Node(10);
let node2 = new Node(20);
let node3 = new Node(30)
let node4 = new Node(40);
let node5 = new Node(50);

node1.next = node2;
node2.next = node3;
node3.next = node4;
node4.next = node5;


console.log(node1);

// Traverse the Linked List

function traverseNodes(node) {
    let str = '';
    while(node !== null) {
        str = str + node.data + ' -> ';
        node = node.next;
    }

    console.log(str + ' null '); // 10 -> 20 -> 30 -> 40 -> 50 -> null
}


// Class LinkedList // size

// [1] --> null
// H                C
// [0] --> [1] --> null
class LinkedList {

    // ************************************* ASSIGNMENT 1: Improvement : Better to change to private member
    #head = null;
    #tail = null;                           // ** add New Private Attribute "tail", making use the tail can save time for append action
    #size = 0;

    constructor() {
        this.#head = null;
        this.#tail = null;
        this.#size = 0;
    }

    // // ************************************* ASSIGNMENT 1: Improvement : Setup Private method Getter and Setter
    #getHead()
    {
        return this.#head;
    }
    #setHead(obj)
    {
        this.#head = obj;
    }
    #getTail()
    {
        // When the getTail() is called
        // Here would check if the current #tail that stored is not the latest tail
        // If yes, update it,
        // Thus, it would not do the looping everytime, 
        // at the same time, the loop would only check the link starting from the current tail node
        let count = 0;
        while (this.#tail.next != null)
        {
            this.#setTail(this.#tail.next);

            // Protection, at most would loop the times equal to the size
            count++;
            if (count > this.#size)
            {
                throw new Error("LinkedList Data Link Tail Broken!") 
            }
        }

        return this.#tail;
    }
    #setTail(obj)
    {
        this.#tail = obj;
    }

    // ************************************* ASSIGNMENT 1: Improvement : Add size() return
    size()
    {
        return this.#size;
    }

    prepend(data) {
        let newNode = new Node(data);
        newNode.next = this.#getHead();
        this.#setHead(newNode);             // Updating the new Node to the head
        this.#size++;                       // Increment the size

        if (this.#size == 1)
        {
            this.#setTail(newNode);         // For the first item, should be also the tail
        }
    }


    // ********************************** ASSIGNMENT 1: Implement append method
    // Append A node.
    append(data)
    {
        let newNode = new Node(data);
        newNode.next = null;                // the newNode should have next as null to be the tail node
        let currentTail = this.#getTail();  // Get the current tail and update the tail next with newNode
        currentTail.next = newNode;
        this.#setTail(newNode);             // Update the tail by the newNode
        this.#size++;

        if (this.#size == 1)
        {
            this.#setHead(newNode);         // For the first item, should be also the head
        }
    }

    printList() {
        let current = this.#getHead();
        let str = '';
        while(current !== null) {
            str = str + current.data + ' -> ';
            current = current.next;
        }

        console.log(str + ' null ');
    }

    // Count = 2
    //                 [15]
    // H,         P       nN       C
    // [30] -> [20] -> [15] ->[10] -> null
    insertAt(data, index) {
        if (index < 0 || index > this.size) {
            return null; // Out of bounds
        }

        let newNode = new Node(data);
        if (index === 0) {
            this.prepend(); // If the index is 0, prepend it.
        }

        let current = this.#getHead();
        let previous;
        let count = 0;

        while (count < index) {
            previous = current;
            current = current.next;
            count++;
        }

        newNode.next = current;
        previous.next = newNode;
        this.#size++;
    }

    // removeFirst
    // [30] -> [20] -> [15] ->[10] -> null
    removeFirst() {
        if (!this.#getHead()) {
            return null;
        }

        let removedNode = this.#getHead();
        this.#setHead(removedNode.next);
        this.#size--;
        return removedNode;
    }

    // ********************************** ASSIGNMENT 1: Implement removeLast method
    // Assignment:
    // Implement removeLast method
    removeLast()
    {
        if (this.#size <= 1) // Consider the List size is 1 or no Node
        {
            return this.removeFirst();
        }

        // Unless the Class is designed as DoublyLinkList that having preivous node info,
        // otherwise, the removeLast need to start from the head down to the last node
        // in order to retireve the 2nd last node info
        let secondLastNode = this.#getHead();
        let lastNode = secondLastNode.next;

        let count = 0;
        while (lastNode.next != null)
        {
            secondLastNode = lastNode;
            lastNode = lastNode.next;

            // Protection, at most would loop the times equal to the size
            count++;
            if (count > this.#size)
            {
                throw new Error("LinkedList Data Link Broken!") 
            }
        }

        secondLastNode.next = null;         // Assign null to be the tail node
        this.#setTail(secondLastNode);
        this.#size--;
        return lastNode;
    }


    // Remove at a specifc index

// Count = 1, index = 1
    //  P       C
    // [30] -> [15] ->[10] -> null
    removeAt(index) {
        if (index < 0 || index > this.#size) {
            return null; // Out of bounds
        }

        if (index === 0) {
            return this.removeFirst();
        }

        let current = this.#getHead();
        let previous;
        let count = 0;

        while (count < index) {
            previous = current;
            current = current.next;
            count++;
        }

        previous.next = current.next;
        this.#size--;

        return current.data;
    }

    //, H                           C
    // [30] -> [20] -> [15] ->[10] -> null
    search(data) {
        let current = this.#getHead();

        while (!current) {
            if (current.data === data) {
                return true;
            }
            current = current.next;
        }

        return false;
    }

//  index = 3, data = 25;
//  count = 3;
//                             C
    // [30] -> [20] -> [15] ->[10] -> null
    updateAt(data, index) {
        if (index < 0 || index > this.#size) {
            return null; // Out of bounds
        }

        let current = this.#getHead();
        let count = 0;

        while (count < index) {
            current = current.next;
            count++;
        }

        current.data = data; // Update the data that we want.

    }
}

let linkedList = new LinkedList();

linkedList.prepend(10);
// 10 -> null
linkedList.printList();

linkedList.prepend(20);
// 20 -> 10 -> null
linkedList.printList();

linkedList.prepend(30);
// 30 -> 20 -> 10 -> null
linkedList.printList();

linkedList.insertAt(15, 2);
// 30 -> 20 -> 15 -> 10 -> null
linkedList.printList();

linkedList.updateAt(25, 3);
// 30 -> 20 -> 15 -> 25 -> null
linkedList.printList();

linkedList.append(100);
// 30 -> 20 -> 15 -> 25 -> 100 -> null
linkedList.printList();

linkedList.append(500);
// 30 -> 20 -> 15 -> 25 -> 100 -> 500 -> null
linkedList.printList();

linkedList.removeLast();
// 30 -> 20 -> 15 -> 25 -> 100 -> null
linkedList.printList();

linkedList.removeFirst();
// 20 -> 15 -> 25 -> 100 -> null
linkedList.printList();

linkedList.append(8000);
// 30 -> 20 -> 15 -> 25 -> 100 -> 500 -> null
linkedList.printList();

// Blockchain
