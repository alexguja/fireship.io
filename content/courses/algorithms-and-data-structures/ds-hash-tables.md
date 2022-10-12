---
title: Hash Tables
description: An abstract data structure for processing key value pairs
weight: 14
lastmod: 2021-02-01T10:23:30-09:00
draft: false
free: true
# vimeo: 508705600
youtube: NuyzuNBFWxQ
emoji: 🔀
video_length: 4:12
---

## Hash Tables

A _hash table_ is an efficient data structure for inserting, deleting and searching for items. An item refers to an object that has a distinct key and a collection of fields commonly referred to as satellite data. For simplicity, we'll consider an item as a key-value pair.

## Hash Table Operations

| **Operation**                                     | **Description**                                                                             |
| :------------------------------------------------ | :------------------------------------------------------------------------------------------ |
| <code>insertItem(key, value)</code> &nbsp; &nbsp; | Insert an item (key-value pair) into the hash table.                                        |
| <code>getItem(key)</code> &nbsp; &nbsp;           | Find and return the value of an item based on the item key. Return null if unsucessful.     |
| <code>removeItem(key)</code>                      | Remove an item based on the item key. If successful return the item, otherwise return null. |

## Motivation

Based on our previous understanding of arrays and the Word-RAM model, it seems that mapping a set of keys to the indices of an array can satisfy all of the above operations in _constant_ time ⚡. So why are hash tables needed? 🤔.. 

The caveat of using an array is that it's essential to allocate an index for _every_ possible key 🔑 in the set. This approach may work if the keys are small, but it's impractical for larger keys as it requires a lot of memory space 💽.
Furthermore, if the keys are sufficiently large, they may not fit in a single memory address on a machine, hence breaking the direct access property ❌ .

Another posibility is that the the number of keys  _actually_ stored in the table is small relative to the number of indices in the allocated array.
Recall that arrays are allocated in _contigous_ memory blocks, but the set of keys might be _sparse_. Finally, the keys are not always positive integers, so further work is needed to process them.

A hash table solves these problems by relying on a technique called _hashing_.

## Hashing

A _hash function_ 🥣 is used to map a set of keys of arbitrary size, including character strings, to fixed-size hash codes such as <code>32-bit</code> or <code>64-bit</code>integers. These integers correspond to positions of the hashed items in the hash table. The hash table is an array of a pre-determined size, however, it can be dynamically resized to accommodate new items.

The key property of a hash function is to map two equal keys to the same hash code. However, the hash function is _not_ generally expected to compute a unique hash for every distinct key.
This implies that two items, <code>item1 = (k1, v1)</code> and <code>item2 = (k2, v2)</code>, could have the same hash code ✅, despite having different keys ❌ (i.e. <code>hash(k1) == hash(k2)
</code>, but <code>k1 != k2</code>).

This occurence is known as a _collision_, and the simplest way to handle it is to use a technique called _chaining_, where the fundamental idea is to store colliding elements in a _linked list_. For hash tables that use chaining, each array index is called a _bucket_.

{{< figure src="/courses/algorithms-and-data-structures/img/hash-table.png" title="Hash Table Visualisation">}}

In summary, a hash table is a static array that stores list nodes containing item data, and
the mapping between the set of keys and the hash table buckets is decided based on a hash function.

## Performance

The performance of a hash table depends on the average length of its chains. In the worst case, every key is mapped to the same bucket, which reduces the hash table to a singly linked list. In this case, the hash table operations would take <code>linear</code> time.

Fortunately, practical hash functions allow us to avoid such behaviour, assuming that keys are equally likely to be mapped to any bucket. A well defined hash function will not map every key to the same bucket, hence, a better performance indicator for a hash table is the _average_ case. For a hash table of size <code>m</code> and set of <code>n</code> keys, the average length of a chain is given by <code>n/m</code>. This is an important ratio commonly referred to as the _load factor_ for the hash table.

The computatational cost of the hash table operations can be then expressed as <code>O(1 + n/m)</code>, where the first term represents the cost of hashing and accessing a bucket, and the second term represents the cost of traversing a chain. Ideally, we'd like to allow for a variable number of keys, so <code>n</code> can grow much larger than the initial table size <code>m</code>. This would again lead to a linear computational cost, and result in a slow hash table.

For a dynamic hash table, the goal is to keep the load factor constant, which would lead to fast performance. If we consider the computational cost expression, <code>O(1 + n/m)</code> where <code>n/m = c</code> and <code>c</code> is a constant, the cost can be reduced to <code>O(1 + n/m) = O(1 + c) = O(1)</code> ⚡.

## Table Resizing

The last piece of the puzzle is to come up with a strategy to resize the hash table to bound the load factor by a constant. In other words, we want to grow the table as the number of keys increases, or to satisfy the limit <code>m = O(n)</code>. Intuitively, resizing the table based on the number of keys is a good approach, because keeping a fixed size table with a growing number of keys would eventually result in _linear_ running time ⏳. On the other hand, allocating a large table upfront would be wasteful in memory space.

A common strategy to solve this issue is to _double_ the table size when the number of keys exceeds the table size. In other words, when <code>n > m</code> we can set <code>m' = 2m </code>. Conversely, when the number of keys falls below a _quarter_ of the current table size, or <code>n < m/4 </code>, we can shrink the table to _half_ its current size, or set <code>m' = m / 2</code>. Resizing a hash table requires that every item is rehashed, as the hash function depends on the table size. This is an expensive operation and it takes <code>O(m + n + m') = O(n)</code> time. The first two terms represent the cost of visiting every key in the _current_ table, the second term represents the cost of allocating and initializing every bucket in the _new_ table. Fortunately, this operation is infrequent, so the _amortised_ cost is reduced to _constant_ time.

## Applications

## Implementation

### Table Entry

{{< file "js" "hashTable.js" >}}
{{< highlight "js" >}}

class TableEntry {
    constructor(key, value, next = null) {
        this.key = key;
        this.value = value;
        this.next = next;
    }
}

{{< /highlight >}}

### Hash Table

{{< file "js" "hashTable.js" >}}
{{< highlight "js" >}}

class HashTable {
    constructor(size = 10) {
        this.table = Array(size).fill(null);
        this.size = size;
        this.count = 0;

        // 👇 Resize load factor bounds
        this.lowerBound = 0.25;
        this.upperBound = 1;
    }

{{< /highlight >}}


### Hash function
{{< file "js" "hashTable.js" >}}
{{< highlight "js" >}}

simpleHash(key) {
    let sum = 0;
    for (let index = 0; index < key.length; index++) {
        sum += key.charCodeAt(index);
    }
    return sum % this.size;
}

{{< /highlight >}}


### Reading items
{{< file "js" "hashTable.js" >}}
{{< highlight "js" >}}

getItem(key) {
    const index = this.simpleHash(key);
    let entry = this.table[index];
    while (entry) {
        if (entry.key == key) return entry.value;
        entry = entry.next;
    }
    return null;
}

{{< /highlight >}}


### Writing items
{{< file "js" "hashTable.js" >}}
{{< highlight "js" >}}

putItem(key, value) {
    const index = this.simpleHash(key);
    let entry = this.table[index];
    while (entry) {
        if (entry.key == key) {
            entry.value = value;
            return;
        }
        entry = entry.next;
    }
    this.table[index] = new TableEntry(key, value, this.table[index]);
    ++this.count;

    // Grow table if the upper bound for resizing is met
    if (this.count / this.size == this.upperBound) {
        this.resize(2 * this.size);
    }
}


{{< /highlight >}}


### Removing items
{{< file "js" "hashTable.js" >}}
{{< highlight "js" >}}

remove(key) {
    const index = this.simpleHash(key);
    let entry = this.table[index];
    let previous = null;
    while (entry) {
        if (entry.key == key) {
            // Remove an intermediate node 🔗
            if (previous) {
                previous.next = entry.next;
            } else {
                // Remove the head 🧟‍♂️
                this.table[index] = entry.next;
            }
            --this.count;

            // Shrink table if the lower bound for resizing is met
            if (this.count / this.size == this.lowerBound) {
                this.resize(this.size / 2);
            }

            return entry.value;
        } 
        // Update location in the bucket 🪣
        [previous, entry] = [entry, entry.next];
    }
    return null;
}

{{< /highlight >}}

### Resizing the Hash Table

{{< file "js" "hashTable.js" >}}
{{< highlight "js" >}}

resize(newSize) {
    const newTable = new HashTable(newSize);

    // Traverse the old table and rehash each entry 🚶
    this.table.forEach((entry) => {
        while (entry) {
            newTable.putItem(entry.key, entry.value);
            entry = entry.next;
        }
    });
    this.table = newTable.table;
    this.size = newTable.size;
}

{{< /highlight >}}


## Summary