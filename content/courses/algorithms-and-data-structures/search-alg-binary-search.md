---
title: Binary Search
description: An overview of the binary search algorithm
weight: 40
lastmod: 2021-02-01T10:23:30-09:00
draft: false
free: true
# youtube: MFhxShGxHWc
emoji: 🔍
video_length: 4:12
chapter_start: Search Algorithms
---

## Introduction
_Binary search_ is a classic search algorithm that finds a target value in a sorted collection. The algorithm works by comparing the target value to the mid-value of the collection. If the values match, the algorithm returns the index of the mid-value. Otherwise, it eliminates half of the search space and attempts another search on the remaining space. The process repeats until a match is found or the search space is exhausted. The algorithm has _logarithmic_ time complexity ⚡.

## Exhaustive search

Let's imagine we need to find a document in an indexed database that stores unprocessed data. Our strategy is to search by document ID, which is commonly referred to as search by key. In this case, the _key_ 🔑 is a document property, and it shouldn't be confused with the database index.
Searching for a particular document in an arbitrary collection of size <code>N</code> could take _linear_ time in the worst case or <code>O(N)</code>⏳. In other words, we have to exhaustively check every document in the database before we find the correct one in the worst case.

### A simple example
The exhaustive search example is conceptually similar to searching for a value in an unsorted array.
If the target value is at the end of the array, the search will take _linear_ time. 

{{< figure src="/courses/algorithms-and-data-structures/img/linear_search.png" title="linear search" >}}


### Linear search implementation
Implementing linear search is straightforward, and can be done using a for loop as shown below.
This is an example of a brute-force algorithm, as its underlying strategy is naive, but it's the best we can do with unsorted data.
The algorithm traverses the array and checks for a match. If there's a match, it returns the match _index_. Otherwise, it returns <code>-1</code> after the execution exits the loop.

{{< file "js" "linearSearch.js" >}}
{{< highlight "js" >}}


// Linear search - Time complexity: O(n)
const linearSearch = (arr, val) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === val) {
            return i;
        } 
    }
    return -1
};
{{< /highlight >}}


## Binary Search
If the underlying array is _sorted_, the search efficiency can be dramatically increased. Let's see this in action based on the previous example. Imagine we're searching for <code>42</code> in the following sorted array.

### Algorithm walkthrough
The binary search algorithm relies on two indices to define the search space. These are the start and end indices.
It then computes the midpoint index and compares the target to the value stored at the midpoint index.
If there is a match, the algorithm returns the match index. Otherwise, it relies on the sorted property of the array to eliminate the irrelevant half of the search space. Let's see this in detail.

#### Step 1
{{< figure src="/courses/algorithms-and-data-structures/img/step1.png" title="step 1" >}}
- Initially, the search space contains the entire array, so the start and end points correspond to 0 and 9 respectively.
- The array contains an odd number of elements, so the midpoint is computed using floor division. In this case<code> mid = (0 + 9) // 2 = 4 </code>.
- Comparing the target to the value stored at the midpoint indicates that the lower half of the search space can be eliminated. In this case the target <code>(42)</code> is greater than the midpoint value <code>(23)</code>. The sorted property of the array implies that all the values to the left of the midpoint are lower or equal to <code>23</code>, so the first half of the array cannot possibly contain the target.
- The search space is reduced to the upper half of the array and the process is repeated until a match is found or the algorithm terminates.

#### Step 2
{{< figure src="/courses/algorithms-and-data-structures/img/step2.png" title="step 2" >}}

- The new search space consists of the array elements between indices 5 and 9.
- The midpoint is computed as <code>mid = (5 + 9) // 2 = 7</code>.
- Comparing the target value to the value at the newly computed midpoint indicates that the upper half of the search space can be eliminated. In this case, the target <code>(42)</code> is lower than the midpoint value <code>(62)</code>, so any value to the right of the midpoint value will also be higher than the target.
- The search space is reduced once again.

#### Step 3
{{< figure src="/courses/algorithms-and-data-structures/img/step3.png" title="step 3" >}}

- The search space is now reduced to two indices (5 & 6).
- The midpoint is computed as <code>mid = (5 + 6) // 2 = 5</code>.
- Comparing the target to the midpoint value indicates a match, so the algorithm returns the midpoint index and terminates.

### Binary search implementation
This section shows two popular implementations for binary search that rely on iterations and recursion.

#### Iterative Binary Search
The iterative implementation defines a function that takes two parameters - the underlying array <code>(arr)</code> and the target value <code>(val)</code>. It is assumed the given array is sorted. A search space is delimited by two variables, <code>start</code> and <code>end</code>. Initially, these correspond to the first and last index of the underlying array.

The iterative search is implemented using a <code>while</code> loop that terminates once there's a match, or the entire search space is exhausted. Inside the loop body, the execution computes a midpoint <code>(mid)</code> and compares it to the target value.  If the values match, the algorithm returns the midpoint index. Otherwise, it disregards the irrelevant half of the search space. This is achieved by updating either the <code>start</code> or <code>end</code> accordingly. If the loop terminates and there's no match, the algorithm returns <code>-1</code>.

{{< file "js" "binarySearch.js" >}}
{{< highlight "js" >}}
// Binary search - Time complexity: O(log n)
const binarySearch = (arr, val) => {
    let start = 0;
    let end = arr.length - 1;
    while (start <= end) {
        let mid = Math.floor((start + end) / 2);
        if (arr[mid] === val) return mid;
        if (arr[mid] > val) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }
    return -1
};
{{< /highlight >}}

#### Recursive Binary Search
The recursive implementation achieves the same steps, but it requires more parameters.
The function also takes the <code>start</code> and <code>end</code> indices as inputs. The implementation begins with a termination condition to avoid an infinite recursive loop. It then computes the midpoint <code>(mid)</code>and makes the comparison to the target value, in a just like the iterative approach. Depending on the comparison result, either a match index is returned, or the function is called again on the reduced search space. Finally, if the entire search space is traversed an no match is found, the algorithm returns <code> -1 </code>.

{{< file "js" "recursiveBinarySearch.js" >}}
{{< highlight "js" >}}

// Binary search - Time complexity: O(log n)
const recursiveBinarySearch = (arr, val, start, end) => {
    if (start > end) return -1;
    let mid = Math.floor((start + end) / 2);  
    if (arr[mid] === val) return mid;
    if(arr[mid] > val) {
        return recursiveBinarySearch(arr, val, start, mid - 1);
    } else {
        return recursiveBinarySearch(arr, val, mid + 1, end);
    }
}
{{< /highlight >}}

### Time complexity
The running time of binary search can be expressed as <code>T(n) = T(n/2) + c</code> where
<code>T</code> is the running time, <code>n</code> is the size of the underlying array, and <code>c</code> is a constant that represents simple operations such as updating the start/end points. Solving this recurence leads to a logarithmic or <code>O(log n)</code> complexity. 

This running time is far superior to the linear time complexity of the exhaustive search. For example, for an input size of 1 billion sorted items, approximately 30 searches are required to locate a target item. On the other hand, sorting an array can be computationally expensive 💰. Sorting a collection can be well worth the pre-processing cost if many searches are required.