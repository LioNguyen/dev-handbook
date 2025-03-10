# Python vs JavaScript Operators Guide

## Table of Contents

- [Python vs JavaScript Operators Guide](#python-vs-javascript-operators-guide)
  - [Table of Contents](#table-of-contents)
  - [1. Frequently Used Operators](#1-frequently-used-operators)
    - [1.1 Arithmetic Operators](#11-arithmetic-operators)
    - [1.2 Assignment Operators](#12-assignment-operators)
    - [1.3 Comparison Operators](#13-comparison-operators)
    - [1.4 Logical Operators](#14-logical-operators)
    - [1.5 String Operators](#15-string-operators)
    - [1.6 Membership Operators](#16-membership-operators)
  - [2. Rarely Used Operators](#2-rarely-used-operators)
    - [2.1 Bitwise Operators](#21-bitwise-operators)
    - [2.2 Identity Operators](#22-identity-operators)
    - [2.3 Walrus Operator](#23-walrus-operator)
    - [2.4 Matrix Multiplication](#24-matrix-multiplication)
    - [2.5 Decorator Operator](#25-decorator-operator)
    - [2.6 Ellipsis Operator](#26-ellipsis-operator)

## 1. Frequently Used Operators

### 1.1 Arithmetic Operators

| Operation      | Python   | JavaScript                   | Description                                     |
| -------------- | -------- | ---------------------------- | ----------------------------------------------- |
| Addition       | `a + b`  | `a + b`                      | Adds values                                     |
| Subtraction    | `a - b`  | `a - b`                      | Subtracts values                                |
| Multiplication | `a * b`  | `a * b`                      | Multiplies values                               |
| Division       | `a / b`  | `a / b`                      | Divides values (always returns float in Python) |
| Floor Division | `a // b` | `Math.floor(a / b)`          | Returns quotient, discarding remainder          |
| Modulus        | `a % b`  | `a % b`                      | Returns remainder                               |
| Exponentiation | `a ** b` | `a ** b` or `Math.pow(a, b)` | Raises a to power of b                          |
| Unary Plus     | `+a`     | `+a`                         | Returns value (JS can convert string to number) |
| Unary Minus    | `-a`     | `-a`                         | Negates value                                   |

**Python Examples:**

```python
print(10 + 5)          # 15
print(10 - 5)          # 5
print(10 * 5)          # 50
print(10 / 5)          # 2.0 (always returns float)
print(10 // 3)         # 3 (floor division)
print(10 % 3)          # 1 (remainder)
print(2 ** 3)          # 8 (2 raised to power 3)
```

**JavaScript Examples:**

```javascript
console.log(10 + 5); // 15
console.log(10 - 5); // 5
console.log(10 * 5); // 50
console.log(10 / 5); // 2
console.log(Math.floor(10 / 3)); // 3
console.log(10 % 3); // 1
console.log(2 ** 3); // 8
console.log(+"5"); // 5 (string to number conversion)
```

**Key Differences:**

- Python division (`/`) always returns a float, while JavaScript returns an integer if the result is a whole number
- JavaScript's unary plus (`+`) can convert strings to numbers, Python cannot
- Python has a dedicated floor division operator (`//`), JavaScript uses `Math.floor()`

### 1.2 Assignment Operators

| Operation               | Python    | JavaScript | Description   |
| ----------------------- | --------- | ---------- | ------------- |
| Assignment              | `a = b`   | `a = b`    | Assigns value |
| Add and assign          | `a += b`  | `a += b`   | `a = a + b`   |
| Subtract and assign     | `a -= b`  | `a -= b`   | `a = a - b`   |
| Multiply and assign     | `a *= b`  | `a *= b`   | `a = a * b`   |
| Divide and assign       | `a /= b`  | `a /= b`   | `a = a / b`   |
| Floor divide and assign | `a //= b` | N/A        | `a = a // b`  |
| Modulus and assign      | `a %= b`  | `a %= b`   | `a = a % b`   |
| Exponent and assign     | `a **= b` | `a **= b`  | `a = a ** b`  |

**Python Examples:**

```python
x = 10
x += 5      # x = 15
x -= 3      # x = 12
x *= 2      # x = 24
x /= 6      # x = 4.0
y = 10
y //= 3     # y = 3
```

**JavaScript Examples:**

```javascript
let x = 10;
x += 5; // x = 15
x -= 3; // x = 12
x *= 2; // x = 24
x /= 6; // x = 4
```

**Key Differences:**

- Python has `//=` for floor division assignment not present in JavaScript
- JavaScript's `/=` returns an integer if result is a whole number, Python's always returns a float

### 1.3 Comparison Operators

| Operation        | Python   | JavaScript | Description                             |
| ---------------- | -------- | ---------- | --------------------------------------- |
| Equal            | `a == b` | `a == b`   | Values equal (with type coercion in JS) |
| Strict equal     | N/A      | `a === b`  | Values and types equal                  |
| Not equal        | `a != b` | `a != b`   | Values not equal                        |
| Strict not equal | N/A      | `a !== b`  | Values or types not equal               |
| Greater than     | `a > b`  | `a > b`    | a greater than b                        |
| Less than        | `a < b`  | `a < b`    | a less than b                           |
| Greater/equal    | `a >= b` | `a >= b`   | a greater than or equal to b            |
| Less/equal       | `a <= b` | `a <= b`   | a less than or equal to b               |

**Python Examples:**

```python
print(5 == 5)     # True
print(5 == "5")   # False (no type coercion)
print(5 != "5")   # True
print(5 > 3)      # True
print(5 < 3)      # False
print(5 >= 5)     # True
print(5 <= 3)     # False
```

**JavaScript Examples:**

```javascript
console.log(5 == 5); // true
console.log(5 == "5"); // true (type coercion)
console.log(5 === "5"); // false (strict equality)
console.log(5 != "5"); // false (type coercion)
console.log(5 !== "5"); // true (strict inequality)
console.log(5 > 3); // true
console.log(5 < 3); // false
```

**Key Differences:**

- JavaScript has both non-strict (`==`, `!=`) and strict (`===`, `!==`) comparison operators
- JavaScript's non-strict operators perform type coercion, Python does not

### 1.4 Logical Operators

| Operation                | Python    | JavaScript | Description                                |
| ------------------------ | --------- | ---------- | ------------------------------------------ | --- | ---------------------- |
| Logical AND              | `a and b` | `a && b`   | True if both are true                      |
| Logical OR               | `a or b`  | `a         |                                            | b`  | True if either is true |
| Logical NOT              | `not a`   | `!a`       | Inverts boolean value                      |
| Short-circuit evaluation | Yes       | Yes        | Stops evaluating when result is determined |

**Python Examples:**

```python
print(True and True)    # True
print(True and False)   # False
print(True or False)    # True
print(False or False)   # False
print(not True)         # False
print(not False)        # True

# Short-circuit and return values
print(0 and "hello")    # 0 (returns first falsy value)
print(1 and "hello")    # "hello" (returns last value)
print(1 or "hello")     # 1 (returns first truthy value)
print(0 or "hello")     # "hello" (returns first truthy value)
```

**JavaScript Examples:**

```javascript
console.log(true && true); // true
console.log(true && false); // false
console.log(true || false); // true
console.log(false || false); // false
console.log(!true); // false
console.log(!false); // true

// Short-circuit and return values
console.log(0 && "hello"); // 0 (returns first falsy value)
console.log(1 && "hello"); // "hello" (returns last value)
console.log(1 || "hello"); // 1 (returns first truthy value)
console.log(0 || "hello"); // "hello" (returns first truthy value)
```

**Key Differences:**

- Python uses keywords (`and`, `or`, `not`), JavaScript uses symbols (`&&`, `||`, `!`)
- Both languages use short-circuit evaluation and return the actual value (not just boolean)
- Falsy values in Python: `False`, `None`, `0`, `""`, `[]`, `()`, `{}`
- Falsy values in JavaScript: `false`, `0`, `""`, `null`, `undefined`, `NaN`

### 1.5 String Operators

| Operation     | Python          | JavaScript          | Description                   |
| ------------- | --------------- | ------------------- | ----------------------------- |
| Concatenation | `a + b`         | `a + b`             | Combines strings              |
| Repetition    | `a * n`         | `a.repeat(n)`       | Repeats string n times        |
| Interpolation | `f"Value: {a}"` | `` `Value: ${a}` `` | Embeds expressions in strings |

**Python Examples:**

```python
print("Hello" + " World")         # "Hello World"
print("Ha" * 3)                   # "HaHaHa"
name = "John"
print(f"Hello, {name}!")          # "Hello, John!"
```

**JavaScript Examples:**

```javascript
console.log("Hello" + " World"); // "Hello World"
console.log("Ha".repeat(3)); // "HaHaHa"
const name = "John";
console.log(`Hello, ${name}!`); // "Hello, John!"
```

**Key Differences:**

- Python uses `*` for string repetition, JavaScript uses `.repeat()`
- Python uses f-strings for interpolation, JavaScript uses template literals

### 1.6 Membership Operators

| Operation | Python       | JavaScript       | Description                 |
| --------- | ------------ | ---------------- | --------------------------- |
| In        | `a in b`     | `b.includes(a)`  | True if a is found in b     |
| Not in    | `a not in b` | `!b.includes(a)` | True if a is not found in b |

**Python Examples:**

```python
print(3 in [1, 2, 3, 4])        # True
print(5 not in [1, 2, 3, 4])    # True
print("a" in "apple")           # True
print("z" not in "apple")       # True
print("key" in {"key": "value"}) # True (checks keys)
```

**JavaScript Examples:**

```javascript
console.log([1, 2, 3, 4].includes(3)); // true
console.log(![1, 2, 3, 4].includes(5)); // true
console.log("apple".includes("a")); // true
console.log(!"apple".includes("z")); // true
console.log(Object.keys({ key: "value" }).includes("key")); // true
```

**Key Differences:**

- Python has dedicated `in` and `not in` operators
- JavaScript uses methods like `.includes()`, `.has()`, or `Object.keys().includes()`
- Python's `in` works on dictionaries to check keys, JavaScript requires specific methods for objects

## 2. Rarely Used Operators

### 2.1 Bitwise Operators

| Operation             | Python   | JavaScript | Description                    |
| --------------------- | -------- | ---------- | ------------------------------ |
| Bitwise AND           | `a & b`  | `a & b`    | Performs binary AND            |
| Bitwise OR            | `a \| b` | `a \| b`   | Performs binary OR             |
| Bitwise XOR           | `a ^ b`  | `a ^ b`    | Performs binary XOR            |
| Bitwise NOT           | `~a`     | `~a`       | Inverts all bits               |
| Left shift            | `a << b` | `a << b`   | Shifts bits left               |
| Right shift           | `a >> b` | `a >> b`   | Shifts bits right              |
| Zero-fill right shift | N/A      | `a >>> b`  | Shifts right, fills with zeros |

**Python Examples:**

```python
print(5 & 3)      # 1 (0101 & 0011 = 0001)
print(5 | 3)      # 7 (0101 | 0011 = 0111)
print(5 ^ 3)      # 6 (0101 ^ 0011 = 0110)
print(~5)         # -6 (inverts bits including sign bit)
print(5 << 1)     # 10 (0101 << 1 = 1010)
print(5 >> 1)     # 2 (0101 >> 1 = 0010)
```

**JavaScript Examples:**

```javascript
console.log(5 & 3); // 1
console.log(5 | 3); // 7
console.log(5 ^ 3); // 6
console.log(~5); // -6
console.log(5 << 1); // 10
console.log(5 >> 1); // 2
console.log(-5 >>> 1); // 2147483645 (Zero-fill right shift)
```

**Key Differences:**

- JavaScript has zero-fill right shift (`>>>`) not available in Python
- Both treat integers as signed by default for bitwise operations

### 2.2 Identity Operators

| Operation | Python       | JavaScript | Description                             |
| --------- | ------------ | ---------- | --------------------------------------- |
| Is        | `a is b`     | N/A        | True if a and b are the same object     |
| Is not    | `a is not b` | N/A        | True if a and b are not the same object |

**Python Examples:**

```python
a = [1, 2, 3]
b = a
c = [1, 2, 3]
print(a is b)      # True (same object)
print(a is c)      # False (different objects with same values)
print(a == c)      # True (equal values)

print(None is None)  # True
```

**JavaScript Closest Equivalent:**

```javascript
const a = [1, 2, 3];
const b = a;
const c = [1, 2, 3];
console.log(a === b); // true (same object)
console.log(a === c); // false (different objects)
console.log(Object.is(a, b)); // true
console.log(Object.is(a, c)); // false
```

**Key Differences:**

- Python has dedicated `is` and `is not` operators
- JavaScript uses `===` or `Object.is()` for similar functionality, but there are subtle differences
- `Object.is()` differs from `===` with NaN and -0/+0 comparisons

### 2.3 Walrus Operator

| Operation             | Python   | JavaScript | Description                             |
| --------------------- | -------- | ---------- | --------------------------------------- |
| Assignment Expression | `a := b` | N/A        | Assigns and returns value (Python 3.8+) |

**Python Examples:**

```python
# Without walrus operator
data = [1, 2, 3, 4, 5]
n = len(data)
if n > 3:
    print(f"List is long: {n} elements")

# With walrus operator
if (n := len(data)) > 3:
    print(f"List is long: {n} elements")

# In while loops
while (line := input()) != "quit":
    print(f"You entered: {line}")
```

**JavaScript Closest Equivalent:**

```javascript
// JavaScript doesn't have a direct equivalent, but:
const data = [1, 2, 3, 4, 5];
const n = data.length;
if (n > 3) {
  console.log(`List is long: ${n} elements`);
}

// Possibly using comma operator in limited cases
let line, input;
while ((line = getInput()) !== "quit") {
  console.log(`You entered: ${line}`);
}
```

**Key Differences:**

- Python's walrus operator (`:=`) is new in Python 3.8+
- No direct equivalent in JavaScript

### 2.4 Matrix Multiplication

| Operation             | Python  | JavaScript | Description                         |
| --------------------- | ------- | ---------- | ----------------------------------- |
| Matrix Multiplication | `a @ b` | N/A        | Matrix multiplication (Python 3.5+) |

**Python Examples:**

```python
import numpy as np

a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6], [7, 8]])

# Matrix multiplication
c = a @ b
print(c)  # [[19 22]
          #  [43 50]]

# Equivalent to
c = np.matmul(a, b)
```

**JavaScript Closest Equivalent:**

```javascript
// Using a library like math.js
const math = require("mathjs");

const a = math.matrix([
  [1, 2],
  [3, 4],
]);
const b = math.matrix([
  [5, 6],
  [7, 8],
]);

// Matrix multiplication
const c = math.multiply(a, b);
console.log(c.toString()); // [[19, 22], [43, 50]]
```

**Key Differences:**

- Python has dedicated `@` operator for matrix multiplication (Python 3.5+)
- JavaScript requires libraries for matrix operations

### 2.5 Decorator Operator

| Operation | Python       | JavaScript | Description                            |
| --------- | ------------ | ---------- | -------------------------------------- |
| Decorator | `@decorator` | N/A        | Applies a function to another function |

**Python Examples:**

```python
def my_decorator(func):
    def wrapper():
        print("Something before the function call")
        func()
        print("Something after the function call")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

# Calling the decorated function
say_hello()
# Output:
# Something before the function call
# Hello!
# Something after the function call
```

**JavaScript Closest Equivalent:**

```javascript
// Using experimental decorator proposal with Babel/TypeScript
// Not standard JavaScript yet
function myDecorator(target) {
  const original = target;
  function wrapper() {
    console.log("Something before the function call");
    original();
    console.log("Something after the function call");
  }
  return wrapper;
}

// With TypeScript/Babel decorators
@myDecorator
function sayHello() {
  console.log("Hello!");
}

// Manual decoration without syntax support
const sayHello = myDecorator(function() {
  console.log("Hello!");
});
```

**Key Differences:**

- Python has built-in decorator syntax with `@`
- JavaScript has decorator proposal but not standardized yet
- JavaScript decorators target classes more than functions

### 2.6 Ellipsis Operator

| Operation | Python | JavaScript | Description                          |
| --------- | ------ | ---------- | ------------------------------------ |
| Ellipsis  | `...`  | `...`      | Different meanings in both languages |

**Python Examples:**

```python
# Used as a placeholder
def todo_function():
    ...  # Same as "pass"

# Type hinting (Python 3.5+)
from typing import List
Vector = List[float]

def scale(scalar: float, vector: Vector) -> Vector:
    return [scalar * num for num in vector]

# In multi-dimensional slicing
import numpy as np
a = np.array([[1, 2, 3], [4, 5, 6]])
print(a[..., 0])  # Gets first column [1, 4]
```

**JavaScript Examples:**

```javascript
// Rest parameters
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// Spread syntax
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Object spread
const obj1 = { x: 1, y: 2 };
const obj2 = { ...obj1, z: 3 }; // { x: 1, y: 2, z: 3 }
```

**Key Differences:**

- Python uses `...` (or `Ellipsis` object) as a placeholder or in slicing
- JavaScript uses `...` for rest parameters and spread syntax
- Completely different meanings in both languages
