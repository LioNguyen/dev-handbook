# 1. Python Data Structures Reference

## 1.1 Table of Contents

- [1. Python Data Structures Reference](#1-python-data-structures-reference)
  - [1.1 Table of Contents](#11-table-of-contents)
  - [1.2 Introduction](#12-introduction)
  - [1.3 Frequently Used Data Structures](#13-frequently-used-data-structures)
    - [1.3.1 List (`list`)](#131-list-list)
    - [1.3.2 Dictionary (`dict`)](#132-dictionary-dict)
    - [1.3.3 Tuple (`tuple`)](#133-tuple-tuple)
    - [1.3.4 Set (`set`)](#134-set-set)
    - [1.3.5 Range (`range`)](#135-range-range)
  - [1.4 Rarely Used Data Structures](#14-rarely-used-data-structures)
    - [1.4.1 Frozen Set (`frozenset`)](#141-frozen-set-frozenset)
    - [1.4.2 Functions and Methods (`function`, `method`)](#142-functions-and-methods-function-method)
    - [1.4.3 Classes and Instances](#143-classes-and-instances)
    - [1.4.4 Modules and Packages](#144-modules-and-packages)
  - [1.5 Type Checking and Conversion](#15-type-checking-and-conversion)
    - [1.5.1 Checking Types](#151-checking-types)
    - [1.5.2 Type Conversion](#152-type-conversion)
  - [1.6 Complete List of Standard Python Types](#16-complete-list-of-standard-python-types)
  - [1.7 Summary](#17-summary)
    - [Frequently Used:](#frequently-used)
    - [Rarely Used:](#rarely-used)

## 1.2 Introduction

Python provides several built-in data structures that allow you to organize and manipulate data efficiently. This reference covers the main data structures in Python and their characteristics, comparing them with JavaScript equivalents and dividing them into frequently used and rarely used categories.

## 1.3 Frequently Used Data Structures

### 1.3.1 List (`list`)

Ordered, mutable collection of items.

**Python:**

```python
my_list = [1, 2, 3, 'a', 'b', True]
empty_list = []
nested_list = [1, [2, 3], 4]

# Common operations
my_list.append(5)        # Add an item: [1, 2, 3, 'a', 'b', True, 5]
my_list.insert(0, 'x')   # Insert at index: ['x', 1, 2, 3, 'a', 'b', True, 5]
my_list.remove('a')      # Remove item: ['x', 1, 2, 3, 'b', True, 5]
popped = my_list.pop()   # Remove and return last item: 5
popped_index = my_list.pop(1)  # Remove and return item at index: 1

print(type(my_list))     # <class 'list'>
print(len(my_list))      # Get length
print(my_list[0])        # Access by index: 'x'
print(my_list[-1])       # Access last item: 5
print(my_list[1:3])      # Slicing: [2, 3]
```

**JavaScript Comparison:**

```javascript
// JavaScript equivalent is Array
const myArray = [1, 2, 3, "a", "b", true];
const emptyArray = [];
const nestedArray = [1, [2, 3], 4];

// Common operations
myArray.push(5); // Add an item: [1, 2, 3, 'a', 'b', true, 5]
myArray.unshift("x"); // Insert at beginning: ['x', 1, 2, 3, 'a', 'b', true, 5]
myArray.splice(4, 1); // Remove item 'a': ['x', 1, 2, 3, 'b', true, 5]
const popped = myArray.pop(); // Remove and return last item: 5
const shifted = myArray.shift(); // Remove and return first item: 'x'

console.log(typeof myArray); // "object" (Arrays are objects in JS)
console.log(Array.isArray(myArray)); // true
console.log(myArray.length); // Get length
console.log(myArray[0]); // Access by index: 1
console.log(myArray[myArray.length - 1]); // Access last item
console.log(myArray.slice(1, 3)); // Slicing: [2, 3]
```

### 1.3.2 Dictionary (`dict`)

Collection of key-value pairs.

**Python:**

```python
my_dict = {'name': 'John', 'age': 30, 'is_student': False}
empty_dict = {}
dict_constructor = dict(name='John', age=30)

# Common operations
my_dict['city'] = 'New York'     # Add/modify key-value pair
del my_dict['age']               # Remove key-value pair
value = my_dict.get('name')      # Get value with default return (None if not found)
value = my_dict.get('height', 175) # Get with custom default value
keys = my_dict.keys()            # Get all keys
values = my_dict.values()        # Get all values
items = my_dict.items()          # Get all (key, value) pairs

print(type(my_dict))             # <class 'dict'>
print('name' in my_dict)         # Check if key exists: True
```

**JavaScript Comparison:**

```javascript
// JavaScript uses Objects or Map for similar functionality
// Using Object (less feature-rich than Python dict)
const myObj = { name: "John", age: 30, isStudent: false };
const emptyObj = {};

// Using Map (more similar to Python dict)
const myMap = new Map();
myMap.set("name", "John");
myMap.set("age", 30);
myMap.set("isStudent", false);

// Common operations with Object
myObj.city = "New York"; // Add/modify property
delete myObj.age; // Remove property
const value = myObj.name; // Get value
const value2 = myObj.height || 175; // Get with default value
const keys = Object.keys(myObj); // Get all keys
const values = Object.values(myObj); // Get all values
const entries = Object.entries(myObj); // Get all [key, value] pairs

console.log(typeof myObj); // "object"
console.log("name" in myObj); // Check if key exists: true

// Common operations with Map
myMap.set("city", "New York"); // Add/modify key-value pair
myMap.delete("age"); // Remove key-value pair
const mapValue = myMap.get("name"); // Get value (undefined if not found)
const keys2 = Array.from(myMap.keys()); // Get all keys
const values2 = Array.from(myMap.values()); // Get all values
const entries2 = Array.from(myMap.entries()); // Get all [key, value] pairs

console.log(myMap.has("name")); // Check if key exists: true
```

### 1.3.3 Tuple (`tuple`)

Ordered, immutable collection of items.

**Python:**

```python
my_tuple = (1, 2, 3, 'a', 'b', True)
single_item_tuple = (1,)  # Note the comma
empty_tuple = ()

# Common operations
# Since tuples are immutable, they have fewer methods than lists
count = my_tuple.count('a')      # Count occurrences: 1
index = my_tuple.index(2)        # Find index of item: 1

print(type(my_tuple))            # <class 'tuple'>
print(len(my_tuple))             # Get length: 6
print(my_tuple[0])               # Access by index: 1
print(my_tuple[-1])              # Access last item: True
print(my_tuple[1:3])             # Slicing: (2, 3)
```

**JavaScript Comparison:**

```javascript
// JavaScript has no direct equivalent to tuples
// Arrays are commonly used, but they're mutable
const myArray = [1, 2, 3, "a", "b", true];

// To create immutable arrays in modern JS
const myTuple = Object.freeze([1, 2, 3, "a", "b", true]);

// Common operations
const count = myTuple.filter((item) => item === "a").length; // Count occurrences: 1
const index = myTuple.indexOf(2); // Find index of item: 1

console.log(typeof myTuple); // "object"
console.log(Array.isArray(myTuple)); // true
console.log(myTuple.length); // Get length: 6
console.log(myTuple[0]); // Access by index: 1
console.log(myTuple[myTuple.length - 1]); // Access last item: true
console.log(myTuple.slice(1, 3)); // Slicing: [2, 3]

// Trying to modify will throw error in strict mode
try {
  myTuple[0] = 99; // Error in strict mode
} catch (e) {
  console.log("Can't modify frozen array");
}
```

### 1.3.4 Set (`set`)

Unordered collection of unique items.

**Python:**

```python
my_set = {1, 2, 3, 3, 4}  # Duplicates are automatically removed
empty_set = set()  # Not {} which creates an empty dict

# Common operations
my_set.add(5)             # Add an item: {1, 2, 3, 4, 5}
my_set.remove(3)          # Remove item (raises error if not present)
my_set.discard(10)        # Remove item (no error if not present)
my_set.update([6, 7, 8])  # Add multiple items
popped = my_set.pop()     # Remove and return an arbitrary element

# Set operations
set1 = {1, 2, 3}
set2 = {3, 4, 5}
union = set1 | set2        # Union: {1, 2, 3, 4, 5}
intersection = set1 & set2  # Intersection: {3}
difference = set1 - set2    # Difference: {1, 2}
sym_diff = set1 ^ set2      # Symmetric difference: {1, 2, 4, 5}

print(type(my_set))        # <class 'set'>
print(len(my_set))         # Get length
print(1 in my_set)         # Check if item exists: True
```

**JavaScript Comparison:**

```javascript
// JavaScript has Set object since ES6
const mySet = new Set([1, 2, 3, 3, 4]); // Duplicates are automatically removed
const emptySet = new Set();

// Common operations
mySet.add(5); // Add an item
mySet.delete(3); // Remove item (returns false if not present)
mySet.add(10).delete(10); // Method chaining works
mySet.add(6).add(7).add(8); // Add multiple items

// Set operations (using utility functions)
const set1 = new Set([1, 2, 3]);
const set2 = new Set([3, 4, 5]);

// Union
const union = new Set([...set1, ...set2]); // {1, 2, 3, 4, 5}

// Intersection
const intersection = new Set([...set1].filter((x) => set2.has(x))); // {3}

// Difference
const difference = new Set([...set1].filter((x) => !set2.has(x))); // {1, 2}

// Symmetric difference
const symDiff = new Set(
  [...set1]
    .filter((x) => !set2.has(x))
    .concat([...set2].filter((x) => !set1.has(x)))
); // {1, 2, 4, 5}

console.log(typeof mySet); // "object"
console.log(mySet.size); // Get size
console.log(mySet.has(1)); // Check if item exists: true
```

### 1.3.5 Range (`range`)

Represents an immutable sequence of numbers.

**Python:**

```python
x = range(6)           # 0, 1, 2, 3, 4, 5
y = range(1, 10, 2)    # 1, 3, 5, 7, 9

print(type(x))         # <class 'range'>
print(list(x))         # Convert to list: [0, 1, 2, 3, 4, 5]
print(3 in x)          # Check if value is in range: True
print(x[2])            # Access by index: 2
```

**JavaScript Comparison:**

```javascript
// JavaScript has no direct equivalent to Python's range
// Commonly implemented as utility functions or loops

// Create an array of sequential numbers (equivalent to list(range(n)))
function range(start, end, step = 1) {
  if (arguments.length === 1) {
    end = start;
    start = 0;
  }

  const result = [];
  for (let i = start; i < end; i += step) {
    result.push(i);
  }
  return result;
}

const x = range(6); // [0, 1, 2, 3, 4, 5]
const y = range(1, 10, 2); // [1, 3, 5, 7, 9]

console.log(x.includes(3)); // Check if value is in array: true
console.log(x[2]); // Access by index: 2

// Modern JavaScript can use Array methods
const modernRange = Array.from({ length: 6 }, (_, i) => i); // [0, 1, 2, 3, 4, 5]
const modernRange2 = [...Array(6).keys()]; // [0, 1, 2, 3, 4, 5]
```

## 1.4 Rarely Used Data Structures

### 1.4.1 Frozen Set (`frozenset`)

Immutable version of a set.

**Python:**

```python
my_frozen_set = frozenset([1, 2, 3, 3, 4])

# Operations (similar to set but no methods that modify the frozenset)
union = my_frozen_set | {5, 6}      # Returns a new frozenset
intersection = my_frozen_set & {3, 4, 5}

print(type(my_frozen_set))          # <class 'frozenset'>
print(my_frozen_set)                # frozenset({1, 2, 3, 4})
print(len(my_frozen_set))           # Get length: 4
print(1 in my_frozen_set)           # Check if item exists: True

# This would raise an error
try:
    my_frozen_set.add(5)            # AttributeError: 'frozenset' object has no attribute 'add'
except AttributeError as e:
    print(f"Error: {e}")
```

**JavaScript Comparison:**

```javascript
// JavaScript has no direct equivalent to frozenset
// Can be simulated using a Set with controlled access

class FrozenSet {
  #set;

  constructor(iterable) {
    this.#set = new Set(iterable);
    Object.freeze(this);
  }

  has(value) {
    return this.#set.has(value);
  }

  get size() {
    return this.#set.size;
  }

  // Other read-only methods
  values() {
    return this.#set.values();
  }

  [Symbol.iterator]() {
    return this.#set[Symbol.iterator]();
  }
}

const myFrozenSet = new FrozenSet([1, 2, 3, 3, 4]);
console.log(myFrozenSet.size); // 4
console.log(myFrozenSet.has(1)); // true
console.log([...myFrozenSet]); // [1, 2, 3, 4]

// No add method available
try {
  myFrozenSet.add(5); // Error: myFrozenSet.add is not a function
} catch (e) {
  console.log("Cannot modify FrozenSet");
}
```

### 1.4.2 Functions and Methods (`function`, `method`)

**Python:**

```python
def my_function():
    pass

print(type(my_function))            # <class 'function'>

class MyClass:
    def my_method(self):
        pass

obj = MyClass()
print(type(obj.my_method))          # <class 'method'>

# Functions are first-class objects
def apply(func, value):
    return func(value)

def double(x):
    return x * 2

print(apply(double, 5))             # 10
```

**JavaScript Comparison:**

```javascript
function myFunction() {
  // pass
}

console.log(typeof myFunction); // "function"

class MyClass {
  myMethod() {
    // pass
  }
}

const obj = new MyClass();
console.log(typeof obj.myMethod); // "function"

// Functions are first-class objects
function apply(func, value) {
  return func(value);
}

function double(x) {
  return x * 2;
}

console.log(apply(double, 5)); // 10

// JavaScript also has arrow functions
const arrowFunc = (x) => x * 2;
console.log(typeof arrowFunc); // "function"
```

### 1.4.3 Classes and Instances

**Python:**

```python
class MyClass:
    def __init__(self, value):
        self.value = value

    def get_value(self):
        return self.value

obj = MyClass(42)

print(type(MyClass))                # <class 'type'>
print(type(obj))                    # <class '__main__.MyClass'>
print(isinstance(obj, MyClass))     # True
print(obj.get_value())              # 42
```

**JavaScript Comparison:**

```javascript
class MyClass {
  constructor(value) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }
}

const obj = new MyClass(42);

console.log(typeof MyClass); // "function" (classes are functions in JS)
console.log(typeof obj); // "object"
console.log(obj instanceof MyClass); // true
console.log(obj.getValue()); // 42
```

### 1.4.4 Modules and Packages

**Python:**

```python
import math
import collections

print(type(math))                   # <class 'module'>
print(dir(math))                    # List attributes of the module

# Using module functionality
print(math.pi)                      # 3.141592653589793
print(math.sqrt(16))                # 4.0

# Module vs package
import os                           # Module
import numpy                        # Package (collection of modules)
```

**JavaScript Comparison:**

```javascript
// In older JavaScript, similar functionality was achieved with objects
const math = {
  PI: 3.141592653589793,
  sqrt: function (x) {
    return Math.sqrt(x);
  },
};

// Modern JS has native modules (since ES6)
// file: mathUtils.js
export const PI = 3.141592653589793;
export function sqrt(x) {
  return Math.sqrt(x);
}

// In another file:
import { PI, sqrt } from "./mathUtils.js";
console.log(PI); // 3.141592653589793
console.log(sqrt(16)); // 4.0

// Node.js has a module system using require()
const fs = require("fs"); // Built-in module
console.log(typeof fs); // "object"
```

## 1.5 Type Checking and Conversion

### 1.5.1 Checking Types

**Python:**

```python
x = 10
y = "hello"
z = [1, 2, 3]

print(type(x))                      # <class 'int'>
print(type(y))                      # <class 'str'>
print(type(z))                      # <class 'list'>

print(isinstance(x, int))           # True
print(isinstance(y, (int, str)))    # True (matches any in the tuple)
print(isinstance(z, list))          # True
```

**JavaScript Comparison:**

```javascript
let x = 10;
let y = "hello";
let z = [1, 2, 3];

console.log(typeof x); // "number"
console.log(typeof y); // "string"
console.log(typeof z); // "object" (arrays are objects in JS)

console.log(Array.isArray(z)); // true

// JavaScript has instanceof for checking object types
console.log(z instanceof Array); // true
console.log(y instanceof String); // false (primitive string vs String object)
console.log(new String("hello") instanceof String); // true
```

### 1.5.2 Type Conversion

**Python:**

```python
# Basic type conversions
x = int("10")                       # 10
y = float("10.5")                   # 10.5
z = str(10)                         # "10"
a = bool(1)                         # True
b = bool(0)                         # False

# Collection conversions
list_to_tuple = tuple([1, 2, 3])    # (1, 2, 3)
tuple_to_list = list((1, 2, 3))     # [1, 2, 3]
string_to_list = list("hello")      # ['h', 'e', 'l', 'l', 'o']
list_to_set = set([1, 2, 2, 3])     # {1, 2, 3}
dict_from_tuples = dict([('a', 1), ('b', 2)])  # {'a': 1, 'b': 2}
```

**JavaScript Comparison:**

```javascript
// Basic type conversions
let x = parseInt("10"); // 10
let y = parseFloat("10.5"); // 10.5
let z = String(10); // "10"
let a = Boolean(1); // true
let b = Boolean(0); // false

// Collection conversions
let arrayToObj = Object.fromEntries([
  ["a", 1],
  ["b", 2],
]); // {a: 1, b: 2}
let objToArray = Object.entries({ a: 1, b: 2 }); // [['a', 1], ['b', 2]]
let stringToArray = Array.from("hello"); // ['h', 'e', 'l', 'l', 'o']
let arrayToSet = new Set([1, 2, 2, 3]); // Set {1, 2, 3}
let setToArray = Array.from(new Set([1, 2, 3])); // [1, 2, 3]
```

## 1.6 Complete List of Standard Python Types

1. `int` - Integer
2. `float` - Floating-point
3. `complex` - Complex number
4. `str` - String
5. `list` - List
6. `tuple` - Tuple
7. `range` - Range
8. `dict` - Dictionary
9. `set` - Set
10. `frozenset` - Frozen set
11. `bytes` - Bytes
12. `bytearray` - Bytearray
13. `memoryview` - Memory view
14. `bool` - Boolean
15. `NoneType` - None
16. `function` - Function
17. `method` - Method
18. `type` - Type (metaclass)
19. `module` - Module
20. `object` - Base object class

Plus many specialized types like iterators, generators, views, etc.

## 1.7 Summary

Python data structures can be categorized into frequently used and rarely used:

### Frequently Used:

- **Lists**: Mutable, ordered collections for general-purpose storage
- **Dictionaries**: Key-value mappings for fast lookups and associations
- **Tuples**: Immutable, ordered collections, useful for fixed data sets
- **Sets**: Unordered collections of unique elements, good for membership tests
- **Range**: Efficient sequence generator for loops and iterations

### Rarely Used:

- **Frozen Sets**: Immutable sets, useful for dictionary keys or set operations
- **Functions/Methods as Types**: Function objects for advanced programming
- **Classes/Instances**: Type information for object-oriented programming
- **Modules/Packages**: Organizational units for code

The key characteristics of these structures:

- **Mutable types** (can be changed after creation): `list`, `dict`, `set`, `bytearray`
- **Immutable types** (cannot be changed after creation): `int`, `float`, `complex`, `str`, `tuple`, `frozenset`, `bytes`, `range`, `bool`, `NoneType`

When moving between Python and JavaScript, there are significant similarities but also important differences in how these data structures are implemented and used.
