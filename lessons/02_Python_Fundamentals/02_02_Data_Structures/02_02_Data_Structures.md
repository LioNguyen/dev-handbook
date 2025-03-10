# Data Structures: A Comprehensive Guide

## Table of Contents

1. [Introduction](#1-introduction)
2. [Frequently Used Data Structures](#2-frequently-used-data-structures)
   1. [Arrays/Lists](#21-arrayslists)
   2. [Dictionaries/Objects](#22-dictionariesobjects)
   3. [Sets](#23-sets)
   4. [Maps](#24-maps)
   5. [Stacks](#25-stacks)
   6. [Queues](#26-queues)
3. [Rarely Used Data Structures](#3-rarely-used-data-structures)
   1. [Tuples](#31-tuples)
   2. [Linked Lists](#32-linked-lists)
   3. [Trees](#33-trees)
   4. [Graphs](#34-graphs)
   5. [Heaps](#35-heaps)
   6. [Tries](#36-tries)
4. [Time and Space Complexity](#4-time-and-space-complexity)
   1. [Big O Notation](#41-big-o-notation)
   2. [Complexity Comparison](#42-complexity-comparison)
5. [Data Structure Selection](#5-data-structure-selection)
   1. [Selection Criteria](#51-selection-criteria)
   2. [Common Scenarios](#52-common-scenarios)
6. [Interview Strategies](#6-interview-strategies)
   1. [Common Questions](#61-common-questions)
   2. [Problem-Solving Techniques](#62-problem-solving-techniques)

## 1. Introduction

Data structures are specialized formats for organizing, storing, and manipulating data. The choice of data structure significantly impacts the efficiency and performance of your algorithms. This guide provides a comprehensive overview of various data structures, comparing their implementations in Python and JavaScript, to help you prepare for senior-level technical interviews.

## 2. Frequently Used Data Structures

These data structures appear in day-to-day programming tasks and are essential building blocks for most applications.

### 2.1 Arrays/Lists

Arrays (JavaScript) or Lists (Python) are ordered collections of elements accessed by index.

#### Python Implementation

```python
# Creating lists
my_list = [1, 2, 3, 4, 5]
heterogeneous_list = [1, "string", True, []]
nested_list = [[1, 2], [3, 4], [5, 6]]

# Common operations
my_list.append(6)         # Add element to end
my_list.insert(0, 0)      # Insert at index
my_list.pop()             # Remove last element
my_list.pop(0)            # Remove at index
my_list.remove(3)         # Remove first occurrence of value
element = my_list[2]      # Access by index
length = len(my_list)     # Get length
sliced = my_list[1:4]     # Slice (elements 1 through 3)
my_list.sort()            # Sort in-place
sorted_list = sorted(my_list)  # Return sorted copy
```

#### JavaScript Comparison

```javascript
// Creating arrays
const myArray = [1, 2, 3, 4, 5];
const heterogeneousArray = [1, "string", true, []];
const nestedArray = [
  [1, 2],
  [3, 4],
  [5, 6],
];

// Common operations
myArray.push(6); // Add element to end
myArray.unshift(0); // Add to beginning
myArray.pop(); // Remove last element
myArray.shift(); // Remove first element
myArray.splice(2, 1); // Remove 1 element at index 2
const element = myArray[2]; // Access by index
const length = myArray.length; // Get length
const sliced = myArray.slice(1, 4); // Slice (elements 1 through 3)
myArray.sort(); // Sort in-place
const sortedArray = [...myArray].sort(); // Return sorted copy
```

#### Time Complexity

- Access: O(1)
- Search: O(n)
- Insertion/Deletion (at end): O(1) amortized
- Insertion/Deletion (at beginning/middle): O(n)

#### Use Cases

- Sequential data storage
- Buffer for processing data streams
- Stack/queue implementation
- Storing homogeneous collections

#### Interview Insights

- Arrays are the foundation for many other data structures
- Be mindful of time complexity when inserting/removing elements
- Consider array vs. linked list tradeoffs for frequent insertions/deletions
- Know how to implement common algorithms (sort, search, filter)

### 2.2 Dictionaries/Objects

Dictionaries (Python) or Objects (JavaScript) store key-value pairs for efficient lookups by key.

#### Python Implementation

```python
# Creating dictionaries
my_dict = {'apple': 'red fruit', 'bear': 'large animal'}
empty_dict = {}
nested_dict = {'fruits': {'apple': 'red', 'banana': 'yellow'}}

# Common operations
my_dict['elephant'] = 'large mammal'  # Add or update
del my_dict['bear']       # Delete key
value = my_dict['apple']  # Access by key
value = my_dict.get('banana', 'not found')  # Access with default
keys = my_dict.keys()     # Get all keys
values = my_dict.values() # Get all values
items = my_dict.items()   # Get all key-value pairs
'apple' in my_dict        # Check if key exists
```

#### JavaScript Comparison

```javascript
// Creating objects
const myObj = { apple: "red fruit", bear: "large animal" };
// Alternative syntax
const myObj2 = {
  apple: "red fruit",
  bear: "large animal",
};
const emptyObj = {};
const nestedObj = { fruits: { apple: "red", banana: "yellow" } };

// Common operations
myObj.elephant = "large mammal"; // Add or update (dot notation)
myObj["giraffe"] = "tall animal"; // Add or update (bracket notation)
delete myObj.bear; // Delete key
const value = myObj.apple; // Access by key (dot notation)
const value2 = myObj["apple"]; // Access by key (bracket notation)
const value3 = myObj.banana || "not found"; // Access with default
const keys = Object.keys(myObj); // Get all keys
const values = Object.values(myObj); // Get all values
const entries = Object.entries(myObj); // Get all key-value pairs
"apple" in myObj; // Check if key exists
```

#### Time Complexity

- Access: O(1) average, O(n) worst case
- Insertion: O(1) average, O(n) worst case
- Deletion: O(1) average, O(n) worst case
- Search by key: O(1) average, O(n) worst case
- Search by value: O(n)

#### Use Cases

- Fast lookups by key
- Caching/memoization
- Counting occurrences
- Representing structured data
- Implementing associative arrays

#### Interview Insights

- Hash tables are the underlying implementation
- Keys are unique; adding duplicate key overwrites previous value
- In JavaScript, object keys are always strings or symbols
- Python dictionaries maintain insertion order (since 3.7)
- Handle potential KeyError/undefined gracefully

### 2.3 Sets

Sets store unique, unordered elements with fast membership testing.

#### Python Implementation

```python
# Creating sets
my_set = {1, 2, 3, 4, 5}
my_set = set([1, 2, 2, 3, 3, 3])  # Creates {1, 2, 3}
empty_set = set()  # Can't use {} (that creates empty dict)

# Common operations
my_set.add(6)             # Add element
my_set.remove(3)          # Remove element (raises error if not present)
my_set.discard(3)         # Remove element (no error if not present)
3 in my_set               # Membership test
set_a = {1, 2, 3}
set_b = {3, 4, 5}
union = set_a | set_b     # Union: {1, 2, 3, 4, 5}
intersection = set_a & set_b  # Intersection: {3}
difference = set_a - set_b    # Difference: {1, 2}
sym_diff = set_a ^ set_b      # Symmetric difference: {1, 2, 4, 5}
```

#### JavaScript Comparison

```javascript
// Creating sets
const mySet = new Set([1, 2, 3, 4, 5]);
const deduplicatedSet = new Set([1, 2, 2, 3, 3, 3]);  // Creates {1, 2, 3}
const emptySet = new Set();

// Common operations
mySet.add(6);             // Add element
mySet.delete(3);          // Remove element
mySet.has(3);             // Membership test
const size = mySet.size;  // Size of set

// Set operations
const setA = new Set([1, 2, 3]);
const setB = new Set([3, the 4, 5]);

// Union
const union = new Set([...setA, ...setB]);  // {1, 2, 3, 4, 5}

// Intersection
const intersection = new Set(
  [...setA].filter(x => setB.has(x))
);  // {3}

// Difference
const difference = new Set(
  [...setA].filter(x => !setB.has(x))
);  // {1, 2}

// Symmetric difference
const symDiff = new Set(
  [...setA].filter(x => !setB.has(x))
    .concat([...setB].filter(x => !setA.has(x)))
);  // {1, 2, 4, 5}
```

#### Time Complexity

- Add: O(1) average, O(n) worst case
- Remove: O(1) average, O(n) worst case
- Membership test: O(1) average, O(n) worst case
- Set operations: O(n) where n is the total number of elements

#### Use Cases

- Removing duplicates
- Membership testing
- Mathematical set operations
- Tracking visited elements

#### Interview Insights

- Sets are implemented using hash tables
- Faster membership testing than lists/arrays
- Elements must be immutable (hashable in Python)
- Useful for removing duplicates from a collection
- Can't access by index - use conversion to list if needed

### 2.4 Maps

Maps (JavaScript) or dictionaries with enhanced features.

#### Python Implementation

Python uses dictionaries, but since Python 3.7, collections module provides:

```python
from collections import OrderedDict, defaultdict, ChainMap

# OrderedDict maintains insertion order (though regular dicts now do too)
ordered = OrderedDict([('apple', 'red'), ('banana', 'yellow')])

# defaultdict provides default values for missing keys
counts = defaultdict(int)  # Default value 0 for new keys
for word in ["apple", "banana", "apple"]:
    counts[word] += 1  # No KeyError for missing keys

# ChainMap groups multiple dictionaries
dict1 = {'a': 1, 'b': 2}
dict2 = {'b': 3, 'c': 4}
combined = ChainMap(dict1, dict2)  # {'a': 1, 'b': 2, 'c': 4}
```

#### JavaScript Comparison

```javascript
// Creating Maps
const myMap = new Map();
const prefilledMap = new Map([
  ["apple", "red fruit"],
  ["bear", "large animal"],
]);

// Common operations
myMap.set("elephant", "large mammal"); // Add or update
myMap.delete("bear"); // Delete key
const hasKey = myMap.has("apple"); // Check if key exists
const value = myMap.get("apple"); // Get value
const value2 = myMap.get("banana") || "not found"; // With default
const size = myMap.size; // Number of entries

// Iteration
for (const [key, value] of myMap) {
  console.log(`${key}: ${value}`);
}

// Maps vs Objects differences
// 1. Keys can be any type, not just strings/symbols
const objKey = { id: 1 };
myMap.set(objKey, "object as key");
myMap.get(objKey); // 'object as key'

// 2. Maintains insertion order
// 3. Size property instead of manual counting
```

#### Time Complexity

- Get: O(1) average
- Set: O(1) average
- Delete: O(1) average
- Has: O(1) average

#### Use Cases

- Need keys other than strings (JavaScript)
- Need to maintain insertion order (pre-ES2015 JavaScript)
- Want to easily track size
- Frequent additions and deletions of key-value pairs

#### Interview Insights

- JavaScript Map preserves key insertion order
- Map keys can be any value (including objects)
- Better performance for frequent additions/removals
- WeakMap exists for memory-sensitive cases with object keys
- JavaScript Map is iterable but Object is not directly iterable

### 2.5 Stacks

Stacks are LIFO (Last-In-First-Out) data structures.

#### Python Implementation

```python
# Using list as a stack
stack = []
stack.append(1)    # Push
stack.append(2)
stack.append(3)
top = stack[-1]    # Peek: 3
item = stack.pop() # Pop: 3
```

#### JavaScript Comparison

```javascript
// Using array as a stack
const stack = [];
stack.push(1); // Push
stack.push(2);
stack.push(3);
const top = stack[stack.length - 1]; // Peek: 3
const item = stack.pop(); // Pop: 3

// Class implementation
class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }

  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}
```

#### Time Complexity

- Push: O(1)
- Pop: O(1)
- Peek: O(1)
- Search: O(n)

#### Use Cases

- Function call tracking (call stack)
- Undo/redo functionality
- Expression evaluation and conversion
- Backtracking algorithms
- Browser history

#### Interview Insights

- Know both array implementation and class implementation
- Recognize stack patterns in problems (matchingn parentheses, etc.)
- Understand recursion's relationship with the call stack
- Be aware of stack overflow limitations

### 2.6 Queues

Queues are FIFO (First-In-First-Out) data structures.

#### Python Implementation

```python
# Using collections.deque as a queue
from collections import deque
queue = deque()
queue.append(1)      # Enqueue
queue.append(2)
queue.append(3)
front = queue[0]     # Peek: 1
item = queue.popleft()  # Dequeue: 1

# Using queue module
from queue import Queue
q = Queue()
q.put(1)             # Enqueue
q.put(2)
q.put(3)
front = q.queue[0]   # Peek: 1
item = q.get()       # Dequeue: 1
```

#### JavaScript Comparison

```javascript
// Using array as queue (less efficient)
const queue = [];
queue.push(1); // Enqueue
queue.push(2);
queue.push(3);
const front = queue[0]; // Peek: 1
const item = queue.shift(); // Dequeue: 1 (expensive O(n) operation)

// Class implementation
class Queue {
  constructor() {
    this.items = {};
    this.frontIndex = 0;
    this.backIndex = 0;
  }

  enqueue(item) {
    this.items[this.backIndex] = item;
    this.backIndex++;
  }

  dequeue() {
    if (this.isEmpty()) return null;
    const item = this.items[this.frontIndex];
    delete this.items[this.frontIndex];
    this.frontIndex++;
    return item;
  }

  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.frontIndex];
  }

  isEmpty() {
    return this.frontIndex === this.backIndex;
  }

  size() {
    return this.backIndex - this.frontIndex;
  }
}
```

#### Time Complexity

- Enqueue: O(1)
- Dequeue: O(1) with proper implementation, O(n) with array.shift()
- Peek: O(1)
- Search: O(n)

#### Use Cases

- Task scheduling
- Breadth-first search
- Request handling in web servers
- Print job spooling
- Message passing between processes

#### Interview Insights

- Array implementation with shift() is inefficient - O(n)
- Know efficient implementations (linked list or object)
- Recognize BFS problems as queue-based
- Understand priority queues as an extension
- Be aware of double-ended queues for flexibility

## 3. Rarely Used Data Structures

These data structures may not appear in day-to-day programming as frequently but are crucial for specific scenarios and often appear in interview questions.

### 3.1 Tuples

Tuples are immutable, ordered collections similar to lists/arrays.

#### Python Implementation

```python
# Creating tuples
my_tuple = (1, 2, 3, 4, 5)
single_item_tuple = (1,)  # Comma needed
empty_tuple = ()
tuple_from_list = tuple([1, 2, 3])

# Common operations
element = my_tuple[0]     # Access by index
length = len(my_tuple)    # Get length
sliced = my_tuple[1:4]    # Slice
combined = my_tuple + (6, 7)  # Concatenation
2 in my_tuple            # Membership test
# my_tuple[0] = 10       # Error! Tuples are immutable
```

#### JavaScript Comparison

JavaScript doesn't have a native tuple type, but you can simulate one:

```javascript
// Simulating tuples with arrays + Object.freeze
const myTuple = Object.freeze([1, 2, 3, 4, 5]);

// Common operations
const element = myTuple[0]; // Access by index
const length = myTuple.length; // Get length
const sliced = myTuple.slice(1, 4); // Slice
// myTuple[0] = 10;           // Error in strict mode

// Alternative: Using a class
class Tuple {
  constructor(...items) {
    this._items = Object.freeze([...items]);
  }

  get(index) {
    return this._items[index];
  }

  get length() {
    return this._items.length;
  }

  includes(item) {
    return this._items.includes(item);
  }

  slice(start, end) {
    return new Tuple(...this._items.slice(start, end));
  }

  concat(tuple) {
    return new Tuple(...this._items, ...tuple._items);
  }

  [Symbol.iterator]() {
    return this._items[Symbol.iterator]();
  }
}
```

#### Time Complexity

- Access: O(1)
- Search: O(n)
- Immutability enforces new object creation for changes

#### Use Cases

- Returning multiple values from functions
- Dictionary keys (since they're immutable)
- Representing fixed collections of items
- When immutability is needed

#### Interview Insights

- Tuples provide performance benefits due to immutability
- Used to represent records with fixed structure
- Valuable for protecting data that shouldn't change
- In Python, more memory efficient than lists

### 3.2 Linked Lists

Linked lists store elements as nodes, each pointing to the next node.

#### Python Implementation

```python
# Basic singly-linked list implementation
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
            return

        current = self.head
        while current.next:
            current = current.next
        current.next = new_node

    def prepend(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node

    def delete(self, data):
        if not self.head:
            return

        if self.head.data == data:
            self.head = self.head.next
            return

        current = self.head
        while current.next and current.next.data != data:
            current = current.next

        if current.next:
            current.next = current.next.next

    def print_list(self):
        current = self.head
        while current:
            print(current.data, end=" -> ")
            current = current.next
        print("None")
```

#### JavaScript Comparison

```javascript
// Singly-linked list implementation
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }

    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  prepend(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  delete(data) {
    if (!this.head) {
      return;
    }

    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }

    let current = this.head;
    while (current.next && current.next.data !== data) {
      current = current.next;
    }

    if (current.next) {
      current.next = current.next.next;
    }
  }

  printList() {
    let current = this.head;
    let result = "";
    while (current) {
      result += current.data + " -> ";
      current = current.next;
    }
    console.log(result + "null");
  }
}
```

#### Time Complexity

- Access: O(n)
- Search: O(n)
- Insertion: O(1) at head, O(n) elsewhere
- Deletion: O(1) at head, O(n) elsewhere

#### Use Cases

- When frequent insertions/deletions are needed
- Implementing stacks and queues
- Creating circular buffer
- Memory management (free lists)
- Large datasets with frequent updates

#### Interview Insights

- Know both singly and doubly linked list operations
- Common interview problems: cycle detection, merging lists, reversal
- Understand pointer manipulation clearly
- Know how to handle edge cases (empty list, single node)
- Compare with array tradeoffs (access vs modification)

### 3.3 Trees

Trees are hierarchical data structures with a root node and child nodes.

#### Python Implementation

```python
# Binary tree implementation
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

# Binary search tree operations
class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, value):
        if not self.root:
            self.root = TreeNode(value)
            return

        self._insert_recursive(self.root, value)

    def _insert_recursive(self, node, value):
        if value < node.value:
            if node.left is None:
                node.left = TreeNode(value)
            else:
                self._insert_recursive(node.left, value)
        else:
            if node.right is None:
                node.right = TreeNode(value)
            else:
                self._insert_recursive(node.right, value)

    def search(self, value):
        return self._search_recursive(self.root, value)

    def _search_recursive(self, node, value):
        if node is None or node.value == value:
            return node

        if value < node.value:
            return self._search_recursive(node.left, value)
        return self._search_recursive(node.right, value)

    # In-order traversal (sorted order for BST)
    def in_order_traversal(self):
        result = []
        self._in_order_recursive(self.root, result)
        return result

    def _in_order_recursive(self, node, result):
        if node:
            self._in_order_recursive(node.left, result)
            result.append(node.value)
            self._in_order_recursive(node.right, result)
```

#### JavaScript Comparison

```javascript
// Binary tree implementation
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(value) {
    if (!this.root) {
      this.root = new TreeNode(value);
      return;
    }

    this._insertRecursive(this.root, value);
  }

  _insertRecursive(node, value) {
    if (value < node.value) {
      if (node.left === null) {
        node.left = new TreeNode(value);
      } else {
        this._insertRecursive(node.left, value);
      }
    } else {
      if (node.right === null) {
        node.right = new TreeNode(value);
      } else {
        this._insertRecursive(node.right, value);
      }
    }
  }

  search(value) {
    return this._searchRecursive(this.root, value);
  }

  _searchRecursive(node, value) {
    if (node === null || node.value === value) {
      return node;
    }

    if (value < node.value) {
      return this._searchRecursive(node.left, value);
    }
    return this._searchRecursive(node.right, value);
  }

  // In-order traversal (sorted order for BST)
  inOrderTraversal() {
    const result = [];
    this._inOrderRecursive(this.root, result);
    return result;
  }

  _inOrderRecursive(node, result) {
    if (node) {
      this._inOrderRecursive(node.left, result);
      result.push(node.value);
      this._inOrderRecursive(node.right, result);
    }
  }
}
```

#### Time Complexity (Binary Search Tree)

- Search: O(log n) average, O(n) worst case
- Insertion: O(log n) average, O(n) worst case
- Deletion: O(log n) average, O(n) worst case

#### Use Cases

- Hierarchical data representation
- Fast search, insertion, deletion
- Sorted data maintenance
- Expression parsing
- Decision trees

#### Interview Insights

- Know multiple traversal methods (in-order, pre-order, post-order, level-order)
- Understand balanced vs. unbalanced trees
- Know self-balancing tree concepts (AVL, Red-Black)
- Practice tree recursion problems
- Implement tree algorithms both recursively and iteratively

### 3.4 Graphs

Graphs consist of vertices (nodes) and edges connecting them.

#### Python Implementation

```python
# Adjacency list representation
class Graph:
    def __init__(self):
        self.adjacency_list = {}

    def add_vertex(self, vertex):
        if vertex not in self.adjacency_list:
            self.adjacency_list[vertex] = []

    def add_edge(self, vertex1, vertex2):
        if vertex1 in self.adjacency_list and vertex2 in self.adjacency_list:
            self.adjacency_list[vertex1].append(vertex2)
            self.adjacency_list[vertex2].append(vertex1)  # For undirected graph

    def remove_edge(self, vertex1, vertex2):
        if vertex1 in self.adjacency_list and vertex2 in self.adjacency_list:
            self.adjacency_list[vertex1] = [v for v in self.adjacency_list[vertex1] if v != vertex2]
            self.adjacency_list[vertex2] = [v for v in self.adjacency_list[vertex2] if v != vertex1]

    def remove_vertex(self, vertex):
        if vertex in self.adjacency_list:
            # Remove all edges to this vertex
            for v in self.adjacency_list:
                self.adjacency_list[v] = [adj for adj in self.adjacency_list[v] if adj != vertex]
            # Remove the vertex
            del self.adjacency_list[vertex]

    # Breadth-first search
    def bfs(self, start):
        if start not in self.adjacency_list:
            return []

        visited = set()
        queue = [start]
        result = []

        visited.add(start)

        while queue:
            current = queue.pop(0)
            result.append(current)

            for neighbor in self.adjacency_list[current]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)

        return result
```

#### JavaScript Comparison

```javascript
// Adjacency list representation
class Graph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1].push(vertex2);
      this.adjacencyList[vertex2].push(vertex1); // For undirected graph
    }
  }

  removeEdge(vertex1, vertex2) {
    if (this.adjacencyList[vertex1] && this.adjacencyList[vertex2]) {
      this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
        (v) => v !== vertex2
      );
      this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
        (v) => v !== vertex1
      );
    }
  }

  removeVertex(vertex) {
    if (this.adjacencyList[vertex]) {
      // Remove all edges to this vertex
      while (this.adjacencyList[vertex].length) {
        const adjacentVertex = this.adjacencyList[vertex].pop();
        this.removeEdge(vertex, adjacentVertex);
      }
      // Remove the vertex
      delete this.adjacencyList[vertex];
    }
  }

  // Breadth-first search
  bfs(start) {
    if (!this.adjacencyList[start]) {
      return [];
    }

    const visited = new Set();
    const queue = [start];
    const result = [];

    visited.add(start);

    while (queue.length) {
      const current = queue.shift();
      result.push(current);

      this.adjacencyList[current].forEach((neighbor) => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }

    return result;
  }
}
```

#### Time Complexity

- Add Vertex: O(1)
- Add Edge: O(1)
- Remove Vertex: O(|V| + |E|)
- Remove Edge: O(|E|)
- BFS/DFS: O(|V| + |E|)

#### Use Cases

- Social networks
- Routing algorithms
- Network topology
- Dependency resolution
- State machine representation

#### Interview Insights

- Know both adjacency list and matrix representations
- Understand directed vs. undirected graphs
- Master graph traversal algorithms (BFS, DFS)
- Recognize graph problems (cycles, paths, connectivity)
- Know key algorithms: Dijkstra's, Topological Sort, MST

### 3.5 Heaps

Heaps are specialized tree-based data structures satisfying the heap property.

#### Python Implementation

```python
# Using Python's built-in heapq (min-heap)
import heapq

# Create a heap
heap = []
heapq.heapify(heap)  # Transform list into a heap

# Add elements
heapq.heappush(heap, 5)
heapq.heappush(heap, 3)
heapq.heappush(heap, 7)
heapq.heappush(heap, 1)

# Remove smallest element
smallest = heapq.heappop(heap)  # 1

# Peek at smallest element
smallest = heap[0]  # 3

# Custom implementation of max-heap
class MaxHeap:
    def __init__(self):
        self.heap = []

    def parent(self, i):
        return (i - 1) // 2

    def left_child(self, i):
        return 2 * i + 1

    def right_child(self, i):
        return 2 * i + 2

    def insert(self, item):
        self.heap.append(item)
        self._heapify_up(len(self.heap) - 1)

    def extract_max(self):
        if not self.heap:
            return None

        max_item = self.heap[0]
        last_item = self.heap.pop()

        if self.heap:
            self.heap[0] = last_item
            self._heapify_down(0)

        return max_item

    def _heapify_up(self, i):
        parent = self.parent(i)
        if i > 0 and self.heap[parent] < self.heap[i]:
            self.heap[parent], self.heap[i] = self.heap[i], self.heap[parent]
            self._heapify_up(parent)

    def _heapify_down(self, i):
        largest = i
        left = self.left_child(i)
        right = self.right_child(i)

        if left < len(self.heap) and self.heap[left] > self.heap[largest]:
            largest = left

        if right < len(self.heap) and self.heap[right] > self.heap[largest]:
            largest = right

        if largest != i:
            self.heap[i], self.heap[largest] = self.heap[largest], self.heap[i]
            self._heapify_down(largest)
```

#### JavaScript Comparison

```javascript
// Min heap implementation
class MinHeap {
  constructor() {
    this.heap = [];
  }

  // Helper methods
  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  getLeftChildIndex(i) {
    return 2 * i + 1;
  }

  getRightChildIndex(i) {
    return 2 * i + 2;
  }

  // Heap operations
  insert(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }

  extractMin() {
    if (this.heap.length === 0) {
      return null;
    }

    const min = this.heap[0];
    const last = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.heapifyDown(0);
    }

    return min;
  }

  heapifyUp(index) {
    let currentIndex = index;
    let parentIndex = this.getParentIndex(currentIndex);

    while (
      currentIndex > 0 &&
      this.heap[parentIndex] > this.heap[currentIndex]
    ) {
      this.swap(parentIndex, currentIndex);
      currentIndex = parentIndex;
      parentIndex = this.getParentIndex(currentIndex);
    }
  }

  heapifyDown(index) {
    let smallest = index;
    const leftChild = this.getLeftChildIndex(index);
    const rightChild = this.getRightChildIndex(index);

    if (
      leftChild < this.heap.length &&
      this.heap[leftChild] < this.heap[smallest]
    ) {
      smallest = leftChild;
    }

    if (
      rightChild < this.heap.length &&
      this.heap[rightChild] < this.heap[smallest]
    ) {
      smallest = rightChild;
    }

    if (smallest !== index) {
      this.swap(index, smallest);
      this.heapifyDown(smallest);
    }
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  size() {
    return this.heap.length;
  }
}
```

#### Time Complexity

- Insert: O(log n)
- Extract-Min/Max: O(log n)
- Peek: O(1)
- Heapify: O(n)

#### Use Cases

- Priority queues
- Heap sort
- Finding kth largest/smallest element
- Median finding
- Graph algorithms (Dijkstra's, Prim's)

#### Interview Insights

- Understand both min-heap and max-heap
- Know the heap property (parent >= children for max-heap)
- Array representation: parent at i, children at 2i+1 and 2i+2
- Recognize heap-applicable problems (priority-based scheduling)
- Understand heap vs. BST tradeoffs

### 3.6 Tries

Tries (prefix trees) are specialized trees optimized for string operations.

#### Python Implementation

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True

    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end_of_word

    def starts_with(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True
```

#### JavaScript Comparison

```javascript
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return node.isEndOfWord;
  }

  startsWith(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) {
        return false;
      }
      node = node.children[char];
    }
    return true;
  }
}
```

#### Time Complexity

- Insert: O(m) where m is word length
- Search: O(m) where m is word length
- Prefix search: O(m) where m is prefix length

#### Use Cases

- Autocomplete/predictive text
- Spell checkers
- IP routing (longest prefix matching)
- Word games
- Dictionary implementations

#### Interview Insights

- Space-efficient for storing large dictionaries
- Faster than hash tables for prefix operations
- Combines benefits of hash tables and BSTs
- Common variations: compressed tries, ternary search tries
- Know how to implement deletion operation

## 4. Time and Space Complexity

### 4.1 Big O Notation

Big O notation describes the upper bound of an algorithm's time or space requirements as input size grows.

#### Common Complexities (from best to worst)

- O(1): Constant time - direct access operations
- O(log n): Logarithmic - divide and conquer algorithms
- O(n): Linear - iterating through input once
- O(n log n): Linearithmic - efficient sorting algorithms
- O(n²): Quadratic - nested iterations
- O(n³): Cubic - triple nested iterations
- O(2ⁿ): Exponential - recursive solutions without memoization
- O(n!): Factorial - permutation algorithms

### 4.2 Complexity Comparison

| Data Structure     | Access       | Search       | Insertion    | Deletion     |
| ------------------ | ------------ | ------------ | ------------ | ------------ |
| Array/List         | O(1)         | O(n)         | O(n)         | O(n)         |
| Linked List        | O(n)         | O(n)         | O(1)\*       | O(1)\*       |
| Stack              | O(n)         | O(n)         | O(1)         | O(1)         |
| Queue              | O(n)         | O(n)         | O(1)         | O(1)         |
| Hash Table         | N/A          | O(1)\*\*     | O(1)\*\*     | O(1)\*\*     |
| Binary Search Tree | O(log n)\*\* | O(log n)\*\* | O(log n)\*\* | O(log n)\*\* |
| Heap               | O(1)\*\*\*   | O(n)         | O(log n)     | O(log n)     |
| Trie               | O(m)         | O(m)         | O(m)         | O(m)         |

\* At known position (typically head/tail)  
\*\* Average case, can be O(n) worst case  
\*\*\* For min/max only

## 5. Data Structure Selection

### 5.1 Selection Criteria

When choosing a data structure, consider:

1. **Operations**: What operations will be performed most frequently?
2. **Time Complexity**: What is the maximum acceptable time for critical operations?
3. **Space Complexity**: Is memory usage a constraint?
4. **Ordering**: Is the order of elements important?
5. **Duplicate Handling**: How should duplicates be handled?
6. **Implementation Complexity**: Is the complexity worth the performance gain?

### 5.2 Common Scenarios

| If you need to...                     | Consider using...                                   |
| ------------------------------------- | --------------------------------------------------- |
| Fast lookups by key                   | Dictionary/Map/Object                               |
| Maintain insertion order              | List/Array (Python dict/JS Map also preserve order) |
| Eliminate duplicates                  | Set                                                 |
| Last-in-first-out access              | Stack                                               |
| First-in-first-out access             | Queue                                               |
| Fast insertions/deletions             | Linked List                                         |
| Store hierarchical data               | Tree                                                |
| Find shortest path                    | Graph + Dijkstra's                                  |
| Store strings with fast prefix search | Trie                                                |
| Find min/max frequently               | Heap                                                |
| Sort data efficiently                 | Array + efficient sort algorithm                    |

## 6. Interview Strategies

### 6.1 Common Questions

1. **Implementation Questions**:

   - Implement a data structure from scratch
   - Add/modify operations on existing structures
   - Design a custom structure for specific requirements

2. **Application Questions**:

   - Find optimal data structure for a problem
   - Use data structures to optimize algorithms
   - Combine multiple structures to solve complex problems

3. **Analysis Questions**:
   - Analyze time/space complexity
   - Identify bottlenecks
   - Compare different approaches

### 6.2 Problem-Solving Techniques

1. **Clarify the problem**:

   - Understand requirements
   - Identify constraints
   - Ask about edge cases

2. **Analyze the operations needed**:

   - Which operations are most frequent?
   - Which operations need to be optimized?

3. **Consider multiple approaches**:

   - Think of multiple data structures
   - Compare trade-offs
   - Explain your reasoning

4. **Start with a simple solution**:

   - Implement the brute force approach first
   - Optimize incrementally
   - Justify each improvement

5. **Test your solution**:
   - Use small, meaningful examples
   - Check edge cases
   - Analyze time and space complexity

Remember that in senior position interviews, the focus often extends beyond just implementing a solution. Be prepared to discuss design decisions, trade-offs, scalability issues, and real-world applications of data structures.
