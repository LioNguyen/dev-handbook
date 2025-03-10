# Python Operators Interview Quiz

## Table of Contents

- [Python Operators Interview Quiz](#python-operators-interview-quiz)
  - [Table of Contents](#table-of-contents)
  - [Arithmetic Operators](#arithmetic-operators)
  - [Comparison Operators](#comparison-operators)
  - [Logical Operators](#logical-operators)
  - [Bitwise Operators](#bitwise-operators)
  - [Assignment Operators](#assignment-operators)
  - [Identity and Membership Operators](#identity-and-membership-operators)
  - [Operator Precedence](#operator-precedence)
  - [Operator Behavior Quirks](#operator-behavior-quirks)
  - [Advanced Operator Usage](#advanced-operator-usage)
  - [Performance Considerations](#performance-considerations)

## Arithmetic Operators

**Question 1:** What is the output of the following Python code?

```python
print(10 / 5)
print(10 // 5)
print(10 % 3)
print(2 ** 3)
```

A) `2, 2, 1, 8`  
B) `2.0, 2, 1, 8`  
C) `2, 2, 1, 6`  
D) `2.0, 2.0, 1, 8`

<details>
<summary>View Answer</summary>
<b>B) 2.0, 2, 1, 8</b>

Explanation:

- `10 / 5` equals `2.0` (float): In Python 3, division always returns a float
- `10 // 5` equals `2` (integer): Floor division returns the integer part of the division
- `10 % 3` equals `1`: Modulo operator returns the remainder of the division
- `2 ** 3` equals `8`: Exponentiation operator (2 to the power of 3)

This demonstrates the key difference between standard division (`/`) and floor division (`//`) in Python 3. Standard division always returns a float, even when the result is a whole number.

</details>

## Comparison Operators

**Question 2:** Which statement about Python comparison operators is FALSE?

A) Chained comparisons like `1 < x < 10` are evaluated as `1 < x and x < 10`  
B) The expression `"apple" < "banana"` evaluates to `True`  
C) The expression `[1, 2] < [1, 3]` evaluates to `True`  
D) The expression `None == 0` evaluates to `True`

<details>
<summary>View Answer</summary>
<b>D) The expression `None == 0` evaluates to `True`</b>

Explanation:

- `None == 0` actually evaluates to `False`: In Python, `None` is a distinct type and is not equal to 0 or any other value except `None` itself
- Chained comparisons are indeed evaluated as logical AND operations
- String comparisons are done lexicographically, so "apple" does come before "banana"
- List comparisons are done element by element, so [1, 2] is less than [1, 3]

This question highlights how Python's type system treats `None` as a distinct entity rather than falsy like in some other languages.

</details>

## Logical Operators

**Question 3:** What is the output of the following Python code?

```python
print(True and False)
print(True or False)
print(not True)
print('' and 'Hello')
print('' or 'Hello')
```

A) `False, True, False, '', 'Hello'`  
B) `False, True, False, False, True`  
C) `0, 1, 0, '', 'Hello'`  
D) `False, True, False, 'Hello', ''`

<details>
<summary>View Answer</summary>
<b>A) False, True, False, '', 'Hello'</b>

Explanation:

- `True and False` equals `False`: Logical AND returns the second value if the first is truthy
- `True or False` equals `True`: Logical OR returns the first value if it's truthy
- `not True` equals `False`: Logical NOT inverts the boolean value
- `'' and 'Hello'` equals `''`: Since the empty string is falsy, AND returns it without evaluating the second operand
- `'' or 'Hello'` equals `'Hello'`: Since the empty string is falsy, OR moves to the second operand

This demonstrates that Python's logical operators don't just return boolean values - they return the actual operand values that determine the result, enabling short-circuit evaluation.

</details>

## Bitwise Operators

**Question 4:** What is the output of the following Python code?

```python
a = 5    # 101 in binary
b = 3    # 011 in binary
print(a & b)
print(a | b)
print(a ^ b)
print(~a)
print(a << 1)
print(a >> 1)
```

A) `1, 7, 6, -6, 10, 2`  
B) `1, 7, 6, -5, 10, 2`  
C) `1, 7, 2, -6, 10, 2`  
D) `1, 15, 6, -5, 25, 2`

<details>
<summary>View Answer</summary>
<b>A) 1, 7, 6, -6, 10, 2</b>

Explanation:

- `a & b` equals `1`: Bitwise AND (101 & 011 = 001)
- `a | b` equals `7`: Bitwise OR (101 | 011 = 111)
- `a ^ b` equals `6`: Bitwise XOR (101 ^ 011 = 110)
- `~a` equals `-6`: Bitwise NOT (~101 = ...11111010 due to two's complement)
- `a << 1` equals `10`: Left shift (101 becomes 1010)
- `a >> 1` equals `2`: Right shift (101 becomes 10)

This demonstrates how Python handles binary operations, including the somewhat counterintuitive result of the bitwise NOT operator due to how negative numbers are stored in binary.

</details>

## Assignment Operators

**Question 5:** Which of the following statements about Python assignment operators is TRUE?

A) The expression `x += 1` is always equivalent to `x = x + 1` in every scenario  
B) The statement `x = y = z = 0` assigns 0 to x, y to x, and z to y  
C) The augmented assignment `x += [1, 2]` will fail if x is initially an empty list  
D) The statement `a, b = b, a` swaps the values of variables a and b

<details>
<summary>View Answer</summary>
<b>D) The statement `a, b = b, a` swaps the values of variables a and b</b>

Explanation:

- `a, b = b, a` does swap variables without needing a temporary variable
- `x += 1` is generally equivalent to `x = x + 1`, but there are edge cases with custom objects
- `x = y = z = 0` assigns 0 to all three variables (not what option B suggests)
- `x += [1, 2]` works fine if x is an empty list, as the += operator for lists performs concatenation

This question highlights Python's tuple unpacking feature, which allows for elegant variable swapping without needing a temporary variable as in many other languages.

</details>

## Identity and Membership Operators

**Question 6:** What is the output of the following Python code?

```python
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a == b)
print(a is b)
print(a is c)
print(2 in a)
print(4 not in a)
```

A) `True, True, True, True, True`  
B) `True, False, True, True, True`  
C) `True, False, False, True, True`  
D) `False, False, True, True, True`

<details>
<summary>View Answer</summary>
<b>B) True, False, True, True, True</b>

Explanation:

- `a == b` equals `True`: Lists have the same values, so they're equal
- `a is b` equals `False`: They're different objects in memory
- `a is c` equals `True`: c is assigned the same object as a
- `2 in a` equals `True`: 2 is an element in the list
- `4 not in a` equals `True`: 4 is not an element in the list

This demonstrates the crucial difference between equality (`==`) and identity (`is`) operators. `==` checks if values are equal, while `is` checks if two variables reference the same object in memory.

</details>

## Operator Precedence

**Question 7:** What is the output of the following Python code?

```python
x = 5
y = 10
z = 0

print(x < y and z or not z)
print(3 + 4 * 2 - 1)
print(3 * 1 ** 3)
print(4 < 5 > 3 < 6)
```

A) `True, 10, 3, True`  
B) `False, 10, 3, True`  
C) `True, 10, 27, True`  
D) `False, 10, 3, False`

<details>
<summary>View Answer</summary>
<b>A) True, 10, 3, True</b>

Explanation:

- `x < y and z or not z`: `x < y` is `True`, `z` is `0` (falsy), so `True and 0` is `0`, then `0 or not 0` is `True`
- `3 + 4 * 2 - 1`: Multiplication has higher precedence, so `4 * 2 = 8`, then `3 + 8 - 1 = 10`
- `3 * 1 ** 3`: Exponentiation has higher precedence than multiplication, so `1 ** 3 = 1`, then `3 * 1 = 3`
- `4 < 5 > 3 < 6`: All chained comparisons are `True`, so the entire expression is `True`

This demonstrates Python's operator precedence rules, which determine the order in which operations are evaluated.

</details>

## Operator Behavior Quirks

**Question 8:** What is the output of the following Python code?

```python
def add_to_list(value, my_list=[]):
    my_list.append(value)
    return my_list

print(add_to_list(1))
print(add_to_list(2))
print(add_to_list(3, [10, 20]))
print(add_to_list(4))
```

A) `[1], [2], [10, 20, 3], [4]`  
B) `[1], [1, 2], [10, 20, 3], [1, 2, 4]`  
C) `[1], [2], [10, 20, 3], [1, 2, 3, 4]`  
D) `[1], [1, 2], [10, 20, 3], [1, 2, 4]`

<details>
<summary>View Answer</summary>
<b>D) [1], [1, 2], [10, 20, 3], [1, 2, 4]</b>

Explanation:
This question demonstrates the mutable default argument pitfall in Python:

1. `add_to_list(1)`: Creates the default empty list and adds 1, returning `[1]`
2. `add_to_list(2)`: Uses the SAME default list from the first call (which now contains `[1]`), adds 2, returning `[1, 2]`
3. `add_to_list(3, [10, 20])`: Uses the provided list, adds 3, returning `[10, 20, 3]`
4. `add_to_list(4)`: Again uses the same default list (which now contains `[1, 2]`), adds 4, returning `[1, 2, 4]`

This is a classic Python gotcha: default arguments are evaluated only once at function definition time, not each time the function is called. Mutable default arguments persist between function calls.

</details>

## Advanced Operator Usage

**Question 9:** What is the output of the following Python code?

```python
# Using unpacking and the * operator
first, *middle, last = [1, 2, 3, 4, 5]
print(first, middle, last)

# Using ** for dictionary unpacking
def display_info(name, age, city):
    return f"{name} is {age} years old from {city}"

person = {"name": "Alice", "age": 30, "city": "New York"}
print(display_info(**person))

# Using ternary operator
x = 5
result = "Even" if x % 2 == 0 else "Odd"
print(result)
```

A) `1 [2, 3, 4] 5, "Alice is 30 years old from New York", "Odd"`  
B) `1 [2, 3, 4] 5, Error: unpack got an unexpected keyword argument, "Odd"`  
C) `1 [2, 3, 4] 5, "Alice is 30 years old from New York", "Even"`  
D) `Error: too many values to unpack, "Alice is 30 years old from New York", "Odd"`

<details>
<summary>View Answer</summary>
<b>A) 1 [2, 3, 4] 5, "Alice is 30 years old from New York", "Odd"</b>

Explanation:

- `first, *middle, last = [1, 2, 3, 4, 5]`: Extended unpacking assigns `1` to `first`, `[2, 3, 4]` to `middle`, and `5` to `last`
- `display_info(**person)`: Dictionary unpacking passes each key-value pair as a named argument to the function
- `"Even" if x % 2 == 0 else "Odd"`: Since `5 % 2` is `1`, the condition is `False`, so the "Odd" value is selected

This demonstrates three powerful Python features:

1. Extended unpacking with the `*` operator to collect multiple values
2. Dictionary unpacking with the `**` operator to pass keyword arguments
3. The conditional/ternary operator for concise if-else expressions
</details>

## Performance Considerations

**Question 10:** Which of the following statements about Python operator performance is TRUE?

A) The expression `a < b and expensive_function()` will always call `expensive_function()` regardless of the value of `a < b`  
B) Bitwise operators are generally slower than arithmetic operators for simple integer operations  
C) Using `1 < x < 10` is less efficient than writing `1 < x and x < 10`  
D) The modulo operator `%` is typically more efficient than using bitwise operations for checking if a number is odd or even

<details>
<summary>View Answer</summary>
<b>C) Using `1 < x < 10` is less efficient than writing `1 < x and x < 10`</b>

Explanation:

- While chained comparisons like `1 < x < 10` are more elegant, they are slightly less efficient as Python has to perform extra steps internally
- Logical operators like `and` use short-circuit evaluation, so if `a < b` is False, `expensive_function()` won't be called
- Bitwise operators are generally faster than arithmetic operators for simple operations, not slower
- For checking if a number is even, `num & 1 == 0` is typically more efficient than `num % 2 == 0`

This question highlights the tension between writing elegant, readable code and optimizing for performance. In practice, the performance difference for chained comparisons is negligible for most applications, and the more readable syntax is generally preferred.

</details>
