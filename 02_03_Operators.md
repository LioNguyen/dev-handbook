# Python Operators Reference

## Table of Contents

- [Python Operators Reference](#python-operators-reference)
  - [Table of Contents](#table-of-contents)
  - [Arithmetic Operators](#arithmetic-operators)
    - [Basic Arithmetic Operators](#basic-arithmetic-operators)
    - [Additional Arithmetic Operators](#additional-arithmetic-operators)
    - [Arithmetic Operators with Strings](#arithmetic-operators-with-strings)
    - [Type Considerations](#type-considerations)
  - [Comparison Operators](#comparison-operators)
    - [Examples of Comparison Operators](#examples-of-comparison-operators)
  - [Logical Operators](#logical-operators)
    - [Examples of Logical Operators](#examples-of-logical-operators)
    - [Short-Circuit Evaluation](#short-circuit-evaluation)
  - [Membership Operators](#membership-operators)
    - [Examples of Membership Operators](#examples-of-membership-operators)
  - [Identity Operators](#identity-operators)
  - [Bitwise Operators](#bitwise-operators)
  - [Assignment Operators](#assignment-operators)
  - [Operator Precedence](#operator-precedence)

## Arithmetic Operators

Arithmetic operators are used to perform mathematical operations like addition, subtraction, multiplication, etc.

### Basic Arithmetic Operators

| Operator | Name           | Description                                                     | Example              |
| -------- | -------------- | --------------------------------------------------------------- | -------------------- |
| `+`      | Addition       | Adds two operands                                               | `1 + 1` gives `2`    |
| `-`      | Subtraction    | Subtracts the right operand from the left                       | `5 - 2` gives `3`    |
| `*`      | Multiplication | Multiplies two operands                                         | `4 * 5` gives `20`   |
| `/`      | Division       | Divides the left operand by the right (always results in float) | `20 / 5` gives `4.0` |

Examples:

```python
# Addition
print(1 + 1)  # Output: 2

# Multiplication
print(4 * 5)  # Output: 20

# Division (always results in float)
print(20 / 5)  # Output: 4.0
print(20 / 6)  # Output: 3.3333333333333335
```

### Additional Arithmetic Operators

| Operator | Name           | Description                                                                   | Example             |
| -------- | -------------- | ----------------------------------------------------------------------------- | ------------------- |
| `**`     | Exponentiation | Raises the left operand to the power of the right                             | `5 ** 2` gives `25` |
| `//`     | Floor Division | Division that results in whole number adjusted to the left in the number line | `20 // 6` gives `3` |
| `%`      | Modulus        | Returns the remainder of the division                                         | `20 % 6` gives `2`  |

Examples:

```python
# Exponentiation (power)
print(5 ** 2)  # Output: 25 (5 squared)

# Modulus (remainder)
print(20 % 6)  # Output: 2 (remainder of 20÷6)

# Floor division
print(20 // 6)  # Output: 3 (integer division, rounded down)
```

### Arithmetic Operators with Strings

Some arithmetic operators can be used with strings:

| Operator | With Strings  | Description                |
| -------- | ------------- | -------------------------- |
| `+`      | Concatenation | Joins two strings together |
| `*`      | Repetition    | Repeats the string n times |

Examples:

```python
# String concatenation
print('string 1 ' + 'string 2')  # Output: 'string 1 string 2'

# String repetition
print('- string 1 - ' * 4)  # Output: '- string 1 - - string 1 - - string 1 - - string 1 - '
```

### Type Considerations

When mixing types, Python enforces strict rules:

```python
# This will cause a TypeError
try:
    print(' 1' + 4)  # Error: can't concatenate str and int
except TypeError as e:
    print(f"Error: {e}")  # Output: Error: can only concatenate str (not "int") to str

# Correct way: convert int to str first
print(' 1' + str(4))  # Output: ' 14'
```

## Comparison Operators

Comparison operators are used to compare values. They return `True` or `False` based on the condition.

| Operator | Name                     | Description                                                          |
| -------- | ------------------------ | -------------------------------------------------------------------- |
| `==`     | Equal                    | Returns `True` if both operands are equal                            |
| `!=`     | Not equal                | Returns `True` if operands are not equal                             |
| `>`      | Greater than             | Returns `True` if left operand is greater than the right             |
| `<`      | Less than                | Returns `True` if left operand is less than the right                |
| `>=`     | Greater than or equal to | Returns `True` if left operand is greater than or equal to the right |
| `<=`     | Less than or equal to    | Returns `True` if left operand is less than or equal to the right    |

### Examples of Comparison Operators

```python
# Equality
print(True == True)  # Output: True

# Less than
print(4 < 5)  # Output: True

# Less than or equal to
print(5 <= 5)  # Output: True

# Greater than
print(5 > 2)  # Output: True

# Greater than or equal to
print(5 >= 2)  # Output: True
```

## Logical Operators

Logical operators are used to combine conditional statements.

| Operator | Description                                                |
| -------- | ---------------------------------------------------------- |
| `and`    | Returns `True` if both statements are true                 |
| `or`     | Returns `True` if one of the statements is true            |
| `not`    | Reverses the result, returns `False` if the result is true |

### Examples of Logical Operators

```python
# AND operator - both conditions must be true
print(True and True)   # Output: True
print(True and False)  # Output: False

# OR operator - at least one condition must be true
print(True or False)   # Output: True
print(False or False)  # Output: False

# AND with both false
print(False and False) # Output: False

# NOT operator - reverses the boolean value
print(not True)        # Output: False
print(not False)       # Output: True
```

### Short-Circuit Evaluation

Python uses short-circuit evaluation with logical operators:

```python
# With AND, if first expression is False, second is not evaluated
x = False
y = "not evaluated"
result = x and y  # result is False, y is never evaluated

# With OR, if first expression is True, second is not evaluated
x = True
y = "not evaluated"
result = x or y  # result is True, y is never evaluated
```

## Membership Operators

Membership operators test if a sequence contains an object.

| Operator | Description                                                      |
| -------- | ---------------------------------------------------------------- |
| `in`     | Returns `True` if a specified value is found in the sequence     |
| `not in` | Returns `True` if a specified value is not found in the sequence |

### Examples of Membership Operators

```python
# Check if value is in a list
print(1 in [1, 2, 3, 4, 5])       # Output: True
print(10 not in [1, 2, 3, 4, 5])  # Output: True

# Check if substring is in string
print('cat' in 'my pet cat')      # Output: True
print('cat' not in 'my pet cat')  # Output: False
```

## Identity Operators

Identity operators compare the memory locations of two objects.

| Operator | Description                                              |
| -------- | -------------------------------------------------------- |
| `is`     | Returns `True` if both variables are the same object     |
| `is not` | Returns `True` if both variables are not the same object |

Examples:

```python
# Same object (shared memory location)
a = [1, 2, 3]
b = a
print(a is b)  # Output: True

# Different objects (different memory locations)
a = [1, 2, 3]
b = [1, 2, 3]
print(a is b)  # Output: False
print(a is not b)  # Output: True
```

## Bitwise Operators

Bitwise operators act on operands as if they were strings of binary digits:

| Operator | Name        | Description                                                         |
| -------- | ----------- | ------------------------------------------------------------------- |
| `&`      | AND         | Sets each bit to 1 if both bits are 1                               |
| `\|`     | OR          | Sets each bit to 1 if one of the bits is 1                          |
| `^`      | XOR         | Sets each bit to 1 if only one of the bits is 1                     |
| `~`      | NOT         | Inverts all the bits                                                |
| `<<`     | Left shift  | Shifts left by pushing zeros in from the right                      |
| `>>`     | Right shift | Shifts right by pushing copies of the leftmost bit in from the left |

Examples:

```python
a = 60  # 60 = 0011 1100
b = 13  # 13 = 0000 1101

print(a & b)   # Output: 12 (0000 1100)
print(a | b)   # Output: 61 (0011 1101)
print(a ^ b)   # Output: 49 (0011 0001)
print(~a)      # Output: -61 (1100 0011)
print(a << 2)  # Output: 240 (1111 0000)
print(a >> 2)  # Output: 15 (0000 1111)
```

## Assignment Operators

Assignment operators are used to assign values to variables.

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
| `&=`     | `x &= 3`  | `x = x & 3`   |
| `\|=`    | `x \|= 3` | `x = x \| 3`  |
| `^=`     | `x ^= 3`  | `x = x ^ 3`   |
| `>>=`    | `x >>= 3` | `x = x >> 3`  |
| `<<=`    | `x <<= 3` | `x = x << 3`  |

Examples:

```python
x = 10
x += 5  # x = x + 5
print(x)  # Output: 15

y = "Hello"
y += " World"  # String concatenation
print(y)  # Output: Hello World
```

## Operator Precedence

Python follows a specific order of operations. Operators with higher precedence are evaluated first.

From highest to lowest precedence:

1. Parentheses `()`
2. Exponentiation `**`
3. Unary plus `+x`, unary minus `-x`, bitwise NOT `~x`
4. Multiplication `*`, division `/`, floor division `//`, modulus `%`
5. Addition `+`, subtraction `-`
6. Bitwise shifts `<<`, `>>`
7. Bitwise AND `&`
8. Bitwise XOR `^`
9. Bitwise OR `|`
10. Comparison operators `==`, `!=`, `>`, `>=`, `<`, `<=`, `is`, `is not`, `in`, `not in`
11. Boolean NOT `not`
12. Boolean AND `and`
13. Boolean OR `or`

Example with precedence:

```python
# Precedence matters
result = 2 + 3 * 4  # Multiplication happens first
print(result)  # Output: 14, not 20

# Using parentheses to override precedence
result = (2 + 3) * 4
print(result)  # Output: 20
```
