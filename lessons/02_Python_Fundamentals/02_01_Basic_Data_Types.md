# 1. Python Basic Data Types Reference

## 1.1 Table of Contents

- [1. Python Basic Data Types Reference](#1-python-basic-data-types-reference)
  - [1.1 Table of Contents](#11-table-of-contents)
  - [1.2 Introduction](#12-introduction)
  - [1.3 Frequently Used Types](#13-frequently-used-types)
    - [1.3.1 Integer (`int`)](#131-integer-int)
    - [1.3.2 Float (`float`)](#132-float-float)
    - [1.3.3 String (`str`)](#133-string-str)
    - [1.3.4 Boolean (`bool`)](#134-boolean-bool)
    - [1.3.5 None (`NoneType`)](#135-none-nonetype)
  - [1.4 Rarely Used Types](#14-rarely-used-types)
    - [1.4.1 Complex (`complex`)](#141-complex-complex)
    - [1.4.2 Bytes (`bytes`)](#142-bytes-bytes)
    - [1.4.3 Bytearray (`bytearray`)](#143-bytearray-bytearray)
    - [1.4.4 Memoryview (`memoryview`)](#144-memoryview-memoryview)

## 1.2 Introduction

Python is a dynamically typed language, which means you don't need to declare the type of a variable when you create it. The Python interpreter automatically determines the type based on the value assigned.

## 1.3 Frequently Used Types

### 1.3.1 Integer (`int`)

Represents whole numbers without a fractional component.

**Python:**

```python
x = 10
y = -5
z = 0
big_number = 1_000_000  # Underscores for readability

print(type(x))  # <class 'int'>
```

**JavaScript Comparison:**

```javascript
// JavaScript has only one numeric type: Number
// (though BigInt was added in ES2020)
let x = 10;
let y = -5;
let z = 0;
let bigNumber = 1_000_000; // Underscores supported in ES2021+

console.log(typeof x); // "number"

// For very large integers, JavaScript offers BigInt
const reallyBigNumber = 9007199254740991n; // Note the 'n' suffix
console.log(typeof reallyBigNumber); // "bigint"
```

### 1.3.2 Float (`float`)

Represents real numbers with a decimal point.

**Python:**

```python
x = 10.5
y = -0.25
z = 1.0
scientific = 1.5e2  # Scientific notation: 150.0

print(type(x))  # <class 'float'>
```

**JavaScript Comparison:**

```javascript
// In JavaScript, integers and floats are both of type Number
let x = 10.5;
let y = -0.25;
let z = 1.0; // Still stored as 1 internally
let scientific = 1.5e2; // Scientific notation: 150.0

console.log(typeof x); // "number"
console.log(Number.isInteger(x)); // false
console.log(Number.isInteger(10)); // true
```

### 1.3.3 String (`str`)

Represents sequences of characters.

**Python:**

```python
single_quoted = 'Hello'
double_quoted = "World"
triple_quoted = """Multi-line
string"""
f_string = f"The value is {10 + 5}"

print(type(single_quoted))  # <class 'str'>
```

**JavaScript Comparison:**

```javascript
// JavaScript strings are similar to Python
const singleQuoted = "Hello";
const doubleQuoted = "World";
const templateLiteral = `The value is ${10 + 5}`; // Similar to f-strings

// Multi-line strings
const multiLine = `Multi-line
string`;

console.log(typeof singleQuoted); // "string"
```

### 1.3.4 Boolean (`bool`)

Represents one of two values: `True` or `False`.

**Python:**

```python
x = True
y = False
z = bool(0)  # False
w = bool(1)  # True

print(type(x))  # <class 'bool'>
```

**JavaScript Comparison:**

```javascript
// JavaScript booleans are similar but use lowercase true/false
const x = true;
const y = false;
const z = Boolean(0); // false
const w = Boolean(1); // true

console.log(typeof x); // "boolean"
```

### 1.3.5 None (`NoneType`)

Represents the absence of a value or a null value.

**Python:**

```python
x = None

print(type(x))  # <class 'NoneType'>
print(x is None)  # True
```

**JavaScript Comparison:**

```javascript
// JavaScript has two similar concepts: null and undefined
let x = null;
let y; // Automatically assigned undefined

console.log(typeof x); // "object" (this is a historical bug in JavaScript)
console.log(typeof y); // "undefined"

console.log(x === null); // true
console.log(y === undefined); // true
```

## 1.4 Rarely Used Types

### 1.4.1 Complex (`complex`)

Represents complex numbers with real and imaginary parts.

**Python:**

```python
x = 3 + 4j
y = complex(3, 4)  # Another way to create a complex number

print(type(x))  # <class 'complex'>
print(x.real)   # 3.0
print(x.imag)   # 4.0
```

**JavaScript Comparison:**

```javascript
// JavaScript has no built-in complex number type
// You would need to implement it yourself or use a library

// A simple implementation might look like:
class Complex {
  constructor(real, imag) {
    this.real = real;
    this.imag = imag;
  }

  toString() {
    return `${this.real} + ${this.imag}i`;
  }
}

const x = new Complex(3, 4);
console.log(x.real); // 3
console.log(x.imag); // 4
```

### 1.4.2 Bytes (`bytes`)

Immutable sequence of bytes.

**Python:**

```python
x = b'hello'
y = bytes([104, 101, 108, 108, 111])  # ASCII values for 'hello'

print(type(x))  # <class 'bytes'>
print(x[0])     # 104 (ASCII value for 'h')
```

**JavaScript Comparison:**

```javascript
// JavaScript uses Uint8Array for similar functionality
const encoder = new TextEncoder();
const x = encoder.encode("hello"); // Creates a Uint8Array

console.log(x); // Uint8Array [104, 101, 108, 108, 111]
console.log(x[0]); // 104 (ASCII value for 'h')

// Or create directly from byte values
const y = new Uint8Array([104, 101, 108, 108, 111]);
```

### 1.4.3 Bytearray (`bytearray`)

Mutable sequence of bytes.

**Python:**

```python
x = bytearray(b'hello')
y = bytearray([104, 101, 108, 108, 111])

print(type(x))  # <class 'bytearray'>

# Mutable operations
x[0] = 72  # ASCII for 'H'
print(x)   # bytearray(b'Hello')
```

**JavaScript Comparison:**

```javascript
// In JavaScript, Uint8Array is also used for mutable byte arrays
const x = new Uint8Array([104, 101, 108, 108, 111]);

// Mutable operations
x[0] = 72; // ASCII for 'H'
console.log(x); // Uint8Array [72, 101, 108, 108, 111]

// Convert back to string
const decoder = new TextDecoder();
console.log(decoder.decode(x)); // "Hello"
```

### 1.4.4 Memoryview (`memoryview`)

Memory view of an object.

**Python:**

```python
x = memoryview(bytes(5))
y = memoryview(b'hello')

print(type(x))  # <class 'memoryview'>
print(bytes(y))  # b'hello'
```

**JavaScript Comparison:**

```javascript
// JavaScript has DataView for low-level memory access
// It's used with ArrayBuffer
const buffer = new ArrayBuffer(5);
const view = new DataView(buffer);

// Set some values
view.setUint8(0, 104); // 'h'
view.setUint8(1, 101); // 'e'
view.setUint8(2, 108); // 'l'
view.setUint8(3, 108); // 'l'
view.setUint8(4, 111); // 'o'

// Create a Uint8Array from the same buffer
const array = new Uint8Array(buffer);
console.log(array); // Uint8Array [104, 101, 108, 108, 111]

// Convert to string
const decoder = new TextDecoder();
console.log(decoder.decode(array)); // "hello"
```
