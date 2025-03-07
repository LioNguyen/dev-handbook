# Python Control Flow Reference

## Table of Contents

- [Python Control Flow Reference](#python-control-flow-reference)
  - [Table of Contents](#table-of-contents)
  - [Conditional Statements](#conditional-statements)
    - [If Statement](#if-statement)
    - [If-Else Statement](#if-else-statement)
    - [If-Elif-Else Statement](#if-elif-else-statement)
    - [Nested If Statements](#nested-if-statements)
    - [Conditional Expressions (Ternary Operator)](#conditional-expressions-ternary-operator)
  - [Looping Structures](#looping-structures)
    - [For Loops](#for-loops)
      - [Looping Through Sequences](#looping-through-sequences)
      - [Looping with Range](#looping-with-range)
      - [Enumerate Function](#enumerate-function)
      - [Loop Control Statements](#loop-control-statements)
    - [While Loops](#while-loops)
      - [Basic While Loop](#basic-while-loop)
      - [While Loop with Else](#while-loop-with-else)
  - [Control Flow Manipulation](#control-flow-manipulation)
    - [Break Statement](#break-statement)
    - [Continue Statement](#continue-statement)
    - [Pass Statement](#pass-statement)
  - [Combining Control Structures](#combining-control-structures)
  - [Best Practices](#best-practices)

## Conditional Statements

Conditional statements allow your program to execute different blocks of code based on whether a condition evaluates to `True` or `False`.

### If Statement

The simplest form of a conditional statement that executes a block of code only if the condition is `True`.

Syntax:

```python
if condition:
    # code to execute if condition is True
```

Example:

```python
a = True
if a:
    print('It is true!')
    print('Also print this')
print('Always print this')
```

Output:

```
It is true!
Also print this
Always print this
```

### If-Else Statement

Executes one block of code if the condition is `True` and another block if the condition is `False`.

Syntax:

```python
if condition:
    # code to execute if condition is True
else:
    # code to execute if condition is False
```

Example:

```python
a = True
if a:
    print('It is true!')
    print('Also print this')
else:
    print('It is false!')
print('Always print this')
```

Output:

```
It is true!
Also print this
Always print this
```

If we change `a = False`:

```
It is false!
Always print this
```

### If-Elif-Else Statement

Used when you need to check multiple conditions.

Syntax:

```python
if condition1:
    # code to execute if condition1 is True
elif condition2:
    # code to execute if condition1 is False and condition2 is True
else:
    # code to execute if all conditions are False
```

Example:

```python
score = 85

if score >= 90:
    print('Grade: A')
elif score >= 80:
    print('Grade: B')
elif score >= 70:
    print('Grade: C')
elif score >= 60:
    print('Grade: D')
else:
    print('Grade: F')
```

Output:

```
Grade: B
```

### Nested If Statements

Conditional statements can be nested inside other conditional statements.

Example:

```python
a = True
b = False
c = True

if a:
    print('It is true!')
    print('Also print this')
    if b:
        print('Both are true')
        if c:
            print('All three are true')
else:
    print('It is false!')
print('Always print this')
```

Output:

```
It is true!
Also print this
Always print this
```

If we change `b = True`:

```
It is true!
Also print this
Both are true
All three are true
Always print this
```

### Conditional Expressions (Ternary Operator)

A shorter way to write a simple if-else statement in a single line.

Syntax:

```python
value_if_true if condition else value_if_false
```

Example:

```python
age = 20
status = "Adult" if age >= 18 else "Minor"
print(status)
```

Output:

```
Adult
```

## Looping Structures

Loops allow you to execute a block of code repeatedly.

### For Loops

For loops are used to iterate over a sequence (like a list, tuple, dictionary, set, or string).

#### Looping Through Sequences

Syntax:

```python
for item in sequence:
    # code to execute for each item
```

Example with a list:

```python
a = [1, 2, 3, 4, 5]
for number in a:
    print(number)
```

Output:

```
1
2
3
4
5
```

Example with a string:

```python
for char in "Python":
    print(char)
```

Output:

```
P
y
t
h
o
n
```

#### Looping with Range

The `range()` function generates a sequence of numbers.

Syntax:

```python
# range(stop)
# range(start, stop)
# range(start, stop, step)
```

Example:

```python
for i in range(5):
    print(i)
```

Output:

```
0
1
2
3
4
```

#### Enumerate Function

Use `enumerate()` when you need both the index and value.

Example:

```python
fruits = ['apple', 'banana', 'cherry']
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")
```

Output:

```
0: apple
1: banana
2: cherry
```

#### Loop Control Statements

You can use `break` to exit a loop and `continue` to skip to the next iteration.

Example with `break`:

```python
for i in range(10):
    if i == 5:
        break
    print(i)
```

Output:

```
0
1
2
3
4
```

Example with `continue`:

```python
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)
```

Output:

```
1
3
5
7
9
```

### While Loops

While loops repeatedly execute a block of code as long as a condition is `True`.

#### Basic While Loop

Syntax:

```python
while condition:
    # code to execute while condition is True
```

Example:

```python
a = 0
while a < 5:
    print(a)
    a = a + 1
```

Output:

```
0
1
2
3
4
```

#### While Loop with Else

The `else` block executes after the while loop completes normally (not terminated by a `break`).

Example:

```python
count = 0
while count < 3:
    print(count)
    count += 1
else:
    print("Loop completed!")
```

Output:

```
0
1
2
Loop completed!
```

## Control Flow Manipulation

### Break Statement

Terminates the current loop and resumes execution at the next statement.

Example:

```python
for number in range(10):
    if number == 5:
        print("Found 5! Breaking loop.")
        break
    print(number)
```

Output:

```
0
1
2
3
4
Found 5! Breaking loop.
```

### Continue Statement

Skips the rest of the current iteration and moves to the next iteration.

Example:

```python
for number in range(10):
    if number % 2 == 0:
        continue
    print(number)
```

Output:

```
1
3
5
7
9
```

### Pass Statement

A placeholder statement that does nothing. Used when a statement is required syntactically but no action is needed.

Example:

```python
for i in range(5):
    if i == 2:
        # TODO: Add special handling for 2 later
        pass
    print(i)
```

Output:

```
0
1
2
3
4
```

## Combining Control Structures

You can combine different control structures to create more complex logic.

Example:

```python
numbers = [1, 2, 3, 4, 5]
sum_even = 0
count_even = 0

for num in numbers:
    if num % 2 == 0:
        sum_even += num
        count_even += 1

if count_even > 0:
    average_even = sum_even / count_even
    print(f"Average of even numbers: {average_even}")
else:
    print("No even numbers found")
```

Output:

```
Average of even numbers: 3.0
```

## Best Practices

1. **Use meaningful indentation**: Python relies on indentation to define code blocks.

2. **Keep conditions simple**: Break complex conditions into smaller, more readable ones.

3. **Avoid deeply nested conditionals**: Consider refactoring or using early returns.

4. **Use appropriate loop types**: Use for loops when you know the number of iterations, while loops when you don't.

5. **Be careful with infinite loops**: Always ensure that while loops have a way to terminate.

6. **Use loop control statements sparingly**: Excessive use of break and continue can make code harder to follow.

7. **Consider using guard clauses**: Place early returns at the beginning of a function to handle edge cases.

8. **Think about loop efficiency**: Avoid unnecessary operations inside loops.

9. **Use comprehensions for simple operations**: List, dictionary, and set comprehensions can replace simple for loops.

10. **Test edge cases**: Ensure your control flow handles boundary conditions correctly.
