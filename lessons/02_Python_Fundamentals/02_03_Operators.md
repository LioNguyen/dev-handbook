# 1. Python Operators Reference

## 1.1 Table of Contents

- [1. Python Operators Reference](#1-python-operators-reference)
  - [1.1 Table of Contents](#11-table-of-contents)
  - [1.2 Introduction](#12-introduction)
  - [1.3 Frequently Used Operators](#13-frequently-used-operators)
    - [1.3.1 Arithmetic Operators](#131-arithmetic-operators)
      - [Python Arithmetic Operators](#python-arithmetic-operators)
      - [JavaScript Comparison for Arithmetic Operators](#javascript-comparison-for-arithmetic-operators)
      - [Key Differences:](#key-differences)
    - [1.3.2 Comparison Operators](#132-comparison-operators)
      - [Python Comparison Operators](#python-comparison-operators)
      - [JavaScript Comparison for Comparison Operators](#javascript-comparison-for-comparison-operators)
      - [Key Differences:](#key-differences-1)
    - [1.3.3 Logical Operators](#133-logical-operators)
      - [Python Logical Operators](#python-logical-operators)
      - [JavaScript Comparison for Logical Operators](#javascript-comparison-for-logical-operators)
      - [Key Differences:](#key-differences-2)
    - [1.3.4 Assignment Operators](#134-assignment-operators)
      - [Python Assignment Operators](#python-assignment-operators)
      - [JavaScript Comparison for Assignment Operators](#javascript-comparison-for-assignment-operators)
      - [Key Differences:](#key-differences-3)
    - [1.3.5 Membership Operators](#135-membership-operators)
      - [Python Membership Operators](#python-membership-operators)
      - [JavaScript Comparison for Membership Operators](#javascript-comparison-for-membership-operators)
      - [Key Differences:](#key-differences-4)
  - [1.4 Rarely Used Operators](#14-rarely-used-operators)
    - [1.4.1 Identity Operators](#141-identity-operators)
      - [Python Identity Operators](#python-identity-operators)
      - [JavaScript Comparison for Identity Operators](#javascript-comparison-for-identity-operators)
      - [Key Differences:](#key-differences-5)
    - [1.4.2 Bitwise Operators](#142-bitwise-operators)
      - [Python Bitwise Operators](#python-bitwise-operators)
      - [JavaScript Comparison for Bitwise Operators](#javascript-comparison-for-bitwise-operators)
      - [Key Differences:](#key-differences-6)
    - [1.4.3 Special Operators](#143-special-operators)
      - [Python Special Operators](#python-special-operators)
      - [JavaScript Comparison for Special Operators](#javascript-comparison-for-special-operators)
      - [Key Differences:](#key-differences-7)
  - [1.5 Operator Precedence](#15-operator-precedence)
    - [Python Operator Precedence](#python-operator-precedence)
    - [JavaScript Comparison for Operator Precedence](#javascript-comparison-for-operator-precedence)
    - [Key Differences:](#key-differences-8)
  - [1.6 Summary](#16-summary)
    - [Frequently Used Python Operators:](#frequently-used-python-operators)
    - [Rarely Used Python Operators:](#rarely-used-python-operators)

## 1.2 Introduction

Operators are special symbols in Python that perform operations on variables and values. This reference divides Python operators into frequently used and rarely used categories, with JavaScript comparisons for each operator to help developers transitioning between the two languages.

## 1.3 Frequently Used Operators

### 1.3.1 Arithmetic Operators

Arithmetic operators perform mathematical operations like addition, subtraction, multiplication, etc.

#### Python Arithmetic Operators

| Operator | Name           | Description                                                                   | Example              |
| -------- | -------------- | ----------------------------------------------------------------------------- | -------------------- |
| `+`      | Addition       | Adds two operands                                                             | `1 + 1` gives `2`    |
| `-`      | Subtraction    | Subtracts the right operand from the left                                     | `5 - 2` gives `3`    |
| `*`      | Multiplication | Multiplies two operands                                                       | `4 * 5` gives `20`   |
| `/`      | Division       | Divides the left operand by the right (always results in float)               | `20 / 5` gives `4.0` |
| `**`     | Exponentiation | Raises the left operand to the power of the right                             | `5 ** 2` gives `25`  |
| `//`     | Floor Division | Division that results in whole number adjusted to the left in the number line | `20 // 6` gives `3`  |
| `%`      | Modulus        | Returns the remainder of the division                                         | `20 % 6` gives `2`   |

**Python Examples:**

```python
# Basic arithmetic
print(10 + 5)      # Output: 15
print(10 - 5)      # Output: 5
print(10 * 5)      # Output: 50
print(10 / 5)      # Output: 2.0 (always returns float)
print(10 / 3)      # Output: 3.3333333333333335

# Additional operators
print(10 ** 2)     # Output: 100 (10 squared)
print(10 // 3)     # Output: 3 (floor division)
print(10 % 3)      # Output: 1 (remainder)

# With strings
print("Hello" + " World")   # Output: Hello World (concatenation)
print("Hello" * 3)          # Output: HelloHelloHello (repetition)
```

#### JavaScript Comparison for Arithmetic Operators

| Python Operator | JavaScript Equivalent | Description                         | JavaScript Example           |
| --------------- | --------------------- | ----------------------------------- | ---------------------------- |
| `+`             | `+`                   | Addition (and string concatenation) | `1 + 1` gives `2`            |
| `-`             | `-`                   | Subtraction                         | `5 - 2` gives `3`            |
| `*`             | `*`                   | Multiplication                      | `4 * 5` gives `20`           |
| `/`             | `/`                   | Division                            | `20 / 5` gives `4`           |
| `**`            | `**`                  | Exponentiation (ES2016+)            | `5 ** 2` gives `25`          |
| `//`            | `Math.floor(x/y)`     | Floor Division                      | `Math.floor(20/6)` gives `3` |
| `%`             | `%`                   | Modulus                             | `20 % 6` gives `2`           |

**JavaScript Examples:**

```javascript
// Basic arithmetic
console.log(10 + 5); // Output: 15
console.log(10 - 5); // Output: 5
console.log(10 * 5); // Output: 50
console.log(10 / 5); // Output: 2
console.log(10 / 3); // Output: 3.3333333333333335

// Additional operators
console.log(10 ** 2); // Output: 100 (ES2016+)
// Alternative: console.log(Math.pow(10, 2));

// Floor division (no direct equivalent)
console.log(Math.floor(10 / 3)); // Output: 3

console.log(10 % 3); // Output: 1 (remainder)

// With strings
console.log("Hello" + " World"); // Output: Hello World (concatenation)
// No direct equivalent for string repetition
console.log("Hello".repeat(3)); // Output: HelloHelloHello (ES6+)
```

#### Key Differences:

1. **Division**: In Python, `/` always returns a float. In JavaScript, division returns an integer if the result is a whole number.
2. **Floor Division**: Python has the `//` operator; JavaScript requires `Math.floor()`.
3. **String Repetition**: Python uses `*` for string repetition; JavaScript uses `.repeat()` (ES6+).
4. **Exponentiation**: Both languages support `**`, but in JavaScript it's newer (ES2016+). Older code might use `Math.pow()`.

### 1.3.2 Comparison Operators

Comparison operators are used to compare values. They return `True` or `False` (Python) or `true` or `false` (JavaScript) based on the condition.

#### Python Comparison Operators

| Operator | Name                     | Description                                                          |
| -------- | ------------------------ | -------------------------------------------------------------------- |
| `==`     | Equal                    | Returns `True` if both operands are equal                            |
| `!=`     | Not equal                | Returns `True` if operands are not equal                             |
| `>`      | Greater than             | Returns `True` if left operand is greater than the right             |
| `<`      | Less than                | Returns `True` if left operand is less than the right                |
| `>=`     | Greater than or equal to | Returns `True` if left operand is greater than or equal to the right |
| `<=`     | Less than or equal to    | Returns `True` if left operand is less than or equal to the right    |

**Python Examples:**

```python
# Equality
print(10 == 10)    # Output: True
print(10 == "10")  # Output: False (different types)

# Inequality
print(10 != 5)     # Output: True

# Comparison
print(10 > 5)      # Output: True
print(10 < 5)      # Output: False
print(10 >= 10)    # Output: True
print(10 <= 5)     # Output: False

# String comparison (compares lexicographically)
print("apple" < "banana")  # Output: True
```

#### JavaScript Comparison for Comparison Operators

| Python Operator | JavaScript Equivalent | Description                 | JavaScript Example      |
| --------------- | --------------------- | --------------------------- | ----------------------- |
| `==`            | `==` or `===`         | Equal (loose or strict)     | `10 == 10` gives `true` |
| `!=`            | `!=` or `!==`         | Not equal (loose or strict) | `10 != 5` gives `true`  |
| `>`             | `>`                   | Greater than                | `10 > 5` gives `true`   |
| `<`             | `<`                   | Less than                   | `5 < 10` gives `true`   |
| `>=`            | `>=`                  | Greater than or equal to    | `10 >= 10` gives `true` |
| `<=`            | `<=`                  | Less than or equal to       | `5 <= 10` gives `true`  |

**JavaScript Examples:**

```javascript
// Equality
console.log(10 == 10); // Output: true
console.log(10 == "10"); // Output: true (loose equality, type coercion)
console.log(10 === "10"); // Output: false (strict equality, no type coercion)

// Inequality
console.log(10 != 5); // Output: true
console.log(10 != "10"); // Output: false (loose inequality)
console.log(10 !== "10"); // Output: true (strict inequality)

// Comparison
console.log(10 > 5); // Output: true
console.log(10 < 5); // Output: false
console.log(10 >= 10); // Output: true
console.log(10 <= 5); // Output: false

// String comparison (compares lexicographically)
console.log("apple" < "banana"); // Output: true
```

#### Key Differences:

1. **Equality Operators**: JavaScript has both loose (`==`, `!=`) and strict (`===`, `!==`) equality operators. Python's `==` and `!=` are closer to JavaScript's strict equality (no type coercion).
2. **Type Coercion**: JavaScript performs type coercion with loose equality; Python doesn't.
   - In JavaScript: `10 == "10"` is `true`
   - In Python: `10 == "10"` is `False`

### 1.3.3 Logical Operators

Logical operators are used to combine conditional statements.

#### Python Logical Operators

| Operator | Name | Description                                                |
| -------- | ---- | ---------------------------------------------------------- |
| `and`    | AND  | Returns `True` if both statements are true                 |
| `or`     | OR   | Returns `True` if one of the statements is true            |
| `not`    | NOT  | Reverses the result, returns `False` if the result is true |

**Python Examples:**

```python
# AND operator - both conditions must be true
print(True and True)   # Output: True
print(True and False)  # Output: False
print(False and False) # Output: False

# OR operator - at least one condition must be true
print(True or False)   # Output: True
print(False or False)  # Output: False

# NOT operator - reverses the boolean value
print(not True)        # Output: False
print(not False)       # Output: True

# Short-circuit evaluation
x = False
y = "not evaluated"
result = x and y       # result is False, y is never evaluated

x = True
y = "not evaluated"
result = x or y        # result is True, y is never evaluated

# Using with values (truthy/falsy)
print(0 and 1)         # Output: 0 (falsy value)
print(1 and 2)         # Output: 2 (last evaluated value)
print(0 or 1)          # Output: 1 (first truthy value)
```

#### JavaScript Comparison for Logical Operators

| Python Operator | JavaScript Equivalent | Description                  | JavaScript Example                    |
| --------------- | --------------------- | ---------------------------- | ------------------------------------- |
| `and`           | `&&`                  | Logical AND                  | `true && true` gives `true`           |
| `or`            | `\|\|`                | Logical OR                   | `true \|\| false` gives `true`        |
| `not`           | `!`                   | Logical NOT                  | `!true` gives `false`                 |
| N/A             | `??`                  | Nullish coalescing (ES2020+) | `null ?? "default"` gives `"default"` |

**JavaScript Examples:**

```javascript
// AND operator
console.log(true && true); // Output: true
console.log(true && false); // Output: false
console.log(false && false); // Output: false

// OR operator
console.log(true || false); // Output: true
console.log(false || false); // Output: false

// NOT operator
console.log(!true); // Output: false
console.log(!false); // Output: true

// Short-circuit evaluation
let x = false;
let y = "not evaluated";
let result = x && y; // result is false, y is never evaluated

x = true;
y = "not evaluated";
result = x || y; // result is true, y is never evaluated

// Using with values (truthy/falsy)
console.log(0 && 1); // Output: 0 (falsy value)
console.log(1 && 2); // Output: 2 (last evaluated value)
console.log(0 || 1); // Output: 1 (first truthy value)

// Nullish coalescing (not in Python)
let value = null;
console.log(value ?? "default"); // Output: "default"
console.log(0 ?? "default"); // Output: 0 (0 is not null or undefined)
```

#### Key Differences:

1. **Syntax**: Python uses the words `and`, `or`, `not`; JavaScript uses symbols `&&`, `||`, `!`.
2. **Nullish Coalescing**: JavaScript has `??` which is different from `||` because it only considers `null` and `undefined` as falsy, not `0` or empty string. Python has no direct equivalent.
3. **Return Values**: Both languages return the last evaluated value, not necessarily a boolean. This allows for patterns like `x = a || b || c`.

### 1.3.4 Assignment Operators

Assignment operators are used to assign values to variables.

#### Python Assignment Operators

| Operator | Example   | Equivalent to |
| -------- | --------- | ------------- |
| `=`      | `x = 5`   | `x = 5`       |
| `+=`     | `x += 3`  | `x = x + 3`   |
| `-=`     | `x -= 3`  | `x = x - 3`   |
| `*=`     | `x *= 3`  | `x = x * 3`   |
| `/=`     | `x /= 3`  | `x = x / 3`   |
| `%=`     | `x %= 3`  | `x = x % 3`   |
| `//=`    | `x //= 3` | `x = x // 3`  |
| `**=`    | `x **= 3` | `x = x ** 3`  |

**Python Examples:**

```python
# Basic assignment
x = 10
print(x)  # Output: 10

# Compound assignments
x += 5    # x = x + 5
print(x)  # Output: 15

x -= 3    # x = x - 3
print(x)  # Output: 12

x *= 2    # x = x * 2
print(x)  # Output: 24

x /= 4    # x = x / 4
print(x)  # Output: 6.0

# String operations
s = "Hello"
s += " World"  # s = s + " World"
print(s)       # Output: Hello World
```

#### JavaScript Comparison for Assignment Operators

| Python Operator | JavaScript Equivalent | Description                         | JavaScript Example |
| --------------- | --------------------- | ----------------------------------- | ------------------ |
| `=`             | `=`                   | Assignment                          | `let x = 5`        |
| `+=`            | `+=`                  | Addition assignment                 | `x += 3`           |
| `-=`            | `-=`                  | Subtraction assignment              | `x -= 3`           |
| `*=`            | `*=`                  | Multiplication assignment           | `x *= 3`           |
| `/=`            | `/=`                  | Division assignment                 | `x /= 3`           |
| `%=`            | `%=`                  | Modulus assignment                  | `x %= 3`           |
| `//=`           | N/A                   | Floor division assignment           | N/A                |
| `**=`           | `**=`                 | Exponentiation assignment (ES2016+) | `x **= 3`          |

**JavaScript Examples:**

```javascript
// Basic assignment
let x = 10;
console.log(x); // Output: 10

// Compound assignments
x += 5; // x = x + 5
console.log(x); // Output: 15

x -= 3; // x = x - 3
console.log(x); // Output: 12

x *= 2; // x = x * 2
console.log(x); // Output: 24

x /= 4; // x = x / 4
console.log(x); // Output: 6

// Floor division (no direct operator)
x = Math.floor(x / 2);
console.log(x); // Output: 3

// String operations
let s = "Hello";
s += " World"; // s = s + " World"
console.log(s); // Output: Hello World
```

#### Key Differences:

1. **Floor Division**: JavaScript has no `//=` operator; you must use `Math.floor()`.
2. **Division Result**: In Python, `/=` always results in a float; in JavaScript, it may result in an integer if the division is exact.
3. **Exponentiation**: Both support `**=`, but it's newer in JavaScript (ES2016+).

### 1.3.5 Membership Operators

Membership operators test if a sequence contains an object.

#### Python Membership Operators

| Operator | Description                                                      |
| -------- | ---------------------------------------------------------------- |
| `in`     | Returns `True` if a specified value is found in the sequence     |
| `not in` | Returns `True` if a specified value is not found in the sequence |

**Python Examples:**

```python
# List membership
fruits = ["apple", "banana", "cherry"]
print("banana" in fruits)       # Output: True
print("orange" in fruits)       # Output: False
print("orange" not in fruits)   # Output: True

# String membership
message = "Hello, World!"
print("Hello" in message)       # Output: True
print("Python" in message)      # Output: False

# Dictionary membership (checks keys)
person = {"name": "John", "age": 30}
print("name" in person)         # Output: True
print("John" in person)         # Output: False
print(30 in person.values())    # Output: True
```

#### JavaScript Comparison for Membership Operators

| Python Operator | JavaScript Equivalent                                    | Description                                                            | JavaScript Example                                                   |
| --------------- | -------------------------------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `in`            | `.includes()` for arrays, `in` for objects               | Checks if value exists in array/string or if property exists in object | `"banana" in fruits` (objects), `fruits.includes("banana")` (arrays) |
| `not in`        | `!...includes()` for arrays, `!(... in ...)` for objects | Negation of the above                                                  | `!fruits.includes("banana")`                                         |

**JavaScript Examples:**

```javascript
// Array membership
const fruits = ["apple", "banana", "cherry"];
console.log(fruits.includes("banana")); // Output: true
console.log(fruits.includes("orange")); // Output: false
console.log(!fruits.includes("orange")); // Output: true

// String membership
const message = "Hello, World!";
console.log(message.includes("Hello")); // Output: true
console.log(message.includes("Python")); // Output: false

// Object property membership (different from Python's 'in')
const person = { name: "John", age: 30 };
console.log("name" in person); // Output: true
console.log("John" in person); // Output: false (checks keys only)
console.log(Object.values(person).includes(30)); // Output: true
```

#### Key Differences:

1. **Arrays vs Objects**: JavaScript has different methods for checking membership in arrays (`.includes()`) vs objects (`in`).
2. **`in` Behavior**: In Python, `in` checks for value membership in collections and substrings in strings. In JavaScript, `in` checks if a property exists in an object.
3. **Dictionary/Object Check**: Python's `in` checks keys by default. JavaScript's `in` also checks object keys, but you use `.includes()` or other methods for checking values.

## 1.4 Rarely Used Operators

### 1.4.1 Identity Operators

Identity operators compare the memory locations of two objects.

#### Python Identity Operators

| Operator | Description                                                                 |
| -------- | --------------------------------------------------------------------------- |
| `is`     | Returns `True` if both variables are the same object (same memory location) |
| `is not` | Returns `True` if both variables are not the same object                    |

**Python Examples:**

```python
# Same object (shared memory location)
a = [1, 2, 3]
b = a
print(a is b)       # Output: True

# Different objects (different memory locations)
a = [1, 2, 3]
b = [1, 2, 3]
print(a is b)       # Output: False
print(a is not b)   # Output: True

# Special cases with immutable objects
x = 5
y = 5
print(x is y)       # Output: True (implementation detail)

# None check (common use case)
value = None
print(value is None)  # Output: True (preferred over value == None)
```

#### JavaScript Comparison for Identity Operators

| Python Operator | JavaScript Equivalent                          | Description                                                     | JavaScript Example            |
| --------------- | ---------------------------------------------- | --------------------------------------------------------------- | ----------------------------- |
| `is`            | `===` (with limitations), `Object.is()` (ES6+) | Strict equality, or more accurate identity check with Object.is | `a === b`, `Object.is(a, b)`  |
| `is not`        | `!==` (with limitations), `!Object.is()`       | Negation of the above                                           | `a !== b`, `!Object.is(a, b)` |

**JavaScript Examples:**

```javascript
// Same object (shared memory location)
let a = [1, 2, 3];
let b = a;
console.log(a === b); // Output: true
console.log(Object.is(a, b)); // Output: true

// Different objects (different memory locations)
a = [1, 2, 3];
b = [1, 2, 3];
console.log(a === b); // Output: false
console.log(a !== b); // Output: true
console.log(!Object.is(a, b)); // Output: true

// Special cases with primitives
let x = 5;
let y = 5;
console.log(x === y); // Output: true

// Special case with NaN (different from ===)
console.log(NaN === NaN); // Output: false
console.log(Object.is(NaN, NaN)); // Output: true

// null check (common use case)
let value = null;
console.log(value === null); // Output: true
```

#### Key Differences:

1. **Identity vs. Equality**: Python's `is` operator strictly checks object identity (memory location). JavaScript's `===` checks value equality for primitives and reference identity for objects.
2. **`Object.is()`**: In ES6+, `Object.is()` is closer to Python's `is` but has some differences in handling special values like `NaN`.
3. **None/null Checks**: Python uses `is None`; JavaScript uses `=== null`.

### 1.4.2 Bitwise Operators

Bitwise operators act on operands as if they were strings of binary digits.

#### Python Bitwise Operators

| Operator | Name        | Description                                                         |
| -------- | ----------- | ------------------------------------------------------------------- |
| `&`      | AND         | Sets each bit to 1 if both bits are 1                               |
| `\|`     | OR          | Sets each bit to 1 if one of the bits is 1                          |
| `^`      | XOR         | Sets each bit to 1 if only one of the bits is 1                     |
| `~`      | NOT         | Inverts all the bits                                                |
| `<<`     | Left shift  | Shifts left by pushing zeros in from the right                      |
| `>>`     | Right shift | Shifts right by pushing copies of the leftmost bit in from the left |

**Python Examples:**

```python
a = 60  # 60 = 0011 1100
b = 13  # 13 = 0000 1101

print(a & b)   # Output: 12 (0000 1100)
print(a | b)   # Output: 61 (0011 1101)
print(a ^ b)   # Output: 49 (0011 0001)
print(~a)      # Output: -61 (1100 0011, as 2's complement)
print(a << 2)  # Output: 240 (1111 0000)
print(a >> 2)  # Output: 15 (0000 1111)
```

#### JavaScript Comparison for Bitwise Operators

| Python Operator | JavaScript Equivalent | Description          | JavaScript Example    |
| --------------- | --------------------- | -------------------- | --------------------- |
| `&`             | `&`                   | Bitwise AND          | `60 & 13` gives `12`  |
| `\|`            | `\|`                  | Bitwise OR           | `60 \| 13` gives `61` |
| `^`             | `^`                   | Bitwise XOR          | `60 ^ 13` gives `49`  |
| `~`             | `~`                   | Bitwise NOT          | `~60` gives `-61`     |
| `<<`            | `<<`                  | Left shift           | `60 << 2` gives `240` |
| `>>`            | `>>`                  | Right shift          | `60 >> 2` gives `15`  |
| N/A             | `>>>`                 | Unsigned right shift | `60 >>> 2` gives `15` |

**JavaScript Examples:**

```javascript
let a = 60; // 60 = 0011 1100
let b = 13; // 13 = 0000 1101

console.log(a & b); // Output: 12 (0000 1100)
console.log(a | b); // Output: 61 (0011 1101)
console.log(a ^ b); // Output: 49 (0011 0001)
console.log(~a); // Output: -61 (1100 0011, as 2's complement)
console.log(a << 2); // Output: 240 (1111 0000)
console.log(a >> 2); // Output: 15 (0000 1111)
console.log(a >>> 2); // Output: 15 (0000 1111) (unsigned shift)

// Difference is more visible with negative numbers
let neg = -60;
console.log(neg >> 2); // Output: -15 (preserves sign)
console.log(neg >>> 2); // Output: 1073741809 (treats as unsigned)
```

#### Key Differences:

1. **Unsigned Right Shift**: JavaScript has the `>>>` operator which Python lacks. It shifts and fills with zeros, regardless of sign.
2. **Implementation**: Both languages handle bitwise operations on integers similarly, but implementation details may differ for very large numbers due to JavaScript's number type.

### 1.4.3 Special Operators

These are operators specific to each language with limited or specialized usage.

#### Python Special Operators

| Operator | Name   | Description                            |
| -------- | ------ | -------------------------------------- |
| `:`      | Slice  | Creates a slice (subset) of a sequence |
| `:=`     | Walrus | Assignment expression (Python 3.8+)    |

**Python Examples:**

```python
# Slice operator
my_list = [0, 1, 2, 3, 4, 5]
print(my_list[1:4])    # Output: [1, 2, 3]
print(my_list[::2])    # Output: [0, 2, 4] (step by 2)

# Walrus operator (:=) - Python 3.8+
if (n := len(my_list)) > 5:
    print(f"List has {n} items, which is a lot!")  # This will execute

# Without walrus, would need two lines:
# n = len(my_list)
# if n > 5:
#     print(f"List has {n} items, which is a lot!")
```

#### JavaScript Comparison for Special Operators

| Python Operator | JavaScript Equivalent | Description                  | JavaScript Example       |
| --------------- | --------------------- | ---------------------------- | ------------------------ |
| `:`             | `.slice()`            | Array/string slicing         | `myArray.slice(1, 4)`    |
| `:=`            | No direct equivalent  | Assignment in expressions    | See below for patterns   |
| N/A             | `?.`                  | Optional chaining (ES2020+)  | `obj?.prop?.method?.()`  |
| N/A             | `??`                  | Nullish coalescing (ES2020+) | `value ?? defaultValue`  |
| N/A             | `...`                 | Spread/rest operator (ES6+)  | `[...array]`, `{...obj}` |

**JavaScript Examples:**

```javascript
// Slice method (not an operator)
const myArray = [0, 1, 2, 3, 4, 5];
console.log(myArray.slice(1, 4)); // Output: [1, 2, 3]

// No direct walrus equivalent, but similar patterns:
const myArray2 = [0, 1, 2, 3, 4, 5];
const n = myArray2.length;
if (n > 5) {
  console.log(`Array has ${n} items, which is a lot!`);
}

// Or using IIFE pattern (immediately invoked function expression)
if (((n) => n > 5)(myArray2.length)) {
  console.log(`Array has ${myArray2.length} items, which is a lot!`);
}

// Optional chaining (not in Python)
const user = {
  profile: {
    name: "John",
  },
};

// Without optional chaining:
const name1 = user && user.profile && user.profile.name;

// With optional chaining:
const name2 = user?.profile?.name; // Output: "John"

// Spread operator (not in Python in this form)
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // Output: [1, 2, 3, 4, 5, 6]

const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const mergedObj = { ...obj1, ...obj2 }; // Output: {a: 1, b: 2, c: 3, d: 4}
```

#### Key Differences:

1. **Slicing**: Python uses the `:` operator directly with indices; JavaScript uses the `.slice()` method.
2. **Walrus Operator**: Python's `:=` has no direct JavaScript equivalent; various patterns can achieve similar results.
3. **JavaScript-Specific Operators**: JavaScript has several operators not found in Python, such as optional chaining (`?.`), nullish coalescing (`??`), and spread/rest (`...`).

## 1.5 Operator Precedence

Operator precedence determines the order in which operations are performed.

#### Python Operator Precedence

From highest to lowest precedence:

1. Parentheses and brackets `()`, `[]`, `{}`
2. Exponentiation `**`
3. Unary operators `+x`, `-x`, `~x`
4. Multiplication, division, floor division, modulus `*`, `/`, `//`, `%`
5. Addition and subtraction `+`, `-`
6. Bitwise shifts `<<`, `>>`
7. Bitwise AND `&`
8. Bitwise XOR `^`
9. Bitwise OR `|`
10. Comparison operators `==`, `!=`, `>`, `>=`, `<`, `<=`, `is`, `is not`, `in`, `not in`
11. Boolean NOT `not`
12. Boolean AND `and`
13. Boolean OR `or`
14. Conditional expression `if-else`
15. Assignment operators `=`, `+=`, `-=`, etc.

**Python Example:**

```python
result = 10 + 3 * 2    # Multiplication first, then addition
print(result)          # Output: 16, not 26

result = (10 + 3) * 2  # Parentheses override precedence
print(result)          # Output: 26
```

#### JavaScript Comparison for Operator Precedence

JavaScript has a similar but not identical precedence order:

1. Grouping `()`
2. Member access, computed member access, function calls, new `obj.prop`, `obj[prop]`, `func()`, `new`
3. Postfix increment/decrement `x++`, `x--`
4. Logical NOT, unary plus/minus, prefix increment/decrement, typeof, etc. `!x`, `+x`, `-x`, `++x`, `--x`, `typeof`
5. Exponentiation `**`
6. Multiplication, division, modulus `*`, `/`, `%`
7. Addition, subtraction `+`, `-`
8. Bitwise shift `<<`, `>>`, `>>>`
9. Relational operators `<`, `<=`, `>`, `>=`, `in`, `instanceof`
10. Equality operators `==`, `!=`, `===`, `!==`
11. Bitwise AND `&`
12. Bitwise XOR `^`
13. Bitwise OR `|`
14. Logical AND `&&`
15. Logical OR `||`
16. Nullish coalescing `??`
17. Conditional (ternary) operator `? :`
18. Assignment operators `=`, `+=`, `-=`, etc.
19. Comma operator `,`

**JavaScript Example:**

```javascript
let result = 10 + 3 * 2; // Multiplication first, then addition
console.log(result); // Output: 16, not 26

result = (10 + 3) * 2; // Parentheses override precedence
console.log(result); // Output: 26
```

#### Key Differences:

1. **Logical Operators**: In Python, `not` has higher precedence than `and`, which has higher precedence than `or`. In JavaScript, `!` has much higher precedence than `&&`, which has higher precedence than `||`.
2. **Member Access**: JavaScript has specific precedence rules for object property access and function calls.
3. **Increment/Decrement**: JavaScript has `++` and `--` operators, which Python doesn't have.
4. **Comma Operator**: JavaScript has the comma operator (`,`) which Python doesn't have as an operator.

## 1.6 Summary

### Frequently Used Python Operators:

1. **Arithmetic Operators**:

   - Used for mathematical operations
   - Include `+`, `-`, `*`, `/`, `**`, `//`, `%`
   - String operations: `+` for concatenation, `*` for repetition

2. **Comparison Operators**:

   - Compare values and return boolean results
   - Include `==`, `!=`, `>`, `<`, `>=`, `<=`
   - No type coercion, unlike JavaScript's loose equality

3. **Logical Operators**:

   - Combine conditions with `and`, `or`, `not`
   - Use words instead of symbols (`&&`, `||`, `!` in JavaScript)
   - Support short-circuit evaluation and return the last evaluated operand

4. **Assignment Operators**:

   - Assign and modify variables in one step
   - Include `=`, `+=`, `-=`, etc.
   - Can work with numeric values and strings

5. **Membership Operators**:
   - Check if a value exists in a sequence with `in` and `not in`
   - Work with lists, strings, dictionaries, etc.
   - Check keys in dictionaries by default

### Rarely Used Python Operators:

1. **Identity Operators**:

   - Compare object identity (memory location) with `is` and `is not`
   - Most commonly used for `None` checks
   - Different from equality (`==`) which compares values

2. **Bitwise Operators**:

   - Manipulate individual bits in integers
   - Include `&`, `|`, `^`, `~`, `<<`, `>>`
   - Used in low-level programming, optimization, or bit flag operations

3. **Special Operators**:
   - Slice operator `:` for sequence slicing
   - Walrus operator `:=` (Python 3.8+) for assignment expressions

When transitioning between Python and JavaScript, it's important to understand the syntactic differences and behavioral nuances of similar operators. The most significant differences appear in type handling, equality checking, and certain language-specific operators that don't have direct equivalents in the other language.
