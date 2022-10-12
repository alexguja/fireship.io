---
title: Arrays
description: Static and dynamic arrays
weight: 10
lastmod: 2021-02-01T10:23:30-09:00
draft: false
free: true
# vimeo: 508705600
emoji: 📂
video_length: 4:12
chapter_start: Data Structures
---

An _array_ is a linear collection of elements that can be accessed by integer indices. It is one of the most useful data structures and is readily available in most programming languages. In this section, we'll explore the low-level behavior of arrays based on the Word-RAM model.

## Interfaces

### The sequence interface

To make matters interesting, let's try to design an array from scratch.
This can be done using a general specification, usually called an _interface_, which describes what type of elements can be stored and what operations are supported by the array. In this case, the interface is called a _sequence interface_ and it may describe the following operations

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

The stored elements are assumed to be simple data types such as integers or strings. It is also worth noting that there can be _multiple_ data structures that solve a given interface. The next section presents an alternative solution with a different set of advantages compared to the array.

## The Word-RAM model

### Static Arrays

{{< figure src="/courses/algorithms-and-data-structures/img/arrays.png" caption="arrays">}}

To obtain the running times for the array operations, we'll revisit the Word-RAM model. In this model,

- <code>buildFrom(Iterable)</code> takes linear space, as it's essential to allocate a _contiguous_ section of memory to store the array items. When allocating <code>n</code> items, they are typically _initialized_ to a zero value, which takes linear time.
- The array is _static_, i.e. it cannot change its initial size. Hence, maintaining the <code>length</code> takes constant time.
- <code>traverse()</code> takes linear time, as it's essential to iterate through each element before it can be displayed.
- <code>getAt(index)</code> and <code>setAt(index, value)</code> take constant time based on index offsets. Recall that in the Word-RAM model, read and write operations take constant time. Once the memory address of the array is known, the value stored at any other address can also be accessed in constant time. In other words <code>array[index] = memory[address[array] + index]</code>. For example, reading the value at <code>index = 3 </code> can be performed as <code>array[3] = memory(2 + 3) = memory(5)</code> in constant time.

{{< figure src="/courses/algorithms-and-data-structures/img/index3.png" >}}

- <code>insertAt(index, value)</code> and <code>deleteAt(index)</code> are dynamic operations that take linear time. The array is static and needs to be resized with each dynamic operation. This implies that all the elements have to be coppied over to a _new_ array for both insertions and deletions.

### Dynamic Arrays

The last section highlighted a significant weakness when it comes to _static_ arrays. For example, when allocating an array of size <code>k</code>, the address <code>k + 1</code> may be unavailable as it may store different data. Hence, every _dynamic_ operation requires array resizing and triggers a new memory allocation. One possible solution to overcome this issue is to trade memory efficiency for a more optimal running time.

_Dynamic_ arrays allocate a larger section of memory compared to the size of the initial input. If the input has a size <code>k</code>, a dynamic array may allocate <code>ck</code> memory slots, where <code>c</code> is an integer constant larger than <code>1</code>. For simplicity, let's assume <code>c = 2</code>.

{{< figure src="/courses/algorithms-and-data-structures/img/sizevslen.png" >}}

For dynamic arrays, the _length_ of the array corresponds to the _current_ number of stored elements, and the _size_ of the array represents the _maximum_ number of elements. Provided the length of the array is smaller than its size, dynamic operations at the _end_ of the array can be performed in _constant_ time.

When the number of elements is increased to full capacity, a new array is allocated with double the size of the current input. This resizing is expensive and takes linear time, however, it is triggered less frequently compared to static arrays. On the other hand, a large number of constant-time operations have to occur before a single expensive operation, which leads to a so-called constant _amortized_ time.

<!-- {{< figure src="img/amortization.png" >}} -->

For example, a dynamic array of size <code>2N</code> is allocated for an input of size <code>N</code>. It takes precisely <code>N</code> cheap insertions before the array reaches its full capacity.
At this point, a resize is triggered which takes <code>4N</code> time. Computing an average of the running time per dynamic operation leads to an amortized constant time (i.e. <code> (N + 4N) / (N + 1) = O(1)</code> ).

## Arrays in JavaScript

In the real world, static arrays are used in compiled languages like C or Go. Dynamic arrays are common in interpreted languages like Python.
With the exception of _typed-arrays_ introduced in ES6, JavaScript arrays behave as _dynamic_ arrays and are implemented as specialized _objects_.
Let's explore how the array operations are implemented in JavaScript.

{{< file "js" "arrays.js" >}}
{{< highlight "js" >}}

// buildFrom(Iterable) - O(n)
const array = Array.from([1, 2, 3, 4]) // array = [1, 2, 3, 4]

// length()
array.length // 4

// traverse()
array.forEach((item) => console.log(item)) // 1, 2, 3, 4

// getAt(index) - O(1)
array[0]; // 1

// setAt(index, value) - O(1)
array[0] = 2; // array = [2, 2, 3, 4]

// insertFirst(value) - O(n)
array.unshift(0) // array = [0, 2, 2, 3, 4]

// deleteFirst() - O(n)
array.shift(); // array = [2, 2, 3, 4]

// insertLast(value) - O(1)
array.push(5); // array = [2, 2, 3, 4, 5]

// deleteLast() - O(1)
array.pop(); // array = [2, 2, 3, 4]

{{< /highlight >}}

## Summary

| **Operation**                                       | &nbsp; &nbsp; **Worst-case Running Time** |                        |
| :-------------------------------------------------- | :---------------------------------------: | :--------------------: |
|                                                     |             **Static Array**              |   **Dynamic Array**    |
| <code>buildFrom(Iterable)</code>                    |             <code>O(n)</code>             |   <code>O(n)</code>    |
| <code>length()</code>                               |           <code>**O(1)**</code>           | <code>**O(1)**</code>  |
| <code>traverse()</code>                             |             <code>O(n)</code>             |   <code>O(n)</code>    |
| <code>getAt(index)</code>                           |           <code>**O(1)**</code>           | <code>**O(1)**</code>  |
| <code>setAt(index, value)</code>                    |           <code>**O(1)**</code>           | <code>**O(1)**</code>  |
| <code>insertAt(index, value)</code>                 |             <code>O(n)</code>             |   <code>O(n)</code>    |
| <code>deleteAt(index)</code>                        |             <code>O(n)</code>             |   <code>O(n)</code>    |
| <code>insertFirst(value)</code>                     |             <code>O(n)</code>             |   <code>O(n)</code>    |
| <code>insertLast(index, value)</code> &nbsp; &nbsp; |             <code>O(n)</code>             | <code>**O(1) amortized**</code> |
| <code>deleteFirst()</code>                          |             <code>O(n)</code>             |   <code>O(n)</code>    |
| <code>deleteLast()</code>                           |             <code>O(n)</code>             | <code>**O(1) amortized**</code> |
