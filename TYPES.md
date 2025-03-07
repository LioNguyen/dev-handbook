# Python Data Types Reference

Python is a dynamically typed language, which means you don't need to declare the type of a variable when you create it. The Python interpreter automatically determines the type based on the value assigned.

## Basic Built-in Data Types

### Numeric Types

#### 1. Integer (`int`)

Represents whole numbers without a fractional component.

```python
x = 10
y = -5
z = 0
big_number = 1_000_000  # Underscores for readability

print(type(x))  # <class 'int'>
```

#### 2. Float (`float`)

Represents real numbers with a decimal point.

```python
x = 10.5
y = -0.25
z = 1.0
scientific = 1.5e2  # Scientific notation: 150.0

print(type(x))  # <class 'float'>
```

#### 3. Complex (`complex`)

Represents complex numbers with real and imaginary parts.

```python
x = 3 + 4j
y = complex(3, 4)  # Another way to create a complex number

print(type(x))  # <class 'complex'>
print(x.real)   # 3.0
print(x.imag)   # 4.0
```

### Text Type

#### 4. String (`str`)

Represents sequences of characters.

```python
single_quoted = 'Hello'
double_quoted = "World"
triple_quoted = """Multi-line
string"""
f_string = f"The value is {10 + 5}"

print(type(single_quoted))  # <class 'str'>
```

### Sequence Types

#### 5. List (`list`)

Ordered, mutable collection of items.

```python
my_list = [1, 2, 3, 'a', 'b', True]
empty_list = []
nested_list = [1, [2, 3], 4]

print(type(my_list))  # <class 'list'>
```

#### 6. Tuple (`tuple`)

Ordered, immutable collection of items.

```python
my_tuple = (1, 2, 3, 'a', 'b', True)
single_item_tuple = (1,)  # Note the comma
empty_tuple = ()

print(type(my_tuple))  # <class 'tuple'>
```

#### 7. Range (`range`)

Represents an immutable sequence of numbers.

```python
x = range(6)           # 0, 1, 2, 3, 4, 5
y = range(1, 10, 2)    # 1, 3, 5, 7, 9

print(type(x))  # <class 'range'>
print(list(x))  # [0, 1, 2, 3, 4, 5]
```

### Mapping Type

#### 8. Dictionary (`dict`)

Collection of key-value pairs.

```python
my_dict = {'name': 'John', 'age': 30, 'is_student': False}
empty_dict = {}
dict_constructor = dict(name='John', age=30)

print(type(my_dict))  # <class 'dict'>
```

### Set Types

#### 9. Set (`set`)

Unordered collection of unique items.

```python
my_set = {1, 2, 3, 3, 4}  # Duplicates are automatically removed
empty_set = set()  # Not {} which creates an empty dict

print(type(my_set))  # <class 'set'>
print(my_set)  # {1, 2, 3, 4}
```

#### 10. Frozen Set (`frozenset`)

Immutable version of a set.

```python
my_frozen_set = frozenset([1, 2, 3, 3, 4])

print(type(my_frozen_set))  # <class 'frozenset'>
print(my_frozen_set)  # frozenset({1, 2, 3, 4})
```

### Binary Types

#### 11. Bytes (`bytes`)

Immutable sequence of bytes.

```python
x = b'hello'
y = bytes([104, 101, 108, 108, 111])  # ASCII values for 'hello'

print(type(x))  # <class 'bytes'>
```

#### 12. Bytearray (`bytearray`)

Mutable sequence of bytes.

```python
x = bytearray(b'hello')
y = bytearray([104, 101, 108, 108, 111])

print(type(x))  # <class 'bytearray'>
```

#### 13. Memoryview (`memoryview`)

Memory view of an object.

```python
x = memoryview(bytes(5))
y = memoryview(b'hello')

print(type(x))  # <class 'memoryview'>
```

### Boolean Type

#### 14. Boolean (`bool`)

Represents one of two values: `True` or `False`.

```python
x = True
y = False
z = bool(0)  # False
w = bool(1)  # True

print(type(x))  # <class 'bool'>
```

### None Type

#### 15. None (`NoneType`)

Represents the absence of a value or a null value.

```python
x = None

print(type(x))  # <class 'NoneType'>
```

## Special Types

### 16. Functions and Methods (`function`, `method`)

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

### 17. Classes and Instances

```python
class MyClass:
    pass

obj = MyClass()

print(type(MyClass))  # <class 'type'>
print(type(obj))      # <class '__main__.MyClass'>
```

### 18. Modules and Packages

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

Python has several categories of data types:

- **Numeric Types**: `int`, `float`, `complex`
- **Text Type**: `str`
- **Sequence Types**: `list`, `tuple`, `range`
- **Mapping Type**: `dict`
- **Set Types**: `set`, `frozenset`
- **Binary Types**: `bytes`, `bytearray`, `memoryview`
- **Boolean Type**: `bool`
- **None Type**: `NoneType`

Each type has specific characteristics and use cases:

- **Mutable types** (can be changed after creation): `list`, `dict`, `set`, `bytearray`
- **Immutable types** (cannot be changed after creation): `int`, `float`, `complex`, `str`, `tuple`, `frozenset`, `bytes`, `range`, `bool`, `NoneType`

Python's dynamic typing system allows for flexible programming, while its rich set of built-in types provides powerful tools for different programming scenarios.
