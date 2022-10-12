---
title: Stacks
description: Array based data structures
weight: 12
lastmod: 2021-02-01T10:23:30-09:00
draft: false
free: true
# vimeo: 508705600
emoji: 📚
video_length: 4:12
---

## Stacks

A _stack_ is a data stucture that stores a sequence of items that can only be accessed from _one_ end.
It follows the last-in, first-out principle or _LIFO_ which means that it's essential to remove the outer elements in a stack before accessing the inner ones.
The need for efficient dynamic operations at one end means that dynamic arrays and linked lists are a great choice as the underlying data structure for a stack.

{{< figure src="/courses/algorithms-and-data-structures/img/stacks.png" caption="Stack Visualisation">}}

A stack is easily implemented using an array, where the _back_ of the array now corresponds to the _top_ of the stack.
Based on the previous sections, the array supports dynamic operations at the back in _constant_ ⚡ (amortized) time.
This suggests that insertions and deletions at the _top_ of the stack are extremely efficient.

If a stack is implemented using a list, the _head_ of the list would correspond to the _top_ of the stack.
Similarly, this results in extremely efficient dynamic operations at the top of the stack.

## Stack Operations

Stacks are historically popular data structures and their operations have special names. An insertion is known as an _push_, and a deletion is known as a _pop_.
These operations inspired the names of the equivalent array methods in JavaScript.
In addition to push and pop, a stack also supports a _peek_ operation which shows the current element at the top of the stack.
An optional operation is to maintain the length of the stack.

| **Operation**                            | **Description**                                                          |
| :--------------------------------------- | :----------------------------------------------------------------------- |
| <code>length()</code>                    | Return the size of the stack (i.e. the number of stored elements)        |
| <code>push(element)</code> &nbsp; &nbsp; | Add an element at the top of the stack                                   |
| <code>pop()</code>                       | Remove the most recently added element                                   |
| <code>peek()</code>                      | Return the current element at the top of the stack (without removing it) |

You'll note that many of the sequence operations for arrays and lists are not relevant for the stack, mainly because they are asymtotically slow 🐌.
In other words the stack implementation is limited to the most efficient operations.

## Applications
Stacks are often used in programming language runtime environments in the form of call stacks to trace the execution of various functions. A call stack is a data structure that stores the current execution context of a program. When a function is called, or it calls another function, a stack frame is pushed onto the stack. The stack frame contains the function's arguments, the function's local variables, and the function's return address. When the function returns, the stack frame is popped off the stack.

Another interesting application of stacks is to implement a router in a web application. 

## Implementation

Unlike the list implementation that was built from scratch, the stack implementation is a thin wrapper on top of a dynamic array.
We begin by defining a <code>Stack</code> class and building the <code>constructor</code> which accepts a single parameter called <code>size</code>. This parameter determines the fixed length of the stack.
In the <code>constructor</code> body, we also define an array that stores the stack elements, called <code>stack</code>, and an index variable that points to the top of the stack, called <code>top</code>. From there, we have all we need to implement the rest of the stack operations.

- <code>length</code> is proportional to the <code>top</code> index. For example, if there are 5 elements on the stack, <code>top</code> will store the value 5. If there are no elements on the stack, <code>top</code> will store the value 0. Hence we simply return <code>this.top</code> when we're interested in the stack length.
- <code>push(element)</code> increments the top of the stack and stores the passed element at the top of the stack.
If an attempt is made to push to a full stack, an error is thrown notifying ther user the stack has reached full capacity.
- <code>pop</code> returns the current element at the top of the stack and decrements the <code>top</code> variable.
If an attempt is made to pop from an empty stack, an error is thrown notiyfing the user there are no elements to pop from the stack.
- <code>peek</code> returns the current element at top the of the stack. If an attempt is made to peek into an empty stack, an error is thrown notifying the user the stack doesn't contain any elements.


{{< file "js" "stack.js" >}}
{{< highlight "js" >}}
class Stack {
    constructor(size) {
        this.size = size;
        this.stack = new Array(size);
        this.top = 0;
    }

    length() {
        return this.top;
    }

    isEmpty() {
        return this.top === 0;
    }

    push(element) {
        if (this.top == this.size) {
            throw new Error("Cannot push to a full stack");
        } else {
            ++this.top;
            return (this.stack[this.top] = element);
        }
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error("Cannot pop from an empty stack");
        } else {
            --this.top;
            return this.stack[this.top];
        }
    }

    peek() {
        if (this.top == 0) {
            throw new Error("Cannot peek into an empty stack");
        }
        return this.stack[this.top];
    }
}

{{< /highlight >}}
