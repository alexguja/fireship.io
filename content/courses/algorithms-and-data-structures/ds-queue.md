---
title: Queues
description: Linked list based data structures
weight: 13
lastmod: 2021-02-01T10:23:30-09:00
draft: false
free: true
# vimeo: 508705600
emoji: 🛍️
video_length: 4:12
---

## Queues

A _queue_ is a data stucture that is built based on the _First-In-Frst-Out_ or _FIFO_ principle. The first element added to the queue is the first one to be removed. This allows us to retrieve data in the same order as it was stored. The first element in the queue is called the _head_ of the queue, and the last element is called the _tail_. A queue is most easily implemented using a _linked list_.

{{< figure src="/courses/algorithms-and-data-structures/img/queues.png" caption="Queue Visualisation">}}

## Queue Operations

| **Operation**                               | **Description**                                                            |
| :------------------------------------------ | :------------------------------------------------------------------------- |
| <code>length()</code>                       | Return the size of the queue (i.e. the number of stored elements)          |
| <code>enqueue(element)</code> &nbsp; &nbsp; | Add an element to the end of the queue                                     |
| <code>dequeue()</code>                      | Remove the element at the front of the queue                               |
| <code>peek()</code>                         | Return the current element at the front of the queue (without removing it) |
| <code>isEmpty()</code>                      | Helper method to check if the queue contains any elements                  |

## Applications
A popular application for a queue is handling events 🎬. For example, the client-side JavaScript runs a single threaded event loop 🔁, however it also uses a [microtask queue](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide) to process real-time asynchronous events.

Other interesting applications include scheduling resources in single CPU core and maintaing a media playlist.

## Implementation

The queue implementation is a thin wrapper on top of a singly linked list.
We begin by defining a <code>Queue</code> class and building the <code>constructor</code>.
In the <code>constructor</code> body, we define a _list_ that stores the elements in the queue. From there, we can use the linked list operations to implement the queue.

- <code>length</code> is a helper method that returns the number of elements in the queue.
- <code>isEmpty</code> is another helper method that checks if there are any elements stored in the queue.
It returns <code>true</code> if the queue is emtpy, and <code>false</code> otherwise.
- <code>enqueue</code> takes an element and adds it to the back of the queue.
- <code>dequeue</code> removes and returns the current element at the front of the queue.
- <code>peek</code> returns the top current element at the front of the queue by accessing the head of the underlying list.



{{< file "js" "queue.js" >}}
{{< highlight "js" >}}
class Queue {
    constructor() {
        this.list = new LinkedList();
    }

    isEmpty() {
        return this.list.isEmpty();
    }

    length() {
        return this.list.length;
    }

    enqueue(value) {
        this.list.insertLast(value);
    }

    dequeue() {
        return this.list.deleteFirst();
    }

    peek() {
        return this.list.isEmpty() ? null : this.list.getAt(0);
    }
}
{{< /highlight >}}
