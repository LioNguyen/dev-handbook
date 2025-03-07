# Python Data Structures Reference

## Table of Contents

- [Python Data Structures Reference](#python-data-structures-reference)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Sequence Types](#sequence-types)
    - [1. List (`list`)](#1-list-list)
    - [2. Tuple (`tuple`)](#2-tuple-tuple)
    - [3. Range (`range`)](#3-range-range)
  - [Mapping Type](#mapping-type)
    - [4. Dictionary (`dict`)](#4-dictionary-dict)
  - [Set Types](#set-types)
    - [5. Set (`set`)](#5-set-set)
    - [6. Frozen Set (`frozenset`)](#6-frozen-set-frozenset)
  - [Special Types](#special-types)
    - [7. Functions and Methods (`function`, `method`)](#7-functions-and-methods-function-method)
    - [8. Classes and Instances](#8-classes-and-instances)
    - [9. Modules and Packages](#9-modules-and-packages)
  - [Type Checking and Conversion](#type-checking-and-conversion)
    - [Checking Types](#checking-types)
    - [Type Conversion](#type-conversion)
  - [Complete List of Standard Python Types](#complete-list-of-standard-python-types)
  - [Summary](#summary)

## Introduction

Python provides several built-in data structures that allow you to organize and manipulate data efficiently. This reference covers the main data structures in Python and their characteristics.

## Sequence Types

### 1. List (`list`)

Ordered, mutable collection of items.

```python
my_list = [1, 2, 3, 'a', 'b', True]
empty_list = []
nested_list = [1, [2, 3], 4]

print(type(my_list))  # <class 'list'>
```

### 2. Tuple (`tuple`)

Ordered, immutable collection of items.

```python
my_tuple = (1, 2, 3, 'a', 'b', True)
single_item_tuple = (1,)  # Note the comma
empty_tuple = ()

print(type(my_tuple))  # <class 'tuple'>
```

### 3. Range (`range`)

Represents an immutable sequence of numbers.

```python
x = range(6)           # 0, 1, 2, 3, 4, 5
y = range(1, 10, 2)    # 1, 3, 5, 7, 9

print(type(x))  # <class 'range'>
print(list(x))  # [0, 1, 2, 3, 4, 5]
```

## Mapping Type

### 4. Dictionary (`dict`)

Collection of key-value pairs.

```python
my_dict = {'name': 'John', 'age': 30, 'is_student': False}
empty_dict = {}
dict_constructor = dict(name='John', age=30)

print(type(my_dict))  # <class 'dict'>
```

## Set Types

### 5. Set (`set`)

Unordered collection of unique items.

```python
my_set = {1, 2, 3, 3, 4}  # Duplicates are automatically removed
empty_set = set()  # Not {} which creates an empty dict

print(type(my_set))  # <class 'set'>
print(my_set)  # {1, 2, 3, 4}
```

### 6. Frozen Set (`frozenset`)

Immutable version of a set.

```python
my_frozen_set = frozenset([1, 2, 3, 3, 4])

print(type(my_frozen_set))  # <class 'frozenset'>
print(my_frozen_set)  # frozenset({1, 2, 3, 4})
```

## Special Types

### 7. Functions and Methods (`function`, `method`)

```python
def my_function():
    pass

print(type(my_function))  # <class 'function'>

class MyClass:
    def my_method(self):
        pass

obj = MyClass()
print(type(obj.my_method))  # <class 'method'>
```

### 8. Classes and Instances

```python
class MyClass:
    pass

obj = MyClass()

print(type(MyClass))  # <class 'type'>
print(type(obj))      # <class '__main__.MyClass'>
```

### 9. Modules and Packages

```python
import math

print(type(math))  # <class 'module'>
```

## Type Checking and Conversion

### Checking Types

```python
x = 10
print(isinstance(x, int))       # True
print(isinstance(x, (int, float)))  # True (matches any in the tuple)
```

### Type Conversion

```python
# String to int/float
x = int("10")         # 10
y = float("10.5")     # 10.5

# Int/float to string
z = str(10)           # "10"

# Between collections
list_to_tuple = tuple([1, 2, 3])        # (1, 2, 3)
tuple_to_list = list((1, 2, 3))         # [1, 2, 3]
string_to_list = list("hello")          # ['h', 'e', 'l', 'l', 'o']
list_to_set = set([1, 2, 2, 3])         # {1, 2, 3}
```

## Complete List of Standard Python Types

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
21. `property` - Property
22. `classmethod` - Class method
23. `staticmethod` - Static method
24. `slice` - Slice
25. `super` - Super
26. `zip` - Zip iterator
27. `map` - Map iterator
28. `filter` - Filter iterator
29. `enumerate` - Enumerate iterator
30. `reversed` - Reversed iterator

## Summary

Python data structures can be categorized as:

- **Sequence Types**: `list`, `tuple`, `range`
- **Mapping Type**: `dict`
- **Set Types**: `set`, `frozenset`

Each type has specific characteristics and use cases:

- **Mutable types** (can be changed after creation): `list`, `dict`, `set`, `bytearray`
- **Immutable types** (cannot be changed after creation): `int`, `float`, `complex`, `str`, `tuple`, `frozenset`, `bytes`, `range`, `bool`, `NoneType`

Python's dynamic typing system allows for flexible programming, while its rich set of built-in types provides powerful tools for different programming scenarios.
