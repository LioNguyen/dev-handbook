# Python Basic Data Types Reference

## Table of Contents

- [Python Basic Data Types Reference](#python-basic-data-types-reference)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Numeric Types](#numeric-types)
    - [1. Integer (`int`)](#1-integer-int)
    - [2. Float (`float`)](#2-float-float)
    - [3. Complex (`complex`)](#3-complex-complex)
  - [Text Type](#text-type)
    - [4. String (`str`)](#4-string-str)
  - [Boolean Type](#boolean-type)
    - [5. Boolean (`bool`)](#5-boolean-bool)
  - [None Type](#none-type)
    - [6. None (`NoneType`)](#6-none-nonetype)
  - [Binary Types](#binary-types)
    - [7. Bytes (`bytes`)](#7-bytes-bytes)
    - [8. Bytearray (`bytearray`)](#8-bytearray-bytearray)
    - [9. Memoryview (`memoryview`)](#9-memoryview-memoryview)

## Introduction

Python is a dynamically typed language, which means you don't need to declare the type of a variable when you create it. The Python interpreter automatically determines the type based on the value assigned.

## Numeric Types

### 1. Integer (`int`)

Represents whole numbers without a fractional component.

```python
x = 10
y = -5
z = 0
big_number = 1_000_000  # Underscores for readability

print(type(x))  # <class 'int'>
```

### 2. Float (`float`)

Represents real numbers with a decimal point.

```python
x = 10.5
y = -0.25
z = 1.0
scientific = 1.5e2  # Scientific notation: 150.0

print(type(x))  # <class 'float'>
```

### 3. Complex (`complex`)

Represents complex numbers with real and imaginary parts.

```python
x = 3 + 4j
y = complex(3, 4)  # Another way to create a complex number

print(type(x))  # <class 'complex'>
print(x.real)   # 3.0
print(x.imag)   # 4.0
```

## Text Type

### 4. String (`str`)

Represents sequences of characters.

```python
single_quoted = 'Hello'
double_quoted = "World"
triple_quoted = """Multi-line
string"""
f_string = f"The value is {10 + 5}"

print(type(single_quoted))  # <class 'str'>
```

## Boolean Type

### 5. Boolean (`bool`)

Represents one of two values: `True` or `False`.

```python
x = True
y = False
z = bool(0)  # False
w = bool(1)  # True

print(type(x))  # <class 'bool'>
```

## None Type

### 6. None (`NoneType`)

Represents the absence of a value or a null value.

```python
x = None

print(type(x))  # <class 'NoneType'>
```

## Binary Types

### 7. Bytes (`bytes`)

Immutable sequence of bytes.

```python
x = b'hello'
y = bytes([104, 101, 108, 108, 111])  # ASCII values for 'hello'

print(type(x))  # <class 'bytes'>
```

### 8. Bytearray (`bytearray`)

Mutable sequence of bytes.

```python
x = bytearray(b'hello')
y = bytearray([104, 101, 108, 108, 111])

print(type(x))  # <class 'bytearray'>
```

### 9. Memoryview (`memoryview`)

Memory view of an object.

```python
x = memoryview(bytes(5))
y = memoryview(b'hello')

print(type(x))  # <class 'memoryview'>
```
