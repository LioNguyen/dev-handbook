# 1. Python Control Flow Reference with JavaScript Comparisons

## 1.1 Table of Contents

- [1. Python Control Flow Reference with JavaScript Comparisons](#1-python-control-flow-reference-with-javascript-comparisons)
  - [1.1 Table of Contents](#11-table-of-contents)
  - [1.2 Introduction](#12-introduction)
  - [1.3 Frequently Used Control Flow](#13-frequently-used-control-flow)
    - [1.3.1 Basic Conditional Statements](#131-basic-conditional-statements)
      - [1.3.1.1 If Statement](#1311-if-statement)
        - [Python Syntax:](#python-syntax)
        - [JavaScript Comparison:](#javascript-comparison)
        - [Python Example:](#python-example)
        - [JavaScript Equivalent:](#javascript-equivalent)
      - [1.3.1.2 If-Else Statement](#1312-if-else-statement)
        - [Python Syntax:](#python-syntax-1)
        - [JavaScript Comparison:](#javascript-comparison-1)
        - [Python Example:](#python-example-1)
        - [JavaScript Equivalent:](#javascript-equivalent-1)
      - [1.3.1.3 If-Elif-Else Statement](#1313-if-elif-else-statement)
        - [Python Syntax:](#python-syntax-2)
        - [JavaScript Comparison:](#javascript-comparison-2)
        - [Python Example:](#python-example-2)
        - [JavaScript Equivalent:](#javascript-equivalent-2)
    - [1.3.2 Standard Loops](#132-standard-loops)
      - [1.3.2.1 For Loops with Sequences](#1321-for-loops-with-sequences)
        - [Python Syntax:](#python-syntax-3)
        - [JavaScript Comparison:](#javascript-comparison-3)
        - [Python Example:](#python-example-3)
        - [JavaScript Equivalent:](#javascript-equivalent-3)
      - [1.3.2.2 For Loops with Range](#1322-for-loops-with-range)
        - [Python Syntax:](#python-syntax-4)
        - [JavaScript Comparison:](#javascript-comparison-4)
        - [Python Example:](#python-example-4)
        - [JavaScript Equivalent:](#javascript-equivalent-4)
      - [1.3.2.3 Basic While Loops](#1323-basic-while-loops)
        - [Python Syntax:](#python-syntax-5)
        - [JavaScript Comparison:](#javascript-comparison-5)
        - [Python Example:](#python-example-5)
        - [JavaScript Equivalent:](#javascript-equivalent-5)
    - [1.3.3 Common Loop Controls](#133-common-loop-controls)
      - [1.3.3.1 Break Statement](#1331-break-statement)
        - [Python Syntax:](#python-syntax-6)
        - [JavaScript Comparison:](#javascript-comparison-6)
        - [Python Example:](#python-example-6)
        - [JavaScript Equivalent:](#javascript-equivalent-6)
      - [1.3.3.2 Continue Statement](#1332-continue-statement)
        - [Python Syntax:](#python-syntax-7)
        - [JavaScript Comparison:](#javascript-comparison-7)
        - [Python Example:](#python-example-7)
        - [JavaScript Equivalent:](#javascript-equivalent-7)
    - [1.3.4 Ternary Expressions](#134-ternary-expressions)
      - [Python Syntax:](#python-syntax-8)
      - [JavaScript Comparison:](#javascript-comparison-8)
      - [Python Example:](#python-example-8)
      - [JavaScript Equivalent:](#javascript-equivalent-8)
  - [1.4 Rarely Used Control Flow](#14-rarely-used-control-flow)
    - [1.4.1 Advanced Conditionals](#141-advanced-conditionals)
      - [1.4.1.1 Nested If Statements](#1411-nested-if-statements)
        - [Python Syntax:](#python-syntax-9)
        - [JavaScript Comparison:](#javascript-comparison-9)
        - [Python Example:](#python-example-9)
        - [JavaScript Equivalent:](#javascript-equivalent-9)
      - [1.4.1.2 Complex Boolean Logic](#1412-complex-boolean-logic)
        - [Python Example:](#python-example-10)
        - [JavaScript Equivalent:](#javascript-equivalent-10)
    - [1.4.2 Extended Loop Features](#142-extended-loop-features)
      - [1.4.2.1 Enumerate Function](#1421-enumerate-function)
        - [Python Syntax:](#python-syntax-10)
        - [JavaScript Comparison:](#javascript-comparison-10)
        - [Python Example:](#python-example-11)
        - [JavaScript Equivalent:](#javascript-equivalent-11)
      - [1.4.2.2 While Loop with Else](#1422-while-loop-with-else)
        - [Python Syntax:](#python-syntax-11)
        - [JavaScript Comparison:](#javascript-comparison-11)
        - [Python Example:](#python-example-12)
        - [JavaScript Equivalent (using flag):](#javascript-equivalent-using-flag)
      - [1.4.2.3 For Loop with Else](#1423-for-loop-with-else)
        - [Python Syntax:](#python-syntax-12)
        - [JavaScript Comparison:](#javascript-comparison-12)
        - [Python Example:](#python-example-13)
        - [JavaScript Equivalent (using flag):](#javascript-equivalent-using-flag-1)
    - [1.4.3 Special Statements](#143-special-statements)
      - [1.4.3.1 Pass Statement](#1431-pass-statement)
        - [Python Syntax:](#python-syntax-13)
        - [JavaScript Comparison:](#javascript-comparison-13)
        - [Python Example:](#python-example-14)
        - [JavaScript Equivalent:](#javascript-equivalent-12)
  - [1.5 Best Practices](#15-best-practices)
    - [1.5.1 Python Best Practices](#151-python-best-practices)
    - [1.5.2 JavaScript Best Practices](#152-javascript-best-practices)
    - [1.5.3 Language Transition Tips](#153-language-transition-tips)

## 1.2 Introduction

Control flow structures determine the order in which statements are executed in a program. This reference compares Python's control flow features with JavaScript equivalents to help developers working in both languages or transitioning from one to the other.

This document divides control flow structures into:

- **Frequently Used**: Common patterns that form the backbone of most programs
- **Rarely Used**: Specialized features that are helpful in specific scenarios

## 1.3 Frequently Used Control Flow

### 1.3.1 Basic Conditional Statements

#### 1.3.1.1 If Statement

The simplest form of a conditional statement that executes a block of code only if the condition is `True` (Python) or truthy (JavaScript).

##### Python Syntax:

```python
if condition:
    # code to execute if condition is True
```

##### JavaScript Comparison:

| Feature             | Python                                           | JavaScript                                               |
| ------------------- | ------------------------------------------------ | -------------------------------------------------------- |
| Syntax              | `if condition:`                                  | `if (condition) {`                                       |
| Block delimiter     | Indentation                                      | Curly braces `{}`                                        |
| Condition wrapping  | No parentheses required                          | Parentheses required                                     |
| Truthy/Falsy values | `False`, `None`, `0`, `""`, `[]`, `{}` are falsy | `false`, `null`, `undefined`, `0`, `NaN`, `""` are falsy |

##### Python Example:

```python
age = 20
if age >= 18:
    print("You are an adult")
    print("You can vote")
```

##### JavaScript Equivalent:

```javascript
let age = 20;
if (age >= 18) {
  console.log("You are an adult");
  console.log("You can vote");
}
```

#### 1.3.1.2 If-Else Statement

Executes one block of code if the condition is `True` and another block if the condition is `False`.

##### Python Syntax:

```python
if condition:
    # code to execute if condition is True
else:
    # code to execute if condition is False
```

##### JavaScript Comparison:

| Feature | Python                       | JavaScript                         |
| ------- | ---------------------------- | ---------------------------------- |
| Syntax  | `if condition:` <br> `else:` | `if (condition) {` <br> `} else {` |

##### Python Example:

```python
age = 16
if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")
```

##### JavaScript Equivalent:

```javascript
let age = 16;
if (age >= 18) {
  console.log("You are an adult");
} else {
  console.log("You are a minor");
}
```

#### 1.3.1.3 If-Elif-Else Statement

Used when you need to check multiple conditions sequentially.

##### Python Syntax:

```python
if condition1:
    # code if condition1 is True
elif condition2:
    # code if condition1 is False and condition2 is True
else:
    # code if all conditions are False
```

##### JavaScript Comparison:

| Feature             | Python                                                | JavaScript                                                          |
| ------------------- | ----------------------------------------------------- | ------------------------------------------------------------------- |
| Syntax              | `if condition1:` <br> `elif condition2:` <br> `else:` | `if (condition1) {` <br> `} else if (condition2) {` <br> `} else {` |
| Multiple conditions | `elif` keyword                                        | `else if` keywords                                                  |

##### Python Example:

```python
score = 85

if score >= 90:
    grade = "A"
elif score >= 80:
    grade = "B"
elif score >= 70:
    grade = "C"
elif score >= 60:
    grade = "D"
else:
    grade = "F"

print(f"Your grade is {grade}")
```

##### JavaScript Equivalent:

```javascript
let score = 85;
let grade;

if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else if (score >= 60) {
  grade = "D";
} else {
  grade = "F";
}

console.log(`Your grade is ${grade}`);
```

### 1.3.2 Standard Loops

#### 1.3.2.1 For Loops with Sequences

For loops are used to iterate over a sequence (like a list, tuple, dictionary, set, or string).

##### Python Syntax:

```python
for item in sequence:
    # code to execute for each item
```

##### JavaScript Comparison:

| Feature          | Python                            | JavaScript                                        |
| ---------------- | --------------------------------- | ------------------------------------------------- |
| Array iteration  | `for item in array:`              | `for (let item of array) {`                       |
| String iteration | `for char in string:`             | `for (let char of string) {`                      |
| Object iteration | `for key in dictionary:`          | `for (let key in object) {`                       |
| Object values    | `for value in dict.values():`     | `for (let value of Object.values(obj)) {`         |
| Object entries   | `for key, value in dict.items():` | `for (let [key, value] of Object.entries(obj)) {` |

##### Python Example:

```python
# List iteration
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# String iteration
for char in "Python":
    print(char)

# Dictionary iteration
person = {"name": "John", "age": 30}
for key in person:
    print(f"{key}: {person[key]}")

# Dictionary values and items
for value in person.values():
    print(value)

for key, value in person.items():
    print(f"{key} = {value}")
```

##### JavaScript Equivalent:

```javascript
// Array iteration
const fruits = ["apple", "banana", "cherry"];
for (let fruit of fruits) {
  console.log(fruit);
}

// String iteration
for (let char of "JavaScript") {
  console.log(char);
}

// Object iteration (keys)
const person = { name: "John", age: 30 };
for (let key in person) {
  console.log(`${key}: ${person[key]}`);
}

// Object values
for (let value of Object.values(person)) {
  console.log(value);
}

// Object entries
for (let [key, value] of Object.entries(person)) {
  console.log(`${key} = ${value}`);
}
```

#### 1.3.2.2 For Loops with Range

The `range()` function in Python generates a sequence of numbers. JavaScript has no direct equivalent but uses the traditional C-style for loop.

##### Python Syntax:

```python
for i in range(stop):
    # code to execute for each number
```

##### JavaScript Comparison:

| Feature          | Python                      | JavaScript                          |
| ---------------- | --------------------------- | ----------------------------------- |
| Basic range      | `for i in range(5):`        | `for (let i = 0; i < 5; i++) {`     |
| Range with start | `for i in range(2, 5):`     | `for (let i = 2; i < 5; i++) {`     |
| Range with step  | `for i in range(0, 10, 2):` | `for (let i = 0; i < 10; i += 2) {` |
| Countdown        | `for i in range(5, 0, -1):` | `for (let i = 5; i > 0; i--) {`     |

##### Python Example:

```python
# Basic range
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# Range with start and stop
for i in range(2, 5):
    print(i)  # 2, 3, 4

# Range with step
for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8

# Countdown
for i in range(5, 0, -1):
    print(i)  # 5, 4, 3, 2, 1
```

##### JavaScript Equivalent:

```javascript
// Basic range
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

// Range with start and stop
for (let i = 2; i < 5; i++) {
  console.log(i); // 2, 3, 4
}

// Range with step
for (let i = 0; i < 10; i += 2) {
  console.log(i); // 0, 2, 4, 6, 8
}

// Countdown
for (let i = 5; i > 0; i--) {
  console.log(i); // 5, 4, 3, 2, 1
}
```

#### 1.3.2.3 Basic While Loops

While loops repeatedly execute a block of code as long as a condition is `True`.

##### Python Syntax:

```python
while condition:
    # code to execute while condition is True
```

##### JavaScript Comparison:

| Feature   | Python             | JavaScript                    |
| --------- | ------------------ | ----------------------------- |
| Syntax    | `while condition:` | `while (condition) {`         |
| Increment | `counter += 1`     | `counter++` or `counter += 1` |

##### Python Example:

```python
count = 0
while count < 5:
    print(count)
    count += 1
```

##### JavaScript Equivalent:

```javascript
let count = 0;
while (count < 5) {
  console.log(count);
  count++;
}
```

### 1.3.3 Common Loop Controls

#### 1.3.3.1 Break Statement

Terminates the current loop and resumes execution at the next statement after the loop.

##### Python Syntax:

```python
for item in sequence:
    if condition:
        break
```

##### JavaScript Comparison:

| Feature  | Python                   | JavaScript               |
| -------- | ------------------------ | ------------------------ |
| Syntax   | `break`                  | `break`                  |
| Behavior | Exits the innermost loop | Exits the innermost loop |

##### Python Example:

```python
for i in range(10):
    if i == 5:
        print("Found 5, breaking loop")
        break
    print(i)
```

##### JavaScript Equivalent:

```javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    console.log("Found 5, breaking loop");
    break;
  }
  console.log(i);
}
```

#### 1.3.3.2 Continue Statement

Skips the rest of the current iteration and moves to the next iteration.

##### Python Syntax:

```python
for item in sequence:
    if condition:
        continue
    # code here will be skipped for items that match the condition
```

##### JavaScript Comparison:

| Feature  | Python                  | JavaScript              |
| -------- | ----------------------- | ----------------------- |
| Syntax   | `continue`              | `continue`              |
| Behavior | Skips to next iteration | Skips to next iteration |

##### Python Example:

```python
for i in range(10):
    if i % 2 == 0:  # Skip even numbers
        continue
    print(i)
```

##### JavaScript Equivalent:

```javascript
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    // Skip even numbers
    continue;
  }
  console.log(i);
}
```

### 1.3.4 Ternary Expressions

A concise way to write a simple if-else statement in a single line.

##### Python Syntax:

```python
value_if_true if condition else value_if_false
```

##### JavaScript Comparison:

| Feature | Python                                           | JavaScript                                   |
| ------- | ------------------------------------------------ | -------------------------------------------- |
| Syntax  | `value_if_true if condition else value_if_false` | `condition ? value_if_true : value_if_false` |
| Order   | Condition in the middle                          | Condition first                              |

##### Python Example:

```python
age = 20
status = "Adult" if age >= 18 else "Minor"
print(status)  # Adult
```

##### JavaScript Equivalent:

```javascript
let age = 20;
let status = age >= 18 ? "Adult" : "Minor";
console.log(status); // Adult
```

## 1.4 Rarely Used Control Flow

### 1.4.1 Advanced Conditionals

#### 1.4.1.1 Nested If Statements

Conditional statements can be nested inside other conditional statements.

##### Python Syntax:

```python
if condition1:
    # code block
    if condition2:
        # nested code block
```

##### JavaScript Comparison:

| Feature     | Python                      | JavaScript                                   |
| ----------- | --------------------------- | -------------------------------------------- |
| Syntax      | Indentation defines nesting | Curly braces define nesting                  |
| Readability | Enforced by indentation     | Can become harder to follow with many braces |

##### Python Example:

```python
age = 25
has_license = True

if age >= 18:
    print("Adult age")
    if has_license:
        print("Can drive")
    else:
        print("Cannot drive without license")
else:
    print("Minor age")
```

##### JavaScript Equivalent:

```javascript
let age = 25;
let hasLicense = true;

if (age >= 18) {
  console.log("Adult age");
  if (hasLicense) {
    console.log("Can drive");
  } else {
    console.log("Cannot drive without license");
  }
} else {
  console.log("Minor age");
}
```

#### 1.4.1.2 Complex Boolean Logic

Using multiple boolean conditions in a single expression.

##### Python Example:

```python
age = 25
income = 50000
credit_score = 700

if (age >= 21 and income >= 40000) or credit_score >= 750:
    print("Loan approved")
else:
    print("Loan denied")
```

##### JavaScript Equivalent:

```javascript
let age = 25;
let income = 50000;
let creditScore = 700;

if ((age >= 21 && income >= 40000) || creditScore >= 750) {
  console.log("Loan approved");
} else {
  console.log("Loan denied");
}
```

### 1.4.2 Extended Loop Features

#### 1.4.2.1 Enumerate Function

Use `enumerate()` when you need both the index and value during iteration.

##### Python Syntax:

```python
for index, value in enumerate(sequence):
    # code using both index and value
```

##### JavaScript Comparison:

| Feature           | Python                                          | JavaScript                          |
| ----------------- | ----------------------------------------------- | ----------------------------------- |
| Array enumeration | `for index, value in enumerate(list):`          | `array.forEach((value, index) => {` |
| With start index  | `for index, value in enumerate(list, start=1):` | No direct equivalent                |

##### Python Example:

```python
fruits = ['apple', 'banana', 'cherry']

# Basic enumeration
for index, fruit in enumerate(fruits):
    print(f"{index}: {fruit}")

# With custom start index
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}: {fruit}")
```

##### JavaScript Equivalent:

```javascript
const fruits = ["apple", "banana", "cherry"];

// Using forEach
fruits.forEach((fruit, index) => {
  console.log(`${index}: ${fruit}`);
});

// Using for loop with index
for (let index = 0; index < fruits.length; index++) {
  console.log(`${index}: ${fruits[index]}`);
}

// With custom start index (manual approach)
for (let index = 0; index < fruits.length; index++) {
  console.log(`${index + 1}: ${fruits[index]}`);
}
```

#### 1.4.2.2 While Loop with Else

The `else` block executes after the while loop completes normally (not terminated by a `break`).

##### Python Syntax:

```python
while condition:
    # loop body
else:
    # executes when condition becomes False
```

##### JavaScript Comparison:

| Feature         | Python                                                              | JavaScript                                     |
| --------------- | ------------------------------------------------------------------- | ---------------------------------------------- |
| While with else | `while condition:` <br> `    # code` <br> `else:` <br> `    # code` | No direct equivalent, must use a flag variable |

##### Python Example:

```python
count = 0
while count < 3:
    print(count)
    count += 1
else:
    print("Loop completed normally")

# Contrast with break:
count = 0
while count < 5:
    print(count)
    if count == 2:
        print("Breaking loop")
        break
    count += 1
else:
    print("This won't execute due to break")
```

##### JavaScript Equivalent (using flag):

```javascript
let count = 0;
let brokeEarly = false;

while (count < 3) {
  console.log(count);
  count++;
}
if (!brokeEarly) {
  console.log("Loop completed normally");
}

// Contrast with break:
count = 0;
brokeEarly = false;
while (count < 5) {
  console.log(count);
  if (count === 2) {
    console.log("Breaking loop");
    brokeEarly = true;
    break;
  }
  count++;
}
if (!brokeEarly) {
  console.log("This won't execute due to break");
}
```

#### 1.4.2.3 For Loop with Else

Similar to while-else, the `else` block executes after the for loop completes normally.

##### Python Syntax:

```python
for item in sequence:
    # loop body
else:
    # executes when the loop completes normally
```

##### JavaScript Comparison:

| Feature       | Python                                                                   | JavaScript                                     |
| ------------- | ------------------------------------------------------------------------ | ---------------------------------------------- |
| For with else | `for item in sequence:` <br> `    # code` <br> `else:` <br> `    # code` | No direct equivalent, must use a flag variable |

##### Python Example:

```python
for i in range(3):
    print(i)
else:
    print("Loop completed normally")

# Contrast with break:
for i in range(5):
    print(i)
    if i == 2:
        print("Breaking loop")
        break
else:
    print("This won't execute due to break")
```

##### JavaScript Equivalent (using flag):

```javascript
let brokeEarly = false;

for (let i = 0; i < 3; i++) {
  console.log(i);
}
if (!brokeEarly) {
  console.log("Loop completed normally");
}

// Contrast with break:
brokeEarly = false;
for (let i = 0; i < 5; i++) {
  console.log(i);
  if (i === 2) {
    console.log("Breaking loop");
    brokeEarly = true;
    break;
  }
}
if (!brokeEarly) {
  console.log("This won't execute due to break");
}
```

### 1.4.3 Special Statements

#### 1.4.3.1 Pass Statement

A placeholder statement that does nothing. Used when a statement is required syntactically but no action is needed.

##### Python Syntax:

```python
if condition:
    pass  # do nothing
```

##### JavaScript Comparison:

| Feature      | Python | JavaScript              |
| ------------ | ------ | ----------------------- |
| No-operation | `pass` | Empty block `{}` or `;` |

##### Python Example:

```python
def my_function():
    # Implementation coming later
    pass

for i in range(5):
    if i == 2:
        # TODO: Special handling for 2
        pass
    print(i)

class MyEmptyClass:
    pass
```

##### JavaScript Equivalent:

```javascript
function myFunction() {
  // Implementation coming later
  // JavaScript doesn't need a placeholder
}

for (let i = 0; i < 5; i++) {
  if (i === 2) {
    // TODO: Special handling for 2
    // Empty block is fine
  }
  console.log(i);
}

class MyEmptyClass {
  // Empty class is fine
}
```

## 1.5 Best Practices

### 1.5.1 Python Best Practices

1. **Use meaningful indentation**: Python relies on indentation to define code blocks, standard is 4 spaces.

2. **Prefer positive conditions**: Write `if is_valid:` rather than `if not is_invalid:`.

3. **Use guard clauses**: Return early from functions for edge cases.

   ```python
   def process_data(data):
       if not data:
           return None
       # process data
   ```

4. **Use list comprehensions** for simple for loops that build lists.

   ```python
   squares = [x**2 for x in range(10)]
   ```

5. **Use `in` operator** for membership checks.

   ```python
   if name in valid_names:
       # Do something
   ```

6. **Leverage `enumerate()`** when you need indices.

   ```python
   for i, item in enumerate(items):
       print(f"{i}: {item}")
   ```

7. **Use `else` clauses with loops** when they make the code clearer.

8. **Avoid deep nesting**: Extract complex conditions to functions or variables.

### 1.5.2 JavaScript Best Practices

1. **Always use block braces**: Even for single-line conditionals, use braces for clarity.

   ```javascript
   if (condition) {
     doSomething();
   }
   ```

2. **Use strict equality (`===`)**: Avoid type coercion bugs.

   ```javascript
   if (x === 5) {
     // Better than x == 5
   }
   ```

3. **Early returns**: Similar to Python's guard clauses.

   ```javascript
   function processData(data) {
     if (!data) return null;
     // process data
   }
   ```

4. **Use array methods** for transformations.

   ```javascript
   const squares = Array.from({ length: 10 }, (_, i) => i * i);
   // or
   const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
   const squares = numbers.map((x) => x * x);
   ```

5. **Use `includes()` or `some()`** for membership checks.

   ```javascript
   if (validNames.includes(name)) {
     // Do something
   }
   ```

6. **Destructuring for cleaner code**:

   ```javascript
   const [first, second] = array;
   const { name, age } = person;
   ```

7. **Use modern iteration methods** like `forEach`, `map`, `filter` rather than traditional for loops when appropriate.

8. **Use optional chaining (`?.`)** for safer property access.
   ```javascript
   const value = object?.property?.subProperty;
   ```

### 1.5.3 Language Transition Tips

1. **Watch your indentation**: When moving from Python to JavaScript, remember to add curly braces.

2. **Remember the parentheses**: JavaScript requires parentheses for `if`, `while`, and `for` conditions.

3. **Beware of equality operators**: JavaScript has `==` and `===`; Python just has `==`.

4. **Function parameters**: JavaScript doesn't support Python's keyword arguments directly.

5. **Loop differences**: Python's `for` loop is more like JavaScript's `for...of` loop.

6. **Remember semicolons**: JavaScript statements traditionally end with semicolons (optional but recommended).

7. **Objects vs Dictionaries**: These are similar but have different method names and access patterns.

8. **Breaking out of nested loops**: Both languages require labeled blocks or flags to break from multiple nested loops.

9. **Error handling**: Python uses `try/except` while JavaScript uses `try/catch`.

10. **Variable scoping**: JavaScript has block scope with `let`/`const`, different from Python.
