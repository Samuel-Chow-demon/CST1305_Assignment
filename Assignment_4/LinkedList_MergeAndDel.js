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

    // ************************************* PREV ASSIGNMENT WORK: Improvement : Better to change to private member
    #head = null;
    #tail = null;                           // ** add New Private Attribute "tail", making use the tail can save time for append action
    #size = 0;

    // --------------------------------------------- ASSIGNMENT 4 : Alter constructor with head and size argument with default value, no need to assign for tail since
    //                                                              the #getTail() method would find and assign the tail when first call
    constructor(head = null, size = 0) {
        this.#head = head;
        this.#tail = null;
        this.#size = size;
    }

    // // ************************************* PREV ASSIGNMENT WORK: Improvement : Setup Private method Getter and Setter
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
        // If not, update it,
        // Thus, it would not do the looping everytime, 
        // at the same time, the loop would only check the link starting from the current tail node

        if (!this.#tail)                // If tail is null, set the head to tail first
        {
            this.#setTail(this.#head);
        }

        let count = 0;
        while (this.#tail &&
               this.#tail.next != null)
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

    // ************************************* PREV ASSIGNMENT WORK: Improvement : Add size() return
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

        return this;                        // add return own object for chain action ability
    }


    // ********************************** PREV ASSIGNMENT WORK: Implement append method
    // Append A node.
    append(data)
    {
        let newNode = new Node(data);
        newNode.next = null;                // the newNode should have next as null to be the tail node
        let currentTail = this.#getTail();  // Get the current tail and update the tail next with newNode
        if (currentTail)                    // If had the Tail
        {
            currentTail.next = newNode;
        }
        this.#setTail(newNode);             // Update the tail by the newNode
        this.#size++;

        if (this.#size == 1)
        {
            this.#setHead(newNode);         // For the first item, should be also the head
        }

        return this;                        // add return own object for chain action ability
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

    // ********************************** PREV ASSIGNMENT WORK: Implement removeLast method
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

        return current;
    }

    // --------------------------------------------- ASSIGNMENT 4 : Delete the N-th Node from the End
    removeNthNodeFromEnd(n)
    {
        if (n <= 0 || n > this.#size)
        {
            return null;
        }
        else if (n == 1)
        {
            return this.removeLast();
        }
        else
        {
            return this.removeAt(this.#size - n);
        }
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

     //                                      H      C, N
    //  null <-- [10] <-- [20] <-- [30] <-- [40]  null
    reverseLinkedList() {
        let previous = null;
        let current = this.head;
        let nextNode = null;

        while(current) {
            nextNode = current.next;
            current.next = previous;
            previous = current;
            current = nextNode;
        }
    
        this.head = previous;

    }

    removeDuplicateFromLinkedList() {
        let current = this.head;
        while (current && current.next) {
            if (current.data == current.next.data) {
                current.next = current.next.next;
                this.size--;
            } else {
                current = current.next;
            }
        }
    }
//                    S                F     
    // 1 -> 2 -> 3 -> 4 -> 5 --> 6 --> 7;
    // SlowPointer and Fast Pointer
    findMiddle() {
       let slowPointer = this.head;
       let fastPointer = this.head;

       while (fastPointer && fastPointer.next) {
            slowPointer = slowPointer.next;
            fastPointer = fastPointer.next.next;
       }

       return slowPointer.data;
    }

    // --------------------------------------------- ASSIGNMENT 4 : Add getHead public method
    getHead()
    {
        return this.#getHead();
    }
}


// --------------------------------------------- ASSIGNMENT 4 : Option 1 - Create New Merge Sorted LinkList Instance Without Alter the Original Two List
function MergeSortedLinkedList(linkedList1, linkedList2)
{
    let mergedLinkList = new LinkedList();
    let list1current = linkedList1.getHead();
    let list2current = linkedList2.getHead();
    
    while (list1current || list2current)
    {
        if (list1current && list2current)
        {
            if (list1current.data < list2current.data)
            {
                mergedLinkList.append(list1current.data);
                list1current = list1current.next;
            }
            else
            {
                mergedLinkList.append(list2current.data);
                list2current = list2current.next;
            }
        }
        else if (list1current)
        {
            mergedLinkList.append(list1current.data);
            list1current = list1current.next;
        }
        else
        {
            mergedLinkList.append(list2current.data);
            list2current = list2current.next;
        }
    }
    return mergedLinkList;
}

// --------------------------------------------- ASSIGNMENT 4 : Option 2 - Memory Friendly just refernce back the List 1 and 2 Node memory, but would alter the 
//                                                                         original list 1 and 2 sequence
function MergeSortedLinkedList_WouldAlterOrig(linkedList1, linkedList2)
{
    let mergedHead = null;
    let currentNode = null;
    let list1current = linkedList1.getHead();
    let list2current = linkedList2.getHead();

    while (list1current && list2current)
    {
        if (list1current.data < list2current.data)
        {
            if (currentNode == null)
            {
                currentNode = list1current;
            }
            else
            {
                currentNode.next = list1current;
            }
            list1current = list1current.next;
        }
        else
        {
            if (currentNode == null)
            {
                currentNode = list2current;
            }
            else
            {
                currentNode.next = list2current;
            }
            list2current = list2current.next;
        }

        if (mergedHead == null)
        {
            mergedHead = currentNode;
        }
        else
        {
            currentNode = currentNode.next;
        }
    }

    // If either list 1 or 2 still have node, just link the current node next to the left updated current node would get the rest linkage
    currentNode.next = list1current ? list1current : list2current;
    return new LinkedList(mergedHead, linkedList1.size() + linkedList2.size());
}

console.log(" ----------------------- Question 1 - Merge Two Sorted Linked Lists ---------------------");
console.log("Case 1 - Use Option 1 Method - Create A New Instance Linked List with Nodes");
// Case 1 - Use Option 1 - To Create A New LinkedList Instance and Nodes
// Prepare Two Sorted LinkedList
let linkedList1 = new LinkedList();
let linkedList2 = new LinkedList();

linkedList1.append(1).append(3).append(5);
linkedList2.append(2).append(4).append(6);

const mergedLinkList = MergeSortedLinkedList(linkedList1, linkedList2);
console.log("List 1 :");
linkedList1.printList();
console.log("List 2 :");
linkedList2.printList();
console.log(" ****** Merged List From 1 and 2 ****** :");
mergedLinkList.printList();


console.log();
console.log("Case 2 - Use Option 2 Method - Use back the List 1 and 2 Memory, but would alter the original list sequence");
// Case 2 - Use Option 2 - To Alter Original List 1 and List 2 for saving memory, original List 1 and 2 can be abandoned after the method
// Prepare Two Sorted LinkedList
let linkedList3 = new LinkedList();
let linkedList4 = new LinkedList();

linkedList3.append(100).append(3000).append(5000);
linkedList4.append(20).append(400).append(600000);

const mergedLinkList2 = MergeSortedLinkedList_WouldAlterOrig(linkedList3, linkedList4);
console.log("List 3 :");
linkedList3.printList();
console.log("List 4 :");
linkedList4.printList();
console.log("****** Merged List From 3 and 4 By Alter List Object ****** :");
mergedLinkList2.printList();
console.log();
console.log("List 3 (After) :");
linkedList3.printList();
console.log("List 4 (After) :");
linkedList4.printList();

console.log();
console.log(" ----------------------- Question 2 - Delete the N-th Node from the End ---------------------");
let linkedList5 = new LinkedList();
linkedList5.append(1).append(2).append(3).append(4).append(5);
console.log("Test List 5 :");
linkedList5.printList();
console.log("After Remove the 2-th Node from the End :");
linkedList5.removeNthNodeFromEnd(2);
linkedList5.printList();

console.log();
let linkedList6 = new LinkedList();
linkedList6.append(100).append(23).append(3500).append(4477).append(15);
console.log("Test List 6 :");
linkedList6.printList();
console.log("After Remove the 4-th Node from the End :");
linkedList6.removeNthNodeFromEnd(4);
linkedList6.printList();
console.log("Then Continue After Remove again the 4-th Node from the End :");
linkedList6.removeNthNodeFromEnd(4);
linkedList6.printList();


