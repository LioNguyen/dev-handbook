# Python vs JavaScript Data Types

## 1. Introduction

This guide provides a comparative overview of basic data types in Python and JavaScript, designed for experienced developers preparing for senior-level interviews. The comparison highlights syntax differences, behavior nuances, and common patterns.

## 2. Frequently Used Data Types

### 2.1 Variables & Assignment

| Feature        | Python                                                                          | JavaScript                                                                     |
| -------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Declaration    | No declaration keyword needed<br>`x = 5`                                        | Uses `var`, `let`, or `const`<br>`let x = 5;`<br>`const y = 10;`               |
| Naming Rules   | Snake_case convention<br>Can't start with number<br>Can't use reserved keywords | CamelCase convention<br>Can't start with number<br>Can't use reserved keywords |
| Dynamic Typing | ✓                                                                               | ✓                                                                              |
| Invalid Names  | `1x` (invalid, can't start with digit)                                          | `1x` (invalid, can't start with digit)                                         |
| Checking Type  | `type(variable)`                                                                | `typeof variable`                                                              |
| Scope          | Function and block scope                                                        | Function scope (`var`)<br>Block scope (`let`, `const`)                         |

```python
# Python example
x = 5
print(x)  # 5
print(type(x))  # <class 'int'>

name = 'Ryan'
print(type(name))  # <class 'str'>

# Invalid: 1x = 10  # SyntaxError
```

```javascript
// JavaScript example
let x = 5;
console.log(x); // 5
console.log(typeof x); // "number"

const name = "Ryan";
console.log(typeof name); // "string"

// Invalid: let 1x = 10;  // SyntaxError
```

### 2.2 Numbers

| Feature             | Python                                                                                            | JavaScript                                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Integer             | Unlimited precision<br>`x = 42`                                                                   | 64-bit floating point (IEEE 754)<br>`let x = 42;`                                                                     |
| Float               | Double precision (64-bit)<br>`x = 3.14`                                                           | Same as integers (all numbers are floating point)<br>`let x = 3.14;`                                                  |
| Scientific Notation | `1.23e6`                                                                                          | `1.23e6`                                                                                                              |
| Arithmetic          | Standard operators: `+`, `-`, `*`, `/`<br>Integer division: `//`<br>Modulo: `%`<br>Exponent: `**` | Standard operators: `+`, `-`, `*`, `/`<br>No integer division<br>Modulo: `%`<br>Exponent: `**` (ES6+) or `Math.pow()` |
| Precision Issues    | Less common due to separate int type                                                              | Common with decimal calculations<br>`0.1 + 0.2 !== 0.3`                                                               |
| Special Values      | `float('inf')`, `float('-inf')`, `float('nan')`                                                   | `Infinity`, `-Infinity`, `NaN`                                                                                        |
| Conversion          | `int()`, `float()`                                                                                | `Number()`, `parseInt()`, `parseFloat()`                                                                              |

```python
# Python example
a = 10
b = 3
print(a / b)  # 3.3333333333333335 (true division)
print(a // b)  # 3 (floor division)
print(type(1.5))  # <class 'float'>
print(1.23456789)  # 1.23456789
print(12345678.9)  # 12345678.9
```

```javascript
// JavaScript example
let a = 10;
let b = 3;
console.log(a / b); // 3.3333333333333335
console.log(Math.floor(a / b)); // 3
console.log(typeof 1.5); // "number"
console.log(1.23456789); // 1.23456789
console.log(12345678.9); // 12345678.9
```

### 2.3 Strings

| Feature          | Python                                                                         | JavaScript                                                                         |
| ---------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| Definition       | Single or double quotes<br>`'text'` or `"text"`<br>Triple quotes for multiline | Single or double quotes<br>`'text'` or `"text"`<br>Backticks for template literals |
| Concatenation    | `+` operator<br>`str1 + str2`                                                  | `+` operator<br>`str1 + str2`                                                      |
| Interpolation    | f-strings (Python 3.6+)<br>`f"Hello, {name}"`                                  | Template literals<br>`` `Hello, ${name}` ``                                        |
| Escape Sequences | `\n`, `\t`, `\'`, `\"`, etc.                                                   | `\n`, `\t`, `\'`, `\"`, etc.                                                       |
| Indexing         | Zero-based<br>`str[0]` for first character                                     | Zero-based<br>`str[0]` for first character                                         |
| Slicing          | `str[start:end:step]`                                                          | No native slicing (use substring/slice)                                            |
| Immutability     | Immutable                                                                      | Immutable                                                                          |
| Methods          | `upper()`, `lower()`, `strip()`, etc.                                          | `toUpperCase()`, `toLowerCase()`, `trim()`, etc.                                   |

```python
# Python example
str1 = 'String 1 '
str2 = 'String 2'
print(str1 + str2)  # String 1 String 2

print('1' + '1')  # 11 (string concatenation)
# print('1' + 1)  # TypeError: can only concatenate str (not "int") to str
print('1' + str(1))  # 11
```

```javascript
// JavaScript example
let str1 = "String 1 ";
let str2 = "String 2";
console.log(str1 + str2); // "String 1 String 2"

console.log("1" + "1"); // "11" (string concatenation)
console.log("1" + 1); // "11" (number converted to string)
```

### 2.4 Booleans

| Feature         | Python                                       | JavaScript                                                 |
| --------------- | -------------------------------------------- | ---------------------------------------------------------- |
| Values          | `True`, `False` (capitalized)                | `true`, `false` (lowercase)                                |
| Operators       | `and`, `or`, `not`                           | `&&`, `&#124;&#124;`, `!`                                  |
| Comparisons     | `==`, `!=`, `<`, `>`, `<=`, `>=`             | `==`, `!=`, `<`, `>`, `<=`, `>=`                           |
| Strict Equality | N/A (types must match for equality)          | `===`, `!==` (checks type and value)                       |
| Truthy Values   | Non-empty strings, Non-zero numbers, etc.    | Non-empty strings, Non-zero numbers, objects, arrays, etc. |
| Falsy Values    | `False`, `None`, `0`, `""`, `[]`, `{}`, etc. | `false`, `null`, `undefined`, `0`, `NaN`, `""`             |
| Type Coercion   | Limited automatic conversion                 | Extensive automatic conversion                             |

```python
# Python example
print(True)  # True
print(False)  # False
print(1 == 1)  # True
print(1 == 2)  # False

# Variable name can be 'true' (not a keyword)
true = True
print(true)  # True
```

```javascript
// JavaScript example
console.log(true); // true
console.log(false); // false
console.log(1 == 1); // true
console.log(1 == 2); // false

// This would be invalid as 'true' is a reserved keyword
// let true = true;  // SyntaxError
```

#### Boolean Conversion and Truthiness Comparison

| Value                  | Python Boolean Conversion | JavaScript Boolean Conversion |
| ---------------------- | ------------------------- | ----------------------------- |
| Empty string `""`      | `False`                   | `false`                       |
| String `"0"`           | `True`                    | `true`                        |
| Zero `0`               | `False`                   | `false`                       |
| Number `1`             | `True`                    | `true`                        |
| Empty list/array `[]`  | `False`                   | `true`                        |
| Empty dict/object `{}` | `False`                   | `true`                        |
| `None` / `null`        | `False`                   | `false`                       |
| `undefined`            | N/A                       | `false`                       |
| `NaN`                  | N/A                       | `false`                       |

## 3. Rarely Used Data Types

### 3.1 Complex Numbers

| Feature    | Python                             | JavaScript                     |
| ---------- | ---------------------------------- | ------------------------------ |
| Syntax     | `complex(real, imag)` or `a + bj`  | No native complex type         |
| Operations | Supports all arithmetic operations | Requires custom implementation |
| Properties | `z.real`, `z.imag`                 | N/A                            |

```python
# Python example
z = 2 + 3j
print(type(z))  # <class 'complex'>
print(z.real)   # 2.0
print(z.imag)   # 3.0
print(1j * 1j)  # (-1+0j) (i² = -1)
```

```javascript
// JavaScript example - custom implementation
class Complex {
  constructor(real, imag) {
    this.real = real;
    this.imag = imag;
  }

  multiply(other) {
    return new Complex(
      this.real * other.real - this.imag * other.imag,
      this.real * other.imag + this.imag * other.real
    );
  }
}

const z = new Complex(2, 3);
const i = new Complex(0, 1);
const result = i.multiply(i);
console.log(result); // Complex {real: -1, imag: 0}
```

### 3.2 Special Numeric Types and Operations

| Feature            | Python                                                                | JavaScript                                 |
| ------------------ | --------------------------------------------------------------------- | ------------------------------------------ |
| Binary Numbers     | `0b1010`                                                              | `0b1010`                                   |
| Octal Numbers      | `0o123`                                                               | `0o123` (ES6+)                             |
| Hexadecimal        | `0x1A`                                                                | `0x1A`                                     |
| Bigint             | `int` (unlimited precision)                                           | `BigInt` (added in ES2020)<br>`12345n`     |
| Decimal/Fraction   | `Decimal` from `decimal` module<br>`Fraction` from `fractions` module | No native equivalent (libraries available) |
| Bitwise Operations | `&`, `&#124;`, `^`, `~`, `<<`, `>>`                                   | `&`, `&#124;`, `^`, `~`, `<<`, `>>`, `>>>` |

```python
# Python example
from decimal import Decimal
from fractions import Fraction

# More precise decimal calculations
print(Decimal('0.1') + Decimal('0.2'))  # 0.3

# Fraction representation
print(Fraction(1, 3) + Fraction(1, 6))  # 1/2
```

### 3.3 Type Coercion & Conversion

| Feature             | Python                                               | JavaScript                                              |
| ------------------- | ---------------------------------------------------- | ------------------------------------------------------- |
| Implicit Conversion | Limited<br>No auto conversion between str and number | Extensive<br>Auto conversion between many types         |
| Explicit Conversion | `int()`, `float()`, `str()`, `bool()`, etc.          | `Number()`, `String()`, `Boolean()`, `parseInt()`, etc. |
| Type Checking       | `isinstance(value, type)`                            | `typeof value`, `value instanceof Constructor`          |
| Common Gotchas      | `'1' + 1` throws TypeError                           | `'1' + 1` ⟹ `'11'`<br>`'1' - 1` ⟹ `0`                   |

## 4. Key Differences and Interview Tips

1. **Type System**

   - Python: Strong, dynamic typing
   - JavaScript: Weak, dynamic typing

2. **Number Handling**

   - Python: Separate int and float types, unlimited precision integers
   - JavaScript: Single number type (64-bit float)

3. **Equality Comparisons**

   - Python: `==` compares values (with type conversion for numeric types)
   - JavaScript: `==` compares with type coercion, `===` compares without coercion

4. **Truthiness**

   - Python: Empty containers are falsy
   - JavaScript: Empty arrays and objects are truthy

5. **Type Conversions**

   - Python: Explicit conversions required in most cases
   - JavaScript: Implicit conversions happen frequently

6. **Interview Questions to Expect**
   - "Compare Python and JavaScript data types"
   - "How would you handle decimal precision issues in both languages?"
   - "Explain type coercion in JavaScript vs Python"
   - "What are some potential bugs when porting code between these languages?"

## 5. Example Interview Answers

**Q: How do Python and JavaScript handle numeric precision differently?**

A: Python distinguishes between integers (unlimited precision) and floating-point numbers (IEEE 754 double precision), while JavaScript uses a single number type (IEEE 754 double precision) for all numeric values. This means Python can handle arbitrarily large integers without precision loss, whereas JavaScript may encounter issues with large integers. For decimal calculations, both languages can suffer from floating-point precision issues (e.g., 0.1 + 0.2 != 0.3), but Python offers the Decimal module for precise decimal arithmetic.

**Q: What are the major pitfalls when converting code between Python and JavaScript?**

A: Key pitfalls include:

1. String concatenation with numbers (`'1' + 1` works in JavaScript but raises TypeError in Python)
2. Truthiness of empty arrays/objects (truthy in JavaScript, falsy in Python)
3. Equality comparisons (JavaScript's loose equality can lead to unexpected results)
4. Different operator behaviors (e.g., integer division in Python vs floating-point division in JavaScript)
5. Variable scoping rules
