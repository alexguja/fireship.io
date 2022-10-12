---
title: Computation Models
description: Watch this video before starting the course!
weight: 2
lastmod: 2021-02-01T10:23:30-09:00
draft: false
youtube: vqs_0W-MSB0
free: true
emoji: 💽 
video_length: 2:12
quiz: true
---

<quiz-modal options="yes:no" answer="yes" prize="0">
  <h5>I updated my package.json with the versions specified in this lesson?</h5>
  <p>Using other versions could result in broken code</p>
</quiz-modal>


Good algorithms rely on _efficient_ procedures to solve computational problems. In general, a correct algorithm may not be practical if it doesn't scale well on arbitrarily large inputs. To measure the efficiency of an algorithm, we rely on _computation models_ that abstract real hardware with simple mathematical analogies.

A computation model specifies the operations that can be performed by an algorithm, and their cost (running time). Typical operations include addition, subtraction, comparison, loading, and storing data, etc. Two popular computation models are the _Word-RAM_ and the _Pointer Machine_.

## The Word-RAM Model

The Word-RAM model (where RAM stands for random access machine) is the mathematical equivalent of computer memory. It is often viewed as a giant array with a fixed number of addresses, each storing a _word_ of <code>k</code> bits. In the real world, the word is a unit of 32 or 64 bits, depending on the underlying system on a machine and it represents the size of a memory address. In this model, operations such as loading a word from a memory address, bitwise operations on words, and storing words in memory take _constant_ time.
{{< figure src="/courses/algorithms-and-data-structures/img/word-RAM.png" caption="The Word-RAM model">}}

## The Pointer Machine Model

The pointer machine model is often associated with Object-Oriented Programming. It involves objects (or nodes) with a constant number of fields where each field can either store a word or a pointer to another object. A pointer that doesn't reference another object is called _null_. In this model it is assumed that following a pointer (e.g. calling <code>node.next</code>) takes _constant_ time. The Pointer Machine model can be implemented using Word-RAM by replacing pointers with indices in the Word-RAM table. However, it offers a more convenient way of thinking about many popular data structures.

{{< figure src="/courses/algorithms-and-data-structures/img/pointer-machine.png" >}}

## Summary

Computation models offer a way to think in low-level terms while writing high-level code. They provide a simple way to understand low-level behavior and computation costs.
The limited operations in the Word-RAM model are closely related to Assembly-style programming. This model is great for understanding data structures that rely on _contiguous_ memory allocation, such as _static_ arrays.

The Pointer-Machine model is closely related to Object-Oriented Programming. This model captures _dynamic_ memory allocation, where items aren't necessarily stored adjacent to each other. The upcoming sections make use of both models to explore the behavior of classic algorithms and data structures.

