---
title: Linked Lists
description: A pointer-based data structure alternative to arrays
weight: 11
lastmod: 2021-02-01T10:23:30-09:00
draft: false
free: true
# vimeo: 508705600
emoji: 🔗
video_length: 4:12
---

## Linked Lists

A _linked list_ is a pointer-based data structure consisting of linked nodes, where each node points to a _next_ node. Unlike arrays, the list nodes are not stored sequentially in memory. This implies that we can no longer benefit from random-access when reading/updating elements, however, certain dynamic operations are more efficient. In this section, we'll explore how a linked list satisfies the sequence interface.

### The sequence interface

| **Operation**                                     | **Description**                                                                             |
| :------------------------------------------------ | :------------------------------------------------------------------------------------------ |
| <code>buildFrom(Iterable)</code>                  | Create a new data structure from the elements of a given iterable                           |
| <code>length()</code>                             | Return the size of the data structure (i.e. the number of stored elements)                  |
| <code>traverse()</code>                           | Output the stored elements in sequence order or the _new_ order if the sequence was updated |
| <code>getAt(index)</code>                         | Return the element at the given index                                                       |
| <code>setAt(index, value)</code>                  | Update the element at the given index with a new value                                      |
| <code>insertAt(index, value)</code> &nbsp; &nbsp; | Add a new element after the given index by shifting the relevant indices                    |
| <code>deleteAt(index)</code>                      | Remove an element after the given index by shifting the relevant indices                    |
| <code>insertFirst(value)</code> &nbsp; &nbsp;     | Add a new element at the front of the sequence                                              |
| <code>deleteFirst()</code>                        | Remove the first element                                                                    |
| <code>insertLast(value)</code> &nbsp; &nbsp;      | Add a new element at the end of the sequence                                                |
| <code>deleteLast()</code>                         | Remove the last element                                                                     |

### Singly Linked Lists

Linked lists are best understood using the Pointer Machine model. This model assumes a series of objects, also called _nodes_ 🔴, that each store a small number of fields. Think of fields as key-value pairs in an object. The fields contain data and the memory address of another node. The kind of data stored by each node is assumed identical to the _word_ in the Word-RAM model. In practice this corresponds to a primitive data type such an integer or a string. The memory address of another node is accessed using the _next pointer_ 👉.

{{< figure src="/courses/algorithms-and-data-structures/img/singly-linked-lists.png" >}}

Built on the Pointer Machine model, a linked list is nothing more than a series of nodes with a few additional properties.

- A pointer is maintained to the first node called the _head_ 💆.
- An optional pointer is maintained to the last node called the _tail_ 🐩.

In general, a linked list doesn't have intrinsic indices like an array.
For a linked list, the index is a superficial construct that allows the user to mimic an array. Regardless, the sequence interface includes indices, so we'll assume the position of a node corresponds to its index in the list. For example, the index of the <code>head</code> is <code>0</code>, and the index of the <code>tail</code> is <code>length - 1</code>.

## Performance

Using a linked list to represent a sequence of items has several advantages compared to an array. Let's examine how the list behaves against the sequence operations.

- <code>buildFrom</code> takes _linear_ time ⏳ as it's essential to visit every item in the passed iterable.
- <code>length</code> takes _constant_ time ⚡, as it can be stored as a separate field in the List object. It'e essential to maintain it up to date after dynamic operations.
- <code>traverse</code> takes _linear_ time ⏳, as it's essential to visit every node.
- <code>insertFirst</code> involves a constant number of pointer updates, and is independent of the list size. Based on the Pointer Machine model, creating a node and updating existing node pointers takes constant time ⚡.
- Maintaining a <code>tail</code> reduces the running time of <code>insertLast</code> to _constant_ time ⚡. Similar to <code>insertFirst</code>, the method requires a constant number of updates and is independent of the list size. Without a <code>tail</code>, this method would take _linear_ time ⏳. In that case, it's essential to traverse the entire list before inserting a new node.
- <code>insertAfter</code> takes _linear_ time ⏳ in the worst-case. This corresponds to inserting a node after the penultimate node.
- <code>deleteFirst</code> takes _constant_ time ⚡, as it's independent of the list size. It updates the head to the next node in the list.
- <code>deleteLast</code> / <code>deleteAt</code> / <code>getAt</code> / <code>setAt</code> may require traversal to the penultimate node, which takes _linear_ time ⏳.

## Implementation

### List node

Let's begin by defining a list node. We'll define a class called <code>ListNode</code> and specify two properties - data and next.
The first property represents the data stored in the node. The second property stores the memory address of another node. By default, this property is set to null.
{{< file "js" "linkedList.js" >}}
{{< highlight "js" >}}

class ListNode {
    constructor(data, next = null) {
        this.data = data;
        this.next = next;
    }
}
{{< /highlight >}}

### Linked list

To implement a linked list, we define another class called <code>LinkedList</code> that wraps arround the <code>ListNode</code>.
The <code>LinkedList</code> class has three properties - <code>head</code>, <code>tail</code>, and <code>length</code>. Each property is given an appropriate initial value.
{{< file "js" "linkedList.js" >}}
{{< highlight "js" >}}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
}
{{< /highlight >}}

### Helpers

#### Empty list

It's convenient to implement a helper method that checks if a list is empty.
We'll define a method called <code>isEmpty()</code> that asserts if the length of the list is zero.
{{< file "js" "linkedList.js" >}}
{{< highlight "js" >}}

isEmpty() {
    return this.length === 0;
}

{{< /highlight >}}

### Insertions

#### Insert first

Inserting at the front is one of the most important operations related to a linked list. We'll define a method called <code>insertFirst</code> that accepts a <code>data</code> parameter. From there we create a <code>newNode</code> that stores the passed <code>data</code>. We also set the _next_ pointer of the <code>newNode</code> to the current <code>head</code>. Based on the <code>ListNode</code> constructor, this can be achieved with a single line of code.

We then set the <code>newNode</code> as the current <code>head</code> and increment the list <code>length</code>.
Notice how this code works whether the list is empty or not. If the list is empty, the current <code>head</code> is <code>null</code> by default.
If the list is empty, we also update the <code>tail</code> after making the insertion.

{{< file "js" "linkedList.js" >}}
{{< highlight "js" >}}

insertFirst(data) {
    // Add a new node at the head
    const newNode = new ListNode(data, this.head);
    this.head = newNode;
    this.length++;

    // Add a tail if there isn't one
    if (!this.tail) {
        this.tail = newNode;
    }
}

{{< /highlight >}}

#### Insert last

Inserting at the back of a list involves two cases. If the list is empty, we create a <code>newNode</code>, and update both the <code>head</code> and the <code>tail</code> as the <code>newNode</code>. Otherwise, we access the <code>tail</code> and update it as the <code>newNode</code>. In both cases, we also increment the <code>length</code> of the list after the insertion. When creating a <code>newNode</code> we deliberately pass a single parameter, which makes the <code>next</code> pointer <code>null</code> by default.

{{< file "js" "linkedList.js" >}}
{{< highlight "js" >}}

insertLast(data) {
    const newNode = new ListNode(data);

    // Add a head if there isn't one
    if (this.isEmpty()) {
        this.head = newNode;
        this.tail = newNode;
        this.length++;

    } else {
        // Update the tail with the new node
        const currentTail = this.tail;
        currentTail.next = newNode;
        this.tail = newNode;
        this.length++
    }
}

{{< /highlight >}}

### Deletions

#### Delete first

Deleting the first node in a linked list is an efficient operation ✅. There are two cases to consider. If the list is empty, we define a <code>deletedItem</code> and set its value to <code>null</code>. Otherwise, the <code>deletedItem</code> is set to the head data.
If the list had a single node before deletion, we have to set the <code>head</code> and <code>tail</code> to <code>null</code>.
Otherwise, we skip the current head and make the next node the new head. Finally we decrement the <code>length</code>, and return the <code>deletedItem</code>.

{{< file "js" "linkedList.js" >}}
{{< highlight "js" >}}

deleteFirst() {
    // Delete from an empty list
    let deletedItem = null;

    // Delete from a populated list
    if (!this.isEmpty()) {
        deletedItem = this.head.data;

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head.next;
        }
        this.length--;
    }
    return deletedItem;
}

{{< /highlight >}}

#### Delete last

Deleting from the end of the linked list is expensive 💰. The penultimate node (i.e the node _just before_ the tail) is required for this operation. Currently, our version of the linked list doesn't have a fast way to access this node.

Similar to the previous method, we consider two cases. If the list is empty, we set the <code>deletedItem</code> to <code>null</code>.
Otherwise, we traverse the list all the way to the penultimate node using a <code>for</code> loop. Before exiting the loop, the <code>currentNode</code> is set to the penultimate node. At this point, <code>deletedItem</code> is set to the tail data. The tail data is accessed using <code>currentNode.next.data</code>. The tail is set to the <code>currentNode</code> and its <code>next</code> pointer is set to <code>null</code>. Lastly, we decrement the <code>length</code> and return the <code>deletedItem</code>.

{{< file "js" "linkedList.js" >}}
{{< highlight "js" >}}

deleteLast() {
    // Delete from an empty list
    let deletedItem = null;

    // Delete from a populated list
    if (!this.isEmpty()) {
        let currentNode = this.head;

        // Traverse the list up to the pen-uiltimate node
        for (let iter = 0; iter < this.length - 2; iter++) {
            currentNode = currentNode.next;
        }

        // Retrieve the deleted data and update the tail
        deletedItem = currentNode.next.data;
        this.tail = currentNode;
        currentNode.next = null;
        this.length--;
    }
    return deletedItem;
}

{{< /highlight >}}

### Reads amd writes

#### Get at

Reading data from a linked list can be slow 🐌. If a list is empty, or the specified index is out of bounds, we raise appropriate errors.
Otherwise, we have to consider three cases. If the given index is zero, we return the data stored at the <code>head</code>.
If the given index corresponds to the position of the <code>tail</code>, we return the data stored at the <code>tail</code>.
Otherwise, it's essential to traverse the list up to the target node, and return its data.

{{< file "js" "linkedList.js" >}}
{{< highlight "js" >}}

getAt(index) {
    if (this.isEmpty() || index < 0 || index >= this.length) {
        return null;
    }

    // Get the head data
    if (index === 0) {
        return this.head.data;
    }

    // Get the tail data
    if (index === this.length - 1) {
        return this.tail.data;
    }

    // Get the data at any other node
    let currentNode = this.head;
    for (let iter = 0; iter < index; iter++) {
        currentNode = currentNode.next;
    }
    return currentNode.data;
}


{{< /highlight >}}

#### Set at

<code>setAt</code> is similar to <code>getAt</code>, except we have to pass a value and replace the return statements with a value update. The complexity is similar to <code>getAt</code>.



## Summary


| **Operation** &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; | **Running Time** |
| :-------------------------- | :---------------------------------------: | :-------------------------------------------------------------------- | :--------------: |

|                                                   | **Static Array** &nbsp; &nbsp;  | **Dynamic Array** &nbsp; &nbsp; |  **Linked List** &nbsp; &nbsp;  |     **Doubly Linked List**      |
| :------------------------------------------------ | :-----------------------------: | :-----------------------------: | :-----------------------------: | :-----------------------------: |
| <code>length()</code>                             | <code>O(1)</code> &nbsp; &nbsp; | <code>O(1)</code> &nbsp; &nbsp; | <code>O(1)</code> &nbsp; &nbsp; | <code>O(1)</code> &nbsp; &nbsp; |
| <code>traverse()</code>                           | <code>O(n)</code> &nbsp; &nbsp; | <code>O(n)</code> &nbsp; &nbsp; | <code>O(n)</code> &nbsp; &nbsp; | <code>O(n)</code> &nbsp; &nbsp; |
| <code>buildFrom(Iterable)</code>                  | <code>O(n)</code> &nbsp; &nbsp; | <code>O(n)</code> &nbsp; &nbsp; | <code>O(n)</code> &nbsp; &nbsp; | <code>O(n)</code> &nbsp; &nbsp; |
| <code>getAt(index)</code>                         | <code>O(1)</code> &nbsp; &nbsp; | <code>O(1)</code> &nbsp; &nbsp; | <code>O(n)</code> &nbsp; &nbsp; | <code>O(n)</code> &nbsp; &nbsp; |
| <code>setAt(index, value)</code> &nbsp; &nbsp;    | <code>O(1)</code> &nbsp; &nbsp; | <code>O(1)</code> &nbsp; &nbsp; | <code>O(n)</code> &nbsp; &nbsp; | <code>O(n)</code> &nbsp; &nbsp; |
| <code>insertAt(index, value)</code> &nbsp; &nbsp; | <code>O(n)</code> &nbsp; &nbsp; | <code>O(n)</code> &nbsp; &nbsp; | <code>O(n)</code> &nbsp; &nbsp; | <code>O(n)</code> &nbsp; &nbsp; |
| <code>deleteAt(index)</code>                      | <code>O(n)</code> &nbsp; &nbsp; | <code>O(n)</code> &nbsp; &nbsp; | <code>O(n)</code> &nbsp; &nbsp; | <code>O(n)</code> &nbsp; &nbsp; |
| <code>insertFirst(value)</code> &nbsp; &nbsp;     | <code>O(n)</code> &nbsp; &nbsp; | <code>O(n)</code> &nbsp; &nbsp; | <code>O(1)</code> &nbsp; &nbsp; | <code>O(1)</code> &nbsp; &nbsp; |
| <code>deleteFirst()</code>                        | <code>O(n)</code> &nbsp; &nbsp; | <code>O(n)</code> &nbsp; &nbsp; | <code>O(1)</code> &nbsp; &nbsp; | <code>O(1)</code> &nbsp; &nbsp; |
| <code>insertLast(value)</code> &nbsp; &nbsp;      | <code>O(n)</code> &nbsp; &nbsp; | <code>O(1) amortized</code>     | <code>O(n)</code> &nbsp; &nbsp; | <code>O(1)</code> &nbsp; &nbsp; |
| <code>deleteLast()</code>                         | <code>O(n)</code> &nbsp; &nbsp; | <code>O(1) amortized</code>     | <code>O(n)</code> &nbsp; &nbsp; | <code>O(1)</code> &nbsp; &nbsp; |
