---
title: Binary Trees
description: An abstract data structure for processing key value pairs
weight: 15
lastmod: 2021-02-01T10:23:30-09:00
draft: false
free: true
# vimeo: 508705600
emoji: 🌳
video_length: 4:12
---

## Binary Trees
A _Binary Tree_ is a pointer-based data structures that can store a collection of values with efficient searching, insertion, and removal capabilities.


{{< figure src="/courses/algorithms-and-data-structures/img/bst.png" caption="Binary Search Tree Visualisation">}}
## Implementation

### Binary Tree Node

```js
class TreeNode {
    constructor(key, value, left = null, right = null) {
        this.key = key;
        this.value = value;
        this.left = left;
        this.right = right;
    }
}
```

### Binary Tree

```js
class BinarySearchTree {
    constructor() {
        this.root = null;
    }
}
```

### Inserting nodes

```js
insert(key, value) {
    // Recursive helper function
    const insertNode = (node, key, value) => {
        if (node == null) {
            return new TreeNode(key, value);
        }
        if (key < node.key) {
            node.left = insertNode(node.left, key, value);
        }
        if (key === node.key) {
            throw new Error("Cannot insert a node with a duplicate key!");
        }
        if (key > node.key) {
            node.right = insertNode(node.right, key, value);
        }
        return node;
    };

    this.root = insertNode(this.root, key, value);
}

```

### Searching for nodes

```js
find(key) {
    let currentNode = this.root;
    while (currentNode !== null) {
        if (key === currentNode.key) return true;
        if (key < currentNode.key) currentNode = currentNode.left;
        if (key > currentNode.key) currentNode = currentNode.right;
    }
    return false;
}
```

### Removing nodes


```js
remove(key) {
    // Remove min helper function
    const removeMin = (node) => {
        if (node.left == null) return node.right;
        node.left = removeMin(node.left);
        return node;
    };

    // Find successor helper function
    const findMin = (node) => {
        while (node.left !== null) node = node.left;
        return node;
    };

    // Recursive helper function
    const removeNode = (node, key) => {
        if (node == null) {
            return null;
        } else if (key < node.key) {
            node.left = removeNode(node.left, key);
        } else if (key > node.key) {
            node.right = removeNode(node.right, key);
        } else {
            if (node.left == null) return node.right;
            if (node.right == null) return node.left;

            const target = node;
            const successor = findMin(target.right);

            successor.right = removeMin(target.right);
            successor.left = target.left;
            return successor;
        }
        return node;
    };

    this.root = removeNode(this.root, key);
}
```